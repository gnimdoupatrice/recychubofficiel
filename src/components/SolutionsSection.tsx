import { Truck, Recycle, Bell, GraduationCap, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const solutions = [
  {
    icon: Truck,
    number: "01",
    name: "Collecte intelligente",
    desc: "Tournées optimisées par les données : moins de carburant, plus d'impact, suivi en temps réel des flux de déchets.",
    href: "/enlevement",
    cta: "Demander un enlèvement",
  },
  {
    icon: Recycle,
    number: "02",
    name: "Système de rachat",
    desc: "Vendez vos plastiques au kilo (PET, PEHD, PP, PVC) à des tarifs transparents — paiement immédiat ou à l'enlèvement.",
    href: "/vendre",
    cta: "Voir les tarifs",
  },
  {
    icon: Bell,
    number: "03",
    name: "Alerte dépotoirs",
    desc: "Signalement citoyen et cartographie dynamique des points noirs pour rendre visible l'invisible et déclencher l'action.",
    href: "/alerte",
    cta: "Signaler un dépotoir",
  },
  {
    icon: GraduationCap,
    number: "04",
    name: "Green Academy",
    desc: "Formation, sensibilisation et certification des acteurs du recyclage pour bâtir une culture durable du tri.",
    href: "/academy",
    cta: "Explorer l'Academy",
  },
];

const SolutionsSection = () => (
  <section
    id="solutions"
    className="bg-[hsl(150_14%_97%)] py-24 md:py-32 px-6 md:px-12 lg:px-24 font-inter"
  >
    <div className="max-w-6xl mx-auto">
      <div className="mb-16 md:mb-20 max-w-3xl">
        <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
          Nos Solutions
        </span>
        <h2 className="mt-6 font-editorial font-bold text-4xl md:text-5xl text-foreground leading-tight">
          Quatre piliers, un{" "}
          <span className="italic text-primary">écosystème complet</span>.
        </h2>
        <p className="mt-6 text-muted-foreground font-light text-lg">
          Chaque solution s'articule avec les autres pour boucler la chaîne de
          valeur : du ménage au recycleur, du citoyen à la collectivité.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {solutions.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative bg-white border border-foreground/10 p-8 md:p-10 rounded-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[14px_14px_0_0_hsl(var(--primary)/0.10)]"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-primary/10 text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-editorial font-bold text-3xl text-primary/20">
                  {s.number}
                </span>
              </div>
              <h3 className="font-editorial font-bold text-2xl text-foreground leading-snug mb-3">
                {s.name}
              </h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed font-light mb-6">
                {s.desc}
              </p>
              <Link
                to={s.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary border-b border-primary/30 pb-1 hover:border-primary transition-colors"
              >
                {s.cta}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);

export default SolutionsSection;
