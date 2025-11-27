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
    { id: "introduction", title: "Introduction" },
    { id: "collection", title: "1. Information We Collect" },
    { id: "third-party", title: "2. Third-Party Services" },
    { id: "usage", title: "3. How We Use Data" },
    { id: "sharing", title: "4. Data Sharing and Disclosure" },
    { id: "coppa", title: "5. Children's Privacy (COPPA)" },
    { id: "ferpa", title: "6. FERPA Compliance" },
    { id: "security", title: "7. Data Security" },
    { id: "rights", title: "8. User Rights and Controls" },
    { id: "changes", title: "9. Changes to This Policy" },
    { id: "international", title: "10. International Users" },
    { id: "contact", title: "11. Contact Information" },
    { id: "compliance", title: "12. Compliance Certifications" },
    { id: "faq", title: "13. Frequently Asked Questions" },
    { id: "summary", title: "14. Summary" },
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
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Privacy Policy for LanguageBridge Chrome Extension</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-white/80">
            <p><strong>Effective Date:</strong> November 15, 2024</p>
            <span className="hidden md:inline">•</span>
            <p><strong>Last Updated:</strong> November 15, 2024</p>
          </div>
        </div>
      </header>

      <div ref={contentRef} className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Key Points Card */}
          <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6" id="introduction">Introduction</h2>
              <p className="text-muted-foreground mb-6">
                LanguageBridge is committed to protecting the privacy of students, teachers, and all users of our Chrome extension. This privacy policy explains what data we collect, how we use it, and your rights regarding your information.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>We do NOT store any student data</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>We do NOT collect personally identifiable information (PII)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Voice recordings are processed in real-time and immediately discarded</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>We are FERPA and COPPA compliant</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>No ads, no tracking, no data sales</span>
                </div>
              </div>
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

          {/* Section 1: Information We Collect */}
          <section id="collection" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">1. Information We Collect</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4">1.1 Data We DO Collect (Stored Locally Only)</h3>
                
                <Card className="mb-4">
                  <CardContent className="pt-6">
                    <h4 className="font-bold mb-3">User Preferences (Stored in Chrome Sync Storage)</h4>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                      <li>Selected language preference (e.g., Dari, Pashto, Arabic)</li>
                      <li>Reading speed settings</li>
                      <li>Extension settings and customizations</li>
                    </ul>
                    <div className="space-y-2 text-sm">
                      <p><strong>Storage Location:</strong> Chrome browser's sync storage (controlled by Google)</p>
                      <p><strong>Purpose:</strong> Remember your preferences across devices</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-bold mb-3">Anonymous Usage Statistics (Stored Locally)</h4>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                      <li>Number of translations performed</li>
                      <li>Extension usage timestamps</li>
                      <li>Feature usage counts (e.g., how many times toolbar was used)</li>
                    </ul>
                    <div className="space-y-2 text-sm">
                      <p><strong>Storage Location:</strong> Local browser storage only</p>
                      <p><strong>Purpose:</strong> Improve extension performance and features</p>
                      <p><strong>Note:</strong> This data never leaves your device</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">1.2 Data We DO NOT Collect</h3>
                <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
                  <CardContent className="pt-6">
                    <p className="font-semibold mb-4">We explicitly <strong>DO NOT</strong> collect or store:</p>
                    <div className="grid md:grid-cols-2 gap-2">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Student names or PII</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Text content that you translate</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Voice recordings or audio data</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Browsing history</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Email addresses or login credentials</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>School or classroom information</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Geolocation data</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Student identifying data</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Section 2: Third-Party Services */}
          <section id="third-party" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">2. Third-Party Services</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4">2.1 Microsoft Azure Cognitive Services</h3>
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <p className="font-semibold">LanguageBridge uses Microsoft Azure for:</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li><strong>Speech-to-Text:</strong> Converting voice to text for conversations</li>
                      <li><strong>Text-to-Speech:</strong> Reading translations aloud</li>
                      <li><strong>Translation:</strong> Translating text between languages</li>
                      <li><strong>Text Simplification:</strong> Simplifying academic text (Azure OpenAI)</li>
                    </ul>

                    <div className="border-l-4 border-primary pl-4 my-6">
                      <p className="font-bold mb-2">How Azure Processes Data:</p>
                      <ul className="space-y-2 text-sm">
                        <li>✓ All data is processed <strong>in real-time</strong></li>
                        <li>✓ <strong>No data retention:</strong> Audio, text, and translations are NOT stored by Azure after processing</li>
                        <li>✓ <strong>Enterprise-grade security:</strong> Microsoft Azure is FERPA and COPPA compliant</li>
                        <li>✓ <strong>Encryption:</strong> All data transmitted to Azure is encrypted using TLS 1.2+</li>
                        <li>✓ <strong>Microsoft Privacy Policy:</strong> <a href="https://privacy.microsoft.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://privacy.microsoft.com/</a></li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Data Sent to Azure:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Selected text for translation (temporary, not stored)</li>
                        <li>Voice input for speech recognition (temporary, not stored)</li>
                        <li>Text for text-to-speech synthesis (temporary, not stored)</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Data NOT Sent to Azure:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Student names or identifying information</li>
                        <li>Full webpage content</li>
                        <li>Browsing history</li>
                        <li>Any data not explicitly selected by the user</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">2.2 Chrome Web Store</h3>
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Extension updates are delivered through Google Chrome Web Store</li>
                      <li>• Google's privacy policy applies: <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Section 3: How We Use Data */}
          <section id="usage" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">3. How We Use Data</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4">3.1 Real-Time Processing Only</h3>
                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                  <CardContent className="pt-6">
                    <p className="font-semibold mb-4">All translation and speech processing happens <strong>in real-time:</strong></p>
                    <ol className="space-y-3 list-decimal list-inside">
                      <li><strong>User selects text</strong> → Sent to Azure Translator → Translated → Displayed</li>
                      <li><strong>User speaks</strong> → Sent to Azure Speech → Transcribed → Displayed</li>
                      <li><strong>Translation spoken</strong> → Sent to Azure Speech Synthesis → Audio played</li>
                    </ol>
                    <p className="mt-4 font-bold">After processing: All data is immediately discarded. Nothing is saved.</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">3.2 Local Preferences</h3>
                <Card>
                  <CardContent className="pt-6">
                    <p className="mb-4">User settings (language, speed, etc.) are saved in Chrome's sync storage to:</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Remember your preferences</li>
                      <li>Provide a personalized experience</li>
                      <li>Sync settings across your Chrome browsers (if Chrome Sync is enabled)</li>
                    </ul>
                    <p className="mt-4 text-sm font-semibold">You control this data: You can clear it anytime through Chrome settings or by uninstalling the extension.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
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

          {/* Section 9: Changes to Policy */}
          <section id="changes" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">9. Changes to This Privacy Policy</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p>We may update this privacy policy to reflect:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Changes in legal requirements</li>
                  <li>New features added to the extension</li>
                  <li>Improved privacy practices</li>
                </ul>

                <div>
                  <p className="font-semibold mb-2">Notification of Changes:</p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Updated privacy policy will be posted in the extension</li>
                    <li>Effective date will be updated at the top</li>
                    <li>Major changes will be announced via extension update notes</li>
                  </ul>
                </div>

                <p className="text-sm"><strong>Your Continued Use:</strong> Continuing to use LanguageBridge after changes constitutes acceptance. If you disagree with changes, you may uninstall the extension.</p>
              </CardContent>
            </Card>
          </section>

          {/* Section 10: International Users */}
          <section id="international" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">10. International Users</h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">10.1 Data Location</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Azure services process data in Microsoft's East US data center</li>
                    <li>• Data is processed in real-time and not stored</li>
                    <li>• No cross-border data transfers occur (data is not stored)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">10.2 GDPR (European Users)</h3>
                  <p className="mb-3">For users in the European Union:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>Legal Basis:</strong> Legitimate interest in providing translation services</li>
                    <li><strong>Data Controller:</strong> Individual school districts (for school deployments)</li>
                    <li><strong>Data Processor:</strong> Microsoft Azure</li>
                    <li><strong>Data Subject Rights:</strong> Since no data is stored, rights to access, rectify, or erase do not apply</li>
                    <li><strong>Right to Object:</strong> You may uninstall the extension at any time</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 11: Contact Information */}
          <section id="contact" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">11. Contact Information</h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">For Privacy Questions</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold">General Privacy Inquiries:</p>
                      <a href="mailto:privacy@languagebridge.app" className="text-primary hover:underline flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        privacy@languagebridge.app
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold">General Contact:</p>
                      <a href="mailto:contact@languagebridge.app" className="text-primary hover:underline flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        contact@languagebridge.app
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold">School/District Privacy Officers:</p>
                      <p className="text-sm text-muted-foreground">If your school has specific privacy concerns, please contact your IT administrator or email us at contact@languagebridge.app</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">For Support and General Information</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold mb-1">Technical Support:</p>
                      <a href="mailto:support@languagebridge.app" className="text-primary hover:underline">support@languagebridge.app</a>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">General Inquiries:</p>
                      <a href="mailto:contact@languagebridge.app" className="text-primary hover:underline">contact@languagebridge.app</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 12: Compliance Certifications */}
          <section id="compliance" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">12. Compliance Certifications</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p className="font-semibold">LanguageBridge is committed to compliance with:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div><strong>FERPA</strong> (Family Educational Rights and Privacy Act)</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div><strong>COPPA</strong> (Children's Online Privacy Protection Act)</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div><strong>GDPR</strong> (General Data Protection Regulation) - for EU users</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div><strong>California Student Privacy</strong> (AB 1584)</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div><strong>Microsoft Azure Compliance</strong> (FERPA, COPPA, GDPR, SOC 2, ISO 27001)</div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold">Third-Party Certifications:</p>
                  <a href="https://azure.microsoft.com/en-us/overview/trusted-cloud/compliance/" className="text-primary hover:underline text-sm" target="_blank" rel="noopener noreferrer">Microsoft Azure Compliance: https://azure.microsoft.com/en-us/overview/trusted-cloud/compliance/</a>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 13: FAQ */}
          <section id="faq" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">13. Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="font-bold mb-2">Q: Can teachers see what students translate?</p>
                  <p className="text-muted-foreground">A: No. All translations happen locally in the student's browser. Nothing is stored or transmitted to teachers.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="font-bold mb-2">Q: Are voice recordings saved?</p>
                  <p className="text-muted-foreground">A: No. Voice is converted to text in real-time by Azure and immediately discarded. No recordings are saved.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="font-bold mb-2">Q: Can my school administrator see my usage?</p>
                  <p className="text-muted-foreground">A: No. The extension does not report usage data to anyone. Only local, anonymous statistics are kept on your device.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="font-bold mb-2">Q: Is my translated text stored anywhere?</p>
                  <p className="text-muted-foreground">A: No. Text is processed in real-time and discarded immediately after translation.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="font-bold mb-2">Q: What happens if I uninstall the extension?</p>
                  <p className="text-muted-foreground">A: All locally stored settings and preferences are deleted. Since we don't have any servers or accounts, nothing remains.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="font-bold mb-2">Q: Do you use cookies or tracking?</p>
                  <p className="text-muted-foreground">A: No. We do not use cookies, tracking pixels, or any analytics that identify you.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="font-bold mb-2">Q: Is the extension safe for students under 13?</p>
                  <p className="text-muted-foreground">A: Yes. We comply with COPPA and do not collect any personal information from children.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 14: Summary */}
          <section id="summary" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">14. Privacy Policy Acknowledgment & Summary</h2>
            
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <CardContent className="pt-6 space-y-4">
                <p className="font-semibold">By installing and using LanguageBridge, you acknowledge that you have read and understood this privacy policy.</p>
                
                <div className="border-t border-border pt-4 space-y-3">
                  <div>
                    <p className="font-bold">What we collect:</p>
                    <p className="text-sm text-muted-foreground">Almost nothing. Just your language preference stored locally.</p>
                  </div>
                  
                  <div>
                    <p className="font-bold">What we don't collect:</p>
                    <p className="text-sm text-muted-foreground">Everything else. No names, no text content, no voice recordings, no browsing history.</p>
                  </div>
                  
                  <div>
                    <p className="font-bold">What happens to your data:</p>
                    <p className="text-sm text-muted-foreground">Translations are processed in real-time and immediately discarded. Nothing is saved.</p>
                  </div>
                  
                  <div>
                    <p className="font-bold">Your rights:</p>
                    <p className="text-sm text-muted-foreground">You can delete all data by uninstalling the extension. No accounts, no servers, no databases.</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-center">For School Administrators:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                    <li>• Ensure this privacy policy aligns with your district's data privacy requirements</li>
                    <li>• Review Microsoft Azure's privacy practices: <a href="https://privacy.microsoft.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://privacy.microsoft.com/</a></li>
                    <li>• Consult your legal counsel if needed for FERPA/COPPA compliance verification</li>
                    <li>• Contact us at <a href="mailto:contact@languagebridge.app" className="text-primary hover:underline">contact@languagebridge.app</a> with any questions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Final Statement */}
          <div className="text-center py-12 border-t border-border">
            <p className="text-2xl font-bold mb-2">LanguageBridge - Privacy-First Translation for Students</p>
            <p className="text-muted-foreground">Made with ❤️ for English Language Learners</p>
            <p className="text-sm mt-4">
              For questions, contact us at{" "}
              <a href="mailto:contact@languagebridge.app" className="text-primary hover:underline font-semibold">
                contact@languagebridge.app
              </a>
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