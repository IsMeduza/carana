/**
 * catalog.js - Single source of truth for the AUTO JUNG vehicle catalog.
 * Defines all vehicles, specifications, filters, lookup dictionaries and card renderers.
 */
window.CAR_CATALOG = [
  {
    "slug": "dreznak-karov",
    "id": "dreznak-karov",
    "name": "Dreznak Karov",
    "price": 145000,
    "priceLabel": "$145,000",
    "year": "2024",
    "badge": "2024",
    "make": "Land Rover",
    "category": "suv",
    "categoryLabel": "INVENTARIO - SUV",
    "condition": "Nuevo",
    "mileage": 3500,
    "bodyType": "SUV",
    "fuel": "Gasolina",
    "seats": "5",
    "vin": "SALWR2V48PA194821",
    "stock": "AJ-DK-2024",
    "description": "Un SUV de ultra-lujo que redefine la potencia y el confort en carretera, con acabados artesanales y tecnología de vanguardia.",
    "image": "assets/img/car-dreznak.png",
    "mainImage": "assets/img/car-dreznak.png",
    "alt": "Range Rover Sport SUV negro lujo",
    "gallery": [
      "assets/img/gallery-dreznak-1.png",
      "assets/img/gallery-dreznak-2.webp",
      "assets/img/gallery-dreznak-3.png",
      "assets/img/car-dreznak.png"
    ],
    "specsCards": [
      {
        "label": "Transmisión",
        "value": "Automático"
      },
      {
        "label": "Kilometraje",
        "value": "3,500 km"
      },
      {
        "label": "Motor",
        "value": "4.4L V8"
      },
      {
        "label": "Potencia",
        "value": "523 HP"
      },
      {
        "label": "Tracción",
        "value": "AWD"
      },
      {
        "label": "Color exterior",
        "value": "Santorini Black"
      },
      {
        "label": "Color interior",
        "value": "Navy / Camel"
      },
      {
        "label": "Puertas",
        "value": "4"
      }
    ],
    "specifications": [
      {
        "label": "Transmisión",
        "value": "Automático de 8 velocidades"
      },
      {
        "label": "Motor",
        "value": "4.4L biturbo V8 (BMW-sourced)"
      },
      {
        "label": "Potencia",
        "value": "523 HP @ 5,500 rpm"
      },
      {
        "label": "Tracción",
        "value": "AWD (4x4 inteligente)"
      },
      {
        "label": "Color exterior",
        "value": "Santorini Negro metálico"
      },
      {
        "label": "Color interior",
        "value": "SV Bespoke cuero (Navy/camel)"
      },
      {
        "label": "Puertas",
        "value": "4"
      },
      {
        "label": "Asientos",
        "value": "5"
      }
    ],
    "conditionHistory": [
      {
        "label": "Condición",
        "value": "Como nuevo"
      },
      {
        "label": "Propietarios anteriores",
        "value": "1"
      },
      {
        "label": "Historial de servicio",
        "value": "Aprobado por Dreznak Oficial"
      },
      {
        "label": "Garantía",
        "value": "Garantía completa del fabricante (3 años)"
      },
      {
        "label": "ITV / Inspección",
        "value": "Válido hasta 2026"
      },
      {
        "label": "Certificado HPI",
        "value": "Limpio y verificado (Sin accidentes)"
      }
    ],
    "keyFeatures": [
      "Sistema de sonido Meridian Signature 35 altavoces",
      "Suspensión neumática dinámica adaptativa",
      "Head-up display a todo color de alta definición",
      "Faros Digital LED con proyección de líneas",
      "Techo panorámico corredizo con filtro solar",
      "Asientos con masaje en 24 posiciones climatizados",
      "Cámara de visión 360° en 3D con sensores predictivos",
      "Conectividad inalámbrica Apple CarPlay y Android Auto",
      "Llantas de aleación de 23 pulgadas en negro pulido",
      "Puertas con cierre suave asistido (Soft-Close)"
    ]
  },
  {
    "slug": "veltora-e1",
    "id": "veltora-e1",
    "name": "Veltora E1",
    "price": 89900,
    "priceLabel": "$89,900",
    "year": "2024",
    "badge": "2024",
    "make": "Audi",
    "category": "familiar",
    "categoryLabel": "INVENTARIO - SEDÁN",
    "condition": "Nuevo",
    "mileage": 4200,
    "bodyType": "Sedán",
    "fuel": "Eléctrico",
    "seats": "5",
    "vin": "VLT8901239841829",
    "stock": "AJ-VE1-2024",
    "description": "La berlina eléctrica de alto rendimiento que combina autonomía superior con aceleración instantánea y acústica silenciosa de primer nivel.",
    "image": "assets/img/car-veltora.png",
    "mainImage": "assets/img/car-veltora.png",
    "alt": "Audi RS6 Avant, gris con llantas negras",
    "gallery": [
      "assets/img/car-veltora.png",
      "assets/img/gallery-dreznak-1.png",
      "assets/img/gallery-dreznak-2.webp",
      "assets/img/gallery-dreznak-3.png"
    ],
    "specsCards": [
      {
        "label": "Transmisión",
        "value": "Directa 1 vel."
      },
      {
        "label": "Kilometraje",
        "value": "1,200 km"
      },
      {
        "label": "Motor",
        "value": "Dual Motor EV"
      },
      {
        "label": "Potencia",
        "value": "650 HP"
      },
      {
        "label": "Tracción",
        "value": "AWD Eléctrica"
      },
      {
        "label": "Color exterior",
        "value": "Frozen White"
      },
      {
        "label": "Color interior",
        "value": "Vegan Black Leather"
      },
      {
        "label": "Puertas",
        "value": "4"
      }
    ],
    "specifications": [
      {
        "label": "Transmisión",
        "value": "Transmisión directa monomarcha"
      },
      {
        "label": "Motor",
        "value": "Doble motor síncrono de imanes permanentes"
      },
      {
        "label": "Potencia",
        "value": "650 HP / 850 Nm"
      },
      {
        "label": "Autonomía",
        "value": "620 km (ciclo WLTP)"
      },
      {
        "label": "Batería",
        "value": "100 kWh Ultium Liquid-Cooled"
      },
      {
        "label": "Carga Rápida",
        "value": "10% a 80% en 18 minutos (350 kW)"
      },
      {
        "label": "Puertas",
        "value": "4"
      },
      {
        "label": "Asientos",
        "value": "5"
      }
    ],
    "conditionHistory": [
      {
        "label": "Condición",
        "value": "Seminuevo certificado"
      },
      {
        "label": "Propietarios anteriores",
        "value": "1"
      },
      {
        "label": "Historial de servicio",
        "value": "Libro digital oficial completo"
      },
      {
        "label": "Garantía",
        "value": "Garantía de batería hasta 8 años / 160.000 km"
      },
      {
        "label": "ITV / Inspección",
        "value": "Exento hasta 2028"
      },
      {
        "label": "Certificado HPI",
        "value": "Limpio y libre de cargas"
      }
    ],
    "keyFeatures": [
      "Piloto automático asistido Nivel 2+",
      "Cockpit panorámico OLED de 33 pulgadas",
      "Suspensión magnética con escaneo de carretera",
      "Bomba de calor de alta eficiencia térmica",
      "Sistema de sonido espacial Dolby Atmos"
    ]
  },
  {
    "slug": "krynox-gt",
    "id": "krynox-gt",
    "name": "Krynox GT-R",
    "price": 178500,
    "priceLabel": "$178,500",
    "year": "2023",
    "badge": "2023",
    "make": "McLaren",
    "category": "descapotable",
    "categoryLabel": "INVENTARIO - COUPÉ",
    "condition": "De ocasión",
    "mileage": 1800,
    "bodyType": "Coupé",
    "fuel": "Gasolina",
    "seats": "4",
    "vin": "KRNX773489210924",
    "stock": "AJ-KGT-2023",
    "description": "Nacido en el circuito para dominar el asfalto. Aerodinámica activa en fibra de carbono y motor biturbo de respuesta inmediata.",
    "image": "assets/img/car-krynox.png",
    "mainImage": "assets/img/car-krynox.png",
    "alt": "McLaren 720S Spider deportivo descapotable naranja",
    "gallery": [
      "assets/img/car-krynox.png",
      "assets/img/gallery-dreznak-1.png",
      "assets/img/gallery-dreznak-2.webp",
      "assets/img/gallery-dreznak-3.png"
    ],
    "specsCards": [
      {
        "label": "Transmisión",
        "value": "Secuencial 7 vel."
      },
      {
        "label": "Kilometraje",
        "value": "8,900 km"
      },
      {
        "label": "Motor",
        "value": "4.0L V8 Biturbo"
      },
      {
        "label": "Potencia",
        "value": "620 HP"
      },
      {
        "label": "Tracción",
        "value": "RWD Trasera"
      },
      {
        "label": "Color exterior",
        "value": "Apex Grey Matte"
      },
      {
        "label": "Color interior",
        "value": "Alcantara Racing Red"
      },
      {
        "label": "Puertas",
        "value": "2"
      }
    ],
    "specifications": [
      {
        "label": "Transmisión",
        "value": "Doble embrague de 7 velocidades"
      },
      {
        "label": "Motor",
        "value": "4.0L V8 Biturbo cárter seco"
      },
      {
        "label": "Potencia",
        "value": "620 HP @ 6,800 rpm"
      },
      {
        "label": "Tracción",
        "value": "Propulsión trasera con diferencial autoblocante"
      },
      {
        "label": "Frenos",
        "value": "Carbocerámicos perforados"
      },
      {
        "label": "Aceleración",
        "value": "0-100 km/h en 3.1 segundos"
      },
      {
        "label": "Puertas",
        "value": "2"
      },
      {
        "label": "Asientos",
        "value": "4"
      }
    ],
    "conditionHistory": [
      {
        "label": "Condición",
        "value": "Excelente estado"
      },
      {
        "label": "Propietarios anteriores",
        "value": "1"
      },
      {
        "label": "Historial de servicio",
        "value": "Mantenimiento oficial documentado"
      },
      {
        "label": "Garantía",
        "value": "Garantía AUTO JUNG Plus 24 meses"
      },
      {
        "label": "ITV / Inspección",
        "value": "Válido hasta 2025"
      },
      {
        "label": "Certificado HPI",
        "value": "Verificado 100% libre de siniestros"
      }
    ],
    "keyFeatures": [
      "Frenos carbocerámicos de competición",
      "Escape deportivo de titanio con válvulas activas",
      "Asientos baquet de fibra de carbono",
      "Alerón trasero retráctil adaptativo",
      "Telemetría de circuito integrada"
    ]
  },
  {
    "slug": "zethrux-vantage",
    "id": "zethrux-vantage",
    "name": "Zethrux Infernum",
    "price": 241350,
    "priceLabel": "$241,350",
    "year": "2023",
    "badge": "2023",
    "make": "Porsche",
    "category": "coupe",
    "categoryLabel": "INVENTARIO - COUPÉ",
    "condition": "De ocasión",
    "mileage": 950,
    "bodyType": "Coupé",
    "fuel": "Gasolina",
    "seats": "2",
    "vin": "WP0AC2A93PS292417",
    "stock": "AJ-ZI-2023",
    "description": "Icono del rendimiento. Un deportivo de circuito nacido para dominar cada curva, con aerodinámica activa y motor de altas revoluciones.",
    "image": "assets/img/car-zethrux.webp",
    "mainImage": "assets/img/car-zethrux.webp",
    "alt": "Porsche 911 GT3 RS superdeportivo plata",
    "gallery": [
      "assets/img/car-zethrux.webp",
      "assets/img/gallery-dreznak-1.png",
      "assets/img/gallery-dreznak-2.webp",
      "assets/img/gallery-dreznak-3.png"
    ],
    "specsCards": [
      {
        "label": "Transmisión",
        "value": "PDK 7 vel."
      },
      {
        "label": "Kilometraje",
        "value": "950 km"
      },
      {
        "label": "Motor",
        "value": "4.0L Bóxer 6"
      },
      {
        "label": "Potencia",
        "value": "525 HP"
      },
      {
        "label": "Tracción",
        "value": "RWD Trasera"
      },
      {
        "label": "Color exterior",
        "value": "GT Silver"
      },
      {
        "label": "Color interior",
        "value": "Cuero Negro"
      },
      {
        "label": "Puertas",
        "value": "2"
      }
    ],
    "specifications": [
      {
        "label": "Transmisión",
        "value": "PDK de 7 velocidades"
      },
      {
        "label": "Motor",
        "value": "4.0L bóxer atmosférico"
      },
      {
        "label": "Potencia",
        "value": "525 HP @ 8,500 rpm"
      },
      {
        "label": "Tracción",
        "value": "Propulsión trasera"
      },
      {
        "label": "Aceleración",
        "value": "0-100 km/h en 3.2 segundos"
      },
      {
        "label": "Velocidad punta",
        "value": "318 km/h"
      },
      {
        "label": "Puertas",
        "value": "2"
      },
      {
        "label": "Asientos",
        "value": "2"
      }
    ],
    "conditionHistory": [
      {
        "label": "Condición",
        "value": "Impecable"
      },
      {
        "label": "Propietarios anteriores",
        "value": "1"
      },
      {
        "label": "Historial de servicio",
        "value": "Mantenimiento oficial completo"
      },
      {
        "label": "Garantía",
        "value": "Garantía AUTO JUNG Plus 24 meses"
      },
      {
        "label": "ITV / Inspección",
        "value": "Válido hasta 2026"
      },
      {
        "label": "Certificado HPI",
        "value": "Limpio y verificado"
      }
    ],
    "keyFeatures": [
      "Paquete Weissach de fibra de carbono",
      "Aerodinámica activa con DRS",
      "Escape deportivo en titanio",
      "Asientos baquet Clubsport",
      "Suspensión de competición adaptativa"
    ]
  },
  {
    "slug": "emblora-wyndcroft",
    "id": "emblora-wyndcroft",
    "name": "Emblora Wyndcroft",
    "price": 239950,
    "priceLabel": "$239,950",
    "year": "2024",
    "badge": "2024",
    "make": "Lamborghini",
    "category": "suv",
    "categoryLabel": "INVENTARIO - SUV",
    "condition": "Nuevo",
    "mileage": 1200,
    "bodyType": "SUV",
    "fuel": "Gasolina",
    "seats": "5",
    "vin": "ZPBPE1RL8RY288701",
    "stock": "AJ-EW-2024",
    "description": "El SUV de superlujo que combina la ferocidad de un deportivo con la elegancia y el espacio de una gran berlina.",
    "image": "assets/img/car-emblora.webp",
    "mainImage": "assets/img/car-emblora.webp",
    "alt": "Lamborghini Urus Performante SUV de superlujo gris mate",
    "gallery": [
      "assets/img/car-emblora.webp",
      "assets/img/gallery-dreznak-1.png",
      "assets/img/gallery-dreznak-2.webp",
      "assets/img/gallery-dreznak-3.png"
    ],
    "specsCards": [
      {
        "label": "Transmisión",
        "value": "Automático 8 vel."
      },
      {
        "label": "Kilometraje",
        "value": "1,200 km"
      },
      {
        "label": "Motor",
        "value": "4.0L V8 Biturbo"
      },
      {
        "label": "Potencia",
        "value": "666 HP"
      },
      {
        "label": "Tracción",
        "value": "AWD"
      },
      {
        "label": "Color exterior",
        "value": "Grigio Telesto"
      },
      {
        "label": "Color interior",
        "value": "Cuero Nero"
      },
      {
        "label": "Puertas",
        "value": "5"
      }
    ],
    "specifications": [
      {
        "label": "Transmisión",
        "value": "Automático de 8 velocidades"
      },
      {
        "label": "Motor",
        "value": "4.0L V8 biturbo"
      },
      {
        "label": "Potencia",
        "value": "666 HP @ 6,000 rpm"
      },
      {
        "label": "Tracción",
        "value": "AWD inteligente"
      },
      {
        "label": "Aceleración",
        "value": "0-100 km/h en 3.3 segundos"
      },
      {
        "label": "Velocidad punta",
        "value": "306 km/h"
      },
      {
        "label": "Puertas",
        "value": "5"
      },
      {
        "label": "Asientos",
        "value": "5"
      }
    ],
    "conditionHistory": [
      {
        "label": "Condición",
        "value": "Nuevo"
      },
      {
        "label": "Propietarios anteriores",
        "value": "0"
      },
      {
        "label": "Historial de servicio",
        "value": "Entrega oficial con libro nuevo"
      },
      {
        "label": "Garantía",
        "value": "Garantía completa del fabricante"
      },
      {
        "label": "ITV / Inspección",
        "value": "Válido hasta 2028"
      },
      {
        "label": "Certificado HPI",
        "value": "Unidad nueva de fábrica"
      }
    ],
    "keyFeatures": [
      "Modo Strada, Sport y Corsa",
      "Escape deportivo con válvulas activas",
      "Sistema de audio premium 3D",
      "Suspensión neumática adaptativa",
      "Cockpit digital con pantalla táctil"
    ]
  },
  {
    "slug": "aurvane-solaris",
    "id": "aurvane-solaris",
    "name": "Aurvane Celeste",
    "price": 82500,
    "priceLabel": "$82,500",
    "year": "2023",
    "badge": "2023",
    "make": "BMW",
    "category": "coupe",
    "categoryLabel": "INVENTARIO - COUPÉ",
    "condition": "De ocasión",
    "mileage": 8400,
    "bodyType": "Coupé",
    "fuel": "Gasolina",
    "seats": "4",
    "vin": "WBS8M9C52J5L20493",
    "stock": "AJ-AC-2023",
    "description": "Un coupé deportivo con ADN de circuito: precisión, potencia y una conducción visceral que enamora en cada kilómetro.",
    "image": "assets/img/car-aurvane.png",
    "mainImage": "assets/img/car-aurvane.png",
    "alt": "BMW M4 Coupé verde metalizado",
    "gallery": [
      "assets/img/car-aurvane.png",
      "assets/img/gallery-dreznak-1.png",
      "assets/img/gallery-dreznak-2.webp",
      "assets/img/gallery-dreznak-3.png"
    ],
    "specsCards": [
      {
        "label": "Transmisión",
        "value": "Automático 8 vel."
      },
      {
        "label": "Kilometraje",
        "value": "8,400 km"
      },
      {
        "label": "Motor",
        "value": "3.0L I6 Biturbo"
      },
      {
        "label": "Potencia",
        "value": "503 HP"
      },
      {
        "label": "Tracción",
        "value": "AWD"
      },
      {
        "label": "Color exterior",
        "value": "Isle of Man Green"
      },
      {
        "label": "Color interior",
        "value": "Cuero Negro"
      },
      {
        "label": "Puertas",
        "value": "2"
      }
    ],
    "specifications": [
      {
        "label": "Transmisión",
        "value": "Automático de 8 velocidades"
      },
      {
        "label": "Motor",
        "value": "3.0L 6 cilindros biturbo"
      },
      {
        "label": "Potencia",
        "value": "503 HP @ 6,250 rpm"
      },
      {
        "label": "Tracción",
        "value": "AWD"
      },
      {
        "label": "Aceleración",
        "value": "0-100 km/h en 3.5 segundos"
      },
      {
        "label": "Velocidad punta",
        "value": "250 km/h"
      },
      {
        "label": "Puertas",
        "value": "2"
      },
      {
        "label": "Asientos",
        "value": "4"
      }
    ],
    "conditionHistory": [
      {
        "label": "Condición",
        "value": "Excelente"
      },
      {
        "label": "Propietarios anteriores",
        "value": "1"
      },
      {
        "label": "Historial de servicio",
        "value": "Mantenimiento oficial"
      },
      {
        "label": "Garantía",
        "value": "Garantía AUTO JUNG Plus 24 meses"
      },
      {
        "label": "ITV / Inspección",
        "value": "Válido hasta 2026"
      },
      {
        "label": "Certificado HPI",
        "value": "Limpio y verificado"
      }
    ],
    "keyFeatures": [
      "Paquete M Competition",
      "Escape deportivo con flaps",
      "Asientos deportivos M",
      "Suspensión adaptativa",
      "Pantalla curva con Head-Up Display"
    ]
  },
  {
    "slug": "soliven-corsa",
    "id": "soliven-corsa",
    "name": "Soliven Brisa",
    "price": 195000,
    "priceLabel": "$195,000",
    "year": "2024",
    "badge": "2024",
    "make": "Aston Martin",
    "category": "coupe",
    "categoryLabel": "INVENTARIO - COUPÉ",
    "condition": "Nuevo",
    "mileage": 2100,
    "bodyType": "Coupé",
    "fuel": "Gasolina",
    "seats": "4",
    "vin": "SCFRMFAV5PGL50104",
    "stock": "AJ-SB-2024",
    "description": "Gran turismo británico de pura cepa: elegancia atemporal, motor V8 y una artesanía que marca la diferencia.",
    "image": "assets/img/car-soliven.png",
    "mainImage": "assets/img/car-soliven.png",
    "alt": "Aston Martin DB12 gran turismo plata",
    "gallery": [
      "assets/img/car-soliven.png",
      "assets/img/gallery-dreznak-1.png",
      "assets/img/gallery-dreznak-2.webp",
      "assets/img/gallery-dreznak-3.png"
    ],
    "specsCards": [
      {
        "label": "Transmisión",
        "value": "Automático 8 vel."
      },
      {
        "label": "Kilometraje",
        "value": "2,100 km"
      },
      {
        "label": "Motor",
        "value": "4.0L V8 Biturbo"
      },
      {
        "label": "Potencia",
        "value": "671 HP"
      },
      {
        "label": "Tracción",
        "value": "RWD Trasera"
      },
      {
        "label": "Color exterior",
        "value": "Aston Martin Racing"
      },
      {
        "label": "Color interior",
        "value": "Cuero Café"
      },
      {
        "label": "Puertas",
        "value": "2"
      }
    ],
    "specifications": [
      {
        "label": "Transmisión",
        "value": "Automático de 8 velocidades"
      },
      {
        "label": "Motor",
        "value": "4.0L V8 biturbo"
      },
      {
        "label": "Potencia",
        "value": "671 HP @ 6,000 rpm"
      },
      {
        "label": "Tracción",
        "value": "Propulsión trasera"
      },
      {
        "label": "Aceleración",
        "value": "0-100 km/h en 3.5 segundos"
      },
      {
        "label": "Velocidad punta",
        "value": "325 km/h"
      },
      {
        "label": "Puertas",
        "value": "2"
      },
      {
        "label": "Asientos",
        "value": "4"
      }
    ],
    "conditionHistory": [
      {
        "label": "Condición",
        "value": "Nuevo"
      },
      {
        "label": "Propietarios anteriores",
        "value": "0"
      },
      {
        "label": "Historial de servicio",
        "value": "Entrega oficial"
      },
      {
        "label": "Garantía",
        "value": "Garantía completa del fabricante"
      },
      {
        "label": "ITV / Inspección",
        "value": "Válido hasta 2028"
      },
      {
        "label": "Certificado HPI",
        "value": "Unidad nueva"
      }
    ],
    "keyFeatures": [
      "Diferencial electrónico trasero",
      "Suspensión adaptativa Skyhook",
      "Sistema de sonido Bowers & Wilkins",
      "Interior de cuero artesanal",
      "Modos GT, Sport y Sport+"
    ]
  },
  {
    "slug": "pharyx-phantom",
    "id": "pharyx-phantom",
    "name": "Pharyx Full",
    "price": 179000,
    "priceLabel": "$179,000",
    "year": "2024",
    "badge": "2024",
    "make": "Mercedes-Benz",
    "category": "suv",
    "categoryLabel": "INVENTARIO - SUV",
    "condition": "De ocasión",
    "mileage": 5600,
    "bodyType": "SUV",
    "fuel": "Gasolina",
    "seats": "5",
    "vin": "W1NYC7BJ3RX232109",
    "stock": "AJ-PF-2024",
    "description": "Un todoterreno de culto con presencia imponente, potencia sobrealimentada y el confort de un auténtico icono de lujo.",
    "image": "assets/img/car-pharyx.png",
    "mainImage": "assets/img/car-pharyx.png",
    "alt": "Mercedes-AMG G 63 Clase G SUV negro",
    "gallery": [
      "assets/img/car-pharyx.png",
      "assets/img/gallery-dreznak-1.png",
      "assets/img/gallery-dreznak-2.webp",
      "assets/img/gallery-dreznak-3.png"
    ],
    "specsCards": [
      {
        "label": "Transmisión",
        "value": "Automático 9 vel."
      },
      {
        "label": "Kilometraje",
        "value": "5,600 km"
      },
      {
        "label": "Motor",
        "value": "4.0L V8 Biturbo"
      },
      {
        "label": "Potencia",
        "value": "585 HP"
      },
      {
        "label": "Tracción",
        "value": "AWD 4Matic"
      },
      {
        "label": "Color exterior",
        "value": "Obsidiana Negra"
      },
      {
        "label": "Color interior",
        "value": "Nappa Rojo"
      },
      {
        "label": "Puertas",
        "value": "5"
      }
    ],
    "specifications": [
      {
        "label": "Transmisión",
        "value": "Automático de 9 velocidades"
      },
      {
        "label": "Motor",
        "value": "4.0L V8 biturbo"
      },
      {
        "label": "Potencia",
        "value": "585 HP @ 5,500 rpm"
      },
      {
        "label": "Tracción",
        "value": "AWD 4Matic"
      },
      {
        "label": "Aceleración",
        "value": "0-100 km/h en 4.5 segundos"
      },
      {
        "label": "Velocidad punta",
        "value": "240 km/h"
      },
      {
        "label": "Puertas",
        "value": "5"
      },
      {
        "label": "Asientos",
        "value": "5"
      }
    ],
    "conditionHistory": [
      {
        "label": "Condición",
        "value": "Como nuevo"
      },
      {
        "label": "Propietarios anteriores",
        "value": "1"
      },
      {
        "label": "Historial de servicio",
        "value": "Mantenimiento oficial"
      },
      {
        "label": "Garantía",
        "value": "Garantía AUTO JUNG Plus 24 meses"
      },
      {
        "label": "ITV / Inspección",
        "value": "Válido hasta 2027"
      },
      {
        "label": "Certificado HPI",
        "value": "Limpio y verificado"
      }
    ],
    "keyFeatures": [
      "Paquete AMG Night",
      "Suspensión AMG Ride Control",
      "Asientos AMG Performance",
      "Sistema Burmester 3D Surround",
      "Faros DIGITAL Light"
    ]
  }
];

// Index vehicle database by slug and id for O(1) detail lookups
window.CAR_DATABASE = {};
window.CAR_CATALOG.forEach(car => {
  window.CAR_DATABASE[car.slug] = car;
  if (car.id) window.CAR_DATABASE[car.id] = car;
});

// Canonical aliases for legacy slugs
window.CAR_ALIASES = {
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

for (const [alias, target] of Object.entries(window.CAR_ALIASES)) {
  if (window.CAR_DATABASE[target]) {
    window.CAR_DATABASE[alias] = window.CAR_DATABASE[target];
  }
}

/**
 * Shared vehicle card component renderer.
 * Eliminates duplicate card templates across Home, Inventory, and Car Detail pages.
 */
window.renderCarCard = function (car, options) {
  options = options || {};
  const delay = options.delay || 1;
  const attrs = options.attributes ? [
    'data-name="' + car.name + '"',
    'data-make="' + car.make + '"',
    'data-category="' + car.category + '"',
    'data-condition="' + car.condition + '"',
    'data-year="' + car.year + '"',
    'data-price="' + car.price + '"',
    'data-mileage="' + car.mileage + '"'
  ].join(' ') : '';
  const metaRight = options.subtitle !== undefined ? options.subtitle : '';
  const arrowSvg = '<svg class="arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M 4 12 L 19.88 12 M 13.75 18.75 L 19.44 13.06 C 19.73 12.77 19.88 12.38 19.88 12 M 13.75 5.25 L 19.44 10.94 C 19.73 11.23 19.88 11.62 19.88 12"/></svg>' +
    '<svg class="arrow-svg arrow-clone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M 4 12 L 19.88 12 M 13.75 18.75 L 19.44 13.06 C 19.73 12.77 19.88 12.38 19.88 12 M 13.75 5.25 L 19.44 10.94 C 19.73 11.23 19.88 11.62 19.88 12"/></svg>';

  return '<a class="car-card reveal-card reveal-delay-' + delay + '" href="coche.html?car=' + car.slug + '" ' + attrs + '>' +
    '<div class="car-img">' +
      '<img src="' + (car.image || car.mainImage) + '" alt="' + (car.alt || car.name) + '" loading="lazy">' +
      '<div class="corner-cutout corner-cutout--bottom-right car-cutout">' +
        '<span class="cutout-btn car-arrow">' +
          '<span class="btn-arrow-wrap"><span class="btn-arrow-track">' + arrowSvg + '</span></span>' +
        '</span>' +
      '</div>' +
    '</div>' +
    '<div class="car-info">' +
      '<div class="car-row"><span class="car-name">' + car.name + '</span><span class="car-price">' + (car.priceLabel || car.price) + '</span></div>' +
      '<div class="car-row"><span class="car-meta">' + car.year + '</span><span class="car-meta">' + metaRight + '</span></div>' +
    '</div>' +
  '</a>';
};
