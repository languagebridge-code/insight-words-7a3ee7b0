import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Flexible <span className="gradient-text">Pricing</span> for Every School
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparent, fair pricing designed with educators in mind
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Ohio Pilot Pricing */}
          <div className="relative bg-card rounded-3xl p-8 shadow-xl fade-in-up delay-100 border-2 border-primary">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="gradient-primary px-6 py-2 rounded-full text-white font-bold text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Ohio Pilot Special
              </span>
            </div>
            <div className="text-center mb-8 mt-4">
              <h3 className="text-2xl font-bold mb-4">Ohio Pilot Schools</h3>
              <div className="mb-4">
                <span className="text-5xl font-bold gradient-text">FREE</span>
              </div>
              <p className="text-muted-foreground">2025-2026 School Year</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Full platform access for all ELL students</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Professional development for teachers</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Priority support and feedback channels</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Usage analytics and impact reports</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Help shape the future of the platform</span>
              </li>
            </ul>
            <Button className="w-full gradient-primary text-white hover:opacity-90" size="lg">
              Apply for Ohio Pilot
            </Button>
          </div>

          {/* Standard Pricing */}
          <div className="bg-card rounded-3xl p-8 shadow-xl fade-in-up delay-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Per Student</h3>
              <div className="mb-4">
                <span className="text-5xl font-bold">$12</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">or $120/year (save $24)</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Unlimited translations</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>All subject areas and grade levels</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Teacher dashboard and reporting</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Email support</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Quarterly updates</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full" size="lg">
              Contact Sales
            </Button>
          </div>

          {/* Enterprise Pricing */}
          <div className="bg-card rounded-3xl p-8 shadow-xl fade-in-up delay-300">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">District License</h3>
              <div className="mb-4">
                <span className="text-5xl font-bold">Custom</span>
              </div>
              <p className="text-muted-foreground">Volume discounts available</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Everything in Per Student plan</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>District-wide deployment</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Custom integrations (SIS, LMS)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>On-site training available</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full" size="lg">
              Request Quote
            </Button>
          </div>
        </div>

        <div className="text-center mt-12 fade-in-up delay-400">
          <p className="text-muted-foreground">
            All plans include Chrome extension, 100+ languages, and regular updates
          </p>
        </div>
      </div>
    </section>
  );
};
