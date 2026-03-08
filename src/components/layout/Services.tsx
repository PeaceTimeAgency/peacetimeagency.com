import { Section } from "@/components/layout/Section";

const services = [
  {
    index: "01",
    title: "Technical & Aesthetic",
    description: "Professional audits for your visual and audio broadcast. We cover lighting placement, camera angles, background composition, and why audio clarity is the hidden metric that determines viewer retention.",
    accent: "text-primary",
    bar: "bg-primary",
    tag: "Department",
  },
  {
    index: "02",
    title: "Data-Driven Strategy",
    description: "We use platform analytics to guide every decision — focusing your first 10 minutes for maximum algorithmic push, teaching the 10-Second hook rule, and mapping a clear monetization flow from viewers to supporters.",
    accent: "text-secondary",
    bar: "bg-secondary",
    tag: "Department",
  },
  {
    index: "03",
    title: "Admin & Account Safety",
    description: "Direct assistance navigating TikTok's platform policies — including ban appeals, account recovery from erroneous flags, and maintaining your standing within the platform's official guidelines.",
    accent: "text-primary",
    bar: "bg-primary",
    tag: "Department",
  },
  {
    index: "04",
    title: "The Exit Guarantee",
    description: "You can leave at any time — no hostage clauses, no hidden fine print. The only restriction is TikTok's own platform-mandated 60-day transition period before joining a new agency, which we have zero control over.",
    accent: "text-secondary",
    bar: "bg-secondary",
    tag: "Creator-First",
  },
  {
    index: "05",
    title: "Zero-Pressure Policy",
    description: "No minimum streaming hours, no gifting benchmarks, no performance quotas. The agency matches your energy — if you want to push hard, we provide the tools. If you stream for fun, your support system stays in place.",
    accent: "text-primary",
    bar: "bg-primary",
    tag: "Creator-First",
  },
  {
    index: "06",
    title: "Education Center",
    description: "Comprehensive tutorials, step-by-step guides, and a full resource library provided immediately upon onboarding. Everything you need to understand the platform, the algorithm, and how to grow — from day one.",
    accent: "text-secondary",
    bar: "bg-secondary",
    tag: "Onboarding",
  },
];

export function Services() {
  return (
    <Section id="services" className="bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-3">Three Departments. One Mission.</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            Built to support every
            <br />
            <span className="text-gradient-primary">layer of your growth.</span>
          </h2>
          <p className="text-foreground-muted text-base leading-relaxed">
            Peace Time operates through three specialized departments — plus a set of creator-first
            guarantees that no standard agency offers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.index}
              className="group relative glass-card rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              {/* Left accent bar on hover */}
              <div className={`absolute left-0 top-4 bottom-4 w-[3px] ${s.bar} rounded-r-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom`} />

              {/* Index + Tag row */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-black tracking-widest ${s.accent} font-mono`}>{s.index}</span>
                <span className="text-[10px] font-semibold tracking-widest text-foreground-muted uppercase border border-border rounded-full px-2 py-0.5">
                  {s.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-gradient-primary transition-all duration-300">
                {s.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-foreground-muted leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
