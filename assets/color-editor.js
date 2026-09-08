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
    { key: '--ink',       label: 'Tinta / Texto',def: '#0d0d0d' },
    { key: '--dark',      label: 'Oscuro Base',  def: '#000000' },
    { key: '--dark-soft', label: 'Color Botón',  def: '#1a1a1a' },
    { key: '--muted',     label: 'Texto suave',  def: '#4d4d4d' },
    { key: '--faint',     label: 'Texto tenue',  def: '#888888' },
    { key: '--line',      label: 'Líneas',       def: '#dcdcdc' },
  ];

  const DARK_THEMES = [
    // --- 1. DEPORTIVOS / GT RACING ---
    {
      id: 'rosso-corsa',
      cat: 'sport',
      name: 'Rojo Corsa',
      desc: 'Ferrari & Porsche GT3',
      icon: '🔴',
      colors: {
        '--dark-soft': '#dc2626',
        '--ink': '#991b1b',
        '--dark': '#580c0c',
        '--muted': '#78353d',
        '--faint': '#b26e78',
      },
      angle: 145
    },
    {
      id: 'riviera-blue',
      cat: 'sport',
      name: 'Azul Riviera',
      desc: 'Porsche Riviera & Bugatti',
      icon: '🔵',
      colors: {
        '--dark-soft': '#2563eb',
        '--ink': '#1d4ed8',
        '--dark': '#0f2b5c',
        '--muted': '#3b587d',
        '--faint': '#7392bc',
      },
      angle: 145
    },
    {
      id: 'papaya-orange',
      cat: 'sport',
      name: 'Naranja Papaya',
      desc: 'McLaren F1 & GT',
      icon: '🟠',
      colors: {
        '--dark-soft': '#ea580c',
        '--ink': '#c2410c',
        '--dark': '#6c2207',
        '--muted': '#7a442e',
        '--faint': '#b57a62',
      },
      angle: 145
    },
    {
      id: 'mamba-green',
      cat: 'sport',
      name: 'Verde Mamba',
      desc: 'AMG Green Hell & Porsche',
      icon: '🟢',
      colors: {
        '--dark-soft': '#16a34a',
        '--ink': '#15803d',
        '--dark': '#0a3d1c',
        '--muted': '#2f5c3e',
        '--faint': '#6d9c7d',
      },
      angle: 145
    },
    {
      id: 'giallo-speed',
      cat: 'sport',
      name: 'Amarillo Modena',
      desc: 'Lamborghini Giallo Corsa',
      icon: '🟡',
      colors: {
        '--dark-soft': '#d97706',
        '--ink': '#b45309',
        '--dark': '#522302',
        '--muted': '#714d2a',
        '--faint': '#ad865b',
      },
      angle: 145
    },
    {
      id: 'ultraviolet',
      cat: 'sport',
      name: 'Ultraviolet',
      desc: 'Porsche 991 GT3 RS',
      icon: '🟣',
      colors: {
        '--dark-soft': '#9333ea',
        '--ink': '#7e22ce',
        '--dark': '#3b0764',
        '--muted': '#5e387e',
        '--faint': '#9b73bd',
      },
      angle: 145
    },

    // --- 2. LUJO EJECUTIVO & GRAN TURISMO ---
    {
      id: 'royal-navy',
      cat: 'luxury',
      name: 'Azul Zafiro Real',
      desc: 'Rolls-Royce & Bentley Blue',
      icon: '🔷',
      colors: {
        '--dark-soft': '#1e40af',
        '--ink': '#1e3a8a',
        '--dark': '#0b1736',
        '--muted': '#384e72',
        '--faint': '#6e85aa',
      },
      angle: 145
    },
    {
      id: 'deep-wine',
      cat: 'luxury',
      name: 'Rojo Borgoña',
      desc: 'Vino tinto & Aston Martin',
      icon: '🍷',
      colors: {
        '--dark-soft': '#9f1239',
        '--ink': '#881337',
        '--dark': '#3f0414',
        '--muted': '#683443',
        '--faint': '#9f6777',
      },
      angle: 145
    },
    {
      id: 'british-racing',
      cat: 'luxury',
      name: 'Verde British',
      desc: 'Jaguar & Aston Martin Racing',
      icon: '🌲',
      colors: {
        '--dark-soft': '#047857',
        '--ink': '#065f46',
        '--dark': '#02291e',
        '--muted': '#274f41',
        '--faint': '#5f8779',
      },
      angle: 145
    },
    {
      id: 'habano-espresso',
      cat: 'luxury',
      name: 'Café Habano',
      desc: 'Cuero Bentley Mulliner',
      icon: '🟤',
      colors: {
        '--dark-soft': '#78350f',
        '--ink': '#602a0a',
        '--dark': '#2f1203',
        '--muted': '#5f4534',
        '--faint': '#927663',
      },
      angle: 145
    },
    {
      id: 'velvet-plum',
      cat: 'luxury',
      name: 'Ciruela Velvet',
      desc: 'Mercedes-Maybach Exclusivo',
      icon: '🔮',
      colors: {
        '--dark-soft': '#6b21a8',
        '--ink': '#581c87',
        '--dark': '#25053f',
        '--muted': '#523769',
        '--faint': '#886b9f',
      },
      angle: 145
    },
    {
      id: 'deep-teal',
      cat: 'luxury',
      name: 'Azul Petrol Teal',
      desc: 'Turquesa nórdico sobrio',
      icon: '💠',
      colors: {
        '--dark-soft': '#0e7490',
        '--ink': '#155e75',
        '--dark': '#082c37',
        '--muted': '#2e5864',
        '--faint': '#65919e',
      },
      angle: 145
    },

    // --- 3. MONOCROMÁTICO & METÁLICO ---
    {
      id: 'obsidian',
      cat: 'mono',
      name: 'Negro Obsidian',
      desc: 'Negro puro original & stealth',
      icon: '🖤',
      colors: {
        '--dark-soft': '#1a1a1a',
        '--ink': '#0d0d0d',
        '--dark': '#000000',
        '--muted': '#4d4d4d',
        '--faint': '#888888',
      },
      angle: 145
    },
    {
      id: 'gunmetal',
      cat: 'mono',
      name: 'Grafito Gunmetal',
      desc: 'Carbón y metal pulido',
      icon: '🔘',
      colors: {
        '--dark-soft': '#374151',
        '--ink': '#1f2937',
        '--dark': '#0a0e14',
        '--muted': '#4e5866',
        '--faint': '#8792a0',
      },
      angle: 145
    },
    {
      id: 'amg-titanium',
      cat: 'mono',
      name: 'Titanio AMG',
      desc: 'Gris noche azulado deportivo',
      icon: '🐺',
      colors: {
        '--dark-soft': '#334155',
        '--ink': '#1e293b',
        '--dark': '#080d16',
        '--muted': '#475569',
        '--faint': '#8392a5',
      },
      angle: 145
    },
    {
      id: 'silver-frost',
      cat: 'mono',
      name: 'Plata Glaciar',
      desc: 'Acero frío contemporáneo',
      icon: '❄️',
      colors: {
        '--dark-soft': '#4b5563',
        '--ink': '#29313d',
        '--dark': '#11161d',
        '--muted': '#546071',
        '--faint': '#8e99a8',
      },
      angle: 145
    },

    // --- 4. EXÓTICOS & HYPERCAR ---
    {
      id: 'acid-green',
      cat: 'neon',
      name: 'Verde Ácido 918',
      desc: 'Pinzas freno híbridas Porsche',
      icon: '⚡',
      colors: {
        '--dark-soft': '#65a30d',
        '--ink': '#4d7c0f',
        '--dark': '#1b3102',
        '--muted': '#4b632d',
        '--faint': '#839e62',
      },
      angle: 145
    },
    {
      id: 'ruby-star',
      cat: 'neon',
      name: 'Ruby Star Neo',
      desc: 'Rosa fucsia de competición',
      icon: '💖',
      colors: {
        '--dark-soft': '#e11d48',
        '--ink': '#be123c',
        '--dark': '#4c0519',
        '--muted': '#7a2b3f',
        '--faint': '#b76277',
      },
      angle: 145
    },
    {
      id: 'electric-cyan',
      cat: 'neon',
      name: 'Miami Cyan',
      desc: 'Porsche Miami Blue eléctrico',
      icon: '🌊',
      colors: {
        '--dark-soft': '#0284c7',
        '--ink': '#0369a1',
        '--dark': '#042c44',
        '--muted': '#2d566f',
        '--faint': '#6c98b2',
      },
      angle: 145
    },
    {
      id: 'liquid-copper',
      cat: 'neon',
      name: 'Cobre Líquido',
      desc: 'Bronce fundido supercar',
      icon: '🏜️',
      colors: {
        '--dark-soft': '#b45309',
        '--ink': '#92400e',
        '--dark': '#3a1703',
        '--muted': '#68452e',
        '--faint': '#a07b62',
      },
      angle: 145
    }
  ];

  let panel = null;
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
          position: fixed; top: 0; right: 0; bottom: 0; width: 345px; z-index: 99999;
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
        .evo-ce-section {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; color: #888; padding: 10px 0 6px;
          border-bottom: 1px solid #f0f0f0; margin-bottom: 8px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .evo-ce-section span.badge {
          font-size: 9px; font-weight: 600; text-transform: none; letter-spacing: 0;
          background: #eef2ff; color: #4338ca; padding: 2px 7px; border-radius: 6px;
        }
        .evo-ce-row {
          display: grid; grid-template-columns: 32px 1fr 80px; gap: 8px;
          align-items: center; padding: 4px 0;
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
          padding: 4px 8px; border-radius: 6px; border: 1px solid #e0e0e0;
          background: #fafafa; width: 80px; text-align: center; color: #333;
        }
        .evo-ce-hex:focus { outline: none; border-color: #999; background: #fff; }
        .evo-ce-slider-row {
          display: flex; align-items: center; gap: 8px; padding: 6px 0;
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
          height: 32px; border-radius: 10px; margin: 4px 0 10px;
          box-shadow: inset -10px -10px 20px 0px rgba(255,255,255,0.18), 0 2px 8px rgba(0,0,0,0.12);
          transition: background 0.2s ease;
        }

        /* Category Filter Tabs */
        .evo-ce-cats {
          display: flex; gap: 4px; overflow-x: auto; padding: 4px 0 8px;
          margin-bottom: 4px;
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

        /* Temas oscuros Grid */
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
          font-size: 11.5px; font-weight: 700; color: #111;
        }
        .evo-ce-theme-bar {
          height: 16px; border-radius: 6px; width: 100%;
          border: 1px solid rgba(0,0,0,0.1);
          box-shadow: inset -6px -6px 12px rgba(255,255,255,0.2);
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
          position: fixed; bottom: 20px; right: 360px; background: #111; color: #fff;
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

        <div class="evo-ce-section" style="margin-top:10px;">
          <span>Gradiente Botones</span>
        </div>
        <div class="evo-ce-slider-row">
          <label>Ángulo</label>
          <input type="range" min="0" max="360" value="145" id="evoCeAngle">
          <span id="evoCeAngleVal">145°</span>
        </div>
        <div class="evo-ce-grad-preview" id="evoCeGradPreview"></div>

        <div class="evo-ce-section" style="margin-top:8px;">
          <span>20 Temas de Color Reales</span>
          <span class="badge">1-Clic</span>
        </div>
        <p style="font-size:10.5px; color:#777; margin: 0 0 6px 0; line-height:1.35;">
          Elige un color real (rojo, azul, verde, naranja, etc.). Se actualiza la web entera al instante.
        </p>

        <!-- Category tabs -->
        <div class="evo-ce-cats">
          <button class="evo-ce-cat-btn active" data-cat="all">Todos (20)</button>
          <button class="evo-ce-cat-btn" data-cat="sport">Deportivos</button>
          <button class="evo-ce-cat-btn" data-cat="luxury">Lujo GT</button>
          <button class="evo-ce-cat-btn" data-cat="neon">Neón/Exóticos</button>
          <button class="evo-ce-cat-btn" data-cat="mono">Monocromo</button>
        </div>

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
    function renderThemes(cat) {
      themesContainer.innerHTML = '';
      const list = cat === 'all' ? DARK_THEMES : DARK_THEMES.filter(t => t.cat === cat);
      list.forEach((theme) => {
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
      toast(`✨ ${theme.icon} ${theme.name} aplicado`);
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
