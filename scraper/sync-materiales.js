// SYNC pestaña "Materiales" (Manos a la Obra) → Supabase.
// Sube la clasificación que completaste (categoría/subcategoría/unidad/marca) a cada producto.
// Solo sincroniza las filas que ya tienen CATEGORIA (las clasificadas). Match por nombre.
// Uso: node sync-materiales.js
require('dotenv').config()
const { getValues } = require('./gsheets')

const SUPA = process.env.SUPABASE_URL
const SECRET = process.env.SUPABASE_SECRET_KEY
const H = { apikey: SECRET, Authorization: 'Bearer ' + SECRET, 'Content-Type': 'application/json' }

async function main() {
  const rows = (await getValues('Materiales!A1:Z6000')) || []
  const header = (rows[0] || []).map((h) => (h || '').trim().toUpperCase())
  const col = (name) => header.findIndex((h) => h === name)
  const iP = col('PRODUCTO'), iC = col('CATEGORIA'), iS = col('SUBCATEGORIA'), iU = col('UNIDAD'), iM = col('MARCA')
  if (iP < 0 || iC < 0) throw new Error('faltan columnas PRODUCTO/CATEGORIA en la pestaña Materiales')

  const clasif = []
  for (const r of rows.slice(1)) {
    const nombre = (r[iP] || '').trim()
    const cat = (r[iC] || '').trim()
    if (!nombre || !cat) continue // solo las clasificadas
    clasif.push({
      nombre,
      cat_app: cat,
      subcat_app: (r[iS] || '').trim() || null,
      unidad_app: (r[iU] || '').trim() || null,
      marca_app: (r[iM] || '').trim() || null,
    })
  }
  console.log(`Clasificadas a sincronizar: ${clasif.length}`)

  let ok = 0
  for (const c of clasif) {
    const url = `${SUPA}/rest/v1/materiales?nombre=eq.${encodeURIComponent(c.nombre)}`
    const body = JSON.stringify({ cat_app: c.cat_app, subcat_app: c.subcat_app, unidad_app: c.unidad_app, marca_app: c.marca_app })
    const r = await fetch(url, { method: 'PATCH', headers: { ...H, Prefer: 'return=minimal' }, body })
    if (r.ok) ok++
    else console.error('  ⚠️', c.nombre, r.status, (await r.text()).slice(0, 80))
    process.stdout.write(`\r  ${ok}/${clasif.length}`)
  }
  console.log(`\n✅ Sincronizadas ${ok} clasificaciones a Supabase.`)
}

main().catch((e) => { console.error('❌', e.message); process.exit(1) })
