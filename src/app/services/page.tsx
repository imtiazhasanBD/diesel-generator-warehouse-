"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  ShieldCheck,
  Activity,
  Zap,
  VolumeX,
  Cpu,
  Phone,
  Clock,
  ArrowRight,
  CheckCircle2,
  Download,
  ChevronDown,
  Settings,
  Layers,
  Factory,
  Building2,
  Sparkles,
  Truck,
  Flame,
  Check,
  FileText,
  BarChart3,
  ChevronRight,
  Compass,
  AlertTriangle,
} from "lucide-react";
import { useModal } from "@/context/ModalContext";

// --- SERVICES DATA DEFINITIONS ---
interface ServiceItem {
  id: string;
  category: "installation" | "maintenance" | "testing" | "automation";
  number: string;
  badge: string;
  title: string;
  headline: string;
  description: string;
  image: string;
  deliverables: string[];
  specs: { label: string; value: string }[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "turnkey-installation",
    category: "installation",
    number: "01",
    badge: "MECHANICAL & ELECTRICAL RIGGING",
    title: "Turnkey Generator Installation & Rigging",
    headline: "Engineered sub-base foundations, overhead rigging, and heavy-duty busduct termination.",
    description:
      "Installing an industrial generator demands precision structural engineering. Our team handles everything from civil foundation inertia slabs with spring vibration dampers to custom silencer routing, overhead crane rigging, and automatic transfer switch (ATS) integration.",
    image: "/assets/images/services/service_framer_2.webp",
    deliverables: [
      "Anti-vibration spring & neoprene damper pad placement",
      "Custom exhaust silencer ducting with mineral wool thermal wrap",
      "Underground and overhead bulk fuel piping with dual-wall safety",
      "Low-voltage (LV) and medium-voltage (MV) busbar & cable termination",
    ],
    specs: [
      { label: "Capacities Supported", value: "20 kVA to 2500 kVA" },
      { label: "Vibration Isolation", value: "Up to 98% efficiency" },
      { label: "Commissioning Time", value: "3 – 7 working days" },
      { label: "Standards", value: "BNBC & NFPA 110 Compliant" },
    ],
  },
  {
    id: "preventive-maintenance-amc",
    category: "maintenance",
    number: "02",
    badge: "PREVENTIVE RELIABILITY & AMC",
    title: "Preventive Maintenance & Scheduled AMC",
    headline: "Systematic 42-point scheduled servicing utilizing 100% genuine OEM filters and fluids.",
    description:
      "Prevent catastrophic generator failure with tailored Annual Maintenance Contracts (AMC). Certified engineers conduct scheduled 250h, 500h, and 1000h servicing, lube-oil chemical viscosity tests, valve lash adjustment, and electronic governor calibration across Bangladesh.",
    image: "/assets/images/services/service_framer_4.webp",
    deliverables: [
      "42-point comprehensive electrical, mechanical & cooling audit",
      "Genuine Fleetguard, Perkins & Cummins air/oil/fuel filter changes",
      "Engine valve lash clearance and injector pressure calibration",
      "Cooling system chemical descaling and jacket water heater checks",
    ],
    specs: [
      { label: "Service Frequency", value: "Quarterly / Monthly / Bi-weekly" },
      { label: "Parts Guarantee", value: "100% Genuine OEM Certified" },
      { label: "Emergency SLA", value: "2-Hour Response Time" },
      { label: "Log Reporting", value: "Digital Health History Dashboard" },
    ],
  },
  {
    id: "load-bank-testing",
    category: "testing",
    number: "03",
    badge: "ISO 8528 CAPACITY VERIFICATION",
    title: "Full-Capacity Load Bank Testing",
    headline: "Mobile resistive and inductive load banks to eliminate wet-stacking and verify power output.",
    description:
      "Generators operated below 30% load accumulate unburned fuel deposits (wet-stacking) that degrade cylinder compression. Our mobile resistive load banks apply precise incremental steps (25%, 50%, 75%, 100%, 110%) to de-carbonize engines and certify output performance.",
    image: "/assets/images/services/service_framer_3.webp",
    deliverables: [
      "De-carbonization of engine exhaust manifolds and turbocharger turbines",
      "Transient load response & voltage/frequency dip recovery measurement",
      "Alternator stator temperature rise and insulation resistance testing",
      "Signed and sealed digital power analyzer test compliance report",
    ],
    specs: [
      { label: "Testing Range", value: "50 kW up to 2,000 kW" },
      { label: "Step Increments", value: "0%, 25%, 50%, 75%, 100%, 110%" },
      { label: "Report Type", value: "ISO 8528 / Fire Service Certified" },
      { label: "Mobility", value: "Truck-Mounted Field Deployment" },
    ],
  },
  {
    id: "soundproof-canopy",
    category: "installation",
    number: "04",
    badge: "65-72 dBA ACOUSTIC CONTROL",
    title: "Custom Acoustic Canopy & Sound Attenuation",
    headline: "Department of Environment (DoE) compliant sound attenuation enclosures and splitters.",
    description:
      "Whether installing next to high-density garment floors, commercial corporate towers, or multi-specialty hospitals, our in-house sheet-metal fabrication team creates weather-sealed acoustic canopies engineered to dampen noise to 65–72 dBA @ 1 meter.",
    image: "/assets/images/services/service_framer_7.webp",
    deliverables: [
      "High-density rockwool acoustic insulation (80–100 kg/m³) with perforated galvanized sheet",
      "Motorized intake & exhaust acoustic splitter silencer louvers",
      "Heavy-gauge electrostatically powder-coated weatherproof steel enclosure",
      "Emergency push-buttons, fluid-retaining bunds, and internal LED service lights",
    ],
    specs: [
      { label: "Sound Level", value: "65 – 72 dBA @ 1 meter" },
      { label: "Steel Gauge", value: "2.0 mm – 2.5 mm Cold Rolled" },
      { label: "Compliance", value: "Bangladesh DoE Noise Standards" },
      { label: "Finish", value: "Marine-Grade Electrostatic Powder Coat" },
    ],
  },
  {
    id: "sync-automation",
    category: "automation",
    number: "05",
    badge: "SMART SYNCHRONIZING & SCADA",
    title: "AMF / ATS & Multi-Generator Synchronizing",
    headline: "Intelligent load sharing, peak-lopping, and automatic bus synchronizing systems.",
    description:
      "Eliminate blackout gaps with state-of-the-art paralleling switchgear. We program Deep Sea Electronics (DSE 8610 MKII) and ComAp controllers to synchronize multiple generators of different kVA sizes with grid utility power for smooth, seamless power continuity.",
    image: "/assets/images/services/service_framer_13.webp",
    deliverables: [
      "Multi-generator auto start/stop based on dynamic facility demand (fuel economy)",
      "Automatic Mains Failure (AMF) transfer switching under 10 seconds",
      "Integrated motorized ABB, Schneider, or Siemens air circuit breakers (ACB)",
      "Ethernet / 4G GSM remote monitoring with SMS fault alerts and telemetry",
    ],
    specs: [
      { label: "Controllers", value: "Deep Sea (UK) / ComAp (Czech Republic)" },
      { label: "Transfer Time", value: "< 10 seconds auto-transfer" },
      { label: "Genset Quantity", value: "Paralleling up to 16 generators" },
      { label: "Connectivity", value: "DSE WebNet / Modbus RTU / SCADA" },
    ],
  },
  {
    id: "emergency-breakdown",
    category: "maintenance",
    number: "06",
    badge: "24/7 RAPID RESPONSE",
    title: "24/7 Emergency Breakdown Dispatch",
    headline: "Rapid field response vans equipped with diagnostic scanners and critical emergency spares.",
    description:
      "When continuous production is on the line, every minute of generator downtime translates to revenue loss. Our rapid response vans are stationed in Dhaka, Gazipur, Narayanganj, Chittagong, and Sylhet, ready to dispatch certified engineers round-the-clock.",
    image: "/assets/images/services/service_framer_15.webp",
    deliverables: [
      "2-hour emergency dispatch window across major industrial export processing zones",
      "OEM electronic diagnostics: Perkins EST, Cummins INSITE, DSE Config Suite",
      "Mobile van inventory of critical spare parts: AVRs, starter motors, solenoids, belts",
      "Emergency portable load testing and temporary rental generator support",
    ],
    specs: [
      { label: "Coverage", value: "Dhaka, Gazipur, Ctg, Sylhet, Khulna" },
      { label: "Hotline", value: "+880 1713-456789 (24/7 Live)" },
      { label: "Average TTR", value: "Under 3 Hours to Restoration" },
      { label: "Tooling", value: "Calibrated Thermal & Oscilloscope Scanners" },
    ],
  },
];

// --- AMC PRICING TIERS ---
const AMC_TIERS = [
  {
    name: "Silver AMC",
    badge: "Basic Standby Protection",
    tagline: "Ideal for commercial offices, residential towers, and low-hour standby applications.",
    visits: "4 Scheduled Visits / Year (Quarterly)",
    sla: "6-Hour Emergency Response",
    popular: false,
    features: [
      "42-point electrical and mechanical diagnostic audit",
      "Lube oil, coolant, and battery acid specific gravity checks",
      "Engine belt tension and hose clamp safety inspection",
      "Detailed digital maintenance log & health certificate",
      "10% discount on genuine Perkins & Cummins OEM spare parts",
      "Priority customer queue during general breakdown periods",
    ],
    excluded: [
      "Free emergency breakdown labor",
      "Annual resistive load bank testing",
      "Dedicated account electrical engineer",
    ],
  },
  {
    name: "Gold AMC",
    badge: "Most Popular Industrial Plan",
    tagline: "Engineered for factories, export garment plants, cold storage, and private hospitals.",
    visits: "12 Scheduled Visits / Year (Monthly)",
    sla: "4-Hour Emergency Response Guarantee",
    popular: true,
    features: [
      "All Silver plan audits performed monthly",
      "Scheduled oil & filter change labor 100% included",
      "Annual full-capacity resistive load bank test included",
      "Governor speed tuning & automatic voltage regulator (AVR) calibration",
      "Cooling system chemical flush and radiator fin high-pressure wash",
      "15% discount on all OEM filtration kits and electrical switches",
      "Quarterly management report on fuel consumption efficiency",
    ],
    excluded: [
      "Dedicated on-site standby engineer",
    ],
  },
  {
    name: "Platinum AMC",
    badge: "Mission-Critical 24/7",
    tagline: "Designed for continuous running plants, data centers, spinning mills, and spinning lines.",
    visits: "24 Visits / Year (Bi-Weekly Monitoring)",
    sla: "2-Hour Rapid On-Site Response SLA",
    popular: false,
    features: [
      "Complete comprehensive coverage with bi-weekly site presence",
      "Dedicated senior power engineer assigned to your facility",
      "Unlimited emergency breakdown labor included at zero added charge",
      "Semi-annual resistive load bank testing & certification",
      "24/7 Remote telemetry monitoring via GSM / IoT gateway",
      "Free temporary standby generator provision during major overhauls",
      "20% discount on major engine overhauling components",
      "Fire safety & Department of Environment inspection documentation support",
    ],
    excluded: [],
  },
];

// --- FREQUENTLY ASKED QUESTIONS ---
const SERVICE_FAQS = [
  {
    q: "How fast can an emergency service team reach our facility during a blackout?",
    a: "For industrial clients in Dhaka, Gazipur, Savar, Narayanganj, and Chittagong industrial belts, our average dispatch time is under 45 minutes, with an on-site arrival window of 2 to 4 hours. AMC Gold and Platinum contract holders receive guaranteed SLA priority response backed by dedicated emergency vans.",
  },
  {
    q: "Do you supply and fit 100% genuine Perkins, Cummins, and Baudouin spare parts?",
    a: "Yes. Diesel Generator Warehouse is a direct importer of genuine OEM filters, AVRs, electronic control units, sensors, and engine overhaul components. Every replacement part comes with verifiable manufacturer serials, certificates of origin (COO), and official warranty documentation.",
  },
  {
    q: "What is wet-stacking, and why does our generator require periodic load bank testing?",
    a: "When a diesel generator operates below 30% of its rated capacity for extended periods, the cylinders do not reach optimal combustion temperature. Unburned diesel and carbon soot accumulate in the exhaust manifold and turbocharger (wet-stacking), causing heavy black smoke and power loss. Our mobile resistive load banks run the generator at 100% load for 2–4 hours, burning off accumulated carbon and restoring peak engine compression.",
  },
  {
    q: "Can you synchronize our new generator with an existing older generator from a different brand?",
    a: "Yes. By installing intelligent synchronizing controllers (such as the Deep Sea Electronics DSE 8610 MKII or ComAp InteliGen), we can seamlessly parallel generators of differing kVA capacities and different engine makes (e.g. synchronizing a 500 kVA Perkins with an 800 kVA Cummins) onto a common busbar with automatic load sharing.",
  },
  {
    q: "Do you provide acoustic compliance certificates for Department of Environment (DoE) clearance?",
    a: "Yes. Our custom-fabricated acoustic canopies and silencer louvers are engineered to achieve 65–72 dBA at 1 meter distance. Upon installation, our acoustic engineering team conducts calibrated sound level measurement across the perimeter and provides official test documentation required for DoE environmental permits.",
  },
  {
    q: "Can we customize an Annual Maintenance Contract (AMC) to fit our factory schedule?",
    a: "Absolutely. We customize AMC visit intervals (monthly, bi-monthly, or weekly), maintenance windows (conducting non-intrusive checks during Friday or night shutdown shifts), and consumable inclusions based on your factory's running hours and operational requirements.",
  },
];

export default function ServicesPage() {
  const { openQuote } = useModal();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filtered Services List
  const filteredServices =
    activeCategory === "all"
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeCategory);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleRequestService = (serviceName: string) => {
    openQuote(`Service Consultation Inquiry — ${serviceName}`);
  };

  return (
    <div className="bg-[#FAFBFD] text-slate-900 flex flex-col font-sans selection:bg-primary selection:text-white">
      {/* =========================================================================
          SECTION 1: HERO SECTION (PRECISION TECHNICAL BLUEPRINT STYLE)
          ========================================================================= */}
      <section className="relative pt-10 sm:pt-14 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 bg-white border-b border-slate-200/90 overflow-hidden">
        {/* Subtle Architectural Grid Lines */}
        <div className="absolute inset-0 max-w-[1400px] mx-auto px-6 sm:px-10 pointer-events-none z-0 hidden lg:block">
          <div className="w-full h-full grid grid-cols-4 border-x border-slate-200/60 divide-x divide-slate-200/60" />
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">Services</span>
          </nav>

          {/* Badge & Title Block */}
          <div className="max-w-4xl">
            {/* Category Accent Line matching Home Hero */}
            <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight mb-3">
              <span className="w-8 h-[3.5px] bg-primary rounded-sm inline-block" />
              <span>Turnkey Engineering &amp; Lifecycle Support</span>
            </div>

            {/* Section Tag */}
            <div className="font-mono text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">
              // SERVICES &amp; MAINTENANCE //
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 leading-[1.02] mb-6">
              Precision Engineering &amp; Turnkey{" "}
              <span className="text-primary">Generator Services</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal mb-8">
              From sub-base structural rigging and sound-attenuated acoustic canopy fabrication
              to 24/7 emergency dispatch and digital load bank certification — DGW delivers
              uncompromising electrical and mechanical power lifecycle support across Bangladesh.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="button"
                onClick={() => handleRequestService("Comprehensive Engineering Consultation")}
                className="framer-btn-primary cursor-pointer shadow-lg shadow-primary/20"
              >
                <span className="font-heading font-bold text-xs uppercase tracking-wider">
                  Request Service Consultation
                </span>
                <div className="btn-arrow-box">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </button>

              <a
                href="tel:+8801713456789"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-sm border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-900 font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>24/7 Hotline: +880 1713-456789</span>
              </a>

              <a
                href="#amc-tiers"
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-heading font-bold uppercase tracking-wider text-slate-700 hover:text-primary transition-colors cursor-pointer"
              >
                <span>Explore AMC Plans</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Technical Trust Strip: 4 Key Service Metrics */}
          <div className="mt-14 sm:mt-18 pt-8 border-t border-slate-200/90 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-none">
                  1,500+
                </span>
                <span className="w-2 h-2 rounded-xs bg-primary shrink-0" />
              </div>
              <p className="font-heading text-xs sm:text-[13px] font-bold text-slate-950 uppercase tracking-wider">
                Turnkey Deployments
              </p>
              <p className="text-xs text-slate-500 font-normal">
                Across industrial &amp; infrastructure sectors
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-none">
                  2-Hour
                </span>
                <span className="w-2 h-2 rounded-xs bg-primary shrink-0" />
              </div>
              <p className="font-heading text-xs sm:text-[13px] font-bold text-slate-950 uppercase tracking-wider">
                Emergency Response SLA
              </p>
              <p className="text-xs text-slate-500 font-normal">
                Dedicated vans in major industrial zones
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-none">
                  100%
                </span>
                <span className="w-2 h-2 rounded-xs bg-primary shrink-0" />
              </div>
              <p className="font-heading text-xs sm:text-[13px] font-bold text-slate-950 uppercase tracking-wider">
                Genuine OEM Spares
              </p>
              <p className="text-xs text-slate-500 font-normal">
                Verified Perkins, Cummins, Stamford parts
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-none">
                  20–2500
                </span>
                <span className="font-heading text-lg font-bold text-slate-600">kVA</span>
              </div>
              <p className="font-heading text-xs sm:text-[13px] font-bold text-slate-950 uppercase tracking-wider">
                Capacity Spectrum
              </p>
              <p className="text-xs text-slate-500 font-normal">
                Continuous heavy-duty ratings covered
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CORE ENGINEERING SERVICE PILLARS (INTERACTIVE SHOWCASE)
          ========================================================================= */}
      <section id="services-grid" className="py-14 sm:py-20 lg:py-28 max-w-[1400px] mx-auto px-6 sm:px-10 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight">
              <span className="w-10 h-[4px] bg-primary rounded-sm inline-block" />
              <span>Full Lifecycle Capabilities</span>
            </div>
            <div className="font-mono text-xs text-slate-400 font-bold uppercase tracking-widest">
              // CORE SERVICES //
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-bold text-slate-950 tracking-[-0.025em] leading-[1.08] pt-1">
              Core Industrial <span className="text-primary">Engineering Services</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
              Choose from dedicated stand-alone engineering interventions or bundle into a comprehensive power lifecycle agreement.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100/90 p-1.5 rounded-md border border-slate-200/80 self-start md:self-auto">
            {[
              { id: "all", label: "All Services" },
              { id: "installation", label: "Installation & Rigging" },
              { id: "maintenance", label: "Maintenance & AMC" },
              { id: "testing", label: "Testing & Load Bank" },
              { id: "automation", label: "Automation & Sync" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-sm text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-white text-primary shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6-Card Engineering Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-md border border-slate-200/90 hover:border-slate-300 hover:shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Card Photo Header */}
              <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-900">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                {/* Top Corner Number Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-sm bg-black/70 backdrop-blur-md text-white font-mono text-xs font-bold flex items-center justify-center border border-white/20">
                    {service.number}
                  </span>
                  <span className="px-2.5 py-1 rounded-sm bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider border border-white/10">
                    {service.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-950 group-hover:text-primary transition-colors leading-tight mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Key Deliverables List */}
                  <div className="space-y-2 pb-5 border-b border-slate-100">
                    <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      // ENGINEERING DELIVERABLES //
                    </span>
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mini Technical Specs Grid */}
                  <div className="grid grid-cols-2 gap-2.5 py-4 text-[11px]">
                    {service.specs.slice(0, 2).map((sp, idx) => (
                      <div key={idx} className="bg-slate-50 p-2 rounded-xs border border-slate-100">
                        <span className="text-slate-400 block text-[9.5px] uppercase font-mono">
                          {sp.label}
                        </span>
                        <span className="font-bold text-slate-900 line-clamp-1">
                          {sp.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Action */}
                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleRequestService(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors cursor-pointer group/btn"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href="tel:+8801713456789"
                    className="text-[11px] font-mono text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    Fast-Track &rarr;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THE 4-STEP DGW ENGINEERING METHODOLOGY
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#0E1014] text-white border-y border-slate-800 relative overflow-hidden">
        {/* Subtle Background Radial Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/[0.04] rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-xs border border-white/15 text-[11px] font-mono font-bold tracking-widest uppercase text-white mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>STANDARD OPERATING PROCEDURE</span>
            </div>
            <div className="font-mono text-xs text-primary font-bold uppercase tracking-widest mb-3">
              // ENGINEERING METHODOLOGY //
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.025em] leading-[1.08]">
              Our 4-Step Engineering Delivery Method
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed font-normal">
              Every generator project adheres to strict ISO and BNBC engineering benchmarks to guarantee total power integrity before final site sign-off.
            </p>
          </div>

          {/* 4-Step Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: Compass,
                title: "Site Audit & Electrical Survey",
                desc: "Certified electrical engineers deploy digital power analyzers to measure peak inductive motor inrush currents and harmonic distortion on-site.",
              },
              {
                step: "02",
                icon: Layers,
                title: "3D CAD & Foundation Specs",
                desc: "We generate complete single-line diagrams (SLD), exhaust thermal routing calculations, and civil inertia foundation drawings.",
              },
              {
                step: "03",
                icon: Wrench,
                title: "Rigging & Precision Commissioning",
                desc: "Heavy crane placement, laser shaft alignment, anti-vibration damping, fuel line pressure integrity test, and ATS panel termination.",
              },
              {
                step: "04",
                icon: ShieldCheck,
                title: "100% Load Handover & SLA",
                desc: "Full resistive load bank testing to 110% rating, operator safety training, factory compliance certificates, and 24/7 hotline onboarding.",
              },
            ].map((st, idx) => (
              <div
                key={idx}
                className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 p-6 sm:p-7 rounded-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-extrabold text-primary">
                      {st.step}
                    </span>
                    <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-primary transition-colors">
                      <st.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white mb-2 leading-tight">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>ISO 9001:2015 Process</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: ANNUAL MAINTENANCE CONTRACT (AMC) TIERS
          ========================================================================= */}
      <section id="amc-tiers" className="py-16 sm:py-24 max-w-[1400px] mx-auto px-6 sm:px-10 w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight mb-2 justify-center">
            <span className="w-10 h-[4px] bg-primary rounded-sm inline-block" />
            <span>Guaranteed Uptime</span>
          </div>
          <div className="font-mono text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">
            // ANNUAL MAINTENANCE CONTRACTS //
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-bold text-slate-950 tracking-[-0.025em] leading-[1.08]">
            Annual Maintenance <span className="text-primary">Contracts (AMC)</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed font-normal max-w-xl mx-auto">
            Eliminate unpredictable power interruptions. Select an engineering SLA tier engineered for your operational risk tolerance.
          </p>
        </div>

        {/* 3 Tier Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {AMC_TIERS.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-md p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 relative ${
                tier.popular
                  ? "bg-slate-950 text-white shadow-2xl border-2 border-primary ring-4 ring-primary/10"
                  : "bg-white text-slate-900 border border-slate-200/90 shadow-sm hover:shadow-md"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-xs bg-primary text-white font-mono font-bold text-[10px] uppercase tracking-wider shadow-sm">
                  ★ RECOMMENDED FOR FACTORIES
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading text-2xl font-bold tracking-tight">
                    {tier.name}
                  </h3>
                  <span
                    className={`font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded-xs border ${
                      tier.popular
                        ? "bg-white/10 text-slate-200 border-white/20"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>

                <p
                  className={`text-xs leading-relaxed mb-6 ${
                    tier.popular ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {tier.tagline}
                </p>

                {/* Key Cadence Highlights */}
                <div
                  className={`p-4 rounded-sm mb-6 space-y-2 text-xs font-medium border ${
                    tier.popular
                      ? "bg-white/5 border-white/10 text-slate-200"
                      : "bg-slate-50 border-slate-200/80 text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span><strong>Cadence:</strong> {tier.visits}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span><strong>Emergency SLA:</strong> {tier.sla}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <span
                    className={`font-mono text-[10px] font-bold uppercase tracking-wider block ${
                      tier.popular ? "text-slate-400" : "text-slate-400"
                    }`}
                  >
                    // INCLUDED COVERAGE //
                  </span>
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          tier.popular ? "text-primary" : "text-primary"
                        }`}
                      />
                      <span
                        className={`leading-relaxed ${
                          tier.popular ? "text-slate-200" : "text-slate-700"
                        }`}
                      >
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-slate-200/20">
                <button
                  type="button"
                  onClick={() => handleRequestService(`${tier.name} Inquiry`)}
                  className={`w-full py-3.5 px-4 rounded-sm font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    tier.popular
                      ? "bg-primary hover:bg-primary-hover text-white shadow-md shadow-primary/30"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  <span>Select {tier.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FREQUENTLY ASKED QUESTIONS (ACCORDION)
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200/90">
        <div className="max-w-[1080px] mx-auto px-6 sm:px-10">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight mb-2 justify-center">
              <span className="w-10 h-[4px] bg-primary rounded-sm inline-block" />
              <span>Technical FAQ</span>
            </div>
            <div className="font-mono text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">
              // FREQUENTLY ASKED QUESTIONS //
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-bold text-slate-950 tracking-[-0.025em] leading-[1.08]">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed font-normal">
              Everything you need to know about our engineer dispatch, spare parts genuineness, and load bank audits.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {SERVICE_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-md border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-[#FAFBFD] border-slate-300 shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-heading text-base sm:text-lg font-bold text-slate-950 leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-sm flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? "bg-primary text-white rotate-180" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: INDUSTRIAL CTA BANNER
          ========================================================================= */}
      <section className="relative bg-[#0E1014] text-white py-16 sm:py-20 overflow-hidden">
        {/* Background Image Accent */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: "url('/assets/images/services/service_framer_14.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-xs border border-white/15 text-[11px] font-mono font-bold tracking-widest uppercase text-white mb-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>24/7 DIESEL GENERATOR ENGINEERING DESK</span>
            </div>
            <div className="font-mono text-xs text-primary font-bold uppercase tracking-widest mb-2">
              // POWER UPTIME ASSURANCE //
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.025em] leading-[1.08]">
              Ready to secure 100% power uptime for your facility?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-xl">
              Book a certified generator engineer for an on-site power audit, schedule an annual maintenance contract, or get immediate breakdown dispatch.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => handleRequestService("Direct Service Desk Consultation")}
              className="framer-btn-primary cursor-pointer shadow-lg shadow-primary/30"
            >
              <span className="font-heading font-bold text-xs uppercase tracking-wider">
                Get Immediate Service Quote
              </span>
              <div className="btn-arrow-box">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </button>

            <a
              href="tel:+8801713456789"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/15 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>Hotline: +880 1713-456789</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

