import React, { useState } from 'react'
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Icon } from './Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'

const OPCIONES = [
  { label: 'San Miguel de Tucumán', sub: 'Tu ubicación actual' },
  { label: 'Barrio Norte', sub: 'Tucumán' },
  { label: 'Yerba Buena', sub: 'Tucumán' },
]

export function ConfirmarUbicacion({
  visible,
  onConfirm,
}: {
  visible: boolean
  onConfirm: (zona?: string) => void
}) {
  const t = useTheme()
  const insets = useSafeAreaInsets()
  const s = styles(t)
  const [sel, setSel] = useState(0)

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={() => onConfirm()}>
      <View style={s.backdrop}>
        <View style={[s.sheet, { paddingBottom: insets.bottom + spacing.lg }]}>
          <View style={s.grabber} />
          <Text style={s.title}>Confirmá tu ubicación</Text>
          <Text style={s.hint}>Te mostramos pedidos y profesionales de tu zona</Text>

          <Text style={s.sectionLabel}>Sugeridas</Text>
          {OPCIONES.map((o, i) => {
            const on = sel === i
            return (
              <Pressable key={o.label} style={s.opt} onPress={() => setSel(i)}>
                <Icon name="pin" size={22} color={on ? t.text : t.text3} />
                <View style={{ flex: 1 }}>
                  <Text style={[s.optLabel, on && { fontWeight: '800' }]}>{o.label}</Text>
                  <Text style={s.optSub}>{o.sub}</Text>
                </View>
                {on && (
                  <View style={s.check}>
                    <Icon name="check" size={13} color={t.onPrimary} />
                  </View>
                )}
              </Pressable>
            )
          })}

          <Pressable style={s.confirm} onPress={() => onConfirm(OPCIONES[sel].label)}>
            <Text style={s.confirmTxt}>Confirmar</Text>
          </Pressable>
          <Pressable style={s.nueva} onPress={() => onConfirm()}>
            <Text style={s.nuevaTxt}>Nueva dirección</Text>
          </Pressable>
        </View>
      </View>
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
    grabber: {
      alignSelf: 'center',
      width: 44,
      height: 5,
      borderRadius: 3,
      backgroundColor: t.border,
      marginBottom: spacing.lg,
    },
    title: { color: t.text, fontSize: 20, fontWeight: '900', textAlign: 'center' },
    hint: { color: t.text2, fontSize: 13, textAlign: 'center', marginTop: 4 },
    sectionLabel: {
      color: t.text,
      fontSize: 15,
      fontWeight: '800',
      marginTop: spacing.xl,
      marginBottom: spacing.xs,
    },
    opt: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
    optLabel: { color: t.text, fontSize: 15, fontWeight: '600' },
    optSub: { color: t.text3, fontSize: 12, marginTop: 1 },
    check: {
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: '#22A06B',
      alignItems: 'center',
      justifyContent: 'center',
    },
    confirm: {
      height: 52,
      borderRadius: radius.md,
      backgroundColor: t.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: spacing.lg,
    },
    confirmTxt: { color: t.onPrimary, fontSize: 16, fontWeight: '800' },
    nueva: {
      height: 52,
      borderRadius: radius.md,
      backgroundColor: t.surface2,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: spacing.sm,
    },
    nuevaTxt: { color: t.text, fontSize: 15, fontWeight: '800' },
  })
