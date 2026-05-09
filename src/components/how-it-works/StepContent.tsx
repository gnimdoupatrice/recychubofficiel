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
    <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden">
      <div className="grid md:grid-cols-2">
        {/* Left: Image */}
        <div className="relative bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center p-8 md:p-12 min-h-[300px]">
          <div className="absolute top-4 left-4 md:top-6 md:left-6">
            <span className="text-6xl md:text-8xl font-display font-black text-primary/10">
              {current.step}
            </span>
          </div>
          <img
            src={current.image}
            alt={current.title}
            loading="lazy"
            width={512}
            height={512}
            className="w-48 h-48 md:w-64 md:h-64 object-contain relative z-10 transition-all duration-500"
          />
        </div>

        {/* Right: Content */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${current.color} flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Étape {current.step}
            </span>
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            {current.title}
          </h3>
          <p className="text-muted-foreground text-lg mb-6">
            {current.shortDesc}
          </p>

          <ul className="space-y-3 mb-8">
            {current.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <span className="text-foreground/80">{detail}</span>
              </li>
            ))}
          </ul>

          {/* Mobile step dots */}
          <div className="flex md:hidden gap-2 mb-6">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`flex-1 h-2 rounded-full transition-all ${
                  i === activeStep ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>

          {activeStep === steps.length - 1 ? (
            <Link
              to={ctaLink}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] w-full sm:w-auto"
            >
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              onClick={() => setActiveStep(activeStep + 1)}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] w-full sm:w-auto"
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
