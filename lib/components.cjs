const fs = require('fs');
const path = require('path');

const COMPONENT_REGEX = /<!--\s*@component\s+([a-zA-Z0-9_\-]+)([\s\S]*?)-->/g;
const PARAM_REGEX = /([a-zA-Z0-9_\-]+)=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;

function parseParams(paramStr) {
  const params = {};
  if (!paramStr) return params;
  let match;
  PARAM_REGEX.lastIndex = 0;
  while ((match = PARAM_REGEX.exec(paramStr)) !== null) {
    const key = match[1];
    const val = match[2] !== undefined ? match[2] : (match[3] !== undefined ? match[3] : match[4]);
    params[key] = val;
  }
  return params;
}

function resolveComponents(html, filePath = '', componentsDir = null) {
  if (!componentsDir) {
    componentsDir = path.join(__dirname, '..', 'components');
  }

  let defaultRoot = '';
  if (filePath) {
    const normalized = filePath.replace(/\\/g, '/');
    if (normalized.includes('/blog/') || normalized.includes('/legal-pages/')) {
      defaultRoot = '../';
    }
  }

  let iterations = 0;
  while (iterations < 5) {
    COMPONENT_REGEX.lastIndex = 0;
    if (!COMPONENT_REGEX.test(html)) break;
    iterations++;

    COMPONENT_REGEX.lastIndex = 0;
    html = html.replace(COMPONENT_REGEX, (match, componentName, paramStr) => {
      const componentFile = path.join(componentsDir, `${componentName}.html`);
      if (!fs.existsSync(componentFile)) {
        console.warn(`[components] Component not found: ${componentName} (${componentFile})`);
        return match;
      }

      let content = fs.readFileSync(componentFile, 'utf8');
      const params = parseParams(paramStr);
      const root = params.root !== undefined ? params.root : defaultRoot;

      // Replace {{root}}
      content = content.replace(/\{\{root\}\}/g, root);

      // Replace active state
      const active = params.active || '';
      ['inicio', 'inventario', 'entrega', 'financiacion', 'nosotros', 'contacto', 'blog'].forEach(item => {
        const token = new RegExp(`\\{\\{active_${item}\\}\\}`, 'g');
        content = content.replace(token, active === item ? 'active' : '');
      });

      // Map parameter aliases
      if (params.title && !params.footer_title) params.footer_title = params.title;
      if (params.subtitle && !params.footer_sub) params.footer_sub = params.subtitle;
      if (params.sub && !params.footer_sub) params.footer_sub = params.sub;

      // Default variables
      const defaults = {
        footer_title: '¿Listo para optimizar<br>tu gestión de vehículos?',
        footer_sub: 'Soluciones integrales 360° en automoción y comercio europeo. Sede en Girona para profesionales y particulares.'
      };

      // Replace passed params
      for (const [key, val] of Object.entries(params)) {
        const reg = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        content = content.replace(reg, val);
      }

      // Replace defaults if still unpopulated
      for (const [key, val] of Object.entries(defaults)) {
        const reg = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        content = content.replace(reg, val);
      }

      // Clear any leftover tokens
      content = content.replace(/\{\{[a-zA-Z0-9_\-]+\}\}/g, '');

      return content;
    });
  }

  return html;
}

module.exports = {
  resolveComponents,
  parseParams
};
