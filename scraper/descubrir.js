// AGENTE DIARIO — mantiene UNA sola tabla "Proveedores" (reemplaza Proveedores/Cola/Lista/Escrapeados):
// una fila por proveedor del directorio (Sheet "PROVEEDORES" → pestaña Guia), con web/plataforma/estado/
// productos y un check ☑ (scrapeado). Cada corrida: sincroniza el directorio, marca los ya scrapeados
// (desde Supabase), procesa POR_DIA pendientes con web (detecta VTEX/Algolia/WooCommerce y scrapea),
// registra y sube. Los scrapers viven acá mismo (Obrador autocontenido). Uso: node descubrir.js (launchd diario).
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const https = require('https')
const { execSync } = require('child_process')
const { createClient } = require('@supabase/supabase-js')
const { getValues, updateValues, addSheetIfMissing, accessToken, SHEET_ID } = require('./gsheets')

const DIR_SID = '1-Khv4JD9ilcuzJZj_J6sMLaw7aZ1m2u9LZUsZrLnsH0' // Sheet "PROVEEDORES" (directorio del mapa)
const PRES = __dirname // scrapers locales (Obrador autocontenido)
const TAB = 'Proveedores'
const POR_DIA = Number(process.env.POR_DIA) || 60 // pendientes a procesar por corrida (barre casi todos los con-web)
const COLS = ['PROVEEDOR', 'RUBRO', 'PROVINCIA', 'WEB', 'SLUG', 'TIPO', 'ESTADO', 'PRODUCTOS', 'ULTIMO_SCRAPE', 'ESCRAPEADO']
const IESC = COLS.indexOf('ESCRAPEADO')
const PRESERVAR = ['RUBRO'] // lo carga el usuario, no se pisa
const KNOWN = { easy: 'vtex', emi: 'puppeteer', maderplak: 'algolia' }

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } })
const colL = (i) => String.fromCharCode(65 + i)
const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()
const normUrl = (u) => { u = (u || '').trim(); if (!/^https?:\/\//.test(u)) u = 'https://' + u; return u.replace(/\/+$/, '') }
const tieneWeb = (w) => /\./.test(w || '') && !/@/.test(w || '')
function slugDe(nombre) {
  const k = norm(nombre)
  if (KNOWN[k]) return k
  return k.replace(/&/g, ' y ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'prov'
}

// GET con timeout, sigue redirects, ignora certs SSL rotos, y si el dominio no resuelve prueba con/sin www.
function get(url, ms = 12000, redirects = 4, wwwTried = false) {
  return new Promise((res) => {
    let done = false, body = ''
    const d1 = (v) => { if (!done) { done = true; res(v) } }
    const toggleWww = () => {
      const alt = /^https?:\/\/www\./i.test(url) ? url.replace(/^(https?:\/\/)www\./i, '$1') : url.replace(/^(https?:\/\/)/i, '$1www.')
      return alt !== url ? get(alt, ms, redirects, true) : { err: 'dns' }
    }
    let req
    try {
      req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/120 Safari/537.36', Accept: 'text/html,application/json' }, timeout: ms, rejectUnauthorized: false }, (resp) => {
        if ([301, 302, 303, 307, 308].includes(resp.statusCode) && resp.headers.location && redirects > 0) {
          resp.destroy()
          const loc = /^https?:\/\//.test(resp.headers.location) ? resp.headers.location : new URL(resp.headers.location, url).href
          return d1(loc.startsWith('https') ? get(loc, ms, redirects - 1) : { s: resp.statusCode, b: '' })
        }
        resp.on('data', (c) => { body += c; if (body.length > 120000) { resp.destroy(); d1({ s: resp.statusCode, b: body }) } })
        resp.on('end', () => d1({ s: resp.statusCode, b: body }))
      })
      req.on('timeout', () => { req.destroy(); d1(body ? { s: 0, b: body } : { err: 'timeout' }) })
      req.on('error', (e) => {
        if (!wwwTried && !body && /ENOTFOUND|EAI_AGAIN/.test(e.message)) return d1(toggleWww())
        d1(body ? { s: 0, b: body } : { err: e.message })
      })
      setTimeout(() => { try { req && req.destroy() } catch (e) {} ; d1(body ? { s: 0, b: body } : { err: 'hard' }) }, ms + 2000)
    } catch (e) { d1({ err: e.message }) }
  })
}

// Directorio: TODOS los proveedores (con y sin web), únicos por nombre.
async function directorio() {
  const tok = await accessToken()
  let rows = []
  for (let a = 0; a < 5 && !rows.length; a++) {
    try {
      const j = await (await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${DIR_SID}/values/Guia!A1:J3000`, { headers: { Authorization: 'Bearer ' + tok } })).json()
      rows = j.values || []
    } catch (e) {}
    if (!rows.length) await new Promise((r) => setTimeout(r, 2000))
  }
  if (!rows.length) throw new Error('no pude leer el directorio PROVEEDORES (Guia)')
  const h = rows[0].map((x) => (x || '').trim())
  const pi = h.findIndex((x) => /proveedor/i.test(x)), vi = h.findIndex((x) => /provincia/i.test(x)), wi = h.findIndex((x) => /sitio web/i.test(x))
  const map = new Map()
  for (let i = 1; i < rows.length; i++) {
    const nombre = (rows[i][pi] || '').trim(); if (!nombre) continue
    const web = (rows[i][wi] || '').trim(), prov = (rows[i][vi] || '').trim()
    if (!map.has(nombre)) map.set(nombre, { nombre, provincia: prov, web })
    else if (!map.get(nombre).web && web) map.get(nombre).web = web
  }
  return [...map.values()]
}

// Proveedores ya scrapeados (Supabase): normSlug -> { count, url, nombre, slug }
async function scrapeados() {
  const { data: provs } = await sb.from('proveedores').select('id,slug,nombre,url')
  const map = new Map()
  for (const p of provs || []) {
    const { count } = await sb.from('materiales').select('*', { count: 'exact', head: true }).eq('proveedor_id', p.id).eq('activo', true)
    if (count > 0) map.set(norm(p.slug), { count, url: p.url || '', nombre: p.nombre, slug: p.slug })
  }
  return map
}

async function leerTabla() {
  await addSheetIfMissing(TAB)
  const rows = (await getValues(`${TAB}!A1:Z3000`)) || []
  const tabla = new Map(), order = []
  if (!rows.length || !(rows[0] || []).length) return { tabla, order }
  const header = rows[0].map((x) => (x || '').trim().toUpperCase())
  const at = (c, r) => { const i = header.indexOf(c); return i >= 0 ? r[i] : '' }
  // alias URL->WEB, PLATAFORMA->TIPO por si venía del formato viejo
  const web = (r) => at('WEB', r) || at('URL', r) || ''
  const tipo = (r) => at('TIPO', r) || at('PLATAFORMA', r) || ''
  for (const r of rows.slice(1)) {
    const nombre = (at('PROVEEDOR', r) || at('NOMBRE', r) || '').trim()
    if (!nombre) continue
    tabla.set(nombre, {
      PROVEEDOR: nombre, RUBRO: (at('RUBRO', r) || '').trim(), PROVINCIA: (at('PROVINCIA', r) || '').trim(),
      WEB: (web(r) || '').trim(), SLUG: (at('SLUG', r) || '').trim(), TIPO: (tipo(r) || '').trim(),
      ESTADO: (at('ESTADO', r) || '').trim(), PRODUCTOS: at('PRODUCTOS', r) || '', ULTIMO_SCRAPE: (at('ULTIMO_SCRAPE', r) || at('ULTIMO', r) || '').trim(),
      ESCRAPEADO: at('ESCRAPEADO', r) === true || String(at('ESCRAPEADO', r)).toUpperCase() === 'TRUE',
    })
    order.push(nombre)
  }
  return { tabla, order }
}

async function guardarTabla(order, tabla) {
  const filas = order.map((n) => COLS.map((c) => tabla.get(n)[c]))
  const values = [COLS, ...filas]
  const total = Math.max(values.length, 2000)
  const out = Array.from({ length: total }, (_, i) => values[i] || COLS.map((c, j) => (j === IESC ? false : '')))
  await updateValues(`${TAB}!A1:${colL(COLS.length - 1)}${total}`, out, 'USER_ENTERED')
  // checkbox en la columna ESCRAPEADO
  const tok = await accessToken()
  const meta = await (await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=sheets(properties(sheetId,title))`, { headers: { Authorization: 'Bearer ' + tok } })).json()
  const sid = (meta.sheets.find((s) => s.properties.title === TAB) || {}).properties.sheetId
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
    method: 'POST', headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' },
    body: JSON.stringify({ requests: [
      { setDataValidation: { range: { sheetId: sid, startRowIndex: 1, endRowIndex: total, startColumnIndex: 0, endColumnIndex: IESC } } }, // limpia desplegables viejos de A..I
      { setDataValidation: { range: { sheetId: sid, startRowIndex: 1, endRowIndex: total, startColumnIndex: IESC, endColumnIndex: IESC + 1 }, rule: { condition: { type: 'BOOLEAN' }, showCustomUi: true } } },
      { setBasicFilter: { filter: { range: { sheetId: sid, startRowIndex: 0, endRowIndex: total, startColumnIndex: 0, endColumnIndex: COLS.length } } } },
    ] }),
  })
}

// Detecta plataforma: 'vtex' | 'algolia' | 'woo' | 'otro' | 'caido'.
async function detectar(base) {
  const vt = await get(base + '/api/catalog_system/pub/category/tree/1')
  if (typeof vt.b === 'string' && vt.b.trim().startsWith('[')) return 'vtex'
  const pg = await get(base)
  if (pg.err) return 'caido'
  if (/algoliaConfig|algolianet|algolia\.net/i.test(pg.b || '')) return 'algolia'
  for (const p of ['/wp-json/wc/store/v1/products?per_page=1', '/wp-json/wc/store/products?per_page=1']) {
    const w = await get(base + p, 10000)
    if (typeof w.b === 'string' && w.b.trim().startsWith('[') && /price/.test(w.b)) return 'woo'
  }
  return 'otro'
}

// Alta en Supabase (tabla proveedores) de los nuevos scrapeados.
async function registrar(nuevos) {
  await sb.from('proveedores').upsert(
    nuevos.map((c) => ({ nombre: c.PROVEEDOR, slug: c.SLUG, url: normUrl(c.WEB), provincia: c.PROVINCIA || 'Tucumán' })),
    { onConflict: 'slug' },
  )
}

async function main() {
  const dir = await directorio()
  const scrap = await scrapeados()
  const { tabla, order } = await leerTabla()

  // sincronizar TODOS los proveedores del directorio
  for (const p of dir) {
    if (!tabla.has(p.nombre)) {
      tabla.set(p.nombre, {
        PROVEEDOR: p.nombre, RUBRO: '', PROVINCIA: p.provincia, WEB: p.web, SLUG: slugDe(p.nombre),
        TIPO: '', ESTADO: tieneWeb(p.web) ? 'pendiente' : 'sin-web', PRODUCTOS: '', ULTIMO_SCRAPE: '', ESCRAPEADO: false,
      })
      order.push(p.nombre)
    } else {
      const c = tabla.get(p.nombre)
      if (p.web && c.WEB !== p.web) c.WEB = p.web
      if (!c.SLUG) c.SLUG = slugDe(p.nombre)
      if (!c.PROVINCIA) c.PROVINCIA = p.provincia
      if (!c.ESTADO) c.ESTADO = tieneWeb(c.WEB) ? 'pendiente' : 'sin-web'
    }
  }

  // marcar los ya scrapeados (Supabase) — agrega los que no estén en el directorio (ej. Easy)
  for (const [k, info] of scrap) {
    let row = [...tabla.values()].find((c) => norm(c.SLUG) === k)
    if (!row) {
      row = { PROVEEDOR: info.nombre, RUBRO: '', PROVINCIA: '', WEB: info.url, SLUG: info.slug, TIPO: '', ESTADO: '', PRODUCTOS: '', ULTIMO_SCRAPE: '', ESCRAPEADO: false }
      tabla.set(info.nombre, row); order.push(info.nombre)
    }
    row.ESCRAPEADO = true; row.ESTADO = 'scrapeado'; row.PRODUCTOS = info.count
    if (!row.WEB) row.WEB = info.url
    if (!row.TIPO) row.TIPO = KNOWN[k] || row.TIPO
  }

  // batch del día: con web, pendiente/caido, no scrapeado
  const pend = order.map((n) => tabla.get(n)).filter((c) => tieneWeb(c.WEB) && ['pendiente', 'caido', 'caído'].includes((c.ESTADO || '').toLowerCase()) && !c.ESCRAPEADO)
  // PRIORIDAD: Tucumán primero (la app es de Tucumán); dentro, las nuevas (pendiente) antes que los caídos.
  const pri = (c) => (norm(c.PROVINCIA) === 'tucuman' ? 0 : 2) + (/^pendiente$/i.test(c.ESTADO) ? 0 : 1)
  pend.sort((a, b) => pri(a) - pri(b))
  const batch = pend.slice(0, POR_DIA)
  console.log(`Tabla: ${order.length} proveedores | pendientes con web: ${pend.length} | proceso hoy: ${batch.length}`)
  const hoy = new Date().toISOString().slice(0, 10)
  const nuevos = []

  for (const c of batch) {
    const base = normUrl(c.WEB)
    process.stdout.write(`\n▶ ${c.PROVEEDOR} (${base}) … `)
    const plat = await detectar(base)
    c.ULTIMO_SCRAPE = hoy
    if (plat === 'caido') { c.ESTADO = 'caido'; process.stdout.write('caído (reintenta)'); continue }
    c.TIPO = plat
    if (plat === 'otro') { c.ESTADO = 'necesita-modulo'; process.stdout.write('necesita módulo'); continue }
    const cmd = plat === 'vtex' ? `node scrape-vtex.js "${base}" "${c.SLUG}"`
      : plat === 'algolia' ? `node scrape-algolia.js "${base}" "${c.SLUG}"`
      : `node scrape-woo.js "${base}" "${c.SLUG}"`
    let ok = true
    try { execSync(cmd, { cwd: PRES, stdio: 'ignore', timeout: 300000 }) } catch (e) { ok = false }
    let n = 0
    try { n = JSON.parse(fs.readFileSync(path.join(PRES, `${c.SLUG}-rows.json`), 'utf8')).length } catch (e) {}
    if (!n) { c.ESTADO = ok ? 'sin-catalogo' : 'error'; process.stdout.write(ok ? 'sin catálogo' : 'error'); continue }
    c.ESTADO = 'scrapeado'; c.PRODUCTOS = n; c.ESCRAPEADO = true; nuevos.push(c)
    process.stdout.write(`✅ ${n} productos (${plat})`)
  }
  console.log('')

  if (nuevos.length) await registrar(nuevos)
  await guardarTabla(order, tabla)

  if (nuevos.length) {
    console.log('\n▶ Subiendo a Supabase…'); execSync('node subir.js', { cwd: __dirname, stdio: 'inherit' })
    console.log('\n▶ Actualizando el Sheet…'); execSync('node revisar.js', { cwd: __dirname, stdio: 'inherit' })
  }
  console.log(`\n✅ Día: ${nuevos.length} proveedor(es) nuevo(s) scrapeado(s). Pendientes con web restantes: ${Math.max(0, pend.length - batch.length)}.`)
}

main().catch((e) => { console.error('❌', e.message); process.exit(1) })
