// Crea/actualiza la pestaña "Categorías" del Sheet con todas las subcategorías
// (primera palabra) para que René las mapee a una categoría.
// Uso: node armar-categorias.js
const fs = require('fs')
const path = require('path')
const { google } = require('googleapis')

const SHEET_ID = '1GMIAwUPl3Rq7OMjg3mBNPhuKjQ4HzIp3xOsnVMCBg0M'
const PESTANA = 'Categorías'
const PRES = path.resolve(__dirname, '../../Presupuestador/scrapers')

function primeraPalabra(nombre) {
  let w = (nombre || '').trim().split(/\s+/)[0] || ''
  w = w.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z]/g, '')
  if (!w) return null
  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
}

function authGoogle() {
  const secret = JSON.parse(fs.readFileSync(path.join(PRES, 'client_secret.json')))
  const c = secret.installed || secret.web
  const auth = new google.auth.OAuth2(c.client_id, c.client_secret, (c.redirect_uris && c.redirect_uris[0]) || 'http://localhost')
  auth.setCredentials(JSON.parse(fs.readFileSync(path.join(PRES, 'token.json'))))
  return auth
}

function subcategorias() {
  const cnt = {}
  for (const f of ['easy-rows.json', 'emi-rows.json']) {
    const p = path.join(PRES, f)
    if (!fs.existsSync(p)) continue
    JSON.parse(fs.readFileSync(p, 'utf8')).forEach((r) => {
      const sub = primeraPalabra(r[2])
      if (sub) cnt[sub] = (cnt[sub] || 0) + 1
    })
  }
  return Object.entries(cnt).sort((a, b) => b[1] - a[1]) // por cantidad desc
}

async function main() {
  const sheets = google.sheets({ version: 'v4', auth: authGoogle() })

  // ¿existe la pestaña?
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID })
  const existe = meta.data.sheets.some((s) => s.properties.title === PESTANA)
  if (!existe) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: { requests: [{ addSheet: { properties: { title: PESTANA } } }] },
    })
    console.log('Pestaña "Categorías" creada')
  } else {
    console.log('Pestaña "Categorías" ya existía — la actualizo')
  }

  const subs = subcategorias()
  const values = [['subcategoria', 'categoria', 'cantidad'], ...subs.map(([s, n]) => [s, '', n])]
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${PESTANA}!A1`,
    valueInputOption: 'RAW',
    requestBody: { values },
  })
  console.log(`✅ ${subs.length} subcategorías cargadas en la pestaña "Categorías"`)
}

main().catch((e) => {
  console.error('❌', e.message)
  process.exit(1)
})
