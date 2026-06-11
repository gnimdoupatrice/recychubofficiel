import { motion } from "framer-motion";
import { Recycle, Home, MapPin, Coins, Building2 } from "lucide-react";

const stats = [
  { icon: Recycle, value: "2 540 t", label: "déchets collectés & valorisés" },
  { icon: Home, value: "850+", label: "ménages actifs" },
  { icon: MapPin, value: "320+", label: "dépotoirs signalés" },
  { icon: Coins, value: "48 M FCFA", label: "revenus générés" },
  { icon: Building2, value: "12", label: "communes couvertes" },
];

const ImpactStatsSection = () => (
  <section
    id="impact"
    className="relative gradient-hero py-16 md:py-20 px-6 md:px-12 lg:px-24 overflow-hidden"
  >
    <div className="max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-[11px] font-bold uppercase tracking-[0.18em]">
            Impact territorial
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black leading-tight text-white tracking-tight">
            Des données qui mesurent un changement réel.
          </h2>
        </div>
        <p className="text-white/70 text-sm max-w-xs">
          Indicateurs consolidés au 1er trimestre 2026 — opérations RECYHUB.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            className="rounded-2xl bg-white/[0.08] border border-white/15 backdrop-blur-md p-5 md:p-6 transition-colors hover:bg-white/[0.14]"
          >
            <s.icon className="w-6 h-6 text-secondary mb-4" />
            <div className="text-3xl md:text-4xl font-black text-white leading-none mb-2">
              {s.value}
            </div>
            <div className="text-xs md:text-sm text-white/70 leading-snug">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactStatsSection;
