import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Afia K.",
    commune: "Kozah 2",
    text: "Grâce à RecycHub, je vends mes bouteilles plastiques chaque semaine. Un vrai complément de revenu pour ma famille !",
  },
  {
    name: "Koffi M.",
    commune: "Kozah 1",
    text: "L'enlèvement de déchets est rapide et ponctuel. Mon quartier est plus propre depuis que j'utilise la plateforme.",
  },
  {
    name: "Esi A.",
    commune: "Kozah 3",
    text: "La Green Academy m'a permis de comprendre l'économie circulaire. Je rêve maintenant d'un métier vert !",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Ce qu'ils <span className="text-gradient-emerald">disent</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl glass group hover:glow-emerald transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-accent/30 mb-4" />
              <p className="text-foreground/80 mb-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-bio flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.commune}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
