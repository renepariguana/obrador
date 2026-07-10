import React, { useState } from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'

import InicioScreen from './src/screens/InicioScreen'
import MaterialesScreen from './src/screens/MaterialesScreen'
import TrabajosScreen from './src/screens/TrabajosScreen'
import ProveedoresScreen from './src/screens/ProveedoresScreen'
import MiPerfilScreen from './src/screens/MiPerfilScreen'
import { ConfirmarUbicacion } from './src/components/ConfirmarUbicacion'
import { Icon, IconName } from './src/components/Icon'
import { useTheme } from './src/lib/theme'

const Tab = createBottomTabNavigator()

const TABS: { name: string; comp: React.ComponentType; icon: IconName }[] = [
  { name: 'Inicio', comp: InicioScreen, icon: 'home' },
  { name: 'Materiales', comp: MaterialesScreen, icon: 'box' },
  { name: 'Trabajos', comp: TrabajosScreen, icon: 'briefcase' },
  { name: 'Proveedores', comp: ProveedoresScreen, icon: 'store' },
  { name: 'Mi perfil', comp: MiPerfilScreen, icon: 'user' },
]

function RootTabs() {
  const t = useTheme()
  const insets = useSafeAreaInsets()
  const bottom = Math.max(insets.bottom, 10)
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: t.text,
        tabBarInactiveTintColor: t.text2,
        tabBarStyle: {
          backgroundColor: t.surface,
          borderTopColor: t.border,
          height: 54 + bottom,
          paddingTop: 8,
          paddingBottom: bottom,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700', marginTop: 2 },
        tabBarIconStyle: { marginTop: 0 },
      }}
    >
      {TABS.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.comp}
          options={{
            tabBarIcon: ({ color }) => <Icon name={tab.icon} size={22} color={color} />,
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

export default function App() {
  const scheme = useColorScheme()
  const [zonaConfirmada, setZonaConfirmada] = useState(false)
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style="dark" />
        <RootTabs />
      </NavigationContainer>
      <ConfirmarUbicacion visible={!zonaConfirmada} onConfirm={() => setZonaConfirmada(true)} />
    </SafeAreaProvider>
  )
}
