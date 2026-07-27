import React, { useState } from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'

import InicioScreen from './src/screens/InicioScreen'
import OficioScreen from './src/screens/OficioScreen'
import ProveedoresScreen from './src/screens/ProveedoresScreen'
import ProveedorCatalogoScreen from './src/screens/ProveedorCatalogoScreen'
import ProfesionalScreen from './src/screens/ProfesionalScreen'
import MaterialesScreen from './src/screens/MaterialesScreen'
import TrabajosScreen from './src/screens/TrabajosScreen'
import DetallePedidoScreen from './src/screens/DetallePedidoScreen'
import PublicarPedidoScreen from './src/screens/PublicarPedidoScreen'
import MisPedidosScreen from './src/screens/MisPedidosScreen'
import PresupuestadorScreen from './src/screens/PresupuestadorScreen'
import MiPerfilScreen from './src/screens/MiPerfilScreen'
import BloqueadosScreen from './src/screens/BloqueadosScreen'
import MisPostulacionesScreen from './src/screens/MisPostulacionesScreen'
import LoginScreen from './src/screens/LoginScreen'
import UbicacionScreen from './src/screens/UbicacionScreen'
import { Icon, IconName } from './src/components/Icon'
import { useTheme } from './src/lib/theme'
import { ZonaProvider, useZona } from './src/lib/zona'
import { AuthProvider, useAuth } from './src/lib/auth'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function InicioStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InicioHome" component={InicioScreen} />
      <Stack.Screen name="Oficio" component={OficioScreen} />
      <Stack.Screen name="Proveedores" component={ProveedoresScreen} />
      <Stack.Screen name="ProveedorCatalogo" component={ProveedorCatalogoScreen} />
      <Stack.Screen name="Profesional" component={ProfesionalScreen} />
    </Stack.Navigator>
  )
}

function MaterialesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MaterialesHome" component={MaterialesScreen} />
      <Stack.Screen name="Proveedores" component={ProveedoresScreen} />
      <Stack.Screen name="ProveedorCatalogo" component={ProveedorCatalogoScreen} />
    </Stack.Navigator>
  )
}

function TrabajosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TrabajosHome" component={TrabajosScreen} />
      <Stack.Screen name="DetallePedido" component={DetallePedidoScreen} />
      <Stack.Screen name="PublicarPedido" component={PublicarPedidoScreen} />
      <Stack.Screen name="MisPedidos" component={MisPedidosScreen} />
    </Stack.Navigator>
  )
}

function MiPerfilStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MiPerfilHome" component={MiPerfilScreen} />
      <Stack.Screen name="Bloqueados" component={BloqueadosScreen} />
      <Stack.Screen name="MisPostulaciones" component={MisPostulacionesScreen} />
      <Stack.Screen name="MisPedidos" component={MisPedidosScreen} />
      <Stack.Screen name="PublicarPedido" component={PublicarPedidoScreen} />
      <Stack.Screen name="DetallePedido" component={DetallePedidoScreen} />
    </Stack.Navigator>
  )
}

const TABS: { name: string; comp: React.ComponentType; icon: IconName; iconOn?: IconName }[] = [
  { name: 'Inicio', comp: InicioStack, icon: 'home', iconOn: 'homeFill' },
  { name: 'Materiales', comp: MaterialesStack, icon: 'container', iconOn: 'containerFill' },
  { name: 'Trabajos', comp: TrabajosStack, icon: 'obrador', iconOn: 'obrador' },
  { name: 'Presupuestador', comp: PresupuestadorScreen, icon: 'chat', iconOn: 'chatFill' },
  { name: 'Mi perfil', comp: MiPerfilStack, icon: 'user', iconOn: 'userFill' },
]

function RootTabs() {
  const t = useTheme()
  const scheme = useColorScheme()
  const insets = useSafeAreaInsets()
  const bottom = Math.max(insets.bottom, 10)
  // Tab activa: gris oscuro (no negro puro) en modo claro; color claro en modo oscuro.
  const activeTint = scheme === 'dark' ? t.text : '#3A3F47'
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeTint,
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
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name={focused && tab.iconOn ? tab.iconOn : tab.icon}
                size={tab.name === 'Inicio' ? 26 : tab.name === 'Obrador' ? 25 : 22}
                color={color}
                filled={focused}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

function Root() {
  const scheme = useColorScheme()
  const { paso } = useAuth()

  if (paso === 'ubicacion') {
    return (
      <>
        <StatusBar style="dark" />
        <UbicacionScreen />
      </>
    )
  }
  if (paso === 'login') {
    return (
      <>
        <StatusBar style="dark" />
        <LoginScreen />
      </>
    )
  }

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="dark" />
      <RootTabs />
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ZonaProvider>
          <Root />
        </ZonaProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
