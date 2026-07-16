import { UnidadBase } from './materialesApi'

// GENERADO por scraper/gen-taxonomia.js desde la pestaña "MATERIALES" del Sheet de LOG.
// No editar a mano: correr 'node gen-taxonomia.js' y redeploy.
// unidad = unidad de medida del precio. cantidad = presentación estándar (para $/unidad cuando el nombre no la trae).
export type SubKeyword = { label: string; terms: string[]; excluir: string[]; unidad: UnidadBase; cantidad: number }
export type CatMaestra = { nombre: string; subs: SubKeyword[] }

export const TAXONOMIA: CatMaestra[] = [
  {
    nombre: "Movimiento de suelo",
    subs: [
      { label: "Tierra", terms: ["tierra"], excluir: [], unidad: 'm³', cantidad: 1 },
    ],
  },
  {
    nombre: "Estructuras",
    subs: [
      { label: "Barras", terms: ["barra"], excluir: [], unidad: 'm', cantidad: 12 },
      { label: "Vigas", terms: ["viga"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Mallas", terms: ["malla"], excluir: [], unidad: 'm²', cantidad: 10 },
      { label: "Planchuelas", terms: ["planchuela"], excluir: [], unidad: 'm', cantidad: 1 },
      { label: "Hormigón elaborado", terms: ["hormigon elaborado"], excluir: [], unidad: 'm³', cantidad: 1 },
      { label: "Bovedillas", terms: ["bovedilla"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Viguetas pretensadas", terms: ["vigueta pretensada"], excluir: [], unidad: 'm', cantidad: 1 },
      { label: "Entablonados", terms: ["entablonado"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Tablas", terms: ["tabla"], excluir: [], unidad: 'm²', cantidad: 1 },
      { label: "Tacos", terms: ["taco"], excluir: [], unidad: 'u', cantidad: 1 },
    ],
  },
  {
    nombre: "Mamposterias",
    subs: [
      { label: "Ladrillos", terms: ["ladrillo"], excluir: [], unidad: 'u', cantidad: 1 },
    ],
  },
  {
    nombre: "Revestimientos",
    subs: [
      { label: "Cerámicos", terms: ["ceramico"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Pizarra", terms: ["pizarra"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Cerámico", terms: ["ceramico"], excluir: [], unidad: 'm²', cantidad: 55 },
      { label: "Vinilo", terms: ["vinilo"], excluir: [], unidad: 'u', cantidad: 1 },
    ],
  },
  {
    nombre: "Cielorrasos",
    subs: [
      { label: "Metal desplegado", terms: ["metal desplegado"], excluir: [], unidad: 'm²', cantidad: 1.4 },
    ],
  },
  {
    nombre: "Pisos",
    subs: [
      { label: "Alfombra", terms: ["alfombra"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Hormigón", terms: ["hormigon"], excluir: [], unidad: 'm²', cantidad: 1 },
      { label: "Goma", terms: ["goma"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Vinilo", terms: ["vinilo"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Granza", terms: ["granza"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Cerámico", terms: ["ceramico"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Granítico", terms: ["granitico"], excluir: [], unidad: 'm²', cantidad: 1 },
      { label: "Mármol", terms: ["marmol"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Calcáreo", terms: ["calcareo"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Caucho", terms: ["caucho"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Porcelanato", terms: ["porcelanato"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Parquet", terms: ["parquet"], excluir: [], unidad: 'u', cantidad: 1 },
    ],
  },
  {
    nombre: "Zócalos",
    subs: [
      { label: "Calcáreo", terms: ["calcareo"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Cerámico", terms: ["ceramico"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Madera", terms: ["madera"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Granítico", terms: ["granitico"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Pizarra", terms: ["pizarra"], excluir: [], unidad: 'u', cantidad: 1 },
    ],
  },
  {
    nombre: "Aislaciones",
    subs: [
      { label: "Membrana", terms: ["membrana"], excluir: [], unidad: 'm²', cantidad: 10 },
    ],
  },
  {
    nombre: "Cubiertas",
    subs: [
      { label: "Chapas", terms: ["chapa"], excluir: [], unidad: 'm²', cantidad: 1 },
      { label: "Tejas", terms: ["teja"], excluir: [], unidad: 'm²', cantidad: 1 },
    ],
  },
  {
    nombre: "Pinturas",
    subs: [
      { label: "Barniz", terms: ["barniz"], excluir: [], unidad: 'u', cantidad: 1 },
      { label: "Convertidor de óxido", terms: ["convertidor de oxido"], excluir: [], unidad: 'L', cantidad: 4 },
      { label: "Esmalte", terms: ["esmalte"], excluir: [], unidad: 'L', cantidad: 4 },
      { label: "Laca", terms: ["laca"], excluir: [], unidad: 'L', cantidad: 1 },
      { label: "Antióxido", terms: ["antioxido"], excluir: [], unidad: 'L', cantidad: 4 },
      { label: "Látex", terms: ["latex"], excluir: [], unidad: 'L', cantidad: 20 },
    ],
  },
  {
    nombre: "Áridos",
    subs: [
      { label: "Arena", terms: ["arena"], excluir: [], unidad: 'm³', cantidad: 0.75 },
    ],
  },
  {
    nombre: "Ferreteria",
    subs: [
      { label: "Alambre", terms: ["alambre"], excluir: [], unidad: 'gl', cantidad: 1 },
    ],
  },
]

export function keywordsDe(cat: CatMaestra): string[] {
  return cat.subs.flatMap((s) => s.terms)
}
