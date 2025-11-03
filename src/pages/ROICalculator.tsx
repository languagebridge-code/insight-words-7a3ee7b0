import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ROICalculator() {
  const [interpreters, setInterpreters] = useState(2);
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(19);
  const [ellStudents, setEllStudents] = useState(50);
  
  // Extended ROI inputs
  const [misdiagnoses, setMisdiagnoses] = useState(2);
  const [teacherHours, setTeacherHours] = useState(5);

  // Calculations
  const interpreterCost = interpreters * hoursPerWeek * hourlyRate * 52;
  const languageBridgeCost = ellStudents <= 20 ? 1200 : ellStudents <= 50 ? 2000 : 3500;
  const interpreterSavings = Math.max(0, interpreterCost - languageBridgeCost);
  
  const misdiagnosisSavings = misdiagnoses * 8000; // Avg cost per misdiagnosis
  const teacherTimeSavings = teacherHours * 40 * 52; // Teacher hourly rate * weeks
  const complianceSavings = 50000; // Avg Title VI investigation cost
  
  const totalAnnualValue = interpreterSavings + misdiagnosisSavings + teacherTimeSavings + complianceSavings;
  const roi = ((totalAnnualValue - languageBridgeCost) / languageBridgeCost * 100).toFixed(0);
  const costPerStudent = (languageBridgeCost / ellStudents / 180).toFixed(2); // Per student per day

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Calculate Your School's <span className="gradient-text">Savings</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              See exactly how much LanguageBridge saves vs. human interpreters and other costs
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
              <h2 className="text-3xl font-bold mb-8 text-center">Interactive ROI Calculator</h2>

              {/* Basic Interpreter Calculation */}
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Step 1</span>
                  Interpreter Costs
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Number of Interpreters Needed</label>
                    <input
                      type="number"
                      value={interpreters}
                      onChange={(e) => setInterpreters(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                      min="1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">One per language</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Hours Per Week (each)</label>
                    <input
                      type="number"
                      value={hoursPerWeek}
                      onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Hourly Rate ($)</label>
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                      min="1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Typically $18-20/hr</p>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-2">Your Current Annual Interpreter Cost</p>
                  <p className="text-4xl font-bold text-foreground">${interpreterCost.toLocaleString()}</p>
                </div>
              </div>

              {/* Student Count */}
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Step 2</span>
                  Your ELL Students
                </h3>
                
                <div className="max-w-md">
                  <label className="block text-sm font-semibold mb-2">Number of ELL Students</label>
                  <input
                    type="number"
                    value={ellStudents}
                    onChange={(e) => setEllStudents(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                    min="1"
                  />
                </div>
              </div>

              {/* Extended ROI Factors */}
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Step 3</span>
                  Additional Value Factors
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Special Ed Misdiagnoses Avoided Per Year
                    </label>
                    <input
                      type="number"
                      value={misdiagnoses}
                      onChange={(e) => setMisdiagnoses(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background max-w-md"
                      min="0"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Avg. cost per misdiagnosis: $8,000/year
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Teacher Time Reclaimed (hours/week)
                    </label>
                    <input
                      type="number"
                      value={teacherHours}
                      onChange={(e) => setTeacherHours(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background max-w-md"
                      min="0"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Time saved from not manually translating or coordinating interpreters
                    </p>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="border-t border-border pt-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Your Complete ROI Analysis</h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Cost Breakdown */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg mb-4">Annual Value Breakdown:</h4>
                    
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm">Interpreter Savings</span>
                      <span className="font-bold text-primary">${interpreterSavings.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm">Misdiagnosis Prevention</span>
                      <span className="font-bold text-primary">${misdiagnosisSavings.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm">Teacher Time Value</span>
                      <span className="font-bold text-primary">${teacherTimeSavings.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm">Title VI Risk Avoided</span>
                      <span className="font-bold text-primary">${complianceSavings.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Total Value */}
                  <div>
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border-2 border-primary/30 mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Total Annual Value</p>
                      <p className="text-5xl font-bold text-primary mb-4">
                        ${totalAnnualValue.toLocaleString()}
                      </p>
                      <div className="border-t border-primary/20 pt-4 mt-4">
                        <p className="text-sm text-muted-foreground mb-2">LanguageBridge Cost</p>
                        <p className="text-3xl font-bold text-foreground mb-2">
                          ${languageBridgeCost.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="bg-primary text-white rounded-xl p-6 text-center">
                      <p className="text-sm mb-2">Return on Investment</p>
                      <p className="text-6xl font-bold mb-2">{roi}%</p>
                      <p className="text-sm opacity-90">
                        {(totalAnnualValue / languageBridgeCost).toFixed(1)}x return
                      </p>
                    </div>
                  </div>
                </div>

                {/* Per Student Cost */}
                <div className="bg-card rounded-xl p-6 border border-border text-center mb-8">
                  <p className="text-muted-foreground mb-2">Cost per student per day</p>
                  <p className="text-4xl font-bold text-primary mb-2">${costPerStudent}</p>
                  <p className="text-sm text-muted-foreground">
                    Based on 180 school days
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="hero">
                    <Download className="mr-2" />
                    Download as PDF
                  </Button>
                  <Button size="lg" variant="outline">
                    <Mail className="mr-2" />
                    Email Me These Results
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/pilot">Start Free Pilot</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explanation */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Understanding Your ROI</h2>

            <div className="space-y-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-bold mb-2">💰 Interpreter Savings</h3>
                <p className="text-muted-foreground">
                  Direct cost comparison between hiring human interpreters vs. LanguageBridge. Interpreters typically cost $18-20/hour and are needed for each language, adding up quickly.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-bold mb-2">🎓 Misdiagnosis Prevention</h3>
                <p className="text-muted-foreground">
                  ELL students are often incorrectly referred to special education because language barriers are mistaken for learning disabilities. Each misdiagnosis costs districts an average of $8,000/year in unnecessary services. LanguageBridge helps educators see the real academic ability.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-bold mb-2">⏰ Teacher Time Value</h3>
                <p className="text-muted-foreground">
                  Teachers spend hours coordinating interpreters, manually translating materials, or working one-on-one with ELL students. This time is valued at their hourly rate ($40+) and can be redirected to instruction when LanguageBridge handles translation.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-bold mb-2">⚖️ Title VI Compliance Protection</h3>
                <p className="text-muted-foreground">
                  OCR Title VI investigations for inadequate language access cost schools $50K+ in legal fees, not counting potential funding loss. LanguageBridge provides documented language access, reducing this risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to start saving?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Begin your free pilot and see these savings with your own students
            </p>
            <Button asChild size="lg" variant="hero">
              <Link to="/pilot">Start Free 30-Day Pilot</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
