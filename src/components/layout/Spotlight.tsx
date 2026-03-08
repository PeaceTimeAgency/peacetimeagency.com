import { Section } from "@/components/layout/Section";

const creators = [
  { name: "Neon Phantom", followers: "1.2M", category: "Gaming", initials: "NP", color: "from-secondary/60 to-secondary/20" },
  { name: "Cyber Synth", followers: "850K", category: "Music", initials: "CS", color: "from-pink-500/60 to-pink-500/20" },
  { name: "Void Walker", followers: "2.4M", category: "IRL", initials: "VW", color: "from-primary/60 to-primary/20" },
  { name: "Holo Glitch", followers: "500K", category: "Tech", initials: "HG", color: "from-blue-500/60 to-blue-500/20" },
];

const categoryColors: Record<string, string> = {
  Gaming: "bg-secondary/15 text-secondary",
  Music: "bg-pink-500/15 text-pink-400",
  IRL: "bg-primary/15 text-primary",
  Tech: "bg-blue-500/15 text-blue-400",
};

export function Spotlight() {
  return (
    <Section id="creators-spotlight" className="relative overflow-hidden bg-background-surface border-y border-border">
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/8 blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-3">PTA Network</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            Our <span className="text-gradient-primary">Creators</span>
          </h2>
          <p className="text-foreground-muted text-base max-w-xl mx-auto">
            Top-tier talent performing on TikTok LIVE and setting the standard for live streaming.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {creators.map((c, i) => {
            const tagClass = categoryColors[c.category] || "bg-white/10 text-foreground-muted";
            return (
              <div key={i} className="group glass-card rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-card transition-all duration-300 cursor-pointer">
                {/* Image / avatar placeholder */}
                <div className={`relative h-52 w-full bg-gradient-to-b ${c.color} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-fine-grid opacity-30" />
                  <span className="text-5xl font-black text-white/20 select-none">{c.initials}</span>
                  {/* Verified crown */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-background-elevated/80 backdrop-blur-sm flex items-center justify-center border border-border" title="Verified PTA Creator">
                    <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.377 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.538 1.118L10 14.347l-3.956 2.874c-.783.57-1.838-.196-1.538-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.287-3.967z" />
                    </svg>
                  </div>
                  {/* Bottom overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background-elevated to-transparent" />
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-foreground text-base mb-2 group-hover:text-primary transition-colors duration-200">{c.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${tagClass}`}>{c.category}</span>
                    <span className="text-sm font-black text-foreground">{c.followers}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
