"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowRight } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  "Perkins 100 kVA",
  "Cummins 250 kVA",
  "Baudouin 500 kVA",
  "Acoustic Canopy",
  "Deep Sea DSE Panel",
  "Stamford Alternator",
  "Ricardo 50 kVA",
  "Volvo Penta 650 kVA"
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = (term: string) => {
    if (!term.trim()) return;
    onClose();
    router.push(`/products?search=${encodeURIComponent(term.trim())}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-md max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-slate-200 pb-3.5">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search generators, kVA rating, engine brands, ATS specs..."
                className="w-full text-sm font-sans focus:outline-none text-slate-900 placeholder:text-slate-400"
                autoFocus
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-7 h-7 rounded-sm bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-4 space-y-2.5">
              <span className="font-mono text-[10.5px] text-slate-400 font-bold uppercase tracking-wider block">
                // POPULAR SEARCHES //
              </span>
              <div className="flex flex-wrap gap-2 pt-0.5">
                {POPULAR_SEARCHES.map((query) => (
                  <button
                    key={query}
                    type="button"
                    onClick={() => handleSearch(query)}
                    className="px-3 py-1.5 rounded-sm bg-slate-100 hover:bg-primary-light text-slate-700 hover:text-primary text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{query}</span>
                    <ArrowRight className="w-3 h-3 opacity-50" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

