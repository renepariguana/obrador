# Obrador Etapa 1 — Auth real + fundación de datos — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans para implementar este plan tarea por tarea (no subagentes: varias tareas requieren acciones de René en los dashboards de Supabase/Apple/Google que un subagente no puede hacer). Los pasos usan checkbox (`- [ ]`).

**Goal:** Reemplazar el auth simulado por Supabase Auth real (Google/Apple/email), crear el esquema de datos con RLS, el perfil de usuario, y el borrado de cuenta — dejando la base sobre la que se construyen los flujos del marketplace.

**Architecture:** Supabase Auth con sesión persistida en `expo-secure-store`. `AuthProvider` (reescrito, misma API `useAuth`) escucha `onAuthStateChange`. Esquema Postgres con RLS. Perfil se crea al primer login. Borrado de cuenta vía Edge Function con service role.

**Tech Stack:** Expo SDK 54 · RN 0.81 · `@supabase/supabase-js` (via `@manos/shared`) · `expo-apple-authentication` · `expo-auth-session`/`expo-web-browser` (Google) · `expo-secure-store` · Supabase (Postgres + Auth + Edge Functions).

## Global Constraints
- **NO romper** el comparador de materiales ni la Guía de proveedores (ya reales).
- El cliente usa **solo la anon key** (nunca service_role). Las env: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
- **Mantener la API del contexto** `useAuth` lo más compatible posible con las pantallas actuales (`paso`, `logueado`, `entrarInvitado`, `cerrarSesion`) para no romperlas; se agregan `usuario`, métodos reales y `borrarCuenta`.
- Todas las tablas con **RLS activada**; nada accesible sin política explícita.
- Modo **invitado** se mantiene (explorar sin login).
- Idioma UI: **español rioplatense**.
- Toda migración de esquema se entrega como **SQL** que René corre en el SQL Editor de Supabase (no hay DDL por PostgREST).

---

### Task 1: Esquema de datos + RLS (migración SQL)

**Files:**
- Create: `Obrador/supabase/migrations/0001_marketplace.sql`

**Interfaces:**
- Produces: tablas `profiles`, `trabajadores`, `trabajador_oficios`, `pedidos`, `postulaciones`, `reviews`, `reportes`, `bloqueos` con RLS. Etapa 1 usa `profiles`/`trabajadores`/`trabajador_oficios`; el resto queda creado para etapas siguientes.

- [ ] **Step 1: Escribir el SQL de tablas + índices + RLS.** Incluye todas las tablas del diseño. `profiles.id` referencia `auth.users(id)`. RLS: lectura pública de perfiles/trabajadores/oficios/reviews; escritura solo del dueño (`auth.uid()`). Trigger `handle_new_user` que inserta en `profiles` al crearse un `auth.users`. (SQL completo en el cuerpo de la tarea al ejecutar.)
- [ ] **Step 2: René lo corre** en Supabase → SQL Editor. Verificar que las 8 tablas existen y RLS está `enabled`.
- [ ] **Step 3: Verificar** con una query de prueba (insert de un profile falso falla por RLS sin auth; select público de trabajadores anda).
- [ ] **Step 4: Commit** del `.sql`.

### Task 2: Configurar proveedores de Auth (dashboards)

**Files:** (sin código; configuración + notas)
- Create: `Obrador/docs/auth-setup.md` (pasos y credenciales necesarias, sin secretos)

**Interfaces:**
- Produces: Google OAuth (client id/secret) y Apple Sign In habilitados en Supabase Auth; redirect URIs correctas para Expo.

- [ ] **Step 1:** En Supabase → Authentication → Providers: habilitar **Email** (OTP), **Google**, **Apple**.
- [ ] **Step 2 (René):** Crear credenciales OAuth de **Google** (Google Cloud Console, proyecto "LOG arquitectura") y **Apple** (Apple Developer → Sign in with Apple). Cargar client id/secret en Supabase.
- [ ] **Step 3:** Configurar el **redirect scheme** de la app (`obrador://` en `app.json` → `scheme`) y agregarlo a los Redirect URLs de Supabase.
- [ ] **Step 4:** Documentar en `docs/auth-setup.md` qué quedó configurado (sin pegar secretos).

### Task 3: Cliente de auth + AuthProvider real

**Files:**
- Modify: `apps/mobile/src/lib/supabase.ts` (storage con secure-store)
- Rewrite: `apps/mobile/src/lib/auth.tsx` (Supabase Auth, misma API + extras)
- Modify: `apps/mobile/package.json` (deps: `expo-secure-store`, `expo-apple-authentication`, `expo-web-browser`, `expo-auth-session`)

**Interfaces:**
- Produces: `useAuth()` → `{ paso, usuario, logueado, cargando, ingresarGoogle, ingresarApple, ingresarEmail(email), entrarInvitado, cerrarSesion, borrarCuenta }`.
- Consumes: `supabase.auth` de Task 1/2.

- [ ] **Step 1:** Configurar el cliente Supabase con `auth: { storage: SecureStore adapter, persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }`.
- [ ] **Step 2:** Reescribir `AuthProvider`: estado desde `supabase.auth.getSession()` + `onAuthStateChange`. Derivar `logueado` de la sesión; `paso` se mantiene ('ubicacion'|'login'|'app') para el flujo de arranque.
- [ ] **Step 3:** Implementar `ingresarGoogle`/`ingresarApple`/`ingresarEmail` (OTP) usando `expo-auth-session`/`expo-apple-authentication`.
- [ ] **Step 4:** `cerrarSesion` → `supabase.auth.signOut()`. `borrarCuenta` → llama la Edge Function (Task 6).
- [ ] **Step 5:** Probar en device: login con email OTP entra y persiste tras reiniciar la app.

### Task 4: LoginScreen funcional

**Files:**
- Modify: `apps/mobile/src/screens/LoginScreen.tsx`

- [ ] **Step 1:** Cablear botones a los métodos reales (`ingresarGoogle`, `ingresarApple`, `ingresarEmail`), con estado de carga y manejo de error.
- [ ] **Step 2:** Flujo de **email OTP**: input de email → envía código → input de código → entra.
- [ ] **Step 3:** Botón de **Apple** solo en iOS (o con fallback), estilo HIG. "Ahora no" mantiene invitado.
- [ ] **Step 4:** Link real a **Términos y Política de privacidad** (URLs de Task de Etapa 3; placeholder temporal marcado).
- [ ] **Step 5:** Probar los 3 métodos en device.

### Task 5: Perfil de usuario (crear + editar)

**Files:**
- Create: `apps/mobile/src/data/perfilApi.ts` (getPerfil, upsertPerfil)
- Modify: `apps/mobile/src/screens/MiPerfilScreen.tsx` (datos reales + editar)
- Create: `apps/mobile/src/screens/EditarPerfilScreen.tsx`

**Interfaces:**
- Consumes: `profiles` (Task 1), `useAuth().usuario`.
- Produces: perfil real editable (nombre, teléfono, whatsapp, zona, avatar).

- [ ] **Step 1:** `perfilApi`: leer/escribir la fila de `profiles` del usuario logueado.
- [ ] **Step 2:** `MiPerfilScreen` muestra datos reales del usuario (no mock) + botón "Editar perfil".
- [ ] **Step 3:** `EditarPerfilScreen`: form (nombre, teléfono, whatsapp, zona). Avatar a Storage (opcional en este task).
- [ ] **Step 4:** Probar: editar y ver persistido tras recargar.

### Task 6: Borrar cuenta (Edge Function + UI)

**Files:**
- Create: `Obrador/supabase/functions/delete-account/index.ts`
- Modify: `apps/mobile/src/screens/MiPerfilScreen.tsx` (botón real)

**Interfaces:**
- Consumes: `useAuth().borrarCuenta`.
- Produces: borrado real del usuario Auth + cascada de datos.

- [ ] **Step 1:** Edge Function `delete-account`: valida el JWT del usuario, borra sus filas (pedidos/postulaciones/reviews/trabajador/profile) y `auth.admin.deleteUser(uid)` con service role.
- [ ] **Step 2 (René):** desplegar la function (`supabase functions deploy delete-account`).
- [ ] **Step 3:** Botón "Eliminar cuenta" con **confirmación de 2 pasos** → llama la function → cierra sesión.
- [ ] **Step 4:** Probar el borrado con una cuenta de prueba.

### Task 7: Gate de login (invitado vs logueado)

**Files:**
- Modify: pantallas que escriben (publicar pedido, postularse, contactar, reseñar) — en Etapa 1 solo se prepara el helper y se aplica donde ya exista acción.
- Create: `apps/mobile/src/components/RequiereLogin.tsx` (helper/sheet "Iniciá sesión para…")

- [ ] **Step 1:** Helper `pedirLogin(accion)` que, si es invitado, muestra un sheet "Iniciá sesión para {acción}" con botón a Login.
- [ ] **Step 2:** Aplicarlo al botón de **contactar** en el directorio (única acción de escritura presente hoy; las demás llegan en Etapa 2).
- [ ] **Step 3:** Probar: invitado navega; al contactar le pide login.

---

## Self-Review
- **Cobertura del spec (auth + datos):** tablas ✅, RLS ✅, auth Google/Apple/email ✅, perfil ✅, borrar cuenta ✅, gate invitado ✅. Los flujos (pedidos/postulaciones/reviews) y moderación quedan para Etapa 2/3 (fuera de este plan, a propósito).
- **Consistencia de tipos:** `profiles.id = auth.uid()` usado igual en todas las FKs; `useAuth` API extendida sin romper `paso`/`entrarInvitado`/`cerrarSesion`.
- **Dependencia de René:** Tasks 1, 2 y 6 requieren correr SQL / configurar dashboards / desplegar function. Marcadas explícitamente.
