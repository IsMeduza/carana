const http = require('http');
const fs = require('fs');
const path = require('path');

const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.framercms': 'application/octet-stream',
  '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.webm': 'video/webm',
};

// Permanent redirects from English/legacy routes to canonical Spanish routes
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

http.createServer((req, res) => {
  const urlParts = req.url.split('?');
  let p = decodeURIComponent(urlParts[0]);
  const qs = urlParts[1] ? '?' + urlParts[1] : '';

  // Check 301 redirects
  if (REDIRECTS[p]) {
    res.writeHead(301, { Location: REDIRECTS[p] + qs });
    return res.end();
  }

  // Handle dynamic /inventory/:slug redirect to /inventario/:slug
  if (p.startsWith('/inventory/') && !path.extname(p)) {
    const slug = p.replace('/inventory/', '');
    res.writeHead(301, { Location: '/inventario/' + slug + qs });
    return res.end();
  }

  if (p.endsWith('/')) p += 'index.html';
  let file = path.join(__dirname, p);
  if (!file.startsWith(__dirname)) { res.writeHead(403); return res.end(); }

  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    const idxCandidate = path.join(file, 'index.html');
    if (fs.existsSync(idxCandidate)) {
      file = idxCandidate;
    } else if (p === '/blog' && fs.existsSync(path.join(__dirname, 'blog.html'))) {
      file = path.join(__dirname, 'blog.html');
    }
  }

  if (!fs.existsSync(file)) {
    if (fs.existsSync(file + '.html')) {
      file = file + '.html';
    } else if (p === '/blog' && fs.existsSync(path.join(__dirname, 'blog.html'))) {
      file = path.join(__dirname, 'blog.html');
    } else if ((p.startsWith('/inventario/') || p.startsWith('/coche/')) && !path.extname(p)) {
      file = path.join(__dirname, 'coche.html');
    } else if (p.startsWith('/legal-pages/') && !path.extname(p)) {
      const pageName = path.basename(p);
      const rootCandidate = path.join(__dirname, pageName + '.html');
      if (fs.existsSync(rootCandidate)) file = rootCandidate;
    }
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      const notFoundPage = path.join(__dirname, '404.html');
      if (fs.existsSync(notFoundPage)) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(fs.readFileSync(notFoundPage));
      }
      res.writeHead(404); return res.end('not found');
    }
    const base = path.basename(file).split('@')[0];
    res.writeHead(200, { 'Content-Type': mime[path.extname(base).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(8765, () => console.log('serving on http://localhost:8765'));
