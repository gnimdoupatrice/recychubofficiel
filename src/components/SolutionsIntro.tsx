import { motion } from "framer-motion";

const services = [
  { num: "01", label: "Solution Pro" },
  { num: "02", label: "Achat de plastiques" },
  { num: "03", label: "CivicTech" },
  { num: "04", label: "Green Academy" },
];

const SolutionsIntro = () => (
  <section
    id="nos-solutions"
    aria-labelledby="nos-solutions-title"
    className="relative py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-muted/40"
  >
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs font-bold tracking-[0.24em] uppercase text-primary">
          Nos solutions
        </span>
        <h2
          id="nos-solutions-title"
          className="font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05] tracking-tight mt-5 mb-6"
        >
          Nos solutions face aux défis.
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl">
          Quatre leviers complémentaires pour transformer la gestion des
          déchets à Kara — du terrain à la donnée, de la collecte à
          l'éducation.
        </p>

        <ul className="mt-10 flex flex-wrap gap-3">
          {services.map((s) => (
            <li
              key={s.num}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border-2 border-foreground/15 bg-background text-foreground text-sm font-bold"
            >
              <span className="text-primary text-xs font-black tracking-wider">
                {s.num}
              </span>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </section>
);

export default SolutionsIntro;
