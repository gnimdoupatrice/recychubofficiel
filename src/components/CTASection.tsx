import { ArrowUpRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => (
  <section className="relative bg-foreground text-background py-24 md:py-32 px-6 md:px-12 lg:px-24 font-inter overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative max-w-4xl mx-auto text-center"
    >
      <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
        Passez à l'action
      </span>
      <h2 className="mt-6 font-editorial font-bold text-4xl md:text-6xl leading-[1.05]">
        Rejoignez le mouvement{" "}
        <span className="italic text-primary">pour un Togo plus propre</span>.
      </h2>
      <p className="mt-8 text-background/70 font-light text-lg leading-relaxed max-w-2xl mx-auto">
        Ménages, entreprises, collectivités&nbsp;: RECYC HUB TOGO vous donne
        les outils pour transformer chaque déchet en valeur. Commencez
        aujourd'hui.
      </p>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/vendre"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Vendre mes plastiques
          <ArrowUpRight className="w-4 h-4" />
        </Link>
        <Link
          to="/enlevement"
          className="inline-flex items-center gap-2 border border-background/30 px-7 py-3.5 rounded-sm font-semibold text-sm hover:bg-background/10 transition-colors"
        >
          Demander un enlèvement
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <a
        href="tel:+22897684030"
        className="mt-10 inline-flex items-center gap-2 text-background/60 hover:text-background transition-colors text-sm border-b border-background/20 hover:border-background pb-1"
      >
        <Phone className="w-4 h-4" />
        +228 97 68 40 30
      </a>
    </motion.div>
  </section>
);

export default CTASection;
