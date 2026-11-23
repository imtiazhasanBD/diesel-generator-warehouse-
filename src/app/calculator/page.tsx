"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  Download,
  RotateCcw,
  Sparkles,
  Copy,
  Check,
  X,
  PhoneCall,
  SlidersHorizontal,
  HelpCircle,
} from "lucide-react";
import { useModal } from "@/context/ModalContext";
import {
  PROJECT_TYPES,
  STANDARD_GENERATOR_SIZES,
  SelectedItem,
  ProjectType,
} from "@/data/calculatorData";
import { PRODUCTS, GeneratorProduct } from "@/data/products";
import { generateCalculationPDF } from "@/utils/generateCalculationPDF";

// Themed visual styles for category cards matching reference design
const CATEGORY_STYLES = [
  {
    iconBg: "bg-[#EBF5FF] text-[#2563EB]",
    badgeBg: "bg-[#EBF5FF]",
    badgeText: "text-[#2563EB]",
    btnBg: "bg-[#2563EB] hover:bg-[#1D4ED8]",
  },
  {
    iconBg: "bg-[#FEEDED] text-[#E00501]",
    badgeBg: "bg-[#FEEDED]",
    badgeText: "text-[#E00501]",
    btnBg: "bg-[#E00501] hover:bg-[#C50301]",
  },
  {
    iconBg: "bg-[#E6F4EA] text-[#059669]",
    badgeBg: "bg-[#E6F4EA]",
    badgeText: "text-[#059669]",
    btnBg: "bg-[#059669] hover:bg-[#047857]",
  },
  {
    iconBg: "bg-[#F0FDF4] text-[#16A34A]",
    badgeBg: "bg-[#F0FDF4]",
    badgeText: "text-[#16A34A]",
    btnBg: "bg-[#16A34A] hover:bg-[#15803D]",
  },
  {
    iconBg: "bg-[#EEF2FF] text-[#4F46E5]",
    badgeBg: "bg-[#EEF2FF]",
    badgeText: "text-[#4F46E5]",
    btnBg: "bg-[#4F46E5] hover:bg-[#4338CA]",
  },
  {
    iconBg: "bg-[#F5F3FF] text-[#7C3AED]",
    badgeBg: "bg-[#F5F3FF]",
    badgeText: "text-[#7C3AED]",
    btnBg: "bg-[#7C3AED] hover:bg-[#6D28D9]",
  },
  {
    iconBg: "bg-[#FFF1F2] text-[#E11D48]",
    badgeBg: "bg-[#FFF1F2]",
    badgeText: "text-[#E11D48]",
    btnBg: "bg-[#E11D48] hover:bg-[#BE123C]",
  },
  {
    iconBg: "bg-[#FFFBEB] text-[#D97706]",
    badgeBg: "bg-[#FFFBEB]",
    badgeText: "text-[#D97706]",
    btnBg: "bg-[#D97706] hover:bg-[#B45309]",
  },
  {
    iconBg: "bg-[#ECFEFF] text-[#0891B2]",
    badgeBg: "bg-[#ECFEFF]",
    badgeText: "text-[#0891B2]",
    btnBg: "bg-[#0891B2] hover:bg-[#0E7490]",
  },
];

export default function LoadCalculatorPage() {
  // Navigation / Step State: "projects" (Screen 1) or "equipment" (Screen 2)
  const [currentStep, setCurrentStep] = useState<"projects" | "equipment">("projects");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("residential");

  // Selected Equipment Map
  const [selectedItems, setSelectedItems] = useState<Record<string, SelectedItem>>({});

  // Engineering Tuning
  const [powerFactor, setPowerFactor] = useState<number>(0.8);
  const [reserveMargin, setReserveMargin] = useState<number>(0.2); // 20% inrush safety buffer
  const [showTuning, setShowTuning] = useState(false);

  // Quote & PDF Actions State
  const { openQuote } = useModal();
  const [isCopied, setIsCopied] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Current Project Object
  const currentProject: ProjectType = useMemo(() => {
    return PROJECT_TYPES.find((p) => p.id === selectedProjectId) || PROJECT_TYPES[0];
  }, [selectedProjectId]);

  // Handle Project Selection -> Switches completely to Screen 2 (No in-page scrolling)
  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentStep("equipment");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  // Handle Back to Screen 1
  const handleBackToProjects = () => {
    setCurrentStep("projects");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

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

  // Quick Preset Loader (1-Click Fill)
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

  // Automatic Real-Time Calculations
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
    return match || Math.ceil(requiredKVA / 50) * 50;
  }, [requiredKVA, itemsList.length]);

  const estimatedFuelLPH = useMemo(() => {
    return (recommendedGeneratorKVA * 0.22).toFixed(1);
  }, [recommendedGeneratorKVA]);

  // Top Matched Generator in Inventory
  const matchedGenset: GeneratorProduct | undefined = useMemo(() => {
    if (!recommendedGeneratorKVA) return undefined;
    return (
      PRODUCTS.find(
        (p) =>
          p.standbyKva >= recommendedGeneratorKVA * 0.95 &&
          p.standbyKva <= recommendedGeneratorKVA * 1.45
      ) || PRODUCTS[0]
    );
  }, [recommendedGeneratorKVA]);

  // Download PDF Report
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

  // Copy Summary to Clipboard
  const handleCopySummary = () => {
    if (typeof window === "undefined") return;
    const summary = [
      `DGW Generator Load Calculation`,
      `Facility: ${currentProject.name}`,
      `Connected Load: ${totalConnectedKW.toFixed(2)} kW`,
      `Running Load: ${runningKVA.toFixed(2)} kVA (PF: ${powerFactor})`,
      `Recommended Generator: ${recommendedGeneratorKVA} kVA (+${Math.round(reserveMargin * 100)}% starting buffer)`,
      `Estimated Fuel Rate: ~${estimatedFuelLPH} L/hr (75% load)`,
      `Selected Appliances:`,
      ...itemsList.map((i) => ` • ${i.name} × ${i.qty} (${(i.kw * i.qty).toFixed(2)} kW)`),
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-[#F4F6F9] text-slate-900 flex flex-col font-sans">
      {/* Main Content Container matching reference app wrapper */}
      <div className="flex-1 max-w-[940px] mx-auto px-3 sm:px-6 py-4 sm:py-6 w-full">

        {/* =========================================================
             SCREEN 1: STEP 1 - SELECT WHAT TYPE OF PROJECT
             ========================================================= */}
        {currentStep === "projects" && (
          <div className="bg-white rounded-md p-4 sm:p-5 lg:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-200/80">
            {/* Header: "01 · What type of project? [STEP 1]" */}
            <div className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-slate-100 mb-3.5 sm:mb-4">
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-base sm:text-lg text-slate-900">
                  01 ·
                </span>
                <h1 className="font-heading font-bold text-base sm:text-lg text-slate-900">
                  What type of project?
                </h1>
              </div>
              <span className="px-2 py-0.5 rounded-sm bg-[#FEE2E2]/70 text-[#EF4444] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider">
                STEP 1
              </span>
            </div>

            {/* Compact 2-col on mobile, 3 on sm, 4 on md, 5 on lg */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5 lg:gap-2.5">
              {PROJECT_TYPES.map((proj) => {
                const isSelected = selectedProjectId === proj.id;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => handleSelectProject(proj.id)}
                    className={`p-2.5 sm:p-3 lg:py-3 lg:px-2 rounded-md border transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group active:scale-[0.98] min-h-[105px] sm:min-h-[115px] lg:min-h-[110px] ${
                      isSelected
                        ? "bg-white border-primary shadow-sm ring-1 ring-primary/20"
                        : "bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    {/* Centered Emoji / Icon */}
                    <div className="text-2xl sm:text-[26px] lg:text-2xl mb-1 group-hover:scale-110 transition-transform select-none">
                      {proj.icon}
                    </div>

                    {/* Centered Bold Title */}
                    <h2 className="font-heading font-bold text-xs sm:text-[13px] lg:text-[12.5px] text-slate-900 leading-snug line-clamp-2">
                      {proj.name}
                    </h2>

                    {/* Subtitle: "Tap to select" */}
                    <p className="text-[10px] sm:text-[11px] lg:text-[10.5px] text-slate-400 mt-0.5 font-medium group-hover:text-primary transition-colors">
                      Tap to select
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================
             SCREEN 2: STEP 2 - SELECT EQUIPMENT & CAPACITIES (COMPACT MATCHING STEP 1)
             ========================================================= */}
        {currentStep === "equipment" && (
          <div className="space-y-3 sm:space-y-3.5">
            {/* Top Container: Header with Back button, Title & Real-Time Capacity Banner */}
            <div className="bg-white rounded-md p-3 sm:p-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-200/80">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-2 sm:pb-2.5 border-b border-slate-100 mb-2 sm:mb-2.5">
                <button
                  type="button"
                  onClick={handleBackToProjects}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-[13px] font-bold transition-all cursor-pointer shadow-2xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
                  <span>Back</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-black text-base sm:text-lg text-slate-900">
                    02 ·
                  </span>
                  <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900">
                    {currentProject.name}
                  </h2>
                </div>

                <span className="px-2 py-0.5 rounded-sm bg-[#E6F4EA] text-[#059669] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider">
                  STEP 2
                </span>
              </div>

              {/* Subtitle matching reference */}
              <p className="text-xs text-slate-500 mb-2.5">
                Tap an equipment item and set its quantity. The required generator capacity calculates automatically.
              </p>

              {/* Real-Time Generator Capacity Banner */}
              <div className="p-2.5 sm:p-3 rounded-md bg-gradient-to-r from-[#141518] to-[#1e222d] text-white flex flex-col md:flex-row md:items-center justify-between gap-2.5 shadow-md">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Recommended Generator Size</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-heading font-black text-2xl sm:text-3xl text-primary tracking-tight">
                      {recommendedGeneratorKVA || 0}
                    </span>
                    <span className="text-base font-bold text-white">kVA</span>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono ml-1.5">
                      (20% inrush buffer included)
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[10.5px] sm:text-[11.5px] text-slate-300 mt-0.5 font-medium">
                    <span>Connected: <strong className="text-white">{totalConnectedKW.toFixed(1)} kW</strong></span>
                    <span>•</span>
                    <span>Running: <strong className="text-white">{runningKVA.toFixed(1)} kVA</strong></span>
                    <span>•</span>
                    <span>Fuel: <strong className="text-primary">~{estimatedFuelLPH} L/h</strong></span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      openQuote(
                        `${currentProject.name} — Recommended ${recommendedGeneratorKVA || 100} kVA`,
                        recommendedGeneratorKVA || 100
                      )
                    }
                    disabled={itemsList.length === 0}
                    className="framer-btn-primary py-1.5 px-3 text-xs font-bold rounded-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed justify-center shadow-md shadow-primary/25"
                  >
                    <span>Request Quote</span>
                    <div className="btn-arrow-box">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    disabled={itemsList.length === 0 || isGeneratingPDF}
                    className="py-1.5 px-2.5 rounded-sm bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
                  >
                    <Download className="w-3.5 h-3.5 text-primary" />
                    <span>{isGeneratingPDF ? "Generating..." : "PDF"}</span>
                  </button>

                  {currentProject.quickPreset && (
                    <button
                      type="button"
                      onClick={handleLoadPreset}
                      className="py-1.5 px-2.5 rounded-sm bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="1-Click fill typical baseline setup"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>1-Click Fill</span>
                    </button>
                  )}

                  {itemsList.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedItems({})}
                      className="py-1.5 px-2 rounded-sm border border-white/20 hover:bg-red-500/20 text-slate-300 hover:text-red-300 text-xs font-bold transition-colors cursor-pointer"
                      title="Reset all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Equipment Category Cards (2-Column Grid on md+, 1-Column on mobile - Compact matching Step 1) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 items-start">
              {currentProject.groups.map((group, groupIdx) => {
                const theme = CATEGORY_STYLES[groupIdx % CATEGORY_STYLES.length];
                const sectionNumber = String(groupIdx + 1).padStart(2, "0");

                return (
                  <div
                    key={group.name}
                    className="bg-white rounded-md p-3 sm:p-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-200/80"
                  >
                    {/* Category Header */}
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        {/* Soft Rounded Icon Box */}
                        <div
                          className={`w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-sm flex items-center justify-center text-sm sm:text-base shrink-0 ${theme.iconBg}`}
                        >
                          {group.icon}
                        </div>

                        <div>
                          <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                            {group.name}
                          </h3>
                          <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5">
                            {group.items.length} equipment options
                          </p>
                        </div>
                      </div>

                      {/* Number Badge (e.g. 01, 02, 03) */}
                      <span
                        className={`px-1.5 py-0.5 rounded-sm text-[10px] font-bold font-mono ${theme.badgeBg} ${theme.badgeText}`}
                      >
                        {sectionNumber}
                      </span>
                    </div>

                    {/* Equipment Rows Stack */}
                    <div className="space-y-1.5">
                      {group.items.map((item) => {
                        const key = `${selectedProjectId}|${item.name}`;
                        const currentQty = selectedItems[key]?.qty || 0;
                        const isSelected = currentQty > 0;

                        return (
                          <div
                            key={item.name}
                            className={`flex items-center justify-between py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-sm transition-colors ${
                              isSelected
                                ? "bg-red-50/60 border border-primary/20"
                                : "bg-slate-50/80 hover:bg-slate-100/70"
                            }`}
                          >
                            {/* Equipment Name on Left */}
                            <div className="min-w-0 pr-2">
                              <span className="font-heading font-bold text-xs sm:text-sm text-slate-800 block truncate">
                                {item.name}
                              </span>
                              <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                                {item.kw >= 1 ? `${item.kw} kW` : `${Math.round(item.kw * 1000)} W`} each
                              </span>
                            </div>

                            {/* Stepper on Right: [-] 0 [+] */}
                            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                              {/* Minus Button */}
                              <button
                                type="button"
                                onClick={() =>
                                  updateQty(item.name, item.kw, group.name, -1)
                                }
                                disabled={currentQty === 0}
                                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-sm border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 cursor-pointer transition-all shadow-2xs active:scale-95"
                                aria-label={`Decrease ${item.name}`}
                              >
                                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                              </button>

                              {/* Direct Quantity Display */}
                              <span
                                className={`w-6 sm:w-7 text-center font-heading font-black text-xs sm:text-sm tabular-nums ${
                                   isSelected ? "text-primary" : "text-slate-800"
                                }`}
                              >
                                {currentQty}
                              </span>

                              {/* Themed Colored Plus Button */}
                              <button
                                type="button"
                                onClick={() =>
                                  updateQty(item.name, item.kw, group.name, 1)
                                }
                                className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-sm ${theme.btnBg} text-white flex items-center justify-center cursor-pointer transition-all shadow-2xs active:scale-95`}
                                aria-label={`Increase ${item.name}`}
                              >
                                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* In-Stock Matched Generator Card */}
            {recommendedGeneratorKVA > 0 && matchedGenset && (
              <div className="bg-white rounded-md p-3 sm:p-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] sm:text-xs font-bold text-primary uppercase tracking-wider">
                    Matched In-Stock Generator Unit
                  </span>
                  <Link
                    href={`/products/${matchedGenset.slug}`}
                    className="text-[11px] sm:text-xs font-bold text-slate-500 hover:text-primary transition-colors"
                  >
                    View Specs &rarr;
                  </Link>
                </div>

                <Link
                  href={`/products/${matchedGenset.slug}`}
                  className="flex items-center gap-3 p-2.5 sm:p-3 rounded-md bg-slate-50 hover:bg-red-50/60 border border-slate-200 transition-all group block"
                >
                  <img
                    src={matchedGenset.image}
                    alt={matchedGenset.name}
                    className="w-11 h-11 sm:w-12 sm:h-12 object-contain bg-white rounded-sm p-1 border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-primary truncate">
                      {matchedGenset.name}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-500 font-mono mt-0.5">
                      {matchedGenset.standbyKva} kVA &bull; {matchedGenset.type}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs sm:text-sm font-bold text-primary block">
                      {matchedGenset.priceValueBDT > 0
                        ? `৳${matchedGenset.priceValueBDT.toLocaleString("en-IN")}`
                        : matchedGenset.priceText}
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
             MOBILE STICKY BOTTOM RESULT BAR (< 1024px)
             ========================================================= */}
        {currentStep === "equipment" && (
          <div className="fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl flex items-center justify-between gap-3 px-4 max-w-[1020px] mx-auto">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">
                Recommended Generator:
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-heading font-black text-2xl text-primary">
                  {recommendedGeneratorKVA || 0}
                </span>
                <span className="font-bold text-xs text-slate-900">kVA</span>
                <span className="text-[11px] text-slate-400 font-mono ml-1.5">
                  ({itemsList.length} items)
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                openQuote(
                  `${currentProject.name} — Recommended ${recommendedGeneratorKVA || 100} kVA`,
                  recommendedGeneratorKVA || 100
                )
              }
              disabled={itemsList.length === 0}
              className="framer-btn-primary py-2.5 px-4 text-xs rounded-sm font-bold cursor-pointer disabled:opacity-40"
            >
              <span>Get Quote</span>
              <div className="btn-arrow-box">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
