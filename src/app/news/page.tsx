"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { articles } from "@/lib/news";
import { Section } from "@/components/layout/Section";

export default function NewsPage() {
  const featuredArticle = articles[0];
  const regularArticles = articles.slice(1);

  return (
    <main className="min-h-screen bg-background pt-12">
      <Section>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-4"
        >
          Agency News
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-16 uppercase"
        >
          Insights & <span className="text-gradient-primary">Updates.</span>
        </motion.h1>

        <div className="flex flex-col items-center justify-center py-32 text-center opacity-50">
          <svg className="w-12 h-12 text-primary mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">No Updates Currently Available</h2>
          <p className="text-foreground-muted">Check back later for peace time news, press releases, and insights.</p>
        </div>
      </Section>
    </main>
  );
}
