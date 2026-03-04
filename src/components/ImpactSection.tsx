import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 1250, suffix: "+", label: "Tonnes recyclées" },
  { value: 340, suffix: "", label: "Dépotoirs signalés" },
  { value: 820, suffix: "+", label: "Jeunes formés" },
  { value: 95, suffix: "", label: "Opportunités publiées" },
];

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
}

const ImpactSection = () => {
  return (
    <section id="impact" className="py-20 md:py-28 hero-gradient">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Résultats concrets</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">Impact National</h2>
          <p className="mt-4 text-primary-foreground/70">
            Des chiffres qui témoignent de notre engagement pour un Togo plus propre.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ value, suffix, label }) => {
            const { count, ref } = useCountUp(value);
            return (
              <div key={label} ref={ref} className="text-center p-6 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10">
                <div className="text-4xl md:text-5xl font-extrabold text-accent mb-2">
                  {count.toLocaleString()}{suffix}
                </div>
                <p className="text-sm font-medium text-primary-foreground/80">{label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
