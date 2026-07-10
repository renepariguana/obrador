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
  },
  {
    id: '3',
    lat: -26.8205,
    lng: -65.2155,
    oficio: 'Albañil',
    desc: 'Levantar pared',
    cliente: 'Rosa M.',
    dist: '1,1 km',
    zona: 'San Miguel de Tucumán',
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
    zona: 'San Miguel de Tucumán',
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
    zona: 'San Miguel de Tucumán',
    tag: 'Gas',
    quote: 'La estufa tira olor a gas cuando la prendo. Necesito un gasista matriculado.',
    hace: 'hace 1 h',
    postulados: 0,
    min: 15,
  },
]
