import React, { useRef, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { useTheme } from '../lib/theme'
// El mapa solo necesita estos campos de cada pedido.
export type MarcadorMapa = { lat: number; lng: number; oficio: string; desc: string; min: number }

// La API key va en .env (EXPO_PUBLIC_GOOGLE_MAPS_JS_KEY) — nunca hardcodeada.
const GOOGLE_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_JS_KEY ?? ''

const PERSON_SVG =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'

const html = (
  key: string,
  markers: { lat: number; lng: number; oficio: string; desc: string; min: number }[],
  me: { lat: number; lng: number } | null,
) => `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<style>
  html,body,#map{height:100%;margin:0;padding:0;background:#EEF0F3;}
  .bubble{display:flex;align-items:center;gap:7px;background:#fff;padding:8px 11px;border-radius:16px;
    box-shadow:0 3px 10px rgba(0,0,0,.20);position:relative;transform:translateY(-9px);cursor:pointer;
    width:196px;box-sizing:border-box;}
  .bubble::after{content:'';position:absolute;left:16px;bottom:-6px;border:6px solid transparent;border-top-color:#fff;border-bottom:0;}
  .bubble .ico{width:22px;height:22px;border-radius:50%;background:#F1F2F4;display:flex;align-items:center;justify-content:center;flex:0 0 auto;}
  .bubble .txt{flex:1;min-width:0;}
  .bubble .oficio{display:block;font:800 12px -apple-system,system-ui,sans-serif;color:#16181D;line-height:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .bubble .desc{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font:600 10px -apple-system,system-ui,sans-serif;color:#8A9099;line-height:12px;margin-top:2px;}
  .bubble.sel{background:#1A1A1A;z-index:9999;}
  .bubble.sel::after{border-top-color:#1A1A1A;}
  .bubble.sel .ico{background:rgba(255,255,255,.15);}
  .bubble.sel .ico svg{stroke:#fff;}
  .bubble.sel .oficio{color:#fff;}
  .bubble.sel .desc{color:rgba(255,255,255,.75);}
  .me{width:16px;height:16px;border-radius:50%;background:#2E7DF7;border:3px solid #fff;box-shadow:0 0 0 4px rgba(46,125,247,.22);}
</style>
</head>
<body>
<div id="map"></div>
<script>
  const PEDIDOS = ${JSON.stringify(markers)};
  const ME = ${me ? JSON.stringify(me) : 'null'};
  const CENTER = ME || { lat: -26.8241, lng: -65.2226 };
  const ICO = '${PERSON_SVG}';
  var markers = [], sel = 0, map;
  function post(i){ if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(String(i)); }
  function refresh(){
    if (!map) return;
    var z = map.getZoom();
    markers.forEach(function(mm, idx){ mm.marker.map = (z >= mm.min || idx === sel) ? map : null; });
  }
  window.selectPedido = function(i, pan){
    sel = i;
    markers.forEach(function(mm, idx){ mm.el.classList.toggle('sel', idx === i); });
    refresh();
    if (pan !== false && map && PEDIDOS[i]) map.panTo({ lat: PEDIDOS[i].lat, lng: PEDIDOS[i].lng });
  };
  function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
      center: CENTER, zoom: 15, disableDefaultUI: true, mapId: 'DEMO_MAP_ID', clickableIcons: false,
    });
    if (ME) {
      var meEl = document.createElement('div'); meEl.className = 'me';
      new google.maps.marker.AdvancedMarkerElement({ map, position: ME, content: meEl });
    }
    markers = PEDIDOS.map(function(p, idx){
      var el = document.createElement('div');
      el.className = 'bubble';
      el.innerHTML = '<span class="ico">'+ICO+'</span><span class="txt"><span class="oficio">'+p.oficio+'</span><span class="desc">'+p.desc+'</span></span>';
      el.addEventListener('click', function(){ window.selectPedido(idx); post(idx); });
      var m = new google.maps.marker.AdvancedMarkerElement({ position: { lat: p.lat, lng: p.lng }, content: el });
      return { marker: m, el: el, min: p.min };
    });
    map.addListener('zoom_changed', refresh);
    // Si tenemos tu ubicación, el mapa queda centrado en vos (no salta al primer pedido).
    window.selectPedido(0, ME ? false : true);
  }
</script>
<script async src="https://maps.googleapis.com/maps/api/js?key=${key}&libraries=marker&callback=initMap"></script>
</body>
</html>`

export function MapaPedidos({
  height,
  fill,
  pedidos = [],
  selected,
  onSelect,
  me = null,
}: {
  height?: number
  fill?: boolean
  pedidos?: MarcadorMapa[]
  selected?: number
  onSelect?: (i: number) => void
  me?: { lat: number; lng: number } | null
}) {
  const t = useTheme()
  const ref = useRef<WebView>(null)
  const wrapStyle = fill ? styles.fill : [styles.wrap, { height: height ?? 300 }]
  const markers = pedidos.map((p) => ({ lat: p.lat, lng: p.lng, oficio: p.oficio, desc: p.desc, min: p.min }))

  useEffect(() => {
    if (selected != null && ref.current) {
      ref.current.injectJavaScript(`window.selectPedido && window.selectPedido(${selected}); true;`)
    }
  }, [selected])

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
        ref={ref}
        originWhitelist={['*']}
        source={{ html: html(GOOGLE_KEY, markers, me) }}
        style={styles.web}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        onMessage={(e) => {
          const i = parseInt(e.nativeEvent.data, 10)
          if (!isNaN(i)) onSelect?.(i)
        }}
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
