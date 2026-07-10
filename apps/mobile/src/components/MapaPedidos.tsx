import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { useTheme } from '../lib/theme'

// La API key va en .env (EXPO_PUBLIC_GOOGLE_MAPS_JS_KEY) — nunca hardcodeada.
const GOOGLE_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_JS_KEY ?? ''

// Pedidos de ejemplo (más adelante vienen de Supabase, filtrados por zona)
const PEDIDOS = [
  { lat: -26.8205, lng: -65.217, txt: 'Plomería' },
  { lat: -26.829, lng: -65.228, txt: 'Pintura' },
  { lat: -26.818, lng: -65.23, txt: 'Electricista' },
  { lat: -26.833, lng: -65.215, txt: 'Albañil' },
  { lat: -26.826, lng: -65.21, txt: 'Carpintero' },
]

const html = (key: string) => `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<style>
  html,body,#map{height:100%;margin:0;padding:0;background:#EEF0F3;}
  .bubble{background:#FFBF00;color:#1A1A1A;font:800 12px -apple-system,system-ui,sans-serif;
    padding:6px 11px;border-radius:14px;box-shadow:0 3px 8px rgba(0,0,0,.28);white-space:nowrap;position:relative;transform:translateY(-8px);}
  .bubble::after{content:'';position:absolute;left:14px;bottom:-6px;
    border:6px solid transparent;border-top-color:#FFBF00;border-bottom:0;}
  .me{width:16px;height:16px;border-radius:50%;background:#1A1A1A;border:3px solid #fff;box-shadow:0 0 0 4px rgba(26,26,26,.18);}
</style>
</head>
<body>
<div id="map"></div>
<script>
  const PEDIDOS = ${JSON.stringify(PEDIDOS)};
  const CENTER = { lat: -26.8241, lng: -65.2226 };
  function initMap(){
    const map = new google.maps.Map(document.getElementById('map'), {
      center: CENTER, zoom: 14, disableDefaultUI: true, mapId: 'DEMO_MAP_ID', clickableIcons: false,
    });
    const meEl = document.createElement('div'); meEl.className = 'me';
    new google.maps.marker.AdvancedMarkerElement({ map, position: CENTER, content: meEl });
    PEDIDOS.forEach(function(p){
      const el = document.createElement('div'); el.className = 'bubble'; el.textContent = p.txt;
      new google.maps.marker.AdvancedMarkerElement({ map, position: { lat: p.lat, lng: p.lng }, content: el });
    });
  }
</script>
<script async src="https://maps.googleapis.com/maps/api/js?key=${key}&libraries=marker&callback=initMap"></script>
</body>
</html>`

export function MapaPedidos({ height = 300 }: { height?: number }) {
  const t = useTheme()
  if (!GOOGLE_KEY) {
    return (
      <View style={[styles.wrap, styles.fallback, { height, backgroundColor: t.surface2 }]}>
        <Text style={{ color: t.text2, fontWeight: '700', textAlign: 'center' }}>
          Falta la API key de Google Maps
        </Text>
        <Text style={{ color: t.text3, fontSize: 12, marginTop: 4, textAlign: 'center', paddingHorizontal: 24 }}>
          Cargá EXPO_PUBLIC_GOOGLE_MAPS_JS_KEY en apps/mobile/.env y reiniciá el server
        </Text>
      </View>
    )
  }
  return (
    <View style={[styles.wrap, { height }]}>
      <WebView
        originWhitelist={['*']}
        source={{ html: html(GOOGLE_KEY) }}
        style={styles.web}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { width: '100%', backgroundColor: '#EEF0F3' },
  web: { flex: 1, backgroundColor: 'transparent' },
  fallback: { alignItems: 'center', justifyContent: 'center' },
})
