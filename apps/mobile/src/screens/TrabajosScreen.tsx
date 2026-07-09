import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { AppHeader } from '../components/AppHeader'
import { useTheme } from '../lib/theme'

export default function TrabajosScreen() {
  const t = useTheme()
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader title="Trabajos" />
      <ScrollView contentContainerStyle={{ padding: 18 }}>
        <Text style={{ color: t.text2 }}>Pantalla Trabajos (próxima etapa).</Text>
      </ScrollView>
    </View>
  )
}
