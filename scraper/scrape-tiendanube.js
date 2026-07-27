// Scraper GENÉRICO para tiendas Tiendanube (Nuvemshop).
// No hay API pública sin auth, pero cada página de producto trae el precio en JSON-LD:
//   <script type="application/ld+json"> → WebPage.mainEntity (@type Product) → offers.price (moneda),
//   y breadcrumb → categoría / subcategoría. La imagen sale de Product.image.
// Flujo: sitemap.xml (sigue índices) → URLs /productos/{slug}/ → fetch cada una → parse JSON-LD.
// Solo toma precios en ARS (saltea otra moneda para no mezclar). precio 0 = "consultar" (entra igual).
// Salida: {slug}-rows.json → [cat, sub, nombre, precio, url, descripcion, marca, sku].
// Uso: node scrape-tiendanube.js <baseURL> <slug>
const https = require('https')
const fs = require('fs')

const UA = 'Mozilla/5.0 (Macintosh) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'

function get(url, ms = 20000) {
  return new Promise((res, rej) => {
    let done = false
    const fin = (fn) => { if (!done) { done = true; fn() } }
    let req
    try {
      req = https.get(url, { headers: { 'User-Agent': UA, Accept: 'text/html,application/xml' }, timeout: ms, rejectUnauthorized: false }, (r) => {
        if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
          r.resume()
          return fin(() => res(get(new URL(r.headers.location, url).href, ms)))
        }
        let d = ''
        r.on('data', (c) => (d += c))
        r.on('end', () => fin(() => res(d)))
      })
    } catch (e) {
      return fin(() => rej(e))
    }
    req.on('timeout', () => { req.destroy(); fin(() => rej(new Error('timeout'))) })
    req.on('error', (e) => fin(() => rej(e)))
  })
}

// Entidades HTML → texto (los nombres a veces vienen con &amp; &#8211; etc.).
function decodeEntities(s) {
  if (!s) return s
  return String(s)
    .replace(/&#(\d+);/g, (_, n) => { try { return String.fromCodePoint(+n) } catch (e) { return _ } })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => { try { return String.fromCodePoint(parseInt(h, 16)) } catch (e) { return _ } })
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ')
    .replace(/&apos;/g, "'").replace(/&amp;/g, '&')
}

// Junta todas las URLs de producto del sitemap (siguiendo sub-sitemaps / índices).
async function urlsProducto(base) {
  const vistos = new Set()
  const productos = new Set()
  const cola = [base + '/sitemap.xml']
  while (cola.length) {
    const sm = cola.shift()
    if (vistos.has(sm)) continue
    vistos.add(sm)
    let xml
    try { xml = await get(sm) } catch (e) { continue }
    const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1])
    for (const u of locs) {
      if (/sitemap[^/]*\.xml$/i.test(u)) cola.push(u)
      else if (/\/productos\/[^/]+\/?$/i.test(u)) productos.add(u.replace(/\/+$/, '') + '/')
    }
  }
  return [...productos]
}

// De la página de producto saca el Product del JSON-LD (directo o en WebPage.mainEntity) + breadcrumb.
function parseProducto(html, url) {
  const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1])
  let prod = null
  let bc = null
  for (const b of blocks) {
    let j
    try { j = JSON.parse(b) } catch (e) { continue }
    for (const o of Array.isArray(j) ? j : [j]) {
      if (o && o['@type'] === 'Product') prod = o
      else if (o && o.mainEntity && o.mainEntity['@type'] === 'Product') { prod = o.mainEntity; if (o.breadcrumb) bc = o.breadcrumb }
      if (o && o['@type'] === 'BreadcrumbList') bc = o
    }
  }
  if (!prod) return null
  const off = Array.isArray(prod.offers) ? prod.offers[0] : prod.offers
  const nombre = decodeEntities(prod.name)
  // cat/sub del breadcrumb, excluyendo "Inicio" y el propio producto.
  const niveles = ((bc && bc.itemListElement) || [])
    .map((x) => decodeEntities(x.name))
    .filter(Boolean)
    .filter((n) => n.toLowerCase() !== 'inicio' && n !== nombre)
  let cat = '', sub = ''
  if (niveles.length === 1) cat = niveles[0]
  else if (niveles.length >= 2) { sub = niveles[niveles.length - 1]; cat = niveles[niveles.length - 2] }
  return {
    cat,
    sub,
    nombre,
    precio: off && off.price != null ? Number(off.price) : 0,
    moneda: (off && off.priceCurrency) || 'ARS',
    url,
    sku: prod.sku || prod.mpn || '',
    img: Array.isArray(prod.image) ? prod.image[0] : prod.image || '',
  }
}

// Corre fn sobre items con concurrencia limitada.
async function pool(items, n, fn) {
  const out = []
  let i = 0
  const worker = async () => { while (i < items.length) { const k = i++; out[k] = await fn(items[k], k) } }
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, worker))
  return out
}

async function scrapeTiendanube(baseURL, slug) {
  const base = String(baseURL).replace(/\/+$/, '')
  const urls = await urlsProducto(base)
  console.log(`Tiendanube ${slug}: ${urls.length} productos en el sitemap`)
  if (!urls.length) throw new Error('no encontré /productos/ en el sitemap (¿es Tiendanube?)')
  let hechos = 0, otraMoneda = 0
  const parsed = await pool(urls, 6, async (u) => {
    let html
    try { html = await get(u) } catch (e) { return null }
    const p = parseProducto(html, u)
    if (++hechos % 20 === 0) process.stdout.write(`  ${hechos}/${urls.length}\r`)
    return p
  })
  const rows = []
  const seen = new Set()
  for (const p of parsed) {
    if (!p || !p.nombre || seen.has(p.url)) continue
    if (p.moneda && p.moneda !== 'ARS') { otraMoneda++; continue } // no pesos → saltear
    seen.add(p.url)
    rows.push([p.cat, p.sub, p.nombre, '$' + (p.precio || 0), p.url, '', '', p.sku, p.img || ''])
  }
  rows.sort((a, b) => (a[0] + a[1]).localeCompare(b[0] + b[1], 'es') || a[2].localeCompare(b[2], 'es'))
  fs.writeFileSync(`${slug}-rows.json`, JSON.stringify(rows))
  console.log(`Tiendanube ${slug}: ✅ ${rows.length} productos${otraMoneda ? ` (${otraMoneda} en otra moneda, salteados)` : ''}`)
  return rows
}

if (require.main === module) {
  const [base, slug] = process.argv.slice(2)
  if (!base || !slug) { console.error('Uso: node scrape-tiendanube.js <baseURL> <slug>'); process.exit(1) }
  scrapeTiendanube(base, slug).catch((e) => { console.error('❌', e.message); process.exit(1) })
}

module.exports = { scrapeTiendanube }
