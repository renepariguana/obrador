import React, { useMemo, useState } from 'react'
import { View, Text, Pressable, ScrollView, StyleSheet, Linking, TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { MapaProveedores } from '../components/MapaProveedores'
import { GUIA, RUBROS, GuiaProveedor } from '../data/guiaProveedores'
import { slugScrapeado, sentenceCase } from '../data/materialesApi'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { useMiUbicacion } from '../lib/ubicacion'

const TODOS = 'Todos'

// Rubros que NO son de materiales/insumos → no se muestran en el mapa (por ahora).
const EXCLUIR = new Set<string>([
  'INMOBILIARIAS',
  'EMPRESAS CONSTRUCTORAS',
  'CONSULTORÍA PROFESIONAL',
  'PLANOS - PLOTEO',
  'ESTUDIOS DE ARQUITECTURA',
])

// Deja solo dígitos; para WhatsApp arma el formato internacional argentino.
function soloDigitos(s: string) {
  return (s || '').replace(/\D/g, '')
}
function waNumero(s: string) {
  let d = soloDigitos(s)
  if (!d) return ''
  if (d.startsWith('54')) return d
  if (d.startsWith('0')) d = d.slice(1)
  return '549' + d // móvil Argentina
}

export default function ProveedoresScreen() {
  const t = useTheme()
  const s = styles(t)
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()
  const miUbic = useMiUbicacion()

  const [rubro, setRubro] = useState<string>(TODOS)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState<number | null>(null)

  // Saca los rubros excluidos; descarta el proveedor si se queda sin rubros válidos.
  const datos: GuiaProveedor[] = useMemo(
    () =>
      GUIA.map((p) => ({ ...p, rubros: p.rubros.filter((r) => !EXCLUIR.has(r)) })).filter(
        (p) => p.rubros.length > 0,
      ),
    [],
  )

  const lista: GuiaProveedor[] = useMemo(() => {
    const qn = normBusqueda(q)
    return datos.filter(
      (p) =>
        (rubro === TODOS || p.rubros.includes(rubro)) &&
        (!qn || normBusqueda(p.proveedor).includes(qn) || normBusqueda(p.direccion).includes(qn)),
    )
  }, [rubro, q, datos])

  const rubros = useMemo(() => [TODOS, ...RUBROS.filter((r) => !EXCLUIR.has(r))], [])

  // Sugerencias de rubro mientras escribís en el buscador.
  const sugerencias = useMemo(() => {
    const qn = normBusqueda(q)
    if (!qn) return []
    return RUBROS.filter((r) => !EXCLUIR.has(r) && normBusqueda(r).includes(qn)).slice(0, 8)
  }, [q])
  const activo = sel != null ? lista[sel] : null

  const abrir = (url: string) => Linking.openURL(url).catch(() => {})

  return (
    <View style={s.root}>
      <AppHeader
        title="Proveedores"
        left={
          <Pressable onPress={() => navigation.goBack()} style={s.headerLeft} hitSlop={10}>
            <Icon name="back" size={22} color={t.onPrimary} />
            <Text style={s.headerTitle}>Proveedores</Text>
          </Pressable>
        }
        right={<Text style={s.headerCount}>{lista.length}</Text>}
      />

      {/* Buscador */}
      <View style={s.search}>
        <Icon name="search" size={20} color={t.text3} />
        <TextInput
          style={s.searchInput}
          placeholder="Buscar proveedor o dirección…"
          placeholderTextColor={t.text3}
          value={q}
          onChangeText={(v) => {
            setQ(v)
            setSel(null)
          }}
        />
      </View>

      {/* Sugerencias de rubro */}
      {sugerencias.length > 0 && (
        <View style={s.sugWrap}>
          {sugerencias.map((r) => (
            <Pressable
              key={r}
              style={s.sugRow}
              onPress={() => {
                setRubro(r)
                setQ('')
                setSel(null)
              }}
            >
              <Icon name="store" size={15} color={t.text3} />
              <Text style={s.sugTxt} numberOfLines={1}>
                {sentenceCase(r)}
              </Text>
              <Icon name="chevron" size={16} color={t.text3} />
            </Pressable>
          ))}
        </View>
      )}

      {/* Selector de rubro */}
      <View style={s.filtroWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.filtroRow}
        >
          {rubros.map((r) => {
            const on = r === rubro
            return (
              <Pressable
                key={r}
                onPress={() => {
                  setRubro(r)
                  setSel(null)
                }}
                style={[s.chip, on && s.chipOn]}
              >
                <Text style={[s.chipTxt, on && s.chipTxtOn]} numberOfLines={1}>
                  {r === TODOS ? r : sentenceCase(r)}
                </Text>
              </Pressable>
            )
          })}
        </ScrollView>
      </View>

      {/* Mapa */}
      <View style={s.mapa}>
        <MapaProveedores proveedores={lista} selected={sel} onSelect={setSel} me={miUbic} />
      </View>

      {/* Ficha del proveedor seleccionado */}
      {activo && (
        <View style={[s.ficha, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
          <Pressable style={s.fichaClose} onPress={() => setSel(null)} hitSlop={10}>
            <Icon name="close" size={18} color={t.text3} />
          </Pressable>
          <Text style={s.fichaNombre} numberOfLines={1}>
            {capitalizar(activo.proveedor)}
          </Text>
          <Text style={s.fichaRubro} numberOfLines={1}>
            {activo.rubros.map(sentenceCase).join(' · ')}
          </Text>
          {!!activo.direccion && (
            <View style={s.fichaDirRow}>
              <Icon name="pin" size={14} color={t.text3} />
              <Text style={s.fichaDir} numberOfLines={2}>
                {activo.direccion}
              </Text>
            </View>
          )}

          {/* Si es un proveedor que scrapeamos, se puede ver su catálogo por categoría/subcategoría */}
          {(() => {
            const slug = slugScrapeado(activo.proveedor, activo.provincia)
            if (!slug) return null
            return (
              <Pressable
                style={s.verProductos}
                onPress={() => navigation.navigate('ProveedorCatalogo', { slug, nombre: capitalizar(activo.proveedor) })}
              >
                <Icon name="store" size={18} color={t.onPrimary} />
                <Text style={s.verProductosTxt}>Ver productos</Text>
                <Icon name="chevron" size={18} color={t.onPrimary} />
              </Pressable>
            )
          })()}

          <View style={s.acciones}>
            {!!soloDigitos(activo.tel) && (
              <Pressable style={[s.accion, s.accionWeb]} onPress={() => abrir(`tel:${soloDigitos(activo.tel)}`)}>
                <Icon name="phone" size={18} color={t.text} />
                <Text style={[s.accionTxt, { color: t.text }]}>Llamar</Text>
              </Pressable>
            )}
            {(!!waNumero(activo.whatsapp) || !!waNumero(activo.tel)) && (
              <Pressable
                style={[s.accion, s.accionWeb]}
                onPress={() => abrir(`https://wa.me/${waNumero(activo.whatsapp) || waNumero(activo.tel)}`)}
              >
                <Icon name="whatsapp" size={18} color="#25D366" />
                <Text style={[s.accionTxt, { color: t.text }]}>WhatsApp</Text>
              </Pressable>
            )}
            {!!activo.web && (
              <Pressable
                style={[s.accion, s.accionWeb]}
                onPress={() => abrir(normalizarUrl(activo.web))}
              >
                <Icon name="store" size={18} color={t.text} />
                <Text style={[s.accionTxt, { color: t.text }]}>Web</Text>
              </Pressable>
            )}
          </View>
        </View>
      )}
    </View>
  )
}

function normBusqueda(s: string) {
  return (s || '')
    .toLowerCase()
    .replace(/[áàä]/g, 'a')
    .replace(/[éèë]/g, 'e')
    .replace(/[íìï]/g, 'i')
    .replace(/[óòö]/g, 'o')
    .replace(/[úùü]/g, 'u')
    .replace(/ñ/g, 'n')
}
function capitalizar(s: string) {
  return s
    .toLowerCase()
    .split(' ')
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(' ')
}
function normalizarUrl(u: string) {
  const url = u.trim()
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

const styles = (t: Theme) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: t.bg },
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    headerTitle: { color: t.onPrimary, fontSize: 20, fontWeight: '900', letterSpacing: -0.4 },
    headerCount: { color: t.onPrimary, fontWeight: '800', opacity: 0.75 },

    search: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      backgroundColor: t.surface,
      borderWidth: 1,
      borderColor: t.border,
      borderRadius: radius.pill,
      paddingHorizontal: spacing.md,
      height: 46,
      marginHorizontal: spacing.md,
      marginTop: spacing.sm,
    },
    searchInput: { flex: 1, color: t.text, fontSize: 15, padding: 0 },
    sugWrap: {
      marginHorizontal: spacing.md,
      marginTop: 6,
      backgroundColor: t.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: t.border,
      overflow: 'hidden',
    },
    sugRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: 11,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: t.border,
    },
    sugTxt: { flex: 1, color: t.text, fontSize: 14, fontWeight: '600' },
    filtroWrap: { backgroundColor: t.surface, borderBottomWidth: 1, borderBottomColor: t.border },
    filtroRow: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: spacing.sm },
    chip: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: radius.pill,
      backgroundColor: t.surface2,
      maxWidth: 220,
    },
    chipOn: { backgroundColor: t.sel },
    chipTxt: { color: t.text2, fontWeight: '700', fontSize: 13 },
    chipTxtOn: { color: t.surface },

    mapa: { flex: 1 },

    ficha: {
      position: 'absolute',
      left: spacing.md,
      right: spacing.md,
      bottom: 0,
      backgroundColor: t.surface,
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
      padding: spacing.lg,
      shadowColor: '#000',
      shadowOpacity: 0.18,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: -4 },
      elevation: 12,
    },
    fichaClose: { position: 'absolute', top: spacing.md, right: spacing.md, padding: 4 },
    fichaNombre: { color: t.text, fontSize: 17, fontWeight: '900', paddingRight: 28 },
    fichaRubro: { color: t.text2, fontSize: 12, fontWeight: '700', marginTop: 2 },
    fichaDirRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: 8 },
    fichaDir: { color: t.text2, fontSize: 13, flex: 1, lineHeight: 18 },

    verProductos: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginTop: spacing.md,
      paddingVertical: 12,
      paddingHorizontal: spacing.md,
      borderRadius: radius.md,
      backgroundColor: t.primary,
    },
    verProductosTxt: { flex: 1, color: t.onPrimary, fontWeight: '900', fontSize: 15 },
    acciones: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
    accion: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingVertical: 11,
      borderRadius: radius.md,
      backgroundColor: t.primary,
    },
    accionWa: { backgroundColor: '#25D366' },
    accionWeb: { backgroundColor: t.surface2 },
    accionTxt: { color: t.onPrimary, fontWeight: '800', fontSize: 13 },
  })
