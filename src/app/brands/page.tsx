"use client";

import React, { useState } from "react";
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
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans">
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
