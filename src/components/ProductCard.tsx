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
        <div className="relative bg-[#FAFBFD] p-3 sm:p-5 h-36 sm:h-48 md:h-56 flex items-center justify-center border-b border-slate-100 overflow-hidden">
          {/* Top Brand Watermark / Badge */}
          {product.brandBadgeText && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
              <span className="inline-block text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-sm bg-white/90 text-slate-700 border border-slate-200 shadow-xs">
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
        <div className="p-3 sm:p-4 md:p-5">
          {/* Generator Title */}
          <Link href={`/products/${product.slug}`} className="cursor-pointer">
            <h3 className="font-heading font-bold text-xs sm:text-sm md:text-base text-slate-950 group-hover:text-primary transition-colors leading-snug line-clamp-2 min-h-[34px] sm:min-h-[44px]">
              {product.name}
            </h3>
          </Link>

          {/* Dual Spec Pill Badges: [Standby kVA] and [Prime kVA] */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-2.5 sm:mt-4 mb-2.5 sm:mb-4">
            <div className="bg-[#F1F3F5] rounded-sm py-1.5 sm:py-2 px-1 sm:px-2.5 text-center border border-slate-200/70">
              <span className="block font-heading font-bold text-xs sm:text-sm md:text-base text-slate-950 leading-tight">
                {product.standbyKva} kVA
              </span>
              <span className="block text-[8.5px] sm:text-[10px] font-mono text-slate-500 uppercase font-semibold">
                Standby
              </span>
            </div>

            <div className="bg-[#F1F3F5] rounded-sm py-1.5 sm:py-2 px-1 sm:px-2.5 text-center border border-slate-200/70">
              <span className="block font-heading font-bold text-xs sm:text-sm md:text-base text-slate-950 leading-tight">
                {product.primeKva} kVA
              </span>
              <span className="block text-[8.5px] sm:text-[10px] font-mono text-slate-500 uppercase font-semibold">
                Prime
              </span>
            </div>
          </div>

          {/* Technical Bullet Points with Orange Accent Checkmarks */}
          <div className="space-y-1 sm:space-y-1.5 pt-2 border-t border-slate-100 text-[9.5px] sm:text-[11px] font-semibold text-slate-600">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary shrink-0 stroke-[2.5]" />
              <span className="uppercase truncate">
                FUEL: <strong className="text-slate-900">{product.fuelType}</strong>
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary shrink-0 stroke-[2.5]" />
              <span className="uppercase truncate">
                CAPACITY: <strong className="text-slate-900">{product.fuelCapacity}</strong>
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary shrink-0 stroke-[2.5]" />
              <span className="uppercase truncate">
                HZ: <strong className="text-slate-900">{product.frequencyHz}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Navy / Brand CTA Button */}
      <div className="p-3 pt-0 sm:p-5 sm:pt-0">
        <Link
          href={`/products/${product.slug}`}
          className="w-full flex items-center justify-center gap-1.5 sm:gap-2 bg-dark hover:bg-primary text-white py-2 sm:py-3 px-2 sm:px-4 rounded-md text-[11px] sm:text-xs font-bold transition-colors shadow-xs group/btn cursor-pointer"
        >
          <span className="truncate">{displayPrice}</span>
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/80 group-hover/btn:translate-x-0.5 transition-transform shrink-0" />
        </Link>
      </div>
    </div>
  );
}

