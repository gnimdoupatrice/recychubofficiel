import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import OurResponseSection from "@/components/OurResponseSection";
import SolutionsSection from "@/components/SolutionsSection";
import HowItWorks from "@/components/HowItWorks";
import EventsHubSection from "@/components/EventsHubSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://recychubtogo.com/#org",
        name: "RECYC HUB TOGO",
        description: "Plateforme phygitale de collecte et recyclage de déchets à Kara, Togo : rachat de plastiques au kg, enlèvement de déchets ménagers et alerte dépotoir.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kara",
          addressCountry: "TG",
        },
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
      <OurResponseSection />
      <SolutionsSection />
      <HowItWorks />
      <EventsHubSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
