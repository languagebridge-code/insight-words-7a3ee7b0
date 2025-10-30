import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Affordable. Scalable. <span className="gradient-text">Transformative.</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="gradient-primary rounded-3xl p-12 md:p-16 text-center shadow-2xl fade-in-up">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Special Ohio Pilot Pricing
            </h3>
            
            <div className="text-6xl font-bold text-white mb-4">
              $50<span className="text-2xl">/student/year</span>
            </div>
            
            <p className="text-xl text-white/90 mb-8">(Limited spots available)</p>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
              <ul className="space-y-4 text-left text-white">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span>Full implementation support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span>Professional development sessions included</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span>Priority feature requests</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span>Direct access to our development team</span>
                </li>
              </ul>
            </div>

            <Button 
              size="xl"
              className="bg-white text-primary hover:bg-white/90 font-bold"
              asChild
            >
              <a href="#contact">Get Ohio Pilot Pricing</a>
            </Button>

            <p className="text-white/90 mt-8 text-lg">
              Contact us for district-wide pricing and multi-year agreements
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
