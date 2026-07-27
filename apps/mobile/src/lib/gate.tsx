import { Alert } from 'react-native'
import { useAuth } from './auth'

// Gate de acciones que requieren cuenta. Si el usuario está logueado, ejecuta la acción;
// si es invitado, le ofrece iniciar sesión.
// Uso: const gate = useGate(); ... onPress={() => gate('contactar al profesional', () => abrirWhatsApp())}
export function useGate() {
  const { logueado, irLogin } = useAuth()
  return (accion: string, fn: () => void) => {
    if (logueado) return fn()
    Alert.alert('Necesitás una cuenta', `Iniciá sesión para ${accion}.`, [
      { text: 'Ahora no', style: 'cancel' },
      { text: 'Iniciar sesión', onPress: irLogin },
    ])
  }
}
