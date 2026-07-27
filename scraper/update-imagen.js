// Actualiza SOLO la columna imagen en Supabase (por url), sin tocar precio ni nada más.
// Útil para proveedores cuyo re-onboarding podría reparsear mal el precio (ej. formato AR).
// Lee {slug}-rows.json (imagen en índice 8). Uso: node update-imagen.js <slug>
require('dotenv').config()
const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } })

async function main() {
  const slug = process.argv[2]
  if (!slug) { console.error('Uso: node update-imagen.js <slug>'); process.exit(1) }
  const { data: pv } = await sb.from('proveedores').select('id').eq('slug', slug).maybeSingle()
  if (!pv) { console.error('proveedor no encontrado:', slug); process.exit(1) }
  const raw = JSON.parse(fs.readFileSync(`${slug}-rows.json`, 'utf8'))
  // agrupar urls por imagen → un update por imagen (con .in de urls) para minimizar requests
  const porImg = new Map()
  for (const r of raw) { const url = r[4], img = r[8]; if (!url || !img) continue; if (!porImg.has(img)) porImg.set(img, []); porImg.get(img).push(url) }
  let n = 0
  for (const [img, urls] of porImg) {
    for (let i = 0; i < urls.length; i += 100) {
      const { error, count } = await sb.from('materiales').update({ imagen: img }, { count: 'exact' }).eq('proveedor_id', pv.id).in('url', urls.slice(i, i + 100))
      if (!error) n += count || 0
    }
  }
  console.log(`${slug}: ${n} filas con imagen actualizada`)
}
main().catch((e) => { console.error('❌', e.message); process.exit(1) })
