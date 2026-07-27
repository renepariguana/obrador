// Scraper GENÉRICO para tiendas WooCommerce (WordPress). Usa la Store API pública (sin auth):
//   {base}/wp-json/wc/store/v1/products  → productos con nombre, sku, precio, stock y categorías.
// Filtra precio>0 y en stock. cat/sub del array de categorías del producto (2 más específicas).
// Salida: {slug}-rows.json → [cat, sub, nombre, precio, url, descripcion, marca, sku].
// Uso: node scrape-woo.js <baseURL> <slug>
const https = require('https')
const fs = require('fs')

const UA = 'Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/120 Safari/537.36'

function getJson(url, ms = 15000) {
  return new Promise((res, rej) => {
    const r = https.get(url, { headers: { 'User-Agent': UA, Accept: 'application/json' }, timeout: ms, rejectUnauthorized: false }, (resp) => {
      let d = ''
      resp.on('data', (c) => (d += c))
      resp.on('end', () => { try { res({ body: JSON.parse(d), headers: resp.headers, status: resp.statusCode }) } catch (e) { rej(new Error('json ' + resp.statusCode)) } })
    })
    r.on('timeout', () => { r.destroy(); rej(new Error('timeout')) })
    r.on('error', rej)
  })
}

// Endpoint de la Store API (v1 nueva o legacy).
async function endpoint(base) {
  for (const path of ['/wp-json/wc/store/v1/products', '/wp-json/wc/store/products']) {
    try {
      const r = await getJson(`${base}${path}?per_page=1`)
      if (Array.isArray(r.body)) return base + path
    } catch (e) {}
  }
  throw new Error('sin Store API de WooCommerce')
}

// WooCommerce devuelve nombres con entidades HTML (&#8211; = –, &#215; = ×, &amp; = &…).
// Las decodificamos para que el nombre quede limpio en el Sheet y en Supabase.
function decodeEntities(s) {
  if (!s) return s
  return String(s)
    .replace(/&#(\d+);/g, (_, n) => { try { return String.fromCodePoint(+n) } catch (e) { return _ } })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => { try { return String.fromCodePoint(parseInt(h, 16)) } catch (e) { return _ } })
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ')
    .replace(/&apos;/g, "'").replace(/&amp;/g, '&')
}

function catSub(categories) {
  const names = (categories || []).map((c) => decodeEntities(c.name)).filter(Boolean)
  // 1 sola categoría → es la principal (no la sub), si no quedaría sin categoría y no aparece en la app.
  if (names.length <= 1) return { cat: names[0] || '', sub: '' }
  return { sub: names[names.length - 1], cat: names[names.length - 2] }
}

async function scrapeWoo(baseURL, slug) {
  const base = String(baseURL).replace(/\/+$/, '')
  const ep = await endpoint(base)
  console.log(`Woo ${slug}: ${ep}`)
  const rows = []
  let page = 1, totalPages = 1
  do {
    let r
    try { r = await getJson(`${ep}?per_page=100&page=${page}`) } catch (e) { break }
    if (!Array.isArray(r.body) || !r.body.length) break
    totalPages = parseInt(r.headers['x-wp-totalpages'] || '1', 10) || 1
    for (const p of r.body) {
      const pr = p.prices || {}
      const minor = Number(pr.currency_minor_unit ?? 2)
      let precio = pr.price != null && pr.price !== '' ? Number(pr.price) / Math.pow(10, minor) : 0
      if (precio <= 1) precio = 0 // $1/$0 = placeholder de "consultar" (ej. premoldeados que cotizan)
      if (p.is_in_stock === false) continue // sin stock → saltear (los SIN precio sí entran, con precio 0 = "consultar")
      const { cat, sub } = catSub(p.categories)
      const img = Array.isArray(p.images) && p.images[0] ? p.images[0].src || '' : ''
      rows.push([cat, sub, decodeEntities(p.name || ''), '$' + precio, p.permalink || `${base}/?p=${p.id}`, '', '', p.sku || String(p.id || ''), img])
    }
    process.stdout.write(`  ${rows.length} productos\r`)
    page++
  } while (page <= totalPages)

  const seen = new Set()
  const uniq = rows.filter((r) => { const k = r[7] || r[4]; if (seen.has(k)) return false; seen.add(k); return true })
  uniq.sort((a, b) => (a[0] + a[1]).localeCompare(b[0] + b[1], 'es') || a[2].localeCompare(b[2], 'es'))
  fs.writeFileSync(`${slug}-rows.json`, JSON.stringify(uniq))
  console.log(`Woo ${slug}: ✅ ${uniq.length} productos con precio y stock`)
  return uniq
}

if (require.main === module) {
  const [base, slug] = process.argv.slice(2)
  if (!base || !slug) { console.error('Uso: node scrape-woo.js <baseURL> <slug>'); process.exit(1) }
  scrapeWoo(base, slug).catch((e) => { console.error('❌', e.message); process.exit(1) })
}

module.exports = { scrapeWoo }
