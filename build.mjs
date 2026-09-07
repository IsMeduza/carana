import fs from 'node:fs';
import path from 'node:path';
import JavaScriptObfuscator from 'javascript-obfuscator';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const EXCLUDE_DIRS = new Set(['.git', '.wrangler', 'node_modules', 'src', 'dist']);
const EXCLUDE_FILES = new Set([
  'build.mjs', 'package.json', 'package-lock.json', 'wrangler.jsonc',
  'server.cjs', '.assetsignore', '.gitignore', 'README.md',
]);
const OBFUSCATE_FILES = new Set([
  'app.js', 'inventory.js', 'car.js',
]);

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

function rm(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function copyAll(srcDir, distDir) {
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(distDir, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      fs.mkdirSync(destPath, { recursive: true });
      copyAll(srcPath, destPath);
    } else {
      if (EXCLUDE_FILES.has(entry.name)) continue;
      const rel = path.relative(ROOT, srcPath);
      const name = path.basename(rel);
      if (OBFUSCATE_FILES.has(name) && !rel.includes('dist')) {
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
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

rm(DIST);
fs.mkdirSync(DIST, { recursive: true });
copyAll(ROOT, DIST);
console.log('build complete -> dist/');