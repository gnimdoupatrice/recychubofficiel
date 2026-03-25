import { AlertTriangle, TrendingDown, Trash2, Target, Eye, Compass } from "lucide-react";

const constats = [
  {
    icon: TrendingDown,
    title: "Précarité financière",
    desc: "La majorité des ménages togolais n'ont pas les moyens de souscrire aux services de collecte de déchets, rendant la gestion des ordures impossible.",
  },
  {
    icon: Trash2,
    title: "Déchets dans les rues",
    desc: "Faute de solution accessible, les déchets finissent dans les rues, les caniveaux et les rivières — alors qu'ils représentent une mine d'or pour le recyclage.",
  },
  {
    icon: AlertTriangle,
    title: "Services désorganisés",
    desc: "Les entreprises de collecte manquent d'outils efficaces pour organiser leurs tournées et atteindre les ménages dans les quartiers reculés.",
  },
];

const missions = [
  {
    icon: Target,
    title: "Notre Mission",
    desc: "Connecter les ménages, les collecteurs et les recycleurs grâce à une plateforme numérique qui transforme les déchets plastiques en revenus pour tous.",
  },
  {
    icon: Eye,
    title: "Notre Vision",
    desc: "Un Togo où chaque déchet plastique est valorisé, chaque citoyen est acteur du changement, et chaque quartier est propre et durable.",
  },
  {
    icon: Compass,
    title: "Nos Objectifs",
    desc: "Démocratiser l'accès au recyclage, créer des emplois verts, digitaliser la collecte et bâtir une économie circulaire inclusive au Togo.",
  },
];

const AboutSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            À propos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-4 text-foreground">
            Pourquoi <span className="text-gradient-emerald">RecycHub Togo</span> ?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Au Togo, la gestion des déchets est un défi quotidien. Entre la précarité des ménages, 
            l'absence de solutions accessibles et la désorganisation des services de collecte, 
            des millions de tonnes de plastiques finissent dans nos rues chaque année — 
            alors qu'elles pourraient créer de la valeur.
          </p>
        </div>

        {/* Constat - 2 column layout inspired by reference */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left: Constat cards */}
          <div>
            <p className="text-sm font-semibold text-destructive uppercase tracking-wider mb-6 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Le constat
            </p>
            <div className="space-y-5">
              {constats.map((item, i) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-5 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mission, Vision, Objectifs */}
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-6 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Notre réponse
            </p>
            <div className="space-y-5">
              {missions.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-5 rounded-2xl bg-card border border-primary/20 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl gradient-bio flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom highlight */}
        <div className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-primary/5 border border-primary/10">
          <p className="text-foreground font-medium leading-relaxed">
            <span className="font-bold text-primary">RecycHub Togo</span> est né de cette réalité : 
            transformer un problème national en opportunité économique et environnementale, 
            en donnant à chaque citoyen le pouvoir d'agir.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
