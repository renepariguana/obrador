// Publica en la Sheet PROVEEDORES (directorio del mapa) dos pestañas de seguimiento:
//   • "Escrapeados": proveedores que YA tienen productos en Supabase (los que alimentan el comparador).
//   • "Lista":       TODOS los proveedores del directorio, sin repetir, con un check ☑ (tildado si ya se scrapeó).
// Re-ejecutable: se actualiza a medida que scrapeamos más. Uso: node publicar.js
require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const { accessToken, getValues, SHEET_ID } = require('./gsheets')

const DIR_SID = '1-Khv4JD9ilcuzJZj_J6sMLaw7aZ1m2u9LZUsZrLnsH0' // directorio (solo lectura)
// Las pestañas Escrapeados/Lista se escriben en la Sheet de Obrador (SHEET_ID de gsheets).
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } })
const colL = (i) => String.fromCharCode(65 + i)
const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()
const KNOWN = { easy: 'easy', emi: 'emi', maderplak: 'maderplak' }
const slugDe = (nombre) => KNOWN[norm(nombre)] || norm(nombre).replace(/&/g, ' y ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

async function api(path, opts) {
  const tok = await accessToken()
  return (await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}${path}`, {
    ...opts, headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json', ...(opts && opts.headers) },
  })).json()
}
async function ensureTab(title) {
  const meta = await api('?fields=sheets(properties(sheetId,title))')
  const found = (meta.sheets || []).find((s) => s.properties.title === title)
  if (found) return found.properties.sheetId
  const r = await api(':batchUpdate', { method: 'POST', body: JSON.stringify({ requests: [{ addSheet: { properties: { title } } }] }) })
  return r.replies[0].addSheet.properties.sheetId
}
async function writeValues(range, values, vio = 'USER_ENTERED') {
  await api(`/values/${encodeURIComponent(range)}?valueInputOption=${vio}`, { method: 'PUT', body: JSON.stringify({ values }) })
}

async function main() {
  // --- proveedores scrapeados (Supabase) ---
  const { data: provs, error } = await sb.from('proveedores').select('id,nombre,slug,url,provincia')
  if (error) throw new Error(error.message)
  const scraped = []
  const scrapedSlugs = new Set()
  for (const p of provs || []) {
    const { count } = await sb.from('materiales').select('*', { count: 'exact', head: true }).eq('proveedor_id', p.id).eq('activo', true)
    if (count > 0) { scraped.push({ ...p, count }); scrapedSlugs.add(norm(p.slug)) }
  }
  scraped.sort((a, b) => b.count - a.count)

  // tipo (plataforma) por slug, de la pestaña Proveedores del comparador
  const provTab = (await getValues('Proveedores!A1:Z100')) || []
  const h = (provTab[0] || []).map((x) => (x || '').trim())
  const si = h.findIndex((x) => /slug/i.test(x)), ti = h.findIndex((x) => /tipo/i.test(x))
  const tipoBySlug = {}
  provTab.slice(1).forEach((r) => { if (si >= 0 && (r[si] || '').trim()) tipoBySlug[(r[si] || '').trim()] = ti >= 0 ? (r[ti] || '').trim() : '' })

  // --- directorio: todos los proveedores, sin repetir ---
  const tok = await accessToken()
  let rows = []
  for (let a = 0; a < 6 && !rows.length; a++) {
    try {
      const dj = await (await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${DIR_SID}/values/Guia!A1:I3000`, { headers: { Authorization: 'Bearer ' + tok } })).json()
      rows = dj.values || []
    } catch (e) { /* red flaky */ }
    if (!rows.length) await new Promise((r) => setTimeout(r, 2500))
  }
  if (!rows.length) throw new Error('no pude leer el directorio PROVEEDORES (red)')
  const dh = rows[0].map((x) => (x || '').trim())
  const pi = dh.findIndex((x) => /proveedor/i.test(x)), vi = dh.findIndex((x) => /provincia/i.test(x)), wi = dh.findIndex((x) => /sitio web/i.test(x))
  const uniq = new Map()
  for (let i = 1; i < rows.length; i++) {
    const nombre = (rows[i][pi] || '').trim(); if (!nombre) continue
    const web = (rows[i][wi] || '').trim(), prov = (rows[i][vi] || '').trim()
    if (!uniq.has(nombre)) uniq.set(nombre, { nombre, provincia: prov, web })
    else if (!uniq.get(nombre).web && web) uniq.get(nombre).web = web
  }
  const todos = [...uniq.values()].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))

  // ===== pestaña "Escrapeados" =====
  await ensureTab('Escrapeados')
  const hoy = new Date().toISOString().slice(0, 10)
  const HE = ['PROVEEDOR', 'PROVINCIA', 'WEB', 'PLATAFORMA', 'PRODUCTOS', 'ACTUALIZADO']
  const vE = [HE, ...scraped.map((r) => [r.nombre, r.provincia || '', r.url || '', tipoBySlug[r.slug] || '', r.count, hoy])]
  const totE = Math.max(vE.length, 50)
  await writeValues(`Escrapeados!A1:${colL(HE.length - 1)}${totE}`, Array.from({ length: totE }, (_, i) => vE[i] || HE.map(() => '')))

  // ===== pestaña "Lista" (todos + check) =====
  const sidLista = await ensureTab('Lista')
  const HL = ['PROVEEDOR', 'PROVINCIA', 'WEB', 'ESCRAPEADO']
  const vL = [HL, ...todos.map((p) => [p.nombre, p.provincia, p.web, scrapedSlugs.has(slugDe(p.nombre))])]
  const totL = Math.max(vL.length, todos.length + 1)
  await writeValues(`Lista!A1:${colL(HL.length - 1)}${totL}`, vL)
  // checkbox en la columna ESCRAPEADO (D)
  await api(':batchUpdate', {
    method: 'POST',
    body: JSON.stringify({
      requests: [{
        setDataValidation: {
          range: { sheetId: sidLista, startRowIndex: 1, endRowIndex: totL, startColumnIndex: 3, endColumnIndex: 4 },
          rule: { condition: { type: 'BOOLEAN' }, showCustomUi: true },
        },
      }],
    }),
  })

  console.log(`✅ "Escrapeados": ${scraped.length} · "Lista": ${todos.length} proveedores únicos (${todos.filter((p) => scrapedSlugs.has(slugDe(p.nombre))).length} tildados)`)
}

main().catch((e) => { console.error('❌', e.message); process.exit(1) })
