import React, { useRef, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { useTheme } from '../lib/theme'
import { GuiaProveedor } from '../data/guiaProveedores'

// La API key va en .env (EXPO_PUBLIC_GOOGLE_MAPS_JS_KEY) — nunca hardcodeada.
const GOOGLE_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_JS_KEY ?? ''

// Centro Tucumán (mismo que el mapa de pedidos)
const CENTER = { lat: -26.8241, lng: -65.2226 }

type Marker = { lat: number; lng: number; nombre: string; rubro: string }

const html = (key: string, markers: Marker[], me: { lat: number; lng: number } | null) => `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<style>
  html,body,#map{height:100%;margin:0;padding:0;background:#EEF0F3;}
  /* punto chico por defecto */
  .dot{width:14px;height:14px;border-radius:50%;background:#3A3F47;border:2px solid #fff;
    box-shadow:0 1px 4px rgba(0,0,0,.35);cursor:pointer;transform:translateY(-1px);}
  /* tu ubicación */
  .me{width:16px;height:16px;border-radius:50%;background:#2E7DF7;border:3px solid #fff;box-shadow:0 0 0 4px rgba(46,125,247,.22);}
  /* burbuja al seleccionar */
  .bubble{display:flex;align-items:center;gap:7px;background:#FFBF00;padding:7px 11px;border-radius:16px;
    box-shadow:0 4px 12px rgba(0,0,0,.28);white-space:nowrap;position:relative;transform:translateY(-10px);cursor:pointer;z-index:9999;}
  .bubble::after{content:'';position:absolute;left:16px;bottom:-6px;border:6px solid transparent;border-top-color:#FFBF00;border-bottom:0;}
  .bubble .nombre{display:block;font:800 12px -apple-system,system-ui,sans-serif;color:#1A1A1A;line-height:14px;}
  .bubble .rubro{display:block;font:600 10px -apple-system,system-ui,sans-serif;color:rgba(26,26,26,.72);line-height:12px;margin-top:1px;}
</style>
</head>
<body>
<div id="map"></div>
<script>
  const PROV = ${JSON.stringify(markers)};
  const CENTER = ${JSON.stringify(CENTER)};
  const ME = ${me ? JSON.stringify(me) : 'null'};
  var markers = [], sel = -1, map;
  function post(msg){ if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify(msg)); }

  // Zoom mínimo para que cada punto aparezca (nivel de detalle).
  // Repartido 6..14 de forma determinística → lejos se ven pocos, al acercar salen más.
  function minZoom(idx){
    var h = (idx * 2654435761) % 2147483647;
    return 6 + (h % 9);
  }
  function refresh(){
    if (!map) return;
    var z = map.getZoom();
    markers.forEach(function(mm, idx){ mm.marker.map = (z >= mm.min || idx === sel) ? map : null; });
  }
  function render(i){
    var mm = markers[i], p = PROV[i];
    if (i === sel) {
      mm.el.className = 'bubble';
      mm.el.innerHTML = '<span><span class="nombre">'+p.nombre+'</span><span class="rubro">'+p.rubro+'</span></span>';
    } else {
      mm.el.className = 'dot';
      mm.el.innerHTML = '';
    }
  }
  window.selectProv = function(i){
    var prev = sel; sel = i;
    if (prev >= 0 && markers[prev]) render(prev);
    if (markers[i]) {
      render(i);
      if (map) { map.panTo({ lat: PROV[i].lat, lng: PROV[i].lng }); if (map.getZoom() < 15) map.setZoom(15); }
    }
    refresh();
  };
  function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
      center: CENTER, zoom: 12, disableDefaultUI: true, mapId: 'DEMO_MAP_ID', clickableIcons: false,
    });
    markers = PROV.map(function(p, idx){
      var el = document.createElement('div');
      el.className = 'dot';
      el.addEventListener('click', function(){ window.selectProv(idx); post({ type: 'select', index: idx }); });
      var m = new google.maps.marker.AdvancedMarkerElement({ position: { lat: p.lat, lng: p.lng }, content: el });
      return { marker: m, el: el, min: minZoom(idx) };
    });
    if (ME) {
      var meEl = document.createElement('div'); meEl.className = 'me';
      new google.maps.marker.AdvancedMarkerElement({ map: map, position: ME, content: meEl });
    }
    if (PROV.length){
      var b = new google.maps.LatLngBounds();
      PROV.forEach(function(p){ b.extend({ lat: p.lat, lng: p.lng }); });
      if (ME) b.extend(ME);
      map.fitBounds(b, 48);
    }
    map.addListener('zoom_changed', refresh);
    google.maps.event.addListenerOnce(map, 'idle', refresh);
  }
</script>
<script async src="https://maps.googleapis.com/maps/api/js?key=${key}&libraries=marker&callback=initMap"></script>
</body>
</html>`

export function MapaProveedores({
  proveedores,
  selected,
  onSelect,
  me = null,
}: {
  proveedores: GuiaProveedor[]
  selected?: number | null
  onSelect?: (i: number) => void
  me?: { lat: number; lng: number } | null
}) {
  const t = useTheme()
  const ref = useRef<WebView>(null)
  const markers: Marker[] = proveedores.map((p) => ({
    lat: p.lat,
    lng: p.lng,
    nombre: p.proveedor,
    rubro: p.rubros[0] ?? '',
  }))

  useEffect(() => {
    if (selected != null && ref.current) {
      ref.current.injectJavaScript(`window.selectProv && window.selectProv(${selected}); true;`)
    }
  }, [selected])

  if (!GOOGLE_KEY) {
    return (
      <View style={[styles.fill, styles.fallback, { backgroundColor: t.surface2 }]}>
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
    <View style={styles.fill}>
      <WebView
        // key fuerza recarga del html cuando cambia el set de pines (filtro por rubro)
        key={`${markers.length}-${markers[0]?.nombre ?? ''}-${me ? '1' : '0'}`}
        ref={ref}
        originWhitelist={['*']}
        source={{ html: html(GOOGLE_KEY, markers, me) }}
        style={styles.web}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        onMessage={(e) => {
          try {
            const msg = JSON.parse(e.nativeEvent.data)
            if (msg.type === 'select' && typeof msg.index === 'number') onSelect?.(msg.index)
          } catch {}
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  fill: { flex: 1, width: '100%', backgroundColor: '#EEF0F3' },
  web: { flex: 1, backgroundColor: 'transparent' },
  fallback: { alignItems: 'center', justifyContent: 'center' },
})
