// Helper mínimo para Google Sheets con fetch nativo (evita googleapis, que cuelga en node v26).
const fs = require('fs'); const path = require('path')
const PRES = '/Users/renepariguana/Desktop/Proyectos/Presupuestador/scrapers'
const SHEET_ID = '1GMIAwUPl3Rq7OMjg3mBNPhuKjQ4HzIp3xOsnVMCBg0M'

async function accessToken() {
  const t = JSON.parse(fs.readFileSync(path.join(PRES, 'token.json')))
  if (t.access_token && t.expiry_date && t.expiry_date > Date.now() + 60000) return t.access_token
  const s = JSON.parse(fs.readFileSync(path.join(PRES, 'client_secret.json')))
  const c = s.installed || s.web
  const body = new URLSearchParams({
    client_id: c.client_id, client_secret: c.client_secret,
    refresh_token: t.refresh_token, grant_type: 'refresh_token',
  })
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', body })
  const j = await r.json()
  if (!j.access_token) throw new Error('refresh fallo: ' + JSON.stringify(j))
  t.access_token = j.access_token
  t.expiry_date = Date.now() + (j.expires_in - 30) * 1000
  fs.writeFileSync(path.join(PRES, 'token.json'), JSON.stringify(t, null, 2))
  return j.access_token
}
async function getValues(range) {
  const tok = await accessToken()
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}`
  const r = await fetch(url, { headers: { Authorization: 'Bearer ' + tok } })
  const j = await r.json()
  if (j.error) throw new Error('get fallo: ' + j.error.message)
  return j.values || []
}
async function updateValues(range, values, vio = 'RAW') {
  const tok = await accessToken()
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}?valueInputOption=${vio}`
  const r = await fetch(url, { method: 'PUT', headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' }, body: JSON.stringify({ values }) })
  const j = await r.json()
  if (j.error) throw new Error('update fallo: ' + j.error.message)
  return j
}
async function addSheetIfMissing(title) {
  const tok = await accessToken()
  const meta = await (await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}`, { headers: { Authorization: 'Bearer ' + tok } })).json()
  if (meta.error) throw new Error(meta.error.message)
  if (meta.sheets.some((s) => s.properties.title === title)) return false
  const r = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
    method: 'POST', headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' },
    body: JSON.stringify({ requests: [{ addSheet: { properties: { title } } }] }),
  })
  const j = await r.json()
  if (j.error) throw new Error(j.error.message)
  return true
}
module.exports = { accessToken, getValues, updateValues, addSheetIfMissing, SHEET_ID }
