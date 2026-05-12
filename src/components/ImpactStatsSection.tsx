import { motion } from "framer-motion";

const stats = [
  { value: "2 500+", label: "kg de plastiques collectés", note: "Depuis le lancement à Kara" },
  { value: "850+", label: "ménages desservis", note: "Abonnements actifs" },
  { value: "320+", label: "alertes citoyennes traitées", note: "Civic Tech" },
  { value: "+450", label: "apprenants certifiés", note: "Green Academy" },
];

const ImpactStatsSection = () => (
  <section
    id="impact"
    className="bg-foreground text-background py-20 md:py-28 px-6 md:px-12 lg:px-24 font-inter"
  >
    <div className="max-w-6xl mx-auto">
      <div className="mb-14 md:mb-16 max-w-2xl">
        <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
          Notre impact
        </span>
        <h2 className="mt-6 font-editorial font-bold text-3xl md:text-4xl leading-tight">
          Des chiffres qui mesurent{" "}
          <span className="italic text-primary">le changement</span>.
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-background/10 border-y border-background/10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="bg-foreground p-6 md:p-8"
          >
            <div className="font-editorial font-bold text-4xl md:text-5xl lg:text-6xl text-primary leading-none mb-3">
              {s.value}
            </div>
            <div className="text-sm md:text-base font-semibold text-background mb-1">
              {s.label}
            </div>
            <div className="text-xs text-background/55 font-light">{s.note}</div>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-xs text-background/45 italic font-light">
        Indicateurs consolidés au 1er trimestre 2026 — données opérationnelles
        RECYC HUB TOGO.
      </p>
    </div>
  </section>
);

export default ImpactStatsSection;
