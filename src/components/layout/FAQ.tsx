'use client';

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import Link from "next/link";
import PreInterview from "@/components/PreInterview";

const faqs = [
  {
    q: "What are the expectations and quotas?",
    a: "None. Peace Time operates on a Zero-Pressure Policy: no minimum hours, no gifting benchmarks, and no quotas. We provide the tools; you determine the velocity.",
  },
  {
    q: "How do I join the agency?",
    a: "Submission is handled via TikTok's official agency portal. There are no external legal traps or side-contracts. Once we invite you, everything is finalized securely within the app.",
  },
  {
    q: "Are there any restrictive contracts?",
    a: "Never. We operate exclusively within the official TikTok Agency framework. Transparency is core to our model: no hidden clauses, and no fine print beyond TikTok's standard platform terms.",
  },
  {
    q: "What happens if I decide to leave?",
    a: "You retain full account ownership. You can leave at any time, subject only to TikTok's own platform-mandated 60-day transition window which applies to all agency moves.",
  },
  {
    q: "What does the agency actually do for my stream?",
    a: "We provide professional technical audits, data-driven strategy sessions, and 24/7 administrative support for account safety and platform compliance.",
  },
  {
    q: "What do I get immediately upon joining?",
    a: "Instant access to our 50+ module Education Center, a full technical setup audit, and entry into our private Discord network for strategy and collaboration.",
  },
];


function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200">{q}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-foreground-muted transition-all duration-300 ${open ? "bg-primary border-primary text-foreground-inverse rotate-45" : "group-hover:border-primary group-hover:text-primary"}`}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-48 pb-5" : "max-h-0"}`}>
        <p className="text-foreground-muted text-sm leading-relaxed pr-10">{a}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <Section id="faq" className="bg-background-surface">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-stretch">
        <div className="w-full flex flex-col justify-center">
          <div className="text-center md:text-left mb-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">
              Got <span className="text-gradient-primary">Questions?</span>
            </h2>
          </div>

          <div className="glass-card rounded-2xl px-6 h-full flex flex-col justify-center">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>

        <div className="w-full h-full flex flex-col justify-center">
          <PreInterview />
        </div>
      </div>

      {/* Final CTA Banner */}
      <div className="mt-24 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A0B12] via-[#1F0D18] to-[#0F0B1A] border border-primary/20 p-12 text-center group">
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes meteor {
            0% { transform: rotate(215deg) translateX(0); opacity: 1; }
            40% { opacity: 0.8; }
            100% { transform: rotate(215deg) translateX(-1500px); opacity: 0; }
          }
          .meteor-tail {
            position: absolute;
            transform: rotate(215deg);
            width: 250px;
            height: 1px;
            background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,1) 100%);
            animation: meteor 3s ease-in infinite;
            opacity: 0;
            z-index: 1;
            box-shadow: 0 0 8px 1px rgba(255,255,255,0.4);
          }
          .meteor-tail::before {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 0 15px 3px rgba(255,255,255,0.8);
          }
        ` }} />
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="meteor-tail"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${20 + Math.random() * 130}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/15 blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-4">Ready?</p>
          <h3 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-3">
            Elevate your stream.<br />
            <span className="text-gradient-primary">Join the network.</span>
          </h3>
          <p className="text-foreground-muted text-sm mb-8 max-w-md mx-auto">Apply today and connect with the elite TikTok LIVE creator community.</p>
          <Link href="/api/auth/tiktok" className="inline-flex items-center justify-center h-12 px-10 rounded-xl font-semibold text-sm text-foreground-inverse bg-primary hover:bg-primary-dark transition-all duration-200 hover:shadow-neon-primary">
            Submit Application
          </Link>
        </div>
      </div>
    </Section>
  );
}
