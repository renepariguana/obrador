# Rediseño UI — Estilo Rapipago

## Objetivo

Rediseñar todas las páginas de la web app con la estructura y estilo visual de Rapipago: header azul, buscador, grilla de categorías con íconos, lista de ítems cercanos, barra de navegación inferior. Simple, rápido, transaccional.

## Sistema de diseño

| Token | Valor |
|-------|-------|
| `primary` | `#1a56db` (azul Rapipago) |
| `primary-light` | `#eff6ff` |
| `bg` | `#f5f7fa` (gris muy claro) |
| `surface` | `#ffffff` |
| `text-primary` | `#111827` |
| `text-secondary` | `#6b7280` |
| `border` | `#f3f4f6` |
| `shadow` | `0 1px 4px rgba(0,0,0,0.06)` |
| `radius-card` | `10px` |
| `radius-btn` | `8px` |

**Tipografía:** Inter (ya incluida en Tailwind). Títulos en `font-bold` o `font-extrabold`.  
**Botón primario:** fondo `primary`, texto blanco, `rounded-lg`.  
**Botón secundario:** borde `primary`, texto `primary`, fondo blanco.  
**Cards:** fondo blanco, `rounded-xl`, sombra sutil, sin borde.

## Estructura de navegación

Barra inferior fija en todas las páginas autenticadas con 4 tabs:

| Tab | Ícono | Ruta |
|-----|-------|------|
| Inicio | 🏠 | `/dashboard` |
| Mapa | 🗺️ | `/mapa` |
| Trabajos | 📋 | `/trabajos` |
| Perfil | 👤 | `/perfil` |

La barra superior (Navbar actual) se elimina en páginas autenticadas y es reemplazada por la barra inferior + un header contextual por página.

## Páginas

### 1. Landing `/` (pública)

- **Header azul** con nombre de la app y botones "Ingresar" / "Registrarse"
- **Buscador** embebido en el header: "¿Qué servicio necesitás?"
- **Mini mapa** (preview, 100px alto) con markers de trabajos (rojo) y trabajadores (azul). Botón "Ver mapa completo"
- **Grilla de categorías** 4 columnas: ícono + label. Las 10 categorías de servicio + "Ver todas"
- **Lista de profesionales cercanos**: cards con avatar inicial, nombre, categoría, distancia, rating. Click → `/registro`

### 2. Login `/login`

- Fondo blanco, centrado
- Logo/nombre arriba en azul
- Campos: email, contraseña
- Botón primario azul "Ingresar"
- Link "¿No tenés cuenta? Registrate"

### 3. Registro `/registro`

- Selector de rol (Trabajador / Cliente) como pills seleccionables al tope
- Campos: nombre, email, contraseña
- Botón primario azul "Crear cuenta"
- Link "¿Ya tenés cuenta? Ingresá"

### 4. Dashboard `/dashboard` (post-login)

- **Header azul**: "Hola, [nombre]" + avatar circular
- **Buscador** igual que landing
- **Acciones rápidas** según rol:
  - Cliente: card "Publicar trabajo" con ícono ➕
  - Trabajador: card "Ver trabajos disponibles" con contador de trabajos nuevos
- **Sección "Cerca de vos"**: misma lista de profesionales que la landing
- **Barra inferior** fija

### 5. Mapa `/mapa`

- Pantalla completa con OpenStreetMap (Leaflet)
- Markers rojos = trabajos activos
- Markers azules = trabajadores verificados
- Click en marker = popup con nombre + categoría + botón acción
- Header mínimo flotante con nombre app + botón volver

### 6. Lista de trabajos `/trabajos`

- Header contextual: "Trabajos disponibles"
- Filtro de categoría (chips horizontales scrolleables)
- Lista de cards: título, categoría, zona, fecha, botón "Postularme" o "Ver detalle"
- Para clientes: botón FAB (flotante) "＋ Publicar trabajo"

### 7. Detalle de trabajo `/trabajos/[id]`

- Header con botón atrás
- Título, descripción, categoría, dirección
- Mini mapa con ubicación del trabajo
- Botón primario "Postularme" (trabajadores) o info de postulantes (clientes)

### 8. Crear trabajo `/trabajos/nuevo`

- Header "Nuevo trabajo"
- Campos: título, descripción, categoría (selector), dirección
- Botón "Publicar"

### 9. Perfil `/perfil` (futuro, scope mínimo)

- Nombre, rol, email
- Botón "Cerrar sesión"

## Mapa — librería

Usar **Leaflet + OpenStreetMap** (gratuito, sin API key). Instalar `leaflet` y `react-leaflet`.  
Centro inicial: Tucumán, Argentina (`-26.8083, -65.2176`).  
Los `lat`/`lng` de `job_posts` y `worker_profiles` ya existen en la DB.

## Componentes a crear/actualizar

| Componente | Acción |
|-----------|--------|
| `AppHeader` | Nuevo — header azul con slot para contenido |
| `BottomNav` | Nuevo — barra inferior 4 tabs |
| `SearchBar` | Nuevo — buscador reutilizable |
| `CategoryGrid` | Nuevo — grilla 4 cols de categorías |
| `ProfessionalCard` | Nuevo — card de profesional estilo Rapipago |
| `JobCard` | Actualizar — estilo card blanca con sombra |
| `MapView` | Nuevo — mapa Leaflet con markers |
| `page.tsx` (landing) | Reescribir |
| `login/page.tsx` | Actualizar estilos |
| `registro/page.tsx` | Actualizar estilos |
| `dashboard/page.tsx` | Reescribir |
| `(app)/layout.tsx` | Agregar BottomNav, quitar Navbar |

## Out of scope

- Perfil público de trabajador (futuro)
- Filtros avanzados en el mapa
- Chat entre usuario y trabajador
- Sistema de pagos
