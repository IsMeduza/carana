// ============ HERO SCROLL PARALLAX ============
const heroBg = document.querySelector('.hero-bg');
const heroContent = document.querySelector('.hero-content');
const heroFrame = document.querySelector('.hero-frame');

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
      const translateY = scrollY * 0.32;
      const scale = 1.0 + progress * 0.04;
      heroBg.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    }

    if (heroContent) {
      const opacity = Math.max(0, 1 - progress * 1.35);
      const translateY = -scrollY * 0.16;
      heroContent.style.opacity = opacity;
      heroContent.style.transform = `translate3d(0, ${translateY}px, 0)`;
    }
  }
}

window.addEventListener('scroll', updateHeroParallax, { passive: true });
if (window.EVO && window.EVO.lenis) {
  window.EVO.lenis.on('scroll', updateHeroParallax);
}


// ============ REPLICATED SEARCH COMPONENT ============
// Search uses the single catalog source (assets/catalog.js)
const inventory = (window.CAR_CATALOG || []).map(c => ({ name: c.name, slug: c.slug }));

const searchWrap = document.getElementById('searchWrap');
const searchInput = document.getElementById('searchInput');
const searchClearBtn = document.getElementById('searchClearBtn');
const searchBtn = document.getElementById('searchBtn');
const searchDropdown = document.getElementById('searchDropdown');
const searchResultsList = document.getElementById('searchResultsList');

const returnArrowSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M 19.75 18.219 C 19.75 15.867 19.75 14.692 19.367 13.764 C 18.853 12.522 17.866 11.535 16.624 11.021 C 15.696 10.638 14.521 10.638 12.169 10.638 L 3.871 10.638 M 8.107 5.781 L 4.31 9.577 C 4.017 9.87 3.87 10.254 3.87 10.638 M 8.106 15.495 L 4.31 11.699 C 4.028 11.418 3.87 11.036 3.87 10.638"/>
</svg>`;

let currentSearchToken = 0;

function updateClearBtn() {
  if (!searchClearBtn || !searchInput) return;
  const hasText = searchInput.value.length > 0;
  if (hasText) {
    searchClearBtn.style.display = 'flex';
    searchInput.style.paddingRight = '48px';
    if (searchWrap) searchWrap.classList.add('has-text');
  } else {
    searchClearBtn.style.display = 'none';
    searchInput.style.paddingRight = '';
    if (searchWrap) searchWrap.classList.remove('has-text');
  }
}

function renderSearchResults(items) {
  if (!searchResultsList) return;
  const token = ++currentSearchToken;

  if (!items || items.length === 0) {
    const existing = Array.from(searchResultsList.querySelectorAll('.search-item:not(.leaving)'));
    if (existing.length > 0) {
      existing.forEach(el => el.classList.add('leaving'));
      setTimeout(() => {
        if (token !== currentSearchToken) return;
        searchResultsList.innerHTML = `<div class="search-no-results">No se encontraron resultados</div>`;
      }, 200);
    } else {
      searchResultsList.innerHTML = `<div class="search-no-results">No se encontraron resultados</div>`;
    }
    return;
  }

  // Remove existing empty notice if present
  const noResultsEl = searchResultsList.querySelector('.search-no-results');
  if (noResultsEl) {
    noResultsEl.remove();
  }

  const existingMap = new Map();
  const existingItems = Array.from(searchResultsList.querySelectorAll('.search-item:not(.leaving)'));
  existingItems.forEach(el => {
    existingMap.set(el.getAttribute('data-name'), el);
  });

  const newNames = new Set(items.map(c => c.name));

  // Animate leaving items
  existingItems.forEach(el => {
    const name = el.getAttribute('data-name');
    if (!newNames.has(name)) {
      el.classList.add('leaving');
      setTimeout(() => {
        el.remove();
      }, 220);
    }
  });

  // Add or preserve items with smooth enter animation and direct link to coche.html
  let previousSibling = null;
  items.forEach((car, index) => {
    let itemEl = existingMap.get(car.name);
    if (!itemEl) {
      itemEl = document.createElement('a');
      itemEl.className = 'search-item entering';
      itemEl.href = `coche.html?car=${car.slug}`;
      itemEl.setAttribute('data-name', car.name);
      itemEl.style.animationDelay = `${index * 0.04}s`;
      itemEl.innerHTML = `
        ${returnArrowSvg}
        <span>${car.name}</span>
      `;
      itemEl.addEventListener('click', () => {
        if (searchDropdown) searchDropdown.classList.remove('open');
      });

      if (previousSibling && previousSibling.nextSibling) {
        searchResultsList.insertBefore(itemEl, previousSibling.nextSibling);
      } else if (!previousSibling && searchResultsList.firstChild) {
        searchResultsList.insertBefore(itemEl, searchResultsList.firstChild);
      } else {
        searchResultsList.appendChild(itemEl);
      }

      setTimeout(() => {
        itemEl.classList.remove('entering');
      }, 280);
    } else {
      itemEl.classList.remove('leaving');
      itemEl.href = `coche.html?car=${car.slug}`;
      if (previousSibling && itemEl.previousElementSibling !== previousSibling) {
        searchResultsList.insertBefore(itemEl, previousSibling.nextSibling);
      }
    }
    previousSibling = itemEl;
  });
}

function showInitialSuggestions() {
  renderSearchResults(inventory.slice(0, 2));
}

function goToInventorySearch() {
  const query = searchInput ? searchInput.value.trim() : '';
  if (!query) {
    window.location.href = 'inventario.html';
    return;
  }
  const qLower = query.toLowerCase();
  const match = inventory.find(c => c.name.toLowerCase() === qLower) ||
                inventory.find(c => c.name.toLowerCase().includes(qLower));
  if (match) {
    window.location.href = `coche.html?car=${match.slug}`;
  } else {
    window.location.href = `inventario.html?search=${encodeURIComponent(query)}`;
  }
}

if (searchInput && searchDropdown) {
  searchInput.addEventListener('focus', () => {
    updateClearBtn();
    if (searchWrap) searchWrap.classList.add('expanded');
    if (!searchInput.value.trim()) {
      showInitialSuggestions();
    }
    searchDropdown.classList.add('open');
  });

  searchInput.addEventListener('input', () => {
    updateClearBtn();
    if (searchWrap) searchWrap.classList.add('expanded');
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      showInitialSuggestions();
    } else {
      const filtered = inventory.filter(c => c.name.toLowerCase().includes(q));
      renderSearchResults(filtered);
    }
    searchDropdown.classList.add('open');
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      goToInventorySearch();
    }
  });

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      searchInput.value = '';
      updateClearBtn();
      searchInput.focus();
      showInitialSuggestions();
      searchDropdown.classList.add('open');
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goToInventorySearch();
    });
  }

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
      if (!searchInput.value.trim()) {
        searchWrap.classList.remove('expanded');
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchDropdown) {
      searchDropdown.classList.remove('open');
      searchInput.blur();
      if (!searchInput.value.trim()) {
        searchWrap.classList.remove('expanded');
      }
    }
  });
}

// ============ TESTIMONIALS SLIDER INTERACTION ============
const testimonialsData = [
  {
    quote: '"La gestión de importación y tramitación de placas definitivas con la DGT fue impecable. Coordinaron el peritaje técnico y el transporte seguro directamente a nuestras instalaciones."',
    name: "Concesionario Colaborador B2B · Sector Automoción Girona",
    img: "assets/img/testimonial.png"
  },
  {
    quote: '"Buscábamos soluciones ágiles de renting y adquisición de flota europea para nuestra empresa. AUTO JUNG nos ofreció un servicio 360° llave en mano con máxima transparencia."',
    name: "Empresa de Movilidad y Logística · Girona",
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

  let testiSwitching = false;
  function updateTestimonial(idx) {
    if (!quoteEl || !nameEl || !imgEl) return;
    if (testiSwitching) return;
    testiSwitching = true;
    const t = testimonialsData[idx];
    testiCard.classList.add('testi-swap');
    setTimeout(() => {
      quoteEl.textContent = t.quote;
      nameEl.textContent = t.name;
      imgEl.src = t.img;
      testiCard.classList.remove('testi-swap');
      testiSwitching = false;
    }, 220);
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

// ============ HOME FEATURED CARS (from catalog.js) ============
(function renderHomeCars() {
  const grid = document.getElementById('homeCarGrid');
  if (!grid) return;
  const catalog = window.CAR_CATALOG || [];
  if (!catalog.length) return;

  const featured = ['dreznak-karov', 'zethrux-vantage', 'emblora-wyndcroft'];
  const cars = featured
    .map(slug => catalog.find(c => c.slug === slug))
    .filter(Boolean);

  if (typeof window.renderCarCard === 'function') {
    grid.innerHTML = cars.map((car, idx) =>
      window.renderCarCard(car, { delay: idx + 1 })
    ).join('\n');
  }

  if (window.EVO && typeof window.EVO.refreshReveals === 'function') {
    window.EVO.refreshReveals();
  }
})();
