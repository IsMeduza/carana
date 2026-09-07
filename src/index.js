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

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 301 Permanent Redirects for legacy/English routes
    if (REDIRECTS[pathname]) {
      url.pathname = REDIRECTS[pathname];
      return Response.redirect(url.toString(), 301);
    }

    if (pathname.startsWith('/inventory/')) {
      const slug = pathname.replace('/inventory/', '');
      url.pathname = `/inventario/${slug}`;
      return Response.redirect(url.toString(), 301);
    }

    // Dynamic vehicle detail route rewrites for static asset serving
    if ((pathname.startsWith('/inventario/') || pathname.startsWith('/coche/')) && !pathname.includes('.')) {
      const rewriteUrl = new URL(request.url);
      rewriteUrl.pathname = '/coche.html';
      return env.ASSETS.fetch(new Request(rewriteUrl.toString(), request));
    }

    return env.ASSETS.fetch(request);
  },
};

