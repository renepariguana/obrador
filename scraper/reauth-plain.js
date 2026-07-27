// Re-autoriza Google (Sheets) sin googleapis: server local que captura el ?code=,
// lo canjea por tokens (https plano) y guarda token.json local (Obrador/scraper).
const fs = require('fs')
const http = require('http')
const https = require('https')

const c = JSON.parse(fs.readFileSync(__dirname + '/client_secret.json')).installed
const PORT = 3456
const redirect = 'http://localhost:' + PORT

const server = http.createServer((req, res) => {
  const u = new URL(req.url, redirect)
  const code = u.searchParams.get('code')
  if (!code) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Esperando autorización…')
    return
  }
  const body = new URLSearchParams({
    code,
    client_id: c.client_id,
    client_secret: c.client_secret,
    redirect_uri: redirect,
    grant_type: 'authorization_code',
  }).toString()
  const r = https.request(
    'https://oauth2.googleapis.com/token',
    { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) } },
    (resp) => {
      let d = ''
      resp.on('data', (x) => (d += x))
      resp.on('end', () => {
        try {
          const t = JSON.parse(d)
          if (t.error) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
            res.end('Error: ' + t.error + ' ' + (t.error_description || ''))
            console.error('ERR ' + d)
            setTimeout(() => process.exit(1), 500)
            return
          }
          t.expiry_date = Date.now() + (t.expires_in || 3600) * 1000
          fs.writeFileSync(__dirname + '/token.json', JSON.stringify(t, null, 2))
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
          res.end('✅ Autorizado. Ya podés cerrar esta pestaña.')
          console.log('TOKEN_SAVED refresh=' + !!t.refresh_token)
          setTimeout(() => process.exit(0), 600)
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
          res.end('parse: ' + e.message)
          console.error('parse ' + d)
          setTimeout(() => process.exit(1), 500)
        }
      })
    },
  )
  r.on('error', (e) => {
    res.end('req err ' + e.message)
    console.error(e.message)
  })
  r.write(body)
  r.end()
})
server.listen(PORT, () => console.log('listening ' + PORT))
