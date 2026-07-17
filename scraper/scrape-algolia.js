// Scraper GENÉRICO para tiendas sobre ALGOLIA (plataforma xcons y similares muy usada por corralones AR).
// El catálogo se sirve por Algolia (búsqueda tercerizada, sin el rate-limit de la storefront): un par de
// requests traen TODO con precio, SKU, marca y categorías. Lee la config embebida en una página del sitio
// (appId + apiKey + prefijo de índice — la key puede rotar) y consulta el índice de productos.
// Filtra stock>0 (saltea "NO DISPONIBLE"). cat/sub = 2 niveles de atrás para adelante del árbol de categorías.
// Salida: {slug}-rows.json → [cat, sub, nombre, precio, url, descripcion, marca, sku].
// Uso: node scrape-algolia.js <baseURL> <slug>
const https = require('https')
const fs = require('fs')

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0 Safari/537.36'

function get(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { 'User-Agent': UA }, timeout: 15000 }, (r) => { let d = ''; r.on('data', (c) => (d += c)); r.on('end', () => res(d)) })
      .on('timeout', function () { this.destroy(); rej(new Error('timeout')) })
      .on('error', rej)
  })
}
function algolia(appId, key, index, params) {
  return new Promise((res, rej) => {
    const body = JSON.stringify({ params })
    const req = https.request(`https://${appId}-dsn.algolia.net/1/indexes/${index}/query`, {
      method: 'POST',
      headers: { 'X-Algolia-API-Key': key, 'X-Algolia-Application-Id': appId, 'Content-Type': 'application/json' },
    }, (r) => { let d = ''; r.on('data', (c) => (d += c)); r.on('end', () => { try { res(JSON.parse(d)) } catch (e) { rej(e) } }) })
    req.on('error', rej); req.write(body); req.end()
  })
}

// Config de Algolia embebida en la página (appId, apiKey, prefijo del índice).
async function configAlgolia(base) {
  // probar homepage y una categoría típica de Magento (por si la home no la trae)
  for (const url of [base, base + '/catalog/category/view/', base + '/productos']) {
    let html
    try { html = await get(url) } catch (e) { continue }
    const appId = (html.match(/"applicationId":"([^"]+)"/) || html.match(/"application_id":"([^"]+)"/) || [])[1]
    const key = (html.match(/"apiKey":"([^"]+)"/) || [])[1]
    const prefix = (html.match(/"indexName":"([^"]+)"/) || [])[1]
    if (appId && key && prefix) return { appId, key, index: `${prefix}_products` }
  }
  throw new Error('sin config Algolia en la página')
}

// cat/sub: del nivel de categoría más profundo del hit → los 2 más específicos.
function catSub(categories) {
  let path = []
  for (const lvl of ['level5', 'level4', 'level3', 'level2', 'level1', 'level0']) {
    const arr = categories && categories[lvl]
    if (arr && arr.length) { path = String(arr[0]).split('///').map((s) => s.trim()).filter(Boolean); break }
  }
  return { sub: path[path.length - 1] || '', cat: path[path.length - 2] || '' }
}

async function scrapeAlgolia(baseURL, slug) {
  const base = String(baseURL).replace(/\/+$/, '')
  const { appId, key, index } = await configAlgolia(base)
  console.log(`Algolia ${slug}: índice ${index}`)
  const rows = []
  let page = 0, nbPages = 1, total = 0
  do {
    const j = await algolia(appId, key, index, `query=&hitsPerPage=1000&page=${page}`)
    if (j.message && !j.hits) throw new Error('Algolia: ' + j.message)
    nbPages = j.nbPages || 1
    total = j.nbHits || 0
    for (const h of j.hits || []) {
      const precioObj = h.price?.ARS || (h.price ? Object.values(h.price)[0] : null)
      const precio = precioObj?.default
      const stock = h.stock === undefined ? 1 : Number(h.stock) // si no hay stock en el índice, no filtro
      if (!(precio > 0) || !(stock > 0)) continue // sin precio o sin stock → saltear
      const { cat, sub } = catSub(h.categories)
      const url = h.url || `${base}/catalog/product/view/id/${h.objectID}`
      const marca = h.brand || h.manufacturer || ''
      const precioTxt = precioObj.default_formated || '$' + precio
      rows.push([cat, sub, h.name || '', precioTxt, url, '', marca, h.sku || String(h.objectID || '')])
    }
    page++
  } while (page < nbPages)

  const seen = new Set()
  const uniq = rows.filter((r) => { const k = r[7] || r[4]; if (seen.has(k)) return false; seen.add(k); return true })
  uniq.sort((a, b) => (a[0] + a[1]).localeCompare(b[0] + b[1], 'es') || a[2].localeCompare(b[2], 'es'))
  fs.writeFileSync(`${slug}-rows.json`, JSON.stringify(uniq))
  console.log(`Algolia ${slug}: ✅ ${uniq.length} productos con stock y precio (de ${total} en el índice)`)
  return uniq
}

if (require.main === module) {
  const [base, slug] = process.argv.slice(2)
  if (!base || !slug) { console.error('Uso: node scrape-algolia.js <baseURL> <slug>'); process.exit(1) }
  scrapeAlgolia(base, slug).catch((e) => { console.error('❌', e.message); process.exit(1) })
}

module.exports = { scrapeAlgolia }
