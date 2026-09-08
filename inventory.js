/**
 * inventory.js - Luxury Vehicle Catalog & Filter Logic
 * Motion & smooth scroll handled globally by assets/motion.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Custom Dropdowns Functionality ---
  const customDropdowns = document.querySelectorAll('.custom-dropdown');
  customDropdowns.forEach(dd => {
    if (dd.dataset.ddInit === 'true') return;
    dd.dataset.ddInit = 'true';
    const trigger = dd.querySelector('.custom-dropdown-trigger');
    const valueSpan = dd.querySelector('.custom-dropdown-value');
    const options = dd.querySelectorAll('.custom-dropdown-option');
    const hiddenSelectId = dd.dataset.select;
    const hiddenSelect = hiddenSelectId ? document.getElementById(hiddenSelectId) : null;

    const menu = dd.querySelector('.custom-dropdown-menu');
    if (menu) {
      menu.setAttribute('data-lenis-prevent', '');
      menu.addEventListener('click', (e) => {
        // Prevent clicking inside menu or on its scrollbar from closing dropdown
        e.stopPropagation();
      });
      menu.addEventListener('wheel', (e) => {
        // Stop Lenis or window scroll from hijacking wheel inside menu
        e.stopPropagation();
      }, { passive: true });
    }

    if (!trigger) return;

    // Toggle dropdown open/close
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dd.classList.contains('open');

      // Close all other dropdowns
      customDropdowns.forEach(other => {
        if (other !== dd) {
          other.classList.remove('open');
          const otherTrig = other.querySelector('.custom-dropdown-trigger');
          if (otherTrig) otherTrig.setAttribute('aria-expanded', 'false');
        }
      });

      dd.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });

    // Option selection
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

        if (valueSpan) valueSpan.textContent = text;

        if (hiddenSelect) {
          hiddenSelect.value = val;
          hiddenSelect.dispatchEvent(new Event('change'));
        }

        dd.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });
  });

  // Close dropdowns only on true outside click or Escape
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-dropdown')) {
      customDropdowns.forEach(dd => {
        dd.classList.remove('open');
        const trig = dd.querySelector('.custom-dropdown-trigger');
        if (trig) trig.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      customDropdowns.forEach(dd => {
        dd.classList.remove('open');
        const trig = dd.querySelector('.custom-dropdown-trigger');
        if (trig) trig.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // --- Filter Elements ---
  const searchInput = document.getElementById('filterSearchInput');
  const searchClear = document.getElementById('filterSearchClear');
  const makeSelect = document.getElementById('filterMake');
  const conditionSelect = document.getElementById('filterCondition');
  const yearInput = document.getElementById('filterYear');
  const mileageInput = document.getElementById('filterMileage');
  const priceCheckboxes = document.querySelectorAll('input[name="priceRange"]');
  const categoryPills = document.querySelectorAll('.cat-pill');
  const clearBtn = document.getElementById('clearFiltersBtn');
  const carCards = document.querySelectorAll('.car-card');
  const noResults = document.getElementById('noResults');

  let currentCategory = 'all';

  // --- Filter Search Clear Button ---
  function updateFilterSearchClear() {
    if (!searchInput || !searchClear) return;
    const hasText = searchInput.value.length > 0;
    searchClear.style.display = hasText ? 'flex' : 'none';
    searchInput.style.paddingRight = hasText ? '46px' : '';
  }

  if (searchClear && searchInput) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      updateFilterSearchClear();
      searchInput.focus();
      applyFilters(true);
    });
  }

  // Function to filter cars
  function applyFilters(isUserAction = false) {
    const searchTerm = (searchInput ? searchInput.value.trim().toLowerCase() : '');
    const selectedMake = (makeSelect ? makeSelect.value : 'all');
    const selectedCondition = (conditionSelect ? conditionSelect.value : 'all');
    const minYear = (yearInput && yearInput.value) ? parseInt(yearInput.value, 10) : null;
    const maxMileage = (mileageInput && mileageInput.value) ? parseInt(mileageInput.value, 10) : null;

    // Checked price ranges
    const checkedPriceRanges = [];
    priceCheckboxes.forEach(cb => {
      if (cb.checked) {
        checkedPriceRanges.push(cb.value);
      }
    });

    let visibleCount = 0;
    const newlyVisibleCards = [];

    carCards.forEach(card => {
      const name = (card.dataset.name || '').toLowerCase();
      const make = card.dataset.make || '';
      const category = (card.dataset.category || '').toLowerCase();
      const condition = card.dataset.condition || '';
      const year = parseInt(card.dataset.year, 10) || 0;
      const price = parseInt(card.dataset.price, 10) || 0;
      const mileage = parseInt(card.dataset.mileage, 10) || 0;

      // 1. Text Search (matches name or make)
      const matchesSearch = !searchTerm ||
        name.includes(searchTerm) ||
        make.toLowerCase().includes(searchTerm);

      // 2. Category
      const matchesCategory = (currentCategory === 'all') || (category === currentCategory.toLowerCase());

      // 3. Make
      const matchesMake = (selectedMake === 'all') || (make.toLowerCase() === selectedMake.toLowerCase());

      // 4. Condition
      const matchesCondition = (selectedCondition === 'all') || (condition.toLowerCase() === selectedCondition.toLowerCase());

      // 5. Year (>= minYear)
      const matchesYear = !minYear || isNaN(minYear) || (year >= minYear);

      // 6. Mileage (<= maxMileage)
      const matchesMileage = !maxMileage || isNaN(maxMileage) || (mileage <= maxMileage);

      // 7. Price Ranges
      let matchesPrice = true;
      if (checkedPriceRanges.length > 0) {
        matchesPrice = checkedPriceRanges.some(range => {
          if (range === '50-100') return price >= 50000 && price <= 100000;
          if (range === '100-200') return price > 100000 && price <= 200000;
          if (range === '200+') return price > 200000;
          return true;
        });
      }

      const isVisible = matchesSearch && matchesCategory && matchesMake && matchesCondition && matchesYear && matchesMileage && matchesPrice;

      if (isVisible) {
        card.style.display = '';
        visibleCount++;
        newlyVisibleCards.push(card);
      } else {
        card.style.display = 'none';
        card.classList.remove('in');
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // When filtering is triggered by user interaction, animate all matching cards smoothly
    if (isUserAction && newlyVisibleCards.length > 0) {
      newlyVisibleCards.forEach((card, idx) => {
        card.classList.remove('filter-animate');
        card.style.animationDelay = `${(idx % 6) * 0.08}s`;
      });

      // Force reflow to guarantee CSS keyframe animation triggers
      void newlyVisibleCards[0].offsetWidth;

      newlyVisibleCards.forEach(card => {
        card.classList.add('filter-animate', 'in');
      });
    }

    if (window.EVO && typeof window.EVO.refreshReveals === 'function') {
      window.EVO.refreshReveals();
    }
  }

  // --- Category Tabs Click ---
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.cat || 'all';
      applyFilters(true);
    });
  });

  // --- Event Listeners for Live Inputs ---
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      updateFilterSearchClear();
      applyFilters(true);
    });
  }

  if (makeSelect) {
    makeSelect.addEventListener('change', () => applyFilters(true));
  }

  if (conditionSelect) {
    conditionSelect.addEventListener('change', () => applyFilters(true));
  }

  if (yearInput) {
    yearInput.addEventListener('input', () => applyFilters(true));
  }

  if (mileageInput) {
    mileageInput.addEventListener('input', () => applyFilters(true));
  }

  priceCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => applyFilters(true));
  });

  // --- Clear Filters Button ---
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (makeSelect) makeSelect.value = 'all';
      if (conditionSelect) conditionSelect.value = 'all';
      if (yearInput) yearInput.value = '';
      if (mileageInput) mileageInput.value = '';
      priceCheckboxes.forEach(cb => { cb.checked = false; });

      categoryPills.forEach(p => p.classList.remove('active'));
      const allPill = document.querySelector('.cat-pill[data-cat="all"]');
      if (allPill) allPill.classList.add('active');
      currentCategory = 'all';

      // Reset custom dropdowns display
      customDropdowns.forEach(dd => {
        const valueSpan = dd.querySelector('.custom-dropdown-value');
        const defaultOpt = dd.querySelector('.custom-dropdown-option[data-value="all"]');
        if (valueSpan) valueSpan.textContent = defaultOpt ? defaultOpt.textContent.trim() : 'Todos';
        const options = dd.querySelectorAll('.custom-dropdown-option');
        options.forEach(opt => {
          if (opt.dataset.value === 'all') {
            opt.classList.add('selected');
            opt.setAttribute('aria-selected', 'true');
          } else {
            opt.classList.remove('selected');
            opt.removeAttribute('aria-selected');
          }
        });
        dd.classList.remove('open');
      });

      // Clear query params from URL without reload
      if (window.history.replaceState) {
        const url = window.location.pathname;
        window.history.replaceState({}, '', url);
      }

      applyFilters(true);
    });
  }

  // --- Check URL Parameters on Load ---
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('search') || urlParams.get('q');
  const catParam = urlParams.get('cat') || urlParams.get('category');
  const makeParam = urlParams.get('make');

  if (searchParam && searchInput) {
    searchInput.value = searchParam;
    updateFilterSearchClear();
  }

  if (catParam) {
    const matchingPill = document.querySelector(`.cat-pill[data-cat="${catParam.toLowerCase()}"]`);
    if (matchingPill) {
      categoryPills.forEach(p => p.classList.remove('active'));
      matchingPill.classList.add('active');
      currentCategory = catParam.toLowerCase();
    }
  }

  if (makeParam && makeSelect) {
    const option = Array.from(makeSelect.options).find(o => o.value.toLowerCase() === makeParam.toLowerCase());
    if (option) {
      makeSelect.value = option.value;
      const ddMake = document.getElementById('dropdownMake');
      if (ddMake) {
        const valSpan = ddMake.querySelector('.custom-dropdown-value');
        if (valSpan) valSpan.textContent = option.value;
        ddMake.querySelectorAll('.custom-dropdown-option').forEach(o => {
          if (o.dataset.value.toLowerCase() === makeParam.toLowerCase()) {
            o.classList.add('selected');
            o.setAttribute('aria-selected', 'true');
          } else {
            o.classList.remove('selected');
            o.removeAttribute('aria-selected');
          }
        });
      }
    }
  }

  // Initial filter run
  applyFilters();
});
