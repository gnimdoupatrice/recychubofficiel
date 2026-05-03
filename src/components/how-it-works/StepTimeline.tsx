import type { Step } from "./serviceData";

interface StepTimelineProps {
  steps: Step[];
  activeStep: number;
  onSelect: (index: number) => void;
}

const StepTimeline = ({ steps, activeStep, onSelect }: StepTimelineProps) => {
  return (
    <div className="hidden md:flex items-center justify-between mb-12 px-8">
      {steps.map((s, i) => (
        <div key={s.step} className="flex items-center flex-1 last:flex-none">
          <button
            onClick={() => onSelect(i)}
            className={`relative flex flex-col items-center group cursor-pointer transition-all duration-200 ${
              activeStep === i ? "scale-105" : "opacity-60 hover:opacity-100"
            }`}
          >
            <div
              className={`w-14 h-14 flex items-center justify-center border-2 transition-all duration-200 ${
                activeStep === i
                  ? "bg-primary text-primary-foreground border-foreground"
                  : "bg-background text-foreground border-foreground"
              }`}
              style={{
                boxShadow: activeStep === i ? "4px 4px 0 0 hsl(var(--foreground))" : "2px 2px 0 0 hsl(var(--foreground))",
              }}
            >
              <s.icon className="w-6 h-6" />
            </div>
            <span
              className={`mt-3 text-[10px] font-extrabold uppercase tracking-[0.18em] transition-colors ${
                activeStep === i ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Étape {s.step}
            </span>
          </button>
          {i < steps.length - 1 && (
            <div className="flex-1 mx-4 h-0.5 relative">
              <div className="absolute inset-0 bg-foreground/20" />
              <div
                className="absolute inset-y-0 left-0 bg-primary transition-all duration-500"
                style={{ width: i < activeStep ? "100%" : "0%" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepTimeline;
