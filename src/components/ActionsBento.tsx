import { Link } from "react-router-dom";
import {
  Truck, ShoppingBag, AlertTriangle, GraduationCap, Newspaper, ArrowUpRight,
} from "lucide-react";

/**
 * ActionsBento — les 5 actions phares en grille asymétrique éditoriale.
 * Cartes typées (acteur, durée, payoff) pour sortir du « tile générique ».
 */
const actions = [
  {
    to: "/enlevement",
    eyebrow: "01 · Pour les ménages & collecteurs",
    title: "Digitaliser la tournée",
    body:
      "Les ménages abonnés demandent un enlèvement. Les entreprises de collecte reçoivent, planifient, optimisent.",
    cta: "Demander un enlèvement",
    icon: Truck,
    span: "md:col-span-3 md:row-span-2",
    tone: "surface-ink text-cream",
    accent: "text-primary",
  },
  {
    to: "/vendre",
    eyebrow: "02 · Service phare",
    title: "Vendre mes plastiques",
    body: "PET, PEHD, PP, Pure Water — jusqu’à 150 FCFA/kg. Demande validée par RECYC HUB.",
    cta: "Catalogue & prix",
    icon: ShoppingBag,
    span: "md:col-span-3",
    tone: "surface-clay",
    accent: "text-cream",
  },
  {
    to: "/alerte",
    eyebrow: "03 · Citoyen",
    title: "Alerter un dépotoir",
    body: "Photo, géoloc, description. Le signalement part en direct vers l’équipe terrain.",
    cta: "Signaler maintenant",
    icon: AlertTriangle,
    span: "md:col-span-2",
    tone: "surface-cream border border-foreground/10",
    accent: "text-destructive",
  },
  {
    to: "/academy",
    eyebrow: "04 · Green Academy",
    title: "Se former aux métiers verts",
    body: "Ateliers, certifications, parcours. L’environnement comme carrière.",
    cta: "Voir les formations",
    icon: GraduationCap,
    span: "md:col-span-2",
    tone: "surface-sage",
    accent: "text-ink",
  },
  {
    to: "/evenements",
    eyebrow: "05 · Blog & opportunités",
    title: "Appels à projets",
    body: "Bourses, candidatures, offres, événements. Toute l’actu environnement.",
    cta: "Parcourir le blog",
    icon: Newspaper,
    span: "md:col-span-2",
    tone: "bg-foreground/5 border border-foreground/10",
    accent: "text-primary",
  },
];

const ActionsBento = () => {
  return (
    <section className="relative section-spacing-lg bg-background">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        {/* En-tête éditorial */}
        <div className="grid md:grid-cols-12 gap-8 mb-14 md:mb-20 items-end">
          <div className="md:col-span-7">
            <span className="eyebrow">Cinq actions, une plateforme</span>
            <h2 className="display-lg mt-6 text-foreground">
              Ce que RECYC HUB <em className="italic text-primary">vous laisse faire</em>
            </h2>
          </div>
          <p className="md:col-span-5 text-foreground/70 leading-relaxed">
            Pas un site vitrine. Une infrastructure phygitale qui relie ménages, collecteurs,
            citoyens, formateurs et institutions — autour d’un même geste : refuser que le déchet
            soit une fin.
          </p>
        </div>

        {/* Grille bento */}
        <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[minmax(220px,auto)] gap-4 md:gap-5">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.to}
                to={a.to}
                className={`group relative overflow-hidden rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 ${a.span} ${a.tone}`}
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-[10px] uppercase tracking-[0.24em] font-semibold opacity-70">
                      {a.eyebrow}
                    </span>
                    <Icon className={`w-5 h-5 ${a.accent}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl leading-[1.0] tracking-tight">
                    {a.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed opacity-80 max-w-md">{a.body}</p>
                </div>

                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                  <span className="link-underline">{a.cta}</span>
                  <ArrowUpRight className={`w-4 h-4 ${a.accent} transition-transform group-hover:translate-x-1 group-hover:-translate-y-1`} />
                </div>

                {/* Ornement coin */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-10"
                  style={{ background: "currentColor" }}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ActionsBento;
