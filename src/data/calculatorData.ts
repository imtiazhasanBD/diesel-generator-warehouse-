export interface EquipmentItem {
  id: string;
  name: string;
  kw: number;
  category: string;
}

export interface EquipmentGroup {
  name: string;
  icon: string;
  items: {
    name: string;
    kw: number;
  }[];
}

export interface ProjectType {
  id: string;
  name: string;
  icon: string;
  description: string;
  groups: EquipmentGroup[];
  quickPreset?: {
    label: string;
    items: { name: string; qty: number }[];
  };
}

export const STANDARD_GENERATOR_SIZES = [
  5, 7.5, 10, 12.5, 15, 20, 25, 30, 40, 45, 50, 60, 80, 100, 125, 150, 180, 200, 225, 250, 275, 300, 350, 400, 450, 500, 550, 600, 625, 700, 750, 800, 900, 1000, 1250, 1500, 2000, 2500
];

export const PROJECT_TYPES: ProjectType[] = [
  {
    id: "residential",
    name: "Residential Building",
    icon: "🏠",
    description: "Apartments, residential towers, multi-family housing, and private duplexes",
    quickPreset: {
      label: "Typical 8-Story Apartment",
      items: [
        { name: "LED Bulb", qty: 40 },
        { name: "Tube Light", qty: 15 },
        { name: "Ceiling Fan", qty: 24 },
        { name: "1.5 ton AC", qty: 8 },
        { name: "2 ton AC", qty: 4 },
        { name: "Domestic Refrigerator", qty: 8 },
        { name: "2 HP Water Pump", qty: 2 },
        { name: "8-person Lift", qty: 1 },
        { name: "CCTV Camera", qty: 8 }
      ]
    },
    groups: [
      {
        name: "Lighting",
        icon: "💡",
        items: [
          { name: "LED Bulb", kw: 0.012 },
          { name: "Tube Light", kw: 0.04 }
        ]
      },
      {
        name: "Fans & Ventilation",
        icon: "🌀",
        items: [
          { name: "Ceiling Fan", kw: 0.075 },
          { name: "Exhaust Fan", kw: 0.04 }
        ]
      },
      {
        name: "Air Conditioners",
        icon: "❄️",
        items: [
          { name: "1 ton AC", kw: 1.0 },
          { name: "1.5 ton AC", kw: 1.5 },
          { name: "2 ton AC", kw: 2.0 },
          { name: "3 ton AC", kw: 3.0 },
          { name: "5 ton AC", kw: 5.0 },
          { name: "Central AC", kw: 5.0 }
        ]
      },
      {
        name: "Water Pumps",
        icon: "💧",
        items: [
          { name: "1.5 HP Water Pump", kw: 1.1 },
          { name: "2 HP Water Pump", kw: 1.5 }
        ]
      },
      {
        name: "Refrigerators",
        icon: "🧊",
        items: [
          { name: "Domestic Refrigerator", kw: 0.2 },
          { name: "Large Refrigerator", kw: 0.35 },
          { name: "Deep Freezer", kw: 0.5 }
        ]
      },
      {
        name: "CCTV & Security",
        icon: "📹",
        items: [
          { name: "CCTV Camera", kw: 0.012 },
          { name: "DVR / NVR System", kw: 0.06 }
        ]
      },
      {
        name: "Home & IT Appliances",
        icon: "🖥️",
        items: [
          { name: "Television", kw: 0.12 },
          { name: "Desktop Computer", kw: 0.15 },
          { name: "Laptop", kw: 0.07 },
          { name: "Microwave Oven", kw: 1.2 },
          { name: "Washing Machine", kw: 0.8 }
        ]
      },
      {
        name: "Elevators & Lifts",
        icon: "🛗",
        items: [
          { name: "6-person Lift", kw: 7.5 },
          { name: "8-person Lift", kw: 11.0 },
          { name: "10-person Lift", kw: 15.0 },
          { name: "12-person Lift", kw: 18.0 },
          { name: "Home Lift", kw: 5.0 },
          { name: "Cargo Lift", kw: 7.5 }
        ]
      },
      {
        name: "Vehicle Access",
        icon: "🚗",
        items: [
          { name: "Car Lift", kw: 5.5 }
        ]
      }
    ]
  },
  {
    id: "commercial",
    name: "Commercial Building",
    icon: "🏢",
    description: "Corporate centers, commercial towers, multi-tenant corporate offices",
    quickPreset: {
      label: "Typical Commercial Complex",
      items: [
        { name: "LED / Tube Light", qty: 60 },
        { name: "Downlight / Panel Light", qty: 40 },
        { name: "2 ton AC", qty: 10 },
        { name: "Central HVAC Unit", qty: 2 },
        { name: "Desktop Computer", qty: 35 },
        { name: "Server Rack", qty: 2 },
        { name: "10-person Lift", qty: 2 },
        { name: "Fire Pump", qty: 1 },
        { name: "2 HP Water Pump", qty: 2 }
      ]
    },
    groups: [
      {
        name: "Lighting",
        icon: "💡",
        items: [
          { name: "LED / Tube Light", kw: 0.04 },
          { name: "Downlight / Panel Light", kw: 0.04 },
          { name: "Signage Lighting", kw: 0.15 }
        ]
      },
      {
        name: "Air Conditioning",
        icon: "❄️",
        items: [
          { name: "1.5 ton AC", kw: 1.5 },
          { name: "2 ton AC", kw: 2.0 },
          { name: "3 ton AC", kw: 3.0 },
          { name: "5 ton AC", kw: 5.0 },
          { name: "Central HVAC Unit", kw: 15.0 }
        ]
      },
      {
        name: "Ventilation",
        icon: "🌀",
        items: [
          { name: "Ceiling Fan", kw: 0.075 },
          { name: "Exhaust Fan", kw: 0.15 },
          { name: "Fresh Air / Ventilation Fan", kw: 0.5 }
        ]
      },
      {
        name: "Water & Fire Pumps",
        icon: "💧",
        items: [
          { name: "1.5 HP Water Pump", kw: 1.1 },
          { name: "2 HP Water Pump", kw: 1.5 },
          { name: "Fire Pump", kw: 15.0 }
        ]
      },
      {
        name: "IT & Office Equipment",
        icon: "🖥️",
        items: [
          { name: "Desktop Computer", kw: 0.15 },
          { name: "Server Rack", kw: 1.5 },
          { name: "Printer / Copier", kw: 0.8 },
          { name: "Network Equipment", kw: 0.3 }
        ]
      },
      {
        name: "Refrigeration",
        icon: "🧊",
        items: [
          { name: "Commercial Refrigerator", kw: 0.5 },
          { name: "Display Chiller", kw: 1.5 },
          { name: "Deep Freezer", kw: 0.8 }
        ]
      },
      {
        name: "Security",
        icon: "📹",
        items: [
          { name: "CCTV Camera", kw: 0.012 },
          { name: "DVR / NVR System", kw: 0.06 },
          { name: "Access Control System", kw: 0.2 }
        ]
      },
      {
        name: "Elevators & Lifts",
        icon: "🛗",
        items: [
          { name: "6-person Lift", kw: 7.5 },
          { name: "8-person Lift", kw: 11.0 },
          { name: "10-person Lift", kw: 15.0 },
          { name: "12-person Lift", kw: 18.0 },
          { name: "Home Lift", kw: 5.0 },
          { name: "Cargo Lift", kw: 7.5 }
        ]
      },
      {
        name: "Vehicle Access",
        icon: "🚗",
        items: [
          { name: "Car Lift", kw: 5.5 }
        ]
      }
    ]
  },
  {
    id: "industry",
    name: "Industry / Factory",
    icon: "🏭",
    description: "Heavy manufacturing, processing plants, workshops, and fabrication yards",
    quickPreset: {
      label: "Mid-Scale Manufacturing Plant",
      items: [
        { name: "10 HP Production Motor", qty: 4 },
        { name: "20 HP Production Motor", qty: 2 },
        { name: "20 HP Compressor", qty: 1 },
        { name: "10 HP Pump", qty: 2 },
        { name: "Welding Machine", qty: 2 },
        { name: "Industrial Chiller", qty: 1 },
        { name: "High Bay Light", qty: 20 },
        { name: "Industrial Exhaust Fan", qty: 6 }
      ]
    },
    groups: [
      {
        name: "Production Machinery",
        icon: "⚙️",
        items: [
          { name: "5 HP Production Motor", kw: 3.7 },
          { name: "10 HP Production Motor", kw: 7.5 },
          { name: "20 HP Production Motor", kw: 15.0 },
          { name: "30 HP Production Motor", kw: 22.0 },
          { name: "50 HP Production Motor", kw: 37.0 }
        ]
      },
      {
        name: "Air Compressors",
        icon: "🛠️",
        items: [
          { name: "5 HP Compressor", kw: 3.7 },
          { name: "10 HP Compressor", kw: 7.5 },
          { name: "20 HP Compressor", kw: 15.0 },
          { name: "30 HP Compressor", kw: 22.0 }
        ]
      },
      {
        name: "Industrial Pumps",
        icon: "💧",
        items: [
          { name: "5 HP Pump", kw: 3.7 },
          { name: "10 HP Pump", kw: 7.5 },
          { name: "20 HP Pump", kw: 15.0 },
          { name: "30 HP Pump", kw: 22.0 }
        ]
      },
      {
        name: "Welding & Fabrication",
        icon: "🔧",
        items: [
          { name: "Welding Machine", kw: 8.0 },
          { name: "Plasma / Cutting Machine", kw: 12.0 },
          { name: "Workshop Machine", kw: 5.0 }
        ]
      },
      {
        name: "Factory Utilities",
        icon: "🏭",
        items: [
          { name: "Boiler / Burner Controls", kw: 2.0 },
          { name: "Cooling Tower", kw: 7.5 },
          { name: "Industrial Chiller", kw: 15.0 },
          { name: "Air Handling Unit", kw: 7.5 }
        ]
      },
      {
        name: "Lighting & Ventilation",
        icon: "💡",
        items: [
          { name: "High Bay Light", kw: 0.15 },
          { name: "LED / Tube Light", kw: 0.04 },
          { name: "Industrial Exhaust Fan", kw: 0.5 }
        ]
      },
      {
        name: "Elevators & Material Handling",
        icon: "🛗",
        items: [
          { name: "Cargo Lift", kw: 7.5 },
          { name: "8-person Lift", kw: 11.0 },
          { name: "12-person Lift", kw: 18.0 }
        ]
      }
    ]
  },
  {
    id: "garments",
    name: "Garments Factory",
    icon: "👕",
    description: "Apparel manufacturing, sewing lines, washing & dyeing, and finishing units",
    quickPreset: {
      label: "Typical 4-Line RMG Unit",
      items: [
        { name: "Single Needle Sewing Machine", qty: 60 },
        { name: "Overlock Machine", qty: 25 },
        { name: "Flatlock Machine", qty: 15 },
        { name: "Steam Iron", qty: 10 },
        { name: "Vacuum Ironing Table", qty: 6 },
        { name: "Air Compressor", qty: 2 },
        { name: "High Bay Light", qty: 30 },
        { name: "Industrial Exhaust Fan", qty: 8 },
        { name: "Cargo Lift", qty: 1 }
      ]
    },
    groups: [
      {
        name: "Sewing & Production Machines",
        icon: "🧵",
        items: [
          { name: "Single Needle Sewing Machine", kw: 0.5 },
          { name: "Overlock Machine", kw: 0.55 },
          { name: "Flatlock Machine", kw: 0.6 },
          { name: "Button / Buttonhole Machine", kw: 0.75 },
          { name: "Automatic Cutting Machine", kw: 3.0 },
          { name: "Fabric Spreading Machine", kw: 2.0 }
        ]
      },
      {
        name: "Finishing & Ironing",
        icon: "♨️",
        items: [
          { name: "Steam Iron", kw: 1.5 },
          { name: "Vacuum Ironing Table", kw: 1.2 },
          { name: "Fusing Machine", kw: 5.0 },
          { name: "Steam Generator / Boiler", kw: 15.0 }
        ]
      },
      {
        name: "Washing & Laundry",
        icon: "🫧",
        items: [
          { name: "Industrial Washing Machine", kw: 7.5 },
          { name: "Hydro Extractor", kw: 5.0 },
          { name: "Industrial Dryer", kw: 12.0 },
          { name: "Finishing Machine", kw: 5.0 }
        ]
      },
      {
        name: "Air & Utility Systems",
        icon: "💨",
        items: [
          { name: "Air Compressor", kw: 7.5 },
          { name: "Boiler Feed Pump", kw: 2.2 },
          { name: "Water Pump", kw: 3.7 },
          { name: "Cooling / Chiller Unit", kw: 10.0 }
        ]
      },
      {
        name: "Lighting & Ventilation",
        icon: "💡",
        items: [
          { name: "LED / Tube Light", kw: 0.04 },
          { name: "High Bay Light", kw: 0.15 },
          { name: "Industrial Exhaust Fan", kw: 0.5 },
          { name: "Fresh Air Fan", kw: 0.75 }
        ]
      },
      {
        name: "Office & Safety",
        icon: "🖥️",
        items: [
          { name: "Computer", kw: 0.15 },
          { name: "Server / Network Rack", kw: 1.0 },
          { name: "CCTV Camera", kw: 0.012 },
          { name: "Fire Pump", kw: 15.0 }
        ]
      },
      {
        name: "Lifts & Transport",
        icon: "🛗",
        items: [
          { name: "Cargo Lift", kw: 7.5 },
          { name: "8-person Lift", kw: 11.0 }
        ]
      }
    ]
  },
  {
    id: "hospital",
    name: "Hospital / Healthcare",
    icon: "🏥",
    description: "Multi-specialty hospitals, emergency centers, clinics, and diagnostic labs",
    quickPreset: {
      label: "Diagnostic & Emergency Ward",
      items: [
        { name: "Operating Theatre Light", qty: 2 },
        { name: "X-ray Machine", qty: 1 },
        { name: "Ultrasound Machine", qty: 2 },
        { name: "Ventilator", qty: 4 },
        { name: "Patient Monitor", qty: 8 },
        { name: "Autoclave / Sterilizer", qty: 1 },
        { name: "Blood Bank Refrigerator", qty: 2 },
        { name: "Central HVAC Unit", qty: 2 },
        { name: "Hospital Lift", qty: 1 }
      ]
    },
    groups: [
      {
        name: "Lighting & Essential Power",
        icon: "💡",
        items: [
          { name: "LED / Tube Light", kw: 0.04 },
          { name: "Emergency Light", kw: 0.02 },
          { name: "Operating Theatre Light", kw: 0.5 }
        ]
      },
      {
        name: "Medical Equipment",
        icon: "🩺",
        items: [
          { name: "X-ray Machine", kw: 10.0 },
          { name: "CT Scanner", kw: 30.0 },
          { name: "MRI System", kw: 60.0 },
          { name: "Ultrasound Machine", kw: 1.5 },
          { name: "Ventilator", kw: 0.5 },
          { name: "Patient Monitor", kw: 0.2 }
        ]
      },
      {
        name: "Air Conditioning & HVAC",
        icon: "❄️",
        items: [
          { name: "1.5 ton AC", kw: 1.5 },
          { name: "2 ton AC", kw: 2.0 },
          { name: "3 ton AC", kw: 3.0 },
          { name: "Central HVAC Unit", kw: 15.0 },
          { name: "AHU / Ventilation Unit", kw: 7.5 }
        ]
      },
      {
        name: "Laboratory & Sterilisation",
        icon: "🧪",
        items: [
          { name: "Autoclave / Sterilizer", kw: 6.0 },
          { name: "Lab Analyzer", kw: 1.5 },
          { name: "Refrigerated Centrifuge", kw: 1.0 }
        ]
      },
      {
        name: "IT & Cold Storage",
        icon: "🖥️",
        items: [
          { name: "Server Rack", kw: 1.5 },
          { name: "Computer", kw: 0.15 },
          { name: "Medical Refrigerator", kw: 0.5 },
          { name: "Blood Bank Refrigerator", kw: 0.7 }
        ]
      },
      {
        name: "Elevators & Pumps",
        icon: "🛗",
        items: [
          { name: "Hospital Lift", kw: 18.0 },
          { name: "8-person Lift", kw: 11.0 },
          { name: "2 HP Water Pump", kw: 1.5 },
          { name: "Fire Pump", kw: 15.0 }
        ]
      }
    ]
  },
  {
    id: "educational",
    name: "Educational Institute",
    icon: "🎓",
    description: "Universities, technical institutes, colleges, and training complexes",
    groups: [
      {
        name: "Classroom & General Lighting",
        icon: "💡",
        items: [
          { name: "LED / Tube Light", kw: 0.04 },
          { name: "Projector", kw: 0.35 },
          { name: "Interactive Display", kw: 0.25 }
        ]
      },
      {
        name: "Fans & Air Conditioning",
        icon: "🌀",
        items: [
          { name: "Ceiling Fan", kw: 0.075 },
          { name: "Exhaust Fan", kw: 0.15 },
          { name: "1.5 ton AC", kw: 1.5 },
          { name: "2 ton AC", kw: 2.0 },
          { name: "3 ton AC", kw: 3.0 }
        ]
      },
      {
        name: "Computer & Laboratory",
        icon: "🖥️",
        items: [
          { name: "Desktop Computer", kw: 0.15 },
          { name: "Computer Lab Set", kw: 0.15 },
          { name: "Printer", kw: 0.5 },
          { name: "Laboratory Equipment Set", kw: 2.0 }
        ]
      },
      {
        name: "Water & Fire Pumps",
        icon: "💧",
        items: [
          { name: "1.5 HP Water Pump", kw: 1.1 },
          { name: "2 HP Water Pump", kw: 1.5 },
          { name: "Fire Pump", kw: 15.0 }
        ]
      },
      {
        name: "Canteen & Elevators",
        icon: "🍽️",
        items: [
          { name: "Commercial Refrigerator", kw: 0.5 },
          { name: "Water Dispenser", kw: 0.5 },
          { name: "8-person Lift", kw: 11.0 }
        ]
      }
    ]
  },
  {
    id: "hotel",
    name: "Hotel / Hospitality",
    icon: "🏨",
    description: "Hotels, resorts, guest houses, and banquet facilities",
    groups: [
      {
        name: "Guest Room Loads",
        icon: "🛏️",
        items: [
          { name: "1.5 ton Room AC", kw: 1.5 },
          { name: "2 ton Room AC", kw: 2.0 },
          { name: "Room Refrigerator", kw: 0.2 },
          { name: "Television", kw: 0.12 },
          { name: "Hair Dryer", kw: 1.5 }
        ]
      },
      {
        name: "Kitchen & Laundry",
        icon: "🍽️",
        items: [
          { name: "Commercial Oven", kw: 6.0 },
          { name: "Dishwasher", kw: 5.0 },
          { name: "Commercial Refrigerator", kw: 1.5 },
          { name: "Laundry Washer", kw: 7.5 },
          { name: "Tumble Dryer", kw: 10.0 }
        ]
      },
      {
        name: "HVAC & Ventilation",
        icon: "❄️",
        items: [
          { name: "Central Chiller", kw: 25.0 },
          { name: "AHU", kw: 7.5 },
          { name: "Exhaust Fan", kw: 0.5 },
          { name: "Fresh Air Fan", kw: 0.75 }
        ]
      },
      {
        name: "Elevators & Pumps",
        icon: "🛗",
        items: [
          { name: "8-person Lift", kw: 11.0 },
          { name: "12-person Lift", kw: 18.0 },
          { name: "Fire Pump", kw: 15.0 },
          { name: "2 HP Water Pump", kw: 1.5 }
        ]
      }
    ]
  },
  {
    id: "shopping-mall",
    name: "Shopping Mall",
    icon: "🛍️",
    description: "Multi-level shopping centers, food courts, and anchor retail complexes",
    groups: [
      {
        name: "Shop & Common Area Lighting",
        icon: "💡",
        items: [
          { name: "LED / Panel Light", kw: 0.04 },
          { name: "Display Lighting", kw: 0.15 },
          { name: "Signage Lighting", kw: 0.5 }
        ]
      },
      {
        name: "HVAC & Ventilation",
        icon: "❄️",
        items: [
          { name: "Central Chiller", kw: 25.0 },
          { name: "AHU", kw: 7.5 },
          { name: "Exhaust Fan", kw: 0.5 }
        ]
      },
      {
        name: "Retail & Food Court",
        icon: "🍽️",
        items: [
          { name: "Commercial Refrigerator", kw: 1.5 },
          { name: "Display Chiller", kw: 1.5 },
          { name: "Food Court Kitchen Unit", kw: 5.0 }
        ]
      },
      {
        name: "Lifts & Pumps",
        icon: "🛗",
        items: [
          { name: "10-person Lift", kw: 15.0 },
          { name: "12-person Lift", kw: 18.0 },
          { name: "Cargo Lift", kw: 7.5 },
          { name: "Fire Pump", kw: 15.0 },
          { name: "Water Pump", kw: 3.7 }
        ]
      }
    ]
  },
  {
    id: "office",
    name: "Office Building",
    icon: "🏬",
    description: "IT hubs, corporate offices, finance facilities, and co-working spaces",
    groups: [
      {
        name: "Lighting & Workstations",
        icon: "💡",
        items: [
          { name: "LED / Panel Light", kw: 0.04 },
          { name: "Meeting Room Lighting", kw: 0.3 },
          { name: "Desktop Computer", kw: 0.15 },
          { name: "Laptop", kw: 0.07 }
        ]
      },
      {
        name: "Air Conditioning & Ventilation",
        icon: "❄️",
        items: [
          { name: "1.5 ton AC", kw: 1.5 },
          { name: "2 ton AC", kw: 2.0 },
          { name: "3 ton AC", kw: 3.0 },
          { name: "Central HVAC Unit", kw: 15.0 },
          { name: "Ventilation Fan", kw: 0.5 }
        ]
      },
      {
        name: "IT Infrastructure",
        icon: "🖥️",
        items: [
          { name: "Server Rack", kw: 1.5 },
          { name: "Network Equipment", kw: 0.3 },
          { name: "Printer / Copier", kw: 0.8 },
          { name: "DVR / NVR System", kw: 0.06 }
        ]
      },
      {
        name: "Lifts & Services",
        icon: "🛗",
        items: [
          { name: "8-person Lift", kw: 11.0 },
          { name: "10-person Lift", kw: 15.0 },
          { name: "Fire Pump", kw: 15.0 }
        ]
      }
    ]
  },
  {
    id: "construction",
    name: "Construction Site",
    icon: "🚧",
    description: "Civil infrastructure, bridge & highway sites, building construction",
    groups: [
      {
        name: "Construction Machinery",
        icon: "🏗️",
        items: [
          { name: "Tower Crane", kw: 30.0 },
          { name: "Hoist / Material Lift", kw: 15.0 },
          { name: "Concrete Mixer", kw: 5.0 },
          { name: "Concrete Pump", kw: 30.0 },
          { name: "Rebar Cutting / Bending Machine", kw: 5.0 }
        ]
      },
      {
        name: "Welding & Workshop",
        icon: "🔧",
        items: [
          { name: "Welding Machine", kw: 8.0 },
          { name: "Air Compressor", kw: 7.5 },
          { name: "Workshop Tools", kw: 3.0 }
        ]
      },
      {
        name: "Dewatering & Site Utilities",
        icon: "💧",
        items: [
          { name: "1.5 HP Water Pump", kw: 1.1 },
          { name: "2 HP Water Pump", kw: 1.5 },
          { name: "Site Office AC", kw: 2.0 },
          { name: "Temporary Lighting Tower", kw: 5.0 },
          { name: "Flood Light", kw: 0.2 }
        ]
      }
    ]
  },
  {
    id: "restaurant",
    name: "Restaurant / Cloud Kitchen",
    icon: "🍽️",
    description: "Commercial dining, central kitchens, bakeries, and fast-food chains",
    groups: [
      {
        name: "Kitchen & Cooking Equipment",
        icon: "🍳",
        items: [
          { name: "Commercial Electric Oven", kw: 12.0 },
          { name: "Commercial Induction Cooker", kw: 8.0 },
          { name: "Electric Griddle / Hot Plate", kw: 6.0 },
          { name: "Commercial Microwave", kw: 1.5 },
          { name: "Rice Cooker", kw: 2.0 },
          { name: "Food Warmer", kw: 2.0 }
        ]
      },
      {
        name: "Refrigeration & Cold Storage",
        icon: "🧊",
        items: [
          { name: "Upright Commercial Refrigerator", kw: 0.8 },
          { name: "Display Chiller", kw: 1.5 },
          { name: "Chest Freezer", kw: 0.8 },
          { name: "Walk-in Cold Room", kw: 5.0 },
          { name: "Ice Maker", kw: 1.5 }
        ]
      },
      {
        name: "Ventilation & Air Conditioning",
        icon: "🌬️",
        items: [
          { name: "Kitchen Exhaust Hood Fan", kw: 1.5 },
          { name: "Fresh Air Fan", kw: 0.75 },
          { name: "2 ton AC", kw: 2.0 },
          { name: "3 ton AC", kw: 3.0 },
          { name: "5 ton AC", kw: 5.0 }
        ]
      },
      {
        name: "Water & Washing",
        icon: "💧",
        items: [
          { name: "Dishwashing Machine", kw: 5.0 },
          { name: "Booster Water Pump", kw: 1.5 },
          { name: "Hot Water Boiler", kw: 6.0 }
        ]
      }
    ]
  },
  {
    id: "military",
    name: "Military / Defense Project",
    icon: "🪖",
    description: "Bases, command centers, radar posts, and tactical emergency shelters",
    groups: [
      {
        name: "Command & Communication",
        icon: "📡",
        items: [
          { name: "Communications Equipment Rack", kw: 2.0 },
          { name: "Radio / Signal System", kw: 1.0 },
          { name: "Server & Network Rack", kw: 3.0 },
          { name: "Command Centre Workstations", kw: 0.2 }
        ]
      },
      {
        name: "Accommodation & Power",
        icon: "💡",
        items: [
          { name: "Corridor / Camp Lighting", kw: 0.2 },
          { name: "2 ton AC", kw: 2.0 },
          { name: "Commercial Refrigerator", kw: 0.8 },
          { name: "Water Supply Pump", kw: 5.0 }
        ]
      },
      {
        name: "Workshop & Utilities",
        icon: "🔧",
        items: [
          { name: "Workshop Air Compressor", kw: 7.5 },
          { name: "Welding Machine", kw: 8.0 },
          { name: "Battery Charging Station", kw: 3.0 },
          { name: "Perimeter Flood Lighting", kw: 0.2 }
        ]
      }
    ]
  },
  {
    id: "retail",
    name: "Retail Shop / Showroom",
    icon: "🏪",
    description: "Boutiques, brand outlets, electronic showrooms, and retail stores",
    groups: [
      {
        name: "Lighting & Display",
        icon: "💡",
        items: [
          { name: "LED Panel Light", kw: 0.04 },
          { name: "Track / Display Spot Light", kw: 0.03 },
          { name: "Signboard Lighting", kw: 0.2 }
        ]
      },
      {
        name: "Air Conditioning & Ventilation",
        icon: "❄️",
        items: [
          { name: "1.5 ton AC", kw: 1.5 },
          { name: "2 ton AC", kw: 2.0 },
          { name: "3 ton AC", kw: 3.0 },
          { name: "Exhaust / Ventilation Fan", kw: 0.25 }
        ]
      },
      {
        name: "Sales & IT Equipment",
        icon: "🖥️",
        items: [
          { name: "POS Terminal", kw: 0.15 },
          { name: "Desktop Computer", kw: 0.2 },
          { name: "Receipt / Barcode Printer", kw: 0.1 },
          { name: "CCTV Camera", kw: 0.012 }
        ]
      },
      {
        name: "Refrigeration & Security",
        icon: "🧊",
        items: [
          { name: "Display Refrigerator", kw: 0.8 },
          { name: "Small Water Pump", kw: 0.75 },
          { name: "Roller Shutter Motor", kw: 0.75 }
        ]
      }
    ]
  },
  {
    id: "super-shop",
    name: "Super Shop / Grocery Mart",
    icon: "🛒",
    description: "Supermarkets, hypermarkets, departmental stores, and cold-chain groceries",
    groups: [
      {
        name: "Refrigeration & Cold Storage",
        icon: "🧊",
        items: [
          { name: "Multi-deck Display Chiller", kw: 2.0 },
          { name: "Upright Commercial Refrigerator", kw: 0.8 },
          { name: "Chest Freezer", kw: 0.8 },
          { name: "Walk-in Cold Room", kw: 5.0 },
          { name: "Frozen Food Display Freezer", kw: 2.0 },
          { name: "Ice Maker", kw: 1.5 }
        ]
      },
      {
        name: "Air Conditioning & Ventilation",
        icon: "❄️",
        items: [
          { name: "2 ton AC", kw: 2.0 },
          { name: "3 ton AC", kw: 3.0 },
          { name: "5 ton AC", kw: 5.0 },
          { name: "Central HVAC / Package Unit", kw: 10.0 }
        ]
      },
      {
        name: "Lighting & Signage",
        icon: "💡",
        items: [
          { name: "LED Panel Light", kw: 0.04 },
          { name: "Shelf / Display Lighting", kw: 0.03 },
          { name: "External Signboard Lighting", kw: 0.3 }
        ]
      },
      {
        name: "Checkout & IT Systems",
        icon: "🖥️",
        items: [
          { name: "POS Checkout Counter", kw: 0.2 },
          { name: "Server / Network Rack", kw: 1.5 },
          { name: "CCTV Camera", kw: 0.012 }
        ]
      }
    ]
  }
];

export interface SelectedItem {
  id: string;
  name: string;
  kw: number;
  qty: number;
  category: string;
  isCustom?: boolean;
}

