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
* **Temas Oscuros de 1-Clic**: Preserva tus tonos claros (fondo, superficie y líneas) y cambia al instante los tonos negros y gradientes con variantes de lujo automovilístico:
  * 🖤 **Negro Obsidian**: El contraste puro y sigiloso original.
  * 🔵 **Azul Midnight**: Azul noche alpino de alta gama.
  * 🔴 **Rojo Carmine**: Tono burdeos profundo y fibra deportiva.
  * 🟢 **Verde British**: Verde clásico de competición (estilo Aston Martin).
  * 🟣 **Púrpura Imperial**: Amatista oscura y exótica.
  * 🔘 **Grafito Titanio**: Estética de metal carbón e industrial.
  * 🟤 **Café Espresso**: Cuero tostado y bronce sobrio.
  * 🟠 **Cobre Solar**: Ámbar cálido y cobre oscuro.
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
