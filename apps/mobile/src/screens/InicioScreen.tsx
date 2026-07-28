import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { MapaPedidos } from '../components/MapaPedidos'
import { SelectorDireccion } from '../components/SelectorDireccion'
import { Icon, IconName } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { listarDestacados, Trabajador } from '../data/trabajadoresApi'
import { pedidosAbiertos, PedidoVista } from '../data/pedidosApi'
import { getProveedores } from '../data/materialesApi'
import { useZona } from '../lib/zona'
import { useMiUbicacion } from '../lib/ubicacion'

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
  { label: 'Fletero', icon: 'truck' },
]

type Pro = { nombre: string; oficio: string; rating: number; verificado: boolean }
const PROS: Pro[] = [
  { nombre: 'Carlos G.', oficio: 'Plomero', rating: 4.9, verificado: true },
  { nombre: 'Marta R.', oficio: 'Pintora', rating: 4.7, verificado: true },
  { nombre: 'Diego S.', oficio: 'Electricista', rating: 4.6, verificado: false },
  { nombre: 'Ana P.', oficio: 'Albañil', rating: 4.8, verificado: true },
]

type Trabajo = {
  titulo: string
  oficio: string
  icon: IconName
  badge: string
  urgente?: boolean
  dist: string
  pres: string
  postulados: number
}
const TRABAJOS: Trabajo[] = [
  { titulo: 'Pintar living y comedor', oficio: 'Pintor', icon: 'roller', badge: 'Bien pago', dist: '0,8 km', pres: '$45.000', postulados: 2 },
  { titulo: 'Pérdida de agua en cocina', oficio: 'Plomero', icon: 'wrench', badge: 'Urgente', urgente: true, dist: '0,6 km', pres: '$12.000', postulados: 2 },
  { titulo: 'Instalar tablero eléctrico', oficio: 'Electricista', icon: 'zap', badge: 'Hoy', dist: '1,2 km', pres: '$30.000', postulados: 1 },
]

const URGENTES: Trabajo[] = [
  { titulo: 'Destapar cloaca', oficio: 'Plomero', icon: 'wrench', badge: 'Urgente', urgente: true, dist: '0,4 km', pres: '$18.000', postulados: 0 },
  { titulo: 'Cortocircuito en tablero', oficio: 'Electricista', icon: 'zap', badge: 'Urgente', urgente: true, dist: '1,0 km', pres: '$25.000', postulados: 1 },
  { titulo: 'Filtración en el techo', oficio: 'Zinguero', icon: 'home', badge: 'Urgente', urgente: true, dist: '2,1 km', pres: '$40.000', postulados: 0 },
]

const TOP_PROS: Pro[] = [
  { nombre: 'Roberto M.', oficio: 'Electricista', rating: 5.0, verificado: true },
  { nombre: 'Lucía F.', oficio: 'Pintora', rating: 4.9, verificado: true },
  { nombre: 'Jorge V.', oficio: 'Carpintero', rating: 4.9, verificado: true },
  { nombre: 'Sofía T.', oficio: 'Plomera', rating: 4.8, verificado: true },
]

export default function InicioScreen() {
  const t = useTheme()
  const insets = useSafeAreaInsets()
  const s = styles(t)
  const navigation = useNavigation<any>()
  const { zona } = useZona()
  const miUbic = useMiUbicacion()
  const [showUbic, setShowUbic] = useState(false)
  const [pedidos, setPedidos] = useState<PedidoVista[]>([])
  const [provs, setProvs] = useState<{ nombre: string; slug: string; logo: string | null }[]>([])
  const [pros, setPros] = useState<Trabajador[]>([])
  const [prosLoading, setProsLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      pedidosAbiertos().then(setPedidos)
      listarDestacados(8).then((r) => {
        setPros(r)
        setProsLoading(false)
      })
    }, [])
  )

  useEffect(() => {
    getProveedores('Tucumán').then(setProvs)
  }, [])

  const SectionHeader = ({ title, action = 'Ver todos' }: { title: string; action?: string }) => (
    <View style={s.sectionRow}>
      <Text style={s.section}>{title}</Text>
      <Pressable>
        <Text style={s.verMas}>{action}</Text>
      </Pressable>
    </View>
  )

  const renderTrabajos = (list: Trabajo[]) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.strip}>
      {list.map((j) => (
        <Pressable key={j.titulo} style={s.jobCard}>
          <View style={s.jobHeader}>
            <Icon name={j.icon} size={40} color={t.text3} />
            <View style={[s.badge, j.urgente ? s.badgeDanger : s.badgePrimary]}>
              <Text style={[s.badgeTxt, { color: j.urgente ? t.bg : t.onPrimary }]}>{j.badge}</Text>
            </View>
          </View>
          <View style={s.jobBody}>
            <Text style={s.jobTitle} numberOfLines={1}>
              {j.titulo}
            </Text>
            <View style={s.jobMetaRow}>
              <Icon name="pin" size={13} color={t.text3} />
              <Text style={s.jobMeta}>
                {j.dist} · {j.oficio}
              </Text>
            </View>
            <View style={s.jobFoot}>
              <Text style={s.jobPres}>{j.pres}</Text>
              <Text style={s.jobPost}>{j.postulados} postulados</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  )

  const renderPros = (list: Trabajador[]) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.strip}>
      {list.map((p) => (
        <Pressable
          key={p.id}
          style={s.proCard}
          onPress={() => navigation.navigate('Profesional', { pro: p })}
        >
          <View style={s.avatarWrap}>
            <View style={s.avatar}>
              <Icon name="user" size={26} color={t.text3} />
            </View>
            {p.verificado && (
              <View style={s.verif}>
                <Icon name="check" size={11} color={t.surface} />
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
        </Pressable>
      ))}
    </ScrollView>
  )

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }} showsVerticalScrollIndicator={false}>
        {/* ===== HERO (ámbar; degradé energético pendiente — ver HeroBands) ===== */}
        <View style={[s.hero, { paddingTop: insets.top + 8 }]}>
          <View style={s.topRow}>
            <Pressable style={s.locRow} onPress={() => setShowUbic(true)}>
              <Icon name="pin" size={18} color={t.onPrimary} />
              <Text style={s.locText} numberOfLines={1}>
                {zona}
              </Text>
              <Icon name="chevron" size={18} color={t.onPrimary} />
            </Pressable>
          </View>

          {/* "Buscador" → publicar un pedido (igual que Trabajos) */}
          <Pressable style={s.search} onPress={() => navigation.navigate('PublicarPedido')}>
            <Icon name="plus" size={20} color={t.text} />
            <Text style={s.searchPlaceholder}>¿Qué necesitás hacer hoy?</Text>
          </Pressable>

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
          <Text style={s.section}>Trabajos cerca tuyo</Text>
          <Pressable onPress={() => navigation.navigate('Trabajos')}>
            <Text style={s.verMas}>Ver mapa</Text>
          </Pressable>
        </View>
        <View style={s.mapCard}>
          <MapaPedidos height={210} pedidos={pedidos} me={miUbic} />
        </View>

        {/* ===== BANNER PROVEEDORES ===== */}
        <Pressable style={s.provBanner} onPress={() => navigation.navigate('Proveedores')}>
          <View style={s.provIcon}>
            <Icon name="obrador" size={24} color={t.surface} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.provTitle}>Proveedores en el mapa</Text>
            <Text style={s.provSub}>Corralones, ferreterías y materiales cerca tuyo</Text>
          </View>
          <Icon name="chevron" size={22} color={t.text3} />
        </Pressable>

        {/* ===== PROVEEDORES ===== */}
        {provs.length > 0 && (
          <>
            <Text style={s.section}>Proveedores</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.strip}>
              {provs.map((p) => (
                <Pressable
                  key={p.slug}
                  style={s.cat}
                  onPress={() => navigation.navigate('ProveedorCatalogo', { slug: p.slug, nombre: p.nombre })}
                >
                  <View style={s.provLogoBox}>
                    {p.logo ? (
                      <Image source={{ uri: p.logo }} style={s.provImg} resizeMode="contain" />
                    ) : (
                      <Text style={s.provInicial}>{(p.nombre || '?').charAt(0).toUpperCase()}</Text>
                    )}
                  </View>
                  <Text style={s.catLabel} numberOfLines={1}>
                    {p.nombre}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}

        {/* ===== OFICIOS ===== */}
        <Text style={s.section}>Oficios</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.strip}>
          {OFICIOS.map((o) => (
            <Pressable
              key={o.label}
              style={s.cat}
              onPress={() => navigation.navigate('Oficio', { oficio: o.label })}
            >
              <View style={s.catCircle}>
                <Icon name={o.icon} size={24} color={t.text} />
              </View>
              <Text style={s.catLabel} numberOfLines={1}>
                {o.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* ===== PROFESIONALES ===== */}
        <SectionHeader title="Profesionales cerca tuyo" />
        {prosLoading ? (
          <ActivityIndicator color={t.text3} style={{ marginVertical: spacing.lg }} />
        ) : pros.length === 0 ? (
          <Text style={s.emptyPros}>
            Todavía no hay profesionales en tu zona. ¡Ofrecé tus servicios y sé el primero!
          </Text>
        ) : (
          renderPros(pros)
        )}

        {/* NOTA: secciones "Mejores trabajos", "Urgentes cerca tuyo" y
            "Los más valorados" sacadas por ahora (datos y helpers quedan
            listos: TRABAJOS, URGENTES, TOP_PROS, renderTrabajos). */}
      </ScrollView>

      <SelectorDireccion visible={showUbic} onClose={() => setShowUbic(false)} />
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    hero: {
      backgroundColor: t.primary,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl + spacing.sm,
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,
    },
    topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 },
    locRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    headerActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    bellDot: {
      position: 'absolute',
      top: -1,
      right: -1,
      width: 9,
      height: 9,
      borderRadius: 5,
      backgroundColor: t.onPrimary,
      borderWidth: 1.5,
      borderColor: t.primary,
    },
    locText: { color: t.onPrimary, fontWeight: '800', fontSize: 16, letterSpacing: -0.2, maxWidth: 240 },
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
    searchPlaceholder: { flex: 1, color: t.text3, fontSize: 15, fontWeight: '600' },
    promo: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xl, minHeight: 92 },
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
    emptyPros: { color: t.text2, fontSize: 14, lineHeight: 20, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
    provBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      marginHorizontal: spacing.lg,
      marginTop: spacing.lg,
      padding: spacing.md,
      backgroundColor: t.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: t.border,
    },
    provIcon: {
      width: 46,
      height: 46,
      borderRadius: radius.md,
      backgroundColor: t.sel,
      alignItems: 'center',
      justifyContent: 'center',
    },
    provTitle: { color: t.text, fontSize: 15, fontWeight: '800' },
    provSub: { color: t.text2, fontSize: 12, fontWeight: '600', marginTop: 2 },
    jobCard: {
      width: 232,
      backgroundColor: t.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: t.border,
      overflow: 'hidden',
    },
    jobHeader: {
      height: 96,
      backgroundColor: t.surface2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badge: {
      position: 'absolute',
      top: spacing.sm,
      left: spacing.sm,
      borderRadius: radius.pill,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    badgePrimary: { backgroundColor: t.primary },
    badgeDanger: { backgroundColor: t.sel },
    badgeTxt: { fontSize: 11, fontWeight: '800' },
    jobBody: { padding: spacing.md },
    jobTitle: { color: t.text, fontSize: 15, fontWeight: '800' },
    jobMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
    jobMeta: { color: t.text2, fontSize: 12, fontWeight: '600' },
    jobFoot: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: spacing.sm,
    },
    jobPres: { color: t.text, fontSize: 15, fontWeight: '900' },
    jobPost: { color: t.text3, fontSize: 12, fontWeight: '600' },
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
    provLogoBox: {
      width: 64,
      height: 64,
      borderRadius: 18,
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: t.border,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    provImg: { width: 48, height: 48 },
    provInicial: { color: t.text2, fontSize: 26, fontWeight: '900' },
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
      backgroundColor: t.sel,
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
