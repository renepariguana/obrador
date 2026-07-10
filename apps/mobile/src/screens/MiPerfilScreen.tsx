import React, { useState } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Icon, IconName } from '../components/Icon'
import { AppHeader } from '../components/AppHeader'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { useAuth } from '../lib/auth'

export default function MiPerfilScreen() {
  const t = useTheme()
  const insets = useSafeAreaInsets()
  const s = styles(t)
  const { cerrarSesion, logueado, irLogin } = useAuth()
  const [verificado] = useState(false)

  const Row = ({ icon, label, onPress, danger, tag }: { icon: IconName; label: string; onPress?: () => void; danger?: boolean; tag?: string }) => (
    <Pressable style={s.row} onPress={onPress}>
      <Icon name={icon} size={22} color={danger ? t.danger : t.text} />
      <Text style={[s.rowLabel, danger && { color: t.danger }]}>{label}</Text>
      {tag && (
        <View style={s.tag}>
          <Text style={s.tagTxt}>{tag}</Text>
        </View>
      )}
      <Icon name="chevron" size={18} color={t.text3} />
    </Pressable>
  )

  const Tile = ({ icon, label }: { icon: IconName; label: string }) => (
    <Pressable style={s.tile}>
      <View style={s.tileIcon}>
        <Icon name={icon} size={24} color={t.text} />
      </View>
      <Text style={s.tileLabel} numberOfLines={2}>
        {label}
      </Text>
    </Pressable>
  )

  // ===== Invitado (sin loguear, ubicación confirmada) =====
  if (!logueado) {
    return (
      <View style={{ flex: 1, backgroundColor: t.bg }}>
        <View style={[s.welcomeHero, { paddingTop: insets.top + spacing.xl }]}>
          <Text style={s.welcomeTitle}>Te damos{'\n'}la bienvenida</Text>
        </View>

        <View style={{ paddingTop: spacing.md }}>
          <Pressable style={s.gRow} onPress={irLogin}>
            <Icon name="login" size={22} color={t.text} />
            <Text style={s.gLabel}>Registrarme / Iniciar sesión</Text>
            <Icon name="chevron" size={18} color={t.text3} />
          </Pressable>

          <View style={s.gGap} />

          <Pressable style={s.gRow}>
            <Icon name="phone" size={22} color={t.text} />
            <Text style={s.gLabel}>Ayuda</Text>
            <Icon name="chevron" size={18} color={t.text3} />
          </Pressable>
          <Pressable style={s.gRow}>
            <Icon name="store" size={22} color={t.text} />
            <Text style={s.gLabel}>Registrar mi negocio</Text>
            <Icon name="chevron" size={18} color={t.text3} />
          </Pressable>
          <Pressable style={s.gRow}>
            <Icon name="info" size={22} color={t.text} />
            <Text style={s.gLabel}>Información legal</Text>
            <Icon name="chevron" size={18} color={t.text3} />
          </Pressable>
        </View>
      </View>
    )
  }

  // ===== Logueado =====
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + spacing.md, paddingBottom: spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        {/* Saludo */}
        <View style={s.greet}>
          <Text style={s.hola}>¡Hola, René!</Text>
          <View style={s.avatarSmall}>
            <Icon name="user" size={22} color={t.text3} />
          </View>
        </View>

        {/* Banner verificación */}
        {!verificado && (
          <View style={s.banner}>
            <View style={{ flex: 1 }}>
              <Text style={s.bannerTitle}>Verificá tu identidad</Text>
              <Text style={s.bannerText}>Reconocimiento facial + DNI. Los perfiles verificados reciben más trabajos.</Text>
            </View>
            <Icon name="chevron" size={22} color={t.onPrimary} />
          </View>
        )}

        {/* Accesos rápidos */}
        <View style={s.tiles}>
          <Tile icon="user" label="Datos personales" />
          <Tile icon="star" label="Mis reseñas" />
          <Tile icon="badge" label="Verificación" />
          <Tile icon="phone" label="Ayuda" />
        </View>

        {/* Completá tu perfil */}
        <View style={s.progress}>
          <View style={s.progressHead}>
            <Text style={s.progressTitle}>Completá tu perfil</Text>
            <Text style={s.progressLink}>Completar</Text>
          </View>
          <Text style={s.progressSub}>1 de 3</Text>
          <View style={s.track}>
            <View style={[s.seg, s.segOn]} />
            <View style={s.seg} />
            <View style={s.seg} />
          </View>
          <Text style={s.progressHint}>Verificá tu identidad y sumá tu primer trabajo.</Text>
        </View>

        {/* Perfil */}
        <Text style={s.section}>Perfil</Text>
        <View style={s.group}>
          <Row icon="pin" label="Direcciones" />
          <Row icon="heart" label="Favoritos" />
          <Row icon="wrench" label="Mis rubros" />
        </View>

        {/* Actividad */}
        <Text style={s.section}>Actividad</Text>
        <View style={s.group}>
          <Row icon="chat" label="Mis pedidos" />
          <Row icon="briefcase" label="Mis trabajos" />
          <Row icon="hand" label="Mis postulaciones" />
          <Row icon="card" label="Medios de pago" />
        </View>

        {/* Configuración */}
        <Text style={s.section}>Configuración</Text>
        <View style={s.group}>
          <Row icon="bell" label="Notificaciones" />
          <Row icon="info" label="Información legal" />
          <Row icon="store" label="Ofrecer mis servicios" tag="Nuevo" />
        </View>

        {/* Sesión */}
        <View style={[s.group, { marginTop: spacing.lg }]}>
          <Row icon="logout" label="Cerrar sesión" onPress={cerrarSesion} />
          <Row icon="trash" label="Eliminar cuenta" danger />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    welcomeHero: {
      backgroundColor: t.primary,
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
      justifyContent: 'flex-end',
      minHeight: 300,
    },
    welcomeTitle: { color: t.onPrimary, fontSize: 30, fontWeight: '900', lineHeight: 36, letterSpacing: -0.5 },
    gRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.lg, height: 60 },
    gLabel: { flex: 1, color: t.text, fontSize: 16, fontWeight: '600' },
    gGap: { height: spacing.md },
    guestWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
    guestIcon: { width: 88, height: 88, borderRadius: 44, backgroundColor: t.surface2, alignItems: 'center', justifyContent: 'center' },
    guestTitle: { color: t.text, fontSize: 20, fontWeight: '900', marginTop: spacing.lg },
    guestText: { color: t.text2, fontSize: 14, textAlign: 'center', marginTop: spacing.sm, lineHeight: 20 },
    guestBtn: { marginTop: spacing.xl, height: 52, borderRadius: radius.md, backgroundColor: t.primary, paddingHorizontal: spacing.xl * 1.5, alignItems: 'center', justifyContent: 'center' },
    guestBtnTxt: { color: t.onPrimary, fontSize: 16, fontWeight: '800' },

    greet: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg },
    hola: { color: t.text, fontSize: 22, fontWeight: '900' },
    avatarSmall: { width: 44, height: 44, borderRadius: 22, backgroundColor: t.surface2, alignItems: 'center', justifyContent: 'center' },

    banner: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: t.primary, borderRadius: radius.lg, padding: spacing.lg, marginHorizontal: spacing.lg, marginTop: spacing.lg },
    bannerTitle: { color: t.onPrimary, fontSize: 15, fontWeight: '900' },
    bannerText: { color: t.onPrimary, opacity: 0.82, fontSize: 12, marginTop: 3, lineHeight: 16 },

    tiles: { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.lg, marginTop: spacing.lg },
    tile: { flex: 1, alignItems: 'center', gap: 6 },
    tileIcon: { width: '100%', height: 62, borderRadius: radius.md, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, alignItems: 'center', justifyContent: 'center' },
    tileLabel: { color: t.text2, fontSize: 11, fontWeight: '700', textAlign: 'center' },

    progress: { backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: t.border, padding: spacing.lg, marginHorizontal: spacing.lg, marginTop: spacing.lg },
    progressHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    progressTitle: { color: t.text, fontSize: 16, fontWeight: '900' },
    progressLink: { color: t.text, fontSize: 14, fontWeight: '800' },
    progressSub: { color: t.text2, fontSize: 13, marginTop: 2 },
    track: { flexDirection: 'row', gap: 5, marginTop: spacing.sm },
    seg: { flex: 1, height: 5, borderRadius: 3, backgroundColor: t.surface2 },
    segOn: { backgroundColor: t.primary },
    progressHint: { color: t.text3, fontSize: 12, marginTop: spacing.sm },

    section: { color: t.text, fontSize: 16, fontWeight: '900', paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.sm },
    group: { backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: t.border, marginHorizontal: spacing.lg, overflow: 'hidden' },
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.md, height: 56 },
    rowLabel: { flex: 1, color: t.text, fontSize: 15, fontWeight: '600' },
    tag: { backgroundColor: t.primary, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 2 },
    tagTxt: { color: t.onPrimary, fontSize: 10, fontWeight: '800' },
  })
