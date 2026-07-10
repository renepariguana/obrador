import React from 'react'
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MapaPedidos } from '../components/MapaPedidos'
import { Icon, IconName } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'

type Oficio = { label: string; icon: IconName }
const OFICIOS: Oficio[] = [
  { label: 'Albañil', icon: 'wall' },
  { label: 'Plomero', icon: 'wrench' },
  { label: 'Electricista', icon: 'zap' },
  { label: 'Pintor', icon: 'roller' },
  { label: 'Carpintero', icon: 'hammer' },
  { label: 'Herrero', icon: 'flame' },
  { label: 'Paisajista', icon: 'leaf' },
  { label: 'Zinguero', icon: 'home' },
  { label: 'Durlero', icon: 'box' },
]

type Pro = { nombre: string; oficio: string; rating: number; verificado: boolean }
const PROS: Pro[] = [
  { nombre: 'Carlos G.', oficio: 'Plomero', rating: 4.9, verificado: true },
  { nombre: 'Marta R.', oficio: 'Pintora', rating: 4.7, verificado: true },
  { nombre: 'Diego S.', oficio: 'Electricista', rating: 4.6, verificado: false },
  { nombre: 'Ana P.', oficio: 'Albañil', rating: 4.8, verificado: true },
]

export default function InicioScreen() {
  const t = useTheme()
  const insets = useSafeAreaInsets()
  const s = styles(t)
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }} showsVerticalScrollIndicator={false}>
        {/* ===== ZONA ÁMBAR ===== */}
        <View style={[s.hero, { paddingTop: insets.top + 8 }]}>
          <View style={s.topRow}>
            <Pressable style={s.locRow}>
              <Icon name="pin" size={18} color={t.onPrimary} />
              <Text style={s.locText}>Tucumán</Text>
              <Icon name="chevron" size={18} color={t.onPrimary} />
            </Pressable>
            <Icon name="bell" size={22} color={t.onPrimary} />
          </View>

          {/* Buscador */}
          <View style={s.search}>
            <Icon name="search" size={20} color={t.text3} />
            <TextInput
              style={s.searchInput}
              placeholder="Buscar plomero, pintura, arena…"
              placeholderTextColor={t.text3}
            />
          </View>

          {/* Banner de anuncios / descuentos / trabajos destacados */}
          <View style={s.promo}>
            <View style={{ flex: 1 }}>
              <Text style={s.promoTitle}>Trabajos destacados</Text>
              <Text style={s.promoSub}>Los pedidos mejor pagos de tu zona</Text>
            </View>
            <Icon name="star" size={64} color="rgba(0,0,0,0.10)" />
          </View>
          <View style={s.dots}>
            <View style={[s.dot, s.dotOn]} />
            <View style={s.dot} />
            <View style={s.dot} />
          </View>
        </View>

        {/* ===== MAPA (pedidos cerca tuyo) ===== */}
        <View style={s.sectionRow}>
          <Text style={s.section}>Pedidos cerca tuyo</Text>
          <Pressable>
            <Text style={s.verMas}>Ver mapa</Text>
          </Pressable>
        </View>
        <View style={s.mapCard}>
          <MapaPedidos height={300} />
        </View>

        {/* ===== OFICIOS ===== */}
        <Text style={s.section}>Oficios</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.strip}>
          {OFICIOS.map((o) => (
            <Pressable key={o.label} style={s.cat}>
              <View style={s.catCircle}>
                <Icon name={o.icon} size={24} color={t.text} />
              </View>
              <Text style={s.catLabel} numberOfLines={1}>
                {o.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* ===== PROFESIONALES (en tira) ===== */}
        <View style={s.sectionRow}>
          <Text style={s.section}>Profesionales cerca tuyo</Text>
          <Pressable>
            <Text style={s.verMas}>Ver todos</Text>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.strip}>
          {PROS.map((p) => (
            <View key={p.nombre} style={s.proCard}>
              <View style={s.avatarWrap}>
                <View style={s.avatar}>
                  <Icon name="user" size={26} color={t.text3} />
                </View>
                {p.verificado && (
                  <View style={s.verif}>
                    <Icon name="check" size={11} color={t.onPrimary} />
                  </View>
                )}
              </View>
              <Text style={s.proName} numberOfLines={1}>
                {p.nombre}
              </Text>
              <Text style={s.proOficio} numberOfLines={1}>
                {p.oficio}
              </Text>
              <View style={s.ratingRow}>
                <Icon name="star" size={13} color={t.rating} />
                <Text style={s.ratingText}>{p.rating.toFixed(1)}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    hero: {
      backgroundColor: t.primary,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.lg,
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,
    },
    topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 },
    locRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    locText: { color: t.onPrimary, fontWeight: '800', fontSize: 16, letterSpacing: -0.2 },
    search: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      backgroundColor: '#FFFFFF',
      borderRadius: radius.pill,
      paddingHorizontal: spacing.md,
      height: 48,
      marginTop: spacing.md,
    },
    searchInput: { flex: 1, color: '#16181D', fontSize: 15, padding: 0 },
    promo: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg, minHeight: 72 },
    promoTitle: { color: t.onPrimary, fontSize: 22, fontWeight: '900', letterSpacing: -0.4 },
    promoSub: { color: t.onPrimary, opacity: 0.75, fontSize: 13, marginTop: 4, fontWeight: '600' },
    dots: { flexDirection: 'row', gap: 6, marginTop: spacing.md, justifyContent: 'center' },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.2)' },
    dotOn: { width: 18, backgroundColor: 'rgba(0,0,0,0.55)' },
    section: {
      color: t.text,
      fontSize: 17,
      fontWeight: '800',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      paddingBottom: spacing.md,
    },
    sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: spacing.lg },
    verMas: { color: t.text2, fontWeight: '700', fontSize: 13, paddingTop: spacing.xl - 2 },
    mapCard: {
      marginHorizontal: spacing.lg,
      borderRadius: radius.lg,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: t.border,
    },
    strip: { paddingHorizontal: spacing.lg, gap: spacing.md },
    cat: { width: 68, alignItems: 'center', gap: 6 },
    catCircle: {
      width: 64,
      height: 64,
      borderRadius: 18,
      backgroundColor: t.surface2,
      borderWidth: 1,
      borderColor: t.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    catLabel: { color: t.text2, fontSize: 11, fontWeight: '600' },
    proCard: {
      width: 128,
      backgroundColor: t.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: t.border,
      padding: spacing.md,
      alignItems: 'center',
    },
    avatarWrap: { width: 56, height: 56 },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: radius.pill,
      backgroundColor: t.surface2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    verif: {
      position: 'absolute',
      right: -2,
      bottom: -2,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: t.primary,
      borderWidth: 2,
      borderColor: t.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    proName: { color: t.text, fontSize: 14, fontWeight: '800', marginTop: spacing.sm },
    proOficio: { color: t.text2, fontSize: 12, marginTop: 1 },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 6 },
    ratingText: { color: t.text, fontSize: 12, fontWeight: '700' },
  })
