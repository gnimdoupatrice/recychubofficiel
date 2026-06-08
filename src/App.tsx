import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import MobileStickyBar from "./components/MobileStickyBar";
import Index from "./pages/Index";

// Lazy-loaded routes — réduit le bundle initial pour réseaux 3G
const GreenAcademy = lazy(() => import("./pages/GreenAcademy"));
const Solutions = lazy(() => import("./pages/Solutions"));
const AlerteDepotoir = lazy(() => import("./pages/AlerteDepotoir"));
const Evenements = lazy(() => import("./pages/Evenements"));
const VendrePlastiques = lazy(() => import("./pages/VendrePlastiques"));
const DemanderEnlevement = lazy(() => import("./pages/DemanderEnlevement"));
const Connexion = lazy(() => import("./pages/Connexion"));
const Inscription = lazy(() => import("./pages/Inscription"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <TopBar />
          <Navbar />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/academy" element={<GreenAcademy />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/alerte" element={<AlerteDepotoir />} />
              <Route path="/evenements" element={<Evenements />} />
              <Route path="/vendre" element={<VendrePlastiques />} />
              <Route path="/enlevement" element={<DemanderEnlevement />} />
              <Route path="/connexion" element={<Connexion />} />
              <Route path="/inscription" element={<Inscription />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
          <MobileStickyBar />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
