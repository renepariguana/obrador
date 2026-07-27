# Configuración de Auth (Supabase) — Obrador

Pasos en los dashboards para habilitar el login real. (No pegar secretos en este archivo.)

## Supabase → Authentication → Providers

### Email (OTP) — listo casi sin config
- Habilitar **Email**. Alcanza con "Email OTP" (código de 6 dígitos). No requiere credenciales externas.
- URL de redirect / scheme de la app: `obrador://` (ya está en `app.json` → `scheme`). Agregarlo en
  Authentication → URL Configuration → **Redirect URLs**: `obrador://*`.

### Google
1. Google Cloud Console (proyecto "LOG arquitectura") → APIs & Services → Credentials.
2. Crear **OAuth 2.0 Client ID** tipo "Web" (para Supabase) → copiar Client ID y Client Secret.
   - Authorized redirect URI: `https://qwxaildshbusqqiugnjf.supabase.co/auth/v1/callback`.
3. En Supabase → Providers → **Google** → pegar Client ID + Secret → Save.

### Apple (requiere cuenta Apple Developer, US$99/año)
1. Apple Developer → Certificates, Identifiers & Profiles:
   - App ID con **Sign in with Apple** habilitado (identifier = bundle id definitivo, ej. `com.obrador.app`).
   - **Services ID** (para el flujo web/OAuth) con return URL `https://qwxaildshbusqqiugnjf.supabase.co/auth/v1/callback`.
   - **Key** para Sign in with Apple → descargar `.p8` (Key ID + Team ID).
2. En Supabase → Providers → **Apple** → cargar Services ID, Team ID, Key ID y el `.p8`.
3. En la app se usa `expo-apple-authentication` (login nativo en iOS).

## Orden recomendado
- **Email OTP funciona ya** (sin cuentas externas) → arrancamos el código de auth con email.
- **Google**: se puede sumar en paralelo (solo Google Cloud, gratis).
- **Apple**: necesita la cuenta Apple Developer paga; se suma cuando esté (obligatorio para publicar en App Store, no para probar en Android/Expo Go).
