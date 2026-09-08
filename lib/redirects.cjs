// Shared redirect map: legacy/English routes -> canonical Spanish routes.
// Used by both server.cjs (local dev) and src/index.js (Cloudflare Worker).
const REDIRECTS = {
  '/inventory': '/inventario',
  '/inventory.html': '/inventario.html',
  '/trade-in': '/entrega-tu-coche',
  '/trade-in.html': '/entrega-tu-coche.html',
  '/financing': '/financiacion',
  '/financing.html': '/financiacion.html',
  '/about-us': '/sobre-nosotros',
  '/about-us.html': '/sobre-nosotros.html',
  '/contact': '/contacto',
  '/contact.html': '/contacto.html',
  '/car': '/coche',
  '/car.html': '/coche.html',
  '/terms-conditions': '/terminos-y-condiciones',
  '/terms-conditions.html': '/terminos-y-condiciones.html',
  '/privacy-policy': '/politica-de-privacidad',
  '/privacy-policy.html': '/politica-de-privacidad.html',
  '/cookie-policy': '/politica-de-cookies',
  '/cookie-policy.html': '/politica-de-cookies.html',
  '/legal-pages/terms-conditions': '/terminos-y-condiciones',
  '/legal-pages/terms-conditions.html': '/terminos-y-condiciones.html',
  '/legal-pages/privacy-policy': '/politica-de-privacidad',
  '/legal-pages/privacy-policy.html': '/politica-de-privacidad.html',
  '/legal-pages/cookie-policy': '/politica-de-cookies',
  '/legal-pages/cookie-policy.html': '/politica-de-cookies.html',
  '/blog/from-first-enquiry-to-dream-delivery-inside-marcus-s-journey-to-his-mclaren-720s-spider': '/blog/de-la-primera-consulta-a-la-entrega-sonada-el-viaje-de-marcus-en-su-mclaren-720s-spider.html',
  '/blog/from-first-enquiry-to-dream-delivery-inside-marcus-s-journey-to-his-mclaren-720s-spider.html': '/blog/de-la-primera-consulta-a-la-entrega-sonada-el-viaje-de-marcus-en-su-mclaren-720s-spider.html',
  '/blog/why-the-used-luxury-car-market-is-booming-in-2024-(and-what-it-means-for-buyers': '/blog/por-que-el-mercado-de-coches-de-lujo-usados-esta-en-auge-en-2024.html',
  '/blog/why-the-used-luxury-car-market-is-booming-in-2024-(and-what-it-means-for-buyers.html': '/blog/por-que-el-mercado-de-coches-de-lujo-usados-esta-en-auge-en-2024.html',
  '/blog/leasing-vs-buying-a-luxury-car-which-is-right-for-you-in-2024': '/blog/leasing-vs-compra-de-un-coche-de-lujo-en-2024.html',
  '/blog/leasing-vs-buying-a-luxury-car-which-is-right-for-you-in-2024.html': '/blog/leasing-vs-compra-de-un-coche-de-lujo-en-2024.html',
};

module.exports = {
  REDIRECTS,
  // Legacy /inventory/:slug → canonical /inventario/:slug (dynamic redirect)
  dynamicInventoryRedirect: (pathname) => {
    if (pathname.startsWith('/inventory/')) {
      return '/inventario/' + pathname.replace('/inventory/', '');
    }
    return null;
  },
  // Vehicle detail routes without extension should render coche.html
  isVehicleDetailRoute: (pathname) => {
    return /^\/(inventario|coche)\//.test(pathname) && !pathname.includes('.');
  },
};