const puppeteer = require('puppeteer');
const https     = require('https');
const fs        = require('fs');

const BASE_URL  = 'https://www.tiendaemisrl.com.ar';
const CAT_ID    = 443;
const SEPARATOR = '><del></del><p>$<!-- -->';

function fetchHtml(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(d));
    }).on('error', rej);
  });
}

function extraerNombres(html) {
  const nombres = {};
  const re = /\\"name\\":\\"([^\\"]+)\\",\\"url\\":\\"(https:\/\/www\.tiendaemisrl\.com\.ar\/producto\/[^\\"]+)\\"/g;
  let m;
  while ((m = re.exec(html)) !== null) nombres[m[2]] = m[1];
  return nombres;
}

function extraerPrecios(html) {
  const precios = {};
  const partes  = html.split(SEPARATOR);
  for (let j = 1; j < partes.length; j++) {
    const antes   = partes[j - 1];
    const slugEnd = antes.lastIndexOf('/"');
    const slugSt  = antes.lastIndexOf('/', slugEnd - 1);
    if (slugEnd > slugSt) {
      const slug = antes.substring(slugSt + 1, slugEnd);
      const pEnd = partes[j].indexOf('<!-- -->');
      if (slug && pEnd > 0) precios[slug] = '$' + partes[j].substring(0, pEnd);
    }
  }
  return precios;
}

async function scrapeEMI() {
  console.log('EMI: descargando catálogo...');
  const productos = {};

  for (let pg = 1; pg <= 5; pg++) {
    const html    = await fetchHtml(`${BASE_URL}/catalogo/?category_id=${CAT_ID}&page=${pg}`);
    const nombres = extraerNombres(html);
    const precios = extraerPrecios(html);
    Object.entries(nombres).forEach(([url, nombre]) => {
      const slug   = url.split('/').pop();
      const precio = precios[slug] || '';
      if (nombre && precio) productos[url] = { nombre, precio, cat: '', sub: '' };
    });
    console.log(`  Página ${pg}: ${Object.keys(nombres).length} productos`);
  }

  const urls = Object.keys(productos);
  console.log(`EMI: obteniendo subcategorías de ${urls.length} productos...`);

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page    = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36');

  for (let i = 0; i < urls.length; i++) {
    try {
      await page.goto(urls[i], { waitUntil: 'networkidle0', timeout: 20000 });
      await new Promise(r => setTimeout(r, 600));
      // Breadcrumb de la página: ["Productos","CONSTRUCCIÓN","Pinturas"]. De atrás para adelante,
      // 2 niveles → SUBCATEGORIA (último) y CATEGORIA (anterior). "Productos" (raíz) se descarta.
      const data = await page.evaluate(() => {
        const crumbs = [...document.querySelectorAll('nav a, ol li a')]
          .map(a => a.innerText.trim())
          .filter(t => t && !/^productos$/i.test(t));
        const og = document.querySelector('meta[property="og:image"]');
        const im = document.querySelector('.product.media img, .gallery-placeholder img, .fotorama__img, img.product-image-photo, .product-image img');
        const img = (og && og.content) || (im && (im.src || im.getAttribute('data-src'))) || '';
        return { crumbs, img };
      });
      productos[urls[i]].sub = data.crumbs[data.crumbs.length - 1] || '';
      productos[urls[i]].cat = data.crumbs[data.crumbs.length - 2] || '';
      productos[urls[i]].img = data.img;
    } catch(e) {}
    if ((i + 1) % 10 === 0) console.log(`  ${i + 1}/${urls.length}`);
  }

  await browser.close();

  // Código de producto: el id de la URL /producto/{ID}/slug (estable, para altas/bajas).
  const skuDe = (url) => (url.match(/\/producto\/(\d+)/) || [])[1] || '';
  const rows = Object.entries(productos)
    // Layout uniforme con Easy: [cat, sub, nombre, precio, url, descripcion, marca, sku] (EMI sin descripción ni marca)
    .map(([url, p]) => [p.cat, p.sub, p.nombre, p.precio, url, '', '', skuDe(url), p.img || ''])
    .sort((a, b) => (a[0]+a[1]).localeCompare(b[0]+b[1], 'es') || a[2].localeCompare(b[2], 'es'));

  fs.writeFileSync('emi-rows.json', JSON.stringify(rows));
  console.log(`EMI: ✅ ${rows.length} productos guardados`);
  return rows;
}

if (require.main === module) {
  scrapeEMI().catch(e => console.error('❌', e.message));
}

module.exports = { scrapeEMI };
