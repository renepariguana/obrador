import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet, Modal, TextInput, Alert, ActivityIndicator, Linking } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Icon, IconName } from '../components/Icon'
import { AppHeader } from '../components/AppHeader'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { useAuth } from '../lib/auth'
import { useGate } from '../lib/gate'
import { getPerfil, guardarPerfil, Perfil, getMiPerfilProfesional, guardarPerfilProfesional, OFICIOS } from '../data/perfilApi'

// Base pública de las páginas legales (GitHub Pages). Ajustar al repo real → luego obrador.com.ar.
const LEGAL_BASE = 'https://renepariguana.github.io/obrador'

export default function MiPerfilScreen() {
  const t = useTheme()
  const insets = useSafeAreaInsets()
  const s = styles(t)
  const { cerrarSesion, logueado, irLogin, usuario, borrarCuenta } = useAuth()
  const gate = useGate()
  const navigation = useNavigation<any>()
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [form, setForm] = useState({ nombre: '', telefono: '', whatsapp: '', zona: '' })
  const [guardando, setGuardando] = useState(false)
  // Perfil profesional (ofrecer servicios)
  const [profOpen, setProfOpen] = useState(false)
  const [esTrabajador, setEsTrabajador] = useState(false)
  const [profDesc, setProfDesc] = useState('')
  const [profOficios, setProfOficios] = useState<string[]>([])
  const [profGuardando, setProfGuardando] = useState(false)

  useEffect(() => {
    if (!logueado) { setPerfil(null); setEsTrabajador(false); return }
    getPerfil().then((p) => {
      if (p) {
        setPerfil(p)
        setForm({ nombre: p.nombre || '', telefono: p.telefono || '', whatsapp: p.whatsapp || '', zona: p.zona || '' })
      }
    })
    getMiPerfilProfesional().then((pp) => {
      if (pp) { setEsTrabajador(pp.esTrabajador); setProfDesc(pp.descripcion); setProfOficios(pp.oficios) }
    })
  }, [logueado])

  const toggleOficio = (o: string) =>
    setProfOficios((xs) => (xs.includes(o) ? xs.filter((x) => x !== o) : [...xs, o]))

  const guardarProf = async () => {
    if (profOficios.length === 0) return Alert.alert('Elegí al menos un oficio')
    setProfGuardando(true)
    const r = await guardarPerfilProfesional(profDesc, profOficios, perfil?.zona ?? null)
    setProfGuardando(false)
    if (r.error) return Alert.alert('Error', r.error)
    setEsTrabajador(true)
    setProfOpen(false)
  }

  const guardar = async () => {
    setGuardando(true)
    const r = await guardarPerfil(form)
    setGuardando(false)
    if (r.error) return Alert.alert('Error', r.error)
    setPerfil((p) => (p ? { ...p, ...form } : p))
    setEditOpen(false)
  }
  const confirmarBorrar = () => {
    Alert.alert('Eliminar cuenta', 'Se borrará tu cuenta y tus datos. Esta acción no se puede deshacer.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: async () => { const r = await borrarCuenta(); if (r.error) Alert.alert('Error', r.error) } },
    ])
  }

  const Row = ({ icon, label, onPress, danger, tag }: { icon: IconName; label: string; onPress?: () => void; danger?: boolean; tag?: string }) => (
    <Pressable style={s.row} onPress={onPress}>
      <Icon name={icon} size={22} color={t.text} />
      <Text style={[s.rowLabel, danger && { fontWeight: '800' }]}>{label}</Text>
      {tag && (
        <View style={s.tag}>
          <Text style={s.tagTxt}>{tag}</Text>
        </View>
      )}
      <Icon name="chevron" size={18} color={t.text3} />
    </Pressable>
  )

  const Tile = ({ icon, label, onPress }: { icon: IconName; label: string; onPress?: () => void }) => (
    <Pressable style={s.tile} onPress={onPress}>
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

          <Pressable style={s.gRow} onPress={() => Linking.openURL('mailto:renepariguana@gmail.com?subject=Ayuda Obrador')}>
            <Icon name="mail" size={22} color={t.text} />
            <Text style={s.gLabel}>Ayuda</Text>
            <Icon name="chevron" size={18} color={t.text3} />
          </Pressable>
          <Pressable style={s.gRow} onPress={() => Linking.openURL(LEGAL_BASE)}>
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
          <Text style={s.hola}>
            ¡Hola{perfil?.nombre ? `, ${perfil.nombre.split(' ')[0]}` : ''}!
          </Text>
          <View style={s.avatarSmall}>
            <Icon name="user" size={22} color={t.text3} />
          </View>
        </View>
        {!perfil?.nombre && (
          <Pressable style={s.completarNombre} onPress={() => setEditOpen(true)}>
            <Text style={s.completarNombreTxt}>Completá tu nombre y datos de contacto →</Text>
          </Pressable>
        )}

        {/* Accesos rápidos */}
        <View style={s.tiles}>
          <Tile icon="user" label="Datos personales" onPress={() => setEditOpen(true)} />
          <Tile icon="star" label="Mis reseñas" />
          <Tile icon="badge" label="Verificación" />
          <Tile icon="phone" label="Ayuda" onPress={() => Linking.openURL('mailto:renepariguana@gmail.com?subject=Ayuda Obrador')} />
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

        {/* Actividad */}
        <Text style={s.section}>Actividad</Text>
        <View style={s.group}>
          <Row icon="chat" label="Mis pedidos" onPress={() => navigation.navigate('Pedidos')} />
          <Row icon="hand" label="Mis postulaciones" onPress={() => navigation.navigate('MisPostulaciones')} />
        </View>

        {/* Configuración */}
        <Text style={s.section}>Configuración</Text>
        <View style={s.group}>
          <Row icon="bell" label="Notificaciones" />
          <Row
            icon="lock"
            label="Usuarios bloqueados"
            onPress={() => gate('ver tus bloqueados', () => navigation.navigate('Bloqueados'))}
          />
          <Row icon="file" label="Términos y condiciones" onPress={() => Linking.openURL(`${LEGAL_BASE}/terminos.html`)} />
          <Row icon="info" label="Política de privacidad" onPress={() => Linking.openURL(`${LEGAL_BASE}/privacidad.html`)} />
          <Row
            icon="store"
            label={esTrabajador ? 'Mi perfil profesional' : 'Ofrecer mis servicios'}
            tag={esTrabajador ? undefined : 'Nuevo'}
            onPress={() => gate('ofrecer tus servicios', () => setProfOpen(true))}
          />
        </View>

        {/* Sesión */}
        <View style={[s.group, { marginTop: spacing.lg }]}>
          <Row icon="logout" label="Cerrar sesión" onPress={cerrarSesion} />
          <Row icon="trash" label="Eliminar cuenta" danger onPress={confirmarBorrar} />
        </View>
      </ScrollView>

      {/* Editar datos personales */}
      <Modal visible={editOpen} animationType="slide" transparent onRequestClose={() => setEditOpen(false)}>
        <View style={s.modalBg}>
          <View style={[s.modalCard, { paddingBottom: insets.bottom + spacing.md }]}>
            <Text style={s.modalTitle}>Tus datos</Text>
            {(
              [
                ['nombre', 'Nombre y apellido'],
                ['telefono', 'Teléfono'],
                ['whatsapp', 'WhatsApp'],
                ['zona', 'Zona / barrio'],
              ] as const
            ).map(([k, label]) => (
              <View key={k} style={s.field}>
                <Text style={s.fieldLabel}>{label}</Text>
                <TextInput
                  style={s.fieldInput}
                  value={(form as Record<string, string>)[k]}
                  onChangeText={(v) => setForm((f) => ({ ...f, [k]: v }))}
                  placeholder={label}
                  placeholderTextColor={t.text3}
                  keyboardType={k === 'telefono' || k === 'whatsapp' ? 'phone-pad' : 'default'}
                />
              </View>
            ))}
            <Pressable style={s.modalBtn} disabled={guardando} onPress={guardar}>
              {guardando ? <ActivityIndicator color={t.onPrimary} /> : <Text style={s.modalBtnTxt}>Guardar</Text>}
            </Pressable>
            <Pressable onPress={() => setEditOpen(false)} hitSlop={8}>
              <Text style={s.modalCancel}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Ofrecer mis servicios (perfil profesional) */}
      <Modal visible={profOpen} animationType="slide" transparent onRequestClose={() => setProfOpen(false)}>
        <View style={s.modalBg}>
          <View style={[s.modalCard, { paddingBottom: insets.bottom + spacing.md, maxHeight: '85%' }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={s.modalTitle}>Ofrecer mis servicios</Text>
              <Text style={s.fieldLabel}>¿Qué oficios ofrecés?</Text>
              <View style={s.oficioChips}>
                {OFICIOS.map((o) => {
                  const on = profOficios.includes(o)
                  return (
                    <Pressable key={o} onPress={() => toggleOficio(o)} style={[s.oficioChip, on && s.oficioChipOn]}>
                      <Text style={[s.oficioChipTxt, on && s.oficioChipTxtOn]}>{o}</Text>
                    </Pressable>
                  )
                })}
              </View>
              <View style={[s.field, { marginTop: spacing.md }]}>
                <Text style={s.fieldLabel}>Contanos sobre tu trabajo (opcional)</Text>
                <TextInput
                  style={[s.fieldInput, { height: 90, paddingTop: spacing.sm, textAlignVertical: 'top' }]}
                  value={profDesc}
                  onChangeText={setProfDesc}
                  placeholder="Ej: 10 años de experiencia en instalaciones…"
                  placeholderTextColor={t.text3}
                  multiline
                />
              </View>
              <Pressable style={s.modalBtn} disabled={profGuardando} onPress={guardarProf}>
                {profGuardando ? <ActivityIndicator color={t.onPrimary} /> : <Text style={s.modalBtnTxt}>{esTrabajador ? 'Guardar cambios' : 'Activar mi perfil'}</Text>}
              </Pressable>
              <Pressable onPress={() => setProfOpen(false)} hitSlop={8}>
                <Text style={s.modalCancel}>Cancelar</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    completarNombre: { marginHorizontal: spacing.lg, marginTop: -spacing.sm, marginBottom: spacing.sm },
    completarNombreTxt: { color: t.primary, fontSize: 14, fontWeight: '800' },
    modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
    modalCard: { backgroundColor: t.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: spacing.lg, gap: spacing.sm },
    modalTitle: { color: t.text, fontSize: 20, fontWeight: '900', marginBottom: spacing.xs },
    field: { gap: 4 },
    fieldLabel: { color: t.text2, fontSize: 13, fontWeight: '700' },
    fieldInput: { backgroundColor: t.surface2, borderRadius: radius.lg, height: 50, paddingHorizontal: spacing.md, color: t.text, fontSize: 16, borderWidth: 1, borderColor: t.border },
    modalBtn: { backgroundColor: t.primary, borderRadius: radius.pill, height: 52, alignItems: 'center', justifyContent: 'center', marginTop: spacing.sm },
    modalBtnTxt: { color: t.onPrimary, fontSize: 16, fontWeight: '800' },
    modalCancel: { color: t.text2, fontSize: 15, fontWeight: '700', textAlign: 'center', marginTop: spacing.sm },
    oficioChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
    oficioChip: { backgroundColor: t.surface2, borderRadius: radius.pill, borderWidth: 1, borderColor: t.border, paddingHorizontal: spacing.md, paddingVertical: 8 },
    oficioChipOn: { backgroundColor: t.primary, borderColor: t.primary },
    oficioChipTxt: { color: t.text2, fontSize: 13, fontWeight: '700' },
    oficioChipTxtOn: { color: t.onPrimary },
    guestWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
    guestIcon: { width: 88, height: 88, borderRadius: 44, backgroundColor: t.surface2, alignItems: 'center', justifyContent: 'center' },
    guestTitle: { color: t.text, fontSize: 20, fontWeight: '900', marginTop: spacing.lg },
    guestText: { color: t.text2, fontSize: 14, textAlign: 'center', marginTop: spacing.sm, lineHeight: 20 },
    guestBtn: { marginTop: spacing.xl, height: 52, borderRadius: radius.md, backgroundColor: t.primary, paddingHorizontal: spacing.xl * 1.5, alignItems: 'center', justifyContent: 'center' },
    guestBtnTxt: { color: t.onPrimary, fontSize: 16, fontWeight: '800' },

    greet: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg },
    hola: { color: t.text, fontSize: 22, fontWeight: '900' },
    avatarSmall: { width: 44, height: 44, borderRadius: 22, backgroundColor: t.surface2, alignItems: 'center', justifyContent: 'center' },

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
