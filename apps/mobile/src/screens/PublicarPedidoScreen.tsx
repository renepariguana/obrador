import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { ConfirmarUbicacion } from '../components/ConfirmarUbicacion'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { useZona } from '../lib/zona'
import { useGate } from '../lib/gate'
import { publicarPedido } from '../data/pedidosApi'

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

export default function PublicarPedidoScreen() {
  const t = useTheme()
  const s = styles(t)
  const { zona, setZona } = useZona()
  const gate = useGate()
  const navigation = useNavigation<any>()

  const [rubro, setRubro] = useState<string | null>(null)
  const [desc, setDesc] = useState('')
  const [urgente, setUrgente] = useState(false)
  const [presupuesto, setPresupuesto] = useState('')
  const [showUbic, setShowUbic] = useState(false)
  const [publicando, setPublicando] = useState(false)

  const listo = rubro !== null && desc.trim().length >= 8

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
      Alert.alert('¡Listo!', 'Tu pedido se publicó. Lo vas a ver en "Mis pedidos".', [
        { text: 'Ver mis pedidos', onPress: () => navigation.replace('MisPedidos') },
        { text: 'Cerrar', style: 'cancel', onPress: () => navigation.goBack() },
      ])
    })

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader
        title="Publicá tu pedido"
        left={
          <Pressable onPress={() => navigation.goBack()} style={s.headerLeft} hitSlop={10}>
            <Icon name="back" size={22} color={t.onPrimary} />
            <Text style={s.headerTitle}>Publicá tu pedido</Text>
          </Pressable>
        }
      />

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
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    headerTitle: { color: t.onPrimary, fontSize: 20, fontWeight: '900', letterSpacing: -0.4 },
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
