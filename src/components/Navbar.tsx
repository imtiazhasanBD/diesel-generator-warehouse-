"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onOpenQuote?: () => void;
  onOpenSearch?: () => void;
  activePath?: string;
}

export default function Navbar({ onOpenQuote, onOpenSearch, activePath = "" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <img
              src="/assets/images/diese-generator-warehouse-logo.png"
              alt="Diesel Generator Warehouse"
              className="h-9 sm:h-11 w-auto object-contain py-0.5"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-semibold text-slate-600">
            <Link
              href="/"
              className={`hover:text-[#F25A24] transition-colors ${activePath === "home" ? "text-[#F25A24] font-bold" : "text-slate-950"}`}
            >
              Home
            </Link>
            <Link href="/#about" className="hover:text-[#F25A24] transition-colors">
              About
            </Link>
            <Link href="/#capabilities" className="hover:text-[#F25A24] transition-colors">
              Capabilities
            </Link>
            <Link href="/#schematic" className="hover:text-[#F25A24] transition-colors">
              Engineering
            </Link>
            <Link
              href="/products"
              className={`hover:text-[#F25A24] transition-colors flex items-center gap-1.5 ${activePath === "products" ? "text-[#F25A24] font-bold" : "text-slate-950"}`}
            >
              <span>Products</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F25A24]" />
            </Link>
            <Link href="/#industries" className="hover:text-[#F25A24] transition-colors">
              Industries
            </Link>
            <Link href="/#projects" className="hover:text-[#F25A24] transition-colors">
              Case Studies
            </Link>
            <Link href="/#blog" className="hover:text-[#F25A24] transition-colors">
              Blog
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenSearch}
              aria-label="Search generators"
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenQuote}
              className="hidden sm:inline-flex framer-btn-primary cursor-pointer"
            >
              <span>Get a quote</span>
              <div className="btn-arrow-box">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-black cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-slate-200 bg-white px-6 py-5 space-y-3 text-sm font-semibold overflow-hidden"
          >
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-900 py-1">
              Home
            </Link>
            <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-700 py-1">
              About
            </Link>
            <Link href="/#capabilities" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-700 py-1">
              Capabilities
            </Link>
            <Link href="/#schematic" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-700 py-1">
              Engineering
            </Link>
            <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block text-[#F25A24] font-bold py-1">
              Products Lineup (Browse 20-2500 kVA)
            </Link>
            <Link href="/#industries" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-700 py-1">
              Industries
            </Link>
            <Link href="/#projects" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-700 py-1">
              Case Studies
            </Link>
            <Link href="/#blog" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-700 py-1">
              Blog
            </Link>
            <div className="pt-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenQuote) onOpenQuote();
                }}
                className="w-full framer-btn-primary justify-center cursor-pointer"
              >
                <span>Get a quote</span>
                <div className="btn-arrow-box">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
