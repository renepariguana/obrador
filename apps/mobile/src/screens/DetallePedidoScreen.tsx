import React, { useState } from 'react'
import { View, Text, ScrollView, Image, Pressable, StyleSheet } from 'react-native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { Pedido } from '../data/pedidos'

export default function DetallePedidoScreen({ route, navigation }: any) {
  const t = useTheme()
  const s = styles(t)
  const p: Pedido = route.params.pedido
  const [postulado, setPostulado] = useState(false)

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
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Encabezado */}
        <View style={s.head}>
          <View style={s.avatar}>
            <Icon name="user" size={26} color={t.text3} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.cliente}>{p.cliente} necesita un {p.oficio}</Text>
            <Text style={s.meta}>A {p.dist} · {p.zona}</Text>
          </View>
          <View style={s.tag}>
            <Text style={s.tagTxt}>{p.tag}</Text>
          </View>
        </View>

        {p.urgente && (
          <View style={s.urgente}>
            <View style={s.urgenteDot} />
            <Text style={s.urgenteTxt}>Pedido urgente</Text>
          </View>
        )}

        {/* Descripción */}
        <Text style={s.section}>El trabajo</Text>
        <Text style={s.quote}>“{p.quote}”</Text>

        {/* Fotos */}
        <Text style={s.section}>Fotos del cliente</Text>
        <View style={s.fotos}>
          {[1, 2, 3].map((n) => (
            <Image
              key={n}
              source={{ uri: `https://picsum.photos/seed/ped${p.id}${n}/400/400` }}
              style={s.foto}
            />
          ))}
        </View>

        {/* Datos */}
        <View style={s.info}>
          <View style={s.infoRow}>
            <Icon name="clock" size={16} color={t.text3} />
            <Text style={s.infoTxt}>Publicado {p.hace}</Text>
          </View>
          <View style={s.infoRow}>
            <Icon name="hand" size={16} color={t.text3} />
            <Text style={s.infoTxt}>{p.postulados} profesionales ya se postularon</Text>
          </View>
          <View style={s.infoRow}>
            <Icon name="pin" size={16} color={t.text3} />
            <Text style={s.infoTxt}>{p.zona} · a {p.dist} tuyo</Text>
          </View>
        </View>
      </ScrollView>

      {/* Barra inferior */}
      <View style={s.bottomBar}>
        {postulado ? (
          <View style={s.okBar}>
            <Icon name="check" size={20} color="#22A06B" />
            <Text style={s.okTxt}>¡Te postulaste! El cliente va a poder verte.</Text>
          </View>
        ) : (
          <View style={s.actions}>
            <Pressable style={s.btnGhost}>
              <Icon name="chat" size={18} color={t.text} />
              <Text style={s.btnGhostTxt}>Mensaje</Text>
            </Pressable>
            <Pressable style={s.btnPrimary} onPress={() => setPostulado(true)}>
              <Icon name="hand" size={18} color={t.onPrimary} />
              <Text style={s.btnPrimaryTxt}>Postularme</Text>
            </Pressable>
          </View>
        )}
      </View>
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
    urgente: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(199,54,43,0.1)', alignSelf: 'flex-start', marginHorizontal: spacing.lg, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 6 },
    urgenteDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: t.danger },
    urgenteTxt: { color: t.danger, fontWeight: '800', fontSize: 12 },
    section: { color: t.text, fontSize: 16, fontWeight: '900', paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.sm },
    quote: { color: t.text, fontSize: 15, lineHeight: 22, paddingHorizontal: spacing.lg, fontStyle: 'italic' },
    fotos: { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.lg },
    foto: { flex: 1, aspectRatio: 1, borderRadius: radius.md, backgroundColor: t.surface2 },
    info: { backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: t.border, marginHorizontal: spacing.lg, marginTop: spacing.xl, padding: spacing.md, gap: spacing.md },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    infoTxt: { color: t.text2, fontSize: 13, fontWeight: '600' },
    bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: t.surface, borderTopWidth: 1, borderTopColor: t.border, padding: spacing.md, paddingBottom: spacing.xl },
    actions: { flexDirection: 'row', gap: spacing.sm },
    btnGhost: { flex: 1, height: 52, borderRadius: radius.md, backgroundColor: t.surface2, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center' },
    btnGhostTxt: { color: t.text, fontSize: 15, fontWeight: '800' },
    btnPrimary: { flex: 1.6, height: 52, borderRadius: radius.md, backgroundColor: t.primary, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center' },
    btnPrimaryTxt: { color: t.onPrimary, fontSize: 16, fontWeight: '800' },
    okBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, height: 52 },
    okTxt: { color: t.text, fontSize: 14, fontWeight: '700' },
  })
