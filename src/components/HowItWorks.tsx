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
    <section className="bg-[hsl(150_14%_97%)] py-24 md:py-32 px-6 md:px-12 lg:px-24 font-inter">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 text-center max-w-2xl mx-auto">
          <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
            Mode d'emploi
          </span>
          <h2 className="mt-6 font-editorial font-bold text-4xl md:text-5xl text-foreground leading-tight">
            Comment ça{" "}
            <span className="italic text-primary">marche</span> ?
          </h2>
          <p className="mt-6 text-muted-foreground font-light text-lg italic">
            Choisissez un service et suivez le parcours en quatre étapes.
          </p>
        </div>

        <ServiceTabs
          services={services}
          activeService={activeService}
          onSelect={handleServiceChange}
        />

        <div className="text-center mb-10">
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg italic font-light">
            {currentService.intro}
          </p>
        </div>

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
