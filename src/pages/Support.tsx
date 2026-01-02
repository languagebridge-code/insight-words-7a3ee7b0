import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  BookOpen,
  MessageCircle,
  Mail,
  Phone,
  Video,
  Download,
  Chrome,
  Settings,
  Users,
  Shield,
  Zap,
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Volume2,
  Globe,
  Monitor,
} from "lucide-react";
import { Link } from "react-router-dom";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const quickStartGuides = [
    {
      icon: Download,
      title: "Installing the Extension",
      description: "Step-by-step guide to install LanguageBridge on Chrome",
      steps: [
        "Open Google Chrome browser",
        "Visit the Chrome Web Store",
        "Search for 'LanguageBridge'",
        "Click 'Add to Chrome'",
        "Confirm by clicking 'Add Extension'",
        "The LanguageBridge icon will appear in your toolbar",
      ],
    },
    {
      icon: Settings,
      title: "Initial Setup",
      description: "Configure your classroom and student languages",
      steps: [
        "Click the LanguageBridge icon in Chrome",
        "Enter your teacher code provided by your school",
        "Select the primary languages your students speak",
        "Customize translation settings as needed",
        "Test with a sample webpage",
      ],
    },
    {
      icon: Users,
      title: "Adding Students",
      description: "Help students access LanguageBridge in class",
      steps: [
        "Share your classroom code with students",
        "Students install the extension on their Chromebooks",
        "They enter the classroom code when prompted",
        "Monitor student activity from your dashboard",
      ],
    },
  ];

  const troubleshootingItems = [
    {
      category: "Extension Issues",
      icon: Chrome,
      problems: [
        {
          issue: "Extension not appearing in toolbar",
          solutions: [
            "Click the puzzle icon in Chrome toolbar to find LanguageBridge",
            "Pin the extension by clicking the pin icon",
            "Try reinstalling the extension from Chrome Web Store",
            "Restart Chrome browser",
          ],
        },
        {
          issue: "Extension not translating text",
          solutions: [
            "Make sure you're on a supported website",
            "Check if the extension is enabled (icon should be colored, not gray)",
            "Refresh the webpage and try again",
            "Check your internet connection",
            "Verify your classroom code is entered correctly",
          ],
        },
        {
          issue: "Extension crashes or freezes",
          solutions: [
            "Disable and re-enable the extension",
            "Clear Chrome's cache and cookies",
            "Update Chrome to the latest version",
            "Reinstall the extension",
            "Contact support if issue persists",
          ],
        },
      ],
    },
    {
      category: "Audio Issues",
      icon: Volume2,
      problems: [
        {
          issue: "No audio playback",
          solutions: [
            "Check if your device volume is turned up",
            "Make sure audio is not muted in Chrome",
            "Try using headphones",
            "Check Chrome's site permissions for audio",
            "Restart the browser",
          ],
        },
        {
          issue: "Audio quality is poor",
          solutions: [
            "Check your internet connection speed",
            "Close other tabs using audio",
            "Try a different audio device",
            "Contact support if issue continues",
          ],
        },
      ],
    },
    {
      category: "Translation Quality",
      icon: Globe,
      problems: [
        {
          issue: "Translations seem inaccurate",
          solutions: [
            "Report specific translation issues through the feedback button",
            "Check if the correct source and target languages are selected",
            "Some specialized terms may need manual review",
            "Our translations are reviewed by native speakers for accuracy",
          ],
        },
        {
          issue: "Missing language support",
          solutions: [
            "Check our supported languages list",
            "Request new languages through the feedback form",
            "We're continuously adding new language pairs",
          ],
        },
      ],
    },
    {
      category: "Account & Access",
      icon: Shield,
      problems: [
        {
          issue: "Can't log in to dashboard",
          solutions: [
            "Verify your email address is correct",
            "Use the 'Forgot Password' link to reset",
            "Check if your school account is active",
            "Contact your school's IT administrator",
          ],
        },
        {
          issue: "Classroom code not working",
          solutions: [
            "Double-check the code for typos",
            "Codes are case-sensitive",
            "Ask your teacher for a new code if expired",
            "Contact support if issues persist",
          ],
        },
      ],
    },
  ];

  const faqs = [
    {
      question: "What browsers does LanguageBridge support?",
      answer: "LanguageBridge currently supports Google Chrome and Chromium-based browsers (Edge, Brave). We recommend using the latest version of Chrome for the best experience. Support for Firefox and Safari is planned for future releases.",
    },
    {
      question: "Is LanguageBridge FERPA and COPPA compliant?",
      answer: "Yes! LanguageBridge is fully FERPA and COPPA compliant. We never store student data, all translations happen in real-time without saving personal information, and we have signed Data Protection Agreements with participating districts.",
    },
    {
      question: "How many languages does LanguageBridge support?",
      answer: "LanguageBridge supports over 100 languages including Spanish, Arabic, Vietnamese, Chinese (Simplified and Traditional), Somali, Swahili, and many more. We're constantly adding new languages based on user requests.",
    },
    {
      question: "Can students use LanguageBridge on their personal devices?",
      answer: "Students can use LanguageBridge on any Chrome browser with their classroom code. This includes personal Chromebooks, laptops, and desktop computers. Mobile support is coming soon.",
    },
    {
      question: "How does the audio feature work?",
      answer: "LanguageBridge provides native-speaker audio for all translations. Students can click the speaker icon to hear the pronunciation, which is especially helpful for preliterate students who are still developing reading skills in their home language.",
    },
    {
      question: "What's included in the free pilot program?",
      answer: "The free pilot includes full access to all LanguageBridge features, professional development training for teachers, dedicated support, and monthly usage reports. We're offering this to select Ohio schools for the 2025-2026 school year.",
    },
    {
      question: "How do I get usage reports for my classroom?",
      answer: "Teachers can access usage reports through the Teacher Dashboard. You'll see translation counts, language pairs used, and student engagement metrics. District administrators can access aggregate reports across all classrooms.",
    },
    {
      question: "Can LanguageBridge translate PDFs and documents?",
      answer: "Currently, LanguageBridge translates web content in the browser. Document translation is on our roadmap. For now, you can copy text from documents and paste it into any text field to translate.",
    },
    {
      question: "How do I report a translation error?",
      answer: "Click the feedback button on any translation to report errors. Our team of native speakers reviews all submissions and improves translations regularly. You can also email support@languagebridge.com with specific examples.",
    },
    {
      question: "What happens when my trial ends?",
      answer: "Before your trial ends, we'll contact you to discuss pricing options. Our goal is to make LanguageBridge affordable for all schools. We offer flexible pricing based on student count and can help identify funding sources like Title III.",
    },
  ];

  const videoTutorials = [
    { title: "Getting Started with LanguageBridge", duration: "3:45", category: "Basics" },
    { title: "Setting Up Your Classroom", duration: "5:20", category: "Setup" },
    { title: "Using the Teacher Dashboard", duration: "4:15", category: "Dashboard" },
    { title: "Helping Students Install the Extension", duration: "2:30", category: "Students" },
    { title: "Understanding Usage Reports", duration: "6:10", category: "Reports" },
    { title: "Best Practices for ELL Instruction", duration: "8:45", category: "Teaching" },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              Support Center
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How Can We <span className="gradient-text">Help You?</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers, troubleshoot issues, and get the most out of LanguageBridge
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help articles, FAQs, or troubleshooting guides..."
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Quick Start Guide</h3>
                  <p className="text-sm text-muted-foreground">Get started in minutes</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                  <Video className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Video Tutorials</h3>
                  <p className="text-sm text-muted-foreground">Watch and learn</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Troubleshooting</h3>
                  <p className="text-sm text-muted-foreground">Fix common issues</p>
                </div>
              </CardContent>
            </Card>

            <Link to="/contact">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group h-full">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Contact Support</h3>
                    <p className="text-sm text-muted-foreground">Get personalized help</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="getting-started" className="w-full">
            <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-4 mb-12">
              <TabsTrigger value="getting-started" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Getting Started</span>
              </TabsTrigger>
              <TabsTrigger value="troubleshooting" className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Troubleshooting</span>
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span className="hidden sm:inline">FAQ</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                <span className="hidden sm:inline">Videos</span>
              </TabsTrigger>
            </TabsList>

            {/* Getting Started Tab */}
            <TabsContent value="getting-started">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Quick Start Guides</h2>
                <div className="space-y-6">
                  {quickStartGuides.map((guide, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="bg-muted/50">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <guide.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle>{guide.title}</CardTitle>
                            <CardDescription>{guide.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <ol className="space-y-3">
                          {guide.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start gap-3">
                              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">
                                {stepIndex + 1}
                              </span>
                              <span className="text-muted-foreground">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Troubleshooting Tab */}
            <TabsContent value="troubleshooting">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Troubleshooting Guide</h2>
                <div className="space-y-8">
                  {troubleshootingItems.map((category, catIndex) => (
                    <Card key={catIndex}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <category.icon className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle>{category.category}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {category.problems.map((problem, probIndex) => (
                            <AccordionItem key={probIndex} value={`${catIndex}-${probIndex}`}>
                              <AccordionTrigger className="text-left hover:text-primary">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0" />
                                  {problem.issue}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="space-y-2 ml-6">
                                  {problem.solutions.map((solution, solIndex) => (
                                    <li key={solIndex} className="flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                      <span className="text-muted-foreground">{solution}</span>
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                {searchQuery && (
                  <p className="text-center text-muted-foreground mb-6">
                    Showing {filteredFaqs.length} results for "{searchQuery}"
                  </p>
                )}
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="bg-card rounded-2xl px-6 shadow-md border-0"
                    >
                      <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary py-6">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                {filteredFaqs.length === 0 && (
                  <div className="text-center py-12">
                    <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium">No results found</p>
                    <p className="text-muted-foreground">Try adjusting your search or browse our categories</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Video Tutorials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {videoTutorials.map((video, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                      <div className="aspect-video bg-muted relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Video className="w-8 h-8 text-primary-foreground ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-background/90 px-2 py-1 rounded text-sm font-medium">
                          {video.duration}
                        </div>
                      </div>
                      <CardContent className="pt-4">
                        <div className="text-xs text-primary font-medium mb-1">{video.category}</div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {video.title}
                        </h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <p className="text-center text-muted-foreground mt-8">
                  More video tutorials coming soon! Subscribe to our newsletter for updates.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our support team is here to help you succeed. Reach out through any of these channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Email Support</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Get a response within 24 hours
                </p>
                <a
                  href="mailto:support@languagebridge.com"
                  className="text-primary font-medium hover:underline"
                >
                  support@languagebridge.com
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Phone Support</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Mon-Fri, 8am-5pm EST
                </p>
                <a
                  href="tel:+12168006020"
                  className="text-primary font-medium hover:underline"
                >
                  (216) 800-6020
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Schedule a Demo</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  See LanguageBridge in action
                </p>
                <Link to="/demo" className="text-primary font-medium hover:underline">
                  Book a demo →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* System Status */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-medium">All Systems Operational</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Support;
