import SEO from "@/components/SEO";
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
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "RecycHub Togo",
    description: "Plateforme de collecte et recyclage de plastiques à Kara, Togo.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kara",
      addressCountry: "TG",
    },
    telephone: "+22897684030",
    areaServed: "Kara, Togo",
    url: "https://recychubtogo.com",
  };

  return (
    <div className="pb-16 lg:pb-0">
      <SEO
        title="RecycHub Togo — Vendez vos plastiques & faites collecter vos déchets à Kara"
        description="Plateforme phygitale de recyclage à Kara : vendez vos plastiques au kg, demandez un enlèvement de déchets, signalez les dépotoirs sauvages."
        path="/"
        jsonLd={jsonLd}
      />
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
      <WhatsAppButton />
    </div>
  );
};

export default Index;
