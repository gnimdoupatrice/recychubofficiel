import { ArrowRight, ShoppingBag, Phone, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => (
  <section className="relative py-20 md:py-28 bg-foreground overflow-hidden">
    {/* Pattern de blocs en fond */}
    <div
      className="absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--background)) 2px, transparent 2px), linear-gradient(90deg, hsl(var(--background)) 2px, transparent 2px)",
        backgroundSize: "40px 40px",
      }}
    />

    <div className="relative container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-6">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.25em] text-foreground bg-secondary border-2 border-secondary px-3 py-1">
            Rejoignez le mouvement
          </span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl lg:text-5xl font-extrabold text-background tracking-tight mb-4 leading-tight uppercase">
          Pour un Togo
          <br />
          <span className="bg-secondary text-secondary-foreground px-3 inline-block mt-2 border-2 border-secondary">
            plus propre
          </span>
        </h2>
        <p className="text-background/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10 mt-6">
          Que vous soyez un ménage, une entreprise ou une collectivité, RecycHub Togo vous offre les outils pour transformer vos déchets en valeur. Commencez dès aujourd'hui.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10">
          <Link
            to="/vendre"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-secondary text-secondary-foreground border-2 border-background font-extrabold text-xs uppercase tracking-[0.18em] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]"
            style={{ boxShadow: "5px 5px 0 0 hsl(var(--background))" }}
          >
            <ShoppingBag className="w-5 h-5" />
            Vendre mes plastiques
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/enlevement"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-background border-2 border-background font-extrabold text-xs uppercase tracking-[0.18em] transition-all duration-200 hover:bg-background hover:text-foreground hover:translate-x-[-2px] hover:translate-y-[-2px]"
            style={{ boxShadow: "5px 5px 0 0 hsl(var(--background))" }}
          >
            <Truck className="w-5 h-5" />
            Demander un enlèvement
          </Link>
        </div>

        <a
          href="tel:+22897684030"
          className="inline-flex items-center gap-2 text-background/70 hover:text-background transition-colors text-xs uppercase tracking-[0.15em] font-bold"
        >
          <Phone className="w-4 h-4" />
          +228 97 68 40 30
        </a>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
