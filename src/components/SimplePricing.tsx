import { Check } from "lucide-react";

export const SimplePricing = () => {
  return (
    <section id="pricing" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Simple, Honest Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            $3,500 per year. Unlimited students. Unlimited translations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Pilot Program */}
          <div className="bg-gradient-to-br from-primary to-accent text-white rounded-2xl p-8 shadow-xl">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-2">Ohio Pilot Program</h3>
              <div className="text-5xl font-bold mb-4">FREE</div>
              <p className="text-white/90">2025-2026 School Year</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>Full access for all students</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>Unlimited translations</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>Help shape the product</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>Priority support</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>Usage data for grants</span>
              </li>
            </ul>

            <a 
              href="#contact" 
              className="block w-full bg-white text-primary text-center py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Apply for Pilot Program
            </a>
          </div>

          {/* Standard Pricing */}
          <div className="bg-card rounded-2xl p-8 border-2 border-border shadow-lg">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-2">Annual License</h3>
              <div className="text-5xl font-bold mb-4">$3,500</div>
              <p className="text-muted-foreground">Per school per year</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span>Unlimited students</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span>Unlimited translations</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span>All 8 languages</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span>FERPA/COPPA compliant</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span>Works on all websites</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span>Text-to-speech included</span>
              </li>
            </ul>

            <div className="text-center text-sm text-muted-foreground mb-4">
              Less than 22 cents per student per day
            </div>

            <a 
              href="#contact" 
              className="block w-full bg-primary text-primary-foreground text-center py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Get Started
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-2">
            <strong>Funding Available:</strong> Qualifies under Title III, IDEA, ESSA, and assistive technology budgets
          </p>
          <p className="text-sm text-muted-foreground">
            We provide budget justification letters and grant application support
          </p>
        </div>
      </div>
    </section>
  );
};
