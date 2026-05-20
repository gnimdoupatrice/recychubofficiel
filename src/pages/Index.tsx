import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import ActionsBento from "@/components/ActionsBento";
import ManifestoSection from "@/components/ManifestoSection";
import HowItWorks from "@/components/HowItWorks";
import ImpactStatsSection from "@/components/ImpactStatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";
import EventsHubSection from "@/components/EventsHubSection";
import FAQSection from "@/components/FAQSection";
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
        description:
          "Plateforme phygitale de recyclage à Kara, Togo : digitalisation des tournées de collecte, rachat de plastiques au kg, alerte dépotoir, formations vertes.",
        address: { "@type": "PostalAddress", addressLocality: "Kara", addressCountry: "TG" },
        telephone: "+22897684030",
        areaServed: "Kara, Togo",
        url: "https://recychubtogo.com",
      },
    ],
  };

  return (
    <div className="pb-16 lg:pb-0">
      <SEO
        title="RECYC HUB TOGO — Une ville propre, des revenus pour tous"
        description="Plateforme phygitale à Kara : digitalisez vos tournées de collecte, vendez vos plastiques au kg, signalez les dépotoirs, formez-vous aux métiers verts."
        path="/"
        jsonLd={jsonLd}
      />
      <HeroSection />
      <ActionsBento />
      <ManifestoSection />
      <HowItWorks />
      <ImpactStatsSection />
      <TestimonialsSection />
      <EventsHubSection />
      <PartnersSection />
      <FAQSection />
      <CTASection />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
