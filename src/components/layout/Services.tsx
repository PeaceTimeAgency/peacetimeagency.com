import { Section } from "@/components/layout/Section";

const services = [
  {
    index: "01",
    title: "Technical & Aesthetic",
    description: "Full-spectrum broadcast optimization. We refine your lighting architecture, camera positioning, and audio processing to maximize viewer retention from the first second.",
    accent: "text-primary",
    bar: "bg-primary",
    tag: "Department",
  },
  {
    index: "02",
    title: "Data-Driven Strategy",
    description: "Algorithmic positioning based on real-time analytics. We optimize your stream hooks and retention loops to capture and hold platform-wide momentum.",
    accent: "text-secondary",
    bar: "bg-secondary",
    tag: "Department",
  },
  {
    index: "03",
    title: "Admin & Account Safety",
    description: "Direct handling of platform policy and account security. We manage ban appeals, flag resolution, and compliance so you can focus exclusively on creation.",
    accent: "text-primary",
    bar: "bg-primary",
    tag: "Department",
  },
  {
    index: "04",
    title: "The Exit Guarantee",
    description: "Total creator autonomy. You retain 100% control over your account. If you choose to leave, we facilitate a clean transition with no hidden restrictions.",
    accent: "text-secondary",
    bar: "bg-secondary",
    tag: "Creator-First",
  },
  {
    index: "05",
    title: "Zero-Pressure Policy",
    description: "No mandatory hours or performance benchmarks. We provide the infrastructure; you decide the pace. Our support remains constant regardless of your streaming volume.",
    accent: "text-primary",
    bar: "bg-primary",
    tag: "Creator-First",
  },
  {
    index: "06",
    title: "Education Center",
    description: "Exclusive access to our private resource library. Over 50+ modules covering advanced TikTok LIVE strategy, technical setup, and community management.",
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
            Peace Time operates through three specialized departments plus a set of creator-first
            guarantees that redefine agency standards.
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
