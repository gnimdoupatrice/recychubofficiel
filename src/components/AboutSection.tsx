import { Clock, Target, Compass } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";

const AboutSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary flex items-center justify-center gap-2 mb-3">
            <span className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center text-[10px]">♻</span>
            À propos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Pourquoi <span className="text-gradient-emerald">RecycHub Togo</span> ?
          </h2>
        </div>

        {/* 2-column layout like reference */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Image with stat badge */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={aboutHero}
                alt="Équipe RecycHub collectant des plastiques au Togo"
                className="w-full h-[400px] lg:h-[520px] object-cover"
                loading="lazy"
                width={800}
                height={900}
              />
            </div>
            {/* Stat badge */}
            <div className="absolute bottom-6 left-6 bg-card rounded-2xl shadow-lg p-5 border border-border/60">
              <div className="font-display text-4xl font-bold text-primary">3</div>
              <div className="text-sm font-semibold text-foreground bg-primary/10 rounded-lg px-3 py-1 mt-1">
                Problèmes majeurs
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center">
            <p className="text-muted-foreground leading-relaxed mb-8 text-base">
              Au Togo, la gestion des déchets est un défi quotidien. La <strong className="text-foreground">précarité financière</strong> des 
              ménages les empêche de souscrire aux services de collecte. Par conséquent, les déchets finissent dans les rues et les 
              caniveaux — alors même que ces déchets, qui sont <strong className="text-foreground">une charge pour les ménages</strong>, 
              représentent <strong className="text-primary">une mine d'or pour les entreprises de recyclage</strong>. 
              De l'autre côté, les services de collecte manquent d'outils efficaces pour organiser leurs tournées.
            </p>

            {/* Mission */}
            <div className="flex gap-4 mb-6">
              <div className="w-12 h-12 rounded-full border-2 border-primary/30 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">Notre Mission</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Connecter les ménages, les collecteurs et les recycleurs grâce à une plateforme numérique 
                  qui transforme les déchets plastiques en revenus pour tous.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="flex gap-4 mb-6">
              <div className="w-12 h-12 rounded-full border-2 border-primary/30 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">Notre Vision</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Un Togo où chaque déchet plastique est valorisé, chaque citoyen est acteur du changement, 
                  et chaque quartier est propre et durable.
                </p>
              </div>
            </div>

            {/* Objectifs */}
            <div className="flex gap-4 mb-8">
              <div className="w-12 h-12 rounded-full border-2 border-primary/30 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">Nos Objectifs</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Démocratiser l'accès au recyclage, créer des emplois verts, digitaliser la collecte 
                  et bâtir une économie circulaire inclusive au Togo.
                </p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="/inscription"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-bio text-primary-foreground font-semibold transition-transform hover:scale-105 self-start"
            >
              En savoir plus
              <span className="text-lg">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
