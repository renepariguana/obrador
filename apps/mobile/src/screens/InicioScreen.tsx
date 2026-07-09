import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { useTheme } from '../lib/theme'

export default function InicioScreen() {
  const t = useTheme()
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader title="Inicio" right={<Icon name="bell" size={22} color={t.onPrimary} />} />
      <ScrollView contentContainerStyle={{ padding: 18 }}>
        <Text style={{ color: t.text2 }}>Pantalla Inicio (Etapa 2: buscador, categorías, cerca tuyo).</Text>
      </ScrollView>
    </View>
  )
}
