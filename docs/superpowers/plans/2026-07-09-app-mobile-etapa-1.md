# App mobile — Etapa 1 (base + diseño + navegación) — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) o superpowers:executing-plans para ejecutar tarea por tarea. Steps usan checkbox (`- [ ]`).

**Goal:** Dejar la app Expo (`apps/mobile`) con el sistema de diseño PedidosYa/ámbar, íconos de línea propios, navegación de 5 tabs y componentes base — corriendo en iOS/Android, con las bases de seguridad y App Store puestas desde el arranque.

**Architecture:** Expo + React Native + React Navigation v7 (bottom-tabs, ya instalado). Tokens de diseño en `theme.ts` con `useTheme()` (claro/oscuro por `useColorScheme`). Íconos como componente `<Icon>` sobre `react-native-svg` reusando los paths Lucide de los mockups. Componentes base (Button, Card, AppHeader). Supabase con **anon key** vía config (RLS asegura del lado del servidor).

**Tech Stack:** Expo ~57.0.1, React Native 0.86, React 19, TypeScript ~6, @react-navigation v7, react-native-svg, @supabase/supabase-js.

## Global Constraints

- ⚠️ **Expo cambió (v57):** antes de codear APIs nuevas, leer `https://docs.expo.dev/versions/v57.0.0/` (ver `apps/mobile/AGENTS.md`). Instalar libs siempre con `npx expo install <pkg>` (elige versión compatible), no `npm install`.
- **Un solo amarillo:** `#FFBF00` (ámbar) para lo importante/seleccionado; texto sobre ámbar = `#1A1A1A` (oscuro). Resto neutro (grises/negro/blanco). Sin variaciones de amarillo.
- **Íconos de línea** (stroke, Lucide), sin emojis.
- **Navegación:** 5 tabs — `Inicio · Proveedores · Materiales · Trabajos · Mi perfil`. Tab activo estilo PedidosYa (relleno + label negrita, gris oscuro; no coloreado).
- **Seguridad:** el cliente sólo usa la **Supabase anon key** (nunca service_role). Sin secretos hardcodeados. La seguridad real vive en RLS (backend).
- **App Store:** `app.json` con bundle id, `userInterfaceStyle: "automatic"`, y strings de permiso (ubicación) listos. Sign in with Apple, borrar cuenta y pago externo se implementan en etapas siguientes (esta etapa deja los lugares).
- **Verificación (sin test runner en mobile):** cada tarea se valida con `npx tsc --noEmit` (typecheck) + corriendo la app (`npx expo start`, abrir en Expo Go o simulador iOS) y observando la pantalla. No inventar resultados: pegar el error real si algo falla.

---

### Task 1: Entorno al día + react-native-svg

**Files:**
- Modify: `apps/mobile/package.json` (vía comando)

- [ ] **Step 1: Verificar entorno Expo**

Run:
```bash
cd "apps/mobile" && npx expo-doctor
```
Expected: sin errores críticos (warnings ok). Si `expo-doctor` no está, `npx expo install expo` primero.

- [ ] **Step 2: Instalar react-native-svg (versión compatible con Expo 57)**

Run:
```bash
cd "apps/mobile" && npx expo install react-native-svg
```
Expected: se agrega `react-native-svg` a `dependencies` con la versión que Expo 57 soporta.

- [ ] **Step 3: Typecheck base**

Run:
```bash
cd "apps/mobile" && npx tsc --noEmit
```
Expected: PASS (o sólo errores preexistentes de las screens viejas, que reemplazamos en Task 6).

- [ ] **Step 4: Commit**

```bash
git add apps/mobile/package.json apps/mobile/package-lock.json
git commit -m "chore(mobile): add react-native-svg for line icons"
```

---

### Task 2: Design tokens (tema claro/oscuro, un solo amarillo)

**Files:**
- Modify: `apps/mobile/src/lib/theme.ts`

**Interfaces:**
- Produce: `useTheme(): Theme` con `{ primary, onPrimary, bg, surface, surface2, text, text2, text3, border, danger, rating }`; `spacing`, `radius`, `font` (constantes).

- [ ] **Step 1: Reescribir `theme.ts`**

```typescript
import { useColorScheme } from 'react-native'

export type Theme = {
  primary: string; onPrimary: string;
  bg: string; surface: string; surface2: string;
  text: string; text2: string; text3: string;
  border: string; danger: string; rating: string;
}

const light: Theme = {
  primary: '#FFBF00', onPrimary: '#1A1A1A',
  bg: '#EEF0F3', surface: '#FFFFFF', surface2: '#F1F2F4',
  text: '#16181D', text2: '#6B7280', text3: '#9AA1AD',
  border: '#E6E8EC', danger: '#C7362B', rating: '#16181D',
}

const dark: Theme = {
  primary: '#FFBF00', onPrimary: '#1A1A1A',
  bg: '#0C0D10', surface: '#191B21', surface2: '#23262F',
  text: '#ECEEF2', text2: '#9AA1AD', text3: '#6B7280',
  border: '#2A2D37', danger: '#F0655A', rating: '#ECEEF2',
}

export function useTheme(): Theme {
  return useColorScheme() === 'dark' ? dark : light
}

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 }
export const radius = { sm: 8, md: 12, lg: 16, pill: 999 }
export const font = {
  h1: { fontSize: 22, fontWeight: '900' as const, letterSpacing: -0.4 },
  h2: { fontSize: 17, fontWeight: '800' as const, letterSpacing: -0.2 },
  body: { fontSize: 14, fontWeight: '500' as const },
  label: { fontSize: 12, fontWeight: '700' as const },
}
```

- [ ] **Step 2: Typecheck**

Run: `cd "apps/mobile" && npx tsc --noEmit`
Expected: `theme.ts` compila. (`App.tsx` viejo usa `colors.primary` → se corrige en Task 6; ignorar por ahora.)

- [ ] **Step 3: Commit**

```bash
git add apps/mobile/src/lib/theme.ts
git commit -m "feat(mobile): tokens de diseño ámbar con claro/oscuro"
```

---

### Task 3: Componente `Icon` + set de íconos de línea

**Files:**
- Create: `apps/mobile/src/components/Icon.tsx`

**Interfaces:**
- Produce: `<Icon name={IconName} size={number} color={string} filled={boolean} />`. `IconName` incluye: `home, store, box, briefcase, user, pin, search, bell, star, check, badge, chevron, plus, camera, wrench, zap, roller, wall, flame, hammer, leaf, dots, gear, logout, trash, mail, back, filter, locate, clock, chat, phone`.

- [ ] **Step 1: Crear `Icon.tsx` (paths Lucide de los mockups)**

```tsx
import React from 'react'
import Svg, { Path, Circle, Rect, G } from 'react-native-svg'

// Cada entrada devuelve los elementos SVG. `f` = paths que van rellenos (fill).
const P = (d: string) => <Path d={d} key={d} />
const ICONS: Record<string, () => React.ReactNode> = {
  home: () => <>{P('M3 10.7 12 3.3l9 7.4')}{P('M5.2 9.4V20.5h13.6V9.4')}{P('M9.6 20.5v-6h4.8v6')}</>,
  store: () => <>{P('M4 9.5V20h16V9.5')}{P('M3.5 4h17l1 5.5a2.6 2.6 0 0 1-5 .6 2.6 2.6 0 0 1-5 0 2.6 2.6 0 0 1-5 0 2.6 2.6 0 0 1-5-.6z')}{P('M9.5 20v-5.5h5V20')}</>,
  box: () => <>{P('m21 8-9-5-9 5v8l9 5 9-5z')}{P('m3 8 9 5 9-5')}{P('M12 13v8')}</>,
  briefcase: () => <><Rect x="3" y="7.5" width="18" height="12.5" rx="2"/>{P('M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5')}{P('M3 12.7h18')}</>,
  user: () => <><Circle cx="12" cy="8.5" r="3.7"/>{P('M5.5 20a6.5 6.5 0 0 1 13 0')}</>,
  pin: () => <>{P('M12 21c4-4.6 6-7.8 6-10.5a6 6 0 1 0-12 0C6 13.2 8 16.4 12 21z')}<Circle cx="12" cy="10.5" r="2.3"/></>,
  search: () => <><Circle cx="11" cy="11" r="7"/>{P('m20 20-3.2-3.2')}</>,
  bell: () => <>{P('M18 8.5a6 6 0 1 0-12 0c0 6-2.5 8-2.5 8h17S18 14.5 18 8.5z')}{P('M13.7 21a2 2 0 0 1-3.4 0')}</>,
  check: () => <>{P('m5 12.5 4.5 4.5L19 6.5')}</>,
  chevron: () => <>{P('m9 6 6 6-6 6')}</>,
  back: () => <>{P('M15 5l-7 7 7 7')}</>,
  plus: () => <>{P('M12 5v14M5 12h14')}</>,
  camera: () => <>{P('M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z')}<Circle cx="12" cy="13" r="3.4"/></>,
  wrench: () => <>{P('M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z')}</>,
  zap: () => <>{P('M13 2 4 14h7l-1 8 9-12h-7z')}</>,
  roller: () => <><Rect x="2" y="2" width="16" height="6" rx="2"/>{P('M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7')}<Rect x="8" y="16" width="4" height="6" rx="1"/></>,
  wall: () => <><Rect x="3.5" y="5" width="17" height="14" rx="1"/>{P('M3.5 9.7h17M3.5 14.3h17M10 5v4.7M15 9.7v4.6M9 14.3V19')}</>,
  flame: () => <>{P('M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z')}</>,
  hammer: () => <>{P('m15 12-8.4 8.4a2.1 2.1 0 0 1-3-3L12 9')}{P('M17.6 15 22 10.6')}{P('m20.9 11.7-1.2-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h.86c.85 0 1.65.33 2.25.93l1.25 1.25')}</>,
  leaf: () => <>{P('M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z')}{P('M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12')}</>,
  dots: () => <><Circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><Circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><Circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/></>,
  gear: () => <>{P('M19.4 13a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.56V21a2 2 0 0 1-4 0v-.09A1.7 1.7 0 0 0 8 19.3a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 3.7 15a1.7 1.7 0 0 0-1.56-1H2a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 3.7 8.6a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 8 4.2h.08A1.7 1.7 0 0 0 9 2.64V2a2 2 0 0 1 4 0v.09A1.7 1.7 0 0 0 14 3.7a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 20.3 8v.08c.14.63.7 1.06 1.7 1.02h.09a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.56 1z')}<Circle cx="12" cy="12" r="3"/></>,
  logout: () => <>{P('M15 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9')}{P('M18 15l3-3-3-3')}{P('M9 12h12')}</>,
  trash: () => <>{P('M4 7h16')}{P('M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2')}{P('M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13')}</>,
  mail: () => <><Rect x="3" y="5.5" width="18" height="13" rx="2.5"/>{P('m4 7 8 6 8-6')}</>,
  filter: () => <>{P('M3 5h18l-7 8.2V20l-4-2.2v-4.6z')}</>,
  locate: () => <><Circle cx="12" cy="12" r="6.5"/>{P('M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3')}<Circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/></>,
  clock: () => <><Circle cx="12" cy="12" r="8.5"/>{P('M12 7.5V12l3 2')}</>,
  chat: () => <>{P('M20 4H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h3v4l4-4h9a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z')}</>,
  phone: () => <>{P('M6.5 3.5 9 4l1 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1 .5 2.5a2 2 0 0 1-2 2.3A16 16 0 0 1 4.2 5.5a2 2 0 0 1 2.3-2z')}</>,
  star: () => <><Path d="M12 2.3l2.6 5.7 6.2.6-4.7 4.1 1.4 6.1L12 15.8l-5.5 3 1.4-6.1L3.2 8.6l6.2-.6z" fill="currentColor" stroke="none"/></>,
  badge: () => <>{P('M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z')}{P('m9 12 2 2 4-4')}</>,
}

export type IconName = keyof typeof ICONS

export function Icon({ name, size = 24, color = '#16181D' }: { name: IconName; size?: number; color?: string }) {
  const render = ICONS[name]
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <G stroke={color}>{render ? render() : null}</G>
    </Svg>
  )
}
```

> Nota: `fill="currentColor"` no aplica en react-native-svg; los shapes rellenos (dots, locate center, star) usan `fill` explícito = el `color` que se pasa. Para `star`/`dots`/`locate` el fill toma el `color` del `<Svg>` vía `stroke`; si en la práctica no rellenan, cambiar esos `fill="currentColor"` por `fill={color}` (ver Step 2).

- [ ] **Step 2: Verificar render de íconos**

Insertar temporalmente en `HomeScreen` (o una screen scratch): `<Icon name="wrench" size={32} color="#16181D" />`, `<Icon name="star" size={24} color="#FFBF00" />`, `<Icon name="badge" size={24} color="#FFBF00" />`. Correr `npx expo start`, abrir en Expo Go.
Expected: la llave, la estrella (rellena ámbar) y el badge se ven prolijos. Si `star`/`dots`/`locate` salen huecos o negros, reemplazar sus `fill="currentColor"` por `fill={color}` y pasar el color como prop.

- [ ] **Step 3: Commit**

```bash
git add apps/mobile/src/components/Icon.tsx
git commit -m "feat(mobile): componente Icon con set de íconos de línea"
```

---

### Task 4: Componentes base `Button` y `Card`

**Files:**
- Create: `apps/mobile/src/components/Button.tsx`
- Create: `apps/mobile/src/components/Card.tsx`

**Interfaces:**
- Produce: `<Button title label onPress variant="primary"|"ghost" />` (primary = ámbar + texto oscuro). `<Card>{children}</Card>` (superficie + radio + sombra).

- [ ] **Step 1: `Card.tsx`**

```tsx
import React from 'react'
import { View, ViewStyle } from 'react-native'
import { useTheme, radius } from '../lib/theme'

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const t = useTheme()
  return (
    <View style={[{ backgroundColor: t.surface, borderRadius: radius.lg,
      shadowColor: '#141828', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 }, style]}>
      {children}
    </View>
  )
}
```

- [ ] **Step 2: `Button.tsx`**

```tsx
import React from 'react'
import { Pressable, Text } from 'react-native'
import { useTheme, radius } from '../lib/theme'

export function Button({ title, onPress, variant = 'primary' }:
  { title: string; onPress?: () => void; variant?: 'primary' | 'ghost' }) {
  const t = useTheme()
  const bg = variant === 'primary' ? t.primary : t.surface2
  const fg = variant === 'primary' ? t.onPrimary : t.text
  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({
      height: 52, borderRadius: radius.md, backgroundColor: bg,
      alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.9 : 1,
    })}>
      <Text style={{ color: fg, fontSize: 16, fontWeight: '800' }}>{title}</Text>
    </Pressable>
  )
}
```

- [ ] **Step 3: Typecheck**

Run: `cd "apps/mobile" && npx tsc --noEmit`
Expected: ambos compilan.

- [ ] **Step 4: Commit**

```bash
git add apps/mobile/src/components/Button.tsx apps/mobile/src/components/Card.tsx
git commit -m "feat(mobile): componentes base Button y Card"
```

---

### Task 5: `AppHeader` (header ámbar reutilizable)

**Files:**
- Create: `apps/mobile/src/components/AppHeader.tsx`

**Interfaces:**
- Consume: `useTheme`, `Icon`. Produce: `<AppHeader title right? />` — barra ámbar con título oscuro y slot derecho opcional (ej. campana).

- [ ] **Step 1: `AppHeader.tsx`**

```tsx
import React from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../lib/theme'

export function AppHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  const t = useTheme()
  const insets = useSafeAreaInsets()
  return (
    <View style={{ backgroundColor: t.primary, paddingTop: insets.top + 10, paddingBottom: 16, paddingHorizontal: 18,
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={{ color: t.onPrimary, fontSize: 20, fontWeight: '900', letterSpacing: -0.4 }}>{title}</Text>
      {right}
    </View>
  )
}
```

- [ ] **Step 2: Verificar `SafeAreaProvider`**

Confirmar que `App.tsx` envuelve todo en `<SafeAreaProvider>` (de `react-native-safe-area-context`). Si no, se agrega en Task 6.

- [ ] **Step 3: Commit**

```bash
git add apps/mobile/src/components/AppHeader.tsx
git commit -m "feat(mobile): AppHeader ámbar con safe-area"
```

---

### Task 6: Navegación de 5 tabs + screens placeholder

**Files:**
- Modify: `apps/mobile/App.tsx`
- Create: `apps/mobile/src/screens/InicioScreen.tsx`, `ProveedoresScreen.tsx`, `MaterialesScreen.tsx`, `TrabajosScreen.tsx`, `MiPerfilScreen.tsx`
- Delete: `apps/mobile/src/screens/HomeScreen.tsx`, `SearchScreen.tsx`, `JobsScreen.tsx`, `ProfileScreen.tsx`

**Interfaces:**
- Consume: `useTheme`, `Icon`, `AppHeader`, `Card`. Produce: `App` con `Tab.Navigator` de 5 tabs y `tabBarIcon` custom (estilo PedidosYa: activo = texto/ícono oscuro + label negrita; inactivo = gris).

- [ ] **Step 1: Crear las 5 screens (mismo patrón; ejemplo Inicio, repetir para las otras)**

`apps/mobile/src/screens/InicioScreen.tsx`:
```tsx
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
```

Repetir para `ProveedoresScreen` (title "Proveedores"), `MaterialesScreen` ("Materiales"), `TrabajosScreen` ("Trabajos"), `MiPerfilScreen` ("Mi perfil", sin campana). Cada una cambia sólo el `title` y el texto placeholder.

- [ ] **Step 2: Reescribir `App.tsx` con 5 tabs + tabBar custom**

```tsx
import React from 'react'
import { View, Text } from 'react-native'
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
            tabBarStyle: { backgroundColor: t.surface, borderTopColor: t.border, height: 62, paddingTop: 6, paddingBottom: 10 },
            tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
          }}
        >
          {TABS.map(tab => (
            <Tab.Screen key={tab.name} name={tab.name} component={tab.comp}
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
```

- [ ] **Step 3: Borrar las screens viejas**

```bash
git rm apps/mobile/src/screens/HomeScreen.tsx apps/mobile/src/screens/SearchScreen.tsx apps/mobile/src/screens/JobsScreen.tsx apps/mobile/src/screens/ProfileScreen.tsx
```

- [ ] **Step 4: Typecheck + correr**

Run: `cd "apps/mobile" && npx tsc --noEmit` (Expected: PASS) y `npx expo start` → abrir en Expo Go / simulador iOS.
Expected: 5 tabs abajo (Inicio, Proveedores, Materiales, Trabajos, Mi perfil) con íconos de línea; header ámbar en cada una; tab activo en oscuro. Probar modo oscuro del teléfono → colores se adaptan.

- [ ] **Step 5: Commit**

```bash
git add -A apps/mobile
git commit -m "feat(mobile): navegación de 5 tabs con íconos de línea y screens base"
```

---

### Task 7: Config de app + bases de seguridad y App Store

**Files:**
- Modify: `apps/mobile/app.json`
- Create: `apps/mobile/.env.example`
- Create: `apps/mobile/src/lib/supabase.ts`

**Interfaces:**
- Produce: cliente Supabase de la app (`getSupabase()`) usando **anon key** desde `expo-constants` extra. Config `app.json` con bundle id + strings de permiso.

- [ ] **Step 1: `app.json` — identidad, permisos y tema**

Reemplazar el bloque `"ios"` y agregar claves (mantener el resto):
```json
"ios": {
  "supportsTablet": true,
  "bundleIdentifier": "com.manosalaobra.app",
  "infoPlist": {
    "NSLocationWhenInUseUsageDescription": "Usamos tu ubicación para mostrarte pedidos y profesionales cerca tuyo.",
    "NSCameraUsageDescription": "Usás la cámara para subir fotos de tus trabajos.",
    "NSPhotoLibraryUsageDescription": "Elegís fotos de tu galería para tus trabajos y perfil."
  }
},
"android": {
  "package": "com.manosalaobra.app",
  "permissions": ["ACCESS_FINE_LOCATION", "CAMERA"],
  "adaptiveIcon": { "backgroundColor": "#FFBF00", "foregroundImage": "./assets/android-icon-foreground.png" },
  "predictiveBackGestureEnabled": false
},
```
Y cambiar `"userInterfaceStyle": "light"` → `"userInterfaceStyle": "automatic"`, y agregar `"extra": { "supabaseUrl": "", "supabaseAnonKey": "" }`.

- [ ] **Step 2: `.env.example` (no commitear el `.env` real)**

```
# apps/mobile/.env.example — copiar a .env (git-ignored) y completar
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```
Confirmar que `.env` esté en `.gitignore` (agregar `.env` si falta).

- [ ] **Step 3: `src/lib/supabase.ts` — cliente con anon key (RLS asegura)**

```tsx
import { createSupabaseClient } from '@manos/shared'

// SÓLO anon key en el cliente. La seguridad real está en las RLS de Supabase.
// Nunca poner service_role acá.
const url = process.env.EXPO_PUBLIC_SUPABASE_URL ?? ''
const anon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const supabase = createSupabaseClient(url, anon)
```

- [ ] **Step 4: Typecheck**

Run: `cd "apps/mobile" && npx tsc --noEmit`
Expected: PASS. (Si `@manos/shared` no resuelve, verificar el path del workspace en `tsconfig`/`package.json`.)

- [ ] **Step 5: Commit**

```bash
git add apps/mobile/app.json apps/mobile/.env.example apps/mobile/src/lib/supabase.ts apps/mobile/.gitignore
git commit -m "chore(mobile): config app (bundle id, permisos), Supabase anon key y bases App Store"
```

---

## Checklist de cierre de la Etapa 1

- [ ] La app corre en Expo Go / simulador iOS y Android.
- [ ] 5 tabs con íconos de línea; header ámbar; claro/oscuro funcionando.
- [ ] Un solo amarillo `#FFBF00`; texto oscuro sobre ámbar.
- [ ] `tsc --noEmit` sin errores.
- [ ] Sin secretos en el cliente (sólo anon key vía env). `.env` git-ignored.
- [ ] `app.json` con bundle id + strings de permiso (ubicación/cámara) + `userInterfaceStyle: automatic`.

## Notas de seguridad / App Store (transversales, para etapas siguientes)

- **Auth (Etapa 2):** login con Google **+ Apple** (obligatorio por Apple) + email; sobre Supabase Auth. Reservar **"Borrar cuenta"** en Mi perfil (Guideline 5.1.1).
- **Pagos:** MercadoPago (servicio del mundo real, pago externo, sin IAP).
- **RLS:** toda lectura/escritura sensible protegida por Row Level Security en Supabase; el cliente nunca confía en datos del propio dispositivo para autorizar.
- **Permisos:** la app debe funcionar si el usuario **niega** ubicación (fallback a zona manual).
- **Datos:** privacy policy publicada + privacy labels antes de enviar; cuenta demo para el revisor.
