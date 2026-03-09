import { OurCreators } from "@/components/layout/OurCreators";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Creators | Peace Time Agency",
  description: "Meet the elite creators of the Peace Time Agency roster.",
};

export default function CreatorsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex-grow">
        <OurCreators />
      </div>
      <Footer />
    </main>
  );
}
