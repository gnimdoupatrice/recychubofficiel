import { LayoutDashboard, Recycle, Bell, GraduationCap, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const heroSolution = {
  icon: LayoutDashboard,
  badge: "Solution Pro B2B",
  name: "La plateforme qui pilote les tournées de collecte",
  desc: "Un outil de gestion phygital pensé pour les entreprises de pré-collecte : coordination des équipes, optimisation des itinéraires, suivi en temps réel des ménages desservis et reporting d'impact. Fini la collecte à l'aveugle.",
  bullets: [
    "Planification & optimisation des tournées",
    "Suivi temps réel des collecteurs sur le terrain",
    "Tableau de bord de performance & reporting",
    "Gestion des abonnements ménages & facturation",
  ],
  href: "/solution-pro",
  cta: "Découvrir Solution Pro",
};

const solutions = [
  {
    icon: Recycle,
    number: "01",
    name: "Système de rachat",
    desc: "Vendez vos plastiques au kilo (PET, PEHD, PP, PVC) à des tarifs transparents — paiement immédiat ou à l'enlèvement.",
    href: "/vendre",
    cta: "Voir les tarifs",
  },
  {
    icon: Bell,
    number: "02",
    name: "Alerte dépotoirs",
    desc: "Signalement citoyen et cartographie dynamique des points noirs pour rendre visible l'invisible et déclencher l'action.",
    href: "/alerte",
    cta: "Signaler un dépotoir",
  },
  {
    icon: GraduationCap,
    number: "03",
    name: "Green Academy",
    desc: "Formation, sensibilisation et certification des acteurs du recyclage pour bâtir une culture durable du tri.",
    href: "/academy",
    cta: "Explorer l'Academy",
  },
];

const SolutionsSection = () => (
  <section
    id="solutions"
    className="bg-muted py-24 md:py-32 px-6 md:px-12 lg:px-24 font-inter"
  >
    <div className="max-w-6xl mx-auto">
      <div className="mb-16 md:mb-20 max-w-3xl">
        <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
          Nos Solutions
        </span>
        <h2 className="mt-6 font-editorial font-bold text-4xl md:text-5xl text-foreground leading-tight">
          Notre réponse, un{" "}
          <span className="italic text-primary">écosystème complet</span>.
        </h2>
        <p className="mt-6 text-muted-foreground font-light text-lg">
          Au cœur du dispositif : une plateforme de pilotage pour les
          entreprises de collecte, complétée par trois services pour les
          ménages, les citoyens et les acteurs du tri.
        </p>
      </div>

      {/* Hero — Solution Pro (B2B) */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-foreground text-background rounded-sm p-8 md:p-12 lg:p-16 mb-10 md:mb-14 shadow-[20px_20px_0_0_hsl(var(--primary)/0.18)] grid md:grid-cols-5 gap-10 items-center"
      >
        <div className="md:col-span-3">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <heroSolution.icon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-background/70">
              {heroSolution.badge}
            </span>
          </div>
          <h3 className="font-editorial font-bold text-3xl md:text-4xl leading-tight mb-5">
            {heroSolution.name}
          </h3>
          <p className="text-[15px] md:text-base text-background/80 leading-relaxed font-light mb-8 max-w-xl">
            {heroSolution.desc}
          </p>
          <Link
            to={heroSolution.href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-background border-b border-background/40 pb-1 hover:border-background transition-colors"
          >
            {heroSolution.cta}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <ul className="md:col-span-2 space-y-3 md:border-l md:border-background/15 md:pl-10">
          {heroSolution.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-background/85">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </motion.article>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
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
              <h3 className="font-editorial font-bold text-xl md:text-2xl text-foreground leading-snug mb-3">
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
