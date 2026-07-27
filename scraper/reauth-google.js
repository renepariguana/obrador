// Re-autoriza Google (Sheets) y guarda un token fresco en Obrador (scraper autocontenido).
// Levanta un server local, imprime el link, captura el callback y guarda token.json.
const fs = require('fs')
const path = require('path')
const http = require('http')
const { google } = require('googleapis')

const PRES = __dirname // Obrador/scraper — token.json y client_secret.json locales
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
const PORT = 3456

const secret = JSON.parse(fs.readFileSync(path.join(PRES, 'client_secret.json')))
const c = secret.installed || secret.web
const redirect = `http://localhost:${PORT}`
const oauth = new google.auth.OAuth2(c.client_id, c.client_secret, redirect)

const authUrl = oauth.generateAuthUrl({ access_type: 'offline', prompt: 'consent', scope: SCOPES })
console.log('AUTH_URL: ' + authUrl)

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, redirect)
  const code = u.searchParams.get('code')
  if (!code) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Esperando autorización…')
    return
  }
  try {
    const { tokens } = await oauth.getToken(code)
    fs.writeFileSync(path.join(PRES, 'token.json'), JSON.stringify(tokens, null, 2))
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('✅ Autorizado. Ya podés cerrar esta pestaña y volver a la app.')
    console.log('TOKEN_SAVED refresh=' + !!tokens.refresh_token)
    setTimeout(() => process.exit(0), 800)
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Error: ' + e.message)
    console.error('ERR ' + e.message)
    setTimeout(() => process.exit(1), 800)
  }
})
server.listen(PORT, () => console.log('listening ' + PORT))
