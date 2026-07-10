import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import Svg, { Path, Circle } from 'react-native-svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MapaPedidos } from '../components/MapaPedidos'
import { Icon } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { useAuth } from '../lib/auth'

export default function UbicacionScreen() {
  const t = useTheme()
  const insets = useSafeAreaInsets()
  const s = styles(t)
  const { irLogin, entrarInvitado } = useAuth()
  const [dir, setDir] = useState('Pje. Holmberg 3535')

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      {/* Mapa (sin pedidos, solo tu ubicación) */}
      <MapaPedidos fill pedidos={[]} />

      {/* Ingresar (arriba a la derecha) */}
      <View style={[s.top, { paddingTop: insets.top + spacing.sm }]} pointerEvents="box-none">
        <Pressable onPress={irLogin} hitSlop={10} style={s.ingresarBtn}>
          <Text style={s.ingresar}>Ingresar</Text>
        </Pressable>
      </View>

      {/* Pin central fijo */}
      <View style={s.pinWrap} pointerEvents="none">
        <Svg width={40} height={50} viewBox="0 0 24 30">
          <Path
            d="M12 29c0 0-8.5-9.5-8.5-16A8.5 8.5 0 0 1 20.5 13c0 6.5-8.5 16-8.5 16z"
            fill="#1A1A1A"
          />
          <Circle cx={12} cy={12.5} r={3.2} fill="#D6D6D6" />
        </Svg>
      </View>

      {/* Botón centrar en mi ubicación */}
      <View style={s.locateWrap} pointerEvents="box-none">
        <Pressable style={s.locate}>
          <Icon name="locate" size={22} color={t.text} />
        </Pressable>
      </View>

      {/* Sheet inferior */}
      <View style={[s.sheet, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Text style={s.title}>Confirmá tu ubicación</Text>
        <View style={s.field}>
          <TextInput
            style={s.input}
            value={dir}
            onChangeText={setDir}
            placeholder="Tu dirección"
            placeholderTextColor={t.text3}
          />
          {dir.length > 0 && (
            <Pressable onPress={() => setDir('')} hitSlop={8}>
              <Icon name="close" size={18} color={t.text3} />
            </Pressable>
          )}
        </View>
        <Pressable style={s.confirm} onPress={entrarInvitado}>
          <Text style={s.confirmTxt}>Confirmar</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    top: { position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'flex-end', paddingHorizontal: spacing.lg },
    ingresarBtn: { backgroundColor: t.surface, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 8, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
    ingresar: { color: t.text, fontSize: 15, fontWeight: '800' },
    pinWrap: { position: 'absolute', top: '38%', left: 0, right: 0, alignItems: 'center', marginTop: -48 },
    locateWrap: { position: 'absolute', right: spacing.lg, bottom: 230, alignItems: 'flex-end' },
    locate: { width: 48, height: 48, borderRadius: 24, backgroundColor: t.surface, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 4 },
    sheet: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: t.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: spacing.lg,
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: -4 },
      elevation: 10,
    },
    title: { color: t.text, fontSize: 20, fontWeight: '900', textAlign: 'center', marginBottom: spacing.lg },
    field: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      backgroundColor: t.surface2,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      height: 52,
    },
    input: { flex: 1, color: t.text, fontSize: 15, fontWeight: '600', padding: 0 },
    confirm: { height: 54, borderRadius: radius.md, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center', marginTop: spacing.md },
    confirmTxt: { color: t.onPrimary, fontSize: 16, fontWeight: '800' },
  })
