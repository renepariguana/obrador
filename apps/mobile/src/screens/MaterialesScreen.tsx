import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, Pressable, Image, StyleSheet, Dimensions } from 'react-native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { CATEGORIAS, porCategoria, precioAr } from '../data/materiales'

const { width } = Dimensions.get('window')
const CARD = (width - spacing.lg * 2 - spacing.md) / 2

export default function MaterialesScreen() {
  const t = useTheme()
  const s = styles(t)
  const [cat, setCat] = useState('Todos')
  const data = porCategoria(cat)

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader title="Materiales" right={<Icon name="cart" size={23} color={t.onPrimary} />} />

      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }} showsVerticalScrollIndicator={false}>
        {/* Buscador */}
        <View style={s.search}>
          <Icon name="search" size={20} color={t.text3} />
          <TextInput
            style={s.searchInput}
            placeholder="Buscar cemento, hierro, pintura…"
            placeholderTextColor={t.text3}
          />
        </View>

        {/* Categorías */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>
          {CATEGORIAS.map((c) => {
            const on = c === cat
            return (
              <Pressable key={c} onPress={() => setCat(c)} style={[s.chip, on && s.chipOn]}>
                <Text style={[s.chipTxt, on && s.chipTxtOn]}>{c}</Text>
              </Pressable>
            )
          })}
        </ScrollView>

        {/* Productos */}
        <View style={s.grid}>
          {data.map((m) => (
            <Pressable key={m.id} style={s.card}>
              <Image source={{ uri: `https://picsum.photos/seed/mat${m.id}/400/300` }} style={s.foto} />
              <View style={s.body}>
                <Text style={s.nombre} numberOfLines={2}>
                  {m.nombre}
                </Text>
                <Text style={s.prov} numberOfLines={1}>
                  {m.proveedor}
                </Text>
                <View style={s.priceRow}>
                  <View>
                    <Text style={s.precio}>{precioAr(m.precio)}</Text>
                    <Text style={s.unidad}>por {m.unidad}</Text>
                  </View>
                  <Pressable style={s.add}>
                    <Icon name="plus" size={18} color={t.onPrimary} />
                  </Pressable>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
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
    chip: { backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 8 },
    chipOn: { backgroundColor: t.primary, borderColor: t.primary },
    chipTxt: { color: t.text2, fontWeight: '700', fontSize: 13 },
    chipTxtOn: { color: t.onPrimary },
    grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.lg, gap: spacing.md },
    card: {
      width: CARD,
      backgroundColor: t.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: t.border,
      overflow: 'hidden',
    },
    foto: { width: '100%', height: 110, backgroundColor: t.surface2 },
    body: { padding: spacing.sm },
    nombre: { color: t.text, fontSize: 13, fontWeight: '800', lineHeight: 17, minHeight: 34 },
    prov: { color: t.text3, fontSize: 11, marginTop: 2 },
    priceRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: spacing.sm },
    precio: { color: t.text, fontSize: 16, fontWeight: '900' },
    unidad: { color: t.text3, fontSize: 11 },
    add: { width: 34, height: 34, borderRadius: 10, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center' },
  })
