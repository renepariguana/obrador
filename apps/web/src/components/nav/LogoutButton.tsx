'use client'

import { logout } from '@/actions/auth'

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors"
      >
        Cerrar sesión
      </button>
    </form>
  )
}
