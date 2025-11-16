import { Link } from "react-router-dom";
import { Mail, Download, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

export default function Privacy() {
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  const sections = [
    { id: "overview", title: "1. Overview" },
    { id: "ferpa", title: "2. FERPA Compliance Statement" },
    { id: "collection", title: "3. Information We Collect" },
    { id: "usage", title: "4. How We Use Information" },
    { id: "sharing", title: "5. Data Sharing and Third Parties" },
    { id: "security", title: "6. Data Security" },
    { id: "retention", title: "7. Data Retention and Deletion" },
    { id: "rights", title: "8. Student Rights Under FERPA" },
    { id: "coppa", title: "9. Children's Privacy (COPPA Compliance)" },
    { id: "international", title: "10. International Data Transfers" },
    { id: "school", title: "11. School Responsibilities" },
    { id: "changes", title: "12. Changes to This Privacy Policy" },
    { id: "contact", title: "13. Contact Us" },
    { id: "legal", title: "14. Legal Compliance" },
    { id: "transparency", title: "15. Transparency Commitments" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground text-background py-8 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-primary hover:text-primary/80 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">LanguageBridge Privacy Policy</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-background/80">
            <p>Effective Date: November 16, 2024</p>
            <span className="hidden md:inline">•</span>
            <p>Last Updated: November 16, 2024</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Commitment Statement */}
          <Card className="mb-8 border-primary/20">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Our Commitment to Student Privacy</h2>
              <p className="text-muted-foreground mb-4">
                LanguageBridge is committed to protecting the privacy and security of students, educators, and schools. This Privacy Policy explains how we collect, use, protect, and handle information in connection with our Chrome extension and related services.
              </p>
              <p className="text-sm">
                For privacy-related questions, contact us at:{" "}
                <a href="mailto:privacy@languagebridge.app" className="text-primary hover:underline font-semibold">
                  privacy@languagebridge.app
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Download PDF Button */}
          <div className="mb-8 flex justify-end">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>

          {/* Table of Contents */}
          <Card className="mb-12">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
              <nav className="grid md:grid-cols-2 gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-primary hover:underline py-1"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none space-y-12">
            {/* Section 1 */}
            <section id="overview">
              <h2 className="text-3xl font-bold mb-4">1. Overview</h2>
              <p className="mb-4">
                LanguageBridge is a Chrome extension that provides real-time translation and text-to-speech services for K-12 students, with a specific focus on preliterate Students with Limited or Interrupted Formal Education (SLIFE). Our service is designed to comply with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>FERPA (Family Educational Rights and Privacy Act)</li>
                <li>COPPA (Children's Online Privacy Protection Act)</li>
                <li>PPRA (Protection of Pupil Rights Amendment)</li>
                <li>State student privacy laws</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section id="ferpa">
              <h2 className="text-3xl font-bold mb-4">2. FERPA Compliance Statement</h2>
              <p className="mb-4">
                LanguageBridge is designed to be FERPA-compliant when used in educational settings:
              </p>
              
              <h3 className="text-2xl font-semibold mb-3">What We DO:</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>Process translations locally in the Chrome extension whenever possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>Use secure, encrypted connections for all data transmission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>Work as a "school official" under FERPA when contracted by schools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>Limit data collection to only what's necessary for service functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>Provide schools with full control over student data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>Sign Data Privacy Agreements (DPAs) with school districts</span>
                </li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3">What We DON'T Do:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold text-xl">✗</span>
                  <span>We do NOT create student profiles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold text-xl">✗</span>
                  <span>We do NOT track student browsing history</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold text-xl">✗</span>
                  <span>We do NOT collect personally identifiable information (PII) from students</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold text-xl">✗</span>
                  <span>We do NOT sell student data to third parties</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold text-xl">✗</span>
                  <span>We do NOT use student data for advertising or marketing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold text-xl">✗</span>
                  <span>We do NOT retain translated text after processing</span>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="collection">
              <h2 className="text-3xl font-bold mb-4">3. Information We Collect</h2>
              
              <h3 className="text-2xl font-semibold mb-3">A. From Students (Minimal Collection)</h3>
              <div className="mb-4">
                <h4 className="text-xl font-semibold mb-2">Text Selected for Translation:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>When a student selects text to translate, that text is temporarily sent to Azure Cognitive Services for translation</li>
                  <li>This text is NOT stored by LanguageBridge</li>
                  <li>This text is NOT associated with any student identifier</li>
                  <li>Text is processed and immediately discarded</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-2">No Personal Information Collected:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>We do NOT collect student names</li>
                  <li>We do NOT collect student email addresses</li>
                  <li>We do NOT collect student ID numbers</li>
                  <li>We do NOT collect grades or performance data</li>
                  <li>We do NOT collect browsing history</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold mb-3">B. From Schools/Districts (Administrative Data)</h3>
              <p className="mb-2">When schools contract with LanguageBridge, we collect:</p>
              <ul className="list-disc pl-6 space-y-1 mb-6">
                <li>School/district name</li>
                <li>Administrator contact information</li>
                <li>Number of licenses purchased</li>
                <li>Installation/deployment date</li>
                <li>Aggregate usage statistics (non-identifiable)</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3">C. Technical Data (Non-Personal)</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Browser type and version (for compatibility)</li>
                <li>Extension version number</li>
                <li>Language pairs being translated (aggregated, not per-student)</li>
                <li>Error logs (contain no PII)</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="usage">
              <h2 className="text-3xl font-bold mb-4">4. How We Use Information</h2>
              
              <h3 className="text-2xl font-semibold mb-3">Translation Processing:</h3>
              <ul className="list-disc pl-6 space-y-1 mb-6">
                <li>Selected text is sent via HTTPS to Azure Cognitive Services (Microsoft) for translation</li>
                <li>Microsoft processes the translation and returns results</li>
                <li>No text is stored by LanguageBridge or retained by Azure beyond processing time</li>
                <li>See Microsoft's privacy policy: <a href="https://privacy.microsoft.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://privacy.microsoft.com/</a></li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3">Service Improvement:</h3>
              <ul className="list-disc pl-6 space-y-1 mb-6">
                <li>Aggregate usage statistics (e.g., "Dari was the most-used language this month") help us improve the service</li>
                <li>These statistics contain NO personally identifiable information</li>
                <li>Schools can opt out of anonymized usage reporting</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3">Compliance Reporting:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>We provide schools with usage reports for Title III compliance documentation</li>
                <li>Reports show aggregate data only (e.g., "150 students used the tool this week")</li>
                <li>Reports contain NO individual student identifiers</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="sharing">
              <h2 className="text-3xl font-bold mb-4">5. Data Sharing and Third Parties</h2>
              
              <h3 className="text-2xl font-semibold mb-3">Third-Party Services We Use:</h3>
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-2">Microsoft Azure Cognitive Services (Translation & Speech):</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Used for:</strong> Real-time translation and text-to-speech processing</li>
                  <li><strong>Data sent:</strong> Selected text only (no student identifiers)</li>
                  <li><strong>Data retention:</strong> Text is not stored; processed and immediately discarded</li>
                  <li><strong>Privacy policy:</strong> <a href="https://privacy.microsoft.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://privacy.microsoft.com/</a></li>
                  <li><strong>FERPA compliance:</strong> Microsoft is compliant when used in educational contexts</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold mb-3">We Do NOT Use:</h3>
              <ul className="list-disc pl-6 space-y-1 mb-6">
                <li>Google Analytics or tracking pixels</li>
                <li>Advertising networks</li>
                <li>Data brokers</li>
                <li>Social media integrations</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3">Data Sharing Policy:</h3>
              <p className="mb-2">We do NOT sell, rent, or share student data with third parties for:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Advertising</li>
                <li>Marketing</li>
                <li>Behavioral targeting</li>
                <li>Any commercial purpose</li>
              </ul>

              <p className="mb-2">We MAY share aggregated, non-identifiable data for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Educational research (with school permission)</li>
                <li>Service improvement analysis</li>
                <li>Compliance with legal obligations</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="security">
              <h2 className="text-3xl font-bold mb-4">6. Data Security</h2>
              
              <h3 className="text-2xl font-semibold mb-3">Security Measures:</h3>
              
              <h4 className="text-xl font-semibold mb-2">Encryption:</h4>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>All data transmitted between the extension and Azure is encrypted using HTTPS/TLS</li>
                <li>Data is encrypted in transit and at rest on Azure servers (during processing only)</li>
              </ul>

              <h4 className="text-xl font-semibold mb-2">Access Controls:</h4>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Only authorized LanguageBridge personnel have access to administrative systems</li>
                <li>Multi-factor authentication required for all admin accounts</li>
                <li>Role-based access controls limit data exposure</li>
              </ul>

              <h4 className="text-xl font-semibold mb-2">Infrastructure:</h4>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Hosted on Microsoft Azure (SOC 2 Type II certified)</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Automated security updates</li>
              </ul>

              <h4 className="text-xl font-semibold mb-2">No Data Breaches:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Because we don't store student data, there is minimal risk of data breach</li>
                <li>In the unlikely event of a security incident, we will notify affected schools within 72 hours</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="retention">
              <h2 className="text-3xl font-bold mb-4">7. Data Retention and Deletion</h2>
              
              <h3 className="text-2xl font-semibold mb-3">What We DON'T Retain:</h3>
              <ul className="list-disc pl-6 space-y-1 mb-6">
                <li><strong>Translated text:</strong> Immediately discarded after processing</li>
                <li><strong>Student identifiers:</strong> Never collected</li>
                <li><strong>Browsing history:</strong> Never tracked</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3">What We DO Retain:</h3>
              <ul className="list-disc pl-6 space-y-1 mb-6">
                <li><strong>Aggregated usage statistics:</strong> Retained for 2 years for compliance reporting</li>
                <li><strong>School contract information:</strong> Retained for duration of contract + 7 years (legal requirement)</li>
                <li><strong>Technical logs:</strong> Retained for 90 days for troubleshooting (contain no PII)</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3">Data Deletion Rights:</h3>
              <h4 className="text-xl font-semibold mb-2">For Schools:</h4>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Schools may request deletion of all associated data at any time</li>
                <li>Upon contract termination, all school data is deleted within 30 days</li>
                <li>Schools receive confirmation of deletion</li>
              </ul>

              <h4 className="text-xl font-semibold mb-2">For Students:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Because we don't collect or store student data, there is no student data to delete</li>
                <li>If a school believes student data was inadvertently collected, contact <a href="mailto:privacy@languagebridge.app" className="text-primary hover:underline">privacy@languagebridge.app</a></li>
              </ul>
            </section>

            {/* Section 8 */}
            <section id="rights">
              <h2 className="text-3xl font-bold mb-4">8. Student Rights Under FERPA</h2>
              <p className="mb-4">
                Schools using LanguageBridge maintain full control over student education records. Students and parents have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Inspect and review student education records</li>
                <li>Request amendment of records believed to be inaccurate</li>
                <li>Consent to disclosures of personally identifiable information (with exceptions under FERPA)</li>
                <li>File a complaint with the U.S. Department of Education</li>
              </ul>
              <p>
                LanguageBridge does not create or maintain student education records. Our service processes text for translation only and does not store educational information.
              </p>
            </section>

            {/* Section 9 */}
            <section id="coppa">
              <h2 className="text-3xl font-bold mb-4">9. Children's Privacy (COPPA Compliance)</h2>
              <p className="mb-4">
                LanguageBridge is designed for use by students under 13 in school settings. Under COPPA:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Schools act as the parent's agent in providing consent for data collection</li>
                <li>We collect minimal information necessary for service functionality</li>
                <li>We do not condition use of the service on providing more information than necessary</li>
                <li>We do not enable public posting or sharing of student information</li>
              </ul>
              <p>
                <strong>For parents:</strong> If you have questions about your child's use of LanguageBridge, contact your school's ESL coordinator or email us at <a href="mailto:privacy@languagebridge.app" className="text-primary hover:underline">privacy@languagebridge.app</a>.
              </p>
            </section>

            {/* Section 10 */}
            <section id="international">
              <h2 className="text-3xl font-bold mb-4">10. International Data Transfers</h2>
              <p className="mb-4">
                LanguageBridge is based in the United States (Ohio). When students in other countries use our service:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Text selected for translation may be processed on Azure servers in various regions</li>
                <li>Azure complies with international data protection frameworks</li>
                <li>Schools outside the U.S. should review their local data protection laws</li>
              </ul>
              <p>
                <strong>For EU/UK schools:</strong> We can provide additional GDPR-compliant Data Processing Agreements upon request.
              </p>
            </section>

            {/* Section 11 */}
            <section id="school">
              <h2 className="text-3xl font-bold mb-4">11. School Responsibilities</h2>
              <p className="mb-4">Schools using LanguageBridge are responsible for:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Obtaining necessary parental consents under FERPA/COPPA</li>
                <li>Providing notice to parents about the use of LanguageBridge</li>
                <li>Ensuring compliance with applicable state and local student privacy laws</li>
                <li>Training students on appropriate use of the extension</li>
                <li>Monitoring student use in accordance with school policies</li>
              </ul>
              <p>
                LanguageBridge provides template parent notification letters and consent forms upon request.
              </p>
            </section>

            {/* Section 12 */}
            <section id="changes">
              <h2 className="text-3xl font-bold mb-4">12. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time to reflect:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-6">
                <li>Changes in our data practices</li>
                <li>Changes in applicable laws</li>
                <li>New features or services</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3">How We Notify You:</h3>
              <ul className="list-disc pl-6 space-y-1 mb-6">
                <li>Schools will receive email notification at least 30 days before changes take effect</li>
                <li>Updated policy will be posted at languagebridge.app/privacy</li>
                <li>Effective date will be updated at the top of this document</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3">Your Rights:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Continued use of the service after changes constitute acceptance</li>
                <li>Schools may terminate service if they disagree with updated terms</li>
                <li>Schools will have opportunity to review changes before they take effect</li>
              </ul>
            </section>

            {/* Section 13 */}
            <section id="contact">
              <h2 className="text-3xl font-bold mb-4">13. Contact Us</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Privacy Questions:</h3>
                  <p>Email: <a href="mailto:privacy@languagebridge.app" className="text-primary hover:underline font-semibold">privacy@languagebridge.app</a></p>
                  <p>Response time: Within 2 business days</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">General Inquiries:</h3>
                  <p>Email: <a href="mailto:info@languagebridge.app" className="text-primary hover:underline font-semibold">info@languagebridge.app</a></p>
                  <p>Website: <a href="https://languagebridge.app" className="text-primary hover:underline">languagebridge.app</a></p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Support:</h3>
                  <p>Email: <a href="mailto:support@languagebridge.app" className="text-primary hover:underline font-semibold">support@languagebridge.app</a></p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Mailing Address:</h3>
                  <p>LanguageBridge</p>
                  <p className="text-muted-foreground italic">[Business Address - To Be Added]</p>
                  <p className="text-muted-foreground italic">[City, State ZIP]</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Data Protection Officer:</h3>
                  <p>Justin [Last Name]</p>
                  <p>Email: <a href="mailto:privacy@languagebridge.app" className="text-primary hover:underline font-semibold">privacy@languagebridge.app</a></p>
                </div>
              </div>
            </section>

            {/* Section 14 */}
            <section id="legal">
              <h2 className="text-3xl font-bold mb-4">14. Legal Compliance</h2>
              
              <h3 className="text-2xl font-semibold mb-3">FERPA Compliance:</h3>
              <p className="mb-6">
                LanguageBridge acts as a "school official" with "legitimate educational interest" when contracted by schools, as defined under 34 CFR § 99.31(a)(1).
              </p>

              <h3 className="text-2xl font-semibold mb-3">Student Privacy Pledge:</h3>
              <p className="mb-6">
                LanguageBridge is a signatory to the Student Privacy Pledge (studentprivacypledge.org), committing to responsible stewardship of student data.
              </p>

              <h3 className="text-2xl font-semibold mb-3">State Privacy Laws:</h3>
              <p className="mb-2">We comply with state-specific student privacy laws including:</p>
              <ul className="list-disc pl-6 space-y-1 mb-6">
                <li>California AB 1584 (SOPIPA)</li>
                <li>New York Education Law § 2-d</li>
                <li>Other applicable state laws</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3">Complaints:</h3>
              <p className="mb-2">
                If you believe your student privacy rights have been violated, you may file a complaint with:
              </p>
              <div className="pl-4">
                <p>U.S. Department of Education</p>
                <p>Family Policy Compliance Office</p>
                <p>400 Maryland Avenue, SW</p>
                <p>Washington, DC 20202-5920</p>
                <p>Website: <a href="https://studentprivacy.ed.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">studentprivacy.ed.gov</a></p>
              </div>
            </section>

            {/* Section 15 */}
            <section id="transparency">
              <h2 className="text-3xl font-bold mb-4">15. Transparency Commitments</h2>
              <p className="mb-4">LanguageBridge commits to:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span><strong>Transparency:</strong> Clear communication about data practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span><strong>Security:</strong> Industry-standard security measures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span><strong>Accountability:</strong> Quick response to privacy concerns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span><strong>Compliance:</strong> Adherence to all applicable privacy laws</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span><strong>Parental Rights:</strong> Support for parental access and consent</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span><strong>Minimal Collection:</strong> Collect only what's necessary</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span><strong>No Misuse:</strong> Never use student data for non-educational purposes</span>
                </li>
              </ul>
            </section>

            {/* Appendix */}
            <section className="border-t pt-8">
              <h2 className="text-3xl font-bold mb-4">Appendix: Definitions</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="font-semibold">FERPA:</dt>
                  <dd className="text-muted-foreground">Family Educational Rights and Privacy Act - Federal law protecting student education records</dd>
                </div>
                <div>
                  <dt className="font-semibold">COPPA:</dt>
                  <dd className="text-muted-foreground">Children's Online Privacy Protection Act - Federal law regulating collection of information from children under 13</dd>
                </div>
                <div>
                  <dt className="font-semibold">PII:</dt>
                  <dd className="text-muted-foreground">Personally Identifiable Information - Information that can identify a specific individual</dd>
                </div>
                <div>
                  <dt className="font-semibold">SLIFE:</dt>
                  <dd className="text-muted-foreground">Students with Limited or Interrupted Formal Education</dd>
                </div>
                <div>
                  <dt className="font-semibold">DPA:</dt>
                  <dd className="text-muted-foreground">Data Privacy Agreement - Legal agreement between schools and vendors regarding data handling</dd>
                </div>
                <div>
                  <dt className="font-semibold">Education Record:</dt>
                  <dd className="text-muted-foreground">Records directly related to a student maintained by an educational institution</dd>
                </div>
              </dl>
            </section>

            {/* Final Contact Section */}
            <section className="border-t pt-8">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Questions? Contact Us</h3>
                  <p className="mb-2">
                    <strong>General Questions:</strong>{" "}
                    <a href="mailto:privacy@languagebridge.app" className="text-primary hover:underline font-semibold">
                      privacy@languagebridge.app
                    </a>
                  </p>
                  <p className="mb-4">
                    <strong>Report a Privacy Concern:</strong>{" "}
                    <a href="mailto:privacy@languagebridge.app" className="text-primary hover:underline font-semibold">
                      privacy@languagebridge.app
                    </a>{" "}
                    <span className="text-muted-foreground">(2 business day response time)</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    This Privacy Policy is effective as of November 16, 2024 and governs all uses of the LanguageBridge Chrome extension and related services.
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>

      {/* Sticky Contact Button */}
      <a
        href="mailto:privacy@languagebridge.app"
        className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 font-semibold"
      >
        <Mail className="w-5 h-5" />
        <span className="hidden md:inline">Privacy Questions? Email Us</span>
        <span className="md:hidden">Email Us</span>
      </a>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 bg-foreground text-background p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
