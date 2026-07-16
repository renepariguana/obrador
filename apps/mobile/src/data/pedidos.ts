// Pedidos de ejemplo (más adelante vienen de Supabase, filtrados por zona).
// `min` = zoom mínimo para que el globo aparezca en el mapa (level-of-detail).
export type Pedido = {
  id: string
  lat: number
  lng: number
  oficio: string
  desc: string
  cliente: string
  dist: string
  zona: string
  tag: string
  quote: string
  hace: string
  postulados: number
  min: number
  urgente?: boolean
}

export const PEDIDOS: Pedido[] = [
  {
    id: '1',
    lat: -26.822,
    lng: -65.2225,
    oficio: 'Plomero',
    desc: 'Pérdida en la cocina',
    cliente: 'María E.',
    dist: '0,6 km',
    zona: 'San Miguel de Tucumán',
    tag: 'Plomería',
    quote: 'Tengo una pérdida de agua debajo de la pileta de la cocina, necesito que la revisen hoy si se puede.',
    hace: 'hace 5 min',
    postulados: 2,
    min: 13,
    urgente: true,
  },
  {
    id: '2',
    lat: -26.8185,
    lng: -65.2255,
    oficio: 'Electricista',
    desc: 'Se cortó la luz',
    cliente: 'Juan P.',
    dist: '0,9 km',
    zona: 'San Miguel de Tucumán',
    tag: 'Electricidad',
    quote: 'Se cortó la luz en media casa y no vuelve. Necesito que lo revisen cuanto antes.',
    hace: 'hace 12 min',
    postulados: 1,
    min: 13,
    urgente: true,
  },
  {
    id: '3',
    lat: -26.8205,
    lng: -65.2155,
    oficio: 'Albañil',
    desc: 'Levantar pared',
    cliente: 'Rosa M.',
    dist: '1,1 km',
    zona: 'Barrio Norte',
    tag: 'Albañilería',
    quote: 'Quiero levantar una pared de 3x2 en el fondo para dividir el patio. Paso medidas por chat.',
    hace: 'hace 25 min',
    postulados: 3,
    min: 14,
  },
  {
    id: '4',
    lat: -26.8245,
    lng: -65.2135,
    oficio: 'Pintor',
    desc: 'Pintar living',
    cliente: 'Diego S.',
    dist: '1,4 km',
    zona: 'Yerba Buena',
    tag: 'Pintura',
    quote: 'Necesito pintar living y comedor, unos 30 m². Ya tengo la pintura comprada.',
    hace: 'hace 40 min',
    postulados: 2,
    min: 15,
  },
  {
    id: '5',
    lat: -26.8285,
    lng: -65.226,
    oficio: 'Gasista',
    desc: 'Revisar estufa',
    cliente: 'Ana L.',
    dist: '1,8 km',
    zona: 'Barrio Norte',
    tag: 'Gas',
    quote: 'La estufa tira olor a gas cuando la prendo. Necesito un gasista matriculado.',
    hace: 'hace 1 h',
    postulados: 0,
    min: 15,
    urgente: true,
  },
  {
    id: '6',
    lat: -26.8148,
    lng: -65.3168,
    oficio: 'Pintor',
    desc: 'Pintar frente',
    cliente: 'Laura V.',
    dist: '6,3 km',
    zona: 'Yerba Buena',
    tag: 'Pintura',
    quote: 'Necesito pintar el frente de la casa, unos 40 m². Zona Yerba Buena.',
    hace: 'hace 18 min',
    postulados: 1,
    min: 11,
  },
  {
    id: '7',
    lat: -26.7325,
    lng: -65.2588,
    oficio: 'Albañil',
    desc: 'Contrapiso garage',
    cliente: 'Marcelo D.',
    dist: '11 km',
    zona: 'Tafí Viejo',
    tag: 'Albañilería',
    quote: 'Quiero hacer un contrapiso nuevo en el garage, unos 18 m².',
    hace: 'hace 35 min',
    postulados: 0,
    min: 11,
  },
  {
    id: '8',
    lat: -26.8382,
    lng: -65.1702,
    oficio: 'Electricista',
    desc: 'Tablero nuevo',
    cliente: 'Sergio A.',
    dist: '7,5 km',
    zona: 'Banda del Río Salí',
    tag: 'Electricidad',
    quote: 'Necesito instalar un tablero nuevo con disyuntor y térmicas.',
    hace: 'hace 50 min',
    postulados: 2,
    min: 11,
  },
  {
    id: '9',
    lat: -26.7862,
    lng: -65.2048,
    oficio: 'Plomero',
    desc: 'Cambiar termotanque',
    cliente: 'Nadia R.',
    dist: '5,1 km',
    zona: 'Las Talitas',
    tag: 'Plomería',
    quote: 'Se rompió el termotanque, necesito cambiarlo por uno de 80 litros.',
    hace: 'hace 1 h',
    postulados: 1,
    min: 11,
  },
  {
    id: '10',
    lat: -26.8158,
    lng: -65.1452,
    oficio: 'Herrero',
    desc: 'Reja para ventana',
    cliente: 'Pablo M.',
    dist: '9,2 km',
    zona: 'Alderetes',
    tag: 'Herrería',
    quote: 'Necesito una reja de hierro para una ventana de 1,20 x 1,10.',
    hace: 'hace 2 h',
    postulados: 0,
    min: 11,
  },
  {
    id: '11',
    lat: -26.9258,
    lng: -65.3345,
    oficio: 'Carpintero',
    desc: 'Placard a medida',
    cliente: 'Vale S.',
    dist: '14 km',
    zona: 'Lules',
    tag: 'Carpintería',
    quote: 'Quiero un placard a medida de 2,40 m de ancho para el dormitorio.',
    hace: 'hace 3 h',
    postulados: 1,
    min: 11,
  },
]

const km = (d: string) => parseFloat(d.replace(',', '.')) || 0

// Todos los pedidos, ordenados por cercanía: primero los de tu zona, después el
// resto por distancia. No esconde los de otras zonas.
export function pedidosDeZona(zona?: string): Pedido[] {
  return PEDIDOS.slice().sort((a, b) => {
    const za = a.zona === zona ? 0 : 1
    const zb = b.zona === zona ? 0 : 1
    if (za !== zb) return za - zb
    return km(a.dist) - km(b.dist)
  })
}
