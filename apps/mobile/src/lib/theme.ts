import { useColorScheme } from 'react-native'

export type Theme = {
  primary: string
  onPrimary: string
  bg: string
  surface: string
  surface2: string
  text: string
  text2: string
  text3: string
  sel: string // gris oscuro de acento (chips/botones/badges "en negro"); tono del tab activo, no negro puro
  border: string
  danger: string
  rating: string
}

const light: Theme = {
  primary: '#FFBF00',
  onPrimary: '#1A1A1A',
  bg: '#EEF0F3',
  surface: '#FFFFFF',
  surface2: '#F1F2F4',
  text: '#16181D',
  text2: '#6B7280',
  text3: '#9AA1AD',
  sel: '#3A3F47',
  border: '#E6E8EC',
  danger: '#C7362B',
  rating: '#16181D',
}

const dark: Theme = {
  primary: '#FFBF00',
  onPrimary: '#1A1A1A',
  bg: '#0C0D10',
  surface: '#191B21',
  surface2: '#23262F',
  text: '#ECEEF2',
  text2: '#9AA1AD',
  text3: '#6B7280',
  sel: '#ECEEF2',
  border: '#2A2D37',
  danger: '#F0655A',
  rating: '#ECEEF2',
}

export function useTheme(): Theme {
  return useColorScheme() === 'dark' ? dark : light
}

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 }
export const radius = { sm: 8, md: 12, lg: 16, pill: 999 }

// Escala energética (verde → naranja) para los sectores hero.
// Degradé de marca: solo amarillos/ámbar (paleta Obrador, sin verdes/naranjas).
export const gradienteEnergia = ['#FFE08A', '#FFCE3A', '#FFBF00', '#F0A500', '#D98E00'] as const
