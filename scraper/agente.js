// AGENTE MENSUAL — orquesta la actualización de materiales de Manos a la Obra.
// 1) Lee la pestaña Proveedores y, por cada proveedor ACTIVO, scrapea su página:
//      - módulo a medida por slug (easy, emi…)  ·  VTEX genérico si TIPO=vtex  ·  si no, avisa que falta scraper
// 2) subir.js → sincroniza Supabase con diff por (proveedor + CODIGO): altas, updates, bajas (inactivos)
// 3) revisar.js → rearma las pestañas del Sheet (una por proveedor + Materiales) con solo lo vigente
// Uso: node agente.js   (o automático por launchd, día 1, 8am)
const { execSync } = require('child_process')
const path = require('path')
const { getValues } = require('./gsheets')

const PRES = path.resolve(__dirname, '../../Presupuestador/scrapers')
// Scrapers a medida por slug (para sitios que no son VTEX o necesitan lógica propia).
const MODULOS = { easy: 'node scrape-easy.js', emi: 'node scrape-emi.js', maderplak: 'node scrape-maderplak.js' }

async function proveedoresActivos() {
  const rows = (await getValues('Proveedores!A1:Z3000')) || []
  if (!rows.length) return []
  const h = rows[0].map((x) => (x || '').trim())
  const ci = (re) => h.findIndex((x) => re.test(x))
  const si = ci(/slug/i), ui = ci(/url|web/i), ti = ci(/tipo|plataforma/i), ei = ci(/escrapeado/i), ai = ci(/^activo$/i), ni = ci(/nombre|proveedor/i)
  const out = []
  for (let i = 1; i < rows.length; i++) {
    const slug = (si !== -1 ? rows[i][si] || '' : '').trim()
    if (!slug) continue
    const esc = rows[i][ei] === true || String(ei !== -1 ? rows[i][ei] : '').toUpperCase() === 'TRUE'
    const activoViejo = ai !== -1 && (rows[i][ai] || '').trim().toUpperCase() === 'ACTIVO'
    if (ei !== -1 ? !esc : !activoViejo) continue // solo los scrapeados
    out.push({
      slug,
      url: (ui !== -1 ? rows[i][ui] || '' : '').trim(),
      tipo: (ti !== -1 ? rows[i][ti] || '' : '').trim().toLowerCase(),
      nombre: (ni !== -1 ? rows[i][ni] || '' : '').trim() || slug,
    })
  }
  return out
}

function correr(cmd, cwd) {
  try { execSync(cmd, { cwd, stdio: 'inherit' }); return true } catch (e) { return false }
}

async function main() {
  const provs = await proveedoresActivos()
  if (!provs.length) { console.log('No hay proveedores activos en la pestaña Proveedores.'); return }
  console.log(`Proveedores activos: ${provs.map((p) => p.nombre).join(', ')}`)

  const sinScraper = []
  for (const p of provs) {
    let cmd
    if (MODULOS[p.slug]) cmd = MODULOS[p.slug]
    else if (p.tipo === 'vtex') cmd = `node scrape-vtex.js "${p.url}" "${p.slug}"`
    else if (p.tipo === 'algolia') cmd = `node scrape-algolia.js "${p.url}" "${p.slug}"`
    else if (p.tipo === 'woo') cmd = `node scrape-woo.js "${p.url}" "${p.slug}"`
    else { sinScraper.push(p); continue }
    console.log(`\n▶ Scrapeando ${p.nombre}…`)
    if (!correr(cmd, PRES)) console.error(`❌ ${p.nombre} falló al scrapear`)
  }
  if (sinScraper.length) {
    console.warn(`\n⚠️ Falta scraper para: ${sinScraper.map((p) => `${p.nombre} (${p.url}${p.tipo ? ', tipo ' + p.tipo : ''})`).join(' · ')}`)
    console.warn('   → agregá un módulo a MODULOS (scraper a medida) o poné TIPO=vtex si el sitio es VTEX.')
  }

  console.log('\n▶ Sincronizando Supabase (altas/bajas)…')
  if (!correr('node subir.js', __dirname)) { console.error('❌ subir.js falló'); process.exit(1) }
  console.log('\n▶ Actualizando el Sheet…')
  if (!correr('node revisar.js', __dirname)) { console.error('❌ revisar.js falló'); process.exit(1) }
  console.log('\n✅ Agente terminó.')
}

main().catch((e) => { console.error('❌', e.message); process.exit(1) })
