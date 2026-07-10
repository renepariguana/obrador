// Sube a Supabase (tabla materiales) las filas ya scrapeadas de Easy y EMI.
// Reusa los JSON del proyecto Presupuestador. Tagea provincia = Tucumán.
// Uso: node subir.js
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

const URL = process.env.SUPABASE_URL
const KEY = process.env.SUPABASE_SECRET_KEY
if (!URL || !KEY) {
  console.error('Falta SUPABASE_URL o SUPABASE_SECRET_KEY en scraper/.env')
  process.exit(1)
}
const sb = createClient(URL, KEY, { auth: { persistSession: false } })

// Carpeta con los JSON scrapeados del proyecto Presupuestador
const PRES = path.resolve(__dirname, '../../Presupuestador/scrapers')
const PROVINCIA = 'Tucumán'

// Easy: precio es número crudo ("$8450" o "$8450.5" → punto decimal).
// EMI: formato argentino ("$42.307" → punto = miles, coma = decimales).
function parsePrecio(str, fuente) {
  if (str == null) return null
  let t = String(str).replace('$', '').trim()
  if (fuente === 'emi') {
    if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.')
    else t = t.replace(/\./g, '')
  } else {
    t = t.replace(/[^\d.]/g, '')
  }
  const n = parseFloat(t)
  return isNaN(n) ? null : n
}

function filasDe(archivo, fuente) {
  const p = path.join(PRES, archivo)
  if (!fs.existsSync(p)) {
    console.warn('  ⚠️ no existe', p)
    return []
  }
  const data = JSON.parse(fs.readFileSync(p, 'utf8'))
  return data
    .map((r) => {
      const [categoria, subcategoria, nombre, precioStr, url] = r
      const precio = parsePrecio(precioStr, fuente)
      if (!nombre || precio == null || !url) return null
      return { provincia: PROVINCIA, fuente, categoria: categoria || null, subcategoria: subcategoria || null, nombre, precio, url }
    })
    .filter(Boolean)
}

async function main() {
  const todas = [...filasDe('easy-rows.json', 'easy'), ...filasDe('emi-rows.json', 'emi')]
  // dedupe por (fuente,provincia,url) para no chocar el ON CONFLICT dentro del mismo batch
  const seen = new Set()
  const filas = todas.filter((r) => {
    const k = r.fuente + '|' + r.provincia + '|' + r.url
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
  console.log(`Filas: ${todas.length} → únicas: ${filas.length}`)

  const CHUNK = 500
  for (let i = 0; i < filas.length; i += CHUNK) {
    const batch = filas.slice(i, i + CHUNK)
    const { error } = await sb.from('materiales').upsert(batch, { onConflict: 'fuente,provincia,url' })
    if (error) {
      console.error('\n❌ Error en batch', i, '→', error.message)
      process.exit(1)
    }
    process.stdout.write(`  subidas ${Math.min(i + CHUNK, filas.length)}/${filas.length}\r`)
  }
  console.log('\n✅ Listo — materiales subidos a Supabase')
}

main().catch((e) => {
  console.error('❌', e.message)
  process.exit(1)
})
