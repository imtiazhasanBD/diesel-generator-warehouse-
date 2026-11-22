"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Download,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Zap,
  Building2,
  Award,
  Factory,
  Globe,
  Wrench,
  Cpu,
  Flame,
  ChevronRight,
  Mail,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";

// --- SOCIAL SVG ICONS ---
const IconLinkedIn = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.72.77 1.72 1.72-.77 1.72-1.72 1.72m1.39 9.74v-8.37H5.07v8.37h2.78z" />
  </svg>
);

const IconX = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconInstagram = () => (
  <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// --- LEADERS DATA ---
interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  experience: string;
  bio: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "tanvir-ahmed",
    name: "Engr. Tanvir Ahmed",
    role: "Head of Technical Operations",
    department: "Executive & Engineering",
    image: "/assets/images/about/about_img_30.png",
    experience: "16+ Years Experience",
    bio: "Over 16 years leading heavy-duty diesel generator powertrain integration, grid synchronizing systems, and mega-watt industrial power plant commissioning.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "rafiqul-islam",
    name: "Michael Turner (Md. Rafiqul Islam)",
    role: "Lead Mechanical & Alternator Engineer",
    department: "Mechanical Systems",
    image: "/assets/images/team-2.jpg",
    experience: "14+ Years Experience",
    bio: "Specializes in Cummins and Perkins high-displacement diesel engine rebuilds, vibration damping, and Stamford 4-pole alternator alignment.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "sarah-chowdhury",
    name: "Olivia Bennett (Sarah Chowdhury)",
    role: "Quality Assurance & Testing Manager",
    department: "Quality & Compliance",
    image: "/assets/images/team-1.jpg",
    experience: "11+ Years Experience",
    bio: "Manages factory load-bank testing protocols (0–110% step loading), sound attenuation certification, and ISO 9001 compliance standards.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "kamal-hossain",
    name: "William Harris (Kamal Hossain)",
    role: "Field Service & Commissioning Supervisor",
    department: "Field Engineering",
    image: "/assets/images/team-3.jpg",
    experience: "13+ Years Experience",
    bio: "Leads on-site rigging, vibration isolator mounting, exhaust silencer ducting, and emergency 24/7 breakdown recovery across Bangladesh.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "sophie-walker",
    name: "Sophie Walker (Nusrat Jahan)",
    role: "Client Relations & Technical Solutions",
    department: "Client Engineering",
    image: "/assets/images/team-4.jpg",
    experience: "9+ Years Experience",
    bio: "Acts as primary technical liaison for industrial conglomerates, ensuring tailored kVA sizing, fuel economics, and seamless delivery timelines.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "william-carter",
    name: "William Carter (Ariful Haque)",
    role: "Senior ATS & Switchgear Engineer",
    department: "Electrical Engineering",
    image: "/assets/images/engineer-hero.jpg",
    experience: "12+ Years Experience",
    bio: "Specialist in Deep Sea Electronics (DSE) & ComAp digital controllers, automatic transfer switchgear (ATS), and multi-generator paralleling schemes.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "emily-carter",
    name: "Emily Carter (Farzana Rahman)",
    role: "Operations & OEM Parts Specialist",
    department: "Supply Chain & Logistics",
    image: "/assets/images/engineer-capsule.jpg",
    experience: "8+ Years Experience",
    bio: "Supervises genuine European & American spare parts inventories, ensuring prompt distribution of genuine Fleetguard filters, AVRs, and gaskets.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      instagram: "https://instagram.com",
    },
  },
];

// --- CLIENT LOGOS DATA ---
const CLIENT_LOGOS = [
  { name: "Swiss Power", src: "/assets/images/about/about_img_14.svg" },
  { name: "Alaska Industrial", src: "/assets/images/about/about_img_15.svg" },
  { name: "Berlin Systems", src: "/assets/images/about/about_img_16.svg" },
  { name: "Cairo Power", src: "/assets/images/about/about_img_17.svg" },
  { name: "Theo Dynamics", src: "/assets/images/about/about_img_18.svg" },
  { name: "Kobe Power", src: "/assets/images/about/about_img_19.svg" },
  { name: "On_Event Energy", src: "/assets/images/about/about_img_20.svg" },
  { name: "Oslo Engineering", src: "/assets/images/about/about_img_21.svg" },
  { name: "U-Turn Logistics", src: "/assets/images/about/about_img_22.svg" },
  { name: "Imprintify Manufacturing", src: "/assets/images/about/about_img_23.svg" },
];

// --- CERTIFICATIONS DATA ---
const CERTIFICATIONS = [
  {
    name: "Product of the Year",
    desc: "Industrial Power Reliability Award",
    icon: "/assets/images/about/about_img_24.svg",
  },
  {
    name: "ISO 9001:2015",
    desc: "Quality Management Certified",
    icon: "/assets/images/about/about_img_25.svg",
  },
  {
    name: "100% Quality Inspected",
    desc: "0-110% Load-Bank Certified",
    icon: "/assets/images/about/about_img_26.svg",
  },
  {
    name: "Quality & Safety Certified",
    desc: "Acoustic Attenuation & CE Compliant",
    icon: "/assets/images/about/about_img_27.svg",
  },
];

export default function AboutPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedQuoteSubject, setSelectedQuoteSubject] = useState("General Industrial Inquiry");
  const [activeLeaderIndex, setActiveLeaderIndex] = useState(0);

  const activeLeader = TEAM_MEMBERS[activeLeaderIndex];

  const handleOpenQuote = (subject?: string) => {
    if (subject) setSelectedQuoteSubject(subject);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-slate-900 flex flex-col font-sans selection:bg-primary/10 selection:text-primary">
      {/* Shared Site Header */}
      <Header activePath="about" onOpenQuote={() => handleOpenQuote("Request an Engineering Consultation")} />

      <main className="flex-1">
        {/* =========================================================
            SECTION 1: HERO SECTION (Exact Reference Match)
            ========================================================= */}
        <section className="relative pt-12 pb-14 sm:pb-20 bg-white border-b border-slate-200/80 overflow-hidden">
          {/* Subtle Vertical Blueprint Grid Lines */}
          <div className="absolute inset-0 max-w-[1400px] mx-auto px-6 sm:px-10 pointer-events-none z-0 hidden lg:block">
            <div className="w-full h-full border-x border-slate-200/50 grid grid-cols-6 divide-x divide-slate-200/50" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </li>
                <li className="text-slate-900 font-bold" aria-current="page">
                  About us
                </li>
              </ol>
            </nav>

            {/* Centered Pill Badge */}
            <div className="flex justify-center mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-800 shadow-xs">
                <span className="w-2 h-2 rounded-[2px] bg-primary shrink-0" />
                <span>Who we are</span>
              </div>
            </div>

            {/* Giant Centered Headline */}
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold text-slate-950 text-center tracking-tight leading-[1.05] max-w-4xl mx-auto mb-12 sm:mb-16">
              About us
            </h1>

            {/* Sub-Header Row: Team Avatar Cluster & Coordinates */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100 mb-8 sm:mb-12">
              {/* Left: Avatar Cluster + Label */}
              <div className="flex items-center gap-4">
                <div className="flex items-center -space-x-2.5">
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-xs bg-slate-200 shrink-0">
                    <img
                      src="/assets/images/about/about_img_5.png"
                      alt="Power specialist"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-xs bg-slate-200 shrink-0">
                    <img
                      src="/assets/images/about/about_img_6.png"
                      alt="Operations engineer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-xs bg-slate-200 shrink-0">
                    <img
                      src="/assets/images/about/about_img_7.png"
                      alt="Quality engineer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-xs bg-slate-200 shrink-0">
                    <img
                      src="/assets/images/about/about_img_8.png"
                      alt="Field engineer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-950 text-white font-heading font-extrabold text-xs flex items-center justify-center shadow-xs shrink-0">
                    10+
                  </div>
                </div>

                <div className="text-left">
                  <p className="text-xs sm:text-sm font-bold text-slate-950 leading-tight">
                    Team of passionate
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    power professionals
                  </p>
                </div>
              </div>

              {/* Right: Coordinates / Headquarters Marker */}
              <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate-500 bg-slate-50 px-3.5 py-1.5 rounded-sm border border-slate-200/70">
                <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>23.8103° N, 90.4125° E — DHAKA, BANGLADESH</span>
              </div>
            </div>

            {/* Split Banner: Industrial Facility Image + Red Content Block */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-md overflow-hidden border border-slate-200/80 shadow-[0_16px_40px_rgba(15,23,42,0.06)] bg-white">
              {/* Left Column (60%): Facility Architecture Image */}
              <div className="lg:col-span-7 xl:col-span-7 relative min-h-[340px] sm:min-h-[440px] lg:min-h-[500px] overflow-hidden bg-slate-900 group">
                <img
                  src="/assets/images/about/about_img_10.png"
                  alt="Diesel Generator Warehouse Manufacturing and Assembly Plant"
                  className="w-full h-full object-cover object-center brightness-[0.98] contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
                  <span className="inline-block text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-xs border border-white/20 mb-2">
                    Central Distribution & Testing Facility
                  </span>
                  <p className="font-heading text-lg sm:text-xl font-bold leading-tight">
                    Diesel Generator Warehouse • 40,000+ Sq. Ft. Heavy Assembly & Rigging Floor
                  </p>
                </div>
              </div>

              {/* Right Column (40%): Primary Red Content Block */}
              <div className="lg:col-span-5 xl:col-span-5 bg-gradient-to-br from-primary via-[#E00501] to-primary-dark text-white p-7 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
                {/* Background Diagonal Watermark Lines */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 24px)",
                  }}
                />

                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                    <Sparkles className="w-3 h-3 text-white" />
                    <span>Industrial Power Specialists</span>
                  </div>

                  <p className="text-white/95 text-base sm:text-lg lg:text-[19px] leading-relaxed font-normal">
                    We are a team dedicated to heavy-duty power engineering, delivering robust diesel generator solutions that shape infrastructure, industrial factories, and critical healthcare nationwide.
                  </p>

                  <p className="text-white/85 text-sm sm:text-base leading-relaxed">
                    Our journey is defined by verified genuine OEM powertrains (Perkins UK, Cummins USA, Baudouin France), soundproof canopy fabrication, and 24/7 rapid after-sales engineering across Bangladesh.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="relative z-10 pt-8 sm:pt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="#experts"
                    className="inline-flex items-center gap-3 bg-slate-950 hover:bg-black text-white font-semibold text-sm px-6 py-3.5 rounded-sm shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer group"
                  >
                    <span>Meet our team</span>
                    <div className="w-6 h-6 rounded-xs bg-primary flex items-center justify-center transition-transform group-hover:translate-x-1">
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </a>

                  <button
                    onClick={() => handleOpenQuote("Request Corporate Profile & Brochure")}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors py-3 px-2 cursor-pointer group"
                  >
                    <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                    <span className="underline underline-offset-4 decoration-white/40 group-hover:decoration-white">
                      Download brochure
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: MARQUEE TICKER (Smooth Infinite Scroll)
            ========================================================= */}
        <section className="bg-gradient-to-r from-primary via-[#E00501] to-primary-dark text-white py-3.5 sm:py-4 overflow-hidden border-y border-red-700/60 shadow-inner select-none">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 24,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex w-max font-heading font-extrabold text-sm sm:text-base tracking-widest uppercase whitespace-nowrap"
          >
            {/* Primary Track */}
            <div className="flex items-center shrink-0">
              {[
                "SINCE 2010",
                "15+ YEARS OF POWER EXCELLENCE",
                "1,500+ DIESEL GENERATORS DEPLOYED",
                "GENUINE UK & USA ENGINES",
                "24/7 SUPPORT ACROSS BANGLADESH",
                "ISO 9001:2015 CERTIFIED",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 sm:gap-8 mx-4 sm:mx-6">
                  <span>{item}</span>
                  <span className="w-2 h-2 rounded-full bg-white/70 shrink-0" />
                </div>
              ))}
            </div>

            {/* Seamless Duplicate Track for Infinite Loop */}
            <div className="flex items-center shrink-0" aria-hidden="true">
              {[
                "SINCE 2010",
                "15+ YEARS OF POWER EXCELLENCE",
                "1,500+ DIESEL GENERATORS DEPLOYED",
                "GENUINE UK & USA ENGINES",
                "24/7 SUPPORT ACROSS BANGLADESH",
                "ISO 9001:2015 CERTIFIED",
              ].map((item, idx) => (
                <div key={`dup-${idx}`} className="flex items-center gap-6 sm:gap-8 mx-4 sm:mx-6">
                  <span>{item}</span>
                  <span className="w-2 h-2 rounded-full bg-white/70 shrink-0" />
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* =========================================================
            SECTION 3: OUR JOURNEY & CAPABILITIES (Exact Framer Layout)
            ========================================================= */}
        <section className="py-16 sm:py-24 bg-[#FBFBFA] border-b border-slate-200/80">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
            {/* Tag + Main Heading */}
            <div className="mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-800 mb-4 shadow-xs">
                <span className="w-2 h-2 rounded-[2px] bg-primary shrink-0" />
                <span>Our journey</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-5xl lg:text-[56px] font-bold text-slate-950 leading-[1.1] tracking-tight max-w-4xl">
                Engineering trust and{" "}
                <span className="text-primary">quality</span> through years of
                industrial power experience
              </h2>
            </div>

            {/* 3-Column Grid: Founder Card | Our Story | Our Capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Column 1 (4 cols): Founder / CEO Portrait Card */}
              <div className="lg:col-span-4 relative rounded-md overflow-hidden shadow-lg border border-slate-200/80 bg-slate-950 group min-h-[380px] flex flex-col justify-end">
                <img
                  src="/assets/images/about/about_img_12.png"
                  alt="Michael Bennett - Founder & CEO"
                  className="absolute inset-0 w-full h-full object-cover object-top brightness-[0.95] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                <div className="relative z-10 p-6 text-white">
                  <div className="w-7 h-[3px] bg-primary rounded-full mb-3" />
                  <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight">
                    Engr. Michael Bennett
                  </h3>
                  <p className="text-sm font-medium text-slate-300">
                    Founder & Managing Director
                  </p>
                  <p className="text-xs text-slate-400 mt-2 font-mono">
                    B.Sc. Mechanical Engineering (BUET), M.Sc. Power Systems
                  </p>
                </div>
              </div>

              {/* Column 2 (4 cols): Our Story */}
              <div className="lg:col-span-4 bg-white p-7 sm:p-9 rounded-md border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-[2px] bg-primary" />
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                      Our story
                    </h3>
                  </div>

                  <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                    <p>
                      We started with a vision to redefine generator distribution standards and provide power solutions that industrial facilities can rely on 24 hours a day.
                    </p>
                    <p>
                      Over the years, we have grown into a multidisciplinary team of 10+ certified engineers equipped with high-precision load banks, genuine OEM diagnostic scanners, and specialized rigging equipment.
                    </p>
                    <p>
                      What drives us is not just delivering diesel gensets, but guaranteeing uptime — ensuring that every generator we commission protects our client’s machinery, production schedules, and business continuity.
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>HEADQUARTERS: TEJGAON I/A, DHAKA</span>
                  <span className="text-primary font-bold">EST. 2010</span>
                </div>
              </div>

              {/* Column 3 (4 cols): Our Capabilities */}
              <div className="lg:col-span-4 bg-white p-7 sm:p-9 rounded-md border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-[2px] bg-primary" />
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                      Our capabilities
                    </h3>
                  </div>

                  {/* Capabilities List with Interactive Rows */}
                  <div className="divide-y divide-slate-100">
                    {[
                      { title: "Turnkey Generator Installation", href: "/products" },
                      { title: "Soundproof Canopy Fabrication", href: "/#capabilities" },
                      { title: "ATS & Synchronizing Panels", href: "/calculator" },
                      { title: "Genuine European Engine Imports", href: "/brands" },
                      { title: "24/7 Maintenance & AMCs", href: "/blog" },
                    ].map((cap, idx) => (
                      <Link
                        key={idx}
                        href={cap.href}
                        className="group flex items-center justify-between py-3.5 text-sm sm:text-base font-semibold text-slate-800 hover:text-primary transition-colors"
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-xs font-mono text-slate-400 group-hover:text-primary transition-colors">
                            0{idx + 1}
                          </span>
                          <span>{cap.title}</span>
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href="/products"
                    className="w-full inline-flex items-center justify-between bg-slate-950 hover:bg-black text-white font-semibold text-sm px-5 py-3 rounded-sm transition-colors group cursor-pointer"
                  >
                    <span>View all capabilities</span>
                    <div className="w-6 h-6 rounded-xs bg-primary flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: TRUSTED BY INDUSTRY LEADERS (Client Logos Grid)
            ========================================================= */}
        <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
            {/* Section Tag + Heading */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-800 mb-3.5 shadow-xs">
                <span className="w-2 h-2 rounded-[2px] bg-primary shrink-0" />
                <span>Our clients</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-bold text-slate-950 tracking-tight leading-tight">
                Trusted by <span className="text-primary">industry</span> leaders
              </h2>
            </div>

            {/* 5x2 Client Logos Grid (Matching Framer Template) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {CLIENT_LOGOS.map((client, idx) => (
                <div
                  key={idx}
                  className="h-24 sm:h-28 bg-[#FBFBFA] hover:bg-white rounded-md border border-slate-200/70 hover:border-slate-300 flex items-center justify-center p-6 shadow-xs hover:shadow-md transition-all duration-200 group"
                >
                  <img
                    src={client.src}
                    alt={client.name}
                    className="max-h-8 sm:max-h-9 w-auto object-contain opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-200 filter contrast-125"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: EXCELLENCE & RECOGNITION (Awards + Big Stat Banner)
            ========================================================= */}
        <section className="py-16 sm:py-24 bg-[#FBFBFA] border-b border-slate-200/80">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
            {/* Top Row: Milestone Title + 4 Certification Badges */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10 sm:mb-12">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 tracking-tight leading-tight max-w-xl">
                  <span className="text-primary font-extrabold">15+ Years</span> of
                  power engineering excellence & recognition
                </h2>
              </div>

              {/* 4 Certification Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full lg:w-auto">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center p-3 sm:p-4 bg-white rounded-md border border-slate-200/80 shadow-xs"
                  >
                    <img
                      src={cert.icon}
                      alt={cert.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 object-contain mb-2"
                    />
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                      {cert.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                      {cert.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Giant Full-Width Industrial Banner (Matching Reference) */}
            <div className="relative rounded-md overflow-hidden min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] shadow-2xl border border-slate-900 flex flex-col justify-between p-6 sm:p-12 lg:p-16 text-white group">
              <img
                src="/assets/images/about/about_img_28.jpg"
                alt="Industrial Heavy Manufacturing Floor and Molten Steel Operations"
                className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.82] contrast-[1.1] transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/30 pointer-events-none" />

              {/* Top Accent Text */}
              <div className="relative z-10 max-w-2xl">
                <div className="flex items-start gap-4">
                  <span className="w-1 h-14 bg-primary rounded-full shrink-0" />
                  <p className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold leading-[1.15] tracking-tight">
                    Delivering reliable power across industries and borders.
                  </p>
                </div>
              </div>

              {/* Bottom Right Giant Stat Counter */}
              <div className="relative z-10 flex flex-col items-start sm:items-end text-left sm:text-right mt-12 sm:mt-0">
                <span className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold leading-none tracking-tight text-white drop-shadow-md">
                  1,500+
                </span>
                <span className="text-sm sm:text-base font-semibold text-slate-200 mt-2 tracking-wide uppercase">
                  Heavy-Duty Diesel Generator Units Installed Nationwide
                </span>
                <span className="text-xs text-primary font-mono font-medium mt-1">
                  10 kVA TO 3,000 kVA SYNCHRONIZED POWER
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 6: MEET OUR EXPERTS (Interactive Master-Detail)
            ========================================================= */}
        <section id="experts" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
            {/* Section Tag + Heading */}
            <div className="mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-800 mb-4 shadow-xs">
                <span className="w-2 h-2 rounded-[2px] bg-primary shrink-0" />
                <span>Meet our experts</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-5xl lg:text-[56px] font-bold text-slate-950 leading-[1.1] tracking-tight max-w-3xl">
                Leaders in <span className="text-primary">precision</span> work
              </h2>
            </div>

            {/* Master-Detail Layout: Left Active Photo Card, Right 7 Interactive Rows */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column (5 cols): Dynamic Active Member Photo Card */}
              <div className="lg:col-span-5 sticky top-28">
                <div className="relative rounded-md overflow-hidden bg-slate-950 border border-slate-200/80 shadow-xl group">
                  <div className="aspect-[4/4.8] sm:aspect-[4/4.5] w-full relative overflow-hidden bg-slate-900">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeLeader.id}
                        src={activeLeader.image}
                        alt={activeLeader.name}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="w-full h-full object-cover object-top brightness-[0.98] contrast-[1.03]"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                  </div>

                  <div className="p-6 bg-white border-t border-slate-100">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-xs font-bold text-primary tracking-wide uppercase">
                        {activeLeader.department}
                      </span>
                      <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-xs">
                        {activeLeader.experience}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-950 leading-tight">
                      {activeLeader.name}
                    </h3>

                    <p className="text-sm font-semibold text-slate-700 mt-0.5">
                      {activeLeader.role}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3 border-t border-slate-100 pt-3">
                      {activeLeader.bio}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column (7 cols): Interactive List of 7 Team Members */}
              <div className="lg:col-span-7 divide-y divide-slate-200/80 border-y border-slate-200/80">
                {TEAM_MEMBERS.map((member, idx) => {
                  const isActive = idx === activeLeaderIndex;
                  return (
                    <div
                      key={member.id}
                      onMouseEnter={() => setActiveLeaderIndex(idx)}
                      onClick={() => setActiveLeaderIndex(idx)}
                      className={`group py-5 sm:py-6 px-3 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 cursor-pointer transition-all duration-200 rounded-sm ${
                        isActive
                          ? "bg-slate-50 text-slate-950 shadow-xs"
                          : "hover:bg-slate-50/70 text-slate-400"
                      }`}
                    >
                      {/* Name & Index */}
                      <div className="flex items-center gap-4 min-w-[200px]">
                        <span
                          className={`text-xs font-mono font-bold transition-colors ${
                            isActive ? "text-primary" : "text-slate-300 group-hover:text-slate-500"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <h3
                          className={`font-heading text-lg sm:text-xl font-bold transition-colors ${
                            isActive
                              ? "text-slate-950 font-extrabold"
                              : "text-slate-400 group-hover:text-slate-700"
                          }`}
                        >
                          {member.name}
                        </h3>
                      </div>

                      {/* Job Position */}
                      <div className="sm:text-center flex-1">
                        <p
                          className={`text-xs sm:text-sm font-medium transition-colors ${
                            isActive
                              ? "text-slate-700 font-semibold"
                              : "text-slate-400 group-hover:text-slate-600"
                          }`}
                        >
                          {member.role}
                        </p>
                      </div>

                      {/* Social Icons */}
                      <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
                        {member.socials.linkedin && (
                          <a
                            href={member.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on LinkedIn`}
                            className="w-8 h-8 rounded-xs border border-slate-200 hover:border-primary flex items-center justify-center text-slate-400 hover:text-primary transition-colors bg-white shadow-2xs"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <IconLinkedIn />
                          </a>
                        )}
                        {member.socials.twitter && (
                          <a
                            href={member.socials.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on X`}
                            className="w-8 h-8 rounded-xs border border-slate-200 hover:border-primary flex items-center justify-center text-slate-400 hover:text-primary transition-colors bg-white shadow-2xs"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <IconX />
                          </a>
                        )}
                        {member.socials.instagram && (
                          <a
                            href={member.socials.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on Instagram`}
                            className="w-8 h-8 rounded-xs border border-slate-200 hover:border-primary flex items-center justify-center text-slate-400 hover:text-primary transition-colors bg-white shadow-2xs"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <IconInstagram />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 7: CORPORATE CALL-TO-ACTION (Power Your Plant)
            ========================================================= */}
        <section className="py-16 sm:py-20 bg-slate-950 text-white relative overflow-hidden">
          {/* Subtle Red Ambient Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.08] rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10">
            <div className="bg-gradient-to-r from-slate-900 to-slate-900/90 border border-slate-800 rounded-md p-8 sm:p-14 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
              <div className="space-y-4 max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-semibold text-primary-light">
                  <Zap className="w-3 h-3 text-primary" />
                  <span>Turnkey Power Solutions</span>
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight leading-tight">
                  Need an engineering assessment for your facility?
                </h2>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  Speak directly with our senior electrical and mechanical engineers to calculate accurate starting inrush loads, select genuine European engines, and design custom acoustic attenuation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
                <button
                  onClick={() => handleOpenQuote("Corporate Power Engineering Consultation")}
                  className="w-full sm:w-auto framer-btn-primary rounded-sm cursor-pointer justify-center"
                >
                  <span>Request free quote</span>
                  <div className="btn-arrow-box rounded-sm">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>

                <a
                  href="tel:+8801700000000"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm border border-slate-700 hover:border-slate-500 bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-xs"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span>Call 24/7 Hotline</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Site Footer */}
      <Footer />

      {/* Corporate RFQ Quote Modal */}
      {isQuoteOpen && (
        <QuoteModal
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
          defaultGeneratorName={selectedQuoteSubject}
        />
      )}
    </div>
  );
}
