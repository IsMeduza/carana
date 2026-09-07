/**
 * EVO MOVE - Global Motion & Scroll Architecture
 * Unified smooth scroll, auto-reveals, anchor handling, and page lifecycle.
 * Include this file on any page to get full Framer-grade motion with 0 boilerplate.
 */

(function () {
  'use strict';

  // ============ 1. LENIS SMOOTH SCROLL SINGLETON ============
  let lenisInstance = null;

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

    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('open');
      burger.classList.toggle('active');
    });

    // Close when clicking a link
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.classList.remove('active');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !burger.contains(e.target)) {
        navLinks.classList.remove('open');
        burger.classList.remove('active');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        burger.classList.remove('active');
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
      setTimeout(() => {
        document.documentElement.classList.add('loaded');
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
