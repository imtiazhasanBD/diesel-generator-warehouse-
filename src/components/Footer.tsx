"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0E1014] text-white pt-20 pb-12 border-t border-slate-800">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-slate-800">

          {/* Left: Newsletter & Bio (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block bg-white px-3.5 py-2 rounded-xl hover:opacity-95 transition-opacity">
              <img
                src="/assets/images/diese-generator-warehouse-logo.png"
                alt="Diesel Generator Warehouse"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Diesel Generator Warehouse is Bangladesh&apos;s leading heavy power equipment supplier. Direct importer and distributor of Perkins, Cummins, Stamford, and Ricardo power plants with nationwide installation and 24/7 service.
            </p>

            <div className="space-y-3 pt-2">
              <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                // STAY CONNECTED //
              </span>
              <form
                className="flex items-center gap-2 max-w-sm"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! You are subscribed to Diesel Generator Warehouse technical updates.");
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your work email"
                  className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs text-white focus:outline-none focus:border-[#F25A24]"
                />
                <button type="submit" className="framer-btn-primary shrink-0 px-4 py-2.5 cursor-pointer">
                  <span>Join</span>
                </button>
              </form>
            </div>
          </div>

          {/* Col 2: Products (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono font-bold text-xs text-white uppercase tracking-wider">// PRODUCTS //</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/products?brand=Perkins" className="hover:text-white transition-colors">Perkins (UK)</Link></li>
              <li><Link href="/products?brand=Cummins" className="hover:text-white transition-colors">Cummins (USA)</Link></li>
              <li><Link href="/products?brand=Ricardo" className="hover:text-white transition-colors">Ricardo (Silent)</Link></li>
              <li><Link href="/products?brand=FG+Wilson" className="hover:text-white transition-colors">FG Wilson (Belfast)</Link></li>
              <li><Link href="/products?brand=Aksa" className="hover:text-white transition-colors">Aksa Heavy Industrial</Link></li>
              <li><Link href="/products" className="text-[#F25A24] font-semibold hover:underline">View All Generators →</Link></li>
            </ul>
          </div>

          {/* Col 3: Company (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono font-bold text-xs text-white uppercase tracking-wider">// COMPANY //</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/#capabilities" className="hover:text-white transition-colors">Capabilities</Link></li>
              <li><Link href="/#schematic" className="hover:text-white transition-colors">Engineering CAD</Link></li>
              <li><Link href="/#projects" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="/#blog" className="hover:text-white transition-colors">Insights</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Coordinates (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono font-bold text-xs text-white uppercase tracking-wider">// CONTACT INFO //</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F25A24]" />
                <a href="tel:+8801234567890" className="hover:text-white transition-colors">+880 1234-567890</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F25A24]" />
                <a href="mailto:sales@dieselgeneratorwarehouse.com" className="hover:text-white transition-colors">sales@dieselgeneratorwarehouse.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F25A24] mt-0.5 shrink-0" />
                <span>House 12, Road 7, Motijheel, Dhaka, Bangladesh</span>
              </li>
              <li className="font-mono text-[10px] text-slate-500 pt-2">
                23.8103° N, 90.4125° E // DHAKA HQ
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Diesel Generator Warehouse BD. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
