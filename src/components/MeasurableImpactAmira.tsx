import { Button } from "@/components/ui/button";
import { TrendingUp, Download } from "lucide-react";

export const MeasurableImpactAmira = () => {
  const metrics = [
    "Disciplinary referrals dropped to zero",
    "Participates in conversations",
    "Volunteers in class",
    "Saved 12 hours interpreter time"
  ];

  return (
    <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-xl p-6 mt-8">
      <div className="flex items-start gap-3 mb-4">
        <div className="bg-primary/20 p-2 rounded-lg">
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">📈 MEASURABLE IMPACT</h3>
      </div>
      
      <ul className="space-y-2 mb-6">
        {metrics.map((metric, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-primary font-bold">✓</span>
            <span className="text-foreground font-medium">{metric}</span>
          </li>
        ))}
      </ul>

      <Button variant="outline" className="w-full">
        <Download className="mr-2 h-4 w-4" />
        Download Full Case Study
      </Button>
    </div>
  );
};
