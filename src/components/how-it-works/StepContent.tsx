import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Step } from "./serviceData";

interface StepContentProps {
  steps: Step[];
  activeStep: number;
  setActiveStep: (step: number) => void;
  ctaLabel: string;
  ctaLink: string;
}

const StepContent = ({ steps, activeStep, setActiveStep, ctaLabel, ctaLink }: StepContentProps) => {
  const current = steps[activeStep];
  const Icon = current.icon;

  return (
    <div
      className="bg-card border-2 border-foreground overflow-hidden"
      style={{ boxShadow: "8px 8px 0 0 hsl(var(--foreground))" }}
    >
      <div className="grid md:grid-cols-2">
        {/* Left: Image */}
        <div className="relative bg-muted flex items-center justify-center p-8 md:p-12 min-h-[300px] border-b-2 md:border-b-0 md:border-r-2 border-foreground">
          <div className="absolute top-4 left-4 md:top-6 md:left-6">
            <span className="text-6xl md:text-8xl font-display font-black text-foreground/10">
              {current.step}
            </span>
          </div>
          <img
            src={current.image}
            alt={current.title}
            loading="lazy"
            width={512}
            height={512}
            className="w-48 h-48 md:w-64 md:h-64 object-contain relative z-10"
          />
        </div>

        {/* Right: Content */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 gb-icon-box">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary">
              Étape {current.step}
            </span>
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-foreground mb-3 uppercase tracking-wide">
            {current.title}
          </h3>
          <p className="text-muted-foreground text-base md:text-lg mb-6 leading-relaxed">
            {current.shortDesc}
          </p>

          <ul className="space-y-3 mb-8">
            {current.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-primary text-primary-foreground border-2 border-foreground flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <span className="text-foreground/80 text-sm leading-relaxed">{detail}</span>
              </li>
            ))}
          </ul>

          {/* Mobile step dots */}
          <div className="flex md:hidden gap-2 mb-6">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`flex-1 h-2 border-2 border-foreground transition-all ${
                  i === activeStep ? "bg-primary" : "bg-background"
                }`}
              />
            ))}
          </div>

          {activeStep === steps.length - 1 ? (
            <Link to={ctaLink} className="gb-btn w-full sm:w-auto">
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button onClick={() => setActiveStep(activeStep + 1)} className="gb-btn w-full sm:w-auto">
              Étape suivante
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepContent;
