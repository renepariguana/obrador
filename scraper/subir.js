// Sube a Supabase (tabla materiales) las filas scrapeadas de Easy/EMI.
// Resuelve proveedor_id (tabla proveedores) y asigna categoría normalizada.
// Uso: node subir.js
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

const URL = process.env.SUPABASE_URL
const KEY = process.env.SUPABASE_SECRET_KEY
if (!URL || !KEY) {
  console.error('Falta SUPABASE_URL o SUPABASE_SECRET_KEY en scraper/.env')
  process.exit(1)
}
const sb = createClient(URL, KEY, { auth: { persistSession: false } })

const PRES = path.resolve(__dirname, '../../Presupuestador/scrapers')
const PROVINCIA = 'Tucumán'

// Qué archivo scrapeado corresponde a cada proveedor (por slug)
const FUENTES = [
  { slug: 'easy', archivo: 'easy-rows.json', formato: 'easy' },
  { slug: 'emi', archivo: 'emi-rows.json', formato: 'emi' },
]

// Easy: número crudo (punto decimal). EMI: formato AR (punto miles, coma decimales).
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

// Taxonomía propia: mapea (nombre + categoría del proveedor) → categoría normalizada.
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

async function main() {
  const { data: provs, error: e1 } = await sb.from('proveedores').select('id,slug')
  if (e1) {
    console.error('Error leyendo proveedores:', e1.message)
    process.exit(1)
  }
  const idPorSlug = Object.fromEntries((provs || []).map((p) => [p.slug, p.id]))

  const filas = []
  for (const f of FUENTES) {
    const proveedor_id = idPorSlug[f.slug]
    if (!proveedor_id) {
      console.warn(`  ⚠️ proveedor "${f.slug}" no está en la tabla proveedores`)
      continue
    }
    const p = path.join(PRES, f.archivo)
    if (!fs.existsSync(p)) {
      console.warn('  ⚠️ no existe', p)
      continue
    }
    const data = JSON.parse(fs.readFileSync(p, 'utf8'))
    data.forEach((r) => {
      const [categoria, subcategoria, nombre, precioStr, url] = r
      const precio = parsePrecio(precioStr, f.formato)
      if (!nombre || precio == null || !url) return
      filas.push({
        provincia: PROVINCIA,
        proveedor_id,
        categoria: categoria || null,
        subcategoria: subcategoria || null,
        categoria_norm: normalizarCategoria(categoria, nombre),
        nombre,
        precio,
        url,
      })
    })
  }

  // dedupe por (proveedor_id, provincia, url)
  const seen = new Set()
  const u = filas.filter((r) => {
    const k = r.proveedor_id + '|' + r.provincia + '|' + r.url
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
  console.log(`Filas: ${filas.length} → únicas: ${u.length}`)

  const CHUNK = 500
  for (let i = 0; i < u.length; i += CHUNK) {
    const { error } = await sb.from('materiales').upsert(u.slice(i, i + CHUNK), { onConflict: 'proveedor_id,provincia,url' })
    if (error) {
      console.error('\n❌ Error en batch', i, '→', error.message)
      process.exit(1)
    }
    process.stdout.write(`  subidas ${Math.min(i + CHUNK, u.length)}/${u.length}\r`)
  }
  console.log('\n✅ Listo — materiales actualizados (proveedor + categoría normalizada)')
}

main().catch((e) => {
  console.error('❌', e.message)
  process.exit(1)
})
