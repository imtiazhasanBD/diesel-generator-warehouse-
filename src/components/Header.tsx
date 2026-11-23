"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useModal } from "@/context/ModalContext";

export interface HeaderProps {
  onOpenQuote?: () => void;
  onOpenSearch?: () => void;
  activePath?: string;
}

export default function Header({ onOpenQuote, onOpenSearch, activePath = "" }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname() || "";
  const modal = useModal();

  // Determine active route automatically from pathname if not explicitly passed
  const active = activePath || (
    pathname === "/" ? "home" :
    pathname.startsWith("/products") ? "products" :
    pathname.startsWith("/brands") ? "brands" :
    pathname.startsWith("/services") ? "services" :
    pathname.startsWith("/calculator") ? "calculator" :
    pathname.startsWith("/blog") ? "blog" :
    pathname.startsWith("/about") ? "about" :
    pathname.startsWith("/contact") ? "contact" : ""
  );

  const handleQuoteClick = () => {
    if (onOpenQuote) {
      onOpenQuote();
    } else {
      modal.openQuote();
    }
  };

  const handleSearchClick = () => {
    if (onOpenSearch) {
      onOpenSearch();
    } else {
      modal.openSearch();
    }
  };

  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
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
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-7 text-[13px] font-semibold text-slate-700 whitespace-nowrap">
            <Link
              href="/"
              className={`hover:text-primary transition-colors ${active === "home" ? "text-primary font-bold" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`hover:text-primary transition-colors ${active === "products" ? "text-primary font-bold" : ""}`}
            >
              Products
            </Link>
            <Link
              href="/brands"
              className={`hover:text-primary transition-colors ${active === "brands" ? "text-primary font-bold" : ""}`}
            >
              Brands
            </Link>
            <Link
              href="/services"
              className={`hover:text-primary transition-colors ${active === "services" ? "text-primary font-bold" : ""}`}
            >
              Services
            </Link>
            <Link href="/#projects" className="hover:text-primary transition-colors">
              Projects
            </Link>
            {isHome ? (
              <a
                href="#load-calculator"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("load-calculator")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Load Calculator
              </a>
            ) : (
              <Link
                href="/calculator"
                className={`hover:text-primary transition-colors ${active === "calculator" ? "text-primary font-bold" : ""}`}
              >
                Load Calculator
              </Link>
            )}
            <Link
              href="/blog"
              className={`hover:text-primary transition-colors ${active === "blog" ? "text-primary font-bold" : ""}`}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`hover:text-primary transition-colors ${active === "about" ? "text-primary font-bold" : ""}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`hover:text-primary transition-colors ${active === "contact" ? "text-primary font-bold" : ""}`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={handleSearchClick}
              aria-label="Search generators"
              className="w-9 h-9 rounded-md flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={handleQuoteClick}
              className="hidden sm:inline-flex framer-btn-primary rounded-sm cursor-pointer"
            >
              <span>Get a quote</span>
              <div className="btn-arrow-box rounded-sm">
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
            className="lg:hidden border-t border-slate-200 bg-white px-6 py-5 space-y-2.5 text-sm font-semibold overflow-hidden"
          >
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-1.5 transition-colors ${active === "home" ? "text-primary font-bold" : "text-slate-800"}`}
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-1.5 transition-colors ${active === "products" ? "text-primary font-bold" : "text-slate-800"}`}
            >
              Products
            </Link>
            <Link
              href="/brands"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-1.5 transition-colors ${active === "brands" ? "text-primary font-bold" : "text-slate-800"}`}
            >
              Brands
            </Link>
            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-1.5 transition-colors ${active === "services" ? "text-primary font-bold" : "text-slate-800 hover:text-primary"}`}
            >
              Services
            </Link>
            <Link
              href="/#projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-1.5 text-slate-800 hover:text-primary transition-colors"
            >
              Projects
            </Link>
            {isHome ? (
              <a
                href="#load-calculator"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  document.getElementById("load-calculator")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="block py-1.5 text-slate-800 hover:text-primary transition-colors cursor-pointer"
              >
                Load Calculator
              </a>
            ) : (
              <Link
                href="/calculator"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-1.5 transition-colors ${active === "calculator" ? "text-primary font-bold" : "text-slate-800"}`}
              >
                Load Calculator
              </Link>
            )}
            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-1.5 transition-colors ${active === "blog" ? "text-primary font-bold" : "text-slate-800"}`}
            >
              Blog
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-1.5 transition-colors ${active === "about" ? "text-primary font-bold" : "text-slate-800 hover:text-primary"}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-1.5 transition-colors ${active === "contact" ? "text-primary font-bold" : "text-slate-800 hover:text-primary"}`}
            >
              Contact
            </Link>
            <div className="pt-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleQuoteClick();
                }}
                className="w-full framer-btn-primary justify-between cursor-pointer"
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
