import { ArrowRight, ShoppingBag, Phone, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => (
  <section className="wp-section wp-section-dark">
    {/* Pattern grille subtile */}
    <div className="absolute inset-0 opacity-[0.08] wp-grid-pattern" />
    <div className="relative container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-6">
          <span className="wp-eyebrow wp-eyebrow-light">Passez à l'action</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 leading-[1.05]">
          Rejoignez le mouvement
          <br />
          <span className="text-secondary">pour un Togo plus propre</span>
        </h2>
        <p className="text-primary-foreground/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10">
          Que vous soyez un ménage, une entreprise ou une collectivité, RecycHub Togo vous offre les outils pour transformer vos déchets en valeur. Commencez dès aujourd'hui.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            to="/vendre"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-[0.14em] border-2 border-secondary hover:bg-background hover:text-foreground hover:border-background transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Vendre mes plastiques
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/enlevement"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-transparent text-primary-foreground text-xs font-bold uppercase tracking-[0.14em] border-2 border-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors"
          >
            <Truck className="w-4 h-4" />
            Demander un enlèvement
          </Link>
        </div>

        <a
          href="tel:+22897684030"
          className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm border-b-2 border-primary-foreground/30 hover:border-primary-foreground pb-1"
        >
          <Phone className="w-4 h-4" />
          Appelez-nous : +228 97 68 40 30
        </a>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
