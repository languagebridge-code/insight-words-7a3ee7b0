import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowUp, CheckCircle2, XCircle, Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    setIsGeneratingPdf(true);
    toast.info("Generating PDF... This may take a moment.");

    try {
      // Get the content element
      const element = contentRef.current;
      
      // Create canvas from the content
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      // Calculate PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");
      let position = 0;

      // Add image to PDF
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add new pages if content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save("LanguageBridge-Privacy-Policy.pdf");
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const sections = [
    { id: "commitment", title: "Our Commitment" },
    { id: "collection", title: "What We Collect" },
    { id: "how-it-works", title: "How It Works" },
    { id: "dont-do", title: "What We Don't Do" },
    { id: "third-party", title: "Third-Party Services" },
    { id: "security", title: "Data Security" },
    { id: "retention", title: "Data Retention" },
    { id: "ferpa", title: "Student Rights (FERPA)" },
    { id: "coppa", title: "Children's Privacy (COPPA)" },
    { id: "sb29", title: "Ohio SB 29 Compliance" },
    { id: "schools", title: "For Schools" },
    { id: "international", title: "International Use" },
    { id: "changes", title: "Changes to This Policy" },
    { id: "transparency", title: "Transparency Commitments" },
    { id: "legal", title: "Legal Compliance" },
    { id: "contact", title: "Contact Us" },
    { id: "summary", title: "Plain English Summary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary via-primary/90 to-secondary text-white py-12 sticky top-0 z-40 shadow-lg backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start mb-4">
            <Link to="/" className="text-white/90 hover:text-white inline-block transition-colors">
              ← Back to Home
            </Link>
            <Button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              variant="secondary"
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              {isGeneratingPdf ? "Generating..." : "Download PDF"}
            </Button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Privacy Policy</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-white/80">
            <p><strong>Effective Date:</strong> December 1, 2025</p>
            <span className="hidden md:inline">•</span>
            <p><strong>Contact:</strong> privacy@languagebridge.app</p>
          </div>
        </div>
      </header>

      <div ref={contentRef} className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Key Points Card */}
          <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6" id="commitment">Our Commitment</h2>
              <p className="text-muted-foreground mb-6">
                LanguageBridge™ helps students learn. We don't sell data, track browsing, or create profiles. This policy explains exactly what we do and don't do with information.
              </p>
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <Card className="mb-12">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
              <nav className="grid md:grid-cols-2 gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-primary hover:underline py-1 transition-colors"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* Section: What We Collect */}
          <section id="collection" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">What We Collect</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4">From Students: Almost Nothing</h3>
                
                <Card className="mb-4">
                  <CardContent className="pt-6">
                    <ul className="space-y-3 text-muted-foreground">
                      <li>
                        <strong>Text for translation:</strong> When you select text, we send it to Microsoft Azure for translation. We don't store it.
                      </li>
                      <li>
                        <strong>Language preference:</strong> We remember which language you chose (stored in your browser).
                      </li>
                      <li>
                        <strong>Usage stats:</strong> Anonymous counts like "150 translations today" (no names, no personal info).
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900 mb-4">
                  <CardContent className="pt-6">
                    <p className="font-semibold mb-4">We do NOT collect:</p>
                    <div className="grid md:grid-cols-2 gap-2">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Names</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Email addresses</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Student IDs</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Grades</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Browsing history</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Personal information of any kind</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">From Schools</h3>
                <Card>
                  <CardContent className="pt-6">
                    <p className="mb-4">When schools purchase LanguageBridge:</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>School/district name</li>
                      <li>Administrator contact info</li>
                      <li>Number of licenses</li>
                      <li>Aggregate usage data (not linked to individual students)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Technical Stuff</h3>
                <Card>
                  <CardContent className="pt-6">
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Browser type (for compatibility)</li>
                      <li>Extension version</li>
                      <li>Error logs (no personal info)</li>
                      <li>Language pairs used (aggregated across all users)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Section: How It Works */}
          <section id="how-it-works" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Translation Process</h3>
                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                  <CardContent className="pt-6">
                    <ol className="space-y-2 list-decimal list-inside mb-4">
                      <li>You select text</li>
                      <li>Text goes to Microsoft Azure via encrypted HTTPS</li>
                      <li>Azure translates it and sends it back</li>
                      <li>Azure immediately discards the text</li>
                      <li>You hear/see the translation</li>
                    </ol>
                    <p className="font-bold">The text is never stored. Not by us, not by Microsoft.</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Google Docs & Clipboard</h3>
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Why we need clipboard permission:</p>
                      <p className="text-muted-foreground">Google Docs blocks normal text selection. When you copy text in Google Docs, we read it from your clipboard to translate it.</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">What we do NOT do:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Monitor your clipboard continuously</li>
                        <li>Read clipboard data outside Google Docs contexts</li>
                        <li>Store anything you copy</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Text-to-Speech</h3>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">Same as translation - text is sent to Azure Speech Services, processed, and immediately discarded. We don't keep audio files.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Section: What We Don't Do */}
          <section id="dont-do" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">What We Don't Do</h2>
            
            <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <p className="font-semibold mb-4">We NEVER:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Sell student data</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Use data for advertising</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Track browsing history</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Create student profiles</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Share data with advertisers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Store translated text</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Link usage to individual students</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section: Third-Party Services */}
          <section id="third-party" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Third-Party Services</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Microsoft Azure (Translation & Speech)</h3>
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Used for:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Translation and text-to-speech</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">What they get:</p>
                      <p className="text-muted-foreground">Selected text only (no student names/IDs)</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Storage:</p>
                      <p className="text-muted-foreground">None - text is processed and immediately deleted</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Privacy:</p>
                      <a href="https://privacy.microsoft.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Privacy Policy</a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">We don't use:</h3>
                <Card>
                  <CardContent className="pt-6">
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Google Analytics</li>
                      <li>Ad networks</li>
                      <li>Social media trackers</li>
                      <li>Data brokers</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Section: Data Security */}
          <section id="security" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Data Security</h2>
            
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>All data encrypted in transit (HTTPS/TLS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Hosted on Microsoft Azure (SOC 2 certified)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Multi-factor authentication for admin access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Regular security audits</span>
                  </li>
                </ul>
                <p className="mt-6 font-bold">No data breaches: Because we don't store student data, there's nothing to breach.</p>
              </CardContent>
            </Card>
          </section>

          {/* Section: Data Retention */}
          <section id="retention" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Data Retention</h2>
            
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3 text-muted-foreground">
                  <li><strong>Translated text:</strong> 0 seconds (not stored)</li>
                  <li><strong>Student info:</strong> 0 seconds (not collected)</li>
                  <li><strong>Usage stats:</strong> 2 years (anonymous aggregates only)</li>
                  <li><strong>School contracts:</strong> Contract duration + 7 years (legal requirement)</li>
                  <li><strong>Error logs:</strong> 90 days (no personal info)</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 4: Data Sharing */}
          <section id="sharing" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">4. Data Sharing and Disclosure</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4">4.1 We Do NOT Share Data</h3>
                <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                  <CardContent className="pt-6">
                    <p className="font-bold mb-4">LanguageBridge <strong>does not share, sell, or disclose</strong> any user data to:</p>
                    <div className="grid md:grid-cols-2 gap-2">
                      <div>✗ Third-party advertisers</div>
                      <div>✗ Marketing companies</div>
                      <div>✗ Data brokers</div>
                      <div>✗ Analytics services</div>
                      <div>✗ Any other parties</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">4.2 Legal Requirements</h3>
                <Card>
                  <CardContent className="pt-6">
                    <p className="mb-4">We may disclose information only if required by law, such as:</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Valid court orders</li>
                      <li>Subpoenas</li>
                      <li>Legal processes</li>
                    </ul>
                    <p className="mt-4 text-sm font-semibold">However, since we <strong>do not collect or store user data</strong>, there is typically nothing to disclose.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Section 5: COPPA */}
          <section id="coppa" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">5. Children's Privacy (COPPA Compliance)</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p>LanguageBridge is designed for use by students, including children under 13.</p>
                
                <div className="border-l-4 border-primary pl-4 my-4">
                  <p className="font-bold mb-3">COPPA Compliance:</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>We do <strong>not</strong> collect personal information from children</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>No registration or account required</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>No email addresses collected</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>No data stored about individual children</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Parental consent is <strong>not required</strong> because we collect no personal data</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-semibold mb-2">School Use:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Schools may deploy LanguageBridge without obtaining parental consent under FERPA's "school official" exception</li>
                    <li>The extension acts as a tool for educational purposes, similar to a dictionary or calculator</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section: Ohio SB 29 Compliance */}
          <section id="sb29" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Ohio Senate Bill 29 (SB 29) Compliance</h2>
            
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 mb-6">
              <CardContent className="pt-6">
                <p className="text-lg mb-4">
                  Ohio Senate Bill 29 establishes student data privacy requirements for K-12 school districts and technology providers. <strong className="text-primary">LanguageBridge is fully compliant with all SB 29 requirements.</strong>
                </p>
                <p className="text-muted-foreground">
                  Our privacy-first architecture means we exceed SB 29 requirements by design—we don't store educational records, track students, or collect personally identifiable information.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">SB 29 Compliance Summary</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b-2 border-border">
                        <th className="text-left p-3 font-bold">SB 29 Requirement</th>
                        <th className="text-center p-3 font-bold w-24">Status</th>
                        <th className="text-left p-3 font-bold">How We Comply</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="p-3 text-muted-foreground">Educational records protection</td>
                        <td className="p-3 text-center"><span className="text-green-600 font-bold">✓</span></td>
                        <td className="p-3 text-muted-foreground">No educational records stored; ephemeral processing only</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-muted-foreground">No data selling/sharing</td>
                        <td className="p-3 text-center"><span className="text-green-600 font-bold">✓</span></td>
                        <td className="p-3 text-muted-foreground">Zero data selling; no third-party sharing for commercial purposes</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-muted-foreground">Restricted employee access</td>
                        <td className="p-3 text-center"><span className="text-green-600 font-bold">✓</span></td>
                        <td className="p-3 text-muted-foreground">LanguageBridge employees have zero access to student data</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-muted-foreground">FERPA alignment</td>
                        <td className="p-3 text-center"><span className="text-green-600 font-bold">✓</span></td>
                        <td className="p-3 text-muted-foreground">Uses FERPA-compliant Azure; collects no PII</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-muted-foreground">No location tracking</td>
                        <td className="p-3 text-center"><span className="text-green-600 font-bold">✓</span></td>
                        <td className="p-3 text-muted-foreground">Extension does not request or use location permissions</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-muted-foreground">No keystroke logging</td>
                        <td className="p-3 text-center"><span className="text-green-600 font-bold">✓</span></td>
                        <td className="p-3 text-muted-foreground">No monitoring of keystroke activity</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-muted-foreground">No browsing history tracking</td>
                        <td className="p-3 text-center"><span className="text-green-600 font-bold">✓</span></td>
                        <td className="p-3 text-muted-foreground">Extension does not access or track browsing history</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-muted-foreground">No passive monitoring</td>
                        <td className="p-3 text-center"><span className="text-green-600 font-bold">✓</span></td>
                        <td className="p-3 text-muted-foreground">Audio features on-demand only (student-initiated)</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-muted-foreground">72-hour breach notification</td>
                        <td className="p-3 text-center"><span className="text-green-600 font-bold">✓</span></td>
                        <td className="p-3 text-muted-foreground">Written protocol established; 24/7 emergency contact</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-muted-foreground">Data security measures</td>
                        <td className="p-3 text-center"><span className="text-green-600 font-bold">✓</span></td>
                        <td className="p-3 text-muted-foreground">HTTPS encryption, SOC 2 infrastructure, FERPA-compliant processing</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-muted-foreground">Parent rights</td>
                        <td className="p-3 text-center"><span className="text-green-600 font-bold">✓</span></td>
                        <td className="p-3 text-muted-foreground">Transparent practices; opt-out available</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-muted-foreground">Contract requirements</td>
                        <td className="p-3 text-center"><span className="text-green-600 font-bold">✓</span></td>
                        <td className="p-3 text-muted-foreground">SB 29-compliant contract language provided</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-center font-bold text-primary">Overall Compliance: 12/12 (100%)</p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">No Prohibited Monitoring Activities</h3>
                  <p className="text-muted-foreground mb-4">
                    SB 29 prohibits certain monitoring activities unless specific conditions are met. LanguageBridge does NOT engage in any of these activities:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Location tracking of students</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Recording keystrokes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Activating camera or microphone without consent</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Recording browsing history</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Passive monitoring of student activity</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Creating behavioral profiles</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Breach Notification Protocol</h3>
                  <p className="text-muted-foreground mb-4">
                    In the unlikely event of a security incident, LanguageBridge maintains a comprehensive security incident response plan:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Districts notified within 72 hours of any confirmed breach (as required by SB 29)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">24/7 emergency contact available for security concerns</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Written incident response procedures documented</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> Since LanguageBridge does not store educational records, the risk of a data breach affecting student information is minimal. There is no database of student data to breach.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Parent & Student Rights Under SB 29</h3>
                  <p className="text-muted-foreground mb-4">
                    SB 29 guarantees certain rights to parents and students. Here's how LanguageBridge supports these rights:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-sm">Right to Inspect:</strong>
                        <p className="text-sm text-muted-foreground">Since we don't collect or store student data, there are no records to inspect. Parents can verify this through our transparent privacy practices.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-sm">Right to Opt-Out:</strong>
                        <p className="text-sm text-muted-foreground">Students can stop using LanguageBridge at any time by simply not activating the extension. Districts can also disable access through standard Chromebook management.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-sm">Right to Deletion:</strong>
                        <p className="text-sm text-muted-foreground">Uninstalling the extension removes all locally stored preferences. No server-side student data exists to delete.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">SB 29 Contract Compliance</h3>
                  <p className="text-muted-foreground mb-4">
                    LanguageBridge provides SB 29-compliant contract language for Ohio school districts, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Data protection and privacy provisions</li>
                    <li>FERPA compliance commitments</li>
                    <li>Prohibition on data selling/sharing</li>
                    <li>Security requirements</li>
                    <li>Breach notification protocol</li>
                    <li>Monitoring limitations</li>
                    <li>Indemnification and liability</li>
                    <li>Termination and data deletion procedures</li>
                  </ul>
                  <p className="mt-4 text-sm">
                    <strong>For Ohio Districts:</strong> Contact <a href="mailto:info@languagebridge.app" className="text-primary hover:underline">info@languagebridge.app</a> to request our complete SB 29 compliance guide package, including contract addendum templates and parent notification letter templates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 6: FERPA */}
          <section id="ferpa" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">6. FERPA Compliance (Student Privacy)</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p>LanguageBridge complies with the Family Educational Rights and Privacy Act (FERPA):</p>
                
                <div>
                  <p className="font-semibold mb-2">No Education Records Created:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>We do not create, store, or maintain education records</li>
                    <li>No student performance data is collected</li>
                    <li>No grades or assessment data is tracked</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">Legitimate Educational Interest:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Translation and reading support serve a legitimate educational purpose</li>
                    <li>Real-time processing means no records are created</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">Microsoft Azure as School Official:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Microsoft Azure acts as a "school official" under FERPA</li>
                    <li>Azure has a legitimate educational interest in providing translation services</li>
                    <li>Azure is under direct control of the school through their enterprise agreement</li>
                    <li>Microsoft Azure's FERPA compliance: <a href="https://docs.microsoft.com/en-us/compliance/regulatory/offering-ferpa" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://docs.microsoft.com/en-us/compliance/regulatory/offering-ferpa</a></li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 7: Data Security */}
          <section id="security" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">7. Data Security</h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">7.1 Encryption</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong>In Transit:</strong> All data sent to Azure is encrypted using TLS 1.2+ (HTTPS)</li>
                    <li><strong>At Rest:</strong> No data is stored, so no "at rest" encryption is needed</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">7.2 Access Controls</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Extension code runs in a sandboxed Chrome environment</li>
                    <li>• No external servers controlled by LanguageBridge (we use Azure directly)</li>
                    <li>• No backend database or user accounts</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">7.3 Security Best Practices</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Regular security audits of code</li>
                    <li>• Minimal permissions requested from Chrome</li>
                    <li>• Open-source code available for review</li>
                    <li>• No third-party tracking scripts or analytics</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 8: User Rights */}
          <section id="rights" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">8. User Rights and Controls</h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">8.1 Your Rights</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div><strong>Access:</strong> View your locally stored preferences in Chrome settings</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div><strong>Delete:</strong> Clear all extension data by uninstalling or clearing Chrome data</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div><strong>Opt-out:</strong> Disable or uninstall the extension at any time</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div><strong>Export:</strong> Export settings (manual process)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">8.2 How to Delete Your Data</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Delete All Extension Data:</p>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Go to <code className="bg-muted px-1 py-0.5 rounded">chrome://extensions/</code></li>
                        <li>Find "LanguageBridge"</li>
                        <li>Click "Remove"</li>
                        <li>Confirm deletion</li>
                      </ol>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Clear Settings Only (Keep Extension):</p>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Right-click extension icon</li>
                        <li>Go to "Options"</li>
                        <li>Click "Reset Settings" (if available)</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">8.3 Disabling Data Sync</h3>
                  <p className="mb-3">To prevent settings from syncing across devices:</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Open Chrome Settings</li>
                    <li>Go to "Sync and Google services"</li>
                    <li>Turn off "Sync everything" or disable "Extensions" sync</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section: International Use */}
          <section id="international" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">International Use</h2>
            
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p className="text-muted-foreground">LanguageBridge is based in the United States. Azure may process translations on servers worldwide. Schools outside the U.S. should review local data protection laws.</p>
                
                <p className="text-sm"><strong>EU/UK schools:</strong> GDPR-compliant Data Processing Agreements available on request.</p>
              </CardContent>
            </Card>
          </section>

          {/* Section: Changes to Policy */}
          <section id="changes" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Changes to This Policy</h2>
            
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p className="text-muted-foreground">We'll notify schools 30 days before changes. Updated policy posted at languagebridge.app/privacy.</p>
                
                <p className="text-muted-foreground">Continued use = acceptance. Schools can cancel if they disagree with changes.</p>
              </CardContent>
            </Card>
          </section>

          {/* Section: Transparency Commitments */}
          <section id="transparency" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Transparency Commitments</h2>
            
            <Card>
              <CardContent className="pt-6">
                <p className="font-semibold mb-4">We commit to:</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Clear communication about data practices</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Industry-standard security</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Quick response to privacy concerns (2 business days)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Compliance with all privacy laws</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Minimal data collection</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Never misusing student data</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section: Legal Compliance */}
          <section id="legal" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Legal Compliance</h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <p className="font-semibold mb-2">FERPA:</p>
                  <p className="text-muted-foreground text-sm">We act as "school official" with "legitimate educational interest" (34 CFR § 99.31(a)(1))</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <CardContent className="pt-6">
                  <p className="font-semibold mb-3 text-lg">LanguageBridge Student Data Privacy Pledge</p>
                  <p className="text-muted-foreground text-sm mb-4">We make the following commitments to schools, students, and families:</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">We will NOT sell student personal information</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">We will NOT use student data for targeted advertising</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">We will NOT create student profiles for non-educational purposes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">We will collect only the minimum data necessary to provide the service</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">We will maintain comprehensive security standards to protect student data</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">We will be transparent about our data collection and use practices</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">We will delete student data upon request or when no longer needed</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">We will not change our privacy practices without advance notice</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="pt-6">
                  <p className="font-semibold mb-2">Ohio Law Compliance:</p>
                  <p className="text-muted-foreground mb-2 text-sm">As an Ohio-based company, we fully comply with:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                    <li><strong>Ohio Senate Bill 29 (SB 29)</strong> - Student Data Privacy Requirements (100% compliant)</li>
                    <li><strong>Ohio Revised Code § 3319.321</strong> - Student Data Privacy</li>
                    <li><strong>Ohio Revised Code § 3301.0714</strong> - Data Security Requirements</li>
                    <li><strong>Ohio Administrative Code 3301-14</strong> - Data Governance</li>
                  </ul>
                  <p className="mt-3 text-sm">
                    <a href="#sb29" className="text-primary hover:underline font-semibold">View detailed SB 29 compliance information →</a>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="font-semibold mb-2">Federal & Other State Laws:</p>
                  <p className="text-muted-foreground mb-2 text-sm">We also comply with:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                    <li>FERPA (Family Educational Rights and Privacy Act)</li>
                    <li>COPPA (Children's Online Privacy Protection Act)</li>
                    <li>California AB 1584 (SOPIPA)</li>
                    <li>New York Education Law § 2-d</li>
                    <li>Other applicable state student privacy laws</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="font-semibold mb-2">File a complaint:</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>U.S. Department of Education</p>
                    <p>Family Policy Compliance Office</p>
                    <p>400 Maryland Avenue, SW</p>
                    <p>Washington, DC 20202-5920</p>
                    <p className="mt-2">Website: studentprivacy.ed.gov</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section: Contact Us */}
          <section id="contact" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="font-semibold mb-1">Privacy Questions:</p>
                  <a href="mailto:privacy@languagebridge.app" className="text-primary hover:underline flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    privacy@languagebridge.app (2 business day response)
                  </a>
                </div>
                <div>
                  <p className="font-semibold mb-1">General:</p>
                  <a href="mailto:info@languagebridge.app" className="text-primary hover:underline flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    info@languagebridge.app
                  </a>
                </div>
                <div>
                  <p className="font-semibold mb-1">Support:</p>
                  <a href="mailto:support@languagebridge.app" className="text-primary hover:underline flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    support@languagebridge.app
                  </a>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold mb-2">Data Protection Officer:</p>
                  <p className="text-muted-foreground">Justin Bernard</p>
                  <a href="mailto:privacy@languagebridge.app" className="text-primary hover:underline">privacy@languagebridge.app</a>
                </div>
                <div>
                  <p className="font-semibold mb-2">Company:</p>
                  <div className="text-muted-foreground text-sm space-y-1">
                    <p>LanguageBridge, LLC</p>
                    <p>Northeast Ohio</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section: Plain English Summary */}
          <section id="summary" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Plain English Summary</h2>
            
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <CardContent className="pt-6 space-y-4">
                <p className="font-semibold text-lg">What happens when I use LanguageBridge:</p>
                
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>You highlight text</li>
                  <li>It gets translated by Microsoft</li>
                  <li>You hear/see the translation</li>
                  <li>Everything is deleted</li>
                </ol>

                <div className="border-t border-border pt-4">
                  <p className="font-semibold mb-2">We don't:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Know who you are</li>
                    <li>Save what you translate</li>
                    <li>Track where you go online</li>
                    <li>Sell any information</li>
                  </ul>
                </div>

                <p className="text-sm pt-4 border-t border-border"><strong>Questions?</strong> Email privacy@languagebridge.app</p>
              </CardContent>
            </Card>

            <div className="mt-6 text-center text-sm text-muted-foreground italic">
              This policy covers the LanguageBridge Chrome extension and all related services.
            </div>
          </section>

          {/* Copyright Notice */}
          <div className="text-center py-8 border-t border-border mt-12">
            <p className="text-sm text-muted-foreground">
              © 2025 LanguageBridge, LLC. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Contact Button */}
      <a
        href="mailto:privacy@languagebridge.app"
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-110 z-50"
        aria-label="Email privacy team"
      >
        <Mail className="w-6 h-6" />
      </a>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 rounded-full p-4 shadow-lg z-50"
          variant="secondary"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}