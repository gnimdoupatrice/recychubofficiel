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
          <span className="gb-eyebrow mb-4">Témoignages</span>
          <h2 className="gb-title mt-4">La communauté témoigne</h2>
          <div className="gb-rule mx-auto mt-5" />
          <p className="text-muted-foreground max-w-md mx-auto mt-5 text-sm">
            Des centaines de familles à Kara font déjà confiance à RECYC HUB TOGO.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="gb-block gb-block-hover p-6 relative">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <Quote className="w-6 h-6 text-foreground/20 mb-3" />
              <p className="text-foreground/80 mb-5 text-sm leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t-2 border-foreground">
                <div className="w-10 h-10 bg-primary text-primary-foreground border-2 border-foreground flex items-center justify-center font-extrabold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-extrabold text-xs uppercase tracking-wide text-foreground">{t.name}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
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
