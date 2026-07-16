const fs = require('fs'); const path = require('path'); const { google } = require('googleapis')
const SHEET_ID = '1GMIAwUPl3Rq7OMjg3mBNPhuKjQ4HzIp3xOsnVMCBg0M'
const PRES = path.resolve('/Users/renepariguana/Desktop/Proyectos/Presupuestador/scrapers')
function auth(){ const s=JSON.parse(fs.readFileSync(path.join(PRES,'client_secret.json'))); const c=s.installed||s.web; const a=new google.auth.OAuth2(c.client_id,c.client_secret,(c.redirect_uris&&c.redirect_uris[0])||'http://localhost'); a.setCredentials(JSON.parse(fs.readFileSync(path.join(PRES,'token.json')))); return a }
;(async()=>{
  const sheets=google.sheets({version:'v4',auth:auth()})
  const r=await sheets.spreadsheets.values.get({spreadsheetId:SHEET_ID, range:'Categorías!A1:C500'})
  const rows=r.data.values||[]
  const data=rows.slice(1)
  const mapeadas=data.filter(x=>(x[1]||'').trim())
  console.log('Total subcategorías:', data.length)
  console.log('Mapeadas (con categoría):', mapeadas.length)
  const cats={}; mapeadas.forEach(x=>{const c=x[1].trim(); cats[c]=(cats[c]||0)+1})
  console.log('Categorías distintas usadas:', Object.keys(cats).length)
  console.log(Object.entries(cats).sort((a,b)=>b[1]-a[1]).map(([c,n])=>`  ${c} (${n})`).join('\n'))
  console.log('--- primeras 15 sin mapear ---')
  console.log(data.filter(x=>!(x[1]||'').trim()).slice(0,15).map(x=>`  ${x[0]} (${x[2]})`).join('\n'))
})().catch(e=>{console.error('ERR', e.message); process.exit(1)})
