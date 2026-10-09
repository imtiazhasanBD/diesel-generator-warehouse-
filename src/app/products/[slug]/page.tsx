import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-mono text-sm text-slate-500">Loading generator specifications...</div>}>
      <ProductDetailClient product={product} />
    </Suspense>
  );
}
