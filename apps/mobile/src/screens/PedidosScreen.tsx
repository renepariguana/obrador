import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet } from 'react-native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { ConfirmarUbicacion } from '../components/ConfirmarUbicacion'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { useZona } from '../lib/zona'

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

export default function PedidosScreen() {
  const t = useTheme()
  const s = styles(t)
  const { zona, setZona } = useZona()
  const [rubro, setRubro] = useState<string | null>(null)
  const [desc, setDesc] = useState('')
  const [urgente, setUrgente] = useState(false)
  const [presupuesto, setPresupuesto] = useState('')
  const [showUbic, setShowUbic] = useState(false)
  const [publicado, setPublicado] = useState(false)

  const listo = rubro !== null && desc.trim().length >= 8

  if (publicado) {
    return (
      <View style={{ flex: 1, backgroundColor: t.bg }}>
        <AppHeader title="Pedidos" />
        <View style={s.okWrap}>
          <View style={s.okCircle}>
            <Icon name="check" size={40} color={t.onPrimary} />
          </View>
          <Text style={s.okTitle}>¡Pedido publicado!</Text>
          <Text style={s.okText}>
            Los profesionales de {zona} ya pueden verlo en el mapa y postularse.
          </Text>
          <Pressable
            style={s.okBtn}
            onPress={() => {
              setPublicado(false)
              setRubro(null)
              setDesc('')
              setUrgente(false)
              setPresupuesto('')
            }}
          >
            <Text style={s.okBtnTxt}>Publicar otro</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader title="Publicá tu pedido" />
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

        {/* Fotos */}
        <Text style={s.label}>Fotos (opcional)</Text>
        <Pressable style={s.fotos}>
          <Icon name="camera" size={22} color={t.text2} />
          <Text style={s.fotosTxt}>Agregar fotos</Text>
        </Pressable>

        {/* Publicar */}
        <Pressable
          style={[s.publicar, !listo && s.publicarOff]}
          disabled={!listo}
          onPress={() => setPublicado(true)}
        >
          <Text style={[s.publicarTxt, !listo && s.publicarTxtOff]}>Publicar pedido</Text>
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
    label: { color: t.text, fontSize: 15, fontWeight: '800', marginTop: spacing.lg, marginBottom: spacing.sm },
    wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    chip: { backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 9 },
    chipOn: { backgroundColor: t.primary, borderColor: t.primary },
    chipTxt: { color: t.text2, fontWeight: '700', fontSize: 13 },
    chipTxtOn: { color: t.onPrimary },
    chipDanger: { backgroundColor: t.danger, borderColor: t.danger },
    chipDangerTxt: { color: '#FFFFFF' },
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
    fotos: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
      height: 56,
      borderWidth: 1.5,
      borderColor: t.border,
      borderStyle: 'dashed',
      borderRadius: radius.md,
      backgroundColor: t.surface,
    },
    fotosTxt: { color: t.text2, fontSize: 14, fontWeight: '700' },
    publicar: { height: 54, borderRadius: radius.md, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl },
    publicarOff: { backgroundColor: t.surface2 },
    publicarTxt: { color: t.onPrimary, fontSize: 16, fontWeight: '800' },
    publicarTxtOff: { color: t.text3 },
    hint: { color: t.text3, fontSize: 12, textAlign: 'center', marginTop: spacing.sm },
    okWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
    okCircle: { width: 88, height: 88, borderRadius: 44, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center' },
    okTitle: { color: t.text, fontSize: 22, fontWeight: '900', marginTop: spacing.lg },
    okText: { color: t.text2, fontSize: 15, textAlign: 'center', marginTop: spacing.sm, lineHeight: 21 },
    okBtn: { marginTop: spacing.xl, height: 50, borderRadius: radius.md, backgroundColor: t.surface2, paddingHorizontal: spacing.xl, alignItems: 'center', justifyContent: 'center' },
    okBtnTxt: { color: t.text, fontSize: 15, fontWeight: '800' },
  })
