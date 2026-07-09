import React from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'

import InicioScreen from './src/screens/InicioScreen'
import ProveedoresScreen from './src/screens/ProveedoresScreen'
import MaterialesScreen from './src/screens/MaterialesScreen'
import TrabajosScreen from './src/screens/TrabajosScreen'
import MiPerfilScreen from './src/screens/MiPerfilScreen'
import { Icon, IconName } from './src/components/Icon'
import { useTheme } from './src/lib/theme'

const Tab = createBottomTabNavigator()

const TABS: { name: string; comp: React.ComponentType; icon: IconName }[] = [
  { name: 'Inicio', comp: InicioScreen, icon: 'home' },
  { name: 'Proveedores', comp: ProveedoresScreen, icon: 'store' },
  { name: 'Materiales', comp: MaterialesScreen, icon: 'box' },
  { name: 'Trabajos', comp: TrabajosScreen, icon: 'briefcase' },
  { name: 'Mi perfil', comp: MiPerfilScreen, icon: 'user' },
]

export default function App() {
  const t = useTheme()
  const scheme = useColorScheme()
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: t.text,
            tabBarInactiveTintColor: t.text2,
            tabBarStyle: {
              backgroundColor: t.surface,
              borderTopColor: t.border,
              height: 62,
              paddingTop: 6,
              paddingBottom: 10,
            },
            tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
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
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
