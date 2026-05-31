import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { JobCard } from '@/components/jobs/JobCard'
import type { JobPost, ServiceCategory } from '@manos/shared'

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) =>
    React.createElement('a', { href, ...props }, children),
}))

const mockCategory: ServiceCategory = {
  id: 'cat-1',
  nombre: 'Plomería',
  icono: 'Wrench',
  created_at: '2026-01-01T00:00:00.000Z',
}

const mockJob: JobPost & { service_categories: ServiceCategory } = {
  id: 'job-1',
  cliente_id: 'user-1',
  titulo: 'Reparar cañería rota',
  descripcion: 'Se rompió el caño debajo de la pileta del baño, necesito urgente.',
  category_id: 'cat-1',
  lat: -26.8083,
  lng: -65.2176,
  direccion: 'San Martín 500, Tucumán',
  estado: 'abierto',
  worker_seleccionado_id: null,
  created_at: '2026-05-30T10:00:00.000Z',
  updated_at: '2026-05-30T10:00:00.000Z',
  service_categories: mockCategory,
}

describe('JobCard', () => {
  it('muestra el título del trabajo', () => {
    render(<JobCard job={mockJob} />)
    expect(screen.getByText('Reparar cañería rota')).toBeInTheDocument()
  })

  it('muestra la categoría', () => {
    render(<JobCard job={mockJob} />)
    expect(screen.getByText('Plomería')).toBeInTheDocument()
  })

  it('muestra la dirección', () => {
    render(<JobCard job={mockJob} />)
    expect(screen.getByText('San Martín 500, Tucumán')).toBeInTheDocument()
  })

  it('contiene un link al detalle del trabajo', () => {
    render(<JobCard job={mockJob} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/trabajos/job-1')
  })

  it('muestra una preview de la descripción', () => {
    render(<JobCard job={mockJob} />)
    expect(screen.getByText(/cañería rota/)).toBeInTheDocument()
  })
})
