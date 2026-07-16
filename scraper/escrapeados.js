// Escribe/actualiza una pestaña "Escrapeados" en la Sheet PROVEEDORES (el directorio del mapa) con los
// proveedores que YA tienen productos scrapeados en Supabase (los que alimentan el comparador).
// Uso: node escrapeados.js
require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const { accessToken, getValues } = require('./gsheets')

const DIR_SID = '1-Khv4JD9ilcuzJZj_J6sMLaw7aZ1m2u9LZUsZrLnsH0' // Sheet "PROVEEDORES" (directorio del mapa)
const TAB = 'Escrapeados'
const HEADER = ['PROVEEDOR', 'PROVINCIA', 'WEB', 'PLATAFORMA', 'PRODUCTOS', 'ACTUALIZADO']
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } })
const colL = (i) => String.fromCharCode(65 + i)

async function main() {
  // 1) proveedores + cantidad de materiales activos por proveedor
  const { data: provs, error } = await sb.from('proveedores').select('id,nombre,slug,url,provincia')
  if (error) throw new Error(error.message)
  const rows = []
  for (const p of provs || []) {
    const { count } = await sb.from('materiales').select('*', { count: 'exact', head: true }).eq('proveedor_id', p.id).eq('activo', true)
    if (count > 0) rows.push({ ...p, count })
  }
  rows.sort((a, b) => b.count - a.count)

  // plataforma (tipo) desde la pestaña Proveedores del comparador
  const provTab = (await getValues('Proveedores!A1:Z100')) || []
  const h = (provTab[0] || []).map((x) => (x || '').trim())
  const si = h.findIndex((x) => /slug/i.test(x)), ti = h.findIndex((x) => /tipo/i.test(x))
  const tipoBySlug = {}
  provTab.slice(1).forEach((r) => { if (si >= 0 && (r[si] || '').trim()) tipoBySlug[(r[si] || '').trim()] = ti >= 0 ? (r[ti] || '').trim() : '' })

  // 2) crear pestaña si no existe + escribir
  const tok = await accessToken()
  const meta = await (await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${DIR_SID}?fields=sheets(properties(title))`, { headers: { Authorization: 'Bearer ' + tok } })).json()
  if (!meta.sheets.some((s) => s.properties.title === TAB)) {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${DIR_SID}:batchUpdate`, {
      method: 'POST', headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests: [{ addSheet: { properties: { title: TAB } } }] }),
    })
  }
  const hoy = new Date().toISOString().slice(0, 10)
  const values = [HEADER, ...rows.map((r) => [r.nombre, r.provincia || '', r.url || '', tipoBySlug[r.slug] || '', r.count, hoy])]
  const total = Math.max(values.length, 50)
  const out = Array.from({ length: total }, (_, i) => values[i] || HEADER.map(() => ''))
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${DIR_SID}/values/${encodeURIComponent(`${TAB}!A1:${colL(HEADER.length - 1)}${total}`)}?valueInputOption=RAW`, {
    method: 'PUT', headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' }, body: JSON.stringify({ values: out }),
  })
  console.log(`✅ Pestaña "${TAB}" en PROVEEDORES: ${rows.length} proveedor(es) scrapeado(s)`)
  rows.forEach((r) => console.log(`  ${r.nombre}: ${r.count} productos (${tipoBySlug[r.slug] || '?'})`))
}

main().catch((e) => { console.error('❌', e.message); process.exit(1) })
