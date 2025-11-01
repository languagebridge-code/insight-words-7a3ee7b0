import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export const Pricing = () => {
  const [interpreters, setInterpreters] = useState(2);
  const [hours, setHours] = useState(20);
  const [hourlyCost, setHourlyCost] = useState(19);

  const calculateCosts = () => {
    const annualInterpreterCost = interpreters * hours * hourlyCost * 52; // interpreters * hours/week * rate * 52 weeks
    const languageBridgeCost = 2000; // Medium package as comparison
    
    return {
      interpreterCost: annualInterpreterCost,
      savings: Math.max(0, annualInterpreterCost - languageBridgeCost)
    };
  };

  const { interpreterCost, savings } = calculateCosts();
  const packages = [
    {
      name: "Small School Package",
      icon: "📚",
      price: "$1,200",
      period: "year",
      students: "Up to 20 students",
      description: "Perfect for testing with one classroom",
      features: [
        "Full Chrome extension access",
        "2-hour PD session",
        "Email & phone support",
        "Quarterly check-ins",
        "No long-term contract"
      ],
      popular: false
    },
    {
      name: "Medium School Package",
      icon: "🏫",
      price: "$2,000",
      period: "year",
      students: "Up to 50 students",
      description: "Ideal for multiple classrooms or grades",
      features: [
        "Everything in Small Package",
        "Priority support",
        "Monthly progress reports",
        "Custom onboarding",
        "Direct product team access"
      ],
      popular: true
    },
    {
      name: "Large School Package",
      icon: "🏛️",
      price: "$3,500",
      period: "year",
      students: "Up to 100 students",
      description: "District-level pilot program",
      features: [
        "Everything in Medium Package",
        "Dedicated success manager",
        "Advanced analytics",
        "Administrator training",
        "Quarterly strategy meetings"
      ],
      popular: false
    }
  ];

  const perStudentTiers = [
    { range: "10-30 students", price: "$75" },
    { range: "31-50 students", price: "$60" },
    { range: "51+ students", price: "$50" }
  ];

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Affordable. Scalable. <span className="gradient-text">Transformative.</span>
          </h2>
          <div className="inline-block bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-8">
            <p className="text-primary font-semibold">
              🌟 Ohio Pilot Program - Founding Partner Pricing
            </p>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simple flat-rate packages designed for schools of all sizes
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-2xl p-8 shadow-lg border-2 transition-all hover-scale fade-in-up ${
                pkg.popular
                  ? "border-primary shadow-primary/20"
                  : "border-border"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  ⭐ Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{pkg.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{pkg.students}</p>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-primary">{pkg.price}</span>
                  <span className="text-muted-foreground">/{pkg.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full" 
                variant={pkg.popular ? "default" : "outline"}
                onClick={() => document.getElementById('forms')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Choose This Package
              </Button>
            </div>
          ))}
        </div>

        {/* Value Comparison Box */}
        <div className="max-w-4xl mx-auto mb-16 fade-in-up delay-300">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Compare the Cost</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Multiple interpreters needed</p>
                <p className="text-xl font-bold text-foreground mb-1">One interpreter per language</p>
                <p className="text-sm text-muted-foreground mb-2">@ $18-20/hour, part-time or as needed</p>
                <p className="text-3xl font-bold text-foreground">$19,760+</p>
                <p className="text-sm text-muted-foreground">per interpreter, per year</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-4xl font-bold text-primary">VS</div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">LanguageBridge for 50 students</p>
                <p className="text-3xl font-bold text-primary">$2,000</p>
                <p className="text-sm text-muted-foreground">per year, all languages</p>
              </div>
            </div>
            <div className="text-center bg-card rounded-xl p-6">
              <p className="text-lg font-semibold mb-2">Cost per student per day: <span className="text-primary">Less than 22 cents</span></p>
              <p className="text-muted-foreground">
                You need an interpreter for every language spoken—that adds up fast. LanguageBridge covers <strong>ALL</strong> languages with 24/7 support.
              </p>
            </div>
          </div>
        </div>

        {/* Per-Student Pricing Alternative */}
        <div className="max-w-4xl mx-auto mb-16 fade-in-up delay-400">
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
            <h3 className="text-2xl font-bold mb-4 text-center">Prefer Per-Student Pricing?</h3>
            <p className="text-center text-muted-foreground mb-6">We also offer flexible per-student pricing:</p>
            <div className="grid md:grid-cols-3 gap-6">
              {perStudentTiers.map((tier, index) => (
                <div key={index} className="text-center p-6 bg-secondary/30 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-2">{tier.range}</p>
                  <p className="text-3xl font-bold text-primary">{tier.price}</p>
                  <p className="text-sm text-muted-foreground">per student/year</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROI Calculator Section */}
        <div className="max-w-4xl mx-auto fade-in-up delay-500">
          <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold mb-4 text-center">Calculate Your Savings</h3>
            <p className="text-center text-muted-foreground mb-8">
              See how much your school could save by switching to LanguageBridge
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium mb-2">Number of Interpreters Needed</label>
                <input 
                  type="number" 
                  value={interpreters}
                  onChange={(e) => setInterpreters(Number(e.target.value))}
                  placeholder="2" 
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  min="1"
                />
                <p className="text-xs text-muted-foreground mt-1">One per language spoken</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hours Per Week (per interpreter)</label>
                <input 
                  type="number" 
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  placeholder="20" 
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hourly Rate ($)</label>
                <input 
                  type="number" 
                  value={hourlyCost}
                  onChange={(e) => setHourlyCost(Number(e.target.value))}
                  placeholder="19" 
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  min="1"
                />
                <p className="text-xs text-muted-foreground mt-1">Typically $18-20/hour</p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-card rounded-xl p-6 mb-6">
                <p className="text-sm text-muted-foreground mb-2">Your Current Annual Interpreter Cost</p>
                <p className="text-3xl font-bold text-foreground mb-4">
                  ${interpreterCost.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mb-2">Your Estimated Annual Savings with LanguageBridge</p>
                <p className="text-4xl font-bold text-primary mb-2">
                  ${savings.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Based on LanguageBridge Medium Package ($2,000/year)</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => document.getElementById('forms')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Choose Your Package
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Schedule Pricing Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 fade-in-up delay-600">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            All packages include unlimited translations, automatic updates, and FERPA/COPPA compliance. 
            Custom enterprise solutions available for districts with 100+ students.
          </p>
        </div>
      </div>
    </section>
  );
};
