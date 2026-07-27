// Onboarding de un proveedor WooCommerce (con Store API) a Supabase, sin tocar otros proveedores.
// Scrapea con scrape-woo, crea/asegura el proveedor en la tabla `proveedores`, y hace upsert de
// materiales (activo=true). Categoría faltante → se completa con la categoría normalizada.
// Uso: node onboard-woo.js <url> <slug> "<nombre>" [provincia]
require('dotenv').config()
const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')
const { scrapeWoo } = require('./scrape-woo')

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } })

function parsePrecio(str) {
  const t = String(str).replace('$', '').replace(/[^\d.]/g, '')
  const n = parseFloat(t)
  return isNaN(n) ? null : n
}

const CANON = [
  ['Cemento y cales', /cement|\bcal\b|hormig|klaukol|pegamento|adhesiv|pastina/i],
  ['Áridos', /arena|piedra|ripio|árido|arido|granza|canto rodado/i],
  ['Ladrillos y bloques', /ladrillo|bloque|adoqu|premoldeado|viguet/i],
  ['Hierro y aceros', /hierro|acero|varilla|malla sima|clavo|alambre|perfil|caño estructural|hierros/i],
  ['Maderas', /madera|\btabla\b|listón|machimbre|fenólico|\bosb\b|terciad|tirante|poste|pino|placa/i],
  ['Pinturas', /pintura|látex|latex|esmalte|enduido|barniz|imprimac|fijador|rodillo|pincel|antióxid/i],
  ['Sanitarios y grifería', /inodoro|bidet|griferí|griferia|canilla|lavatorio|sanitari|ducha|mochila|dep[oó]sito|bacha/i],
  ['Plomería', /caño|cañería|\bpvc\b|\bppr\b|\bcodo\b|cupla|conexión|termofusi|cloacal|desag[üu]|tanque/i],
  ['Electricidad', /cable|térmica|disyuntor|tomacorriente|interruptor|el[eé]ctric|l[aá]mpara|\bled\b|\bfoco\b|tablero|conduit/i],
  ['Aberturas', /puerta|ventana|abertura|\bmarco\b|postigo|celosía|\breja\b|tranquera|verja|cerco|aluminio/i],
  ['Techos y membranas', /membrana|\bteja\b|\bchapa\b|\btecho\b|zinguer|cumbrera|policarbonato|asfalto/i],
  ['Revestimientos y pisos', /cer[aá]mic|porcelanato|\bpiso\b|revestimiento|z[oó]calo|pastina|laja/i],
  ['Herramientas', /taladro|amoladora|herramienta|martillo|pinza|destornillad|\bnivel\b|sierra|\bdisco\b|matafuego|extintor/i],
  ['Ferretería', /tornillo|bul[oó]n|tuerca|arandela|bisagra|cerradura|candado|ferreter|tarugo|grampa/i],
  ['Aislantes', /aislante|lana de vidrio|poliestireno|telgopor|espuma|isopor/i],
]
function normCat(cat, nombre) {
  const t = ((nombre || '') + ' ' + (cat || '')).toLowerCase()
  for (const [name, re] of CANON) if (re.test(t)) return name
  return 'Otros'
}

async function ensureProveedor(slug, nombre, url, provincia) {
  const { data } = await sb.from('proveedores').select('id').eq('slug', slug).maybeSingle()
  if (data && data.id) return data.id
  const { data: ins, error } = await sb.from('proveedores').insert({ nombre, slug, url, provincia }).select('id').single()
  if (error) throw new Error('creando proveedor: ' + error.message)
  return ins.id
}

async function main() {
  const [url, slug, nombre, provincia = 'Tucumán'] = process.argv.slice(2)
  if (!url || !slug || !nombre) { console.error('Uso: node onboard-woo.js <url> <slug> "<nombre>" [provincia]'); process.exit(1) }

  const archivo = `${slug}-rows.json`
  if (!fs.existsSync(archivo)) await scrapeWoo(url, slug)
  const raw = JSON.parse(fs.readFileSync(archivo, 'utf8'))

  const proveedor_id = await ensureProveedor(slug, nombre, url, provincia)
  const seen = new Set()
  const rows = []
  const hasImagen = !(await sb.from('materiales').select('imagen').limit(1)).error
  for (const r of raw) {
    const [categoria, subcategoria, nom, precioStr, u, descripcion, , sku, imagen] = r
    const precio = parsePrecio(precioStr)
    if (!nom || precio == null || !u || seen.has(u)) continue
    seen.add(u)
    const cat_norm = normCat(categoria, nom)
    const row = {
      provincia,
      proveedor_id,
      categoria: categoria || cat_norm, // sin categoría nativa → usa la normalizada, así aparece en la app
      subcategoria: subcategoria || null,
      categoria_norm: cat_norm,
      nombre: nom,
      precio,
      url: u,
      descripcion: descripcion || null,
      sku: sku || null,
      activo: true,
      baja_at: null,
    }
    if (hasImagen) row.imagen = imagen || null
    rows.push(row)
  }
  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await sb.from('materiales').upsert(rows.slice(i, i + 500), { onConflict: 'proveedor_id,provincia,url' })
    if (error) { console.error('❌ upsert', error.message); process.exit(1) }
  }
  const { count } = await sb.from('materiales').select('*', { count: 'exact', head: true }).eq('proveedor_id', proveedor_id).eq('activo', true)
  const conPrecio = rows.filter((r) => r.precio > 0).length
  console.log(`✅ ${nombre} (${slug}): ${rows.length} subidos (${conPrecio} con precio) — activos ahora: ${count}`)
}

main().catch((e) => { console.error('❌', e.message); process.exit(1) })
