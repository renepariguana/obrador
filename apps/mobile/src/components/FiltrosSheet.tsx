import React, { useEffect, useState } from 'react'
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme, spacing, radius, Theme } from '../lib/theme'

export type Filtros = { zona: string | null; rubro: string | null; urgente: boolean }

const ZONAS = ['San Miguel de Tucumán', 'Barrio Norte', 'Yerba Buena']
const RUBROS = ['Plomero', 'Electricista', 'Albañil', 'Pintor', 'Gasista']

export function FiltrosSheet({
  visible,
  value,
  onApply,
  onClose,
}: {
  visible: boolean
  value: Filtros
  onApply: (f: Filtros) => void
  onClose: () => void
}) {
  const t = useTheme()
  const insets = useSafeAreaInsets()
  const s = styles(t)
  const [zona, setZona] = useState<string | null>(value.zona)
  const [rubro, setRubro] = useState<string | null>(value.rubro)
  const [urgente, setUrgente] = useState<boolean>(value.urgente)

  useEffect(() => {
    if (visible) {
      setZona(value.zona)
      setRubro(value.rubro)
      setUrgente(value.urgente)
    }
  }, [visible])

  const Chip = ({ label, on, onPress }: { label: string; on: boolean; onPress: () => void }) => (
    <Pressable onPress={onPress} style={[s.chip, on && s.chipOn]}>
      <Text style={[s.chipTxt, on && s.chipTxtOn]}>{label}</Text>
    </Pressable>
  )

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={s.backdrop} onPress={onClose}>
        <Pressable style={[s.sheet, { paddingBottom: insets.bottom + spacing.lg }]} onPress={() => {}}>
          <View style={s.grabber} />
          <Text style={s.title}>Filtrar pedidos</Text>

          <Text style={s.label}>Zona</Text>
          <View style={s.wrap}>
            <Chip label="Todas" on={zona === null} onPress={() => setZona(null)} />
            {ZONAS.map((z) => (
              <Chip key={z} label={z} on={zona === z} onPress={() => setZona(z)} />
            ))}
          </View>

          <Text style={s.label}>Rubro</Text>
          <View style={s.wrap}>
            <Chip label="Todos" on={rubro === null} onPress={() => setRubro(null)} />
            {RUBROS.map((r) => (
              <Chip key={r} label={r} on={rubro === r} onPress={() => setRubro(r)} />
            ))}
          </View>

          <Text style={s.label}>Prioridad</Text>
          <View style={s.wrap}>
            <Chip label="Todos" on={!urgente} onPress={() => setUrgente(false)} />
            <Chip label="Solo urgentes" on={urgente} onPress={() => setUrgente(true)} />
          </View>

          <View style={s.actions}>
            <Pressable
              style={s.limpiar}
              onPress={() => {
                setZona(null)
                setRubro(null)
                setUrgente(false)
              }}
            >
              <Text style={s.limpiarTxt}>Limpiar</Text>
            </Pressable>
            <Pressable style={s.aplicar} onPress={() => onApply({ zona, rubro, urgente })}>
              <Text style={s.aplicarTxt}>Aplicar</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
    sheet: {
      backgroundColor: t.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
    },
    grabber: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: t.border, marginBottom: spacing.md },
    title: { color: t.text, fontSize: 20, fontWeight: '900', textAlign: 'center' },
    label: { color: t.text, fontSize: 15, fontWeight: '800', marginTop: spacing.xl, marginBottom: spacing.sm },
    wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    chip: { backgroundColor: t.surface2, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 9 },
    chipOn: { backgroundColor: t.text },
    chipTxt: { color: t.text2, fontWeight: '700', fontSize: 13 },
    chipTxtOn: { color: t.surface },
    actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xl },
    limpiar: { flex: 1, height: 52, borderRadius: radius.md, backgroundColor: t.surface2, alignItems: 'center', justifyContent: 'center' },
    limpiarTxt: { color: t.text, fontSize: 15, fontWeight: '800' },
    aplicar: { flex: 1.4, height: 52, borderRadius: radius.md, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center' },
    aplicarTxt: { color: t.onPrimary, fontSize: 16, fontWeight: '800' },
  })
