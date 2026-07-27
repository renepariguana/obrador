// Scraper para tiendas Weyop en su versión NUEVA (Next.js/RSC, ej. B.P. Soluciones) que NO renderiza
// data-producto en el HTML: los productos vienen de la API tokened /wxpanel/frontClient/rest/v2/productos/{id}.
// Flujo: capturar el Bearer token (Puppeteer, de una request real) → IDs del sitemap → API por producto.
// Cada producto: nombre, precios.precio_venta (formato AR), categoria/rubro/subrubro.nombre, sku, marca, stock.
// Salida: {slug}-rows.json → [cat, sub, nombre, precio, url, descripcion, marca, sku]. precio 0 = "consultar".
// Uso: node scrape-weyop-api.js <baseURL> <slug> <company_id>
const https = require('https')
const fs = require('fs')
const puppeteer = require('./node_modules/puppeteer')

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36'

function getRaw(url, headers = {}, ms = 20000) {
  return new Promise((res, rej) => {
    let done = false
    const fin = (fn) => { if (!done) { done = true; fn() } }
    let req
    try {
      req = https.get(url, { headers: { 'User-Agent': UA, ...headers }, timeout: ms, rejectUnauthorized: false }, (r) => {
        if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) { r.resume(); return fin(() => res(getRaw(new URL(r.headers.location, url).href, headers, ms))) }
        const ch = []
        r.on('data', (c) => ch.push(c))
        r.on('end', () => fin(() => res({ status: r.statusCode, body: Buffer.concat(ch).toString('utf8') })))
      })
    } catch (e) { return fin(() => rej(e)) }
    req.on('timeout', () => { req.destroy(); fin(() => rej(new Error('timeout'))) })
    req.on('error', (e) => fin(() => rej(e)))
  })
}

function parseAR(v) {
  let s = String(v == null ? '' : v).trim()
  if (!s) return 0
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.')
  else s = s.replace(/\./g, '')
  const n = parseFloat(s.replace(/[^\d.]/g, ''))
  return isNaN(n) || n <= 1 ? 0 : n // <=1 = placeholder → consultar
}

// Captura el Bearer token que el frontend manda a la API (cargando la home en un browser real).
async function capturarToken(base) {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
  try {
    const page = await browser.newPage()
    await page.setUserAgent(UA)
    let token = null
    page.on('request', (r) => {
      if (token) return
      if (/rest\/v2\//.test(r.url())) {
        const a = r.headers().authorization || r.headers().Authorization
        if (a && /Bearer/i.test(a)) token = a.replace(/^Bearer\s+/i, '')
      }
    })
    await page.goto(base + '/catalogo', { waitUntil: 'networkidle2', timeout: 55000 }).catch(() => {})
    for (let i = 0; i < 20 && !token; i++) await new Promise((r) => setTimeout(r, 500))
    return token
  } finally { await browser.close() }
}

function getProd(j) {
  if (!j) return null
  const d = j.data !== undefined ? j.data : j
  if (d && d.nombre) return d
  if (d && typeof d === 'object') for (const v of Object.values(d)) if (v && v.nombre) return v
  return null
}

async function pool(items, n, fn) {
  let i = 0
  const out = []
  const w = async () => { while (i < items.length) { const k = i++; out[k] = await fn(items[k], k) } }
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, w))
  return out
}

async function scrapeWeyopApi(baseURL, slug, companyId) {
  const base = String(baseURL).replace(/\/+$/, '')
  console.log('Capturando token…')
  const token = await capturarToken(base)
  if (!token) throw new Error('no pude capturar el token del frontend')
  console.log('token ok. Leyendo sitemap…')
  const sm = await getRaw(base + '/sitemap.xml')
  const ids = [...new Set([...sm.body.matchAll(/\/producto\/(\d+)\//g)].map((m) => m[1]))]
  console.log(`${ids.length} productos. Bajando…`)
  const H = { Authorization: 'Bearer ' + token, Accept: 'application/json' }
  let hechos = 0
  const rows = []
  const seen = new Set()
  await pool(ids, 8, async (id) => {
    let r
    try { r = await getRaw(`${base}/wxpanel/frontClient/rest/v2/productos/${id}?company_id=${companyId}`, H, 18000) } catch (e) { return }
    if (++hechos % 100 === 0) process.stdout.write(`  ${hechos}/${ids.length} (${rows.length})\r`)
    if (!r || r.status !== 200) return
    let j
    try { j = JSON.parse(r.body) } catch (e) { return }
    const p = getProd(j)
    if (!p || !p.nombre || seen.has(id)) return
    seen.add(id)
    const pr = p.precios || {}
    const precio = parseAR(pr.precio_venta) || parseAR(pr.precio_lista)
    const cat = (p.rubro && p.rubro.nombre) || (p.categoria && p.categoria.nombre) || ''
    const sub = (p.subrubro && p.subrubro.nombre) || ''
    const marca = p.marca && p.marca.nombre ? p.marca.nombre : ''
    const url = p.url || `${base}/producto/${id}`
    const fotoRaw = Array.isArray(p.fotos) && p.fotos[0] ? p.fotos[0].imagen_file || p.fotos[0].imagen || '' : ''
    const img = fotoRaw ? encodeURI(fotoRaw) : '' // encodear espacios/acentos del path (si no, no carga en la app)
    rows.push([cat, sub, String(p.nombre).trim(), '$' + precio, url, '', marca, p.sku || String(id), img])
  })
  const conPrecio = rows.filter((r) => r[3] !== '$0').length
  fs.writeFileSync(`${slug}-rows.json`, JSON.stringify(rows))
  console.log(`\nWeyop-API ${slug}: ✅ ${rows.length} productos (${conPrecio} con precio)`)
  return rows
}

if (require.main === module) {
  const [base, slug, cid] = process.argv.slice(2)
  if (!base || !slug || !cid) { console.error('Uso: node scrape-weyop-api.js <baseURL> <slug> <company_id>'); process.exit(1) }
  scrapeWeyopApi(base, slug, cid).catch((e) => { console.error('❌', e.message); process.exit(1) })
}

module.exports = { scrapeWeyopApi }
