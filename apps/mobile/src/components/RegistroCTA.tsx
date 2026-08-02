import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Icon } from './Icon'
import { useAuth } from '../lib/auth'
import { useTheme, spacing, radius, Theme } from '../lib/theme'

// Se muestra a los invitados donde antes había datos que ahora requieren login.
export function RegistroCTA({ texto }: { texto?: string }) {
  const t = useTheme()
  const s = styles(t)
  const { irLogin } = useAuth()
  return (
    <View style={s.card}>
      <View style={s.iconWrap}>
        <Icon name="lock" size={26} color={t.text2} />
      </View>
      <Text style={s.titulo}>Registrate para ver más</Text>
      <Text style={s.texto}>{texto || 'Creá tu cuenta gratis para ver profesionales y pedidos cerca tuyo.'}</Text>
      <Pressable style={s.btn} onPress={irLogin}>
        <Text style={s.btnTxt}>Iniciar sesión / Registrarme</Text>
      </Pressable>
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    card: {
      alignItems: 'center',
      gap: spacing.sm,
      backgroundColor: t.surface,
      borderWidth: 1,
      borderColor: t.border,
      borderRadius: radius.lg,
      padding: spacing.xl,
      marginHorizontal: spacing.lg,
      marginTop: spacing.md,
    },
    iconWrap: { width: 56, height: 56, borderRadius: 28, backgroundColor: t.surface2, alignItems: 'center', justifyContent: 'center' },
    titulo: { color: t.text, fontSize: 17, fontWeight: '900', textAlign: 'center', marginTop: 2 },
    texto: { color: t.text2, fontSize: 14, lineHeight: 20, textAlign: 'center' },
    btn: { marginTop: spacing.sm, height: 48, borderRadius: radius.md, backgroundColor: t.primary, paddingHorizontal: spacing.xl, alignItems: 'center', justifyContent: 'center' },
    btnTxt: { color: t.onPrimary, fontSize: 15, fontWeight: '800' },
  })
