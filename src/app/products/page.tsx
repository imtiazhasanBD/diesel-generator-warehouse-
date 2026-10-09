"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  ArrowRight,
  ChevronRight,
  Check,
  Zap,
  Fuel,
  Volume2,
  SlidersHorizontal,
  RotateCcw
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import { PRODUCTS, GeneratorProduct } from "@/data/products";

export default function ProductsPage() {
  // Filter & Sort State
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currency, setCurrency] = useState<"BDT" | "USD" | "GBP">("BDT");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Quote Modal State
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedQuoteProduct, setSelectedQuoteProduct] = useState<GeneratorProduct | null>(null);

  // Currency multiplier & format
  const formatPrice = (bdtPrice: number) => {
    if (currency === "USD") {
      return `$${Math.round(bdtPrice / 120).toLocaleString()}`;
    }
    if (currency === "GBP") {
      return `£${Math.round(bdtPrice / 155).toLocaleString()}`;
    }
    return `৳${bdtPrice.toLocaleString()}`;
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchBrand = selectedBrand === "All" || p.brand === selectedBrand;
      const matchType = selectedType === "All" || p.type === selectedType;
      const matchSearch =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${p.standbyKva}kva`.includes(searchQuery.toLowerCase().replace(/\s/g, ""));
      return matchBrand && matchType && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "kva-asc") return a.standbyKva - b.standbyKva;
      if (sortBy === "kva-desc") return b.standbyKva - a.standbyKva;
      if (sortBy === "price-asc") return a.priceValueBDT - b.priceValueBDT;
      if (sortBy === "price-desc") return b.priceValueBDT - a.priceValueBDT;
      return 0; // default order
    });
  }, [selectedBrand, selectedType, searchQuery, sortBy]);

  const brands = ["All", "Perkins", "Cummins", "FG Wilson", "Ricardo", "Aksa", "YorPower"];
  const types = ["All", "Silent Canopy", "Open Skid", "Portable"];

  const handleOpenQuote = (product?: GeneratorProduct) => {
    if (product) setSelectedQuoteProduct(product);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans">
      <Navbar
        activePath="products"
        onOpenQuote={() => handleOpenQuote()}
        onOpenSearch={() => {
          const searchInput = document.getElementById("product-search");
          if (searchInput) searchInput.focus();
        }}
      />

      {/* =========================================================
           TOP BANNER & BREADCRUMBS (MATCHING REFERENCE IMAGE 1)
           ========================================================= */}
      <section className="relative bg-[#0E1014] text-white overflow-hidden py-14 sm:py-20 border-b border-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: "url('/assets/images/industrial-site.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Diesel Generators for Sale
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mt-4 font-medium">
            <Link href="/" className="hover:text-[#F25A24] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link href="/products" className="text-white hover:text-[#F25A24] transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#F25A24]">Diesel Generators for Sale</span>
          </div>
        </div>
      </section>

      {/* =========================================================
           MAIN BROWSE & PRODUCTS GRID SECTION (IMAGE 1 LAYOUT)
           ========================================================= */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-10 sm:py-14 w-full flex-1">

        {/* Section Heading & Category Title (Matching Image 1) */}
        <div className="border-b border-slate-200 pb-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#F25A24] tracking-tight uppercase">
                BROWSE BY: DIESEL GENERATORS FOR SALE
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Showing 1-{filteredProducts.length} of {PRODUCTS.length} results
              </p>
            </div>

            {/* Currency & Sorting Controls */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Currency Selector */}
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold">
                <span className="text-slate-400 font-mono">Currency:</span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="BDT">BDT (৳)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>

              {/* Sorting Dropdown */}
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="default">Default sorting</option>
                  <option value="kva-asc">Sort by kVA: Low to High</option>
                  <option value="kva-desc">Sort by kVA: High to Low</option>
                  <option value="price-asc">Sort by Price: Low to High</option>
                  <option value="price-desc">Sort by Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Filter Pills Strip */}
          <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-6 border-t border-slate-100">
            {/* Brand Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-[#F25A24]" />
                Brand:
              </span>
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all shrink-0 cursor-pointer ${
                    selectedBrand === b
                      ? "bg-[#18181B] text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="product-search"
                type="text"
                placeholder="Search kVA, model, brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#F25A24] shadow-sm font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================
             4-COLUMN PRODUCT GRID (EXACT MATCH TO REFERENCE IMAGE 1)
             ========================================================= */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 my-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <SlidersHorizontal className="w-7 h-7" />
            </div>
            <h3 className="font-heading text-xl font-bold text-slate-900">No generators found matching criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try resetting your brand filters or search term to browse our complete warehouse inventory.
            </p>
            <button
              onClick={() => {
                setSelectedBrand("All");
                setSelectedType("All");
                setSearchQuery("");
              }}
              className="framer-btn-primary mx-auto"
            >
              <span>Reset all filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const displayPrice = product.priceText.startsWith("From")
                ? `From ${formatPrice(product.priceValueBDT)}`
                : product.priceText;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Image Area with Brand Tag in Top Right (Matching Image 1) */}
                    <div className="relative bg-[#FAFBFD] p-5 h-56 flex items-center justify-center border-b border-slate-100 overflow-hidden">
                      {/* Top Brand Watermark / Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-block text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-white/90 text-slate-700 border border-slate-200 shadow-xs">
                          {product.brandBadgeText}
                        </span>
                      </div>

                      <Link href={`/products/${product.slug}`} className="w-full h-full flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    </div>

                    {/* Card Content Area */}
                    <div className="p-5">
                      {/* Generator Title */}
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-heading font-bold text-[15px] sm:text-base text-slate-950 group-hover:text-[#F25A24] transition-colors leading-snug line-clamp-2 min-h-[44px]">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Dual Spec Pill Badges (Matching Image 1: [XX kVA Standby] [XX kVA Prime]) */}
                      <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
                        <div className="bg-[#F1F3F5] rounded-lg py-2 px-2.5 text-center border border-slate-200/70">
                          <span className="block font-heading font-black text-sm sm:text-base text-slate-950 leading-tight">
                            {product.standbyKva} kVA
                          </span>
                          <span className="block text-[10px] font-mono text-slate-500 uppercase font-semibold">
                            Standby
                          </span>
                        </div>

                        <div className="bg-[#F1F3F5] rounded-lg py-2 px-2.5 text-center border border-slate-200/70">
                          <span className="block font-heading font-black text-sm sm:text-base text-slate-950 leading-tight">
                            {product.primeKva} kVA
                          </span>
                          <span className="block text-[10px] font-mono text-slate-500 uppercase font-semibold">
                            Prime
                          </span>
                        </div>
                      </div>

                      {/* Technical Bullet Points with Orange Accent Checkmarks (Matching Image 1) */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] font-semibold text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#F25A24] shrink-0 stroke-[2.5]" />
                          <span className="uppercase">
                            FUEL TYPE: <strong className="text-slate-900">{product.fuelType}</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#F25A24] shrink-0 stroke-[2.5]" />
                          <span className="uppercase">
                            FUEL CAPACITY: <strong className="text-slate-900">{product.fuelCapacity}</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#F25A24] shrink-0 stroke-[2.5]" />
                          <span className="uppercase">
                            HZ: <strong className="text-slate-900">{product.frequencyHz}</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Full-Width Navy / Brand CTA Button (Matching Image 1) */}
                  <div className="p-5 pt-0">
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full flex items-center justify-center gap-2 bg-[#0E1014] hover:bg-[#F25A24] text-white py-3 px-4 rounded-xl text-xs font-bold transition-colors shadow-xs group/btn cursor-pointer"
                    >
                      <span>{displayPrice}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-white/80 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* =========================================================
             PAGINATION STRIP (MATCHING REFERENCE IMAGE 1)
             ========================================================= */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(1)}
            className={`w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center transition-colors cursor-pointer ${
              currentPage === 1 ? "bg-[#F25A24] text-white shadow-sm" : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            1
          </button>
          <button
            onClick={() => setCurrentPage(2)}
            className={`w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center transition-colors cursor-pointer ${
              currentPage === 2 ? "bg-[#F25A24] text-white shadow-sm" : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            2
          </button>
          <button
            onClick={() => setCurrentPage(3)}
            className={`w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center transition-colors cursor-pointer ${
              currentPage === 3 ? "bg-[#F25A24] text-white shadow-sm" : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            3
          </button>
          <button
            onClick={() => setCurrentPage(4)}
            className="w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
          >
            4
          </button>
          <span className="text-slate-400 font-bold px-1">...</span>
          <button
            onClick={() => setCurrentPage(8)}
            className="w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
          >
            8
          </button>
          <button
            onClick={() => setCurrentPage(9)}
            className="w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
          >
            9
          </button>
          <button
            onClick={() => setCurrentPage(10)}
            className="w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
          >
            10
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 10))}
            className="h-9 px-3 rounded-lg font-bold text-xs flex items-center gap-1 bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* =========================================================
             SEO / INFORMATIONAL BRAND CATEGORY SECTION (IMAGE 1)
             ========================================================= */}
        <section className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="space-y-4 max-w-4xl">
            <h3 className="font-heading text-xl sm:text-2xl font-black text-[#F25A24] uppercase tracking-tight">
              DIESEL GENERATORS FOR SALE BY BRAND AND SIZE
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Browse diesel generators for sale from{" "}
              <button onClick={() => setSelectedBrand("Perkins")} className="text-[#F25A24] font-bold hover:underline cursor-pointer">
                Perkins
              </button>
              ,{" "}
              <button onClick={() => setSelectedBrand("Cummins")} className="text-[#F25A24] font-bold hover:underline cursor-pointer">
                Cummins
              </button>
              ,{" "}
              <button onClick={() => setSelectedBrand("FG Wilson")} className="text-[#F25A24] font-bold hover:underline cursor-pointer">
                FG Wilson
              </button>
              ,{" "}
              <button onClick={() => setSelectedBrand("Ricardo")} className="text-[#F25A24] font-bold hover:underline cursor-pointer">
                Ricardo
              </button>
              , and{" "}
              <button onClick={() => setSelectedBrand("Aksa")} className="text-[#F25A24] font-bold hover:underline cursor-pointer">
                Aksa
              </button>
              . Compare open and enclosed silent canopy sets across our 10 kVA to 2500 kVA warehouse stock, with larger industrial synchronizing options available up to 3000 kVA. Use the filters above to narrow the range, or contact our engineering team directly for load sizing calculations, on-site feasibility inspection, and prompt delivery across Dhaka, Chattogram, Sylhet, and Khulna.
            </p>

            {/* Quick Capacity Filters */}
            <div className="pt-4 flex flex-wrap gap-2 text-[11px] font-mono font-semibold text-slate-500">
              <span className="text-slate-400 py-1">Quick Capacities:</span>
              {["10 kVA", "20 kVA", "25 kVA", "30 kVA", "50 kVA", "100 kVA", "250 kVA", "500 kVA", "1000 kVA"].map((cap) => (
                <button
                  key={cap}
                  onClick={() => setSearchQuery(cap.replace(/\s/g, ""))}
                  className="px-2.5 py-1 rounded bg-[#FAFBFD] hover:bg-slate-200 border border-slate-200 transition-colors text-slate-700 cursor-pointer"
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => {
          setIsQuoteOpen(false);
          setSelectedQuoteProduct(null);
        }}
        defaultGeneratorName={selectedQuoteProduct?.name}
        defaultKva={selectedQuoteProduct?.standbyKva}
      />
    </div>
  );
}
