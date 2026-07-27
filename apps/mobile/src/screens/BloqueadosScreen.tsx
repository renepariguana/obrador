import React, { useState, useCallback } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { Bloqueado, listarBloqueados, desbloquear } from '../data/bloqueosApi'

export default function BloqueadosScreen({ navigation }: any) {
  const t = useTheme()
  const s = styles(t)
  const [items, setItems] = useState<Bloqueado[]>([])
  const [cargando, setCargando] = useState(true)

  const cargar = useCallback(() => {
    setCargando(true)
    listarBloqueados()
      .then(setItems)
      .finally(() => setCargando(false))
  }, [])

  useFocusEffect(cargar)

  const quitar = (b: Bloqueado) =>
    Alert.alert(`¿Desbloquear a ${b.nombre}?`, 'Vas a volver a ver su perfil y sus pedidos.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Desbloquear',
        onPress: async () => {
          const r = await desbloquear(b.id)
          if (r.error) return Alert.alert('Error', r.error)
          setItems((xs) => xs.filter((x) => x.id !== b.id))
        },
      },
    ])

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader
        left={
          <View style={s.headerLeft}>
            <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
              <Icon name="back" size={24} color={t.onPrimary} />
            </Pressable>
            <Text style={s.headerTitle}>Usuarios bloqueados</Text>
          </View>
        }
      />
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        {cargando ? (
          <ActivityIndicator color={t.primary} style={{ marginTop: spacing.xl }} />
        ) : items.length === 0 ? (
          <Text style={s.vacio}>No bloqueaste a nadie.</Text>
        ) : (
          items.map((b) => (
            <View key={b.id} style={s.row}>
              <View style={s.avatar}>
                <Icon name="user" size={20} color={t.text3} />
              </View>
              <Text style={s.nombre}>{b.nombre}</Text>
              <Pressable style={s.btn} onPress={() => quitar(b)}>
                <Text style={s.btnTxt}>Desbloquear</Text>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    headerTitle: { color: t.onPrimary, fontSize: 20, fontWeight: '900', letterSpacing: -0.4 },
    vacio: { color: t.text3, fontSize: 15, textAlign: 'center', marginTop: spacing.xl },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      backgroundColor: t.surface,
      borderWidth: 1,
      borderColor: t.border,
      borderRadius: radius.lg,
      padding: spacing.md,
      marginBottom: spacing.sm,
    },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: t.surface2, alignItems: 'center', justifyContent: 'center' },
    nombre: { flex: 1, color: t.text, fontSize: 15, fontWeight: '800' },
    btn: { backgroundColor: t.surface2, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 8 },
    btnTxt: { color: t.text, fontSize: 13, fontWeight: '800' },
  })
