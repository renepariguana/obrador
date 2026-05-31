# Manos a la obra — Plan 2: Web App (Next.js)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la aplicación web con Next.js 15 que permite a clientes publicar trabajos y trabajadores explorar y postularse, con autenticación completa vía Supabase Auth.

**Architecture:** Next.js 15 App Router en `apps/web`. Server Actions para mutaciones (auth, crear trabajo, postularse). Server Components para data fetching. Middleware para protección de rutas y refresco de sesión. Estilos con Tailwind CSS v3. Tipos y cliente Supabase vienen de `@manos/shared` (workspace local). La inserción en `public.users` post-registro se hace desde un Server Action usando el cliente admin (service_role) para evitar problemas de RLS.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v3, `@supabase/ssr`, `@manos/shared` (workspace local), Vitest + @testing-library/react para tests de utilidades y componentes presentacionales.

---

## Estructura de archivos

```
apps/web/
├── package.json
├── next.config.mjs
├── tsconfig.json
├── vitest.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
├── .env.local                              ← vars NEXT_PUBLIC_* (no commitear)
└── src/
    ├── app/
    │   ├── layout.tsx                      ← root layout (html, body, meta)
    │   ├── page.tsx                        ← landing pública con CTAs
    │   ├── (auth)/
    │   │   ├── login/page.tsx
    │   │   └── registro/page.tsx
    │   └── (app)/
    │       ├── layout.tsx                  ← layout protegido con Navbar
    │       ├── dashboard/page.tsx          ← bienvenida diferenciada por rol
    │       └── trabajos/
    │           ├── page.tsx                ← lista trabajos abiertos (trabajador)
    │           ├── nuevo/page.tsx          ← crear trabajo (cliente)
    │           └── [id]/page.tsx           ← detalle + postularse (trabajador)
    ├── actions/
    │   ├── auth.ts                         ← Server Actions: register, login, logout
    │   └── jobs.ts                         ← Server Actions: getJobs, getJob, createJob, applyToJob
    ├── components/
    │   ├── auth/
    │   │   ├── LoginForm.tsx               ← 'use client', useActionState
    │   │   └── RegisterForm.tsx            ← 'use client', useActionState
    │   ├── jobs/
    │   │   ├── JobCard.tsx                 ← puramente presentacional, sin hooks
    │   │   └── CreateJobForm.tsx           ← 'use client', useActionState
    │   └── nav/
    │       ├── Navbar.tsx                  ← Server Component con links y LogoutButton
    │       └── LogoutButton.tsx            ← 'use client', llama action logout
    ├── lib/
    │   ├── supabase/
    │   │   ├── client.ts                   ← createBrowserClient (componentes cliente)
    │   │   ├── server.ts                   ← createServerClient con cookies (SSR)
    │   │   └── admin.ts                    ← createClient con service_role (solo server)
    │   └── utils.ts                        ← cn(), formatDate()
    ├── middleware.ts                        ← refresca sesión + redirige si no autenticado
    └── __tests__/
        ├── setup.ts
        ├── lib/utils.test.ts
        └── components/jobs/JobCard.test.tsx
```

---

## Task 1: Setup Next.js + Tailwind en apps/web

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/next.config.mjs`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/tailwind.config.ts`
- Create: `apps/web/postcss.config.mjs`
- Create: `apps/web/vitest.config.ts`
- Create: `apps/web/src/app/layout.tsx` (mínimo para levantar)
- Create: `apps/web/src/app/page.tsx` (placeholder)

- [ ] **Step 1: Crear `apps/web/package.json`**

```json
{
  "name": "web",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@manos/shared": "workspace:*",
    "@supabase/ssr": "^0.5.0",
    "@supabase/supabase-js": "^2.43.0",
    "clsx": "^2.1.0",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^2.4.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.5.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.0",
    "jsdom": "^24.0.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.4.0",
    "vitest": "^1.6.0"
  }
}
```

- [ ] **Step 2: Crear `apps/web/next.config.mjs`**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@manos/shared'],
}

export default nextConfig
```

- [ ] **Step 3: Crear `apps/web/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Crear `apps/web/tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 5: Crear `apps/web/postcss.config.mjs`**

```javascript
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
```

- [ ] **Step 6: Crear `apps/web/vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 7: Crear `apps/web/src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 8: Crear `apps/web/src/app/layout.tsx` mínimo**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Manos a la Obra',
  description: 'Conectamos clientes con trabajadores de oficios',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  )
}
```

- [ ] **Step 9: Crear `apps/web/src/app/page.tsx` placeholder**

```tsx
export default function HomePage() {
  return <h1 className="p-8 text-2xl font-bold">Manos a la Obra</h1>
}
```

- [ ] **Step 10: Instalar dependencias desde la raíz del monorepo**

```bash
pnpm install
```

Esperado: instala todas las dependencias de `apps/web` y linkea `@manos/shared` desde el workspace. Sin errores.

- [ ] **Step 11: Verificar que el servidor de desarrollo levanta**

```bash
pnpm dev:web
```

Abrir http://localhost:3000 — debe mostrar "Manos a la Obra" en texto grande.
Detener con Ctrl+C.

- [ ] **Step 12: Commit**

```bash
git add apps/web/
git commit -m "feat(web): initialize Next.js 15 app with Tailwind and Vitest"
```

---

## Task 2: Configurar clientes Supabase para Next.js

**Files:**
- Create: `apps/web/.env.local`
- Create: `apps/web/src/lib/supabase/client.ts`
- Create: `apps/web/src/lib/supabase/server.ts`
- Create: `apps/web/src/lib/supabase/admin.ts`
- Create: `apps/web/src/lib/utils.ts`

- [ ] **Step 1: Crear `apps/web/.env.local`**

Las variables con `NEXT_PUBLIC_` son accesibles en el browser. Las otras solo en el servidor.

```bash
# apps/web/.env.local  (ya está en .gitignore de la raíz)
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
```

Los valores de anon key y service_role key son los mismos que están en el `.env.local` raíz (los de Supabase local).

- [ ] **Step 2: Crear `apps/web/src/lib/supabase/client.ts`**

Para usar en Client Components (`'use client'`).

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

- [ ] **Step 3: Crear `apps/web/src/lib/supabase/server.ts`**

Para usar en Server Components y Server Actions. Lee/escribe cookies para mantener la sesión.

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // En Server Components el set falla silenciosamente (solo lectura).
            // El middleware maneja el refresco de cookies.
          }
        },
      },
    }
  )
}
```

- [ ] **Step 4: Crear `apps/web/src/lib/supabase/admin.ts`**

Cliente con service_role para operaciones privilegiadas (solo se usa en el servidor — nunca exponer en el browser).

```typescript
import { createClient } from '@supabase/supabase-js'

export const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

- [ ] **Step 5: Crear `apps/web/src/lib/utils.ts`**

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium' }).format(new Date(date))
}
```

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/lib/ apps/web/.env.local
git commit -m "feat(web): add Supabase clients and utils"
```

---

## Task 3: Middleware de sesión y protección de rutas

**Files:**
- Create: `apps/web/src/middleware.ts`

El middleware se ejecuta en el Edge Runtime antes de cada request. Hace dos cosas:
1. Refresca el token de sesión de Supabase (necesario para que los Server Components tengan sesión válida).
2. Redirige a `/login` si el usuario no está autenticado y trata de acceder a rutas protegidas.

- [ ] **Step 1: Crear `apps/web/src/middleware.ts`**

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/', '/login', '/registro']

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isPublic = PUBLIC_PATHS.includes(path)

  if (!isPublic && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && (path === '/login' || path === '/registro')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
```

- [ ] **Step 2: Verificar manualmente**

Con el servidor corriendo (`pnpm dev:web`):
- Navegar a http://localhost:3000/dashboard → debe redirigir a http://localhost:3000/login
- Navegar a http://localhost:3000 → debe cargar la landing

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/middleware.ts
git commit -m "feat(web): add session middleware with route protection"
```

---

## Task 4: Layout raíz y Landing page

**Files:**
- Modify: `apps/web/src/app/layout.tsx`
- Modify: `apps/web/src/app/page.tsx`

- [ ] **Step 1: Actualizar `apps/web/src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Manos a la Obra',
  description: 'Conectamos clientes con trabajadores de oficios en Argentina',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Actualizar `apps/web/src/app/page.tsx`**

Landing con dos CTAs: "Soy cliente" y "Soy trabajador", redirigen al registro con el rol pre-seleccionado.

```tsx
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Manos a la Obra
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Encontrá el profesional que necesitás. Trabajadores verificados, cerca tuyo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/registro?rol=cliente"
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-lg"
          >
            Necesito un profesional
          </Link>
          <Link
            href="/registro?rol=trabajador"
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-colors text-lg"
          >
            Ofrezco mis servicios
          </Link>
        </div>

        <p className="text-gray-500">
          ¿Ya tenés cuenta?{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Verificar**

Con `pnpm dev:web`, abrir http://localhost:3000. Debe mostrar la landing con los dos botones y el link de login.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/app/layout.tsx apps/web/src/app/page.tsx
git commit -m "feat(web): add landing page with role-based registration CTAs"
```

---

## Task 5: Autenticación — Server Action de registro

**Files:**
- Create: `apps/web/src/actions/auth.ts`

El Server Action de registro:
1. Crea el usuario en `auth.users` vía `supabase.auth.signUp()`
2. Inserta el perfil en `public.users` via `adminClient` (service_role para saltear RLS)
3. Redirige a `/dashboard`

Nota: Supabase local tiene confirmación de email deshabilitada por defecto, por lo que `signUp` loguea al usuario directamente.

- [ ] **Step 1: Crear `apps/web/src/actions/auth.ts`**

```typescript
'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { adminClient } from '@/lib/supabase/admin'
import type { UserRole } from '@manos/shared'

export async function register(prevState: { error: string } | null, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const nombre = formData.get('nombre') as string
  const rol = formData.get('rol') as UserRole

  if (!email || !password || !nombre || !rol) {
    return { error: 'Todos los campos son requeridos.' }
  }

  if (password.length < 6) {
    return { error: 'La contraseña debe tener al menos 6 caracteres.' }
  }

  const supabase = await createClient()

  const { data, error: signUpError } = await supabase.auth.signUp({ email, password })

  if (signUpError) {
    return { error: signUpError.message }
  }

  if (!data.user) {
    return { error: 'No se pudo crear el usuario.' }
  }

  const { error: insertError } = await adminClient.from('users').insert({
    auth_id: data.user.id,
    email,
    nombre,
    rol,
  })

  if (insertError) {
    return { error: insertError.message }
  }

  redirect('/dashboard')
}

export async function login(prevState: { error: string } | null, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email y contraseña son requeridos.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: 'Credenciales inválidas.' }
  }

  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/src/actions/auth.ts
git commit -m "feat(web): add register, login, logout server actions"
```

---

## Task 6: Autenticación — Formularios y páginas

**Files:**
- Create: `apps/web/src/components/auth/RegisterForm.tsx`
- Create: `apps/web/src/components/auth/LoginForm.tsx`
- Create: `apps/web/src/app/(auth)/registro/page.tsx`
- Create: `apps/web/src/app/(auth)/login/page.tsx`

- [ ] **Step 1: Crear `apps/web/src/components/auth/RegisterForm.tsx`**

`useActionState` es el hook de React 19 para manejar el estado de Server Actions en formularios.

```tsx
'use client'

import { useActionState } from 'react'
import { register } from '@/actions/auth'
import type { UserRole } from '@manos/shared'

const ROL_LABELS: Record<string, string> = {
  cliente: 'Cliente — necesito contratar profesionales',
  trabajador: 'Trabajador — ofrezco mis servicios',
  proveedor: 'Proveedor — vendo materiales',
}

interface Props {
  rolInicial?: UserRole
}

export function RegisterForm({ rolInicial }: Props) {
  const [state, action, isPending] = useActionState(register, null)

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre completo
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Juan Pérez"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="juan@ejemplo.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Mínimo 6 caracteres"
        />
      </div>

      <div>
        <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de cuenta
        </label>
        <select
          id="rol"
          name="rol"
          defaultValue={rolInicial ?? 'cliente'}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {Object.entries(ROL_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>
    </form>
  )
}
```

- [ ] **Step 2: Crear `apps/web/src/components/auth/LoginForm.tsx`**

```tsx
'use client'

import { useActionState } from 'react'
import { login } from '@/actions/auth'

export function LoginForm() {
  const [state, action, isPending] = useActionState(login, null)

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="juan@ejemplo.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tu contraseña"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>
    </form>
  )
}
```

- [ ] **Step 3: Crear `apps/web/src/app/(auth)/registro/page.tsx`**

Lee el query param `rol` para pre-seleccionar el tipo de cuenta.

```tsx
import Link from 'next/link'
import { RegisterForm } from '@/components/auth/RegisterForm'
import type { UserRole } from '@manos/shared'

interface Props {
  searchParams: Promise<{ rol?: string }>
}

export default async function RegistroPage({ searchParams }: Props) {
  const params = await searchParams
  const rol = (params.rol as UserRole) ?? 'cliente'

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Crear cuenta</h1>
          <p className="text-gray-500 mb-6">Completá tus datos para registrarte.</p>

          <RegisterForm rolInicial={rol} />

          <p className="mt-4 text-center text-sm text-gray-500">
            ¿Ya tenés cuenta?{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Iniciá sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Crear `apps/web/src/app/(auth)/login/page.tsx`**

```tsx
import Link from 'next/link'
import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Iniciar sesión</h1>
          <p className="text-gray-500 mb-6">Bienvenido de vuelta.</p>

          <LoginForm />

          <p className="mt-4 text-center text-sm text-gray-500">
            ¿No tenés cuenta?{' '}
            <Link href="/registro" className="text-blue-600 hover:underline font-medium">
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 5: Verificar flujo de registro manualmente**

Prerrequisito: Supabase local debe estar corriendo. Si no está:
```bash
cd "/Users/renepariguana/Desktop/Proyectos/Manos a la obra"
supabase start
```

Con `pnpm dev:web` corriendo:
1. Ir a http://localhost:3000/registro?rol=cliente
2. Completar nombre, email, contraseña, rol "cliente"
3. Enviar — debe redirigir a /dashboard (que muestra "Manos a la Obra" placeholder por ahora)
4. Verificar en Supabase Studio (http://127.0.0.1:54323):
   - Table Editor → `auth.users` → debe aparecer el usuario
   - Table Editor → `public.users` → debe aparecer el registro con rol='cliente'

- [ ] **Step 6: Verificar flujo de login manualmente**

1. Ir a http://localhost:3000/login
2. Iniciar sesión con el usuario creado
3. Debe redirigir a /dashboard

- [ ] **Step 7: Commit**

```bash
git add apps/web/src/components/auth/ apps/web/src/app/\(auth\)/
git commit -m "feat(web): add registration and login pages with server actions"
```

---

## Task 7: Layout protegido con Navbar

**Files:**
- Create: `apps/web/src/components/nav/LogoutButton.tsx`
- Create: `apps/web/src/components/nav/Navbar.tsx`
- Create: `apps/web/src/app/(app)/layout.tsx`

- [ ] **Step 1: Crear `apps/web/src/components/nav/LogoutButton.tsx`**

Componente cliente para llamar el Server Action `logout`.

```tsx
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
```

- [ ] **Step 2: Crear `apps/web/src/components/nav/Navbar.tsx`**

Server Component: lee el usuario de Supabase y muestra links según rol.

```tsx
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { LogoutButton } from './LogoutButton'

export async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: perfil } = await supabase
    .from('users')
    .select('nombre, rol')
    .eq('auth_id', user.id)
    .single()

  const rol = perfil?.rol ?? 'cliente'

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="text-lg font-bold text-blue-600">
          Manos a la Obra
        </Link>

        <div className="flex items-center gap-6">
          {rol === 'trabajador' && (
            <Link href="/trabajos" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Trabajos disponibles
            </Link>
          )}
          {rol === 'cliente' && (
            <Link href="/trabajos/nuevo" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Publicar trabajo
            </Link>
          )}
          <span className="text-sm text-gray-400">{perfil?.nombre}</span>
          <LogoutButton />
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 3: Crear `apps/web/src/app/(app)/layout.tsx`**

```tsx
import { Navbar } from '@/components/nav/Navbar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </>
  )
}
```

- [ ] **Step 4: Verificar**

Logueado, http://localhost:3000/dashboard debe mostrar la Navbar con el nombre del usuario y los links correctos según el rol. El botón "Cerrar sesión" debe deslogear y redirigir a /login.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/components/nav/ apps/web/src/app/\(app\)/layout.tsx
git commit -m "feat(web): add protected layout with role-aware navbar"
```

---

## Task 8: Dashboard diferenciado por rol

**Files:**
- Create: `apps/web/src/app/(app)/dashboard/page.tsx`

- [ ] **Step 1: Crear `apps/web/src/app/(app)/dashboard/page.tsx`**

```tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: perfil } = await supabase
    .from('users')
    .select('nombre, rol')
    .eq('auth_id', user.id)
    .single()

  if (!perfil) redirect('/login')

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Hola, {perfil.nombre} 👋
      </h1>
      <p className="text-gray-500 mb-8">
        Cuenta: <span className="font-medium capitalize">{perfil.rol}</span>
      </p>

      {perfil.rol === 'cliente' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/trabajos/nuevo"
            className="block p-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <h2 className="text-lg font-semibold mb-1">Publicar trabajo</h2>
            <p className="text-blue-100 text-sm">Describí lo que necesitás y recibí postulaciones.</p>
          </Link>
        </div>
      )}

      {perfil.rol === 'trabajador' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/trabajos"
            className="block p-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <h2 className="text-lg font-semibold mb-1">Explorar trabajos</h2>
            <p className="text-blue-100 text-sm">Buscá trabajos disponibles cerca tuyo.</p>
          </Link>
        </div>
      )}

      {perfil.rol === 'proveedor' && (
        <div className="p-6 bg-gray-100 rounded-xl">
          <h2 className="text-lg font-semibold mb-1">Panel de proveedor</h2>
          <p className="text-gray-500 text-sm">Próximamente podrás gestionar tu catálogo de materiales.</p>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verificar**

- Loguearse como cliente → Dashboard muestra "Publicar trabajo"
- Loguearse como trabajador → Dashboard muestra "Explorar trabajos"

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/app/\(app\)/dashboard/
git commit -m "feat(web): add role-differentiated dashboard"
```

---

## Task 9: Server Actions de trabajos

**Files:**
- Create: `apps/web/src/actions/jobs.ts`

- [ ] **Step 1: Crear `apps/web/src/actions/jobs.ts`**

```typescript
'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { JobPost, ServiceCategory, Application } from '@manos/shared'

export async function getJobs(): Promise<(JobPost & { service_categories: ServiceCategory })[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('job_posts')
    .select('*, service_categories(id, nombre, icono)')
    .eq('estado', 'abierto')
    .order('created_at', { ascending: false })

  if (error) return []
  return data ?? []
}

export async function getJob(id: string): Promise<(JobPost & { service_categories: ServiceCategory }) | null> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('job_posts')
    .select('*, service_categories(id, nombre, icono)')
    .eq('id', id)
    .single()

  return data ?? null
}

export async function getCategories(): Promise<ServiceCategory[]> {
  const supabase = await createClient()
  const { data } = await supabase.from('service_categories').select('*').order('nombre')
  return data ?? []
}

export async function createJob(prevState: { error: string } | null, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'No autenticado.' }

  const { data: perfil } = await supabase
    .from('users')
    .select('id, rol')
    .eq('auth_id', user.id)
    .single()

  if (!perfil || perfil.rol !== 'cliente') {
    return { error: 'Solo los clientes pueden publicar trabajos.' }
  }

  const titulo = formData.get('titulo') as string
  const descripcion = formData.get('descripcion') as string
  const category_id = formData.get('category_id') as string
  const direccion = formData.get('direccion') as string

  if (!titulo || !descripcion || !category_id || !direccion) {
    return { error: 'Todos los campos son requeridos.' }
  }

  const { data: job, error } = await supabase
    .from('job_posts')
    .insert({
      cliente_id: perfil.id,
      titulo,
      descripcion,
      category_id,
      direccion,
      lat: -26.8083,
      lng: -65.2176,
    })
    .select('id')
    .single()

  if (error) return { error: error.message }

  redirect(`/trabajos/${job.id}`)
}

export async function applyToJob(prevState: { error: string; success: boolean } | null, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'No autenticado.', success: false }

  const { data: perfil } = await supabase
    .from('users')
    .select('id, rol')
    .eq('auth_id', user.id)
    .single()

  if (!perfil || perfil.rol !== 'trabajador') {
    return { error: 'Solo los trabajadores pueden postularse.', success: false }
  }

  const job_id = formData.get('job_id') as string
  const mensaje = formData.get('mensaje') as string

  const { error } = await supabase.from('applications').insert({
    job_id,
    worker_id: perfil.id,
    mensaje: mensaje || null,
  })

  if (error) {
    if (error.code === '23505') return { error: 'Ya te postulaste a este trabajo.', success: false }
    return { error: error.message, success: false }
  }

  return { error: '', success: true }
}

export async function getMyApplications(): Promise<Application[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data: perfil } = await supabase
    .from('users')
    .select('id')
    .eq('auth_id', user.id)
    .single()

  if (!perfil) return []

  const { data } = await supabase
    .from('applications')
    .select('*')
    .eq('worker_id', perfil.id)
    .order('created_at', { ascending: false })

  return data ?? []
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/src/actions/jobs.ts
git commit -m "feat(web): add job server actions (list, create, apply)"
```

---

## Task 10: Lista de trabajos (vista trabajador)

**Files:**
- Create: `apps/web/src/components/jobs/JobCard.tsx`
- Create: `apps/web/src/app/(app)/trabajos/page.tsx`

- [ ] **Step 1: Crear `apps/web/src/components/jobs/JobCard.tsx`**

Componente puramente presentacional — no tiene hooks ni Server Actions.

```tsx
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { JobPost, ServiceCategory } from '@manos/shared'

interface Props {
  job: JobPost & { service_categories: ServiceCategory }
}

export function JobCard({ job }: Props) {
  return (
    <Link
      href={`/trabajos/${job.id}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-semibold text-gray-900 text-base leading-snug">{job.titulo}</h3>
        <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap">
          {job.service_categories.nombre}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{job.descripcion}</p>
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <span>{job.direccion}</span>
        <span>{formatDate(job.created_at)}</span>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Crear `apps/web/src/app/(app)/trabajos/page.tsx`**

```tsx
import { getJobs } from '@/actions/jobs'
import { JobCard } from '@/components/jobs/JobCard'

export default async function TrabajosPage() {
  const jobs = await getJobs()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Trabajos disponibles</h1>

      {jobs.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No hay trabajos disponibles por ahora.</p>
          <p className="text-sm mt-1">Volvé a revisar más tarde.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Verificar**

Con Supabase local corriendo:
1. Loguearse como trabajador
2. Ir a http://localhost:3000/trabajos
3. Debe mostrar "No hay trabajos disponibles" (la DB está vacía)

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/components/jobs/JobCard.tsx apps/web/src/app/\(app\)/trabajos/page.tsx
git commit -m "feat(web): add job listing page with JobCard component"
```

---

## Task 11: Crear trabajo (vista cliente)

**Files:**
- Create: `apps/web/src/components/jobs/CreateJobForm.tsx`
- Create: `apps/web/src/app/(app)/trabajos/nuevo/page.tsx`

- [ ] **Step 1: Crear `apps/web/src/components/jobs/CreateJobForm.tsx`**

```tsx
'use client'

import { useActionState } from 'react'
import { createJob } from '@/actions/jobs'
import type { ServiceCategory } from '@manos/shared'

interface Props {
  categories: ServiceCategory[]
}

export function CreateJobForm({ categories }: Props) {
  const [state, action, isPending] = useActionState(createJob, null)

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
          Título del trabajo
        </label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          required
          maxLength={100}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: Reparación de caño roto en baño"
        />
      </div>

      <div>
        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
          Categoría
        </label>
        <select
          id="category_id"
          name="category_id"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">Seleccioná una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Describí el problema o la tarea con el mayor detalle posible..."
        />
      </div>

      <div>
        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
          Dirección
        </label>
        <input
          id="direccion"
          name="direccion"
          type="text"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: San Martín 500, San Miguel de Tucumán"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'Publicando...' : 'Publicar trabajo'}
      </button>
    </form>
  )
}
```

- [ ] **Step 2: Crear `apps/web/src/app/(app)/trabajos/nuevo/page.tsx`**

```tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getCategories } from '@/actions/jobs'
import { CreateJobForm } from '@/components/jobs/CreateJobForm'

export default async function NuevoTrabajoPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: perfil } = await supabase
    .from('users')
    .select('rol')
    .eq('auth_id', user.id)
    .single()

  if (perfil?.rol !== 'cliente') redirect('/dashboard')

  const categories = await getCategories()

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Publicar trabajo</h1>
      <p className="text-gray-500 mb-8">
        Describí lo que necesitás. Los trabajadores verificados podrán postularse.
      </p>
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <CreateJobForm categories={categories} />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verificar**

1. Loguearse como cliente
2. Ir a http://localhost:3000/trabajos/nuevo
3. Completar el formulario y publicar
4. Debe redirigir al detalle del trabajo (que aún no existe, dará 404 — OK por ahora)
5. Verificar en Supabase Studio → `job_posts` → debe aparecer el registro

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/components/jobs/CreateJobForm.tsx apps/web/src/app/\(app\)/trabajos/nuevo/
git commit -m "feat(web): add create job page for clients"
```

---

## Task 12: Detalle de trabajo y postularse (vista trabajador)

**Files:**
- Create: `apps/web/src/app/(app)/trabajos/[id]/page.tsx`

- [ ] **Step 1: Crear `apps/web/src/app/(app)/trabajos/[id]/page.tsx`**

El formulario de postulación es un Client Component inline porque necesita `useActionState`.

```tsx
import { createClient } from '@/lib/supabase/server'
import { getJob } from '@/actions/jobs'
import { notFound, redirect } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { ApplyForm } from './ApplyForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function DetalleTrabajoPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: perfil } = await supabase
    .from('users')
    .select('id, rol')
    .eq('auth_id', user.id)
    .single()

  const job = await getJob(id)
  if (!job) notFound()

  const esTrabajador = perfil?.rol === 'trabajador'

  // Verificar si ya se postuló
  let yaPostulado = false
  if (esTrabajador && perfil) {
    const { data: app } = await supabase
      .from('applications')
      .select('id')
      .eq('job_id', id)
      .eq('worker_id', perfil.id)
      .maybeSingle()
    yaPostulado = !!app
  }

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-xl font-bold text-gray-900">{job.titulo}</h1>
          <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap">
            {job.service_categories.nombre}
          </span>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">{job.descripcion}</p>

        <div className="flex flex-col gap-1 text-sm text-gray-500">
          <span>📍 {job.direccion}</span>
          <span>📅 Publicado el {formatDate(job.created_at)}</span>
        </div>
      </div>

      {esTrabajador && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Postularse a este trabajo</h2>
          {yaPostulado ? (
            <p className="text-green-600 font-medium">✓ Ya te postulaste a este trabajo.</p>
          ) : (
            <ApplyForm jobId={id} />
          )}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Crear `apps/web/src/app/(app)/trabajos/[id]/ApplyForm.tsx`**

```tsx
'use client'

import { useActionState } from 'react'
import { applyToJob } from '@/actions/jobs'

interface Props {
  jobId: string
}

export function ApplyForm({ jobId }: Props) {
  const [state, action, isPending] = useActionState(applyToJob, null)

  if (state?.success) {
    return <p className="text-green-600 font-medium">✓ ¡Te postulaste exitosamente!</p>
  }

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="job_id" value={jobId} />

      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
          Mensaje al cliente <span className="text-gray-400">(opcional)</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Presentate y contá por qué sos la persona indicada para este trabajo..."
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'Enviando...' : 'Postularme'}
      </button>
    </form>
  )
}
```

- [ ] **Step 3: Verificar flujo completo**

1. Como cliente: publicar un trabajo → anota el ID del job
2. Como trabajador: ir a http://localhost:3000/trabajos → el job aparece en la lista
3. Hacer clic en el job → ver el detalle
4. Postularse con un mensaje → debe mostrar "¡Te postulaste exitosamente!"
5. Recargar la página → debe mostrar "Ya te postulaste a este trabajo"
6. Verificar en Supabase Studio → `applications` → debe aparecer el registro

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/app/\(app\)/trabajos/\[id\]/
git commit -m "feat(web): add job detail page with apply form for workers"
```

---

## Task 13: Tests de utilidades y JobCard

**Files:**
- Create: `apps/web/src/__tests__/setup.ts`
- Create: `apps/web/src/__tests__/lib/utils.test.ts`
- Create: `apps/web/src/__tests__/components/jobs/JobCard.test.tsx`

- [ ] **Step 1: Crear `apps/web/src/__tests__/setup.ts`**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 2: Escribir test de utils — debe fallar primero**

Crear `apps/web/src/__tests__/lib/utils.test.ts`:

```typescript
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
})
```

- [ ] **Step 3: Correr test — debe pasar (utils ya existe)**

```bash
cd "apps/web" && pnpm test -- src/__tests__/lib/utils.test.ts
```

Esperado: PASS (5 tests).

- [ ] **Step 4: Escribir test de JobCard**

Crear `apps/web/src/__tests__/components/jobs/JobCard.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JobCard } from '@/components/jobs/JobCard'
import type { JobPost, ServiceCategory } from '@manos/shared'

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
```

- [ ] **Step 5: Correr test de JobCard**

```bash
pnpm test -- src/__tests__/components/jobs/JobCard.test.tsx
```

Esperado: PASS (5 tests).

- [ ] **Step 6: Correr todos los tests de la web**

```bash
pnpm test
```

Esperado: PASS (10 tests en 2 archivos).

- [ ] **Step 7: Commit**

```bash
git add apps/web/src/__tests__/
git commit -m "test(web): add utils and JobCard unit tests"
```

---

## Task 14: Verificación final del Plan 2

- [ ] **Step 1: Levantar Supabase local si no está corriendo**

```bash
supabase start
```

Verificar: Studio disponible en http://127.0.0.1:54323

- [ ] **Step 2: Levantar la web app**

```bash
pnpm dev:web
```

- [ ] **Step 3: Recorrer el flujo de cliente**

1. Ir a http://localhost:3000 → landing con dos botones
2. Hacer clic en "Necesito un profesional" → registro con rol=cliente pre-seleccionado
3. Registrarse → redirige a /dashboard con mensaje de bienvenida y card "Publicar trabajo"
4. Hacer clic en "Publicar trabajo" → formulario de nuevo trabajo
5. Completar y publicar → redirige al detalle del trabajo
6. Ir a http://localhost:3000/trabajos → muestra el trabajo publicado
7. Cerrar sesión

- [ ] **Step 4: Recorrer el flujo de trabajador**

1. Ir a http://localhost:3000/registro?rol=trabajador → registrarse como trabajador
2. Dashboard muestra "Explorar trabajos"
3. Ir a /trabajos → ver el trabajo publicado por el cliente
4. Hacer clic en el trabajo → ver detalle con formulario de postulación
5. Postularse con un mensaje → confirmación de éxito
6. Recargar → "Ya te postulaste a este trabajo"
7. Verificar en Supabase Studio → tabla `applications`

- [ ] **Step 5: Correr todos los tests del monorepo**

```bash
pnpm test
```

Esperado:
- `packages/shared`: 9 tests PASS
- `apps/web`: 10 tests PASS

- [ ] **Step 6: Tag del Plan 2 completado**

```bash
git tag plan-2-web-completo
```

---

## Resumen del Plan 2

Al completar este plan tendrás:
- Web app Next.js 15 con App Router en `apps/web`
- Autenticación completa: registro, login, logout vía Supabase Auth
- Middleware de protección de rutas
- Dashboard diferenciado por rol (cliente / trabajador / proveedor)
- Flujo de cliente: publicar trabajos con categoría y dirección
- Flujo de trabajador: explorar trabajos disponibles y postularse
- 10 tests unitarios pasando (utils + JobCard)
- Total monorepo: 19 tests PASS

**Siguiente:** Plan 3 — App Mobile (React Native + Expo)
