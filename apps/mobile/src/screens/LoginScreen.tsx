import React, { useState } from 'react'
import { View, Text, Pressable, TextInput, ActivityIndicator, StyleSheet, Platform, Linking } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Icon } from '../components/Icon'
import { LogoObrador } from '../components/LogoObrador'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { useAuth } from '../lib/auth'

const TERMINOS_URL = 'https://obrador.com.ar/terminos' // TODO: reemplazar por la URL real (Etapa 3)
const PRIVACIDAD_URL = 'https://obrador.com.ar/privacidad'

type Modo = 'inicial' | 'email'

export default function LoginScreen() {
  const t = useTheme()
  const insets = useSafeAreaInsets()
  const s = styles(t)
  const { ingresarGoogle, ingresarApple, ingresarEmail, crearCuentaEmail, entrarInvitado } = useAuth()

  const [modo, setModo] = useState<Modo>('inicial')
  const [nuevo, setNuevo] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const conCarga = async (fn: () => Promise<{ error?: string }>) => {
    setError('')
    setCargando(true)
    const r = await fn()
    setCargando(false)
    if (r.error) setError(r.error)
    return r
  }

  const accederEmail = async () => {
    if (!email.trim() || !email.includes('@')) return setError('Escribí un email válido')
    if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres')
    await conCarga(() => (nuevo ? crearCuentaEmail(email, password) : ingresarEmail(email, password)))
  }

  return (
    <View style={[s.root, { paddingBottom: insets.bottom + spacing.md }]}>
      <View style={[s.hero, { paddingTop: insets.top + spacing.md }]}>
        <Pressable onPress={entrarInvitado} hitSlop={10} style={s.ahoraNo}>
          <Text style={s.ahoraNoTxt}>Ahora no</Text>
        </Pressable>
        <View style={s.brand}>
          <View style={s.logo}>
            <LogoObrador size={74} color={t.onPrimary} />
          </View>
          <Text style={s.brandName}>Obrador</Text>
        </View>
      </View>

      <View style={s.actions}>
        {modo === 'inicial' && (
          <>
            <Text style={s.title}>Elegí cómo querés ingresar</Text>
            <Pressable style={[s.btn, s.btnGoogle]} disabled={cargando} onPress={() => conCarga(ingresarGoogle)}>
              <Text style={s.btnGoogleTxt}>Continuar con Google</Text>
            </Pressable>
            {Platform.OS === 'ios' && (
              <Pressable style={[s.btn, s.btnApple]} disabled={cargando} onPress={() => conCarga(ingresarApple)}>
                <Text style={s.btnAppleTxt}>Continuar con Apple</Text>
              </Pressable>
            )}
            <Pressable style={[s.btn, s.btnOtro]} disabled={cargando} onPress={() => { setError(''); setModo('email') }}>
              <Icon name="mail" size={18} color={t.text} />
              <Text style={s.btnOtroTxt}>Continuar con email</Text>
            </Pressable>
          </>
        )}

        {modo === 'email' && (
          <>
            <Text style={s.title}>{nuevo ? 'Crear cuenta' : 'Ingresar con email'}</Text>
            <TextInput
              style={s.input}
              placeholder="tu@email.com"
              placeholderTextColor={t.text3}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={s.input}
              placeholder="Contraseña (mín. 6)"
              placeholderTextColor={t.text3}
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
            <Pressable style={[s.btn, s.btnPrimary]} disabled={cargando} onPress={accederEmail}>
              <Text style={s.btnPrimaryTxt}>{nuevo ? 'Crear cuenta' : 'Ingresar'}</Text>
            </Pressable>
            <Pressable onPress={() => { setError(''); setNuevo(!nuevo) }} hitSlop={8}>
              <Text style={s.volver}>{nuevo ? '¿Ya tenés cuenta? Ingresá' : '¿No tenés cuenta? Creá una'}</Text>
            </Pressable>
            <Pressable onPress={() => setModo('inicial')} hitSlop={8}><Text style={s.volver}>Volver</Text></Pressable>
          </>
        )}

        {cargando && <ActivityIndicator color={t.primary} style={{ marginTop: spacing.sm }} />}
        {!!error && <Text style={s.error}>{error}</Text>}

        <Text style={s.terms}>
          Al ingresar aceptás los{' '}
          <Text style={s.link} onPress={() => Linking.openURL(TERMINOS_URL)}>Términos</Text> y la{' '}
          <Text style={s.link} onPress={() => Linking.openURL(PRIVACIDAD_URL)}>Política de privacidad</Text>.
        </Text>
      </View>
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: t.bg },
    hero: { backgroundColor: t.primary, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
    ahoraNo: { alignSelf: 'flex-end' },
    ahoraNoTxt: { color: t.onPrimary, fontSize: 15, fontWeight: '800' },
    brand: { alignItems: 'center', paddingVertical: spacing.xl, gap: spacing.md },
    logo: { width: 104, height: 104, borderRadius: 30, backgroundColor: 'rgba(0,0,0,0.12)', alignItems: 'center', justifyContent: 'center' },
    brandName: { color: t.onPrimary, fontSize: 26, fontWeight: '900', letterSpacing: -0.6 },
    actions: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg, gap: spacing.sm },
    title: { color: t.text, fontSize: 20, fontWeight: '900', textAlign: 'center', marginBottom: spacing.md },
    sub: { color: t.text2, fontSize: 14, textAlign: 'center', marginTop: -spacing.sm, marginBottom: spacing.sm },
    input: { backgroundColor: t.surface2, borderRadius: radius.lg, height: 54, paddingHorizontal: spacing.md, color: t.text, fontSize: 16, borderWidth: 1, borderColor: t.border },
    inputCodigo: { textAlign: 'center', letterSpacing: 8, fontSize: 22, fontWeight: '800' },
    btn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, height: 54, borderRadius: radius.pill },
    btnGoogle: { backgroundColor: t.surface2 },
    btnGoogleTxt: { color: t.text, fontSize: 16, fontWeight: '800' },
    btnApple: { backgroundColor: '#000000' },
    btnAppleTxt: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
    btnOtro: { backgroundColor: t.surface2 },
    btnOtroTxt: { color: t.text, fontSize: 15, fontWeight: '800' },
    btnPrimary: { backgroundColor: t.primary },
    btnPrimaryTxt: { color: t.onPrimary, fontSize: 16, fontWeight: '800' },
    volver: { color: t.text2, fontSize: 14, fontWeight: '700', textAlign: 'center', marginTop: spacing.xs },
    error: { color: '#C0392B', fontSize: 13, textAlign: 'center', marginTop: spacing.sm, fontWeight: '600' },
    terms: { color: t.text3, fontSize: 12, textAlign: 'center', marginTop: spacing.lg, paddingHorizontal: spacing.md, lineHeight: 17 },
    link: { color: t.text2, fontWeight: '700', textDecorationLine: 'underline' },
  })
