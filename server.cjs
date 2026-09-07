const http = require('http');
const fs = require('fs');
const path = require('path');

const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.framercms': 'application/octet-stream',
  '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.webm': 'video/webm',
};

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  let file = path.join(__dirname, p);
  if (!file.startsWith(__dirname)) { res.writeHead(403); return res.end(); }

  if (!fs.existsSync(file)) {
    if (fs.existsSync(file + '.html')) {
      file = file + '.html';
    } else if (p.startsWith('/inventory/') && !path.extname(p)) {
      file = path.join(__dirname, 'car.html');
    } else if (p.startsWith('/legal-pages/') && !path.extname(p)) {
      const pageName = path.basename(p);
      const rootCandidate = path.join(__dirname, pageName + '.html');
      if (fs.existsSync(rootCandidate)) file = rootCandidate;
    }
  }

  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('not found'); }
    const base = path.basename(file).split('@')[0];
    res.writeHead(200, { 'Content-Type': mime[path.extname(base).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(8765, () => console.log('serving on http://localhost:8765'));
