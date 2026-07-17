// Scraper GENÉRICO para tiendas VTEX (Easy, corralones, etc.). Con solo la URL base saca todo el
// catálogo: recorre el árbol de categorías y baja los productos de cada hoja (VTEX limita el offset a 2500,
// por eso va por categoría). Salida: {slug}-rows.json con [cat, sub, nombre, precio, url, descripcion, marca, sku].
// cat/sub = 2 niveles de atrás para adelante (el rubro/nivel más alto se ignora: va por proveedor).
// Uso: node scrape-vtex.js <baseURL> <slug> [rootCatId]
const https = require('https')
const fs = require('fs')

const PAGE = 50
const RELEV = /dimensi|largo|ancho|alto|espesor|peso|contenido|volumen|capacidad|medida|presentaci|unidad|rendimiento|cantidad|formato/i

function fetchJson(url) {
  return new Promise((res, rej) => {
    https
      .get(url, { headers: { Accept: 'application/json', 'User-Agent': 'Mozilla/5.0' } }, (r) => {
        let d = ''
        r.on('data', (c) => (d += c))
        r.on('end', () => { try { res(JSON.parse(d)) } catch (e) { rej(e) } })
      })
      .on('error', rej)
  })
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function fila(base, p) {
  const precio = p.items?.[0]?.sellers?.[0]?.commertialOffer?.Price
  const nombre = p.productName || ''
  if (!nombre || !precio) return null
  const link = base + '/' + (p.linkText || '') + '/p'
  const partes = (p.categories?.[0] || '').split('/').filter(Boolean)
  const sub = partes[partes.length - 1] || ''
  const cat = partes[partes.length - 2] || ''
  const specs = (p.allSpecifications || [])
    .filter((s) => RELEV.test(s))
    .map((s) => `${s}: ${[].concat(p[s] || []).join(', ')}`)
    .join(' · ')
  const um = p.items?.[0]?.measurementUnit
  const mult = p.items?.[0]?.unitMultiplier
  const umTxt = um && um !== 'un' ? ` · UM: ${mult || 1} ${um}` : ''
  const sku = String(p.productReference || p.items?.[0]?.itemId || p.productId || '')
  return [cat, sub, nombre, '$' + precio, link, (specs + umTxt).trim(), p.brand || '', sku]
}

// IDs de las categorías HOJA del árbol (products/search por hoja no pasa el límite de 2500).
async function categoriasHoja(base, rootCatId) {
  const tree = await fetchJson(`${base}/api/catalog_system/pub/category/tree/50`)
  const hojas = []
  const walk = (nodes) => (nodes || []).forEach((n) => (n.children && n.children.length ? walk(n.children) : hojas.push(n.id)))
  if (rootCatId) {
    const find = (nodes) => { for (const n of nodes || []) { if (String(n.id) === String(rootCatId)) return n; const r = find(n.children); if (r) return r } return null }
    const root = find(tree)
    walk(root ? [root] : [])
  } else {
    walk(tree)
  }
  return hojas
}

async function scrapeVtex(baseURL, slug, rootCatId) {
  const base = baseURL.replace(/\/+$/, '')
  console.log(`VTEX ${slug}: leyendo árbol de categorías…`)
  const hojas = await categoriasHoja(base, rootCatId)
  console.log(`VTEX ${slug}: ${hojas.length} categorías hoja`)
  const seen = new Set()
  const rows = []
  for (const id of hojas) {
    for (let from = 0; from < 2500; from += PAGE) {
      let data
      try {
        data = await fetchJson(`${base}/api/catalog_system/pub/products/search?fq=C:${id}&_from=${from}&_to=${from + PAGE - 1}`)
      } catch (e) { break }
      if (!Array.isArray(data) || !data.length) break
      data.forEach((p) => {
        if (seen.has(p.productId)) return
        seen.add(p.productId)
        const f = fila(base, p)
        if (f) rows.push(f)
      })
      process.stdout.write(`  ${rows.length} productos\r`)
      if (data.length < PAGE) break
      await sleep(120)
    }
  }
  rows.sort((a, b) => (a[0] + a[1]).localeCompare(b[0] + b[1], 'es') || a[2].localeCompare(b[2], 'es'))
  fs.writeFileSync(`${slug}-rows.json`, JSON.stringify(rows))
  console.log(`VTEX ${slug}: ✅ ${rows.length} productos guardados en ${slug}-rows.json`)
  return rows
}

if (require.main === module) {
  const [base, slug, root] = process.argv.slice(2)
  if (!base || !slug) { console.error('Uso: node scrape-vtex.js <baseURL> <slug> [rootCatId]'); process.exit(1) }
  scrapeVtex(base, slug, root).catch((e) => { console.error('❌', e.message); process.exit(1) })
}

module.exports = { scrapeVtex }
