// Materiales de ejemplo (más adelante vienen de Supabase / catálogo de proveedores).
export type Material = {
  id: string
  nombre: string
  categoria: string
  precio: number
  unidad: string
  proveedor: string
}

export const CATEGORIAS = [
  'Todos',
  'Cemento',
  'Ladrillos',
  'Áridos',
  'Hierro',
  'Pintura',
  'Sanitarios',
  'Electricidad',
  'Herramientas',
]

export const MATERIALES: Material[] = [
  { id: 'm1', nombre: 'Cemento Loma Negra 50kg', categoria: 'Cemento', precio: 8900, unidad: 'bolsa', proveedor: 'Corralón El Ladrillo' },
  { id: 'm2', nombre: 'Ladrillo hueco 12x18x33', categoria: 'Ladrillos', precio: 520, unidad: 'unidad', proveedor: 'Cerámica Norte' },
  { id: 'm3', nombre: 'Arena fina', categoria: 'Áridos', precio: 18000, unidad: 'm³', proveedor: 'Áridos del Este' },
  { id: 'm4', nombre: 'Hierro del 8 x 12m', categoria: 'Hierro', precio: 12400, unidad: 'barra', proveedor: 'Hierros Tucumán' },
  { id: 'm5', nombre: 'Pintura látex interior 20L', categoria: 'Pintura', precio: 45000, unidad: 'balde', proveedor: 'Pinturería Color' },
  { id: 'm6', nombre: 'Inodoro corto con depósito', categoria: 'Sanitarios', precio: 62000, unidad: 'juego', proveedor: 'Sanitarios SRL' },
  { id: 'm7', nombre: 'Cable 2.5mm x 100m', categoria: 'Electricidad', precio: 28000, unidad: 'rollo', proveedor: 'Electro Sur' },
  { id: 'm8', nombre: 'Taladro percutor 650W', categoria: 'Herramientas', precio: 85000, unidad: 'unidad', proveedor: 'Ferretería Central' },
  { id: 'm9', nombre: 'Membrana asfáltica 40kg', categoria: 'Pintura', precio: 38000, unidad: 'rollo', proveedor: 'Corralón El Ladrillo' },
  { id: 'm10', nombre: 'Cal hidratada 25kg', categoria: 'Áridos', precio: 4200, unidad: 'bolsa', proveedor: 'Áridos del Este' },
]

export function porCategoria(cat: string): Material[] {
  return cat === 'Todos' ? MATERIALES : MATERIALES.filter((m) => m.categoria === cat)
}

export function precioAr(n: number): string {
  return '$' + n.toLocaleString('es-AR')
}
