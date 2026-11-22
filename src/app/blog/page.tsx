"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight, ChevronRight, Clock, RotateCcw } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogs";

const CATEGORIES = [
  "All",
  "Engineering Guide",
  "Maintenance",
  "Acoustics",
  "Brand Comparison",
  "Electrical Systems",
  "Efficiency",
] as const;

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-[#F8F9FA] text-slate-900 flex flex-col font-sans">

      {/* =========================================================
           HEADER SECTION (SIMPLE & CLEAN)
           ========================================================= */}
      <section className="bg-white border-b border-slate-200/80 pt-8 pb-10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </li>
              <li className="text-primary font-bold">Blog</li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2.5 text-xs font-bold text-slate-900 tracking-tight mb-2">
                <span className="w-8 h-[3px] bg-primary rounded-sm inline-block" />
                <span>Insights &amp; Articles</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141518] tracking-[-0.03em] leading-tight">
                Latest from our <span className="text-primary">blog</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                Engineering guides, maintenance protocols, and sizing insights for diesel generator systems in Bangladesh.
              </p>
            </div>

            {/* Simple Search Box */}
            <div className="relative w-full sm:w-80 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-slate-50 border border-slate-300 rounded-sm pl-10 pr-8 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-sm text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
           BLOG GRID (CLEAN 3-COLUMN LAYOUT)
           ========================================================= */}
      <div className="flex-1 max-w-[1400px] mx-auto px-6 sm:px-10 py-10 sm:py-14 w-full">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-slate-200 p-8">
            <h3 className="text-lg font-heading font-bold text-slate-800 mb-2">
              No articles found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-6">
              We couldn&apos;t find any articles matching your search. Try another keyword or clear the filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="framer-btn-primary mx-auto cursor-pointer text-xs"
            >
              <span>Reset filter</span>
              <div className="btn-arrow-box">
                <RotateCcw className="w-3.5 h-3.5 text-white" />
              </div>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white rounded-lg overflow-hidden border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Article Thumbnail */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block relative aspect-[16/10] overflow-hidden bg-slate-900"
                  >
                    <img
                      src={post.image}
                      alt={post.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-sm bg-white/95 backdrop-blur-md text-primary font-bold text-[10px] uppercase tracking-wider shadow-sm border border-slate-200/80">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mb-2.5">
                      <span>{post.date}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900 tracking-tight leading-snug group-hover:text-primary transition-colors mb-2.5 line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed line-clamp-2 font-normal">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 sm:px-6 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-700">
                    {post.author.name}
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
