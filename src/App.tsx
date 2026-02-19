import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import GreenAcademy from "./pages/GreenAcademy";
import AlerteDepotoir from "./pages/AlerteDepotoir";
import Evenements from "./pages/Evenements";
import VendrePlastiques from "./pages/VendrePlastiques";
import DemanderEnlevement from "./pages/DemanderEnlevement";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/academy" element={<GreenAcademy />} />
            <Route path="/alerte" element={<AlerteDepotoir />} />
            <Route path="/evenements" element={<Evenements />} />
            <Route path="/vendre" element={<VendrePlastiques />} />
            <Route path="/enlevement" element={<DemanderEnlevement />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
