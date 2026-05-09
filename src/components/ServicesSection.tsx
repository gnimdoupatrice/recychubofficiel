import { useState } from "react";
import {
  Recycle,
  ArrowRight,
  CheckCircle2,
  Monitor,
  AlertTriangle,
  GraduationCap,
  Users,
  BarChart3,
  Route,
  Truck,
  Bell,
  Camera,
  Shield,
  BookOpen,
  Award,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ─── Images imports ─── */
import petBottles1 from "@/assets/pet-bottles-1.jpg";
import petPlastique from "@/assets/hero/pet_plastique.png";
import petBottles2 from "@/assets/pet-bottles-2.jpg";
import pehdContainers1 from "@/assets/pehd-containers-1.jpg";
import pehdContainers2 from "@/assets/pehd-containers-2.jpg";
import ppItems1 from "@/assets/pp-items-1.jpg";
import ppItems2 from "@/assets/pp-items-2.jpg";
import pvcTuyaux from "@/assets/hero/pvc_tuyaux.jpg";
import pvcPipes2 from "@/assets/pvc-pipes-2.jpg";
import chaisesPlastique from "@/assets/hero/chaises_plastique.jpg";
import mobilier2 from "@/assets/mobilier-2.jpg";
import purWater from "@/assets/hero/pur_water.jpg";
import pureWater2 from "@/assets/pure-water-2.jpg";
import hdpe from "@/assets/hdpe.png";
import ppPlastique from "@/assets/hero/pp_plastique.png";

/* ─── Données plastiques ─── */
const plasticRows = [
  {
    code: "PET",
    name: "Bouteilles transparentes",
    images: [petPlastique, petBottles1, petBottles2],
    identifiers: [
      "Code de recyclage : chiffre 01 dans un triangle de recyclage",
      "Signe distinctif : point d'injection centré au fond de l'objet",
      "Aspect physique : plastique parfaitement transparent",
      "Exemples : flacons d'eau, soda, jus",
    ],
    price: "20",
    unit: "kg",
  },
  {
    code: "PEHD",
    name: "Bidons & flacons opaques",
    images: [hdpe, pehdContainers1, pehdContainers2],
    identifiers: [
      "Code de recyclage : chiffre 02 dans un triangle de recyclage",
      "Signe distinctif : ligne de soudure droite traversant tout le fond de l'objet",
      "Surnoms : bidon, plastique non transparent",
      "Exemples : flacons de shampoing, bidons d'huile, détergent, bidons cosmétiques",
    ],
    price: "50",
    unit: "kg",
  },
  {
    code: "PP",
    name: "Bassines & seaux plastique",
    images: [ppPlastique, ppItems1, ppItems2],
    identifiers: [
      "Code de recyclage : chiffre 05 dans un triangle de recyclage",
      "Signe distinctif : petit point rond d'injection centré au fond de l'objet",
      "Surnoms : plastique de ménage, plastique de foyer",
      "Exemples : ustensiles de cuisine, seaux, bassines en plastique",
    ],
    price: "50",
    unit: "kg",
  },
  {
    code: "PVC",
    name: "Tuyaux & plomberie",
    images: [pvcTuyaux, pvcPipes2],
    identifiers: [
      "Code de recyclage : chiffre 03 dans le triangle de recyclage",
      "Tuyaux gris, blancs ou noirs très rigides",
      "Tuyaux d'évacuation d'eau",
      "Raccords et coudes de plomberie",
    ],
    price: "50",
    unit: "kg",
  },
  {
    code: "Mobilier",
    name: "Chaises & tables cassées",
    images: [chaisesPlastique, mobilier2],
    identifiers: [
      "Chaises et tables en plastique",
      "Souvent fissurées, décolorées par le soleil ou cassées",
      "Se vend aussi à la pièce (non broyé)",
    ],
    price: "100",
    unit: "kg",
    altPrice: "200 FCFA/pièce (non broyé)",
  },
  {
    code: "PEBD",
    name: "Sachets Pure Water & films plastiques",
    images: [purWater, pureWater2],
    identifiers: [
      "Code de recyclage : chiffre 04 dans un triangle de recyclage",
      "Aspect physique : sachets souples, fins et transparents",
      "Surnoms : sachets « pure water », sachets d'eau, films d'emballage",
      "Exemples : sachets d'eau vidés, sachets plastiques fins, films d'emballage propres",
    ],
    price: "50",
    unit: "kg",
    altPrice: "Sachets propres, sales comme secs",
  },
];

/* ─── Image swap on hover ─── */
const PlasticImageSwap = ({ images, alt }: { images: string[]; alt: string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${alt} - exemple ${i + 1}`}
          loading="lazy"
          width={800}
          height={600}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            (i === 0 && !hovered) || (i === 1 && hovered) ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

/* ─── Ligne plastique ─── */
const PlasticRow = ({
  plastic,
  index,
}: {
  plastic: (typeof plasticRows)[0];
  index: number;
}) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className="bg-card border-2 border-foreground overflow-hidden transition-all duration-200 hover:translate-x-[-3px] hover:translate-y-[-3px]"
      style={{ boxShadow: "6px 6px 0 0 hsl(var(--foreground))" }}
    >
      <div
        className={`flex flex-col md:flex-row ${
          !isEven ? "md:flex-row-reverse" : ""
        } min-h-[320px]`}
      >
        {/* Visuel */}
        <div className={`w-full md:w-[45%] aspect-[4/3] md:aspect-auto ${isEven ? "md:border-r-2" : "md:border-l-2"} border-b-2 md:border-b-0 border-foreground`}>
          <PlasticImageSwap images={plastic.images} alt={`${plastic.code} - ${plastic.name}`} />
        </div>

        {/* Info */}
        <div className="w-full md:w-[55%] p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          {/* Code + Nom */}
          <div className="flex items-center gap-3 mb-3">
            <span className="gb-tag-primary">{plastic.code}</span>
            <div className="h-0.5 flex-1 bg-foreground" />
          </div>
          <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-extrabold text-foreground mb-5 uppercase tracking-wide">
            {plastic.name}
          </h3>

          {/* Identification */}
          <div className="mb-6">
            <p className="text-[11px] font-extrabold text-foreground uppercase tracking-[0.2em] mb-3 flex items-center gap-2 border-b-2 border-foreground pb-2">
              <Recycle className="w-4 h-4 text-primary" />
              Comment l'identifier ?
            </p>
            <ul className="space-y-2">
              {plastic.identifiers.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground/85 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prix + CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t-2 border-foreground">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl md:text-4xl font-extrabold text-primary">
                  {plastic.price}
                </span>
                <span className="text-xs text-foreground/70 font-extrabold uppercase tracking-widest">
                  FCFA/{plastic.unit}
                </span>
              </div>
              {plastic.altPrice && (
                <span className="text-[11px] text-muted-foreground mt-1 italic">
                  ou {plastic.altPrice}
                </span>
              )}
            </div>

            <Link to="/vendre" className="gb-btn ml-auto">
              Vendre <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Services secondaires                ─── */
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
    ctaLink: "/enlevement",
    accent: "primary" as const,
  },
  {
    icon: AlertTriangle,
    title: "Veille Citoyenne & Alerte Dépotoir",
    badge: "Civic Tech",
    description:
      "Nous donnons à chaque citoyen le pouvoir d'agir pour la salubrité de sa communauté. Notre fonctionnalité d'alerte géolocalisée permet de signaler instantanément les dépotoirs sauvages.",
    target: "Citoyens engagés et autorités locales",
    features: [
      { icon: Camera, text: "Signalement photo géolocalisé en 3 clics" },
      { icon: Bell, text: "Notifications d'intervention en temps réel" },
      { icon: Shield, text: "Cartographie des zones à risque" },
    ],
    ctaLabel: "Signaler un dépotoir",
    ctaLink: "/alerte",
    accent: "destructive" as const,
  },
  {
    icon: GraduationCap,
    title: "Green Academy",
    badge: "Formation",
    description:
      "Parce que le changement durable passe par l'éducation, nous intégrons une interface d'apprentissage dédiée aux métiers de l'environnement et aux bonnes pratiques écologiques.",
    target: "Étudiants, jeunes professionnels et citoyens en quête de savoir",
    features: [
      { icon: BookOpen, text: "Modules adaptés à tous les niveaux" },
      { icon: Award, text: "Certifications reconnues incluses" },
      { icon: Wrench, text: "Ateliers pratiques sur le terrain" },
    ],
    ctaLabel: "Découvrir les formations",
    ctaLink: "/academy",
    accent: "primary" as const,
  },
];

const ServiceCard = ({ service }: { service: (typeof otherServices)[0] }) => {
  const Icon = service.icon;
  const isDestructive = service.accent === "destructive";

  return (
    <div
      className="bg-card border-2 border-foreground overflow-hidden transition-all duration-200 hover:translate-x-[-3px] hover:translate-y-[-3px]"
      style={{ boxShadow: "6px 6px 0 0 hsl(var(--foreground))" }}
    >
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-5 pb-5 border-b-2 border-foreground">
          <span className={isDestructive ? "gb-tag-destructive" : "gb-tag-primary"}>
            {service.badge}
          </span>
          <div className={`w-12 h-12 ${isDestructive ? "gb-icon-box-destructive" : "gb-icon-box"}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>

        <h3 className="font-display text-xl md:text-2xl font-extrabold text-foreground mb-3 uppercase tracking-wide">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>

        <div className="flex items-start gap-2 mb-6 text-xs p-3 bg-muted border-2 border-foreground">
          <Users className={`w-4 h-4 shrink-0 mt-0.5 ${isDestructive ? "text-destructive" : "text-primary"}`} />
          <span className="text-muted-foreground">
            <span className="font-extrabold text-foreground uppercase tracking-wide">Cible : </span>
            {service.target}
          </span>
        </div>

        <ul className="space-y-3 mb-8">
          {service.features.map((f) => (
            <li key={f.text} className="flex items-center gap-3">
              <div className={`w-8 h-8 flex items-center justify-center shrink-0 border-2 border-foreground ${
                isDestructive ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"
              }`}>
                <f.icon className="w-4 h-4" />
              </div>
              <span className="text-sm text-foreground">{f.text}</span>
            </li>
          ))}
        </ul>

        <Link to={service.ctaLink} className={`${isDestructive ? "gb-btn-destructive" : "gb-btn"} w-full`}>
          {service.ctaLabel} <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

/* ─── Section principale ─── */
const ServicesSection = () => {
  return (
    <section id="services" className="section-spacing-lg bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="gb-eyebrow mb-4">Notre écosystème · 3 piliers</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mt-4 uppercase tracking-tight">
            Deux parcours,<br />
            <span className="bg-primary text-primary-foreground px-2 inline-block border-2 border-primary mt-2">
              un même engagement
            </span>
          </h2>
          <div className="gb-rule mx-auto mt-5" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed mt-5">
            <strong className="text-foreground">Vendez vos plastiques au kg</strong> ou
            <strong className="text-foreground"> faites enlever vos déchets ménagers</strong> —
            pendant que la communauté agit via l'alerte dépotoir et la Green Academy.
          </p>
        </div>

        {/* ═══ CATALOGUE DE RACHAT ═══ */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 gb-icon-box">
              <Recycle className="w-6 h-6" />
            </div>
            <div>
              <span className="gb-tag-primary mb-1">Service phare</span>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-foreground uppercase tracking-wide mt-1">
                Catalogue de rachat
              </h3>
            </div>
          </div>
          <p className="text-muted-foreground max-w-3xl mt-4 mb-10 text-sm md:text-base leading-relaxed">
            Transformez vos déchets en revenus. Identifiez le type de plastique,
            apportez-le à notre point de collecte ou demandez un enlèvement — paiement
            immédiat en cash ou Mobile Money.
          </p>

          <div className="space-y-6">
            {plasticRows.map((plastic, index) => (
              <PlasticRow key={plastic.code} plastic={plastic} index={index} />
            ))}
          </div>
        </div>

        {/* ═══ AUTRES SERVICES ═══ */}
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
