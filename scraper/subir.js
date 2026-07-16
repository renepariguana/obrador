// Sincroniza Supabase (tabla materiales) con lo scrapeado de cada proveedor ACTIVO de la pestaña Proveedores.
// Diff mensual por (proveedor + CODIGO/url): ALTA (nuevo), UPDATE (precio), REACTIVA (volvió), BAJA (ya no está
// → activo=false, baja_at). Lee los archivos {slug}-rows.json de Presupuestador/scrapers.
// Uso: node subir.js
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')
const { getValues } = require('./gsheets')

const URL = process.env.SUPABASE_URL
const KEY = process.env.SUPABASE_SECRET_KEY
if (!URL || !KEY) {
  console.error('Falta SUPABASE_URL o SUPABASE_SECRET_KEY en scraper/.env')
  process.exit(1)
}
const sb = createClient(URL, KEY, { auth: { persistSession: false } })

const PRES = path.resolve(__dirname, '../../Presupuestador/scrapers')
const PROVINCIA = 'Tucumán'

// Precio: 'easy'/vtex = número crudo (punto decimal). 'emi'/puppeteer = formato AR (punto miles, coma decimal).
function parsePrecio(str, formato) {
  if (str == null) return null
  let t = String(str).replace('$', '').trim()
  if (formato === 'emi') {
    if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.')
    else t = t.replace(/\./g, '')
  } else {
    t = t.replace(/[^\d.]/g, '')
  }
  const n = parseFloat(t)
  return isNaN(n) ? null : n
}

// Taxonomía propia (categoria_norm, legado): mapea (nombre + categoría del proveedor) → categoría normalizada.
const CANON = [
  ['Cemento y cales', /cement|\bcal\b|cal hidra|hormig/i],
  ['Áridos', /arena|piedra|ripio|árido|arido|granza|canto rodado/i],
  ['Ladrillos y bloques', /ladrillo|bloque|adoqu|premoldeado/i],
  ['Hierro y aceros', /hierro|acero|varilla|malla sima|clavo|alambre|perfil|caño estructural/i],
  ['Maderas', /madera|\btabla\b|listón|machimbre|fenólico|\bosb\b|terciad|tirante/i],
  ['Pinturas', /pintura|látex|latex|esmalte|enduido|barniz|imprimac|fijador|rodillo|pincel/i],
  ['Sanitarios y grifería', /inodoro|bidet|griferí|griferia|canilla|lavatorio|sanitari|ducha|mochila|dep[oó]sito|bacha/i],
  ['Plomería', /caño|cañería|\bpvc\b|\bppr\b|\bcodo\b|cupla|conexión|termofusi|cloacal|desag[üu]/i],
  ['Electricidad', /cable|térmica|disyuntor|tomacorriente|interruptor|el[eé]ctric|l[aá]mpara|\bled\b|\bfoco\b|tablero|conduit/i],
  ['Aberturas', /puerta|ventana|abertura|\bmarco\b|postigo|celosía|\breja\b/i],
  ['Techos y membranas', /membrana|\bteja\b|\bchapa\b|\btecho\b|zinguer|cumbrera|policarbonato/i],
  ['Revestimientos y pisos', /cer[aá]mic|porcelanato|\bpiso\b|revestimiento|z[oó]calo|pastina|pegamento/i],
  ['Herramientas', /taladro|amoladora|herramienta|martillo|pinza|destornillad|\bnivel\b|sierra|\bdisco\b/i],
  ['Ferretería', /tornillo|bul[oó]n|tuerca|arandela|bisagra|cerradura|candado|ferreter|tarugo|grampa/i],
  ['Aislantes', /aislante|lana de vidrio|poliestireno|telgopor|espuma/i],
]
function normalizarCategoria(cat, nombre) {
  const t = ((nombre || '') + ' ' + (cat || '')).toLowerCase()
  for (const [name, re] of CANON) if (re.test(t)) return name
  return 'Otros'
}

// Proveedores ACTIVOS de la pestaña Proveedores → { slug, tipo }.
async function proveedoresActivos() {
  const rows = (await getValues('Proveedores!A1:Z100')) || []
  if (!rows.length) return []
  const h = rows[0].map((x) => (x || '').trim())
  const ci = (re) => h.findIndex((x) => re.test(x))
  const si = ci(/slug/i)
  const ti = ci(/tipo/i)
  const ai = ci(/^activo$/i)
  const out = []
  for (let i = 1; i < rows.length; i++) {
    const slug = (si !== -1 ? rows[i][si] || '' : '').trim()
    if (!slug) continue
    const activo = (ai !== -1 ? rows[i][ai] || '' : '').trim().toUpperCase()
    if (ai !== -1 && activo && activo !== 'ACTIVO') continue // saltear inactivos
    out.push({ slug, tipo: (ti !== -1 ? rows[i][ti] || '' : '').trim().toLowerCase() })
  }
  return out
}

// Trae TODAS las filas existentes (id, sku, url, activo) de estos proveedores (paginado).
async function existentes(provIds) {
  const map = new Map() // proveedor_id -> [{id,sku,url,activo}]
  provIds.forEach((id) => map.set(id, []))
  for (let from = 0; ; from += 1000) {
    const { data, error } = await sb
      .from('materiales')
      .select('id,proveedor_id,sku,url,activo')
      .eq('provincia', PROVINCIA)
      .in('proveedor_id', provIds)
      .range(from, from + 999)
    if (error) throw new Error('leyendo existentes: ' + error.message)
    if (!data || !data.length) break
    data.forEach((r) => map.get(r.proveedor_id)?.push(r))
    if (data.length < 1000) break
  }
  return map
}

async function main() {
  const { data: provs, error: e1 } = await sb.from('proveedores').select('id,slug')
  if (e1) { console.error('Error leyendo proveedores:', e1.message); process.exit(1) }
  const idPorSlug = Object.fromEntries((provs || []).map((p) => [p.slug, p.id]))

  const hasSku = !(await sb.from('materiales').select('sku').limit(1)).error
  const hasActivo = !(await sb.from('materiales').select('activo').limit(1)).error
  if (!hasSku) console.warn('  ⚠️ falta columna "sku" — corré: alter table materiales add column if not exists sku text;')
  if (!hasActivo) console.warn('  ⚠️ faltan columnas "activo"/"baja_at" — sin altas/bajas. Corré el schema.sql.')

  // 1) Armar filas scrapeadas por proveedor activo
  const porProv = {} // slug -> { proveedor_id, rows: [] }
  for (const p of await proveedoresActivos()) {
    const proveedor_id = idPorSlug[p.slug]
    if (!proveedor_id) { console.warn(`  ⚠️ proveedor "${p.slug}" no está en Supabase (tabla proveedores)`); continue }
    const archivo = path.join(PRES, `${p.slug}-rows.json`)
    if (!fs.existsSync(archivo)) { console.warn(`  ⚠️ no hay scrapeo para "${p.slug}" (${p.slug}-rows.json)`); continue }
    const formato = p.tipo === 'vtex' ? 'easy' : 'emi' // vtex = número crudo; el resto, formato AR
    const seenUrl = new Set()
    const rows = []
    for (const r of JSON.parse(fs.readFileSync(archivo, 'utf8'))) {
      const [categoria, subcategoria, nombre, precioStr, url, descripcion, , sku] = r
      const precio = parsePrecio(precioStr, formato)
      if (!nombre || precio == null || !url || seenUrl.has(url)) continue
      seenUrl.add(url)
      const row = {
        provincia: PROVINCIA,
        proveedor_id,
        categoria: categoria || null,
        subcategoria: subcategoria || null,
        categoria_norm: normalizarCategoria(categoria, nombre),
        nombre,
        precio,
        url,
        descripcion: descripcion || null,
      }
      if (hasSku) row.sku = sku || null
      if (hasActivo) { row.activo = true; row.baja_at = null } // reactiva si había vuelto
      rows.push(row)
    }
    if (rows.length) porProv[p.slug] = { proveedor_id, rows }
  }

  const slugs = Object.keys(porProv)
  if (!slugs.length) { console.log('No hay nada para subir.'); return }

  // 2) Existentes en Supabase (para diff altas/bajas)
  const provIds = slugs.map((s) => porProv[s].proveedor_id)
  const prev = hasActivo ? await existentes(provIds) : new Map()

  // 3) Upsert (altas + updates + reactivaciones) y baja de los que ya no están
  const bajaIds = []
  for (const slug of slugs) {
    const { proveedor_id, rows } = porProv[slug]
    const liveKeys = new Set()
    rows.forEach((r) => { liveKeys.add(r.url); if (r.sku) liveKeys.add(r.sku) })
    const antes = prev.get(proveedor_id) || []
    const urlsAntes = new Set(antes.map((r) => r.url))
    const altas = rows.filter((r) => !urlsAntes.has(r.url)).length
    let bajas = 0
    let reactivadas = 0
    for (const r of antes) {
      const vivo = liveKeys.has(r.url) || (r.sku && liveKeys.has(r.sku))
      if (r.activo !== false && !vivo) { bajaIds.push(r.id); bajas++ }
      else if (r.activo === false && vivo) reactivadas++
    }
    // upsert de este proveedor
    const CHUNK = 500
    for (let i = 0; i < rows.length; i += CHUNK) {
      const { error } = await sb.from('materiales').upsert(rows.slice(i, i + CHUNK), { onConflict: 'proveedor_id,provincia,url' })
      if (error) { console.error('\n❌ Error en batch', slug, i, '→', error.message); process.exit(1) }
    }
    console.log(`  ${slug}: ${rows.length} vigentes  (+${altas} altas  −${bajas} bajas${reactivadas ? `  ↺${reactivadas} reactivadas` : ''})`)
  }

  // 4) marcar bajas (inactivos) en lote
  if (hasActivo && bajaIds.length) {
    const now = new Date().toISOString()
    for (let i = 0; i < bajaIds.length; i += 500) {
      const { error } = await sb.from('materiales').update({ activo: false, baja_at: now }).in('id', bajaIds.slice(i, i + 500))
      if (error) { console.error('❌ marcando bajas →', error.message); process.exit(1) }
    }
  }
  console.log(`✅ Sincronizado — ${slugs.length} proveedor(es), ${bajaIds.length} baja(s) marcada(s).`)
}

main().catch((e) => {
  console.error('❌', e.message)
  process.exit(1)
})
