// AGENTE CLASIFICADOR
// Lee la taxonomía (pestaña "Materiales" del Sheet) + los materiales de Supabase,
// y usa Claude para asignar categoría/subcategoría a cada producto (o "sin categoría").
// Guarda cat_app / subcat_app en Supabase. La app lee ESO (no adivina por keyword).
//
// Requiere en scraper/.env:  SUPABASE_URL, SUPABASE_SECRET_KEY, ANTHROPIC_API_KEY
// Uso:  node clasificar.js [provincia]        (default: Tucumán)
require('dotenv').config()
const { getValues } = require('./gsheets')

const SUPA = process.env.SUPABASE_URL
const SECRET = process.env.SUPABASE_SECRET_KEY
const AK = process.env.ANTHROPIC_API_KEY
const MODEL = process.env.CLASIF_MODEL || 'claude-haiku-4-5-20251001'
const PROVINCIA = process.argv[2] || 'Tucumán'
const LOTE = 40

if (!AK) {
  console.error('❌ Falta ANTHROPIC_API_KEY en scraper/.env (creá una en console.anthropic.com)')
  process.exit(1)
}

// ---- Taxonomía desde el Sheet ----
async function taxonomia() {
  const rows = (await getValues('Materiales!A1:B500')).slice(1)
  const cats = new Map()
  for (const r of rows) {
    const c = (r[0] || '').trim()
    const s = (r[1] || '').trim()
    if (!c) continue
    if (!cats.has(c)) cats.set(c, [])
    if (s) cats.get(c).push(s)
  }
  return cats
}
function taxonomiaTexto(cats) {
  return [...cats.entries()]
    .map(([c, subs]) => `- ${c}${subs.length ? ': ' + subs.join(' | ') : ' (sin subcategorías)'}`)
    .join('\n')
}

// ---- Supabase ----
const H = { apikey: SECRET, Authorization: 'Bearer ' + SECRET, 'Content-Type': 'application/json' }
async function traerMateriales() {
  const out = []
  for (let offset = 0; ; offset += 1000) {
    const url = `${SUPA}/rest/v1/materiales?provincia=eq.${encodeURIComponent(PROVINCIA)}&select=id,nombre&order=id&limit=1000&offset=${offset}`
    const r = await fetch(url, { headers: H })
    const j = await r.json()
    if (!Array.isArray(j) || j.length === 0) break
    out.push(...j)
    if (j.length < 1000) break
  }
  return out
}
async function guardar(grupo) {
  // grupo: { cat, sub, ids[] } → PATCH por chunks
  for (let i = 0; i < grupo.ids.length; i += 80) {
    const chunk = grupo.ids.slice(i, i + 80)
    const url = `${SUPA}/rest/v1/materiales?id=in.(${chunk.join(',')})`
    const body = JSON.stringify({ cat_app: grupo.cat || null, subcat_app: grupo.sub || null, clasificado_at: new Date().toISOString() })
    const r = await fetch(url, { method: 'PATCH', headers: { ...H, Prefer: 'return=minimal' }, body })
    if (!r.ok) throw new Error('PATCH ' + r.status + ' ' + (await r.text()))
  }
}

// ---- Agente ----
const SYSTEM = `Sos un clasificador de materiales de construcción para un comparador de precios en Argentina.
Recibís una TAXONOMÍA (categorías y sus subcategorías) y una lista de PRODUCTOS.
Asigná a cada producto la categoría y subcategoría MÁS correcta de la taxonomía, entendiendo qué es el producto (no por coincidencia de palabras).
Reglas:
- La subcategoría debe ser una de las listadas para esa categoría. Si la categoría no tiene subcategorías, dejá subcategoria en "".
- Si el producto NO encaja en ninguna categoría, devolvé categoria "" y subcategoria "" (sin categoría).
- Cuidado con los falsos amigos: "Placa de yeso" es Construcción en seco (una placa), NO Aglomerantes/Yeso. "Masilla para placa" no es Yeso. "Látex para placa de yeso" es Pinturas/Látex.
Respondé SOLO un JSON array, sin texto extra: [{"n":0,"categoria":"...","subcategoria":"..."}]`

async function clasificarLote(taxTxt, productos) {
  const lista = productos.map((p, i) => `${i}. ${p.nombre}`).join('\n')
  const body = {
    model: MODEL,
    max_tokens: 8000,
    system: SYSTEM,
    messages: [{ role: 'user', content: `TAXONOMÍA:\n${taxTxt}\n\nPRODUCTOS:\n${lista}` }],
  }
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': AK, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  const j = await r.json()
  if (j.error) throw new Error(j.error.message)
  const txt = j.content.map((c) => c.text || '').join('')
  return JSON.parse(txt.replace(/```json|```/g, '').trim())
}

async function main() {
  const cats = await taxonomia()
  const taxTxt = taxonomiaTexto(cats)
  const mats = await traerMateriales()
  console.log(`Taxonomía: ${cats.size} categorías | Materiales a clasificar: ${mats.length} (${PROVINCIA})`)

  const asign = new Map() // "cat|sub" -> { cat, sub, ids[] }
  for (let i = 0; i < mats.length; i += LOTE) {
    const lote = mats.slice(i, i + LOTE)
    let res
    try {
      res = await clasificarLote(taxTxt, lote)
    } catch (e) {
      console.error(`  ⚠️ lote ${i}-${i + lote.length} falló: ${e.message} — reintento en 3s`)
      await new Promise((s) => setTimeout(s, 3000))
      res = await clasificarLote(taxTxt, lote)
    }
    for (const item of res) {
      const m = lote[item.n]
      if (!m) continue
      const cat = (item.categoria || '').trim()
      const sub = (item.subcategoria || '').trim()
      const k = cat + '|' + sub
      if (!asign.has(k)) asign.set(k, { cat, sub, ids: [] })
      asign.get(k).ids.push(m.id)
    }
    process.stdout.write(`\r  clasificados ${Math.min(i + LOTE, mats.length)}/${mats.length}`)
  }
  console.log('\nGuardando en Supabase…')
  let sinCat = 0
  for (const g of asign.values()) {
    await guardar(g)
    if (!g.cat) sinCat += g.ids.length
  }

  console.log('\n=== RESUMEN ===')
  ;[...asign.values()]
    .sort((a, b) => b.ids.length - a.ids.length)
    .forEach((g) => console.log(`  ${String(g.ids.length).padStart(4)}  ${g.cat || '(sin categoría)'}${g.sub ? ' › ' + g.sub : ''}`))
  console.log(`\nTotal: ${mats.length} | Sin categoría: ${sinCat} (${((100 * sinCat) / mats.length).toFixed(1)}%)`)
}

main().catch((e) => {
  console.error('❌', e.message)
  process.exit(1)
})
