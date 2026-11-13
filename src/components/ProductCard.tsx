"use client";

import React from "react";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { GeneratorProduct } from "@/data/products";

interface ProductCardProps {
  product: GeneratorProduct;
  priceText?: string;
  className?: string;
}

export default function ProductCard({
  product,
  priceText,
  className = ""
}: ProductCardProps) {
  const displayPrice =
    priceText ||
    product.priceText ||
    (product.priceValueBDT
      ? `BDT ${product.priceValueBDT.toLocaleString("en-IN")}`
      : "View Details");

  return (
    <div
      className={`bg-white rounded-md border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group ${className}`}
    >
      <div>
        {/* Image Area with Brand Tag in Top Right */}
        <div className="relative bg-[#FAFBFD] p-5 h-56 flex items-center justify-center border-b border-slate-100 overflow-hidden">
          {/* Top Brand Watermark / Badge */}
          {product.brandBadgeText && (
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-block text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm bg-white/90 text-slate-700 border border-slate-200 shadow-xs">
                {product.brandBadgeText}
              </span>
            </div>
          )}

          <Link
            href={`/products/${product.slug}`}
            className="w-full h-full flex items-center justify-center cursor-pointer"
          >
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
          <Link href={`/products/${product.slug}`} className="cursor-pointer">
            <h3 className="font-heading font-bold text-[15px] sm:text-base text-slate-950 group-hover:text-[#F25A24] transition-colors leading-snug line-clamp-2 min-h-[44px]">
              {product.name}
            </h3>
          </Link>

          {/* Dual Spec Pill Badges: [Standby kVA] and [Prime kVA] */}
          <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
            <div className="bg-[#F1F3F5] rounded-sm py-2 px-2.5 text-center border border-slate-200/70">
              <span className="block font-heading font-black text-sm sm:text-base text-slate-950 leading-tight">
                {product.standbyKva} kVA
              </span>
              <span className="block text-[10px] font-mono text-slate-500 uppercase font-semibold">
                Standby
              </span>
            </div>

            <div className="bg-[#F1F3F5] rounded-sm py-2 px-2.5 text-center border border-slate-200/70">
              <span className="block font-heading font-black text-sm sm:text-base text-slate-950 leading-tight">
                {product.primeKva} kVA
              </span>
              <span className="block text-[10px] font-mono text-slate-500 uppercase font-semibold">
                Prime
              </span>
            </div>
          </div>

          {/* Technical Bullet Points with Orange Accent Checkmarks */}
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

      {/* Bottom Full-Width Navy / Brand CTA Button */}
      <div className="p-5 pt-0">
        <Link
          href={`/products/${product.slug}`}
          className="w-full flex items-center justify-center gap-2 bg-[#0E1014] hover:bg-[#F25A24] text-white py-3 px-4 rounded-md text-xs font-bold transition-colors shadow-xs group/btn cursor-pointer"
        >
          <span>{displayPrice}</span>
          <ChevronRight className="w-3.5 h-3.5 text-white/80 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

