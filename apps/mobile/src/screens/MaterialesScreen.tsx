import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { AppHeader } from '../components/AppHeader'
import { useTheme } from '../lib/theme'

export default function MaterialesScreen() {
  const t = useTheme()
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader title="Materiales" />
      <ScrollView contentContainerStyle={{ padding: 18 }}>
        <Text style={{ color: t.text2 }}>Pantalla Materiales (próxima etapa).</Text>
      </ScrollView>
    </View>
  )
}
