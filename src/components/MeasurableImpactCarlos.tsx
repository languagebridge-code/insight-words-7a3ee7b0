import { TrendingUp } from "lucide-react";

export const MeasurableImpactCarlos = () => {
  const expectedOutcomes = [
    "Increased assignment completion",
    "Improved reading comprehension",
    "Greater classroom participation",
    "Better parent-teacher communication"
  ];

  return (
    <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-xl p-6 mt-8">
      <div className="flex items-start gap-3 mb-4">
        <div className="bg-primary/20 p-2 rounded-lg">
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">📈 EXPECTED OUTCOMES</h3>
          <p className="text-sm text-muted-foreground italic">Results from pilot launching January 2026</p>
        </div>
      </div>
      
      <ul className="space-y-2">
        {expectedOutcomes.map((outcome, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-primary font-bold">→</span>
            <span className="text-foreground font-medium">{outcome}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
