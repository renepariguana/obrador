import React, { useState, useCallback } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { MiPostulacion, misPostulaciones, EstadoPostulacion } from '../data/pedidosApi'

function fecha(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })
  } catch {
    return ''
  }
}

export default function MisPostulacionesScreen({ navigation }: any) {
  const t = useTheme()
  const s = styles(t)
  const [items, setItems] = useState<MiPostulacion[]>([])
  const [cargando, setCargando] = useState(true)

  // Paleta Obrador: elegido = amarillo (ganaste), el resto en grises/negro.
  const BADGE: Record<EstadoPostulacion, { txt: string; bg: string; fg: string }> = {
    postulado: { txt: 'Postulado', bg: t.surface2, fg: t.text2 },
    elegido: { txt: '¡Te eligieron!', bg: t.primary, fg: t.onPrimary },
    rechazado: { txt: 'No elegido', bg: t.surface2, fg: t.text3 },
  }

  const cargar = useCallback(() => {
    setCargando(true)
    misPostulaciones()
      .then(setItems)
      .finally(() => setCargando(false))
  }, [])

  useFocusEffect(cargar)

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader
        left={
          <View style={s.headerLeft}>
            <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
              <Icon name="back" size={24} color={t.onPrimary} />
            </Pressable>
            <Text style={s.headerTitle}>Mis postulaciones</Text>
          </View>
        }
      />
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        {cargando ? (
          <ActivityIndicator color={t.primary} style={{ marginTop: spacing.xl }} />
        ) : items.length === 0 ? (
          <View style={s.vacio}>
            <Icon name="hand" size={36} color={t.text3} />
            <Text style={s.vacioTxt}>Todavía no te postulaste a ningún trabajo.</Text>
          </View>
        ) : (
          items.map((p) => {
            const b = BADGE[p.estadoPostulacion]
            return (
              <View key={p.pedidoId} style={s.card}>
                <View style={s.cardHead}>
                  <Text style={s.cardOficio}>{p.oficio}</Text>
                  <View style={[s.badge, { backgroundColor: b.bg }]}>
                    <Text style={[s.badgeTxt, { color: b.fg }]}>{b.txt}</Text>
                  </View>
                </View>
                <Text style={s.cardMeta}>{(p.zona || 'Sin zona') + ' · ' + fecha(p.creado_at)}</Text>
              </View>
            )
          })
        )}
      </ScrollView>
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    headerTitle: { color: t.onPrimary, fontSize: 20, fontWeight: '900', letterSpacing: -0.4 },
    vacio: { alignItems: 'center', gap: spacing.md, marginTop: spacing.xl * 2 },
    vacioTxt: { color: t.text2, fontSize: 15, textAlign: 'center' },
    card: { backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md },
    cardHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    cardOficio: { color: t.text, fontSize: 16, fontWeight: '900' },
    badge: { borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4 },
    badgeTxt: { fontSize: 11, fontWeight: '800' },
    cardMeta: { color: t.text3, fontSize: 12, marginTop: 4 },
  })
