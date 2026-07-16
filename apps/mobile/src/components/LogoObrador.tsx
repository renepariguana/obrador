import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

// Logo de Obrador: la "O" como pin de ubicación (marca del mapa) con hueco central.
// El hueco se cala (fillRule evenodd) para que se vea el fondo detrás.
export function LogoObrador({ size = 120, color = '#1A1A1A' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <G rotation={35} originX={50} originY={50}>
        <Path
          fill={color}
          fillRule="evenodd"
          d="M50 6 C28 6 12 23 12 44 C12 68 40 84 50 94 C60 84 88 68 88 44 C88 23 72 6 50 6 Z
             M66 42 A16 16 0 1 1 34 42 A16 16 0 1 1 66 42 Z"
        />
      </G>
    </Svg>
  )
}
