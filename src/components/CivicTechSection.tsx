import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Camera, Map, BellRing, AlertTriangle } from "lucide-react";
import heroImg from "@/assets/civictech-hero.jpg";

const pillars = [
  {
    icon: Camera,
    title: "Signalement en 3 clics",
    desc: "Photo + géolocalisation automatique. L'alerte part en quelques secondes.",
  },
  {
    icon: Map,
    title: "Cartographie dynamique",
    desc: "Chaque dépotoir devient un point sur une carte ouverte aux autorités.",
  },
  {
    icon: BellRing,
    title: "Notifications d'intervention",
    desc: "Vous suivez l'évolution du site signalé jusqu'à sa résolution.",
  },
];

const stats = [
  { value: "320+", label: "alertes traitées" },
  { value: "84", label: "sites résolus" },
  { value: "12", label: "communautés actives" },
];

const CivicTechSection = () => (
  <section
    id="civic-tech"
    className="relative min-h-screen bg-[hsl(150_14%_97%)] flex items-center py-24 md:py-32 px-6 md:px-12 lg:px-24 font-inter overflow-hidden"
  >
    <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="lg:col-span-6 order-2 lg:order-1"
      >
        <div className="relative shadow-[-20px_20px_0_0_hsl(var(--primary)/0.18)] rounded-sm overflow-hidden">
          <img
            src={heroImg}
            alt="Citoyen signalant un dépotoir sauvage avec géolocalisation"
            loading="lazy"
            width={1600}
            height={1024}
            className="w-full h-[420px] md:h-[560px] object-cover"
          />
          <div className="absolute top-6 right-6 inline-flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-sm shadow-lg">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase">
              Alerte en cours
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="lg:col-span-6 order-1 lg:order-2"
      >
        <div className="flex items-center gap-4 mb-8">
          <span className="font-editorial font-bold text-7xl text-primary/15 leading-none">
            02
          </span>
          <div className="h-px flex-1 bg-foreground/15" />
          <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-primary">
            Civic Tech
          </span>
        </div>

        <h2 className="font-editorial font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05] mb-6">
          Rendre visibles{" "}
          <span className="italic text-primary">les dépotoirs invisibles</span>.
        </h2>

        <p className="text-muted-foreground font-light text-lg leading-relaxed max-w-xl mb-10">
          Chaque citoyen devient capteur de l'état réel de sa ville. En
          signalant un dépotoir sauvage, vous nourrissez une cartographie
          ouverte qui guide l'intervention des autorités locales et de nos
          équipes de terrain.
        </p>

        <div className="space-y-6 mb-10 max-w-xl">
          {pillars.map((p) => (
            <div key={p.title} className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-sm bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <p.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-editorial font-bold text-lg text-foreground mb-1">
                  {p.title}
                </div>
                <div className="text-[15px] text-muted-foreground font-light leading-relaxed">
                  {p.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mb-10 max-w-xl border-y border-foreground/10 py-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-editorial font-bold text-3xl md:text-4xl text-primary">
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1 leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/alerte"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Signaler un dépotoir
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            to="/alerte#carte"
            className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3 rounded-sm font-semibold text-sm hover:bg-foreground/5 transition-colors"
          >
            Voir la cartographie
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CivicTechSection;
