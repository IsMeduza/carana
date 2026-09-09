/**
 * car.js - Vehicle Detail Page Interactive Logic
 * Consumes single source of truth: assets/catalog.js
 */

const CAR_DATABASE = window.CAR_DATABASE || {};
const DEFAULT_CAR_ID = 'dreznak-karov';
const CAR_ALIASES = window.CAR_ALIASES || {};

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  let carId = urlParams.get('car') || DEFAULT_CAR_ID;

  if (CAR_ALIASES[carId]) {
    carId = CAR_ALIASES[carId];
  }

  const path = window.location.pathname.toLowerCase();
  for (const key of Object.keys(CAR_DATABASE)) {
    if (path.includes(key)) {
      carId = key;
      break;
    }
  }

  const carData = CAR_DATABASE[carId] || CAR_DATABASE[DEFAULT_CAR_ID];

  populateCarData(carData);
  setupCarousel();
  setupLightbox(carData);
  setupAccordions();
  setupCopyButtons(carData);
  renderRelatedCars(carId);

  requestAnimationFrame(() => {
    document.querySelectorAll('.car-hero-info, .car-hero-frame').forEach(el => {
      el.classList.add('in');
    });
  });
});

function renderRelatedCars(currentSlug) {
  const grid = document.getElementById('relatedGrid');
  if (!grid) return;
  const catalog = window.CAR_CATALOG || [];
  if (!catalog.length) return;

  const related = catalog.filter(c => c.slug !== currentSlug).slice(0, 3);

  if (typeof window.renderCarCard === 'function') {
    grid.innerHTML = related.map((car, idx) =>
      window.renderCarCard(car, { delay: idx + 1, subtitle: car.category })
    ).join('\n');
  }

  if (window.EVO && typeof window.EVO.refreshReveals === 'function') {
    window.EVO.refreshReveals();
  }
}

function populateCarData(car) {
  document.title = car.name + ' | AUTO JUNG - Concesionario de lujo';

  const crumbEl = document.getElementById('carCrumb');
  if (crumbEl) crumbEl.textContent = car.categoryLabel;

  const titleEl = document.getElementById('carTitle');
  if (titleEl) titleEl.textContent = car.name;

  const descEl = document.getElementById('carDesc');
  if (descEl) descEl.textContent = car.description;

  const mainImgEl = document.getElementById('carHeroMainImg');
  if (mainImgEl) {
    mainImgEl.src = car.mainImage;
    mainImgEl.alt = car.name;
  }

  const floatPriceEl = document.getElementById('floatPrice');
  if (floatPriceEl) floatPriceEl.textContent = car.price;

  const floatYearEl = document.getElementById('floatYear');
  if (floatYearEl) floatYearEl.textContent = car.year;

  const floatBodyEl = document.getElementById('floatBody');
  if (floatBodyEl) floatBodyEl.textContent = car.bodyType;

  const floatFuelEl = document.getElementById('floatFuel');
  if (floatFuelEl) floatFuelEl.textContent = car.fuel;

  const floatSeatsEl = document.getElementById('floatSeats');
  if (floatSeatsEl) floatSeatsEl.textContent = car.seats;

  const vinBtn = document.getElementById('copyVinBtn');
  if (vinBtn) {
    vinBtn.setAttribute('data-copy', car.vin);
  }

  const stockBtn = document.getElementById('copyStockBtn');
  if (stockBtn) {
    stockBtn.setAttribute('data-copy', car.stock);
  }

  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  if (track && car.gallery && car.gallery.length > 0) {
    track.innerHTML = car.gallery.map(function(src, i) {
      return '<div class="car-carousel-slide"><img src="' + src + '" alt="' + car.name + ' vista ' + (i + 1) + '" loading="' + (i === 0 ? 'eager' : 'lazy') + '"></div>';
    }).join('');

    if (dotsContainer) {
      dotsContainer.innerHTML = car.gallery.map(function(_, i) {
        return '<button class="carousel-dot ' + (i === 0 ? 'active' : '') + '" data-index="' + i + '" aria-label="Slide ' + (i + 1) + '"></button>';
      }).join('');
    }
  }

  const specsGrid = document.getElementById('specsCardsGrid');
  if (specsGrid && car.specsCards) {
    specsGrid.innerHTML = car.specsCards.map(function(s) {
      return '<div class="spec-card"><span class="spec-card-label">' + s.label + '</span><span class="spec-card-val">' + s.value + '</span></div>';
    }).join('');
  }

  const specTable = document.getElementById('specificationsTable');
  if (specTable && car.specifications) {
    specTable.innerHTML = car.specifications.map(function(s) {
      return '<div class="acc-row"><span class="acc-label">' + s.label + '</span><span class="acc-val">' + s.value + '</span></div>';
    }).join('');
  }

  const condTable = document.getElementById('conditionTable');
  if (condTable && car.conditionHistory) {
    condTable.innerHTML = car.conditionHistory.map(function(c) {
      return '<div class="acc-row"><span class="acc-label">' + c.label + '</span><span class="acc-val">' + c.value + '</span></div>';
    }).join('');
  }

  const featuresGrid = document.getElementById('featuresGrid');
  if (featuresGrid && car.keyFeatures) {
    featuresGrid.innerHTML = car.keyFeatures.map(function(f) {
      return '<div class="feature-item"><i data-lucide="check"></i><span>' + f + '</span></div>';
    }).join('');
  }

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // Refresh height for any accordion that is currently open
  document.querySelectorAll('.car-accordions-section .faq-item.open, .car-accordions-section .accordion-item.open').forEach(item => {
    const body = item.querySelector('.faq-a, .accordion-body, .car-acc-body');
    if (body) {
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
}

function setupCarousel() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');
  if (!track) return;

  // Clean up any old clones if setupCarousel runs again
  track.querySelectorAll('.carousel-clone').forEach(el => el.remove());

  const originalSlides = Array.from(track.querySelectorAll('.car-carousel-slide'));
  const totalSlides = originalSlides.length;
  if (totalSlides === 0) return;

  if (totalSlides === 1) {
    track.style.transform = 'translateX(0%)';
    return;
  }

  // Create infinite loop clones
  const firstClone = originalSlides[0].cloneNode(true);
  firstClone.classList.add('carousel-clone');
  firstClone.setAttribute('aria-hidden', 'true');

  const lastClone = originalSlides[totalSlides - 1].cloneNode(true);
  lastClone.classList.add('carousel-clone');
  lastClone.setAttribute('aria-hidden', 'true');

  track.appendChild(firstClone);
  track.insertBefore(lastClone, track.firstChild);

  let currentIndex = 1;
  let isTransitioning = false;
  let transitionTimeout = null;
  const TRANSITION_STYLE = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';

  // Initial position at first real slide without transition
  track.style.transition = 'none';
  track.style.transform = 'translateX(-100%)';
  void track.offsetHeight; // Force reflow

  function updateDots(activeIdx) {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeIdx);
    });
  }

  function getRealIndex(idx) {
    if (idx === 0) return totalSlides - 1;
    if (idx === totalSlides + 1) return 0;
    return idx - 1;
  }

  function handleTransitionEnd() {
    clearTimeout(transitionTimeout);
    if (currentIndex === totalSlides + 1) {
      track.style.transition = 'none';
      currentIndex = 1;
      track.style.transform = 'translateX(-100%)';
      void track.offsetHeight;
    } else if (currentIndex === 0) {
      track.style.transition = 'none';
      currentIndex = totalSlides;
      track.style.transform = 'translateX(-' + (totalSlides * 100) + '%)';
      void track.offsetHeight;
    }
    isTransitioning = false;
  }

  function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = index;

    track.style.transition = TRANSITION_STYLE;
    track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

    updateDots(getRealIndex(currentIndex));

    clearTimeout(transitionTimeout);
    transitionTimeout = setTimeout(() => {
      if (isTransitioning) {
        handleTransitionEnd();
      }
    }, 500);
  }

  track.addEventListener('transitionend', (e) => {
    if (e.target !== track || e.propertyName !== 'transform') return;
    handleTransitionEnd();
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });
  }

  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.carousel-dot');
      if (dot && !isTransitioning) {
        const dotIndex = parseInt(dot.getAttribute('data-index'), 10) || 0;
        if (getRealIndex(currentIndex) !== dotIndex) {
          goToSlide(dotIndex + 1);
        }
      }
    });
  }

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    if (isTransitioning || e.touches.length > 1) return;
    touchStartX = e.touches[0].clientX;
    touchEndX = touchStartX;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (isTransitioning) return;
    touchEndX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    if (isTransitioning) return;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff < 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }
  });
}

function setupLightbox(car) {
  const lightbox = document.getElementById('carLightbox');
  const imgEl = document.getElementById('lightboxImg');
  const counterEl = document.getElementById('lightboxCounter');
  const carNameEl = document.getElementById('lightboxCarName');
  const thumbsContainer = document.getElementById('lightboxThumbs');
  const closeBtn = document.getElementById('lightboxClose');
  const backdrop = document.getElementById('lightboxBackdrop');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const expandBtn = document.getElementById('carouselExpandBtn');
  const heroMainImg = document.getElementById('carHeroMainImg');

  if (!lightbox || !imgEl) return;

  const gallery = (car && car.gallery && car.gallery.length > 0)
    ? car.gallery
    : Array.from(document.querySelectorAll('#carouselTrack .car-carousel-slide:not(.carousel-clone) img')).map(img => img.getAttribute('src'));

  if (!gallery.length) return;

  let activeIndex = 0;

  function renderThumbs() {
    if (!thumbsContainer) return;
    thumbsContainer.innerHTML = gallery.map((src, idx) => `
      <button class="car-lightbox-thumb ${idx === activeIndex ? 'active' : ''}" data-idx="${idx}" type="button" aria-label="Ver foto ${idx + 1}">
        <img src="${src}" alt="Miniatura ${idx + 1}" loading="lazy">
      </button>
    `).join('');

    thumbsContainer.querySelectorAll('.car-lightbox-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const idx = parseInt(thumb.getAttribute('data-idx'), 10);
        goTo(idx);
      });
    });
  }

  function updateView() {
    imgEl.style.opacity = '0';
    imgEl.style.transform = 'scale(0.97)';
    setTimeout(() => {
      imgEl.src = gallery[activeIndex];
      imgEl.alt = (car && car.name ? car.name : 'Vehículo') + ' - Foto ' + (activeIndex + 1);
      imgEl.style.opacity = '1';
      imgEl.style.transform = 'scale(1)';
    }, 60);

    if (counterEl) {
      counterEl.textContent = `${activeIndex + 1} / ${gallery.length}`;
    }
    if (carNameEl && car) {
      carNameEl.textContent = car.name;
    }

    if (thumbsContainer) {
      thumbsContainer.querySelectorAll('.car-lightbox-thumb').forEach((t, i) => {
        t.classList.toggle('active', i === activeIndex);
        if (i === activeIndex) {
          t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    }
  }

  function goTo(index) {
    if (index < 0) {
      activeIndex = gallery.length - 1;
    } else if (index >= gallery.length) {
      activeIndex = 0;
    } else {
      activeIndex = index;
    }
    updateView();
  }

  function openLightbox(startIndex = 0) {
    activeIndex = Math.max(0, Math.min(startIndex, gallery.length - 1));
    renderThumbs();
    updateView();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Event Listeners
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(activeIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(activeIndex + 1));

  const carouselEl = document.querySelector('.car-carousel');

  if (expandBtn) {
    expandBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const activeDot = document.querySelector('#carouselDots .carousel-dot.active');
      const idx = activeDot ? parseInt(activeDot.getAttribute('data-index'), 10) : 0;
      openLightbox(idx || 0);
    });
  }

  // Modern cursor follow on carousel (Desktop) using RAF + Lerp physics
  if (carouselEl && expandBtn) {
    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (!isTouchDevice) {
      let mouseX = 0;
      let mouseY = 0;
      let currX = 0;
      let currY = 0;
      let isHovered = false;
      let isOverControl = false;
      let rafId = null;
      let targetScale = 0;
      let currScale = 0;

      function updateCursor() {
        // High-end lerp (0.18) for floaty luxury magnetic follow
        currX += (mouseX - currX) * 0.18;
        currY += (mouseY - currY) * 0.18;
        currScale += (targetScale - currScale) * 0.2;

        if (expandBtn) {
          expandBtn.style.transform = `translate3d(${currX.toFixed(2)}px, ${currY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${currScale.toFixed(3)})`;
          expandBtn.style.opacity = currScale > 0.05 ? Math.min(1, currScale * 1.3).toFixed(2) : '0';
        }

        if (isHovered || currScale > 0.01) {
          rafId = requestAnimationFrame(updateCursor);
        } else {
          rafId = null;
          if (expandBtn) expandBtn.style.opacity = '0';
        }
      }

      carouselEl.addEventListener('mouseenter', (e) => {
        const rect = carouselEl.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        currX = mouseX;
        currY = mouseY;
        isHovered = true;

        const overControl = !!e.target.closest('#carouselPrev, #carouselNext, #carouselDots, .corner-cutout');
        isOverControl = overControl;
        targetScale = overControl ? 0 : 1;

        if (!rafId) rafId = requestAnimationFrame(updateCursor);
      });

      carouselEl.addEventListener('mousemove', (e) => {
        const rect = carouselEl.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;

        const overControl = !!e.target.closest('#carouselPrev, #carouselNext, #carouselDots, .corner-cutout');
        if (overControl !== isOverControl) {
          isOverControl = overControl;
          targetScale = isOverControl ? 0 : 1;
        }

        if (!rafId && isHovered) rafId = requestAnimationFrame(updateCursor);
      });

      carouselEl.addEventListener('mouseleave', () => {
        isHovered = false;
        targetScale = 0;
        if (!rafId) rafId = requestAnimationFrame(updateCursor);
      });
    }
  }

  // Carousel Click / Tap handling (Single click/tap opens lightbox immediately)
  if (carouselEl) {
    carouselEl.addEventListener('click', (e) => {
      // Ignore clicks on prev/next cutout buttons and dots
      if (e.target.closest('#carouselPrev, #carouselNext, #carouselDots, .corner-cutout')) {
        return;
      }
      if (e.target.closest('#carouselExpandBtn')) {
        return;
      }

      const activeDot = document.querySelector('#carouselDots .carousel-dot.active');
      const idx = activeDot ? parseInt(activeDot.getAttribute('data-index'), 10) : 0;
      openLightbox(idx || 0);
    });
  }


  // Click on main hero image opens the lightbox at slide 0
  if (heroMainImg) {
    heroMainImg.addEventListener('click', () => {
      openLightbox(0);
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      goTo(activeIndex - 1);
    } else if (e.key === 'ArrowRight') {
      goTo(activeIndex + 1);
    }
  });

  // Touch swipe support on modal
  let touchStartX = 0;
  let touchEndX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchEndX = touchStartX;
    }
  }, { passive: true });

  lightbox.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
      touchEndX = e.touches[0].clientX;
    }
  }, { passive: true });

  lightbox.addEventListener('touchend', () => {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff < 0) {
        goTo(activeIndex + 1);
      } else {
        goTo(activeIndex - 1);
      }
    }
  });
}

function setupAccordions(scope = document) {
  // Accordions are handled globally by motion.js (window.EVO.initAccordions),
  // which loads on every page via @component scripts.
  if (window.EVO && typeof window.EVO.initAccordions === 'function') {
    window.EVO.initAccordions(scope);
  }
}

function setupCopyButtons(car) {
  const buttons = document.querySelectorAll('.copy-pill-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      const spanText = btn.querySelector('.copy-text');
      const originalText = spanText ? spanText.textContent : '';

      try {
        await navigator.clipboard.writeText(textToCopy);
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      btn.classList.add('copied');
      if (spanText) {
        spanText.textContent = '¡Copiado!';
      }

      setTimeout(() => {
        btn.classList.remove('copied');
        if (spanText) {
          spanText.textContent = originalText;
        }
      }, 2000);
    });
  });
}
