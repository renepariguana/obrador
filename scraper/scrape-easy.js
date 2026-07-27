const https = require('https');
const fs    = require('fs');

const CAT_ID    = 13;
const PAGE_SIZE = 50;

function fetchJson(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0' } }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => { try { res(JSON.parse(d)); } catch(e) { rej(e); } });
    }).on('error', rej);
  });
}

async function scrapeEasy() {
  const rows  = [];
  let desde   = 0;

  console.log('Easy: descargando productos...');
  while (true) {
    const url  = `https://www.easy.com.ar/api/catalog_system/pub/products/search?fq=C:${CAT_ID}&_from=${desde}&_to=${desde + PAGE_SIZE - 1}`;
    const data = await fetchJson(url);
    if (!Array.isArray(data) || data.length === 0) break;

    data.forEach(p => {
      const precio = (p.items?.[0]?.sellers?.[0]?.commertialOffer?.Price) || '';
      const nombre = p.productName || '';
      const link   = 'https://www.easy.com.ar/' + (p.linkText || '') + '/p';
      // Ruta de categorías de atrás para adelante: 2 niveles → SUBCATEGORIA (más específico) y CATEGORIA.
      // El nivel más alto (rubro, ej. "Construcción y Maderas") se ignora: el rubro va por proveedor.
      const partes = (p.categories?.[0] || '').split('/').filter(Boolean);
      const sub    = partes[partes.length - 1] || '';
      const cat    = partes[partes.length - 2] || '';
      // Código de producto de la página (SKU estable, sirve para altas/bajas mensuales).
      const sku    = String(p.productReference || p.items?.[0]?.itemId || p.productId || '');
      // Descripción/ficha: specs relevantes para la unidad (dimensiones, peso, contenido…) + unidad VTEX.
      const RELEV = /dimensi|largo|ancho|alto|espesor|peso|contenido|volumen|capacidad|medida|presentaci|unidad|rendimiento|cantidad|formato/i;
      const specs = (p.allSpecifications || [])
        .filter(s => RELEV.test(s))
        .map(s => `${s}: ${[].concat(p[s] || []).join(', ')}`)
        .join(' · ');
      const um = p.items?.[0]?.measurementUnit;
      const mult = p.items?.[0]?.unitMultiplier;
      const umTxt = um && um !== 'un' ? ` · UM: ${mult || 1} ${um}` : '';
      const descripcion = (specs + umTxt).trim();
      const marca = p.brand || '';
      const img = p.items?.[0]?.images?.[0]?.imageUrl || '';
      if (nombre && precio) rows.push([cat, sub, nombre, '$' + precio, link, descripcion, marca, sku, img]);
    });

    process.stdout.write(`  ${rows.length} productos\r`);
    if (data.length < PAGE_SIZE) break;
    desde += PAGE_SIZE;
    await new Promise(r => setTimeout(r, 150));
  }

  rows.sort((a, b) => a[0].localeCompare(b[0], 'es') || a[1].localeCompare(b[1], 'es') || a[2].localeCompare(b[2], 'es'));
  fs.writeFileSync('easy-rows.json', JSON.stringify(rows));
  console.log(`Easy: ✅ ${rows.length} productos guardados`);
  return rows;
}

if (require.main === module) {
  scrapeEasy().catch(e => console.error('❌', e.message));
}

module.exports = { scrapeEasy };
