# Proveedores en el mapa — Diseño

**Fecha:** 2026-07-13
**Estado:** aprobado (pendiente implementación)

## Objetivo
Mostrar en el mapa de la app mobile, con un pin por proveedor, la Guía de Proveedores de la construcción (fuente: Excel de arquitecturayconstrucciondigital.com, ya importada a un Google Sheet: 2.889 filas, 178 rubros, 8 provincias). El mapa se dirige por **área visible**: a medida que el usuario se mueve/aleja/acerca hacia otra provincia, aparecen los proveedores de esa zona. Arranca centrado en Tucumán.

## Alcance
- **Incluye:** geocoding de todas las provincias (empezando por Tucumán para validar), tabla nueva en Supabase, capa de datos en la app, banner de entrada, pantalla con mapa por viewport + filtro por rubro, ficha del pin con acciones.
- **No incluye (por ahora):** edición de proveedores desde la app, ruteo/navegación al lugar, favoritos, reseñas.

## Modelo de datos (Supabase)
**Tabla nueva `guia_proveedores`** (separada de `proveedores`, que es el directorio de proveedores de *materiales* Easy/EMI y NO se toca):

```
guia_proveedores (
  id            uuid pk default gen_random_uuid(),
  rubro         text not null,
  proveedor     text not null,
  provincia     text,
  direccion     text,
  telefono      text,
  whatsapp      text,
  mail          text,
  web           text,
  lat           double precision,
  lng           double precision,
  geo_precision text,          -- 'rooftop' | 'range_interpolated' | 'approximate' | 'failed'
  fuente        text default 'guia-arqcons',
  actualizado   timestamptz not null default now(),
  unique (rubro, proveedor, provincia, direccion)   -- misma clave que el diff del actualizador
)
```
- RLS: lectura pública (anon key), escritura solo service_role (el script).
- Índices: `(lat, lng)` para consultas por bounds; `(provincia, rubro)`.
- Solo se pintan filas con `lat/lng` no nulos y `geo_precision != 'failed'`.

## Pipeline de geocoding (scraper, una vez / on-demand)
Nuevo `scraper/geocodificar-guia.js` (Node, reusa auth Google + cliente Supabase del scraper):
1. Lee la Guía (del Sheet o del xlsx maestro).
2. Deduplica por dirección normalizada (`direccion + provincia`) → set de direcciones únicas.
3. Geocodifica cada una con **Google Geocoding API** (`components=country:AR`, `region=ar`), con **caché en archivo** para no re-geocodificar ni gastar cuota.
4. Upsert a `guia_proveedores` (una fila por rubro×proveedor×sucursal, con lat/lng heredado de su dirección).
5. Log de precisión: cuántas rooftop / approximate / failed.
- **Orden:** primero Tucumán (validar), luego el resto con el mismo script (flag `--provincia` o todas).
- La `EXPO_PUBLIC_GOOGLE_MAPS_JS_KEY` es del cliente; el geocoding usa una **key de servidor** con Geocoding API habilitada (o la misma key sin restricción de referrer). Se configura en `scraper/.env`.

## Capa de datos en la app
`apps/mobile/src/data/guiaProveedoresApi.ts`:
- `proveedoresEnBounds({ minLat, maxLat, minLng, maxLng, rubro?, limite })` → consulta Supabase por rango de lat/lng (+ rubro opcional), con `limit`.
- `rubrosDisponibles()` → lista de rubros para el selector (distinct rubro).

## UI
1. **Banner "Proveedores"** en `InicioScreen`, **debajo del banner/grilla de Oficios** → `navigation.navigate('Proveedores')`. Mismo lenguaje visual (amarillo Manos, ícono).
2. **Ruta nueva** `Stack.Screen name="Proveedores"` en `App.tsx`.
3. **`ProveedoresScreen`**:
   - Header con selector de **rubro** (reusa estilo de `FiltrosSheet`; opción "Todos").
   - **`MapaProveedores`** (WebView Google Maps, copia adaptada de `MapaPedidos`), centrado en Tucumán (-26.8241, -65.2226).
4. **`MapaProveedores.tsx`**:
   - Al terminar de moverse el mapa (evento `idle`), postea los **bounds** a RN (debounced ~400 ms).
   - RN consulta `proveedoresEnBounds(bounds, rubro)` y reinyecta los markers (`postMessage` con el nuevo set).
   - Pin → burbuja con **Proveedor · Rubro · Dirección** + botones **Llamar** (`tel:`), **WhatsApp** (`wa.me`), **Web**.
   - **Tope de pines por vista** (ej. 300). Si el área es muy grande (zoom bajo) y supera el tope, se muestra un aviso "Acercá o filtrá por rubro" en vez de saturar.

## Flujo de datos
`Sheet/xlsx → geocodificar-guia.js → Supabase guia_proveedores → guiaProveedoresApi (bounds+rubro) → MapaProveedores (WebView) → pin/ficha`.

## Manejo de errores
- Geocoding falla o ambiguo → `geo_precision='failed'`, no se pinta; queda listado en el log para revisión.
- Sin conexión / error Supabase → el mapa muestra estado vacío con reintento.
- Dirección vacía → se saltea (no se geocodifica).

## Testing
- Unit (web tienen `__tests__`; mobile con Jest si está configurado, si no, pruebas manuales): normalización de dirección y clave de dedup; parseo de bounds; armado de query.
- Manual en Expo Go: abrir banner → ver pines de Tucumán → alejar hacia Salta → aparecen los de Salta → filtrar rubro → tocar pin → WhatsApp abre.

## Fases
1. Migración `guia_proveedores` + script de geocoding (Tucumán) + verificar datos.
2. `guiaProveedoresApi` + `MapaProveedores` + `ProveedoresScreen` + ruta + banner.
3. Correr geocoding del resto de provincias.
4. (Futuro) cercanía / ordenar por distancia; clustering numérico a zoom bajo.
