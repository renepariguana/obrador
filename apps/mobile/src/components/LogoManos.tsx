import React from 'react'
import Svg, { Path } from 'react-native-svg'

// Logo oficial de Manos a la Obra.
// Vectorizado con potrace desde el PNG oficial (tipografía Cabin Sketch, export de Canva).
// El primer subpath es el cuerpo de la "m"; el segundo es el HUECO,
// que se recorta con fillRule="evenodd". Coordenadas en espacio 0–1920 (recortado por viewBox).
const D =
  'M 802.5 587.0 c -89.0 5.6 -166.4 79.5 -177.0 169.0 -0.9 6.9 -2.0 15.5 -2.5 19.2 -1.4 9.2 -1.3 382.0 0.0 390.8 1.5 9.8 8.0 22.2 15.5 29.6 24.5 24.7 68.3 18.7 84.4 -11.6 7.2 -13.6 6.5 7.7 7.2 -214.0 0.5 -179.2 0.7 -200.2 2.1 -206.7 11.7 -51.4 62.8 -81.4 111.2 -65.2 22.0 7.4 40.1 23.3 50.2 44.4 8.1 16.9 7.4 0.6 8.9 196.0 2.0 245.4 1.6 225.6 4.6 234.1 8.2 22.7 27.5 36.4 51.4 36.4 23.1 -0.0 41.7 -12.9 50.2 -34.7 3.7 -9.5 3.7 -11.6 2.4 -176.7 -1.7 -214.2 -1.7 -224.4 0.9 -234.1 7.6 -29.4 31.6 -53.5 62.0 -62.1 10.0 -2.9 32.8 -2.7 43.3 0.4 30.1 8.7 53.6 32.8 60.7 62.5 1.8 7.6 1.8 13.6 0.8 201.7 -0.9 146.7 -0.9 195.5 0.0 200.2 5.2 28.4 35.0 48.4 63.0 42.4 23.9 -5.0 41.0 -24.1 43.2 -48.2 1.8 -18.9 3.1 -386.4 1.4 -398.4 -19.2 -140.2 -172.9 -214.7 -291.5 -141.4 -9.4 5.8 -24.9 17.5 -28.8 21.8 -4.4 4.7 -10.0 3.8 -17.4 -3.0 -40.9 -37.9 -91.0 -55.8 -146.2 -52.4 z M 1085.5 713.6 c -26.3 4.2 -48.1 22.9 -57.2 48.9 -4.0 11.6 -4.0 32.0 0.0 44.0 16.0 48.2 75.0 65.3 113.8 33.0 43.5 -36.0 28.7 -108.1 -25.4 -123.6 -7.1 -2.0 -24.7 -3.3 -31.2 -2.3 z'

export function LogoManos({ size = 120, color = '#1A1A1A' }: { size?: number; color?: string }) {
  const h = (size * 648) / 690
  return (
    <Svg width={size} height={h} viewBox="608 575 690 648" fill="none">
      <Path d={D} fill={color} fillRule="evenodd" />
    </Svg>
  )
}
