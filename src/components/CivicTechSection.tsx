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
    className="relative bg-muted/40 py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
  >
    <div className="max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-black text-sm">
            02
          </span>
          <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary">
            Civic Tech
          </span>
        </div>
        <h2 className="font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05] tracking-tight mb-6">
          Rendre visibles{" "}
          <span className="text-accent">les dépotoirs invisibles</span>.
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Chaque citoyen devient capteur de l'état réel de sa ville. En
          signalant un dépotoir sauvage, vous nourrissez une cartographie
          ouverte qui guide l'intervention des autorités locales et de nos
          équipes de terrain.
        </p>
      </div>

      {/* Pillars: horizontal cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-14">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-background rounded-3xl p-7 border border-border hover:border-primary/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
              <p.icon className="w-6 h-6" />
            </div>
            <div className="font-black text-xl text-foreground mb-2">
              {p.title}
            </div>
            <div className="text-[15px] text-muted-foreground leading-relaxed">
              {p.desc}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Visual band with overlay stats */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-[2rem] overflow-hidden"
      >
        <img
          src={heroImg}
          alt="Citoyen signalant un dépotoir sauvage avec géolocalisation"
          loading="lazy"
          width={1600}
          height={1024}
          className="w-full h-[320px] md:h-[440px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-transparent" />

        {/* Alert badge */}
        <div className="absolute top-6 right-6 inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full shadow-lg">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-xs font-bold tracking-wider uppercase">
            Alerte en cours
          </span>
        </div>

        {/* Stats + CTA on image */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="grid grid-cols-3 gap-6 md:gap-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-black text-3xl md:text-5xl text-background leading-none">
                    {s.value}
                  </div>
                  <div className="text-[11px] md:text-xs text-background/80 mt-2 leading-tight uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/alerte" className="btn-cta px-6 py-3">
                Signaler un dépotoir
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/alerte#carte"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-background/15 backdrop-blur text-background border border-background/30 hover:bg-background/25 transition-colors"
              >
                Voir la carte
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CivicTechSection;
