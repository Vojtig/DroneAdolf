# Drone Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a one-page static (HTML/CSS/JS) advertising/portfolio website for drone video/photo services, in Czech, with a dark cinematic look.

**Architecture:** Single `index.html` with clearly separated, id-tagged sections; one `css/style.css` with CSS custom properties for theming; one `js/script.js` for the small set of interactive behaviors (hamburger menu, smooth scroll, lightbox, contact form submit). No build step, no framework, no backend. Deployed as-is via GitHub Pages.

**Tech Stack:** Vanilla HTML5, CSS3 (custom properties, flexbox/grid), vanilla JS (ES6+, no dependencies), Formspree for contact form submission, Google Fonts (Poppins + Inter) via `<link>`.

**Spec:** `docs/superpowers/specs/2026-08-17-drone-portfolio-website-design.md`

## Global Constraints

- No build tooling, no npm packages — plain files served as-is (per spec "Rozsah").
- Content language: Czech, real placeholder copy (not lorem ipsum) (per spec "Vizuální styl").
- Dark cinematic palette: dark background + single accent color (per spec "Vizuální styl").
- Mobile-first, responsive via flexbox/grid + media queries (per spec "Vizuální styl").
- Section markup must stay cleanly separable (clear `id`/class boundaries) to ease a future React port (per spec "Rozsah").
- Contact form posts to a Formspree endpoint via `fetch`, no page reload; endpoint is a placeholder (`YOUR_FORM_ID`) marked with a `// TODO` until the user supplies a real one (per spec "Otevřené otázky").
- No automated test suite — every task is verified by manual browser check (per spec "Testování / QA").

---

### Task 1: Project scaffold, base styles, header/nav, and section skeleton

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/script.js`
- Create: `assets/images/.gitkeep`
- Create: `assets/video/.gitkeep`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: HTML section skeleton with ids `#hero`, `#o-sluzbe`, `#portfolio`, `#cenik`, `#o-mne`, `#kontakt` that later tasks fill in. CSS custom properties (`--color-bg`, `--color-bg-alt`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-accent-dark`, `--font-heading`, `--font-body`, `--spacing-1` … `--spacing-6`, `--max-width`) that later tasks reuse. JS function `initNav()` wiring the hamburger toggle and smooth scroll, called on `DOMContentLoaded`.

- [ ] **Step 1: Create the base HTML document with header, nav, and empty section containers**

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DroneAdolf — Letecké video a foto z dronu</title>
  <meta name="description" content="Profesionální natáčení videí a focení fotek dronem. Svatby, nemovitosti, reklama, eventy — zachytíme to z výšky.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="site-header">
    <div class="site-header__inner">
      <a href="#hero" class="logo">Drone<span class="logo__accent">Adolf</span></a>
      <nav class="nav" id="nav">
        <ul class="nav__list" id="nav-list">
          <li><a href="#o-sluzbe" class="nav__link">O službě</a></li>
          <li><a href="#portfolio" class="nav__link">Portfolio</a></li>
          <li><a href="#cenik" class="nav__link">Ceník</a></li>
          <li><a href="#o-mne" class="nav__link">O mně</a></li>
          <li><a href="#kontakt" class="nav__link nav__link--cta">Kontakt</a></li>
        </ul>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="Otevřít menu" aria-expanded="false" aria-controls="nav-list">
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
      </button>
    </div>
  </header>

  <main>
    <section id="hero" class="section hero"></section>
    <section id="o-sluzbe" class="section o-sluzbe"></section>
    <section id="portfolio" class="section portfolio"></section>
    <section id="cenik" class="section cenik"></section>
    <section id="o-mne" class="section o-mne"></section>
    <section id="kontakt" class="section kontakt"></section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 DroneAdolf. Všechna práva vyhrazena.</p>
  </footer>

  <script src="js/script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create the base CSS with reset, variables, and header/nav styles**

Create `css/style.css`:

```css
/* ---------- Reset & base ---------- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
img, video { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }
button { font: inherit; cursor: pointer; border: none; background: none; color: inherit; }

/* ---------- Design tokens ---------- */
:root {
  --color-bg: #0d0d0d;
  --color-bg-alt: #161616;
  --color-bg-card: #1e1e1e;
  --color-text: #f2f2f2;
  --color-text-muted: #b3b3b3;
  --color-accent: #ff8c00;
  --color-accent-dark: #cc7000;
  --color-border: #2b2b2b;

  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;

  --spacing-1: 0.5rem;
  --spacing-2: 1rem;
  --spacing-3: 1.5rem;
  --spacing-4: 2.5rem;
  --spacing-5: 4rem;
  --spacing-6: 6rem;

  --max-width: 1200px;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  line-height: 1.6;
}

h1, h2, h3 {
  font-family: var(--font-heading);
  line-height: 1.2;
}

.section {
  padding: var(--spacing-6) var(--spacing-3);
}

.section__inner {
  max-width: var(--max-width);
  margin: 0 auto;
}

.btn {
  display: inline-block;
  padding: var(--spacing-2) var(--spacing-4);
  background: var(--color-accent);
  color: #0d0d0d;
  font-family: var(--font-heading);
  font-weight: 700;
  border-radius: 4px;
  transition: background 0.2s ease, transform 0.2s ease;
}

.btn:hover {
  background: var(--color-accent-dark);
  transform: translateY(-2px);
}

/* ---------- Header / Nav ---------- */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(13, 13, 13, 0.85);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid var(--color-border);
}

.site-header__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-2) var(--spacing-3);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: 0.02em;
}

.logo__accent { color: var(--color-accent); }

.nav__list {
  display: flex;
  gap: var(--spacing-4);
}

.nav__link {
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav__link:hover { color: var(--color-accent); }

.nav__link--cta {
  background: var(--color-accent);
  color: #0d0d0d;
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: 4px;
  font-weight: 600;
}

.nav__link--cta:hover { background: var(--color-accent-dark); color: #0d0d0d; }

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: var(--spacing-1);
}

.hamburger__bar {
  width: 24px;
  height: 2px;
  background: var(--color-text);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.hamburger.is-open .hamburger__bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.is-open .hamburger__bar:nth-child(2) { opacity: 0; }
.hamburger.is-open .hamburger__bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 768px) {
  .hamburger { display: flex; }

  .nav {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: var(--color-bg-alt);
    border-bottom: 1px solid var(--color-border);
    transform: translateY(-150%);
    transition: transform 0.25s ease;
  }

  .nav.is-open { transform: translateY(0); }

  .nav__list {
    flex-direction: column;
    gap: 0;
    padding: var(--spacing-2) var(--spacing-3);
  }

  .nav__list li { border-bottom: 1px solid var(--color-border); }
  .nav__list li:last-child { border-bottom: none; }

  .nav__link {
    display: block;
    padding: var(--spacing-2) 0;
  }

  .nav__link--cta {
    display: inline-block;
    margin: var(--spacing-2) 0;
  }
}

/* ---------- Footer ---------- */
.site-footer {
  padding: var(--spacing-3);
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  border-top: 1px solid var(--color-border);
}
```

- [ ] **Step 3: Create the nav JS (hamburger toggle)**

Create `js/script.js`:

```js
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
});
```

- [ ] **Step 4: Add placeholder asset folders**

```bash
mkdir -p assets/images assets/video
touch assets/images/.gitkeep assets/video/.gitkeep
```

- [ ] **Step 5: Manually verify in browser**

Open `index.html` directly in a browser (or `python3 -m http.server` from the
project root and visit `http://localhost:8000`).

Expected:
- Header with logo "DroneAdolf" and nav links is visible and fixed to top.
- Empty sections are present (no visible content yet — that's expected,
  they're filled in later tasks).
- Resize the browser to under 768px width (or open DevTools device mode):
  nav links disappear, hamburger icon appears.
- Click the hamburger: the nav menu slides down, icon animates into an X.
- Click a nav link: menu closes.

- [ ] **Step 6: Commit**

```bash
git add index.html css/style.css js/script.js assets/images/.gitkeep assets/video/.gitkeep
git commit -m "Add site scaffold: header, nav, section skeleton, base styles"
```

---

### Task 2: Hero section

**Files:**
- Modify: `index.html` (`#hero` section, currently empty)
- Modify: `css/style.css` (append `.hero` rules)

**Interfaces:**
- Consumes: `.section`, `.btn`, CSS tokens from Task 1.
- Produces: `.hero__cta` anchor link to `#kontakt` (already handled by the
  smooth-scroll-via-native-`scroll-behavior` set in Task 1's `html { scroll-behavior: smooth; }` —
  no extra JS needed for anchor scrolling).

- [ ] **Step 1: Fill in the Hero section markup**

Replace `<section id="hero" class="section hero"></section>` in `index.html` with:

```html
<section id="hero" class="section hero">
  <div class="hero__overlay"></div>
  <div class="hero__content">
    <h1 class="hero__title">Váš svět z<br>ptačí perspektivy</h1>
    <p class="hero__subtitle">Profesionální letecké video a foto z dronu — svatby, nemovitosti, eventy i reklama.</p>
    <a href="#kontakt" class="btn hero__cta">Nezávazná poptávka</a>
  </div>
</section>
```

- [ ] **Step 2: Style the Hero section**

Append to `css/style.css`:

```css
/* ---------- Hero ---------- */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 var(--spacing-3);
  background: radial-gradient(circle at 50% 30%, var(--color-bg-alt), var(--color-bg) 70%);
  overflow: hidden;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(13,13,13,0.2) 0%, rgba(13,13,13,0.85) 100%);
  pointer-events: none;
}

.hero__content {
  position: relative;
  z-index: 1;
  max-width: 700px;
}

.hero__title {
  font-size: clamp(2.25rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: var(--spacing-3);
}

.hero__subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-4);
}

.hero__cta { font-size: 1.1rem; }
```

- [ ] **Step 3: Manually verify in browser**

Reload `index.html`.

Expected:
- Hero fills the full viewport height, headline and subtitle centered.
- "Nezávazná poptávka" button is visible with the accent color.
- Clicking the button smooth-scrolls down to the (still empty) Kontakt
  section at the bottom of the page.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add hero section"
```

---

### Task 3: O službě section

**Files:**
- Modify: `index.html` (`#o-sluzbe` section)
- Modify: `css/style.css` (append `.o-sluzbe` rules)

**Interfaces:**
- Consumes: `.section`, CSS tokens from Task 1.
- Produces: nothing consumed by later tasks (self-contained content section).

- [ ] **Step 1: Fill in the O službě section markup**

Replace `<section id="o-sluzbe" class="section o-sluzbe"></section>` in
`index.html` with:

```html
<section id="o-sluzbe" class="section o-sluzbe">
  <div class="section__inner">
    <h2 class="section__title">O službě</h2>
    <p class="o-sluzbe__lead">
      Nabízím profesionální letecké natáčení a fotografování dronem
      DJI s certifikací pro provoz v ČR. Ať už potřebujete zachytit
      svatbu z výšky, prezentovat nemovitost, nebo natočit reklamní
      spot — postarám se o kompletní realizaci od plánování letu až
      po finální střih.
    </p>
    <div class="o-sluzbe__grid">
      <div class="o-sluzbe__item">
        <h3>Letecké video</h3>
        <p>4K záběry, dynamické průlety, profesionální střih a barevné korekce.</p>
      </div>
      <div class="o-sluzbe__item">
        <h3>Letecké foto</h3>
        <p>Vysoké rozlišení, HDR, panoramata — ideální pro nemovitosti a eventy.</p>
      </div>
      <div class="o-sluzbe__item">
        <h3>Mapování a inspekce</h3>
        <p>Ortofotomapy, 3D modely a inspekce staveb, střech a pozemků z výšky.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Style the O službě section**

Append to `css/style.css`:

```css
/* ---------- Section title (shared) ---------- */
.section__title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin-bottom: var(--spacing-4);
  text-align: center;
}

/* ---------- O službě ---------- */
.o-sluzbe { background: var(--color-bg-alt); }

.o-sluzbe__lead {
  max-width: 700px;
  margin: 0 auto var(--spacing-5);
  text-align: center;
  color: var(--color-text-muted);
}

.o-sluzbe__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--spacing-4);
}

.o-sluzbe__item {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: var(--spacing-3);
}

.o-sluzbe__item h3 {
  color: var(--color-accent);
  margin-bottom: var(--spacing-1);
  font-size: 1.1rem;
}

.o-sluzbe__item p { color: var(--color-text-muted); }
```

- [ ] **Step 3: Manually verify in browser**

Reload `index.html`, scroll to "O službě".

Expected:
- Section has a slightly lighter background than Hero.
- Three cards (Letecké video / Letecké foto / Mapování a inspekce)
  display side-by-side on desktop and stack on narrow viewports.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add O sluzbe section"
```

---

### Task 4: Portfolio/Galerie section with lightbox

**Files:**
- Modify: `index.html` (`#portfolio` section)
- Modify: `css/style.css` (append `.portfolio` and `.lightbox` rules)
- Modify: `js/script.js` (add `initLightbox()`)
- Create: `assets/images/placeholder-01.svg` … `assets/images/placeholder-06.svg`

**Interfaces:**
- Consumes: `.section`, CSS tokens from Task 1.
- Produces: `initLightbox()` function, called from the same
  `DOMContentLoaded` listener as `initNav()`.

- [ ] **Step 1: Create six placeholder gallery images**

Create `assets/images/placeholder-01.svg` (repeat for 02–06, changing only
the number in the text so each thumbnail is visually distinct):

```html
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#241a0d"/>
  <rect width="800" height="600" fill="none" stroke="#ff8c00" stroke-width="4" stroke-dasharray="12 10"/>
  <text x="400" y="290" font-family="sans-serif" font-size="28" fill="#ff8c00" text-anchor="middle">Ukázka záběru 01</text>
  <text x="400" y="330" font-family="sans-serif" font-size="16" fill="#b3b3b3" text-anchor="middle">placeholder — nahraďte vlastní fotkou</text>
</svg>
```

Create the remaining five files identically but with `02`, `03`, `04`,
`05`, `06` in place of `01` in both the filename and the `Ukázka záběru 0N`
text.

- [ ] **Step 2: Fill in the Portfolio section markup**

Replace `<section id="portfolio" class="section portfolio"></section>` in
`index.html` with:

```html
<section id="portfolio" class="section portfolio">
  <div class="section__inner">
    <h2 class="section__title">Portfolio</h2>
    <div class="portfolio__grid" id="portfolio-grid">
      <button class="portfolio__item" data-full="assets/images/placeholder-01.svg">
        <img src="assets/images/placeholder-01.svg" alt="Ukázka leteckého záběru 01" loading="lazy">
      </button>
      <button class="portfolio__item" data-full="assets/images/placeholder-02.svg">
        <img src="assets/images/placeholder-02.svg" alt="Ukázka leteckého záběru 02" loading="lazy">
      </button>
      <button class="portfolio__item" data-full="assets/images/placeholder-03.svg">
        <img src="assets/images/placeholder-03.svg" alt="Ukázka leteckého záběru 03" loading="lazy">
      </button>
      <button class="portfolio__item" data-full="assets/images/placeholder-04.svg">
        <img src="assets/images/placeholder-04.svg" alt="Ukázka leteckého záběru 04" loading="lazy">
      </button>
      <button class="portfolio__item" data-full="assets/images/placeholder-05.svg">
        <img src="assets/images/placeholder-05.svg" alt="Ukázka leteckého záběru 05" loading="lazy">
      </button>
      <button class="portfolio__item" data-full="assets/images/placeholder-06.svg">
        <img src="assets/images/placeholder-06.svg" alt="Ukázka leteckého záběru 06" loading="lazy">
      </button>
    </div>
  </div>
</section>

<div class="lightbox" id="lightbox" hidden>
  <button class="lightbox__close" id="lightbox-close" aria-label="Zavřít">&times;</button>
  <img class="lightbox__image" id="lightbox-image" src="" alt="">
</div>
```

- [ ] **Step 3: Style the Portfolio and lightbox**

Append to `css/style.css`:

```css
/* ---------- Portfolio ---------- */
.portfolio__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--spacing-3);
}

.portfolio__item {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  aspect-ratio: 4 / 3;
  transition: transform 0.2s ease;
}

.portfolio__item:hover { transform: scale(1.03); }

.portfolio__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ---------- Lightbox ---------- */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4);
}

.lightbox[hidden] { display: none; }

.lightbox__image {
  max-width: 90vw;
  max-height: 85vh;
  border-radius: 4px;
}

.lightbox__close {
  position: absolute;
  top: var(--spacing-3);
  right: var(--spacing-3);
  font-size: 2rem;
  color: var(--color-text);
  line-height: 1;
}
```

- [ ] **Step 4: Add the lightbox JS**

In `js/script.js`, add the `initLightbox` function and call it:

```js
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const closeBtn = document.getElementById('lightbox-close');
  const items = document.querySelectorAll('.portfolio__item');

  function open(src, alt) {
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.hidden = false;
  }

  function close() {
    lightbox.hidden = true;
    lightboxImage.src = '';
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      open(item.dataset.full, img.alt);
    });
  });

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) close();
  });
}
```

Update the `DOMContentLoaded` listener at the bottom of `js/script.js` to:

```js
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initLightbox();
});
```

- [ ] **Step 5: Manually verify in browser**

Reload `index.html`, scroll to "Portfolio".

Expected:
- Six placeholder thumbnails in a responsive grid.
- Clicking a thumbnail opens a fullscreen dark lightbox with the enlarged
  image.
- Clicking the `×` button, clicking outside the image, or pressing `Escape`
  closes the lightbox.

- [ ] **Step 6: Commit**

```bash
git add index.html css/style.css js/script.js assets/images/placeholder-*.svg
git commit -m "Add portfolio gallery with lightbox"
```

---

### Task 5: Služby a ceník section

**Files:**
- Modify: `index.html` (`#cenik` section)
- Modify: `css/style.css` (append `.cenik` rules)

**Interfaces:**
- Consumes: `.section`, `.btn`, CSS tokens from Task 1.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Fill in the Ceník section markup**

Replace `<section id="cenik" class="section cenik"></section>` in
`index.html` with:

```html
<section id="cenik" class="section cenik">
  <div class="section__inner">
    <h2 class="section__title">Služby a ceník</h2>
    <div class="cenik__grid">
      <div class="cenik__card">
        <h3>Základní</h3>
        <p class="cenik__price">od 2 500 Kč</p>
        <ul class="cenik__list">
          <li>Až 30 minut letu</li>
          <li>10 upravených fotek</li>
          <li>Předání do 3 dnů</li>
        </ul>
        <a href="#kontakt" class="btn cenik__cta">Poptat</a>
      </div>
      <div class="cenik__card cenik__card--featured">
        <p class="cenik__badge">Nejoblíbenější</p>
        <h3>Střední</h3>
        <p class="cenik__price">od 5 900 Kč</p>
        <ul class="cenik__list">
          <li>Až 1 hodina letu</li>
          <li>Video do 3 minut + 20 fotek</li>
          <li>Barevné korekce a hudba</li>
          <li>Předání do 5 dnů</li>
        </ul>
        <a href="#kontakt" class="btn cenik__cta">Poptat</a>
      </div>
      <div class="cenik__card">
        <h3>Prémium</h3>
        <p class="cenik__price">od 12 900 Kč</p>
        <ul class="cenik__list">
          <li>Celodenní natáčení</li>
          <li>Video do 10 minut + 40 fotek</li>
          <li>Kompletní postprodukce</li>
          <li>Předání do 10 dnů</li>
        </ul>
        <a href="#kontakt" class="btn cenik__cta">Poptat</a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Style the Ceník section**

Append to `css/style.css`:

```css
/* ---------- Ceník ---------- */
.cenik { background: var(--color-bg-alt); }

.cenik__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--spacing-4);
  align-items: stretch;
}

.cenik__card {
  position: relative;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: var(--spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.cenik__card--featured {
  border-color: var(--color-accent);
  transform: scale(1.03);
}

.cenik__badge {
  position: absolute;
  top: -12px;
  left: var(--spacing-3);
  background: var(--color-accent);
  color: #0d0d0d;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 999px;
}

.cenik__price {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--color-accent);
}

.cenik__list {
  flex: 1;
  color: var(--color-text-muted);
}

.cenik__list li {
  padding: var(--spacing-1) 0;
  border-bottom: 1px solid var(--color-border);
}

.cenik__list li:last-child { border-bottom: none; }

.cenik__cta { text-align: center; }
```

- [ ] **Step 3: Manually verify in browser**

Reload `index.html`, scroll to "Služby a ceník".

Expected:
- Three pricing cards, middle one ("Střední") visually highlighted with
  an accent border and a "Nejoblíbenější" badge.
- Each card's "Poptat" button smooth-scrolls to the Kontakt section.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add sluzby a cenik section"
```

---

### Task 6: Reference/O mně section

**Files:**
- Modify: `index.html` (`#o-mne` section)
- Modify: `css/style.css` (append `.o-mne` rules)

**Interfaces:**
- Consumes: `.section`, CSS tokens from Task 1.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Fill in the O mně section markup**

Replace `<section id="o-mne" class="section o-mne"></section>` in
`index.html` with:

```html
<section id="o-mne" class="section o-mne">
  <div class="section__inner">
    <h2 class="section__title">O mně</h2>
    <p class="o-mne__bio">
      Jmenuji se Adolf a dronům se věnuji posledních 5 let. Mám za sebou
      desítky svatebních, komerčních i realitních zakázek po celé ČR.
      Létám s certifikací UAS a pojištěním odpovědnosti, takže se
      můžete spolehnout na bezpečné a profesionální provedení.
    </p>
    <div class="o-mne__refs">
      <blockquote class="o-mne__ref">
        <p>"Záběry z naší svatby předčily očekávání, moc děkujeme!"</p>
        <cite>— Petra a Jakub</cite>
      </blockquote>
      <blockquote class="o-mne__ref">
        <p>"Rychlé, profesionální a fotky prodaly nemovitost během týdne."</p>
        <cite>— Realitní kancelář Nova</cite>
      </blockquote>
      <blockquote class="o-mne__ref">
        <p>"Skvělá komunikace a naprosto spolehlivá práce."</p>
        <cite>— Firma Eventix</cite>
      </blockquote>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Style the O mně section**

Append to `css/style.css`:

```css
/* ---------- O mně ---------- */
.o-mne__bio {
  max-width: 700px;
  margin: 0 auto var(--spacing-5);
  text-align: center;
  color: var(--color-text-muted);
}

.o-mne__refs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--spacing-4);
}

.o-mne__ref {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-accent);
  border-radius: 8px;
  padding: var(--spacing-3);
}

.o-mne__ref p { font-style: italic; margin-bottom: var(--spacing-1); }
.o-mne__ref cite { color: var(--color-text-muted); font-size: 0.9rem; }
```

- [ ] **Step 3: Manually verify in browser**

Reload `index.html`, scroll to "O mně".

Expected:
- Bio paragraph centered above three reference quote cards.
- Cards have a left accent border and stack responsively.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add o mne section with references"
```

---

### Task 7: Kontakt section with Formspree-backed form

**Files:**
- Modify: `index.html` (`#kontakt` section)
- Modify: `css/style.css` (append `.kontakt` rules)
- Modify: `js/script.js` (add `initContactForm()`)

**Interfaces:**
- Consumes: `.section`, `.btn`, CSS tokens from Task 1.
- Produces: nothing consumed by later tasks (final content section).

- [ ] **Step 1: Fill in the Kontakt section markup**

Replace `<section id="kontakt" class="section kontakt"></section>` in
`index.html` with:

```html
<section id="kontakt" class="section kontakt">
  <div class="section__inner kontakt__inner">
    <div class="kontakt__info">
      <h2 class="section__title kontakt__title">Kontakt</h2>
      <p>Máte zájem o natáčení nebo focení dronem? Napište mi nebo
      zavolejte — ozvu se do 24 hodin.</p>
      <ul class="kontakt__details">
        <li>📞 <a href="tel:+420777123456">+420 777 123 456</a></li>
        <li>✉️ <a href="mailto:info@droneadolf.cz">info@droneadolf.cz</a></li>
        <li>📍 Působím po celé ČR</li>
      </ul>
    </div>
    <form class="kontakt__form" id="contact-form">
      <label for="name">Jméno</label>
      <input type="text" id="name" name="name" required>

      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>

      <label for="phone">Telefon</label>
      <input type="tel" id="phone" name="phone">

      <label for="message">Zpráva</label>
      <textarea id="message" name="message" rows="4" required></textarea>

      <button type="submit" class="btn kontakt__submit">Odeslat poptávku</button>
      <p class="kontakt__status" id="form-status" role="status"></p>
    </form>
  </div>
</section>
```

- [ ] **Step 2: Style the Kontakt section**

Append to `css/style.css`:

```css
/* ---------- Kontakt ---------- */
.kontakt { background: var(--color-bg-alt); }

.kontakt__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-5);
}

.kontakt__title { text-align: left; }

.kontakt__details {
  margin-top: var(--spacing-3);
  color: var(--color-text-muted);
}

.kontakt__details li { padding: var(--spacing-1) 0; }
.kontakt__details a:hover { color: var(--color-accent); }

.kontakt__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.kontakt__form label {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-top: var(--spacing-2);
}

.kontakt__form input,
.kontakt__form textarea {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: var(--spacing-2);
  color: var(--color-text);
  font-family: var(--font-body);
}

.kontakt__form input:focus,
.kontakt__form textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}

.kontakt__submit {
  margin-top: var(--spacing-3);
  align-self: flex-start;
}

.kontakt__status {
  min-height: 1.5em;
  font-size: 0.9rem;
}

.kontakt__status--success { color: #4caf50; }
.kontakt__status--error { color: #e05555; }

@media (max-width: 768px) {
  .kontakt__inner {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Add the contact form JS**

In `js/script.js`, add the `initContactForm` function:

```js
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  // TODO: replace YOUR_FORM_ID with the real Formspree form id
  // (create a form at https://formspree.io and copy its endpoint here).
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Odesílám…';
    status.className = 'kontakt__status';

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
      });

      if (response.ok) {
        status.textContent = 'Děkuji, poptávka byla odeslána!';
        status.className = 'kontakt__status kontakt__status--success';
        form.reset();
      } else {
        status.textContent = 'Odeslání se nezdařilo, zkuste to prosím znovu.';
        status.className = 'kontakt__status kontakt__status--error';
      }
    } catch (err) {
      status.textContent = 'Odeslání se nezdařilo, zkontrolujte připojení.';
      status.className = 'kontakt__status kontakt__status--error';
    }
  });
}
```

Update the `DOMContentLoaded` listener at the bottom of `js/script.js` to:

```js
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initLightbox();
  initContactForm();
});
```

- [ ] **Step 4: Manually verify in browser**

Reload `index.html`, scroll to "Kontakt".

Expected:
- Two-column layout on desktop (contact info left, form right), single
  column stacked on mobile widths.
- Filling the form and clicking "Odeslat poptávku" shows "Odesílám…" then
  either a success or an error message below the button (the placeholder
  `YOUR_FORM_ID` endpoint will return an error until a real Formspree
  form id is configured — confirm the error path displays correctly,
  e.g. "Odeslání se nezdařilo, zkuste to prosím znovu.").
- Required fields (Jméno, Email, Zpráva) block submission via native HTML5
  validation when left empty.

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css js/script.js
git commit -m "Add kontakt section with Formspree contact form"
```

---

### Task 8: Footer styling, full responsive pass, and accessibility check

**Files:**
- Modify: `css/style.css` (append final polish rules)

**Interfaces:**
- Consumes: all CSS tokens and classes from Tasks 1–7.
- Produces: nothing (final polish task).

- [ ] **Step 1: Add footer spacing fix for the fixed header**

The fixed header overlaps the top of `#hero` on load. Append to
`css/style.css`:

```css
/* ---------- Global polish ---------- */
html { scroll-padding-top: 70px; }

::selection {
  background: var(--color-accent);
  color: #0d0d0d;
}

body::-webkit-scrollbar { width: 10px; }
body::-webkit-scrollbar-track { background: var(--color-bg); }
body::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 5px;
}
```

- [ ] **Step 2: Manually verify full page across breakpoints**

Open `index.html` in the browser with DevTools responsive mode. Check at
these widths: 375px (mobile), 768px (tablet), 1440px (desktop).

Expected at each width:
- No horizontal scrollbar / overflow.
- Clicking any nav link scrolls to the section with the header no longer
  covering the section title (verifies `scroll-padding-top`).
- Text remains readable (sufficient contrast against dark backgrounds —
  body text uses `--color-text` `#f2f2f2` or `--color-text-muted` `#b3b3b3`
  against `--color-bg` `#0d0d0d` / `--color-bg-alt` `#161616`, both well
  above WCAG AA contrast for normal text).
- All six sections (Hero, O službě, Portfolio, Ceník, O mně, Kontakt) plus
  the footer are visible in the expected order when scrolling top to
  bottom.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "Polish: scroll offset, selection color, scrollbar styling"
```

---

### Task 9: Deploy to GitHub Pages

**Files:**
- Create: `.nojekyll`
- Modify: none (push existing files)

**Interfaces:**
- Consumes: the complete site from Tasks 1–8.
- Produces: a live public URL (documented, not consumed by other tasks).

- [ ] **Step 1: Add a `.nojekyll` file**

GitHub Pages runs content through Jekyll by default, which ignores files/
folders starting with `_` and can interfere with plain static sites.
Adding an empty `.nojekyll` file disables that processing.

```bash
touch /mnt/c/Users/mipul/Desktop/DroneAdolf/.nojekyll
```

- [ ] **Step 2: Commit and push**

```bash
git add .nojekyll
git commit -m "Add .nojekyll for GitHub Pages static serving"
git push origin main
```

- [ ] **Step 3: Enable GitHub Pages (manual, one-time step for the repo owner)**

This changes repository settings on GitHub and should be done by the repo
owner directly on github.com, not automated:

1. Go to `https://github.com/Vojtig/DroneAdolf/settings/pages`.
2. Under "Build and deployment" → "Source", select "Deploy from a branch".
3. Under "Branch", select `main` and folder `/ (root)`, then click "Save".
4. Wait ~1 minute, then the page will show the live URL (typically
   `https://vojtig.github.io/DroneAdolf/`).

- [ ] **Step 4: Verify the live site**

Visit the published URL and confirm the page loads with all sections,
matching what was verified locally in Tasks 1–8.

---

## Follow-ups (not part of this plan)

- Replace the placeholder Formspree endpoint (`YOUR_FORM_ID` in
  `js/script.js`) with a real form id once the user creates a Formspree
  account.
- Replace placeholder gallery SVGs (`assets/images/placeholder-*.svg`) and
  hero background with real drone photo/video material.
- Replace placeholder contact details (phone, email) in the Kontakt
  section with real ones.
