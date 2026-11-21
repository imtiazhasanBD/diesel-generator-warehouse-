"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Headset,
  Globe2,
  SlidersHorizontal,
  Check,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { BRAND_CATEGORIES, ALL_BRANDS, BrandCategory, BrandItem } from "@/data/brandsData";

interface BrandsSectionProps {
  onOpenQuote?: () => void;
  isStandalonePage?: boolean;
}

export default function BrandsSection({ onOpenQuote, isStandalonePage = false }: BrandsSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "engine" | "alternator" | "controller">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState<string>("All");

  // Unique origin countries
  const originCountries = useMemo(() => {
    const countries = Array.from(new Set(ALL_BRANDS.map((b) => b.originCountry))).sort();
    return ["All", ...countries];
  }, []);

  // Filtered categories and brands
  const filteredCategories = useMemo(() => {
    return BRAND_CATEGORIES.map((category) => {
      // If category tab is selected and doesn't match, skip
      if (selectedFilter !== "all" && category.id !== selectedFilter) {
        return { ...category, brands: [] };
      }

      const matchingBrands = category.brands.filter((brand) => {
        const matchesSearch =
          searchQuery.trim() === "" ||
          brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          brand.originCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (brand.description && brand.description.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesOrigin =
          selectedOrigin === "All" || brand.originCountry === selectedOrigin;

        return matchesSearch && matchesOrigin;
      });

      return {
        ...category,
        brands: matchingBrands,
      };
    }).filter((category) => category.brands.length > 0);
  }, [selectedFilter, searchQuery, selectedOrigin]);

  const totalVisibleBrands = useMemo(() => {
    return filteredCategories.reduce((sum, cat) => sum + cat.brands.length, 0);
  }, [filteredCategories]);

  return (
    <section id="brands" className="py-12 sm:py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">

        {/* =========================================================
             SECTION INTRO HEADER (MATCHING SITE DESIGN PATTERN)
             ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-primary tracking-wider uppercase mb-3">
            <span className="w-8 h-[2px] bg-primary rounded-full inline-block" />
            <span>Our Trusted Manufacturer Network</span>
            <span className="w-8 h-[2px] bg-primary rounded-full inline-block" />
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-[52px] font-bold text-slate-950 tracking-tight leading-[1.08] mb-4">
            We work with brands that <span className="text-primary">power the world.</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
            From dependable diesel engines to high-performance alternators and intelligent generator controls,
            DGW brings together recognised names in power generation, with each brand labelled by its country of origin.
          </p>
        </div>

        {/* =========================================================
             INTERACTIVE CONTROLS: CATEGORY TABS & SEARCH
             ========================================================= */}
        <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-3 sm:p-4 mb-10 sm:mb-14 shadow-xs backdrop-blur-xs">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1">
              {[
                { id: "all", label: "All Brands", count: ALL_BRANDS.length },
                { id: "engine", label: "Diesel Engines", count: 14 },
                { id: "alternator", label: "Alternators", count: 7 },
                { id: "controller", label: "Controllers", count: 6 },
              ].map((tab) => {
                const isActive = selectedFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedFilter(tab.id as any)}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "bg-primary text-white shadow-sm font-bold"
                        : "bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200/80"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input & Country Filter */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex-1 sm:w-64 md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter brands or origin..."
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Country Select Dropdown */}
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-primary cursor-pointer shrink-0"
              >
                <option value="All">All Origins</option>
                {originCountries.filter((c) => c !== "All").map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* =========================================================
             BRAND CATEGORY SECTIONS (01, 02, 03)
             ========================================================= */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded-2xl p-8">
            <p className="text-slate-600 font-semibold text-base">No manufacturer found matching your search.</p>
            <button
              onClick={() => {
                setSelectedFilter("all");
                setSearchQuery("");
                setSelectedOrigin("All");
              }}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-hover cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-14 sm:space-y-18">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="pt-6 sm:pt-8 border-t border-slate-200/90 first:border-t-0 first:pt-0"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    {/* Index Badge */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/10 text-primary font-heading font-extrabold text-sm sm:text-base flex items-center justify-center border border-primary/20 shrink-0">
                      {category.index}
                    </div>
                    <div>
                      <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-slate-950 tracking-tight">
                        {category.title}
                      </h2>
                      <p className="text-slate-500 text-xs sm:text-sm mt-0.5 sm:mt-1">
                        {category.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs sm:text-[13px] font-bold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 self-start sm:self-auto shrink-0">
                    {category.brands.length} {category.brands.length === 1 ? "manufacturer" : "manufacturers"}
                  </div>
                </div>

                {/* 5-Column Responsive Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-4.5">
                  {category.brands.map((brand) => {
                    const isDark = brand.isDark;
                    return (
                      <article
                        key={brand.id}
                        className={`group relative rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between min-h-[135px] sm:min-h-[145px] transition-all duration-300 ${
                          isDark
                            ? "bg-[#101010] border border-slate-800 text-white hover:border-primary/80 hover:shadow-xl hover:-translate-y-1"
                            : "bg-white border border-slate-200/90 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
                        }`}
                      >
                        {/* Logo Container */}
                        <div className="w-full h-14 sm:h-16 flex items-center justify-center p-1.5">
                          <img
                            src={brand.image}
                            alt={`${brand.name} logo`}
                            className={`max-h-full max-w-full object-contain filter transition-transform duration-300 group-hover:scale-105 ${
                              isDark ? "brightness-110" : ""
                            }`}
                            loading="lazy"
                          />
                        </div>

                        {/* Brand Name & Origin */}
                        <div className="text-center w-full mt-2.5">
                          <div
                            className={`text-[11px] sm:text-xs font-heading font-extrabold uppercase tracking-widest transition-colors ${
                              isDark
                                ? "text-slate-200 group-hover:text-primary"
                                : "text-slate-800 group-hover:text-primary"
                            }`}
                          >
                            {brand.name}
                          </div>
                          <div
                            className={`text-[10px] sm:text-[11px] font-medium tracking-tight mt-0.5 inline-flex items-center justify-center gap-1 ${
                              isDark ? "text-slate-400" : "text-slate-500"
                            }`}
                          >
                            <span>Origin:</span>
                            <span className="font-semibold">{brand.originCountry}</span>
                          </div>
                        </div>

                        {/* Interactive Product Link if applicable */}
                        {category.id === "engine" && (
                          <Link
                            href={`/products?brand=${encodeURIComponent(brand.name)}`}
                            className="absolute inset-0 rounded-2xl z-10"
                            title={`Browse ${brand.name} Generators`}
                          >
                            <span className="sr-only">Browse {brand.name} generators</span>
                          </Link>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =========================================================
             CALLOUT SECTION (MATCHING REFERENCE DESIGN WITH CURRENT STYLING)
             ========================================================= */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F172A] via-[#141E2F] to-[#1E293B] border border-slate-800/80 p-6 sm:p-8 lg:p-10 text-white shadow-2xl mt-14 sm:mt-20">
          {/* Subtle concentric rings effect like reference HTML */}
          <div className="absolute -right-16 -top-24 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -right-24 -top-32 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute right-0 top-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5 max-w-3xl">
              {/* Red Accent Vertical Bar */}
              <div className="w-1.5 h-12 bg-primary rounded-full shrink-0 hidden sm:block mt-0.5" />

              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-bold text-primary tracking-widest uppercase mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authorized Integration & Supply</span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
                  One sourcing partner. Complete power solutions.
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Tell us your required capacity and application. Our team can help match the right engine,
                  alternator and controller combination.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={onOpenQuote}
                className="framer-btn-primary rounded-sm cursor-pointer justify-center"
              >
                <span>Request an RFQ</span>
                <div className="btn-arrow-box rounded-sm">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </button>

              <button
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-[13px] font-semibold border border-slate-700/80 transition-colors cursor-pointer"
              >
                <Headset className="w-4 h-4 text-primary" />
                <span>Talk to an Engineer</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

