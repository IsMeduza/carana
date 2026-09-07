document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation Toggle ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navCenter = document.querySelector('.nav-center');

  if (mobileMenuBtn && navCenter) {
    mobileMenuBtn.addEventListener('click', () => {
      navCenter.classList.toggle('nav-open');
    });
  }

  // --- Filter Elements ---
  const searchInput = document.getElementById('filterSearchInput');
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

  // Function to filter cars
  function applyFilters() {
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
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // --- Category Tabs Click ---
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.cat || 'all';
      applyFilters();
    });
  });

  // --- Event Listeners for Live Inputs ---
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  if (makeSelect) {
    makeSelect.addEventListener('change', applyFilters);
  }

  if (conditionSelect) {
    conditionSelect.addEventListener('change', applyFilters);
  }

  if (yearInput) {
    yearInput.addEventListener('input', applyFilters);
  }

  if (mileageInput) {
    mileageInput.addEventListener('input', applyFilters);
  }

  priceCheckboxes.forEach(cb => {
    cb.addEventListener('change', applyFilters);
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

      // Clear query params from URL without reload
      if (window.history.replaceState) {
        const url = window.location.pathname;
        window.history.replaceState({}, '', url);
      }

      applyFilters();
    });
  }

  // --- Check URL Parameters on Load ---
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('search') || urlParams.get('q');
  const catParam = urlParams.get('cat') || urlParams.get('category');
  const makeParam = urlParams.get('make');

  if (searchParam && searchInput) {
    searchInput.value = searchParam;
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
    }
  }

  // Initial filter run
  applyFilters();
});
