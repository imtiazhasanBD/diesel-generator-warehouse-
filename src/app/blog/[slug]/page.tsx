import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/blogs";
import BlogDetailClient from "./BlogDetailClient";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function BlogArticleContent({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts by slugs or fallback to first other posts
  const relatedPosts = post.relatedSlugs
    .map((s) => getBlogPostBySlug(s))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  if (relatedPosts.length < 3) {
    BLOG_POSTS.forEach((p) => {
      if (p.slug !== post.slug && !relatedPosts.some((rp) => rp.slug === p.slug) && relatedPosts.length < 3) {
        relatedPosts.push(p);
      }
    });
  }

  return <BlogDetailClient post={post} relatedPosts={relatedPosts} />;
}

export default function BlogDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-mono text-sm text-slate-500">
          Loading engineering analysis...
        </div>
      }
    >
      <BlogArticleContent params={params} />
    </Suspense>
  );
}

