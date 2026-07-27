// Sincroniza el Sheet → proveedores en Supabase:
//  · columna "MOSTRAR APP" (checkbox) → proveedores.visible_app  (la app solo muestra los visibles)
//  · columna "MARCA" (URL de imagen)  → proveedores.logo_url     (logo del selector de Materiales)
//    El logo lo escribe scrape-logos.js en el Sheet; acá se lo empuja a Supabase. Editable a mano.
// Uso: node sync-visibles.js   (correlo después de tildar/destildar o de scrapear logos)
require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const { getValues } = require('./gsheets')

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } })

async function syncVisibles() {
  const rows = (await getValues('Proveedores!A1:Z3000')) || []
  if (!rows.length) return
  const h = rows[0].map((x) => (x || '').trim())
  const iSlug = h.findIndex((x) => /slug/i.test(x))
  const iMost = h.findIndex((x) => /mostrar/i.test(x))
  const iMarca = h.findIndex((x) => /marca/i.test(x))
  if (iMost === -1) { console.error('No encontré la columna "MOSTRAR APP" en Proveedores'); process.exit(1) }
  // Agrupa por slug (robusto a filas duplicadas):
  //  · visible si ALGUNA fila de ese slug está tildada.
  //  · marca = la primera URL no vacía que aparezca para ese slug.
  const porSlug = new Map()
  for (let i = 1; i < rows.length; i++) {
    const slug = ((rows[i] || [])[iSlug] || '').trim()
    if (!slug) continue
    const cell = (rows[i] || [])[iMost]
    const visible = cell === true || String(cell).toUpperCase() === 'TRUE'
    const marca = iMarca >= 0 ? String((rows[i] || [])[iMarca] || '').trim() : ''
    const prev = porSlug.get(slug) || { visible: false, marca: '' }
    porSlug.set(slug, { visible: prev.visible || visible, marca: prev.marca || marca })
  }
  let on = 0, off = 0, marcas = 0, err = 0
  for (const [slug, { visible, marca }] of porSlug) {
    const patch = { visible_app: visible }
    // El Sheet manda: si la celda MARCA tiene URL, ese es el logo. (scrape-logos.js la llena; editable a mano.)
    if (iMarca >= 0) patch.logo_url = marca || null
    const { error } = await sb.from('proveedores').update(patch).eq('slug', slug)
    if (error) err++
    else { visible ? on++ : off++; if (marca) marcas++ }
  }
  console.log(`✅ Sheet sincronizado — mostrar: ${on} · ocultar: ${off} · logos: ${marcas}${err ? ` · errores: ${err}` : ''}`)
  return { on, off, marcas, err }
}

module.exports = { syncVisibles }

if (require.main === module) {
  syncVisibles().catch((e) => { console.error('❌', e.message); process.exit(1) })
}
