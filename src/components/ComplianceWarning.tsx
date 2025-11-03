import { Button } from "@/components/ui/button";
import { AlertTriangle, Download } from "lucide-react";
import { Link } from "react-router-dom";

export const ComplianceWarning = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-destructive/5 border-2 border-destructive/30 rounded-2xl p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-destructive/10 p-3 rounded-full">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  ⚖️ REAL CONSEQUENCES OF NON-COMPLIANCE
                </h2>
                <p className="text-xl text-muted-foreground mb-6">
                  Schools using non-compliant translation tools risk:
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border">
                <span className="text-destructive text-xl">•</span>
                <div>
                  <p className="font-semibold">OCR Title VI investigations</p>
                  <p className="text-sm text-muted-foreground">Average $50K in legal fees alone</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border">
                <span className="text-destructive text-xl">•</span>
                <div>
                  <p className="font-semibold">Loss of federal funding</p>
                  <p className="text-sm text-muted-foreground">Title I, Title III at stake</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border">
                <span className="text-destructive text-xl">•</span>
                <div>
                  <p className="font-semibold">Lawsuits from parents</p>
                  <p className="text-sm text-muted-foreground">Denial of FAPE claims</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border">
                <span className="text-destructive text-xl">•</span>
                <div>
                  <p className="font-semibold">Damage to reputation</p>
                  <p className="text-sm text-muted-foreground">Public news coverage, community trust</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button asChild size="lg" variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-white">
                <Link to="/compliance">
                  <Download className="mr-2 h-5 w-5" />
                  Download Our Title VI Compliance Checklist (FREE)
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
