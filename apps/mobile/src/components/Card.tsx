import React from 'react'
import { View, ViewStyle } from 'react-native'
import { useTheme, radius } from '../lib/theme'

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const t = useTheme()
  return (
    <View
      style={[
        {
          backgroundColor: t.surface,
          borderRadius: radius.lg,
          shadowColor: '#141828',
          shadowOpacity: 0.08,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}
