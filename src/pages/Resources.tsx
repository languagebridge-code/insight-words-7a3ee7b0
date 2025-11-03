import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Video, Shield, Code } from "lucide-react";

export default function Resources() {
  const resourcesByTab = {
    esl: [
      {
        title: "5-Minute Quick Start Guide",
        description: "Get up and running with LanguageBridge in your classroom",
        icon: FileText,
        format: "PDF",
        highValue: false
      },
      {
        title: "Classroom Management Best Practices",
        description: "Tips for integrating LanguageBridge into daily instruction",
        icon: FileText,
        format: "PDF",
        highValue: false
      },
      {
        title: "Video Tutorials by Language",
        description: "Watch how-to videos in Dari, Pashto, Spanish, and more",
        icon: Video,
        format: "YouTube Playlist",
        highValue: false
      },
      {
        title: "Troubleshooting FAQ",
        description: "Quick answers to common student and teacher questions",
        icon: FileText,
        format: "PDF",
        highValue: false
      }
    ],
    admin: [
      {
        title: "Title VI Compliance Checklist",
        description: "Ensure your school meets federal language access requirements",
        icon: Shield,
        format: "PDF",
        highValue: true
      },
      {
        title: "RFP Template for Language Services",
        description: "Ready-to-use procurement document for LanguageBridge",
        icon: FileText,
        format: "DOCX",
        highValue: true
      },
      {
        title: "Implementation Playbook",
        description: "Step-by-step guide for district-wide deployment",
        icon: FileText,
        format: "PDF",
        highValue: false
      },
      {
        title: "Security & Privacy Whitepaper",
        description: "Complete overview of data protection and compliance",
        icon: Shield,
        format: "PDF",
        highValue: false
      }
    ],
    grants: [
      {
        title: "Title III Grant Narrative Template",
        description: "Pre-written application for English Language Acquisition funds",
        icon: FileText,
        format: "DOCX",
        highValue: true
      },
      {
        title: "Title VI Grant Narrative Template",
        description: "Application template for civil rights compliance funding",
        icon: FileText,
        format: "DOCX",
        highValue: true
      },
      {
        title: "ESSA Evidence-Based Intervention Template",
        description: "Grant application showing LanguageBridge research backing",
        icon: FileText,
        format: "DOCX",
        highValue: true
      },
      {
        title: "Budget Justification Calculator",
        description: "Excel tool to calculate costs and ROI for grant applications",
        icon: FileText,
        format: "XLSX",
        highValue: false
      },
      {
        title: "Letters of Support Library",
        description: "Sample letters from schools and administrators",
        icon: FileText,
        format: "PDF",
        highValue: false
      },
      {
        title: "Research Citations & Evidence Base",
        description: "Academic research supporting LanguageBridge effectiveness",
        icon: FileText,
        format: "PDF",
        highValue: false
      }
    ],
    it: [
      {
        title: "Google Admin Console Deployment Guide",
        description: "Deploy LanguageBridge across your Chromebook fleet in 30 minutes",
        icon: Code,
        format: "PDF",
        highValue: false
      },
      {
        title: "Network Requirements & Whitelisting",
        description: "Technical specifications and firewall configuration",
        icon: Code,
        format: "PDF",
        highValue: false
      },
      {
        title: "Data Security Architecture Diagram",
        description: "Visual overview of how LanguageBridge protects student data",
        icon: Shield,
        format: "PDF",
        highValue: false
      },
      {
        title: "FERPA Compliance Documentation",
        description: "Legal certifications and privacy policy details",
        icon: Shield,
        format: "PDF",
        highValue: false
      }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              📚 Free Resources for <span className="gradient-text">Educators</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Everything you need to get LanguageBridge approved and deployed in your school
            </p>
          </div>
        </div>
      </section>

      {/* Tabbed Resources Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="grants" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12">
                <TabsTrigger value="esl">For ESL Teachers</TabsTrigger>
                <TabsTrigger value="admin">For Administrators</TabsTrigger>
                <TabsTrigger value="grants">For Grant Writers</TabsTrigger>
                <TabsTrigger value="it">For IT Directors</TabsTrigger>
              </TabsList>

              {/* ESL Teachers Tab */}
              <TabsContent value="esl">
                <div className="grid md:grid-cols-2 gap-6">
                  {resourcesByTab.esl.map((resource, index) => (
                    <div key={index} className="bg-card rounded-xl p-6 border border-border hover-scale">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <resource.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-bold text-lg">{resource.title}</h3>
                            {resource.highValue && (
                              <Badge className="bg-yellow-500 text-white shrink-0">HIGH VALUE</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                          <p className="text-xs text-primary font-semibold mb-4">{resource.format}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Administrators Tab */}
              <TabsContent value="admin">
                <div className="grid md:grid-cols-2 gap-6">
                  {resourcesByTab.admin.map((resource, index) => (
                    <div key={index} className="bg-card rounded-xl p-6 border border-border hover-scale">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <resource.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-bold text-lg">{resource.title}</h3>
                            {resource.highValue && (
                              <Badge className="bg-yellow-500 text-white shrink-0">HIGH VALUE</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                          <p className="text-xs text-primary font-semibold mb-4">{resource.format}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Grant Writers Tab */}
              <TabsContent value="grants">
                <div className="mb-8 text-center">
                  <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-full px-6 py-2">
                    <p className="text-yellow-700 dark:text-yellow-300 font-semibold">
                      ⭐ Most Popular Resources - Download These First
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {resourcesByTab.grants.map((resource, index) => (
                    <div key={index} className="bg-card rounded-xl p-6 border border-border hover-scale">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <resource.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-bold text-lg">{resource.title}</h3>
                            {resource.highValue && (
                              <Badge className="bg-yellow-500 text-white shrink-0">HIGH VALUE</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                          <p className="text-xs text-primary font-semibold mb-4">{resource.format}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* IT Directors Tab */}
              <TabsContent value="it">
                <div className="grid md:grid-cols-2 gap-6">
                  {resourcesByTab.it.map((resource, index) => (
                    <div key={index} className="bg-card rounded-xl p-6 border border-border hover-scale">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <resource.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-bold text-lg">{resource.title}</h3>
                            {resource.highValue && (
                              <Badge className="bg-yellow-500 text-white shrink-0">HIGH VALUE</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                          <p className="text-xs text-primary font-semibold mb-4">{resource.format}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Download All Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 border-2 border-primary/20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Want Everything?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Download the complete resource bundle with one click
              </p>

              <form className="space-y-4 max-w-md mx-auto mb-6">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                />
                <input 
                  type="text" 
                  placeholder="School/District" 
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                />
                <select className="w-full px-4 py-3 rounded-lg border border-border bg-background">
                  <option value="">Your Role</option>
                  <option value="esl">ESL Teacher</option>
                  <option value="admin">Administrator</option>
                  <option value="grant">Grant Writer</option>
                  <option value="it">IT Director</option>
                  <option value="other">Other</option>
                </select>
                <Button size="lg" className="w-full gradient-primary text-white font-semibold">
                  Download Complete Bundle
                  <Download className="ml-2" />
                </Button>
              </form>

              <p className="text-sm text-muted-foreground">
                We'll never spam you. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
