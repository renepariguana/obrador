import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

// Logo de Manos a la Obra (por el momento): "m" redondeada + punto (anillo).
export function LogoManos({ size = 120, color = '#1A1A1A' }: { size?: number; color?: string }) {
  const w = size
  const h = (size * 84) / 152
  return (
    <Svg width={w} height={h} viewBox="0 0 152 84" fill="none">
      <Path
        d="M15 70 V34 A16 16 0 0 1 47 34 A16 16 0 0 0 79 34 A16 16 0 0 1 111 34 V70"
        stroke={color}
        strokeWidth={15}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={134} cy={20} r={9} stroke={color} strokeWidth={9} fill="none" />
    </Svg>
  )
}
