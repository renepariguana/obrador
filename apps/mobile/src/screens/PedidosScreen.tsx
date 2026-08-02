import React, { useState, useCallback } from 'react'
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { ConfirmarUbicacion } from '../components/ConfirmarUbicacion'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { useZona } from '../lib/zona'
import { useGate } from '../lib/gate'
import { publicarPedido, misPedidos, Pedido, EstadoPedido } from '../data/pedidosApi'

const RUBROS = [
  'Albañil',
  'Plomero',
  'Electricista',
  'Pintor',
  'Carpintero',
  'Herrero',
  'Paisajista',
  'Zinguero',
  'Durlero',
  'Gasista',
]

function fecha(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })
  } catch {
    return ''
  }
}

export default function PedidosScreen() {
  const t = useTheme()
  const s = styles(t)
  const { zona, setZona } = useZona()
  const gate = useGate()
  const navigation = useNavigation<any>()

  // Estados en paleta Obrador (amarillo + escala de grises/negro), sin colores sueltos.
  const ESTADO: Record<EstadoPedido, { txt: string; bg: string; fg: string }> = {
    abierto: { txt: 'Abierto', bg: t.primary, fg: t.onPrimary },
    asignado: { txt: 'Asignado', bg: t.text2, fg: t.surface },
    completado: { txt: 'Completado', bg: t.text, fg: t.bg },
    cancelado: { txt: 'Cancelado', bg: t.surface2, fg: t.text3 },
  }

  const [tab, setTab] = useState<'publicar' | 'mis'>('publicar')

  // Formulario
  const [rubro, setRubro] = useState<string | null>(null)
  const [desc, setDesc] = useState('')
  const [urgente, setUrgente] = useState(false)
  const [presupuesto, setPresupuesto] = useState('')
  const [showUbic, setShowUbic] = useState(false)
  const [publicando, setPublicando] = useState(false)

  // Mis pedidos
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [cargando, setCargando] = useState(false)

  const listo = rubro !== null && desc.trim().length >= 8

  const cargarMis = useCallback(() => {
    setCargando(true)
    misPedidos()
      .then((p) => setPedidos(p))
      .finally(() => setCargando(false))
  }, [])

  // Recargar mis pedidos al entrar a la pantalla (ej. al volver del detalle) y al cambiar de pestaña.
  useFocusEffect(
    useCallback(() => {
      if (tab === 'mis') cargarMis()
    }, [tab, cargarMis])
  )

  const publicar = () =>
    gate('publicar un pedido', async () => {
      setPublicando(true)
      const descripcion =
        desc.trim() +
        (urgente ? '\n\n⚡ Urgente' : '') +
        (presupuesto.trim() ? `\n\nPresupuesto estimado: $${presupuesto.trim()}` : '')
      const r = await publicarPedido({ oficio: rubro as string, descripcion, zona })
      setPublicando(false)
      if (r.error) return Alert.alert('No se pudo publicar', r.error)
      // Limpiar y saltar a Mis pedidos, donde aparece arriba de todo
      setRubro(null)
      setDesc('')
      setUrgente(false)
      setPresupuesto('')
      setTab('mis')
      cargarMis()
    })

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader
        title={tab === 'publicar' ? 'Publicá tu pedido' : 'Mis pedidos'}
        right={
          // El acceso al Presupuestador queda oculto hasta terminarlo (la ruta sigue en PedidosStack).
          tab === 'publicar' ? (
            <Pressable hitSlop={8} onPress={() => setTab('mis')}>
              <Icon name="hand" size={23} color={t.onPrimary} />
            </Pressable>
          ) : (
            <Pressable hitSlop={8} onPress={() => setTab('publicar')}>
              <Icon name="plus" size={24} color={t.onPrimary} />
            </Pressable>
          )
        }
      />

      {tab === 'mis' ? (
        <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl }} showsVerticalScrollIndicator={false}>
          {cargando ? (
            <ActivityIndicator color={t.primary} style={{ marginTop: spacing.xl }} />
          ) : pedidos.length === 0 ? (
            <View style={s.vacio}>
              <Icon name="pin" size={36} color={t.text3} />
              <Text style={s.vacioTxt}>Todavía no publicaste ningún pedido.</Text>
              <Pressable style={s.vacioBtn} onPress={() => setTab('publicar')}>
                <Text style={s.vacioBtnTxt}>Publicar un pedido</Text>
              </Pressable>
            </View>
          ) : (
            pedidos.map((p) => {
              const e = ESTADO[p.estado]
              return (
                <Pressable
                  key={p.id}
                  style={s.card}
                  onPress={() => navigation.navigate('DetallePedido', { pedido: p, dueno: true })}
                >
                  <View style={s.cardHead}>
                    <Text style={s.cardOficio}>{p.oficio}</Text>
                    <View style={[s.badge, { backgroundColor: e.bg }]}>
                      <Text style={[s.badgeTxt, { color: e.fg }]}>{e.txt}</Text>
                    </View>
                  </View>
                  <Text style={s.cardMeta}>
                    {(p.zona || 'Sin zona') + ' · ' + fecha(p.creado_at)}
                  </Text>
                  <Text style={s.cardDesc} numberOfLines={2}>
                    {p.descripcion}
                  </Text>
                  <View style={s.cardFoot}>
                    <Text style={s.cardVer}>Ver postulaciones</Text>
                    <Icon name="chevron" size={16} color={t.text3} />
                  </View>
                </Pressable>
              )
            })
          )}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl }} showsVerticalScrollIndicator={false}>
          {/* Rubro */}
          <Text style={s.label}>¿Qué necesitás?</Text>
          <View style={s.wrap}>
            {RUBROS.map((r) => {
              const on = rubro === r
              return (
                <Pressable key={r} onPress={() => setRubro(r)} style={[s.chip, on && s.chipOn]}>
                  <Text style={[s.chipTxt, on && s.chipTxtOn]}>{r}</Text>
                </Pressable>
              )
            })}
          </View>

          {/* Descripción */}
          <Text style={s.label}>Contanos el trabajo</Text>
          <TextInput
            style={s.textarea}
            placeholder="Ej: Tengo una pérdida de agua debajo de la pileta de la cocina…"
            placeholderTextColor={t.text3}
            value={desc}
            onChangeText={setDesc}
            multiline
            textAlignVertical="top"
          />

          {/* Ubicación */}
          <Text style={s.label}>¿Dónde?</Text>
          <Pressable style={s.row} onPress={() => setShowUbic(true)}>
            <Icon name="pin" size={20} color={t.text2} />
            <Text style={s.rowText}>{zona}</Text>
            <Icon name="chevron" size={18} color={t.text3} />
          </Pressable>

          {/* Urgente */}
          <Text style={s.label}>¿Es urgente?</Text>
          <View style={s.wrap}>
            <Pressable onPress={() => setUrgente(false)} style={[s.chip, !urgente && s.chipOn]}>
              <Text style={[s.chipTxt, !urgente && s.chipTxtOn]}>No</Text>
            </Pressable>
            <Pressable onPress={() => setUrgente(true)} style={[s.chip, urgente && s.chipDanger]}>
              <Text style={[s.chipTxt, urgente && s.chipDangerTxt]}>Sí, urgente</Text>
            </Pressable>
          </View>

          {/* Presupuesto */}
          <Text style={s.label}>Presupuesto estimado (opcional)</Text>
          <View style={s.row}>
            <Text style={s.peso}>$</Text>
            <TextInput
              style={s.rowInput}
              placeholder="0"
              placeholderTextColor={t.text3}
              keyboardType="numeric"
              value={presupuesto}
              onChangeText={setPresupuesto}
            />
          </View>

          {/* Publicar */}
          <Pressable
            style={[s.publicar, (!listo || publicando) && s.publicarOff]}
            disabled={!listo || publicando}
            onPress={publicar}
          >
            {publicando ? (
              <ActivityIndicator color={t.text3} />
            ) : (
              <Text style={[s.publicarTxt, !listo && s.publicarTxtOff]}>Publicar pedido</Text>
            )}
          </Pressable>
          {!listo && <Text style={s.hint}>Elegí un rubro y contanos un poco el trabajo.</Text>}
        </ScrollView>
      )}

      <ConfirmarUbicacion
        visible={showUbic}
        onConfirm={(z) => {
          if (z) setZona(z)
          setShowUbic(false)
        }}
      />
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    seg: {
      flexDirection: 'row',
      gap: spacing.sm,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.sm,
    },
    segBtn: {
      flex: 1,
      height: 40,
      borderRadius: radius.pill,
      backgroundColor: t.surface,
      borderWidth: 1,
      borderColor: t.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    segBtnOn: { backgroundColor: t.primary, borderColor: t.primary },
    segTxt: { color: t.text2, fontWeight: '800', fontSize: 14 },
    segTxtOn: { color: t.onPrimary },
    // Mis pedidos
    vacio: { alignItems: 'center', paddingTop: spacing.xl * 2, gap: spacing.md },
    vacioTxt: { color: t.text2, fontSize: 15, textAlign: 'center' },
    vacioBtn: { marginTop: spacing.sm, height: 48, borderRadius: radius.md, backgroundColor: t.primary, paddingHorizontal: spacing.xl, alignItems: 'center', justifyContent: 'center' },
    vacioBtnTxt: { color: t.onPrimary, fontSize: 15, fontWeight: '800' },
    card: { backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md },
    cardHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    cardOficio: { color: t.text, fontSize: 16, fontWeight: '900' },
    badge: { borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4 },
    badgeTxt: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
    cardMeta: { color: t.text3, fontSize: 12, marginTop: 4 },
    cardDesc: { color: t.text2, fontSize: 14, lineHeight: 19, marginTop: spacing.sm },
    cardFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 2, marginTop: spacing.sm },
    cardVer: { color: t.text3, fontSize: 13, fontWeight: '700' },
    // Formulario
    label: { color: t.text, fontSize: 15, fontWeight: '800', marginTop: spacing.lg, marginBottom: spacing.sm },
    wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    chip: { backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 9 },
    chipOn: { backgroundColor: t.primary, borderColor: t.primary },
    chipTxt: { color: t.text2, fontWeight: '700', fontSize: 13 },
    chipTxtOn: { color: t.onPrimary },
    chipDanger: { backgroundColor: t.text, borderColor: t.text },
    chipDangerTxt: { color: t.bg },
    textarea: {
      minHeight: 110,
      backgroundColor: t.surface,
      borderWidth: 1,
      borderColor: t.border,
      borderRadius: radius.md,
      padding: spacing.md,
      color: t.text,
      fontSize: 15,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      backgroundColor: t.surface,
      borderWidth: 1,
      borderColor: t.border,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      height: 52,
    },
    rowText: { flex: 1, color: t.text, fontSize: 15, fontWeight: '600' },
    rowInput: { flex: 1, color: t.text, fontSize: 15, padding: 0 },
    peso: { color: t.text2, fontSize: 16, fontWeight: '800' },
    publicar: { height: 54, borderRadius: radius.md, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl },
    publicarOff: { backgroundColor: t.surface2 },
    publicarTxt: { color: t.onPrimary, fontSize: 16, fontWeight: '800' },
    publicarTxtOff: { color: t.text3 },
    hint: { color: t.text3, fontSize: 12, textAlign: 'center', marginTop: spacing.sm },
  })
