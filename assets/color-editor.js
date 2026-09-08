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

  let panel = null;
  let gradAngle = 145;

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
    if (panel) { panel.style.display = panel.style.display === 'none' ? 'flex' : 'none'; return; }

    panel = document.createElement('div');
    panel.id = 'evo-color-editor';
    panel.innerHTML = `
      <style>
        #evo-color-editor {
          position: fixed; top: 0; right: 0; bottom: 0; width: 300px; z-index: 99999;
          background: rgba(255,255,255,0.97); backdrop-filter: blur(20px);
          border-left: 1px solid #ddd; box-shadow: -4px 0 30px rgba(0,0,0,0.1);
          display: flex; flex-direction: column; font-family: 'Space Grotesk', system-ui, sans-serif;
          transition: transform 0.3s cubic-bezier(.4,0,.2,1);
          overflow: hidden;
        }
        #evo-color-editor.evo-hidden { transform: translateX(100%); pointer-events: none; }
        .evo-ce-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px; border-bottom: 1px solid #e5e5e5;
        }
        .evo-ce-head h3 { font-size: 14px; font-weight: 700; margin: 0; color: #111; }
        .evo-ce-close {
          width: 28px; height: 28px; border-radius: 8px; border: 1px solid #ddd;
          background: #f5f5f5; cursor: pointer; display: grid; place-items: center;
          font-size: 14px; color: #666; transition: background 0.15s;
        }
        .evo-ce-close:hover { background: #eee; }
        .evo-ce-body { flex: 1; overflow-y: auto; padding: 10px 16px; }
        .evo-ce-section {
          font-size: 10px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; color: #999; padding: 12px 0 6px;
          border-bottom: 1px solid #f0f0f0; margin-bottom: 2px;
        }
        .evo-ce-row {
          display: grid; grid-template-columns: 32px 1fr 80px; gap: 8px;
          align-items: center; padding: 6px 0;
        }
        .evo-ce-swatch {
          width: 32px; height: 32px; border-radius: 8px; border: 2px solid #e0e0e0;
          cursor: pointer; position: relative; overflow: hidden;
        }
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
        .evo-ce-hex:focus { outline: none; border-color: #aaa; }
        .evo-ce-slider-row {
          display: flex; align-items: center; gap: 8px; padding: 8px 0;
        }
        .evo-ce-slider-row label { font-size: 12px; font-weight: 600; color: #333; width: 50px; }
        .evo-ce-slider-row input[type="range"] {
          flex: 1; height: 4px; -webkit-appearance: none; border-radius: 2px;
          background: linear-gradient(90deg, #ddd, #666);
        }
        .evo-ce-slider-row input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%;
          background: #fff; border: 2px solid #888; cursor: pointer;
        }
        .evo-ce-slider-row span { font-size: 11px; font-family: monospace; width: 32px; text-align: right; color: #555; }
        .evo-ce-grad-preview {
          height: 28px; border-radius: 8px; margin: 4px 0 8px;
          box-shadow: inset -10px -10px 20px 0px rgba(255,255,255,0.14);
        }
        .evo-ce-foot {
          display: flex; gap: 6px; padding: 12px 16px; border-top: 1px solid #e5e5e5;
          flex-wrap: wrap;
        }
        .evo-ce-btn {
          flex: 1; min-width: 80px; font-size: 11px; font-weight: 700; padding: 8px 0;
          border-radius: 8px; border: 1px solid #ddd; background: #f5f5f5;
          cursor: pointer; text-align: center; transition: background 0.15s; color: #333;
        }
        .evo-ce-btn:hover { background: #eaeaea; }
        .evo-ce-btn-dark { background: #111; color: #fff; border-color: #111; }
        .evo-ce-btn-dark:hover { background: #222; }
        .evo-ce-toast {
          position: fixed; bottom: 20px; right: 320px; background: #111; color: #fff;
          padding: 8px 18px; border-radius: 10px; font-size: 12px; font-weight: 600;
          opacity: 0; transition: opacity 0.2s; pointer-events: none; z-index: 100000;
          font-family: 'Space Grotesk', system-ui, sans-serif;
        }
        .evo-ce-toast.show { opacity: 1; }
      </style>

      <div class="evo-ce-head">
        <h3>🎨 Color Editor</h3>
        <button class="evo-ce-close" id="evoCeClose">✕</button>
      </div>
      <div class="evo-ce-body">
        <div class="evo-ce-section">Tokens</div>
        <div id="evoCeTokens"></div>
        <div class="evo-ce-section">Gradiente (--grad-dark)</div>
        <div class="evo-ce-slider-row">
          <label>Ángulo</label>
          <input type="range" min="0" max="360" value="145" id="evoCeAngle">
          <span id="evoCeAngleVal">145°</span>
        </div>
        <div class="evo-ce-grad-preview" id="evoCeGradPreview"></div>
      </div>
      <div class="evo-ce-foot">
        <button class="evo-ce-btn evo-ce-btn-dark" id="evoCeCopy">📋 Copiar :root</button>
        <button class="evo-ce-btn" id="evoCeReset">↩️ Reset</button>
      </div>
      <div class="evo-ce-toast" id="evoCeToast"></div>
    `;

    document.body.appendChild(panel);

    // Build token rows
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

      picker.addEventListener('input', (e) => {
        setVar(key, e.target.value);
        hex.value = e.target.value;
        swatch.style.background = e.target.value;
        updateGrad();
        updateGradPreview();
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
        }
      });
    });

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
      setTimeout(() => { panel.style.display = 'none'; panel.classList.remove('evo-hidden'); }, 300);
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
      toast('✅ :root copiado');
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
      toast('↩️ Reset completado');
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
    setTimeout(() => t.classList.remove('show'), 1800);
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
