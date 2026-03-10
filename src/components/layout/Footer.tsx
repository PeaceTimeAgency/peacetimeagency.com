import Link from "next/link";

const links = [
  { label: "Creators", href: "/#creators" },
  { label: "Services", href: "/#services" },
  { label: "Community", href: "/#community" },
  { label: "FAQ", href: "/#faq" },
];

export function Footer({ showSocials = true }: { showSocials?: boolean }) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-foreground-inverse text-xs font-black">P</span>
              </div>
              <span className="text-sm font-bold tracking-tight">
                <span className="text-foreground">Peace Time</span>
                <span className="text-primary"> Agency</span>
              </span>
            </div>
            <p className="text-xs text-foreground-muted mt-1">The elite hub for TikTok LIVE creators.</p>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            {links.map((l) => (
              <Link key={l.label} href={l.href} className="text-xs text-foreground-muted hover:text-foreground transition-colors duration-200 font-medium">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Social + copyright */}
          <div className="flex flex-col items-center md:items-end gap-3">
            {showSocials && (
              <div className="flex items-center gap-3">
                {/* TikTok */}
                <a href="#" className="w-8 h-8 rounded-lg bg-white/[0.05] border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-all duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                  </svg>
                </a>
                {/* Discord */}
                <a href="#" className="w-8 h-8 rounded-lg bg-white/[0.05] border border-border flex items-center justify-center text-foreground-muted hover:text-[#5865F2] hover:border-[#5865F2]/40 transition-all duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.056a19.906 19.906 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                  </svg>
                </a>
              </div>
            )}
            <p className="text-[11px] text-foreground-subtle">© {new Date().getFullYear()} Peace Time Agency. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
