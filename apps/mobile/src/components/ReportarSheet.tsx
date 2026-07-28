import React, { useState } from 'react'
import { Modal, View, Text, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { reportar, TipoReporte } from '../data/reportesApi'

const MOTIVOS = ['Spam o publicidad', 'Contenido inapropiado', 'Estafa o fraude', 'Otro']

export function ReportarSheet({
  visible,
  tipo,
  targetId,
  titulo,
  onClose,
}: {
  visible: boolean
  tipo: TipoReporte
  targetId: string
  titulo: string
  onClose: () => void
}) {
  const t = useTheme()
  const insets = useSafeAreaInsets()
  const s = styles(t)
  const [motivo, setMotivo] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  const enviar = async () => {
    if (!motivo) return
    setEnviando(true)
    const r = await reportar(tipo, targetId, motivo)
    setEnviando(false)
    if (r.error) return Alert.alert('No se pudo reportar', r.error)
    setMotivo(null)
    onClose()
    Alert.alert('Gracias', 'Recibimos tu reporte, lo vamos a revisar.')
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={s.backdrop} onPress={onClose}>
        <Pressable style={[s.sheet, { paddingBottom: insets.bottom + spacing.lg }]} onPress={() => {}}>
          <View style={s.grabber} />
          <Text style={s.title}>Reportar {titulo}</Text>
          <Text style={s.sub}>¿Cuál es el motivo?</Text>

          {MOTIVOS.map((m) => {
            const on = motivo === m
            return (
              <Pressable key={m} onPress={() => setMotivo(m)} style={[s.opt, on && s.optOn]}>
                <Text style={[s.optTxt, on && s.optTxtOn]}>{m}</Text>
              </Pressable>
            )
          })}

          <Pressable
            style={[s.btn, (!motivo || enviando) && s.btnOff]}
            disabled={!motivo || enviando}
            onPress={enviar}
          >
            {enviando ? (
              <ActivityIndicator color={t.onPrimary} />
            ) : (
              <Text style={s.btnTxt}>Enviar reporte</Text>
            )}
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
    sheet: { backgroundColor: t.bg, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, padding: spacing.lg },
    grabber: { alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: t.border, marginBottom: spacing.md },
    title: { color: t.text, fontSize: 19, fontWeight: '900' },
    sub: { color: t.text2, fontSize: 14, marginTop: 4, marginBottom: spacing.md },
    opt: {
      backgroundColor: t.surface,
      borderWidth: 1.5,
      borderColor: t.border,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: 14,
      marginBottom: spacing.sm,
    },
    optOn: { borderColor: t.sel, backgroundColor: t.surface2 },
    optTxt: { color: t.text, fontSize: 15, fontWeight: '700' },
    optTxtOn: { color: t.text, fontWeight: '900' },
    btn: { height: 52, borderRadius: radius.md, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center', marginTop: spacing.sm },
    btnOff: { backgroundColor: t.surface2 },
    btnTxt: { color: t.onPrimary, fontSize: 16, fontWeight: '800' },
  })
