/* ============================================================
   EVO MOVE — Button Color Studio (dev-only)
   Activar:  Ctrl + Shift + E   o   ?dev en la URL
   ============================================================ */
(function () {
  const KEY_COMBO = (e) => e.ctrlKey && e.shiftKey && e.code === 'KeyE';
  const URL_FLAG = /[?&]dev\b/.test(location.search);

  // 20+ Real Luxury & Sport Button Color Themes
  const BUTTON_THEMES = [
    // --- DEPORTIVOS / RACING ---
    {
      id: 'rosso-corsa',
      cat: 'sport',
      name: 'Rojo Ferrari Corsa',
      desc: 'Rojo de circuito de alta potencia',
      icon: '🔴',
      from: '#dc2626',
      to: '#b91c1c',
      angle: 145
    },
    {
      id: 'riviera-blue',
      cat: 'sport',
      name: 'Azul Riviera / Bugatti',
      desc: 'Azul eléctrico de hiperdeportivo',
      icon: '🔵',
      from: '#2563eb',
      to: '#1d4ed8',
      angle: 145
    },
    {
      id: 'papaya-orange',
      cat: 'sport',
      name: 'Naranja Papaya McLaren',
      desc: 'Naranja vibrante GT de competición',
      icon: '🟠',
      from: '#ea580c',
      to: '#c2410c',
      angle: 145
    },
    {
      id: 'mamba-green',
      cat: 'sport',
      name: 'Verde Mamba GT3 RS',
      desc: 'Verde deportivo de competición',
      icon: '🟢',
      from: '#16a34a',
      to: '#15803d',
      angle: 145
    },
    {
      id: 'giallo-modena',
      cat: 'sport',
      name: 'Amarillo Giallo Modena',
      desc: 'Amarillo deportivo Lamborghini',
      icon: '🟡',
      from: '#d97706',
      to: '#b45309',
      angle: 145
    },
    {
      id: 'ultraviolet',
      cat: 'sport',
      name: 'Púrpura Ultraviolet',
      desc: 'Porsche 991 GT3 RS clásico',
      icon: '🟣',
      from: '#9333ea',
      to: '#7e22ce',
      angle: 145
    },

    // --- LUJO EJECUTIVO & GRAN TURISMO ---
    {
      id: 'royal-navy',
      cat: 'luxury',
      name: 'Azul Zafiro Real',
      desc: 'Rolls-Royce & Bentley Navy',
      icon: '🔷',
      from: '#1d4ed8',
      to: '#1e3a8a',
      angle: 145
    },
    {
      id: 'deep-wine',
      cat: 'luxury',
      name: 'Rojo Borgoña / Vino',
      desc: 'Elegancia sobria Aston Martin',
      icon: '🍷',
      from: '#9f1239',
      to: '#881337',
      angle: 145
    },
    {
      id: 'british-racing',
      cat: 'luxury',
      name: 'Verde British Racing',
      desc: 'Verde oscuro inglés de leyenda',
      icon: '🌲',
      from: '#047857',
      to: '#065f46',
      angle: 145
    },
    {
      id: 'habano-espresso',
      cat: 'luxury',
      name: 'Café Bronce Habano',
      desc: 'Cuero Bentley Mulliner & Tabaco',
      icon: '🟤',
      from: '#78350f',
      to: '#5f2b08',
      angle: 145
    },
    {
      id: 'velvet-plum',
      cat: 'luxury',
      name: 'Ciruela Velvet',
      desc: 'Exclusivo Mercedes-Maybach',
      icon: '🔮',
      from: '#7e22ce',
      to: '#6b21a8',
      angle: 145
    },
    {
      id: 'petrol-teal',
      cat: 'luxury',
      name: 'Azul Petrol / Teal',
      desc: 'Turquesa nórdico de alta gama',
      icon: '💠',
      from: '#0e7490',
      to: '#155e75',
      angle: 145
    },

    // --- EXÓTICOS & HYPERCAR ---
    {
      id: 'acid-green',
      cat: 'neon',
      name: 'Verde Ácido 918',
      desc: 'Pinzas híbridas Porsche 918',
      icon: '⚡',
      from: '#65a30d',
      to: '#4d7c0f',
      angle: 145
    },
    {
      id: 'ruby-star',
      cat: 'neon',
      name: 'Rosa Ruby Star Neo',
      desc: 'Fucsia de carreras Porsche',
      icon: '💖',
      from: '#e11d48',
      to: '#be123c',
      angle: 145
    },
    {
      id: 'miami-cyan',
      cat: 'neon',
      name: 'Miami Cyan Eléctrico',
      desc: 'Cian brillante costero',
      icon: '🌊',
      from: '#0284c7',
      to: '#0369a1',
      angle: 145
    },
    {
      id: 'liquid-copper',
      cat: 'neon',
      name: 'Cobre Solar Fundido',
      desc: 'Bronce supercar cálido',
      icon: '🏜️',
      from: '#c2410c',
      to: '#9a3412',
      angle: 145
    },

    // --- MONOCROMÁTICO & METÁLICO ---
    {
      id: 'obsidian',
      cat: 'mono',
      name: 'Negro Obsidian (Original)',
      desc: 'El negro de fábrica puro y sobrio',
      icon: '🖤',
      from: '#181818',
      to: '#0d0d0d',
      angle: 145
    },
    {
      id: 'gunmetal',
      cat: 'mono',
      name: 'Grafito Gunmetal',
      desc: 'Carbón y metal pulido deportivo',
      icon: '🔘',
      from: '#374151',
      to: '#1f2937',
      angle: 145
    },
    {
      id: 'amg-titanium',
      cat: 'mono',
      name: 'Titanio AMG Night',
      desc: 'Gris antracita con matiz frío',
      icon: '🐺',
      from: '#334155',
      to: '#1e293b',
      angle: 145
    },
    {
      id: 'silver-frost',
      cat: 'mono',
      name: 'Plata Acero Frost',
      desc: 'Metal cepillado contemporáneo',
      icon: '❄️',
      from: '#475569',
      to: '#334155',
      angle: 145
    }
  ];

  let panel = null;
  let btnFrom = '#1a1a1a';
  let btnTo = '#000000';
  let gradAngle = 145;
  let activeThemeId = 'obsidian';
  let activeCat = 'all';

  function getCurrent(key, def) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(key).trim();
    return v || def;
  }

  function setVar(key, val) {
    document.documentElement.style.setProperty(key, val);
  }

  function applyButtonGradient() {
    const grad = `linear-gradient(${gradAngle}deg, ${btnFrom} 0%, ${btnTo} 100%)`;
    setVar('--btn-from', btnFrom);
    setVar('--btn-to', btnTo);
    setVar('--grad-dark', grad);

    // Ensure texts remain 100% untouched black/ink
    setVar('--ink', '#0d0d0d');
    setVar('--dark', '#000000');
    setVar('--dark-soft', '#1a1a1a');

    updateMiniPreview();
  }

  function updateMiniPreview() {
    const bar = document.getElementById('evoBtnGradBar');
    const demoBtn = document.getElementById('evoBtnDemo');
    const demoArrow = document.getElementById('evoBtnDemoArrow');
    const grad = `linear-gradient(${gradAngle}deg, ${btnFrom} 0%, ${btnTo} 100%)`;

    if (bar) bar.style.background = grad;
    if (demoBtn) demoBtn.style.background = grad;
    if (demoArrow) demoArrow.style.color = btnTo;
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

    btnFrom = getCurrent('--btn-from', '#1a1a1a');
    btnTo = getCurrent('--btn-to', '#000000');

    panel = document.createElement('div');
    panel.id = 'evo-color-editor';
    panel.innerHTML = `
      <style>
        #evo-color-editor {
          position: fixed; top: 0; right: 0; bottom: 0; width: 350px; z-index: 99999;
          background: rgba(255,255,255,0.98); backdrop-filter: blur(24px);
          border-left: 1px solid #e2e2e2; box-shadow: -8px 0 35px rgba(0,0,0,0.12);
          display: flex; flex-direction: column; font-family: 'Space Grotesk', system-ui, sans-serif;
          transition: transform 0.28s cubic-bezier(.4,0,.2,1);
          overflow: hidden;
        }
        #evo-color-editor.evo-hidden { transform: translateX(100%); }
        .evo-ce-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 16px; border-bottom: 1px solid #e5e5e5;
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

        .evo-ce-notice {
          background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 9px;
          padding: 8px 11px; margin-bottom: 12px; font-size: 11px; color: #475569;
          line-height: 1.35;
        }
        .evo-ce-notice strong { color: #0f172a; }

        .evo-ce-section {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; color: #888; padding: 8px 0 6px;
          border-bottom: 1px solid #f0f0f0; margin-bottom: 8px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .evo-ce-section span.badge {
          font-size: 9px; font-weight: 600; text-transform: none; letter-spacing: 0;
          background: #ecfdf5; color: #047857; padding: 2px 7px; border-radius: 6px;
        }

        /* Demo Button in panel */
        .evo-demo-wrap {
          display: flex; align-items: center; justify-content: center;
          padding: 12px; background: #f2f2f2; border-radius: 14px; margin-bottom: 12px;
          border: 1px solid #e5e5e5;
        }
        .evo-demo-btn {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 4px 4px 4px 18px; border-radius: 14px; font-size: 13.5px; font-weight: 600;
          color: #fff; text-decoration: none; cursor: pointer;
          box-shadow: 0 4px 14px rgba(0,0,0,0.18), inset -10px -10px 20px rgba(255,255,255,0.16);
          transition: background 0.2s ease;
        }
        .evo-demo-chip {
          display: grid; place-items: center; width: 36px; height: 36px;
          border-radius: 10px; background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        /* Pickers row */
        .evo-ce-pickers {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;
        }
        .evo-ce-picker-card {
          border: 1px solid #e5e5e5; border-radius: 10px; padding: 8px;
          background: #fafafa; display: flex; flex-direction: column; gap: 6px;
        }
        .evo-ce-picker-label { font-size: 11px; font-weight: 600; color: #555; }
        .evo-ce-picker-inner {
          display: flex; align-items: center; gap: 8px;
        }
        .evo-ce-swatch {
          width: 30px; height: 30px; border-radius: 7px; border: 2px solid #ddd;
          cursor: pointer; position: relative; overflow: hidden; flex: none;
        }
        .evo-ce-swatch input {
          position: absolute; inset: -6px; width: 44px; height: 44px;
          border: none; cursor: pointer; opacity: 0;
        }
        .evo-ce-hex {
          font-family: 'SF Mono', 'Fira Code', monospace; font-size: 11px;
          padding: 4px 6px; border-radius: 6px; border: 1px solid #ddd;
          background: #fff; width: 100%; text-align: center; color: #222;
        }

        .evo-ce-slider-row {
          display: flex; align-items: center; gap: 8px; padding: 4px 0 10px;
        }
        .evo-ce-slider-row label { font-size: 11.5px; font-weight: 600; color: #444; width: 50px; }
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
          height: 28px; border-radius: 8px; margin: 0 0 12px;
          box-shadow: inset -10px -10px 20px 0px rgba(255,255,255,0.18), 0 2px 8px rgba(0,0,0,0.12);
          transition: background 0.2s ease;
        }

        /* Category Filter Tabs */
        .evo-ce-cats {
          display: flex; gap: 4px; overflow-x: auto; padding: 4px 0 8px;
          margin-bottom: 6px;
        }
        .evo-ce-cats::-webkit-scrollbar { display: none; }
        .evo-ce-cat-btn {
          font-size: 10px; font-weight: 700; padding: 4px 9px; border-radius: 12px;
          border: 1px solid #e2e2e2; background: #f5f5f5; color: #666;
          cursor: pointer; white-space: nowrap; transition: all 0.15s;
        }
        .evo-ce-cat-btn:hover { background: #eee; color: #222; }
        .evo-ce-cat-btn.active {
          background: #111; color: #fff; border-color: #111;
        }

        /* Themes Grid */
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
          box-shadow: 0 0 0 1.5px #111, 0 4px 14px rgba(0,0,0,0.08);
        }
        .evo-ce-theme-top {
          display: flex; align-items: center; justify-content: space-between;
        }
        .evo-ce-theme-name {
          font-size: 11px; font-weight: 700; color: #111;
        }
        .evo-ce-theme-bar {
          height: 18px; border-radius: 6px; width: 100%;
          border: 1px solid rgba(0,0,0,0.1);
          box-shadow: inset -6px -6px 12px rgba(255,255,255,0.22);
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
          position: fixed; bottom: 20px; right: 365px; background: #111; color: #fff;
          padding: 8px 18px; border-radius: 10px; font-size: 12px; font-weight: 600;
          opacity: 0; transition: opacity 0.2s; pointer-events: none; z-index: 100000;
          font-family: 'Space Grotesk', system-ui, sans-serif; box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        .evo-ce-toast.show { opacity: 1; }
      </style>

      <div class="evo-ce-head">
        <h3>🎨 Studio Color de Botones</h3>
        <button class="evo-ce-close" id="evoCeClose" title="Cerrar (Ctrl+Shift+E)">✕</button>
      </div>
      <div class="evo-ce-body">
        <div class="evo-ce-notice">
          <strong>Textos y fondos fijos</strong>: Los textos siguen siendo <strong>negro puro (#0d0d0d)</strong> y los fondos gris/blanco. Aquí pruebas colores <strong>únicamente para los botones</strong>.
        </div>

        <!-- Live Demo in panel -->
        <div class="evo-demo-wrap">
          <div class="evo-demo-btn" id="evoBtnDemo">
            <span>Contactar</span>
            <div class="evo-demo-chip">
              <svg id="evoBtnDemoArrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12L19.88 12M13.75 18.75L19.44 13.06C19.73 12.77 19.88 12.38 19.88 12M13.75 5.25L19.44 10.94C19.73 11.23 19.88 11.62 19.88 12"/></svg>
            </div>
          </div>
        </div>

        <!-- Custom Pickers -->
        <div class="evo-ce-section">
          <span>Gradiente Personalizado</span>
          <span class="badge">En vivo</span>
        </div>
        <div class="evo-ce-pickers">
          <div class="evo-ce-picker-card">
            <span class="evo-ce-picker-label">Color Inicio</span>
            <div class="evo-ce-picker-inner">
              <div class="evo-ce-swatch" id="evoSwatchFrom" style="background:${btnFrom}">
                <input type="color" value="${btnFrom}" id="evoPickFrom">
              </div>
              <input type="text" class="evo-ce-hex" value="${btnFrom}" id="evoHexFrom">
            </div>
          </div>
          <div class="evo-ce-picker-card">
            <span class="evo-ce-picker-label">Color Fin</span>
            <div class="evo-ce-picker-inner">
              <div class="evo-ce-swatch" id="evoSwatchTo" style="background:${btnTo}">
                <input type="color" value="${btnTo}" id="evoPickTo">
              </div>
              <input type="text" class="evo-ce-hex" value="${btnTo}" id="evoHexTo">
            </div>
          </div>
        </div>

        <div class="evo-ce-slider-row">
          <label>Ángulo</label>
          <input type="range" min="0" max="360" value="145" id="evoCeAngle">
          <span id="evoCeAngleVal">145°</span>
        </div>
        <div class="evo-ce-grad-preview" id="evoBtnGradBar"></div>

        <!-- Themes section -->
        <div class="evo-ce-section" style="margin-top:10px;">
          <span>20 Colores de Botón Reales</span>
          <span class="badge">1-Clic</span>
        </div>

        <!-- Category filter tabs -->
        <div class="evo-ce-cats">
          <button class="evo-ce-cat-btn active" data-cat="all">Todos (20)</button>
          <button class="evo-ce-cat-btn" data-cat="sport">Deportivos</button>
          <button class="evo-ce-cat-btn" data-cat="luxury">Lujo GT</button>
          <button class="evo-ce-cat-btn" data-cat="neon">Exóticos</button>
          <button class="evo-ce-cat-btn" data-cat="mono">Monocromo</button>
        </div>

        <div class="evo-ce-themes-grid" id="evoCeThemes"></div>
      </div>
      <div class="evo-ce-foot">
        <button class="evo-ce-btn evo-ce-btn-dark" id="evoCeCopy">📋 Copiar CSS Botones</button>
        <button class="evo-ce-btn" id="evoCeReset">↩️ Reset (Negro)</button>
      </div>
      <div class="evo-ce-toast" id="evoCeToast"></div>
    `;

    document.body.appendChild(panel);

    // Pickers elements
    const pickFrom = document.getElementById('evoPickFrom');
    const hexFrom = document.getElementById('evoHexFrom');
    const swatchFrom = document.getElementById('evoSwatchFrom');

    const pickTo = document.getElementById('evoPickTo');
    const hexTo = document.getElementById('evoHexTo');
    const swatchTo = document.getElementById('evoSwatchTo');

    const slider = document.getElementById('evoCeAngle');
    const angleVal = document.getElementById('evoCeAngleVal');

    function updateFrom(val) {
      btnFrom = val;
      pickFrom.value = val;
      hexFrom.value = val;
      swatchFrom.style.background = val;
      applyButtonGradient();
      clearActiveTheme();
    }

    function updateTo(val) {
      btnTo = val;
      pickTo.value = val;
      hexTo.value = val;
      swatchTo.style.background = val;
      applyButtonGradient();
      clearActiveTheme();
    }

    pickFrom.addEventListener('input', (e) => updateFrom(e.target.value));
    hexFrom.addEventListener('input', (e) => {
      let v = e.target.value.trim();
      if (!v.startsWith('#')) v = '#' + v;
      if (/^#[0-9a-fA-F]{6}$/.test(v)) updateFrom(v);
    });

    pickTo.addEventListener('input', (e) => updateTo(e.target.value));
    hexTo.addEventListener('input', (e) => {
      let v = e.target.value.trim();
      if (!v.startsWith('#')) v = '#' + v;
      if (/^#[0-9a-fA-F]{6}$/.test(v)) updateTo(v);
    });

    slider.addEventListener('input', (e) => {
      gradAngle = parseInt(e.target.value);
      angleVal.textContent = gradAngle + '°';
      applyButtonGradient();
    });

    // Themes Grid
    const themesContainer = document.getElementById('evoCeThemes');
    function renderThemes(cat) {
      themesContainer.innerHTML = '';
      const list = cat === 'all' ? BUTTON_THEMES : BUTTON_THEMES.filter(t => t.cat === cat);
      list.forEach((theme) => {
        const gradStyle = `linear-gradient(${theme.angle}deg, ${theme.from} 0%, ${theme.to} 100%)`;
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
          applyTheme(theme);
        });

        themesContainer.appendChild(card);
      });
    }

    renderThemes('all');

    // Category Tabs
    document.querySelectorAll('.evo-ce-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.evo-ce-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCat = btn.dataset.cat;
        renderThemes(activeCat);
      });
    });

    function clearActiveTheme() {
      document.querySelectorAll('.evo-ce-theme-card').forEach(c => c.classList.remove('active'));
      activeThemeId = null;
    }

    function applyTheme(theme) {
      activeThemeId = theme.id;
      document.querySelectorAll('.evo-ce-theme-card').forEach(c => {
        c.classList.toggle('active', c.dataset.themeId === theme.id);
      });

      btnFrom = theme.from;
      btnTo = theme.to;
      gradAngle = theme.angle || 145;

      pickFrom.value = btnFrom;
      hexFrom.value = btnFrom;
      swatchFrom.style.background = btnFrom;

      pickTo.value = btnTo;
      hexTo.value = btnTo;
      swatchTo.style.background = btnTo;

      slider.value = gradAngle;
      angleVal.textContent = gradAngle + '°';

      applyButtonGradient();
      toast(`✨ Botones cambiados a "${theme.name}"`);
    }

    // Close
    document.getElementById('evoCeClose').addEventListener('click', () => {
      panel.classList.add('evo-hidden');
      setTimeout(() => { panel.style.display = 'none'; }, 280);
    });

    // Copy CSS
    document.getElementById('evoCeCopy').addEventListener('click', () => {
      const css = [
        `  --btn-from: ${btnFrom};`,
        `  --btn-to: ${btnTo};`,
        `  --grad-dark: linear-gradient(${gradAngle}deg, var(--btn-from) 0%, var(--btn-to) 100%);`
      ].join('\n');
      copyText(css);
      toast('📋 CSS de botones copiado');
    });

    // Reset
    document.getElementById('evoCeReset').addEventListener('click', () => {
      btnFrom = '#1a1a1a';
      btnTo = '#000000';
      gradAngle = 145;
      document.documentElement.style.removeProperty('--btn-from');
      document.documentElement.style.removeProperty('--btn-to');
      document.documentElement.style.removeProperty('--grad-dark');

      pickFrom.value = btnFrom;
      hexFrom.value = btnFrom;
      swatchFrom.style.background = btnFrom;

      pickTo.value = btnTo;
      hexTo.value = btnTo;
      swatchTo.style.background = btnTo;

      slider.value = gradAngle;
      angleVal.textContent = gradAngle + '°';

      updateMiniPreview();
      clearActiveTheme();
      toast('↩️ Botones restablecidos a Negro original');
    });

    updateMiniPreview();
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
