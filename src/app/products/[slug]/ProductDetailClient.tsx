"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Download,
  Phone,
  Mail,
  CheckCircle,
  FileText,
  Shield,
  Zap,
  Sliders,
  Cpu,
  Layers,
  ArrowRight,
  Wrench,
  Check,
  Star,
  Fuel
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import { GeneratorProduct, PRODUCTS } from "@/data/products";

interface ProductDetailClientProps {
  product: GeneratorProduct;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  // Active Gallery Image
  const [activeImage, setActiveImage] = useState<string>(product.image);

  // Active Technical Spec Tab (Matching Reference Image 2)
  const [activeTab, setActiveTab] = useState<"engine" | "alternator" | "control" | "canopy" | "dimensions">("engine");

  // Quote Modal State
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // Related products
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans">
      <Navbar
        activePath="products"
        onOpenQuote={() => setIsQuoteOpen(true)}
      />

      {/* =========================================================
           TOP BREADCRUMBS & MODEL HEADER (IMAGE 2 LAYOUT)
           ========================================================= */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-4 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-[#F25A24] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href="/products" className="hover:text-[#F25A24] transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href={`/products?brand=${product.brand}`} className="hover:text-[#F25A24] transition-colors">
              {product.brand}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[#F25A24] font-semibold truncate max-w-[280px]">
              {product.name}
            </span>
          </nav>

          {/* Model Title Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#F25A24]/10 text-[#F25A24] border border-[#F25A24]/20">
                  {product.brand} Genuine Series
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-slate-100 text-slate-700 border border-slate-200">
                  {product.type}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                  In Warehouse Stock
                </span>
              </div>
              <h1 className="font-heading text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
                {product.name}
              </h1>
            </div>

            {/* Quick Pricing Badge */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Direct Warehouse Pricing</span>
                <span className="text-xl sm:text-2xl font-black text-[#F25A24] font-heading">
                  {product.priceText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
           HERO SPLIT DETAILS VIEW (MATCHING REFERENCE IMAGE 2)
           ========================================================= */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT: Product Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Image Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] overflow-hidden group">
              <img
                src={activeImage}
                alt={product.name}
                className="max-h-[380px] sm:max-h-[420px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />

              {/* Noise Level Badge Overlay */}
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl font-mono flex items-center gap-2 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{product.noiseLevel}</span>
              </div>

              {/* Watermark brand tag */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-mono font-bold px-3 py-1 rounded-lg border border-slate-200 shadow-xs uppercase">
                {product.brandBadgeText}
              </div>
            </div>

            {/* Thumbnail Gallery Strip */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-2xl bg-white p-2 border-2 transition-all flex items-center justify-center shrink-0 overflow-hidden cursor-pointer ${
                    activeImage === img ? "border-[#F25A24] shadow-md scale-105" : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`View angle ${idx + 1}`} className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Power Matrix & CTAs (5 Cols - Matching Image 2) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Power Matrix Table (Exact Match to Image 2 APD 110 A Top Table) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-[#0E1014] text-white px-5 py-3 flex items-center justify-between">
                <div className="font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#F25A24]" />
                  Power Output Matrix (50 Hz)
                </div>
                <span className="text-[10px] font-mono text-slate-400">PF: 0.8 Lagging</span>
              </div>

              <div className="p-4 sm:p-5">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-mono text-[11px] uppercase">
                      <th className="text-left pb-2 font-semibold">Rating</th>
                      <th className="text-center pb-2 font-semibold">kVA</th>
                      <th className="text-center pb-2 font-semibold">kW</th>
                      <th className="text-right pb-2 font-semibold">Current (A)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    <tr>
                      <td className="py-3 text-slate-700 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#F25A24]" />
                        <strong>Standby Power</strong>
                      </td>
                      <td className="py-3 text-center text-slate-950 font-bold text-sm">
                        {product.standbyKva}
                      </td>
                      <td className="py-3 text-center text-slate-950 font-bold text-sm">
                        {product.standbyKw}
                      </td>
                      <td className="py-3 text-right text-slate-600 font-mono">
                        {Math.round((product.standbyKva * 1000) / (400 * 1.732))} A
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-slate-700 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                        <strong>Prime Power</strong>
                      </td>
                      <td className="py-3 text-center text-slate-950 font-bold text-sm">
                        {product.primeKva}
                      </td>
                      <td className="py-3 text-center text-slate-950 font-bold text-sm">
                        {product.primeKw}
                      </td>
                      <td className="py-3 text-right text-slate-600 font-mono">
                        {Math.round((product.primeKva * 1000) / (400 * 1.732))} A
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* General Features List (Matching Image 2 General Features block) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-heading font-black text-sm text-slate-950 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#F25A24]" />
                General System Features
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {product.generalFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F25A24] mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons: Get Quote & Download Datasheet (Matching Image 2) */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="w-full framer-btn-primary justify-center py-3.5 text-sm font-bold shadow-md cursor-pointer"
              >
                <span>Get an Official Quote</span>
                <div className="btn-arrow-box">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`#documents`}
                  className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#F25A24]" />
                  <span>Download Spec</span>
                </a>

                <a
                  href="tel:+8801234567890"
                  className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call 24/7 Desk</span>
                </a>
              </div>
            </div>

            {/* Warehouse Stock Guarantee Card */}
            <div className="bg-[#FAFBFD] p-4 rounded-xl border border-slate-200/80 flex items-center gap-3 text-xs text-slate-600">
              <Shield className="w-5 h-5 text-[#F25A24] shrink-0" />
              <div>
                <strong className="text-slate-900 block font-semibold">1 Year / 1,000 Hours Warranty</strong>
                <span>Official factory replacement warranty with 24/7 on-site emergency mechanic support across Bangladesh.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
           PRODUCT FEATURES & TECHNICAL SPECIFICATIONS (IMAGE 2)
           ========================================================= */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-12 w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">

          {/* Section Heading */}
          <div className="border-b border-slate-200 pb-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Product Features & Technical Specifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Detailed engineering parameters for {product.name} (50 Hz, 400V/230V, Synchronous 1500 RPM).
            </p>

            {/* Horizontal Tabs (Matching Image 2: [Diesel Engine] [Electrical] [Control Panel] [Canopy]) */}
            <div className="flex items-center gap-2 overflow-x-auto pt-6 scrollbar-none">
              <button
                onClick={() => setActiveTab("engine")}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "engine"
                    ? "bg-[#0E1014] text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-[#F25A24]" />
                <span>Diesel Engine System</span>
              </button>

              <button
                onClick={() => setActiveTab("alternator")}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "alternator"
                    ? "bg-[#0E1014] text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-[#F25A24]" />
                <span>Electrical Alternator</span>
              </button>

              <button
                onClick={() => setActiveTab("control")}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "control"
                    ? "bg-[#0E1014] text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-[#F25A24]" />
                <span>Control & ATS Module</span>
              </button>

              <button
                onClick={() => setActiveTab("canopy")}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "canopy"
                    ? "bg-[#0E1014] text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#F25A24]" />
                <span>Canopy & Soundproof Enclosure</span>
              </button>

              <button
                onClick={() => setActiveTab("dimensions")}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "dimensions"
                    ? "bg-[#0E1014] text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Fuel className="w-3.5 h-3.5 text-[#F25A24]" />
                <span>Dimensions & Fuel Capacity</span>
              </button>
            </div>
          </div>

          {/* Active Specification Table (Exact Layout to Reference Image 2 Table) */}
          <div className="overflow-x-auto">
            {activeTab === "engine" && (
              <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-[#FAFBFD] text-slate-500 font-mono uppercase text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-5 font-bold w-1/3">Engine Parameter</th>
                    <th className="py-3 px-5 font-bold">Factory Engineering Specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Manufacturer / Brand</td>
                    <td className="py-3 px-5 text-slate-900 font-bold">{product.specs.engineBrand}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-[#FAFBFD]/50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Engine Model Number</td>
                    <td className="py-3 px-5 text-slate-900 font-mono font-bold text-[#F25A24]">{product.specs.engineModel}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Cylinder Arrangement</td>
                    <td className="py-3 px-5 text-slate-900">{product.specs.engineCylinders}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-[#FAFBFD]/50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Air Intake Aspiration</td>
                    <td className="py-3 px-5 text-slate-900">{product.specs.aspiration}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Bore and Stroke</td>
                    <td className="py-3 px-5 text-slate-900 font-mono">{product.specs.boreStroke}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-[#FAFBFD]/50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Total Displacement</td>
                    <td className="py-3 px-5 text-slate-900 font-mono">{product.specs.displacementL}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Compression Ratio</td>
                    <td className="py-3 px-5 text-slate-900 font-mono">{product.specs.compressionRatio}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-[#FAFBFD]/50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Rated Operating Speed</td>
                    <td className="py-3 px-5 text-slate-900 font-mono font-bold">{product.specs.speedRpm} RPM (50 Hz)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Governor System</td>
                    <td className="py-3 px-5 text-slate-900">{product.specs.governorType}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-[#FAFBFD]/50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Cooling Medium</td>
                    <td className="py-3 px-5 text-slate-900">{product.specs.coolingMethod}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Engine Lubricating Oil Capacity</td>
                    <td className="py-3 px-5 text-slate-900 font-mono">{product.specs.oilCapacityL}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-[#FAFBFD]/50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Coolant System Capacity</td>
                    <td className="py-3 px-5 text-slate-900 font-mono">{product.specs.coolantCapacityL}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Fuel Consumption @ 100% Load</td>
                    <td className="py-3 px-5 text-slate-900 font-mono font-bold">{product.specs.fuelCons100}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-[#FAFBFD]/50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Fuel Consumption @ 75% Load</td>
                    <td className="py-3 px-5 text-slate-900 font-mono font-bold text-emerald-700">{product.specs.fuelCons75}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Fuel Consumption @ 50% Load</td>
                    <td className="py-3 px-5 text-slate-900 font-mono">{product.specs.fuelCons50}</td>
                  </tr>
                </tbody>
              </table>
            )}

            {activeTab === "alternator" && (
              <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-[#FAFBFD] text-slate-500 font-mono uppercase text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-5 font-bold w-1/3">Alternator Parameter</th>
                    <th className="py-3 px-5 font-bold">Factory Engineering Specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Alternator Manufacturer</td>
                    <td className="py-3 px-5 text-slate-900 font-bold">{product.specs.alternatorBrand}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-[#FAFBFD]/50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Alternator Model</td>
                    <td className="py-3 px-5 text-slate-900 font-mono font-bold text-[#F25A24]">{product.specs.alternatorModel}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Number of Phases & Poles</td>
                    <td className="py-3 px-5 text-slate-900 font-mono">3 Phase 4 Wires, 4 Poles</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-[#FAFBFD]/50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Insulation Class</td>
                    <td className="py-3 px-5 text-slate-900 font-bold">{product.specs.insulationClass}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Protection Ingress Rating</td>
                    <td className="py-3 px-5 text-slate-900 font-mono">{product.specs.protectionDegree}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-[#FAFBFD]/50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Steady State Voltage Regulation</td>
                    <td className="py-3 px-5 text-slate-900 font-mono font-bold text-emerald-700">{product.specs.voltageRegulation}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Power Factor</td>
                    <td className="py-3 px-5 text-slate-900 font-mono">{product.specs.powerFactor}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-[#FAFBFD]/50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Excitation System</td>
                    <td className="py-3 px-5 text-slate-900">Brushless, Self-Excited with AVR</td>
                  </tr>
                </tbody>
              </table>
            )}

            {activeTab === "control" && (
              <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-[#FAFBFD] text-slate-500 font-mono uppercase text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-5 font-bold w-1/3">Control Parameter</th>
                    <th className="py-3 px-5 font-bold">Factory Engineering Specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Control Unit Manufacturer</td>
                    <td className="py-3 px-5 text-slate-900 font-bold">{product.specs.controllerBrand}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-[#FAFBFD]/50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Module Model</td>
                    <td className="py-3 px-5 text-slate-900 font-mono font-bold text-[#F25A24]">{product.specs.controllerModel}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Operation Modes</td>
                    <td className="py-3 px-5 text-slate-900">Auto Mains Failure (AMF), Manual, Remote Start, Test</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-[#FAFBFD]/50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Display Type</td>
                    <td className="py-3 px-5 text-slate-900">Backlit Graphical LCD with Multi-Lingual Support</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Automatic Protection Trips</td>
                    <td className="py-3 px-5 text-slate-900">Low Oil Pressure, High Coolant Temp, Over/Under Speed, Over/Under Voltage, Battery Charge Fail</td>
                  </tr>
                </tbody>
              </table>
            )}

            {activeTab === "canopy" && (
              <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-[#FAFBFD] text-slate-500 font-mono uppercase text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-5 font-bold w-1/3">Enclosure Parameter</th>
                    <th className="py-3 px-5 font-bold">Factory Engineering Specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Canopy Build Type</td>
                    <td className="py-3 px-5 text-slate-900 font-bold">{product.type}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-[#FAFBFD]/50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Acoustic Sound Level</td>
                    <td className="py-3 px-5 text-slate-900 font-bold text-[#F25A24] font-mono">{product.noiseLevel}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Sheet Metal Thickness</td>
                    <td className="py-3 px-5 text-slate-900">2.5 mm Cold Rolled Steel with Electrostatic Powder Coating</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-[#FAFBFD]/50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Sound Insulation Lining</td>
                    <td className="py-3 px-5 text-slate-900">High-Density Flame-Retardant Mineral Rockwool (Class A1)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Exhaust System</td>
                    <td className="py-3 px-5 text-slate-900">Internal Industrial Critical Silencer with Rain Cap</td>
                  </tr>
                </tbody>
              </table>
            )}

            {activeTab === "dimensions" && (
              <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-[#FAFBFD] text-slate-500 font-mono uppercase text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-5 font-bold w-1/3">Physical Dimension Parameter</th>
                    <th className="py-3 px-5 font-bold">Factory Engineering Specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Overall Dimensions (L x W x H)</td>
                    <td className="py-3 px-5 text-slate-900 font-mono font-bold">{product.specs.dimensionsMm}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-[#FAFBFD]/50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Dry Operating Weight</td>
                    <td className="py-3 px-5 text-slate-900 font-mono font-bold text-[#F25A24]">{product.specs.weightKg} kg</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Standard Base Fuel Tank Capacity</td>
                    <td className="py-3 px-5 text-slate-900 font-mono font-bold">{product.fuelCapacity}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-[#FAFBFD]/50">
                    <td className="py-3 px-5 font-semibold text-slate-700">Lifting & Handling</td>
                    <td className="py-3 px-5 text-slate-900">Integrated Central Crane Lifting Eyelet & Forklift Pockets</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
           OPTIONAL EQUIPMENT (MATCHING REFERENCE IMAGE 2)
           ========================================================= */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-6 w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Optional Equipment & Custom Upgrades
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Engineered accessories readily integrated at our Dhaka central workshop prior to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.optionalEquipment.map((opt, idx) => (
              <div
                key={idx}
                className="bg-[#FAFBFD] p-5 rounded-2xl border border-slate-200 hover:border-[#F25A24]/50 transition-all space-y-2 group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 group-hover:bg-[#F25A24] transition-colors flex items-center justify-center text-white shrink-0">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-bold text-sm text-slate-900">
                    {opt.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-10">
                  {opt.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
           CERTIFICATES & QUALITY STANDARDS (MATCHING IMAGE 2)
           ========================================================= */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-6 w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#F25A24]" />
            <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Certificates & Compliance Standards
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            All diesel generator units supplied by Diesel Generator Warehouse are fully factory-tested under simulated full load resistive test benches and strictly certified to international electrical and safety benchmarks:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {product.certificates.map((cert, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 bg-[#FAFBFD] px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
              >
                <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
           DOWNLOAD TECHNICAL DOCUMENTS (MATCHING REFERENCE IMAGE 2)
           ========================================================= */}
      <section id="documents" className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-6 w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#F25A24]" />
            <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Download Technical Documentation
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {product.documents.map((doc, idx) => (
              <div
                key={idx}
                className="bg-[#FAFBFD] p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-1">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-mono font-bold text-xs mb-3">
                    PDF
                  </div>
                  <h3 className="font-heading font-bold text-xs text-slate-900 leading-snug">
                    {doc.title}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 block">
                    {doc.code} • {doc.fileSize}
                  </span>
                </div>

                <button
                  onClick={() => alert(`Starting download for ${doc.title}...`)}
                  className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-[#F25A24] text-white py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
           RELATED / RECOMMENDED GENERATORS
           ========================================================= */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-12 w-full">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="framer-badge mb-2">
                <span className="framer-badge-dot" />
                <span>Warehouse Recommendations</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Similar Diesel Generators in Stock
              </h2>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-[#F25A24] transition-colors"
            >
              <span>View all warehouse models</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="bg-[#FAFBFD] p-5 h-48 flex items-center justify-center border-b border-slate-100 overflow-hidden relative">
                    <span className="absolute top-3 right-3 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                      {rel.brandBadgeText}
                    </span>
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5 space-y-3">
                    <Link href={`/products/${rel.slug}`}>
                      <h3 className="font-heading font-bold text-sm text-slate-950 group-hover:text-[#F25A24] transition-colors line-clamp-2 min-h-[40px]">
                        {rel.name}
                      </h3>
                    </Link>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#F1F3F5] rounded-lg py-1.5 px-2 text-center text-xs">
                        <strong className="block text-slate-950 font-black">{rel.standbyKva} kVA</strong>
                        <span className="text-[10px] text-slate-500 font-mono">Standby</span>
                      </div>
                      <div className="bg-[#F1F3F5] rounded-lg py-1.5 px-2 text-center text-xs">
                        <strong className="block text-slate-950 font-black">{rel.primeKva} kVA</strong>
                        <span className="text-[10px] text-slate-500 font-mono">Prime</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={`/products/${rel.slug}`}
                    className="w-full flex items-center justify-center gap-1.5 bg-[#0E1014] hover:bg-[#F25A24] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-colors"
                  >
                    <span>View Specifications</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultGeneratorName={product.name}
        defaultKva={product.standbyKva}
      />
    </div>
  );
}
