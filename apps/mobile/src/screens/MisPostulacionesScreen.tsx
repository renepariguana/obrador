import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator, TextInput, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { MiPostulacion, misPostulaciones, EstadoPostulacion } from '../data/pedidosApi'
import { calificar, yaCalifique } from '../data/reviewsApi'

// El profesional elegido califica al cliente cuando el trabajo quedó completado.
function CalificarCliente({ pedidoId, clienteId, cliente, s, t }: { pedidoId: string; clienteId: string; cliente: string; s: any; t: any }) {
  const [calificado, setCalificado] = useState(false)
  const [estrellas, setEstrellas] = useState(0)
  const [comentario, setComentario] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    yaCalifique(pedidoId).then(setCalificado)
  }, [pedidoId])

  const enviar = async () => {
    if (estrellas < 1) return Alert.alert('Elegí una puntuación', 'Tocá las estrellas para calificar al cliente.')
    setEnviando(true)
    const r = await calificar(pedidoId, clienteId, estrellas, comentario)
    setEnviando(false)
    if (r.error) return Alert.alert('No se pudo enviar', r.error)
    setCalificado(true)
  }

  const nombre = cliente.split(' ')[0]
  return (
    <View style={s.calif}>
      {calificado ? (
        <Text style={s.califOk}>¡Gracias por calificar a {nombre}!</Text>
      ) : (
        <>
          <Text style={s.califLbl}>¿Cómo fue trabajar con {nombre}?</Text>
          <View style={s.stars}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Pressable key={n} onPress={() => setEstrellas(n)} hitSlop={4}>
                <Icon name="star" size={30} color={n <= estrellas ? t.rating : t.border} />
              </Pressable>
            ))}
          </View>
          <TextInput
            style={s.califInput}
            placeholder="Comentario (opcional)"
            placeholderTextColor={t.text3}
            value={comentario}
            onChangeText={setComentario}
            multiline
          />
          <Pressable style={[s.califBtn, (estrellas < 1 || enviando) && s.califBtnOff]} disabled={estrellas < 1 || enviando} onPress={enviar}>
            {enviando ? <ActivityIndicator color={t.onPrimary} /> : <Text style={s.califBtnTxt}>Enviar reseña</Text>}
          </Pressable>
        </>
      )}
    </View>
  )
}

function fecha(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })
  } catch {
    return ''
  }
}

export default function MisPostulacionesScreen({ navigation }: any) {
  const t = useTheme()
  const s = styles(t)
  const [items, setItems] = useState<MiPostulacion[]>([])
  const [cargando, setCargando] = useState(true)

  // Paleta Obrador: elegido = amarillo (ganaste), el resto en grises/negro.
  const BADGE: Record<EstadoPostulacion, { txt: string; bg: string; fg: string }> = {
    postulado: { txt: 'Postulado', bg: t.surface2, fg: t.text2 },
    elegido: { txt: '¡Te eligieron!', bg: t.primary, fg: t.onPrimary },
    rechazado: { txt: 'No elegido', bg: t.surface2, fg: t.text3 },
  }

  const cargar = useCallback(() => {
    setCargando(true)
    misPostulaciones()
      .then(setItems)
      .finally(() => setCargando(false))
  }, [])

  useFocusEffect(cargar)

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader
        left={
          <View style={s.headerLeft}>
            <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
              <Icon name="back" size={24} color={t.onPrimary} />
            </Pressable>
            <Text style={s.headerTitle}>Mis postulaciones</Text>
          </View>
        }
      />
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        {cargando ? (
          <ActivityIndicator color={t.primary} style={{ marginTop: spacing.xl }} />
        ) : items.length === 0 ? (
          <View style={s.vacio}>
            <Icon name="hand" size={36} color={t.text3} />
            <Text style={s.vacioTxt}>Todavía no te postulaste a ningún trabajo.</Text>
          </View>
        ) : (
          items.map((p) => {
            const b = BADGE[p.estadoPostulacion]
            return (
              <View key={p.pedidoId} style={s.card}>
                <View style={s.cardHead}>
                  <Text style={s.cardOficio}>{p.oficio}</Text>
                  <View style={[s.badge, { backgroundColor: b.bg }]}>
                    <Text style={[s.badgeTxt, { color: b.fg }]}>{b.txt}</Text>
                  </View>
                </View>
                <Text style={s.cardMeta}>{(p.zona || 'Sin zona') + ' · ' + fecha(p.creado_at)}</Text>
                {p.estadoPostulacion === 'elegido' && p.estadoPedido === 'completado' && (
                  <CalificarCliente pedidoId={p.pedidoId} clienteId={p.clienteId} cliente={p.cliente} s={s} t={t} />
                )}
              </View>
            )
          })
        )}
      </ScrollView>
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    headerTitle: { color: t.onPrimary, fontSize: 20, fontWeight: '900', letterSpacing: -0.4 },
    vacio: { alignItems: 'center', gap: spacing.md, marginTop: spacing.xl * 2 },
    vacioTxt: { color: t.text2, fontSize: 15, textAlign: 'center' },
    card: { backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md },
    cardHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    cardOficio: { color: t.text, fontSize: 16, fontWeight: '900' },
    badge: { borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4 },
    badgeTxt: { fontSize: 11, fontWeight: '800' },
    cardMeta: { color: t.text3, fontSize: 12, marginTop: 4 },
    calif: { marginTop: spacing.md, borderTopWidth: 1, borderTopColor: t.border, paddingTop: spacing.md, gap: spacing.sm },
    califOk: { color: t.text2, fontSize: 14, fontWeight: '700' },
    califLbl: { color: t.text, fontSize: 14, fontWeight: '800' },
    stars: { flexDirection: 'row', gap: 6 },
    califInput: { backgroundColor: t.bg, borderWidth: 1, borderColor: t.border, borderRadius: radius.md, minHeight: 44, paddingHorizontal: spacing.md, paddingTop: 10, color: t.text, fontSize: 14, textAlignVertical: 'top' },
    califBtn: { height: 46, borderRadius: radius.md, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center' },
    califBtnOff: { backgroundColor: t.surface2 },
    califBtnTxt: { color: t.onPrimary, fontSize: 15, fontWeight: '800' },
  })
