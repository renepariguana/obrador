import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet, Linking, Alert } from 'react-native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { Trabajador, Review, getTrabajador } from '../data/trabajadoresApi'
import { ReportarSheet } from '../components/ReportarSheet'
import { bloquear } from '../data/bloqueosApi'
import { useGate } from '../lib/gate'

export default function ProfesionalScreen({ route, navigation }: any) {
  const t = useTheme()
  const s = styles(t)
  const gate = useGate()
  const inicial: Trabajador = route.params.pro
  const [pro, setPro] = useState<Trabajador>(inicial)
  const [reviews, setReviews] = useState<Review[]>([])
  const [reportOpen, setReportOpen] = useState(false)

  useEffect(() => {
    getTrabajador(inicial.id).then((d) => {
      if (d) {
        setPro(d.trabajador)
        setReviews(d.reviews)
      }
    })
  }, [inicial.id])

  const bloquearUsuario = () =>
    Alert.alert(`¿Bloquear a ${pro.nombre}?`, 'No vas a ver más su perfil ni sus pedidos.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Bloquear',
        onPress: async () => {
          const r = await bloquear(pro.id)
          if (r.error) return Alert.alert('Error', r.error)
          navigation.goBack()
        },
      },
    ])

  const menu = () =>
    gate('moderar', () =>
      Alert.alert(pro.nombre, undefined, [
        { text: 'Reportar', onPress: () => setReportOpen(true) },
        { text: 'Bloquear', onPress: bloquearUsuario },
        { text: 'Cancelar', style: 'cancel' },
      ])
    )

  const contactar = () =>
    gate('contactar al profesional', () => {
      const wpp = (pro.whatsapp || '').replace(/\D/g, '')
      if (wpp) Linking.openURL(`https://wa.me/54${wpp}`)
      else if (pro.telefono) Linking.openURL(`tel:${pro.telefono}`)
    })

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
        right={
          <Pressable onPress={menu} hitSlop={10}>
            <Icon name="dots" size={22} color={t.onPrimary} />
          </Pressable>
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

          <Pressable style={s.cta} onPress={contactar}>
            <Icon name="whatsapp" size={18} color={t.onPrimary} />
            <Text style={s.ctaTxt}>Contactar</Text>
          </Pressable>
        </View>

        {pro.descripcion ? (
          <>
            <Text style={s.section}>Sobre {pro.nombre.split(' ')[0]}</Text>
            <Text style={s.descripcion}>{pro.descripcion}</Text>
          </>
        ) : null}

        <Text style={s.section}>Reseñas</Text>
        {reviews.length === 0 ? (
          <Text style={s.sinReviews}>Todavía no tiene reseñas.</Text>
        ) : (
          <View style={s.reviewsBox}>
            {reviews.map((r) => (
              <View key={r.id} style={s.review}>
                <View style={s.reviewHead}>
                  <Text style={s.reviewAutor}>{r.autorNombre}</Text>
                  <View style={s.reviewStars}>
                    <Icon name="star" size={13} color={t.rating} />
                    <Text style={s.reviewRating}>{r.estrellas}</Text>
                  </View>
                </View>
                {r.comentario ? <Text style={s.reviewTxt}>{r.comentario}</Text> : null}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <ReportarSheet
        visible={reportOpen}
        tipo="usuario"
        targetId={pro.id}
        titulo={pro.nombre}
        onClose={() => setReportOpen(false)}
      />
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
    descripcion: { color: t.text2, fontSize: 14, lineHeight: 20, paddingHorizontal: spacing.md },
    sinReviews: { color: t.text3, fontSize: 14, paddingHorizontal: spacing.md },
    reviewsBox: { paddingHorizontal: spacing.md, gap: spacing.sm },
    review: { backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: t.border, padding: spacing.md },
    reviewHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    reviewAutor: { color: t.text, fontSize: 14, fontWeight: '800' },
    reviewStars: { flexDirection: 'row', alignItems: 'center', gap: 3 },
    reviewRating: { color: t.text, fontSize: 13, fontWeight: '700' },
    reviewTxt: { color: t.text2, fontSize: 13, lineHeight: 18, marginTop: 4 },
  })
