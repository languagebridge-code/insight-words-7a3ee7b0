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
import Media from "./pages/Media";
import PricingPage from "./pages/PricingPage";

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
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teacher-signup" element={<TeacherSignup />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher-auth" element={<TeacherAuth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/media" element={<Media />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
