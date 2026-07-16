const fs=require('fs'),path=require('path')
console.error('1 start')
const {google}=require('googleapis')
console.error('2 googleapis loaded')
const SHEET_ID='1GMIAwUPl3Rq7OMjg3mBNPhuKjQ4HzIp3xOsnVMCBg0M'
const PRES='/Users/renepariguana/Desktop/Proyectos/Presupuestador/scrapers'
const s=JSON.parse(fs.readFileSync(path.join(PRES,'client_secret.json')))
const c=s.installed||s.web
console.error('3 secret ok, client_id ends', String(c.client_id).slice(-12))
const tok=JSON.parse(fs.readFileSync(path.join(PRES,'token.json')))
console.error('4 token keys', Object.keys(tok).join(','), 'expiry', tok.expiry_date, 'now', Date.now())
const a=new google.auth.OAuth2(c.client_id,c.client_secret,(c.redirect_uris&&c.redirect_uris[0])||'http://localhost')
a.setCredentials(tok)
console.error('5 auth set, calling sheets...')
;(async()=>{
  const sheets=google.sheets({version:'v4',auth:a})
  console.error('6 client built')
  const r=await sheets.spreadsheets.values.get({spreadsheetId:SHEET_ID,range:'Categorías!A1:C5'})
  console.error('7 got response')
  console.log(JSON.stringify(r.data.values))
})().catch(e=>{console.error('ERR', e.code||'', e.message)})
