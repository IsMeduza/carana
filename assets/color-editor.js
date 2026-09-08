/* ============================================================
   EVO MOVE — Color Editor (dev-only)
   Activar:  Ctrl + Shift + E   o   ?dev en la URL
   ============================================================ */
(function () {
  const KEY_COMBO = (e) => e.ctrlKey && e.shiftKey && e.code === 'KeyE';
  const URL_FLAG = /[?&]dev\b/.test(location.search);

  const TOKENS = [
    { key: '--bg',        label: 'Fondo',        def: '#f2f2f2' },
    { key: '--surface',   label: 'Superficie',   def: '#fafafa' },
    { key: '--ink',       label: 'Tinta',        def: '#0d0d0d' },
    { key: '--dark',      label: 'Negro',        def: '#000000' },
    { key: '--dark-soft', label: 'Negro suave',  def: '#1a1a1a' },
    { key: '--muted',     label: 'Texto suave',  def: '#4d4d4d' },
    { key: '--faint',     label: 'Texto tenue',  def: '#888888' },
    { key: '--line',      label: 'Líneas',       def: '#dcdcdc' },
  ];

  const DARK_THEMES = [
    {
      id: 'obsidian',
      name: 'Negro Obsidian',
      desc: 'Clásico puro & sigiloso',
      icon: '🖤',
      colors: {
        '--ink': '#0d0d0d',
        '--dark': '#000000',
        '--dark-soft': '#1a1a1a',
        '--muted': '#4d4d4d',
        '--faint': '#888888',
      },
      angle: 145
    },
    {
      id: 'navy',
      name: 'Azul Midnight',
      desc: 'Noche alpina de lujo',
      icon: '🔵',
      colors: {
        '--ink': '#0a101b',
        '--dark': '#03070f',
        '--dark-soft': '#141f33',
        '--muted': '#3c4c64',
        '--faint': '#7688a2',
      },
      angle: 145
    },
    {
      id: 'crimson',
      name: 'Rojo Carmine',
      desc: 'Burdeos & fibra deportiva',
      icon: '🔴',
      colors: {
        '--ink': '#180a0c',
        '--dark': '#0b0204',
        '--dark-soft': '#2a1216',
        '--muted': '#5c393f',
        '--faint': '#946a71',
      },
      angle: 145
    },
    {
      id: 'emerald',
      name: 'Verde British',
      desc: 'Verde carrera Aston Martin',
      icon: '🟢',
      colors: {
        '--ink': '#08140f',
        '--dark': '#020906',
        '--dark-soft': '#12251d',
        '--muted': '#385043',
        '--faint': '#6e8b7c',
      },
      angle: 145
    },
    {
      id: 'violet',
      name: 'Púrpura Imperial',
      desc: 'Amatista oscura exótica',
      icon: '🟣',
      colors: {
        '--ink': '#130a1b',
        '--dark': '#07020d',
        '--dark-soft': '#241333',
        '--muted': '#513b61',
        '--faint': '#896f9c',
      },
      angle: 145
    },
    {
      id: 'titanium',
      name: 'Grafito Titanio',
      desc: 'Acero carbón industrial',
      icon: '🔘',
      colors: {
        '--ink': '#13161a',
        '--dark': '#0a0c0e',
        '--dark-soft': '#21262d',
        '--muted': '#4a525d',
        '--faint': '#7c8694',
      },
      angle: 145
    },
    {
      id: 'espresso',
      name: 'Café Espresso',
      desc: 'Cuero habano & tabaco',
      icon: '🟤',
      colors: {
        '--ink': '#16110d',
        '--dark': '#0a0705',
        '--dark-soft': '#281f18',
        '--muted': '#5c4c3f',
        '--faint': '#8e7c6e',
      },
      angle: 145
    },
    {
      id: 'amber',
      name: 'Cobre Solar',
      desc: 'Ámbar cálido profundo',
      icon: '🟠',
      colors: {
        '--ink': '#1b1008',
        '--dark': '#0b0502',
        '--dark-soft': '#2d1b0e',
        '--muted': '#654630',
        '--faint': '#98755c',
      },
      angle: 145
    }
  ];

  let panel = null;
  let gradAngle = 145;
  let activeThemeId = 'obsidian';

  function getCurrent(key, def) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(key).trim();
    return v || def;
  }

  function setVar(key, val) {
    document.documentElement.style.setProperty(key, val);
  }

  function updateGrad() {
    const ds = getCurrent('--dark-soft', '#1a1a1a');
    const ink = getCurrent('--ink', '#0d0d0d');
    const dk = getCurrent('--dark', '#000000');
    setVar('--grad-dark', `linear-gradient(${gradAngle}deg, ${ds} 0%, ${ink} 50%, ${dk} 100%)`);
  }

  function buildPanel() {
    if (panel) {
      if (panel.classList.contains('evo-hidden')) {
        panel.classList.remove('evo-hidden');
        panel.style.display = 'flex';
      } else {
        panel.classList.add('evo-hidden');
        setTimeout(() => { panel.style.display = 'none'; }, 280);
      }
      return;
    }

    panel = document.createElement('div');
    panel.id = 'evo-color-editor';
    panel.innerHTML = `
      <style>
        #evo-color-editor {
          position: fixed; top: 0; right: 0; bottom: 0; width: 330px; z-index: 99999;
          background: rgba(255,255,255,0.98); backdrop-filter: blur(24px);
          border-left: 1px solid #e2e2e2; box-shadow: -8px 0 35px rgba(0,0,0,0.12);
          display: flex; flex-direction: column; font-family: 'Space Grotesk', system-ui, sans-serif;
          transition: transform 0.28s cubic-bezier(.4,0,.2,1);
          overflow: hidden;
        }
        #evo-color-editor.evo-hidden { transform: translateX(100%); }
        .evo-ce-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px; border-bottom: 1px solid #e5e5e5;
          background: #fff;
        }
        .evo-ce-head h3 { font-size: 15px; font-weight: 700; margin: 0; color: #111; display: flex; align-items: center; gap: 8px; }
        .evo-ce-close {
          width: 28px; height: 28px; border-radius: 8px; border: 1px solid #ddd;
          background: #f5f5f5; cursor: pointer; display: grid; place-items: center;
          font-size: 14px; color: #666; transition: background 0.15s;
        }
        .evo-ce-close:hover { background: #eee; }
        .evo-ce-body { flex: 1; overflow-y: auto; padding: 12px 16px 20px; }
        .evo-ce-body::-webkit-scrollbar { width: 5px; }
        .evo-ce-body::-webkit-scrollbar-thumb { background: #d0d0d0; border-radius: 4px; }
        .evo-ce-section {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; color: #888; padding: 12px 0 6px;
          border-bottom: 1px solid #f0f0f0; margin-bottom: 8px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .evo-ce-section span.badge {
          font-size: 9px; font-weight: 600; text-transform: none; letter-spacing: 0;
          background: #eef2ff; color: #4338ca; padding: 2px 7px; border-radius: 6px;
        }
        .evo-ce-row {
          display: grid; grid-template-columns: 32px 1fr 80px; gap: 8px;
          align-items: center; padding: 5px 0;
        }
        .evo-ce-swatch {
          width: 32px; height: 32px; border-radius: 8px; border: 2px solid #e0e0e0;
          cursor: pointer; position: relative; overflow: hidden;
          transition: transform 0.15s;
        }
        .evo-ce-swatch:hover { transform: scale(1.05); }
        .evo-ce-swatch input {
          position: absolute; inset: -6px; width: 44px; height: 44px;
          border: none; cursor: pointer; opacity: 0;
        }
        .evo-ce-label { font-size: 12px; font-weight: 600; color: #333; }
        .evo-ce-hex {
          font-family: 'SF Mono', 'Fira Code', monospace; font-size: 11px;
          padding: 5px 8px; border-radius: 6px; border: 1px solid #e0e0e0;
          background: #fafafa; width: 80px; text-align: center; color: #333;
        }
        .evo-ce-hex:focus { outline: none; border-color: #999; background: #fff; }
        .evo-ce-slider-row {
          display: flex; align-items: center; gap: 8px; padding: 8px 0;
        }
        .evo-ce-slider-row label { font-size: 12px; font-weight: 600; color: #333; width: 50px; }
        .evo-ce-slider-row input[type="range"] {
          flex: 1; height: 5px; -webkit-appearance: none; border-radius: 3px;
          background: linear-gradient(90deg, #ddd, #666);
        }
        .evo-ce-slider-row input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; width: 15px; height: 15px; border-radius: 50%;
          background: #fff; border: 2px solid #777; cursor: pointer;
        }
        .evo-ce-slider-row span { font-size: 11px; font-family: monospace; width: 34px; text-align: right; color: #555; }
        .evo-ce-grad-preview {
          height: 32px; border-radius: 10px; margin: 4px 0 14px;
          box-shadow: inset -10px -10px 20px 0px rgba(255,255,255,0.18), 0 2px 8px rgba(0,0,0,0.12);
        }

        /* Temas oscuros */
        .evo-ce-themes-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 7px; margin-top: 4px;
        }
        .evo-ce-theme-card {
          border: 1.5px solid #e8e8e8; border-radius: 11px; padding: 8px 10px;
          background: #ffffff; cursor: pointer; transition: all 0.2s ease;
          display: flex; flex-direction: column; gap: 5px; text-align: left;
        }
        .evo-ce-theme-card:hover {
          border-color: #999; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }
        .evo-ce-theme-card.active {
          border-color: #111; background: #fafafa;
          box-shadow: 0 0 0 1px #111, 0 4px 14px rgba(0,0,0,0.08);
        }
        .evo-ce-theme-top {
          display: flex; align-items: center; justify-content: space-between;
        }
        .evo-ce-theme-name {
          font-size: 11.5px; font-weight: 700; color: #111;
        }
        .evo-ce-theme-bar {
          height: 14px; border-radius: 6px; width: 100%;
          border: 1px solid rgba(0,0,0,0.1);
        }
        .evo-ce-theme-desc {
          font-size: 9.5px; color: #777; line-height: 1.2;
        }

        .evo-ce-foot {
          display: flex; gap: 6px; padding: 12px 16px; border-top: 1px solid #e5e5e5;
          background: #fff;
        }
        .evo-ce-btn {
          flex: 1; font-size: 12px; font-weight: 700; padding: 9px 0;
          border-radius: 9px; border: 1px solid #ddd; background: #f5f5f5;
          cursor: pointer; text-align: center; transition: all 0.15s; color: #222;
        }
        .evo-ce-btn:hover { background: #eaeaea; }
        .evo-ce-btn-dark { background: #0d0d0d; color: #fff; border-color: #0d0d0d; }
        .evo-ce-btn-dark:hover { background: #222; }
        .evo-ce-toast {
          position: fixed; bottom: 20px; right: 345px; background: #111; color: #fff;
          padding: 8px 18px; border-radius: 10px; font-size: 12px; font-weight: 600;
          opacity: 0; transition: opacity 0.2s; pointer-events: none; z-index: 100000;
          font-family: 'Space Grotesk', system-ui, sans-serif; box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        .evo-ce-toast.show { opacity: 1; }
      </style>

      <div class="evo-ce-head">
        <h3>🎨 Color Studio</h3>
        <button class="evo-ce-close" id="evoCeClose" title="Cerrar (Ctrl+Shift+E)">✕</button>
      </div>
      <div class="evo-ce-body">
        <div class="evo-ce-section">
          <span>Tokens Base</span>
          <span class="badge">Blanco & Gris OK</span>
        </div>
        <div id="evoCeTokens"></div>

        <div class="evo-ce-section" style="margin-top:12px;">
          <span>Gradiente Botones</span>
        </div>
        <div class="evo-ce-slider-row">
          <label>Ángulo</label>
          <input type="range" min="0" max="360" value="145" id="evoCeAngle">
          <span id="evoCeAngleVal">145°</span>
        </div>
        <div class="evo-ce-grad-preview" id="evoCeGradPreview"></div>

        <div class="evo-ce-section" style="margin-top:10px;">
          <span>Temas Oscuros Alternativos</span>
          <span class="badge">Prueba 1-click</span>
        </div>
        <p style="font-size:10.5px; color:#777; margin: 0 0 8px 0; line-height:1.35;">
          Conserva tus fondos claros y aplica variaciones sofisticadas a los tonos negros y gradientes.
        </p>
        <div class="evo-ce-themes-grid" id="evoCeThemes"></div>
      </div>
      <div class="evo-ce-foot">
        <button class="evo-ce-btn evo-ce-btn-dark" id="evoCeCopy">📋 Copiar :root</button>
        <button class="evo-ce-btn" id="evoCeReset">↩️ Reset</button>
      </div>
      <div class="evo-ce-toast" id="evoCeToast"></div>
    `;

    document.body.appendChild(panel);

    // Build token rows
    const tokenInputs = {};
    const container = document.getElementById('evoCeTokens');
    TOKENS.forEach(({ key, label, def }) => {
      const val = getCurrent(key, def);
      const row = document.createElement('div');
      row.className = 'evo-ce-row';
      row.innerHTML = `
        <div class="evo-ce-swatch" style="background:${val}">
          <input type="color" value="${val}" data-key="${key}">
        </div>
        <span class="evo-ce-label">${label}</span>
        <input type="text" class="evo-ce-hex" value="${val}" data-key="${key}">
      `;
      container.appendChild(row);

      const picker = row.querySelector('input[type="color"]');
      const hex = row.querySelector('.evo-ce-hex');
      const swatch = row.querySelector('.evo-ce-swatch');

      tokenInputs[key] = { picker, hex, swatch };

      picker.addEventListener('input', (e) => {
        setVar(key, e.target.value);
        hex.value = e.target.value;
        swatch.style.background = e.target.value;
        updateGrad();
        updateGradPreview();
        clearActiveTheme();
      });

      hex.addEventListener('input', (e) => {
        let v = e.target.value.trim();
        if (!v.startsWith('#')) v = '#' + v;
        if (/^#[0-9a-fA-F]{6}$/.test(v)) {
          setVar(key, v);
          picker.value = v;
          swatch.style.background = v;
          updateGrad();
          updateGradPreview();
          clearActiveTheme();
        }
      });
    });

    // Build Themes Grid
    const themesContainer = document.getElementById('evoCeThemes');
    DARK_THEMES.forEach((theme) => {
      const gradStyle = `linear-gradient(${theme.angle}deg, ${theme.colors['--dark-soft']} 0%, ${theme.colors['--ink']} 50%, ${theme.colors['--dark']} 100%)`;
      const card = document.createElement('div');
      card.className = `evo-ce-theme-card ${theme.id === activeThemeId ? 'active' : ''}`;
      card.dataset.themeId = theme.id;
      card.innerHTML = `
        <div class="evo-ce-theme-top">
          <span class="evo-ce-theme-name">${theme.icon} ${theme.name}</span>
        </div>
        <div class="evo-ce-theme-bar" style="background: ${gradStyle}"></div>
        <span class="evo-ce-theme-desc">${theme.desc}</span>
      `;

      card.addEventListener('click', () => {
        applyDarkTheme(theme);
      });

      themesContainer.appendChild(card);
    });

    function clearActiveTheme() {
      document.querySelectorAll('.evo-ce-theme-card').forEach(c => c.classList.remove('active'));
      activeThemeId = null;
    }

    function applyDarkTheme(theme) {
      activeThemeId = theme.id;
      document.querySelectorAll('.evo-ce-theme-card').forEach(c => {
        c.classList.toggle('active', c.dataset.themeId === theme.id);
      });

      // Apply each color in theme
      for (const [key, val] of Object.entries(theme.colors)) {
        setVar(key, val);
        if (tokenInputs[key]) {
          tokenInputs[key].picker.value = val;
          tokenInputs[key].hex.value = val;
          tokenInputs[key].swatch.style.background = val;
        }
      }

      gradAngle = theme.angle || 145;
      slider.value = gradAngle;
      angleLabel.textContent = gradAngle + '°';

      updateGrad();
      updateGradPreview();
      toast(`✨ Tema "${theme.name}" aplicado`);
    }

    // Gradient angle
    const slider = document.getElementById('evoCeAngle');
    const angleLabel = document.getElementById('evoCeAngleVal');
    slider.addEventListener('input', (e) => {
      gradAngle = parseInt(e.target.value);
      angleLabel.textContent = gradAngle + '°';
      updateGrad();
      updateGradPreview();
    });
    updateGradPreview();

    // Close
    document.getElementById('evoCeClose').addEventListener('click', () => {
      panel.classList.add('evo-hidden');
      setTimeout(() => { panel.style.display = 'none'; }, 280);
    });

    // Copy
    document.getElementById('evoCeCopy').addEventListener('click', () => {
      const lines = [':root {'];
      TOKENS.forEach(({ key }) => {
        lines.push(`  ${key}: ${getCurrent(key, '')};`);
      });
      lines.push(`  --grad-dark: linear-gradient(${gradAngle}deg, ${getCurrent('--dark-soft','')} 0%, ${getCurrent('--ink','')} 50%, ${getCurrent('--dark','')} 100%);`);
      lines.push('}');
      copyText(lines.join('\n'));
      toast('📋 :root copiado al portapapeles');
    });

    // Reset
    document.getElementById('evoCeReset').addEventListener('click', () => {
      TOKENS.forEach(({ key, def }) => {
        document.documentElement.style.removeProperty(key);
      });
      gradAngle = 145;
      document.documentElement.style.removeProperty('--grad-dark');
      panel.remove();
      panel = null;
      buildPanel();
      toast('↩️ Reset a valores iniciales');
    });
  }

  function updateGradPreview() {
    const el = document.getElementById('evoCeGradPreview');
    if (el) {
      const ds = getCurrent('--dark-soft', '#1a1a1a');
      const ink = getCurrent('--ink', '#0d0d0d');
      const dk = getCurrent('--dark', '#000000');
      el.style.background = `linear-gradient(${gradAngle}deg, ${ds} 0%, ${ink} 50%, ${dk} 100%)`;
    }
  }

  function copyText(text) {
    navigator.clipboard.writeText(text).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
  }

  function toast(msg) {
    const t = document.getElementById('evoCeToast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 1900);
  }

  // Keyboard shortcut
  document.addEventListener('keydown', (e) => {
    if (KEY_COMBO(e)) { e.preventDefault(); buildPanel(); }
  });

  // Auto-open with ?dev
  if (URL_FLAG) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', buildPanel);
    } else {
      buildPanel();
    }
  }
})();
