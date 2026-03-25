import { Clock, Target, Compass, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import aboutHero from "@/assets/about-hero.jpg";

const AboutSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* 2-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left: Image composition */}
          <div className="relative">
            {/* Decorative background shape */}
            <div className="absolute -top-8 -left-8 w-[70%] h-[70%] rounded-3xl bg-primary/5 -z-10" />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={aboutHero}
                alt="Équipe RecycHub collectant des plastiques au Togo"
                className="w-full h-[380px] sm:h-[460px] lg:h-[560px] object-cover"
                loading="lazy"
                width={800}
                height={900}
              />
              {/* Gradient overlay bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating stat badge */}
            <div className="absolute -bottom-5 left-6 sm:left-10 bg-card rounded-2xl shadow-xl p-5 border border-border/40 backdrop-blur-sm">
              <div className="font-display text-5xl font-black text-primary leading-none">3</div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary-foreground bg-primary rounded-lg px-4 py-1.5 mt-2 text-center">
                Problèmes majeurs
              </div>
            </div>

            {/* Small decorative dot grid */}
            <div className="absolute -right-4 top-1/4 hidden lg:grid grid-cols-3 gap-1.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-primary/20" />
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center pt-6 lg:pt-0">
            {/* Section label */}
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary rounded-full" />
              À propos
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-[1.15] mb-6">
              Pourquoi{" "}
              <span className="text-gradient-emerald">RecycHub Togo</span> ?
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-10 text-[15px]">
              Au Togo, la <strong className="text-foreground">précarité financière</strong> des 
              ménages les empêche de souscrire aux services de collecte. Les déchets finissent dans les rues 
              — alors qu'ils représentent <strong className="text-primary">une mine d'or pour le recyclage</strong>. 
              Pendant ce temps, les services de collecte manquent d'outils pour organiser leurs tournées efficacement.
            </p>

            {/* Mission / Vision / Objectifs */}
            <div className="space-y-6 mb-10">
              {/* Mission */}
              <div className="group flex gap-5 items-start p-4 rounded-xl hover:bg-muted/60 transition-colors -ml-4">
                <div className="w-[52px] h-[52px] rounded-full border-2 border-primary/30 flex items-center justify-center shrink-0 group-hover:border-primary/60 group-hover:bg-primary/5 transition-all">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">Notre Mission</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Connecter ménages, collecteurs et recycleurs via une plateforme numérique 
                    qui transforme les déchets plastiques en revenus pour tous.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="group flex gap-5 items-start p-4 rounded-xl hover:bg-muted/60 transition-colors -ml-4">
                <div className="w-[52px] h-[52px] rounded-full border-2 border-primary/30 flex items-center justify-center shrink-0 group-hover:border-primary/60 group-hover:bg-primary/5 transition-all">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">Notre Vision</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Un Togo où chaque déchet est valorisé, chaque citoyen est acteur du changement 
                    et chaque quartier est propre et durable.
                  </p>
                </div>
              </div>

              {/* Objectifs */}
              <div className="group flex gap-5 items-start p-4 rounded-xl hover:bg-muted/60 transition-colors -ml-4">
                <div className="w-[52px] h-[52px] rounded-full border-2 border-primary/30 flex items-center justify-center shrink-0 group-hover:border-primary/60 group-hover:bg-primary/5 transition-all">
                  <Compass className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">Nos Objectifs</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Démocratiser l'accès au recyclage, créer des emplois verts, digitaliser la collecte 
                    et bâtir une économie circulaire inclusive.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/inscription"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full gradient-bio text-primary-foreground font-bold text-sm uppercase tracking-wide transition-all hover:scale-105 hover:shadow-lg self-start"
            >
              En savoir plus
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
