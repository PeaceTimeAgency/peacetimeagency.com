'use client';

import { useState } from "react";
import { Section } from "@/components/layout/Section";

const faqs = [
  {
    q: "What are the expectations and quotas?",
    a: "There are none. Peace Time operates on a Zero-Pressure Policy — no minimum streaming hours, no gifting benchmarks, and no performance requirements. The agency matches your energy. If you want to push aggressively, we provide the full toolkit. If you stream for fun, your support system stays in place.",
  },
  {
    q: "How do I join the agency?",
    a: "Joining is handled directly through TikTok's official agency system. There are no external contracts or hidden fine print outside of TikTok's own platform agreement. Once invited, you review and accept within the app itself.",
  },
  {
    q: "Are there any restrictive contracts?",
    a: "No. Peace Time operates exclusively within the official TikTok Agency system. There are no secondary contracts, external legal traps, or fine print beyond TikTok's own platform policies. Transparency isn't a selling point — it's just how we operate.",
  },
  {
    q: "What happens if I decide to leave?",
    a: "You can leave at any time. The only restriction is TikTok's platform-mandated 60-day transition period before joining a different agency — a platform policy, not something Peace Time imposes. We do not hold accounts hostage.",
  },
  {
    q: "What does the agency actually do for my stream?",
    a: "Three things. Our Technical & Aesthetic department audits your lighting, camera setup, and audio quality. Our Data & Strategy team teaches the Momentum Window (the critical first 10 minutes of every live), the 10-Second hook rule, and a monetization flow from casual viewer to Super Fan. Our Admin team handles account safety, ban appeals, and platform compliance.",
  },
  {
    q: "What do I get immediately upon joining?",
    a: "Immediate access to the full Education Center — a library of tutorials, step-by-step guides, and strategy playbooks — plus a personal setup audit and access to the private creator network, all within your first week.",
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
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-3">Got Questions</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Frequently <span className="text-gradient-primary">Asked</span>
          </h2>
        </div>

        <div className="glass-card rounded-2xl px-6">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>

      {/* Final CTA Banner */}
      <div className="mt-24 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A0B12] via-[#1F0D18] to-[#0F0B1A] border border-primary/20 p-12 text-center">
        <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/15 blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-4">Ready?</p>
          <h3 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-3">
            Elevate your stream.<br />
            <span className="text-gradient-primary">Join the network.</span>
          </h3>
          <p className="text-foreground-muted text-sm mb-8 max-w-md mx-auto">Apply today and connect with the elite TikTok LIVE creator community.</p>
          <button className="inline-flex items-center justify-center h-12 px-10 rounded-xl font-semibold text-sm text-foreground-inverse bg-primary hover:bg-primary-dark transition-all duration-200 hover:shadow-neon-primary">
            Submit Application
          </button>
        </div>
      </div>
    </Section>
  );
}
