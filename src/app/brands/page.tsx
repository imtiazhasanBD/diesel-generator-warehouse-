"use client";

import React from "react";
import BrandsSection from "@/components/BrandsSection";
import { useModal } from "@/context/ModalContext";

export default function BrandsPage() {
  const { openQuote } = useModal();

  return (
    <div className="bg-[#F8F9FA] text-slate-900 flex flex-col font-sans">
      <div className="flex-1">
        <BrandsSection
          onOpenQuote={(brandName) =>
            openQuote(brandName ? `Brand Inquiries — ${brandName}` : "Brand Consultation Inquiry")
          }
          isStandalonePage={true}
        />
      </div>
    </div>
  );
}
