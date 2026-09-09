/**
 * inventory.js - Luxury Vehicle Catalog & Filter Logic
 * Motion & smooth scroll handled globally by assets/motion.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Render catalog cards from single source (assets/catalog.js) ---
  const invGrid = document.getElementById('invGrid');
  if (invGrid && window.CAR_CATALOG && window.CAR_CATALOG.length) {
    if (typeof window.renderCarCard === 'function') {
      invGrid.innerHTML = window.CAR_CATALOG.map((car, idx) => {
        const delay = (idx % 3) + 1;
        return window.renderCarCard(car, { delay, attributes: true });
      }).join('\n');
    }
  }

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

  // Mobile filter elements
  const filtersSidebar = document.getElementById('filtersSidebar');
  const mobileFiltersTrigger = document.getElementById('mobileFiltersTrigger');
  const filtersBadge = document.getElementById('filtersBadge');
  const mobileFilterApplyBtn = document.getElementById('mobileFilterApplyBtn');
  const mobileFilterApplyText = document.getElementById('mobileFilterApplyText');

  let currentCategory = 'all';

  // --- Mobile Filter Toggle & Apply ---
  if (mobileFiltersTrigger && filtersSidebar) {
    mobileFiltersTrigger.addEventListener('click', () => {
      const isOpen = filtersSidebar.classList.toggle('filters-open');
      mobileFiltersTrigger.classList.toggle('active', isOpen);
      mobileFiltersTrigger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  if (mobileFilterApplyBtn && filtersSidebar) {
    mobileFilterApplyBtn.addEventListener('click', () => {
      filtersSidebar.classList.remove('filters-open');
      if (mobileFiltersTrigger) {
        mobileFiltersTrigger.classList.remove('active');
        mobileFiltersTrigger.setAttribute('aria-expanded', 'false');
      }
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        if (window.EVO && window.EVO.lenis && typeof window.EVO.lenis.scrollTo === 'function') {
          window.EVO.lenis.scrollTo(catalogEl, { offset: -84 });
        } else {
          const topPos = catalogEl.getBoundingClientRect().top + window.pageYOffset - 84;
          window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
        }
      }
    });
  }

  function updateActiveFilterBadge(visibleCount) {
    if (!filtersBadge || !mobileFiltersTrigger) return;

    let activeCount = 0;
    if (makeSelect && makeSelect.value !== 'all') activeCount++;
    if (conditionSelect && conditionSelect.value !== 'all') activeCount++;
    if (yearInput && yearInput.value.trim() !== '') activeCount++;
    if (mileageInput && mileageInput.value.trim() !== '') activeCount++;

    let hasPrice = false;
    priceCheckboxes.forEach(cb => { if (cb.checked) hasPrice = true; });
    if (hasPrice) activeCount++;

    if (activeCount > 0) {
      filtersBadge.textContent = String(activeCount);
      filtersBadge.style.display = 'inline-flex';
      mobileFiltersTrigger.classList.add('has-active');
    } else {
      filtersBadge.style.display = 'none';
      mobileFiltersTrigger.classList.remove('has-active');
    }

    if (mobileFilterApplyText) {
      mobileFilterApplyText.textContent = `Ver ${visibleCount} vehículo${visibleCount === 1 ? '' : 's'}`;
    }
  }

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

    updateActiveFilterBadge(visibleCount);

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
