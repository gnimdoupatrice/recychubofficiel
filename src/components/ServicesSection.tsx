import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
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
import petBottles2 from "@/assets/pet-bottles-2.jpg";
import pehdContainers1 from "@/assets/pehd-containers-1.jpg";
import pehdContainers2 from "@/assets/pehd-containers-2.jpg";
import ppItems1 from "@/assets/pp-items-1.jpg";
import ppItems2 from "@/assets/pp-items-2.jpg";
import pvcPipes1 from "@/assets/pvc-pipes-1.jpg";
import pvcPipes2 from "@/assets/pvc-pipes-2.jpg";
import mobilier1 from "@/assets/mobilier-1.jpg";
import mobilier2 from "@/assets/mobilier-2.jpg";

/* ─── Données plastiques ─── */
const plasticRows = [
  {
    code: "PET",
    name: "Bouteilles transparentes",
    images: [petBottles1, petBottles2],
    identifiers: [
      "Plastique léger qui craque sous la main",
      "Utilisé pour les boissons : eau, soda, jus",
      "Transparent avec bouchons colorés",
      "Étiquettes souvent encore collées",
    ],
    price: "55",
    unit: "kg",
  },
  {
    code: "PEHD",
    name: "Bidons & flacons opaques",
    images: [pehdContainers1, pehdContainers2],
    identifiers: [
      "Plastique dur, épais et non transparent",
      "Bidons d'huile, détergent, lessive",
      "Flacons de shampoing et produits ménagers",
      "Résistant aux chocs, souvent coloré",
    ],
    price: "55",
    unit: "kg",
  },
  {
    code: "PP",
    name: "Bassines, seaux & bouchons",
    images: [ppItems1, ppItems2],
    identifiers: [
      "Plastique rigide mais incassable",
      "Souvent très coloré (rouge, bleu, jaune)",
      "Ustensiles de cuisine, seaux, bassines",
      "Bouchons de bouteilles en grande quantité",
    ],
    price: "80",
    unit: "kg",
  },
  {
    code: "PVC",
    name: "Tuyaux & plomberie",
    images: [pvcPipes1, pvcPipes2],
    identifiers: [
      "Plastique gris ou blanc très rigide",
      "Tuyaux d'évacuation d'eau",
      "Raccords et coudes de plomberie",
      "Ne se plie pas, casse net sous la force",
    ],
    price: "55",
    unit: "kg",
  },
  {
    code: "Mobilier",
    name: "Chaises & tables cassées",
    images: [mobilier1, mobilier2],
    identifiers: [
      "Plastique épais et lourd",
      "Chaises de jardin, tables d'extérieur",
      "Souvent fissurées ou décolorées par le soleil",
      "Se vend aussi à la pièce (non broyé)",
    ],
    price: "150",
    unit: "kg",
    altPrice: "400 FCFA/pièce (non broyé)",
  },
];

/* ─── Carousel auto-play pour chaque ligne ─── */
const PlasticCarousel = ({ images, alt }: { images: string[]; alt: string }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 10000, stopOnInteraction: false }),
  ]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div ref={emblaRef} className="overflow-hidden rounded-2xl h-full">
      <div className="flex h-full">
        {images.map((src, i) => (
          <div key={i} className="flex-[0_0_100%] min-w-0 h-full">
            <img
              src={src}
              alt={`${alt} - exemple ${i + 1}`}
              loading="lazy"
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
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
      className={`rounded-2xl border border-border shadow-sm overflow-hidden ${
        isEven ? "bg-card" : "bg-muted/40"
      }`}
    >
      <div
        className={`flex flex-col md:flex-row ${
          !isEven ? "md:flex-row-reverse" : ""
        } min-h-[320px]`}
      >
        {/* Colonne Visuel — Carousel */}
        <div className="w-full md:w-[45%] aspect-[4/3] md:aspect-auto">
          <PlasticCarousel images={plastic.images} alt={`${plastic.code} - ${plastic.name}`} />
        </div>

        {/* Colonne Info */}
        <div className="w-full md:w-[55%] p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          {/* Code + Nom */}
          <div className="flex items-center gap-3 mb-1">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-0 text-xs font-bold uppercase tracking-widest">
              {plastic.code}
            </Badge>
            <div className="h-px flex-1 bg-border" />
          </div>
          <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-5">
            {plastic.name}
          </h3>

          {/* Identification */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Recycle className="w-4 h-4 text-primary" />
              Comment l'identifier ?
            </p>
            <ul className="space-y-2">
              {plastic.identifiers.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm md:text-base text-foreground/90 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prix + CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-3xl md:text-4xl font-extrabold text-primary">
                  {plastic.price}
                </span>
                <span className="text-sm text-muted-foreground font-medium">
                  FCFA/{plastic.unit}
                </span>
              </div>
              {plastic.altPrice && (
                <span className="text-xs text-muted-foreground mt-1 italic">
                  ou {plastic.altPrice}
                </span>
              )}
            </div>

            <Button
              asChild
              size="lg"
              className="gradient-green border-0 text-primary-foreground hover:opacity-90"
            >
              <Link to="/vendre-plastiques">
                Vendre maintenant <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Services secondaires ─── */
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
      "Nous donnons à chaque citoyen le pouvoir d'agir pour la salubrité de sa communauté. Notre fonctionnalité d'alerte géolocalisée permet de signaler instantanément les dépotoirs sauvages.",
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
      "Parce que le changement durable passe par l'éducation, nous intégrons une interface d'apprentissage dédiée aux métiers de l'environnement et aux bonnes pratiques écologiques.",
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

const ServiceCard = ({ service }: { service: (typeof otherServices)[0] }) => {
  const Icon = service.icon;
  const isDestructive = service.accent === "destructive";

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-5">
          <Badge
            variant={isDestructive ? "destructive" : "default"}
            className="text-xs uppercase tracking-wider"
          >
            {service.badge}
          </Badge>
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isDestructive ? "bg-destructive/10" : "bg-primary/10"
            }`}
          >
            <Icon className={`w-6 h-6 ${isDestructive ? "text-destructive" : "text-primary"}`} />
          </div>
        </div>

        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>

        <div className="flex items-center gap-2 mb-6 text-sm">
          <Users className="w-4 h-4 text-primary shrink-0" />
          <span className="text-muted-foreground">
            <span className="font-medium text-foreground">Cible : </span>
            {service.target}
          </span>
        </div>

        <ul className="space-y-3 mb-8">
          {service.features.map((f) => (
            <li key={f.text} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isDestructive ? "bg-destructive/10" : "bg-primary/10"
                }`}
              >
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
    <section id="services" className="section-spacing-lg bg-muted/30 relative overflow-hidden">
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

        {/* ═══ CATALOGUE DE RACHAT — Lignes empilées ═══ */}
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
                Catalogue de rachat
              </h3>
            </div>
          </div>
          <p className="text-muted-foreground max-w-3xl mt-3 mb-10 text-base md:text-lg leading-relaxed">
            Transformez vos déchets en revenus. Identifiez le type de plastique,
            apportez-le à notre point de collecte ou demandez un enlèvement — paiement
            immédiat en cash ou Mobile Money.
          </p>

          {/* Lignes empilées */}
          <div className="space-y-6">
            {plasticRows.map((plastic, index) => (
              <PlasticRow key={plastic.code} plastic={plastic} index={index} />
            ))}
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
