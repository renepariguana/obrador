# App mobile Manos a la Obra — estilo PedidosYa

> Reemplaza al spec `2026-06-30-redesign-rapipago-style.md`.
> **Objetivo nuevo:** la app **mobile (Expo / React Native)** publicable en App Store
> y Google Play, con estética PedidosYa en **amarillo**. La web (`apps/web`) queda como
> está; el foco es la app nativa.

## Objetivo

Construir la app mobile de Manos a la Obra con estética PedidosYa (marketplace visual,
buscador, categorías, cards de profesionales con rating, ubicación, barra inferior),
en **amarillo**, lista para **aprobación en App Store sin complicaciones**.

## Plataforma

- **Expo / React Native** (`apps/mobile`). ⚠️ Expo cambió: leer los docs versionados
  actuales antes de codear (ver `apps/mobile/AGENTS.md`).
- Backend: el mismo **Supabase** que ya usa la web (auth, DB, RLS, storage).
- Reusa `packages/shared` (tipos + cliente Supabase).

## Sistema de diseño (tokens)

| Token | Light | Dark | Uso |
|-------|-------|------|-----|
| `primary` | `#FFBF00` | `#FFBF00` | amarillo de marca — header, CTAs, activos |
| `primary-dark` | `#E6AC00` | `#E0A800` | gradiente/hover |
| `primary-soft` | `#FFF3C4` | `#3A2E00` | chips/badges suaves |
| `on-primary` | `#1A1A1A` | `#1A1A1A` | **texto sobre amarillo (oscuro, no blanco)** |
| `accent-ink` | `#A07800` | `#E9C64D` | links/acentos sobre superficie |
| `bg` | `#EEF0F3` | `#0C0D10` | fondo |
| `surface` | `#FFFFFF` | `#191B21` | cards, header inferior |
| `text` | `#16181D` | `#ECEEF2` | texto principal |
| `text-2` | `#6B7280` | `#9AA1AD` | secundario |
| `rating` | `#0A8F72` | `#35C79E` | pill de rating (verde) |

- **Tipografía:** system font (San Francisco en iOS / Roboto en Android) o Inter. Títulos peso 800-900, tracking negativo.
- **Íconos:** **de línea, minimalistas** (set propio tipo Lucide). **Nada de emojis.**
- **Cards:** blancas, `borderRadius 12-16`, sombra sutil, foto/avatar.
- **Rating:** pill verde con estrella.
- **Contraste:** como el primario es amarillo, todo texto/ícono encima va en `on-primary` (oscuro).

## Navegación — barra inferior (5 tabs)

Estilo PedidosYa: ícono de línea; el **activo** va relleno + label en negrita, color gris oscuro (no coloreado); inactivos en línea gris.

| Tab | Ícono | Contenido |
|-----|-------|-----------|
| **Inicio** | casa | dashboard: buscador, categorías, mini-mapa, "cerca tuyo" |
| **Proveedores** | tienda | listado/búsqueda de proveedores de materiales |
| **Materiales** | caja | catálogo de materiales / precios |
| **Trabajos** | portafolio | bolsa de trabajos (publicar / postularse) |
| **Mi perfil** | usuario | datos, rol, rating, **borrar cuenta**, cerrar sesión |

## Pantallas principales

### Login (`estilo PedidosYa`)
- Hero amarillo con la marca (**una mano levantada / palma abierta** = logo provisorio) + gancho + "Ahora no" (invitado).
- Botones: **Continuar con Google**, **Continuar con Apple**, **Continuar con Facebook**, **Otro método** (email/celular).
- Términos y políticas al pie.
- **App Store:** al ofrecer Google/Facebook, Apple exige "Sign in with Apple" → ya está incluido. ✅

### Inicio / Dashboard
- Header amarillo: ubicación ("Tu zona · …"), saludo, **campana de notificaciones** (arriba derecha), buscador.
- Grilla de categorías (oficios) con íconos de línea.
- Mini-mapa (preview) → abre mapa completo.
- Carrusel "Cerca tuyo": cards de profesionales (avatar, oficio, rating pill, distancia, "Verificado").
- Card "Publicá tu trabajo".

### Mapa
- Pantalla con mapa (React Native Maps u OSM). Markers: trabajos vs profesionales. Popup con acción.
- Centro inicial: Tucumán (`-26.8083, -65.2176`). `lat/lng` ya están en la DB.

### Trabajos / Proveedores / Materiales
- Listas con chips de filtro + cards. Detalle con acción (postularse / contactar).

### Mi perfil
- Datos, rol, rating. **Borrar cuenta** (obligatorio App Store). Cerrar sesión.

## Reputación, verificación y pagos (motor de confianza)

Núcleo del modelo de la plataforma:

- **Verificación de identidad:** el usuario se verifica con **reconocimiento facial + DNI** (KYC). Al aprobarse, muestra el badge **"Verificado"**. Da confianza y desbloquea reputación.
- **Estrellas = puntos:** el rating (estrellas) se forma con **puntos**. El trabajador **suma puntos cuando cobra el trabajo A TRAVÉS de la app** (pago in-app con MercadoPago).
- **Anti-bypass (clave):** si el pago se hace por fuera (directo, en efectivo), **NO suma puntos ni estrellas**. Así se desalienta usar la app solo para conseguir el trabajo y pagar afuera — la reputación (y por ende visibilidad/ranking) sólo crece transaccionando dentro.
- **Reseñas y recomendaciones:** tras el trabajo, los **clientes pueden escribir reseñas y recomendar** al trabajador. Suman a la reputación.
- **App Store:** el pago in-app es por un **servicio del mundo real** (contratar un oficio) → **MercadoPago (pago externo)**, permitido por Apple, **sin IAP**. Los puntos/estrellas son **reputación**, no un bien digital.

> Impacto en etapas: verificación (KYC), pago in-app (MercadoPago) y reseñas son features de etapas posteriores (no la Etapa 1), pero el diseño ya reserva los lugares (badge Verificado, pill de estrellas, sección de reseñas).

## Ubicación y "trabajo en vivo"

- **Elegí tu zona al iniciar la app:** onboarding con mapa (pin central que se mueve), buscador de dirección/barrio, "usar mi ubicación actual". Define la zona que filtra pedidos y profesionales. (Con fallback manual si niegan el permiso — App Store.)
- **Ubicación en vivo (trabajador):** toggle para **compartir ubicación en tiempo real mientras trabaja**; el cliente ve dónde está.
- **Modo "trabajo en curso":** durante el trabajo, el trabajador puede **subir fotos del avance** + compartir ubicación en vivo → el cliente sigue el progreso. Refuerza confianza y transacción dentro de la app.

## Requisitos App Store (para aprobar sin complicaciones)

1. **Sign in with Apple** presente junto a Google/Facebook. ✅ (en el login)
2. **Borrar cuenta in-app** desde Mi perfil (Guideline 5.1.1).
3. **Pagos:** contratar profesionales / comprar materiales = **servicios del mundo real** → se cobran por fuera (MercadoPago), NO requieren IAP. *(Revisar aparte si hay "suscripción para desbloquear la app": eso sí podría requerir IAP.)*
4. **Ubicación:** permiso con texto claro (`NSLocationWhenInUseUsageDescription`); la app funciona si lo niegan (fallback a Tucumán/zona manual).
5. **Privacidad:** política de privacidad publicada + privacy labels; sin recolectar datos no declarados.
6. **Cuenta demo** para el revisor + build estable, sin pantallas "en construcción" ni links rotos.
7. **App real nativa**, no un webview envuelto.

## Etapas de implementación

1. **Base Expo + diseño:** proyecto Expo al día, tokens (amarillo), navegación de 5 tabs, set de íconos de línea, componentes base (AppHeader, BottomNav, Button, Card).
2. **Auth:** pantalla de login social (Google/Apple/Facebook/email) sobre Supabase Auth; sesión; borrar cuenta.
3. **Inicio:** buscador, categorías, carrusel de profesionales (datos reales de Supabase), mini-mapa.
4. **Mapa:** mapa completo con markers.
5. **Trabajos / Proveedores / Materiales:** listas + detalle + publicar/postularse.
6. **Mi perfil** + cierre de compliance (privacidad, permisos, cuenta demo) → build de prueba (EAS) → envío.

## Out of scope (de la Etapa 1; sí son parte del producto más adelante)
- **Verificación facial + DNI (KYC)** → etapa posterior.
- **Pago in-app con MercadoPago + puntos/estrellas** → etapa posterior (NO es IAP de Apple; es pago externo por servicio real).
- **Reseñas y recomendaciones** → etapa posterior.
- Chat en la app.
- Notificaciones push.
- IAP de Apple: **no aplica** (se usa MercadoPago).
