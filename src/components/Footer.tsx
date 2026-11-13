"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer
      id="contact"
      className="relative bg-[#111113] text-white pt-24 lg:pt-32 pb-20 lg:pb-28 overflow-hidden"
    >
      {/* Ambient Diagonal Warm Orange Glows (Top-Right & Bottom-Left) */}
      <div
        className="absolute -top-24 -right-24 w-[460px] h-[460px] sm:w-[620px] sm:h-[620px] rounded-full pointer-events-none select-none z-0 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 56, 10, 0.56) 0%, rgba(160, 36, 7, 0.24) 45%, transparent 72%)",
        }}
      />
      <div
        className="absolute -bottom-32 -left-24 w-[460px] h-[460px] sm:w-[620px] sm:h-[620px] rounded-full pointer-events-none select-none z-0 blur-[105px]"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 56, 10, 0.50) 0%, rgba(155, 34, 6, 0.22) 45%, transparent 72%)",
        }}
      />

      {/* 4-Column Vertical Dashed Architectural Grid Lines */}
      <div className="absolute inset-0 max-w-[1400px] mx-auto px-6 sm:px-10 pointer-events-none z-0 hidden lg:block">
        <div className="w-full h-full grid grid-cols-4 border-x border-dashed border-white/[0.08]">
          <div className="border-r border-dashed border-white/[0.08] h-full" />
          <div className="border-r border-dashed border-white/[0.08] h-full" />
          <div className="border-r border-dashed border-white/[0.08] h-full" />
          <div className="h-full" />
        </div>
      </div>

      {/* Giant Edge-to-Edge Bottom Watermark */}
      <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-4 sm:px-8 pointer-events-none select-none z-0 overflow-hidden">
        <div className="font-heading font-bold uppercase text-white/[0.04] text-[clamp(50px,13vw,196px)] leading-[0.76] tracking-[-0.03em] text-center whitespace-nowrap translate-y-[18%]">
          GENERATORS
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10">
        {/* 4-Column Content Grid Aligned to Architectural Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0">
          {/* Col 1: Stay Connected + Newsletter */}
          <div className="lg:pr-8">
            <h3 className="font-heading text-[18px] font-semibold text-white/90 tracking-[-0.015em] mb-3">
              Stay connected
            </h3>
            <p className="text-[13px] text-[#8E9096] leading-[1.55] max-w-[240px] mb-5">
              Join our newsletter for tips, updates, and project highlights
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex items-center justify-between bg-[#151618]/90 border border-white/[0.1] rounded-[6px_6px_12px_6px] p-1.5 pl-4 max-w-[300px] focus-within:border-white/25 transition-colors"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (subscribed) setSubscribed(false);
                }}
                placeholder={subscribed ? "Subscribed!" : "Enter your email"}
                className="bg-transparent text-[13px] text-white placeholder:text-[#787A80] focus:outline-none w-full min-w-0 pr-2"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="w-9 h-9 rounded-[4px_4px_9px_4px] bg-white hover:bg-slate-100 text-[#111214] flex items-center justify-center shrink-0 transition-transform hover:translate-x-0.5 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </form>
          </div>

          {/* Col 2: Links (2 Sub-Columns) */}
          <div className="lg:px-6">
            <h3 className="font-heading text-[18px] font-semibold text-white/90 tracking-[-0.015em] mb-4">
              Links
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-[13.5px]">
              <div className="space-y-3">
                <Link
                  href="/"
                  className="block text-[#D4380A] hover:text-[#F25A24] font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="block text-white/85 hover:text-white transition-colors"
                >
                  Products
                </Link>
                <Link
                  href="/#capabilities"
                  className="block text-white/85 hover:text-white transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="/#blog"
                  className="block text-white/85 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </div>

              <div className="space-y-3">
                <Link
                  href="/#projects"
                  className="block text-white/85 hover:text-white transition-colors"
                >
                  Case Studies
                </Link>
                <Link
                  href="/#schematic"
                  className="block text-white/85 hover:text-white transition-colors"
                >
                  Engineering
                </Link>
                <Link
                  href="/#industries"
                  className="block text-white/85 hover:text-white transition-colors"
                >
                  Industries
                </Link>
                <Link
                  href="/#about"
                  className="block text-white/85 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Col 3: Contact Info */}
          <div className="lg:px-6">
            <h3 className="font-heading text-[18px] font-semibold text-white/90 tracking-[-0.015em] mb-4">
              Contact Info
            </h3>
            <div className="space-y-2.5 text-[13.5px] text-white/85">
              <a
                href="tel:+8801234567890"
                className="block hover:text-white transition-colors"
              >
                +880 1234-567890
              </a>
              <a
                href="mailto:sales@dieselgeneratorwarehouse.com"
                className="block hover:text-white transition-colors break-all"
              >
                sales@dieselgeneratorwarehouse.com
              </a>
              <p className="text-[12.5px] text-[#8E9096] pt-1">
                House 12, Road 7, Motijheel, Dhaka
              </p>
            </div>
          </div>

          {/* Col 4: Business Hours */}
          <div className="lg:pl-6">
            <h3 className="font-heading text-[18px] font-semibold text-white/90 tracking-[-0.015em] mb-4">
              Hours
            </h3>
            <div className="space-y-2.5 text-[13.5px] text-[#8E9096]">
              <p>Sat – Thu: 9:00am - 6:00pm</p>
              <p>Friday: Closed</p>
              <p className="text-[#D4380A] font-medium">24/7 Field Support</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Social Row */}
        <div className="mt-20 lg:mt-28 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12.5px]">
          <p className="text-white/45">
            © 2026 Diesel Generator Warehouse. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-white/60">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13.5 9H16l-.5 3h-2v9h-3v-9H9V9h1.5V7.2C10.5 4.9 11.9 3.5 14.3 3.5c.9 0 1.7.1 1.7.1v2.6h-1.2c-1 0-1.3.6-1.3 1.3V9z" />
              </svg>
              <span>Facebook</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <svg
                className="w-3.5 h-3.5 stroke-current fill-none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
