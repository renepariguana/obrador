// Scraper para tiendas sobre la plataforma "Weyop" (custom PHP, ej. Santiago Kohn, B.P. Soluciones).
// Los productos NO salen por API ni sitemap útil, pero cada tarjeta del catálogo trae el JSON completo
// en el atributo data-producto="{...}" (HTML-encoded). Paginamos /catalogo?page=N hasta vaciar.
// Cada JSON: nombre, sku, marca, precios.precio_venta, stock, categoria/rubro/subrubro, url, fotos.
// Salida: {slug}-rows.json → [cat, sub, nombre, precio, url, descripcion, marca, sku].
// Uso: node scrape-weyop.js <baseURL> <slug>
const https = require('https')
const fs = require('fs')

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'

function get(url, ms = 25000) {
  return new Promise((res, rej) => {
    let done = false
    const fin = (fn) => { if (!done) { done = true; fn() } }
    let req
    try {
      req = https.get(url, { headers: { 'User-Agent': UA }, timeout: ms, rejectUnauthorized: false }, (r) => {
        if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) { r.resume(); return fin(() => res(get(new URL(r.headers.location, url).href, ms))) }
        const chunks = []
        r.on('data', (c) => chunks.push(c))
        r.on('end', () => fin(() => res(Buffer.concat(chunks).toString('latin1')))) // el sitio es ISO-8859-1
      })
    } catch (e) { return fin(() => rej(e)) }
    req.on('timeout', () => { req.destroy(); fin(() => rej(new Error('timeout'))) })
    req.on('error', (e) => fin(() => rej(e)))
  })
}

// Decodifica el JSON HTML-encoded del atributo data-producto.
function decodeAttr(s) {
  return s
    .replace(/&quot;/g, '"').replace(/&#0?34;/g, '"')
    .replace(/&#0?39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => { try { return String.fromCodePoint(+n) } catch (e) { return _ } })
    .replace(/&amp;/g, '&')
}

// Precio en formato argentino: "43.355" = 43355 (dot=miles); "39.019,50" = 39019.50 (coma=decimal).
function parseAR(v) {
  let s = String(v == null ? '' : v).trim()
  if (!s) return 0
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.')
  else s = s.replace(/\./g, '')
  const n = parseFloat(s.replace(/[^\d.]/g, ''))
  return isNaN(n) ? 0 : n
}

function productosDe(html) {
  const out = []
  for (const m of html.matchAll(/data-producto="([^"]*)"/g)) {
    let j
    try { j = JSON.parse(decodeAttr(m[1])) } catch (e) { continue }
    const pr = j.precios || {}
    // precio_venta = precio estándar (precio_con_descuento es de socio/contado; no lo usamos)
    const precio = parseAR(pr.precio_venta) || parseAR(pr.precio_lista)
    const cat = (j.rubro && j.rubro.nombre) || (j.categoria && j.categoria.nombre) || ''
    const sub = (j.subrubro && j.subrubro.nombre) || ''
    const fotoRaw = Array.isArray(j.fotos) && j.fotos[0] ? j.fotos[0].imagen_file || j.fotos[0].imagen || '' : ''
    const img = fotoRaw ? encodeURI(fotoRaw) : '' // encodear espacios/acentos del path (si no, no carga en la app)
    out.push([cat, sub, (j.nombre || '').trim(), '$' + precio, j.url || '', '', j.marca || '', j.sku || String(j.id || ''), img])
  }
  return out
}

async function scrapeWeyop(baseURL, slug) {
  const base = String(baseURL).replace(/\/+$/, '')
  const rows = []
  const seen = new Set()
  let page = 1, vacias = 0
  for (; page <= 600; page++) {
    let html
    try { html = await get(`${base}/catalogo?page=${page}`) } catch (e) { vacias++; if (vacias >= 3) break; continue }
    const prods = productosDe(html)
    if (!prods.length) break // primera página sin productos = fin
    let nuevos = 0
    for (const r of prods) { const k = r[7] || r[4]; if (k && seen.has(k)) continue; if (k) seen.add(k); rows.push(r); nuevos++ }
    process.stdout.write(`  pág ${page}: ${rows.length} productos\r`)
    if (nuevos === 0 && page > 2) break // sin productos nuevos → probablemente repite
  }
  const conPrecio = rows.filter((r) => r[3] !== '$0').length
  fs.writeFileSync(`${slug}-rows.json`, JSON.stringify(rows))
  console.log(`\nWeyop ${slug}: ✅ ${rows.length} productos (${conPrecio} con precio) — ${page - 1} páginas`)
  return rows
}

if (require.main === module) {
  const [base, slug] = process.argv.slice(2)
  if (!base || !slug) { console.error('Uso: node scrape-weyop.js <baseURL> <slug>'); process.exit(1) }
  scrapeWeyop(base, slug).catch((e) => { console.error('❌', e.message); process.exit(1) })
}

module.exports = { scrapeWeyop }
