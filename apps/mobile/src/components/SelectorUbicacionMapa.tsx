import React, { useRef, useState } from 'react'
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import { WebView } from 'react-native-webview'
import { useTheme, spacing, radius, Theme } from '../lib/theme'

const GOOGLE_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_JS_KEY ?? ''

export type Coord = { lat: number; lng: number }

// Mapa con un pin fijo en el centro: movés el mapa debajo del pin y confirmás.
// Emite el centro (lat,lng) cada vez que el mapa queda quieto ('idle').
const html = (key: string, c: Coord) => `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<style>
  html,body,#map{height:100%;margin:0;padding:0;background:#EEF0F3;}
  /* Pin fijo, anclado al centro exacto del contenedor */
  #pin{position:absolute;left:50%;top:50%;transform:translate(-50%,-100%);z-index:5;pointer-events:none;}
  #pin svg{filter:drop-shadow(0 3px 4px rgba(0,0,0,.3));}
  /* Sombrita en el punto exacto donde cae el pin */
  #dot{position:absolute;left:50%;top:50%;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;
    background:rgba(0,0,0,.25);z-index:4;pointer-events:none;}
  /* Punto azul: dónde estás vos (fijo, anclado a tu GPS) */
  .me{width:16px;height:16px;border-radius:50%;background:#2E7DF7;border:3px solid #fff;box-shadow:0 0 0 4px rgba(46,125,247,.22);}
</style>
</head>
<body>
<div id="map"></div>
<div id="dot"></div>
<div id="pin">
  <svg width="34" height="46" viewBox="0 0 34 46" fill="none">
    <path d="M17 0C7.6 0 0 7.6 0 17c0 12 17 29 17 29s17-17 17-29C34 7.6 26.4 0 17 0z" fill="#FFBF00"/>
    <circle cx="17" cy="17" r="6.5" fill="#1A1A1A"/>
  </svg>
</div>
<script>
  var map, t;
  function post(){
    if (!map || !window.ReactNativeWebView) return;
    var ctr = map.getCenter();
    window.ReactNativeWebView.postMessage(JSON.stringify({ lat: ctr.lat(), lng: ctr.lng() }));
  }
  function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: ${c.lat}, lng: ${c.lng} }, zoom: 16,
      disableDefaultUI: true, clickableIcons: false, gestureHandling: 'greedy', mapId: 'DEMO_MAP_ID',
    });
    var meEl = document.createElement('div'); meEl.className = 'me';
    new google.maps.marker.AdvancedMarkerElement({ map, position: { lat: ${c.lat}, lng: ${c.lng} }, content: meEl });
    map.addListener('idle', function(){ clearTimeout(t); t = setTimeout(post, 120); });
  }
</script>
<script async src="https://maps.googleapis.com/maps/api/js?key=${key}&libraries=marker&callback=initMap"></script>
</body>
</html>`

export function SelectorUbicacionMapa({
  initial,
  onConfirm,
  onCancel,
}: {
  initial: Coord
  onConfirm: (c: Coord) => void
  onCancel: () => void
}) {
  const t = useTheme()
  const s = styles(t)
  const ref = useRef<WebView>(null)
  const [centro, setCentro] = useState<Coord>(initial)

  if (!GOOGLE_KEY) {
    return (
      <View style={[s.fill, s.center]}>
        <Text style={{ color: t.text2, fontWeight: '700' }}>Falta la API key de Google Maps</Text>
        <Pressable style={s.cancel} onPress={onCancel} hitSlop={8}>
          <Text style={s.cancelTxt}>Cerrar</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={s.fill}>
      <WebView
        ref={ref}
        originWhitelist={['*']}
        source={{ html: html(GOOGLE_KEY, initial) }}
        style={{ flex: 1, backgroundColor: 'transparent' }}
        scrollEnabled={false}
        onMessage={(e) => {
          try {
            const c = JSON.parse(e.nativeEvent.data)
            if (typeof c.lat === 'number' && typeof c.lng === 'number') setCentro(c)
          } catch {}
        }}
        renderLoading={() => (
          <View style={[s.fill, s.center]}>
            <ActivityIndicator color={t.primary} />
          </View>
        )}
        startInLoadingState
      />

      <View style={s.hintBox} pointerEvents="none">
        <Text style={s.hintTxt}>Movés el mapa para poner el pin donde es el trabajo</Text>
      </View>

      <View style={s.footer}>
        <Pressable style={s.confirm} onPress={() => onConfirm(centro)}>
          <Text style={s.confirmTxt}>Confirmar ubicación</Text>
        </Pressable>
        <Pressable onPress={onCancel} hitSlop={8}>
          <Text style={s.cancelTxt}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    fill: { flex: 1, backgroundColor: t.bg },
    center: { alignItems: 'center', justifyContent: 'center', gap: spacing.md },
    hintBox: {
      position: 'absolute',
      top: spacing.md,
      left: spacing.md,
      right: spacing.md,
      backgroundColor: t.surface,
      borderRadius: radius.pill,
      paddingHorizontal: spacing.md,
      paddingVertical: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },
    hintTxt: { color: t.text, fontSize: 13, fontWeight: '700' },
    footer: {
      padding: spacing.lg,
      gap: spacing.sm,
      backgroundColor: t.bg,
      borderTopWidth: 1,
      borderTopColor: t.border,
    },
    confirm: { height: 52, borderRadius: radius.md, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center' },
    confirmTxt: { color: t.onPrimary, fontSize: 16, fontWeight: '800' },
    cancel: { marginTop: spacing.sm },
    cancelTxt: { color: t.text2, fontSize: 15, fontWeight: '700', textAlign: 'center', marginTop: spacing.sm },
  })
