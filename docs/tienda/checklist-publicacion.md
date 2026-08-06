# Checklist de publicación — OBRADOR

Guía paso a paso para subir la app a **Google Play** y **App Store**.
Proyecto EAS: `@logarquitectura/obrador` · Bundle id: `com.obrador.app`

---

## ✅ Ya está listo (preparado por Claude)
- **Marca**: logo del login (wordmark) + **ícono de app** (O-pin sobre amarillo) + **splash** + **feature graphic** (`docs/tienda/feature-graphic.png`).
- **Fichas de tienda**: `docs/tienda/fichas-tienda.md` (título, descripción, keywords, categoría).
- **Privacidad**: `docs/tienda/privacidad-tiendas.md` (Data Safety + App Privacy) + política online.
- **Legales** (términos/privacidad) online en GitHub Pages.
- **Seguridad**: RLS + contacto privado + ubicación aproximada + login para leer (migraciones 0004/0005 corridas).
- **Config**: `eas.json` (perfiles), permisos, `ITSAppUsesNonExemptEncryption:false`, bundle id.
- **APK de prueba** compilado (perfil preview).
- **Google OAuth** configurado (falta probarlo en el APK).

---

## 🟢 GOOGLE PLAY (Android)

### 1. Cuenta (vos)
- Crear cuenta en **Google Play Console** → pago único **USD 25**: https://play.google.com/console/signup

### 2. Probar el APK (vos, con un Android)
- Instalar el APK del build `preview` (link en expo.dev) y verificar: login (email + Google), mapa, pedidos, materiales.

### 3. Build de producción (AAB)
```bash
cd apps/mobile
eas build --profile production --platform android
```
→ genera un **.aab** (el formato que pide Play). EAS maneja el keystore.

### 4. Crear la app en Play Console
- **Crear app** → nombre `Obrador`, idioma español (AR), app **gratuita**.
- **Ficha principal**: copiar de `fichas-tienda.md` (título, desc corta/larga, categoría **Casa y hogar**).
  - Ícono 512×512 (exportar del O-pin sobre amarillo), **feature graphic** `docs/tienda/feature-graphic.png`.
  - **Screenshots** (mín. 2, mejor 4–8) — sacar del teléfono con la app corriendo.
- **Data Safety**: completar con `privacidad-tiendas.md`.
- **Clasificación de contenido** (IARC): responder el cuestionario → clasificación **Todos**.
- **Política de privacidad**: pegar la URL de GitHub Pages.
- **Público objetivo**: mayores de 13 (no dirigida a niños).

### 5. Subir y publicar
```bash
eas submit --profile production --platform android
```
(o subir el .aab a mano). Empezar por **prueba interna** → luego **producción**.

---

## 🍎 APP STORE (iOS)

### 1. Cuenta (vos)
- **Apple Developer Program** → **USD 99/año**: https://developer.apple.com/programs/

### 2. Sign in with Apple (obligatorio)
- Como la app ofrece **login con Google**, Apple exige también **"Sign in with Apple"**.
- Configurar: capability en el bundle id (Apple Developer) + provider **Apple** en Supabase (Auth → Providers).
- *(Claude te guía cuando tengas la cuenta.)*

### 3. Build de producción (IPA)
```bash
cd apps/mobile
eas build --profile production --platform ios
```
→ EAS pide iniciar sesión con tu Apple Developer y maneja los certificados.

### 4. App Store Connect
- **Crear app** → nombre `Obrador: Manos a la obra`, bundle `com.obrador.app`.
- **Ficha**: de `fichas-tienda.md` (nombre, subtítulo, keywords, descripción, categoría **Estilo de vida**).
- **App Privacy**: completar con `privacidad-tiendas.md`.
- **Screenshots** por tamaño (6.7" y 6.5" obligatorios).

### 5. Subir → TestFlight → publicar
```bash
eas submit --profile production --platform ios
```
→ probar en **TestFlight** → enviar a **revisión** de Apple → publicar.

---

## 🔧 Post-publicación / pendientes técnicos
- **Reactivar Confirm email** en Supabase (Auth → Providers → Email) — requiere configurar **SMTP** propio para que el mail de verificación llegue.
- **Probar Google login** en el APK/build (no anda en Expo Go).
- **Presupuestador**: terminarlo (cascada, equipos, PDF) y reactivar su acceso en Pedidos.
- **Dominio propio de Obrador**: cuando lo tengas → email de soporte `@obrador...`, `LEGAL_BASE`, y evaluar mover la Maps key a la cuenta principal.

---

## Datos útiles
- **Supabase**: proyecto `qwxaildshbusqqiugnjf`
- **EAS**: `@logarquitectura/obrador` (projectId `2f6d1b84-cd8d-455e-8933-726f5d3b43d7`)
- **Repo**: github.com/renepariguana/obrador
- **Soporte / contacto**: obrador.ar@gmail.com (temporal)
