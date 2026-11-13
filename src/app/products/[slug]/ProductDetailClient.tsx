"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  Download,
  Phone,
  FileText,
  Shield,
  Zap,
  ArrowRight,
  Check,
  Maximize2,
  X,
  VolumeX,
  Settings,
  ShieldCheck,
  Send,
  Home,
  Wrench
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ProductCard from "@/components/ProductCard";
import { GeneratorProduct, PRODUCTS } from "@/data/products";

interface ProductDetailClientProps {
  product: GeneratorProduct;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  // 4 Gallery Images
  const galleryList = useMemo(() => {
    const list = product.galleryImages && product.galleryImages.length > 0 ? [...product.galleryImages] : [product.image];
    if (!list.includes(product.image)) {
      list.unshift(product.image);
    }
    const extraAngles = [
      "/assets/images/gen-control-panel.jpg",
      "/assets/images/engine-circle.jpg",
      "/assets/images/canopy-white-20k.jpg"
    ];
    extraAngles.forEach((img) => {
      if (!list.includes(img) && list.length < 4) {
        list.push(img);
      }
    });
    return list.slice(0, 4);
  }, [product]);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = galleryList[activeImageIndex] || product.image;
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"specifications" | "features" | "optional" | "certificates">("specifications");

  // Quote Modal state
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // Gallery navigation
  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : galleryList.length - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev < galleryList.length - 1 ? prev + 1 : 0));
  };

  // Price formatting
  const formattedPrice = useMemo(() => {
    if (product.priceValueBDT) {
      return `BDT ${product.priceValueBDT.toLocaleString("en-IN")}`;
    }
    return product.priceText || "BDT 7,45,000";
  }, [product]);

  // Similar generators (4 items)
  const similarProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  }, [product.id]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#F25A24] selection:text-white">
      {/* Top Header */}
      <Header
        activePath="products"
        onOpenQuote={() => setIsQuoteOpen(true)}
      />

      <main className="max-w-[1240px] mx-auto px-4 py-6 sm:py-8 w-full flex-1 space-y-8 bg-white">

        {/* =========================================================
             1. BREADCRUMBS
             ========================================================= */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#F25A24] transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          <Link href="/products" className="hover:text-[#F25A24] transition-colors">
            Products
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          <Link href="/products" className="hover:text-[#F25A24] transition-colors">
            Diesel Generator
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          <Link href={`/products?brand=${product.brand}`} className="hover:text-[#F25A24] transition-colors">
            {product.brand} Generator
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="text-[#F25A24] font-semibold truncate max-w-[280px]">
            {product.name}
          </span>
        </nav>

        {/* =========================================================
             2. SHOWCASE: GALLERY (LEFT) + PRODUCT INFO & SPECS (RIGHT)
             ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT: Gallery (6 Cols) */}
          <div className="lg:col-span-6 space-y-3">
            {/* Main Image Box */}
            <div className="bg-slate-100 rounded-md border border-slate-200/90 shadow-2xs relative w-full h-[360px] sm:h-[440px] overflow-hidden group">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
              />

              {/* Expand Button */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-3.5 right-3.5 bg-white/90 hover:bg-white text-slate-700 hover:text-slate-950 p-2 rounded-sm border border-slate-200 shadow-2xs transition-colors cursor-pointer z-10"
                aria-label="Expand image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Prev / Next Controls */}
              {galleryList.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-white/90 hover:bg-white text-slate-700 shadow-sm border border-slate-200 flex items-center justify-center transition-all cursor-pointer z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-white/90 hover:bg-white text-slate-700 shadow-sm border border-slate-200 flex items-center justify-center transition-all cursor-pointer z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Exactly 4 Thumbnails */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {galleryList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-20 sm:h-24 rounded-md border transition-all overflow-hidden p-0 block cursor-pointer ${activeImageIndex === idx
                      ? "border-2 border-[#F25A24] shadow-xs"
                      : "border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100"
                    }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover block"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Price, Title, Description, Specs & Actions (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">

            {/* Price on the Top */}
            <div>
              <span className="text-xs font-medium text-slate-500 block">Price (Ex. VAT)</span>
              <div className="text-3xl sm:text-4xl font-bold text-[#F25A24] tracking-tight leading-none mt-1">
                {formattedPrice}
              </div>
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-950 tracking-tight leading-tight">
                {product.name}
              </h1>
              {/* Model & Engine Subtitle */}
              <div className="flex flex-wrap items-center gap-x-3 text-xs sm:text-[13px] text-slate-500 font-medium mt-1.5">
                <span><strong className="text-slate-800">Model:</strong> P-{product.primeKva}S</span>
                <span className="text-slate-300">|</span>
                <span><strong className="text-slate-800">Engine:</strong> {product.specs.engineBrand} {product.specs.engineModel}</span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              {product.shortDesc || "Reliable, compact and soundproof diesel generator for commercial and industrial applications."}
            </p>

            {/* Key Specifications Card (Matches Reference Image Exactly) */}
            <div className="bg-white rounded-md border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-3">
              {/* Header with Orange Vertical Bar */}
              <div className="flex items-center gap-2.5">
                <span className="w-1 h-5 rounded-sm bg-[#F25A24] shrink-0" />
                <h3 className="font-extrabold text-sm sm:text-base text-slate-950 tracking-tight">
                  Key Specifications
                </h3>
              </div>

              {/* 2-Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 text-xs sm:text-[13px]">
                {/* Left Column */}
                <div className="divide-y divide-slate-100">
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-slate-950">Prime Power</span>
                    <span className="font-medium text-slate-800 text-right">{product.primeKva} kVA ({product.primeKw} kW)</span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-slate-950">Standby Power</span>
                    <span className="font-medium text-slate-800 text-right">{product.standbyKva} kVA ({product.standbyKw} kW)</span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-slate-950">Frequency</span>
                    <span className="font-medium text-slate-800 text-right">{product.frequencyHz || 50} Hz</span>
                  </div>
                </div>

                {/* Right Column */}
                <div className="divide-y divide-slate-100">
                  <div className="py-2.5 flex items-start justify-between">
                    <span className="font-bold text-slate-950">Voltage</span>
                    <div className="font-medium text-slate-800 text-right leading-tight">
                      <div>400 / 230 V</div>
                      <div className="text-[11px] text-slate-500">(3-Phase)</div>
                    </div>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-slate-950">Engine</span>
                    <span className="font-medium text-slate-800 text-right">{product.specs.engineBrand} {product.specs.engineModel}</span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-slate-950">Canopy</span>
                    <span className="font-medium text-slate-800 text-right">{product.type === "Silent Canopy" ? "Silent / Weatherproof" : product.type}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="w-full bg-[#F25A24] hover:bg-[#d94815] text-white py-3.5 px-5 rounded-md font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => window.print()}
                  className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 py-2.5 px-3 rounded-md font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-700" />
                  <span>Download Spec (PDF)</span>
                </button>

                <a
                  href="tel:+8801234567890"
                  className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 py-2.5 px-3 rounded-md font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-slate-700" />
                  <span>Call 24/7 Support</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================
             4. TABS & MIDDLE SPECIFICATION CARD
             ========================================================= */}
        <div className="space-y-4 pt-2">

          {/* Segmented Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTab("specifications")}
              className={`px-5 py-2 rounded-sm font-bold text-xs sm:text-sm transition-all cursor-pointer ${activeTab === "specifications"
                  ? "bg-[#F25A24] text-white shadow-xs"
                  : "bg-transparent text-slate-600 hover:text-slate-950 font-semibold"
                }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`px-5 py-2 rounded-sm font-bold text-xs sm:text-sm transition-all cursor-pointer ${activeTab === "features"
                  ? "bg-[#F25A24] text-white shadow-xs"
                  : "bg-transparent text-slate-600 hover:text-slate-950 font-semibold"
                }`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab("optional")}
              className={`px-5 py-2 rounded-sm font-bold text-xs sm:text-sm transition-all cursor-pointer ${activeTab === "optional"
                  ? "bg-[#F25A24] text-white shadow-xs"
                  : "bg-transparent text-slate-600 hover:text-slate-950 font-semibold"
                }`}
            >
              Optional Equipment
            </button>
            <button
              onClick={() => setActiveTab("certificates")}
              className={`px-5 py-2 rounded-sm font-bold text-xs sm:text-sm transition-all cursor-pointer ${activeTab === "certificates"
                  ? "bg-[#F25A24] text-white shadow-xs"
                  : "bg-transparent text-slate-600 hover:text-slate-950 font-semibold"
                }`}
            >
              Certificates
            </button>
          </div>

          {/* Unified Middle Container */}
          <div className="bg-white rounded-md border border-slate-200/90 shadow-2xs p-6 sm:p-8 space-y-8">

            {/* TAB: SPECIFICATIONS */}
            {activeTab === "specifications" && (
              <>
                {/* Technical Specifications Header & Tables */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-1.5 rounded-sm bg-[#F25A24]" />
                    <h2 className="text-base sm:text-lg font-bold text-slate-950">
                      Technical Specifications
                    </h2>
                  </div>

                  {/* 2 Side-by-Side Tables */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Left Table */}
                    <div className="border border-slate-200/80 rounded-md overflow-hidden divide-y divide-slate-100 text-xs sm:text-[13px]">
                      <div className="grid grid-cols-2 py-2.5 px-4 bg-[#FAFBFD]">
                        <span className="font-medium text-slate-600">Model</span>
                        <span className="font-semibold text-slate-900">{product.name}</span>
                      </div>
                      <div className="grid grid-cols-2 py-2.5 px-4 bg-white">
                        <span className="font-medium text-slate-600">Rated Output (Prime)</span>
                        <span className="font-semibold text-slate-900">{product.primeKva} kVA / {product.primeKw} kW</span>
                      </div>
                      <div className="grid grid-cols-2 py-2.5 px-4 bg-[#FAFBFD]">
                        <span className="font-medium text-slate-600">Rated Output (Standby)</span>
                        <span className="font-semibold text-slate-900">{product.standbyKva} kVA / {product.standbyKw} kW</span>
                      </div>
                      <div className="grid grid-cols-2 py-2.5 px-4 bg-white">
                        <span className="font-medium text-slate-600">Power Factor</span>
                        <span className="font-semibold text-slate-900">{product.specs.powerFactor || "1.0"}</span>
                      </div>
                      <div className="grid grid-cols-2 py-2.5 px-4 bg-[#FAFBFD]">
                        <span className="font-medium text-slate-600">Engine Brand</span>
                        <span className="font-semibold text-slate-900">{product.specs.engineBrand}</span>
                      </div>
                      <div className="grid grid-cols-2 py-2.5 px-4 bg-white">
                        <span className="font-medium text-slate-600">Engine Model</span>
                        <span className="font-semibold text-slate-900">{product.specs.engineModel}</span>
                      </div>
                    </div>

                    {/* Right Table */}
                    <div className="border border-slate-200/80 rounded-md overflow-hidden divide-y divide-slate-100 text-xs sm:text-[13px]">
                      <div className="grid grid-cols-2 py-2.5 px-4 bg-[#FAFBFD]">
                        <span className="font-medium text-slate-600">Engine Type</span>
                        <span className="font-semibold text-slate-900">{product.specs.engineCylinders || "3-Cylinder, 4-Stroke"}</span>
                      </div>
                      <div className="grid grid-cols-2 py-2.5 px-4 bg-white">
                        <span className="font-medium text-slate-600">Cooling Method</span>
                        <span className="font-semibold text-slate-900">{product.specs.coolingMethod || "Water-Cooled"}</span>
                      </div>
                      <div className="grid grid-cols-2 py-2.5 px-4 bg-[#FAFBFD]">
                        <span className="font-medium text-slate-600">Displacement</span>
                        <span className="font-semibold text-slate-900">{product.specs.displacementL ? `${product.specs.displacementL} L` : "1.131 L"}</span>
                      </div>
                      <div className="grid grid-cols-2 py-2.5 px-4 bg-white">
                        <span className="font-medium text-slate-600">Fuel Consumption (75% Load)</span>
                        <span className="font-semibold text-slate-900">{product.specs.fuelCons75 || "≈ 2.1 L/h"}</span>
                      </div>
                      <div className="grid grid-cols-2 py-2.5 px-4 bg-[#FAFBFD]">
                        <span className="font-medium text-slate-600">Fuel Tank Capacity</span>
                        <span className="font-semibold text-slate-900">{product.fuelCapacity || "50 L"}</span>
                      </div>
                      <div className="grid grid-cols-2 py-2.5 px-4 bg-white">
                        <span className="font-medium text-slate-600">Dimensions (L × W × H)</span>
                        <span className="font-semibold text-slate-900">{product.specs.dimensionsMm}</span>
                      </div>
                      <div className="grid grid-cols-2 py-2.5 px-4 bg-[#FAFBFD]">
                        <span className="font-medium text-slate-600">Weight (Dry)</span>
                        <span className="font-semibold text-slate-900">≈ {product.specs.weightKg} kg</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Features (4 Cards Row) */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-1.5 rounded-sm bg-[#F25A24]" />
                    <h2 className="text-base sm:text-lg font-bold text-slate-950">
                      Key Features
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Feature 1 */}
                    <div className="bg-[#FAFBFD] p-4 rounded-md border border-slate-200/80 flex items-start gap-3">
                      <div className="w-9 h-9 rounded-sm bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                        <Settings className="w-4.5 h-4.5 text-[#F25A24]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                          Reliable {product.specs.engineBrand} Engine
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          Durable and fuel efficient.
                        </p>
                      </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-[#FAFBFD] p-4 rounded-md border border-slate-200/80 flex items-start gap-3">
                      <div className="w-9 h-9 rounded-sm bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                        <VolumeX className="w-4.5 h-4.5 text-[#F25A24]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                          Silent Operation
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          Soundproof canopy for low noise.
                        </p>
                      </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-[#FAFBFD] p-4 rounded-md border border-slate-200/80 flex items-start gap-3">
                      <div className="w-9 h-9 rounded-sm bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                        <Zap className="w-4.5 h-4.5 text-[#F25A24]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                          ATS Compatible
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          Seamless power transfer.
                        </p>
                      </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-[#FAFBFD] p-4 rounded-md border border-slate-200/80 flex items-start gap-3">
                      <div className="w-9 h-9 rounded-sm bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4.5 h-4.5 text-[#F25A24]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                          Factory Tested
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          Load bank certified for performance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* TAB: FEATURES */}
            {activeTab === "features" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-1.5 rounded-sm bg-[#F25A24]" />
                  <h2 className="text-base sm:text-lg font-bold text-slate-950">
                    Comprehensive System Features
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.generalFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-[#FAFBFD] p-4 rounded-md border border-slate-200/80">
                      <Check className="w-4 h-4 text-[#F25A24] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: OPTIONAL EQUIPMENT */}
            {activeTab === "optional" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-1.5 rounded-sm bg-[#F25A24]" />
                  <h2 className="text-base sm:text-lg font-bold text-slate-950">
                    Optional Equipment & Upgrades
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {product.optionalEquipment.map((opt, idx) => (
                    <div key={idx} className="bg-[#FAFBFD] p-5 rounded-md border border-slate-200/80 space-y-2">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <Wrench className="w-4 h-4 text-[#F25A24]" />
                        <span>{opt.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CERTIFICATES */}
            {activeTab === "certificates" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-1.5 rounded-sm bg-[#F25A24]" />
                  <h2 className="text-base sm:text-lg font-bold text-slate-950">
                    Compliance & Quality Certificates
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {product.certificates.map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 bg-[#FAFBFD] px-4 py-3 rounded-md border border-slate-200 text-xs font-semibold text-slate-800">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* =========================================================
             5. TECHNICAL DOCUMENTS & WARRANTY CARDS
             ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Card: Technical Documents (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-md border border-slate-200/90 shadow-2xs p-6 space-y-4">
            <div className="flex items-center gap-2 text-slate-950 font-bold text-base">
              <FileText className="w-4 h-4 text-[#F25A24]" />
              <span>Technical Documents</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-md border border-slate-200/80 bg-[#FAFBFD] hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-xs bg-red-100 text-red-600 font-mono text-[10px] font-bold">
                    PDF
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Technical Datasheet
                    </h4>
                    <span className="text-[11px] text-slate-400">1.2 MB · PDF</span>
                  </div>
                </div>
                <button
                  onClick={() => window.print()}
                  className="p-2 text-slate-500 hover:text-[#F25A24] transition-colors cursor-pointer"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-md border border-slate-200/80 bg-[#FAFBFD] hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-xs bg-red-100 text-red-600 font-mono text-[10px] font-bold">
                    PDF
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Operation & Maintenance Manual
                    </h4>
                    <span className="text-[11px] text-slate-400">3.8 MB · PDF</span>
                  </div>
                </div>
                <button
                  onClick={() => window.print()}
                  className="p-2 text-slate-500 hover:text-[#F25A24] transition-colors cursor-pointer"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Card: Warranty (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#FFF9F6] to-[#FFF1EB] rounded-md border border-orange-200/70 p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-6 -right-6 text-orange-400/15 pointer-events-none">
              <Shield className="w-40 h-40 stroke-[1.2]" />
            </div>

            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2 text-slate-950 font-bold text-base">
                <Shield className="w-4 h-4 text-[#F25A24]" />
                <span>Warranty</span>
              </div>

              <div className="pt-2">
                <div className="text-lg sm:text-xl font-bold text-slate-950 leading-tight">
                  12 months or 1,000 running hours
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                  On engine, alternator and major components.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* =========================================================
             6. SIMILAR GENERATORS
             ========================================================= */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-1.5 rounded-sm bg-[#F25A24]" />
              <h2 className="text-base sm:text-lg font-bold text-slate-950">
                Similar Generators
              </h2>
            </div>

            <Link
              href="/products"
              className="text-xs sm:text-sm font-semibold text-[#F25A24] hover:underline flex items-center gap-1"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer />

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-[#F25A24] p-2 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full flex items-center justify-center p-6 bg-white/5 rounded-md border border-white/10 min-h-[350px]">
              <img
                src={activeImage}
                alt={product.name}
                className="max-h-[75vh] max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

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
