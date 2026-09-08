# EVO MOVE — Plataforma Web

Sitio web corporativo y catálogo de **EVO MOVE** (Soluciones integrales 360° en automoción y comercio transfronterizo europeo con sede en Girona).

---

## 🚀 Despliegue y Build en Producción

El proyecto cuenta con un pipeline de compilación automatizado que procesa todos los recursos antes de publicarlos en Cloudflare Pages / Workers:

```bash
npm run build
```

### ¿Qué hace el build (`build.mjs`)?

1. **Ofuscación de JavaScript**:
   - Todos los scripts principales (`app.js`, `car.js`, `inventory.js`, `assets/motion.js`, etc.) se compilan mediante `javascript-obfuscator`.
   - Aplica aplanamiento de flujo de control (*control flow flattening*), codificación en base64 de cadenas de texto y nombres de identificadores hexadecimales para proteger la lógica de negocio y evitar que el código sea legible en producción.

2. **Minificación de HTML**:
   - Todos los archivos `.html` se comprimen con `html-minifier-terser`.
   - Se eliminan espacios en blanco superfluos, comentarios de desarrollo y se minifican scripts/estilos inline en una sola línea compacta.

3. **Minificación de CSS**:
   - El archivo principal `styles.css` se comprime y optimiza a través de `clean-css` (Nivel 2).

4. **Directorio de publicación (`dist/`)**:
   - El resultado empaquetado se deposita en la carpeta `dist/`.
   - Cloudflare Pages / Workers toma exclusivamente `./dist` como directorio de assets públicos según la configuración de `wrangler.jsonc`.

---

## 🎨 Sistema de Colores y Tokens CSS

Todos los colores del proyecto están unificados en variables nativas en el bloque `:root` de `styles.css`:

```css
:root {
  --bg: #f2f2f2;         /* Fondo global */
  --surface: #fafafa;    /* Tarjetas y superficies elevadas */
  --ink: #0d0d0d;        /* Color principal de textos y tinta */
  --dark: #000000;       /* Negro base absoluto */
  --dark-soft: #1a1a1a;  /* Negro suave para gradientes y contrastes */
  --muted: #4d4d4d;      /* Textos secundarios y subtítulos */
  --faint: #888888;      /* Metadatos y textos tenues */
  --line: #dcdcdc;       /* Separadores y bordes sutiles */
  
  /* Gradiente unificado para todos los botones oscuros */
  --grad-dark: linear-gradient(145deg, var(--dark-soft) 0%, var(--ink) 50%, var(--dark) 100%);
}
```

### Botones con Gradiente
Todos los elementos oscuros (`.btn-dark`, `.btn-chip-dark`, `.cutout-btn`, `.car-arrow`, `.testi-nav`, `.trade-submit-btn`) utilizan `--grad-dark` con un ángulo de 145°, lo que elimina el aspecto plano y aporta un degradado tridimensional de profundidad automotriz.

---

## 🛠️ Color Studio (Editor de Color Integrado)

La web incluye una herramienta oculta de retoque visual en tiempo real para calibrar los colores sin salir del navegador.

### Cómo abrirlo:
* **Atajo de teclado**: Pulsa `Ctrl + Shift + E` en cualquier página.
* **Vía URL**: Añade el parámetro `?dev` al final del enlace (ejemplo: `https://carana.maxsm.workers.dev/?dev`).

### Funcionalidades:
* **Selectores de color en vivo**: Modifica cualquier token con el selector de color o introduciendo el código hexadecimal.
* **Control de gradiente**: Ajusta el ángulo del degradado (0° a 360°) con previsualización inmediata.
* **20 Temas de Color Reales de 1-Clic**: Preserva tus tonos claros (fondo, superficie y líneas) y transforma completamente los botones, textos destacados y gradientes con colores vivos y de alto contraste inspirados en el mundo del automovilismo:
  * 🏎️ **Deportivos / GT Racing**:
    * 🔴 **Rojo Corsa**: Ferrari Rosso & Porsche GT3
    * 🔵 **Azul Riviera**: Porsche Riviera Blue & Bugatti
    * 🟠 **Naranja Papaya**: McLaren F1 Heritage
    * 🟢 **Verde Mamba**: AMG Green Hell & Porsche RS
    * 🟡 **Amarillo Modena**: Lamborghini Giallo Corsa
    * 🟣 **Ultraviolet**: Porsche 991 GT3 RS
  * 💎 **Lujo Ejecutivo & Gran Turismo**:
    * 🔷 **Azul Zafiro Real**: Rolls-Royce & Bentley Deep Blue
    * 🍷 **Rojo Borgoña**: Vino tinto & Aston Martin Minotaur
    * 🌲 **Verde British**: Jaguar & Aston Martin Racing Green
    * 🟤 **Café Habano**: Cuero Bentley Mulliner & Tabaco
    * 🔮 **Ciruela Velvet**: Mercedes-Maybach Exclusivo
    * 💠 **Azul Petrol Teal**: Turquesa nórdico sobrio
  * ⚡ **Exóticos & Hypercar**:
    * ⚡ **Verde Ácido 918**: Pinzas de freno híbridas Porsche 918
    * 💖 **Ruby Star Neo**: Rosa fucsia vibrante de competición
    * 🌊 **Miami Cyan**: Azul cian eléctrico estilo Miami Blue
    * 🏜️ **Cobre Líquido**: Bronce supercar fundido
  * 🖤 **Monocromáticos & Metal**:
    * 🖤 **Negro Obsidian**: Negro puro original & stealth
    * 🔘 **Grafito Gunmetal**: Carbón y metal pulido
    * 🐺 **Titanio AMG**: Gris noche azulado deportivo
    * ❄️ **Plata Glaciar**: Acero frío contemporáneo
* **Pestañas de filtrado**: Filtra por categoría ("Todos", "Deportivos", "Lujo GT", "Neón/Exóticos", "Monocromo").
* **📋 Copiar :root**: Genera y copia al portapapeles el bloque CSS listo para pegar en `styles.css`.
* **↩️ Reset**: Restablece los valores originales de la hoja de estilos.

---

## 💻 Desarrollo Local y Despliegue

### Requisitos
* Node.js v18 o superior
* npm

### Instalación
```bash
npm install
```

### Compilación local
```bash
npm run build
```

### Servidor de pruebas local
```bash
npm start
# o bien: node server.cjs
```

### Despliegue a Cloudflare
```bash
npx wrangler deploy
```
*(También se despliega automáticamente al hacer `git push origin main` gracias a la conexión con GitHub en Cloudflare Pages)*.
