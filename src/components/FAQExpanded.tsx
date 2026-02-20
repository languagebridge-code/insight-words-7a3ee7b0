import { CheckCircle } from "lucide-react";

export const FAQExpanded = () => {
  const faqs = [
    {
      question: "What is LanguageBridge?",
      answer: "LanguageBridge is a Chrome extension and the first language accessibility screen reader built for preliterate ESL students. It's a toolbar that follows students on every window they open. No tab-switching required. It answers the question many teachers have: what do I do with this student that doesn't know English?"
    },
    {
      question: "Why can't schools just use Google Translate?",
      answer: "Google Translate doesn't support Dari audio. Translator paraprofessionals cost hourly rates. Live phone translators charge per minute. So schools do what thousands of districts do: they use another student to translate. That student becomes a privacy risk, not out of carelessness, but because there are no better options. LanguageBridge is FERPA/COPPA compliant, reads translations aloud, and gives students control of their own learning from day one."
    },
    {
      question: "Can we try it before we purchase?",
      answer: "Yes. LanguageBridge is live on the Chrome Web Store. Contact us at contact@languagebridge.app to set up a free 30-day trial for your school or district."
    },
    {
      question: "How long does implementation take?",
      answer: "Complete implementation takes 3 weeks: Week 1, IT installs via Google Admin Console (30 minutes). Week 2, teacher professional development (3 hours). Week 3, students independently accessing grade-level content. No complex setup, no servers to configure, no ongoing maintenance required."
    },
    {
      question: "Do teachers need training?",
      answer: "For teachers, nothing changes. No new platforms. No passwords. No disruption. We offer a 3-hour professional development session, but the tool is intuitive enough to start using immediately. Students need zero training. They just highlight text and hit play."
    },
    {
      question: "Is this Title III fundable?",
      answer: "Yes. Districts receive $900 million annually in Title III funding. The money exists. LanguageBridge qualifies under Title III, special education budgets (for SLIFE students with IEPs), assistive technology budgets, and general instructional materials. We provide budget justification letters to make the funding process straightforward."
    },
    {
      question: "What languages are supported?",
      answer: "Currently 9 languages with more coming. We prioritize languages based on refugee resettlement patterns and district requests. Audio support is available for all languages to support preliterate students."
    },
    {
      question: "How is this different from Google Translate?",
      answer: "Three critical differences: (1) Compliance: We're FERPA/COPPA compliant with zero data tracking. Google Translate uses student data to train AI. (2) Audio Support: We read translations aloud for preliterate students. Google Translate requires reading ability. (3) Educational Tools: We provide teacher communication and academic glossaries. Google Translate only translates."
    },
    {
      question: "How is this different from Read&Write or Immersive Reader?",
      answer: "Read&Write is excellent for students who can already read. LanguageBridge is specifically designed for preliterate students who need to HEAR content in their language. Read&Write assumes literacy in at least one language; LanguageBridge doesn't. Microsoft Immersive Reader only works within Microsoft products (not Google Classroom), while LanguageBridge works anywhere. Many districts use both."
    },
    {
      question: "What data is collected?",
      answer: "None. Zero. We do not store, track, or collect any student data. Translations happen in real-time and are never saved. We don't track what students translate, when they use the tool, or any personally identifiable information. This is by design to ensure FERPA and COPPA compliance."
    },
    {
      question: "What do we need technically?",
      answer: "Just Chrome 90+ or any Chromebook with internet access. IT installs via Google Admin Console in 30 minutes. No extra software, no servers, no configuration needed. Works on standard school networks with content filters."
    },
    {
      question: "What's included in the Chrome extension?",
      answer: "Everything. One toolbar includes all three tools: Audio Translation, Tiered Language Glossary, and Talk to Teacher. Students highlight text, hit play, and a second later they hear it in their native language. It works on Google Docs, PDFs, and Google Classroom. No separate logins, no multiple platforms. It just works."
    },
    {
      question: "How much does it cost?",
      answer: "Free 30-day trial, $9.99 monthly for individual access, and custom district licensing packages. Email us at contact@languagebridge.app to discuss options."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about LanguageBridge
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
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

        <div className="text-center mt-12 fade-in-up">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a href="mailto:contact@languagebridge.app" className="text-primary font-semibold hover:underline">
            Contact our team at contact@languagebridge.app →
          </a>
        </div>
      </div>
    </section>
  );
};
