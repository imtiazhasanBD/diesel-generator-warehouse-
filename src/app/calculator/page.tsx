"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  ChevronLeft,
  Search,
  Plus,
  Minus,
  Download,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Fuel,
  SlidersHorizontal,
  Copy,
  Check,
  Trash2,
  Sliders,
  Wrench,
  X,
  FileText
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import {
  PROJECT_TYPES,
  STANDARD_GENERATOR_SIZES,
  SelectedItem,
} from "@/data/calculatorData";
import { PRODUCTS, GeneratorProduct } from "@/data/products";
import { generateCalculationPDF } from "@/utils/generateCalculationPDF";

export default function LoadCalculatorPage() {
  // Selected Project Type & Dialog State
  const [selectedProjectId, setSelectedProjectId] = useState<string>("residential");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectSearchQuery, setProjectSearchQuery] = useState("");

  const currentProject = useMemo(() => {
    return PROJECT_TYPES.find((p) => p.id === selectedProjectId) || PROJECT_TYPES[0];
  }, [selectedProjectId]);

  const filteredProjects = useMemo(() => {
    if (!projectSearchQuery.trim()) return PROJECT_TYPES;
    const q = projectSearchQuery.toLowerCase().trim();
    return PROJECT_TYPES.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [projectSearchQuery]);

  // Selected Equipment Map
  const [selectedItems, setSelectedItems] = useState<Record<string, SelectedItem>>({});

  // Active Category Tab & Search
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Engineering Tuning
  const [powerFactor, setPowerFactor] = useState<number>(0.8);
  const [reserveMargin, setReserveMargin] = useState<number>(0.2); // 20%
  const [showTuning, setShowTuning] = useState(false);

  // Custom Item Modal State
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customKW, setCustomKW] = useState<number>(5);
  const [customQty, setCustomQty] = useState<number>(1);

  // Actions State
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Category Scroll Ref & Auto-Slide Handlers
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const handleCategorySelect = (cat: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    setActiveCategory(cat);
    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const scrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === "right" ? 180 : -180;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Group Categories for Selected Project
  const categories = useMemo(() => {
    return ["All", ...currentProject.groups.map((g) => g.name)];
  }, [currentProject]);

  // Flat Equipment List for Filtering
  const displayedItems = useMemo(() => {
    const list: { name: string; kw: number; category: string }[] = [];
    currentProject.groups.forEach((group) => {
      if (activeCategory === "All" || activeCategory === group.name) {
        group.items.forEach((item) => {
          if (
            !searchQuery ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            list.push({ ...item, category: group.name });
          }
        });
      }
    });
    return list;
  }, [currentProject, activeCategory, searchQuery]);

  // Stepper handlers
  const updateQty = (name: string, kw: number, category: string, delta: number) => {
    const key = `${selectedProjectId}|${name}`;
    setSelectedItems((prev) => {
      const existing = prev[key];
      const newQty = (existing ? existing.qty : 0) + delta;

      if (newQty <= 0) {
        const next = { ...prev };
        delete next[key];
        return next;
      }

      return {
        ...prev,
        [key]: {
          id: key,
          name,
          kw,
          category,
          qty: newQty,
        },
      };
    });
  };

  const removeItem = (key: string) => {
    setSelectedItems((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  // Add Custom Machinery
  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || customKW <= 0 || customQty <= 0) return;

    const key = `custom|${Date.now()}`;
    setSelectedItems((prev) => ({
      ...prev,
      [key]: {
        id: key,
        name: customName.trim(),
        kw: customKW,
        qty: customQty,
        category: "Custom Load",
        isCustom: true,
      },
    }));

    setCustomName("");
    setCustomKW(5);
    setCustomQty(1);
    setIsAddingCustom(false);
  };

  // Quick Preset Loader
  const handleLoadPreset = () => {
    if (!currentProject.quickPreset) return;
    const newItems: Record<string, SelectedItem> = {};

    currentProject.quickPreset.items.forEach((presetItem) => {
      for (const group of currentProject.groups) {
        const found = group.items.find((i) => i.name === presetItem.name);
        if (found) {
          const key = `${selectedProjectId}|${found.name}`;
          newItems[key] = {
            id: key,
            name: found.name,
            kw: found.kw,
            category: group.name,
            qty: presetItem.qty,
          };
          break;
        }
      }
    });

    setSelectedItems(newItems);
  };

  // Calculations
  const itemsList = useMemo(() => Object.values(selectedItems), [selectedItems]);
  const totalConnectedKW = useMemo(() => {
    return itemsList.reduce((sum, item) => sum + item.kw * item.qty, 0);
  }, [itemsList]);

  const runningKVA = useMemo(() => {
    if (powerFactor <= 0) return 0;
    return totalConnectedKW / powerFactor;
  }, [totalConnectedKW, powerFactor]);

  const requiredKVA = useMemo(() => {
    return runningKVA * (1 + reserveMargin);
  }, [runningKVA, reserveMargin]);

  const recommendedGeneratorKVA = useMemo(() => {
    if (itemsList.length === 0 || requiredKVA <= 0) return 0;
    const match = STANDARD_GENERATOR_SIZES.find((s) => s >= requiredKVA);
    return match || Math.ceil(requiredKVA / 100) * 100;
  }, [requiredKVA, itemsList.length]);

  const estimatedFuelLPH = useMemo(() => {
    return (recommendedGeneratorKVA * 0.22).toFixed(1);
  }, [recommendedGeneratorKVA]);

  // Top Matched In-Stock Model
  const matchedGenset: GeneratorProduct | undefined = useMemo(() => {
    if (!recommendedGeneratorKVA) return undefined;
    return PRODUCTS.find(
      (p) =>
        p.standbyKva >= recommendedGeneratorKVA * 0.95 &&
        p.standbyKva <= recommendedGeneratorKVA * 1.4
    ) || PRODUCTS[0];
  }, [recommendedGeneratorKVA]);

  // Download PDF
  const handleDownloadPDF = () => {
    setIsGeneratingPDF(true);
    try {
      generateCalculationPDF({
        projectName: currentProject.name,
        items: itemsList,
        totalKW: totalConnectedKW,
        totalKVA: runningKVA,
        recommendedKVA: recommendedGeneratorKVA,
        powerFactor,
        reserveMargin,
      });
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Unable to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Copy Summary
  const handleCopySummary = () => {
    if (typeof window === "undefined") return;
    const summary = [
      `DGW Generator Load Calculation`,
      `Facility: ${currentProject.name}`,
      `Connected Load: ${totalConnectedKW.toFixed(2)} kW`,
      `Running Load: ${runningKVA.toFixed(2)} kVA (PF: ${powerFactor})`,
      `Recommended Generator: ${recommendedGeneratorKVA} kVA (+${Math.round(reserveMargin * 100)}% reserve)`,
      `Fuel Rate: ~${estimatedFuelLPH} L/hr (75% load)`,
      `Schedule:`,
      ...itemsList.map((i) => ` • ${i.name} × ${i.qty} (${(i.kw * i.qty).toFixed(2)} kW)`),
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans">
      <Header
        activePath="calculator"
        onOpenQuote={() => setIsQuoteOpen(true)}
      />

      {/* =========================================================
           CLEAN PAGE HEADER
           ========================================================= */}
      <section className="bg-white border-b border-slate-200/80 pt-8 pb-9">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-10">
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </li>
              <li className="text-primary font-bold">Load Calculator</li>
            </ol>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2.5 text-xs font-bold text-slate-900 tracking-tight mb-1.5">
                <span className="w-8 h-[3px] bg-primary rounded-sm inline-block" />
                <span>Electrical Sizing Engine</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-4xl lg:text-[40px] font-bold text-[#141518] tracking-[-0.03em] leading-tight">
                Generator Load &amp; <span className="text-primary">kVA Calculator</span>
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
                Select your building type, add electrical equipment, and receive an instant commercial generator rating.
              </p>
            </div>

            {/* Quick Reset */}
            {itemsList.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedItems({})}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 cursor-pointer self-start sm:self-auto transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all loads</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
           FACILITY SELECTOR BAR (CLICK TO OPEN DIALOG)
           ========================================================= */}
      <section className="bg-white border-b border-slate-200/80 py-3 sticky top-20 z-20 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
              Project Type:
            </span>
            <button
              type="button"
              onClick={() => {
                setProjectSearchQuery("");
                setIsProjectModalOpen(true);
              }}
              className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-sm bg-slate-900 hover:bg-black text-white transition-all cursor-pointer shadow-xs text-xs font-semibold group"
            >
              <span className="text-base">{currentProject.icon}</span>
              <span className="font-bold text-sm">{currentProject.name}</span>
              <span className="text-primary font-bold text-[11px] font-mono ml-1.5 flex items-center gap-0.5 group-hover:underline">
                Change ▾
              </span>
            </button>
            <span className="text-xs text-slate-500 hidden md:inline">
              {currentProject.description.split(",")[0]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {currentProject.quickPreset && (
              <button
                type="button"
                onClick={handleLoadPreset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-primary-light text-primary hover:bg-primary-hover hover:text-white text-xs font-bold cursor-pointer transition-colors"
                title={`Load baseline equipment for ${currentProject.quickPreset.label}`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load {currentProject.quickPreset.label}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
           MAIN INTERACTIVE LAYOUT (2 COLUMNS)
           ========================================================= */}
      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-10 py-8 sm:py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT 7 COLS: EQUIPMENT WORKSPACE */}
          <div className="lg:col-span-7 space-y-4">

            {/* Sub-header: Category Tabs + Search */}
            <div className="bg-white rounded-lg p-4 border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search appliances (e.g. AC, Lift, Pump)..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-sm pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Custom Item Trigger & Preset Button */}
                <div className="flex items-center gap-2 shrink-0">
                  {currentProject.quickPreset && (
                    <button
                      type="button"
                      onClick={handleLoadPreset}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer transition-colors"
                      title="Load typical baseline equipment"
                    >
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span>Load preset</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsAddingCustom(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-slate-900 hover:bg-black text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Custom</span>
                  </button>
                </div>
              </div>

              {/* Category Filter Pills with Auto-Slide & Slide Controls */}
              <div className="relative flex items-center pt-1">
                {/* Left Slide Arrow */}
                <button
                  type="button"
                  onClick={() => scrollCategories("left")}
                  className="hidden sm:flex absolute -left-2 z-10 w-6 h-6 rounded-full bg-white shadow-md border border-slate-200 items-center justify-center text-slate-600 hover:text-black cursor-pointer hover:scale-105 transition-all"
                  aria-label="Slide left"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Scrollable Pills Container */}
                <div
                  ref={categoryScrollRef}
                  className="flex items-center gap-1.5 overflow-x-auto scrollbar-none scroll-smooth px-1 py-0.5 w-full"
                >
                  {categories.map((cat) => {
                    const isCatActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={(e) => handleCategorySelect(cat, e)}
                        className={`px-3 py-1.5 rounded-sm text-xs font-semibold whitespace-nowrap cursor-pointer transition-all shrink-0 ${
                          isCatActive
                            ? "bg-slate-900 text-white shadow-xs"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Right Slide Arrow */}
                <button
                  type="button"
                  onClick={() => scrollCategories("right")}
                  className="hidden sm:flex absolute -right-2 z-10 w-6 h-6 rounded-full bg-white shadow-md border border-slate-200 items-center justify-center text-slate-600 hover:text-black cursor-pointer hover:scale-105 transition-all"
                  aria-label="Slide right"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Custom Item Form Modal / Drawer */}
            {isAddingCustom && (
              <form
                onSubmit={handleAddCustom}
                className="bg-primary-light/50 border border-primary/30 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">
                    Add Custom Machinery / Load
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsAddingCustom(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                  <div className="sm:col-span-6">
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Equipment Name (e.g. CNC Machine)"
                      required
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={customKW}
                      onChange={(e) => setCustomKW(parseFloat(e.target.value) || 0)}
                      placeholder="Power (kW)"
                      required
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <input
                      type="number"
                      min="1"
                      value={customQty}
                      onChange={(e) => setCustomQty(parseInt(e.target.value, 10) || 1)}
                      placeholder="Quantity"
                      required
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="framer-btn-primary rounded-sm text-xs py-1 px-3 cursor-pointer"
                  >
                    <span>Add item</span>
                    <div className="btn-arrow-box">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </button>
                </div>
              </form>
            )}

            {/* Clean Equipment Rows */}
            <div className="bg-white rounded-lg border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
              {displayedItems.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  No matching appliances found for &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                displayedItems.map((item) => {
                  const key = `${selectedProjectId}|${item.name}`;
                  const currentQty = selectedItems[key]?.qty || 0;

                  return (
                    <div
                      key={item.name}
                      className={`px-4 py-3 flex items-center justify-between gap-3 transition-colors ${
                        currentQty > 0
                          ? "bg-primary-light/30 border-l-2 border-primary"
                          : "hover:bg-slate-50/70"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-xs sm:text-[13px] font-semibold text-slate-900 truncate">
                          {item.name}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mt-0.5">
                          <span>{item.kw} kW</span>
                          <span className="text-slate-300">&bull;</span>
                          <span className="text-slate-400">{item.category}</span>
                        </div>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            updateQty(item.name, item.kw, item.category, -1)
                          }
                          disabled={currentQty === 0}
                          className="w-7 h-7 rounded-sm border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-30 flex items-center justify-center text-slate-700 cursor-pointer disabled:cursor-not-allowed transition-colors"
                          aria-label={`Decrease ${item.name}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span
                          className={`w-9 text-center font-mono text-xs font-bold ${
                            currentQty > 0 ? "text-primary" : "text-slate-400"
                          }`}
                        >
                          {currentQty}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQty(item.name, item.kw, item.category, 1)
                          }
                          className="w-7 h-7 rounded-sm bg-primary hover:bg-primary-hover text-white flex items-center justify-center cursor-pointer transition-colors shadow-xs"
                          aria-label={`Increase ${item.name}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* RIGHT 5 COLS: CLEAN EXECUTIVE SUMMARY (STICKY) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-36">

            {/* SIZING RESULT CARD */}
            <div className="bg-[#141518] rounded-md p-6 text-white border border-slate-800 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-wider">
                  Recommended Generator
                </span>
                <span className="text-xs text-slate-400">
                  {itemsList.length} items added
                </span>
              </div>

              {/* Giant Recommendation Display */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-heading font-black text-4xl sm:text-5xl text-primary tracking-tight">
                    {recommendedGeneratorKVA ? `${recommendedGeneratorKVA}` : "—"}
                  </span>
                  <span className="text-xl font-bold text-white">kVA</span>
                  <span className="text-xs text-slate-400 font-mono ml-auto">
                    Standby / Prime
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Includes 20% inrush starting buffer &bull; 50 Hz, 3-Phase
                </div>
              </div>

              {/* 3 Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-lg bg-white/5 border border-white/10 text-center mb-6">
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    Connected
                  </div>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">
                    {totalConnectedKW.toFixed(2)} <span className="text-[10px] text-slate-400">kW</span>
                  </div>
                </div>
                <div className="border-x border-white/10">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    Running Load
                  </div>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">
                    {runningKVA.toFixed(2)} <span className="text-[10px] text-slate-400">kVA</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    Fuel Burn
                  </div>
                  <div className="text-sm font-bold text-primary font-mono mt-0.5">
                    ~{estimatedFuelLPH} <span className="text-[10px] text-slate-400">L/h</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  disabled={itemsList.length === 0 || isGeneratingPDF}
                  className="w-full framer-btn-primary rounded-sm justify-between cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-xs"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-3.5 h-3.5 text-white" />
                    <span>{isGeneratingPDF ? "Generating PDF..." : "Download Calculation PDF"}</span>
                  </span>
                  <div className="btn-arrow-box">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsQuoteOpen(true)}
                    disabled={itemsList.length === 0}
                    className="w-full framer-btn-dark rounded-sm justify-center text-xs cursor-pointer disabled:opacity-40"
                  >
                    <span>Request Quote</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    disabled={itemsList.length === 0}
                    className="w-full px-3 py-2 rounded-sm bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-300">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-300" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Collapsible Tuning */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowTuning(!showTuning)}
                  className="w-full flex items-center justify-between text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 font-mono">
                    <SlidersHorizontal className="w-3 h-3 text-primary" />
                    PF: {powerFactor} &bull; Reserve: {Math.round(reserveMargin * 100)}%
                  </span>
                  <span className="text-primary underline">
                    {showTuning ? "Hide" : "Adjust"}
                  </span>
                </button>

                {showTuning && (
                  <div className="mt-3 p-3 rounded-md bg-black/40 border border-white/10 space-y-2.5 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                        <span>Power Factor (cos &phi;):</span>
                        <span className="font-mono text-primary font-bold">{powerFactor}</span>
                      </div>
                      <div className="flex gap-1">
                        {[0.8, 0.85, 0.9, 1.0].map((pf) => (
                          <button
                            key={pf}
                            type="button"
                            onClick={() => setPowerFactor(pf)}
                            className={`flex-1 py-0.5 rounded-sm text-[10px] font-mono font-bold ${
                              powerFactor === pf
                                ? "bg-primary text-white"
                                : "bg-white/10 text-slate-300"
                            }`}
                          >
                            {pf}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                        <span>Inrush Reserve Buffer:</span>
                        <span className="font-mono text-primary font-bold">
                          {Math.round(reserveMargin * 100)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="0.4"
                        step="0.05"
                        value={reserveMargin}
                        onChange={(e) => setReserveMargin(parseFloat(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SELECTED EQUIPMENT DRAWER (CLEAN TABLE) */}
            <div className="bg-white rounded-lg p-4 border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                <span className="font-heading font-bold text-xs text-slate-900 uppercase tracking-wider">
                  Configured Schedule ({itemsList.length})
                </span>
                {itemsList.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedItems({})}
                    className="text-[11px] text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {itemsList.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  No loads selected yet. Use Step 2 or load a preset.
                </div>
              ) : (
                <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                  {itemsList.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-xs py-1.5 px-2 rounded-sm bg-slate-50 hover:bg-slate-100/80 group"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-medium text-slate-900 truncate block">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {item.kw} kW &times; {item.qty}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-xs font-bold text-slate-800">
                          {(item.kw * item.qty).toFixed(2)} kW
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-slate-300 hover:text-red-500 opacity-60 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* MATCHED IN-STOCK PRODUCT CARD (1 CLEAN COMPACT CARD) */}
            {recommendedGeneratorKVA > 0 && matchedGenset && (
              <div className="bg-white rounded-lg p-4 border border-slate-200/90 shadow-xs">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-wider">
                    In-Stock Matched Unit
                  </span>
                  <Link
                    href={`/products/${matchedGenset.slug}`}
                    className="text-[11px] font-semibold text-slate-500 hover:text-primary"
                  >
                    Full specs &rarr;
                  </Link>
                </div>

                <Link
                  href={`/products/${matchedGenset.slug}`}
                  className="flex items-center gap-3 p-2.5 rounded-md bg-slate-50 hover:bg-primary-light/30 border border-slate-200/80 transition-all group block"
                >
                  <img
                    src={matchedGenset.image}
                    alt={matchedGenset.name}
                    className="w-12 h-12 object-contain bg-white rounded-sm p-1 border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 group-hover:text-primary truncate">
                      {matchedGenset.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {matchedGenset.standbyKva} kVA &bull; {matchedGenset.type}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs font-bold text-primary block">
                      {matchedGenset.priceValueBDT > 0
                        ? `৳${matchedGenset.priceValueBDT.toLocaleString("en-IN")}`
                        : matchedGenset.priceText}
                    </span>
                  </div>
                </Link>
              </div>
            )}

          </div>

        </div>
      </main>

      <Footer />

      {/* Project Selection Modal Dialog */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsProjectModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[85vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-sm bg-slate-100 flex items-center justify-center text-slate-500 hover:text-black hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="mb-4 pr-10">
                <div className="inline-flex items-center gap-2 text-[11px] font-mono text-primary font-bold uppercase tracking-wider mb-1">
                  <span>// STEP 1: FACILITY PROFILE //</span>
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-950">
                  Select What Type of Project
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Choose your facility category to load verified equipment ratings and electrical schedules.
                </p>
              </div>

              {/* Search Box */}
              <div className="relative mb-4">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={projectSearchQuery}
                  onChange={(e) => setProjectSearchQuery(e.target.value)}
                  placeholder="Search project types (e.g. Factory, Garments, Hospital, Residential)..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary"
                />
              </div>

              {/* 14 Project Grid */}
              <div className="overflow-y-auto flex-1 pr-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 scrollbar-thin">
                {filteredProjects.map((proj) => {
                  const isSelected = selectedProjectId === proj.id;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => {
                        setSelectedProjectId(proj.id);
                        setActiveCategory("All");
                        setSelectedItems({});
                        setIsProjectModalOpen(false);
                      }}
                      className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer flex items-start gap-3 relative ${
                        isSelected
                          ? "bg-primary-light/60 border-primary ring-1 ring-primary shadow-xs"
                          : "bg-slate-50/70 border-slate-200/90 hover:bg-white hover:border-slate-300 hover:shadow-xs"
                      }`}
                    >
                      <span className="text-2xl shrink-0 mt-0.5">{proj.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <strong className={`block text-xs font-bold ${isSelected ? "text-primary" : "text-slate-900"}`}>
                            {proj.name}
                          </strong>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center shrink-0 text-[10px]">
                              ✓
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                          {proj.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer Note */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Selecting a new project resets the equipment schedule.</span>
                <span className="font-mono">{filteredProjects.length} options</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Modal with Pre-filled Load */}
      {isQuoteOpen && (
        <QuoteModal
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
          defaultKva={recommendedGeneratorKVA || 100}
          defaultGeneratorName={`${currentProject.name} — Recommended ${recommendedGeneratorKVA || 100} kVA`}
        />
      )}
    </div>
  );
}
