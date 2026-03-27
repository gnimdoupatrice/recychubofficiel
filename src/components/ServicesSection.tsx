import {
  Truck,
  AlertTriangle,
  GraduationCap,
  Recycle,
  Monitor,
  Users,
  MapPin,
  BarChart3,
  Route,
  Bell,
  Camera,
  Shield,
  BookOpen,
  Award,
  Wrench,
  ArrowRight,
  HelpCircle,
  Weight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import plasticPet from "@/assets/plastic-pet.jpg";
import plasticPehd from "@/assets/plastic-pehd.jpg";
import plasticPp from "@/assets/plastic-pp.jpg";
import plasticPvc from "@/assets/plastic-pvc.jpg";
import plasticMobilier from "@/assets/plastic-mobilier.jpg";

/* ─── Types de plastiques ─── */
const plasticTypes = [
  {
    code: "PET",
    name: "Bouteilles transparentes",
    image: plasticPet,
    identify: "Plastique qui craque sous la main, utilisé pour les boissons (eau, soda, jus).",
    price: "55",
    unit: "kg",
  },
  {
    code: "PEHD",
    name: "Bidons & flacons opaques",
    image: plasticPehd,
    identify: "Plastique dur, non transparent, utilisé pour les bidons d'huile, lessive et shampoing.",
    price: "55",
    unit: "kg",
  },
  {
    code: "PP",
    name: "Bassines, seaux & bouchons",
    image: plasticPp,
    identify: "Plastique rigide mais incassable, souvent coloré. Ustensiles de cuisine, seaux.",
    price: "80",
    unit: "kg",
  },
  {
    code: "PVC",
    name: "Tuyaux & plomberie",
    image: plasticPvc,
    identify: "Plastique gris ou blanc très rigide utilisé pour l'évacuation d'eau et la plomberie.",
    price: "55",
    unit: "kg",
  },
  {
    code: "Mobilier",
    name: "Chaises & tables cassées",
    image: plasticMobilier,
    identify: "Plastique épais et lourd utilisé pour le mobilier d'extérieur (chaises, tables).",
    price: "150",
    unit: "kg",
    altPrice: "400 FCFA/pièce (non broyé)",
  },
];

/* ─── Autres services ─── */
const otherServices = [
  {
    icon: Monitor,
    title: "Digitalisation de la collecte",
    badge: "Solutions Pro",
    description:
      "Nous accompagnons les entreprises de pré-collecte et de gestion des déchets en leur fournissant un outil de gestion clé en main. Grâce à notre interface dédiée, ces entreprises peuvent digitaliser leur flotte, recevoir les demandes d'enlèvement en temps réel, et optimiser leurs tournées logistiques.",
    target: "Entreprises de collecte, mairies et PME de l'assainissement",
    features: [
      { icon: Truck, text: "Gestion de flotte digitalisée" },
      { icon: BarChart3, text: "Tableau de bord analytique en temps réel" },
      { icon: Route, text: "Optimisation intelligente des tournées" },
    ],
    ctaLabel: "Demander une démo",
    ctaLink: "/demander-enlevement",
    accent: "primary" as const,
  },
  {
    icon: AlertTriangle,
    title: "Veille Citoyenne & Alerte Dépotoir",
    badge: "Civic Tech",
    description:
      "Nous donnons à chaque citoyen le pouvoir d'agir pour la salubrité de sa communauté. Notre fonctionnalité d'alerte géolocalisée permet de signaler instantanément les dépotoirs sauvages. Ces données déclenchent des interventions rapides et cartographient les zones prioritaires.",
    target: "Citoyens engagés et autorités locales",
    features: [
      { icon: Camera, text: "Signalement photo géolocalisé en 3 clics" },
      { icon: Bell, text: "Notifications d'intervention en temps réel" },
      { icon: Shield, text: "Cartographie des zones à risque" },
    ],
    ctaLabel: "Signaler un dépotoir",
    ctaLink: "/alerte-depotoir",
    accent: "destructive" as const,
  },
  {
    icon: GraduationCap,
    title: "Green Academy",
    badge: "Formation",
    description:
      "Parce que le changement durable passe par l'éducation, nous intégrons une interface d'apprentissage dédiée aux métiers de l'environnement. La Green Academy propose des ressources, des formations et des bonnes pratiques pour sensibiliser le grand public et former la prochaine génération de professionnels verts.",
    target: "Étudiants, jeunes professionnels et citoyens en quête de savoir",
    features: [
      { icon: BookOpen, text: "Modules adaptés à tous les niveaux" },
      { icon: Award, text: "Certifications reconnues incluses" },
      { icon: Wrench, text: "Ateliers pratiques sur le terrain" },
    ],
    ctaLabel: "Découvrir les formations",
    ctaLink: "/green-academy",
    accent: "primary" as const,
  },
];

/* ─── Composant carte plastique ─── */
const PlasticCard = ({ plastic }: { plastic: typeof plasticTypes[0] }) => (
  <div className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    {/* Header */}
    <div className="px-5 pt-5 pb-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {plastic.code}
          </span>
          <h3 className="font-display text-lg font-semibold text-foreground mt-0.5">
            {plastic.name}
          </h3>
        </div>
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Recycle className="w-5 h-5 text-primary" />
        </div>
      </div>
    </div>

    {/* Image */}
    <div className="mx-5 rounded-xl overflow-hidden bg-muted aspect-[4/3]">
      <img
        src={plastic.image}
        alt={`${plastic.code} - ${plastic.name}`}
        loading="lazy"
        width={640}
        height={512}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    {/* Identification */}
    <div className="px-5 pt-4 pb-3">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-start gap-2 cursor-help">
              <HelpCircle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
                {plastic.identify}
              </p>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p className="text-sm font-medium">Comment l'identifier ?</p>
            <p className="text-xs mt-1">{plastic.identify}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>

    {/* Price */}
    <div className="px-5 pb-5">
      <div className="flex items-center justify-between rounded-xl bg-primary/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <Weight className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Prix de rachat</span>
        </div>
        <Badge className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 hover:bg-primary">
          {plastic.price} FCFA/{plastic.unit}
        </Badge>
      </div>
      {plastic.altPrice && (
        <p className="text-xs text-muted-foreground mt-2 text-center italic">
          ou {plastic.altPrice}
        </p>
      )}
    </div>
  </div>
);

/* ─── Composant service secondaire ─── */
const ServiceCard = ({ service }: { service: typeof otherServices[0] }) => {
  const Icon = service.icon;
  const isDestructive = service.accent === "destructive";

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="p-6 md:p-8">
        {/* Badge + Icon */}
        <div className="flex items-center justify-between mb-5">
          <Badge
            variant={isDestructive ? "destructive" : "default"}
            className="text-xs uppercase tracking-wider"
          >
            {service.badge}
          </Badge>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            isDestructive ? "bg-destructive/10" : "bg-primary/10"
          }`}>
            <Icon className={`w-6 h-6 ${isDestructive ? "text-destructive" : "text-primary"}`} />
          </div>
        </div>

        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
          {service.title}
        </h3>

        <p className="text-muted-foreground leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Target */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Users className="w-4 h-4 text-primary shrink-0" />
          <span className="text-muted-foreground">
            <span className="font-medium text-foreground">Cible : </span>
            {service.target}
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {service.features.map((f) => (
            <li key={f.text} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                isDestructive ? "bg-destructive/10" : "bg-primary/10"
              }`}>
                <f.icon className={`w-4 h-4 ${isDestructive ? "text-destructive" : "text-primary"}`} />
              </div>
              <span className="text-sm text-foreground">{f.text}</span>
            </li>
          ))}
        </ul>

        <Button
          asChild
          size="lg"
          variant={isDestructive ? "destructive" : "default"}
          className={`w-full ${!isDestructive ? "gradient-green border-0 text-primary-foreground hover:opacity-90" : ""}`}
        >
          <Link to={service.ctaLink}>
            {service.ctaLabel} <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

/* ─── Section principale ─── */
const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider mb-4">
            Notre écosystème
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Services
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Une plateforme complète pour transformer la gestion des déchets à Kara —
            du rachat de plastiques à la formation environnementale.
          </p>
        </div>

        {/* ═══ SERVICE 1 : Rachat de plastiques ═══ */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-green flex items-center justify-center">
              <Recycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-0 text-xs uppercase tracking-wider mb-1">
                Service phare
              </Badge>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Rachat de déchets plastiques
              </h3>
            </div>
          </div>
          <p className="text-muted-foreground max-w-3xl mt-3 mb-10 text-base md:text-lg leading-relaxed">
            Transformez vos déchets en revenus. Nous rachetons vos plastiques au kilo avec un
            paiement immédiat — cash ou Mobile Money. Identifiez ci-dessous les types de plastiques
            que nous acceptons et leurs tarifs.
          </p>

          {/* Grille de cartes plastiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {plasticTypes.map((plastic) => (
              <PlasticCard key={plastic.code} plastic={plastic} />
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="gradient-green border-0 text-primary-foreground hover:opacity-90"
            >
              <Link to="/vendre-plastiques">
                Commencer à vendre <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* ═══ SERVICES 2, 3, 4 ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {otherServices.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
