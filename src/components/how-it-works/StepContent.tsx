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

const StepContent = ({
  steps,
  activeStep,
  setActiveStep,
  ctaLabel,
  ctaLink,
}: StepContentProps) => {
  const current = steps[activeStep];
  const Icon = current.icon;
  const isLast = activeStep === steps.length - 1;

  return (
    <div className="bg-background rounded-[2rem] overflow-hidden border border-border shadow-[0_30px_70px_-40px_hsl(var(--foreground)/0.25)]">
      <div className="grid md:grid-cols-5">
        {/* Visual side */}
        <div className="md:col-span-2 relative bg-primary/8 flex items-center justify-center p-10 md:p-12 min-h-[280px] overflow-hidden">
          <span className="absolute top-6 left-6 font-black text-[7rem] md:text-[9rem] text-primary/10 leading-none select-none">
            {current.step}
          </span>
          <img
            src={current.image}
            alt={current.title}
            loading="lazy"
            width={512}
            height={512}
            className="relative w-44 h-44 md:w-60 md:h-60 object-contain transition-all duration-500"
          />
        </div>

        {/* Content side */}
        <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Étape {current.step}
            </span>
          </div>

          <h3 className="font-black text-2xl md:text-3xl text-foreground mb-3 leading-tight">
            {current.title}
          </h3>
          <p className="text-muted-foreground text-base md:text-lg mb-6">
            {current.shortDesc}
          </p>

          <ul className="space-y-3 mb-8">
            {current.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground/85 text-[15px] leading-relaxed">
                  {detail}
                </span>
              </li>
            ))}
          </ul>

          {/* Mobile dots */}
          <div className="flex md:hidden gap-2 mb-6">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  i === activeStep ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>

          {isLast ? (
            <Link to={ctaLink} className="btn-cta px-7 py-3.5 self-start">
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              onClick={() => setActiveStep(activeStep + 1)}
              className="btn-cta px-7 py-3.5 self-start"
            >
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
