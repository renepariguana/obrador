// Sincroniza el Google Sheet "Manos a la Obra" → Supabase.
// Pestaña "Proveedores" → tabla proveedores. Reusa la auth OAuth del Presupuestador.
// Uso: node sync-sheet.js
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { google } = require('googleapis')
const { createClient } = require('@supabase/supabase-js')

const SHEET_ID = '1GMIAwUPl3Rq7OMjg3mBNPhuKjQ4HzIp3xOsnVMCBg0M'
const PRES = path.resolve(__dirname, '../../Presupuestador/scrapers')

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
})

function authGoogle() {
  const secret = JSON.parse(fs.readFileSync(path.join(PRES, 'client_secret.json')))
  const creds = secret.installed || secret.web
  const redirect = (creds.redirect_uris && creds.redirect_uris[0]) || 'http://localhost:3000'
  const auth = new google.auth.OAuth2(creds.client_id, creds.client_secret, redirect)
  auth.setCredentials(JSON.parse(fs.readFileSync(path.join(PRES, 'token.json'))))
  return auth
}

// Lee una pestaña como array de objetos (usa la fila 1 como encabezados).
async function leerPestana(sheets, pestana) {
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: `${pestana}!A1:Z` })
  const rows = res.data.values || []
  if (rows.length < 2) return []
  const head = rows[0].map((h) => String(h).trim().toLowerCase())
  return rows.slice(1).map((r) => {
    const o = {}
    head.forEach((h, i) => (o[h] = (r[i] != null ? String(r[i]) : '').trim()))
    return o
  })
}

async function main() {
  const sheets = google.sheets({ version: 'v4', auth: authGoogle() })

  // ----- Proveedores -----
  const provs = await leerPestana(sheets, 'Proveedores')
  const filas = provs
    .filter((p) => p.slug && (p.activo || 'SI').toUpperCase() !== 'NO')
    .map((p) => ({
      nombre: p.nombre,
      slug: p.slug,
      url: p.url || null,
      provincia: p.provincia || null,
    }))
  console.log(`Proveedores en el Sheet: ${filas.length}`)
  if (filas.length) {
    const { error } = await sb.from('proveedores').upsert(filas, { onConflict: 'slug' })
    if (error) {
      console.error('❌ proveedores:', error.message)
      process.exit(1)
    }
  }

  console.log('✅ Sync listo (Proveedores → Supabase)')
}

main().catch((e) => {
  console.error('❌', e.message)
  process.exit(1)
})
