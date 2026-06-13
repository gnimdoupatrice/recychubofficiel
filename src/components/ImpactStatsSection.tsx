import { motion } from "framer-motion";

const stats = [
  { value: "2 500+", label: "kg de plastiques collectés", note: "Depuis le lancement à Kara" },
  { value: "850+", label: "ménages desservis", note: "Abonnements actifs" },
  { value: "320+", label: "alertes citoyennes traitées", note: "Civic Tech" },
  { value: "+450", label: "apprenants certifiés", note: "Green Academy" },
];

const ImpactStatsSection = () => (
  <section id="impact" className="bg-sage py-20 md:py-28 px-6 md:px-12 lg:px-24">
    <div className="max-w-6xl mx-auto">
      <div className="mb-14 max-w-2xl">
        <span className="section-badge-primary">Notre impact</span>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight text-foreground">
          Des chiffres qui mesurent <span className="text-primary">le changement</span>.
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="bg-background rounded-2xl p-6 md:p-8 border border-border"
          >
            <div className="text-4xl md:text-5xl font-extrabold text-primary leading-none mb-3">
              {s.value}
            </div>
            <div className="text-sm md:text-base font-bold text-foreground mb-1">{s.label}</div>
            <div className="text-xs text-muted-foreground">{s.note}</div>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Indicateurs consolidés au 1er trimestre 2026 — données opérationnelles RECYC HUB TOGO.
      </p>
    </div>
  </section>
);

export default ImpactStatsSection;
