// Maderplak corre sobre Algolia (plataforma xcons) → usa el scraper genérico scrape-algolia.js.
// Se mantiene este archivo por compatibilidad (el agente mensual lo invoca por slug).
// Uso: node scrape-maderplak.js
const { scrapeAlgolia } = require('./scrape-algolia')

const scrapeMaderplak = () => scrapeAlgolia('https://www.maderplak.com', 'maderplak')

if (require.main === module) {
  scrapeMaderplak().catch((e) => { console.error('❌', e.message); process.exit(1) })
}

module.exports = { scrapeMaderplak }
