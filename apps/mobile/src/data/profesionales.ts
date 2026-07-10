// Profesionales de ejemplo (más adelante vienen de Supabase).
// `puntos` = puntaje acumulado por cobrar trabajos por la app (arma las estrellas).
export type Profesional = {
  id: string
  nombre: string
  oficio: string
  rating: number
  puntos: number
  reviews: number
  verificado: boolean
  dist: string
}

export const PROFESIONALES: Profesional[] = [
  { id: 'p1', nombre: 'Carlos Gómez', oficio: 'Plomero', rating: 4.9, puntos: 1280, reviews: 214, verificado: true, dist: '0,6 km' },
  { id: 'p2', nombre: 'Marta Ruiz', oficio: 'Pintor', rating: 4.8, puntos: 1150, reviews: 176, verificado: true, dist: '1,2 km' },
  { id: 'p3', nombre: 'Diego Sosa', oficio: 'Electricista', rating: 4.7, puntos: 990, reviews: 143, verificado: false, dist: '0,9 km' },
  { id: 'p4', nombre: 'Ana Paredes', oficio: 'Albañil', rating: 4.9, puntos: 1540, reviews: 260, verificado: true, dist: '1,5 km' },
  { id: 'p5', nombre: 'Roberto Molina', oficio: 'Albañil', rating: 4.8, puntos: 1320, reviews: 198, verificado: true, dist: '2,1 km' },
  { id: 'p6', nombre: 'Lucía Ferreyra', oficio: 'Albañil', rating: 4.6, puntos: 870, reviews: 96, verificado: false, dist: '0,8 km' },
  { id: 'p7', nombre: 'Jorge Vera', oficio: 'Carpintero', rating: 4.9, puntos: 1410, reviews: 231, verificado: true, dist: '1,1 km' },
  { id: 'p8', nombre: 'Sofía Torres', oficio: 'Plomero', rating: 4.8, puntos: 1090, reviews: 155, verificado: true, dist: '1,8 km' },
  { id: 'p9', nombre: 'Miguel Ríos', oficio: 'Electricista', rating: 4.9, puntos: 1360, reviews: 205, verificado: true, dist: '0,7 km' },
  { id: 'p10', nombre: 'Elena Cabrera', oficio: 'Pintor', rating: 4.7, puntos: 940, reviews: 121, verificado: false, dist: '2,4 km' },
  { id: 'p11', nombre: 'Pedro Juárez', oficio: 'Albañil', rating: 4.7, puntos: 1010, reviews: 132, verificado: true, dist: '1,3 km' },
  { id: 'p12', nombre: 'Natalia Vega', oficio: 'Herrero', rating: 4.8, puntos: 1180, reviews: 167, verificado: true, dist: '1,9 km' },
]

// Profesionales de un oficio, ordenados por puntos (ranking). Si no hay del
// oficio pedido, devuelve todos ordenados.
export function porOficio(oficio: string): Profesional[] {
  const list = PROFESIONALES.filter((p) => p.oficio === oficio)
  return (list.length ? list : PROFESIONALES).slice().sort((a, b) => b.puntos - a.puntos)
}

// Trabajos ya realizados por un profesional (su portfolio).
export type TrabajoRealizado = { id: string; titulo: string; desc: string; rating: number; fecha: string }

const OBRAS: Record<string, TrabajoRealizado[]> = {
  Albañil: [
    { id: 'o1', titulo: 'Pared divisoria de patio', desc: 'Levanté 3x2 m con revoque grueso y fino.', rating: 5, fecha: 'Jun 2026' },
    { id: 'o2', titulo: 'Contrapiso y carpeta', desc: 'Garage de 24 m², listo para piso.', rating: 4.8, fecha: 'May 2026' },
    { id: 'o3', titulo: 'Reparación de humedad', desc: 'Cateo y revoque hidrófugo en dormitorio.', rating: 4.9, fecha: 'Abr 2026' },
  ],
  Plomero: [
    { id: 'o1', titulo: 'Cambio de cañería de cocina', desc: 'Reemplacé caños viejos por PPR.', rating: 5, fecha: 'Jun 2026' },
    { id: 'o2', titulo: 'Instalación de termotanque', desc: 'Colocación y conexión completa.', rating: 4.9, fecha: 'May 2026' },
    { id: 'o3', titulo: 'Destape de cloaca', desc: 'Destape con máquina y revisión.', rating: 4.7, fecha: 'Abr 2026' },
  ],
  Pintor: [
    { id: 'o1', titulo: 'Pintura de living y comedor', desc: '30 m², látex interior a dos manos.', rating: 5, fecha: 'Jun 2026' },
    { id: 'o2', titulo: 'Frente de casa', desc: 'Impermeabilizante y acabado texturado.', rating: 4.8, fecha: 'Mar 2026' },
  ],
  Electricista: [
    { id: 'o1', titulo: 'Tablero nuevo con térmicas', desc: 'Normalización y disyuntor.', rating: 5, fecha: 'Jun 2026' },
    { id: 'o2', titulo: 'Instalación de luces LED', desc: 'Living, cocina y pasillo.', rating: 4.9, fecha: 'May 2026' },
  ],
}

const OBRAS_GENERICAS: TrabajoRealizado[] = [
  { id: 'g1', titulo: 'Trabajo terminado', desc: 'Entregado en tiempo y forma, cliente conforme.', rating: 5, fecha: 'Jun 2026' },
  { id: 'g2', titulo: 'Trabajo terminado', desc: 'Buen acabado y prolijidad.', rating: 4.8, fecha: 'May 2026' },
]

export function trabajosDe(oficio: string): TrabajoRealizado[] {
  return OBRAS[oficio] ?? OBRAS_GENERICAS
}
