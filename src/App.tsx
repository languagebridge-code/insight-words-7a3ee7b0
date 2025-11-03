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
import Contact from "./pages/Contact";
import ROICalculator from "./pages/ROICalculator";
import GetStarted from "./pages/GetStarted";
import Demo from "./pages/Demo";

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
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/pilot" element={<Pilot />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/roi-calculator" element={<ROICalculator />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/demo" element={<Demo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
