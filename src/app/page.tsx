import { Hero } from "@/components/layout/Hero";
import { Services } from "@/components/layout/Services";
import { OurCreators } from "@/components/layout/OurCreators";
import { GrowthPhases } from "@/components/layout/GrowthPhases";
import { FAQ } from "@/components/layout/FAQ";
import { Footer } from "@/components/layout/Footer";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Hero />
      <Services />
      <GrowthPhases />
      <OurCreators isMainPage={true} />

      <Testimonials />

      <FAQ />
      <Footer showSocials={false} />
    </main>
  );
}
