import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Route as RouteIcon,
  Activity,
  BarChart3,
  CreditCard,
} from "lucide-react";
import heroImg from "@/assets/solution-pro-hero.jpg";

const features = [
  { icon: RouteIcon, label: "Optimisation intelligente des tournées" },
  { icon: Activity, label: "Suivi temps réel des collecteurs" },
  { icon: BarChart3, label: "Tableau de bord & reporting d'impact" },
  { icon: CreditCard, label: "Gestion des abonnements & facturation" },
];

const stats = [
  { value: "−35%", label: "kilomètres parcourus" },
  { value: "+60%", label: "ménages desservis" },
  { value: "100%", label: "tournées tracées" },
];

const SolutionProSection = () => (
  <section
    id="solution-pro"
    className="relative bg-background py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
  >
    <div className="max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-black text-sm">
            01
          </span>
          <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary">
            Solution Pro · B2B
          </span>
        </div>
        <h2 className="font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05] tracking-tight mb-6">
          La plateforme qui pilote{" "}
          <span className="text-primary">la collecte</span>.
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Un outil de gestion phygital pensé pour les entreprises de
          pré-collecte, mairies et PME de l'assainissement. Coordination des
          équipes, optimisation des itinéraires, suivi terrain en temps réel et
          reporting d'impact — fini la collecte à l'aveugle.
        </p>
      </div>

      {/* Visual + floating stats */}
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-stretch mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 relative"
        >
          <div className="relative rounded-[2rem] overflow-hidden">
            <img
              src={heroImg}
              alt="Agent terrain consultant le tableau de bord Solution Pro"
              loading="lazy"
              width={1600}
              height={1024}
              className="w-full h-[360px] md:h-[520px] object-cover"
            />
          </div>
          {/* Floating stat chip */}
          <div className="absolute -bottom-8 left-6 right-6 md:left-10 md:right-auto md:max-w-md bg-background rounded-2xl shadow-[0_24px_60px_-24px_hsl(var(--foreground)/0.25)] p-5 md:p-6 border border-border">
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-black text-2xl md:text-3xl text-primary leading-none">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1.5 leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 flex flex-col justify-center pt-10 lg:pt-0"
        >
          <div className="space-y-3">
            {features.map((f, i) => (
              <div
                key={f.label}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-muted/60 hover:bg-primary/8 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-background text-primary flex items-center justify-center shrink-0 shadow-sm">
                  <f.icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-foreground text-[15px] leading-snug">
                  {f.label}
                </span>
                <span className="ml-auto text-[11px] font-bold text-muted-foreground tracking-widest">
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/solution-pro" className="btn-cta px-6 py-3">
              Découvrir Solution Pro
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/solution-pro#demo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border-2 border-foreground/15 text-foreground hover:border-foreground/40 transition-colors"
            >
              Demander une démo
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default SolutionProSection;
