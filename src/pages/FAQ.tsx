import { Navigation } from "@/components/Navigation";
import { PageMeta } from "@/components/PageMeta";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CheckCircle, GraduationCap, Server, Shield } from "lucide-react";
import { useEffect } from "react";

const FAQ = () => {
  // Generate FAQ structured data for SEO
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
    { question: "How much does it cost?", answer: "Free 30-day trial, $9.99 monthly for individual access, and custom district licensing packages. Email contact@languagebridge.app to discuss options." }
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
      const existingScript = document.getElementById('faq-schema');
      if (existingScript) {
        existingScript.remove();
      }
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
      question: "How much does it cost?",
      answer: "Free 30-day trial, $9.99 monthly for individual access, and custom district licensing packages. Email us at contact@languagebridge.app to discuss options and we'll provide budget justification letters tailored to your district."
    },
    {
      question: "Can we try it before we purchase?",
      answer: "Yes. LanguageBridge is live on the Chrome Web Store. Contact us at contact@languagebridge.app to set up a free 30-day trial for your school or district."
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
      <PageMeta title="FAQ - Common Questions About LanguageBridge" description="Answers to common questions about LanguageBridge: pricing, compliance, implementation, training, and how it helps ELL students succeed." />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers organized by role: teachers, IT directors, and administrators
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
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

          {/* Contact CTA */}
          <div className="max-w-4xl mx-auto mt-16 text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border-2 border-primary/20">
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
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default FAQ;
