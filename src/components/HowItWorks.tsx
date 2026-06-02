import { useState } from "react";
import { services } from "./how-it-works/serviceData";
import ServiceTabs from "./how-it-works/ServiceTabs";
import StepContent from "./how-it-works/StepContent";
import StepTimeline from "./how-it-works/StepTimeline";

const HowItWorks = () => {
  const [activeService, setActiveService] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const currentService = services[activeService];

  const handleServiceChange = (index: number) => {
    setActiveService(index);
    setActiveStep(0);
  };

  return (
    <section className="relative bg-muted/40 py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-14">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-black text-sm">
              04
            </span>
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary">
              Mode d'emploi
            </span>
          </div>
          <h2 className="font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05] tracking-tight mb-6">
            Comment ça <span className="text-primary">marche</span> ?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Choisissez un service et suivez le parcours en quatre étapes —
            simple, traçable, conçu pour le terrain togolais.
          </p>
        </div>

        <ServiceTabs
          services={services}
          activeService={activeService}
          onSelect={handleServiceChange}
        />

        <div className="mt-10 md:mt-14 mb-8">
          <p className="text-foreground/80 max-w-3xl text-base md:text-lg leading-relaxed">
            {currentService.intro}
          </p>
        </div>

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
    </section>
  );
};

export default HowItWorks;
