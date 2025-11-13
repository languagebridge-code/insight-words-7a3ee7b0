import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Grants from "./pages/Grants";
import PricingPage from "./pages/PricingPage";
import Pilot from "./pages/Pilot";
import Resources from "./pages/Resources";
import CaseStudies from "./pages/CaseStudies";
import TitleIII from "./pages/grants/TitleIII";
import TitleVI from "./pages/grants/TitleVI";
import IDEA from "./pages/grants/IDEA";
import ESSA from "./pages/grants/ESSA";
import TitleVIChecklist from "./pages/resources/TitleVIChecklist";
import TitleIIIApplication from "./pages/resources/TitleIIIApplication";
import Contact from "./pages/Contact";
import ROICalculator from "./pages/ROICalculator";
import GetStarted from "./pages/GetStarted";
import Demo from "./pages/Demo";
import Implementation from "./pages/Implementation";
import Compliance from "./pages/Compliance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/grants" element={<Grants />} />
          <Route path="/grants/title-iii" element={<TitleIII />} />
          <Route path="/grants/title-vi" element={<TitleVI />} />
          <Route path="/grants/idea" element={<IDEA />} />
          <Route path="/grants/essa" element={<ESSA />} />
          <Route path="/resources/title-vi-checklist" element={<TitleVIChecklist />} />
          <Route path="/resources/title-iii-application" element={<TitleIIIApplication />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/pilot" element={<Pilot />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/roi-calculator" element={<ROICalculator />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/implementation" element={<Implementation />} />
          <Route path="/compliance" element={<Compliance />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
