// AGENTE DIARIO DE DESCUBRIMIENTO — recorre la lista PROVEEDORES (directorio del mapa) de a tandas y va
// sumando proveedores scrapeables al comparador, hasta cubrirlos a todos.
// Cada corrida: 1) sincroniza los proveedores con web a una pestaña de control "Cola"; 2) toma los próximos
// POR_DIA pendientes; 3) detecta plataforma (VTEX / Algolia / módulo conocido); 4) scrapea los soportados,
// los registra (Proveedores + Supabase) y sube; 5) marca el estado de cada uno.
// Uso: node descubrir.js   (o automático por launchd, diario)
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const https = require('https')
const { execSync } = require('child_process')
const { createClient } = require('@supabase/supabase-js')
const { getValues, updateValues, addSheetIfMissing, accessToken } = require('./gsheets')

const DIR_SID = '1-Khv4JD9ilcuzJZj_J6sMLaw7aZ1m2u9LZUsZrLnsH0' // Sheet "PROVEEDORES" (directorio del mapa)
const PRES = path.resolve(__dirname, '../../Presupuestador/scrapers')
const COLA = 'Cola'
const POR_DIA = 10
const COLS = ['PROVEEDOR', 'PROVINCIA', 'WEB', 'SLUG', 'PLATAFORMA', 'ESTADO', 'ULTIMO_SCRAPE', 'PRODUCTOS', 'NOTA']
const KNOWN = { easy: 'vtex', emi: 'puppeteer', maderplak: 'algolia' } // ya soportados

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } })
const colL = (i) => String.fromCharCode(65 + i)
const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()
const normUrl = (u) => { u = (u || '').trim(); if (!/^https?:\/\//.test(u)) u = 'https://' + u; return u.replace(/\/+$/, '') }
function slugDe(nombre) {
  const k = norm(nombre)
  if (KNOWN[k]) return k // easy / emi / maderplak
  return norm(nombre).replace(/&/g, ' y ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'prov'
}

// GET con timeout, sigue redirects y devuelve el body parcial si el sitio es lento (para detectar plataforma).
function get(url, ms = 12000, redirects = 4) {
  return new Promise((res) => {
    let done = false, body = ''
    const d1 = (v) => { if (!done) { done = true; res(v) } }
    let req
    try {
      req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/120 Safari/537.36', Accept: 'text/html,application/json' }, timeout: ms }, (resp) => {
        if ([301, 302, 303, 307, 308].includes(resp.statusCode) && resp.headers.location && redirects > 0) {
          resp.destroy()
          const loc = /^https?:\/\//.test(resp.headers.location) ? resp.headers.location : new URL(resp.headers.location, url).href
          return d1(loc.startsWith('https') ? get(loc, ms, redirects - 1) : { s: resp.statusCode, b: '' })
        }
        resp.on('data', (c) => { body += c; if (body.length > 120000) { resp.destroy(); d1({ s: resp.statusCode, b: body }) } })
        resp.on('end', () => d1({ s: resp.statusCode, b: body }))
      })
      req.on('timeout', () => { req.destroy(); d1(body ? { s: 0, b: body } : { err: 'timeout' }) })
      req.on('error', (e) => d1(body ? { s: 0, b: body } : { err: e.message }))
      setTimeout(() => { try { req && req.destroy() } catch (e) {} ; d1(body ? { s: 0, b: body } : { err: 'hard' }) }, ms + 2000)
    } catch (e) { d1({ err: e.message }) }
  })
}

// Directorio de proveedores con web (únicos por nombre).
async function directorio() {
  const tok = await accessToken()
  let rows = []
  for (let a = 0; a < 3 && !rows.length; a++) {
    try {
      const j = await (await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${DIR_SID}/values/Hoja1!A1:J3000`, { headers: { Authorization: 'Bearer ' + tok } })).json()
      rows = j.values || []
    } catch (e) { await new Promise((r) => setTimeout(r, 1500)) }
  }
  if (!rows.length) throw new Error('no pude leer el directorio PROVEEDORES')
  const h = rows[0].map((x) => (x || '').trim())
  const pi = h.findIndex((x) => /proveedor/i.test(x)), vi = h.findIndex((x) => /provincia/i.test(x)), wi = h.findIndex((x) => /sitio web/i.test(x))
  const map = new Map()
  for (let i = 1; i < rows.length; i++) {
    const nombre = (rows[i][pi] || '').trim(); if (!nombre) continue
    const web = (rows[i][wi] || '').trim(), prov = (rows[i][vi] || '').trim()
    if (!map.has(nombre)) map.set(nombre, { nombre, provincia: prov, web })
    else if (!map.get(nombre).web && web) map.get(nombre).web = web
  }
  return [...map.values()].filter((p) => /\./.test(p.web) && !/@/.test(p.web)) // solo con web tipo URL
}

// Lee la Cola como Map<nombre, obj> + orden.
async function leerCola() {
  await addSheetIfMissing(COLA)
  const rows = (await getValues(`${COLA}!A1:Z3000`)) || []
  const cola = new Map(), order = []
  if (!rows.length || !(rows[0] || []).length) return { cola, order }
  const header = rows[0].map((x) => (x || '').trim().toUpperCase())
  const idx = {}; COLS.forEach((c) => (idx[c] = header.indexOf(c)))
  for (const r of rows.slice(1)) {
    const nombre = (idx.PROVEEDOR >= 0 ? r[idx.PROVEEDOR] : '') || ''
    if (!nombre.trim()) continue
    const o = {}; COLS.forEach((c) => (o[c] = (idx[c] >= 0 ? r[idx[c]] : '') || ''))
    cola.set(nombre.trim(), o); order.push(nombre.trim())
  }
  return { cola, order }
}
async function guardarCola(order, cola) {
  const out = [COLS, ...order.map((n) => COLS.map((c) => cola.get(n)[c] ?? ''))]
  const total = Math.max(out.length, 2000)
  const filas = Array.from({ length: total }, (_, i) => out[i] || COLS.map(() => ''))
  await updateValues(`${COLA}!A1:${colL(COLS.length - 1)}${total}`, filas)
}

// Detecta la plataforma de una web: 'vtex' | 'algolia' | 'otro' | 'caido'.
async function detectar(base) {
  const vt = await get(base + '/api/catalog_system/pub/category/tree/1', 12000)
  if (typeof vt.b === 'string' && vt.b.trim().startsWith('[')) return 'vtex'
  const pg = await get(base, 12000)
  if (pg.err) return 'caido'
  if (/algoliaConfig|algolianet|algolia\.net/i.test(pg.b || '')) return 'algolia'
  return 'otro'
}

// Registra un proveedor scrapeado en Supabase (proveedores) y en la pestaña Proveedores del comparador.
async function registrar(nuevos) {
  // Supabase proveedores
  await sb.from('proveedores').upsert(
    nuevos.map((c) => ({ nombre: c.PROVEEDOR, slug: c.SLUG, url: normUrl(c.WEB), provincia: c.PROVINCIA || 'Tucumán' })),
    { onConflict: 'slug' },
  )
  // pestaña Proveedores (agrega los que falten)
  const rows = (await getValues('Proveedores!A1:Z200')) || []
  const header = rows[0].map((h) => (h || '').trim())
  const ci = (re) => header.findIndex((h) => re.test(h))
  const iNom = ci(/nombre|proveedor/i), iUrl = ci(/url/i), iSlug = ci(/slug/i), iTipo = ci(/tipo/i), iAct = ci(/^activo$/i), iProv = ci(/provincia/i)
  const existentes = new Set(rows.slice(1).map((r) => (iSlug >= 0 ? (r[iSlug] || '').trim() : '')))
  const nuevasFilas = []
  for (const c of nuevos) {
    if (existentes.has(c.SLUG)) continue
    const fila = header.map(() => '')
    if (iNom >= 0) fila[iNom] = c.PROVEEDOR
    if (iUrl >= 0) fila[iUrl] = normUrl(c.WEB)
    if (iSlug >= 0) fila[iSlug] = c.SLUG
    if (iTipo >= 0) fila[iTipo] = c.PLATAFORMA
    if (iAct >= 0) fila[iAct] = 'ACTIVO'
    if (iProv >= 0) fila[iProv] = c.PROVINCIA || 'Tucumán'
    nuevasFilas.push(fila)
  }
  if (nuevasFilas.length) {
    const start = rows.length + 1
    await updateValues(`Proveedores!A${start}:${colL(header.length - 1)}${start + nuevasFilas.length - 1}`, nuevasFilas)
  }
}

async function main() {
  const dir = await directorio()
  const { cola, order } = await leerCola()

  // sincronizar nuevos proveedores con web a la cola
  for (const p of dir) {
    if (!cola.has(p.nombre)) {
      const slug = slugDe(p.nombre)
      const known = KNOWN[slug]
      cola.set(p.nombre, {
        PROVEEDOR: p.nombre, PROVINCIA: p.provincia, WEB: p.web, SLUG: slug,
        PLATAFORMA: known || '', ESTADO: known ? 'scrapeado' : 'pendiente',
        ULTIMO_SCRAPE: '', PRODUCTOS: '', NOTA: known ? 'ya soportado' : '',
      })
      order.push(p.nombre)
    } else {
      const c = cola.get(p.nombre)
      if (p.web && c.WEB !== p.web) c.WEB = p.web
      if (!c.SLUG) c.SLUG = slugDe(p.nombre)
    }
  }

  const pendientes = order.map((n) => cola.get(n)).filter((c) => ['pendiente', 'caido', 'caído'].includes((c.ESTADO || '').toLowerCase()))
  const batch = pendientes.slice(0, POR_DIA)
  console.log(`Cola: ${order.length} con web | pendientes: ${pendientes.length} | proceso hoy: ${batch.length}`)
  const hoy = new Date().toISOString().slice(0, 10)
  const nuevos = []

  for (const c of batch) {
    const base = normUrl(c.WEB)
    process.stdout.write(`\n▶ ${c.PROVEEDOR} (${base}) … `)
    const plat = await detectar(base)
    c.PLATAFORMA = plat === 'caido' ? c.PLATAFORMA : plat
    c.ULTIMO_SCRAPE = hoy
    if (plat === 'caido') { c.ESTADO = 'caido'; c.NOTA = 'no respondió'; process.stdout.write('caído (reintenta)'); continue }
    if (plat === 'otro') { c.ESTADO = 'necesita-modulo'; c.NOTA = 'plataforma no soportada'; process.stdout.write('necesita módulo'); continue }
    // scrapear (VTEX o Algolia)
    const cmd = plat === 'vtex' ? `node scrape-vtex.js "${base}" "${c.SLUG}"` : `node scrape-algolia.js "${base}" "${c.SLUG}"`
    let ok = true
    try { execSync(cmd, { cwd: PRES, stdio: 'ignore', timeout: 300000 }) } catch (e) { ok = false }
    let n = 0
    try { n = JSON.parse(fs.readFileSync(path.join(PRES, `${c.SLUG}-rows.json`), 'utf8')).length } catch (e) {}
    if (!ok && !n) { c.ESTADO = 'error'; c.NOTA = 'falló el scrape'; process.stdout.write('error'); continue }
    if (!n) { c.ESTADO = 'sin-catalogo'; c.NOTA = '0 productos con precio/stock'; process.stdout.write('sin catálogo'); continue }
    c.ESTADO = 'scrapeado'; c.PRODUCTOS = n; c.NOTA = ''; nuevos.push(c)
    process.stdout.write(`✅ ${n} productos (${plat})`)
  }
  console.log('')

  if (nuevos.length) await registrar(nuevos)
  await guardarCola(order, cola)

  if (nuevos.length) {
    console.log('\n▶ Subiendo a Supabase…'); execSync('node subir.js', { cwd: __dirname, stdio: 'inherit' })
    console.log('\n▶ Actualizando el Sheet…'); execSync('node revisar.js', { cwd: __dirname, stdio: 'inherit' })
  }
  console.log(`\n✅ Descubrimiento del día: ${nuevos.length} proveedor(es) nuevo(s) scrapeado(s). Pendientes restantes: ${Math.max(0, pendientes.length - batch.length)}.`)
}

main().catch((e) => { console.error('❌', e.message); process.exit(1) })
