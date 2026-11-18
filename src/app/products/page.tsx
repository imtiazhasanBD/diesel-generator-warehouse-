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
  RotateCcw,
  ChevronDown
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, GeneratorProduct } from "@/data/products";

export default function ProductsPage() {
  // Filter & Sort State
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Active filters count for mobile badge
  const activeFilterCount =
    (selectedBrand !== "All" ? 1 : 0) +
    (selectedType !== "All" ? 1 : 0) +
    (sortBy !== "default" ? 1 : 0) +
    (searchQuery.trim() !== "" ? 1 : 0);

  // Quote Modal State
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedQuoteProduct, setSelectedQuoteProduct] = useState<GeneratorProduct | null>(null);

  // Always format price in BDT (৳)
  const formatPrice = (bdtPrice: number) => {
    return `৳${bdtPrice.toLocaleString("en-IN")}`;
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
      <section className="relative bg-[#0E1014] text-white overflow-hidden py-10 sm:py-16 lg:py-20 border-b border-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: "url('/assets/images/industrial-site.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
          <h1 className="font-heading text-2xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Diesel Generators for Sale
          </h1>

          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm text-slate-400 mt-3 sm:mt-4 font-medium overflow-x-auto scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden whitespace-nowrap">
            <Link href="/" className="hover:text-primary transition-colors shrink-0">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <Link href="/products" className="text-white hover:text-primary transition-colors shrink-0">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="text-primary shrink-0">Diesel Generators for Sale</span>
          </div>
        </div>
      </section>

      {/* =========================================================
           MAIN BROWSE & PRODUCTS GRID SECTION (IMAGE 1 LAYOUT)
           ========================================================= */}
      <main className="max-w-[1400px] mx-auto px-3 sm:px-8 lg:px-10 py-6 sm:py-10 lg:py-14 w-full flex-1">

        {/* Section Heading & Category Title (Matching Image 1) */}
        <div className="border-b border-slate-200 pb-4 sm:pb-6 mb-5 sm:mb-8">

          {/* =========================================================
               MOBILE CONTROLS (< md): ULTRA-CLEAN, COMPACT & NO CLUTTER
               ========================================================= */}
          <div className="block md:hidden space-y-3">
            {/* Mobile Header Title & Result Count */}
            <div>
              <h2 className="font-heading text-base font-bold text-primary tracking-tight uppercase">
                DIESEL GENERATORS
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Showing {filteredProducts.length} of {PRODUCTS.length} generators
              </p>
            </div>

            {/* Mobile Row 1: Search Bar + Filter Button with Badge */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search kVA, model, brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary shadow-2xs font-medium placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs p-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                  isMobileFilterOpen || activeFilterCount > 0
                    ? "bg-[#18181B] text-white border-[#18181B] shadow-2xs"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Row 2: Single Clean Horizontal Quick-Filter Rail */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-0.5 -mx-3 px-3">
              <button
                onClick={() => {
                  setSelectedBrand("All");
                  setSelectedType("All");
                }}
                className={`text-[11px] px-3 py-1 rounded-full font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedBrand === "All" && selectedType === "All"
                    ? "bg-primary text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                All Sets
              </button>

              {["Silent Canopy", "Open Skid"].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(selectedType === type ? "All" : type)}
                  className={`text-[11px] px-2.5 py-1 rounded-full font-semibold transition-all shrink-0 cursor-pointer ${
                    selectedType === type
                      ? "bg-[#18181B] text-white shadow-2xs"
                      : "bg-white text-slate-600 border border-slate-200"
                  }`}
                >
                  {type}
                </button>
              ))}

              {["Perkins", "Cummins", "Ricardo", "FG Wilson"].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(selectedBrand === brand ? "All" : brand)}
                  className={`text-[11px] px-2.5 py-1 rounded-full font-semibold transition-all shrink-0 cursor-pointer ${
                    selectedBrand === brand
                      ? "bg-[#18181B] text-white shadow-2xs"
                      : "bg-white text-slate-600 border border-slate-200"
                  }`}
                >
                  {brand}
                </button>
              ))}

              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setSelectedBrand("All");
                    setSelectedType("All");
                    setSortBy("default");
                    setSearchQuery("");
                  }}
                  className="text-[11px] text-primary font-bold px-2 py-1 shrink-0 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Mobile Expandable Filter & Sort Drawer Panel */}
            {isMobileFilterOpen && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-4 space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
                    <Filter className="w-3.5 h-3.5 text-primary" />
                    <span>Filter & Sort Options</span>
                  </div>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="text-slate-400 hover:text-slate-700 text-xs font-semibold p-1"
                  >
                    ✕ Close
                  </button>
                </div>

                {/* Sort Option */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Sort Generators
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-primary"
                  >
                    <option value="default">Default sorting</option>
                    <option value="kva-asc">Capacity: Low to High (kVA)</option>
                    <option value="kva-desc">Capacity: High to Low (kVA)</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>

                {/* Brands Selection */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Filter by Brand
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {brands.map((b) => (
                      <button
                        key={b}
                        onClick={() => setSelectedBrand(b)}
                        className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                          selectedBrand === b
                            ? "bg-[#18181B] text-white shadow-2xs"
                            : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Canopy Types */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Enclosure Type
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {types.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedType(t)}
                        className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                          selectedType === t
                            ? "bg-primary text-white shadow-2xs"
                            : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Drawer Footer Buttons */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      setSelectedBrand("All");
                      setSelectedType("All");
                      setSortBy("default");
                      setSearchQuery("");
                    }}
                    className="text-xs text-slate-500 hover:text-slate-900 font-semibold flex items-center gap-1 cursor-pointer py-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>

                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    View {filteredProducts.length} Results
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* =========================================================
               DESKTOP CONTROLS (>= md): COMPACT DROPDOWN OPTIONS
               ========================================================= */}
          <div className="hidden md:block">
            {/* Top Row: Title + Count (Left) & Live Search Input (Right) */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-3.5">
              <div>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary tracking-tight uppercase">
                  BROWSE BY: DIESEL GENERATORS FOR SALE
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                  Showing 1-{filteredProducts.length} of {PRODUCTS.length} results
                </p>
              </div>

              {/* Live Search Input */}
              <div className="relative w-64 lg:w-72 shrink-0">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="product-search"
                  type="text"
                  placeholder="Search kVA, model, brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-7 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 shadow-2xs font-medium placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs p-0.5"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Filter & Sort Dropdowns Row */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                {/* Brand Dropdown */}
                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="appearance-none bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 shadow-2xs cursor-pointer transition-all"
                  >
                    <option value="All">All Brands</option>
                    {brands.filter((b) => b !== "All").map((b) => (
                      <option key={b} value={b}>Brand: {b}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Type Dropdown */}
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="appearance-none bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 shadow-2xs cursor-pointer transition-all"
                  >
                    <option value="All">All Enclosure Types</option>
                    {types.filter((t) => t !== "All").map((t) => (
                      <option key={t} value={t}>Type: {t}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Sorting Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 shadow-2xs cursor-pointer transition-all"
                  >
                    <option value="default">Default sorting</option>
                    <option value="kva-asc">Capacity: Low to High (kVA)</option>
                    <option value="kva-desc">Capacity: High to Low (kVA)</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Reset Filters button */}
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => {
                      setSelectedBrand("All");
                      setSelectedType("All");
                      setSortBy("default");
                      setSearchQuery("");
                    }}
                    className="text-xs text-primary hover:text-primary-hover bg-primary/8 hover:bg-primary/15 px-3 py-2 rounded-lg font-bold shrink-0 flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Filters</span>
                  </button>
                )}
              </div>

              {/* Active Filter Indicators Summary */}
              {activeFilterCount > 0 && (
                <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="font-medium text-slate-400">Active:</span>
                  {selectedBrand !== "All" && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-semibold border border-slate-200">
                      {selectedBrand}
                    </span>
                  )}
                  {selectedType !== "All" && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-semibold border border-slate-200">
                      {selectedType}
                    </span>
                  )}
                  {sortBy !== "default" && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-semibold border border-slate-200">
                      Sorted
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* =========================================================
             2-COLUMN (MOBILE) / 4-COLUMN (DESKTOP) PRODUCT GRID
             ========================================================= */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-md p-8 sm:p-16 text-center border border-slate-200 my-8 space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <SlidersHorizontal className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900">No generators found matching criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try resetting your brand filters or search term to browse our complete warehouse inventory.
            </p>
            <button
              onClick={() => {
                setSelectedBrand("All");
                setSelectedType("All");
                setSearchQuery("");
              }}
              className="framer-btn-primary mx-auto cursor-pointer"
            >
              <span>Reset all filters</span>
              <div className="btn-arrow-box">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {filteredProducts.map((product) => {
              const displayPrice = product.priceText.startsWith("From")
                ? `From ${formatPrice(product.priceValueBDT)}`
                : product.priceText;

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  priceText={displayPrice}
                />
              );
            })}
          </div>
        )}

        {/* =========================================================
             RESPONSIVE PAGINATION STRIP
             ========================================================= */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 flex items-center justify-center gap-1 sm:gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="h-8 sm:h-9 px-2 sm:px-3 rounded-sm font-bold text-xs flex items-center gap-1 bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-sm font-bold text-xs flex items-center justify-center transition-colors cursor-pointer ${currentPage === page ? "bg-primary text-white shadow-xs" : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(4)}
            className="hidden sm:flex w-9 h-9 rounded-sm font-bold text-xs items-center justify-center bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
          >
            4
          </button>
          <span className="text-slate-400 font-bold px-0.5 sm:px-1 text-xs">...</span>
          <button
            onClick={() => setCurrentPage(10)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm font-bold text-xs flex items-center justify-center bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
          >
            10
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 10))}
            disabled={currentPage === 10}
            className="h-8 sm:h-9 px-2 sm:px-3 rounded-sm font-bold text-xs flex items-center gap-1 bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* =========================================================
             SEO / INFORMATIONAL BRAND CATEGORY SECTION (IMAGE 1)
             ========================================================= */}
        <section className="mt-10 sm:mt-16 bg-white rounded-md p-4 sm:p-8 lg:p-12 border border-slate-200 shadow-xs">
          <div className="space-y-3 sm:space-y-4 max-w-4xl">
            <h3 className="font-heading text-lg sm:text-2xl font-bold text-primary uppercase tracking-tight">
              DIESEL GENERATORS FOR SALE BY BRAND AND SIZE
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Browse diesel generators for sale from{" "}
              <button onClick={() => setSelectedBrand("Perkins")} className="text-primary font-bold hover:underline cursor-pointer">
                Perkins
              </button>
              ,{" "}
              <button onClick={() => setSelectedBrand("Cummins")} className="text-primary font-bold hover:underline cursor-pointer">
                Cummins
              </button>
              ,{" "}
              <button onClick={() => setSelectedBrand("FG Wilson")} className="text-primary font-bold hover:underline cursor-pointer">
                FG Wilson
              </button>
              ,{" "}
              <button onClick={() => setSelectedBrand("Ricardo")} className="text-primary font-bold hover:underline cursor-pointer">
                Ricardo
              </button>
              , and{" "}
              <button onClick={() => setSelectedBrand("Aksa")} className="text-primary font-bold hover:underline cursor-pointer">
                Aksa
              </button>
              . Compare open and enclosed silent canopy sets across our 10 kVA to 2500 kVA warehouse stock, with larger industrial synchronizing options available up to 3000 kVA. Use the filters above to narrow the range, or contact our engineering team directly for load sizing calculations, on-site feasibility inspection, and prompt delivery across Dhaka, Chattogram, Sylhet, and Khulna.
            </p>

            {/* Quick Capacity Filters */}
            <div className="pt-3 sm:pt-4 flex flex-wrap gap-1.5 sm:gap-2 text-[10.5px] sm:text-[11px] font-mono font-semibold text-slate-500">
              <span className="text-slate-400 py-1 w-full sm:w-auto">Quick Capacities:</span>
              {["10 kVA", "20 kVA", "25 kVA", "30 kVA", "50 kVA", "100 kVA", "250 kVA", "500 kVA", "1000 kVA"].map((cap) => (
                <button
                  key={cap}
                  onClick={() => setSearchQuery(cap.replace(/\s/g, ""))}
                  className="px-2.5 py-1 rounded-sm bg-[#FAFBFD] hover:bg-slate-200 border border-slate-200 transition-colors text-slate-700 cursor-pointer"
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
