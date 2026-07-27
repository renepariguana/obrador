# Obrador v1 (App Store / Play Store) — Diseño

**Fecha:** 2026-07-24
**Objetivo:** Convertir Obrador de prototipo (datos y login simulados) a una app real, publicable en App Store y Google Play. La v1 hace real el núcleo del marketplace de oficios, con auth real, moderación y build de producción.

**Estado de partida (auditoría):**
- ✅ **Comparador de materiales**: real (Supabase, ~9.100 productos, imágenes). NO se toca.
- ✅ **Guía de proveedores** de materiales: queda como está.
- 🔴 **Marketplace de oficios**: mock (`src/data/profesionales.ts`, `pedidos.ts`).
- 🔴 **Auth**: simulado (`src/lib/auth.tsx` solo prende un booleano).

**Stack:** Expo SDK 54 · React Native 0.81 · Supabase (Postgres + Auth + Storage + RLS) · `@manos/shared` · EAS Build/Submit. Un solo código → iOS + Android.

---

## Decisiones (del brainstorming)
1. **Ambos flujos**: directorio (buscar y contactar) + bolsa de trabajo (publicar pedido y postularse).
2. **Una cuenta, ambos roles**: cualquier usuario puede ser cliente y además activar su perfil de trabajador.
3. **Sin pago in-app**: la app solo conecta; el pago se arregla por fuera. Los puntos/estrellas se ganan al completar trabajos calificados.
4. **Avisos dentro de la app** (sin push en v1): badge de pedidos nuevos en la pestaña Trabajos.
5. **iOS + Android**.

---

## 1. Autenticación (Supabase Auth)

Reemplaza el mock de `src/lib/auth.tsx` por Supabase Auth real, manteniendo la misma API del contexto (`useAuth`) para no romper las pantallas.

- **Métodos**: Google (OAuth), **Apple** (obligatorio por Guideline 4.8 si hay otros OAuth), Email con OTP/magic link.
- **Modo invitado**: se mantiene ("Ahora no" → `entrarInvitado`). El invitado puede navegar directorio y materiales; para **publicar pedido, postularse, contactar o dejar reseña** se le pide login.
- **Sesión persistente**: `supabase.auth` con almacenamiento en `expo-secure-store` (o AsyncStorage). El `AuthProvider` escucha `onAuthStateChange` y expone `usuario`, `logueado`, `ingresarGoogle/Apple/Email`, `cerrarSesion`, `borrarCuenta`.
- **Borrar cuenta** (Guideline 5.1.1(v)): función Edge de Supabase (`delete-account`) que borra el usuario de Auth + cascada de sus datos. Botón real en Mi Perfil con confirmación de 2 pasos.
- **Perfil inicial**: al primer login se crea la fila en `profiles` (trigger `on auth.users insert` o upsert desde la app).

## 2. Modelo de datos (Postgres + RLS)

Todas las tablas con Row Level Security. `id` de `profiles` = `auth.uid()`.

```
profiles            id(uuid, =auth.uid) · nombre · avatar_url · telefono · whatsapp ·
                    zona(text) · lat · lng · es_trabajador(bool) · creado_at
trabajadores        profile_id(uuid, PK/FK→profiles) · descripcion · verificado(bool, default false) ·
                    puntos(int, default 0) · activo(bool) · creado_at
trabajador_oficios  id · trabajador_id(FK) · oficio(text) · zona(text) · radio_km(int)
pedidos             id · cliente_id(FK→profiles) · oficio · descripcion · zona · lat · lng ·
                    estado('abierto'|'asignado'|'completado'|'cancelado') · asignado_a(FK→profiles, null) ·
                    creado_at
postulaciones       id · pedido_id(FK) · trabajador_id(FK→profiles) · mensaje ·
                    estado('postulado'|'elegido'|'rechazado') · creado_at · UNIQUE(pedido_id,trabajador_id)
reviews             id · autor_id(FK) · destinatario_id(FK) · pedido_id(FK) · estrellas(1..5) ·
                    comentario · creado_at · UNIQUE(pedido_id,autor_id)
reportes            id · reporter_id(FK) · tipo('usuario'|'pedido'|'review') · target_id ·
                    motivo · creado_at
bloqueos            id · bloqueador_id(FK) · bloqueado_id(FK) · UNIQUE(bloqueador_id,bloqueado_id)
```

**Rating y puntos**: se derivan de `reviews` (promedio de estrellas + cantidad). `puntos` se incrementa al completar un trabajo calificado (trigger o función). "verificado" = marca manual por ahora (no auto).

**RLS (resumen)**:
- `profiles`/`trabajadores`/`trabajador_oficios`: lectura pública (para el directorio); escritura solo del dueño.
- `pedidos`: lectura de abiertos por trabajadores del oficio; el cliente ve los suyos; escritura del cliente dueño.
- `postulaciones`: el trabajador crea la suya; el cliente del pedido las ve; nadie ve las de otros pedidos.
- `reviews`: lectura pública; escritura solo del autor y solo si participó del pedido completado.
- `bloqueos`: filtran lo que cada uno ve (no ver contenido de usuarios bloqueados).

## 3. Flujos y pantallas

Se reemplazan los mocks por lecturas/escrituras a Supabase, manteniendo las pantallas existentes y agregando las que falten.

- **Cliente**: `PedidosScreen`/nuevo pedido → publica en `pedidos`. `DetallePedidoScreen` → ve `postulaciones`, elige una (estado→asignado), marca completado, deja `review`.
- **Trabajador**: activa perfil (nueva pantalla "Mi perfil profesional": oficios, zona, descripción, fotos a Storage). `TrabajosScreen` → lista `pedidos` abiertos de su oficio/zona con **badge de nuevos** (comparando contra "último visto"); se postula.
- **Directorio**: `OficioScreen`/`ProfesionalScreen` → lee `trabajadores` + `trabajador_oficios` filtrando por oficio/zona; muestra perfil + `reviews`; **contactar por WhatsApp/llamada** (usa `telefono`/`whatsapp`).
- **Mapa (`InicioScreen`)**: los globos de pedidos salen de `pedidos` reales (hoy `MapaPedidos` usa mock).

Fotos de trabajos y avatar → **Supabase Storage** (hoy son placeholder picsum).

## 4. Seguridad de contenido (UGC — Apple 1.2 / Play)

Obligatorio para apps con contenido de usuarios:
- **Reportar** (usuario, pedido, review) → escribe en `reportes`.
- **Bloquear** usuario → `bloqueos`; se filtra su contenido.
- **Términos de uso** con cláusula de tolerancia cero al contenido abusivo + **Política de privacidad**. Se redactan y se hostean (LOG/Hostinger), se linkean en Login/Mi Perfil y en las fichas de las tiendas.

## 5. Build y envío

- **`eas.json`** con perfiles `development` (dev client), `preview` (APK/TestFlight interno) y `production`.
- Claves `EXPO_PUBLIC_SUPABASE_URL`/`ANON_KEY` como **EAS secrets** (hoy solo local).
- **Bundle id definitivo** (ej. `com.obrador.app`) — no se puede cambiar después del primer envío. `app.json`: iOS `bundleIdentifier` + Android `package`.
- **Ficha de privacidad** (nutrition label) en App Store Connect y **Data safety** en Play, coherentes con los datos usados (ubicación, fotos, contacto).
- **Requiere de René**: cuenta **Apple Developer** (US$99/año) y **Google Play Console** (US$25 única vez).

## 6. Fuera de alcance de v1 (futuro)
- Pago in-app (Mercado Pago), chat interno, notificaciones push, verificación automática de trabajadores, panel de admin web.

## Entregable
Una app donde un usuario real puede: registrarse, buscar y contactar trabajadores, publicar un pedido y recibir postulaciones, activar su perfil de oficio y postularse, calificar, reportar/bloquear y borrar su cuenta — con build de producción listo para TestFlight/Play y las políticas publicadas.
