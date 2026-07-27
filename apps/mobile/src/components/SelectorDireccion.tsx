import React, { useState } from 'react'
import { View, Text, Pressable, Modal, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { Icon } from './Icon'
import { SelectorUbicacionMapa, Coord } from './SelectorUbicacionMapa'
import { useTheme, spacing, Theme } from '../lib/theme'
import { useZona } from '../lib/zona'

const TUCUMAN: Coord = { lat: -26.8241, lng: -65.2226 }

// Nombre legible (calle + número) y detalle (barrio/ciudad) a partir de coordenadas.
async function nombreDe(c: Coord): Promise<{ label: string; detalle?: string }> {
  try {
    const [r] = await Location.reverseGeocodeAsync({ latitude: c.lat, longitude: c.lng })
    const label = [r?.street, r?.streetNumber].filter(Boolean).join(' ') || r?.name || 'Ubicación'
    const detalle = [r?.district, r?.city].filter(Boolean).join(', ') || undefined
    return { label, detalle }
  } catch {
    return { label: 'Ubicación' }
  }
}

export function SelectorDireccion({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const t = useTheme()
  const s = styles(t)
  const insets = useSafeAreaInsets()
  const { direcciones, activa, elegir, agregar, eliminar } = useZona()
  const [modo, setModo] = useState<'lista' | 'nueva'>('lista')
  const [mapaInicial, setMapaInicial] = useState<Coord | null>(null)
  const [buscandoGPS, setBuscandoGPS] = useState(false)

  const cerrar = () => {
    setModo('lista')
    setMapaInicial(null)
    onClose()
  }

  const usarMiUbicacion = async () => {
    setBuscandoGPS(true)
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') return Alert.alert('Ubicación', 'Necesitamos permiso de ubicación.')
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
      const c = { lat: pos.coords.latitude, lng: pos.coords.longitude }
      const { label, detalle } = await nombreDe(c)
      agregar({ ...c, label, detalle })
      cerrar()
    } catch {
      Alert.alert('Ubicación', 'No pudimos obtener tu ubicación.')
    } finally {
      setBuscandoGPS(false)
    }
  }

  const abrirMapa = async () => {
    let start: Coord = TUCUMAN
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === 'granted') {
        const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })
        start = { lat: pos.coords.latitude, lng: pos.coords.longitude }
      }
    } catch {}
    setMapaInicial(start)
  }

  const onConfirmMapa = async (c: Coord) => {
    const { label, detalle } = await nombreDe(c)
    agregar({ ...c, label, detalle })
    cerrar()
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={cerrar}>
      {mapaInicial ? (
        <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: t.bg }}>
          <SelectorUbicacionMapa initial={mapaInicial} onConfirm={onConfirmMapa} onCancel={() => setMapaInicial(null)} />
        </View>
      ) : (
        <View style={s.backdrop}>
          <Pressable style={{ flex: 1 }} onPress={cerrar} />
          <View style={[s.sheet, { paddingBottom: insets.bottom + spacing.md }]}>
            {modo === 'lista' ? (
              <>
                <View style={s.head}>
                  <Text style={s.title}>Elegí tu dirección</Text>
                  <Pressable onPress={cerrar} hitSlop={8}>
                    <Icon name="close" size={22} color={t.text} />
                  </Pressable>
                </View>

                <Pressable style={s.row} onPress={() => setModo('nueva')}>
                  <Icon name="plus" size={22} color={t.text} />
                  <Text style={[s.rowLabel, { flex: 1 }]}>Nueva dirección</Text>
                </Pressable>

                <ScrollView style={{ maxHeight: 320 }} showsVerticalScrollIndicator={false}>
                  {direcciones.map((d) => (
                    <View key={d.id} style={s.row}>
                      <Pressable style={s.rowMain} onPress={() => { elegir(d.id); cerrar() }}>
                        <Icon name="pin" size={20} color={t.text2} />
                        <View style={{ flex: 1 }}>
                          <Text style={s.rowLabel} numberOfLines={1}>{d.label}</Text>
                          {!!d.detalle && <Text style={s.rowSub} numberOfLines={1}>{d.detalle}</Text>}
                        </View>
                        {activa?.id === d.id && <Icon name="check" size={20} color={t.text} />}
                      </Pressable>
                      <Pressable hitSlop={8} onPress={() => eliminar(d.id)} style={{ paddingLeft: spacing.sm }}>
                        <Icon name="trash" size={18} color={t.text3} />
                      </Pressable>
                    </View>
                  ))}
                  {direcciones.length === 0 && (
                    <Text style={s.vacio}>Todavía no guardaste direcciones. Agregá una nueva.</Text>
                  )}
                </ScrollView>
              </>
            ) : (
              <>
                <View style={s.head}>
                  <Pressable onPress={() => setModo('lista')} hitSlop={8} style={s.backRow}>
                    <Icon name="back" size={22} color={t.text} />
                    <Text style={s.title}>Ingresá tu dirección</Text>
                  </Pressable>
                </View>

                <Pressable style={s.row} onPress={usarMiUbicacion} disabled={buscandoGPS}>
                  {buscandoGPS ? <ActivityIndicator color={t.text} /> : <Icon name="locate" size={22} color={t.text} />}
                  <Text style={[s.rowLabel, { flex: 1 }]}>
                    {buscandoGPS ? 'Buscando tu ubicación…' : 'Mi ubicación actual'}
                  </Text>
                </Pressable>
                <Pressable style={s.row} onPress={abrirMapa}>
                  <Icon name="pin" size={22} color={t.text} />
                  <Text style={[s.rowLabel, { flex: 1 }]}>Elegir en el mapa</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      )}
    </Modal>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
    sheet: { backgroundColor: t.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: spacing.lg },
    head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xs },
    backRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    title: { color: t.text, fontSize: 20, fontWeight: '900' },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingVertical: 14,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: t.border,
    },
    rowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    rowLabel: { color: t.text, fontSize: 16, fontWeight: '600' },
    rowSub: { color: t.text2, fontSize: 13, marginTop: 2 },
    vacio: { color: t.text3, fontSize: 14, textAlign: 'center', paddingVertical: spacing.xl },
  })
