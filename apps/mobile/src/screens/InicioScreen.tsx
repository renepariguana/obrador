import React from 'react'
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Card } from '../components/Card'
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

type Pro = { nombre: string; oficio: string; rating: number; reviews: number; verificado: boolean }
const CERCA: Pro[] = [
  { nombre: 'Carlos Gómez', oficio: 'Plomero', rating: 4.9, reviews: 34, verificado: true },
  { nombre: 'Marta Ruiz', oficio: 'Pintora', rating: 4.7, reviews: 21, verificado: true },
  { nombre: 'Diego Sosa', oficio: 'Electricista', rating: 4.6, reviews: 12, verificado: false },
]

export default function InicioScreen() {
  const t = useTheme()
  const insets = useSafeAreaInsets()
  const s = styles(t)
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }} showsVerticalScrollIndicator={false}>
        {/* ===== ZONA ÁMBAR (novedades / cosas importantes) ===== */}
        <View style={[s.hero, { paddingTop: insets.top + 8 }]}>
          {/* Ubicación + acciones */}
          <View style={s.topRow}>
            <Pressable style={s.locRow}>
              <Icon name="pin" size={18} color={t.onPrimary} />
              <Text style={s.locText}>Tucumán</Text>
              <Icon name="chevron" size={18} color={t.onPrimary} />
            </Pressable>
            <View style={s.actions}>
              <Icon name="bell" size={22} color={t.onPrimary} />
            </View>
          </View>

          {/* Buscador dentro del ámbar */}
          <View style={s.search}>
            <Icon name="search" size={20} color={t.text3} />
            <TextInput
              style={s.searchInput}
              placeholder="Buscar plomero, pintura, arena…"
              placeholderTextColor={t.text3}
            />
          </View>

        </View>

        {/* ===== MAPA (pedidos cerca tuyo) ===== */}
        <View style={s.mapSection}>
          <View style={s.sectionRow}>
            <Text style={s.section}>Pedidos cerca tuyo</Text>
            <Pressable>
              <Text style={s.verMas}>Ver mapa</Text>
            </Pressable>
          </View>
          <View style={s.mapCard}>
            <MapaPedidos height={300} />
          </View>
        </View>

        {/* ===== CONTENIDO ===== */}
        {/* Oficios (tira horizontal) */}
        <Text style={s.section}>Oficios</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.strip}
        >
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

        {/* Cerca tuyo */}
        <View style={s.sectionRow}>
          <Text style={s.section}>Cerca tuyo</Text>
          <Pressable>
            <Text style={s.verMas}>Ver todos</Text>
          </Pressable>
        </View>
        <View style={{ paddingHorizontal: spacing.lg, gap: spacing.sm }}>
          {CERCA.map((p) => (
            <Card key={p.nombre} style={s.proCard}>
              <View style={s.avatar}>
                <Icon name="user" size={22} color={t.text3} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={s.proNameRow}>
                  <Text style={s.proName}>{p.nombre}</Text>
                  {p.verificado && <Icon name="badge" size={16} color={t.primary} />}
                </View>
                <Text style={s.proOficio}>{p.oficio}</Text>
                <View style={s.ratingRow}>
                  <Icon name="star" size={14} color={t.rating} />
                  <Text style={s.ratingText}>{p.rating.toFixed(1)}</Text>
                  <Text style={s.reviewsText}>({p.reviews})</Text>
                </View>
              </View>
              <Icon name="chevron" size={18} color={t.text3} />
            </Card>
          ))}
        </View>
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
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 4,
    },
    locRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    locText: { color: t.onPrimary, fontWeight: '800', fontSize: 16, letterSpacing: -0.2 },
    actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
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
    mapSection: { marginTop: spacing.xs },
    mapCard: {
      marginHorizontal: spacing.lg,
      borderRadius: radius.lg,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: t.border,
    },
    section: {
      color: t.text,
      fontSize: 17,
      fontWeight: '800',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      paddingBottom: spacing.md,
    },
    sectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: spacing.lg,
    },
    verMas: { color: t.text2, fontWeight: '700', fontSize: 13, paddingTop: spacing.xl - 2 },
    strip: { paddingHorizontal: spacing.lg, gap: spacing.md },
    cat: { width: 62, alignItems: 'center', gap: 6 },
    catCircle: {
      width: 56,
      height: 56,
      borderRadius: radius.pill,
      backgroundColor: t.surface2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    catLabel: { color: t.text2, fontSize: 11, fontWeight: '600' },
    proCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: radius.pill,
      backgroundColor: t.surface2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    proNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    proName: { color: t.text, fontSize: 15, fontWeight: '700' },
    proOficio: { color: t.text2, fontSize: 13, marginTop: 1 },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
    ratingText: { color: t.text, fontSize: 13, fontWeight: '700' },
    reviewsText: { color: t.text3, fontSize: 12 },
  })
