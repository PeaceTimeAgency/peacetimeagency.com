'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { name: "Creators", href: "/creators" },
  { name: "News", href: "/news" },
  { name: "Services", href: "/#services" },
  { name: "Community", href: "/#community" },
  { name: "FAQ", href: "/#faq" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-white/[0.06] shadow-[0_1px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-neon-primary transition-all duration-300 group-hover:scale-105">
            <span className="text-foreground-inverse text-sm font-black">P</span>
          </div>
          <span className="text-base font-bold tracking-tight">
            <span className="text-foreground">Peace Time</span>
            <span className="text-primary"> Agency</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-foreground-muted hover:text-foreground rounded-lg hover:bg-white/[0.04] transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <Link href="/api/auth/tiktok">
            <Button
              size="sm"
              className="hidden sm:inline-flex rounded-lg px-5 h-9 font-semibold text-sm bg-primary hover:bg-primary-dark text-foreground-inverse transition-all duration-200 hover:shadow-neon-primary"
            >
              Join the Roster
            </Button>
          </Link>

          {/* Mobile Menu */}
          <button className="md:hidden p-2 text-foreground-muted hover:text-foreground transition-colors rounded-lg hover:bg-white/[0.04]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
