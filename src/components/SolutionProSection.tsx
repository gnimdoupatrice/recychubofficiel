import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Route as RouteIcon,
  Activity,
  BarChart3,
  CreditCard,
  CheckCircle2,
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
    className="relative min-h-screen bg-foreground text-background flex items-center py-24 md:py-32 px-6 md:px-12 lg:px-24 font-inter overflow-hidden"
  >
    <div
      className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />

    <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="lg:col-span-6"
      >
        <div className="flex items-center gap-4 mb-8">
          <span className="font-editorial font-bold text-7xl text-primary leading-none">
            01
          </span>
          <div className="h-px flex-1 bg-background/20" />
          <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-background/70">
            Solution Pro — B2B
          </span>
        </div>

        <h2 className="font-editorial font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
          La plateforme qui pilote{" "}
          <span className="italic text-primary">la collecte</span>.
        </h2>

        <p className="text-background/75 font-light text-lg leading-relaxed max-w-xl mb-10">
          Un outil de gestion phygital pensé pour les entreprises de
          pré-collecte, mairies et PME de l'assainissement. Coordination des
          équipes, optimisation des itinéraires, suivi terrain en temps réel et
          reporting d'impact — fini la collecte à l'aveugle.
        </p>

        <ul className="space-y-4 mb-10 max-w-xl">
          {features.map((f) => (
            <li key={f.label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sm bg-primary/15 text-primary flex items-center justify-center shrink-0">
                <f.icon className="w-5 h-5" />
              </div>
              <span className="text-base text-background/90 leading-snug pt-2">
                {f.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-3 gap-6 mb-10 max-w-xl border-y border-background/15 py-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-editorial font-bold text-3xl md:text-4xl text-primary">
                {s.value}
              </div>
              <div className="text-xs text-background/60 mt-1 leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/solution-pro"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Découvrir Solution Pro
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            to="/solution-pro#demo"
            className="inline-flex items-center gap-2 border border-background/30 px-6 py-3 rounded-sm font-semibold text-sm hover:bg-background/10 transition-colors"
          >
            Demander une démo
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="lg:col-span-6"
      >
        <div className="relative shadow-[20px_20px_0_0_hsl(var(--primary)/0.25)] rounded-sm overflow-hidden">
          <img
            src={heroImg}
            alt="Agent terrain consultant le tableau de bord Solution Pro"
            loading="lazy"
            width={1600}
            height={1024}
            className="w-full h-[420px] md:h-[560px] object-cover"
          />
          <div className="absolute bottom-6 left-6 bg-background text-foreground px-5 py-3 rounded-sm shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase">
                Pilote opérationnel à Kara
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default SolutionProSection;
