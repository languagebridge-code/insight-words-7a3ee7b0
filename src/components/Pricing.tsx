import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 px-4 bg-lavender/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Affordable. Scalable. <span className="gradient-text">Transformative.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Investment in language accessibility that pays dividends in student success
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto fade-in-up delay-200">
          {/* Ohio Pilot Pricing */}
          <Card className="p-8 relative overflow-hidden border-2 border-primary shadow-xl hover-scale">
            <div className="absolute top-0 right-0 bg-gradient-to-br from-primary to-burnt-orange text-white px-4 py-1 text-sm font-semibold">
              Limited Spots
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-2 text-deep-purple">Ohio Pilot Schools</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold gradient-text">$50</span>
                <span className="text-muted-foreground">/student/year</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span>Full implementation support</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span>Professional development sessions included</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span>Priority feature requests</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span>Direct access to development team</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span>Shape the future of the platform</span>
                </li>
              </ul>
              <Button variant="hero" size="lg" className="w-full">
                Apply for Ohio Pilot
              </Button>
            </div>
          </Card>

          {/* District Pricing */}
          <Card className="p-8 bg-card hover-scale">
            <h3 className="text-2xl font-bold mb-2 text-deep-purple">District-Wide</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold text-foreground">Custom</span>
              <span className="text-muted-foreground block mt-2">Tailored to your needs</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span>Volume discounts available</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span>Multi-year agreements</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span>Custom training programs</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span>Priority technical support</span>
              </li>
            </ul>
            <Button variant="outline" size="lg" className="w-full">
              Contact for Pricing
            </Button>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground">
            Questions about pricing?{" "}
            <a href="#contact" className="text-deep-purple hover:text-burnt-orange font-semibold">
              Contact us
            </a>{" "}
            for district-wide quotes and multi-year agreements
          </p>
        </div>
      </div>
    </section>
  );
};
