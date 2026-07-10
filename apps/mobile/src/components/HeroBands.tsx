import React from 'react'
import { View, StyleSheet } from 'react-native'
import { gradienteEnergia } from '../lib/theme'

// Degradé suave (escala energética verde→naranja) SIN librerías nativas:
// interpolamos entre los 5 stops y pintamos muchas franjas finas.
function hexToRgb(h: string): [number, number, number] {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t)
}
function buildGradient(stops: readonly string[], steps: number): string[] {
  const out: string[] = []
  const segs = stops.length - 1
  const per = Math.max(1, Math.floor(steps / segs))
  for (let s = 0; s < segs; s++) {
    const [r1, g1, b1] = hexToRgb(stops[s])
    const [r2, g2, b2] = hexToRgb(stops[s + 1])
    for (let i = 0; i < per; i++) {
      const t = i / per
      out.push(`rgb(${lerp(r1, r2, t)},${lerp(g1, g2, t)},${lerp(b1, b2, t)})`)
    }
  }
  out.push(stops[stops.length - 1])
  return out
}

const COLORS = buildGradient(gradienteEnergia, 64)

// Se usa como primer hijo absoluto dentro de un hero con overflow: 'hidden'.
export function HeroBands({ radius = 28 }: { radius?: number }) {
  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        {
          flexDirection: 'row',
          borderBottomLeftRadius: radius,
          borderBottomRightRadius: radius,
          overflow: 'hidden',
        },
      ]}
      pointerEvents="none"
    >
      {COLORS.map((c, i) => (
        <View key={i} style={{ flex: 1, backgroundColor: c }} />
      ))}
    </View>
  )
}
