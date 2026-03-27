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
            className={`relative flex flex-col items-center group cursor-pointer transition-all duration-300 ${
              activeStep === i ? "scale-110" : "opacity-60 hover:opacity-100"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                activeStep === i
                  ? "bg-gradient-to-br " + s.color + " text-primary-foreground shadow-primary/30"
                  : "bg-card border border-border text-muted-foreground group-hover:border-primary/50"
              }`}
            >
              <s.icon className="w-6 h-6" />
            </div>
            <span
              className={`mt-2 text-xs font-bold transition-colors ${
                activeStep === i ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Étape {s.step}
            </span>
          </button>
          {i < steps.length - 1 && (
            <div className="flex-1 mx-4 h-0.5 relative">
              <div className="absolute inset-0 bg-border rounded-full" />
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
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
