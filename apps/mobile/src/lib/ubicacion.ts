import { useEffect, useState } from 'react'
import * as Location from 'expo-location'

export type Coord = { lat: number; lng: number }

// Ubicación GPS real del dispositivo (una vez, al montar). Devuelve null hasta tenerla
// o si el usuario no da permiso. Precisión "balanced" (rápida y suficiente para el mapa).
export function useMiUbicacion(): Coord | null {
  const [coord, setCoord] = useState<Coord | null>(null)
  useEffect(() => {
    let cancel = false
    ;(async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') return
        const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })
        if (!cancel) setCoord({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      } catch {}
    })()
    return () => {
      cancel = true
    }
  }, [])
  return coord
}
