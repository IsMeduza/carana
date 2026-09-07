// ============ LENIS SMOOTH SCROLL ============
let lenis = null;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// ============ HERO ENTRANCE & SCROLL PARALLAX ============
const heroBg = document.querySelector('.hero-bg');
const heroContent = document.querySelector('.hero-content');
const heroFrame = document.querySelector('.hero-frame');

// Trigger coordinated Framer-style entrance on load / F5
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.documentElement.classList.add('loaded');
    }, 50);
  });
});

let isInitialEntranceDone = false;
setTimeout(() => {
  isInitialEntranceDone = true;
  if (heroBg) {
    heroBg.style.transition = 'none'; // remove 1.6s transition so scroll parallax is immediate
  }
}, 1650);

function updateHeroParallax() {
  const scrollY = window.scrollY || window.pageYOffset;
  const heroH = heroFrame ? heroFrame.offsetHeight : window.innerHeight;

  if (scrollY <= heroH + 150) {
    const progress = Math.min(1, Math.max(0, scrollY / heroH));

    if (heroBg && (scrollY > 0 || isInitialEntranceDone)) {
      // Parallax: background drifts down and subtly zooms on scroll
      const translateY = scrollY * 0.32;
      const scale = 1.0 + progress * 0.04;
      heroBg.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    }

    if (heroContent) {
      // Content gently floats up and fades as you scroll past
      const opacity = Math.max(0, 1 - progress * 1.35);
      const translateY = -scrollY * 0.16;
      heroContent.style.opacity = opacity;
      heroContent.style.transform = `translate3d(0, ${translateY}px, 0)`;
    }
  }
}

window.addEventListener('scroll', updateHeroParallax, { passive: true });
if (lenis) {
  lenis.on('scroll', updateHeroParallax);
}

// ============ STAGGERED SCROLL REVEAL (FRAMER STYLE) ============
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal-head, .reveal-card').forEach(el => {
  revealObserver.observe(el);
});

// ============ FAQ ACCORDION ============
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ============ MOBILE NAVIGATION ============
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ============ REPLICATED SEARCH COMPONENT ============
const inventory = [
  { name: 'Veltora Seryn', id: 'veltora-seryn' },
  { name: 'Krynox ZR-9', id: 'krynox-zr-9' },
  { name: 'Dreznak Karov', id: 'dreznak-karov' },
  { name: 'Zethrux Infernum', id: 'zethrux-infernum' },
  { name: 'Emblora Wyndcroft', id: 'emblora-wyndcroft' },
  { name: 'Aurvane Celeste', id: 'aurvane-celeste' },
  { name: 'Soliven Brisa', id: 'soliven-brisa' },
  { name: 'Pharyx Full', id: 'pharyx-full' },
];

const searchWrap = document.getElementById('searchWrap');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchDropdown = document.getElementById('searchDropdown');
const searchResultsList = document.getElementById('searchResultsList');

const returnArrowSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M 19.75 18.219 C 19.75 15.867 19.75 14.692 19.367 13.764 C 18.853 12.522 17.866 11.535 16.624 11.021 C 15.696 10.638 14.521 10.638 12.169 10.638 L 3.871 10.638 M 8.107 5.781 L 4.31 9.577 C 4.017 9.87 3.87 10.254 3.87 10.638 M 8.106 15.495 L 4.31 11.699 C 4.028 11.418 3.87 11.036 3.87 10.638"/>
</svg>`;

function renderSearchResults(items) {
  if (!items || items.length === 0) {
    searchResultsList.innerHTML = `<div style="padding: 8px 10px; font-size: 14px; color: #888;">No se encontraron resultados</div>`;
    return;
  }
  searchResultsList.innerHTML = items.map(car => `
    <a class="search-item" href="#featured" data-name="${car.name}">
      ${returnArrowSvg}
      <span>${car.name}</span>
    </a>
  `).join('');

  searchResultsList.querySelectorAll('.search-item').forEach(item => {
    item.addEventListener('click', (e) => {
      searchDropdown.classList.remove('open');
      searchInput.value = item.getAttribute('data-name');
    });
  });
}

function showInitialSuggestions() {
  renderSearchResults(inventory.slice(0, 2));
}

if (searchInput && searchDropdown) {
  searchInput.addEventListener('focus', () => {
    if (!searchInput.value.trim()) {
      showInitialSuggestions();
    }
    searchDropdown.classList.add('open');
  });

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      showInitialSuggestions();
    } else {
      const filtered = inventory.filter(c => c.name.toLowerCase().includes(q));
      renderSearchResults(filtered);
    }
    searchDropdown.classList.add('open');
  });

  if (searchWrap) {
    searchWrap.addEventListener('mouseenter', () => {
      if (!searchInput.value.trim()) {
        showInitialSuggestions();
      }
    });
  }

  // Populate initial suggestions immediately
  showInitialSuggestions();

  document.addEventListener('click', (e) => {
    if (searchWrap && !searchWrap.contains(e.target)) {
      searchDropdown.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchDropdown) {
      searchDropdown.classList.remove('open');
      searchInput.blur();
    }
  });
}

// ============ TESTIMONIALS SLIDER INTERACTION ============
const testimonialsData = [
  {
    quote: '"Un servicio excepcional de principio a fin, un equipo verdaderamente profesional y una calidad del vehículo extraordinaria en todo momento"',
    name: "James Mitchell - Propietario de Porsche 911",
    img: "assets/img/testimonial.png"
  },
  {
    quote: '"Comprar mi coche aquí superó todas las expectativas. Transparencia absoluta, atención impecable y entrega en un tiempo récord."',
    name: "Carlos Rivera - Propietario de Audi RS6",
    img: "assets/img/team-3.jpg"
  }
];
let currentTestimonial = 0;
const testiCard = document.querySelector('.testi-card');
if (testiCard) {
  const quoteEl = testiCard.querySelector('.testi-quote');
  const nameEl = testiCard.querySelector('.testi-name');
  const imgEl = testiCard.querySelector('.testi-photo img');
  const prevBtn = testiCard.querySelector('.testi-prev');
  const nextBtn = testiCard.querySelector('.testi-next');

  function updateTestimonial(idx) {
    if (!quoteEl || !nameEl || !imgEl) return;
    testiCard.style.opacity = '0.5';
    testiCard.style.transition = 'opacity 0.25s';
    setTimeout(() => {
      const t = testimonialsData[idx];
      quoteEl.textContent = t.quote;
      nameEl.textContent = t.name;
      imgEl.src = t.img;
      testiCard.style.opacity = '1';
    }, 200);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonialsData.length) % testimonialsData.length;
      updateTestimonial(currentTestimonial);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
      updateTestimonial(currentTestimonial);
    });
  }
}
