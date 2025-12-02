import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Scale, Shield, AlertTriangle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsOfService() {
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
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "description", title: "2. Description of Service" },
    { id: "eligibility", title: "3. Eligibility" },
    { id: "user-responsibilities", title: "4. User Responsibilities" },
    { id: "acceptable-use", title: "5. Acceptable Use Policy" },
    { id: "intellectual-property", title: "6. Intellectual Property Rights" },
    { id: "user-content", title: "7. User Content" },
    { id: "privacy", title: "8. Privacy and Data Protection" },
    { id: "disclaimers", title: "9. Disclaimers and Warranties" },
    { id: "limitation-liability", title: "10. Limitation of Liability" },
    { id: "indemnification", title: "11. Indemnification" },
    { id: "school-districts", title: "12. School District Specific Terms" },
    { id: "modifications", title: "13. Modifications to Service" },
    { id: "termination", title: "14. Termination" },
    { id: "governing-law", title: "15. Governing Law" },
    { id: "contact", title: "16. Contact Information" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary via-primary/90 to-secondary text-white py-12 sticky top-0 z-40 shadow-lg backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-white/90 hover:text-white inline-block transition-colors mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Terms of Service</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-white/80">
            <p><strong>Effective Date:</strong> November 15, 2024</p>
            <span className="hidden md:inline">•</span>
            <p><strong>Last Updated:</strong> November 15, 2024</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction Card */}
          <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4 mb-4">
                <Scale className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome to LanguageBridge</h2>
                  <p className="text-muted-foreground">
                    Please read these Terms of Service carefully before using the LanguageBridge Chrome Extension. 
                    By installing, accessing, or using LanguageBridge, you agree to be bound by these terms.
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
                  These Terms of Service ("Terms") constitute a legally binding agreement between you and LanguageBridge 
                  ("we," "us," or "our") regarding your use of the LanguageBridge Chrome Extension and related services 
                  (collectively, the "Service").
                </p>
                <p>
                  <strong>By using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.</strong> 
                  If you do not agree to these Terms, you may not use the Service.
                </p>
                <p className="text-sm text-muted-foreground">
                  For school districts: A district administrator or authorized representative must accept these Terms 
                  on behalf of the district before deploying the Service to students and teachers.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 2: Description of Service */}
          <section id="description" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">2. Description of Service</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p>
                  LanguageBridge is a Chrome browser extension designed for educational use that provides:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Real-time text translation with audio support in multiple languages</li>
                  <li>Text simplification for academic content</li>
                  <li>Speech-to-text and text-to-speech capabilities</li>
                  <li>Teacher-student communication tools</li>
                  <li>Academic vocabulary glossary</li>
                </ul>
                <p>
                  The Service is intended to support English Language Learners (ELL) and Students with Limited or 
                  Interrupted Formal Education (SLIFE) in accessing educational content.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 3: Eligibility */}
          <section id="eligibility" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">3. Eligibility</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">3.1 Age Requirements</h3>
                  <p>
                    The Service is designed for use by students of all ages in educational settings. For users under 13 
                    years of age, the Service must be deployed by a school district or educational institution that has 
                    obtained appropriate parental consent or operates under FERPA authority.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">3.2 Educational Institution Use</h3>
                  <p>
                    School districts and educational institutions must ensure they have appropriate authority and consent 
                    to deploy the Service to their students and staff. Individual students may not use the Service without 
                    institutional authorization.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">3.3 Geographic Availability</h3>
                  <p>
                    The Service is available worldwide, subject to local laws and regulations. You are responsible for 
                    ensuring your use complies with applicable local, state, national, and international laws.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 4: User Responsibilities */}
          <section id="user-responsibilities" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">4. User Responsibilities</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p>As a user of the Service, you agree to:</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p><strong>Use the Service appropriately:</strong> Only for its intended educational purpose</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p><strong>Maintain security:</strong> Keep your device and browser secure</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p><strong>Respect others:</strong> Not use the Service to harass, abuse, or harm others</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p><strong>Comply with laws:</strong> Follow all applicable laws and regulations</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p><strong>Report issues:</strong> Notify us of any bugs, security vulnerabilities, or misuse</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p><strong>Verify translations:</strong> Understand that automated translations may contain errors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 5: Acceptable Use Policy */}
          <section id="acceptable-use" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">5. Acceptable Use Policy</h2>
            <Card className="border-orange-200 dark:border-orange-900">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <p className="font-bold">You may NOT use the Service to:</p>
                </div>
                <div className="space-y-3 ml-9">
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <p>Violate any applicable laws, regulations, or third-party rights</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <p>Transmit harmful, threatening, abusive, or offensive content</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <p>Attempt to gain unauthorized access to our systems or other users' data</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <p>Reverse engineer, decompile, or disassemble the Service</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <p>Use the Service for any commercial purpose without authorization</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <p>Interfere with or disrupt the Service or servers</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <p>Impersonate any person or entity</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <p>Collect or harvest information about other users</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <p>Use automated systems to access the Service without permission</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <p>Translate content for cheating, plagiarism, or academic dishonesty</p>
                  </div>
                </div>
                <p className="mt-6 text-sm font-bold">
                  Violation of this Acceptable Use Policy may result in immediate termination of your access to the Service 
                  and potential legal action.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 6: Intellectual Property Rights */}
          <section id="intellectual-property" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">6. Intellectual Property Rights</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">6.1 LanguageBridge Ownership</h3>
                  <p>
                    The Service, including all software, code, features, functionality, text, graphics, logos, and other 
                    materials (excluding user content), is owned by LanguageBridge and is protected by United States and 
                    international copyright, trademark, and other intellectual property laws.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">6.2 Limited License</h3>
                  <p>
                    Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, 
                    revocable license to access and use the Service solely for its intended educational purpose.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">6.3 Restrictions</h3>
                  <p>You may not:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Copy, modify, or create derivative works of the Service</li>
                    <li>Distribute, sell, lease, or sublicense the Service</li>
                    <li>Remove or alter any proprietary notices</li>
                    <li>Use the Service to develop competing products</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">6.4 Third-Party Services</h3>
                  <p>
                    The Service uses Microsoft Azure Cognitive Services for translation and speech processing. Microsoft's 
                    intellectual property rights and terms apply to those services.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">6.5 Trademarks</h3>
                  <p>
                    "LanguageBridge" and associated logos are trademarks of LanguageBridge. You may not use these marks 
                    without our prior written permission.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 7: User Content */}
          <section id="user-content" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">7. User Content</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">7.1 No Storage of Content</h3>
                  <p>
                    As described in our Privacy Policy, LanguageBridge does not store or retain any text you translate, 
                    voice recordings, or other content you process through the Service. All content is processed in 
                    real-time and immediately discarded.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">7.2 Content Responsibility</h3>
                  <p>
                    You are solely responsible for any content you translate or process using the Service. You represent 
                    and warrant that you have the right to translate and process such content and that doing so does not 
                    violate any laws or third-party rights.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">7.3 Copyright Compliance</h3>
                  <p>
                    While the Service allows translation of any text you select, you must ensure that your use complies 
                    with copyright law. The Service is intended to support learning and accessibility, which may qualify 
                    as fair use, but you are responsible for your specific use case.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 8: Privacy and Data Protection */}
          <section id="privacy" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">8. Privacy and Data Protection</h2>
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold mb-2">Your privacy is our priority.</p>
                    <p>
                      Our collection, use, and protection of your information is governed by our Privacy Policy, 
                      which is incorporated into these Terms by reference.
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="font-bold mb-2">Key Privacy Commitments:</p>
                  <ul className="space-y-1 ml-4">
                    <li>✓ No storage of student data</li>
                    <li>✓ FERPA and COPPA compliance</li>
                    <li>✓ Real-time processing only</li>
                    <li>✓ No data sales or advertising</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <Link to="/privacy" className="text-primary hover:underline font-semibold">
                    Read our full Privacy Policy →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 9: Disclaimers and Warranties */}
          <section id="disclaimers" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">9. Disclaimers and Warranties</h2>
            <Card className="border-yellow-200 dark:border-yellow-900">
              <CardContent className="pt-6 space-y-4">
                <div className="uppercase font-bold text-sm text-yellow-700 dark:text-yellow-400 mb-4">
                  IMPORTANT - PLEASE READ CAREFULLY
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">9.1 "AS IS" Service</h3>
                  <p>
                    THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR 
                    IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
                    NON-INFRINGEMENT, OR ACCURACY.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">9.2 Translation Accuracy</h3>
                  <p>
                    We do not guarantee the accuracy, completeness, or reliability of translations provided by the Service. 
                    Automated translations may contain errors, mistranslations, or cultural inaccuracies. Users should 
                    verify important information and not rely solely on automated translations for critical decisions.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">9.3 Service Availability</h3>
                  <p>
                    We do not guarantee that the Service will be uninterrupted, timely, secure, or error-free. We may 
                    suspend or discontinue the Service at any time without notice.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">9.4 Third-Party Services</h3>
                  <p>
                    The Service relies on third-party services (Microsoft Azure) for core functionality. We are not 
                    responsible for the performance, availability, or accuracy of these third-party services.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">9.5 Educational Purpose Only</h3>
                  <p>
                    The Service is designed for educational support and should not be used as the sole means of communication 
                    in critical situations (medical, legal, safety-related). Always have backup communication methods available.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 10: Limitation of Liability */}
          <section id="limitation-liability" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">10. Limitation of Liability</h2>
            <Card className="border-red-200 dark:border-red-900">
              <CardContent className="pt-6 space-y-4">
                <div className="uppercase font-bold text-sm text-red-700 dark:text-red-400 mb-4">
                  LIMITATION OF LIABILITY
                </div>
                <div>
                  <p className="mb-4">
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL LANGUAGEBRIDGE, ITS OFFICERS, 
                    DIRECTORS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>
                      • ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED 
                      TO LOSS OF PROFITS, DATA, USE, OR OTHER INTANGIBLE LOSSES
                    </li>
                    <li>
                      • ANY DAMAGES RESULTING FROM MISTRANSLATIONS OR ERRORS IN THE SERVICE
                    </li>
                    <li>
                      • ANY UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR DATA
                    </li>
                    <li>
                      • ANY INTERRUPTION OR CESSATION OF THE SERVICE
                    </li>
                    <li>
                      • ANY BUGS, VIRUSES, OR OTHER HARMFUL CODE
                    </li>
                    <li>
                      • ANY ERRORS OR OMISSIONS IN CONTENT OR FUNCTIONALITY
                    </li>
                  </ul>
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="font-bold mb-2">Maximum Liability:</p>
                  <p>
                    Our total liability to you for any claims arising from your use of the Service shall not exceed 
                    the amount you paid to us (if any) for the Service in the twelve (12) months preceding the claim. 
                    For free users, our liability shall not exceed $100 USD.
                  </p>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>
                    Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities. 
                    In such jurisdictions, the above limitations may not apply to you, and our liability will be limited 
                    to the maximum extent permitted by law.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 11: Indemnification */}
          <section id="indemnification" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">11. Indemnification</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p>
                  You agree to indemnify, defend, and hold harmless LanguageBridge and its officers, directors, employees, 
                  agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, 
                  costs, or expenses (including reasonable attorneys' fees) arising from:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Your use or misuse of the Service</li>
                  <li>• Your violation of these Terms</li>
                  <li>• Your violation of any third-party rights, including intellectual property or privacy rights</li>
                  <li>• Any content you translate or process using the Service</li>
                  <li>• Your violation of any applicable laws or regulations</li>
                </ul>
                <p className="mt-4">
                  This indemnification obligation will survive the termination of these Terms and your use of the Service.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 12: School District Specific Terms */}
          <section id="school-districts" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">12. School District Specific Terms</h2>
            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">12.1 District Authorization</h3>
                  <p>
                    When a school district deploys the Service, the district represents and warrants that it has the 
                    authority to bind the district to these Terms and has obtained all necessary approvals and consents.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">12.2 FERPA Compliance</h3>
                  <p>
                    LanguageBridge operates as a "school official" under FERPA when providing services to school districts. 
                    We use student education records only for the purpose of providing the Service and do not disclose such 
                    records to third parties except as permitted by FERPA.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">12.3 Data Processing Agreement</h3>
                  <p>
                    For districts requiring a formal Data Processing Agreement (DPA) or Student Data Privacy Agreement, 
                    please contact us at <a href="mailto:contact@languagebridge.app" className="text-primary hover:underline">contact@languagebridge.app</a>.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">12.4 Pilot Programs</h3>
                  <p>
                    Districts participating in pilot programs may be subject to additional terms specified in their pilot 
                    agreement. Pilot terms will supersede these Terms to the extent of any conflict.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 13: Modifications to Service */}
          <section id="modifications" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">13. Modifications to Service and Terms</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">13.1 Service Changes</h3>
                  <p>
                    We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time, 
                    with or without notice. We will not be liable to you or any third party for any modification, suspension, 
                    or discontinuance of the Service.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">13.2 Terms Updates</h3>
                  <p>
                    We may update these Terms from time to time. When we make material changes, we will:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Update the "Last Updated" date at the top of these Terms</li>
                    <li>Notify users through the extension (when technically feasible)</li>
                    <li>For school districts, provide email notification to designated contacts</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">13.3 Continued Use</h3>
                  <p>
                    Your continued use of the Service after any changes to these Terms constitutes your acceptance of the 
                    updated Terms. If you do not agree to the updated Terms, you must stop using the Service and uninstall 
                    the extension.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 14: Termination */}
          <section id="termination" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">14. Termination</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">14.1 Termination by You</h3>
                  <p>
                    You may terminate your use of the Service at any time by uninstalling the Chrome extension. No further 
                    action is required as we do not maintain user accounts or store your data.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">14.2 Termination by Us</h3>
                  <p>
                    We may suspend or terminate your access to the Service at any time, with or without cause, with or 
                    without notice. Reasons for termination may include:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Violation of these Terms</li>
                    <li>Fraudulent, abusive, or illegal activity</li>
                    <li>Extended periods of inactivity</li>
                    <li>At our discretion for any other reason</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">14.3 Effect of Termination</h3>
                  <p>
                    Upon termination, your right to use the Service will immediately cease. Since we do not store user 
                    data, no data deletion is necessary. Sections of these Terms that by their nature should survive 
                    termination (including disclaimers, liability limitations, and indemnification) will survive.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 15: Governing Law */}
          <section id="governing-law" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">15. Governing Law and Dispute Resolution</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">15.1 Governing Law</h3>
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of the State of Ohio, 
                    United States, without regard to its conflict of law provisions.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">15.2 Jurisdiction</h3>
                  <p>
                    You agree to submit to the personal and exclusive jurisdiction of the courts located in Ohio for the 
                    resolution of any disputes arising out of or relating to these Terms or the Service.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">15.3 Dispute Resolution</h3>
                  <p>
                    Before filing any formal legal action, you agree to contact us at{" "}
                    <a href="mailto:contact@languagebridge.app" className="text-primary hover:underline">contact@languagebridge.app</a>{" "}
                    to attempt to resolve the dispute informally.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">15.4 Class Action Waiver</h3>
                  <p>
                    To the extent permitted by law, you agree that any dispute arising out of or relating to these Terms 
                    or the Service will be resolved on an individual basis and not as a class action or other representative 
                    proceeding.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 16: Contact Information */}
          <section id="contact" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">16. Contact Information</h2>
            <Card className="bg-primary/5">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold mb-2">Questions About These Terms?</p>
                    <p className="mb-4">
                      If you have any questions, concerns, or feedback about these Terms of Service, please contact us:
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="font-semibold mb-2">General Inquiries:</p>
                    <a href="mailto:contact@languagebridge.app" className="text-primary hover:underline">
                      contact@languagebridge.app
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Legal Questions:</p>
                    <a href="mailto:contact@languagebridge.app" className="text-primary hover:underline">
                      contact@languagebridge.app
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">School District Contracts:</p>
                    <a href="mailto:contact@languagebridge.app" className="text-primary hover:underline">
                      contact@languagebridge.app
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Privacy Questions:</p>
                    <a href="mailto:privacy@languagebridge.app" className="text-primary hover:underline">
                      privacy@languagebridge.app
                    </a>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-background rounded-lg">
                  <p className="font-bold mb-2">LanguageBridge</p>
                  <p className="text-sm text-muted-foreground">
                    Founded by Justin Bernard, M.Ed.<br />
                    Serving English Language Learners across Northeast Ohio and beyond
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Final Acknowledgment */}
          <Card className="mb-8 border-primary">
            <CardContent className="pt-6">
              <p className="font-bold text-center mb-2">By using LanguageBridge, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
              <p className="text-center text-sm text-muted-foreground">
                Last Updated: November 15, 2024
              </p>
            </CardContent>
          </Card>

          {/* Copyright Notice */}
          <div className="text-center py-8 border-t border-border mt-8">
            <p className="text-sm text-muted-foreground">
              © 2025 LanguageBridge. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              LanguageBridge is a registered trademark of LanguageBridge.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Unauthorized use, reproduction, or distribution of this content is prohibited.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 rounded-full w-12 h-12 shadow-lg z-50 animate-fade-in"
          size="icon"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
