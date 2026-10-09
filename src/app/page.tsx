"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "motion/react";
import {
  Search,
  ArrowRight,
  Menu,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Cpu,
  VolumeX as MuteIcon,
  Sliders,
  Wrench,
  CheckCircle,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Star,
  ArrowDown
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
    title: "Manufacturing & Garment Industries",
    desc: "Uninterrupted prime power engineered for high-throughput production lines, textile weaving mills, and automated machinery across Bangladesh.",
    bullets: [
      "Heavy-duty continuous duty cycle with 110% overload margin",
      "Automatic sync between dual gensets for peak-shift sharing",
      "Full SCADA & IoT remote fuel telemetry"
    ],
    image: "/assets/images/hero-gen.jpg",
    tag: "// PRIME POWER SPEC //"
  },
  commercial: {
    title: "Commercial Towers & Corporate HQs",
    desc: "Acoustically insulated standby power systems for corporate hubs and high-rise commercial complexes ensuring zero downtime.",
    bullets: [
      "Ultra-silent acoustic canopy (<68 dBA at 7 meters)",
      "Under 8-second automatic mains failure (AMF) transfer",
      "Compact footprint optimized for basement & rooftop installation"
    ],
    image: "/assets/images/commercial-white.jpg",
    tag: "// STANDBY POWER SPEC //"
  },
  hospitals: {
    title: "Hospitals & Critical Healthcare Facilities",
    desc: "Life-safety backup power engineered to power intensive care units, diagnostic imaging suites, and operating theatres without a millisecond of interruption.",
    bullets: [
      "Dual ATS fast-transfer with uninterruptible UPS coordination",
      "Hospital-grade critical silencers with zero exhaust backflow",
      "Priority 24/7 emergency rapid maintenance contract"
    ],
    image: "/assets/images/yellow-silent.jpg",
    tag: "// LIFE-SAFETY SPEC //"
  },
  datacenters: {
    title: "Data Centers & Critical Telecom HQs",
    desc: "Tier III & IV compliant power infrastructure built with fault-tolerant redundancy and clean harmonic sine-wave output.",
    bullets: [
      "Permanent magnet generator (PMG) excitation for clean waveform",
      "Underground bulk fuel transfer system with 72-hour reserve",
      "Microprocessor synchronizing panel with N+1 redundancy"
    ],
    image: "/assets/images/perkins-blue.jpg",
    tag: "// TELECOM SPEC //"
  },
  construction: {
    title: "Infrastructure & Construction Sites",
    desc: "Rugged, weather-resistant mobile power units built for severe outdoor environments, heavy piling machinery, and bridge construction.",
    bullets: [
      "Heavy-duty skid base with integrated crane lifting eyelets",
      "High ambient tropical radiator designed for +50°C operation",
      "Lockable steel fuel fill neck with anti-siphon protection"
    ],
    image: "/assets/images/industrial-site.jpg",
    tag: "// HEAVY MOBILE SPEC //"
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

// 3D Tilt Card Wrapper Component using Motion
function TiltCard({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -6);
    setRotateY(((x - centerX) / centerX) * 6);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      style={{ perspective: 1000 }}
      className={`transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
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

  // Modals & Mobile Nav
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("Dhaka Division");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to open quote pre-populated with division
  const openQuoteForLocation = (region: string) => {
    setSelectedRegion(region);
    setIsQuoteModalOpen(true);
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
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F25A24] to-[#FF8A50] origin-left z-50"
        style={{ scaleX }}
      />

      {/* =========================================================
           NAVIGATION BAR (FRAMER STYLE)
           ========================================================= */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <img
                src="/assets/images/diese-generator-warehouse-logo.png"
                alt="Diesel Generator Warehouse"
                className="h-9 sm:h-11 w-auto object-contain py-0.5"
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 text-[13px] font-semibold text-slate-600">
              <a href="#hero" className="text-slate-950 hover:text-[#F25A24] transition-colors">Home</a>
              <a href="#about" className="hover:text-[#F25A24] transition-colors">About</a>
              <a href="#capabilities" className="hover:text-[#F25A24] transition-colors">Capabilities</a>
              <a href="#schematic" className="hover:text-[#F25A24] transition-colors">Engineering</a>
              <Link href="/products" className="hover:text-[#F25A24] transition-colors font-bold text-slate-950 flex items-center gap-1">
                <span>Products</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F25A24]" />
              </Link>
              <a href="#industries" className="hover:text-[#F25A24] transition-colors">Industries</a>
              <a href="#projects" className="hover:text-[#F25A24] transition-colors">Case Studies</a>
              <a href="#blog" className="hover:text-[#F25A24] transition-colors">Blog</a>
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSearchModalOpen(true)}
                aria-label="Search"
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="hidden sm:inline-flex framer-btn-primary"
              >
                <span>Get a quote</span>
                <div className="btn-arrow-box">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:text-black"
                aria-label="Toggle Navigation"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-slate-200 bg-white px-6 py-5 space-y-3 text-sm font-semibold overflow-hidden"
            >
              <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-900 py-1">Home</a>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-700 py-1">About</a>
              <a href="#capabilities" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-700 py-1">Capabilities</a>
              <a href="#schematic" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-700 py-1">Engineering</a>
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block text-[#F25A24] font-bold py-1">Browse Generators Lineup (Products)</Link>
              <a href="#industries" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-700 py-1">Industries</a>
              <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-700 py-1">Case Studies</a>
              <a href="#blog" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-700 py-1">Blog</a>
              <div className="pt-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsQuoteModalOpen(true);
                  }}
                  className="w-full framer-btn-primary justify-center"
                >
                  <span>Get a quote</span>
                  <div className="btn-arrow-box">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* =========================================================
             SECTION 1: HERO SECTION (FRAMER TEMPLATE LAYOUT)
             ========================================================= */}
        <section id="hero" className="relative bg-[#F4F4F6] text-slate-950 border-b border-slate-200">
          
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
            <div className="framer-badge mb-6 sm:mb-8">
              <span className="framer-badge-dot" />
              <span>Direct Diesel Generator Warehouse Stock & Engineering</span>
            </div>

            {/* 2-Column Main Hero Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Giant Bold Headline */}
              <div className="lg:col-span-7">
                <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 leading-[1.02]">
                  From raw <span className="text-[#F25A24]">energy</span><br />
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
                    className="inline-flex items-center gap-3.5 bg-[#18181B] hover:bg-black text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all group shadow-sm cursor-pointer"
                  >
                    <span>Explore our capabilities</span>
                    <div className="w-7 h-7 rounded-lg bg-[#F25A24] flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                      <ArrowRight className="w-4 h-4" />
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
                <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#F25A24]" />
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
              className="w-full h-full object-cover"
            >
              <source src="/assets/videos/DG Set Working Explained .mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Video Controls (Floating Bottom Right) */}
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-all cursor-pointer shadow-lg"
                aria-label="Toggle Video Playback"
              >
                {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-all cursor-pointer shadow-lg"
                aria-label="Toggle Video Sound"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
              </button>
            </div>
          </div>

        </section>

        {/* =========================================================
             SECTION 2: WHO WE ARE & 4-ELEMENT CIRCULAR ROW
             ========================================================= */}
        <section id="about" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

            {/* Top Row: Badge & Statement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-16"
            >
              <div className="lg:col-span-3">
                <div className="framer-badge">
                  <span className="framer-badge-dot" />
                  <span>Who we are</span>
                </div>
              </div>

              <div className="lg:col-span-9 space-y-6">
                <h2 className="font-heading text-3xl sm:text-5xl lg:text-[56px] font-black text-slate-950 leading-[1.05] tracking-tight">
                  Driven by technology, backed by experience, focused on
                  <span className="text-[#F25A24]"> power</span> excellence
                </h2>

                <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
                  We provide comprehensive industrial power generation solutions with world-class engineering, verified imported UK & USA engines, and 24/7 dedicated after-sales support across Bangladesh.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a href="#capabilities" className="framer-btn-primary">
                    <span>Learn more about us</span>
                    <div className="btn-arrow-box">
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </a>

                  <a href="#products" className="framer-btn-outline">
                    <span>Download technical brochure</span>
                    <div className="btn-arrow-box">
                      <Download className="w-3.5 h-3.5 text-slate-700" />
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Signature 4-Element Graphic Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center pt-8 border-t border-slate-200">

              {/* Element 1: 10+ Global Brands */}
              <TiltCard className="flex flex-col items-center justify-center text-center p-8 bg-[#F6F7F9] rounded-full aspect-square max-w-[260px] mx-auto w-full border border-slate-200">
                <span className="font-heading text-4xl sm:text-5xl font-black text-slate-950">
                  10<span className="text-[#F25A24]">+</span>
                </span>
                <h4 className="font-heading font-bold text-slate-900 text-sm mt-1">Global Brands</h4>
                <p className="text-xs text-slate-500 max-w-[150px] mt-1">Perkins, Cummins, Ricardo, Stamford & CAT.</p>
              </TiltCard>

              {/* Element 2: Round Cutout of Generator Engine Macro */}
              <TiltCard className="rounded-full overflow-hidden aspect-square max-w-[260px] mx-auto w-full shadow-md border-4 border-white">
                <img src="/assets/images/engine-circle.jpg" alt="Engine block and turbocharger" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </TiltCard>

              {/* Element 3: 20+ Delivering Excellence Circle */}
              <TiltCard className="flex flex-col items-center justify-center text-center p-8 bg-[#F6F7F9] rounded-full aspect-square max-w-[260px] mx-auto w-full border border-slate-200 relative group">
                <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                  // 2005-2K26 //
                </span>
                <span className="font-heading text-4xl sm:text-5xl font-black text-[#F25A24]">
                  20<span className="text-slate-950">+</span>
                </span>
                <p className="text-xs text-slate-600 max-w-[160px] mt-1 font-medium">Delivering consistent engineering excellence since day one.</p>
                <div className="mt-3">
                  <span className="w-7 h-7 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:bg-[#F25A24] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </TiltCard>

              {/* Element 4: Capsule Photo with Rating */}
              <TiltCard className="relative rounded-full sm:rounded-3xl lg:rounded-full overflow-hidden aspect-square max-w-[260px] mx-auto w-full shadow-lg group">
                <img src="/assets/images/engineer-capsule.jpg" alt="Industrial Engineer in Plant" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 text-white text-center">
                  <div className="flex items-center justify-center gap-1 text-amber-400 text-xs mb-1">
                    <span>★ 4.9</span>
                    <span className="text-slate-300">/ 5.0</span>
                  </div>
                  <p className="text-xs font-bold leading-snug">
                    Trusted by 500+ manufacturing industries worldwide.
                  </p>
                </div>
              </TiltCard>

            </div>

          </div>
        </section>

        {/* =========================================================
             SECTION 3: WHAT WE DO / SCALABLE CAPABILITIES (FRAMER STACKING CARDS)
             ========================================================= */}
        <section id="capabilities" className="py-20 lg:py-28 bg-[#F4F4F6] border-b border-slate-300/80">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

            {/* Header matching exact reference screenshot */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 lg:mb-16 gap-6">
              <div className="space-y-4">
                <div className="framer-badge">
                  <span className="framer-badge-dot" />
                  <span>What we do</span>
                </div>
                <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.08]">
                  Scalable <span className="text-[#F25A24]">capabilities</span><br />
                  for every challenge
                </h2>
              </div>

              <button
                onClick={() => openQuoteForLocation("All Divisions")}
                className="inline-flex items-center gap-3.5 bg-[#18181B] hover:bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all group shadow-sm self-start md:self-auto cursor-pointer"
              >
                <span>Explore all capabilities</span>
                <div className="w-7 h-7 rounded-lg bg-[#F25A24] flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>

            {/* Sticky Stacking Cards Container (One on top of another as you scroll) */}
            <div className="relative pb-36">
              {SALES_REGIONS.map((region, index) => (
                <div
                  key={region.id}
                  style={{
                    "--stack-top": `calc(84px + ${index * 72}px)`,
                    zIndex: 10 + index,
                  } as React.CSSProperties}
                  className="sticky top-[76px] md:top-[var(--stack-top)] bg-[#F4F4F6] border-t border-slate-300/90 pt-8 pb-16 transition-shadow group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-6 lg:gap-8">
                    {/* 1. Left Minimalist Technical Icon */}
                    <div className="hidden lg:flex lg:col-span-1 items-start justify-center pt-1">
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:border-orange-200 transition-colors shadow-sm">
                        {region.icon}
                      </div>
                    </div>

                    {/* 2. Thumbnail Image */}
                    <div className="md:col-span-4 lg:col-span-3">
                      <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden shadow-sm bg-slate-200 border border-slate-200">
                        <img
                          src={region.image}
                          alt={region.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-3 left-3 lg:hidden">
                          <span className="inline-block px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                            {region.title}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 3. Title & Region Coverage */}
                    <div className="md:col-span-4 lg:col-span-3 space-y-1.5 pt-1">
                      <h3 className="font-heading text-2xl lg:text-3xl font-extrabold text-slate-950 tracking-tight group-hover:text-[#F25A24] transition-colors leading-tight">
                        {region.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-500">
                        {region.subtitle}
                      </p>
                      <div className="pt-1 flex items-center gap-1.5 text-[11px] text-[#F25A24] font-semibold">
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
                            <span className="text-[#F25A24] font-bold text-xs select-none mt-0.5">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 5. Orange Arrow Action Button (Far Right) */}
                    <div className="md:col-span-1 flex justify-end pt-1">
                      <button
                        onClick={() => openQuoteForLocation(region.title)}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F25A24] hover:bg-[#d94917] text-white flex items-center justify-center transition-all group-hover:scale-110 shadow-sm cursor-pointer"
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
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 text-[#F25A24] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-slate-950">
                    Delivering to all 64 Districts across Bangladesh
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Rajshahi, Barishal, Rangpur, Mymensingh, Cumilla, Bogura, Pabna & nationwide project sites.
                  </p>
                </div>
              </div>
              <button
                onClick={() => openQuoteForLocation("All 64 Districts Nationwide")}
                className="framer-btn-primary whitespace-nowrap text-xs cursor-pointer"
              >
                <span>Check Delivery & Stock for Your City</span>
                <div className="btn-arrow-box">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </button>
            </div>

          </div>
        </section>

        {/* =========================================================
             SECTION 4: WHAT WE MANUFACTURE / EXPLODED CAD BLUEPRINT & PRECISION SPEC
             ========================================================= */}
        <section id="schematic" className="relative bg-[#121214] text-white overflow-hidden py-24 lg:py-32 border-b border-white/10">

          {/* 1. Glowing Orange Dome Curve from Reference */}
          <div className="absolute top-0 left-0 right-0 h-[480px] pointer-events-none select-none overflow-hidden z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(242,90,36,0.55)_0%,rgba(242,90,36,0.18)_45%,transparent_70%)]" />
            <img
              src="/assets/images/orange-glow-dome.png"
              alt=""
              className="w-full h-full object-cover object-top opacity-95 mix-blend-screen scale-105"
            />
          </div>

          {/* 2. Full-Height 4 Architectural Vertical Grid Lines */}
          <div className="absolute inset-0 max-w-[1400px] mx-auto px-6 sm:px-10 pointer-events-none z-0 hidden lg:block">
            <div className="w-full h-full grid grid-cols-4 border-x border-white/[0.08]">
              <div className="border-r border-white/[0.08] h-full" />
              <div className="border-r border-white/[0.08] h-full" />
              <div className="border-r border-white/[0.08] h-full" />
              <div className="h-full" />
            </div>
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10">

            {/* 3. Top Header: Badge on Left + 50,000+ Metric on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start mb-12 lg:mb-16">
              {/* Col 1: Badge */}
              <div>
                <div className="framer-badge framer-badge-dark">
                  <span className="framer-badge-dot" />
                  <span>What we manufacture</span>
                </div>
              </div>

              {/* Col 2 & 3: Grid alignment space */}
              <div className="hidden lg:block lg:col-span-2" />

              {/* Col 4: 50,000+ Metric */}
              <div className="lg:pl-6">
                <div className="font-heading text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                  50,000<span className="text-[#F25A24]">+</span>
                </div>
                <p className="text-xs text-slate-400 mt-2.5 max-w-[260px] leading-relaxed">
                  Precision-built diesel generators delivered to clients across industries and continents.
                </p>
              </div>
            </div>

            {/* 4. Centerpiece Exploded CAD Technical Diagram */}
            <div className="relative w-full my-6 lg:my-12 py-6 flex items-center justify-center">
              <div className="w-full max-w-5xl relative">
                <img
                  src="/assets/images/cad-exploded.svg"
                  alt="Generator Exploded Technical CAD Schematic"
                  className="w-full h-auto object-contain select-none filter drop-shadow-[0_12px_36px_rgba(0,0,0,0.6)]"
                />

                {/* Interactive Hotspot Pin 1 (Soundproof Enclosure) */}
                <div
                  onClick={() => setActiveHotspot("canopy")}
                  className="absolute top-[48%] left-[7.5%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  <span className="absolute inset-0 rounded-full bg-[#F25A24]/40 animate-ping" />
                  <span className={`relative flex items-center justify-center w-full h-full rounded-full border-2 border-white shadow-xl text-[10px] font-black transition-all ${activeHotspot === "canopy" ? "bg-[#F25A24] text-white scale-125 ring-4 ring-[#F25A24]/50" : "bg-[#18181A] text-white hover:bg-[#F25A24]"
                    }`}>
                    1
                  </span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black/95 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap border border-white/20 shadow-2xl pointer-events-none">
                    Acoustic Canopy Shell (&lt;68 dBA)
                  </div>
                </div>

                {/* Interactive Hotspot Pin 2 (Engine Flywheel Core) */}
                <div
                  onClick={() => setActiveHotspot("engine")}
                  className="absolute top-[32%] left-[37%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  <span className="absolute inset-0 rounded-full bg-[#F25A24]/40 animate-ping" />
                  <span className={`relative flex items-center justify-center w-full h-full rounded-full border-2 border-white shadow-xl text-[10px] font-black transition-all ${activeHotspot === "engine" ? "bg-[#F25A24] text-white scale-125 ring-4 ring-[#F25A24]/50" : "bg-[#18181A] text-white hover:bg-[#F25A24]"
                    }`}>
                    2
                  </span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black/95 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap border border-white/20 shadow-2xl pointer-events-none">
                    Heavy Cast Flywheel & Core
                  </div>
                </div>

                {/* Interactive Hotspot Pin 3 (Alternator & Rotor) */}
                <div
                  onClick={() => setActiveHotspot("alternator")}
                  className="absolute top-[52%] left-[71.5%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  <span className="absolute inset-0 rounded-full bg-[#F25A24]/40 animate-ping" />
                  <span className={`relative flex items-center justify-center w-full h-full rounded-full border-2 border-white shadow-xl text-[10px] font-black transition-all ${activeHotspot === "alternator" ? "bg-[#F25A24] text-white scale-125 ring-4 ring-[#F25A24]/50" : "bg-[#18181A] text-white hover:bg-[#F25A24]"
                    }`}>
                    3
                  </span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black/95 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap border border-white/20 shadow-2xl pointer-events-none">
                    100% Copper Brushless Alternator
                  </div>
                </div>
              </div>
            </div>

            {/* 5. 4 Technical Spec Cards Grid (Matching Reference Screenshot) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-8 lg:pt-12 border-t border-white/[0.08]">

              {/* Card 1: Engine Core */}
              <div
                onClick={() => setActiveHotspot("engine")}
                className={`p-5 rounded-2xl bg-[#16171A]/90 border transition-all duration-300 cursor-pointer ${activeHotspot === "engine"
                    ? "border-[#F25A24] bg-white/[0.07] ring-1 ring-[#F25A24]/50 shadow-[0_0_24px_rgba(242,90,36,0.15)]"
                    : "border-white/[0.08] hover:border-white/20"
                  }`}
              >
                <h4 className="font-heading font-bold text-base text-white mb-3">
                  Heavy Diesel Engine Block
                </h4>
                <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-900 border border-white/10 mb-5 relative group">
                  <img
                    src="/assets/images/engine-circle.jpg"
                    alt="Diesel Engine Turbocharger Block"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center text-slate-400 border-b border-white/[0.06] pb-2">
                    <span>Material</span>
                    <span className="text-white font-medium text-right">High-Tensile Cast Alloy</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 border-b border-white/[0.06] pb-2">
                    <span>Capability</span>
                    <span className="text-white font-medium text-right">Direct Turbo Injection</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 pt-0.5">
                    <span>Size Range</span>
                    <span className="text-white font-medium text-right">15 kVA – 2500 kVA</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Acoustic Canopy */}
              <div
                onClick={() => setActiveHotspot("canopy")}
                className={`p-5 rounded-2xl bg-[#16171A]/90 border transition-all duration-300 cursor-pointer ${activeHotspot === "canopy"
                    ? "border-[#F25A24] bg-white/[0.07] ring-1 ring-[#F25A24]/50 shadow-[0_0_24px_rgba(242,90,36,0.15)]"
                    : "border-white/[0.08] hover:border-white/20"
                  }`}
              >
                <h4 className="font-heading font-bold text-base text-white mb-3">
                  Soundproof Canopy Enclosure
                </h4>
                <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-900 border border-white/10 mb-5 relative group">
                  <img
                    src="/assets/images/yellow-silent.jpg"
                    alt="Soundproof Canopy Housing"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center text-slate-400 border-b border-white/[0.06] pb-2">
                    <span>Material</span>
                    <span className="text-white font-medium text-right">2.5mm Galvanized Steel</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 border-b border-white/[0.06] pb-2">
                    <span>Capability</span>
                    <span className="text-white font-medium text-right">Acoustic Dampening (&lt;68 dBA)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 pt-0.5">
                    <span>Size Range</span>
                    <span className="text-white font-medium text-right">Weatherproof / Anti-Rust</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Control & ATS Panels */}
              <div
                onClick={() => setActiveHotspot("controller")}
                className={`p-5 rounded-2xl bg-[#16171A]/90 border transition-all duration-300 cursor-pointer ${activeHotspot === "controller"
                    ? "border-[#F25A24] bg-white/[0.07] ring-1 ring-[#F25A24]/50 shadow-[0_0_24px_rgba(242,90,36,0.15)]"
                    : "border-white/[0.08] hover:border-white/20"
                  }`}
              >
                <h4 className="font-heading font-bold text-base text-white mb-3">
                  Electrical Control & ATS Panels
                </h4>
                <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-900 border border-white/10 mb-5 relative group">
                  <img
                    src="/assets/images/gen-control-panel.jpg"
                    alt="Deep Sea Digital Generator Control Panel"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center text-slate-400 border-b border-white/[0.06] pb-2">
                    <span>Material</span>
                    <span className="text-white font-medium text-right">Electrostatic Coated Steel</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 border-b border-white/[0.06] pb-2">
                    <span>Capability</span>
                    <span className="text-white font-medium text-right">Auto Failover (&lt;8s AMF)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 pt-0.5">
                    <span>Size Range</span>
                    <span className="text-white font-medium text-right">Small to Full SCADA</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Alternator & Rotor Shaft */}
              <div
                onClick={() => setActiveHotspot("alternator")}
                className={`p-5 rounded-2xl bg-[#16171A]/90 border transition-all duration-300 cursor-pointer ${activeHotspot === "alternator"
                    ? "border-[#F25A24] bg-white/[0.07] ring-1 ring-[#F25A24]/50 shadow-[0_0_24px_rgba(242,90,36,0.15)]"
                    : "border-white/[0.08] hover:border-white/20"
                  }`}
              >
                <h4 className="font-heading font-bold text-base text-white mb-3">
                  100% Copper Brushless Alternator
                </h4>
                <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-900 border border-white/10 mb-5 relative group">
                  <img
                    src="/assets/images/gen-alternator-shaft.jpg"
                    alt="Alternator Copper Stator & Rotor Shaft"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center text-slate-400 border-b border-white/[0.06] pb-2">
                    <span>Material</span>
                    <span className="text-white font-medium text-right">Class H Pure Copper</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 border-b border-white/[0.06] pb-2">
                    <span>Capability</span>
                    <span className="text-white font-medium text-right">±0.5% Digital AVR</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 pt-0.5">
                    <span>Size Range</span>
                    <span className="text-white font-medium text-right">Balanced @ 1500 RPM</span>
                  </div>
                </div>
              </div>

            </div>

            {/* 6. Bottom Action Footer matching Reference Screenshot */}
            <div className="mt-14 lg:mt-18 pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <h3 className="font-heading text-2xl lg:text-3xl font-extrabold text-white tracking-tight max-w-lg leading-tight">
                Explore our complete product range across industries.
              </h3>
              <div className="flex items-center gap-6">
                <a
                  href="#products"
                  className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Download brochure</span>
                  <Download className="w-4 h-4 text-slate-400" />
                </a>
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="framer-btn-primary bg-[#F25A24] text-white px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 hover:bg-[#d94917] transition-all group cursor-pointer shadow-sm"
                >
                  <span>View all products</span>
                  <div className="w-6 h-6 rounded-lg bg-black/20 flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================
             SECTION 5: WHAT WE SUPPLY / TECHNICAL PRODUCT LINEUP
             ========================================================= */}
        <section id="products" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
              <div className="space-y-3">
                <div className="framer-badge">
                  <span className="framer-badge-dot" />
                  <span>What we supply</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
                  50,000+ kVA <span className="text-[#F25A24]">delivered</span> across Bangladesh
                </h2>
              </div>

              <Link href="/products" className="framer-btn-outline cursor-pointer">
                <span>View all products</span>
                <div className="btn-arrow-box">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
                </div>
              </Link>
            </div>

            {/* 4 Technical Product Spec Table Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Product 1 */}
              <TiltCard className="bg-[#FAFBFD] rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
                <div>
                  <Link href="/products/100kva-perkins-silent-genset" className="block">
                    <div className="h-44 w-full rounded-xl overflow-hidden bg-white mb-5 flex items-center justify-center p-2 border border-slate-100 group">
                      <img src="/assets/images/perkins-blue.jpg" alt="Perkins 100 kVA" className="h-full w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-slate-950 hover:text-[#F25A24] transition-colors">Perkins 100 kVA Silent Genset</h3>
                  </Link>

                  <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Engine:</span>
                      <span className="font-semibold text-slate-800">Perkins 1104A-44TG2 (UK)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Alternator:</span>
                      <span className="font-semibold text-slate-800">Stamford UCI274C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Noise Level:</span>
                      <span className="font-semibold text-[#F25A24]">68 dBA @ 7m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Controller:</span>
                      <span className="font-semibold text-slate-800">Deep Sea DSE6120</span>
                    </div>
                  </div>
                </div>
                <div className="pt-5 mt-5 border-t border-slate-200 flex items-center justify-between">
                  <Link href="/products/100kva-perkins-silent-genset" className="text-xs font-bold text-slate-900 hover:text-[#F25A24]">View Specifications</Link>
                  <Link href="/products/100kva-perkins-silent-genset" className="w-7 h-7 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-[#F25A24] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </TiltCard>

              {/* Product 2 */}
              <TiltCard className="bg-[#FAFBFD] rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
                <div>
                  <Link href="/products/25kva-cummins-silent-generator" className="block">
                    <div className="h-44 w-full rounded-xl overflow-hidden bg-white mb-5 flex items-center justify-center p-2 border border-slate-100 group">
                      <img src="/assets/images/project-green.jpg" alt="Cummins 250 kVA" className="h-full w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-slate-950 hover:text-[#F25A24] transition-colors">Cummins 250 kVA Industrial</h3>
                  </Link>

                  <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Engine:</span>
                      <span className="font-semibold text-slate-800">Cummins 6LTAA8.9-G2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Alternator:</span>
                      <span className="font-semibold text-slate-800">Stamford UCDI274K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duty:</span>
                      <span className="font-semibold text-[#F25A24]">Prime & Standby Continuous</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Controller:</span>
                      <span className="font-semibold text-slate-800">PowerCommand Digital</span>
                    </div>
                  </div>
                </div>
                <div className="pt-5 mt-5 border-t border-slate-200 flex items-center justify-between">
                  <Link href="/products/25kva-cummins-silent-generator" className="text-xs font-bold text-slate-900 hover:text-[#F25A24]">View Specifications</Link>
                  <Link href="/products/25kva-cummins-silent-generator" className="w-7 h-7 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-[#F25A24] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </TiltCard>

              {/* Product 3 */}
              <TiltCard className="bg-[#FAFBFD] rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
                <div>
                  <Link href="/products/30kva-diesel-generator" className="block">
                    <div className="h-44 w-full rounded-xl overflow-hidden bg-white mb-5 flex items-center justify-center p-2 border border-slate-100 group">
                      <img src="/assets/images/canopy-white-20k.jpg" alt="Ricardo 30 kVA" className="h-full w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-slate-950 hover:text-[#F25A24] transition-colors">Ricardo 30 kVA Silent Canopy</h3>
                  </Link>

                  <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Engine:</span>
                      <span className="font-semibold text-slate-800">Ricardo 4105ZD Turbo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Alternator:</span>
                      <span className="font-semibold text-slate-800">Stamford UCI224C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Ideal For:</span>
                      <span className="font-semibold text-[#F25A24]">Commercial & Offices</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Controller:</span>
                      <span className="font-semibold text-slate-800">Deep Sea DSE6120</span>
                    </div>
                  </div>
                </div>
                <div className="pt-5 mt-5 border-t border-slate-200 flex items-center justify-between">
                  <Link href="/products/30kva-diesel-generator" className="text-xs font-bold text-slate-900 hover:text-[#F25A24]">View Specifications</Link>
                  <Link href="/products/30kva-diesel-generator" className="w-7 h-7 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-[#F25A24] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </TiltCard>

              {/* Product 4 */}
              <TiltCard className="bg-[#FAFBFD] rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
                <div>
                  <Link href="/products/apd-110-a-diesel-generator" className="block">
                    <div className="h-44 w-full rounded-xl overflow-hidden bg-white mb-5 flex items-center justify-center p-2 border border-slate-100 group">
                      <img src="/assets/images/yellow-silent.jpg" alt="APD 110 A" className="h-full w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-slate-950 hover:text-[#F25A24] transition-colors">APD 110 A Industrial Diesel</h3>
                  </Link>

                  <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Engine:</span>
                      <span className="font-semibold text-slate-800">Aksa A6CRX46TI (6-Cyl)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Alternator:</span>
                      <span className="font-semibold text-slate-800">Stamford Class H AVR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Application:</span>
                      <span className="font-semibold text-[#F25A24]">Export Zones & Mills</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Controller:</span>
                      <span className="font-semibold text-slate-800">DSE 7320 MKII Auto AMF</span>
                    </div>
                  </div>
                </div>
                <div className="pt-5 mt-5 border-t border-slate-200 flex items-center justify-between">
                  <Link href="/products/apd-110-a-diesel-generator" className="text-xs font-bold text-slate-900 hover:text-[#F25A24]">View Specifications</Link>
                  <Link href="/products/apd-110-a-diesel-generator" className="w-7 h-7 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-[#F25A24] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </TiltCard>

            </div>

          </div>
        </section>

        {/* =========================================================
             SECTION 6: BUILT FOR EVERY INDUSTRY (VERTICAL TABS)
             ========================================================= */}
        <section id="industries" className="py-20 lg:py-28 bg-[#F7F7F8] border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

            <div className="space-y-3 mb-12">
              <div className="framer-badge">
                <span className="framer-badge-dot" />
                <span>Built for every industry</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
                Power <span className="text-[#F25A24]">solutions</span> for every industry
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

              {/* Vertical Tabs */}
              <div className="lg:col-span-4 space-y-2">
                {(Object.keys(INDUSTRY_DATA) as Array<keyof typeof INDUSTRY_DATA>).map((key) => {
                  const isActive = activeIndustry === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveIndustry(key)}
                      className={`w-full text-left p-4 rounded-xl border font-heading font-bold text-sm transition-all flex items-center justify-between ${isActive
                          ? "bg-white text-slate-900 shadow-sm border-slate-300"
                          : "border-transparent text-slate-500 hover:bg-white hover:text-slate-900"
                        }`}
                    >
                      <span className="capitalize">{key === "datacenters" ? "Data Centers & Telecom" : key === "manufacturing" ? "Manufacturing & Garments" : key === "commercial" ? "Commercial & High-Rise" : key === "hospitals" ? "Hospitals & Healthcare" : "Construction & Infrastructure"}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "text-[#F25A24] translate-x-1" : "text-slate-400"}`} />
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Showcase Card */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndustry}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <span className="font-mono text-[11px] font-bold text-[#F25A24] uppercase tracking-wider block">
                      {INDUSTRY_DATA[activeIndustry].tag}
                    </span>

                    <h3 className="font-heading text-2xl sm:text-3xl font-black text-slate-950 leading-tight">
                      {INDUSTRY_DATA[activeIndustry].title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {INDUSTRY_DATA[activeIndustry].desc}
                    </p>

                    <ul className="space-y-2.5 pt-2">
                      {INDUSTRY_DATA[activeIndustry].bullets.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <span className="w-4 h-4 rounded-full bg-orange-100 text-[#F25A24] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">✓</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4">
                      <button onClick={() => setIsQuoteModalOpen(true)} className="framer-btn-primary">
                        <span>Explore this solution</span>
                        <div className="btn-arrow-box">
                          <ArrowRight className="w-3.5 h-3.5 text-white" />
                        </div>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dynamic Image */}
                <div className="relative rounded-2xl overflow-hidden h-[340px] shadow-lg">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeIndustry}
                      src={INDUSTRY_DATA[activeIndustry].image}
                      alt={INDUSTRY_DATA[activeIndustry].title}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* =========================================================
             SECTION 7: REAL-WORLD SUCCESS / CASE STUDIES
             ========================================================= */}
        <section id="projects" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

            <div className="space-y-3 mb-14">
              <div className="framer-badge">
                <span className="framer-badge-dot" />
                <span>Real-world success</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
                Real <span className="text-[#F25A24]">results</span> from real projects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Case 1 */}
              <TiltCard className="bg-[#FAFBFD] rounded-3xl overflow-hidden border border-slate-200 group flex flex-col justify-between">
                <div className="h-64 sm:h-72 overflow-hidden relative">
                  <img src="/assets/images/project-green.jpg" alt="Commercial Building Motijheel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[10px]">
                    // MOTIJHEEL, DHAKA //
                  </span>
                </div>
                <div className="p-8">
                  <span className="text-xs font-mono font-bold text-[#F25A24] block mb-1">250 kVA Standby Backup</span>
                  <h3 className="font-heading font-bold text-xl text-slate-950 mb-2 leading-snug">
                    Zero-Downtime Standby Architecture for 20-Story Commercial Tower
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                    Engineered an acoustic canopy generator system integrated with automatic mains failure ATS, ensuring elevator and data center continuity under 6 seconds.
                  </p>
                  <button onClick={() => setIsQuoteModalOpen(true)} className="text-xs font-bold text-slate-950 hover:text-[#F25A24] inline-flex items-center gap-1.5">
                    <span>View case study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </TiltCard>

              {/* Case 2 */}
              <TiltCard className="bg-[#FAFBFD] rounded-3xl overflow-hidden border border-slate-200 group flex flex-col justify-between">
                <div className="h-64 sm:h-72 overflow-hidden relative">
                  <img src="/assets/images/hero-gen.jpg" alt="Textile Factory Gazipur" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[10px]">
                    // GAZIPUR INDUSTRIAL //
                  </span>
                </div>
                <div className="p-8">
                  <span className="text-xs font-mono font-bold text-[#F25A24] block mb-1">1000 kVA Synchronized Setup</span>
                  <h3 className="font-heading font-bold text-xl text-slate-950 mb-2 leading-snug">
                    Dual Synchronized Prime Power for Export Garments Manufacturing
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                    Installed parallel load-sharing Cummins diesel generators maintaining synchronized continuous power supply across 2,000 spinning looms.
                  </p>
                  <button onClick={() => setIsQuoteModalOpen(true)} className="text-xs font-bold text-slate-950 hover:text-[#F25A24] inline-flex items-center gap-1.5">
                    <span>View case study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </TiltCard>

              {/* Case 3 */}
              <TiltCard className="bg-[#FAFBFD] rounded-3xl overflow-hidden border border-slate-200 group flex flex-col justify-between">
                <div className="h-64 sm:h-72 overflow-hidden relative">
                  <img src="/assets/images/commercial-white.jpg" alt="Hospital Sylhet" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[10px]">
                    // SYLHET HEALTHCARE //
                  </span>
                </div>
                <div className="p-8">
                  <span className="text-xs font-mono font-bold text-[#F25A24] block mb-1">500 kVA Life-Safety Backup</span>
                  <h3 className="font-heading font-bold text-xl text-slate-950 mb-2 leading-snug">
                    Critical Power Security for 350-Bed Specialized Medical Facility
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                    Implemented hospital-grade critical silencers and redundant automated failover mechanisms safeguarding intensive care and surgical theatres.
                  </p>
                  <button onClick={() => setIsQuoteModalOpen(true)} className="text-xs font-bold text-slate-950 hover:text-[#F25A24] inline-flex items-center gap-1.5">
                    <span>View case study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </TiltCard>

              {/* Case 4 */}
              <TiltCard className="bg-[#FAFBFD] rounded-3xl overflow-hidden border border-slate-200 group flex flex-col justify-between">
                <div className="h-64 sm:h-72 overflow-hidden relative">
                  <img src="/assets/images/perkins-blue.jpg" alt="Industrial Project Narayanganj" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[10px]">
                    // NARAYANGANJ EXPORT //
                  </span>
                </div>
                <div className="p-8">
                  <span className="text-xs font-mono font-bold text-[#F25A24] block mb-1">750 kVA Heavy Duty Perkins</span>
                  <h3 className="font-heading font-bold text-xl text-slate-950 mb-2 leading-snug">
                    High-Torque Synchronous Generation for Heavy Machinery Fabrication
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                    Supplied UK-assembled Perkins genset configured with heavy-duty transient motor starting capacity for sheet-metal rolling machinery.
                  </p>
                  <button onClick={() => setIsQuoteModalOpen(true)} className="text-xs font-bold text-slate-950 hover:text-[#F25A24] inline-flex items-center gap-1.5">
                    <span>View case study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </TiltCard>

            </div>

          </div>
        </section>

        {/* =========================================================
             SECTION 8: FULL-WIDTH AMBIENT VIDEO CTA BANNER
             ========================================================= */}
        <section className="relative py-28 lg:py-36 overflow-hidden bg-slate-950 text-white flex items-center justify-center">

          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/images/industrial-site.jpg"
            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
          >
            <source src="/assets/videos/DG Set Working Explained .mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-[1000px] mx-auto px-6 text-center space-y-8"
          >
            <div className="framer-badge framer-badge-dark mx-auto">
              <span className="framer-badge-dot" />
              <span>Open a conversation</span>
            </div>

            <h2 className="font-heading text-4xl sm:text-6xl font-black text-white leading-tight">
              Ready to power your next <span className="text-[#F25A24]">industrial project?</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Contact our technical engineering team for certified on-site load evaluation, civil foundation guidance, and customized quotations.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
              <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-slate-200">
                ✓ 100% Load-Bank Certified
              </span>
              <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-slate-200">
                ✓ Zero Downtime ATS Sync
              </span>
              <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-slate-200">
                ✓ 24/7 Rapid Emergency Support
              </span>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => setIsQuoteModalOpen(true)} className="framer-btn-primary px-8 py-3.5 text-sm">
                <span>Schedule site inspection</span>
                <div className="btn-arrow-box">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>
          </motion.div>
        </section>

        {/* =========================================================
             SECTION 9: BUILT ON TRUST / TESTIMONIALS & CLIENT LOGOS
             ========================================================= */}
        <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              <div className="lg:col-span-6 space-y-6">
                <div className="framer-badge">
                  <span className="framer-badge-dot" />
                  <span>Build on trust</span>
                </div>

                <h2 className="font-heading text-3xl sm:text-5xl font-black text-slate-950 leading-tight">
                  Trusted by <span className="text-[#F25A24]">clients</span>, proven by results
                </h2>

                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                </div>

                <blockquote className="text-base sm:text-lg text-slate-700 italic leading-relaxed pt-1">
                  &quot;Diesel Generator Warehouse engineered and commissioned our 500 kVA Perkins silent generator flawlessly. When the grid fluctuated during high-load manufacturing shifts, our plant ran without missing a single beat.&quot;
                </blockquote>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <img src="/assets/images/client-portrait.jpg" alt="Plant Operations Director" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-sm">Engr. Tariqul Islam</h4>
                    <p className="text-xs text-slate-500">Head of Plant Operations, Dhaka Industrial Zone</p>
                  </div>
                </div>
              </div>

              {/* Right: Trust Metrics & Corporate Bangladeshi Conglomerates */}
              <div className="lg:col-span-6 bg-[#0E1014] rounded-3xl p-8 sm:p-10 text-white space-y-8 shadow-xl">

                <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-8 text-center sm:text-left">
                  <div>
                    <span className="font-heading text-3xl sm:text-4xl font-black text-white">500+</span>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">Gensets Delivered</p>
                  </div>
                  <div>
                    <span className="font-heading text-3xl sm:text-4xl font-black text-white">99.8%</span>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">Uptime Reliability</p>
                  </div>
                  <div>
                    <span className="font-heading text-3xl sm:text-4xl font-black text-white">24/7</span>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">Field Support</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                    // PARTNER CONGLOMERATES //
                  </span>
                  <div className="grid grid-cols-5 gap-3 items-center text-center">
                    <div className="text-sm font-black text-[#0066B2] tracking-wider">BEXIMCO</div>
                    <div className="text-sm font-bold text-[#00A651]">■ SQUARE</div>
                    <div className="text-sm font-black text-[#EC008C] tracking-wide">brac</div>
                    <div className="text-sm font-black text-[#E2136E]">bKash</div>
                    <div className="text-sm font-black text-[#004B93] tracking-widest">WALTON</div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* =========================================================
             SECTION 10: INSIGHTS & ARTICLES (FRAMER BLOG)
             ========================================================= */}
        <section id="blog" className="py-20 lg:py-28 bg-[#F7F7F8] border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
              <div className="space-y-3">
                <div className="framer-badge">
                  <span className="framer-badge-dot" />
                  <span>Insights & Articles</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
                  Latest from our <span className="text-[#F25A24]">blog</span>
                </h2>
              </div>

              <a href="#" className="framer-btn-outline">
                <span>View all blogs</span>
                <div className="btn-arrow-box">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
                </div>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <TiltCard className="bg-white rounded-2xl overflow-hidden border border-slate-200 group flex flex-col justify-between">
                <div>
                  <div className="h-52 overflow-hidden">
                    <img src="/assets/images/hero-gen.jpg" alt="How to choose generator" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-mono text-slate-400">// JULY 12, 2026 //</span>
                    <h3 className="font-heading font-bold text-base text-slate-950 group-hover:text-[#F25A24] transition-colors mt-2 leading-snug">
                      How to calculate accurate kVA sizing for industrial facilities
                    </h3>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-0">
                  <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#F25A24]">
                    <span>Read full article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </TiltCard>

              <TiltCard className="bg-white rounded-2xl overflow-hidden border border-slate-200 group flex flex-col justify-between">
                <div>
                  <div className="h-52 overflow-hidden">
                    <img src="/assets/images/engineer-hero.jpg" alt="Maintenance tips" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-mono text-slate-400">// MAY 30, 2026 //</span>
                    <h3 className="font-heading font-bold text-base text-slate-950 group-hover:text-[#F25A24] transition-colors mt-2 leading-snug">
                      Diesel generator preventative maintenance checklist for peak efficiency
                    </h3>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-0">
                  <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#F25A24]">
                    <span>Read full article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </TiltCard>

              <TiltCard className="bg-white rounded-2xl overflow-hidden border border-slate-200 group flex flex-col justify-between">
                <div>
                  <div className="h-52 overflow-hidden">
                    <img src="/assets/images/yellow-silent.jpg" alt="Diesel vs silent" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-mono text-slate-400">// MAY 14, 2026 //</span>
                    <h3 className="font-heading font-bold text-base text-slate-950 group-hover:text-[#F25A24] transition-colors mt-2 leading-snug">
                      Acoustic attenuation: Why canopy engineering matters for urban installations
                    </h3>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-0">
                  <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#F25A24]">
                    <span>Read full article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </TiltCard>

            </div>

          </div>
        </section>
      </main>

      {/* =========================================================
           FOOTER (FRAMER TEMPLATE STYLE)
           ========================================================= */}
      <footer id="contact" className="bg-[#0E1014] text-white pt-20 pb-12 border-t border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-slate-800">

            {/* Left: Newsletter & Bio (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <a href="#" className="inline-block bg-white px-3.5 py-2 rounded-xl hover:opacity-95 transition-opacity">
                <img
                  src="/assets/images/diese-generator-warehouse-logo.png"
                  alt="Diesel Generator Warehouse"
                  className="h-8 w-auto object-contain"
                />
              </a>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Diesel Generator Warehouse is Bangladesh&apos;s leading heavy power equipment supplier. Direct importer and distributor of Perkins, Cummins, Stamford, and Ricardo power plants with nationwide installation and 24/7 service.
              </p>

              <div className="space-y-3 pt-2">
                <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  // STAY CONNECTED //
                </span>
                <form className="flex items-center gap-2 max-w-sm" onSubmit={(e) => { e.preventDefault(); alert("Subscribed to technical newsletter!"); }}>
                  <input type="email" required placeholder="Enter your work email" className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs text-white focus:outline-none focus:border-[#F25A24]" />
                  <button type="submit" className="framer-btn-primary shrink-0 px-4 py-2.5">
                    <span>Join</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Col 2: Products (2 Cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-mono font-bold text-xs text-white uppercase tracking-wider">// PRODUCTS //</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#products" className="hover:text-white transition-colors">Perkins (UK)</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Cummins (USA)</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Ricardo (Silent)</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Caterpillar (CAT)</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Custom ATS Panels</a></li>
              </ul>
            </div>

            {/* Col 3: Company (2 Cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-mono font-bold text-xs text-white uppercase tracking-wider">// COMPANY //</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Insights</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Col 4: Contact & Coordinates (3 Cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-mono font-bold text-xs text-white uppercase tracking-wider">// CONTACT INFO //</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#F25A24]" />
                  <span>+880 1234-567890</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#F25A24]" />
                  <span>sales@dieselgeneratorwarehouse.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#F25A24] mt-0.5" />
                  <span>House 12, Road 7, Motijheel, Dhaka, Bangladesh</span>
                </li>
                <li className="font-mono text-[10px] text-slate-500 pt-2">
                  23.8103° N, 90.4125° E // DHAKA HQ
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 Diesel Generator Warehouse BD. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>

      {/* =========================================================
           MODAL 1: GET A QUOTE WITH LOAD CALCULATOR
           ========================================================= */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200"
            >
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="framer-badge mb-3">
                <span className="framer-badge-dot" />
                <span>Instant kVA Calculator</span>
              </div>

              <h3 className="font-heading text-2xl font-black text-slate-950 mb-1">Request Engineering Quote</h3>
              <p className="text-xs text-slate-500 mb-6">Calculate the required generator kVA rating for your electrical load.</p>

              {/* Calculator */}
              <div className="bg-[#F7F7F8] p-5 rounded-2xl border border-slate-200 mb-6 space-y-4">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Estimated Facility Load (kW):</span>
                  <span className="font-mono text-base font-black text-[#F25A24]">{kwLoad} kW</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="1000"
                  value={kwLoad}
                  step="5"
                  onChange={(e) => setKwLoad(parseInt(e.target.value, 10))}
                  className="w-full accent-[#F25A24] cursor-pointer"
                />
                <div className="flex justify-between items-center text-xs text-slate-600 pt-2 border-t border-slate-200">
                  <span>Recommended Genset: <strong className="text-slate-950 font-bold">{recommendedKva} kVA</strong></span>
                  <span className="font-mono text-[11px] text-[#F25A24]">~{fuelRate} L/hr</span>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert("Quote request submitted! An engineer will call you within 2 hours."); setIsQuoteModalOpen(false); }} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company / Full Name</label>
                  <input type="text" required placeholder="Hassan Ahmed" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#F25A24]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input type="tel" required placeholder="+880 17XXXXXXXX" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#F25A24]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Installation Division / City</label>
                    <input
                      type="text"
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      placeholder="e.g. Dhaka, Gazipur, Sylhet, Khulna"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#F25A24]"
                    />
                  </div>
                </div>
                <button type="submit" className="framer-btn-primary w-full py-3 justify-center mt-3">
                  <span>Submit Request</span>
                  <div className="btn-arrow-box">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
           MODAL 2: SEARCH MODAL
           ========================================================= */}
      <AnimatePresence>
        {isSearchModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200"
            >
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search generators, brands, specs..."
                  className="w-full text-xs focus:outline-none"
                  autoFocus
                />
                <button onClick={() => setIsSearchModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="pt-3 space-y-2 text-xs">
                <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">// POPULAR SEARCHES //</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-[#F25A24] cursor-pointer">Perkins 100 kVA</span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-[#F25A24] cursor-pointer">Cummins 250 kVA</span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-[#F25A24] cursor-pointer">Deep Sea AMF Panel</span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-[#F25A24] cursor-pointer">Acoustic Canopy</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
