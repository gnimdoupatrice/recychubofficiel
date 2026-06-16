import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SolutionsIntro from "@/components/SolutionsIntro";
import SolutionProSection from "@/components/SolutionProSection";
import ServicesSection from "@/components/ServicesSection";
import CivicTechSection from "@/components/CivicTechSection";
import GreenAcademySection from "@/components/GreenAcademySection";
import HowItWorks from "@/components/HowItWorks";
import ImpactStatsSection from "@/components/ImpactStatsSection";

import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";
import EventsHubSection from "@/components/EventsHubSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyBar from "@/components/MobileStickyBar";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://recychubtogo.com/#org",
        name: "RECYC HUB TOGO",
        description: "Plateforme phygitale de collecte et recyclage de déchets à Kara, Togo : rachat de plastiques au kg, enlèvement de déchets ménagers et alerte dépotoir.",
        address: { "@type": "PostalAddress", addressLocality: "Kara", addressCountry: "TG" },
        telephone: "+22897684030",
        areaServed: "Kara, Togo",
        url: "https://recychubtogo.com",
      },
      {
        "@type": "Service",
        name: "Rachat de plastiques au kg",
        provider: { "@id": "https://recychubtogo.com/#org" },
        areaServed: "Kara, Togo",
        serviceType: "Rachat de déchets plastiques recyclables",
        url: "https://recychubtogo.com/vendre",
      },
      {
        "@type": "Service",
        name: "Enlèvement de déchets ménagers",
        provider: { "@id": "https://recychubtogo.com/#org" },
        areaServed: "Kara, Togo",
        serviceType: "Collecte logistique de déchets à domicile",
        url: "https://recychubtogo.com/enlevement",
      },
    ],
  };

  return (
    <div className="pb-16 lg:pb-0">
      <SEO
        title="RECYC HUB TOGO — Vendez vos plastiques ou faites enlever vos déchets à Kara"
        description="Plateforme phygitale à Kara : vendez vos plastiques au kg (jusqu'à 150 FCFA/kg), demandez un enlèvement de déchets ménagers, signalez les dépotoirs sauvages."
        path="/"
        jsonLd={jsonLd}
      />
      <HeroSection />
      <AboutSection />
      {/* Nos Services : intro → Solution Pro → Catalogue → CivicTech → Green Academy */}
      <SolutionsIntro />
      <SolutionProSection />
      <ServicesSection />
      <CivicTechSection />
      <GreenAcademySection />
      <HowItWorks />
      <ImpactStatsSection />
      <TestimonialsSection />
      <PartnersSection />
      <EventsHubSection />
      <FAQSection />
      <CTASection />

      <WhatsAppButton />
      <MobileStickyBar />
    </div>
  );
};

export default Index;
