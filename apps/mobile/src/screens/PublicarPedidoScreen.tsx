import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator, Modal, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { SelectorUbicacionMapa, Coord } from '../components/SelectorUbicacionMapa'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { useZona } from '../lib/zona'
import { useGate } from '../lib/gate'
import { publicarPedido, subirFotoPedido } from '../data/pedidosApi'

const TUCUMAN: Coord = { lat: -26.8241, lng: -65.2226 }

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
  'Fletero',
]

export default function PublicarPedidoScreen() {
  const t = useTheme()
  const s = styles(t)
  const { zona } = useZona()
  const gate = useGate()
  const navigation = useNavigation<any>()

  const [rubro, setRubro] = useState<string | null>(null)
  const [desc, setDesc] = useState('')
  const [urgente, setUrgente] = useState(false)
  const [presupuesto, setPresupuesto] = useState('')
  const [coord, setCoord] = useState<Coord | null>(null)
  const [zonaTxt, setZonaTxt] = useState<string | null>(null)
  const [initialCoord, setInitialCoord] = useState<Coord | null>(null)
  const [showMapa, setShowMapa] = useState(false)
  const [buscandoGPS, setBuscandoGPS] = useState(false)
  const [fotos, setFotos] = useState<string[]>([])
  const [publicando, setPublicando] = useState(false)

  const listo = rubro !== null && desc.trim().length >= 8 && coord !== null

  // Pide el GPS del dispositivo (preciso) como punto inicial y abre el mapa para ajustar.
  const abrirMapa = async () => {
    setBuscandoGPS(true)
    let start: Coord = coord ?? TUCUMAN
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === 'granted') {
        const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
        start = { lat: pos.coords.latitude, lng: pos.coords.longitude }
      }
    } catch {}
    setInitialCoord(start)
    setShowMapa(true)
    setBuscandoGPS(false)
  }

  const onConfirmMapa = async (c: Coord) => {
    setCoord(c)
    setShowMapa(false)
    // Nombre legible de la zona (barrio/ciudad) para mostrar y guardar.
    try {
      const [r] = await Location.reverseGeocodeAsync({ latitude: c.lat, longitude: c.lng })
      if (r) setZonaTxt([r.district, r.city || r.subregion].filter(Boolean).join(', ') || null)
    } catch {}
  }

  const agregarFotos = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') return Alert.alert('Fotos', 'Necesitamos permiso para acceder a tus fotos.')
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 5 - fotos.length,
      quality: 0.7,
    })
    if (!res.canceled) setFotos((f) => [...f, ...res.assets.map((a) => a.uri)].slice(0, 5))
  }

  const publicar = () =>
    gate('publicar un pedido', async () => {
      setPublicando(true)
      const descripcion =
        desc.trim() +
        (urgente ? '\n\n⚡ Urgente' : '') +
        (presupuesto.trim() ? `\n\nPresupuesto estimado: $${presupuesto.trim()}` : '')
      // Subir las fotos (si hay) y quedarnos con las URLs que subieron ok.
      const urls: string[] = []
      for (const uri of fotos) {
        const url = await subirFotoPedido(uri)
        if (url) urls.push(url)
      }
      const r = await publicarPedido({
        oficio: rubro as string,
        descripcion,
        zona: zonaTxt ?? zona,
        lat: coord?.lat ?? null,
        lng: coord?.lng ?? null,
        fotos: urls,
      })
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

        {/* Ubicación exacta (GPS + ajuste en el mapa) */}
        <Text style={s.label}>¿Dónde es el trabajo?</Text>
        <Pressable style={s.row} onPress={abrirMapa} disabled={buscandoGPS}>
          <Icon name="pin" size={20} color={coord ? t.primary : t.text2} />
          <Text style={[s.rowText, !coord && { color: t.text3 }]} numberOfLines={1}>
            {buscandoGPS
              ? 'Buscando tu ubicación…'
              : coord
                ? zonaTxt || 'Ubicación fijada en el mapa'
                : 'Fijar en el mapa'}
          </Text>
          {buscandoGPS ? <ActivityIndicator color={t.text3} /> : <Icon name="chevron" size={18} color={t.text3} />}
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
        <View style={s.fotosRow}>
          {fotos.map((uri, i) => (
            <View key={uri} style={s.fotoThumb}>
              <Image source={{ uri }} style={s.fotoImg} />
              <Pressable style={s.fotoX} onPress={() => setFotos((f) => f.filter((_, j) => j !== i))} hitSlop={6}>
                <Icon name="close" size={12} color={t.surface} />
              </Pressable>
            </View>
          ))}
          {fotos.length < 5 && (
            <Pressable style={s.fotoAdd} onPress={agregarFotos}>
              <Icon name="plus" size={26} color={t.text3} />
            </Pressable>
          )}
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
        {!listo && <Text style={s.hint}>Elegí un rubro, contá el trabajo y fijá la ubicación.</Text>}
      </ScrollView>

      <Modal visible={showMapa} animationType="slide" onRequestClose={() => setShowMapa(false)}>
        {initialCoord && (
          <SelectorUbicacionMapa initial={initialCoord} onConfirm={onConfirmMapa} onCancel={() => setShowMapa(false)} />
        )}
      </Modal>
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    headerTitle: { color: t.onPrimary, fontSize: 20, fontWeight: '900', letterSpacing: -0.4 },
    label: { color: t.text, fontSize: 15, fontWeight: '800', marginTop: spacing.lg, marginBottom: spacing.sm },
    wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    fotosRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xs },
    fotoThumb: { width: 72, height: 72, borderRadius: radius.md, overflow: 'hidden' },
    fotoImg: { width: '100%', height: '100%' },
    fotoX: { position: 'absolute', top: 3, right: 3, width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.55)', alignItems: 'center', justifyContent: 'center' },
    fotoAdd: { width: 72, height: 72, borderRadius: radius.md, borderWidth: 1, borderColor: t.border, borderStyle: 'dashed', backgroundColor: t.surface, alignItems: 'center', justifyContent: 'center' },
    chip: { backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 9 },
    chipOn: { backgroundColor: t.sel, borderColor: t.sel },
    chipTxt: { color: t.text2, fontWeight: '700', fontSize: 13 },
    chipTxtOn: { color: t.surface },
    chipDanger: { backgroundColor: t.sel, borderColor: t.sel },
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
