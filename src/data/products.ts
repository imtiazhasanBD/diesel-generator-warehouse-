export interface GeneratorProduct {
  id: string;
  slug: string;
  name: string;
  brand: "Perkins" | "Cummins" | "Caterpillar" | "FG Wilson" | "Ricardo" | "YorPower" | "Aksa";
  type: "Silent Canopy" | "Open Skid" | "Portable" | "Containerized";
  priceText: string;
  priceValueBDT: number;
  standbyKva: number;
  standbyKw: number;
  primeKva: number;
  primeKw: number;
  fuelType: "DIESEL" | "PETROL";
  fuelCapacity: string;
  frequencyHz: number;
  voltage: string;
  phase: "3 Phase" | "1 Phase";
  noiseLevel: string;
  image: string;
  galleryImages: string[];
  brandBadgeText: string;
  shortDesc: string;
  generalFeatures: string[];
  specs: {
    engineBrand: string;
    engineModel: string;
    engineCylinders: string;
    aspiration: string;
    boreStroke: string;
    displacementL: string;
    compressionRatio: string;
    speedRpm: number;
    governorType: string;
    coolingMethod: string;
    oilCapacityL: string;
    coolantCapacityL: string;
    fuelCons100: string;
    fuelCons75: string;
    fuelCons50: string;
    alternatorBrand: string;
    alternatorModel: string;
    insulationClass: string;
    protectionDegree: string;
    voltageRegulation: string;
    powerFactor: string;
    controllerBrand: string;
    controllerModel: string;
    dimensionsMm: string;
    weightKg: number;
  };
  optionalEquipment: {
    title: string;
    description: string;
    icon: string;
  }[];
  certificates: string[];
  documents: {
    title: string;
    code: string;
    fileSize: string;
  }[];
}

export const PRODUCTS: GeneratorProduct[] = [
  {
    id: "prod-1",
    slug: "7kva-yorpower-petrol-portable",
    name: "7kVA YorPower Petrol Generator",
    brand: "YorPower",
    type: "Portable",
    priceText: "POA - FIND OUT MORE",
    priceValueBDT: 245000,
    standbyKva: 7.0,
    standbyKw: 5.6,
    primeKva: 6.5,
    primeKw: 5.2,
    fuelType: "PETROL",
    fuelCapacity: "25L",
    frequencyHz: 50,
    voltage: "230V Single Phase",
    phase: "1 Phase",
    noiseLevel: "72 dBA @ 7m",
    image: "/assets/images/portable-gen.jpg",
    galleryImages: [
      "/assets/images/portable-gen.jpg",
      "/assets/images/engine-circle.jpg",
      "/assets/images/gen-control-panel.jpg"
    ],
    brandBadgeText: "YorPower",
    shortDesc: "Rugged wheeled portable utility genset for emergency worksite, mobile telecom, and residential backup.",
    generalFeatures: [
      "Heavy-duty tubular steel frame with puncture-proof transport wheels",
      "Automatic Voltage Regulation (AVR) for sensitive equipment safety",
      "Low oil automatic engine cutoff and thermal overload breaker",
      "Large 25-liter fuel tank delivering over 10 hours continuous operation",
      "Electric key start with backup recoil pull system"
    ],
    specs: {
      engineBrand: "YorPower Industrial",
      engineModel: "YP-420-OHV",
      engineCylinders: "Single Cylinder 4-Stroke",
      aspiration: "Natural Aspiration",
      boreStroke: "90 x 66 mm",
      displacementL: "0.42 L",
      compressionRatio: "8.5:1",
      speedRpm: 3000,
      governorType: "Mechanical Centrifugal",
      coolingMethod: "Forced Air Cooling",
      oilCapacityL: "1.1 L",
      coolantCapacityL: "N/A (Air Cooled)",
      fuelCons100: "2.4 L/h",
      fuelCons75: "1.8 L/h",
      fuelCons50: "1.3 L/h",
      alternatorBrand: "Copper Wound Heavy Duty",
      alternatorModel: "YP-SYNCH-7K",
      insulationClass: "Class F",
      protectionDegree: "IP23",
      voltageRegulation: "±1.5%",
      powerFactor: "0.8 Lagging",
      controllerBrand: "Digital Multi-Meter",
      controllerModel: "YP-VFT LED",
      dimensionsMm: "710 x 540 x 580 mm",
      weightKg: 88
    },
    optionalEquipment: [
      { title: "Manual Transfer Switch (MTS)", description: "63A 2-pole manual bypass panel for seamless household load switching.", icon: "switch" },
      { title: "Weatherproof Protective Cover", description: "Heavy-duty waterproof PVC fabric cover with vent flaps.", icon: "shield" },
      { title: "All-Terrain Wheel Kit Upgrade", description: "Pneumatic 10-inch rugged rubber wheels with anti-vibration bushings.", icon: "wheel" }
    ],
    certificates: ["CE Marking Directive 2006/42/EC", "ISO 9001:2015 Quality Management", "Euro V Emission Compliant"],
    documents: [
      { title: "Technical Datasheet", code: "DS-YP-7KVA", fileSize: "1.8 MB PDF" },
      { title: "Engine Operator Manual", code: "OM-YP420", fileSize: "2.4 MB PDF" }
    ]
  },
  {
    id: "prod-2",
    slug: "10kva-diesel-generator",
    name: "10kVA Diesel Generator",
    brand: "Ricardo",
    type: "Silent Canopy",
    priceText: "From ৳4,70,000",
    priceValueBDT: 470000,
    standbyKva: 10.0,
    standbyKw: 8.0,
    primeKva: 9.0,
    primeKw: 7.2,
    fuelType: "DIESEL",
    fuelCapacity: "100L",
    frequencyHz: 50,
    voltage: "400V / 230V",
    phase: "3 Phase",
    noiseLevel: "66 dBA @ 7m",
    image: "/assets/images/canopy-white-20k.jpg",
    galleryImages: [
      "/assets/images/canopy-white-20k.jpg",
      "/assets/images/engine-circle.jpg",
      "/assets/images/gen-control-panel.jpg",
      "/assets/images/gen-alternator-shaft.jpg"
    ],
    brandBadgeText: "Ricardo",
    shortDesc: "Ultra-compact silent diesel power unit engineered for retail showrooms, corporate offices, and clinics.",
    generalFeatures: [
      "Water-cooled multi-cylinder diesel engine with low vibration mounts",
      "Electrostatic powder-coated acoustic canopy with acoustic mineral wool",
      "Base integrated 100L fuel tank supporting 24+ hours runtime",
      "Deep Sea UK AMF micro-controller with automatic grid changeover support",
      "Easy maintenance double side-doors with zinc alloy lockable handles"
    ],
    specs: {
      engineBrand: "Ricardo Series",
      engineModel: "R2105D-15",
      engineCylinders: "2 Cylinder In-line",
      aspiration: "Natural Aspiration",
      boreStroke: "105 x 120 mm",
      displacementL: "2.08 L",
      compressionRatio: "17.0:1",
      speedRpm: 1500,
      governorType: "Mechanical",
      coolingMethod: "Water Cooled Radiator (+50°C)",
      oilCapacityL: "4.5 L",
      coolantCapacityL: "12 L",
      fuelCons100: "2.8 L/h",
      fuelCons75: "2.1 L/h",
      fuelCons50: "1.5 L/h",
      alternatorBrand: "Stamford Technology",
      alternatorModel: "PI044D",
      insulationClass: "Class H",
      protectionDegree: "IP23",
      voltageRegulation: "±1.0%",
      powerFactor: "0.8",
      controllerBrand: "Deep Sea Electronics",
      controllerModel: "DSE 4520 MKII",
      dimensionsMm: "1850 x 850 x 1150 mm",
      weightKg: 680
    },
    optionalEquipment: [
      { title: "Automatic Transfer Switch (ATS)", description: "63A 4-Pole automatic mains failure panel with motor motorized interlock.", icon: "switch" },
      { title: "Residential Critical Silencer", description: "Secondary internal exhaust silencer dropping noise down to 62 dBA.", icon: "silencer" },
      { title: "GSM Remote Telemetry", description: "Cloud monitoring module for fuel level, battery health, and fault alerts.", icon: "iot" }
    ],
    certificates: ["ISO 8528 Generator Standards", "ISO 9001:2015 Manufacturing", "CE Compliance Certificate"],
    documents: [
      { title: "Genset Datasheet", code: "DS-RIC-10K", fileSize: "1.4 MB PDF" },
      { title: "Canopy Architectural CAD", code: "CAD-RIC-10", fileSize: "3.2 MB DWG" }
    ]
  },
  {
    id: "prod-3",
    slug: "9kva-silent-perkins-generator",
    name: "9kVA Silent Perkins Generator",
    brand: "Perkins",
    type: "Silent Canopy",
    priceText: "From ৳5,12,000",
    priceValueBDT: 512000,
    standbyKva: 10.0,
    standbyKw: 8.0,
    primeKva: 9.0,
    primeKw: 7.2,
    fuelType: "DIESEL",
    fuelCapacity: "45L",
    frequencyHz: 50,
    voltage: "400V / 230V",
    phase: "3 Phase",
    noiseLevel: "65 dBA @ 7m",
    image: "/assets/images/commercial-white.jpg",
    galleryImages: [
      "/assets/images/commercial-white.jpg",
      "/assets/images/perkins-blue.jpg",
      "/assets/images/engine-circle.jpg",
      "/assets/images/gen-control-panel.jpg"
    ],
    brandBadgeText: "Perkins UK",
    shortDesc: "Genuine UK Perkins 400 series diesel engine paired with Stamford Class H alternator for whisper-quiet standby.",
    generalFeatures: [
      "Original British Perkins 403A-11G1 engine built in Peterborough, UK",
      "Stamford brushless alternator with Class H insulation and AVR",
      "Super-silent weatherproof canopy with stainless steel flush hinges",
      "Deep Sea DSE6120 digital auto start control panel",
      "Engine jacket water pre-heater for rapid emergency synchronizing"
    ],
    specs: {
      engineBrand: "Perkins (UK)",
      engineModel: "403A-11G1",
      engineCylinders: "3 Cylinder In-line",
      aspiration: "Natural Aspiration",
      boreStroke: "77 x 81 mm",
      displacementL: "1.13 L",
      compressionRatio: "23.0:1",
      speedRpm: 1500,
      governorType: "Mechanical",
      coolingMethod: "Closed Circuit Radiator",
      oilCapacityL: "4.9 L",
      coolantCapacityL: "5.2 L",
      fuelCons100: "2.6 L/h",
      fuelCons75: "2.0 L/h",
      fuelCons50: "1.4 L/h",
      alternatorBrand: "Stamford",
      alternatorModel: "SOL1-P1",
      insulationClass: "Class H",
      protectionDegree: "IP23",
      voltageRegulation: "±0.5%",
      powerFactor: "0.8",
      controllerBrand: "Deep Sea (UK)",
      controllerModel: "DSE 6120 MKIII",
      dimensionsMm: "1650 x 820 x 1100 mm",
      weightKg: 520
    },
    optionalEquipment: [
      { title: "Integrated ATS Panel", description: "Built-in automatic transfer switch for zero-human-intervention starting.", icon: "switch" },
      { title: "Jacket Water Heater", description: "Thermostatically controlled 500W engine block heater.", icon: "heater" },
      { title: "Extended 24H Fuel Tank", description: "Sub-base double-walled bunded fuel cell with leak sensor.", icon: "fuel" }
    ],
    certificates: ["ISO 8528-5 Transient Response", "BS 5000 British Electrical Standard", "CE Safety Certification"],
    documents: [
      { title: "Perkins 403A Datasheet", code: "P-403A-DS", fileSize: "2.1 MB PDF" },
      { title: "Wiring & Schematic Diagram", code: "SCH-9K-PERK", fileSize: "1.9 MB PDF" }
    ]
  },
  {
    id: "prod-4",
    slug: "13kva-diesel-generator",
    name: "13kVA Diesel Generator",
    brand: "Ricardo",
    type: "Silent Canopy",
    priceText: "From ৳5,22,000",
    priceValueBDT: 522000,
    standbyKva: 14.0,
    standbyKw: 11.2,
    primeKva: 13.0,
    primeKw: 10.4,
    fuelType: "DIESEL",
    fuelCapacity: "100L",
    frequencyHz: 50,
    voltage: "400V / 230V",
    phase: "3 Phase",
    noiseLevel: "67 dBA @ 7m",
    image: "/assets/images/canopy-white-20k.jpg",
    galleryImages: [
      "/assets/images/canopy-white-20k.jpg",
      "/assets/images/engine-circle.jpg",
      "/assets/images/gen-control-panel.jpg"
    ],
    brandBadgeText: "Ricardo",
    shortDesc: "Reliable commercial workhorse designed for retail banks, petrol pumps, and suburban garment sub-stations.",
    generalFeatures: [
      "Turbocharged 3-cylinder diesel powertrain with direct electronic fuel delivery",
      "Stamford Class H alternator with 100% pure electrolytic copper coils",
      "Vibration dampers between baseframe and skid reducing ground harmonics",
      "Lockable recessed fuel filler neck with mechanical level gauge",
      "Emergency external mushroom stop button on exterior canopy"
    ],
    specs: {
      engineBrand: "Ricardo Series",
      engineModel: "R3105D-18",
      engineCylinders: "3 Cylinder In-line",
      aspiration: "Natural Aspiration",
      boreStroke: "105 x 120 mm",
      displacementL: "3.12 L",
      compressionRatio: "17.0:1",
      speedRpm: 1500,
      governorType: "Mechanical",
      coolingMethod: "Heavy Duty Tropical Radiator",
      oilCapacityL: "7.0 L",
      coolantCapacityL: "14 L",
      fuelCons100: "3.6 L/h",
      fuelCons75: "2.8 L/h",
      fuelCons50: "1.9 L/h",
      alternatorBrand: "Stamford",
      alternatorModel: "PI044F",
      insulationClass: "Class H",
      protectionDegree: "IP23",
      voltageRegulation: "±1.0%",
      powerFactor: "0.8",
      controllerBrand: "Deep Sea",
      controllerModel: "DSE 4520",
      dimensionsMm: "1950 x 900 x 1200 mm",
      weightKg: 780
    },
    optionalEquipment: [
      { title: "Schneider 4-Pole ATS", description: "Heavy-duty contactor based transfer switch with mechanical interlock.", icon: "switch" },
      { title: "Mobile 2-Wheel Trailer", description: "DOT approved highway chassis with rear lights and hitch.", icon: "trailer" }
    ],
    certificates: ["ISO 9001:2015 Certification", "ISO 14001 Environmental Standard", "CE Compliant"],
    documents: [
      { title: "Complete Spec Sheet", code: "DS-13K-RIC", fileSize: "1.6 MB PDF" }
    ]
  },
  {
    id: "prod-5",
    slug: "13kva-silent-perkins-generator",
    name: "13kVA Silent Perkins Generator",
    brand: "Perkins",
    type: "Silent Canopy",
    priceText: "From ৳5,75,000",
    priceValueBDT: 575000,
    standbyKva: 14.0,
    standbyKw: 11.2,
    primeKva: 13.0,
    primeKw: 10.4,
    fuelType: "DIESEL",
    fuelCapacity: "65L",
    frequencyHz: 50,
    voltage: "400V / 230V",
    phase: "3 Phase",
    noiseLevel: "65 dBA @ 7m",
    image: "/assets/images/commercial-white.jpg",
    galleryImages: [
      "/assets/images/commercial-white.jpg",
      "/assets/images/engine-circle.jpg",
      "/assets/images/gen-alternator-shaft.jpg"
    ],
    brandBadgeText: "Perkins UK",
    shortDesc: "High-spec silent standby generator powered by Perkins 403A-15G1 engine with low fuel burn rate.",
    generalFeatures: [
      "Perkins 403A-15G1 3-cylinder diesel with clean mechanical governor",
      "Stamford brushless alternator with Class H 180°C thermal endurance",
      "Sound reduction canopy lined with flame-retardant rockwool insulation",
      "Integrated emergency stop and keyless DSE digital auto-start",
      "Heavy duty base lifting eyelets and fork pockets for crane positioning"
    ],
    specs: {
      engineBrand: "Perkins (UK)",
      engineModel: "403A-15G1",
      engineCylinders: "3 Cylinder In-line",
      aspiration: "Natural Aspiration",
      boreStroke: "84 x 90 mm",
      displacementL: "1.496 L",
      compressionRatio: "22.5:1",
      speedRpm: 1500,
      governorType: "Mechanical",
      coolingMethod: "Water Cooled Radiator",
      oilCapacityL: "6.0 L",
      coolantCapacityL: "6.0 L",
      fuelCons100: "3.7 L/h",
      fuelCons75: "2.8 L/h",
      fuelCons50: "1.9 L/h",
      alternatorBrand: "Stamford",
      alternatorModel: "SOL1-V1",
      insulationClass: "Class H",
      protectionDegree: "IP23",
      voltageRegulation: "±0.5%",
      powerFactor: "0.8",
      controllerBrand: "Deep Sea",
      controllerModel: "DSE 6120",
      dimensionsMm: "1750 x 850 x 1150 mm",
      weightKg: 580
    },
    optionalEquipment: [
      { title: "Automatic Mains Failure (AMF)", description: "Standalone NEMA 3R wall-mount automatic sync panel.", icon: "switch" },
      { title: "Static Battery Float Charger", description: "240V AC to 12V DC constant trickle float charger.", icon: "battery" }
    ],
    certificates: ["ISO 8528 Standard", "BS EN ISO 9001", "CE Certified"],
    documents: [
      { title: "Perkins 403A-15 Datasheet", code: "P-403A-15-DS", fileSize: "2.3 MB PDF" }
    ]
  },
  {
    id: "prod-6",
    slug: "17kva-fg-wilson-generator",
    name: "17kVA FG Wilson Generator",
    brand: "FG Wilson",
    type: "Silent Canopy",
    priceText: "POA - FIND OUT MORE",
    priceValueBDT: 620000,
    standbyKva: 18.7,
    standbyKw: 15.0,
    primeKva: 17.0,
    primeKw: 13.6,
    fuelType: "DIESEL",
    fuelCapacity: "SEE DATA SHEET",
    frequencyHz: 50,
    voltage: "400V / 230V",
    phase: "3 Phase",
    noiseLevel: "68 dBA @ 7m",
    image: "/assets/images/canopy-white-20k.jpg",
    galleryImages: [
      "/assets/images/canopy-white-20k.jpg",
      "/assets/images/gen-control-panel.jpg"
    ],
    brandBadgeText: "FG Wilson",
    shortDesc: "Belfast-engineered FG Wilson continuous duty genset featuring Perkins 404D-22G power block.",
    generalFeatures: [
      "Perkins 404D-22G Tier 3 compliant diesel engine",
      "Leroy Somer / FG Wilson Marelli brushless alternator",
      "DCP-10 digital control module with multi-lingual LCD telemetry",
      "Weather-protective modular acoustic canopy with removable roof panel",
      "Spill containment base frame with optical liquid detection"
    ],
    specs: {
      engineBrand: "Perkins (FG Wilson)",
      engineModel: "404D-22G",
      engineCylinders: "4 Cylinder In-line",
      aspiration: "Natural Aspiration",
      boreStroke: "84 x 100 mm",
      displacementL: "2.216 L",
      compressionRatio: "23.3:1",
      speedRpm: 1500,
      governorType: "Mechanical",
      coolingMethod: "Anti-Freeze Radiator (+50°C)",
      oilCapacityL: "10.6 L",
      coolantCapacityL: "7.0 L",
      fuelCons100: "4.8 L/h",
      fuelCons75: "3.6 L/h",
      fuelCons50: "2.6 L/h",
      alternatorBrand: "FG Wilson",
      alternatorModel: "FGL10040",
      insulationClass: "Class H",
      protectionDegree: "IP23",
      voltageRegulation: "±1.0%",
      powerFactor: "0.8",
      controllerBrand: "FG Wilson",
      controllerModel: "DCP-10",
      dimensionsMm: "1870 x 890 x 1230 mm",
      weightKg: 690
    },
    optionalEquipment: [
      { title: "Upgraded PowerWizard 1.1+", description: "Advanced diagnostic panel with CAN bus J1939 interface.", icon: "controller" },
      { title: "Heavy Duty Air Filter", description: "Cyclonic pre-cleaner for dusty cement & construction environments.", icon: "filter" }
    ],
    certificates: ["ISO 9001:2015 FG Wilson Belfast", "European Directive 2000/14/EC", "CE Certificate"],
    documents: [
      { title: "FG Wilson 17kVA Spec", code: "FGW-P17-DS", fileSize: "2.0 MB PDF" }
    ]
  },
  {
    id: "prod-7",
    slug: "20kva-fg-wilson-generator",
    name: "20kVA FG Wilson Generator",
    brand: "FG Wilson",
    type: "Silent Canopy",
    priceText: "POA - FIND OUT MORE",
    priceValueBDT: 680000,
    standbyKva: 22.0,
    standbyKw: 17.6,
    primeKva: 20.0,
    primeKw: 16.0,
    fuelType: "DIESEL",
    fuelCapacity: "SEE DATA SHEET",
    frequencyHz: 50,
    voltage: "400V / 230V",
    phase: "3 Phase",
    noiseLevel: "68 dBA @ 7m",
    image: "/assets/images/canopy-white-20k.jpg",
    galleryImages: [
      "/assets/images/canopy-white-20k.jpg",
      "/assets/images/engine-circle.jpg"
    ],
    brandBadgeText: "FG Wilson",
    shortDesc: "Premium UK FG Wilson diesel generator set for critical commercial & telecom data repeater sites.",
    generalFeatures: [
      "Perkins 404A-22G1 heavy-duty industrial diesel block",
      "High surge capability starting electric motors up to 7.5 kW directly",
      "Sound attenuated enclosure with acoustic foam certified UL94 standard",
      "Lockable fuel cap located behind secure key-access side door",
      "Automatic battery charger and heavy lead-acid starter battery included"
    ],
    specs: {
      engineBrand: "Perkins",
      engineModel: "404A-22G1",
      engineCylinders: "4 Cylinder In-line",
      aspiration: "Natural Aspiration",
      boreStroke: "84 x 100 mm",
      displacementL: "2.216 L",
      compressionRatio: "23.3:1",
      speedRpm: 1500,
      governorType: "Mechanical",
      coolingMethod: "Tropical Radiator",
      oilCapacityL: "10.6 L",
      coolantCapacityL: "7.0 L",
      fuelCons100: "5.4 L/h",
      fuelCons75: "4.0 L/h",
      fuelCons50: "2.9 L/h",
      alternatorBrand: "FG Wilson",
      alternatorModel: "FGL10060",
      insulationClass: "Class H",
      protectionDegree: "IP23",
      voltageRegulation: "±1.0%",
      powerFactor: "0.8",
      controllerBrand: "FG Wilson",
      controllerModel: "PowerWizard 1.1",
      dimensionsMm: "1920 x 920 x 1280 mm",
      weightKg: 740
    },
    optionalEquipment: [
      { title: "Bypass ATS Panel", description: "Dual-circuit bypass isolator for maintenance during live utility feed.", icon: "switch" }
    ],
    certificates: ["ISO 8528", "CE Quality Mark", "ISO 14001"],
    documents: [
      { title: "Technical Datasheet", code: "FGW-20K-DS", fileSize: "1.8 MB PDF" }
    ]
  },
  {
    id: "prod-8",
    slug: "20kva-cummins-diesel-generator",
    name: "20kVA Cummins Diesel Generator",
    brand: "Cummins",
    type: "Silent Canopy",
    priceText: "From ৳6,60,000",
    priceValueBDT: 660000,
    standbyKva: 22.0,
    standbyKw: 17.6,
    primeKva: 20.0,
    primeKw: 16.0,
    fuelType: "DIESEL",
    fuelCapacity: "SEE DATA SHEET",
    frequencyHz: 50,
    voltage: "400V / 230V",
    phase: "3 Phase",
    noiseLevel: "68 dBA @ 7m",
    image: "/assets/images/project-green.jpg",
    galleryImages: [
      "/assets/images/project-green.jpg",
      "/assets/images/engine-circle.jpg",
      "/assets/images/gen-control-panel.jpg"
    ],
    brandBadgeText: "Cummins USA",
    shortDesc: "Cummins B-series legendary reliability in an acoustic enclosure built for harsh subcontinental weather.",
    generalFeatures: [
      "Genuine Cummins 4B3.9-G1 4-cylinder direct injection engine",
      "Stamford brushless alternator with SX460 AVR and 12-wire reconnectable leads",
      "Heavy gauge 2.5mm steel canopy with anti-corrosive powder coating",
      "Cummins PowerCommand 1.1 micro-controller with full engine diagnostics",
      "Full load continuous prime operation in high ambient conditions"
    ],
    specs: {
      engineBrand: "Cummins",
      engineModel: "4B3.9-G1",
      engineCylinders: "4 Cylinder In-line",
      aspiration: "Natural Aspiration",
      boreStroke: "102 x 120 mm",
      displacementL: "3.9 L",
      compressionRatio: "16.5:1",
      speedRpm: 1500,
      governorType: "Mechanical",
      coolingMethod: "Water Cooled Radiator (+50°C)",
      oilCapacityL: "10.9 L",
      coolantCapacityL: "19.9 L",
      fuelCons100: "5.8 L/h",
      fuelCons75: "4.4 L/h",
      fuelCons50: "3.2 L/h",
      alternatorBrand: "Stamford",
      alternatorModel: "SOL2-P1",
      insulationClass: "Class H",
      protectionDegree: "IP23",
      voltageRegulation: "±1.0%",
      powerFactor: "0.8",
      controllerBrand: "Cummins PowerCommand",
      controllerModel: "PC 1.1",
      dimensionsMm: "2200 x 950 x 1350 mm",
      weightKg: 920
    },
    optionalEquipment: [
      { title: "Cummins Inpower Diagnostic Tool Kit", description: "Laptop interface software for custom calibrations.", icon: "software" },
      { title: "Heavy Duty ATS Panel", description: "100A 4-Pole automatic transfer switch with micro-processor control.", icon: "switch" }
    ],
    certificates: ["ISO 8528 Prime Certified", "Cummins Global Warranty Certification", "CE Mark"],
    documents: [
      { title: "Cummins 20kVA Datasheet", code: "CUM-20K-DS", fileSize: "2.6 MB PDF" }
    ]
  },
  {
    id: "prod-9",
    slug: "20kva-diesel-generator-ricardo",
    name: "20kVA Diesel Generator",
    brand: "Ricardo",
    type: "Silent Canopy",
    priceText: "From ৳4,87,000",
    priceValueBDT: 487000,
    standbyKva: 22.0,
    standbyKw: 17.6,
    primeKva: 20.0,
    primeKw: 16.0,
    fuelType: "DIESEL",
    fuelCapacity: "100L",
    frequencyHz: 50,
    voltage: "400V / 230V",
    phase: "3 Phase",
    noiseLevel: "68 dBA @ 7m",
    image: "/assets/images/canopy-white-20k.jpg",
    galleryImages: [
      "/assets/images/canopy-white-20k.jpg",
      "/assets/images/engine-circle.jpg"
    ],
    brandBadgeText: "Ricardo",
    shortDesc: "Best cost-to-performance silent generator for manufacturing units, diagnostic centers, and hotels.",
    generalFeatures: [
      "Turbocharged 4-cylinder Ricardo technology diesel engine",
      "Stamford brushless alternator with Class H 100% copper windings",
      "Acoustic noise suppression canopy with interior intake baffles",
      "Deep Sea DSE4520 AMF digital telemetry panel",
      "Base mounted steel fuel tank with low fuel level warning contact"
    ],
    specs: {
      engineBrand: "Ricardo Series",
      engineModel: "4100D-20",
      engineCylinders: "4 Cylinder In-line",
      aspiration: "Natural Aspiration",
      boreStroke: "100 x 115 mm",
      displacementL: "3.61 L",
      compressionRatio: "17.0:1",
      speedRpm: 1500,
      governorType: "Mechanical",
      coolingMethod: "Forced Water Radiator",
      oilCapacityL: "8.0 L",
      coolantCapacityL: "14 L",
      fuelCons100: "5.2 L/h",
      fuelCons75: "3.9 L/h",
      fuelCons50: "2.8 L/h",
      alternatorBrand: "Stamford",
      alternatorModel: "PI144D",
      insulationClass: "Class H",
      protectionDegree: "IP23",
      voltageRegulation: "±1.0%",
      powerFactor: "0.8",
      controllerBrand: "Deep Sea",
      controllerModel: "DSE 4520",
      dimensionsMm: "2050 x 900 x 1250 mm",
      weightKg: 850
    },
    optionalEquipment: [
      { title: "Motorized 63A ATS Panel", description: "Automatic dual-source power switching panel with delay timers.", icon: "switch" }
    ],
    certificates: ["ISO 9001:2015 Certified", "CE Quality Compliant"],
    documents: [
      { title: "Datasheet", code: "DS-RIC-20K", fileSize: "1.5 MB PDF" }
    ]
  },
  {
    id: "prod-10",
    slug: "20kva-silent-perkins-generator",
    name: "20kVA Silent Perkins Generator",
    brand: "Perkins",
    type: "Silent Canopy",
    priceText: "From ৳6,35,000",
    priceValueBDT: 635000,
    standbyKva: 22.0,
    standbyKw: 17.6,
    primeKva: 20.0,
    primeKw: 16.0,
    fuelType: "DIESEL",
    fuelCapacity: "65L",
    frequencyHz: 50,
    voltage: "400V / 230V",
    phase: "3 Phase",
    noiseLevel: "65 dBA @ 7m",
    image: "/assets/images/commercial-white.jpg",
    galleryImages: [
      "/assets/images/commercial-white.jpg",
      "/assets/images/perkins-blue.jpg",
      "/assets/images/gen-control-panel.jpg"
    ],
    brandBadgeText: "Perkins UK",
    shortDesc: "Whisper-quiet Perkins 404A-22G1 power plant engineered for hospitals, universities, and residential towers.",
    generalFeatures: [
      "Original British Perkins 404A-22G1 4-cylinder engine",
      "Stamford Class H copper alternator with automatic voltage regulator (AVR)",
      "Sound attenuated acoustic canopy (<65 dBA @ 7m)",
      "Deep Sea UK DSE6120 controller with USB programming port",
      "High capacity battery and heavy duty industrial silencer included"
    ],
    specs: {
      engineBrand: "Perkins (UK)",
      engineModel: "404A-22G1",
      engineCylinders: "4 Cylinder In-line",
      aspiration: "Natural Aspiration",
      boreStroke: "84 x 100 mm",
      displacementL: "2.216 L",
      compressionRatio: "23.3:1",
      speedRpm: 1500,
      governorType: "Mechanical",
      coolingMethod: "Water Cooled Radiator",
      oilCapacityL: "10.6 L",
      coolantCapacityL: "7.0 L",
      fuelCons100: "5.3 L/h",
      fuelCons75: "4.0 L/h",
      fuelCons50: "2.9 L/h",
      alternatorBrand: "Stamford",
      alternatorModel: "SOL2-G1",
      insulationClass: "Class H",
      protectionDegree: "IP23",
      voltageRegulation: "±0.5%",
      powerFactor: "0.8",
      controllerBrand: "Deep Sea",
      controllerModel: "DSE 6120",
      dimensionsMm: "1920 x 880 x 1200 mm",
      weightKg: 680
    },
    optionalEquipment: [
      { title: "DSE WebNet Gateway", description: "Remote monitoring via 4G SIM card for cloud telemetry.", icon: "iot" },
      { title: "Critical Hospital Silencer", description: "Exhaust noise dampening dropping ambient to 60 dBA.", icon: "silencer" }
    ],
    certificates: ["ISO 8528", "BS 5000", "CE Compliance"],
    documents: [
      { title: "Technical Datasheet", code: "P-404A-22-DS", fileSize: "2.4 MB PDF" }
    ]
  },
  {
    id: "prod-11",
    slug: "25kva-cummins-open-generator",
    name: "25kVA Cummins Open Generator",
    brand: "Cummins",
    type: "Open Skid",
    priceText: "POA - FIND OUT MORE",
    priceValueBDT: 590000,
    standbyKva: 28.0,
    standbyKw: 22.4,
    primeKva: 25.0,
    primeKw: 20.0,
    fuelType: "DIESEL",
    fuelCapacity: "120L",
    frequencyHz: 50,
    voltage: "400V / 230V",
    phase: "3 Phase",
    noiseLevel: "Open Frame (Plant Room)",
    image: "/assets/images/open-skid.jpg",
    galleryImages: [
      "/assets/images/open-skid.jpg",
      "/assets/images/engine-circle.jpg",
      "/assets/images/gen-alternator-shaft.jpg"
    ],
    brandBadgeText: "Cummins USA",
    shortDesc: "Rugged open skid generator for dedicated acoustic generator rooms, factory basements, and pumping stations.",
    generalFeatures: [
      "Cummins 4B3.9-G2 direct-injection 4-cylinder engine",
      "Stamford brushless alternator mounted on heavy I-beam steel skid",
      "High cooling capacity radiator engineered for continuous tropical operation",
      "PowerCommand digital automatic controller with safety protection trips",
      "Anti-vibration isolators isolating 98% of mechanical engine vibration"
    ],
    specs: {
      engineBrand: "Cummins",
      engineModel: "4B3.9-G2",
      engineCylinders: "4 Cylinder In-line",
      aspiration: "Turbocharged",
      boreStroke: "102 x 120 mm",
      displacementL: "3.9 L",
      compressionRatio: "16.5:1",
      speedRpm: 1500,
      governorType: "Mechanical / Electronic Option",
      coolingMethod: "Tropical Radiator",
      oilCapacityL: "10.9 L",
      coolantCapacityL: "19.9 L",
      fuelCons100: "6.9 L/h",
      fuelCons75: "5.2 L/h",
      fuelCons50: "3.8 L/h",
      alternatorBrand: "Stamford",
      alternatorModel: "SOL2-M1",
      insulationClass: "Class H",
      protectionDegree: "IP23",
      voltageRegulation: "±1.0%",
      powerFactor: "0.8",
      controllerBrand: "Cummins",
      controllerModel: "PowerCommand 1.1",
      dimensionsMm: "1850 x 850 x 1250 mm",
      weightKg: 780
    },
    optionalEquipment: [
      { title: "Plant Room Sound Attenuation Kit", description: "Intake and discharge acoustic louvers and exhaust lagging.", icon: "acoustic" }
    ],
    certificates: ["ISO 8528 Prime Rating", "CE Certified"],
    documents: [
      { title: "Cummins 25kVA Open Spec", code: "CUM-25K-OPEN", fileSize: "2.1 MB PDF" }
    ]
  },
  {
    id: "prod-12",
    slug: "25kva-cummins-silent-generator",
    name: "25kVA Cummins Diesel Generator",
    brand: "Cummins",
    type: "Silent Canopy",
    priceText: "From ৳6,90,000",
    priceValueBDT: 690000,
    standbyKva: 28.0,
    standbyKw: 22.4,
    primeKva: 25.0,
    primeKw: 20.0,
    fuelType: "DIESEL",
    fuelCapacity: "120L",
    frequencyHz: 50,
    voltage: "400V / 230V",
    phase: "3 Phase",
    noiseLevel: "68 dBA @ 7m",
    image: "/assets/images/project-green.jpg",
    galleryImages: [
      "/assets/images/project-green.jpg",
      "/assets/images/engine-circle.jpg"
    ],
    brandBadgeText: "Cummins USA",
    shortDesc: "Fully canopy-enclosed Cummins 25 kVA silent diesel genset for round-the-clock uninterrupted production.",
    generalFeatures: [
      "Turbocharged 4-cylinder Cummins powertrain",
      "Weatherproof laser-cut steel canopy with electrostatic paint coating",
      "Stamford Class H alternator with AVR ±1.0% regulation",
      "Deep Sea / PowerCommand digital AMF automatic starting panel",
      "Base fuel tank designed for 16-18 hours continuous full-load run"
    ],
    specs: {
      engineBrand: "Cummins",
      engineModel: "4BT3.9-G1",
      engineCylinders: "4 Cylinder In-line Turbo",
      aspiration: "Turbocharged",
      boreStroke: "102 x 120 mm",
      displacementL: "3.9 L",
      compressionRatio: "17.3:1",
      speedRpm: 1500,
      governorType: "Mechanical",
      coolingMethod: "Water Cooled Radiator",
      oilCapacityL: "11.0 L",
      coolantCapacityL: "21.0 L",
      fuelCons100: "7.1 L/h",
      fuelCons75: "5.4 L/h",
      fuelCons50: "3.9 L/h",
      alternatorBrand: "Stamford",
      alternatorModel: "UCI224D",
      insulationClass: "Class H",
      protectionDegree: "IP23",
      voltageRegulation: "±1.0%",
      powerFactor: "0.8",
      controllerBrand: "PowerCommand",
      controllerModel: "PC 1.2",
      dimensionsMm: "2350 x 1000 x 1400 mm",
      weightKg: 1020
    },
    optionalEquipment: [
      { title: "ABB Motorized 100A ATS", description: "Premium European ATS with front-panel test button.", icon: "switch" }
    ],
    certificates: ["ISO 9001", "CE Compliant", "ISO 8528"],
    documents: [
      { title: "Datasheet", code: "CUM-25K-CANOPY", fileSize: "2.5 MB PDF" }
    ]
  },
  {
    id: "prod-13",
    slug: "30kva-diesel-generator",
    name: "30kVA Diesel Generator",
    brand: "Ricardo",
    type: "Silent Canopy",
    priceText: "From ৳7,55,000",
    priceValueBDT: 755000,
    standbyKva: 33.0,
    standbyKw: 26.4,
    primeKva: 30.0,
    primeKw: 24.0,
    fuelType: "DIESEL",
    fuelCapacity: "180L",
    frequencyHz: 50,
    voltage: "400V / 230V",
    phase: "3 Phase",
    noiseLevel: "68 dBA @ 7m",
    image: "/assets/images/canopy-white-20k.jpg",
    galleryImages: [
      "/assets/images/canopy-white-20k.jpg",
      "/assets/images/engine-circle.jpg",
      "/assets/images/gen-control-panel.jpg"
    ],
    brandBadgeText: "Ricardo",
    shortDesc: "High-capacity standby diesel generator for multi-storey residential complexes and garment factories.",
    generalFeatures: [
      "Turbocharged 4-cylinder water-cooled heavy duty diesel engine",
      "Stamford Class H alternator with 100% pure copper brushless rotor",
      "Soundproof canopy with heavy sound attenuation mineral rockwool",
      "Microprocessor digital control panel with low fuel, high temp, overspeed shutdown",
      "Integrated 180L sub-base fuel tank with mechanical and electronic fuel level sender"
    ],
    specs: {
      engineBrand: "Ricardo Series",
      engineModel: "4105ZD-30",
      engineCylinders: "4 Cylinder In-line Turbo",
      aspiration: "Turbocharged",
      boreStroke: "105 x 125 mm",
      displacementL: "4.33 L",
      compressionRatio: "17.0:1",
      speedRpm: 1500,
      governorType: "Electronic Governor",
      coolingMethod: "Forced Water Circulation Radiator",
      oilCapacityL: "14.0 L",
      coolantCapacityL: "22 L",
      fuelCons100: "7.8 L/h",
      fuelCons75: "5.9 L/h",
      fuelCons50: "4.2 L/h",
      alternatorBrand: "Stamford",
      alternatorModel: "UCI224C",
      insulationClass: "Class H",
      protectionDegree: "IP23",
      voltageRegulation: "±1.0%",
      powerFactor: "0.8",
      controllerBrand: "Deep Sea",
      controllerModel: "DSE 6120",
      dimensionsMm: "2250 x 950 x 1320 mm",
      weightKg: 1100
    },
    optionalEquipment: [
      { title: "Automatic Transfer Switch (ATS) 125A", description: "Automated utility failure transfer switch panel.", icon: "switch" }
    ],
    certificates: ["ISO 9001:2015", "CE Compliant", "ISO 14001"],
    documents: [
      { title: "Ricardo 30kVA Datasheet", code: "DS-RIC-30K", fileSize: "1.7 MB PDF" }
    ]
  },
  {
    id: "prod-14",
    slug: "30kva-fg-wilson-generator",
    name: "30kVA FG Wilson Generator",
    brand: "FG Wilson",
    type: "Silent Canopy",
    priceText: "POA - FIND OUT MORE",
    priceValueBDT: 820000,
    standbyKva: 33.0,
    standbyKw: 26.4,
    primeKva: 30.0,
    primeKw: 24.0,
    fuelType: "DIESEL",
    fuelCapacity: "SEE DATA SHEET",
    frequencyHz: 50,
    voltage: "400V / 230V",
    phase: "3 Phase",
    noiseLevel: "68 dBA @ 7m",
    image: "/assets/images/canopy-white-20k.jpg",
    galleryImages: [
      "/assets/images/canopy-white-20k.jpg",
      "/assets/images/engine-circle.jpg"
    ],
    brandBadgeText: "FG Wilson",
    shortDesc: "High-spec Belfast Perkins 1103A-33G powered generator with advanced PowerWizard digital control.",
    generalFeatures: [
      "Perkins 1103A-33G 3-cylinder naturally aspirated heavy engine",
      "FG Wilson Marelli brushless alternator",
      "Ultra-quiet canopy designed and acoustic tested in Northern Ireland",
      "PowerWizard 1.1 digital engine management module",
      "Spill containment bunded base with 110% fluid catch"
    ],
    specs: {
      engineBrand: "Perkins (FG Wilson)",
      engineModel: "1103A-33G",
      engineCylinders: "3 Cylinder In-line",
      aspiration: "Natural Aspiration",
      boreStroke: "105 x 127 mm",
      displacementL: "3.3 L",
      compressionRatio: "19.25:1",
      speedRpm: 1500,
      governorType: "Mechanical",
      coolingMethod: "Tropical Radiator",
      oilCapacityL: "8.3 L",
      coolantCapacityL: "10.2 L",
      fuelCons100: "7.1 L/h",
      fuelCons75: "5.4 L/h",
      fuelCons50: "3.9 L/h",
      alternatorBrand: "FG Wilson",
      alternatorModel: "FGL20030",
      insulationClass: "Class H",
      protectionDegree: "IP23",
      voltageRegulation: "±1.0%",
      powerFactor: "0.8",
      controllerBrand: "FG Wilson",
      controllerModel: "PowerWizard 1.1",
      dimensionsMm: "2150 x 980 x 1360 mm",
      weightKg: 950
    },
    optionalEquipment: [
      { title: "PowerWizard 2.1 Upgrade", description: "Synchronizing and load share capable module.", icon: "controller" }
    ],
    certificates: ["ISO 9001 UKAS", "CE Certified"],
    documents: [
      { title: "FG Wilson 30kVA Spec", code: "FGW-30K-DS", fileSize: "2.2 MB PDF" }
    ]
  },
  {
    id: "prod-15",
    slug: "30kva-cummins-diesel-generator",
    name: "30kVA Cummins Diesel Generator",
    brand: "Cummins",
    type: "Silent Canopy",
    priceText: "From ৳7,40,000",
    priceValueBDT: 740000,
    standbyKva: 33.0,
    standbyKw: 26.4,
    primeKva: 30.0,
    primeKw: 24.0,
    fuelType: "DIESEL",
    fuelCapacity: "175L",
    frequencyHz: 50,
    voltage: "400V / 230V",
    phase: "3 Phase",
    noiseLevel: "68 dBA @ 7m",
    image: "/assets/images/project-green.jpg",
    galleryImages: [
      "/assets/images/project-green.jpg",
      "/assets/images/engine-circle.jpg"
    ],
    brandBadgeText: "Cummins USA",
    shortDesc: "Cummins 4BTA3.9 turbocharged diesel generator engineered for continuous factory power.",
    generalFeatures: [
      "Turbocharged 4-cylinder Cummins engine block with Rotary fuel injection",
      "Stamford brushless alternator with Class H insulation and AVR ±1%",
      "Heavy duty weather and soundproof canopy (<68 dBA @ 7m)",
      "Cummins PowerCommand AMF control panel with full sensor alarms",
      "Large fuel reservoir providing over 22 hours continuous run"
    ],
    specs: {
      engineBrand: "Cummins",
      engineModel: "4BTA3.9-G2",
      engineCylinders: "4 Cylinder In-line Turbo",
      aspiration: "Turbocharged & Aftercooled",
      boreStroke: "102 x 120 mm",
      displacementL: "3.9 L",
      compressionRatio: "17.3:1",
      speedRpm: 1500,
      governorType: "Electronic Governor",
      coolingMethod: "Water Radiator (+50°C)",
      oilCapacityL: "11.0 L",
      coolantCapacityL: "21.0 L",
      fuelCons100: "7.9 L/h",
      fuelCons75: "6.0 L/h",
      fuelCons50: "4.3 L/h",
      alternatorBrand: "Stamford",
      alternatorModel: "UCI224D",
      insulationClass: "Class H",
      protectionDegree: "IP23",
      voltageRegulation: "±1.0%",
      powerFactor: "0.8",
      controllerBrand: "PowerCommand",
      controllerModel: "PC 1.2",
      dimensionsMm: "2400 x 1000 x 1450 mm",
      weightKg: 1080
    },
    optionalEquipment: [
      { title: "ATS 125A 4P", description: "Auto grid changeover panel with surge suppressor.", icon: "switch" }
    ],
    certificates: ["ISO 8528", "CE Mark", "Cummins Factory Warranty"],
    documents: [
      { title: "Cummins 30kVA Datasheet", code: "CUM-30K-DS", fileSize: "2.7 MB PDF" }
    ]
  },
  {
    id: "prod-16",
    slug: "apd-110-a-diesel-generator",
    name: "APD 110 A Industrial Diesel Generator",
    brand: "Aksa",
    type: "Silent Canopy",
    priceText: "From ৳12,50,000",
    priceValueBDT: 1250000,
    standbyKva: 110.0,
    standbyKw: 88.0,
    primeKva: 100.0,
    primeKw: 80.0,
    fuelType: "DIESEL",
    fuelCapacity: "180L",
    frequencyHz: 50,
    voltage: "400V / 230V",
    phase: "3 Phase",
    noiseLevel: "68 dBA @ 7m",
    image: "/assets/images/yellow-silent.jpg",
    galleryImages: [
      "/assets/images/yellow-silent.jpg",
      "/assets/images/engine-circle.jpg",
      "/assets/images/gen-control-panel.jpg",
      "/assets/images/gen-alternator-shaft.jpg"
    ],
    brandBadgeText: "AKSA / APD",
    shortDesc: "Aksa APD 110 A heavy-duty diesel generator featuring 6-cylinder turbocharged engine, Stamford alternator, and DSE7320 controller.",
    generalFeatures: [
      "Direct injection turbocharged water-cooled 6-cylinder diesel engine",
      "Stamford / Aksa Class H brushless alternator with SX460 automatic voltage regulator (±0.5%)",
      "Deep Sea UK DSE7320 AMF digital telemetry control module with GSM monitoring",
      "Soundproof modular acoustic canopy (<68 dBA @ 7m) with industrial electrostatic powder coating",
      "Base mounted steel fuel tank with integrated spill-catch basin and fuel drain valve",
      "Tropical heavy-duty radiator engineered for ambient temperatures up to +50°C"
    ],
    specs: {
      engineBrand: "Aksa Industrial",
      engineModel: "A6CRX46TI",
      engineCylinders: "6 Cylinder In-line Turbo",
      aspiration: "Turbocharged & Intercooled",
      boreStroke: "108 x 125 mm",
      displacementL: "6.87 L",
      compressionRatio: "17.0:1",
      speedRpm: 1500,
      governorType: "Electronic Governor (±0.25% Speed Stability)",
      coolingMethod: "Closed Circuit Radiator (+50°C)",
      oilCapacityL: "16.0 L",
      coolantCapacityL: "26.0 L",
      fuelCons100: "22.0 L/h",
      fuelCons75: "16.5 L/h",
      fuelCons50: "11.2 L/h",
      alternatorBrand: "Stamford / Aksa",
      alternatorModel: "AK4100",
      insulationClass: "Class H (180°C)",
      protectionDegree: "IP23 (Canopy IP54)",
      voltageRegulation: "±0.5% Steady State",
      powerFactor: "0.8 Lagging",
      controllerBrand: "Deep Sea Electronics (UK)",
      controllerModel: "DSE 7320 MKII Auto Mains Failure",
      dimensionsMm: "2600 x 1100 x 1650 mm",
      weightKg: 1680
    },
    optionalEquipment: [
      { title: "Automatic Transfer Switch (ATS) 200A", description: "Motorized 4-pole automatic transfer panel with microprocessor delay logic.", icon: "switch" },
      { title: "Mobile 4-Wheel Road Trailer", description: "Heavy-duty dual-axle road trailer with hydraulic overrun braking and tow hitch.", icon: "trailer" },
      { title: "Extended 500L External Fuel Tank", description: "Automated fuel replenishment pump with high/low float switches and double bunding.", icon: "fuel" },
      { title: "Residential Critical Silencer", description: "Hospital-grade silencer with -35 dBA noise suppression for urban environments.", icon: "silencer" },
      { title: "GSM Cloud Telemetry & SCADA Module", description: "Real-time remote engine telemetry with push notifications and automated fault alerts.", icon: "iot" },
      { title: "Engine Jacket Water Pre-Heater", description: "Thermostatically regulated 1500W heating element for instantaneous emergency pickup.", icon: "heater" }
    ],
    certificates: [
      "ISO 8528 Generator Set Standards Part 1-8",
      "ISO 9001:2015 Quality Management System",
      "ISO 14001:2015 Environmental Compliance",
      "CE Machinery Directive 2006/42/EC",
      "European Outdoor Noise Directive 2000/14/EC"
    ],
    documents: [
      { title: "APD 110 A Technical Datasheet", code: "DS-APD-110A-EN", fileSize: "3.4 MB PDF" },
      { title: "Acoustic Canopy Dimensional CAD", code: "CAD-APD-110A-3D", fileSize: "4.8 MB DWG" },
      { title: "DSE 7320 Controller User Manual", code: "DSE-7320-MANUAL", fileSize: "2.9 MB PDF" },
      { title: "Engine Maintenance & Overhaul Manual", code: "ENG-A6CRX-TECH", fileSize: "5.1 MB PDF" }
    ]
  }
];

export function getProductBySlug(slug: string): GeneratorProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
