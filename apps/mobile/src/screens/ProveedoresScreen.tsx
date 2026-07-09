import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { AppHeader } from '../components/AppHeader'
import { useTheme } from '../lib/theme'

export default function ProveedoresScreen() {
  const t = useTheme()
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader title="Proveedores" />
      <ScrollView contentContainerStyle={{ padding: 18 }}>
        <Text style={{ color: t.text2 }}>Pantalla Proveedores (próxima etapa).</Text>
      </ScrollView>
    </View>
  )
}
