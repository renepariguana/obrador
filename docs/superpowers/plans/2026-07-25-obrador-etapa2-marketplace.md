# Obrador Etapa 2 — Flujos del marketplace — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (ejecución inline con checkpoints). Varias tareas se prueban contra Supabase real y en el device. Pasos con checkbox (`- [ ]`).

**Goal:** Reemplazar los datos mock del marketplace (`src/data/profesionales.ts`, `pedidos.ts`) por datos reales de Supabase, dejando funcionando el directorio (buscar y contactar) y la bolsa de trabajo (publicar pedido, postularse, elegir, calificar).

**Architecture:** El esquema ya existe (Etapa 1: profiles, trabajadores, trabajador_oficios, pedidos, postulaciones, reviews). Etapa 2 agrega la **capa de datos** (`*Api.ts` con RLS) y **cablea las pantallas existentes** a esos datos, aplicando el gate (`useGate`) a las acciones que requieren cuenta.

**Tech Stack:** Expo SDK 54 · Supabase (Postgres + RLS + Storage) · React Navigation.

## Global Constraints
- **NO romper** materiales ni la auth de Etapa 1.
- Toda escritura pasa por **RLS** (ya definida) y por el **gate** si el usuario es invitado.
- Rating/puntos se **derivan** de `reviews` (no se hardcodean). "verificado" = manual.
- Fotos (avatar, trabajos) → **Supabase Storage** (bucket público `obrador`), opcional por tarea.
- Español rioplatense. Un solo código iOS+Android.
- Sin pago in-app. Contacto por **WhatsApp/llamada** (`Linking`).

---

### Task 1: Directorio real (trabajadores por oficio/zona)

**Files:**
- Create: `apps/mobile/src/data/trabajadoresApi.ts`
- Modify: `apps/mobile/src/screens/OficioScreen.tsx`, `ProfesionalScreen.tsx`
- Delete (al final): `src/data/profesionales.ts` (mock) cuando nada lo use

**Interfaces:**
- Produces: `listarTrabajadores(oficio, zona?)`, `getTrabajador(id)` → `{ profile, oficios[], rating, reviewsCount, reviews[] }`.
- Consumes: `trabajadores`, `trabajador_oficios`, `profiles`, `reviews`.

- [x] **Step 1:** `trabajadoresApi`: `listarTrabajadores(oficio)` — join `trabajador_oficios!inner` filtrando por oficio, con `profiles` y agregando rating (avg estrellas de `reviews` del trabajador) + cantidad. Ordena por puntos/rating.
- [x] **Step 2:** `getTrabajador(id)` — perfil completo + oficios + últimas reviews.
- [x] **Step 3:** `OficioScreen`: lista real (loading/empty states) reemplazando `porOficio()` mock.
- [x] **Step 4:** `ProfesionalScreen`: datos reales + reviews. Botón **Contactar** (WhatsApp/llamada con `Linking`), envuelto en `useGate('contactar al profesional', …)`.
- [x] **Step 5:** Probar: entrar a un oficio muestra trabajadores reales; invitado que toca Contactar recibe el gate.

### Task 2: Perfil profesional (ofrecer servicios)

**Files:**
- Create: `apps/mobile/src/screens/PerfilProfesionalScreen.tsx`
- Modify: `apps/mobile/src/data/perfilApi.ts` (activar trabajador + oficios), `MiPerfilScreen.tsx` (entrada "Ofrecer mis servicios")

**Interfaces:**
- Produces: `activarTrabajador(descripcion)`, `setOficios(oficios[])`, `getMiPerfilProfesional()`.
- Consumes: `trabajadores`, `trabajador_oficios`.

- [x] **Step 1:** API: crear/actualizar fila en `trabajadores` (upsert por profile_id) + reemplazar sus `trabajador_oficios`.
- [x] **Step 2:** `PerfilProfesionalScreen`: form — descripción, elegir **oficios** (de una lista fija de rubros), zona/radio.
- [x] **Step 3:** `MiPerfilScreen`: la fila "Ofrecer mis servicios" abre esta pantalla (con gate si invitado).
- [x] **Step 4:** Probar: activás perfil, elegís "Plomero", y aparecés en el directorio de Plomero.

### Task 3: Publicar pedido (cliente)

**Files:**
- Create: `apps/mobile/src/data/pedidosApi.ts`, `apps/mobile/src/screens/PublicarPedidoScreen.tsx`
- Modify: `PedidosScreen.tsx` (botón "Publicar un pedido")

**Interfaces:**
- Produces: `publicarPedido({ oficio, descripcion, zona, lat, lng })`, `misPedidos()`.
- Consumes: `pedidos`.

- [x] **Step 1:** `pedidosApi.publicarPedido` — insert en `pedidos` (cliente_id = auth.uid, estado 'abierto').
- [x] **Step 2:** `PublicarPedidoScreen`: form — oficio, descripción, zona (de la ubicación). Con gate.
- [x] **Step 3:** `PedidosScreen`: botón "Publicar" → esta pantalla; lista **mis pedidos** reales con su estado.
- [x] **Step 4:** Probar: publicás un pedido y lo ves en "mis pedidos" con estado abierto.

### Task 4: Bolsa de trabajo (trabajador ve pedidos y se postula)

**Files:**
- Modify: `apps/mobile/src/screens/TrabajosScreen.tsx`
- Modify: `apps/mobile/src/data/pedidosApi.ts` (pedidos abiertos por oficio/zona + postularse)
- Delete (al final): `src/data/pedidos.ts` (mock)

**Interfaces:**
- Produces: `pedidosAbiertos(oficios[], zona?)`, `postularse(pedidoId, mensaje)`, `misPostulaciones()`.
- Consumes: `pedidos`, `postulaciones`.

- [x] **Step 1:** API: `pedidosAbiertos` — pedidos estado 'abierto' de los oficios del trabajador (o todos), ordenados por fecha; `postularse` inserta en `postulaciones`.
- [x] **Step 2:** `TrabajosScreen`: lista real de pedidos abiertos con **badge de nuevos** (comparando `creado_at` contra un "último visto" en AsyncStorage). Reemplaza `pedidosDeZona()` mock.
- [x] **Step 3:** Postularse desde el detalle del pedido (con gate). Evita doble postulación (UNIQUE ya en DB).
- [x] **Step 4:** Probar: un pedido publicado aparece en Trabajos; te postulás y queda registrado.

### Task 5: Gestión del pedido (cliente elige y completa)

**Files:**
- Modify: `apps/mobile/src/screens/DetallePedidoScreen.tsx`
- Modify: `apps/mobile/src/data/pedidosApi.ts`

**Interfaces:**
- Produces: `postulacionesDe(pedidoId)`, `elegir(postulacionId)`, `completarPedido(pedidoId)`.
- Consumes: `postulaciones`, `pedidos`.

- [x] **Step 1:** API: `postulacionesDe` (las del pedido, con datos del trabajador); `elegir` (estado postulación→'elegido', pedido→'asignado', asignado_a); `completarPedido` (estado→'completado').
- [x] **Step 2:** `DetallePedidoScreen` (dueño): ve postulaciones → **Elegir** una → luego **Marcar completado**.
- [x] **Step 3:** Probar: el cliente elige un postulante y completa el pedido.

### Task 6: Reseñas + puntos

**Files:**
- Create: `apps/mobile/src/data/reviewsApi.ts`
- Modify: `DetallePedidoScreen.tsx` (calificar al completar), `ProfesionalScreen.tsx` (mostrar reviews)
- Create: `Obrador/supabase/migrations/0002_puntos.sql` (trigger de puntos)

**Interfaces:**
- Produces: `calificar(pedidoId, destinatarioId, estrellas, comentario)`.
- Consumes: `reviews`.

- [x] **Step 1:** `0002_puntos.sql`: trigger `after insert on reviews` que suma puntos al `trabajadores.puntos` del destinatario (ej. +10 por reseña). (René lo corre.)
- [x] **Step 2:** `reviewsApi.calificar` — insert en `reviews` (RLS: solo autor, pedido completado).
- [x] **Step 3:** `DetallePedidoScreen`: al completar, pedir estrellas + comentario → `calificar`.
- [x] **Step 4:** Probar: calificás; el trabajador suma puntos y la reseña aparece en su perfil.

### Task 7: Mapa con pedidos reales

**Files:**
- Modify: `apps/mobile/src/screens/InicioScreen.tsx`, `src/components/MapaPedidos.tsx`

- [x] **Step 1:** `MapaPedidos` lee pedidos abiertos reales (con lat/lng) en vez del mock.
- [ ] **Step 2:** Tocar un globo → `DetallePedidoScreen` del pedido real.  _(cubierto vía carrusel: globo→carrusel→detalle; falta GPS real por pedido → diferido a Etapa 4)_
- [x] **Step 3:** Probar: un pedido publicado con ubicación aparece como globo en el mapa.

---

## Self-Review
- **Cobertura del spec (flujos):** directorio ✅, contactar ✅, perfil profesional ✅, publicar pedido ✅, postularse ✅, elegir/completar ✅, reseñas+puntos ✅, mapa ✅.
- **Gate:** aplicado a contactar (T1), ofrecer servicios (T2), publicar (T3), postularse (T4).
- **Dependencia de René:** Task 6 Step 1 (correr `0002_puntos.sql`). Storage de fotos: opcional, se puede diferir.
- **Orden sugerido:** T1 (directorio) → T2 (perfil prof.) → T3 (publicar) → T4 (bolsa) → T5 (gestión) → T6 (reseñas) → T7 (mapa). Cada una deja algo probable.
- **Moderación (reportar/bloquear) y Storage de fotos** = Etapa 3 (no acá).
