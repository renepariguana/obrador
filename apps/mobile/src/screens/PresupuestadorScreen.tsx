import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'

export default function PresupuestadorScreen() {
  const t = useTheme()
  const s = styles(t)
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader title="Presupuestador" />
      <View style={s.center}>
        <View style={s.iconWrap}>
          <Icon name="file" size={40} color={t.onPrimary} />
        </View>
        <Text style={s.title}>Próximamente</Text>
        <Text style={s.sub}>
          Vas a poder armar presupuestos con los materiales y precios de la app.
        </Text>
      </View>
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.md },
    iconWrap: {
      width: 96,
      height: 96,
      borderRadius: radius.lg,
      backgroundColor: t.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
    },
    title: { color: t.text, fontSize: 22, fontWeight: '900' },
    sub: { color: t.text2, fontSize: 15, textAlign: 'center', lineHeight: 21, maxWidth: 300 },
  })
