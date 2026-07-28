import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TextInput, Pressable, ActivityIndicator, StyleSheet, Dimensions, Linking, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const CARD_W = (Dimensions.get('window').width - 40) / 2 // 2 cards a lo ancho (padding 32 + gap 8)
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { useZona } from '../lib/zona'
import {
  Material,
  CatApp,
  getTaxonomiaApp,
  getMaterialesApp,
  getProveedores,
  getProvincias,
  getTaxonomiaProveedor,
  getMaterialesProveedor,
  precioAr,
  precioBaseAr,
  sentenceCase,
} from '../data/materialesApi'

const PROV_DEFAULT = 'Tucumán' // provincia inicial; el selector la cambia si hay más de una con datos

export default function MaterialesScreen() {
  const t = useTheme()
  const s = styles(t)
  const navigation = useNavigation<any>()
  useZona()
  const [taxo, setTaxo] = useState<CatApp[]>([])
  const [catIdx, setCatIdx] = useState<number | null>(null)
  const [subSel, setSubSel] = useState<string | null>(null)
  const [busqueda, setBusqueda] = useState('')
  const [items, setItems] = useState<Material[]>([])
  const [cargando, setCargando] = useState(false)
  const [provincias, setProvincias] = useState<string[]>([])
  const [provincia, setProvincia] = useState<string>(PROV_DEFAULT)
  const [provs, setProvs] = useState<{ nombre: string; slug: string; logo: string | null }[]>([])
  const [provSel, setProvSel] = useState<string | null>(null) // slug del proveedor, o null = todos

  const catSel = catIdx === null ? null : taxo[catIdx]

  // Provincias con datos (para el selector). Si la default no tiene datos, uso la primera disponible.
  useEffect(() => {
    getProvincias().then((ps) => {
      setProvincias(ps)
      if (ps.length && !ps.includes(provincia)) setProvincia(ps[0])
    })
  }, [])

  // Al elegir provincia (o cambiarla): recargar proveedores y resetear el filtro de proveedor.
  useEffect(() => {
    setProvSel(null)
    getProveedores(provincia).then(setProvs)
  }, [provincia])

  // Taxonomía: de UN proveedor si hay uno elegido, o de todos (comparador)
  useEffect(() => {
    const p = provSel ? getTaxonomiaProveedor(provincia, provSel) : getTaxonomiaApp(provincia)
    p.then((tx) => {
      setTaxo(tx)
      setCatIdx(tx.length ? 0 : null)
      setSubSel(null)
    })
  }, [provSel, provincia])

  // Productos de la categoría/subcategoría elegida (scoped al proveedor si hay uno)
  useEffect(() => {
    if (!catSel) {
      setItems([])
      return
    }
    setCargando(true)
    const id = setTimeout(() => {
      const p = provSel
        ? getMaterialesProveedor(provincia, provSel, catSel.nombre, subSel, busqueda)
        : getMaterialesApp(provincia, catSel.nombre, subSel, busqueda)
      p.then((r) => {
        setItems(r)
        setCargando(false)
      })
    }, 300)
    return () => clearTimeout(id)
    // depende de `taxo` (no de provSel) para re-consultar recién cuando la taxonomía del proveedor ya cargó
  }, [catIdx, subSel, busqueda, taxo])

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader
        title="Materiales"
        right={
          <Pressable hitSlop={8} onPress={() => navigation.navigate('Proveedores')} style={s.verMapa}>
            <Icon name="obrador" size={19} color={t.onPrimary} />
            <Text style={s.verMapaTxt}>Mapa</Text>
          </Pressable>
        }
      />

      {/* Provincia: solo aparece cuando hay más de una con datos */}
      {provincias.length > 1 && (
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.provinChips}>
            {provincias.map((pr) => (
              <Pressable key={pr} onPress={() => setProvincia(pr)} style={[s.provinChip, provincia === pr && s.provinChipOn]}>
                <Icon name="pin" size={15} color={provincia === pr ? t.onPrimary : t.text2} />
                <Text style={[s.provinTxt, provincia === pr && s.provinTxtOn]}>{pr}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={s.search}>
        <Icon name="search" size={20} color={t.text3} />
        <TextInput
          style={s.searchInput}
          placeholder="Buscar material…"
          placeholderTextColor={t.text3}
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      {/* Proveedores: carrusel de logos. "Todos" compara entre todos; elegí uno para ver solo su catálogo */}
      {provs.length > 0 && (
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.marcas}>
            {/* Todos */}
            <Pressable onPress={() => setProvSel(null)} style={s.marcaItem}>
              <View style={[s.marcaLogo, provSel === null && s.marcaLogoOn]}>
                <Icon name="container" size={26} color={provSel === null ? t.primary : t.text2} />
              </View>
              <Text style={[s.marcaTxt, provSel === null && s.marcaTxtOn]} numberOfLines={1}>
                Todos
              </Text>
            </Pressable>
            {provs.map((p) => {
              const on = provSel === p.slug
              return (
                <Pressable key={p.slug} onPress={() => setProvSel(p.slug)} style={s.marcaItem}>
                  <View style={[s.marcaLogo, on && s.marcaLogoOn]}>
                    {p.logo ? (
                      <Image source={{ uri: p.logo }} style={s.marcaImg} resizeMode="contain" />
                    ) : (
                      <Text style={s.marcaInicial}>{(p.nombre || '?').charAt(0).toUpperCase()}</Text>
                    )}
                  </View>
                  <Text style={[s.marcaTxt, on && s.marcaTxtOn]} numberOfLines={2}>
                    {p.nombre}
                  </Text>
                </Pressable>
              )
            })}
          </ScrollView>
        </View>
      )}

      {taxo.length === 0 ? (
        <View style={s.center}>
          <Text style={s.vacio}>
            Todavía no hay materiales clasificados.{'\n'}Completá categoría y subcategoría en la pestaña Materiales del Sheet.
          </Text>
        </View>
      ) : (
        <>
          {/* Categorías (tu clasificación) */}
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>
              {taxo.map((c, i) => (
                <Pressable
                  key={c.nombre}
                  onPress={() => {
                    setCatIdx(i)
                    setSubSel(null)
                  }}
                  style={[s.chip, catIdx === i && s.chipOn]}
                >
                  <Text style={[s.chipTxt, catIdx === i && s.chipTxtOn]} numberOfLines={1}>
                    {sentenceCase(c.nombre)}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Subcategorías */}
          {catSel && catSel.subs.length > 0 && (
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.subchips}>
                <Pressable onPress={() => setSubSel(null)} style={[s.subchip, subSel === null && s.subchipOn]}>
                  <Text style={[s.subchipTxt, subSel === null && s.subchipTxtOn]}>Todas</Text>
                </Pressable>
                {catSel.subs.map((sub) => (
                  <Pressable key={sub} onPress={() => setSubSel(sub)} style={[s.subchip, subSel === sub && s.subchipOn]}>
                    <Text style={[s.subchipTxt, subSel === sub && s.subchipTxtOn]} numberOfLines={1}>
                      {sentenceCase(sub)}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}

          {cargando ? (
            <View style={s.center}>
              <ActivityIndicator color={t.text2} />
            </View>
          ) : items.length === 0 ? (
            <View style={s.center}>
              <Text style={s.vacio}>No hay materiales acá todavía.</Text>
            </View>
          ) : (
            <ScrollView contentContainerStyle={{ padding: spacing.lg, gap: spacing.sm, paddingBottom: spacing.xl }}>
              {/* Cada ítem, full-width. Tocá y abre la página del producto. */}
              {items.map((m) => (
                <Pressable
                  key={m.id}
                  style={s.itemCard}
                  onPress={() => m.url && Linking.openURL(m.url)}
                  disabled={!m.url}
                >
                  {m.imagen ? (
                    <Image source={{ uri: m.imagen }} style={s.thumb} resizeMode="contain" />
                  ) : (
                    <View style={[s.thumb, s.thumbVacio]}>
                      <Icon name="box" size={22} color={t.text3} />
                    </View>
                  )}
                  <View style={{ flex: 1 }}>
                    <Text style={s.nombre}>{m.nombre}</Text>
                    <View style={s.metaRow}>
                      <View style={s.prov}>
                        <Text style={s.provTxt}>{m.proveedor}</Text>
                      </View>
                      {m.marca ? <Text style={s.cat}>{m.marca}</Text> : null}
                    </View>
                  </View>
                  <View style={s.precioBox}>
                    {m.precio > 0 ? (
                      <>
                        <Text style={s.precio}>{precioAr(m.precio)}</Text>
                        <Text style={s.unidad}>{m.unidadBase !== 'u' ? precioBaseAr(m) : 'por unidad'}</Text>
                      </>
                    ) : (
                      <Text style={s.consultar}>Consultar{'\n'}precio</Text>
                    )}
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </>
      )}
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    search: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      backgroundColor: t.surface,
      borderWidth: 1,
      borderColor: t.border,
      borderRadius: radius.pill,
      paddingHorizontal: spacing.md,
      height: 48,
      marginHorizontal: spacing.lg,
      marginTop: spacing.md,
    },
    searchInput: { flex: 1, color: t.text, fontSize: 15, padding: 0 },
    verMapa: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    verMapaTxt: { color: t.onPrimary, fontWeight: '800', fontSize: 14 },
    provinChips: { gap: spacing.sm, paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: 2 },
    provinChip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 8 },
    provinChipOn: { backgroundColor: t.sel, borderColor: t.sel },
    provinTxt: { color: t.text2, fontWeight: '800', fontSize: 13 },
    provinTxtOn: { color: t.surface },
    marcas: { gap: spacing.md, paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm, alignItems: 'flex-start' },
    marcaItem: { width: 68, alignItems: 'center' },
    marcaLogo: {
      width: 60,
      height: 60,
      borderRadius: 18,
      backgroundColor: '#FFFFFF',
      borderWidth: 1.5,
      borderColor: t.border,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    marcaLogoOn: { borderColor: t.sel, borderWidth: 2.5 },
    marcaImg: { width: 46, height: 46 },
    marcaInicial: { color: t.text2, fontSize: 24, fontWeight: '900' },
    marcaTxt: { color: t.text2, fontWeight: '700', fontSize: 11, textAlign: 'center', marginTop: 5, lineHeight: 13 },
    marcaTxtOn: { color: t.text, fontWeight: '900' },
    chips: { gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
    chip: {
      backgroundColor: t.surface,
      borderWidth: 1,
      borderColor: t.border,
      borderRadius: radius.pill,
      paddingHorizontal: spacing.md,
      paddingVertical: 8,
      maxWidth: 220,
    },
    chipOn: { backgroundColor: t.sel, borderColor: t.sel },
    chipTxt: { color: t.text2, fontWeight: '700', fontSize: 13 },
    chipTxtOn: { color: t.surface },
    subchips: { gap: 6, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
    subchip: {
      backgroundColor: t.bg,
      borderWidth: 1,
      borderColor: t.border,
      borderRadius: radius.pill,
      paddingHorizontal: spacing.md,
      paddingVertical: 6,
    },
    subchipOn: { backgroundColor: t.sel, borderColor: t.sel },
    subchipTxt: { color: t.text2, fontWeight: '700', fontSize: 12 },
    subchipTxtOn: { color: t.surface },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
    vacio: { color: t.text2, fontSize: 14, textAlign: 'center', lineHeight: 20 },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      backgroundColor: t.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: t.border,
      padding: spacing.md,
    },
    itemCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      backgroundColor: t.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: t.border,
      padding: spacing.md,
    },
    nombre: { color: t.text, fontSize: 12.5, fontWeight: '700', lineHeight: 16 },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: 6 },
    prov: { backgroundColor: t.surface2, borderRadius: radius.sm, paddingHorizontal: 7, paddingVertical: 2 },
    provTxt: { fontSize: 10, fontWeight: '800', color: t.text2 },
    cat: { color: t.text3, fontSize: 11, flexShrink: 1 },
    thumb: { width: 54, height: 54, borderRadius: radius.sm, backgroundColor: '#FFFFFF' },
    thumbVacio: { alignItems: 'center', justifyContent: 'center', backgroundColor: t.surface2 },
    precioBox: { alignItems: 'flex-end', gap: 2 },
    precio: { color: t.text, fontSize: 19, fontWeight: '900' },
    unidad: { color: t.text3, fontSize: 11 },
    consultar: { color: t.text2, fontSize: 12, fontWeight: '800', textAlign: 'right', lineHeight: 15 },
    // Comparador: subcategoría → fila deslizable
    seccion: { gap: spacing.sm },
    grupoTitulo: { fontSize: 15, fontWeight: '900', color: t.text, marginTop: spacing.sm },
    varRow: { gap: spacing.sm, paddingTop: 2 },
    optBox: {
      width: CARD_W,
      minHeight: 130,
      gap: 6,
      backgroundColor: t.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: t.border,
      padding: spacing.md,
    },
    optBest: { borderColor: t.primary, borderWidth: 2 },
    optMarca: { fontSize: 14, fontWeight: '800', color: t.text },
    varTag: {
      fontSize: 9,
      fontWeight: '900',
      color: t.onPrimary,
      backgroundColor: t.primary,
      borderRadius: radius.sm,
      paddingHorizontal: 5,
      paddingVertical: 1,
      overflow: 'hidden',
    },
  })
