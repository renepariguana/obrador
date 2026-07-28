import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator, Linking } from 'react-native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import {
  EstadoPedido,
  Postulacion,
  postularse,
  postulacionesDe,
  elegir,
  completarPedido,
} from '../data/pedidosApi'
import { calificar, yaCalifique } from '../data/reviewsApi'
import { ReportarSheet } from '../components/ReportarSheet'
import { bloquear } from '../data/bloqueosApi'
import { useGate } from '../lib/gate'

export default function DetallePedidoScreen({ route, navigation }: any) {
  const t = useTheme()
  const s = styles(t)
  const gate = useGate()
  const raw = route.params.pedido
  const dueno: boolean = !!route.params.dueno

  // Campos de display normalizados (sirve tanto para PedidoVista como para Pedido)
  const pedidoId: string = raw.id
  const oficio: string = raw.oficio
  const zona: string = raw.zona || 'Sin zona'
  const texto: string = raw.quote ?? raw.descripcion ?? ''
  const urgente: boolean = raw.urgente ?? String(raw.descripcion || '').includes('⚡ Urgente')
  const titulo = dueno ? `Tu pedido de ${oficio}` : `${raw.cliente || 'Cliente'} necesita un ${oficio}`

  // Trabajador
  const [postulado, setPostulado] = useState<boolean>(!!raw.yaPostulado)
  const [enviando, setEnviando] = useState(false)

  // Dueño
  const [estado, setEstado] = useState<EstadoPedido>(raw.estado ?? 'abierto')
  const [posts, setPosts] = useState<Postulacion[]>([])
  const [cargando, setCargando] = useState(false)

  // Reseña (dueño, pedido completado)
  const [calificado, setCalificado] = useState(false)
  const [estrellas, setEstrellas] = useState(0)
  const [comentario, setComentario] = useState('')
  const [enviandoReview, setEnviandoReview] = useState(false)

  // Moderación (vista del trabajador)
  const [reportOpen, setReportOpen] = useState(false)
  const clienteId: string | undefined = raw.clienteId

  const bloquearCliente = () =>
    Alert.alert(`¿Bloquear a ${raw.cliente || 'este cliente'}?`, 'No vas a ver más sus pedidos.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Bloquear',
        onPress: async () => {
          if (!clienteId) return
          const r = await bloquear(clienteId)
          if (r.error) return Alert.alert('Error', r.error)
          navigation.goBack()
        },
      },
    ])

  const menu = () =>
    gate('moderar', () =>
      Alert.alert('Este pedido', undefined, [
        { text: 'Reportar', onPress: () => setReportOpen(true) },
        ...(clienteId ? [{ text: 'Bloquear al cliente', onPress: bloquearCliente }] : []),
        { text: 'Cancelar', style: 'cancel' as const },
      ])
    )

  const elegido = posts.find((p) => p.estado === 'elegido')

  const cargar = useCallback(() => {
    if (!dueno) return
    setCargando(true)
    postulacionesDe(pedidoId)
      .then(setPosts)
      .finally(() => setCargando(false))
    yaCalifique(pedidoId).then(setCalificado)
  }, [dueno, pedidoId])

  useEffect(() => {
    cargar()
  }, [cargar])

  const enviarReview = async () => {
    if (!elegido) return
    if (estrellas < 1) return Alert.alert('Elegí una puntuación', 'Tocá las estrellas para calificar el trabajo.')
    setEnviandoReview(true)
    const r = await calificar(pedidoId, elegido.trabajador_id, estrellas, comentario)
    setEnviandoReview(false)
    if (r.error) return Alert.alert('No se pudo enviar', r.error)
    setCalificado(true)
  }

  const postular = () =>
    gate('postularte al pedido', async () => {
      setEnviando(true)
      const r = await postularse(pedidoId)
      setEnviando(false)
      if (r.error) return Alert.alert('No se pudo postular', r.error)
      setPostulado(true)
    })

  const onElegir = (p: Postulacion) => {
    Alert.alert(`¿Elegir a ${p.nombre}?`, 'Se le asigna el trabajo y el pedido pasa a "asignado".', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Elegir',
        onPress: async () => {
          const r = await elegir(pedidoId, p.id, p.trabajador_id)
          if (r.error) return Alert.alert('Error', r.error)
          setEstado('asignado')
          cargar()
        },
      },
    ])
  }

  const onCompletar = () => {
    Alert.alert('Marcar completado', '¿El trabajo ya se hizo?', [
      { text: 'Todavía no', style: 'cancel' },
      {
        text: 'Sí, completado',
        onPress: async () => {
          const r = await completarPedido(pedidoId)
          if (r.error) return Alert.alert('Error', r.error)
          setEstado('completado')
        },
      },
    ])
  }

  const contactar = (p: Postulacion) => {
    const wpp = (p.whatsapp || '').replace(/\D/g, '')
    if (wpp) Linking.openURL(`https://wa.me/54${wpp}`)
    else if (p.telefono) Linking.openURL(`tel:${p.telefono}`)
    else Alert.alert('Sin contacto', 'Este profesional todavía no cargó su teléfono.')
  }

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader
        left={
          <View style={s.headerLeft}>
            <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
              <Icon name="back" size={24} color={t.onPrimary} />
            </Pressable>
            <Text style={s.headerTitle}>Pedido</Text>
          </View>
        }
        right={
          dueno ? undefined : (
            <Pressable onPress={menu} hitSlop={10}>
              <Icon name="dots" size={22} color={t.onPrimary} />
            </Pressable>
          )
        }
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Encabezado */}
        <View style={s.head}>
          <View style={s.avatar}>
            <Icon name="user" size={26} color={t.text3} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.cliente}>{titulo}</Text>
            <Text style={s.meta}>{zona}</Text>
          </View>
          <View style={s.tag}>
            <Text style={s.tagTxt}>{oficio}</Text>
          </View>
        </View>

        {urgente && (
          <View style={s.urgente}>
            <View style={s.urgenteDot} />
            <Text style={s.urgenteTxt}>Pedido urgente</Text>
          </View>
        )}

        {/* Descripción */}
        <Text style={s.section}>El trabajo</Text>
        <Text style={s.quote}>“{texto}”</Text>

        {/* Datos */}
        <View style={s.info}>
          {!dueno && raw.hace ? (
            <View style={s.infoRow}>
              <Icon name="clock" size={16} color={t.text3} />
              <Text style={s.infoTxt}>Publicado {raw.hace}</Text>
            </View>
          ) : null}
          <View style={s.infoRow}>
            <Icon name="pin" size={16} color={t.text3} />
            <Text style={s.infoTxt}>{zona}</Text>
          </View>
        </View>

        {/* ===== Vista del dueño: postulaciones ===== */}
        {dueno && (
          <>
            <Text style={s.section}>
              Postulaciones{posts.length ? ` (${posts.length})` : ''}
            </Text>
            {cargando ? (
              <ActivityIndicator color={t.primary} style={{ marginTop: spacing.md }} />
            ) : posts.length === 0 ? (
              <Text style={s.vacio}>Todavía nadie se postuló a este pedido.</Text>
            ) : (
              <View style={{ gap: spacing.sm, paddingHorizontal: spacing.lg }}>
                {posts.map((p) => {
                  const elegido = p.estado === 'elegido'
                  const rechazado = p.estado === 'rechazado'
                  return (
                    <View key={p.id} style={[s.postCard, elegido && s.postCardOn]}>
                      <View style={s.postHead}>
                        <View style={s.postAvatar}>
                          <Icon name="user" size={20} color={t.text3} />
                        </View>
                        <Text style={s.postNombre}>{p.nombre}</Text>
                        {elegido && (
                          <View style={s.chipOk}>
                            <Text style={s.chipOkTxt}>Elegido</Text>
                          </View>
                        )}
                        {rechazado && (
                          <View style={s.chipMuted}>
                            <Text style={s.chipMutedTxt}>No elegido</Text>
                          </View>
                        )}
                      </View>
                      {p.mensaje ? <Text style={s.postMsg}>“{p.mensaje}”</Text> : null}

                      {estado === 'abierto' ? (
                        <Pressable style={s.postBtn} onPress={() => onElegir(p)}>
                          <Text style={s.postBtnTxt}>Elegir a {p.nombre.split(' ')[0]}</Text>
                        </Pressable>
                      ) : elegido ? (
                        <Pressable style={s.postBtnGhost} onPress={() => contactar(p)}>
                          <Icon name="whatsapp" size={16} color={t.text} />
                          <Text style={s.postBtnGhostTxt}>Contactar</Text>
                        </Pressable>
                      ) : null}
                    </View>
                  )
                })}
              </View>
            )}
          </>
        )}

        {/* ===== Reseña del trabajo (dueño, completado) ===== */}
        {dueno && estado === 'completado' && elegido && (
          <>
            <Text style={s.section}>Calificá el trabajo</Text>
            {calificado ? (
              <Text style={s.vacio}>¡Gracias por tu reseña! Le sumaste puntos a {elegido.nombre}.</Text>
            ) : (
              <View style={s.reviewBox}>
                <Text style={s.reviewLbl}>¿Cómo trabajó {elegido.nombre.split(' ')[0]}?</Text>
                <View style={s.stars}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Pressable key={n} onPress={() => setEstrellas(n)} hitSlop={6}>
                      <Icon name="star" size={34} color={n <= estrellas ? t.rating : t.border} />
                    </Pressable>
                  ))}
                </View>
                <TextInput
                  style={s.reviewInput}
                  placeholder="Contá cómo fue el trabajo (opcional)"
                  placeholderTextColor={t.text3}
                  value={comentario}
                  onChangeText={setComentario}
                  multiline
                  textAlignVertical="top"
                />
                <Pressable
                  style={[s.reviewBtn, (estrellas < 1 || enviandoReview) && s.reviewBtnOff]}
                  onPress={enviarReview}
                  disabled={estrellas < 1 || enviandoReview}
                >
                  {enviandoReview ? (
                    <ActivityIndicator color={t.onPrimary} />
                  ) : (
                    <Text style={s.reviewBtnTxt}>Enviar reseña</Text>
                  )}
                </Pressable>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* ===== Barra inferior ===== */}
      <View style={s.bottomBar}>
        {dueno ? (
          estado === 'asignado' ? (
            <Pressable style={s.btnPrimaryFull} onPress={onCompletar}>
              <Icon name="check" size={18} color={t.onPrimary} />
              <Text style={s.btnPrimaryTxt}>Marcar completado</Text>
            </Pressable>
          ) : estado === 'completado' ? (
            <View style={s.okBar}>
              <Icon name="check" size={20} color={t.primary} />
              <Text style={s.okTxt}>Pedido completado</Text>
            </View>
          ) : (
            <View style={s.okBar}>
              <Icon name="clock" size={18} color={t.text3} />
              <Text style={s.okTxt}>Elegí un profesional de la lista</Text>
            </View>
          )
        ) : postulado ? (
          <View style={s.okBar}>
            <Icon name="check" size={20} color={t.primary} />
            <Text style={s.okTxt}>¡Te postulaste! El cliente va a poder verte.</Text>
          </View>
        ) : (
          <Pressable style={s.btnPrimaryFull} onPress={postular} disabled={enviando}>
            {enviando ? (
              <ActivityIndicator color={t.onPrimary} />
            ) : (
              <>
                <Icon name="hand" size={18} color={t.onPrimary} />
                <Text style={s.btnPrimaryTxt}>Postularme</Text>
              </>
            )}
          </Pressable>
        )}
      </View>

      <ReportarSheet
        visible={reportOpen}
        tipo="pedido"
        targetId={pedidoId}
        titulo="este pedido"
        onClose={() => setReportOpen(false)}
      />
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    headerTitle: { color: t.onPrimary, fontSize: 20, fontWeight: '900', letterSpacing: -0.4 },
    head: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg },
    avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: t.surface2, alignItems: 'center', justifyContent: 'center' },
    cliente: { color: t.text, fontSize: 17, fontWeight: '900' },
    meta: { color: t.text2, fontSize: 13, marginTop: 2 },
    tag: { backgroundColor: t.surface2, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 5 },
    tagTxt: { color: t.text2, fontSize: 11, fontWeight: '800' },
    urgente: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: t.surface2, alignSelf: 'flex-start', marginHorizontal: spacing.lg, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 6 },
    urgenteDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: t.sel },
    urgenteTxt: { color: t.text, fontWeight: '800', fontSize: 12 },
    section: { color: t.text, fontSize: 16, fontWeight: '900', paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.sm },
    quote: { color: t.text, fontSize: 15, lineHeight: 22, paddingHorizontal: spacing.lg, fontStyle: 'italic' },
    info: { backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: t.border, marginHorizontal: spacing.lg, marginTop: spacing.xl, padding: spacing.md, gap: spacing.md },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    infoTxt: { color: t.text2, fontSize: 13, fontWeight: '600' },
    vacio: { color: t.text3, fontSize: 14, paddingHorizontal: spacing.lg },
    // Postulaciones
    postCard: { backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: t.border, padding: spacing.md },
    postCardOn: { borderColor: t.primary, borderWidth: 2 },
    postHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    postAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: t.surface2, alignItems: 'center', justifyContent: 'center' },
    postNombre: { flex: 1, color: t.text, fontSize: 15, fontWeight: '800' },
    chipOk: { backgroundColor: t.primary, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4 },
    chipOkTxt: { color: t.onPrimary, fontSize: 11, fontWeight: '800' },
    chipMuted: { backgroundColor: t.surface2, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4 },
    chipMutedTxt: { color: t.text3, fontSize: 11, fontWeight: '800' },
    postMsg: { color: t.text2, fontSize: 13, fontStyle: 'italic', marginTop: spacing.sm },
    postBtn: { marginTop: spacing.md, height: 42, borderRadius: radius.md, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center' },
    postBtnTxt: { color: t.onPrimary, fontSize: 14, fontWeight: '800' },
    postBtnGhost: { marginTop: spacing.md, height: 42, borderRadius: radius.md, backgroundColor: t.surface2, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center' },
    postBtnGhostTxt: { color: t.text, fontSize: 14, fontWeight: '800' },
    // Reseña
    reviewBox: { marginHorizontal: spacing.lg, backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: t.border, padding: spacing.md },
    reviewLbl: { color: t.text, fontSize: 14, fontWeight: '700', textAlign: 'center' },
    stars: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm, marginTop: spacing.md },
    reviewInput: { minHeight: 70, backgroundColor: t.bg, borderWidth: 1, borderColor: t.border, borderRadius: radius.md, padding: spacing.md, color: t.text, fontSize: 14, marginTop: spacing.md },
    reviewBtn: { height: 48, borderRadius: radius.md, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center', marginTop: spacing.md },
    reviewBtnOff: { backgroundColor: t.surface2 },
    reviewBtnTxt: { color: t.onPrimary, fontSize: 15, fontWeight: '800' },
    // Barra inferior
    bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: t.surface, borderTopWidth: 1, borderTopColor: t.border, padding: spacing.md, paddingBottom: spacing.xl },
    btnPrimaryFull: { height: 52, borderRadius: radius.md, backgroundColor: t.primary, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center' },
    btnPrimaryTxt: { color: t.onPrimary, fontSize: 16, fontWeight: '800' },
    okBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, height: 52 },
    okTxt: { color: t.text, fontSize: 14, fontWeight: '700' },
  })
