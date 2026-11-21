"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import BrandsSection from "@/components/BrandsSection";

export default function BrandsPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedBrandForQuote, setSelectedBrandForQuote] = useState<string>("All Brands");

  const handleOpenQuote = (brandName?: string) => {
    if (brandName) {
      setSelectedBrandForQuote(brandName);
    }
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      <Header
        activePath="brands"
        onOpenQuote={() => handleOpenQuote()}
        onOpenSearch={() => {
          const searchInput = document.getElementById("brand-search");
          if (searchInput) {
            searchInput.focus();
            searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }}
      />

      {/* =========================================================
           BREADCRUMB STRIP
           ========================================================= */}
      <div className="border-b border-slate-100 bg-slate-50/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-3 sm:py-3.5">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-500 font-medium overflow-x-auto scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden whitespace-nowrap">
            <Link href="/" className="hover:text-primary transition-colors shrink-0">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="text-primary font-semibold shrink-0">Brands We Work With</span>
          </div>
        </div>
      </div>

      {/* =========================================================
           MAIN BRANDS CONTENT
           ========================================================= */}
      <main className="flex-1">
        <BrandsSection onOpenQuote={() => handleOpenQuote()} isStandalonePage={true} />
      </main>

      <Footer />

      {/* RFQ Quote Modal */}
      {isQuoteOpen && (
        <QuoteModal
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
          defaultGeneratorName={`Brand Inquiries — ${selectedBrandForQuote}`}
        />
      )}
    </div>
  );
}
