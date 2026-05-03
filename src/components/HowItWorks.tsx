import { useState } from "react";
import { services } from "./how-it-works/serviceData";
import ServiceTabs from "./how-it-works/ServiceTabs";
import StepTimeline from "./how-it-works/StepTimeline";
import StepContent from "./how-it-works/StepContent";

const HowItWorks = () => {
  const [activeService, setActiveService] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const currentService = services[activeService];

  const handleServiceChange = (index: number) => {
    setActiveService(index);
    setActiveStep(0);
  };

  return (
    <section className="section-spacing bg-muted/20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="gb-eyebrow mb-4">Simple & Accessible</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mt-4 uppercase tracking-tight">
            Comment ça <span className="bg-primary text-primary-foreground px-2 inline-block border-2 border-primary">marche</span> ?
          </h2>
          <div className="gb-rule mx-auto mt-5" />
          <p className="text-muted-foreground max-w-lg mx-auto text-base mt-5 leading-relaxed">
            Choisissez un service et découvrez son fonctionnement en 4 étapes.
          </p>
        </div>

        {/* Service tabs */}
        <ServiceTabs
          services={services}
          activeService={activeService}
          onSelect={handleServiceChange}
        />

        {/* Service intro */}
        <div className="text-center mb-10">
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg italic">
            {currentService.intro}
          </p>
        </div>

        {/* Steps timeline + content */}
        <div className="max-w-6xl mx-auto">
          <StepTimeline
            steps={currentService.steps}
            activeStep={activeStep}
            onSelect={setActiveStep}
          />

          <StepContent
            steps={currentService.steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            ctaLabel={currentService.ctaLabel}
            ctaLink={currentService.ctaLink}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
