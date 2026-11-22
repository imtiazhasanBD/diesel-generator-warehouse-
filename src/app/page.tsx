"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "motion/react";
import { useModal } from "@/context/ModalContext";
import HeroKineticTypography from "@/components/HeroKineticTypography";
import QuickLoadCalculator from "@/components/QuickLoadCalculator";
import { PRODUCTS, PRODUCTS_BY_SLUG, FEATURED_SUPPLY_SLUGS, PRICE_DIRECTORY_CATEGORIES } from "@/data/products";
import { BLOG_POSTS } from "@/data/blogs";
import {
  Search,
  ArrowRight,
  ArrowUpRight,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Cpu,
  VolumeX as MuteIcon,
  Sliders,
  FileText,
  Wrench,
  CheckCircle,
  Check,
  MapPin,
  ArrowDown,
  Factory,
  Building2,
  HeartPulse,
  Server,
  HardHat,
  Layers,
  ShieldCheck,
  Headset,
  Zap,
  Award,
  MessageSquare,
  Calculator
} from "lucide-react";

// Interactive Hotspots Data
const HOTSPOTS = {
  engine: {
    title: "UK / USA Heavy Diesel Engine",
    desc: "Direct-injection turbocharged diesel engine engineered for 1500 RPM low-stress synchronous operation and superior fuel efficiency."
  },
  alternator: {
    title: "100% Copper Brushless Alternator",
    desc: "Stamford / Leroy Somer Class H insulated alternator with automatic voltage regulator (AVR) ensuring ±0.5% voltage regulation."
  },
  canopy: {
    title: "Soundproof Acoustic Canopy",
    desc: "Laser-cut 2.5mm cold-rolled steel with electrostatic powder coating and high-density mineral wool soundproofing."
  },
  controller: {
    title: "Deep Sea (UK) Digital Control Module",
    desc: "Microprocessor-based automatic mains failure (AMF) panel with LCD telemetry display and remote GSM engine monitoring."
  }
};

// Industry Solutions Data
const INDUSTRY_DATA = {
  manufacturing: {
    label: "Manufacturing & Garments",
    cardTitle: "Manufacturing",
    desc: "Uninterrupted prime power built for high-throughput production lines, textile mills, and automated factories.",
    bullets: [
      "110% continuous overload capacity",
      "Dual-genset automatic load sharing",
      "SCADA & IoT remote fuel telemetry"
    ],
    image: "https://www.borgenmagazine.com/wp-content/uploads/2020/08/garment-workers-in-Bangladesh-1.jpg",
    icon: Factory
  },
  commercial: {
    label: "Commercial & High-Rise",
    cardTitle: "Commercial & High-Rise",
    desc: "Acoustically insulated standby power systems engineered for corporate towers and commercial hubs with zero downtime.",
    bullets: [
      "Ultra-silent canopy (<68 dBA at 7m)",
      "Under 8-second AMF auto transfer",
      "Compact basement & rooftop footprint"
    ],
    image: "https://www.vgssbs.com/assets/images/products/pro-11.jpg",
    icon: Building2
  },
  hospitals: {
    label: "Hospitals & Healthcare",
    cardTitle: "Healthcare",
    desc: "Life-safety backup power engineered for ICUs, diagnostic suites, and operating theatres without interruption.",
    bullets: [
      "Dual ATS fast-transfer coordination",
      "Hospital-grade critical exhaust silencers",
      "Priority 24/7 emergency service support"
    ],
    image: "https://amcarehospital.com/wp-content/uploads/2023/12/Are-Hospitals-Making-as-Much-Money-as-You-Think1.jpg",
    icon: HeartPulse
  },
  datacenters: {
    label: "Data Centers & Telecom",
    cardTitle: "Data Centers",
    desc: "Tier III & IV compliant power infrastructure built with fault-tolerant redundancy and clean sine-wave output.",
    bullets: [
      "PMG excitation for clean waveform",
      "72-hour bulk fuel reserve system",
      "N+1 microprocessor sync panels"
    ],
    image: "https://www.abalone-tech.com/wp-content/uploads/2023/11/DATA-CENTER-1.jpg",
    icon: Server
  },
  construction: {
    label: "Infrastructure & Sites",
    cardTitle: "Infrastructure",
    desc: "Rugged weather-resistant power units built for outdoor environments, heavy piling, and bridge construction.",
    bullets: [
      "Heavy-duty skid with crane lift points",
      "+50°C tropicalized cooling radiator",
      "Lockable anti-siphon steel fuel tank"
    ],
    image: "/assets/images/industrial-site.jpg",
    icon: HardHat
  }
};

// Nationwide Generator Sales & Capabilities Data (Matching Framer Reference Layout)
const SALES_REGIONS = [
  {
    id: "dhaka",
    title: "Dhaka Division",
    subtitle: "Central Industrial, EPZ & Commercial Hub",
    districts: "Dhaka, Gazipur, Savar, Narayanganj, Tongi, Narsingdi",
    image: "/assets/images/hero-gen.jpg",
    icon: (
      <svg className="w-8 h-8 text-slate-900" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="11" y="2" width="10" height="6" rx="1.5" />
        <path d="M16 8v5" />
        <path d="M8 13h16" />
        <path d="M7 13v7l5 3" />
        <path d="M25 13v7l-5 3" />
        <circle cx="16" cy="22" r="2.5" />
        <path d="M16 24.5v5" />
        <path d="M11 29.5h10" />
      </svg>
    ),
    features: [
      "Rapid 24-48h dispatch from Tejgaon central depot",
      "Ready stock: 20 kVA to 2500 kVA acoustic gensets",
      "On-site crane unloading & ATS synchronization",
      "24/7 dedicated factory emergency breakdown team"
    ]
  },
  {
    id: "chattogram",
    title: "Chattogram Division",
    subtitle: "Port, Maritime & Heavy Steel Industries",
    districts: "Chattogram Port, KEPZ, Agrabad, Sitakunda, Cox's Bazar",
    image: "/assets/images/industrial-site.jpg",
    icon: (
      <svg className="w-8 h-8 text-slate-900" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3v11" />
        <path d="M11 9l5 5 5-5" />
        <path d="M4 17h24" />
        <path d="M6 23l10 5 10-5" />
        <rect x="7" y="22" width="18" height="4" rx="1" />
      </svg>
    ),
    features: [
      "Heavy-duty prime & continuous power gensets",
      "Anti-corrosive marine canopy with acoustic insulation",
      "Direct delivery to shipyards & steel re-rolling mills",
      "Dual-genset auto synchronization & fuel panels"
    ]
  },
  {
    id: "sylhet",
    title: "Sylhet Division",
    subtitle: "Tea Estates, Eco-Resorts & Healthcare Backup",
    districts: "Sylhet Sadar, Sreemangal, Moulvibazar, Habiganj, Sunamganj",
    image: "/assets/images/project-green.jpg",
    icon: (
      <svg className="w-8 h-8 text-slate-900" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="3" width="18" height="6" rx="1.5" />
        <path d="M16 9v8" />
        <polygon points="13,17 19,17 16,23" fill="currentColor" />
        <path d="M4 27h24" />
        <circle cx="16" cy="27" r="1.5" />
      </svg>
    ),
    features: [
      "Ultra-silent soundproof canopies (<65 dBA at 7 meters)",
      "Critical power for regional diagnostic centers & hospitals",
      "High fuel efficiency with genuine Cummins & Perkins engines",
      "Dedicated Annual Maintenance Contracts (AMC)"
    ]
  },
  {
    id: "khulna",
    title: "Khulna & South-West Corridor",
    subtitle: "Mongla Port, Jute Mills & Shrimp Cold Storage",
    districts: "Khulna, Mongla Seaport, Jessore, Kushtia, Benapole, Barishal",
    image: "/assets/images/yellow-silent.jpg",
    icon: (
      <svg className="w-8 h-8 text-slate-900" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="3" width="20" height="5" rx="1.5" />
        <path d="M16 8v7" />
        <polygon points="12,15 20,15 16,20" fill="currentColor" />
        <rect x="4" y="23" width="24" height="5" rx="1.5" />
        <path d="M8 23v-3h16v3" />
      </svg>
    ),
    features: [
      "Continuous prime rating for shrimp cold storage & jute mills",
      "Salt-spray resistant tropicalized cooling radiators (+50°C)",
      "Rapid delivery across Khulna, Jessore, Kushtia & Mongla",
      "100% genuine spare parts stocking & rapid dispatch"
    ]
  }
];

// Professional Card Wrapper Component with Subtle Industrial Elevation
function TiltCard({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`transition-all duration-300 hover:shadow-md hover:border-slate-300 ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  // Scroll progress linked to motion.dev useScroll
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Hero Parallax effect
  const heroVideoScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.4]);

  // Video State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Hotspot State
  const [activeHotspot, setActiveHotspot] = useState<keyof typeof HOTSPOTS>("engine");

  // Industry Tab State
  const [activeIndustry, setActiveIndustry] = useState<keyof typeof INDUSTRY_DATA>("manufacturing");

  // Load Sizing Calculator State
  const [kwLoad, setKwLoad] = useState(50);
  const recommendedKva = Math.ceil((kwLoad / 0.8) * 1.25);
  const fuelRate = (recommendedKva * 0.22).toFixed(1);

  // Modals
  const { openQuote, openSearch } = useModal();
  const [selectedRegion, setSelectedRegion] = useState("Dhaka Division");

  // Helper to open quote pre-populated with division
  const openQuoteForLocation = (region: string) => {
    setSelectedRegion(region);
    openQuote(`Regional Sizing Inquiry — ${region}`);
  };

  // Video Controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 overflow-x-clip">

      {/* Motion Scroll Progress Indicator Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-primary origin-left z-[51]"
        style={{ scaleX }}
      />

      <div>
        {/* =========================================================
             HERO SECTION: DGW B2B GENERATOR WHOLESALER (MODERN GEOMETRIC REFERENCE LAYOUT)
             ========================================================= */}
        <section
          id="hero"
          className="relative bg-[#FAFAFC] text-slate-950 overflow-hidden pt-10 sm:pt-14 lg:pt-18"
        >
          {/* Subtle Ambient Decorative Diagonal Bands */}
          <div className="absolute top-0 right-0 w-[600px] h-full pointer-events-none select-none overflow-hidden hidden lg:block opacity-40">
            <div className="absolute -top-20 right-16 w-32 h-[130%] bg-gradient-to-b from-slate-200/50 via-slate-100/20 to-transparent -skew-x-[16deg]" />
            <div className="absolute -top-20 right-64 w-16 h-[130%] bg-gradient-to-b from-slate-200/30 via-slate-100/10 to-transparent -skew-x-[16deg]" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-10">

            {/* Top Row: Content & 3 Slanted Parallelogram Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">

              {/* Left Column: Heading, Subheadings, Narrative, 2 Red Cards & CTAs */}
              <div className="lg:col-span-6 xl:col-span-6 space-y-5 sm:space-y-6">

                {/* Eyebrow Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="inline-flex items-center gap-3"
                >
                  <span className="w-8 h-[3px] bg-[#E00501] rounded-full inline-block" />
                  <span className="font-mono text-xs sm:text-[13px] font-bold text-slate-700 tracking-[0.18em] uppercase">
                    DGW / B2B GENERATOR WHOLESALER
                  </span>
                </motion.div>

                {/* Main Headline (Styled Exactly Like Reference Font) */}
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
                  className="font-heading font-bold text-4xl sm:text-6xl lg:text-7xl xl:text-[76px] tracking-tight text-slate-950 leading-[1.02] uppercase"
                >
                  Powering <br />
                  <span className="text-primary">wholesale.</span>
                </motion.h1>

                {/* Subheadings from Reference */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
                  className="space-y-1"
                >
                  <h2 className="font-heading font-extrabold text-sm sm:text-base lg:text-[17px] tracking-wide text-slate-900 uppercase">
                    DIESEL GENERATORS &bull; WHOLESALE DISTRIBUTION
                  </h2>
                  <p className="font-mono text-xs sm:text-[13px] text-slate-500 font-semibold tracking-[0.1em] uppercase">
                    READY STOCK &bull; PERKINS &bull; CUMMINS &bull; RICARDO &bull; 30-500 KVA
                  </p>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.24, ease: "easeOut" }}
                  className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal"
                >
                  Bulk generator supply for dealers, distributors and project teams. Full-container and mixed-model orders, ready stock in Bangladesh.
                </motion.p>

                {/* 2 Red Wholesale Cards (01 & 02) - Reduced & Sleek */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5 max-w-lg">
                  {/* Card 1: Bulk Orders */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.32, ease: "easeOut" }}
                    whileHover={{ y: -2 }}
                    className="bg-[#E00501] rounded-lg py-2.5 px-3.5 sm:py-3 sm:px-4 text-white shadow-sm relative overflow-hidden group hover:brightness-105 transition-all"
                  >
                    <span className="text-white/80 font-mono text-[11px] font-bold block mb-0.5">
                      01
                    </span>
                    <h3 className="font-heading font-bold text-sm sm:text-[15px] text-white uppercase tracking-tight leading-tight">
                      BULK ORDERS
                    </h3>
                    <p className="text-white/90 text-[11px] sm:text-xs mt-0.5 leading-snug font-normal">
                      Flexible wholesale quantities
                    </p>
                  </motion.div>

                  {/* Card 2: Full-Container */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                    whileHover={{ y: -2 }}
                    className="bg-[#E00501] rounded-lg py-2.5 px-3.5 sm:py-3 sm:px-4 text-white shadow-sm relative overflow-hidden group hover:brightness-105 transition-all"
                  >
                    <span className="text-white/80 font-mono text-[11px] font-bold block mb-0.5">
                      02
                    </span>
                    <h3 className="font-heading font-bold text-sm sm:text-[15px] text-white uppercase tracking-tight leading-tight">
                      FULL-CONTAINER
                    </h3>
                    <p className="text-white/90 text-[11px] sm:text-xs mt-0.5 leading-snug font-normal">
                      Container-load shipments
                    </p>
                  </motion.div>
                </div>

                {/* Actions (Reduced Compact Buttons) */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.48, ease: "easeOut" }}
                  className="flex flex-wrap items-center gap-3 pt-1"
                >
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-lg bg-[#14161B] hover:bg-[#20242e] text-white font-heading font-bold text-xs tracking-wider uppercase transition-all shadow-sm hover:shadow group cursor-pointer"
                  >
                    <span>EXPLORE SUPPLY RANGE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                  </Link>

                  <a
                    href="#load-calculator"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("load-calculator")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 hover:border-primary/50 text-slate-800 hover:text-primary font-heading font-bold text-xs tracking-wider uppercase transition-all shadow-xs group cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>LOAD CALCULATOR</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                  </a>
                </motion.div>

              </div>

              {/* Right Column: 3 Parallelogram Cards — exact reference match */}
              <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end pt-8 lg:pt-0 pb-10 lg:pb-12">

                {/* Soft Peach Ambient Blob behind right cards */}
                <div
                  className="absolute -bottom-6 -right-6 sm:-right-10 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 rounded-[120px_90px_140px_100px] bg-[#fed7aa]/55 pointer-events-none z-0"
                  style={{ filter: "blur(24px)" }}
                />

                {/* Diagonal Cards Row */}
                <div className="relative z-10 flex items-end gap-3 sm:gap-4 lg:gap-4.5 pr-2 sm:pr-4">

                  {/* Card 1: Warehouse Generator (Left) — shorter, starts lower, ends higher */}
                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                    whileHover={{ y: -8, transition: { duration: 0.25 } }}
                    className="relative shrink-0 mb-6 sm:mb-8 lg:mb-9 cursor-pointer group"
                  >
                    <div
                      className="rounded-[10px] sm:rounded-[12px] lg:rounded-[14px] overflow-hidden bg-slate-900 border border-white/60 relative"
                      style={{
                        transform: "skewX(-18.5deg)",
                        transformOrigin: "center center",
                        width: "clamp(105px, 11.5vw, 165px)",
                        height: "clamp(215px, 23.5vw, 335px)",
                        boxShadow: "0 18px 40px -12px rgba(0,0,0,0.22)",
                      }}
                    >
                      <img
                        src="/assets/images/HERO_PICTURE/HERO_PICTURE/4d94ad03-1ce2-4b85-a487-b20120400a1b.png"
                        alt="DGW Industrial Generator Wholesale Warehouse"
                        className="h-full object-cover brightness-[0.95] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                        style={{
                          width: "175%",
                          maxWidth: "none",
                          marginLeft: "-37.5%",
                          transform: "skewX(18.5deg)",
                          transformOrigin: "center center",
                          objectPosition: "34% 50%",
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Card 2: Wholesale Loading Dock (Center) — tallest and widest, reaches highest and lowest */}
                  <motion.div
                    initial={{ opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.28, ease: "easeOut" }}
                    whileHover={{ y: -8, transition: { duration: 0.25 } }}
                    className="relative shrink-0 mb-0 z-20 cursor-pointer group"
                  >
                    <div
                      className="rounded-[11px] sm:rounded-[13px] lg:rounded-[15px] overflow-hidden bg-slate-900 border border-white/80 relative"
                      style={{
                        transform: "skewX(-18.5deg)",
                        transformOrigin: "center center",
                        width: "clamp(135px, 15vw, 215px)",
                        height: "clamp(275px, 30.5vw, 425px)",
                        boxShadow: "0 24px 50px -12px rgba(0,0,0,0.30)",
                      }}
                    >
                      <img
                        src="/assets/images/HERO_PICTURE/HERO_PICTURE/7ba6d30d-636c-4a2c-b42b-b36c26e95022.png"
                        alt="DGW Generator Wholesale Distribution & Loading Dock"
                        className="h-full object-cover brightness-[0.98] contrast-[1.04] transition-transform duration-700 group-hover:scale-105"
                        style={{
                          width: "175%",
                          maxWidth: "none",
                          marginLeft: "-37.5%",
                          transform: "skewX(18.5deg)",
                          transformOrigin: "center center",
                          objectPosition: "46% 50%",
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Card 3: Service Engineer & Maintenance (Right) with Orange/Red L-Accent */}
                  <motion.div
                    initial={{ opacity: 0, y: 44 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.40, ease: "easeOut" }}
                    whileHover={{ y: -8, transition: { duration: 0.25 } }}
                    className="relative shrink-0 mb-4 sm:mb-5 lg:mb-6 cursor-pointer group"
                  >
                    <div
                      className="rounded-[10px] sm:rounded-[12px] lg:rounded-[14px] overflow-hidden bg-slate-900 border border-white/60 relative"
                      style={{
                        transform: "skewX(-18.5deg)",
                        transformOrigin: "center center",
                        width: "clamp(120px, 13vw, 180px)",
                        height: "clamp(230px, 25vw, 350px)",
                        boxShadow: "0 18px 40px -12px rgba(0,0,0,0.22)",
                      }}
                    >
                      <img
                        src="/assets/images/HERO_PICTURE/HERO_PICTURE/598416fa-c485-4adc-ba36-a8360ed18256.png"
                        alt="DGW Power Systems Engineer Maintenance"
                        className="h-full object-cover brightness-[0.95] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                        style={{
                          width: "175%",
                          maxWidth: "none",
                          marginLeft: "-37.5%",
                          transform: "skewX(18.5deg)",
                          transformOrigin: "center center",
                          objectPosition: "62% 50%",
                        }}
                      />
                    </div>

                    {/* Red Accent L-Bracket — hugging bottom-right corner of Card 3 with zero gap */}
                    <div
                      className="absolute pointer-events-none z-30"
                      style={{
                        right: "clamp(12px, 1.3vw, 18px)",
                        bottom: "clamp(-16px, -1.15vw, -10px)",
                        width: "clamp(90px, 10vw, 140px)",
                        height: "clamp(50px, 5.5vw, 80px)",
                        filter: "drop-shadow(0 10px 18px rgba(224, 5, 1, 0.45))",
                      }}
                    >
                      <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path
                          d="M96 0L117 0C118.8 0 120 1.4 119.3 3.1L103 49C100.5 57 93.5 63 84.5 63L8 63C5.2 63 3.8 59.5 5.8 57.5L16.5 47C18 45.5 20 44.5 22.2 44.5L79 44.5C82.8 44.5 86 42 87 38.2L96 0Z"
                          fill="#E00501"
                        />
                      </svg>
                    </div>
                  </motion.div>

                </div>

              </div>

            </div>
          </div>
        </section>

        {/* =========================================================
             PREVIOUS HERO SECTION (HIDDEN AS REQUESTED)
             ========================================================= */}
        <section id="hero-previous" className="hidden relative bg-[#F4F4F6] text-slate-950 border-b border-slate-200">

          {/* Subtle Vertical Architectural Grid Lines */}
          <div className="absolute inset-0 max-w-[1400px] mx-auto px-6 sm:px-10 pointer-events-none z-0 hidden lg:block">
            <div className="w-full h-full grid grid-cols-4 border-x border-slate-200/60">
              <div className="border-r border-slate-200/60 h-full" />
              <div className="border-r border-slate-200/60 h-full" />
              <div className="border-r border-slate-200/60 h-full" />
              <div className="h-full" />
            </div>
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 pt-8 pb-8 sm:pt-12 sm:pb-10">

            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight">
              <span className="w-10 h-[4px] bg-primary rounded-sm inline-block" />
              <span>Direct Diesel Generator Warehouse Stock & Engineering</span>
            </div>

            {/* 2-Column Main Hero Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

              {/* Left Column: Giant Bold Headline */}
              <div className="lg:col-span-7">
                <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 leading-[1.02]">
                  From raw <span className="text-primary">energy</span><br />
                  to uninterrupted<br />
                  production
                </h1>
              </div>

              {/* Right Column: // SINCE - 2005 // + Description + CTA */}
              <div className="lg:col-span-5 space-y-5 lg:pt-2">
                <div className="font-mono text-xs text-slate-400 font-bold uppercase tracking-widest">
                  // SINCE - 2005 //
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg font-normal">
                  We deliver end-to-end power generation solutions from heavy diesel genset assembly and soundproof canopy fabrication to synchronized ATS backup engineered for quality, efficiency, and on-time delivery.
                </p>
                <div>
                  <a
                    href="#capabilities"
                    className="framer-btn-dark cursor-pointer"
                  >
                    <span>Explore our capabilities</span>
                    <div className="btn-arrow-box">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </a>
                </div>
              </div>

            </div>

            {/* Bottom Meta Info Strip */}
            <div className="mt-8 sm:mt-10 pt-6 border-t border-slate-200 grid grid-cols-3 items-center text-xs text-slate-500 font-mono">
              <div className="text-left font-sans font-medium text-slate-600">
                Based in: <strong className="text-slate-950 font-semibold">Dhaka, Bangladesh</strong>
              </div>
              <div className="text-center font-bold tracking-widest text-[11px] text-slate-400 flex items-center justify-center gap-2">
                <span>SCROLL DOWN</span>
                <ArrowDown className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="text-right">
                23.8103° N, 90.4125° E
              </div>
            </div>

          </div>

          {/* Full-Bleed Video Banner with Controls (Right Below Hero Content) */}
          <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[620px] overflow-hidden bg-slate-950 border-t border-slate-200">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              poster="/assets/images/hero-gen.jpg"
              className="w-full h-full object-cover brightness-[0.78] contrast-[1.08] saturate-[0.95]"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/assets/videos/hero-video.mp4" type="video/mp4" />
            </video>

            {/* Cinematic Ambient Scrim & Vignette for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            {/* Kinetic Typography Layer */}
            <HeroKineticTypography videoRef={videoRef} isPlaying={isPlaying} />

            {/* Video Controls (Floating Bottom Right) */}
            {/* <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-sm bg-black/65 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-all cursor-pointer shadow-lg"
                aria-label="Toggle Video Playback"
              >
                {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-sm bg-black/65 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-all cursor-pointer shadow-lg"
                aria-label="Toggle Video Sound"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
              </button>
            </div> */}
          </div>

        </section>

        {/* =========================================================
             SECTION 2: WHO WE ARE & 4-ELEMENT CIRCULAR ROW
             ========================================================= */}
        <section id="about" className="py-10 md:py-20 lg:py-28 bg-[#FFFFFF] border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-10">

            {/* Top Row: Badge + Team Collage & Statement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start pb-16"
            >
              <div className="lg:col-span-4 flex flex-col items-start">
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight">
                  <span className="w-10 h-[4px] bg-primary rounded-sm inline-block" />
                  <span>Who we are</span>
                </div>

                {/* Staggered 4-Portrait Team Collage - Centered on Mobile */}
                <div className="mt-9 relative w-fit mx-auto lg:mx-0 isolate">
                  {/* Top-Right Orange Sparkle Rays */}
                  <svg
                    className="absolute -top-6 right-5 w-8 h-6 text-primary pointer-events-none"
                    viewBox="0 0 36 28"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 21L6 8M18 19L22 5M24 23L33 15"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="flex items-start relative">
                    <div className="w-[68px] h-[112px] mt-5 rounded-tl-[18px] rounded-tr-[6px] rounded-br-[6px] rounded-bl-[14px] border-[2.5px] border-white shadow-[0_6px_18px_rgba(15,23,42,0.08)] overflow-hidden relative z-10 bg-slate-100">
                      <img
                        src="/assets/images/team-1.jpg"
                        alt="Engineering specialist"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="w-[98px] h-[152px] -ml-3.5 rounded-tl-[22px] rounded-tr-[10px] rounded-br-[22px] rounded-bl-[10px] border-[3px] border-white shadow-[0_12px_28px_rgba(15,23,42,0.14)] overflow-hidden relative z-30 bg-slate-100">
                      <img
                        src="/assets/images/team-2.jpg"
                        alt="Lead power engineer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="w-[68px] h-[112px] -ml-2 mt-4 rounded-tl-[8px] rounded-tr-[16px] rounded-br-[12px] rounded-bl-[8px] border-[2.5px] border-white shadow-[0_6px_18px_rgba(15,23,42,0.08)] overflow-hidden relative z-20 bg-slate-100">
                      <img
                        src="/assets/images/team-3.jpg"
                        alt="Technical operations engineer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="w-[48px] h-[68px] -ml-1.5 mt-7 rounded-tl-[6px] rounded-tr-[12px] rounded-br-[10px] rounded-bl-[6px] border-[2.5px] border-white shadow-[0_4px_12px_rgba(15,23,42,0.08)] overflow-hidden relative z-10 bg-slate-100">
                      <img
                        src="/assets/images/team-4.jpg"
                        alt="Field support engineer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>

                  {/* Overlapping 10+ Experts Badge */}
                  <div className="absolute -bottom-3 right-0 z-20 w-[74px] h-[68px] rounded-[16px] bg-gradient-to-br from-primary to-primary-dark border-[2.5px] border-white shadow-[0_10px_24px_rgba(224,5,1,0.35)] flex flex-col items-center justify-center text-white">
                    <span className="font-heading text-[22px] font-extrabold leading-none tracking-tight">
                      10+
                    </span>
                    <span className="text-[11px] font-medium leading-tight mt-0.5 opacity-95">
                      Experts
                    </span>
                  </div>
                </div>

                {/* Bottom Caption with Vertical Orange Bar - Centered on Mobile */}
                <div className="mt-8 flex items-stretch gap-3 mx-auto lg:mx-0">
                  <span className="w-[3px] rounded-full bg-primary shrink-0" />
                  <p className="font-heading text-[18px] sm:text-[19px] font-bold text-[#11141A] leading-[1.25] tracking-[-0.02em]">
                    Team of passionate
                    <br />
                    professionals
                  </p>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <h2 className="font-heading text-3xl sm:text-5xl lg:text-[56px] font-bold text-slate-950 leading-[1.05] tracking-tight">
                  Driven by technology, backed by experience, focused on
                  <span className="text-primary"> power</span> excellence
                </h2>

                <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
                  We provide comprehensive industrial power generation solutions with world-class engineering, verified imported UK & USA engines, and 24/7 dedicated after-sales support across Bangladesh.
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <a href="#capabilities" className="framer-btn-dark cursor-pointer">
                    <span>Learn more about us</span>
                    <div className="btn-arrow-box">
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </a>

                  <a href="#products" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors cursor-pointer">
                    <span>Download brochure</span>
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Signature 4-Element Graphic Row - 2 circles per row on mobile */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 items-center pt-8 border-t border-slate-200">

              {/* Element 1: 10+ Global Brands */}
              <TiltCard className="flex flex-col items-center justify-center text-center p-3.5 sm:p-6 lg:p-8 bg-[#F6F7F9] rounded-full aspect-square max-w-[170px] sm:max-w-[220px] lg:max-w-[260px] mx-auto w-full border border-slate-200">
                <span className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-950 leading-tight">
                  10<span className="text-primary">+</span>
                </span>
                <h4 className="font-heading font-bold text-slate-900 text-xs sm:text-sm mt-0.5 sm:mt-1">Global Brands</h4>
                <p className="text-[10px] sm:text-xs text-slate-500 max-w-[125px] sm:max-w-[150px] mt-0.5 sm:mt-1 leading-tight line-clamp-2 sm:line-clamp-none">Perkins, Cummins, Ricardo, Stamford & CAT.</p>
              </TiltCard>

              {/* Element 2: Round Cutout of Generator Engine Macro */}
              <TiltCard className="rounded-full overflow-hidden aspect-square max-w-[170px] sm:max-w-[220px] lg:max-w-[260px] mx-auto w-full shadow-md border-2 sm:border-4 border-white">
                <img src="/assets/images/engine-circle.jpg" alt="Engine block and turbocharger" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </TiltCard>

              {/* Element 3: 20+ Delivering Excellence Circle */}
              <TiltCard className="flex flex-col items-center justify-center text-center p-3.5 sm:p-6 lg:p-8 bg-[#F6F7F9] rounded-full aspect-square max-w-[170px] sm:max-w-[220px] lg:max-w-[260px] mx-auto w-full border border-slate-200 relative group">
                <span className="font-mono text-[8.5px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5 sm:mb-1">
                  // 2005-2026 //
                </span>
                <span className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                  20<span className="text-slate-950">+</span>
                </span>
                <p className="text-[10px] sm:text-xs text-slate-600 max-w-[125px] sm:max-w-[160px] mt-0.5 sm:mt-1 font-medium leading-tight line-clamp-2 sm:line-clamp-none">Delivering consistent engineering excellence.</p>
                <div className="mt-1.5 sm:mt-3">
                  <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:bg-primary transition-colors">
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  </span>
                </div>
              </TiltCard>

              {/* Element 4: Capsule Photo with Rating */}
              <TiltCard className="relative rounded-full overflow-hidden aspect-square max-w-[170px] sm:max-w-[220px] lg:max-w-[260px] mx-auto w-full shadow-lg group border-2 sm:border-4 border-white">
                <img src="/assets/images/engineer-capsule.jpg" alt="Industrial Engineer in Plant" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-3 sm:p-5 lg:p-6 text-white text-center">
                  <div className="flex items-center justify-center gap-0.5 sm:gap-1 text-amber-400 text-[10px] sm:text-xs mb-0.5 sm:mb-1">
                    <span>★ 4.9</span>
                    <span className="text-slate-300">/ 5.0</span>
                  </div>
                  <p className="text-[9.5px] sm:text-xs font-bold leading-tight line-clamp-2">
                    Trusted by 500+ industries worldwide.
                  </p>
                </div>
              </TiltCard>

            </div>

          </div>
        </section>

        {/* =========================================================
             SECTION 3: WHAT WE DO / SCALABLE CAPABILITIES (FRAMER STACKING CARDS)
             ========================================================= */}
        <div id="services" className="scroll-mt-24" />
        <section id="capabilities" className="py-10 md:py-20 lg:py-28">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

            {/* Header matching exact reference screenshot */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 lg:mb-16 gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight">
                  <span className="w-10 h-[4px] bg-primary rounded-sm inline-block" />
                  <span>Our Capabilities</span>
                </div>
                <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-[1.08]">
                  Scalable <span className="text-primary">capabilities</span><br />
                  for every challenge
                </h2>
              </div>

              <button
                onClick={() => openQuoteForLocation("All Divisions")}
                className="framer-btn-dark self-start md:self-auto cursor-pointer"
              >
                <span>Explore all capabilities</span>
                <div className="btn-arrow-box">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>

            {/* Sticky Stacking Cards Container (One on top of another as you scroll) */}
            <div className="relative pb:4 md:pb-20">
              {SALES_REGIONS.map((region, index) => (
                <div
                  key={region.id}
                  style={{
                    "--stack-top": `calc(84px + ${index * 72}px)`,
                    zIndex: 10 + index,
                  } as React.CSSProperties}
                  className="sticky top-[76px] md:top-[var(--stack-top)] bg-white border-t border-slate-300/90 pt-8 pb-16 transition-shadow group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-6 lg:gap-8">
                    {/* 1. Left Index Number Badge */}
                    <div className="hidden lg:flex lg:col-span-1 items-start justify-center pt-1">
                      <div className="w-12 h-12 rounded-sm bg-[#EAEBED] border border-slate-300/60 flex items-center justify-center group-hover:bg-[#E2E4E9] group-hover:border-slate-400/80 transition-colors shadow-xs select-none">
                        <span className="font-heading text-2xl font-bold text-slate-950 tracking-tight">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* 2. Thumbnail Image */}
                    <div className="md:col-span-4 lg:col-span-3">
                      <div className="relative w-full h-44 sm:h-48 rounded-md overflow-hidden shadow-sm bg-slate-200 border border-slate-200">
                        <img
                          src={region.image}
                          alt={region.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-3 left-3 lg:hidden">
                          <span className="inline-block px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                            {String(index + 1).padStart(2, "0")} · {region.title}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 3. Title & Region Coverage */}
                    <div className="md:col-span-4 lg:col-span-3 space-y-1.5 pt-1">
                      <h3 className="font-heading text-2xl lg:text-3xl font-extrabold text-slate-950 tracking-tight group-hover:text-primary transition-colors leading-tight">
                        {region.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-500">
                        {region.subtitle}
                      </p>
                      <div className="pt-1 flex items-center gap-1.5 text-[11px] text-primary font-semibold">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="line-clamp-1">{region.districts}</span>
                      </div>
                    </div>

                    {/* 4. Features Column */}
                    <div className="md:col-span-3 lg:col-span-4 space-y-2 pt-1">
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Features
                      </h4>
                      <ul className="space-y-1.5">
                        {region.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700 leading-snug">
                            <span className="text-primary font-bold text-xs select-none mt-0.5">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 5. Orange Arrow Action Button (Far Right) */}
                    <div className="md:col-span-1 flex justify-end pt-1">
                      <button
                        onClick={() => openQuoteForLocation(region.title)}
                        className="framer-icon-btn w-10 h-10 sm:w-11 sm:h-11 group-hover:scale-105 shadow-xs cursor-pointer"
                        title={`Request quote for ${region.title}`}
                        aria-label={`Get quote for ${region.title}`}
                      >
                        <ArrowRight className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Nationwide Delivery Notice */}
            <div className="p-4 sm:p-5 rounded-md bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 group">
              {/* Left: Location Pin Circle + Coverage Text */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-sm bg-primary-light border border-primary/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-slate-950 leading-snug">
                    Delivering to all 64 Districts across Bangladesh
                  </h4>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    Rajshahi, Barishal, Rangpur, Mymensingh, Cumilla, Bogura, Pabna & nationwide project sites.
                  </p>
                </div>
              </div>

              {/* Right: Bangladesh Map + Nationwide Network Action */}
              <button
                onClick={() => openQuoteForLocation("All 64 Districts Nationwide")}
                className="flex items-center gap-3 sm:gap-4 self-end md:self-auto cursor-pointer pl-0 md:pl-4 group/btn text-left hover:opacity-95 transition-all"
                aria-label="Nationwide Sales & Service Network"
              >
                <div className="w-8 h-10 shrink-0 flex items-center justify-center">
                  <img
                    src="/assets/images/bd-map.svg"
                    alt="Bangladesh Nationwide Network"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="h-8 w-px bg-slate-200 shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-primary leading-tight">
                    Nationwide
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-slate-950 leading-tight whitespace-nowrap">
                    Sales & Service Network
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-primary group-hover/btn:translate-x-1 transition-transform shrink-0 ml-1" />
              </button>
            </div>

          </div>
        </section>

        {/* =========================================================
             SECTION 4: WHAT WE MANUFACTURE / EXPLODED CAD BLUEPRINT & PRECISION SPEC
             ========================================================= */}
        <section id="schematic" className="relative bg-[#121214] text-white overflow-hidden pt-[140px] sm:pt-[240px] lg:pt-[390px] pb-12 md:pb-24 lg:pb-32">

          {/* 1. Glowing Orange Dome Curve (White Top -> Fiery Orange Arch -> Dark Base) */}
          <div className="absolute top-0 left-0 right-0 h-[280px] sm:h-[400px] lg:h-[520px] pointer-events-none select-none overflow-hidden z-0">
            {/* Pure white top backdrop transitioning cleanly to dark base */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 38%, #121214 78%, #121214 100%)",
              }}
            />

            {/* Smoothly blurred convex orange-red dome arch */}
            <div
              className="
                absolute left-[-18%] w-[136%]
                top-[40px] sm:top-[76px] lg:top-[88px]
                h-[220px] sm:h-[360px] lg:h-[400px]
                rounded-tl-[50%_120px] rounded-tr-[50%_120px]
                sm:rounded-tl-[50%_170px] sm:rounded-tr-[50%_170px]
                lg:rounded-tl-[50%_195px] lg:rounded-tr-[50%_195px]
                blur-[24px] sm:blur-[38px] lg:blur-[44px]
              "
              style={{
                background:
                  "linear-gradient(180deg, #E00501 0%, #C50301 28%, #A00201 56%, #5A0101 80%, rgba(18,18,20,0) 100%)",
              }}
            />

            {/* Bottom feather into exact #121214 background */}
            <div className="absolute bottom-0 left-0 right-0 h-[100px] sm:h-[150px] bg-gradient-to-b from-transparent to-[#121214]" />
          </div>

          {/* 2. Full-Height 4 Architectural Vertical Grid Lines (emerging below the dome) */}
          <div className="absolute inset-0 max-w-[1400px] mx-auto px-4 sm:px-10 pointer-events-none z-0 hidden lg:block [mask-image:linear-gradient(to_bottom,transparent_0px,transparent_280px,black_410px)]">
            <div className="w-full h-full grid grid-cols-4 border-x border-dashed border-white/[0.1]">
              <div className="border-r border-dashed border-white/[0.1] h-full" />
              <div className="border-r border-dashed border-white/[0.1] h-full" />
              <div className="border-r border-dashed border-white/[0.1] h-full" />
              <div className="h-full" />
            </div>
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-10">

            {/* 3. Top Header: Badge on Left + 50,000+ Metric on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8 items-start mb-8 sm:mb-12 lg:mb-16">
              {/* Col 1: Badge */}
              <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold tracking-tight text-white">
                <span className="w-10 h-[4px] bg-primary rounded-sm inline-block" />
                <span>What we manufacture</span>
              </div>

              {/* Col 2 & 3: Grid alignment space */}
              <div className="hidden lg:block lg:col-span-2" />

              {/* Col 4: 50,000+ Metric */}
              <div className="lg:pl-6">
                <div className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none">
                  50,000<span className="text-primary">+</span>
                </div>
                <p className="text-xs text-slate-400 mt-1.5 sm:mt-2.5 max-w-[260px] leading-relaxed">
                  Precision-built diesel generators delivered to clients across industries and continents.
                </p>
              </div>
            </div>

            {/* 4. Centerpiece Exploded CAD Technical Diagram */}
            <div className="relative w-full my-4 sm:my-6 lg:my-12 py-2 sm:py-6 flex flex-col items-center justify-center">
              <div className="w-full max-w-5xl relative">
                <img
                  src="/assets/images/cad-exploded.svg"
                  alt="Generator Exploded Technical CAD Schematic"
                  className="w-full h-auto object-contain select-none filter drop-shadow-[0_12px_36px_rgba(0,0,0,0.6)]"
                />

                {/* Interactive Hotspot Pin 1 (Soundproof Enclosure) */}
                <div
                  onClick={() => setActiveHotspot("canopy")}
                  className="absolute top-[48%] left-[7.5%] w-6 h-6 sm:w-7 sm:h-7 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  {activeHotspot === "canopy" && <span className="absolute inset-0 rounded-sm bg-primary/40 animate-ping" />}
                  <span className={`relative flex items-center justify-center w-full h-full rounded-full border-2 border-white shadow-xl text-[9px] sm:text-[10px] font-bold transition-all ${activeHotspot === "canopy" ? "bg-primary text-white scale-125 ring-4 ring-primary/50" : "bg-[#18181A] text-white hover:bg-primary"
                    }`}>
                    1
                  </span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black/95 text-white text-[11px] font-semibold px-3 py-1.5 rounded-sm whitespace-nowrap border border-white/20 shadow-2xl pointer-events-none z-20">
                    Acoustic Canopy Shell (&lt;68 dBA)
                  </div>
                </div>

                {/* Interactive Hotspot Pin 2 (Engine Flywheel Core) */}
                <div
                  onClick={() => setActiveHotspot("engine")}
                  className="absolute top-[32%] left-[37%] w-6 h-6 sm:w-7 sm:h-7 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  {activeHotspot === "engine" && <span className="absolute inset-0 rounded-sm bg-primary/40 animate-ping" />}
                  <span className={`relative flex items-center justify-center w-full h-full rounded-full border-2 border-white shadow-xl text-[9px] sm:text-[10px] font-bold transition-all ${activeHotspot === "engine" ? "bg-primary text-white scale-125 ring-4 ring-primary/50" : "bg-[#18181A] text-white hover:bg-primary"
                    }`}>
                    2
                  </span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black/95 text-white text-[11px] font-semibold px-3 py-1.5 rounded-sm whitespace-nowrap border border-white/20 shadow-2xl pointer-events-none z-20">
                    Heavy Cast Flywheel & Core
                  </div>
                </div>

                {/* Interactive Hotspot Pin 3 (Alternator & Rotor) */}
                <div
                  onClick={() => setActiveHotspot("alternator")}
                  className="absolute top-[52%] left-[71.5%] w-6 h-6 sm:w-7 sm:h-7 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  {activeHotspot === "alternator" && <span className="absolute inset-0 rounded-sm bg-primary/40 animate-ping" />}
                  <span className={`relative flex items-center justify-center w-full h-full rounded-full border-2 border-white shadow-xl text-[9px] sm:text-[10px] font-bold transition-all ${activeHotspot === "alternator" ? "bg-primary text-white scale-125 ring-4 ring-primary/50" : "bg-[#18181A] text-white hover:bg-primary"
                    }`}>
                    3
                  </span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black/95 text-white text-[11px] font-semibold px-3 py-1.5 rounded-sm whitespace-nowrap border border-white/20 shadow-2xl pointer-events-none z-20">
                    100% Copper Brushless Alternator
                  </div>
                </div>
              </div>

              {/* Mobile Active Hotspot Indicator Banner */}
              <div className="sm:hidden mt-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 text-[11px] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Tap pins <strong className="text-white">1, 2, 3</strong> to inspect components below</span>
              </div>
            </div>

            {/* 5. 4 Technical Spec Cards Grid - 2 per row on mobile screens */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 lg:pt-12 border-t border-white/[0.08]">

              {/* Card 1: Engine Core */}
              <div
                onClick={() => setActiveHotspot("engine")}
                className={`p-3 sm:p-5 rounded-md bg-[#16171A]/90 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${activeHotspot === "engine"
                  ? "border-primary bg-white/[0.07] ring-1 ring-primary/50 shadow-[0_0_24px_rgba(224,5,1,0.15)]"
                  : "border-white/[0.08] hover:border-white/20"
                  }`}
              >
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm lg:text-base text-white mb-2 sm:mb-3 line-clamp-2 leading-snug">
                    Heavy Diesel Engine Block
                  </h4>
                  <div className="w-full h-24 sm:h-32 lg:h-36 rounded-sm overflow-hidden bg-slate-900 border border-white/10 mb-2.5 sm:mb-5 relative group">
                    <img
                      src="/assets/images/engine-circle.jpg"
                      alt="Diesel Engine Turbocharger Block"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2.5 text-[10px] sm:text-xs">
                    <div className="flex justify-between items-center text-slate-400 border-b border-white/[0.06] pb-1.5 sm:pb-2 gap-1">
                      <span className="truncate">Material</span>
                      <span className="text-white font-medium text-right truncate">Cast Alloy</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400 border-b border-white/[0.06] pb-1.5 sm:pb-2 gap-1">
                      <span className="truncate">Capability</span>
                      <span className="text-white font-medium text-right truncate">Turbo Inject</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400 pt-0.5 gap-1">
                      <span className="truncate">Range</span>
                      <span className="text-white font-medium text-right truncate">15–2500 kVA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Acoustic Canopy */}
              <div
                onClick={() => setActiveHotspot("canopy")}
                className={`p-3 sm:p-5 rounded-md bg-[#16171A]/90 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${activeHotspot === "canopy"
                  ? "border-primary bg-white/[0.07] ring-1 ring-primary/50 shadow-[0_0_24px_rgba(224,5,1,0.15)]"
                  : "border-white/[0.08] hover:border-white/20"
                  }`}
              >
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm lg:text-base text-white mb-2 sm:mb-3 line-clamp-2 leading-snug">
                    Soundproof Canopy Enclosure
                  </h4>
                  <div className="w-full h-24 sm:h-32 lg:h-36 rounded-sm overflow-hidden bg-slate-900 border border-white/10 mb-2.5 sm:mb-5 relative group">
                    <img
                      src="/assets/images/yellow-silent.jpg"
                      alt="Soundproof Canopy Housing"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2.5 text-[10px] sm:text-xs">
                    <div className="flex justify-between items-center text-slate-400 border-b border-white/[0.06] pb-1.5 sm:pb-2 gap-1">
                      <span className="truncate">Material</span>
                      <span className="text-white font-medium text-right truncate">2.5mm Steel</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400 border-b border-white/[0.06] pb-1.5 sm:pb-2 gap-1">
                      <span className="truncate">Noise</span>
                      <span className="text-white font-medium text-right truncate">&lt;68 dBA @7m</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400 pt-0.5 gap-1">
                      <span className="truncate">Feature</span>
                      <span className="text-white font-medium text-right truncate">Weatherproof</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Control & ATS Panels */}
              <div
                onClick={() => setActiveHotspot("controller")}
                className={`p-3 sm:p-5 rounded-md bg-[#16171A]/90 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${activeHotspot === "controller"
                  ? "border-primary bg-white/[0.07] ring-1 ring-primary/50 shadow-[0_0_24px_rgba(224,5,1,0.15)]"
                  : "border-white/[0.08] hover:border-white/20"
                  }`}
              >
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm lg:text-base text-white mb-2 sm:mb-3 line-clamp-2 leading-snug">
                    Electrical Control & ATS Panels
                  </h4>
                  <div className="w-full h-24 sm:h-32 lg:h-36 rounded-sm overflow-hidden bg-slate-900 border border-white/10 mb-2.5 sm:mb-5 relative group">
                    <img
                      src="/assets/images/gen-control-panel.jpg"
                      alt="Deep Sea Digital Generator Control Panel"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2.5 text-[10px] sm:text-xs">
                    <div className="flex justify-between items-center text-slate-400 border-b border-white/[0.06] pb-1.5 sm:pb-2 gap-1">
                      <span className="truncate">Material</span>
                      <span className="text-white font-medium text-right truncate">Coated Steel</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400 border-b border-white/[0.06] pb-1.5 sm:pb-2 gap-1">
                      <span className="truncate">Failover</span>
                      <span className="text-white font-medium text-right truncate">&lt;8s AMF</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400 pt-0.5 gap-1">
                      <span className="truncate">System</span>
                      <span className="text-white font-medium text-right truncate">Full SCADA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Alternator & Rotor Shaft */}
              <div
                onClick={() => setActiveHotspot("alternator")}
                className={`p-3 sm:p-5 rounded-md bg-[#16171A]/90 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${activeHotspot === "alternator"
                  ? "border-primary bg-white/[0.07] ring-1 ring-primary/50 shadow-[0_0_24px_rgba(224,5,1,0.15)]"
                  : "border-white/[0.08] hover:border-white/20"
                  }`}
              >
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm lg:text-base text-white mb-2 sm:mb-3 line-clamp-2 leading-snug">
                    100% Copper Brushless Alternator
                  </h4>
                  <div className="w-full h-24 sm:h-32 lg:h-36 rounded-sm overflow-hidden bg-slate-900 border border-white/10 mb-2.5 sm:mb-5 relative group">
                    <img
                      src="/assets/images/gen-alternator-shaft.jpg"
                      alt="Alternator Copper Stator & Rotor Shaft"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2.5 text-[10px] sm:text-xs">
                    <div className="flex justify-between items-center text-slate-400 border-b border-white/[0.06] pb-1.5 sm:pb-2 gap-1">
                      <span className="truncate">Material</span>
                      <span className="text-white font-medium text-right truncate">Class H Copper</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400 border-b border-white/[0.06] pb-1.5 sm:pb-2 gap-1">
                      <span className="truncate">AVR</span>
                      <span className="text-white font-medium text-right truncate">±0.5% Digital</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400 pt-0.5 gap-1">
                      <span className="truncate">Speed</span>
                      <span className="text-white font-medium text-right truncate">1500 RPM</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* 6. Bottom Action Footer matching Reference Screenshot */}
            <div className="mt-8 sm:mt-14 lg:mt-18 pt-6 sm:pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
              <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight max-w-lg leading-snug">
                Explore our complete product range across industries.
              </h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
                <a
                  href="#products"
                  className="text-xs font-semibold text-slate-400 hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer py-2 sm:py-0"
                >
                  <span>Download brochure</span>
                  <Download className="w-4 h-4 text-slate-400" />
                </a>
                <button
                  onClick={() => openQuote("Industrial Generators Catalog Inquiry")}
                  className="framer-btn-primary cursor-pointer w-full sm:w-auto justify-center"
                >
                  <span>View all products</span>
                  <div className="btn-arrow-box">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================
             SECTION 5: WHAT WE SUPPLY / TECHNICAL PRODUCT LINEUP
             ========================================================= */}
        <section id="products" className=" pt-10 md:pt-20 lg:pt-28 bg-[#FFFFFF]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-10">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight">
                  <span className="w-10 h-[4px] bg-primary rounded-sm inline-block" />
                  <span>What we supply</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight">
                  50,000+ kVA <span className="text-primary">delivered</span> across Bangladesh
                </h2>
              </div>

              <Link href="/products" className="framer-btn-outline rounded-sm cursor-pointer self-start sm:self-auto">
                <span>View all products</span>
                <div className="btn-arrow-box rounded-sm">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
                </div>
              </Link>
            </div>

            {/* 4 Technical Product Spec Table Cards - Dynamically Driven by Global Object */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {FEATURED_SUPPLY_SLUGS.map((slug) => {
                const product = PRODUCTS_BY_SLUG[slug];
                if (!product) return null;
                return (
                  <TiltCard
                    key={product.id}
                    className="bg-[#FAFBFD] rounded-md p-3 sm:p-5 lg:p-6 border border-slate-200 flex flex-col justify-between"
                  >
                    <div>
                      <Link href={`/products/${product.slug}`} className="block">
                        <div className="h-28 sm:h-36 lg:h-44 w-full rounded-sm overflow-hidden bg-white mb-3 sm:mb-5 flex items-center justify-center p-1.5 sm:p-2 border border-slate-100 group">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="font-heading font-bold text-xs sm:text-sm lg:text-base text-slate-950 hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="mt-2.5 sm:mt-4 pt-2.5 sm:pt-4 border-t border-slate-200/80 space-y-1 sm:space-y-2 text-[10px] sm:text-xs">
                        <div className="flex justify-between items-baseline gap-1">
                          <span className="text-slate-400 shrink-0">Engine:</span>
                          <span className="font-semibold text-slate-800 truncate text-right">
                            {product.specs.engineBrand} {product.specs.engineModel}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline gap-1">
                          <span className="text-slate-400 shrink-0">Alternator:</span>
                          <span className="font-semibold text-slate-800 truncate text-right">
                            {product.specs.alternatorBrand} {product.specs.alternatorModel}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline gap-1">
                          <span className="text-slate-400 shrink-0">Noise:</span>
                          <span className="font-semibold text-primary truncate text-right">
                            {product.noiseLevel}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline gap-1">
                          <span className="text-slate-400 shrink-0">Controller:</span>
                          <span className="font-semibold text-slate-800 truncate text-right">
                            {product.specs.controllerBrand}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 sm:pt-5 mt-3 sm:mt-5 border-t border-slate-200 flex items-center justify-between">
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-[11px] sm:text-xs font-bold text-slate-900 hover:text-primary"
                      >
                        <span className="hidden sm:inline">View Specifications</span>
                        <span className="sm:hidden">View Specs</span>
                      </Link>
                      <Link
                        href={`/products/${product.slug}`}
                        className="framer-icon-btn w-6 h-6 sm:w-7 sm:h-7 shrink-0"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </TiltCard>
                );
              })}
            </div>

          </div>
        </section>

        {/* =========================================================
             SECTION 5.5: BANGLADESH GENERATOR PRICE DIRECTORY
             (RESIDENTIAL / COMMERCIAL / INDUSTRIAL)
             ========================================================= */}
        <section id="prices" className="py-10 md:py-16 bg-white hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-10">

            {/* Clean Section Header (No description, matching site style) */}
            <div className="mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight mb-2">
                <span className="w-10 h-[4px] bg-primary rounded-sm inline-block" />
                <span>Price Catalog</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-4xl lg:text-[42px] font-bold text-slate-950 tracking-tight">
                Generator Price in <span className="text-primary">Bangladesh</span>
              </h2>
            </div>

            {/* 3-Column Pure Clean Grid (Dynamically Driven by Global Object) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {PRICE_DIRECTORY_CATEGORIES.map((col, colIdx) => (
                <div key={colIdx}>
                  {/* Category Header */}
                  <div className="mb-5 sm:mb-6">
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-950 tracking-tight">
                      {col.category}
                    </h3>
                  </div>

                  {/* Product Rows */}
                  <div className="space-y-4 sm:space-y-5">
                    {col.productSlugs.map((slug) => {
                      const product = PRODUCTS_BY_SLUG[slug];
                      if (!product) return null;
                      return (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          className="group flex items-center gap-3.5 sm:gap-4 transition-colors"
                        >
                          {/* Image Thumbnail */}
                          <div className="w-20 h-14 sm:w-22 sm:h-16 shrink-0 rounded-xs overflow-hidden bg-white border border-slate-200/90 flex items-center justify-center p-1 group-hover:border-primary/50 transition-colors">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-xs group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>

                          {/* Title & Price */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-heading text-[13px] sm:text-[13.5px] font-semibold text-slate-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                              {product.name} Price in Bangladesh
                            </h4>
                            <p className="font-mono text-[13px] sm:text-[14px] font-bold text-slate-950 mt-1">
                              ৳ {product.priceValueBDT.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================
             SECTION 5.6: HOW IT WORKS / FOUR SIMPLE STEPS
             ========================================================= */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200/80">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-10">

            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-5">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight">
                  <span className="w-10 h-[4px] bg-primary rounded-sm inline-block" />
                  <span>How It Works</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-4xl lg:text-[44px] font-bold text-[#141518] tracking-[-0.03em] leading-[1.12]">
                  Four simple steps to <span className="text-primary">power your facility</span>
                </h2>
                <p className="text-slate-600 text-xs sm:text-[14px] max-w-2xl leading-relaxed">
                  From initial load sizing to nationwide delivery and turnkey commissioning across Bangladesh.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
                <a
                  href="#load-calculator"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("load-calculator")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="framer-btn-primary cursor-pointer text-xs"
                >
                  <span>Launch Load Calculator</span>
                  <div className="btn-arrow-box">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </a>
                <button
                  onClick={() => openQuote("Quick Quote Inquiry")}
                  className="framer-btn-dark cursor-pointer text-xs"
                >
                  <span>Quick Quote</span>
                </button>
              </div>
            </div>

            {/* 4 Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {[
                {
                  number: "01",
                  title: "Share your requirements",
                  desc: "Tell us your required kVA, machine starting loads, fuel preference, and facility location.",
                  icon: Sliders,
                },
                {
                  number: "02",
                  title: "Engineering site survey",
                  desc: "Our certified power engineers evaluate canopy acoustics, ventilation airflow, and ATS synchronization.",
                  icon: HardHat,
                },
                {
                  number: "03",
                  title: "Receive custom quotation",
                  desc: "Get itemized, transparent pricing for Perkins, Cummins, or Ricardo with fuel metrics and warranty.",
                  icon: FileText,
                },
                {
                  number: "04",
                  title: "Turnkey commissioning",
                  desc: "Nationwide delivery, civil foundation mounting, full-load bank testing, and 24/7 service support.",
                  icon: Zap,
                },
              ].map((step, idx) => (
                <div
                  key={step.number}
                  className="relative group bg-[#F8F9FA] hover:bg-white rounded-md p-6 sm:p-7 border border-slate-200/90 hover:border-primary/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Step Connector Curved Arrow (Desktop only between cards) */}
                  {idx < 3 && (
                    <div className="hidden lg:block absolute -right-7 xl:-right-8 top-10 z-20 pointer-events-none text-primary group-hover:translate-x-1 group-hover:scale-105 transition-all duration-300">
                      {idx === 1 ? (
                        /* Middle Arrow: Curves downward (↘) */
                        <svg
                          width="52"
                          height="28"
                          viewBox="0 0 70 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-12 xl:w-14 h-auto drop-shadow-xs"
                        >
                          <path
                            d="M1.5 1.5C14 1.5 25 10 37 20C47 28.5 56.5 31 65.5 30.5"
                            stroke="currentColor"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M55.5 35.5L66 30.5L57 21.5"
                            stroke="currentColor"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        /* First & Third Arrows: Curve upward (↗) */
                        <svg
                          width="52"
                          height="28"
                          viewBox="0 0 70 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-12 xl:w-14 h-auto drop-shadow-xs"
                        >
                          <path
                            d="M1.5 35.5C14 35.5 25 27 37 17C47 8.5 56.5 6 65.5 6.5"
                            stroke="currentColor"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M55.5 1.5L66 6.5L57 15.5"
                            stroke="currentColor"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  )}

                  <div>
                    {/* Top Row: Large Muted Step Number & Accent Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-heading font-black text-4xl sm:text-5xl text-slate-300/80 group-hover:text-primary/30 transition-colors">
                        {step.number}
                      </span>
                      <div className="w-10 h-10 rounded-lg bg-white border border-slate-200/80 group-hover:border-primary/30 text-primary flex items-center justify-center shadow-xs group-hover:bg-primary group-hover:text-white transition-all">
                        <step.icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="font-heading font-bold text-lg sm:text-[18px] text-[#141518] tracking-tight group-hover:text-primary transition-colors mb-2.5">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Step Indicator Dot */}
                  <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                      Phase 0{idx + 1}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary transition-colors" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================
             SECTION 5.7: QUICK LOAD CALCULATION FOR CLIENT
             ========================================================= */}
        <QuickLoadCalculator
          onOpenQuote={(kw) => {
            setKwLoad(kw);
            openQuote(
              `Facility Load Sizing — ${kw} kW (${Math.ceil((kw / 0.8) * 1.25)} kVA)`,
              Math.ceil((kw / 0.8) * 1.25)
            );
          }}
        />

        {/* =========================================================
             SECTION 6: BUILT FOR EVERY INDUSTRY (VERTICAL TABS)
             ========================================================= */}
        <section
          id="industries"
          className="relative py-10 sm:py-24 lg:py-32 bg-[#F4F4F5] border-b border-slate-200 overflow-hidden"
        >
          {/* Vertical architectural grid lines */}
          <div className="absolute inset-0 max-w-[1400px] mx-auto px-5 sm:px-6 pointer-events-none z-0 hidden lg:block">
            <div className="w-full h-full grid grid-cols-4 border-x border-slate-200/70">
              <div className="border-r border-slate-200/70 h-full" />
              <div className="border-r border-slate-200/70 h-full" />
              <div className="border-r border-slate-200/70 h-full" />
              <div className="h-full" />
            </div>
          </div>

          {/* Floating decorative thumbnails */}
          <div className="absolute inset-0 max-w-[1400px] mx-auto pointer-events-none select-none z-10 hidden lg:block">
            {/* Top-left: generator powerhouse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="absolute top-6 left-[6.1%] w-[100px] h-[110px] z-10"
            >
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full rounded-[6px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.09)] border border-black/[0.06] bg-white"
              >
                <img src="/assets/images/hero-gen.jpg" alt="" className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>

            {/* Left: commercial standby */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
              className="absolute top-[133px] left-[2.5%] w-[92px] h-[76px] z-0"
            >
              <motion.div
                animate={{ y: [0, 7, 0], rotate: [0, -1.5, 0] }}
                transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full rounded-[6px] overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.06)] border border-black/[0.06] bg-white"
              >
                <img src="/assets/images/commercial-white.jpg" alt="" className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>

            {/* Top-right: industrial site */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.14, ease: "easeOut" }}
              className="absolute top-[39px] right-[4.7%] w-[116px] h-[124px]"
            >
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, -1.2, 0] }}
                transition={{ duration: 6.1, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full rounded-[6px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.09)] border border-black/[0.06] bg-white"
              >
                <img src="/assets/images/industrial-site.jpg" alt="" className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>

            {/* Bottom-left: control panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
              className="absolute bottom-7 left-[4.7%] w-[108px] h-[104px]"
            >
              <motion.div
                animate={{ y: [0, 8, 0], rotate: [0, 1.2, 0] }}
                transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full rounded-[6px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.09)] border border-black/[0.06] bg-white"
              >
                <img src="/assets/images/gen-control-panel.jpg" alt="" className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>

            {/* Bottom-right: Perkins diesel unit */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              whileInView={{ opacity: 0.9, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.26, ease: "easeOut" }}
              className="absolute bottom-5 right-[11.3%] w-[92px] h-[74px]"
            >
              <motion.div
                animate={{ y: [0, -7, 0], rotate: [0, 1.4, 0] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full rounded-[6px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.06)] border border-black/[0.06] bg-white"
              >
                <img src="/assets/images/perkins-blue.jpg" alt="" className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>
          </div>

          <div className="relative z-20 max-w-[1400px] mx-auto px-5 sm:px-6">
            {/* Centered header lockup */}
            <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white border border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.03)] text-[10px] font-medium text-slate-700 mb-3">
                <span className="w-1.5 h-1.5 rounded-[1px] bg-primary" />
                <span>Build for every industry</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-[46px] font-bold text-[#141518] tracking-[-0.03em] leading-[1.08]">
                Manufacturing <span className="text-primary">solutions</span>
                <br />
                for every industry
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[max-content_1fr] gap-8 lg:gap-30 items-start">
              {/* Vertical tabs with continuous left track */}
              <div className="min-w-0">
                <div className="relative border-l-2 border-[#DCDCE0]">
                  {(Object.keys(INDUSTRY_DATA) as Array<keyof typeof INDUSTRY_DATA>).map((key) => {
                    const isActive = activeIndustry === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveIndustry(key)}
                        className={`relative w-full text-left pl-4 sm:pl-5 py-2 sm:py-2.5 font-heading text-[18px] sm:text-2xl tracking-[-0.015em] leading-[1.3] transition-colors cursor-pointer block ${isActive
                          ? "text-[#141518] font-semibold"
                          : "text-[#6E7075] hover:text-[#141518] font-medium"
                          }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="industryActiveTrack"
                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                            className="absolute -left-[2px] top-0 bottom-0 w-[2px] bg-primary"
                          />
                        )}
                        <span className="sm:whitespace-nowrap">{INDUSTRY_DATA[key].label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Showcase card (image left, content right) */}
              <div className="min-w-0 w-full bg-white rounded-[8px] p-4 sm:p-5 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
                  {/* Left: photo */}
                  <div className="relative rounded-[6px] overflow-hidden h-[270px] bg-slate-100">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeIndustry}
                        src={INDUSTRY_DATA[activeIndustry].image}
                        alt={INDUSTRY_DATA[activeIndustry].cardTitle}
                        initial={{ opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                  </div>

                  {/* Right: icon + title + description + checklist */}
                  <div className="flex min-w-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeIndustry}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col justify-between w-full min-w-0"
                      >
                        <div>
                          <div className="w-7 h-7 rounded-[5px] bg-[#141518] text-white flex items-center justify-center mb-3">
                            {(() => {
                              const IndustryIcon = INDUSTRY_DATA[activeIndustry].icon;
                              return <IndustryIcon className="w-3.5 h-3.5" />;
                            })()}
                          </div>

                          <h3 className="font-heading text-[20px] font-medium text-[#141518] tracking-[-0.02em] leading-snug mb-2">
                            {INDUSTRY_DATA[activeIndustry].cardTitle}
                          </h3>

                          <p className="text-[14px] text-[#5C5E64] leading-[1.5] md:max-w-[250px]">
                            {INDUSTRY_DATA[activeIndustry].desc}
                          </p>
                        </div>

                        <ul className="space-y-1 mt-5">
                          {INDUSTRY_DATA[activeIndustry].bullets.map((b, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-[11px] sm:text-[10.5px] leading-4 font-medium text-[#2A2B2F]"
                            >
                              <Check className="w-2.5 h-2.5 text-primary shrink-0 mt-[3px]" strokeWidth={2.5} />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
             SECTION 7: REAL-WORLD SUCCESS / CASE STUDIES (COMPACT)
             ========================================================= */}
        <section id="projects" className="py-10 md:py-14 lg:py-16 bg-[#FFFFFF] border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-10">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 lg:mb-10 gap-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight">
                  <span className="w-10 h-[4px] bg-primary rounded-sm inline-block" />
                  <span>Real-world success</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-4xl lg:text-[40px] font-bold text-[#141518] tracking-[-0.03em] leading-[1.08]">
                  Real <span className="text-primary">results</span> from real projects
                </h2>
              </div>

              <button
                type="button"
                onClick={() => openQuote("Project Discussion Inquiry")}
                className="framer-btn-dark self-start sm:self-auto cursor-pointer"
              >
                <span>Discuss your project</span>
                <div className="btn-arrow-box">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </button>
            </div>

            {/* 2 per row on mobile screens */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-5">
              {[
                {
                  location: "Motijheel, Dhaka",
                  spec: "250 kVA Standby Backup",
                  metric: "< 6s AMF Transfer",
                  title: "Zero-Downtime Standby for 20-Story Commercial Tower",
                  desc: "Acoustic canopy genset integrated with automatic mains failure ATS for uninterrupted elevator and server power.",
                  image: "/assets/images/project-green.jpg",
                  alt: "Commercial Building Motijheel",
                },
                {
                  location: "Gazipur Industrial",
                  spec: "1000 kVA Synchronized",
                  metric: "2,000+ Looms Powered",
                  title: "Dual Synchronized Prime Power for Export Garments",
                  desc: "Parallel load-sharing Cummins diesel generators maintaining continuous production across automated textile floors.",
                  image: "/assets/images/hero-gen.jpg",
                  alt: "Textile Factory Gazipur",
                },
                {
                  location: "Sylhet Healthcare",
                  spec: "500 kVA Life-Safety",
                  metric: "350-Bed ICU Backup",
                  title: "Critical Power Security for Specialized Medical Center",
                  desc: "Hospital-grade critical silencers and redundant automated failover protecting ICUs and surgical theatres.",
                  image: "/assets/images/commercial-white.jpg",
                  alt: "Hospital Sylhet",
                },
                {
                  location: "Narayanganj Export",
                  spec: "750 kVA Heavy Duty",
                  metric: "High-Torque Prime",
                  title: "Synchronous Generation for Heavy Fabrication Plant",
                  desc: "UK-assembled Perkins genset engineered with high transient motor-starting capacity for rolling machinery.",
                  image: "/assets/images/perkins-blue.jpg",
                  alt: "Industrial Project Narayanganj",
                },
              ].map((project, idx) => (
                <div
                  key={idx}
                  onClick={() => openQuote(`Project Case Study Inquiry — ${project.title}`)}
                  className="bg-[#FAFBFD] hover:bg-white rounded-[8px] overflow-hidden border border-slate-200/90 hover:border-slate-300 hover:shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition-all duration-300 group flex flex-col sm:flex-row cursor-pointer"
                >
                  {/* Left Compact Photo */}
                  <div className="relative w-full sm:w-[205px] md:w-[220px] h-28 sm:h-auto shrink-0 overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-1.5 left-1.5 sm:bottom-2.5 sm:left-2.5 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-[4px] bg-black/65 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-medium tracking-wide border border-white/10 truncate max-w-[90%]">
                      {project.location}
                    </span>
                  </div>

                  {/* Right Compact Details */}
                  <div className="p-3 sm:p-5 flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1.5 sm:mb-2">
                        <span className="inline-block px-1.5 sm:px-2.5 py-0.5 rounded-full bg-primary-light text-primary text-[9.5px] sm:text-[10.5px] font-semibold truncate self-start max-w-full">
                          {project.spec}
                        </span>
                        <span className="text-[9.5px] sm:text-[11px] font-mono font-medium text-slate-400 truncate">
                          {project.metric}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-xs sm:text-[16px] md:text-[17px] text-[#141518] group-hover:text-primary transition-colors leading-snug mb-1 sm:mb-1.5 line-clamp-2">
                        {project.title}
                      </h3>

                      <p className="text-[11px] sm:text-[12.5px] text-[#5C5E64] leading-[1.4] sm:leading-[1.5] line-clamp-2 hidden sm:block">
                        {project.desc}
                      </p>
                    </div>

                    <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-slate-200/70 flex items-center justify-between">
                      <span className="text-[10px] sm:text-[12px] font-semibold text-[#141518] group-hover:text-primary transition-colors truncate">
                        <span className="hidden sm:inline">View case study</span>
                        <span className="sm:hidden">Case study</span>
                      </span>
                      <span className="framer-icon-btn w-6 h-6 sm:w-7 sm:h-7 shrink-0">
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================
             SECTION 8: FULL-WIDTH AMBIENT VIDEO CTA BANNER
             ========================================================= */}
        <section className="relative py-10 sm:py-28 lg:py-32 overflow-hidden bg-[#090D14] text-white">

          {/* Full-Bleed Ambient Background Video (Cinematic Industrial Footage) */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/images/industrial-site.jpg"
            className="absolute inset-0 w-full h-full object-cover object-center scale-[1.03] brightness-[0.78] contrast-[1.12] saturate-[0.95]"
          >
            <source src="/assets/videos/manufact-hero.mp4" type="video/mp4" />
          </video>

          {/* Top & Bottom Edge Vignette for Seamless Section Transitions */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#090D14]/65 via-transparent to-[#090D14]/75"
          />

          {/* Left-Dark-to-Right-Clear Atmospheric Gradient Scrim */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[1] lg:hidden bg-[#090D14]/85"
          />
          <div
            aria-hidden="true"
            className="hidden lg:block absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, #090D14 0%, #090D14 38%, rgba(9, 13, 20, 0.90) 52%, rgba(9, 13, 20, 0.42) 72%, rgba(9, 13, 20, 0.18) 100%)",
            }}
          />

          {/* Subtle Left Ambient Orange Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute -left-24 top-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-primary/[0.07] blur-[110px] z-[1]"
          />

          {/* Clip Path Definition for Smoked Architectural Glass Overlay */}
          <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
            <defs>
              <clipPath id="section8-glass-clip" clipPathUnits="objectBoundingBox">
                <path d="M 0.515 1 L 0.918 0.155 Q 0.93 0.135 0.946 0.135 L 1 0.135 L 1 1 Z" />
              </clipPath>
            </defs>
          </svg>

          {/* Smoked Frosted Glass Panel with Bottom-Left Orange Edge Sheen */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute inset-0 pointer-events-none z-[2] backdrop-blur-[4px]"
            style={{
              clipPath: "url(#section8-glass-clip)",
              WebkitClipPath: "url(#section8-glass-clip)",
              background:
                "radial-gradient(circle at 53% 98%, rgba(224, 5, 1, 0.24) 0%, rgba(224, 5, 1, 0.07) 26%, rgba(9, 13, 20, 0.28) 60%, rgba(9, 13, 20, 0.42) 100%)",
            }}
          />

          {/* Glowing Orange Diagonal-to-Horizontal Edge Line + Subtle Glass Highlight */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 720"
            preserveAspectRatio="none"
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-[3]"
          >
            <defs>
              <linearGradient id="section8-orange-line" x1="51%" y1="100%" x2="100%" y2="14%">
                <stop offset="0%" stopColor="#E00501" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#C50301" stopOpacity="0.55" />
                <stop offset="84%" stopColor="#E00501" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#E00501" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            {/* Outer soft red glow */}
            <path
              d="M 742 720 L 1322 112 Q 1339 97 1362 97 L 1440 97"
              fill="none"
              stroke="#E00501"
              strokeWidth="7"
              strokeOpacity="0.3"
              vectorEffect="non-scaling-stroke"
              style={{ filter: "blur(4px)" }}
            />
            {/* Crisp inner bright orange laser edge */}
            <path
              d="M 742 720 L 1322 112 Q 1339 97 1362 97 L 1440 97"
              fill="none"
              stroke="url(#section8-orange-line)"
              strokeWidth="1.75"
              vectorEffect="non-scaling-stroke"
            />
            {/* Subtle parallel inner glass specular highlight */}
            <path
              d="M 758 720 L 1328 122 Q 1344 108 1366 108 L 1440 108"
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Left-Aligned Foreground Content */}
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-[650px]"
            >
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold tracking-tight text-white">
                <span className="w-10 h-[4px] bg-primary rounded-sm inline-block" />
                <span>Open a Conversation</span>
              </div>

              {/* 2-Line Headline */}
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-[48px] font-extrabold text-white tracking-[-0.025em] leading-[1.12]">
                Ready to power your next
                <br />
                <span className="text-primary">industrial project?</span>
              </h2>

              {/* Supporting Copy */}
              <p className="text-[14.5px] sm:text-[15.5px] text-slate-300/90 max-w-[540px] leading-[1.6] mt-4">
                Contact our technical engineering team for certified on-site load evaluation, civil foundation guidance, and customized quotations.
              </p>

              {/* 3 Glass Feature Pills */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[600px]">
                <div className="bg-[#121923]/80 backdrop-blur-md border border-white/[0.09] hover:border-primary/35 transition-colors rounded-[8px] px-3.5 py-3 flex items-center gap-3">
                  <Zap className="w-5 h-5 text-primary shrink-0" strokeWidth={1.9} />
                  <span className="text-[12px] font-medium text-slate-200 leading-[1.3]">
                    100% Load-Bank
                    <br />
                    Certified
                  </span>
                </div>

                <div className="bg-[#121923]/80 backdrop-blur-md border border-white/[0.09] hover:border-primary/35 transition-colors rounded-[8px] px-3.5 py-3 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0" strokeWidth={1.9} />
                  <span className="text-[12px] font-medium text-slate-200 leading-[1.3]">
                    Zero Downtime
                    <br />
                    ATS Sync
                  </span>
                </div>

                <div className="bg-[#121923]/80 backdrop-blur-md border border-white/[0.09] hover:border-primary/35 transition-colors rounded-[8px] px-3.5 py-3 flex items-center gap-3">
                  <Headset className="w-5 h-5 text-primary shrink-0" strokeWidth={1.9} />
                  <span className="text-[12px] font-medium text-slate-200 leading-[1.3]">
                    24/7 Rapid
                    <br />
                    Emergency Support
                  </span>
                </div>
              </div>

              {/* 2 Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openQuote("Schedule Site Inspection Inquiry")}
                  className="inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-white font-semibold text-[13.5px] px-6 py-3.5 rounded-[8px] shadow-[0_6px_20px_rgba(224,5,1,0.3)] transition-all cursor-pointer group"
                >
                  <span>Schedule site inspection</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </button>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.1] backdrop-blur-md border border-white/20 text-white font-semibold text-[13.5px] px-6 py-3.5 rounded-[8px] transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-slate-200" />
                  <span>Talk to an engineer</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
             SECTION 9: BUILT ON TRUST / TESTIMONIALS & CLIENT LOGOS
             ========================================================= */}
        <section className="relative py-20 lg:py-28 bg-[#FCFCFD] overflow-hidden">
          {/* Subtle Diagonal Architectural Background Accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute inset-0 overflow-hidden z-0"
          >
            {/* Soft diagonal grey light sweep */}
            <div className="absolute -top-20 right-[-10%] w-[55%] h-[130%] bg-gradient-to-br from-slate-100/70 via-slate-100/30 to-transparent -skew-x-[26deg]" />
            {/* Bottom-left subtle warm peach glow */}
            <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-primary/[0.07] blur-3xl" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

              {/* Left Column: Badge + Heading + Description + Peach Testimonial Card */}
              <div className="lg:col-span-5">
                {/* Badge with extending hairline */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight">
                    <span className="w-10 h-[4px] bg-primary rounded-sm inline-block" />
                    <span>Build on Trust</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-slate-200/80 to-transparent" />
                </div>

                <h2 className="font-heading text-3xl sm:text-5xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-[1.08]">
                  Trusted by <span className="text-primary">clients,</span>
                  <br />
                  proven by results
                </h2>

                <p className="text-[15px] text-[#5B6270] leading-[1.6] mt-4 max-w-[430px]">
                  From factory setup to continuous power support, we deliver reliable, engineered generator solutions that keep businesses running without interruption.
                </p>

                {/* Warm Peach Testimonial Box */}
                <div className="mt-7 bg-primary-light rounded-md p-6 sm:p-7 border border-primary/10">
                  {/* Double Quote Mark */}
                  <svg
                    className="w-6 h-5 text-primary fill-current mb-3"
                    viewBox="0 0 28 22"
                    aria-hidden="true"
                  >
                    <path d="M11.2 12.6c0 4.6-3.1 8.1-7.8 9.2L2 19.3c2.6-.9 4.2-2.7 4.5-5H2.2C.9 14.3 0 13.4 0 12.1V3.2C0 1.9.9 1 2.2 1h6.8C10.3 1 11.2 1.9 11.2 3.2v9.4zm16.8 0c0 4.6-3.1 8.1-7.8 9.2l-1.4-2.5c2.6-.9 4.2-2.7 4.5-5h-4.3c-1.3 0-2.2-.9-2.2-2.2V3.2c0-1.3.9-2.2 2.2-2.2h6.8c1.3 0 2.2.9 2.2 2.2v9.4z" />
                  </svg>

                  <blockquote className="text-[13.5px] sm:text-[14px] italic text-[#1E2430] leading-[1.6]">
                    &ldquo;Diesel Generator Warehouse engineered and commissioned our 500 kVA Perkins silent generator flawlessly. When the grid fluctuated during high-load manufacturing shifts, our plant ran without missing a single beat.&rdquo;
                  </blockquote>

                  <div className="mt-5 flex items-center gap-3.5">
                    <img
                      src="/assets/images/client-portrait.jpg"
                      alt="Engr. Tariqul Islam"
                      className="w-11 h-11 rounded-[6px] object-cover object-top shrink-0"
                    />
                    <div className="w-[1.5px] h-9 bg-primary/60 shrink-0" />
                    <div>
                      <h4 className="font-heading font-bold text-[#0F172A] text-[13.5px] leading-tight">
                        Engr. Tariqul Islam
                      </h4>
                      <p className="text-[12px] text-[#646B78] mt-0.5 leading-snug">
                        Head of Plant Operations, Dhaka Industrial Zone
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Layered Generator Card + Floating Metrics + Partner Logos */}
              <div className="lg:col-span-7 relative">
                {/* Skewed Top-Right Peach Decorative Frame Behind Card */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute -top-12 right-[12%] w-[260px] h-[140px] rounded-md border border-primary/30 bg-gradient-to-br from-[#FFF4EF]/90 via-[#FFF8F5]/50 to-transparent -skew-x-[28deg] z-0"
                />

                <div className="relative z-10 bg-white rounded-md shadow-[0_14px_40px_rgba(15,23,42,0.08)] border border-slate-200/70 overflow-hidden">
                  {/* Top Photo */}
                  <div className="relative h-[220px] sm:h-[260px] lg:h-[285px] w-full overflow-hidden bg-slate-900">
                    <img
                      src="/assets/images/project-green.jpg"
                      alt="Industrial Generator Room Installation"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Overlapping Elevated White Metrics Strip */}
                  <div className="relative z-10 mx-4 sm:mx-7 -mt-12 sm:-mt-16 bg-white rounded-md shadow-[0_10px_30px_rgba(15,23,42,0.08)] border border-slate-100 py-5 sm:py-6 px-3 sm:px-6">
                    <div className="grid grid-cols-3 divide-x divide-slate-200/80 text-center">
                      <div className="px-2">
                        <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-2" strokeWidth={1.75} />
                        <div className="font-heading text-xl sm:text-[28px] font-extrabold text-[#0F172A] tracking-tight leading-none">
                          500+
                        </div>
                        <p className="text-[9px] sm:text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#64748B] mt-1.5">
                          Gensets Delivered
                        </p>
                      </div>

                      <div className="px-2">
                        <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-2" strokeWidth={1.75} />
                        <div className="font-heading text-xl sm:text-[28px] font-extrabold text-[#0F172A] tracking-tight leading-none">
                          99.8%
                        </div>
                        <p className="text-[9px] sm:text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#64748B] mt-1.5">
                          Uptime Reliability
                        </p>
                      </div>

                      <div className="px-2">
                        <Headset className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-2" strokeWidth={1.75} />
                        <div className="font-heading text-xl sm:text-[28px] font-extrabold text-[#0F172A] tracking-tight leading-none">
                          24/7
                        </div>
                        <p className="text-[9px] sm:text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#64748B] mt-1.5">
                          Field Support
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Partner Collaborates Marquee Strip */}
                  <div className="px-6 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748B] leading-[1.35] shrink-0">
                      Partner
                      <br className="hidden sm:block" />{" "}
                      Collaborates
                    </span>
                    <div className="hidden sm:block w-[1.5px] h-7 bg-primary/70 shrink-0" />
                    <div className="w-full min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                      <div className="flex w-max items-center animate-partner-marquee">
                        {[0, 1].map((dupIndex) => (
                          <div
                            key={dupIndex}
                            aria-hidden={dupIndex === 1}
                            className="flex items-center gap-8 sm:gap-10 pr-8 sm:pr-10 shrink-0"
                          >
                            <span className="font-heading text-[13px] font-bold text-[#111214] tracking-wider whitespace-nowrap">
                              BEXIMCO
                            </span>
                            <span className="inline-flex items-center gap-1 font-heading text-[13px] font-extrabold text-[#1E3A8A] tracking-tight whitespace-nowrap">
                              <span className="w-2.5 h-2.5 bg-[#1E3A8A] rounded-[2px] inline-block shrink-0" />
                              <span>SQUARE</span>
                            </span>
                            <span className="inline-flex items-center gap-1 font-heading text-[15px] font-bold text-[#7E22CE] tracking-tight whitespace-nowrap">
                              <span className="w-2.5 h-2.5 rounded-xs border-2 border-[#7E22CE] inline-block rotate-45 shrink-0" />
                              <span>brac</span>
                            </span>
                            <span className="inline-flex items-center gap-0.5 font-heading text-[14px] font-bold text-[#E11D48] tracking-tight whitespace-nowrap">
                              <span>bKash</span>
                              <svg className="w-3.5 h-3.5 fill-current -mt-0.5" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M3 13l7-9 4 6 7-4-6 10-5-3-7 0z" />
                              </svg>
                            </span>
                            <span className="font-heading text-[13px] font-bold text-[#1D4ED8] tracking-wide whitespace-nowrap">
                              WALTON
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================
             SECTION 10: INSIGHTS & ARTICLES (FRAMER BLOG)
             ========================================================= */}
        <section id="blog" className="pb-10 md:pb-20 lg:pb-28 bg-[#FFFFFF]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-10">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight">
                  <span className="w-10 h-[4px] bg-primary rounded-sm inline-block" />
                  <span>Insights & Article</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-5xl lg:text-[46px] font-bold text-[#141518] tracking-[-0.03em] leading-[1.08]">
                  Latest from our <span className="text-primary">blog</span>
                </h2>
              </div>

              <Link href="/blog" className="framer-btn-dark self-start sm:self-auto cursor-pointer">
                <span>View all blogs</span>
                <div className="btn-arrow-box">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </Link>
            </div>

            {/* Mobile: Editorial Featured Lead + Compact Side Feed | Desktop: 3-Column Immersive Grid */}
            {(() => {
              const posts = BLOG_POSTS.slice(0, 3);

              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6">
                  {/* Lead Story: Featured Hero on Mobile, Col 1 on Desktop */}
                  <Link
                    href={`/blog/${posts[0].slug}`}
                    className="relative rounded-[8px] md:rounded-[6px] overflow-hidden h-[290px] sm:h-[340px] md:h-[340px] sm:md:h-[360px] lg:md:h-[380px] group block bg-[#141518]"
                  >
                    <img
                      src={posts[0].image}
                      alt={posts[0].alt}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />

                    <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-7">
                      <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
                        <span className="px-2 py-0.5 rounded-sm bg-primary text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          Featured
                        </span>
                        <span className="text-[11px] text-slate-300 font-medium">
                          {posts[0].category} &bull; {posts[0].readTime}
                        </span>
                      </div>
                      <h3 className="font-heading font-semibold text-[18px] sm:text-[22px] text-white tracking-[-0.02em] leading-[1.22] mb-2 sm:mb-3">
                        {posts[0].title}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary group-hover:translate-x-1 transition-transform">
                        <span>Read full article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>

                  {/* Secondary Stories: Compact Feed on Mobile, Col 2 & 3 on Desktop */}
                  {posts.slice(1).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="
                        group rounded-[8px] md:rounded-[6px] overflow-hidden transition-all duration-300
                        /* Mobile: Horizontal split news card */
                        flex flex-row items-center p-3 gap-3.5 bg-slate-50/90 hover:bg-slate-100/90 border border-slate-200/80 shadow-xs
                        /* Desktop (md:): Immersive full-bleed dark card */
                        md:flex-col md:p-0 md:bg-[#141518] md:border-0 md:shadow-none md:relative md:h-[340px] sm:md:h-[360px] lg:md:h-[380px]
                      "
                    >
                      {/* Image Thumbnail */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-[6px] overflow-hidden relative md:w-full md:h-full md:absolute md:inset-0 md:rounded-none">
                        <img
                          src={post.image}
                          alt={post.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Desktop dark gradient */}
                        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 min-w-0 md:relative md:z-10 md:h-full md:flex md:flex-col md:justify-end md:p-6 sm:md:p-7">
                        <div className="flex items-center gap-2 mb-1 md:mb-2.5">
                          <span className="text-[10px] font-bold text-primary uppercase tracking-wider md:text-slate-300 md:font-semibold">
                            {post.category}
                          </span>
                          <span className="text-[10px] text-slate-400 md:text-slate-400">
                            &bull; {post.readTime}
                          </span>
                        </div>
                        <h3 className="font-heading font-semibold text-[14px] sm:text-[15px] md:text-[20px] sm:md:text-[22px] text-slate-900 md:text-white tracking-[-0.02em] leading-snug line-clamp-2 md:line-clamp-none mb-1.5 md:mb-3">
                          {post.title}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[12px] md:text-[13px] font-medium text-primary group-hover:text-primary-hover md:underline md:underline-offset-4 md:decoration-primary md:group-hover:decoration-primary-hover transition-colors">
                          <span>Read full blog</span>
                          <ArrowRight className="w-3 h-3 md:hidden group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              );
            })()}

          </div>
        </section>
      </div>
    </div>
  );
}
