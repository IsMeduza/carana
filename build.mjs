import fs from 'node:fs';
import path from 'node:path';
import JavaScriptObfuscator from 'javascript-obfuscator';
import { minify as minifyHTML } from 'html-minifier-terser';
import CleanCSS from 'clean-css';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const EXCLUDE_DIRS = new Set(['.git', '.wrangler', 'node_modules', 'src', 'dist']);
const EXCLUDE_FILES = new Set([
  'build.mjs', 'package.json', 'package-lock.json', 'wrangler.jsonc',
  'server.cjs', '.assetsignore', '.gitignore', 'README.md',
]);
const OBFUSCATE_PATHS = [
  'app.js',
  'inventory.js',
  'car.js',
  'assets/motion.js',
  'components/footer.js',
  'components/services.js',
];

const OBFUSCATOR_OPTIONS = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.4,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.2,
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: false,
  selfDefending: false,
  simplify: true,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.6,
  transformObjectKeys: true,
  unicodeEscapeSequence: false,
};

const HTML_MINIFY_OPTIONS = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeEmptyAttributes: true,
  minifyCSS: true,
  minifyJS: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: false,
  removeOptionalTags: false,
  sortAttributes: true,
  sortClassName: true,
};

const cleanCSS = new CleanCSS({
  level: 2,
  compatibility: '*',
});

function rm(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

async function copyAll(srcDir, distDir) {
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(distDir, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      fs.mkdirSync(destPath, { recursive: true });
      await copyAll(srcPath, destPath);
    } else {
      if (EXCLUDE_FILES.has(entry.name)) continue;
      const rel = path.relative(ROOT, srcPath);
      const norm = rel.split(path.sep).join('/');
      const ext = path.extname(entry.name).toLowerCase();

      // Obfuscate JS
      if (OBFUSCATE_PATHS.includes(norm) && !rel.includes('dist')) {
        const code = fs.readFileSync(srcPath, 'utf8');
        let out;
        try {
          out = JavaScriptObfuscator.obfuscate(code, OBFUSCATOR_OPTIONS).getObfuscatedCode();
        } catch (err) {
          console.error(`[obfuscate] failed ${rel}: ${err.message}`);
          out = code;
        }
        fs.writeFileSync(destPath, out);
        console.log(`[obfuscate] ${rel}`);
      }
      // Minify HTML
      else if (ext === '.html') {
        const html = fs.readFileSync(srcPath, 'utf8');
        let out;
        try {
          out = await minifyHTML(html, HTML_MINIFY_OPTIONS);
        } catch (err) {
          console.error(`[minify-html] failed ${rel}: ${err.message}`);
          out = html;
        }
        fs.writeFileSync(destPath, out);
        console.log(`[minify-html] ${rel}`);
      }
      // Minify CSS
      else if (ext === '.css') {
        const css = fs.readFileSync(srcPath, 'utf8');
        const result = cleanCSS.minify(css);
        if (result.errors && result.errors.length > 0) {
          console.error(`[minify-css] failed ${rel}: ${result.errors.join(', ')}`);
          fs.copyFileSync(srcPath, destPath);
        } else {
          fs.writeFileSync(destPath, result.styles);
          console.log(`[minify-css] ${rel}`);
        }
      }
      // Copy everything else as-is
      else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

rm(DIST);
fs.mkdirSync(DIST, { recursive: true });
await copyAll(ROOT, DIST);
console.log('build complete -> dist/');