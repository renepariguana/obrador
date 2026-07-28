import React, { useState, useCallback } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { misPedidos, Pedido, EstadoPedido } from '../data/pedidosApi'

function fecha(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })
  } catch {
    return ''
  }
}

export default function MisPedidosScreen() {
  const t = useTheme()
  const s = styles(t)
  const navigation = useNavigation<any>()

  // Estados en paleta Obrador (amarillo + escala de grises/negro), sin colores sueltos.
  const ESTADO: Record<EstadoPedido, { txt: string; bg: string; fg: string }> = {
    abierto: { txt: 'Abierto', bg: t.primary, fg: t.onPrimary },
    asignado: { txt: 'Asignado', bg: t.text2, fg: t.surface },
    completado: { txt: 'Completado', bg: t.sel, fg: t.bg },
    cancelado: { txt: 'Cancelado', bg: t.surface2, fg: t.text3 },
  }

  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [cargando, setCargando] = useState(false)

  const cargar = useCallback(() => {
    setCargando(true)
    misPedidos()
      .then((p) => setPedidos(p))
      .finally(() => setCargando(false))
  }, [])

  // Recargar al entrar (ej. al volver del detalle o de publicar).
  useFocusEffect(useCallback(() => cargar(), [cargar]))

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader
        title="Mis pedidos"
        left={
          <Pressable onPress={() => navigation.goBack()} style={s.headerLeft} hitSlop={10}>
            <Icon name="back" size={22} color={t.onPrimary} />
            <Text style={s.headerTitle}>Mis pedidos</Text>
          </Pressable>
        }
        right={
          <Pressable hitSlop={8} onPress={() => navigation.navigate('PublicarPedido')}>
            <Icon name="plus" size={24} color={t.onPrimary} />
          </Pressable>
        }
      />

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl }} showsVerticalScrollIndicator={false}>
        {cargando ? (
          <ActivityIndicator color={t.primary} style={{ marginTop: spacing.xl }} />
        ) : pedidos.length === 0 ? (
          <View style={s.vacio}>
            <Icon name="pin" size={36} color={t.text3} />
            <Text style={s.vacioTxt}>Todavía no publicaste ningún pedido.</Text>
            <Pressable style={s.vacioBtn} onPress={() => navigation.navigate('PublicarPedido')}>
              <Text style={s.vacioBtnTxt}>Publicar un pedido</Text>
            </Pressable>
          </View>
        ) : (
          pedidos.map((p) => {
            const e = ESTADO[p.estado]
            return (
              <Pressable
                key={p.id}
                style={s.card}
                onPress={() => navigation.navigate('DetallePedido', { pedido: p, dueno: true })}
              >
                <View style={s.cardHead}>
                  <Text style={s.cardOficio}>{p.oficio}</Text>
                  <View style={[s.badge, { backgroundColor: e.bg }]}>
                    <Text style={[s.badgeTxt, { color: e.fg }]}>{e.txt}</Text>
                  </View>
                </View>
                <Text style={s.cardMeta}>{(p.zona || 'Sin zona') + ' · ' + fecha(p.creado_at)}</Text>
                <Text style={s.cardDesc} numberOfLines={2}>
                  {p.descripcion}
                </Text>
                <View style={s.cardFoot}>
                  <Text style={s.cardVer}>Ver postulaciones</Text>
                  <Icon name="chevron" size={16} color={t.text3} />
                </View>
              </Pressable>
            )
          })
        )}
      </ScrollView>
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    headerTitle: { color: t.onPrimary, fontSize: 20, fontWeight: '900', letterSpacing: -0.4 },
    vacio: { alignItems: 'center', paddingTop: spacing.xl * 2, gap: spacing.md },
    vacioTxt: { color: t.text2, fontSize: 15, textAlign: 'center' },
    vacioBtn: { marginTop: spacing.sm, height: 48, borderRadius: radius.md, backgroundColor: t.primary, paddingHorizontal: spacing.xl, alignItems: 'center', justifyContent: 'center' },
    vacioBtnTxt: { color: t.onPrimary, fontSize: 15, fontWeight: '800' },
    card: { backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md },
    cardHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    cardOficio: { color: t.text, fontSize: 16, fontWeight: '900' },
    badge: { borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4 },
    badgeTxt: { fontSize: 11, fontWeight: '800' },
    cardMeta: { color: t.text3, fontSize: 12, marginTop: 4 },
    cardDesc: { color: t.text2, fontSize: 14, lineHeight: 19, marginTop: spacing.sm },
    cardFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 2, marginTop: spacing.sm },
    cardVer: { color: t.text3, fontSize: 13, fontWeight: '700' },
  })
