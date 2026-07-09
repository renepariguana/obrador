import React from 'react'
import { Pressable, Text } from 'react-native'
import { useTheme, radius } from '../lib/theme'

export function Button({
  title,
  onPress,
  variant = 'primary',
}: {
  title: string
  onPress?: () => void
  variant?: 'primary' | 'ghost'
}) {
  const t = useTheme()
  const bg = variant === 'primary' ? t.primary : t.surface2
  const fg = variant === 'primary' ? t.onPrimary : t.text
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        height: 52,
        borderRadius: radius.md,
        backgroundColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? 0.9 : 1,
      })}
    >
      <Text style={{ color: fg, fontSize: 16, fontWeight: '800' }}>{title}</Text>
    </Pressable>
  )
}
