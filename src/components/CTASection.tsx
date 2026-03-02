import { ArrowRight, ShoppingBag, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bio opacity-90" />
      <div className="relative container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
          Rejoignez le mouvement vert à Kara
        </h2>
        <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
          Plus de 300 familles nous font déjà confiance. Inscrivez-vous gratuitement et commencez à gagner de l'argent avec vos déchets plastiques.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/inscription"
            className="shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-background text-primary font-semibold text-lg transition-transform hover:scale-105"
          >
            S'inscrire gratuitement
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/vendre"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-lg transition-all hover:bg-primary-foreground/10"
          >
            <ShoppingBag className="w-5 h-5" />
            Vendre mes plastiques
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
