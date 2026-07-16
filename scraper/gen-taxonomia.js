// Lee la pestaña "MATERIALES" del Sheet de LOG "MATERIALES Y MANO DE OBRA"
// (solo columnas CATEGORIA y SUBCATEGORIA) y genera apps/mobile/src/data/taxonomia.ts.
// El agente busca por SUBCATEGORIA (keyword). Se ignora la columna MATERIALES.
// Uso: node gen-taxonomia.js
const fs = require('fs')
const path = require('path')
const { accessToken } = require('./gsheets')

const SHEET_ID = '1z8t4fvp0urZpCm2EoW8wkNOcufnlCWRXnp65tYDZ4TE'
const TAB = 'MATERIALES'
const OUT = path.resolve(
  '/Users/renepariguana/Desktop/Proyectos/Obrador/apps/mobile/src/data/taxonomia.ts',
)

const norm = (x) => x.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
const titulo = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
// singular por palabra: "VIGUETAS PRETENSADAS" -> "vigueta pretensada"
const singular = (w) => (w.length >= 4 && w.endsWith('s') ? w.slice(0, -1) : w)
const keyword = (s) =>
  norm(s)
    .trim()
    .split(/\s+/)
    .map(singular)
    .join(' ')
function mapUnidad(u) {
  u = (u || '').toLowerCase().trim()
  if (u === 'm3') return 'm³'
  if (u === 'm2') return 'm²'
  if (u === 'm' || u === 'ml') return 'm'
  if (u === 'kg') return 'Kg'
  if (u === 'l' || u === 'lts' || u === 'litros') return 'L'
  if (u === 'gl') return 'gl'
  return 'u' // un, u, o vacío
}

;(async () => {
  const tok = await accessToken()
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(TAB)}!D1:I400`
  const r = await (await fetch(url, { headers: { Authorization: 'Bearer ' + tok } })).json()
  if (r.error) throw new Error(r.error.message)
  const rows = r.values || []

  const cats = new Map() // categoria -> Map(label -> {kw, unidades:{}, cantidades:{}})
  for (const row of rows) {
    const cat = (row[0] || '').trim() // D
    const sub = (row[1] || '').trim() // E
    const cant = (row[4] || '').trim() // H = CANTIDAD
    const uni = (row[5] || '').trim() // I = UNIDAD
    if (!cat || cat.toUpperCase() === 'CATEGORIA' || cat === '(sin)') continue
    if (!sub) continue
    if (!cats.has(cat)) cats.set(cat, new Map())
    const label = titulo(sub)
    if (!cats.get(cat).has(label)) cats.get(cat).set(label, { kw: keyword(sub), unidades: {}, cantidades: {} })
    const d = cats.get(cat).get(label)
    if (uni) d.unidades[mapUnidad(uni)] = (d.unidades[mapUnidad(uni)] || 0) + 1
    const n = parseFloat(cant.replace(',', '.'))
    if (n > 0) d.cantidades[n] = (d.cantidades[n] || 0) + 1
  }
  // valor más frecuente (o default)
  const masFrec = (obj, def) => {
    const e = Object.entries(obj).sort((a, b) => b[1] - a[1])
    return e.length ? e[0][0] : def
  }
  const unidadDe = (d) => masFrec(d.unidades, 'u')
  const cantidadDe = (d) => parseFloat(masFrec(d.cantidades, '1')) || 1

  const bloques = [...cats.entries()].map(([cat, subs]) => {
    const subsTs = [...subs.entries()]
      .map(
        ([label, d]) =>
          `      { label: ${JSON.stringify(label)}, terms: [${JSON.stringify(d.kw)}], excluir: [], unidad: '${unidadDe(d)}', cantidad: ${cantidadDe(d)} },`,
      )
      .join('\n')
    return `  {\n    nombre: ${JSON.stringify(titulo(cat))},\n    subs: [\n${subsTs}\n    ],\n  },`
  })

  const file =
    `import { UnidadBase } from './materialesApi'\n\n` +
    `// GENERADO por scraper/gen-taxonomia.js desde la pestaña "MATERIALES" del Sheet de LOG.\n` +
    `// No editar a mano: correr 'node gen-taxonomia.js' y redeploy.\n` +
    `// unidad = unidad de medida del precio. cantidad = presentación estándar (para $/unidad cuando el nombre no la trae).\n` +
    `export type SubKeyword = { label: string; terms: string[]; excluir: string[]; unidad: UnidadBase; cantidad: number }\n` +
    `export type CatMaestra = { nombre: string; subs: SubKeyword[] }\n\n` +
    `export const TAXONOMIA: CatMaestra[] = [\n${bloques.join('\n')}\n]\n\n` +
    `export function keywordsDe(cat: CatMaestra): string[] {\n  return cat.subs.flatMap((s) => s.terms)\n}\n`

  fs.writeFileSync(OUT, file)
  console.log(`✅ taxonomia.ts generado desde LOG: ${cats.size} categorías con subcategorías`)
  for (const [c, subs] of cats)
    console.log(`   · ${titulo(c)}: ${[...subs.entries()].map(([l, d]) => l + '/' + unidadDe(d) + '×' + cantidadDe(d)).join(', ')}`)
})().catch((e) => {
  console.error('❌', e.message)
  process.exit(1)
})
