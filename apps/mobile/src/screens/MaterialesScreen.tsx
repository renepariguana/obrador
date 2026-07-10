import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TextInput, Pressable, ActivityIndicator, StyleSheet } from 'react-native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { useZona } from '../lib/zona'
import { Material, getCategorias, getMateriales, precioAr } from '../data/materialesApi'

const PROVINCIA = 'Tucumán' // por ahora fijo; después se deriva de la ubicación

export default function MaterialesScreen() {
  const t = useTheme()
  const s = styles(t)
  useZona()
  const [categorias, setCategorias] = useState<string[]>([])
  const [cat, setCat] = useState<string | null>(null)
  const [busqueda, setBusqueda] = useState('')
  const [items, setItems] = useState<Material[]>([])
  const [cargando, setCargando] = useState(true)

  // Cargar categorías una vez
  useEffect(() => {
    getCategorias(PROVINCIA).then(setCategorias)
  }, [])

  // Cargar materiales al cambiar categoría o búsqueda (con debounce)
  useEffect(() => {
    setCargando(true)
    const id = setTimeout(() => {
      getMateriales(PROVINCIA, cat, busqueda).then((r) => {
        setItems(r)
        setCargando(false)
      })
    }, 350)
    return () => clearTimeout(id)
  }, [cat, busqueda])

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader title="Cotizar" right={<Icon name="cart" size={23} color={t.onPrimary} />} />

      {/* Buscador */}
      <View style={s.search}>
        <Icon name="search" size={20} color={t.text3} />
        <TextInput
          style={s.searchInput}
          placeholder="Buscar cemento, hierro, pintura…"
          placeholderTextColor={t.text3}
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      {/* Categorías */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>
          <Pressable onPress={() => setCat(null)} style={[s.chip, cat === null && s.chipOn]}>
            <Text style={[s.chipTxt, cat === null && s.chipTxtOn]}>Todos</Text>
          </Pressable>
          {categorias.map((c) => (
            <Pressable key={c} onPress={() => setCat(c)} style={[s.chip, cat === c && s.chipOn]}>
              <Text style={[s.chipTxt, cat === c && s.chipTxtOn]} numberOfLines={1}>
                {c}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Lista */}
      {cargando ? (
        <View style={s.center}>
          <ActivityIndicator color={t.text2} />
        </View>
      ) : items.length === 0 ? (
        <View style={s.center}>
          <Text style={s.vacio}>No hay materiales con ese filtro.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: spacing.lg, gap: spacing.sm, paddingBottom: spacing.xl }}>
          {items.map((m) => (
            <Pressable key={m.id} style={s.card}>
              <View style={{ flex: 1 }}>
                <Text style={s.nombre} numberOfLines={2}>
                  {m.nombre}
                </Text>
                <View style={s.metaRow}>
                  <View style={s.prov}>
                    <Text style={s.provTxt}>{m.proveedor}</Text>
                  </View>
                  {m.categoria && (
                    <Text style={s.cat} numberOfLines={1}>
                      {m.categoria}
                    </Text>
                  )}
                </View>
              </View>
              <View style={s.precioBox}>
                <Text style={s.precio}>{precioAr(m.precio)}</Text>
                {m.unidad && <Text style={s.unidad}>por {m.unidad}</Text>}
                <Pressable style={s.add}>
                  <Icon name="plus" size={16} color={t.onPrimary} />
                </Pressable>
              </View>
            </Pressable>
          ))}
        </ScrollView>
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
    chipOn: { backgroundColor: t.primary, borderColor: t.primary },
    chipTxt: { color: t.text2, fontWeight: '700', fontSize: 13 },
    chipTxtOn: { color: t.onPrimary },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
    vacio: { color: t.text2, fontSize: 14 },
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
    nombre: { color: t.text, fontSize: 14, fontWeight: '700', lineHeight: 19 },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: 6 },
    prov: { backgroundColor: t.surface2, borderRadius: radius.sm, paddingHorizontal: 7, paddingVertical: 2 },
    provTxt: { fontSize: 10, fontWeight: '800', color: t.text2 },
    cat: { color: t.text3, fontSize: 11, flexShrink: 1 },
    precioBox: { alignItems: 'flex-end', gap: 2 },
    precio: { color: t.text, fontSize: 16, fontWeight: '900' },
    unidad: { color: t.text3, fontSize: 10 },
    add: {
      marginTop: 4,
      width: 30,
      height: 30,
      borderRadius: 9,
      backgroundColor: t.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
