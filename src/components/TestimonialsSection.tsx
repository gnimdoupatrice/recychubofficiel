import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Afia K.",
    commune: "Kozah 2",
    role: "Ménagère",
    text: "Grâce à RECYC HUB TOGO, je vends mes bouteilles plastiques chaque semaine. C'est un vrai complément de revenu pour ma famille — le paiement est immédiat.",
  },
  {
    name: "Koffi M.",
    commune: "Kozah 1",
    role: "Commerçant",
    text: "L'enlèvement de déchets est rapide et ponctuel. Mon quartier est plus propre depuis que j'utilise la plateforme. Je recommande à tous mes voisins.",
  },
  {
    name: "Esi A.",
    commune: "Kozah 3",
    role: "Étudiante",
    text: "La Green Academy m'a permis de comprendre l'économie circulaire. Je rêve maintenant de créer ma propre entreprise de recyclage à Kara.",
  },
];

const TestimonialsSection = () => (
  <section className="band-plain py-24 md:py-32 px-6 md:px-12 lg:px-24 font-inter">
    <div className="max-w-6xl mx-auto">
      <div className="mb-16 md:mb-20 max-w-2xl">
        <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
          Voix de la communauté
        </span>
        <h2 className="mt-6 font-editorial font-bold text-4xl md:text-5xl text-foreground leading-tight">
          Ce que disent celles et ceux{" "}
          <span className="italic text-primary">qui agissent</span>.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-foreground/10 border-y border-foreground/10">
        {testimonials.map((t, i) => (
          <motion.article
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-white p-8 md:p-10 flex flex-col"
          >
            <Quote className="w-8 h-8 text-primary/30 mb-6" strokeWidth={1.5} />
            <p className="font-editorial text-xl md:text-[1.4rem] text-foreground leading-snug mb-8 flex-1 italic">
              « {t.text} »
            </p>
            <div className="flex items-center gap-4 pt-6 border-t border-foreground/10">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-editorial font-bold text-lg">
                {t.name[0]}
              </div>
              <div>
                <div className="font-semibold text-sm text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground tracking-wide">
                  {t.role} · {t.commune}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
