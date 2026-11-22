"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ChevronRight,
  Download,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Truck,
  Wrench,
  FileText,
  ChevronDown,
  ExternalLink,
  AlertCircle,
  Sparkles,
  Send,
  Building2,
  Factory,
  Cpu,
  Layers,
  Check,
  Globe
} from "lucide-react";
import { useModal } from "@/context/ModalContext";

// Certified Brand Partners
const partnerBrands = [
  { name: "Perkins (UK)", logo: "/assets/images/brands/perkins.webp", tag: "Heavy Duty UK" },
  { name: "Cummins (USA)", logo: "/assets/images/brands/cummins.webp", tag: "Industrial Power" },
  { name: "Baudouin (France)", logo: "/assets/images/brands/baudouin.webp", tag: "Marine & Standby" },
  { name: "Stamford (UK)", logo: "/assets/images/brands/stamford.jpg", tag: "Brushless Alternators" },
  { name: "Deep Sea Electronics", logo: "/assets/images/brands/dse.png", tag: "DSE UK Controllers" },
  { name: "Leroy-Somer", logo: "/assets/images/brands/leroy-somer.webp", tag: "French Alternators" },
  { name: "Mecc Alte (Italy)", logo: "/assets/images/brands/mecc-alte.webp", tag: "Synchronous Alternators" },
  { name: "Yanmar (Japan)", logo: "/assets/images/brands/yanmar.webp", tag: "Compact Efficiency" },
  { name: "ComAp", logo: "/assets/images/brands/comap.png", tag: "Smart Paralleling" },
  { name: "Deutz (Germany)", logo: "/assets/images/brands/deutz.png", tag: "German Engineering" },
];

// 4 Physical Facility Hubs
const regionalHubs = [
  {
    title: "Corporate HQ & Showroom",
    city: "Dhaka",
    address: "45/A Tejgaon Industrial Area, Dhaka-1208",
    hotline: "+880 1713-456789",
    hours: "Sat – Thu: 9:00 AM – 7:00 PM",
    features: ["Walk-in Generator Inspection", "Certified Electrical Engineers", "Immediate Sizing Consultation"],
    badge: "Central Headquarters",
    highlight: true,
  },
  {
    title: "Central Assembly Warehouse",
    city: "Gazipur",
    address: "Plot 84, Joydebpur Bypass Road, Gazipur",
    hotline: "+880 1912-345678",
    hours: "24/7 Logistics & Stock Dispatch",
    features: ["50+ Ready Stock Generators (15–1500 kVA)", "0–110% Resistive Load Bank Testing", "Canopy Soundproofing Plant"],
    badge: "10,000+ Sq.ft Bonded Yard",
    highlight: false,
  },
  {
    title: "Chattogram Maritime & Port Hub",
    city: "Chattogram",
    address: "Plot 12, Agrabad Commercial Area, Chattogram",
    hotline: "+880 1713-456789",
    hours: "Sat – Thu: 9:00 AM – 6:00 PM",
    features: ["Marine & Port Logistics Generators", "Shipyard Power Backup", "Customs Clearance & Import Yard"],
    badge: "Coastal Division",
    highlight: false,
  },
  {
    title: "Northern Division Depot",
    city: "Bogura & Rajshahi",
    address: "BSCIC Industrial Estate, Silimpur, Bogura",
    hotline: "+880 1912-345678",
    hours: "Sat – Thu: 9:00 AM – 6:00 PM",
    features: ["Agro-Processing & Cold Storage Backup", "Rapid Field Service Vans", "Genuine Spare Parts Inventory"],
    badge: "Northern Support",
    highlight: false,
  },
];

// FAQs for Diesel Generator Buyers
const faqs = [
  {
    question: "How do I determine the right generator kVA capacity for my facility?",
    answer:
      "Determining generator capacity requires calculating both continuous running load (kW) and peak inductive starting currents (motor inrush loads, compressors, HVAC, and elevators). As a rule of thumb, add 25-30% buffer to your maximum simultaneous load for long-term engine longevity. Our senior electrical engineers provide 100% free on-site load measurement using digital power analyzers anywhere in Bangladesh before you place an order.",
  },
  {
    question: "Do you supply genuine Perkins and Cummins engines with verified certificates?",
    answer:
      "Yes, 100%. Every single Perkins (UK/USA) and Cummins generator delivered by Diesel Generator Warehouse comes with an authentic Certificate of Origin (COO), original manufacturer serial numbers stamped on the engine block, and official test run certificates. You are welcome to physically inspect the unit and verify serial numbers at our Tejgaon or Gazipur warehouse before final delivery.",
  },
  {
    question: "What is your typical delivery and commissioning timeline?",
    answer:
      "For ready stock units (15 kVA to 1000 kVA), we dispatch within 24 to 48 hours across all 64 districts of Bangladesh. Custom soundproof canopies or ATS synchronization panel setups typically take 3 to 5 business days. Our engineering team handles complete site positioning, vibration-damping pad placement, cable termination, and initial commissioning on site.",
  },
  {
    question: "Do you provide 24/7 emergency repair and AMC service?",
    answer:
      "Yes. We maintain a dedicated 24/7 emergency dispatch desk with rapid service vans based in Dhaka, Gazipur, and Chattogram. For clients under our Annual Maintenance Contract (AMC), we guarantee technician arrival within 4 hours in the greater Dhaka industrial belt and 8 hours nationwide. We stock genuine oil filters, fuel filters, AVRs, and DSE controllers at all times.",
  },
  {
    question: "Can I witness load bank testing before paying?",
    answer:
      "Absolutely. We encourage all clients to visit our Gazipur Heavy Assembly Facility to witness full resistive load bank testing at 25%, 50%, 75%, 100%, and 110% overload conditions. We will provide real-time digital readouts of frequency, voltage regulation, exhaust temperature, and fuel consumption before the generator leaves our gate.",
  },
];

export default function ContactPage() {
  const { openQuote } = useModal();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rfqTicket, setRfqTicket] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !phone) return;

    setIsSubmitting(true);
    // Simulate API call to CRM / Dispatch desk
    setTimeout(() => {
      const ticket = `DGW-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setRfqTicket(ticket);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
    setIsSubmitted(false);
  };

  return (
    <div className="bg-[#F8F9FA] text-[#11141A] flex flex-col font-sans selection:bg-primary selection:text-white relative">
      <div className="flex-grow">
        {/* =========================================================================
            SECTION 1: HERO CONTACT SPLIT (MATCHING SITE TYPOGRAPHY & DESIGN SYSTEM)
            ========================================================================= */}
        <section className="relative pt-10 sm:pt-14 lg:pt-20 pb-20 lg:pb-28 overflow-hidden border-b border-slate-200/90">
          {/* Architectural Dashed Vertical Grid Lines */}
          <div className="absolute inset-0 max-w-[1400px] mx-auto px-6 sm:px-10 pointer-events-none z-0 hidden lg:block">
            <div className="w-full h-full grid grid-cols-4 border-x border-dashed border-slate-300/60">
              <div className="border-r border-dashed border-slate-300/60 h-full" />
              <div className="border-r border-dashed border-slate-300/60 h-full" />
              <div className="border-r border-dashed border-slate-300/60 h-full" />
              <div className="h-full" />
            </div>
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10">
            {/* Breadcrumb matching About page */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 font-sans">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </li>
                <li className="text-slate-950 font-bold" aria-current="page">
                  Contact
                </li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-start">
              
              {/* LEFT COLUMN: HERO HEADLINE & DIRECT CONTACT */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full pt-1">
                <div>
                  {/* Category Accent Line matching Home Hero */}
                  <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight mb-4">
                    <span className="w-8 h-[3.5px] bg-primary rounded-sm inline-block" />
                    <span>Direct Warehouse Stock &amp; Engineering</span>
                  </div>

                  {/* Section Tag */}
                  <div className="font-mono text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">
                    // GET IN TOUCH //
                  </div>

                  {/* Main Display Headline matching Site Typography */}
                  <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 leading-[1.02] mb-6">
                    Let’s <span className="text-primary relative inline-block">work</span>
                    <br />
                    together
                  </h1>

                  {/* Subtext Paragraph matching page.tsx line 637 */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal mb-8">
                    Got questions or need assistance? Reach out to us anytime — our engineering team is ready to provide the generator sizing, technical load analysis, and on-site guidance you need across Bangladesh.
                  </p>

                  {/* CTA Buttons Row */}
                  <div className="flex flex-wrap items-center gap-4 mb-10">
                    <a
                      href="#rfq-form"
                      className="framer-btn-dark group cursor-pointer inline-flex items-center"
                    >
                      <span>Download Technical Brochure</span>
                      <div className="btn-arrow-box">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </a>

                    <a
                      href="https://wa.me/8801713456789"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-md text-xs sm:text-[13px] font-bold text-slate-800 tracking-tight transition-colors shadow-xs"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>WhatsApp Direct Desk</span>
                    </a>
                  </div>

                  {/* Live Dispatch Status */}
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-emerald-50/80 border border-emerald-200/70 rounded-sm text-xs font-mono text-emerald-800 font-medium mb-10">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Dhaka Engineering Desk Active — Average Response &lt; 15 Mins</span>
                  </div>
                </div>

                {/* Direct Contact Blocks (Framed in 2 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-slate-200/80">
                  {/* Col A: Contact us on */}
                  <div>
                    <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-widest mb-3">
                      // Contact us on //
                    </h3>
                    <div className="space-y-2 text-sm text-slate-800">
                      <div>
                        <a
                          href="tel:+8801713456789"
                          className="font-heading font-bold text-[15px] text-slate-950 hover:text-primary transition-colors flex items-center gap-2 tracking-tight"
                        >
                          <span>+880 1713-456789</span>
                          <span className="text-[11px] font-mono font-normal text-slate-500">(Sales)</span>
                        </a>
                      </div>
                      <div>
                        <a
                          href="tel:+8801912345678"
                          className="font-heading font-bold text-[15px] text-slate-950 hover:text-primary transition-colors flex items-center gap-2 tracking-tight"
                        >
                          <span>+880 1912-345678</span>
                          <span className="text-[11px] font-mono font-normal text-slate-500">(24/7 Hotline)</span>
                        </a>
                      </div>
                      <div className="pt-1">
                        <a
                          href="mailto:sales@dieselgeneratorwarehouse.com"
                          className="font-sans text-[13px] text-slate-600 hover:text-primary transition-colors break-all"
                        >
                          sales@dieselgeneratorwarehouse.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Col B: Find us */}
                  <div>
                    <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-widest mb-3">
                      // Find us //
                    </h3>
                    <div className="space-y-3 text-[13px] text-slate-600 leading-snug font-sans">
                      <p>
                        <strong className="font-heading font-bold text-[13.5px] text-slate-950 block">Dhaka Corporate HQ:</strong>
                        45/A Tejgaon Industrial Area, Dhaka-1208, Bangladesh
                      </p>
                      <p>
                        <strong className="font-heading font-bold text-[13.5px] text-slate-950 block">Central Stockyard:</strong>
                        Plot 84, Joydebpur Bypass, Gazipur
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: ULTRA-CLEAN INDUSTRIAL FORM (EXACT TYPOGRAPHY & RADIUS) */}
              <div id="rfq-form" className="lg:col-span-6">
                <div className="bg-[#151515] text-white border border-white/[0.08] rounded-md sm:rounded-[12px] p-7 sm:p-9 lg:p-10 shadow-2xl relative overflow-hidden">
                  {/* Subtle Warm Red Ambient Glow */}
                  <div
                    className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full pointer-events-none select-none blur-[90px]"
                    style={{
                      background: "radial-gradient(circle, rgba(224, 5, 1, 0.22) 0%, transparent 70%)",
                    }}
                  />

                  {/* Submitted Confirmation State */}
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="submitted"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="relative z-10 py-12 px-4 text-left space-y-4"
                      >
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-2">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-white tracking-tight">
                          Message sent successfully
                        </h3>
                        <p className="text-sm text-white/70 max-w-md leading-relaxed font-sans">
                          Thank you, <span className="text-white font-semibold">{firstName}</span>. Your request (<span className="text-primary font-mono">{rfqTicket}</span>) has been received. Our engineering team will review your requirements and reach out to you shortly.
                        </p>
                        <div className="pt-4">
                          <button
                            type="button"
                            onClick={handleReset}
                            className="px-5 py-2.5 bg-white/[0.1] hover:bg-white/[0.16] text-white text-xs font-heading font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                          >
                            Send another message
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      /* Active Clean Form */
                      <form key="form" onSubmit={handleSubmit} className="relative z-10 space-y-5 sm:space-y-6">
                        {/* Row 1: First name & Last name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                          <div>
                            <label className="block text-[13px] font-heading font-semibold text-slate-200 tracking-wide mb-2">
                              First name*
                            </label>
                            <input
                              type="text"
                              required
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="Enter your first name"
                              className="w-full h-12 bg-[#151515] border border-white/20 rounded-md px-4 font-sans text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[13px] font-heading font-semibold text-slate-200 tracking-wide mb-2">
                              Last name*
                            </label>
                            <input
                              type="text"
                              required
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="Enter your last name"
                              className="w-full h-12 bg-[#151515] border border-white/20 rounded-md px-4 font-sans text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors"
                            />
                          </div>
                        </div>

                        {/* Row 2: Email & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                          <div>
                            <label className="block text-[13px] font-heading font-semibold text-slate-200 tracking-wide mb-2">
                              Email*
                            </label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email"
                              className="w-full h-12 bg-[#151515] border border-white/20 rounded-md px-4 font-sans text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[13px] font-heading font-semibold text-slate-200 tracking-wide mb-2">
                              Phone*
                            </label>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="Enter your contact number"
                              className="w-full h-12 bg-[#151515] border border-white/20 rounded-md px-4 font-sans text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors"
                            />
                          </div>
                        </div>

                        {/* Row 3: Subject */}
                        <div>
                          <label className="block text-[13px] font-heading font-semibold text-slate-200 tracking-wide mb-2">
                            Subject
                          </label>
                          <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter topic or subject"
                            className="w-full h-12 bg-[#151515] border border-white/20 rounded-md px-4 font-sans text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>

                        {/* Row 4: Message */}
                        <div>
                          <label className="block text-[13px] font-heading font-semibold text-slate-200 tracking-wide mb-2">
                            Message
                          </label>
                          <textarea
                            rows={4}
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell us about your project"
                            className="w-full bg-[#151515] border border-white/20 rounded-md p-4 font-sans text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors resize-y min-h-[120px]"
                          />
                        </div>

                        {/* Submit Button (Left-aligned, fit-content) */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-[#a7a3a2] hover:bg-white text-slate-950 font-heading font-bold text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 shadow-xs"
                          >
                            {isSubmitting ? (
                              <>
                                <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                <span>Submitting...</span>
                              </>
                            ) : (
                              <span>Submit details</span>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: CERTIFIED BRAND PARTNERS MARQUEE
            ========================================================================= */}
        <section className="py-12 bg-white border-b border-slate-200/90 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest block mb-1">
                  // CERTIFIED OEM ALLIANCES //
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                  Authentic International Powertrains
                </h3>
              </div>
              <p className="text-sm text-slate-600 max-w-md font-sans">
                Direct authorized imports with official Certificate of Origin (COO) and factory warranties.
              </p>
            </div>
          </div>

          {/* Marquee Track */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              className="flex items-center gap-6 whitespace-nowrap w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {[...partnerBrands, ...partnerBrands].map((brand, idx) => (
                <div
                  key={`${brand.name}-${idx}`}
                  className="inline-flex items-center gap-3.5 px-6 py-3.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-sm transition-colors shrink-0"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-7 w-auto object-contain max-w-[100px] grayscale hover:grayscale-0 transition-all opacity-85 hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="border-l border-slate-300 pl-3">
                    <div className="font-heading font-bold text-slate-950 text-[13px] leading-tight">
                      {brand.name}
                    </div>
                    <div className="text-[10.5px] font-mono text-slate-500">
                      {brand.tag}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: 4 PHYSICAL WAREHOUSES & REGIONAL FACILITIES
            ========================================================================= */}
        <section className="py-20 lg:py-28 bg-[#F8F9FA] border-b border-slate-200/90">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
            {/* Header */}
            <div className="max-w-3xl mb-14">
              <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                // REGIONAL HUBS & STOCKYARDS //
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-[56px] font-bold text-slate-950 leading-[1.05] tracking-tight mb-4">
                Visit our showrooms &amp; heavy testing facilities
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                We believe in complete transparency. Clients are always welcome to physically inspect ready generators, witness load bank testing, and meet our senior engineering leads in person.
              </p>
            </div>

            {/* 4 Hubs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {regionalHubs.map((hub, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col justify-between p-6 rounded-sm border transition-all ${
                    hub.highlight
                      ? "bg-white border-primary/40 shadow-lg ring-1 ring-primary/20"
                      : "bg-white border-slate-200/90 hover:border-slate-300 shadow-xs"
                  }`}
                >
                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`font-mono text-[10.5px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-wider ${
                          hub.highlight
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {hub.badge}
                      </span>
                      <span className="font-heading font-bold text-lg text-slate-950">
                        {hub.city}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-lg font-bold text-slate-950 mb-2">
                      {hub.title}
                    </h3>

                    {/* Address */}
                    <div className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-600 mb-4 font-sans">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{hub.address}</span>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2 pt-3 border-t border-slate-100 mb-6 font-sans">
                      {hub.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Hours & Hotline */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-sans">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{hub.hours}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <a
                        href={`tel:${hub.hotline.replace(/\s+/g, "")}`}
                        className="font-mono text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{hub.hotline}</span>
                      </a>
                      <a
                        href="#rfq-form"
                        className="text-[11px] font-heading font-bold text-slate-600 hover:text-slate-950 flex items-center gap-0.5 uppercase tracking-wide"
                      >
                        <span>Directions</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: 24/7 RAPID BREAKDOWN & EMERGENCY HOTLINE BANNER
            ========================================================================= */}
        <section className="py-12 bg-white border-b border-slate-200/90">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
            <div className="relative rounded-md overflow-hidden bg-gradient-to-r from-primary via-[#C50301] to-[#990201] text-white p-8 sm:p-12 shadow-xl">
              {/* Decorative Geometric Overlay */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none select-none flex items-center justify-end pr-10">
                <Factory className="w-72 h-72 text-white" strokeWidth={1} />
              </div>

              <div className="relative z-10 max-w-3xl">
                {/* Emergency Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-xs border border-white/20 mb-4 text-[11px] font-mono font-bold tracking-widest uppercase text-white">
                  <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping" />
                  <span>24/7 EMERGENCY BREAKDOWN ASSISTANCE</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white mb-3">
                  Generator Down or Inverter Trip at Your Factory?
                </h2>

                <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal mb-8 max-w-2xl">
                  Power interruptions cost millions in lost production. Our rapid response field vans are stocked with genuine Perkins &amp; Cummins fuel filters, AVRs, actuators, and diagnostic scanners — ready to roll immediately.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="tel:+8801912345678"
                    className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-slate-950 hover:bg-slate-100 font-heading font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-md group cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-primary" />
                    <span>Call 24/7 Hotline: +880 1912-345678</span>
                  </a>

                  <a
                    href="https://wa.me/8801713456789?text=Urgent%20Generator%20Breakdown%20Assistance%20Required"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 bg-black/30 hover:bg-black/50 border border-white/20 text-white font-heading font-bold text-xs uppercase tracking-wider rounded-md transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Emergency Dispatch</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: BANGLADESH NATIONWIDE INFRASTRUCTURE & METRICS
            ========================================================================= */}
        <section className="py-20 lg:py-28 bg-[#F8F9FA] border-b border-slate-200/90">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Logistics Capabilities */}
              <div className="lg:col-span-5">
                <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                  // NATIONWIDE LOGISTICS NETWORK //
                </span>
                <h2 className="font-heading text-3xl sm:text-5xl lg:text-[56px] font-bold text-slate-950 leading-[1.05] tracking-tight mb-5">
                  Direct crane delivery across all 64 districts
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-8">
                  From industrial rooftop placements in Tejgaon to remote tea garden backup in Sylhet and textile plants in Gazipur, our specialized heavy transport fleet guarantees safe, insured offloading and foundation installation.
                </p>

                {/* 3 Feature Points */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3.5 p-3.5 bg-white border border-slate-200 rounded-sm">
                    <div className="w-9 h-9 rounded-sm bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-slate-950 text-sm">
                        Heavy Hydraulic Crane &amp; Skidding Crew
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 font-sans">
                        Basement rigging, rooftop hoisting, and vibration spring isolator installation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 bg-white border border-slate-200 rounded-sm">
                    <div className="w-9 h-9 rounded-sm bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-slate-950 text-sm">
                        Turnkey Fuel &amp; Exhaust Ducting
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 font-sans">
                        Underground fuel tanks, day tanks, residential grade silencers, and insulated hot air discharge louvers.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 bg-white border border-slate-200 rounded-sm">
                    <div className="w-9 h-9 rounded-sm bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-slate-950 text-sm">
                        ATS &amp; Multiple Generator Paralleling
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 font-sans">
                        Deep Sea Electronics &amp; ComAp digital load-sharing synchronization switchboards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Bangladesh Map Card with Interactive Hubs */}
              <div className="lg:col-span-7">
                <div className="bg-[#111317] border border-slate-800 rounded-md p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl">
                  {/* Map Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                        <span className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest">
                          Active Dispatch Coverage
                        </span>
                      </div>
                      <div className="font-heading text-lg font-bold text-white mt-1 tracking-tight">
                        Bangladesh Distribution &amp; Field Support
                      </div>
                    </div>
                    <div className="font-mono text-xs text-primary bg-primary/10 px-3 py-1 rounded-xs border border-primary/20">
                      Coordinates: 23.8103° N, 90.4125° E
                    </div>
                  </div>

                  {/* Stylized Map View with BD SVG Map and Markers */}
                  <div className="relative h-[320px] sm:h-[380px] w-full rounded-sm bg-slate-950/90 border border-slate-800/80 flex items-center justify-center overflow-hidden p-4">
                    {/* SVG Map of Bangladesh */}
                    <img
                      src="/assets/images/bd-map.svg"
                      alt="Bangladesh Service Map"
                      className="h-full w-auto object-contain opacity-40 invert filter"
                    />

                    {/* Marker 1: Dhaka HQ */}
                    <div className="absolute top-[52%] left-[53%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                      <div className="relative flex items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary border-2 border-white"></span>
                      </div>
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 bg-slate-900 border border-primary/40 px-2.5 py-1 rounded-xs shadow-lg whitespace-nowrap text-left z-20">
                        <div className="font-heading font-bold text-[11px] text-white">Dhaka HQ</div>
                        <div className="text-[9.5px] font-mono text-primary">Tejgaon Showroom</div>
                      </div>
                    </div>

                    {/* Marker 2: Gazipur Warehouse */}
                    <div className="absolute top-[44%] left-[51%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400 border border-white"></span>
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-xs shadow-lg whitespace-nowrap text-left hidden sm:block z-10">
                        <div className="font-heading font-bold text-[10px] text-slate-200">Gazipur Yard</div>
                        <div className="text-[9px] font-mono text-slate-400">10,000 sq.ft Stock</div>
                      </div>
                    </div>

                    {/* Marker 3: Chattogram Port Hub */}
                    <div className="absolute top-[70%] left-[72%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                      <div className="relative flex items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-emerald-500 opacity-60"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white"></span>
                      </div>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-xs shadow-lg whitespace-nowrap text-left hidden sm:block z-10">
                        <div className="font-heading font-bold text-[10px] text-slate-200">Chattogram Hub</div>
                        <div className="text-[9px] font-mono text-emerald-400">Port &amp; Marine</div>
                      </div>
                    </div>

                    {/* Marker 4: Bogura Northern Depot */}
                    <div className="absolute top-[36%] left-[40%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400 border border-white"></span>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-xs shadow-lg whitespace-nowrap text-left hidden sm:block z-10">
                        <div className="font-heading font-bold text-[10px] text-slate-200">Bogura Depot</div>
                        <div className="text-[9px] font-mono text-yellow-400">Agro Support</div>
                      </div>
                    </div>

                    {/* Marker 5: Sylhet */}
                    <div className="absolute top-[38%] left-[75%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400 border border-white"></span>
                    </div>

                    {/* Marker 6: Khulna */}
                    <div className="absolute top-[68%] left-[42%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-400 border border-white"></span>
                    </div>
                  </div>

                  {/* 4 Bottom Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800 text-center">
                    <div>
                      <div className="font-heading font-bold text-2xl sm:text-3xl text-white">64</div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Districts Covered</div>
                    </div>
                    <div>
                      <div className="font-heading font-bold text-2xl sm:text-3xl text-primary">&lt; 4h</div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Dhaka Field Arrival</div>
                    </div>
                    <div>
                      <div className="font-heading font-bold text-2xl sm:text-3xl text-white">100%</div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">COO Certified</div>
                    </div>
                    <div>
                      <div className="font-heading font-bold text-2xl sm:text-3xl text-emerald-400">24/7</div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Dispatch Standby</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: FREQUENTLY ASKED QUESTIONS (ACCORDION)
            ========================================================================= */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-[1000px] mx-auto px-6 sm:px-10">
            {/* Heading */}
            <div className="text-center mb-14">
              <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                // BUYER ASSURANCE //
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-normal">
                Clear answers regarding sizing, warranties, load bank testing, and delivery across Bangladesh.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200/90 rounded-sm overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-4.5 bg-slate-50/60 hover:bg-slate-100/70 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer"
                    >
                      <span className="font-heading font-bold text-slate-950 text-[15px] sm:text-[16px] tracking-tight">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-6 py-4.5 bg-white border-t border-slate-100 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed font-normal">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Still have questions banner */}
            <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-sm text-center">
              <h4 className="font-heading font-bold text-slate-950 text-base mb-1">
                Have a specialized industrial load or high-voltage requirement?
              </h4>
              <p className="text-xs sm:text-[13px] text-slate-600 mb-4 font-sans">
                Our Senior Electrical Engineering Director is available for in-person project consultation in Dhaka.
              </p>
              <div className="flex items-center justify-center gap-3">
                <a
                  href="tel:+8801713456789"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white font-heading font-bold text-xs uppercase tracking-wider rounded-md transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call +880 1713-456789</span>
                </a>
                <button
                  type="button"
                  onClick={() => openQuote("Engineering Consultation Inquiry")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white font-heading font-bold text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                >
                  <span>Quick Load Calculator</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
