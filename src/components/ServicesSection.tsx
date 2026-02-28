import {
  Truck,
  ShoppingBag,
  AlertTriangle,
  GraduationCap,
  CalendarDays,
  Clock,
  MapPin,
  RefreshCw,
  Camera,
  Eye,
  ShieldCheck,
  BookOpen,
  Award,
  Wrench,
  CalendarCheck,
  Briefcase,
  Users,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/* ─── Module 1 : Enlèvement ─── */
const EnlevementModule = () => (
  <section className="py-16 md:py-24">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        {/* Texte à gauche */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Service de Proximité
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-4 text-foreground">
            Un ramassage rapide et efficace, directement chez vous.
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Ne vous souciez plus de l'encombrement. Notre équipe intervient dans les secteurs
            Kozah&nbsp;1 à&nbsp;4 pour collecter vos déchets ménagers de manière hygiénique et
            ponctuelle.
          </p>
          <ul className="space-y-4 mb-8">
            {[
              { icon: Clock, text: "Intervention rapide sous 24/48h." },
              { icon: MapPin, text: "Couverture complète de Kozah 1-4." },
              { icon: RefreshCw, text: "Abonnements mensuels ou interventions ponctuelles." },
            ].map((p) => (
              <li key={p.text} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center shrink-0 mt-0.5">
                  <p.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-foreground">{p.text}</span>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="gradient-green border-0 text-primary-foreground hover:opacity-90">
            <Link to="/enlevement">
              Demander un ramassage <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
        {/* Visuel à droite */}
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl bg-accent flex items-center justify-center overflow-hidden border border-border">
            <Truck className="w-24 h-24 text-primary/30" />
          </div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl gradient-green opacity-20 blur-2xl" />
        </div>
      </div>
    </div>
  </section>
);

/* ─── Module 2 : Vente plastiques ─── */
const VenteModule = () => (
  <section className="py-16 md:py-24 bg-muted/50">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        {/* Visuel à gauche */}
        <div className="order-2 md:order-1 relative">
          <div className="aspect-[4/3] rounded-2xl bg-accent flex items-center justify-center overflow-hidden border border-border">
            <ShoppingBag className="w-24 h-24 text-primary/30" />
          </div>
        </div>
        {/* Texte à droite */}
        <div className="order-1 md:order-2">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Gagnez de l'argent
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-4 text-foreground">
            Transformez vos déchets plastiques en revenus.
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Vos déchets ont de la valeur. Apportez-nous vos plastiques et soyez rémunéré
            immédiatement au kilo. Nous garantissons une tarification transparente pour soutenir
            l'économie locale.
          </p>

          {/* Barème */}
          <div className="rounded-xl border border-border bg-card overflow-hidden mb-8">
            <div className="gradient-green px-4 py-3">
              <h3 className="text-sm font-semibold text-primary-foreground">Barème de rachat</h3>
            </div>
            <div className="divide-y divide-border">
              {[
                ["PP – Polypropylène", "80 FCFA / kg"],
                ["Bidon – Plastique HDPE", "55 FCFA / kg"],
                ["Sachets « Pure Water » (Films)", "55 FCFA / kg"],
                ["Tuyaux PVC cendre", "55 FCFA / kg"],
                ["Chaise broyée", "150 FCFA / kg"],
                ["Chaise cassée (non broyée)", "400 FCFA / pièce"],
              ].map(([type, prix]) => (
                <div key={type} className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-foreground">{type}</span>
                  <span className="font-semibold text-primary">{prix}</span>
                </div>
              ))}
            </div>
          </div>

          <Button asChild size="lg" className="gradient-green border-0 text-primary-foreground hover:opacity-90">
            <Link to="/vendre">
              Vendre mes plastiques <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Module 3 : Alerte dépotoir ─── */
const AlerteModule = () => (
  <section className="py-16 md:py-24">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        {/* Texte à gauche */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-destructive">
            Action Citoyenne
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-4 text-foreground">
            Devenez acteur de la propreté de Kara.
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Vous remarquez un dépôt sauvage ? Prenez une photo, géolocalisez le lieu, et notre
            équipe s'occupe du reste. Ensemble, gardons notre ville propre.
          </p>
          <ul className="space-y-4 mb-8">
            {[
              { icon: Camera, text: "Signalement en 3 clics avec photo." },
              { icon: Eye, text: "Suivi de l'intervention en temps réel." },
              { icon: ShieldCheck, text: "Anonymat garanti." },
            ].map((p) => (
              <li key={p.text} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                  <p.icon className="w-4 h-4 text-destructive" />
                </div>
                <span className="text-foreground">{p.text}</span>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" variant="destructive">
            <Link to="/alerte">
              Signaler un dépotoir (Urgence) <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
        {/* Visuel à droite */}
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl bg-destructive/5 flex items-center justify-center overflow-hidden border border-destructive/20">
            <AlertTriangle className="w-24 h-24 text-destructive/30" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Module 4 : Green Academy ─── */
const AcademyModule = () => (
  <section className="py-16 md:py-24 bg-muted/50">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        {/* Visuel à gauche */}
        <div className="order-2 md:order-1 relative">
          <div className="aspect-[4/3] rounded-2xl bg-accent flex items-center justify-center overflow-hidden border border-border">
            <GraduationCap className="w-24 h-24 text-primary/30" />
          </div>
        </div>
        {/* Texte à droite */}
        <div className="order-1 md:order-2">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Éducation & Avenir
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-4 text-foreground">
            Formez-vous aux métiers verts de demain.
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            La transition écologique crée de nouveaux emplois. Rejoignez la Green Academy pour
            suivre des cours spécialisés sur l'économie circulaire et l'environnement, validés par
            des certifications reconnues.
          </p>
          <ul className="space-y-4 mb-8">
            {[
              { icon: BookOpen, text: "Modules adaptés à tous les niveaux." },
              { icon: Award, text: "Certifications incluses à la fin du parcours." },
              { icon: Wrench, text: "Ateliers pratiques sur le terrain." },
            ].map((p) => (
              <li key={p.text} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center shrink-0 mt-0.5">
                  <p.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-foreground">{p.text}</span>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="gradient-green border-0 text-primary-foreground hover:opacity-90">
            <Link to="/academy">
              Découvrir les formations <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Module 5 : Hub Événementiel ─── */
const EvenementsModule = () => (
  <section className="py-16 md:py-24">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        {/* Texte à gauche */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Réseau & Opportunités
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-4 text-foreground">
            Ne manquez aucun événement éco-responsable à Kara.
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Connectez-vous avec la communauté verte de Kara. Retrouvez notre calendrier des
            opportunités, les offres de « jobs verts », et participez à nos journées de
            sensibilisation.
          </p>
          <ul className="space-y-4 mb-8">
            {[
              { icon: CalendarCheck, text: "Agenda mis à jour chaque semaine." },
              { icon: Briefcase, text: "Offres d'emploi et de stages exclusifs." },
              { icon: Users, text: "Rencontres avec des acteurs du développement durable." },
            ].map((p) => (
              <li key={p.text} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center shrink-0 mt-0.5">
                  <p.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-foreground">{p.text}</span>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="gradient-green border-0 text-primary-foreground hover:opacity-90">
            <Link to="/evenements">
              Voir le calendrier <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
        {/* Visuel à droite */}
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl bg-accent flex items-center justify-center overflow-hidden border border-border">
            <CalendarDays className="w-24 h-24 text-primary/30" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Composant principal ─── */
const ServicesSection = () => {
  return (
    <>
      {/* En-tête global */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Nos <span className="text-primary">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Une plateforme complète pour transformer la gestion des déchets à Kara.
          </p>
        </div>
      </section>

      <EnlevementModule />
      <VenteModule />
      <AlerteModule />
      <AcademyModule />
      <EvenementsModule />
    </>
  );
};

export default ServicesSection;
