import { useState } from "react";
import { Check, X, AlertTriangle, Phone, Mail, FileDown, Calculator as CalcIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function PricingPage() {
  // ROI Calculator State
  const [interpreters, setInterpreters] = useState(2);
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(19);
  const [numStudents, setNumStudents] = useState(50);
  const [showExtendedROI, setShowExtendedROI] = useState(false);

  // Calculate pricing tier based on students
  const getPricePerStudent = (students: number) => {
    if (students <= 50) return 85;
    if (students <= 150) return 70;
    return 60;
  };

  // Real-time calculations
  const interpreterCost = interpreters * hourlyRate * hoursPerWeek * 36;
  const pricePerStudent = getPricePerStudent(numStudents);
  const languageBridgeCost = numStudents * pricePerStudent;
  const savings = interpreterCost - languageBridgeCost;
  const costPerDay = languageBridgeCost / (numStudents * 180);
  
  // Extended ROI
  const misdiagnosisSavings = 2 * 8000;
  const teacherTimeSavings = 12 * 45 * 36;
  const complianceSavings = 50000;
  const totalAnnualValue = savings + misdiagnosisSavings + teacherTimeSavings + complianceSavings;

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* HERO SECTION */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Affordable. Scalable. <span className="gradient-text">Transformative.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Premium language access at a fraction of competitor costs
            </p>

            {/* Three Stat Boxes */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-2 border-primary/20 hover-scale">
                <CardContent className="pt-6 text-center">
                  <p className="text-4xl font-bold text-primary mb-2">50-70%</p>
                  <p className="text-muted-foreground">less than Read&Write</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/20 hover-scale">
                <CardContent className="pt-6 text-center">
                  <p className="text-4xl font-bold text-primary mb-2">$3,500</p>
                  <p className="text-muted-foreground">avg. annual cost per school</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/20 hover-scale">
                <CardContent className="pt-6 text-center">
                  <p className="text-4xl font-bold text-primary mb-2">10-20x</p>
                  <p className="text-muted-foreground">ROI vs. interpreters</p>
                </CardContent>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Link to="/pilot">Start Free 30-Day Pilot</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#calculator">Calculate Your Savings</a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> FERPA & COPPA Compliant
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> No Credit Card Required
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> Cancel Anytime
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: FOUNDER PRICING ALERT */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-4xl mb-4">🎉</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Founder Pricing Available - Limited Spots
              </h2>
              <p className="text-white/90 text-lg max-w-3xl mx-auto">
                We're looking for our first 10 founding partner schools to pilot LanguageBridge 
                at 20% below standard rates. In exchange, we ask for honest feedback and a 
                testimonial if it works well.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <Card className="bg-white/10 border-white/20 text-white backdrop-blur">
                <CardContent className="pt-6">
                  <p className="text-2xl font-bold mb-4">Founder Pricing: $75/student</p>
                  <p className="text-white/80 mb-2">Normally $95/student</p>
                  <p className="text-white/80 mb-2">Valid for: First 10 schools only</p>
                  <p className="text-white/80">Includes: Everything below + founder benefits</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 text-white backdrop-blur">
                <CardContent className="pt-6">
                  <p className="font-bold mb-3 text-lg">Founder Benefits:</p>
                  <ul className="space-y-2 text-white/90">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Direct access to founder (I'm an ESL teacher)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Priority feature requests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Free extended pilot (60 days vs 30)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Lock in this rate for 2 years</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Quarterly strategy calls</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white mb-3">
                <Link to="/pilot">Apply for Founder Pricing</Link>
              </Button>
              <p className="text-white/80 text-sm">7 spots remaining as of January 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STANDARD PRICING TIERS */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-muted-foreground">
                Choose the package that fits your school size
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* STARTER */}
              <Card className="border-2 hover-scale">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="text-3xl mb-2">📚</div>
                    <div className="text-2xl">Starter</div>
                  </CardTitle>
                  <CardDescription className="text-center">
                    <div className="text-4xl font-bold text-primary my-4">
                      $85
                      <span className="text-lg text-muted-foreground font-normal">/student/year</span>
                    </div>
                    <div className="text-sm font-semibold">10-50 students</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    Perfect for single classroom pilots
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Full Chrome extension access</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>8 supported languages</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Unlimited translations</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Text-to-speech audio</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Works on all websites</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Google Classroom integration</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Email & phone support</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Quarterly check-ins</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Usage analytics dashboard</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>FERPA/COPPA compliance</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>30-day free pilot</span>
                    </li>
                  </ul>
                  <p className="text-center text-sm text-muted-foreground mb-4">
                    $2,550/year for 30 students
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/pilot">Start Free Pilot</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* PROFESSIONAL (MOST POPULAR) */}
              <Card className="border-2 border-primary shadow-lg hover-scale relative">
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white">
                  ⭐ MOST POPULAR
                </Badge>
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="text-3xl mb-2">🏫</div>
                    <div className="text-2xl">Professional</div>
                  </CardTitle>
                  <CardDescription className="text-center">
                    <div className="text-4xl font-bold text-primary my-4">
                      $70
                      <span className="text-lg text-muted-foreground font-normal">/student/year</span>
                    </div>
                    <div className="text-sm font-semibold">51-150 students</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    Ideal for multiple classrooms or buildings
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-semibold">Everything in Starter, PLUS:</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Priority email & phone support</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Monthly progress reports</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Custom onboarding session</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Direct product team access</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Quarterly strategy meetings</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Teacher training webinars</span>
                    </li>
                  </ul>
                  <p className="text-center text-sm text-muted-foreground mb-4">
                    $7,000/year for 100 students
                  </p>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                  <Button asChild className="w-full bg-gradient-to-r from-primary to-accent">
                    <Link to="/pilot">Start Free Pilot</Link>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Most schools choose this tier</p>
                </CardFooter>
              </Card>

              {/* ENTERPRISE */}
              <Card className="border-2 hover-scale">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="text-3xl mb-2">🏛️</div>
                    <div className="text-2xl">Enterprise</div>
                  </CardTitle>
                  <CardDescription className="text-center">
                    <div className="text-4xl font-bold text-primary my-4">
                      $60
                      <span className="text-lg text-muted-foreground font-normal">/student/year</span>
                    </div>
                    <div className="text-sm font-semibold">151-500+ students</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    District-wide deployment with white-glove support
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-semibold">Everything in Professional, PLUS:</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Dedicated success manager</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Custom SLA guarantees</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>SSO integration options</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Custom language additions</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>White-glove implementation</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Administrator training</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>On-site support available</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Bulk deployment assistance</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Custom contract terms</span>
                    </li>
                  </ul>
                  <p className="text-center text-sm text-muted-foreground mb-4">
                    $18,000/year for 300 students
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">Get Custom Quote</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <p className="text-center text-sm text-muted-foreground max-w-3xl mx-auto">
              All packages include unlimited translations, automatic updates, and FERPA/COPPA compliance. 
              No long-term contracts required. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: COMPETITOR COMPARISON */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Compare the Value
              </h2>
              <p className="text-xl text-muted-foreground">
                Premium features at accessible pricing
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-card rounded-xl border-2 border-border">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="p-4 text-left font-bold">Feature</th>
                    <th className="p-4 text-center font-bold bg-primary/10">
                      <span className="text-primary">LanguageBridge</span>
                    </th>
                    <th className="p-4 text-center font-bold">Read&Write</th>
                    <th className="p-4 text-center font-bold">Google Translate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Price/Student/Year</td>
                    <td className="p-4 text-center bg-primary/5">
                      <span className="font-bold text-primary text-lg">$70/student</span>
                    </td>
                    <td className="p-4 text-center">$155/student</td>
                    <td className="p-4 text-center">FREE</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">FERPA Compliant</td>
                    <td className="p-4 text-center bg-primary/5">
                      <Check className="w-6 h-6 text-green-600 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-6 h-6 text-green-600 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-6 h-6 text-red-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Works on ANY Website</td>
                    <td className="p-4 text-center bg-primary/5">
                      <Check className="w-6 h-6 text-green-600 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-6 h-6 text-green-600 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-6 h-6 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Preliterate Student Support (Audio)</td>
                    <td className="p-4 text-center bg-primary/5">
                      <Check className="w-6 h-6 text-green-600 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-6 h-6 text-red-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Works in Locked Testing</td>
                    <td className="p-4 text-center bg-primary/5">
                      <Check className="w-6 h-6 text-green-600 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-6 h-6 text-red-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Dari/Pashto Support</td>
                    <td className="p-4 text-center bg-primary/5">
                      <Check className="w-6 h-6 text-green-600 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-6 h-6 text-red-600 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Two-Way Conversation Mode</td>
                    <td className="p-4 text-center bg-primary/5">
                      <Check className="w-6 h-6 text-green-600 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-6 h-6 text-red-600 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-6 h-6 text-red-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Purpose-Built for ELL</td>
                    <td className="p-4 text-center bg-primary/5">
                      <Check className="w-6 h-6 text-green-600 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-6 h-6 text-red-600 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-6 h-6 text-red-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">24/7 Availability</td>
                    <td className="p-4 text-center bg-primary/5">
                      <Check className="w-6 h-6 text-green-600 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-6 h-6 text-green-600 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-6 h-6 text-green-600 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-center text-muted-foreground mt-8 max-w-3xl mx-auto">
              LanguageBridge delivers 50% cost savings compared to Read&Write while providing 
              features specifically designed for preliterate English Language Learners.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: TOTAL COST COMPARISON */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                See the Savings
              </h2>
              <p className="text-xl text-muted-foreground">
                Compare LanguageBridge to traditional solutions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <Card className="border-2 hover-scale">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-4">👥</div>
                  <p className="text-sm text-muted-foreground mb-2">Current Approach</p>
                  <p className="text-4xl font-bold text-foreground mb-4">$27,360/year</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>2 interpreters</p>
                    <p>× $19/hour</p>
                    <p>× 20 hours/week</p>
                    <p>× 36 weeks</p>
                  </div>
                  <p className="text-sm font-semibold mt-4">Human Interpreters</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover-scale">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-4">💻</div>
                  <p className="text-sm text-muted-foreground mb-2">Alternative Software</p>
                  <p className="text-4xl font-bold text-foreground mb-4">$7,750/year</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>50 students</p>
                    <p>× $155/student</p>
                  </div>
                  <p className="text-sm font-semibold mt-4">Read&Write (Leading Competitor)</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary shadow-lg hover-scale">
                <CardContent className="pt-6 text-center bg-primary/5">
                  <div className="text-4xl mb-4">🚀</div>
                  <p className="text-sm text-primary mb-2 font-semibold">Our Solution ✓</p>
                  <p className="text-4xl font-bold text-primary mb-4">$3,500/year</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>50 students</p>
                    <p>× $70/student</p>
                  </div>
                  <p className="text-sm font-semibold text-primary mt-4">LanguageBridge</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="pt-6">
                <p className="text-center text-xl font-bold mb-4">Your Savings:</p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">vs. Interpreters:</p>
                    <p className="text-3xl font-bold text-green-600">$23,860/year</p>
                    <p className="text-sm text-muted-foreground">(87% savings)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">vs. Read&Write:</p>
                    <p className="text-3xl font-bold text-green-600">$4,250/year</p>
                    <p className="text-sm text-muted-foreground">(55% savings)</p>
                  </div>
                </div>
                <p className="text-center text-2xl font-bold">
                  This isn't an expense. It's a <span className="gradient-text">10-20x return on investment.</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 5: FUNDING OPTIONS */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                🎓 How Schools Pay for LanguageBridge
              </h2>
              <p className="text-xl text-muted-foreground">
                Most schools don't pay out-of-pocket—they use existing grant funds
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">💵</div>
                  <CardTitle>Title III Funds</CardTitle>
                  <CardDescription>English Language Acquisition federal allocation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use your existing Title III budget. LanguageBridge represents just 2-3% of typical allocations.
                  </p>
                  <Link to="/grants/title-iii" className="text-primary text-sm font-semibold hover:underline">
                    Download Title III Template →
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">⚖️</div>
                  <CardTitle>Title VI Compliance</CardTitle>
                  <CardDescription>Civil Rights compliance federal funding</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    If facing Title VI violations, use compliance funds to remediate with LanguageBridge.
                  </p>
                  <Link to="/grants" className="text-primary text-sm font-semibold hover:underline">
                    Download Title VI Template →
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">🎯</div>
                  <CardTitle>IDEA Part B</CardTitle>
                  <CardDescription>Assistive Technology budget line</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    For ELL students with IEPs, classify as assistive technology.
                  </p>
                  <Link to="/grants" className="text-primary text-sm font-semibold hover:underline">
                    Download IDEA Template →
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">📚</div>
                  <CardTitle>General Fund</CardTitle>
                  <CardDescription>Instructional Materials or EdTech budget</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    At $3,500 for 50 students, many schools can fund from regular budget.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">🤝</div>
                  <CardTitle>Community Grants</CardTitle>
                  <CardDescription>Local foundation grants</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Refugee support, equity initiatives, and education foundations love this mission.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-lg mb-4">Need help identifying funding sources?</p>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Schedule Free Grant Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: INTERACTIVE ROI CALCULATOR */}
      <section id="calculator" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <CalcIcon className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                📊 Calculate Your School's Savings
              </h2>
              <p className="text-xl text-muted-foreground">
                See exactly how much LanguageBridge saves compared to interpreters
              </p>
            </div>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-center">Interactive ROI Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of interpreters</label>
                    <Input
                      type="number"
                      value={interpreters}
                      onChange={(e) => setInterpreters(Number(e.target.value))}
                      min="1"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Hours per week</label>
                    <Input
                      type="number"
                      value={hoursPerWeek}
                      onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                      min="1"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Hourly rate ($)</label>
                    <Input
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      min="1"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of ELL students</label>
                    <Input
                      type="number"
                      value={numStudents}
                      onChange={(e) => setNumStudents(Number(e.target.value))}
                      min="1"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 mb-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Your Current Annual Interpreter Cost</p>
                      <p className="text-4xl font-bold text-foreground">${interpreterCost.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">LanguageBridge Annual Cost</p>
                      <p className="text-4xl font-bold text-primary">${languageBridgeCost.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        ({numStudents} students × ${pricePerStudent}/student)
                      </p>
                    </div>
                  </div>

                  <div className="text-center bg-card rounded-xl p-6 mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Your Total Annual Savings</p>
                    <p className="text-5xl font-bold text-green-600 mb-2">
                      ${savings > 0 ? savings.toLocaleString() : '0'}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Cost Per Student Per Day: <span className="font-bold">${costPerDay.toFixed(2)}</span>
                    </p>
                  </div>

                  {/* Extended ROI Toggle */}
                  <div className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowExtendedROI(!showExtendedROI)}
                      className="mb-4"
                    >
                      {showExtendedROI ? 'Hide' : 'Show'} Extended ROI Analysis
                    </Button>
                  </div>

                  {showExtendedROI && (
                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t-2 border-border">
                      <div className="bg-card rounded-lg p-4">
                        <p className="text-sm font-semibold mb-1">Special Ed Referral Savings</p>
                        <p className="text-sm text-muted-foreground">Avg. 2 misdiagnoses avoided × $8,000</p>
                        <p className="text-2xl font-bold text-green-600">${misdiagnosisSavings.toLocaleString()}</p>
                      </div>
                      <div className="bg-card rounded-lg p-4">
                        <p className="text-sm font-semibold mb-1">Teacher Time Reclaimed</p>
                        <p className="text-sm text-muted-foreground">12 hours/week × $45/hour × 36 weeks</p>
                        <p className="text-2xl font-bold text-green-600">${teacherTimeSavings.toLocaleString()}</p>
                      </div>
                      <div className="bg-card rounded-lg p-4">
                        <p className="text-sm font-semibold mb-1">Legal Risk Avoided</p>
                        <p className="text-sm text-muted-foreground">Title VI investigation costs</p>
                        <p className="text-2xl font-bold text-green-600">${complianceSavings.toLocaleString()}</p>
                      </div>
                      <div className="bg-card rounded-lg p-4 border-2 border-primary">
                        <p className="text-sm font-semibold mb-1 text-primary">Total Annual Value</p>
                        <p className="text-sm text-muted-foreground">Sum of all benefits</p>
                        <p className="text-2xl font-bold text-primary">${totalAnnualValue.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="w-full gradient-primary text-white">
                  <Link to="/contact">
                    <Mail className="mr-2" />
                    Request Templates
                  </Link>
                </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/contact">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Me These Results
                    </Link>
                  </Button>
                  <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent">
                    <Link to="/contact">Schedule Call to Discuss</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 7: PAYMENT OPTIONS */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Flexible Payment Options
              </h2>
              <p className="text-xl text-muted-foreground">
                We work with school procurement processes
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">📄</div>
                  <CardTitle>Purchase Order</CardTitle>
                  <CardDescription>(Most Common)</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Send us a PO, we'll invoice</p>
                  <p className="text-sm mb-2">Net 30 or Net 60 terms available</p>
                  <p className="text-xs text-muted-foreground">We accept POs from all school districts</p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">✉️</div>
                  <CardTitle>Invoice + Check</CardTitle>
                  <CardDescription>Traditional Method</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Request invoice, pay by check</p>
                  <p className="text-sm mb-2">Mail payment to our business address</p>
                  <p className="text-xs text-muted-foreground">Ideal for smaller districts</p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">🏦</div>
                  <CardTitle>ACH Transfer</CardTitle>
                  <CardDescription>Electronic Payment</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Direct bank transfer</p>
                  <p className="text-sm mb-2">Electronic payment via ACH</p>
                  <p className="text-xs text-muted-foreground">Fastest payment method</p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">💰</div>
                  <CardTitle>Grant Direct Payment</CardTitle>
                  <CardDescription>Vendor Payment</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Grant pays us directly</p>
                  <p className="text-sm mb-2">Some grants can pay vendors directly</p>
                  <p className="text-xs text-muted-foreground">We can coordinate with grant administrators</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              All payment methods are secure and compliant with school procurement policies.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ - PRICING SPECIFIC */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Common Pricing Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Can we start with a smaller pilot before committing to a full contract?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! We offer a free 30-day pilot for up to 50 students with no credit card required. 
                  Most schools pilot with one classroom or building first, then expand after seeing results.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Do you offer multi-year discounts?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! Schools that commit to 2-year contracts receive 10% discount. Founding partner schools 
                  (first 10 schools) lock in their rate for 2 years automatically.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  What if we can't fit this in our current budget year?
                </AccordionTrigger>
                <AccordionContent>
                  Many schools use Title III or IDEA Part B funds, which refresh annually. We can help you apply 
                  for next year's budget cycle. We also provide grant templates to help secure funding. Download 
                  our Grant Toolkit for free templates.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Is there a setup fee or implementation cost?
                </AccordionTrigger>
                <AccordionContent>
                  No. The per-student price includes everything: software license, implementation support, training, 
                  and ongoing customer success. There are no hidden fees.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  What happens if we need to add more students mid-year?
                </AccordionTrigger>
                <AccordionContent>
                  We prorate based on remaining months. For example, if you add students in January (6 months remaining), 
                  you pay 50% of annual cost for those students.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>
                  Can we cancel if it doesn't work out?
                </AccordionTrigger>
                <AccordionContent>
                  Yes. We offer month-to-month contracts (no long-term commitment required). If you're not satisfied, 
                  cancel anytime. For annual contracts, we offer prorated refunds within first 90 days.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>
                  Do you offer non-profit or Title I school discounts?
                </AccordionTrigger>
                <AccordionContent>
                  Our pricing is already designed to be accessible for all schools, including Title I. However, founding 
                  partner schools (first 10) receive 20% discount. We also provide free grant templates to help secure funding.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>
                  What's included in the annual price?
                </AccordionTrigger>
                <AccordionContent>
                  Everything: unlimited translations, all 8 languages, text-to-speech, two-way communication, all software 
                  updates, technical support, usage analytics, training resources, and FERPA/COPPA compliance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger>
                  How does pricing work for very small schools (fewer than 10 students)?
                </AccordionTrigger>
                <AccordionContent>
                  For schools with fewer than 10 ELL students, we offer a minimum annual license of $850 (equivalent to 
                  10 students). This ensures you get full support even with a small deployment.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-muted-foreground">
                Join the first schools bringing language access to their ELL students
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle>Start Your Free Pilot</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span>No credit card required</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Up to 50 students</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span>30 days full access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Cancel anytime</span>
                    </li>
                  </ul>
                  <Button asChild size="lg" className="w-full bg-gradient-to-r from-primary to-accent">
                    <Link to="/pilot">Apply for Free Pilot</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle>Talk to the Founder</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span>I'm Justin, an ESL teacher who built this</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Schedule 15-min call</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Discuss your specific needs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Get custom pricing quote</span>
                    </li>
                  </ul>
                  <Button asChild size="lg" variant="outline" className="w-full">
                    <Link to="/contact">Schedule Call</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground mb-2">Questions?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:2168006020" className="flex items-center gap-2 text-primary hover:underline">
                  <Phone className="w-4 h-4" />
                  (216) 800-6020
                </a>
                <span className="text-muted-foreground">or</span>
                <a href="mailto:languagebridge.contact@gmail.com" className="flex items-center gap-2 text-primary hover:underline">
                  <Mail className="w-4 h-4" />
                  languagebridge.contact@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
