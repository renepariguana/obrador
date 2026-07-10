import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MapaPedidos } from '../components/MapaPedidos'
import { Icon } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'

const FILTROS = ['Todos', 'Mi rubro', 'Urgentes', 'Hoy']

export default function TrabajosScreen() {
  const t = useTheme()
  const insets = useSafeAreaInsets()
  const s = styles(t)
  const [filtro, setFiltro] = useState('Todos')

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      {/* Mapa a pantalla completa */}
      <MapaPedidos fill />

      {/* ===== Overlays superiores ===== */}
      <View style={[s.top, { paddingTop: insets.top + 8 }]} pointerEvents="box-none">
        <View style={s.searchRow}>
          <View style={s.search}>
            <Icon name="search" size={20} color={t.text3} />
            <TextInput
              style={s.searchInput}
              placeholder="Pedidos en tu zona…"
              placeholderTextColor={t.text3}
            />
          </View>
          <Pressable style={s.fbtn}>
            <Icon name="filter" size={20} color={t.text} />
          </Pressable>
        </View>

        <View style={s.livePill}>
          <View style={s.liveDot} />
          <Text style={s.liveBold}>En vivo</Text>
          <Text style={s.liveSub}>· 5 pedidos cerca tuyo</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>
          {FILTROS.map((c) => {
            const on = c === filtro
            return (
              <Pressable key={c} onPress={() => setFiltro(c)} style={[s.chip, on && s.chipOn]}>
                <Text style={[s.chipTxt, on && s.chipTxtOn]}>{c}</Text>
              </Pressable>
            )
          })}
        </ScrollView>
      </View>

      {/* ===== Tarjeta de detalle (pedido seleccionado) ===== */}
      <View style={s.bottom} pointerEvents="box-none">
        <View style={s.detail}>
          <View style={s.detailHead}>
            <View style={s.avatar}>
              <Icon name="user" size={22} color={t.text3} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.detailName}>María E. necesita un Plomero</Text>
              <Text style={s.detailMeta}>A 0,6 km · San Miguel de Tucumán</Text>
            </View>
            <View style={s.tag}>
              <Text style={s.tagTxt}>Plomería</Text>
            </View>
          </View>

          <Text style={s.quote}>
            “Tengo una pérdida de agua debajo de la pileta de la cocina, necesito que la revisen hoy
            si se puede.”
          </Text>

          <View style={s.detailFoot}>
            <Icon name="clock" size={14} color={t.text3} />
            <Text style={s.footText}>hace 5 min · 2 postulados</Text>
          </View>

          <View style={s.actions}>
            <Pressable style={s.btnGhost}>
              <Text style={s.btnGhostTxt}>Ver detalle</Text>
            </Pressable>
            <Pressable style={s.btnPrimary}>
              <Icon name="check" size={18} color={t.onPrimary} />
              <Text style={s.btnPrimaryTxt}>Postularme</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    top: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: spacing.md },
    searchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    search: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      backgroundColor: t.surface,
      borderRadius: radius.pill,
      paddingHorizontal: spacing.md,
      height: 48,
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },
    searchInput: { flex: 1, color: t.text, fontSize: 15, padding: 0 },
    fbtn: {
      width: 48,
      height: 48,
      borderRadius: radius.pill,
      backgroundColor: t.surface,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },
    livePill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      alignSelf: 'center',
      backgroundColor: t.surface,
      borderRadius: radius.pill,
      paddingHorizontal: spacing.md,
      paddingVertical: 8,
      marginTop: spacing.md,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: t.danger },
    liveBold: { color: t.text, fontWeight: '800', fontSize: 13 },
    liveSub: { color: t.text2, fontWeight: '600', fontSize: 13 },
    chips: { gap: spacing.sm, paddingVertical: spacing.md, paddingHorizontal: 2 },
    chip: {
      backgroundColor: t.surface,
      borderRadius: radius.pill,
      paddingHorizontal: spacing.md,
      paddingVertical: 8,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    chipOn: { backgroundColor: t.primary },
    chipTxt: { color: t.text2, fontWeight: '700', fontSize: 13 },
    chipTxtOn: { color: t.onPrimary },
    bottom: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: spacing.md },
    detail: {
      backgroundColor: t.surface,
      borderRadius: radius.lg,
      padding: spacing.lg,
      shadowColor: '#000',
      shadowOpacity: 0.16,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 6 },
      elevation: 8,
    },
    detailHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: radius.pill,
      backgroundColor: t.surface2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    detailName: { color: t.text, fontSize: 15, fontWeight: '800' },
    detailMeta: { color: t.text2, fontSize: 12, marginTop: 2 },
    tag: { backgroundColor: t.surface2, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 5 },
    tagTxt: { color: t.text2, fontSize: 11, fontWeight: '700' },
    quote: { color: t.text, fontSize: 14, lineHeight: 20, marginTop: spacing.md, fontStyle: 'italic' },
    detailFoot: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.md },
    footText: { color: t.text3, fontSize: 12, fontWeight: '600' },
    actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
    btnGhost: {
      flex: 1,
      height: 48,
      borderRadius: radius.md,
      backgroundColor: t.surface2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnGhostTxt: { color: t.text, fontWeight: '800', fontSize: 15 },
    btnPrimary: {
      flex: 1.4,
      height: 48,
      borderRadius: radius.md,
      backgroundColor: t.primary,
      flexDirection: 'row',
      gap: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnPrimaryTxt: { color: t.onPrimary, fontWeight: '800', fontSize: 15 },
  })
