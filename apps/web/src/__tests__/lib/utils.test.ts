import { describe, it, expect } from 'vitest'
import { cn, formatDate } from '@/lib/utils'

describe('cn', () => {
  it('combina clases simples', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('resuelve conflictos de Tailwind (tw-merge)', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })

  it('ignora valores falsy', () => {
    expect(cn('foo', false && 'bar', undefined, 'baz')).toBe('foo baz')
  })
})

describe('formatDate', () => {
  it('formatea una fecha en español', () => {
    const result = formatDate('2026-01-15T00:00:00.000Z')
    expect(result).toContain('2026')
    expect(result).toContain('ene')
  })

  it('devuelve un string no vacío', () => {
    expect(formatDate('2026-05-30T00:00:00.000Z').length).toBeGreaterThan(0)
  })

  it('retorna guión para fecha inválida', () => {
    expect(formatDate('invalid-date')).toBe('—')
  })
})
