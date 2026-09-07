/**
 * car.js - Vehicle Detail Page Interactive Logic
 * EVO MOVE Luxury Dealership
 */

const CAR_DATABASE = {
  'dreznak-karov': {
    id: 'dreznak-karov',
    name: 'Dreznak Karov',
    category: 'SUV',
    categoryLabel: 'INVENTARIO - SUV',
    price: '$145,000',
    year: '2024',
    bodyType: 'SUV',
    fuel: 'Gasolina',
    seats: '5',
    vin: 'SALWR2V48PA194821',
    stock: 'EVO-DK-2024',
    description: 'Un SUV de ultra-lujo que redefine la potencia y el confort en carretera, con acabados artesanales y tecnología de vanguardia.',
    mainImage: 'assets/img/car-dreznak.png',
    gallery: [
      'assets/img/gallery-dreznak-1.png',
      'assets/img/gallery-dreznak-2.webp',
      'assets/img/gallery-dreznak-3.png',
      'assets/img/car-dreznak.png'
    ],
    specsCards: [
      { label: 'Transmisión', value: 'Automático' },
      { label: 'Kilometraje', value: '3,500 km' },
      { label: 'Motor', value: '4.4L V8' },
      { label: 'Potencia', value: '523 HP' },
      { label: 'Tracción', value: 'AWD' },
      { label: 'Color exterior', value: 'Santorini Black' },
      { label: 'Color interior', value: 'Navy / Camel' },
      { label: 'Puertas', value: '4' }
    ],
    specifications: [
      { label: 'Transmisión', value: 'Automático de 8 velocidades' },
      { label: 'Motor', value: '4.4L biturbo V8 (BMW-sourced)' },
      { label: 'Potencia', value: '523 HP @ 5,500 rpm' },
      { label: 'Tracción', value: 'AWD (4x4 inteligente)' },
      { label: 'Color exterior', value: 'Santorini Negro metálico' },
      { label: 'Color interior', value: 'SV Bespoke cuero (Navy/camel)' },
      { label: 'Puertas', value: '4' },
      { label: 'Asientos', value: '5' }
    ],
    conditionHistory: [
      { label: 'Condición', value: 'Como nuevo' },
      { label: 'Propietarios anteriores', value: '1' },
      { label: 'Historial de servicio', value: 'Aprobado por Dreznak Oficial' },
      { label: 'Garantía', value: 'Garantía completa del fabricante (3 años)' },
      { label: 'ITV / Inspección', value: 'Válido hasta 2026' },
      { label: 'Certificado HPI', value: 'Limpio y verificado (Sin accidentes)' }
    ],
    keyFeatures: [
      'Sistema de sonido Meridian Signature 35 altavoces',
      'Suspensión neumática dinámica adaptativa',
      'Head-up display a todo color de alta definición',
      'Faros Digital LED con proyección de líneas',
      'Techo panorámico corredizo con filtro solar',
      'Asientos con masaje en 24 posiciones climatizados',
      'Cámara de visión 360° en 3D con sensores predictivos',
      'Conectividad inalámbrica Apple CarPlay y Android Auto',
      'Llantas de aleación de 23 pulgadas en negro pulido',
      'Puertas con cierre suave asistido (Soft-Close)'
    ]
  },
  'veltora-e1': {
    id: 'veltora-e1',
    name: 'Veltora E1',
    category: 'Sedán',
    categoryLabel: 'INVENTARIO - SEDÁN',
    price: '$89,900',
    year: '2024',
    bodyType: 'Sedán',
    fuel: 'Eléctrico',
    seats: '5',
    vin: 'VLT8901239841829',
    stock: 'EVO-VE1-2024',
    description: 'La berlina eléctrica de alto rendimiento que combina autonomía superior con aceleración instantánea y acústica silenciosa de primer nivel.',
    mainImage: 'assets/img/car-veltora.png',
    gallery: [
      'assets/img/car-veltora.png',
      'assets/img/gallery-dreznak-1.png',
      'assets/img/gallery-dreznak-2.webp',
      'assets/img/gallery-dreznak-3.png'
    ],
    specsCards: [
      { label: 'Transmisión', value: 'Directa 1 vel.' },
      { label: 'Kilometraje', value: '1,200 km' },
      { label: 'Motor', value: 'Dual Motor EV' },
      { label: 'Potencia', value: '650 HP' },
      { label: 'Tracción', value: 'AWD Eléctrica' },
      { label: 'Color exterior', value: 'Frozen White' },
      { label: 'Color interior', value: 'Vegan Black Leather' },
      { label: 'Puertas', value: '4' }
    ],
    specifications: [
      { label: 'Transmisión', value: 'Transmisión directa monomarcha' },
      { label: 'Motor', value: 'Doble motor síncrono de imanes permanentes' },
      { label: 'Potencia', value: '650 HP / 850 Nm' },
      { label: 'Autonomía', value: '620 km (ciclo WLTP)' },
      { label: 'Batería', value: '100 kWh Ultium Liquid-Cooled' },
      { label: 'Carga Rápida', value: '10% a 80% en 18 minutos (350 kW)' },
      { label: 'Puertas', value: '4' },
      { label: 'Asientos', value: '5' }
    ],
    conditionHistory: [
      { label: 'Condición', value: 'Seminuevo certificado' },
      { label: 'Propietarios anteriores', value: '1' },
      { label: 'Historial de servicio', value: 'Libro digital oficial completo' },
      { label: 'Garantía', value: 'Garantía de batería hasta 8 años / 160.000 km' },
      { label: 'ITV / Inspección', value: 'Exento hasta 2028' },
      { label: 'Certificado HPI', value: 'Limpio y libre de cargas' }
    ],
    keyFeatures: [
      'Piloto automático asistido Nivel 2+',
      'Cockpit panorámico OLED de 33 pulgadas',
      'Suspensión magnética con escaneo de carretera',
      'Bomba de calor de alta eficiencia térmica',
      'Sistema de sonido espacial Dolby Atmos'
    ]
  },
  'krynox-gt': {
    id: 'krynox-gt',
    name: 'Krynox GT-R',
    category: 'Coupé',
    categoryLabel: 'INVENTARIO - COUPÉ',
    price: '$178,500',
    year: '2023',
    bodyType: 'Coupé',
    fuel: 'Gasolina',
    seats: '4',
    vin: 'KRNX773489210924',
    stock: 'EVO-KGT-2023',
    description: 'Nacido en el circuito para dominar el asfalto. Aerodinámica activa en fibra de carbono y motor biturbo de respuesta inmediata.',
    mainImage: 'assets/img/car-krynox.png',
    gallery: [
      'assets/img/car-krynox.png',
      'assets/img/gallery-dreznak-1.png',
      'assets/img/gallery-dreznak-2.webp',
      'assets/img/gallery-dreznak-3.png'
    ],
    specsCards: [
      { label: 'Transmisión', value: 'Secuencial 7 vel.' },
      { label: 'Kilometraje', value: '8,900 km' },
      { label: 'Motor', value: '4.0L V8 Biturbo' },
      { label: 'Potencia', value: '620 HP' },
      { label: 'Tracción', value: 'RWD Trasera' },
      { label: 'Color exterior', value: 'Apex Grey Matte' },
      { label: 'Color interior', value: 'Alcantara Racing Red' },
      { label: 'Puertas', value: '2' }
    ],
    specifications: [
      { label: 'Transmisión', value: 'Doble embrague de 7 velocidades' },
      { label: 'Motor', value: '4.0L V8 Biturbo cárter seco' },
      { label: 'Potencia', value: '620 HP @ 6,800 rpm' },
      { label: 'Tracción', value: 'Propulsión trasera con diferencial autoblocante' },
      { label: 'Frenos', value: 'Carbocerámicos perforados' },
      { label: 'Aceleración', value: '0-100 km/h en 3.1 segundos' },
      { label: 'Puertas', value: '2' },
      { label: 'Asientos', value: '4' }
    ],
    conditionHistory: [
      { label: 'Condición', value: 'Excelente estado' },
      { label: 'Propietarios anteriores', value: '1' },
      { label: 'Historial de servicio', value: 'Mantenimiento oficial documentado' },
      { label: 'Garantía', value: 'Garantía EVO MOVE Plus 24 meses' },
      { label: 'ITV / Inspección', value: 'Válido hasta 2025' },
      { label: 'Certificado HPI', value: 'Verificado 100% libre de siniestros' }
    ],
    keyFeatures: [
      'Frenos carbocerámicos de competición',
      'Escape deportivo de titanio con válvulas activas',
      'Asientos baquet de fibra de carbono',
      'Alerón trasero retráctil adaptativo',
      'Telemetría de circuito integrada'
    ]
  }
};

const DEFAULT_CAR_ID = 'dreznak-karov';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  let carId = urlParams.get('car') || DEFAULT_CAR_ID;

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
  setupAccordions();
  setupCopyButtons(carData);

  requestAnimationFrame(() => {
    document.querySelectorAll('.car-hero-info, .car-hero-frame').forEach(el => {
      el.classList.add('in');
    });
  });
});

function populateCarData(car) {
  document.title = car.name + ' | EVO MOVE - Concesionario de lujo';

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
}

function setupCarousel() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');
  if (!track) return;

  let currentIndex = 0;

  function updateCarousel() {
    const slides = track.querySelectorAll('.car-carousel-slide');
    const totalSlides = slides.length;
    if (totalSlides === 0) return;

    if (currentIndex < 0) currentIndex = totalSlides - 1;
    if (currentIndex >= totalSlides) currentIndex = 0;

    track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex--;
      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex++;
      updateCarousel();
    });
  }

  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.carousel-dot');
      if (dot) {
        currentIndex = parseInt(dot.getAttribute('data-index'), 10) || 0;
        updateCarousel();
      }
    });
  }
}

function setupAccordions(scope = document) {
  const accItems = scope.querySelectorAll('.faq-item, .accordion-item, .car-acc-item');
  accItems.forEach(item => {
    const header = item.querySelector('.faq-q, .accordion-header, .car-acc-header');
    const body = item.querySelector('.faq-a, .accordion-body, .car-acc-body');
    if (!header || !body) return;

    if (item.classList.contains('open')) {
      body.style.maxHeight = body.scrollHeight + 'px';
    }

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      const container = item.closest('.faq-list, .accordion-list');

      if (container) {
        container.querySelectorAll('.faq-item.open, .accordion-item.open, .car-acc-item.open').forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            const otherBody = other.querySelector('.faq-a, .accordion-body, .car-acc-body');
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
