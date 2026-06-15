import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Comment vendre mes plastiques à RECYC HUB TOGO ?",
    a: "Identifiez le type de plastique (PET, PEHD, PP, PVC, mobilier, sachets), apportez-le à notre point de collecte à Kara ou demandez un enlèvement via la plateforme. Le paiement est immédiat, en cash ou en Mobile Money, selon le poids.",
  },
  {
    q: "Quels types de déchets achetez-vous et à quel prix ?",
    a: "Nous rachetons six familles de plastiques recyclables à des tarifs transparents allant de 20 à 100 FCFA/kg, plus le mobilier plastique vendu à la pièce. Le catalogue détaillé est disponible dans la section « Catalogue de rachat ».",
  },
  {
    q: "Comment fonctionne l'enlèvement de déchets ménagers ?",
    a: "Vous souscrivez à un abonnement, choisissez votre fréquence de passage, et notre équipe enlève vos déchets à domicile selon un planning optimisé. Vous suivez votre tournée en temps réel depuis l'application.",
  },
  {
    q: "Que se passe-t-il quand je signale un dépotoir sauvage ?",
    a: "Votre alerte géolocalisée est cartographiée et transmise aux autorités locales et à nos équipes d'intervention. Vous recevez une notification dès qu'une action est planifiée sur le site signalé.",
  },
  {
    q: "Les formations Green Academy sont-elles certifiantes ?",
    a: "Oui. Une partie de nos modules est gratuite et accessible à tous ; les parcours premium délivrent une certification reconnue à l'issue d'évaluations pratiques et théoriques.",
  },
  {
    q: "Intervenez-vous en dehors de Kara ?",
    a: "Notre opération est aujourd'hui pilote à Kara. Le déploiement progressif vers Lomé et les autres régions du Togo est planifié dès l'industrialisation de la plateforme Solution Pro.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="band-ice py-24 md:py-32 px-6 md:px-12 lg:px-24 font-inter"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 md:mb-20 max-w-3xl">
          <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
            Questions fréquentes
          </span>
          <h2 className="mt-6 font-editorial font-bold text-4xl md:text-5xl text-foreground leading-tight">
            Tout ce que vous voulez savoir,{" "}
            <span className="italic text-primary">en clair</span>.
          </h2>
          <p className="mt-6 text-muted-foreground font-light text-lg">
            Rachat, enlèvement, alerte dépotoir, formations : les réponses aux
            questions les plus posées par notre communauté.
          </p>
        </div>

        <div className="divide-y divide-foreground/10 border-y border-foreground/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-6 md:py-8 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-start gap-5">
                    <span className="font-editorial font-bold text-primary/40 text-lg md:text-xl tabular-nums shrink-0 mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-editorial font-bold text-xl md:text-2xl text-foreground leading-snug group-hover:text-primary transition-colors">
                      {f.q}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center transition-colors ${
                      isOpen
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent text-foreground"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 md:pb-10 pl-12 md:pl-16 pr-12 md:pr-16">
                        <p className="text-muted-foreground leading-relaxed font-light text-[15px] md:text-base max-w-3xl">
                          {f.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;