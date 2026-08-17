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

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const closeBtn = document.getElementById('lightbox-close');
  const items = document.querySelectorAll('.portfolio__item');
  let triggeringElement = null;

  function open(src, alt) {
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.hidden = false;
    // Move focus to close button
    closeBtn.focus();
  }

  function close() {
    lightbox.hidden = true;
    lightboxImage.src = '';
    // Restore focus to the element that triggered the open
    if (triggeringElement) {
      triggeringElement.focus();
    }
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      // Store the element that triggered the open
      triggeringElement = item;
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

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    toggle.setAttribute('aria-pressed', String(theme === 'light'));
    toggle.setAttribute(
      'aria-label',
      theme === 'light' ? 'Přepnout na tmavý režim' : 'Přepnout na světlý režim'
    );
  }

  const stored = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(stored || (prefersLight ? 'light' : 'dark'));

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initLightbox();
  initContactForm();
  initThemeToggle();
});
