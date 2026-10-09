"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sliders, CheckCircle } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGeneratorName?: string;
  defaultKva?: number;
}

export default function QuoteModal({
  isOpen,
  onClose,
  defaultGeneratorName = "",
  defaultKva = 100
}: QuoteModalProps) {
  const [kwLoad, setKwLoad] = useState(defaultKva ? Math.round(defaultKva * 0.8) : 80);
  const [selectedDivision, setSelectedDivision] = useState("Dhaka Division");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const recommendedKva = Math.ceil((kwLoad / 0.8) * 1.25);
  const fuelRate = (recommendedKva * 0.22).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-black hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-black text-2xl text-slate-900">Quote Request Received!</h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Our chief power engineering consultant will review your specifications and contact you within 2 hours with an official proposal.
                </p>
              </div>
            ) : (
              <div>
                <div className="framer-badge mb-3">
                  <span className="framer-badge-dot" />
                  <span>Official Warehouse Quotation</span>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-slate-950">
                  {defaultGeneratorName ? `Request Quote for ${defaultGeneratorName}` : "Industrial Genset Sizing & Quotation"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 mb-6">
                  Direct warehouse pricing with nationwide delivery, crane unloading, ATS synchronization, and factory warranty.
                </p>

                {/* Sizing Slider */}
                <div className="bg-[#FAFBFD] p-4 sm:p-5 rounded-2xl border border-slate-200 mb-6 space-y-3">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[#F25A24]" />
                      Estimated Connected Electrical Load:
                    </span>
                    <span className="font-mono text-base font-black text-[#F25A24]">{kwLoad} kW</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={kwLoad}
                    onChange={(e) => setKwLoad(Number(e.target.value))}
                    className="w-full accent-[#F25A24] cursor-pointer"
                  />
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200/80 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold font-mono">Recommended Rating</span>
                      <strong className="text-slate-900 font-bold text-sm">{recommendedKva} kVA</strong> (with 25% surge buffer)
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold font-mono">Est. Fuel Burn</span>
                      <strong className="text-slate-900 font-bold text-sm">~{fuelRate} L/hr</strong> @ 75% prime load
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Factory Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Spinning Ltd."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#F25A24]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Person *</label>
                      <input
                        type="text"
                        required
                        placeholder="Full name & designation"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#F25A24]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+880 17XX-XXXXXX"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#F25A24]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Installation Division</label>
                      <select
                        value={selectedDivision}
                        onChange={(e) => setSelectedDivision(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#F25A24] bg-white"
                      >
                        <option>Dhaka Division (Gazipur, Savar, Narayanganj)</option>
                        <option>Chattogram Division (Port, KEPZ, Agrabad)</option>
                        <option>Sylhet Division (Tea Estates & Commercial)</option>
                        <option>Khulna Division (Mongla Port & Industrial)</option>
                        <option>Rajshahi / Rangpur Division</option>
                        <option>Barishal / Mymensingh Division</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Special Requirements (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need 4-pole ATS panel, dual sync, or underground fuel piping..."
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#F25A24]"
                    />
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="w-full framer-btn-primary justify-center py-3 text-sm font-semibold cursor-pointer">
                      <span>Submit RFQ & Get Official Pricing</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
