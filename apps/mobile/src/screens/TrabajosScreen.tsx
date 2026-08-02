import React, { useEffect, useRef, useState, useCallback } from 'react'
import { View, Text, Pressable, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { MapaPedidos } from '../components/MapaPedidos'
import { Icon } from '../components/Icon'
import { FiltrosSheet, Filtros } from '../components/FiltrosSheet'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { pedidosAbiertos, PedidoVista } from '../data/pedidosApi'
import { useZona } from '../lib/zona'
import { useMiUbicacion } from '../lib/ubicacion'
import { useAuth } from '../lib/auth'
import { RegistroCTA } from '../components/RegistroCTA'

const FILTROS = ['Todos', 'Mi rubro', 'Urgentes', 'Hoy']
const { width } = Dimensions.get('window')

export default function TrabajosScreen() {
  const t = useTheme()
  const insets = useSafeAreaInsets()
  const s = styles(t)
  const { zona } = useZona()
  const miUbic = useMiUbicacion()
  const navigation = useNavigation<any>()
  const { logueado } = useAuth()
  const [filtros, setFiltros] = useState<Filtros>({ zona: null, rubro: null, urgente: false })
  const [showFiltros, setShowFiltros] = useState(false)
  const [filtro, setFiltro] = useState('Todos')
  const [sel, setSel] = useState(0)
  const [todos, setTodos] = useState<PedidoVista[]>([])
  const scrollRef = useRef<ScrollView>(null)
  const hayFiltro = filtros.zona !== null || filtros.rubro !== null || filtros.urgente

  // Traer pedidos abiertos reales cada vez que se entra a la pantalla (para ver los recién publicados).
  useFocusEffect(
    useCallback(() => {
      pedidosAbiertos().then(setTodos)
    }, [])
  )

  // Por defecto: todos. Aplica los filtros elegidos.
  let PEDIDOS = todos
  if (filtros.zona) PEDIDOS = PEDIDOS.filter((p) => p.zona === filtros.zona)
  if (filtros.rubro) PEDIDOS = PEDIDOS.filter((p) => p.oficio === filtros.rubro)
  if (filtros.urgente) PEDIDOS = PEDIDOS.filter((p) => p.urgente)

  // Al cambiar de zona o de filtros, la lista cambia → volver al primero
  useEffect(() => {
    setSel(0)
    scrollRef.current?.scrollTo({ x: 0, animated: false })
  }, [zona, filtros])

  // Tocaste un globo en el mapa → mover el carrusel a ese pedido
  const onMapSelect = (i: number) => {
    setSel(i)
    scrollRef.current?.scrollTo({ x: i * width, animated: true })
  }

  // Deslizaste el carrusel → seleccionar ese pedido (el mapa lo pinta de ámbar)
  const onCardScroll = (x: number) => {
    const i = Math.max(0, Math.min(PEDIDOS.length - 1, Math.round(x / width)))
    if (i !== sel) setSel(i)
  }

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <MapaPedidos fill pedidos={PEDIDOS} selected={sel} onSelect={onMapSelect} me={miUbic} />

      {logueado && (
        <>
      {/* ===== Overlays superiores ===== */}
      <View style={[s.top, { paddingTop: insets.top + 8 }]} pointerEvents="box-none">
        <View style={s.searchRow}>
          <Pressable style={s.search} onPress={() => navigation.navigate('PublicarPedido')}>
            <Icon name="plus" size={20} color={t.text} />
            <Text style={s.searchPlaceholder}>¿Qué necesitás hacer hoy?</Text>
          </Pressable>
          <Pressable style={[s.fbtn, hayFiltro && s.fbtnOn]} onPress={() => setShowFiltros(true)}>
            <Icon name="filter" size={20} color={hayFiltro ? t.surface : t.text} />
          </Pressable>
        </View>

        <View style={s.livePill}>
          <View style={s.liveDot} />
          <Text style={s.liveBold}>En vivo</Text>
          <Text style={s.liveSub}>· {PEDIDOS.length} pedidos cerca tuyo</Text>
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

      {/* ===== Carrusel de pedidos (deslizable) ===== */}
      <View style={[s.bottom, { paddingBottom: insets.bottom }]} pointerEvents="box-none">
        {PEDIDOS.length === 0 ? (
          <View style={{ paddingHorizontal: spacing.md }}>
            <View style={s.detail}>
              <Text style={s.detailName}>Sin pedidos con esos filtros</Text>
              <Text style={s.detailMeta}>Probá quitar algún filtro o cambiar de zona.</Text>
            </View>
          </View>
        ) : (
          <>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => onCardScroll(e.nativeEvent.contentOffset.x)}
        >
          {PEDIDOS.map((p) => (
            <View key={p.id} style={{ width, paddingHorizontal: spacing.md }}>
              <View style={s.detail}>
                <View style={s.detailHead}>
                  <View style={s.avatar}>
                    <Icon name="user" size={22} color={t.text3} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.detailName}>
                      {p.cliente} necesita un {p.oficio}
                    </Text>
                    <Text style={s.detailMeta}>{p.zona}</Text>
                  </View>
                  <View style={s.tag}>
                    <Text style={s.tagTxt}>{p.tag}</Text>
                  </View>
                </View>

                <Text style={s.quote}>“{p.quote}”</Text>

                <View style={s.detailFoot}>
                  <Icon name="clock" size={14} color={t.text3} />
                  <Text style={s.footText}>
                    {p.hace}
                    {p.yaPostulado ? ' · Ya te postulaste' : ''}
                  </Text>
                </View>

                <View style={s.actions}>
                  <Pressable
                    style={s.btnGhost}
                    onPress={() => navigation.navigate('DetallePedido', { pedido: p })}
                  >
                    <Text style={s.btnGhostTxt}>Ver detalle</Text>
                  </Pressable>
                  <Pressable
                    style={[s.btnPrimary, p.yaPostulado && s.btnDone]}
                    onPress={() => navigation.navigate('DetallePedido', { pedido: p })}
                  >
                    <Icon name={p.yaPostulado ? 'check' : 'hand'} size={18} color={p.yaPostulado ? t.text2 : t.onPrimary} />
                    <Text style={[s.btnPrimaryTxt, p.yaPostulado && s.btnDoneTxt]}>
                      {p.yaPostulado ? 'Ya postulado' : 'Postularme'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Puntitos */}
        <View style={s.dots}>
          {PEDIDOS.map((p, i) => (
            <View key={p.id} style={[s.dot, i === sel && s.dotOn]} />
          ))}
        </View>
          </>
        )}
      </View>
        </>
      )}

      {!logueado && (
        <View style={s.ctaOverlay}>
          <RegistroCTA texto="Registrate para ver los pedidos abiertos cerca tuyo y postularte." />
        </View>
      )}

      <FiltrosSheet
        visible={showFiltros}
        value={filtros}
        onApply={(f) => {
          setFiltros(f)
          setShowFiltros(false)
        }}
        onClose={() => setShowFiltros(false)}
      />
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    top: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: spacing.md },
    ctaOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center' },
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
    searchPlaceholder: { flex: 1, color: t.text3, fontSize: 15, fontWeight: '600' },
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
    fbtnOn: { backgroundColor: t.sel },
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
    liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: t.sel },
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
    chipOn: { backgroundColor: t.sel },
    chipTxt: { color: t.text2, fontWeight: '700', fontSize: 13 },
    chipTxtOn: { color: t.surface },
    bottom: { position: 'absolute', left: 0, right: 0, bottom: 0 },
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
    btnDone: { backgroundColor: t.surface2 },
    btnDoneTxt: { color: t.text2 },
    dots: { flexDirection: 'row', gap: 6, justifyContent: 'center', marginTop: spacing.sm, paddingBottom: spacing.sm },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: t.border },
    dotOn: { width: 18, backgroundColor: t.primary },
  })
