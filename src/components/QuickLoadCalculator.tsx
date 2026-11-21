"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

type Appliance = {
  name: string;
  watts: number;
  qty: number;
  max: number;
  icon: string;
};

type BuildingTypeKey = "home" | "office" | "factory" | "hospital" | "restaurant";

interface Category {
  key: BuildingTypeKey;
  label: string;
  icon: string;
}

const CATEGORIES: Category[] = [
  {
    key: "home",
    label: "Home",
    icon: '<path d="M3 11 12 4l9 7M5 10v10h14V10M10 20v-5h4v5"/>',
  },
  {
    key: "office",
    label: "Office",
    icon: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
  },
  {
    key: "factory",
    label: "Factory",
    icon: '<path d="M3 21V10l5 3V10l5 3V10l5 3V4h3v17z"/>',
  },
  {
    key: "hospital",
    label: "Hospital",
    icon: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 7v6M9 10h6M10 21v-4h4v4"/>',
  },
  {
    key: "restaurant",
    label: "Restaurant",
    icon: '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2 1-3 4-3 8h3"/>',
  },
];

const PRESETS: Record<BuildingTypeKey, Appliance[]> = {
  home: [
    {
      name: "Light",
      icon: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
      watts: 15,
      qty: 34,
      max: 300,
    },
    {
      name: "Fan",
      icon: '<circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 1-7 3-7s2 3-1 6M14 12c4 0 7 1 7 3s-3 2-6-1M12 14c0 4-1 7-3 7s-2-3 1-6M10 12c-4 0-7-1-7-3s3-2 6 1"/>',
      watts: 75,
      qty: 10,
      max: 100,
    },
    {
      name: "AC",
      icon: '<rect x="2" y="5" width="20" height="8" rx="1"/><path d="M6 10h12M7 16v3M12 16v4M17 16v3"/>',
      watts: 1800,
      qty: 2,
      max: 10,
    },
    {
      name: "Refrigerator",
      icon: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M6 10h12M9 5v2M9 13v3"/>',
      watts: 250,
      qty: 1,
      max: 5,
    },
    {
      name: "TV",
      icon: '<rect x="2" y="4" width="20" height="13" rx="1.5"/><path d="M8 21h8M12 17v4"/>',
      watts: 150,
      qty: 2,
      max: 10,
    },
    {
      name: "Computer",
      icon: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20h8M12 16v4"/>',
      watts: 200,
      qty: 2,
      max: 20,
    },
    {
      name: "Washing machine",
      icon: '<rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="13" r="5"/><path d="M8 5.5h.01M11 5.5h.01"/>',
      watts: 500,
      qty: 1,
      max: 3,
    },
    {
      name: "Oven / microwave",
      icon: '<rect x="2" y="5" width="20" height="14" rx="1.5"/><rect x="5" y="8" width="10" height="8" rx="1"/><path d="M18 9v.01M18 12v.01"/>',
      watts: 1200,
      qty: 1,
      max: 3,
    },
    {
      name: "Electric iron",
      icon: '<path d="M2 18h18v-3a7 7 0 0 0-7-7H7l-1 4"/><path d="M2 18l2-6h16"/>',
      watts: 1000,
      qty: 1,
      max: 3,
    },
    {
      name: "Water heater",
      icon: '<rect x="7" y="2" width="10" height="16" rx="5"/><path d="M10 22v-4M14 22v-4M12 7v5"/>',
      watts: 2000,
      qty: 0,
      max: 4,
    },
    {
      name: "Water pump",
      icon: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
      watts: 750,
      qty: 1,
      max: 5,
    },
    {
      name: "CCTV camera",
      icon: '<path d="M3 7l13 4-2 5L3 12z"/><path d="M16 11l4-1v5l-5-1M5 12l-1 6H2"/>',
      watts: 10,
      qty: 4,
      max: 32,
    },
  ],
  office: [
    {
      name: "Light",
      icon: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
      watts: 15,
      qty: 100,
      max: 300,
    },
    {
      name: "Fan",
      icon: '<circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 1-7 3-7s2 3-1 6M14 12c4 0 7 1 7 3s-3 2-6-1M12 14c0 4-1 7-3 7s-2-3 1-6M10 12c-4 0-7-1-7-3s3-2 6 1"/>',
      watts: 75,
      qty: 30,
      max: 300,
    },
    {
      name: "AC",
      icon: '<rect x="2" y="5" width="20" height="8" rx="1"/><path d="M6 10h12M7 16v3M12 16v4M17 16v3"/>',
      watts: 1800,
      qty: 10,
      max: 60,
    },
    {
      name: "Computer",
      icon: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20h8M12 16v4"/>',
      watts: 200,
      qty: 40,
      max: 300,
    },
    {
      name: "Photocopier",
      icon: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="1"/><path d="M7 14h10v7H7z"/>',
      watts: 1000,
      qty: 3,
      max: 20,
    },
    {
      name: "Server rack",
      icon: '<rect x="4" y="3" width="16" height="7" rx="1"/><rect x="4" y="14" width="16" height="7" rx="1"/><path d="M8 6.5h.01M8 17.5h.01"/>',
      watts: 2000,
      qty: 1,
      max: 10,
    },
    {
      name: "Refrigerator",
      icon: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M6 10h12M9 5v2M9 13v3"/>',
      watts: 250,
      qty: 2,
      max: 10,
    },
    {
      name: "Coffee machine",
      icon: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2v3M12 2v3"/>',
      watts: 1200,
      qty: 1,
      max: 10,
    },
    {
      name: "Water dispenser",
      icon: '<path d="M8 2h8v6H8zM6 8h12v14H6zM12 12v3"/>',
      watts: 500,
      qty: 2,
      max: 20,
    },
    {
      name: "Water pump",
      icon: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
      watts: 750,
      qty: 1,
      max: 10,
    },
    {
      name: "Passenger elevator",
      icon: '<rect x="5" y="2" width="14" height="20" rx="1"/><path d="M12 2v20M8.5 9l1.5-2 1.5 2M12.5 15l1.5 2 1.5-2"/>',
      watts: 7500,
      qty: 1,
      max: 6,
    },
    {
      name: "CCTV camera",
      icon: '<path d="M3 7l13 4-2 5L3 12z"/><path d="M16 11l4-1v5l-5-1M5 12l-1 6H2"/>',
      watts: 10,
      qty: 16,
      max: 128,
    },
  ],
  factory: [
    {
      name: "Light",
      icon: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
      watts: 20,
      qty: 300,
      max: 2000,
    },
    {
      name: "Fan",
      icon: '<circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 1-7 3-7s2 3-1 6M14 12c4 0 7 1 7 3s-3 2-6-1M12 14c0 4-1 7-3 7s-2-3 1-6M10 12c-4 0-7-1-7-3s3-2 6 1"/>',
      watts: 75,
      qty: 100,
      max: 1000,
    },
    {
      name: "AC",
      icon: '<rect x="2" y="5" width="20" height="8" rx="1"/><path d="M6 10h12M7 16v3M12 16v4M17 16v3"/>',
      watts: 1800,
      qty: 4,
      max: 50,
    },
    {
      name: "Sewing machine",
      icon: '<path d="M3 20h18M6 20V9a3 3 0 0 1 3-3h9a2 2 0 0 1 2 2v3h-6v9"/><path d="M14 11v4M17 4v2"/>',
      watts: 400,
      qty: 200,
      max: 2000,
    },
    {
      name: "Steam iron",
      icon: '<path d="M2 18h18v-3a7 7 0 0 0-7-7H7l-1 4"/><path d="M2 18l2-6h16"/>',
      watts: 1000,
      qty: 20,
      max: 200,
    },
    {
      name: "Cutting machine",
      icon: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
      watts: 750,
      qty: 4,
      max: 30,
    },
    {
      name: "Exhaust fan",
      icon: '<circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 1-7 3-7s2 3-1 6M14 12c4 0 7 1 7 3s-3 2-6-1M12 14c0 4-1 7-3 7s-2-3 1-6M10 12c-4 0-7-1-7-3s3-2 6 1"/>',
      watts: 400,
      qty: 20,
      max: 200,
    },
    {
      name: "Air compressor",
      icon: '<rect x="3" y="8" width="14" height="9" rx="4.5"/><path d="M17 12h4M7 17v3M13 17v3M10 8V5h3"/>',
      watts: 7500,
      qty: 1,
      max: 10,
    },
    {
      name: "Water pump",
      icon: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
      watts: 750,
      qty: 2,
      max: 20,
    },
    {
      name: "Goods lift",
      icon: '<rect x="5" y="2" width="14" height="20" rx="1"/><path d="M12 2v20M8.5 9l1.5-2 1.5 2M12.5 15l1.5 2 1.5-2"/>',
      watts: 11000,
      qty: 1,
      max: 6,
    },
    {
      name: "Computer",
      icon: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20h8M12 16v4"/>',
      watts: 200,
      qty: 10,
      max: 100,
    },
    {
      name: "CCTV camera",
      icon: '<path d="M3 7l13 4-2 5L3 12z"/><path d="M16 11l4-1v5l-5-1M5 12l-1 6H2"/>',
      watts: 10,
      qty: 16,
      max: 128,
    },
  ],
  hospital: [
    {
      name: "Light",
      icon: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
      watts: 15,
      qty: 200,
      max: 1000,
    },
    {
      name: "Fan",
      icon: '<circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 1-7 3-7s2 3-1 6M14 12c4 0 7 1 7 3s-3 2-6-1M12 14c0 4-1 7-3 7s-2-3 1-6M10 12c-4 0-7-1-7-3s3-2 6 1"/>',
      watts: 75,
      qty: 80,
      max: 500,
    },
    {
      name: "AC",
      icon: '<rect x="2" y="5" width="20" height="8" rx="1"/><path d="M6 10h12M7 16v3M12 16v4M17 16v3"/>',
      watts: 1800,
      qty: 20,
      max: 150,
    },
    {
      name: "ICU bed",
      icon: '<path d="M3 7v12M3 15h18v4M21 15v-3a3 3 0 0 0-3-3h-8v6"/><circle cx="6.5" cy="11.5" r="1.5"/>',
      watts: 1000,
      qty: 10,
      max: 100,
    },
    {
      name: "Operation theatre",
      icon: '<path d="M4 9a8 8 0 0 0 16 0zM12 2v7M9 15l-1 3M15 15l1 3M12 15v4"/>',
      watts: 10000,
      qty: 2,
      max: 10,
    },
    {
      name: "X-ray machine",
      icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 7v10M8 9h8M8 12h8M9 15h6"/>',
      watts: 15000,
      qty: 1,
      max: 6,
    },
    {
      name: "CT scan",
      icon: '<circle cx="12" cy="11" r="7"/><circle cx="12" cy="11" r="3"/><path d="M3 21h18"/>',
      watts: 50000,
      qty: 0,
      max: 3,
    },
    {
      name: "Autoclave",
      icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="4"/><path d="M12 10v2l1.5 1.5"/>',
      watts: 6000,
      qty: 1,
      max: 10,
    },
    {
      name: "Medical fridge",
      icon: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M6 10h12M9 5v2M9 13v3"/>',
      watts: 400,
      qty: 4,
      max: 40,
    },
    {
      name: "Computer",
      icon: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20h8M12 16v4"/>',
      watts: 200,
      qty: 20,
      max: 200,
    },
    {
      name: "Water pump",
      icon: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
      watts: 750,
      qty: 2,
      max: 20,
    },
    {
      name: "Bed lift",
      icon: '<rect x="5" y="2" width="14" height="20" rx="1"/><path d="M12 2v20M8.5 9l1.5-2 1.5 2M12.5 15l1.5 2 1.5-2"/>',
      watts: 11000,
      qty: 2,
      max: 8,
    },
  ],
  restaurant: [
    {
      name: "Light",
      icon: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
      watts: 15,
      qty: 60,
      max: 300,
    },
    {
      name: "Fan",
      icon: '<circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 1-7 3-7s2 3-1 6M14 12c4 0 7 1 7 3s-3 2-6-1M12 14c0 4-1 7-3 7s-2-3 1-6M10 12c-4 0-7-1-7-3s3-2 6 1"/>',
      watts: 75,
      qty: 15,
      max: 100,
    },
    {
      name: "AC",
      icon: '<rect x="2" y="5" width="20" height="8" rx="1"/><path d="M6 10h12M7 16v3M12 16v4M17 16v3"/>',
      watts: 1800,
      qty: 6,
      max: 40,
    },
    {
      name: "Deep freezer",
      icon: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M6 10h12M9 5v2M9 13v3"/>',
      watts: 500,
      qty: 3,
      max: 20,
    },
    {
      name: "Chiller fridge",
      icon: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M6 10h12M9 5v2M9 13v3"/>',
      watts: 800,
      qty: 2,
      max: 20,
    },
    {
      name: "Kitchen exhaust",
      icon: '<circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 1-7 3-7s2 3-1 6M14 12c4 0 7 1 7 3s-3 2-6-1M12 14c0 4-1 7-3 7s-2-3 1-6M10 12c-4 0-7-1-7-3s3-2 6 1"/>',
      watts: 750,
      qty: 2,
      max: 20,
    },
    {
      name: "Oven / microwave",
      icon: '<rect x="2" y="5" width="20" height="14" rx="1.5"/><rect x="5" y="8" width="10" height="8" rx="1"/><path d="M18 9v.01M18 12v.01"/>',
      watts: 1500,
      qty: 2,
      max: 10,
    },
    {
      name: "Coffee machine",
      icon: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2v3M12 2v3"/>',
      watts: 1500,
      qty: 1,
      max: 6,
    },
    {
      name: "Juicer / blender",
      icon: '<path d="M7 3h10l-2 11H9zM8 14h8l1 7H7z"/>',
      watts: 500,
      qty: 2,
      max: 10,
    },
    {
      name: "Computer / POS",
      icon: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20h8M12 16v4"/>',
      watts: 200,
      qty: 2,
      max: 10,
    },
    {
      name: "Water pump",
      icon: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
      watts: 750,
      qty: 1,
      max: 10,
    },
    {
      name: "CCTV camera",
      icon: '<path d="M3 7l13 4-2 5L3 12z"/><path d="M16 11l4-1v5l-5-1M5 12l-1 6H2"/>',
      watts: 10,
      qty: 8,
      max: 64,
    },
  ],
};

const STANDARD_RATINGS = [
  1, 2, 3, 5, 7.5, 10, 12.5, 15, 20, 25, 30, 40, 50, 62.5, 75, 100, 125, 150,
  200, 250, 300, 350, 400, 450, 500, 600, 750, 800, 1000, 1250, 1500, 1750, 2000,
];

interface QuickLoadCalculatorProps {
  onOpenQuote?: (calculatedKw: number, recommendedKva: number | string) => void;
}

export default function QuickLoadCalculator({ onOpenQuote }: QuickLoadCalculatorProps) {
  const [activeCategory, setActiveCategory] = useState<BuildingTypeKey>("home");
  const [appliances, setAppliances] = useState<Appliance[]>(() =>
    PRESETS.home.map((item) => ({ ...item }))
  );
  const [pop, setPop] = useState(false);

  const notchRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const updateNotch = (idx: number) => {
    const btn = tabRefs.current[idx];
    const notch = notchRef.current;
    if (btn && notch) {
      notch.style.left = `${btn.offsetLeft + btn.offsetWidth / 2}px`;
    }
  };

  const handleCategorySelect = (key: BuildingTypeKey, index: number) => {
    setActiveCategory(key);
    const updated = PRESETS[key].map((item) => ({ ...item }));
    setAppliances(updated);
    updateNotch(index);
  };

  useEffect(() => {
    const initialIndex = CATEGORIES.findIndex((c) => c.key === activeCategory);
    if (initialIndex !== -1) {
      updateNotch(initialIndex);
    }
  }, [activeCategory]);

  useEffect(() => {
    const handleResize = () => {
      const idx = CATEGORIES.findIndex((c) => c.key === activeCategory);
      if (idx !== -1) updateNotch(idx);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeCategory]);

  const handleSliderChange = (index: number, val: number) => {
    setAppliances((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], qty: val };
      return next;
    });
    setPop(true);
    setTimeout(() => setPop(false), 150);
  };

  // Math sizing
  const totalWatts = appliances.reduce((sum, item) => sum + item.qty * item.watts, 0);
  const runningKw = totalWatts / 1000;
  const PF = 0.8;
  const MARGIN = 1.2; // 20% safety margin
  const neededKva = totalWatts === 0 ? 0 : (runningKw / PF) * MARGIN;

  const recommendedKva =
    totalWatts === 0
      ? 0
      : STANDARD_RATINGS.find((r) => r >= neededKva) ?? "2000+";

  return (
    <section id="load-calculator" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-200/80 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-10">
        {/* Section Header matching the site's typography & primary color */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight mb-2">
            <span className="w-10 h-[4px] bg-primary rounded-xs inline-block" />
            <span>Free Load Calculator</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight leading-tight">
            Know your generator size in <span className="text-primary">30 seconds</span>
          </h2>
        </div>

        {/* 5 Building Profile Tabs */}
        <div className="relative mb-5">
          <div
            className="grid grid-cols-5 gap-1.5 sm:gap-2 p-1 bg-slate-100 rounded-md border border-slate-200"
            role="group"
            aria-label="Building type"
          >
            {CATEGORIES.map((cat, idx) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => handleCategorySelect(cat.key, idx)}
                  className={`relative flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-1 sm:px-3 rounded-sm font-heading font-bold text-xs sm:text-[13px] tracking-tight transition-all duration-200 cursor-pointer overflow-hidden ${
                    isActive
                      ? "bg-primary text-white shadow-xs -translate-y-0.5"
                      : "bg-[#1E222B] text-slate-200 hover:bg-[#282D39] hover:text-white border border-slate-700/60"
                  }`}
                  aria-pressed={isActive}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0"
                    dangerouslySetInnerHTML={{ __html: cat.icon }}
                  />
                  <span className="truncate">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Notch Indicator */}
          <div
            ref={notchRef}
            className="absolute -bottom-2.5 w-0 h-0 border-x-[7px] border-x-transparent border-t-[8px] border-t-primary transition-all duration-250 ease-out z-10 pointer-events-none transform -translate-x-1/2 hidden sm:block"
          />
        </div>

        {/* Main Box */}
        <div className="rounded-md overflow-hidden bg-white border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-[1.6fr_1fr]">
          {/* Left Column: 2-column appliances grid */}
          <div className="p-4 sm:p-5 lg:p-6 grid grid-cols-2 gap-x-3.5 sm:gap-x-5 gap-y-3.5 sm:gap-y-4 bg-white">
            {appliances.map((l, idx) => {
              const pct = (l.qty / l.max) * 100;
              return (
                <div key={l.name} className="flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-1.5 min-w-0">
                    <span className="w-6 h-6 rounded-xs bg-primary text-white flex items-center justify-center shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3.5 h-3.5"
                        dangerouslySetInnerHTML={{ __html: l.icon }}
                      />
                    </span>
                    <b className="font-heading font-bold text-[13px] sm:text-[14px] text-slate-800 truncate flex-1 leading-tight tracking-tight">
                      {l.name}
                    </b>
                    <span className="font-heading font-extrabold text-base sm:text-lg text-primary tabular-nums shrink-0 leading-none">
                      {l.qty}
                    </span>
                  </div>

                  {/* Range Slider styled with Primary Red & Slate Track */}
                  <div className="py-1">
                    <input
                      type="range"
                      min={0}
                      max={l.max}
                      step={1}
                      value={l.qty}
                      aria-label={`${l.name} quantity`}
                      onChange={(e) =>
                        handleSliderChange(idx, parseInt(e.target.value, 10) || 0)
                      }
                      className="w-full h-[6.5px] rounded-xs appearance-none cursor-pointer outline-none bg-slate-200 accent-primary"
                      style={{
                        background: `linear-gradient(to right, #E00501 0%, #E00501 ${pct}%, #E2E8F0 ${pct}%, #E2E8F0 100%)`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Soft Charcoal Carbon Result Panel with Angled Primary Wedge */}
          <div
            className="relative overflow-hidden text-white p-5 sm:p-6 lg:p-7 flex flex-col justify-center bg-gradient-to-b from-[#222530] to-[#181B23] border-t md:border-t-0 md:border-l border-slate-700/30 min-h-[190px] cursor-pointer group"
            onClick={() => {
              if (onOpenQuote) {
                onOpenQuote(Math.round(runningKw) || 15, recommendedKva);
              }
            }}
            title="Click to request an official quote for this size"
          >
            {/* Signature Angled Primary Wedge */}
            <div
              className="absolute -right-8 top-0 bottom-0 w-20 bg-primary transform -skew-x-18 pointer-events-none group-hover:scale-105 transition-transform"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-slate-300 mb-1.5">
                <span className="w-2 h-2 rounded-xs bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                <span>Recommended Generator</span>
              </div>

              <div className="flex items-baseline gap-2 mt-1">
                <span
                  className={`font-heading font-extrabold text-5xl sm:text-6xl lg:text-[72px] text-primary tracking-tight leading-none transition-transform duration-150 ${
                    pop ? "scale-105" : "scale-100"
                  }`}
                >
                  {recommendedKva}
                </span>
                <span className="font-heading font-bold text-xl sm:text-2xl text-white ml-1.5 tracking-tight">
                  kVA
                </span>
              </div>

              <div className="mt-2 text-xs text-slate-300 font-medium flex items-center gap-1.5">
                <span>Total Running Load:</span>
                <span className="text-white font-bold">{runningKw.toFixed(1)} kW</span>
                <span className="text-slate-500">•</span>
                <span className="text-primary font-bold">20% Inrush Reserve</span>
              </div>

              {/* Request Quote Button */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenQuote) {
                      onOpenQuote(Math.round(runningKw) || 15, recommendedKva);
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded-sm bg-primary hover:bg-primary-hover text-white font-heading font-bold text-xs sm:text-[13px] tracking-tight shadow-md shadow-primary/25 transition-all cursor-pointer group/btn"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Fine Print */}
        <p className="text-xs text-slate-500 mt-3 font-normal">
          Estimate only. Our certified engineers confirm the final electrical site survey before you buy.
        </p>
      </div>
    </section>
  );
}
