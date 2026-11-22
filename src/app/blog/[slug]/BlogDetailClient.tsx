"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Share2,
  Check,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Zap,
  Phone,
  FileText,
  SlidersHorizontal,
  ShieldCheck,
  Wrench,
  Copy
} from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { BlogPost } from "@/data/blogs";

interface BlogDetailClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogDetailClient({
  post,
  relatedPosts,
}: BlogDetailClientProps) {
  const { openQuote } = useModal();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-[#F8F9FA] text-slate-900 flex flex-col font-sans">

      {/* =========================================================
           ARTICLE HERO & HEADER SECTION
           ========================================================= */}
      <section className="relative bg-[#0E1014] text-white pt-10 sm:pt-14 pb-16 sm:pb-20 border-b border-slate-800 overflow-hidden">
        {/* Warm Ambient Glow */}
        <div
          className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full pointer-events-none select-none z-0 blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(224, 5, 1, 0.35) 0%, rgba(160, 2, 1, 0.12) 50%, transparent 75%)",
          }}
        />

        {/* Architectural Dashed Lines */}
        <div className="absolute inset-0 max-w-[1400px] mx-auto px-6 sm:px-10 pointer-events-none z-0 hidden lg:block">
          <div className="w-full h-full grid grid-cols-4 border-x border-dashed border-white/[0.06]">
            <div className="border-r border-dashed border-white/[0.06] h-full" />
            <div className="border-r border-dashed border-white/[0.06] h-full" />
            <div className="border-r border-dashed border-white/[0.06] h-full" />
            <div className="h-full" />
          </div>
        </div>

        <div className="relative z-10 max-w-[1080px] mx-auto px-6 sm:px-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              </li>
              <li className="text-slate-300">
                {post.category}
              </li>
            </ol>
          </nav>

          {/* Badge & Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-sm bg-primary text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>{post.date}</span>
            </div>
            <span className="text-slate-600">&bull;</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Article Main Headline */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-[-0.03em] leading-[1.12] text-white mb-8">
            {post.title}
          </h1>

          {/* Author Card & Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary/40 shadow-sm"
              />
              <div>
                <div className="text-sm font-bold text-white font-heading">
                  {post.author.name}
                </div>
                <div className="text-xs text-slate-400">
                  {post.author.role}
                </div>
              </div>
            </div>

            {/* Share / Copy Link Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer"
                title="Copy article link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300 font-bold">Link copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Share article</span>
                  </>
                )}
              </button>

              <button
                onClick={() => openQuote(`Engineering inquiry regarding: ${post.title}`)}
                className="framer-btn-primary rounded-sm cursor-pointer text-xs"
              >
                <span>Ask engineer</span>
                <div className="btn-arrow-box rounded-sm">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
           ARTICLE MAIN READING CONTENT
           ========================================================= */}
      <div className="flex-1 max-w-[1080px] mx-auto px-6 sm:px-10 py-12 lg:py-16 w-full">
        <article>
          {/* Main Hero Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] sm:aspect-[16/8] shadow-md border border-slate-200/80 mb-10 bg-slate-900">
            <img
              src={post.image}
              alt={post.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* KEY TAKEAWAYS CALLOUT BOX */}
          <div className="bg-primary-light/80 border-l-4 border-primary rounded-r-xl p-6 sm:p-8 mb-12 shadow-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-md bg-primary text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Executive Summary &amp; Engineering Takeaways
              </h2>
            </div>

            <ul className="space-y-3">
              {post.content.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-800 leading-snug">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* INTRODUCTION */}
          <div className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-10 pb-8 border-b border-slate-200">
            <p>{post.content.intro}</p>
          </div>

          {/* ARTICLE BODY SECTIONS */}
          <div className="space-y-12">
            {post.content.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                {/* Section Heading with Industrial Left Marker */}
                <h2 className="font-heading text-xl sm:text-2xl lg:text-[26px] font-bold text-slate-950 tracking-tight flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-primary rounded-sm inline-block shrink-0" />
                  <span>{section.heading}</span>
                </h2>

                {/* Body Paragraphs */}
                <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                  {section.body.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Table if present */}
                {section.table && (
                  <div className="my-6 overflow-x-auto rounded-lg border border-slate-200 shadow-xs bg-white">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-[#141518] text-white font-mono text-[11px] sm:text-xs uppercase tracking-wider">
                        <tr>
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="py-3 px-4 sm:px-5 font-semibold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {section.table.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}
                          >
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`py-3 px-4 sm:px-5 text-slate-800 ${
                                  cIdx === 0 ? "font-semibold text-slate-950" : ""
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Callout if present */}
                {section.callout && (
                  <div className="bg-[#141518] text-white p-6 sm:p-7 rounded-xl my-6 border-l-4 border-primary shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-2 font-bold">
                      <Wrench className="w-3.5 h-3.5 text-primary" />
                      <span>// FIELD APPLICATION DIRECTIVE //</span>
                    </div>
                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                      {section.callout}
                    </p>
                  </div>
                )}
              </section>
            ))}

            {/* CONCLUSION */}
            <div className="pt-8 border-t border-slate-200 space-y-4">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-950 tracking-tight flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-sm inline-block shrink-0" />
                <span>Conclusion &amp; Engineering Recommendations</span>
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {post.content.conclusion}
              </p>
            </div>
          </div>

          {/* TAGS ROW */}
          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">
              Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-sm bg-white border border-slate-200 text-slate-700 text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* AUTHOR BIO CARD */}
          <div className="mt-10 p-6 sm:p-8 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-primary/30 shrink-0"
            />
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono text-primary uppercase font-bold tracking-wider mb-1">
                <span>Article Author</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                {post.author.name}
              </h3>
              <p className="text-xs text-slate-500 mb-3">{post.author.role}</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Specialized in electrical load calculations, emergency standby generator synchronization, and high-ambient acoustic ventilation engineering across ready-made garments, pharmaceutical cleanrooms, and commercial facilities in Dhaka and Chittagong.
              </p>
            </div>
          </div>

          {/* PLANT CONSULTATION BANNER */}
          <div className="mt-10 rounded-xl bg-gradient-to-r from-[#141518] to-[#1f2228] text-white p-7 sm:p-9 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md">
            <div>
              <div className="text-primary font-mono text-xs uppercase tracking-widest font-bold mb-1">
                // FACTORY &amp; COMMERCIAL POWER ASSESSMENT //
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2">
                Need an accurate electrical calculation for this topic?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                Our certified engineers review your connected motor load schedule, run acoustic modeling, and recommend turnkey generator setups.
              </p>
            </div>

            <button
              onClick={() => openQuote(`Engineering inquiry regarding: ${post.title}`)}
              className="framer-btn-primary rounded-sm cursor-pointer shrink-0"
            >
              <span>Get free consultation</span>
              <div className="btn-arrow-box rounded-sm">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </button>
          </div>
        </article>

        {/* =========================================================
             RELATED ARTICLES SECTION
             ========================================================= */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 sm:mt-24 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 tracking-tight mb-1">
                  <span className="w-6 h-[3px] bg-primary rounded-sm inline-block" />
                  <span>Further Reading</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                  Related Technical Analyses
                </h2>
              </div>

              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover"
              >
                <span>View all articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.slice(0, 3).map((rp) => (
                <article
                  key={rp.slug}
                  className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <Link
                      href={`/blog/${rp.slug}`}
                      className="block relative aspect-[16/10] overflow-hidden bg-slate-900"
                    >
                      <img
                        src={rp.image}
                        alt={rp.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-sm bg-white/95 text-primary text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                        {rp.category}
                      </span>
                    </Link>

                    <div className="p-5">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mb-2">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{rp.readTime}</span>
                      </div>

                      <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
                        <Link href={`/blog/${rp.slug}`}>{rp.title}</Link>
                      </h3>

                      <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                        {rp.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">
                      {rp.author.name}
                    </span>
                    <Link
                      href={`/blog/${rp.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/blog"
                className="framer-btn-dark inline-flex rounded-sm text-xs"
              >
                <span>View all articles</span>
                <div className="btn-arrow-box rounded-sm">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

