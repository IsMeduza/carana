/**
 * catalog.js - Single source of truth for the vehicle catalog.
 * Canonical name/price/year come from CAR_DATABASE (car.js detail pages).
 * Filter fields (make, category, condition, mileage) power the inventory filters.
 */
window.CAR_CATALOG = [
  {
    slug: 'dreznak-karov',
    name: 'Dreznak Karov',
    price: 145000,
    priceLabel: '$145,000',
    year: '2024',
    badge: '2024',
    make: 'Land Rover',
    category: 'suv',
    condition: 'Nuevo',
    mileage: 3500,
    image: 'assets/img/car-dreznak.png',
    alt: 'Range Rover Sport SUV negro lujo'
  },
  {
    slug: 'veltora-e1',
    name: 'Veltora E1',
    price: 89900,
    priceLabel: '$89,900',
    year: '2024',
    badge: '2024',
    make: 'Audi',
    category: 'familiar',
    condition: 'Nuevo',
    mileage: 4200,
    image: 'assets/img/car-veltora.png',
    alt: 'Audi RS6 Avant, gris con llantas negras'
  },
  {
    slug: 'krynox-gt',
    name: 'Krynox GT-R',
    price: 178500,
    priceLabel: '$178,500',
    year: '2023',
    badge: '2023',
    make: 'McLaren',
    category: 'descapotable',
    condition: 'De ocasión',
    mileage: 1800,
    image: 'assets/img/car-krynox.png',
    alt: 'McLaren 720S Spider deportivo descapotable naranja'
  },
  {
    slug: 'zethrux-vantage',
    name: 'Zethrux Infernum',
    price: 241350,
    priceLabel: '$241,350',
    year: '2023',
    badge: '2023',
    make: 'Porsche',
    category: 'coupe',
    condition: 'De ocasión',
    mileage: 950,
    image: 'assets/img/car-zethrux.webp',
    alt: 'Porsche 911 GT3 RS superdeportivo plata'
  },
  {
    slug: 'emblora-wyndcroft',
    name: 'Emblora Wyndcroft',
    price: 239950,
    priceLabel: '$239,950',
    year: '2024',
    badge: '2024',
    make: 'Lamborghini',
    category: 'suv',
    condition: 'Nuevo',
    mileage: 1200,
    image: 'assets/img/car-emblora.webp',
    alt: 'Lamborghini Urus Performante SUV de superlujo gris mate'
  },
  {
    slug: 'aurvane-solaris',
    name: 'Aurvane Celeste',
    price: 82500,
    priceLabel: '$82,500',
    year: '2023',
    badge: '2023',
    make: 'BMW',
    category: 'coupe',
    condition: 'De ocasión',
    mileage: 8400,
    image: 'assets/img/car-aurvane.png',
    alt: 'BMW M4 Coupé verde metalizado'
  },
  {
    slug: 'soliven-corsa',
    name: 'Soliven Brisa',
    price: 195000,
    priceLabel: '$195,000',
    year: '2024',
    badge: '2024',
    make: 'Aston Martin',
    category: 'coupe',
    condition: 'Nuevo',
    mileage: 2100,
    image: 'assets/img/car-soliven.png',
    alt: 'Aston Martin DB12 gran turismo plata'
  },
  {
    slug: 'pharyx-phantom',
    name: 'Pharyx Full',
    price: 179000,
    priceLabel: '$179,000',
    year: '2024',
    badge: '2024',
    make: 'Mercedes-Benz',
    category: 'suv',
    condition: 'De ocasión',
    mileage: 5600,
    image: 'assets/img/car-pharyx.png',
    alt: 'Mercedes-AMG G 63 Clase G SUV negro'
  }
];