import HeroSection from "@/components/HeroSection";
import WhyUsSection from "@/components/WhyUsSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import ImpactSection from "@/components/ImpactSection";
import AboutSection from "@/components/AboutSection";
import AcademyTeaser from "@/components/AcademyTeaser";
import AlerteTeaser from "@/components/AlerteTeaser";
import EventsTeaser from "@/components/EventsTeaser";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="pb-16 lg:pb-0">
      <HeroSection />
      <AboutSection />
      
      <ServicesSection />
      <HowItWorks />
      <ImpactSection />
      <AcademyTeaser />
      <AlerteTeaser />
      <EventsTeaser />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </div>
  );
};

export default Index;
