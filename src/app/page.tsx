import { Hero } from "@/components/layout/Hero";
import { Services } from "@/components/layout/Services";
import { Spotlight } from "@/components/layout/Spotlight";
import { GrowthPhases } from "@/components/layout/GrowthPhases";
import { FAQ } from "@/components/layout/FAQ";
import { Footer } from "@/components/layout/Footer";
import WhosLiveNow from "@/components/WhosLiveNow";
import CreatorGrowthSystem from "@/components/CreatorGrowthSystem";
import CommunityGateway from "@/components/CommunityGateway";
import { Section } from "@/components/layout/Section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Hero />
      <WhosLiveNow />
      <Services />
      <GrowthPhases />
      <Spotlight />

      {/* Analytics + Community side by side */}
      <Section id="system" className="bg-background-surface">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-3">Infrastructure</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            Tools that move <span className="text-gradient-primary">the needle.</span>
          </h2>
          <p className="text-foreground-muted text-base max-w-xl mx-auto">
            High-performance analytics and an elite community; engineered for scale.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
          <div className="h-[460px]">
            <CreatorGrowthSystem />
          </div>
          <div className="h-[460px]">
            <CommunityGateway />
          </div>
        </div>
      </Section>

      <FAQ />
      <Footer />
    </main>
  );
}
