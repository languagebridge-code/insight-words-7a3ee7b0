import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about LanguageBridge
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4 fade-in-up delay-200">
          {/* About the Ohio Pilot */}
          <AccordionItem value="why-ohio" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left font-semibold hover:text-primary">
              Why Ohio?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Ohio is home to diverse, innovative school districts committed to educational equity. We're
              starting here to perfect our platform with real educators and students before expanding
              nationwide. Ohio's forward-thinking approach to assistive technology makes it the ideal
              launch state for LanguageBridge.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pilot-schools" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left font-semibold hover:text-primary">
              How many pilot schools are you accepting?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We're accepting a limited number of Ohio schools for our flagship pilot program to ensure
              personalized support and implementation success. This allows us to work closely with each
              school, gather meaningful feedback, and ensure every student gets the attention they deserve.
            </AccordionContent>
          </AccordionItem>

          {/* Technical Questions */}
          <AccordionItem value="internet" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left font-semibold hover:text-primary">
              Is internet required?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              LanguageBridge works best with an internet connection for real-time translation and
              text-to-speech. Offline mode is coming in Phase 4 of our roadmap (9-12 months), which will
              allow students to use cached translations and pre-downloaded voice packs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="languages" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left font-semibold hover:text-primary">
              What languages are currently supported?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Phase 1 currently supports Dari, the primary language for many Afghan refugee students. Pashto,
              Arabic, and Spanish support are launching in Phase 2 (3-6 months). We're prioritizing languages
              based on the needs of Ohio's diverse student population and will continue expanding based on
              pilot school feedback.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="devices" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left font-semibold hover:text-primary">
              What devices work with LanguageBridge?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Currently, LanguageBridge is optimized for Chromebooks, the most common device in K-12
              education. Windows, macOS, and iOS support are coming in Phase 4 (9-12 months). The Chrome
              extension works seamlessly with Google Classroom, Canvas, and all web-based learning platforms.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="implementation" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left font-semibold hover:text-primary">
              How long does implementation take?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Most schools are up and running within 1-2 weeks, including teacher training. Our streamlined
              process includes: initial consultation (30 minutes), Chrome extension deployment via your admin
              console (1 hour), teacher professional development session (1-2 hours), and student onboarding
              support. We work around your schedule to minimize disruption.
            </AccordionContent>
          </AccordionItem>

          {/* Support & Training */}
          <AccordionItem value="training" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left font-semibold hover:text-primary">
              Is training provided?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes! Every pilot school receives comprehensive professional development sessions tailored to your
              team. We cover installation, best practices for supporting ELL students, troubleshooting, and
              integration with your existing curriculum. Training is available in-person for Ohio schools or
              via video conference.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="support" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left font-semibold hover:text-primary">
              What kind of support do we get?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Pilot schools receive priority support via email (inquiry@languagebridge.app), phone ((216)
              800-6020), and scheduled check-ins with our team. We typically respond within 4 business hours
              and offer live troubleshooting for urgent issues. You'll also have a direct line to our
              development team to share feedback and feature requests.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="billing" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left font-semibold hover:text-primary">
              How does billing work?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              LanguageBridge uses annual licensing per student. We offer flexible invoicing for districts and
              can work with purchase orders. Payment terms are flexible for public schools, and we accept all
              major forms of institutional payment. Multi-year agreements and district-wide pricing are
              available with additional discounts.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-privacy" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left font-semibold hover:text-primary">
              Is student data protected?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Absolutely. LanguageBridge is FERPA and COPPA compliant. We do not store, sell, or share student
              data. Translations are processed in real-time and are not logged or retained. We take student
              privacy seriously and undergo regular third-party security audits to ensure compliance with all
              federal and state regulations.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="accessibility" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left font-semibold hover:text-primary">
              Does LanguageBridge meet accessibility requirements?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes. LanguageBridge is designed with accessibility at its core and meets Title VI Civil Rights
              Act requirements for equal access to education. It's also ADA accessible with keyboard
              navigation support and screen reader compatibility for students with additional needs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a href="#contact" className="text-deep-purple hover:text-burnt-orange font-semibold text-lg">
            Contact us →
          </a>
        </div>
      </div>
    </section>
  );
};
