// Scrapea el logo de cada proveedor desde su sitio y lo guarda:
//   · en el Sheet OBRADOR, columna MARCA (fuente de verdad, editable a mano)
//   · en proveedores.logo_url de Supabase (lo que muestra la app)
// Prioridad: apple-touch-icon > icon grande > og:image > <img> con "logo" > favicon de Google.
// No pisa una celda MARCA que ya tenga algo (respeta overrides manuales).
// Uso: node scrape-logos.js            (todos)
//      node scrape-logos.js --force    (re-scrapea aunque la celda ya tenga valor)
require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const { getValues, updateValues } = require('./gsheets')

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } })
const FORCE = process.argv.includes('--force')
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

const colLetter = (i) => String.fromCharCode(65 + i)
const isRenderable = (u) => {
  if (!u) return false
  const l = u.toLowerCase().split('?')[0]
  return !l.endsWith('.svg') && !l.endsWith('.ico') // RN Image no renderiza SVG ni ICO
}
const abs = (href, base) => {
  try {
    return new URL(href, base).href
  } catch {
    return null
  }
}

async function fetchHtml(url) {
  const ctrl = new AbortController()
  const to = setTimeout(() => ctrl.abort(), 12000)
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html,*/*' }, signal: ctrl.signal, redirect: 'follow' })
    if (!r.ok) return ''
    return await r.text()
  } catch {
    return ''
  } finally {
    clearTimeout(to)
  }
}

function attr(tag, name) {
  const m = tag.match(new RegExp(name + '\\s*=\\s*["\']([^"\']+)["\']', 'i'))
  return m ? m[1] : null
}

function pickLogo(html, base) {
  const links = (html.match(/<link\b[^>]*>/gi) || [])
  const sized = (filter) =>
    links
      .filter(filter)
      .map((t) => ({ href: attr(t, 'href'), size: parseInt((attr(t, 'sizes') || '0').split('x')[0]) || 0 }))
      .filter((x) => x.href)
      .sort((a, b) => b.size - a.size)

  // 1) apple-touch-icon (el más grande)
  for (const a of sized((t) => /rel\s*=\s*["'][^"']*apple-touch-icon/i.test(t))) {
    const u = abs(a.href, base)
    if (isRenderable(u)) return u
  }
  // 2) <link rel="icon"> (el más grande, png)
  for (const ic of sized((t) => /rel\s*=\s*["'][^"']*icon/i.test(t) && !/apple-touch/i.test(t))) {
    const u = abs(ic.href, base)
    if (isRenderable(u)) return u
  }
  // 3) og:image / twitter:image
  const og =
    html.match(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:image|twitter:image)["']/i)
  if (og) {
    const u = abs(og[1], base)
    if (isRenderable(u)) return u
  }
  // 4) <img> con "logo" en src/alt/class
  for (const t of html.match(/<img\b[^>]*>/gi) || []) {
    if (/logo/i.test(t)) {
      const u = abs(attr(t, 'src') || attr(t, 'data-src'), base)
      if (isRenderable(u)) return u
    }
  }
  return null
}

function faviconService(base) {
  try {
    return `https://www.google.com/s2/favicons?domain=${new URL(base).hostname}&sz=128`
  } catch {
    return null
  }
}

async function logoDe(url) {
  const html = await fetchHtml(url)
  return (html && pickLogo(html, url)) || faviconService(url)
}

async function scrapeLogos() {
  // slug → url desde Supabase
  const { data: provs } = await sb.from('proveedores').select('slug,url')
  const urlDe = new Map((provs || []).map((p) => [p.slug, p.url]))

  // Sheet: alinear filas y ubicar columnas
  const rows = (await getValues('Proveedores!A1:Z3000')) || []
  const h = rows[0].map((x) => (x || '').trim())
  const iSlug = h.findIndex((x) => /slug/i.test(x))
  let iMarca = h.findIndex((x) => /marca/i.test(x))
  if (iMarca === -1) {
    iMarca = h.length
    await updateValues(`Proveedores!${colLetter(iMarca)}1`, [['MARCA']])
    console.log('Creé la columna MARCA en el Sheet')
  }

  // Valor actual de MARCA por slug (primera celda no vacía) → para no re-scrapear lo ya cargado
  const slugs = [...new Set(rows.slice(1).map((r) => ((r || [])[iSlug] || '').trim()).filter(Boolean))]
  const actualDe = new Map()
  for (let i = 1; i < rows.length; i++) {
    const s = ((rows[i] || [])[iSlug] || '').trim()
    const v = String((rows[i] || [])[iMarca] || '').trim()
    if (s && v && !actualDe.get(s)) actualDe.set(s, v)
  }

  // Scrapear solo los que faltan (o todos si --force)
  const logoDeSlug = new Map()
  for (const slug of slugs) {
    if (!FORCE && actualDe.get(slug)) continue
    const url = urlDe.get(slug)
    if (!url) { console.log(`· ${slug.padEnd(20)} sin url`); continue }
    const logo = await logoDe(url)
    logoDeSlug.set(slug, logo || '')
    console.log(`· ${slug.padEnd(20)} ${logo ? '✓ ' + logo.slice(0, 60) : '✗ sin logo'}`)
  }

  // Armar la columna MARCA alineada a las filas (respeta valores ya cargados salvo --force)
  const columna = []
  const efectivo = new Map() // slug → valor final (para Supabase)
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i] || []
    const slug = (r[iSlug] || '').trim()
    const actual = String(r[iMarca] || '').trim()
    let val = actual
    if (slug && (FORCE || !actual)) val = logoDeSlug.get(slug) ?? actual
    columna.push([val])
    if (slug) efectivo.set(slug, val)
  }
  if (columna.length) {
    await updateValues(`Proveedores!${colLetter(iMarca)}2:${colLetter(iMarca)}${rows.length}`, columna)
  }

  // Empujar a Supabase solo los proveedores reales (los que están en la tabla), no las 1300+ filas
  // del directorio de la Guía que no tienen registro en `proveedores`.
  let ok = 0
  for (const [slug, val] of efectivo) {
    if (!urlDe.has(slug)) continue
    const { error } = await sb.from('proveedores').update({ logo_url: val || null }).eq('slug', slug)
    if (!error && val) ok++
  }
  console.log(`✅ Logos: ${ok}/${urlDe.size} proveedores con logo (Sheet + Supabase)`)
}

if (require.main === module) {
  scrapeLogos().catch((e) => { console.error('❌', e.message); process.exit(1) })
}

module.exports = { logoDe, scrapeLogos }
