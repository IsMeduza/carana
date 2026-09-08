/**
 * car.js - Vehicle Detail Page Interactive Logic
 * AUTO JUNG Luxury Dealership
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
    stock: 'AJ-DK-2024',
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
    stock: 'AJ-VE1-2024',
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
    stock: 'AJ-KGT-2023',
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
      { label: 'Garantía', value: 'Garantía AUTO JUNG Plus 24 meses' },
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
  },
  'zethrux-vantage': {
    id: 'zethrux-vantage',
    name: 'Zethrux Infernum',
    category: 'Coupé',
    categoryLabel: 'INVENTARIO - COUPÉ',
    price: '$241,350',
    year: '2023',
    bodyType: 'Coupé',
    fuel: 'Gasolina',
    seats: '2',
    vin: 'WP0AC2A93PS292417',
    stock: 'AJ-ZI-2023',
    description: 'Icono del rendimiento. Un deportivo de circuito nacido para dominar cada curva, con aerodinámica activa y motor de altas revoluciones.',
    mainImage: 'assets/img/car-zethrux.webp',
    gallery: [
      'assets/img/car-zethrux.webp',
      'assets/img/gallery-dreznak-1.png',
      'assets/img/gallery-dreznak-2.webp',
      'assets/img/gallery-dreznak-3.png'
    ],
    specsCards: [
      { label: 'Transmisión', value: 'PDK 7 vel.' },
      { label: 'Kilometraje', value: '950 km' },
      { label: 'Motor', value: '4.0L Bóxer 6' },
      { label: 'Potencia', value: '525 HP' },
      { label: 'Tracción', value: 'RWD Trasera' },
      { label: 'Color exterior', value: 'GT Silver' },
      { label: 'Color interior', value: 'Cuero Negro' },
      { label: 'Puertas', value: '2' }
    ],
    specifications: [
      { label: 'Transmisión', value: 'PDK de 7 velocidades' },
      { label: 'Motor', value: '4.0L bóxer atmosférico' },
      { label: 'Potencia', value: '525 HP @ 8,500 rpm' },
      { label: 'Tracción', value: 'Propulsión trasera' },
      { label: 'Aceleración', value: '0-100 km/h en 3.2 segundos' },
      { label: 'Velocidad punta', value: '318 km/h' },
      { label: 'Puertas', value: '2' },
      { label: 'Asientos', value: '2' }
    ],
    conditionHistory: [
      { label: 'Condición', value: 'Impecable' },
      { label: 'Propietarios anteriores', value: '1' },
      { label: 'Historial de servicio', value: 'Mantenimiento oficial completo' },
      { label: 'Garantía', value: 'Garantía AUTO JUNG Plus 24 meses' },
      { label: 'ITV / Inspección', value: 'Válido hasta 2026' },
      { label: 'Certificado HPI', value: 'Limpio y verificado' }
    ],
    keyFeatures: [
      'Paquete Weissach de fibra de carbono',
      'Aerodinámica activa con DRS',
      'Escape deportivo en titanio',
      'Asientos baquet Clubsport',
      'Suspensión de competición adaptativa'
    ]
  },
  'emblora-wyndcroft': {
    id: 'emblora-wyndcroft',
    name: 'Emblora Wyndcroft',
    category: 'SUV',
    categoryLabel: 'INVENTARIO - SUV',
    price: '$239,950',
    year: '2024',
    bodyType: 'SUV',
    fuel: 'Gasolina',
    seats: '5',
    vin: 'ZPBPE1RL8RY288701',
    stock: 'AJ-EW-2024',
    description: 'El SUV de superlujo que combina la ferocidad de un deportivo con la elegancia y el espacio de una gran berlina.',
    mainImage: 'assets/img/car-emblora.webp',
    gallery: [
      'assets/img/car-emblora.webp',
      'assets/img/gallery-dreznak-1.png',
      'assets/img/gallery-dreznak-2.webp',
      'assets/img/gallery-dreznak-3.png'
    ],
    specsCards: [
      { label: 'Transmisión', value: 'Automático 8 vel.' },
      { label: 'Kilometraje', value: '1,200 km' },
      { label: 'Motor', value: '4.0L V8 Biturbo' },
      { label: 'Potencia', value: '666 HP' },
      { label: 'Tracción', value: 'AWD' },
      { label: 'Color exterior', value: 'Grigio Telesto' },
      { label: 'Color interior', value: 'Cuero Nero' },
      { label: 'Puertas', value: '5' }
    ],
    specifications: [
      { label: 'Transmisión', value: 'Automático de 8 velocidades' },
      { label: 'Motor', value: '4.0L V8 biturbo' },
      { label: 'Potencia', value: '666 HP @ 6,000 rpm' },
      { label: 'Tracción', value: 'AWD inteligente' },
      { label: 'Aceleración', value: '0-100 km/h en 3.3 segundos' },
      { label: 'Velocidad punta', value: '306 km/h' },
      { label: 'Puertas', value: '5' },
      { label: 'Asientos', value: '5' }
    ],
    conditionHistory: [
      { label: 'Condición', value: 'Nuevo' },
      { label: 'Propietarios anteriores', value: '0' },
      { label: 'Historial de servicio', value: 'Entrega oficial con libro nuevo' },
      { label: 'Garantía', value: 'Garantía completa del fabricante' },
      { label: 'ITV / Inspección', value: 'Válido hasta 2028' },
      { label: 'Certificado HPI', value: 'Unidad nueva de fábrica' }
    ],
    keyFeatures: [
      'Modo Strada, Sport y Corsa',
      'Escape deportivo con válvulas activas',
      'Sistema de audio premium 3D',
      'Suspensión neumática adaptativa',
      'Cockpit digital con pantalla táctil'
    ]
  },
  'aurvane-solaris': {
    id: 'aurvane-solaris',
    name: 'Aurvane Celeste',
    category: 'Coupé',
    categoryLabel: 'INVENTARIO - COUPÉ',
    price: '$82,500',
    year: '2023',
    bodyType: 'Coupé',
    fuel: 'Gasolina',
    seats: '4',
    vin: 'WBS8M9C52J5L20493',
    stock: 'AJ-AC-2023',
    description: 'Un coupé deportivo con ADN de circuito: precisión, potencia y una conducción visceral que enamora en cada kilómetro.',
    mainImage: 'assets/img/car-aurvane.png',
    gallery: [
      'assets/img/car-aurvane.png',
      'assets/img/gallery-dreznak-1.png',
      'assets/img/gallery-dreznak-2.webp',
      'assets/img/gallery-dreznak-3.png'
    ],
    specsCards: [
      { label: 'Transmisión', value: 'Automático 8 vel.' },
      { label: 'Kilometraje', value: '8,400 km' },
      { label: 'Motor', value: '3.0L I6 Biturbo' },
      { label: 'Potencia', value: '503 HP' },
      { label: 'Tracción', value: 'AWD' },
      { label: 'Color exterior', value: 'Isle of Man Green' },
      { label: 'Color interior', value: 'Cuero Negro' },
      { label: 'Puertas', value: '2' }
    ],
    specifications: [
      { label: 'Transmisión', value: 'Automático de 8 velocidades' },
      { label: 'Motor', value: '3.0L 6 cilindros biturbo' },
      { label: 'Potencia', value: '503 HP @ 6,250 rpm' },
      { label: 'Tracción', value: 'AWD' },
      { label: 'Aceleración', value: '0-100 km/h en 3.5 segundos' },
      { label: 'Velocidad punta', value: '250 km/h' },
      { label: 'Puertas', value: '2' },
      { label: 'Asientos', value: '4' }
    ],
    conditionHistory: [
      { label: 'Condición', value: 'Excelente' },
      { label: 'Propietarios anteriores', value: '1' },
      { label: 'Historial de servicio', value: 'Mantenimiento oficial' },
      { label: 'Garantía', value: 'Garantía AUTO JUNG Plus 24 meses' },
      { label: 'ITV / Inspección', value: 'Válido hasta 2026' },
      { label: 'Certificado HPI', value: 'Limpio y verificado' }
    ],
    keyFeatures: [
      'Paquete M Competition',
      'Escape deportivo con flaps',
      'Asientos deportivos M',
      'Suspensión adaptativa',
      'Pantalla curva con Head-Up Display'
    ]
  },
  'soliven-corsa': {
    id: 'soliven-corsa',
    name: 'Soliven Brisa',
    category: 'Coupé',
    categoryLabel: 'INVENTARIO - COUPÉ',
    price: '$195,000',
    year: '2024',
    bodyType: 'Coupé',
    fuel: 'Gasolina',
    seats: '4',
    vin: 'SCFRMFAV5PGL50104',
    stock: 'AJ-SB-2024',
    description: 'Gran turismo británico de pura cepa: elegancia atemporal, motor V8 y una artesanía que marca la diferencia.',
    mainImage: 'assets/img/car-soliven.png',
    gallery: [
      'assets/img/car-soliven.png',
      'assets/img/gallery-dreznak-1.png',
      'assets/img/gallery-dreznak-2.webp',
      'assets/img/gallery-dreznak-3.png'
    ],
    specsCards: [
      { label: 'Transmisión', value: 'Automático 8 vel.' },
      { label: 'Kilometraje', value: '2,100 km' },
      { label: 'Motor', value: '4.0L V8 Biturbo' },
      { label: 'Potencia', value: '671 HP' },
      { label: 'Tracción', value: 'RWD Trasera' },
      { label: 'Color exterior', value: 'Aston Martin Racing' },
      { label: 'Color interior', value: 'Cuero Café' },
      { label: 'Puertas', value: '2' }
    ],
    specifications: [
      { label: 'Transmisión', value: 'Automático de 8 velocidades' },
      { label: 'Motor', value: '4.0L V8 biturbo' },
      { label: 'Potencia', value: '671 HP @ 6,000 rpm' },
      { label: 'Tracción', value: 'Propulsión trasera' },
      { label: 'Aceleración', value: '0-100 km/h en 3.5 segundos' },
      { label: 'Velocidad punta', value: '325 km/h' },
      { label: 'Puertas', value: '2' },
      { label: 'Asientos', value: '4' }
    ],
    conditionHistory: [
      { label: 'Condición', value: 'Nuevo' },
      { label: 'Propietarios anteriores', value: '0' },
      { label: 'Historial de servicio', value: 'Entrega oficial' },
      { label: 'Garantía', value: 'Garantía completa del fabricante' },
      { label: 'ITV / Inspección', value: 'Válido hasta 2028' },
      { label: 'Certificado HPI', value: 'Unidad nueva' }
    ],
    keyFeatures: [
      'Diferencial electrónico trasero',
      'Suspensión adaptativa Skyhook',
      'Sistema de sonido Bowers & Wilkins',
      'Interior de cuero artesanal',
      'Modos GT, Sport y Sport+'
    ]
  },
  'pharyx-phantom': {
    id: 'pharyx-phantom',
    name: 'Pharyx Full',
    category: 'SUV',
    categoryLabel: 'INVENTARIO - SUV',
    price: '$179,000',
    year: '2024',
    bodyType: 'SUV',
    fuel: 'Gasolina',
    seats: '5',
    vin: 'W1NYC7BJ3RX232109',
    stock: 'AJ-PF-2024',
    description: 'Un todoterreno de culto con presencia imponente, potencia sobrealimentada y el confort de un auténtico icono de lujo.',
    mainImage: 'assets/img/car-pharyx.png',
    gallery: [
      'assets/img/car-pharyx.png',
      'assets/img/gallery-dreznak-1.png',
      'assets/img/gallery-dreznak-2.webp',
      'assets/img/gallery-dreznak-3.png'
    ],
    specsCards: [
      { label: 'Transmisión', value: 'Automático 9 vel.' },
      { label: 'Kilometraje', value: '5,600 km' },
      { label: 'Motor', value: '4.0L V8 Biturbo' },
      { label: 'Potencia', value: '585 HP' },
      { label: 'Tracción', value: 'AWD 4Matic' },
      { label: 'Color exterior', value: 'Obsidiana Negra' },
      { label: 'Color interior', value: 'Nappa Rojo' },
      { label: 'Puertas', value: '5' }
    ],
    specifications: [
      { label: 'Transmisión', value: 'Automático de 9 velocidades' },
      { label: 'Motor', value: '4.0L V8 biturbo' },
      { label: 'Potencia', value: '585 HP @ 5,500 rpm' },
      { label: 'Tracción', value: 'AWD 4Matic' },
      { label: 'Aceleración', value: '0-100 km/h en 4.5 segundos' },
      { label: 'Velocidad punta', value: '240 km/h' },
      { label: 'Puertas', value: '5' },
      { label: 'Asientos', value: '5' }
    ],
    conditionHistory: [
      { label: 'Condición', value: 'Como nuevo' },
      { label: 'Propietarios anteriores', value: '1' },
      { label: 'Historial de servicio', value: 'Mantenimiento oficial' },
      { label: 'Garantía', value: 'Garantía AUTO JUNG Plus 24 meses' },
      { label: 'ITV / Inspección', value: 'Válido hasta 2027' },
      { label: 'Certificado HPI', value: 'Limpio y verificado' }
    ],
    keyFeatures: [
      'Paquete AMG Night',
      'Suspensión AMG Ride Control',
      'Asientos AMG Performance',
      'Sistema Burmester 3D Surround',
      'Faros DIGITAL Light'
    ]
  }
};

const DEFAULT_CAR_ID = 'dreznak-karov';

const CAR_ALIASES = {
  'veltora-seryn': 'veltora-e1',
  'veltora': 'veltora-e1',
  'krynox-zr-9': 'krynox-gt',
  'krynox-zr9': 'krynox-gt',
  'krynox': 'krynox-gt',
  'dreznak': 'dreznak-karov',
  'zethrux-infernum': 'zethrux-vantage',
  'zethrux': 'zethrux-vantage',
  'emblora': 'emblora-wyndcroft',
  'aurvane-celeste': 'aurvane-solaris',
  'aurvane': 'aurvane-solaris',
  'soliven-brisa': 'soliven-corsa',
  'soliven': 'soliven-corsa',
  'pharyx-full': 'pharyx-phantom',
  'pharyx': 'pharyx-phantom'
};

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
  setupAccordions();
  setupCopyButtons(carData);

  requestAnimationFrame(() => {
    document.querySelectorAll('.car-hero-info, .car-hero-frame').forEach(el => {
      el.classList.add('in');
    });
  });
});

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
