"use client";

import { motion } from "framer-motion";
import { articles } from "@/lib/news";
import { Section } from "@/components/layout/Section";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

export default function ArticlePage() {
  const params = useParams();
  const article = articles.find(a => a.slug === params.slug);

  if (!article) return notFound();

  return (
    <main className="min-h-screen bg-background">
      <Section className="pt-20">
        <Link href="/news" className="inline-flex items-center gap-2 text-xs font-bold text-foreground-muted hover:text-primary transition-colors mb-12 group">
          <svg className="w-3 h-3 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          BACK TO NEWS
        </Link>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-black text-primary tracking-[0.2em] uppercase">{article.category}</span>
              <span className="h-px w-6 bg-border" />
              <span className="text-xs font-mono text-foreground-subtle uppercase">{article.date}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-8 tracking-tighter leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 mb-12 border-b border-foreground/5 pb-8">
              <div className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-[10px] font-black text-primary">
                PTA
              </div>
              <div>
                <div className="text-xs font-black text-foreground uppercase tracking-widest">{article.author}</div>
                <div className="text-[10px] text-foreground-subtle uppercase tracking-widest">Agency Staff</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto aspect-video rounded-[40px] overflow-hidden mb-16 shadow-2xl"
        >
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <article className="prose dark:prose-invert prose-p:text-foreground-muted prose-p:text-lg prose-p:leading-relaxed space-y-8">
            <p className="text-xl text-foreground font-medium leading-relaxed italic border-l-4 border-primary pl-6 py-2 bg-foreground/5 rounded-r-2xl">
              {article.excerpt}
            </p>
            <p>
              In the ever-evolving landscape of live broadcasting, the metrics that defined success in 2024 are no longer the benchmarks for 2026. At Peace Time Agency, we&apos;ve spent the last six months deep-diving into the algorithmic shifts that prioritize retention over raw vanity metrics.
            </p>
            <h2 className="text-2xl font-black text-foreground uppercase tracking-tight mt-12 mb-4">Strategic Positioning</h2>
            <p>
              Our core philosophy has always been creator-first. This means we don&apos;t just look at how many coins are being dropped, but how many recurring viewers are coming back every single night. The &quot;PTA Method&quot; focuses on the bridge between casual scrolling and dedicated fandom.
            </p>
            <div className="glass-card p-8 rounded-3xl border-primary/20 my-12">
              <h3 className="text-lg font-black text-primary uppercase tracking-widest mb-4">Key Takeaways</h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-primary font-black">01.</span>
                  <span className="text-foreground-muted">Consistency over intensity. Short, high-quality streams beat 12-hour marathons.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-black">02.</span>
                  <span className="text-foreground-muted">Value-based interaction. Your chat is your engine, fuel it well.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-black">03.</span>
                  <span className="text-foreground-muted">Data transparency. Creators deserve to see the same numbers the agency sees.</span>
                </li>
              </ul>
            </div>
            <p>
              As we move further into the year, our commitment to providing the highest fidelity infrastructure remains unchanged. The goal isn&apos;t just to be seen; it&apos;s to be remembered.
            </p>
          </article>

          <div className="mt-20 pt-12 border-t border-foreground/5 flex flex-col items-center">
            <h3 className="text-sm font-black text-foreground uppercase tracking-[0.3em] mb-6">Ready to scale?</h3>
            <Link href="/recruiters" className="px-12 py-4 bg-primary hover:bg-primary-dark text-foreground-inverse font-black rounded-2xl transition-all uppercase tracking-[0.2em] shadow-xl shadow-primary/20">
              Join the Roster
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
