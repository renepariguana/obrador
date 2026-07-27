// BASE DE DATOS MAESTRA — una pestaña por proveedor (EASY, EMI) en el Sheet Manos a la Obra,
// más una pestaña "Materiales" que compila todos. Jerarquía:
//   RUBRO (del proveedor) > PROVEEDOR > CATEGORIA > SUBCATEGORIA > PRODUCTO
// Columnas: RUBRO · CATEGORIA · SUBCATEGORIA · CODIGO DE PRODUCTO · PRODUCTO · PRECIO · LINK
// (la compilación agrega PROVEEDOR entre RUBRO y CATEGORIA).
// RUBRO se auto-completa leyéndolo por proveedor de la pestaña Proveedores. CAT/SUBCAT/CODIGO/PRODUCTO/
// PRECIO salen tal cual del scrapeo (Supabase). Robusto al orden de columnas; poda columnas viejas.
// Uso: node revisar.js
require('dotenv').config()
const { getValues, addSheetIfMissing, updateValues, accessToken, SHEET_ID } = require('./gsheets')

const SUPA = process.env.SUPABASE_URL
const SECRET = process.env.SUPABASE_SECRET_KEY
const PROVINCIA = 'Tucumán'

const REQUERIDOS = ['CATEGORIA', 'SUBCATEGORIA'] // si falta alguno → fila resaltada (scrapeo incompleto)
const ORDEN_PROV = ['RUBRO', 'CATEGORIA', 'SUBCATEGORIA', 'CODIGO', 'PRODUCTO', 'PRECIO', 'LINK']
const ORDEN_TODOS = ['RUBRO', 'PROVEEDOR', 'CATEGORIA', 'SUBCATEGORIA', 'CODIGO', 'PRODUCTO', 'PRECIO', 'LINK']

// Alias de encabezados → campo canónico (reconoce los nombres que pongas, sin importar acentos/mayúsculas).
const ALIAS = { 'CODIGO DE PRODUCTO': 'CODIGO', 'COD. PRODUCTO': 'CODIGO', COD: 'CODIGO' }
const stripAcc = (x) => (x || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
const canon = (label) => {
  const u = stripAcc((label || '').trim().toUpperCase())
  return ALIAS[u] || u
}
// Etiqueta que se escribe al crear una columna nueva (por defecto, el nombre canónico).
const LABELS = {}
const labelDe = (c) => LABELS[c] || c

const colLetra = (i) => String.fromCharCode(65 + i)
// La pestaña se llama igual que el proveedor (nombre completo), saneando caracteres inválidos para Sheets.
const tabDe = (proveedor) => ((proveedor || 'OTROS').trim().replace(/[:\\/?*[\]]/g, ' ').replace(/\s+/g, ' ').slice(0, 95)) || 'OTROS'

// Trae los materiales scrapeados desde Supabase (con cat/sub nativas y sku si la columna existe).
async function traerMateriales() {
  const H = { apikey: SECRET, Authorization: 'Bearer ' + SECRET }
  const hasSku = Array.isArray(await (await fetch(`${SUPA}/rest/v1/materiales?select=sku&limit=1`, { headers: H })).json())
  const hasActivo = Array.isArray(await (await fetch(`${SUPA}/rest/v1/materiales?select=activo&limit=1`, { headers: H })).json())
  const sel = `nombre,precio,url,categoria,subcategoria${hasSku ? ',sku' : ''},proveedores(nombre)`
  const filtroActivo = hasActivo ? '&activo=is.true' : '' // solo vigentes (los dados de baja no aparecen)
  const out = []
  for (let off = 0; ; off += 1000) {
    // todas las provincias (multi-provincia): una pestaña por proveedor sin importar su provincia
    const url = `${SUPA}/rest/v1/materiales?select=${sel}&order=nombre&limit=1000&offset=${off}${filtroActivo}`
    const j = await (await fetch(url, { headers: H })).json()
    if (!Array.isArray(j) || !j.length) break
    out.push(...j)
    if (j.length < 1000) break
  }
  return out
}

// Asegura una columna RUBRO en la pestaña Proveedores (la completás vos por proveedor) y devuelve
// el mapa { nombreProveedor: rubro } para auto-completar el RUBRO en cada pestaña.
async function rubrosProveedores() {
  const rows = (await getValues('Proveedores!A1:Z3000')) || []
  if (!rows.length) return {}
  const header = rows[0].map((h) => (h || '').trim())
  const ni = header.findIndex((h) => /nombre|proveedor/i.test(h))
  let ri = header.findIndex((h) => /^rubro$/i.test(h))
  if (ri === -1) {
    ri = header.length
    header[ri] = 'RUBRO'
    const out = rows.map((r, i) => {
      if (i === 0) return header
      const rr = r.slice()
      while (rr.length <= ri) rr.push('')
      return rr
    })
    await updateValues(`Proveedores!A1:${colLetra(header.length - 1)}${rows.length}`, out)
  }
  const map = {}
  for (let i = 1; i < rows.length; i++) {
    const n = (rows[i][ni] || '').trim()
    if (n) map[n] = (rows[i][ri] || '').trim()
  }
  return map
}

async function sheetId(title) {
  const tok = await accessToken()
  const meta = await (
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=sheets(properties(sheetId,title),conditionalFormats)`, {
      headers: { Authorization: 'Bearer ' + tok },
    })
  ).json()
  const norm = (s) => (s || '').trim().toLowerCase()
  return { tok, sheet: meta.sheets.find((s) => norm(s.properties.title) === norm(title)) }
}

async function procesarTab(tab, prods, ordenDefault, rubroPorProv) {
  await addSheetIfMissing(tab)
  const prev = (await getValues(`${tab}!A1:Z6000`)) || []
  const prevW = Math.max(0, ...prev.map((r) => r.length)) // ancho viejo (para limpiar columnas sobrantes)
  // Orden canónico exacto (RUBRO · [PROVEEDOR] · CATEGORIA · SUBCATEGORIA · CODIGO · PRODUCTO · PRECIO · LINK)
  const canons = [...ordenDefault]
  const labels = ordenDefault.map(labelDe)
  const idx = {}
  canons.forEach((c, i) => (idx[c] = i))
  const conProv = canons.includes('PROVEEDOR')
  const claveM = (m) => (conProv ? m.nombre + '||' + (m.proveedores?.nombre || '') : m.nombre)

  const unicos = new Map()
  for (const m of prods) if (!unicos.has(claveM(m))) unicos.set(claveM(m), m)

  const registros = []
  for (const [, m] of unicos) {
    registros.push({
      RUBRO: rubroPorProv[m.proveedores?.nombre] || '',
      PROVEEDOR: m.proveedores?.nombre || '',
      CATEGORIA: m.categoria || '',
      SUBCATEGORIA: m.subcategoria || '',
      CODIGO: m.sku || '',
      PRODUCTO: m.nombre,
      PRECIO: m.precio > 0 ? '$' + Math.round(m.precio).toLocaleString('es-AR') : 'Consultar', // sin precio publicado en la tienda origen

      LINK: m.url || '',
    })
  }
  const incompletos = registros.filter((c) => REQUERIDOS.some((col) => !c[col])).length
  registros.sort((a, b) => {
    const f = (c) => REQUERIDOS.reduce((n, col) => n + (c[col] ? 1 : 0), 0)
    return f(a) - f(b) || a.PRODUCTO.localeCompare(b.PRODUCTO, 'es')
  })
  const filas = registros.map((c) => canons.map((col) => c[col] ?? ''))

  const width = Math.max(labels.length, prevW) // escribe (y limpia) hasta el ancho más grande
  const pad = (r) => { const rr = r.slice(); while (rr.length < width) rr.push(''); return rr }
  const values = [labels, ...filas].map(pad)
  const total = Math.max(values.length, prev.length, 100)
  const out = Array.from({ length: total }, (_, i) => values[i] || Array(width).fill(''))
  await updateValues(`${tab}!A1:${colLetra(width - 1)}${total}`, out)
  await resaltar(tab, values.length, labels, idx)
  console.log(`  ✅ ${tab}: ${filas.length} productos (${incompletos} sin cat/sub)`)
}

async function resaltar(tab, numFilas, orden, idx) {
  const { tok, sheet } = await sheetId(tab)
  const sid = sheet.properties.sheetId
  const cond = REQUERIDOS.map((c) => `ISBLANK($${colLetra(idx[c])}2)`).join(';') // locale es: separador ;
  const requests = []
  for (let i = 0; i < (sheet.conditionalFormats || []).length; i++) requests.push({ deleteConditionalFormatRule: { sheetId: sid, index: 0 } })
  requests.push({
    addConditionalFormatRule: {
      index: 0,
      rule: {
        ranges: [{ sheetId: sid, startRowIndex: 1, endRowIndex: numFilas, startColumnIndex: 0, endColumnIndex: orden.length }],
        booleanRule: {
          condition: { type: 'CUSTOM_FORMULA', values: [{ userEnteredValue: `=OR(${cond})` }] },
          format: { backgroundColor: { red: 1, green: 0.85, blue: 0.85 } },
        },
      },
    },
  })
  // Filtro de Sheets sobre toda la tabla (para filtrar por columna)
  requests.push({
    setBasicFilter: {
      filter: { range: { sheetId: sid, startRowIndex: 0, endRowIndex: numFilas, startColumnIndex: 0, endColumnIndex: orden.length } },
    },
  })
  const j = await (
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests }),
    })
  ).json()
  if (j.error) throw new Error('formato: ' + j.error.message)
}

async function main() {
  const rubroPorProv = await rubrosProveedores() // asegura columna RUBRO + lee el mapa por proveedor
  const mats = await traerMateriales()
  const porProveedor = new Map()
  for (const m of mats) {
    const tab = tabDe(m.proveedores?.nombre)
    if (!porProveedor.has(tab)) porProveedor.set(tab, [])
    porProveedor.get(tab).push(m)
  }
  console.log(`Proveedores: ${[...porProveedor.keys()].join(', ')} | total: ${mats.length}`)
  // 1) una pestaña por proveedor (EASY, EMI…)
  for (const [tab, prods] of porProveedor) await procesarTab(tab, prods, ORDEN_PROV, rubroPorProv)
  // 2) "Materiales" = compilación de todos los proveedores (con columna PROVEEDOR)
  await procesarTab('Materiales', mats, ORDEN_TODOS, rubroPorProv)
  // 3) conteos por proveedor: total scrapeado y filtrados (con CATEGORIA cargada)
  const conteo = {}
  const vistos = {}
  for (const m of mats) {
    const n = m.proveedores?.nombre || ''
    vistos[n] = vistos[n] || new Set()
    if (!vistos[n].has(m.nombre)) { vistos[n].add(m.nombre); conteo[n] = (conteo[n] || 0) + 1 }
  }
  // La tabla "Proveedores" ahora la mantiene descubrir.js (tabla única) — revisar no la reescribe.
  console.log('Listo — pestañas + compilación "Materiales" + conteos en Proveedores.')
}

const PROVINCIAS = ['Nacional', 'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán']

// Pone desplegables (data validation) en ACTIVO, PROVINCIA y RUBRO de la pestaña Proveedores.
async function desplegablesProveedores() {
  const rows = (await getValues('Proveedores!A1:Z100')) || []
  if (!rows.length) return
  const header = rows[0].map((h) => (h || '').trim())
  const col = (re) => header.findIndex((h) => re.test(h))
  const N = 100

  // ACTIVO: reconoce la columna de estado (ACTIVO/APP/API), le fija el header ACTIVO y normaliza valores.
  const ai = col(/^activo$|^app$|^api$/i)
  if (ai !== -1) {
    const c = [['ACTIVO']] // header
    for (let i = 1; i < rows.length; i++) {
      const v = (rows[i][ai] || '').trim().toUpperCase()
      c.push([/^(SI|S|ACTIVO|TRUE|1|VERDADERO)$/.test(v) ? 'ACTIVO' : /^(NO|N|INACTIVO|FALSE|0|FALSO)$/.test(v) ? 'INACTIVO' : rows[i][ai] || ''])
    }
    await updateValues(`Proveedores!${colLetra(ai)}1:${colLetra(ai)}${rows.length}`, c)
    header[ai] = 'ACTIVO'
  }

  const { tok, sheet } = await sheetId('Proveedores')
  const sid = sheet.properties.sheetId
  const dv = (ci, opciones, strict) => ({
    setDataValidation: {
      range: { sheetId: sid, startRowIndex: 1, endRowIndex: N, startColumnIndex: ci, endColumnIndex: ci + 1 },
      rule: { condition: { type: 'ONE_OF_LIST', values: opciones.map((v) => ({ userEnteredValue: v })) }, showCustomUi: true, strict },
    },
  })
  const requests = []
  if (ai !== -1) requests.push(dv(ai, ['ACTIVO', 'INACTIVO'], true))
  const pi = col(/provincia/i)
  if (pi !== -1) requests.push(dv(pi, PROVINCIAS, false))
  // RUBRO: opciones = los que ya cargaste + "Construcción" de arranque (crece solo; no estricto para agregar)
  const ri = col(/^rubro$/i)
  if (ri !== -1) {
    const opts = [...new Set(['Construcción', ...rows.slice(1).map((r) => (r[ri] || '').trim()).filter(Boolean)])].sort((a, b) => a.localeCompare(b, 'es'))
    requests.push(dv(ri, opts, false))
  }
  if (!requests.length) return
  const j = await (
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests }),
    })
  ).json()
  if (j.error) throw new Error('desplegables Proveedores: ' + j.error.message)
}

// Escribe la cantidad de productos scrapeados por proveedor. (Borra la vieja columna FILTRADOS si existe.)
async function actualizarProveedores(conteo) {
  let rows = (await getValues('Proveedores!A1:Z100')) || []
  if (!rows.length) return
  let header = rows[0].map((h) => (h || '').trim())
  // borrar columna FILTRADOS si quedó de antes (ya no se usa)
  const fi = header.findIndex((h) => /filtrad/i.test(h))
  if (fi !== -1) {
    const { tok, sheet } = await sheetId('Proveedores')
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests: [{ deleteDimension: { range: { sheetId: sheet.properties.sheetId, dimension: 'COLUMNS', startIndex: fi, endIndex: fi + 1 } } }] }),
    })
    rows = (await getValues('Proveedores!A1:Z100')) || []
    header = rows[0].map((h) => (h || '').trim())
  }
  const ni = header.findIndex((h) => /nombre|proveedor/i.test(h))
  let ci = header.findIndex((h) => /^productos$|cantidad/i.test(h))
  if (ci === -1) { ci = header.length; header[ci] = 'productos' }
  const out = [header]
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i].slice()
    const nombre = (r[ni] || '').trim()
    while (r.length <= ci) r.push('')
    if (nombre && conteo[nombre] != null) r[ci] = conteo[nombre]
    out.push(r)
  }
  await updateValues(`Proveedores!A1:${colLetra(header.length - 1)}${rows.length}`, out)
}

main().catch((e) => { console.error('❌', e.message); process.exit(1) })
