import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-20 md:py-28 hero-gradient">
      <div className="container text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
          Rejoignez le mouvement pour un Togo plus propre et plus vert.
        </h2>
        <p className="text-primary-foreground/70 mb-8 text-lg">
          Ensemble, transformons nos déchets en opportunités et construisons un avenir durable.
        </p>
        <Button variant="hero" size="lg" className="text-base px-10 py-6 h-auto">
          Créer un compte
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
