import { ArrowRight, Phone, Truck, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => (
  <section className="gradient-cta relative text-primary-foreground py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
    <div className="absolute -top-1/3 -left-20 w-[40rem] h-[40rem] rounded-full bg-secondary/25 blur-[120px] pointer-events-none" />
    <div className="absolute -bottom-1/3 -right-20 w-[36rem] h-[36rem] rounded-full bg-primary/40 blur-[120px] pointer-events-none" />
    <div
      className="absolute inset-0 opacity-[0.08] pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(white 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative max-w-5xl mx-auto text-left"
    >
      <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-white/15">
        Passez à l'action
      </span>
      <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] max-w-3xl">
        Rejoignez le mouvement pour un Togo plus propre.
      </h2>
      <p className="mt-6 text-primary-foreground/80 text-lg leading-relaxed max-w-2xl">
        Ménages, entreprises, collectivités : transformez chaque déchet en valeur avec RECYC HUB TOGO.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Link
          to="/enlevement"
          className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-3.5 rounded-full font-bold text-sm hover:translate-y-[-2px] transition-transform shadow-lg"
        >
          <Truck className="w-4 h-4" />
          Commander un enlèvement
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/vendre"
          className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/10 transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          Vendre mes plastiques
        </Link>
      </div>

      <a
        href="tel:+22897684030"
        className="mt-8 inline-flex items-center gap-2 text-primary-foreground/70 hover:text-white transition-colors text-sm"
      >
        <Phone className="w-4 h-4" />
        +228 97 68 40 30
      </a>
    </motion.div>
  </section>
);

export default CTASection;
