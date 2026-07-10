import React from 'react'
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { porOficio, Profesional } from '../data/profesionales'

export default function OficioScreen({ route, navigation }: any) {
  const t = useTheme()
  const s = styles(t)
  const oficio: string = route?.params?.oficio ?? 'Profesionales'
  const data = porOficio(oficio)

  const renderItem = ({ item, index }: { item: Profesional; index: number }) => {
    const top = index === 0
    return (
      <Pressable
        style={[s.card, top && s.cardTop]}
        onPress={() => navigation.navigate('Profesional', { pro: item })}
      >
        <View style={[s.rank, top && s.rankTop]}>
          {top ? (
            <Icon name="star" size={16} color={t.onPrimary} />
          ) : (
            <Text style={s.rankTxt}>{index + 1}</Text>
          )}
        </View>

        <View style={s.avatarWrap}>
          <View style={s.avatar}>
            <Icon name="user" size={24} color={t.text3} />
          </View>
          {item.verificado && (
            <View style={s.verif}>
              <Icon name="check" size={10} color={t.onPrimary} />
            </View>
          )}
        </View>

        <View style={{ flex: 1 }}>
          <View style={s.nameRow}>
            <Text style={s.name} numberOfLines={1}>
              {item.nombre}
            </Text>
            {top && (
              <View style={s.mejorChip}>
                <Text style={s.mejorTxt}>Mejor valorado</Text>
              </View>
            )}
          </View>
          <Text style={s.oficio}>
            {item.oficio} · a {item.dist}
          </Text>
          <View style={s.metaRow}>
            <Icon name="star" size={13} color={t.rating} />
            <Text style={s.rating}>{item.rating.toFixed(1)}</Text>
            <Text style={s.puntos}>· {item.puntos} pts</Text>
            <Text style={s.reviews}>({item.reviews})</Text>
          </View>
        </View>

        <Icon name="chevron" size={18} color={t.text3} />
      </Pressable>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader
        left={
          <View style={s.headerLeft}>
            <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
              <Icon name="back" size={24} color={t.onPrimary} />
            </Pressable>
            <Text style={s.headerTitle}>{oficio}</Text>
          </View>
        }
      />
      <FlatList
        data={data}
        keyExtractor={(p) => p.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: spacing.md, gap: spacing.sm }}
        ListHeaderComponent={
          <Text style={s.hint}>Ordenados por puntaje — el que más cobró por la app aparece primero</Text>
        }
      />
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    headerTitle: { color: t.onPrimary, fontSize: 20, fontWeight: '900', letterSpacing: -0.4 },
    hint: { color: t.text2, fontSize: 12, paddingHorizontal: spacing.xs, paddingBottom: spacing.sm },
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
    cardTop: { borderColor: t.primary, borderWidth: 2, backgroundColor: t.surface },
    rank: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: t.surface2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rankTop: { backgroundColor: t.primary },
    rankTxt: { color: t.text2, fontSize: 13, fontWeight: '800' },
    avatarWrap: { width: 48, height: 48 },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: radius.pill,
      backgroundColor: t.surface2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    verif: {
      position: 'absolute',
      right: -2,
      bottom: -2,
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: t.primary,
      borderWidth: 2,
      borderColor: t.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    name: { color: t.text, fontSize: 15, fontWeight: '800', flexShrink: 1 },
    mejorChip: { backgroundColor: t.primary, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 2 },
    mejorTxt: { color: t.onPrimary, fontSize: 10, fontWeight: '800' },
    oficio: { color: t.text2, fontSize: 12, marginTop: 1 },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
    rating: { color: t.text, fontSize: 13, fontWeight: '700' },
    puntos: { color: t.text2, fontSize: 12, fontWeight: '700' },
    reviews: { color: t.text3, fontSize: 12 },
  })
