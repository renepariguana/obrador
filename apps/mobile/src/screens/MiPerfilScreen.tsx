import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { AppHeader } from '../components/AppHeader'
import { useTheme } from '../lib/theme'

export default function MiPerfilScreen() {
  const t = useTheme()
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader title="Mi perfil" />
      <ScrollView contentContainerStyle={{ padding: 18 }}>
        <Text style={{ color: t.text2 }}>
          Pantalla Mi perfil (Etapa posterior: verificado, estrellas, reseñas, borrar cuenta).
        </Text>
      </ScrollView>
    </View>
  )
}
