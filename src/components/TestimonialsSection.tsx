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

const TestimonialsSection = () => (
  <section className="wp-section wp-section-glow-secondary">
    <div className="container mx-auto px-4">
      <div className="wp-section-header center">
        <span className="wp-eyebrow">Témoignages</span>
        <h2 className="wp-section-title">
          La communauté <span className="text-secondary">témoigne</span>
        </h2>
        <p className="wp-section-subtitle">
          Des centaines de familles à Kara font déjà confiance à RECYC HUB TOGO.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <article key={i} className="wp-card p-7 flex flex-col">
            <Quote className="w-8 h-8 text-primary mb-4" />
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 fill-secondary text-secondary" />
              ))}
            </div>
            <p className="text-foreground/85 mb-6 text-sm leading-relaxed flex-1">"{t.text}"</p>
            <div className="flex items-center gap-3 pt-5 border-t-2 border-foreground/10">
              <div className="w-11 h-11 bg-primary text-primary-foreground flex items-center justify-center font-extrabold text-base border-2 border-foreground">
                {t.name[0]}
              </div>
              <div>
                <div className="font-bold text-sm text-foreground uppercase tracking-wide">{t.name}</div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-wider">
                  {t.role} — {t.commune}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
