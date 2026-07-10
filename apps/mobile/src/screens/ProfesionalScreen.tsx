import React from 'react'
import { View, Text, ScrollView, Image, Pressable, StyleSheet, Dimensions } from 'react-native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { Profesional, trabajosDe } from '../data/profesionales'

const { width } = Dimensions.get('window')
const CARD = (width - spacing.md * 2 - spacing.sm) / 2

export default function ProfesionalScreen({ route, navigation }: any) {
  const t = useTheme()
  const s = styles(t)
  const pro: Profesional = route.params.pro
  const obras = trabajosDe(pro.oficio)

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader
        left={
          <View style={s.headerLeft}>
            <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
              <Icon name="back" size={24} color={t.onPrimary} />
            </Pressable>
            <Text style={s.headerTitle}>Perfil</Text>
          </View>
        }
      />

      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }} showsVerticalScrollIndicator={false}>
        {/* Perfil */}
        <View style={s.profile}>
          <View style={s.avatarWrap}>
            <View style={s.avatar}>
              <Icon name="user" size={40} color={t.text3} />
            </View>
            {pro.verificado && (
              <View style={s.verif}>
                <Icon name="check" size={14} color={t.onPrimary} />
              </View>
            )}
          </View>
          <Text style={s.name}>{pro.nombre}</Text>
          <Text style={s.oficio}>
            {pro.oficio} · a {pro.dist}
          </Text>
          {pro.verificado && (
            <View style={s.verifChip}>
              <Icon name="badge" size={13} color={t.onPrimary} />
              <Text style={s.verifChipTxt}>Identidad verificada</Text>
            </View>
          )}

          {/* Stats */}
          <View style={s.stats}>
            <View style={s.stat}>
              <Text style={s.statNum}>{pro.rating.toFixed(1)}</Text>
              <Text style={s.statLbl}>rating</Text>
            </View>
            <View style={s.statDiv} />
            <View style={s.stat}>
              <Text style={s.statNum}>{pro.puntos}</Text>
              <Text style={s.statLbl}>puntos</Text>
            </View>
            <View style={s.statDiv} />
            <View style={s.stat}>
              <Text style={s.statNum}>{pro.reviews}</Text>
              <Text style={s.statLbl}>reseñas</Text>
            </View>
          </View>

          <Pressable style={s.cta}>
            <Icon name="chat" size={18} color={t.onPrimary} />
            <Text style={s.ctaTxt}>Pedir presupuesto</Text>
          </Pressable>
        </View>

        {/* Trabajos realizados */}
        <Text style={s.section}>Trabajos realizados</Text>
        <View style={s.grid}>
          {obras.map((o) => (
            <Pressable key={o.id} style={s.obra}>
              <Image
                source={{ uri: `https://picsum.photos/seed/${pro.id}${o.id}/500/360` }}
                style={s.foto}
              />
              <View style={s.obraBody}>
                <Text style={s.obraTitle} numberOfLines={1}>
                  {o.titulo}
                </Text>
                <Text style={s.obraDesc} numberOfLines={2}>
                  {o.desc}
                </Text>
                <View style={s.obraMeta}>
                  <Icon name="star" size={12} color={t.rating} />
                  <Text style={s.obraRating}>{o.rating.toFixed(1)}</Text>
                  <Text style={s.obraFecha}>· {o.fecha}</Text>
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
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    headerTitle: { color: t.onPrimary, fontSize: 20, fontWeight: '900', letterSpacing: -0.4 },
    profile: { alignItems: 'center', paddingTop: spacing.lg, paddingHorizontal: spacing.lg },
    avatarWrap: { width: 88, height: 88 },
    avatar: {
      width: 88,
      height: 88,
      borderRadius: radius.pill,
      backgroundColor: t.surface2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    verif: {
      position: 'absolute',
      right: 0,
      bottom: 2,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: t.primary,
      borderWidth: 3,
      borderColor: t.bg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: { color: t.text, fontSize: 22, fontWeight: '900', marginTop: spacing.md },
    oficio: { color: t.text2, fontSize: 14, marginTop: 2 },
    verifChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: t.primary,
      borderRadius: radius.pill,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginTop: spacing.md,
    },
    verifChipTxt: { color: t.onPrimary, fontSize: 12, fontWeight: '800' },
    stats: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: t.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: t.border,
      paddingVertical: spacing.md,
      marginTop: spacing.lg,
      alignSelf: 'stretch',
    },
    stat: { flex: 1, alignItems: 'center' },
    statDiv: { width: 1, height: 28, backgroundColor: t.border },
    statNum: { color: t.text, fontSize: 18, fontWeight: '900' },
    statLbl: { color: t.text3, fontSize: 12, marginTop: 2 },
    cta: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      alignSelf: 'stretch',
      height: 50,
      borderRadius: radius.md,
      backgroundColor: t.primary,
      marginTop: spacing.md,
    },
    ctaTxt: { color: t.onPrimary, fontSize: 16, fontWeight: '800' },
    section: {
      color: t.text,
      fontSize: 17,
      fontWeight: '800',
      paddingHorizontal: spacing.md,
      paddingTop: spacing.xl,
      paddingBottom: spacing.md,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: spacing.md,
      gap: spacing.sm,
    },
    obra: {
      width: CARD,
      backgroundColor: t.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: t.border,
      overflow: 'hidden',
    },
    foto: { width: '100%', height: 110, backgroundColor: t.surface2 },
    obraBody: { padding: spacing.sm },
    obraTitle: { color: t.text, fontSize: 13, fontWeight: '800' },
    obraDesc: { color: t.text2, fontSize: 11, marginTop: 2, lineHeight: 15 },
    obraMeta: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 6 },
    obraRating: { color: t.text, fontSize: 11, fontWeight: '700' },
    obraFecha: { color: t.text3, fontSize: 11 },
  })
