import React, { useState } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import { AppHeader } from '../components/AppHeader'
import { Icon, IconName } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { useZona } from '../lib/zona'

export default function MiPerfilScreen() {
  const t = useTheme()
  const s = styles(t)
  const { zona } = useZona()
  const [verificado] = useState(false)

  const Row = ({ icon, label, onPress, danger }: { icon: IconName; label: string; onPress?: () => void; danger?: boolean }) => (
    <Pressable style={s.row} onPress={onPress}>
      <View style={[s.rowIcon, danger && s.rowIconDanger]}>
        <Icon name={icon} size={19} color={danger ? t.danger : t.text} />
      </View>
      <Text style={[s.rowLabel, danger && { color: t.danger }]}>{label}</Text>
      <Icon name="chevron" size={18} color={t.text3} />
    </Pressable>
  )

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader title="Mi perfil" right={<Icon name="gear" size={22} color={t.onPrimary} />} />
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }} showsVerticalScrollIndicator={false}>
        {/* Perfil */}
        <View style={s.profile}>
          <View style={s.avatarWrap}>
            <View style={s.avatar}>
              <Icon name="user" size={40} color={t.text3} />
            </View>
            {verificado && (
              <View style={s.verif}>
                <Icon name="check" size={14} color={t.onPrimary} />
              </View>
            )}
          </View>
          <Text style={s.name}>René Pariguana</Text>
          <Text style={s.sub}>San Miguel de Tucumán · {zona}</Text>

          <View style={s.stats}>
            <View style={s.stat}>
              <Text style={s.statNum}>4.9</Text>
              <Text style={s.statLbl}>rating</Text>
            </View>
            <View style={s.statDiv} />
            <View style={s.stat}>
              <Text style={s.statNum}>860</Text>
              <Text style={s.statLbl}>puntos</Text>
            </View>
            <View style={s.statDiv} />
            <View style={s.stat}>
              <Text style={s.statNum}>18</Text>
              <Text style={s.statLbl}>trabajos</Text>
            </View>
          </View>
        </View>

        {/* Verificación */}
        {!verificado && (
          <View style={s.verifCard}>
            <View style={{ flex: 1 }}>
              <Text style={s.verifTitle}>Verificá tu identidad</Text>
              <Text style={s.verifText}>
                Sumás confianza con reconocimiento facial + DNI. Los perfiles verificados reciben
                más trabajos.
              </Text>
            </View>
            <Pressable style={s.verifBtn}>
              <Text style={s.verifBtnTxt}>Verificarme</Text>
            </Pressable>
          </View>
        )}

        {/* Actividad */}
        <Text style={s.section}>Mi actividad</Text>
        <View style={s.group}>
          <Row icon="chat" label="Mis pedidos" />
          <Row icon="hand" label="Mis postulaciones" />
          <Row icon="star" label="Mis reseñas" />
        </View>

        {/* Cuenta */}
        <Text style={s.section}>Cuenta</Text>
        <View style={s.group}>
          <Row icon="badge" label="Medios de pago (MercadoPago)" />
          <Row icon="gear" label="Configuración" />
          <Row icon="phone" label="Ayuda y soporte" />
        </View>

        {/* Sesión */}
        <View style={[s.group, { marginTop: spacing.lg }]}>
          <Row icon="logout" label="Cerrar sesión" />
          <Row icon="trash" label="Borrar cuenta" danger />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    profile: { alignItems: 'center', paddingTop: spacing.lg, paddingHorizontal: spacing.lg },
    avatarWrap: { width: 84, height: 84 },
    avatar: {
      width: 84,
      height: 84,
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
    sub: { color: t.text2, fontSize: 13, marginTop: 2 },
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
    verifCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      backgroundColor: t.primary,
      borderRadius: radius.lg,
      padding: spacing.lg,
      marginHorizontal: spacing.lg,
      marginTop: spacing.lg,
    },
    verifTitle: { color: t.onPrimary, fontSize: 15, fontWeight: '900' },
    verifText: { color: t.onPrimary, opacity: 0.8, fontSize: 12, marginTop: 3, lineHeight: 16 },
    verifBtn: { backgroundColor: '#1A1A1A', borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 10 },
    verifBtnTxt: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
    section: {
      color: t.text,
      fontSize: 15,
      fontWeight: '800',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      paddingBottom: spacing.sm,
    },
    group: {
      backgroundColor: t.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: t.border,
      marginHorizontal: spacing.lg,
      overflow: 'hidden',
    },
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.md, height: 54 },
    rowIcon: { width: 34, height: 34, borderRadius: 10, backgroundColor: t.surface2, alignItems: 'center', justifyContent: 'center' },
    rowIconDanger: { backgroundColor: 'rgba(199,54,43,0.12)' },
    rowLabel: { flex: 1, color: t.text, fontSize: 14, fontWeight: '600' },
  })
