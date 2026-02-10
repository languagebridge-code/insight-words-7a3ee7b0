import { Navigation } from "@/components/Navigation";
import { PageMeta } from "@/components/PageMeta";
import { Footer } from "@/components/Footer";
import { Pricing } from "@/components/Pricing";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <PageMeta title="Pricing - Affordable Plans for Every School" description="LanguageBridge pricing starts free for Ohio pilot schools. Flexible plans for classrooms, schools, and districts with grant-fundable options." />
      <Navigation />
      <div className="pt-24">
        <Pricing />
      </div>
      <Footer />
    </div>
  );
}
