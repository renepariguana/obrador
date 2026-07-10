import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { useTheme } from '../lib/theme'

// La API key va en .env (EXPO_PUBLIC_GOOGLE_MAPS_JS_KEY) — nunca hardcodeada.
const GOOGLE_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_JS_KEY ?? ''

// Pedidos de ejemplo (más adelante vienen de Supabase, filtrados por zona)
const PEDIDOS = [
  { lat: -26.822, lng: -65.2225, oficio: 'Plomero', desc: 'Pérdida en la cocina', sel: true },
  { lat: -26.8185, lng: -65.2255, oficio: 'Electricista', desc: 'Se cortó la luz', sel: false },
  { lat: -26.8205, lng: -65.2155, oficio: 'Albañil', desc: 'Levantar pared', sel: false },
  { lat: -26.8245, lng: -65.2135, oficio: 'Pintor', desc: 'Pintar living', sel: false },
  { lat: -26.8285, lng: -65.226, oficio: 'Gasista', desc: 'Revisar estufa', sel: false },
]

const PERSON_SVG =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'

const html = (key: string) => `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<style>
  html,body,#map{height:100%;margin:0;padding:0;background:#EEF0F3;}
  .bubble{display:flex;align-items:center;gap:7px;background:#fff;padding:7px 10px;border-radius:16px;
    box-shadow:0 3px 10px rgba(0,0,0,.20);white-space:nowrap;position:relative;transform:translateY(-9px);cursor:pointer;}
  .bubble::after{content:'';position:absolute;left:16px;bottom:-6px;border:6px solid transparent;border-top-color:#fff;border-bottom:0;}
  .bubble .ico{width:22px;height:22px;border-radius:50%;background:#F1F2F4;display:flex;align-items:center;justify-content:center;flex:0 0 auto;}
  .bubble .oficio{display:block;font:800 12px -apple-system,system-ui,sans-serif;color:#16181D;line-height:14px;}
  .bubble .desc{display:block;font:600 10px -apple-system,system-ui,sans-serif;color:#8A9099;line-height:12px;margin-top:1px;}
  .bubble.sel{background:#FFBF00;}
  .bubble.sel::after{border-top-color:#FFBF00;}
  .bubble.sel .ico{background:rgba(0,0,0,.12);}
  .bubble.sel .ico svg{stroke:#1A1A1A;}
  .bubble.sel .desc{color:rgba(26,26,26,.7);}
  .me{width:16px;height:16px;border-radius:50%;background:#2E7DF7;border:3px solid #fff;box-shadow:0 0 0 4px rgba(46,125,247,.22);}
</style>
</head>
<body>
<div id="map"></div>
<script>
  const PEDIDOS = ${JSON.stringify(PEDIDOS)};
  const CENTER = { lat: -26.8241, lng: -65.2226 };
  const ICO = '${PERSON_SVG}';
  function initMap(){
    const map = new google.maps.Map(document.getElementById('map'), {
      center: CENTER, zoom: 15, disableDefaultUI: true, mapId: 'DEMO_MAP_ID', clickableIcons: false,
    });
    const meEl = document.createElement('div'); meEl.className = 'me';
    new google.maps.marker.AdvancedMarkerElement({ map, position: CENTER, content: meEl });
    const bubbles = [];
    PEDIDOS.forEach(function(p){
      const el = document.createElement('div');
      el.className = 'bubble' + (p.sel ? ' sel' : '');
      el.innerHTML = '<span class="ico">'+ICO+'</span><span><span class="oficio">'+p.oficio+'</span><span class="desc">'+p.desc+'</span></span>';
      el.addEventListener('click', function(){
        bubbles.forEach(function(b){ b.classList.remove('sel'); });
        el.classList.add('sel');
      });
      bubbles.push(el);
      new google.maps.marker.AdvancedMarkerElement({ map, position: { lat: p.lat, lng: p.lng }, content: el });
    });
  }
</script>
<script async src="https://maps.googleapis.com/maps/api/js?key=${key}&libraries=marker&callback=initMap"></script>
</body>
</html>`

export function MapaPedidos({ height, fill }: { height?: number; fill?: boolean }) {
  const t = useTheme()
  const wrapStyle = fill ? styles.fill : [styles.wrap, { height: height ?? 300 }]
  if (!GOOGLE_KEY) {
    return (
      <View style={[wrapStyle, styles.fallback, { backgroundColor: t.surface2 }]}>
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
    <View style={wrapStyle}>
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
  fill: { flex: 1, width: '100%', backgroundColor: '#EEF0F3' },
  web: { flex: 1, backgroundColor: 'transparent' },
  fallback: { alignItems: 'center', justifyContent: 'center' },
})
