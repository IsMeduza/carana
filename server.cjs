const http = require('http');
const fs = require('fs');
const path = require('path');
const { resolveComponents } = require('./lib/components.cjs');
const { REDIRECTS, dynamicInventoryRedirect, isVehicleDetailRoute } = require('./lib/redirects.cjs');

const BLOG_HTML = path.join(__dirname, 'blog.html');
const blogFallback = () => (fs.existsSync(BLOG_HTML) ? BLOG_HTML : null);

const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.framercms': 'application/octet-stream',
  '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.webm': 'video/webm',
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
  const invTarget = dynamicInventoryRedirect(p);
  if (invTarget && !path.extname(p)) {
    res.writeHead(301, { Location: invTarget + qs });
    return res.end();
  }

  if (p.endsWith('/')) p += 'index.html';
  let file = path.join(__dirname, p);
  if (!file.startsWith(__dirname)) { res.writeHead(403); return res.end(); }

  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    const idxCandidate = path.join(file, 'index.html');
    if (fs.existsSync(idxCandidate)) {
      file = idxCandidate;
    } else if (p === '/blog' && blogFallback()) {
      file = blogFallback();
    }
  }

  if (!fs.existsSync(file)) {
    if (fs.existsSync(file + '.html')) {
      file = file + '.html';
    } else if (p === '/blog' && blogFallback()) {
      file = blogFallback();
    } else if (isVehicleDetailRoute(p)) {
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
        const nfContent = fs.readFileSync(notFoundPage, 'utf8');
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(resolveComponents(nfContent, notFoundPage));
      }
      res.writeHead(404); return res.end('not found');
    }
    const base = path.basename(file).split('@')[0];
    const ext = path.extname(base).toLowerCase();
    if (ext === '.html') {
      const htmlStr = resolveComponents(data.toString('utf8'), file);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(htmlStr);
    }
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(8765, () => console.log('serving on http://localhost:8765'));
