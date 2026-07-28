import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TextInput, Pressable, ActivityIndicator, StyleSheet, Image, Linking } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { Material, CatApp, getTaxonomiaProveedor, getMaterialesProveedor, precioAr, precioBaseAr, sentenceCase } from '../data/materialesApi'

const PROVINCIA = 'Tucumán'

// Catálogo de UN proveedor del mapa (Easy, EMI, Maderplak…): sus productos tal cual, por categoría/subcategoría nativas.
export default function ProveedorCatalogoScreen() {
  const t = useTheme()
  const s = styles(t)
  const route = useRoute<any>()
  const navigation = useNavigation<any>()
  const { slug, nombre } = (route.params || {}) as { slug: string; nombre: string }

  const [taxo, setTaxo] = useState<CatApp[]>([])
  const [catIdx, setCatIdx] = useState<number | null>(null)
  const [subSel, setSubSel] = useState<string | null>(null)
  const [busqueda, setBusqueda] = useState('')
  const [items, setItems] = useState<Material[]>([])
  const [cargando, setCargando] = useState(false)

  const catSel = catIdx === null ? null : taxo[catIdx]

  // Agrupa por subcategoría → cada una es una sección con sus productos.
  const gruposMap = new Map<string, Material[]>()
  items.forEach((m) => {
    const k = m.subcatApp || '—'
    if (!gruposMap.has(k)) gruposMap.set(k, [])
    gruposMap.get(k)!.push(m)
  })
  const grupos = [...gruposMap.entries()].map(([sub, ms]) => ({ sub, items: ms.slice().sort((a, b) => a.precio - b.precio) }))

  useEffect(() => {
    getTaxonomiaProveedor(PROVINCIA, slug).then((tx) => {
      setTaxo(tx)
      if (tx.length) setCatIdx(0)
    })
  }, [slug])

  useEffect(() => {
    if (!catSel) {
      setItems([])
      return
    }
    setCargando(true)
    const id = setTimeout(() => {
      getMaterialesProveedor(PROVINCIA, slug, catSel.nombre, subSel, busqueda).then((r) => {
        setItems(r)
        setCargando(false)
      })
    }, 300)
    return () => clearTimeout(id)
  }, [catIdx, subSel, busqueda])

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader
        title={nombre || 'Catálogo'}
        left={
          <Pressable onPress={() => navigation.goBack()} style={s.headerLeft} hitSlop={10}>
            <Icon name="back" size={22} color={t.onPrimary} />
            <Text style={s.headerTitle} numberOfLines={1}>
              {nombre || 'Catálogo'}
            </Text>
          </Pressable>
        }
        right={
          <Pressable hitSlop={8} onPress={() => navigation.navigate('Proveedores')} style={s.verMapa}>
            <Icon name="pin" size={19} color={t.onPrimary} />
            <Text style={s.verMapaTxt}>Mapa</Text>
          </Pressable>
        }
      />

      <View style={s.search}>
        <Icon name="search" size={20} color={t.text3} />
        <TextInput
          style={s.searchInput}
          placeholder="Buscar en este proveedor…"
          placeholderTextColor={t.text3}
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      {taxo.length === 0 ? (
        <View style={s.center}>
          <Text style={s.vacio}>Este proveedor todavía no tiene productos cargados.</Text>
        </View>
      ) : (
        <>
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
              <Text style={s.vacio}>No hay productos acá.</Text>
            </View>
          ) : (
            <ScrollView contentContainerStyle={{ padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl }}>
              {grupos.map((g) => (
                <View key={g.sub} style={s.seccion}>
                  <Text style={s.grupoTitulo}>{sentenceCase(g.sub)}</Text>
                  {g.items.map((m) => (
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
                        <Text style={s.nombre} numberOfLines={2}>
                          {m.nombre}
                        </Text>
                        {m.marca ? <Text style={s.marca}>{m.marca}</Text> : null}
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
                </View>
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
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
    headerTitle: { color: t.onPrimary, fontSize: 20, fontWeight: '900', letterSpacing: -0.4, flexShrink: 1 },
    verMapa: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    verMapaTxt: { color: t.onPrimary, fontWeight: '800', fontSize: 14 },
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
    chips: { gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
    chip: { backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 8, maxWidth: 220 },
    chipOn: { backgroundColor: t.sel, borderColor: t.sel },
    chipTxt: { color: t.text2, fontWeight: '700', fontSize: 13 },
    chipTxtOn: { color: t.surface },
    subchips: { gap: 6, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
    subchip: { backgroundColor: t.bg, borderWidth: 1, borderColor: t.border, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 6 },
    subchipOn: { backgroundColor: t.sel, borderColor: t.sel },
    subchipTxt: { color: t.text2, fontWeight: '700', fontSize: 12 },
    subchipTxtOn: { color: t.surface },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
    vacio: { color: t.text2, fontSize: 14, textAlign: 'center', lineHeight: 20 },
    seccion: { gap: spacing.sm },
    grupoTitulo: { fontSize: 15, fontWeight: '900', color: t.text, marginTop: spacing.sm },
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
    thumb: { width: 54, height: 54, borderRadius: radius.sm, backgroundColor: '#FFFFFF' },
    thumbVacio: { alignItems: 'center', justifyContent: 'center', backgroundColor: t.surface2 },
    nombre: { color: t.text, fontSize: 13, fontWeight: '700', lineHeight: 17 },
    marca: { color: t.text3, fontSize: 11, marginTop: 4 },
    precioBox: { alignItems: 'flex-end', gap: 2 },
    precio: { color: t.text, fontSize: 19, fontWeight: '900' },
    unidad: { color: t.text3, fontSize: 11 },
    consultar: { color: t.text2, fontSize: 12, fontWeight: '800', textAlign: 'right', lineHeight: 15 },
  })
