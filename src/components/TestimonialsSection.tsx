import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Afia K.",
    commune: "Kozah 2",
    role: "Ménagère",
    text: "Grâce à RecycHub, je vends mes bouteilles plastiques chaque semaine. C'est un vrai complément de revenu pour ma famille. Le paiement est immédiat !",
  },
  {
    name: "Koffi M.",
    commune: "Kozah 1",
    role: "Commerçant",
    text: "L'enlèvement de déchets est rapide et ponctuel. Mon quartier est plus propre depuis que j'utilise la plateforme. Je recommande à tous.",
  },
  {
    name: "Esi A.",
    commune: "Kozah 3",
    role: "Étudiante",
    text: "La Green Academy m'a permis de comprendre l'économie circulaire. Je rêve maintenant de créer mon entreprise de recyclage !",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-spacing bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Témoignages
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-4">
            La communauté <span className="text-gradient-emerald">témoigne</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Des centaines de familles à Kara font déjà confiance à RECYC HUB TOGO.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl glass group hover:glow-emerald transition-all duration-300"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <Quote className="w-6 h-6 text-primary/20 mb-3" />
              <p className="text-foreground/80 mb-5 text-sm leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full gradient-bio flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role} — {t.commune}
                  </div>
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
