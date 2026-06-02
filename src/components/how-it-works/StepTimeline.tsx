import type { Step } from "./serviceData";

interface StepTimelineProps {
  steps: Step[];
  activeStep: number;
  onSelect: (index: number) => void;
}

const StepTimeline = ({ steps, activeStep, onSelect }: StepTimelineProps) => {
  return (
    <div className="hidden md:grid grid-cols-4 gap-3 mb-6">
      {steps.map((s, i) => {
        const isActive = i === activeStep;
        const isPast = i < activeStep;
        return (
          <button
            key={s.step}
            onClick={() => onSelect(i)}
            className={`group text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
              isActive
                ? "bg-background border-primary shadow-[0_18px_40px_-18px_hsl(var(--primary)/0.4)]"
                : "bg-background/60 border-transparent hover:border-border"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-black text-xs transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isPast
                    ? "bg-primary/15 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s.step}
              </span>
              <s.icon
                className={`w-5 h-5 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
            </div>
            <div
              className={`text-sm font-bold leading-snug ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {s.title}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default StepTimeline;
