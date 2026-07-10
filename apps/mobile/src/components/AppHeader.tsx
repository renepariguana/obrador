import React from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../lib/theme'

export function AppHeader({
  title,
  left,
  right,
}: {
  title?: string
  left?: React.ReactNode
  right?: React.ReactNode
}) {
  const t = useTheme()
  const insets = useSafeAreaInsets()
  return (
    <View
      style={{
        backgroundColor: t.primary,
        paddingTop: insets.top + 10,
        paddingBottom: 16,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {left ?? (
        <Text style={{ color: t.onPrimary, fontSize: 20, fontWeight: '900', letterSpacing: -0.4 }}>{title}</Text>
      )}
      {right}
    </View>
  )
}
