import { ArrowRight, ShoppingBag, Phone, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => (
  <section className="relative py-20 md:py-28 overflow-hidden">
    {/* Background — dual-tone gradient for distinction */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-95" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(42_92%_55%_/_0.15)_0%,_transparent_60%)]" />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

    <div className="relative container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-2xl sm:text-3xl lg:text-5xl font-extrabold text-primary-foreground tracking-tight mb-4 leading-tight">
          Rejoignez le mouvement
          <br />
          <span className="text-white/80">pour un Togo plus propre</span>
        </h2>
        <p className="text-primary-foreground/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10">
          Que vous soyez un ménage, une entreprise ou une collectivité, RecycHub Togo vous offre les outils pour transformer vos déchets en valeur. Commencez dès aujourd'hui.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            to="/vendre"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white text-primary font-bold text-sm uppercase tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
          >
            <ShoppingBag className="w-5 h-5" />
            Vendre mes plastiques
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/enlevement"
            className="group inline-flex items-center gap-2 px-6 py-4 rounded-xl border-2 border-white/40 text-primary-foreground font-semibold text-sm uppercase tracking-wide transition-all duration-300 hover:bg-white/10 hover:border-white/60"
          >
            <Truck className="w-5 h-5" />
            Demander un enlèvement
          </Link>
        </div>

        <a
          href="tel:+22897684030"
          className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm"
        >
          <Phone className="w-4 h-4" />
          Appelez-nous : +228 97 68 40 30
        </a>
      </motion.div>
    </div>
  </section>
);

export default CTASection;