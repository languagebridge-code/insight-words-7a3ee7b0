import { useState, useEffect, useRef } from "react";
import { PageMeta } from "@/components/PageMeta";
import { Link } from "react-router-dom";
import { ArrowUp, Scale, Shield, AlertTriangle, FileText, Download, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "sonner";

export default function TermsOfService() {
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
      const element = contentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new jsPDF("p", "mm", "a4");
      let position = 0;

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("LanguageBridge-Terms-of-Service.pdf");
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "description", title: "2. Description of Service" },
    { id: "eligibility", title: "3. Eligibility" },
    { id: "licenses", title: "4. License Purchases" },
    { id: "permitted-use", title: "5. Permitted Use" },
    { id: "dashboard", title: "6. Teacher Dashboard" },
    { id: "intellectual-property", title: "7. Intellectual Property" },
    { id: "privacy", title: "8. Privacy & Data" },
    { id: "disclaimers", title: "9. Disclaimers" },
    { id: "liability", title: "10. Limitation of Liability" },
    { id: "indemnification", title: "11. Indemnification" },
    { id: "termination", title: "12. Termination" },
    { id: "modifications", title: "13. Modifications" },
    { id: "third-party", title: "14. Third-Party Services" },
    { id: "disputes", title: "15. Dispute Resolution" },
    { id: "general", title: "16. General Provisions" },
    { id: "contact", title: "17. Contact Information" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title="Terms of Service" description="LanguageBridge Terms of Service. Review our terms for using the Language Accessibility Screen Reader Chrome extension and platform." />
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
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Terms of Service</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-white/80">
            <p><strong>Effective Date:</strong> December 1, 2025</p>
            <span className="hidden md:inline">•</span>
            <p><strong>Last Updated:</strong> December 1, 2025</p>
          </div>
        </div>
      </header>

      <div ref={contentRef} className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction Card */}
          <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4 mb-4">
                <Scale className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-2">LanguageBridge.app</h2>
                  <p className="text-muted-foreground">
                    By accessing or using LanguageBridge.app ("the Platform," "the Service," "we," "us," or "our"), 
                    you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, 
                    do not use the Platform.
                  </p>
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

          {/* Section 1: Acceptance of Terms */}
          <section id="acceptance" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">1. Acceptance of Terms</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p>
                  By accessing or using LanguageBridge.app ("the Platform," "the Service," "we," "us," or "our"), 
                  you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, 
                  do not use the Platform.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 2: Description of Service */}
          <section id="description" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">2. Description of Service</h2>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <p className="text-muted-foreground">
                  <strong>LanguageBridge.app</strong> is a web-based platform that provides:
                </p>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">2.1 License Management</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Purchase and management of LanguageBridge software licenses</li>
                    <li>License options for individual teachers, schools, and districts</li>
                    <li>Subscription management and billing services</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">2.2 Information Portal</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Product information about LanguageBridge Chrome extension and applications</li>
                    <li>Documentation, tutorials, and support resources</li>
                    <li>Updates on features, releases, and educational best practices</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">2.3 Teacher Dashboard & Analytics</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Analytics dashboard for educators to monitor student engagement</li>
                    <li>Usage statistics and adoption rates</li>
                    <li>Language preferences and content interaction</li>
                    <li>Data visualization and reporting tools</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">2.4 Account Management</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>User account creation and profile management</li>
                    <li>Organization/district administration tools</li>
                    <li>License assignment and user provisioning</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 3: Eligibility */}
          <section id="eligibility" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">3. Eligibility and Account Registration</h2>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">3.1 Eligible Users</h3>
                  <p className="text-muted-foreground mb-2">The Platform is intended for:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Licensed educators and school administrators</li>
                    <li>School districts and educational institutions</li>
                    <li>Parents/guardians of students (as authorized by their school)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">3.2 Account Requirements</h3>
                  <p className="text-muted-foreground mb-2">To use the Platform, you must:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
                    <li>Provide accurate and complete registration information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Notify us immediately of any unauthorized access</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">3.3 Institutional Accounts</h3>
                  <p className="text-muted-foreground">
                    Schools and districts may create institutional accounts that allow designated administrators to 
                    manage licenses for teachers and staff, access aggregated analytics data, and configure 
                    organizational settings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 4: License Purchases */}
          <section id="licenses" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">4. License Purchases and Subscriptions</h2>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">4.1 License Types</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li><strong>Free Tier:</strong> Limited features for individual teachers</li>
                    <li><strong>Teacher License:</strong> Individual subscription for educators</li>
                    <li><strong>School License:</strong> Site-based licensing (minimum purchase requirements may apply)</li>
                    <li><strong>District License:</strong> Enterprise pricing based on student enrollment</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">4.2 Payment Terms</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>All fees are charged in U.S. Dollars unless otherwise specified</li>
                    <li>Payment is due at the time of purchase or subscription renewal</li>
                    <li>We accept major credit cards, purchase orders, and ACH transfers for institutional customers</li>
                    <li>Prices are subject to change with 30 days' notice</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">4.3 Subscription Renewals</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Subscriptions automatically renew unless cancelled prior to the renewal date</li>
                    <li>You will be charged at the then-current rate for your subscription tier</li>
                    <li>Cancellation takes effect at the end of the current billing period</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">4.4 Refund Policy</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li><strong>Free Trial:</strong> No refunds for free trials</li>
                    <li><strong>Monthly Subscriptions:</strong> Refunds may be issued within 7 days of initial purchase</li>
                    <li><strong>Annual Subscriptions:</strong> Pro-rated refunds may be issued within 30 days of initial purchase</li>
                    <li><strong>District Licenses:</strong> Refund terms are specified in the license agreement</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">4.5 Purchase Orders</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Schools and districts may submit purchase orders for approval</li>
                    <li>Payment terms of Net 30 days apply unless otherwise specified</li>
                    <li>Unpaid invoices may result in service suspension</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 5: Permitted Use */}
          <section id="permitted-use" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">5. Permitted Use</h2>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">5.1 Acceptable Use</h3>
                  <p className="text-muted-foreground mb-2">You may use the Platform to:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Purchase and manage LanguageBridge licenses</li>
                    <li>Access information about LanguageBridge products and services</li>
                    <li>View analytics related to your authorized students/teachers</li>
                    <li>Manage user accounts within your organization</li>
                  </ul>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="font-bold text-lg mb-2 text-destructive">5.2 Prohibited Use</h3>
                  <p className="text-muted-foreground mb-3">You may NOT:</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Share account credentials with unauthorized users</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Use the Platform for any illegal or unauthorized purpose</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Attempt to access data you are not authorized to view</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Scrape or data mine using automated tools</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Reverse engineer or decompile the Platform</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Interfere with or disrupt the Platform's operation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Upload malicious code or harmful content</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Impersonate another user or entity</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 6: Teacher Dashboard */}
          <section id="dashboard" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">6. Teacher Dashboard and Analytics</h2>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">6.1 Analytics Data</h3>
                  <p className="text-muted-foreground mb-2">The Teacher Dashboard provides analytics about:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Student usage of LanguageBridge tools (translation requests, TTS usage)</li>
                    <li>Language preferences and content interaction patterns</li>
                    <li>Engagement metrics and adoption rates</li>
                    <li>Communication effectiveness (for parent-teacher messaging features)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">6.2 Data Access and Permissions</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Teachers can only view analytics for students in their authorized classes</li>
                    <li>School/district administrators can view aggregated data for their institution</li>
                    <li>All analytics data is anonymized and aggregated where possible</li>
                    <li>Individual student data is protected in compliance with FERPA</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">6.3 Data Retention</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Analytics data is retained for the duration of your active subscription</li>
                    <li>Historical data may be retained for up to 2 years for reporting purposes</li>
                    <li>You may request data export or deletion in accordance with our Privacy Policy</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">6.4 Use of Analytics</h3>
                  <p className="text-muted-foreground mb-2">Analytics are provided for educational purposes to:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Improve teaching effectiveness and student support</li>
                    <li>Identify students who may need additional language assistance</li>
                    <li>Measure program effectiveness and ROI</li>
                    <li>Inform instructional decisions</li>
                  </ul>
                  <p className="text-sm mt-3 text-muted-foreground">
                    You may NOT use analytics data for discriminatory purposes, share individual student data 
                    with unauthorized parties, or use data in violation of student privacy laws.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 7: Intellectual Property */}
          <section id="intellectual-property" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">7. Intellectual Property</h2>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">7.1 Platform Ownership</h3>
                  <p className="text-muted-foreground">
                    LanguageBridge.app and all associated content, features, and functionality are owned by 
                    Language Bridge LLC and are protected by copyright, trademark, and other intellectual property laws.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">7.2 License to Use</h3>
                  <p className="text-muted-foreground">
                    Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to 
                    access and use the Platform for its intended purposes.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">7.3 User Content</h3>
                  <p className="text-muted-foreground">
                    You retain ownership of any content you upload to the Platform. By uploading content, 
                    you grant us a license to use, store, and process that content to provide the Service.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">7.4 Trademarks</h3>
                  <p className="text-muted-foreground">
                    LanguageBridge, the LanguageBridge logo, and related marks are trademarks of Language Bridge LLC. 
                    You may not use these marks without our prior written permission.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 8: Privacy */}
          <section id="privacy" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">8. Privacy and Data Protection</h2>
            <Card className="border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold mb-2">Your privacy is our priority.</p>
                    <p className="text-muted-foreground">
                      Our collection and use of personal information is governed by our Privacy Policy, 
                      which is incorporated into these Terms by reference.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <p className="font-semibold">Key Privacy Commitments:</p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>FERPA and COPPA compliance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Ohio student data privacy law compliance (ORC § 3319.321)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Student data is never sold or used for advertising</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Minimum data necessary collection policy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Industry-standard security measures</span>
                  </div>
                </div>

                <p className="pt-4">
                  <Link to="/privacy" className="text-primary hover:underline">Read our full Privacy Policy →</Link>
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 9: Disclaimers */}
          <section id="disclaimers" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">9. Disclaimers and Limitations of Liability</h2>
            <Card className="border-orange-200 dark:border-orange-900">
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <p className="font-bold">IMPORTANT - PLEASE READ CAREFULLY</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">9.1 Service Availability</h3>
                  <p className="text-muted-foreground text-sm">
                    THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE." We do not guarantee uninterrupted 
                    or error-free operation, that the Platform will meet all your requirements, the accuracy 
                    or reliability of translation services, or that defects will be corrected immediately.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">9.2 Translation Accuracy</h3>
                  <p className="text-muted-foreground text-sm">
                    While we strive for accurate translations, we cannot guarantee perfect accuracy. 
                    Machine translation may contain errors or cultural misunderstandings. 
                    Always verify critical information.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">9.3 Educational Outcomes</h3>
                  <p className="text-muted-foreground text-sm">
                    We do not guarantee specific educational outcomes or improvements in student performance. 
                    The Platform is a tool to support educators and should be used as part of a 
                    comprehensive instructional program.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 10: Limitation of Liability */}
          <section id="liability" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">10. Limitation of Liability</h2>
            <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
              <CardContent className="pt-6 space-y-4">
                <p className="font-bold text-sm uppercase text-red-600">Limitation of Liability</p>
                <p className="text-muted-foreground text-sm">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm ml-4">
                  <li>WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
                  <li>OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE SERVICE IN THE 12 MONTHS PRECEDING THE CLAIM</li>
                  <li>WE ARE NOT LIABLE FOR LOSS OF DATA, PROFITS, OR BUSINESS OPPORTUNITIES</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 11: Indemnification */}
          <section id="indemnification" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">11. Indemnification</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  You agree to indemnify and hold harmless Language Bridge LLC, its officers, directors, 
                  employees, and agents from any claims, damages, losses, or expenses (including legal fees) 
                  arising from:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-3 ml-4">
                  <li>Your violation of these Terms</li>
                  <li>Your use or misuse of the Platform</li>
                  <li>Your violation of any third-party rights</li>
                  <li>Your violation of applicable laws or regulations</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 12: Termination */}
          <section id="termination" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">12. Termination</h2>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">12.1 Termination by You</h3>
                  <p className="text-muted-foreground">You may terminate your account at any time by:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2 ml-4">
                    <li>Canceling your subscription through the Platform</li>
                    <li>Contacting customer support at support@languagebridge.app</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">12.2 Termination by Us</h3>
                  <p className="text-muted-foreground">We may suspend or terminate your access if:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2 ml-4">
                    <li>You violate these Terms</li>
                    <li>You engage in fraudulent or illegal activity</li>
                    <li>Your payment fails or your account is past due</li>
                    <li>We discontinue the Platform (with reasonable notice)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">12.3 Effect of Termination</h3>
                  <p className="text-muted-foreground">Upon termination:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2 ml-4">
                    <li>Your access to the Platform will cease</li>
                    <li>You will no longer be charged subscription fees (except for amounts already due)</li>
                    <li>We may delete your account data in accordance with our retention policies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 13: Modifications */}
          <section id="modifications" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">13. Modifications to Terms and Service</h2>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">13.1 Changes to Terms</h3>
                  <p className="text-muted-foreground">We may modify these Terms at any time by:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2 ml-4">
                    <li>Posting updated Terms on the Platform</li>
                    <li>Notifying you via email (for material changes)</li>
                    <li>Requiring acceptance of new Terms upon next login</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">13.2 Modifications to Service</h3>
                  <p className="text-muted-foreground">We reserve the right to:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2 ml-4">
                    <li>Modify, suspend, or discontinue any feature of the Platform</li>
                    <li>Change pricing with 30 days' notice</li>
                    <li>Add or remove functionality</li>
                    <li>Perform maintenance that may temporarily disrupt service</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 14: Third-Party Services */}
          <section id="third-party" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">14. Third-Party Services</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">14.1 Integration Partners</h3>
                  <p className="text-muted-foreground mb-2">The Platform may integrate with third-party services such as:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Google Classroom</li>
                    <li>Learning Management Systems (LMS)</li>
                    <li>Payment processors</li>
                    <li>Translation APIs</li>
                    <li>Speech recognition services</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">14.2 Third-Party Terms</h3>
                  <p className="text-muted-foreground">
                    Your use of third-party services is subject to their respective terms and privacy policies. 
                    We are not responsible for third-party services or their actions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 15: Dispute Resolution */}
          <section id="disputes" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">15. Dispute Resolution</h2>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">15.1 Governing Law</h3>
                  <p className="text-muted-foreground">
                    These Terms are governed by the laws of the State of Ohio, United States, 
                    without regard to conflict of law principles.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">15.2 Arbitration Agreement</h3>
                  <p className="text-muted-foreground">
                    Any dispute arising from these Terms shall be resolved through binding arbitration 
                    in accordance with the rules of the American Arbitration Association, except that 
                    you may bring claims in small claims court if they qualify, and either party may 
                    seek injunctive relief in court for intellectual property matters.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">15.3 Class Action Waiver</h3>
                  <p className="text-muted-foreground">
                    You agree to resolve disputes on an individual basis and waive the right to 
                    participate in class actions or class arbitrations.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">15.4 Venue</h3>
                  <p className="text-muted-foreground">
                    Any court proceedings (if applicable) shall be brought in the state or 
                    federal courts located in the State of Ohio.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 16: General Provisions */}
          <section id="general" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">16. General Provisions</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold mb-2">16.1 Entire Agreement</h3>
                    <p className="text-muted-foreground text-sm">
                      These Terms, together with our Privacy Policy, constitute the entire agreement 
                      between you and Language Bridge LLC regarding the Platform.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">16.2 Severability</h3>
                    <p className="text-muted-foreground text-sm">
                      If any provision of these Terms is found to be unenforceable, 
                      the remaining provisions will remain in full effect.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">16.3 Waiver</h3>
                    <p className="text-muted-foreground text-sm">
                      Our failure to enforce any provision does not constitute a 
                      waiver of that provision or any other provision.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">16.4 Assignment</h3>
                    <p className="text-muted-foreground text-sm">
                      You may not assign or transfer these Terms or your account. 
                      We may assign our rights and obligations without restriction.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">16.5 Force Majeure</h3>
                    <p className="text-muted-foreground text-sm">
                      We are not liable for delays or failures due to circumstances beyond our 
                      reasonable control (natural disasters, pandemics, government actions, etc.).
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">16.6 Export Control</h3>
                    <p className="text-muted-foreground text-sm">
                      You agree to comply with all applicable export control laws and regulations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 17: Contact */}
          <section id="contact" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">17. Contact Information</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  For questions about these Terms or the Platform, contact us at:
                </p>
                <div className="space-y-2">
                  <p><strong>Language Bridge LLC</strong></p>
                  <p>Email: <a href="mailto:support@languagebridge.app" className="text-primary hover:underline">support@languagebridge.app</a></p>
                  <p>Website: <a href="https://languagebridge.app" className="text-primary hover:underline">https://languagebridge.app</a></p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Acknowledgment */}
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
            <CardContent className="pt-6 text-center">
              <FileText className="w-8 h-8 text-primary mx-auto mb-4" />
              <p className="font-bold text-lg mb-2">ACKNOWLEDGMENT</p>
              <p className="text-muted-foreground">
                BY CLICKING "I AGREE," CREATING AN ACCOUNT, OR USING THE PLATFORM, YOU ACKNOWLEDGE THAT 
                YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE.
              </p>
            </CardContent>
          </Card>

          {/* Copyright Notice */}
          <div className="text-center py-8 border-t border-border mt-12">
            <p className="text-sm text-muted-foreground">
              © 2025 Language Bridge LLC. All rights reserved.
            </p>
          </div>
        </div>
      </div>

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
