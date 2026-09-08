/**
 * EVO MOVE - Global Motion & Scroll Architecture
 * Unified smooth scroll, auto-reveals, anchor handling, and page lifecycle.
 * Include this file on any page to get full Framer-grade motion with 0 boilerplate.
 */

(function () {
  'use strict';

  // ============ 1. LENIS SMOOTH SCROLL SINGLETON ============
  let lenisInstance = null;

  // Preserve scroll position ONLY across reloads (F5 / Ctrl+R) of the same URL
  const SCROLL_PREFIX = 'evo-move-scroll:';
  function getPageKey() {
    return SCROLL_PREFIX + window.location.pathname + window.location.search;
  }
  function saveScrollPosition() {
    try {
      const y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      sessionStorage.setItem(getPageKey(), String(y));
    } catch (_) {}
  }
  function getSavedScrollPosition() {
    try {
      const navEntry = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
      const isReload = navEntry ? navEntry.type === 'reload' : (performance.navigation && performance.navigation.type === 1);
      const pageKey = getPageKey();
      if (!isReload) {
        // Not a reload (fresh navigation) -> never restore scroll from previous page
        sessionStorage.removeItem(pageKey);
        return 0;
      }
      const v = parseInt(sessionStorage.getItem(pageKey), 10);
      sessionStorage.removeItem(pageKey);
      return Number.isFinite(v) && v > 0 ? v : 0;
    } catch (_) {
      return 0;
    }
  }
  window.addEventListener('pagehide', saveScrollPosition);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') saveScrollPosition();
  });

  function initSmoothScroll() {
    if (typeof Lenis === 'undefined') return null;

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      infinite: false,
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth scroll for anchor links with header offset (-75px)
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href === '#' || href.startsWith('javascript:')) return;

      let hash = null;
      if (href.startsWith('#') && href.length > 1) {
        hash = href.slice(1);
      } else if (href.includes('#')) {
        const [path, h] = href.split('#');
        const currentFile = window.location.pathname.split('/').pop() || 'index.html';
        const targetFile = path.split('/').pop();
        if (h && (targetFile === currentFile || (targetFile === 'index.html' && (!currentFile || currentFile === 'index.html')))) {
          hash = h;
        }
      }

      if (hash) {
        const target = document.getElementById(hash);
        if (target) {
          e.preventDefault();
          if (lenisInstance) {
            lenisInstance.scrollTo(target, { offset: -75, duration: 1.2 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
          try {
            history.pushState(null, null, '#' + hash);
          } catch (_) {}
        }
      }
    });

    // Handle initial hash in URL on page load
    if (window.location.hash) {
      setTimeout(() => {
        const initialTarget = document.getElementById(window.location.hash.slice(1));
        if (initialTarget && lenisInstance) {
          lenisInstance.scrollTo(initialTarget, { offset: -75, duration: 1.0 });
        }
      }, 250);
    }

    // Restore saved scroll position after Lenis is ready (fixes F5 jumping to top)
    const savedY = getSavedScrollPosition();
    if (savedY > 0) {
      window.scrollTo(0, savedY);
      lenisInstance.scrollTo(savedY, { immediate: true });
      sessionStorage.removeItem(SCROLL_KEY);
    }

    return lenisInstance;
  }

  // ============ 2. SCROLL REVEAL OBSERVER (AUTO-INITIALIZING) ============
  let revealObserver = null;

  function initRevealObserver() {
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: reveal all immediately
      document.querySelectorAll('.reveal-head, .reveal-card, .reveal-fade, [data-reveal]').forEach((el) => {
        el.classList.add('in');
      });
      return;
    }

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.06,
      rootMargin: '0px 0px -30px 0px',
    });

    // Footer sits at the very bottom edge of the page; the -30px rootMargin
    // above can leave .footer-bottom children never crossing the threshold.
    // Observe the footer container and reveal all of its descendants at once.
    document.querySelectorAll('.footer').forEach((footer) => {
      const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            footer.querySelectorAll('.reveal-head, .reveal-card, .reveal-fade, [data-reveal]').forEach((el) => {
              el.classList.add('in');
              if (revealObserver) revealObserver.unobserve(el);
            });
            footerObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.01 });
      footerObserver.observe(footer);
    });

    observeReveals();

    // Auto-observe newly added DOM nodes (filtering, dynamic cards, modals, etc.)
    if (typeof MutationObserver !== 'undefined') {
      const mutObserver = new MutationObserver((mutations) => {
        let hasNewNodes = false;
        mutations.forEach((m) => {
          if (m.addedNodes && m.addedNodes.length > 0) hasNewNodes = true;
        });
        if (hasNewNodes) {
          observeReveals();
        }
      });
      mutObserver.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true,
      });
    }
  }

  function observeReveals() {
    // Auto-stagger grids without explicit delays so all pages animate like home
    const gridSelectors = [
      '.car-grid', '.services-grid', '.team-cards', '.blog-cards',
      '.about-stats-grid', '.about-team-grid', '.steps-grid',
      '.trade-features-grid', '.dealership-grid', '.blog-full-grid',
      '.related-grid', '.specs-cards-grid', '.inv-grid'
    ];
    document.querySelectorAll(gridSelectors.join(', ')).forEach((grid) => {
      const cards = grid.querySelectorAll('.reveal-card:not([class*="reveal-delay-"])');
      cards.forEach((card, idx) => {
        const delayIdx = (idx % 4) + 1;
        card.classList.add(`reveal-delay-${delayIdx}`);
      });
    });

    if (!revealObserver) return;
    const elements = document.querySelectorAll(
      '.reveal-head:not(.in), .reveal-card:not(.in), .reveal-fade:not(.in), [data-reveal]:not(.in)'
    );
    elements.forEach((el) => revealObserver.observe(el));
  }

  // ============ 3. MOBILE NAVIGATION TOGGLE ============
  function initMobileNav() {
    const burger = document.getElementById('burger') || document.getElementById('navBurger') || document.querySelector('.nav-burger');
    const navLinks = document.getElementById('navLinks') || document.querySelector('.nav-links');

    if (!burger || !navLinks) return;

    // Ensure mobile actions (location, phone, contact button) exist in navLinks
    if (!navLinks.querySelector('.mobile-nav-actions')) {
      const actions = document.createElement('div');
      actions.className = 'mobile-nav-actions';
      actions.innerHTML = `
        <div class="mobile-nav-icons">
          <a href="contacto.html#map" class="mobile-icon-btn" aria-label="Ubicación">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </a>
          <a href="tel:+34900000000" class="mobile-icon-btn" aria-label="Teléfono">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </a>
        </div>
        <a class="btn btn-dark mobile-contact-btn" href="contacto.html">
          <span>Contactar</span>
          <span class="btn-chip btn-chip-light">
            <span class="btn-arrow-wrap">
              <span class="btn-arrow-track">
                <svg class="arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M 4 12 L 19.88 12 M 13.75 18.75 L 19.44 13.06 C 19.73 12.77 19.88 12.38 19.88 12 M 13.75 5.25 L 19.44 10.94 C 19.73 11.23 19.88 11.62 19.88 12"/>
                </svg>
                <svg class="arrow-svg arrow-clone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M 4 12 L 19.88 12 M 13.75 18.75 L 19.44 13.06 C 19.73 12.77 19.88 12.38 19.88 12 M 13.75 5.25 L 19.44 10.94 C 19.73 11.23 19.88 11.62 19.88 12"/>
                </svg>
              </span>
            </span>
          </span>
        </a>
      `;
      navLinks.appendChild(actions);
    }

    function toggleMenu(forceState) {
      const isCurrentlyOpen = navLinks.classList.contains('open');
      const shouldOpen = forceState !== undefined ? forceState : !isCurrentlyOpen;
      const navHeader = document.getElementById('nav') || document.querySelector('.nav');

      if (shouldOpen) {
        if (navHeader) navHeader.classList.add('open');
        navLinks.classList.add('open');
        burger.classList.add('active');
        document.body.classList.add('menu-open');
        if (window.lenis && typeof window.lenis.stop === 'function') {
          window.lenis.stop();
        }
      } else {
        if (navHeader) navHeader.classList.remove('open');
        navLinks.classList.remove('open');
        burger.classList.remove('active');
        document.body.classList.remove('menu-open');
        if (window.lenis && typeof window.lenis.start === 'function') {
          window.lenis.start();
        }
      }
    }

    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking any link inside navLinks
    navLinks.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        toggleMenu(false);
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !burger.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // ============ 4. ACCORDIONS HANDLER ============
  function initAccordions(scope = document) {
    const accItems = scope.querySelectorAll('.faq-item, .accordion-item, .car-acc-item');
    accItems.forEach((item) => {
      const header = item.querySelector('.faq-q, .accordion-header, .accordion-q, .car-acc-header');
      const body = item.querySelector('.faq-a, .accordion-body, .accordion-a, .car-acc-body');
      if (!header || !body) return;

      if (header.dataset.accordionBound) return;
      header.dataset.accordionBound = 'true';

      if (item.classList.contains('open')) {
        body.style.maxHeight = body.scrollHeight + 'px';
      }

      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        const container = item.closest('.faq-list, .accordion-list');

        if (container) {
          container.querySelectorAll('.faq-item.open, .accordion-item.open, .car-acc-item.open').forEach((other) => {
            if (other !== item) {
              other.classList.remove('open');
              const otherBody = other.querySelector('.faq-a, .accordion-body, .accordion-a, .car-acc-body');
              if (otherBody) otherBody.style.maxHeight = null;
            }
          });
        }

        if (isOpen) {
          item.classList.remove('open');
          body.style.maxHeight = null;
        } else {
          item.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });
  }

  // ============ 5. CUSTOM DROPDOWNS HANDLER ============
  function initCustomDropdowns(scope = document) {
    const customDropdowns = scope.querySelectorAll('.custom-dropdown:not([data-dd-init="true"])');
    if (!customDropdowns.length) return;

    customDropdowns.forEach(dd => {
      dd.setAttribute('data-dd-init', 'true');
      const trigger = dd.querySelector('.custom-dropdown-trigger');
      const valueSpan = dd.querySelector('.custom-dropdown-value');
      const options = dd.querySelectorAll('.custom-dropdown-option');
      const hiddenSelectId = dd.dataset.select;
      const hiddenSelect = hiddenSelectId ? document.getElementById(hiddenSelectId) : dd.querySelector('select');
      const menu = dd.querySelector('.custom-dropdown-menu');

      if (menu) {
        menu.setAttribute('data-lenis-prevent', '');
        menu.addEventListener('click', (e) => e.stopPropagation());
        menu.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });
      }

      if (!trigger) return;

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dd.classList.contains('open');

        // Close all other dropdowns
        document.querySelectorAll('.custom-dropdown.open').forEach(other => {
          if (other !== dd) {
            other.classList.remove('open');
            const otherTrig = other.querySelector('.custom-dropdown-trigger');
            if (otherTrig) otherTrig.setAttribute('aria-expanded', 'false');
          }
        });

        dd.classList.toggle('open', !isOpen);
        trigger.setAttribute('aria-expanded', String(!isOpen));
      });

      options.forEach(opt => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = opt.dataset.value;
          const text = opt.querySelector('span') ? opt.querySelector('span').textContent : val;

          options.forEach(o => {
            o.classList.remove('selected');
            o.removeAttribute('aria-selected');
          });
          opt.classList.add('selected');
          opt.setAttribute('aria-selected', 'true');

          if (valueSpan) {
            valueSpan.textContent = text;
            if (val === '' || val === 'all' || opt.classList.contains('opt-placeholder')) {
              valueSpan.classList.add('placeholder');
            } else {
              valueSpan.classList.remove('placeholder');
            }
          }

          if (hiddenSelect) {
            hiddenSelect.value = val;
            hiddenSelect.dispatchEvent(new Event('change', { bubbles: true }));
          }

          dd.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        });
      });
    });

    if (!window._evoDropdownGlobalListeners) {
      window._evoDropdownGlobalListeners = true;
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-dropdown')) {
          document.querySelectorAll('.custom-dropdown.open').forEach(dd => {
            dd.classList.remove('open');
            const trig = dd.querySelector('.custom-dropdown-trigger');
            if (trig) trig.setAttribute('aria-expanded', 'false');
          });
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.querySelectorAll('.custom-dropdown.open').forEach(dd => {
            dd.classList.remove('open');
            const trig = dd.querySelector('.custom-dropdown-trigger');
            if (trig) trig.setAttribute('aria-expanded', 'false');
          });
        }
      });
    }
  }

  // ============ 6. PAGE ENTRANCE LIFECYCLE ============
  function onPageReady() {
    initSmoothScroll();
    initRevealObserver();
    initMobileNav();
    initAccordions();
    initCustomDropdowns();

    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    }

    requestAnimationFrame(() => {
      document.documentElement.classList.add('js');
      setTimeout(() => {
        document.documentElement.classList.add('loaded');

        // Coordinate in-view reveals smoothly on page load
        const inViewElements = document.querySelectorAll(
          '.reveal-head:not(.in), .reveal-card:not(.in), .reveal-fade:not(.in), [data-reveal]:not(.in)'
        );
        inViewElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.height > 0 && rect.width > 0 && rect.top < window.innerHeight + 80 && rect.bottom > 0) {
            el.classList.add('in');
            if (revealObserver) revealObserver.unobserve(el);
          }
        });
      }, 50);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onPageReady);
  } else {
    onPageReady();
  }

  // ============ 5. GLOBAL EVO API ============
  window.EVO = {
    get lenis() {
      return lenisInstance;
    },
    get observer() {
      return revealObserver;
    },
    refreshReveals: observeReveals,
    initDropdowns: initCustomDropdowns,
    initAccordions: initAccordions,
    scrollTo: (target, offset = -75) => {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el && lenisInstance) {
        lenisInstance.scrollTo(el, { offset, duration: 1.2 });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
  };
})();
