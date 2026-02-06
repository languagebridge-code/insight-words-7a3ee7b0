import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Pricing } from "@/components/Pricing";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24">
        <Pricing />
      </div>
      <Footer />
    </div>
  );
}
