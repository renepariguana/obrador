import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Icon } from '../components/Icon'
import { LogoObrador } from '../components/LogoObrador'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { useAuth } from '../lib/auth'

export default function LoginScreen() {
  const t = useTheme()
  const insets = useSafeAreaInsets()
  const s = styles(t)
  const { ingresar, entrarInvitado } = useAuth()

  return (
    <View style={[s.root, { paddingBottom: insets.bottom + spacing.md }]}>
      {/* Hero con la marca (ámbar) */}
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

      {/* Accesos */}
      <View style={s.actions}>
        <Text style={s.title}>Elegí cómo querés ingresar</Text>

        <Pressable style={[s.btn, s.btnGoogle]} onPress={ingresar}>
          <Text style={s.btnGoogleTxt}>Continuar con Google</Text>
        </Pressable>
        <Pressable style={[s.btn, s.btnApple]} onPress={ingresar}>
          <Text style={s.btnAppleTxt}>Continuar con Apple</Text>
        </Pressable>
        <Pressable style={[s.btn, s.btnFb]} onPress={ingresar}>
          <Text style={s.btnFbTxt}>Continuar con Facebook</Text>
        </Pressable>
        <Pressable style={[s.btn, s.btnOtro]} onPress={ingresar}>
          <Icon name="mail" size={18} color={t.text} />
          <Text style={s.btnOtroTxt}>Otro método (email o celular)</Text>
        </Pressable>

        <Text style={s.terms}>
          Al ingresar aceptás los Términos y condiciones de uso y la Política de privacidad.
        </Text>
      </View>
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: t.bg },
    hero: {
      backgroundColor: t.primary,
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    ahoraNo: { alignSelf: 'flex-end' },
    ahoraNoTxt: { color: t.onPrimary, fontSize: 15, fontWeight: '800' },
    brand: { alignItems: 'center', paddingVertical: spacing.xl, gap: spacing.md },
    logo: {
      width: 104,
      height: 104,
      borderRadius: 30,
      backgroundColor: 'rgba(0,0,0,0.12)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    brandName: { color: t.onPrimary, fontSize: 26, fontWeight: '900', letterSpacing: -0.6 },
    actions: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg, gap: spacing.sm },
    title: { color: t.text, fontSize: 20, fontWeight: '900', textAlign: 'center', marginBottom: spacing.md },
    btn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, height: 54, borderRadius: radius.pill },
    btnGoogle: { backgroundColor: t.surface2 },
    btnGoogleTxt: { color: t.text, fontSize: 16, fontWeight: '800' },
    btnApple: { backgroundColor: '#000000' },
    btnAppleTxt: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
    btnFb: { backgroundColor: '#3A66E0' },
    btnFbTxt: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
    btnOtro: { backgroundColor: t.surface2 },
    btnOtroTxt: { color: t.text, fontSize: 15, fontWeight: '800' },
    terms: { color: t.text3, fontSize: 12, textAlign: 'center', marginTop: spacing.lg, paddingHorizontal: spacing.md, lineHeight: 17 },
  })
