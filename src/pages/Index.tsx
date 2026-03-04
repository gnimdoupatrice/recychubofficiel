import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PolesSection from "@/components/PolesSection";
import ImpactSection from "@/components/ImpactSection";
import EventsSection from "@/components/EventsSection";
import AcademySection from "@/components/AcademySection";
import WhyUsSection from "@/components/WhyUsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PolesSection />
      <ImpactSection />
      <EventsSection />
      <AcademySection />
      <WhyUsSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
