import { Navigation } from "@/components/Navigation";
import { PageMeta } from "@/components/PageMeta";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CheckCircle2, GraduationCap, Server, Shield, Lock, FileCheck, Users, Database, Scale, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const FAQ = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'compliance'>('general');

  const allFAQs = [
    { question: "What is LanguageBridge?", answer: "LanguageBridge is a Chrome extension and the first language accessibility screen reader built for preliterate ESL students. It's a toolbar that follows students on every window they open. No tab-switching required." },
    { question: "Do teachers need training?", answer: "For teachers, nothing changes. No new platforms. No passwords. No disruption. We provide a 3-hour professional development session, but the tool is intuitive enough to start using immediately. Students need zero training." },
    { question: "What's included in the Chrome extension?", answer: "Everything. One toolbar includes all three tools: Audio Translation, Tiered Language Glossary, and Talk to Teacher. Students highlight text, hit play, and a second later they hear it in their native language. It works on Google Docs, PDFs, and is seamlessly integrated into Google Classroom." },
    { question: "What languages are supported?", answer: "Currently 9 languages with more coming. We prioritize languages based on refugee resettlement patterns and district requests." },
    { question: "How is this different from Google Translate?", answer: "Google Translate doesn't support Dari audio. Translator paraprofessionals cost hourly rates. Live phone translators charge per minute. So schools use other students to translate, creating privacy risks. LanguageBridge is FERPA/COPPA compliant with zero data tracking, reads translations aloud for preliterate students, and provides teacher communication and academic glossaries." },
    { question: "How is this different from Read&Write or Immersive Reader?", answer: "LanguageBridge is specifically designed for preliterate students who need to HEAR content in their language. Read&Write assumes literacy; LanguageBridge doesn't. Microsoft Immersive Reader only works within Microsoft products, not Google Classroom." },
    { question: "What do we need technically?", answer: "Just Chrome 90+ or any Chromebook with internet access. IT installs via Google Admin Console in 30 minutes. No extra software, no servers, no configuration needed." },
    { question: "What data is collected?", answer: "None. Zero. We do not store, track, or collect any student data. Translations happen in real-time and are never saved. FERPA and COPPA compliant by design." },
    { question: "Is this Title III fundable?", answer: "Yes. Districts receive $900 million annually in Title III funding. LanguageBridge qualifies under Title III, special education budgets, assistive technology budgets, and general instructional materials." },
  ];

  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": allFAQs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      document.getElementById('faq-schema')?.remove();
    };
  }, []);

  const teacherFAQs = [
    {
      question: "What is LanguageBridge?",
      answer: "LanguageBridge is a Chrome extension and the first language accessibility screen reader built for preliterate ESL students. We built it as a toolbar that follows students on every window they open. No tab-switching required. It answers the question many teachers have: what do I do with this student that doesn't know English?"
    },
    {
      question: "Do teachers need training?",
      answer: "For teachers, nothing changes. No new platforms. No passwords. No disruption. We offer a 3-hour professional development session for best practices and classroom integration, but the tool is intuitive enough to use right away. Students need zero training. They just highlight text and hit play."
    },
    {
      question: "What's included in the Chrome extension?",
      answer: "Everything. One toolbar includes all three tools: Audio Translation, Tiered Language Glossary, and Talk to Teacher. Students highlight text, hit a play button, and a second later they hear it read in their native language. It works on Google Docs, PDFs, and is seamlessly integrated into Google Classroom. No separate logins, no multiple platforms. It just works."
    },
    {
      question: "What languages are supported?",
      answer: "Currently 9 languages with more coming. We prioritize languages based on refugee resettlement patterns and district requests. Audio support is available for all languages to support preliterate students."
    },
    {
      question: "How is this different from Read&Write or Immersive Reader?",
      answer: "Read&Write is excellent for students who can already read. LanguageBridge is specifically designed for preliterate students who need to HEAR content in their language to access it. Read&Write assumes literacy in at least one language; LanguageBridge doesn't. Microsoft Immersive Reader only works within Microsoft products (not Google Classroom), while LanguageBridge works anywhere. Many districts use both: Read&Write for their general multilingual population and LanguageBridge for their most vulnerable preliterate SLIFE students."
    },
    {
      question: "Why can't schools just use Google Translate?",
      answer: "Google Translate doesn't support Dari audio. Translator paraprofessionals cost hourly rates. Live phone translators charge per minute. So schools do what thousands of districts do: they use another student to translate. That student becomes a privacy risk, not out of carelessness, but because there are no better options. LanguageBridge gives students control of their own learning from day one, with no FERPA violations and no shame."
    }
  ];

  const itFAQs = [
    {
      question: "What do we need technically?",
      answer: "Just Chrome 90+ or any Chromebook with internet access. IT installs via Google Admin Console in 30 minutes. No extra software, no servers, no configuration needed. Works on standard school networks with content filters. Requires HTTPS access to Azure Cognitive Services (standard SSL, no firewall changes)."
    },
    {
      question: "How long does implementation take?",
      answer: "Complete implementation takes 3 weeks: Week 1 - IT installs via Google Admin Console (30 minutes), Week 2 - Teacher professional development (3 hours), Week 3 - Students independently accessing grade-level content with translation and communication tools. No complex setup, no servers to configure, no ongoing maintenance required."
    },
    {
      question: "What data is collected?",
      answer: "None. Zero. We do not store, track, or collect any student data. Translations happen in real-time and are never saved. We don't track what students translate, when they use the tool, or any personally identifiable information. This is by design to ensure FERPA and COPPA compliance. Your IT department can verify this through our technical documentation."
    }
  ];

  const adminFAQs = [
    {
      question: "Why can't we just use Google Translate?",
      answer: "Google Translate doesn't support Dari audio. It requires literacy to use. It has no FERPA-specific data protection agreements, and student data may be used for AI training. It doesn't build language skills, doesn't integrate with curriculum, and doesn't provide teacher communication tools. Schools have federal obligations under Title VI and the Equal Educational Opportunities Act. LanguageBridge addresses all of these gaps with purpose-built tools and compliance documentation."
    },
    {
      question: "How is this different from Google Translate?",
      answer: "Three critical differences: (1) Compliance: We're FERPA/COPPA compliant with zero data tracking. Google Translate uses student data to train AI. (2) Audio Support: We read translations aloud for preliterate students. Google Translate requires reading ability. (3) Educational Tools: We provide teacher communication and academic glossaries. Google Translate only translates."
    },
    {
      question: "Is this Title III fundable?",
      answer: "Yes. Districts receive $900 million annually in Title III funding. The money exists. LanguageBridge qualifies under Title III, special education budgets (for SLIFE students with IEPs), assistive technology budgets, and general instructional materials. We provide budget justification letters and compliance documentation to make the funding process straightforward."
    },
    {
      question: "Can we try it before we purchase?",
      answer: "Yes. LanguageBridge is live on the Chrome Web Store. Contact us at contact@languagebridge.app to set up a free trial for your school or district."
    }
  ];

  const renderFAQSection = (title: string, icon: React.ReactNode, faqs: typeof teacherFAQs) => (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary/10 p-3 rounded-lg">
          {icon}
        </div>
        <h2 className="text-3xl font-bold gradient-text">{title}</h2>
      </div>
      
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl p-6 shadow-md border-2 border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-3 text-foreground">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <PageMeta title="FAQ & Compliance - LanguageBridge" description="Answers to common questions about LanguageBridge plus FERPA, COPPA, Ohio SB 29, and Title VI compliance documentation for school districts." />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              FAQ & Compliance
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Everything you need to know, from classroom questions to federal compliance
            </p>

            {/* Tab Switcher */}
            <div className="inline-flex rounded-xl bg-muted p-1.5 gap-1">
              <button
                onClick={() => setActiveTab('general')}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'general'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                General FAQ
              </button>
              <button
                onClick={() => setActiveTab('compliance')}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'compliance'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Privacy & Compliance
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* General FAQ Tab */}
      {activeTab === 'general' && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {renderFAQSection(
                "For Teachers & ESL Coordinators",
                <GraduationCap className="w-6 h-6 text-primary" />,
                teacherFAQs
              )}

              {renderFAQSection(
                "For IT Directors & Technical Staff",
                <Server className="w-6 h-6 text-primary" />,
                itFAQs
              )}

              {renderFAQSection(
                "For Administrators & Compliance Officers",
                <Shield className="w-6 h-6 text-primary" />,
                adminFAQs
              )}
            </div>
          </div>
        </section>
      )}

      {/* Compliance Tab */}
      {activeTab === 'compliance' && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-16">

              {/* FERPA */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Lock className="w-8 h-8 text-primary" />
                    <CardTitle className="text-3xl">FERPA Compliance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg">
                    LanguageBridge is designed from the ground up to comply with the Family Educational Rights and Privacy Act (FERPA), protecting student education records and personally identifiable information.
                  </p>
                  <div className="space-y-3">
                    {[
                      { title: "Zero Data Storage", desc: "No student text, translations, or browsing activity is stored on our servers or in any database. Text is processed in real-time and immediately discarded." },
                      { title: "No Student Identifiers", desc: "LanguageBridge does not collect, process, or store student names, email addresses, student IDs, IP addresses, or any other personally identifiable information." },
                      { title: "No Third-Party Data Sharing", desc: "Student data is never sold, shared, or transferred to third parties for marketing, advertising, or any other purpose." },
                      { title: "District Control", desc: "Schools maintain full control over deployment, access, and usage monitoring through standard Chromebook management tools." },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div><strong>{item.title}:</strong> {item.desc}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>For Compliance Officers:</strong> LanguageBridge operates as a client-side browser extension that processes text locally and transmits only anonymized text strings to Microsoft Azure Cognitive Services for translation. No education records as defined under FERPA 34 CFR § 99.3 are created, maintained, or transmitted.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* COPPA */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-8 h-8 text-primary" />
                    <CardTitle className="text-3xl">COPPA Compliance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg">
                    The Children's Online Privacy Protection Act (COPPA) requires operators of websites and online services to obtain verifiable parental consent before collecting personal information from children under 13. LanguageBridge exceeds COPPA requirements by collecting NO personal information from students of any age.
                  </p>
                  <div className="space-y-3">
                    {[
                      { title: "No Personal Information Collection", desc: "LanguageBridge does not collect names, addresses, email addresses, phone numbers, social security numbers, or any other personal identifiers from students." },
                      { title: "No Persistent Identifiers", desc: "We do not use cookies, device IDs, IP addresses, or other persistent identifiers to track students across websites or over time." },
                      { title: "No Behavioral Advertising", desc: "Student usage data is never used for targeted advertising or marketing purposes." },
                      { title: "School-Authorized Use", desc: "LanguageBridge operates under school authorization for educational purposes, with districts maintaining full control over student access." },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div><strong>{item.title}:</strong> {item.desc}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Ohio SB 29 */}
              <Card className="border-primary/30">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Scale className="w-8 h-8 text-primary" />
                    <CardTitle className="text-3xl">Ohio Senate Bill 29 (SB 29)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-lg font-semibold text-primary mb-2">✓ 100% Compliant with Ohio SB 29</p>
                    <p className="text-muted-foreground">
                      Ohio SB 29 establishes student data privacy requirements for K-12 school districts and technology providers. LanguageBridge exceeds all SB 29 requirements through our privacy-first architecture.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">SB 29 Compliance Summary</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        { title: "No Data Selling/Sharing", desc: "Zero data selling; no third-party commercial sharing" },
                        { title: "No Location Tracking", desc: "Extension never requests location permissions" },
                        { title: "No Keystroke Logging", desc: "No monitoring of typing activity" },
                        { title: "No Browsing History", desc: "Extension does not track browsing activity" },
                        { title: "No Passive Monitoring", desc: "Audio features are student-initiated only" },
                        { title: "72-Hour Breach Notification", desc: "Written protocol with 24/7 emergency contact" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-background rounded-lg border border-border">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <strong className="text-sm">{item.title}</strong>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Prohibited Activities We Never Perform</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {["Location tracking", "Keystroke recording", "Camera/microphone activation", "Browsing history collection", "Passive activity monitoring", "Behavioral profiling"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>For Ohio School Districts:</strong> We provide a complete SB 29 compliance guide package including contract addendum templates, parent notification letter templates, and detailed technical audit documentation. Contact <a href="mailto:info@languagebridge.app" className="text-primary hover:underline">info@languagebridge.app</a> to request your copy.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Title VI */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <FileCheck className="w-8 h-8 text-primary" />
                    <CardTitle className="text-3xl">Title VI & EEOA Compliance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Title VI of the Civil Rights Act of 1964</h3>
                    <p className="mb-4">
                      School districts receiving federal funding must provide meaningful access to educational programs for English Language Learners. LanguageBridge helps districts meet these obligations by providing immediate, meaningful access to grade-level content for preliterate students.
                    </p>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="font-semibold mb-2">How LanguageBridge Supports Title VI Compliance:</p>
                      <ul className="space-y-2 text-sm">
                        <li>✓ Provides immediate, meaningful access to grade-level content for preliterate students</li>
                        <li>✓ Includes audio support specifically designed for SLIFE students</li>
                        <li>✓ Offers teacher communication and academic vocabulary tools beyond basic translation</li>
                        <li>✓ Generates usage reports that document language access provision for compliance reviews</li>
                        <li>✓ Reduces reliance on student interpreters, protecting student privacy and dignity</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Compliance */}
              <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
                <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-3">Need Compliance Documentation?</h3>
                <p className="text-muted-foreground mb-6">
                  We provide complete compliance packages for district procurement, including DPAs, SB 29 guides, and technical audit documentation.
                </p>
                <a href="mailto:privacy@languagebridge.app">
                  <Button size="lg">Contact Compliance Team</Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border-2 border-primary/20">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">
            Our team is here to help. Reach out and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:contact@languagebridge.app"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Email: contact@languagebridge.app
            </a>
            <a 
              href="tel:+12168006020"
              className="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Call: (216) 800-6020
            </a>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default FAQ;