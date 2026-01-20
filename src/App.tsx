import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { WebsiteSchema } from "@/components/WebsiteSchema";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Compliance from "./pages/Compliance";
import Pilot from "./pages/Pilot";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import TermsOfService from "./pages/TermsOfService";
import Dashboard from "./pages/Dashboard";
import TeacherSignup from "./pages/TeacherSignup";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherAuth from "./pages/TeacherAuth";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Demo from "./pages/Demo";
import CaseStudies from "./pages/CaseStudies";
import Grants from "./pages/Grants";
import TitleIII from "./pages/grants/TitleIII";
import TitleVI from "./pages/grants/TitleVI";
import IDEA from "./pages/grants/IDEA";
import ESSA from "./pages/grants/ESSA";
import PricingPage from "./pages/PricingPage";
import Implementation from "./pages/Implementation";
import Resources from "./pages/Resources";
import ROICalculator from "./pages/ROICalculator";
import GetStarted from "./pages/GetStarted";
import TitleVIChecklist from "./pages/resources/TitleVIChecklist";
import TitleIIIApplication from "./pages/resources/TitleIIIApplication";
import Support from "./pages/Support";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <BreadcrumbSchema />
        <WebsiteSchema />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/pilot" element={<Pilot />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teacher-signup" element={<TeacherSignup />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher-auth" element={<TeacherAuth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/grants" element={<Grants />} />
          <Route path="/grants/title-iii" element={<TitleIII />} />
          <Route path="/grants/title-vi" element={<TitleVI />} />
          <Route path="/grants/idea" element={<IDEA />} />
          <Route path="/grants/essa" element={<ESSA />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/implementation" element={<Implementation />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/roi-calculator" element={<ROICalculator />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/resources/title-vi-checklist" element={<TitleVIChecklist />} />
          <Route path="/resources/title-iii-application" element={<TitleIIIApplication />} />
          <Route path="/support" element={<Support />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
