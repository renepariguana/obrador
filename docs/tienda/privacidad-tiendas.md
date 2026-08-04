# Privacidad para las tiendas — OBRADOR

Respuestas para completar el **Data Safety** (Google Play) y el **App Privacy** (App Store).
Basado en lo que la app realmente recopila. Política de privacidad online:
https://renepariguana.github.io/obrador/privacidad.html

**Resumen honesto:** Obrador recopila lo mínimo para funcionar (cuenta + contacto + ubicación aproximada +
fotos opcionales). **No** vende datos, **no** hace publicidad, **no** rastrea a través de otras apps/sitios.
Todo viaja **cifrado (HTTPS)** y el usuario puede **borrar su cuenta** desde la app.

---

## 🟢 Google Play — Data Safety

**¿La app recopila o comparte datos de usuario?** → Sí, recopila. **No comparte** con terceros.
**¿Todos los datos están cifrados en tránsito?** → **Sí.**
**¿Los usuarios pueden pedir que se borren sus datos?** → **Sí** (borran la cuenta desde la app → Mi Perfil → Eliminar cuenta).

Por cada tipo de dato: *Recopilado = Sí · Compartido = No · Procesado efímeramente = No · Requerido u opcional · Propósito.*

| Categoría | Dato | ¿Recopila? | Req./Opc. | Propósito |
|---|---|---|---|---|
| **Ubicación** | Ubicación aproximada | Sí | Opcional | Funcionalidad de la app (mostrar oficios/pedidos cerca). *Nunca exacta.* |
| **Info personal** | Nombre | Sí | Opcional | Funcionalidad de la app |
| **Info personal** | Email | Sí | Requerido | Gestión de la cuenta / Funcionalidad |
| **Info personal** | Teléfono | Sí | Opcional | Funcionalidad (contacto entre cliente y profesional) |
| **Info personal** | Direcciones | No | — | — |
| **Fotos y videos** | Fotos | Sí | Opcional | Funcionalidad de la app (fotos del pedido/trabajo) |
| **Credenciales** | Contraseña | Sí (la gestiona el proveedor de auth, hasheada) | Requerido | Autenticación |
| **Actividad / Historial** | — | No | — | — |
| **Info de contactos** | — | No | — | — |
| **ID de dispositivo / Publicidad** | — | No | — | — |

**Propósitos NO usados** (dejar sin marcar): Publicidad o marketing, Analítica de terceros con fines
publicitarios, Personalización, Puntaje crediticio, Venta de datos.

---

## 🍎 App Store — App Privacy (etiqueta de privacidad)

**¿Rastreás al usuario (tracking) a través de apps/sitios de otras empresas?** → **NO.**
(No hay SDKs de publicidad ni IDFA.)

### Datos VINCULADOS a la identidad del usuario (Data Linked to You)
Todos con propósito **"Funcionalidad de la app"** (App Functionality):
- **Información de contacto:** Nombre, Email, Teléfono.
- **Ubicación:** Ubicación aproximada (Coarse Location). *No se usa ubicación precisa.*
- **Contenido del usuario:** Fotos.
- **Identificadores:** ID de usuario (el de la cuenta).

### Datos NO vinculados (Data Not Linked to You)
- Ninguno.

### Datos usados para rastrear (Used to Track You)
- Ninguno.

---

## Notas y verificaciones
- **Ubicación:** la app guarda la ubicación de los pedidos **aproximada (~100 m)**, nunca la exacta (migración 0004 en Supabase). Declarar **"aproximada"** en ambos formularios.
- **Teléfono/WhatsApp:** están en una tabla privada; solo se revelan con login + relación (función `contacto_de`). Se recopilan pero no se "comparten" públicamente.
- **Contraseña:** la hashea Supabase Auth (bcrypt); nunca se guarda en texto ni se comparte.
- **Borrado de cuenta:** Edge Function `delete-account` (ya desplegada) → borra el usuario y sus datos en cascada.
- **Menores:** la app no está dirigida a niños. Clasificación de contenido sugerida: **Todos / 4+** (sin contenido sensible). Google pedirá completar el cuestionario de clasificación (IARC).
- Si en el futuro se agrega **login con Google/Apple**, sigue siendo "Funcionalidad de la app" (autenticación), no cambia lo de tracking.
