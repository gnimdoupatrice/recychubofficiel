import {
  Phone, Truck, Smartphone, Leaf, CheckCircle2,
  Calendar, MapPin, Camera, ClipboardCheck,
  Users, Ticket, Award, Star,
  BookOpen, Play, FileCheck, GraduationCap,
  AlertTriangle, Eye, Wrench, ThumbsUp,
} from "lucide-react";

import stepRegister from "@/assets/step-register.webp";
import stepCollect from "@/assets/step-collect.webp";
import stepPayment from "@/assets/step-payment.webp";
import stepImpact from "@/assets/step-impact.webp";
import stepSchedulePickup from "@/assets/step-schedule-pickup.webp";
import stepTracking from "@/assets/step-tracking.webp";
import stepValidation from "@/assets/step-validation.webp";
import stepReport from "@/assets/step-report.webp";
import stepLocate from "@/assets/step-locate.webp";
import stepCleanup from "@/assets/step-cleanup.webp";
import stepResolved from "@/assets/step-resolved.webp";
import stepBrowseEvents from "@/assets/step-browse-events.webp";
import stepRegisterEvent from "@/assets/step-register-event.webp";
import stepParticipate from "@/assets/step-participate.webp";
import stepCertificate from "@/assets/step-certificate.webp";
import stepBrowseCourses from "@/assets/step-browse-courses.webp";
import stepLearn from "@/assets/step-learn.webp";
import stepQuiz from "@/assets/step-quiz.webp";
import stepAmbassador from "@/assets/step-ambassador.webp";

import type { LucideIcon } from "lucide-react";

export interface Step {
  icon: LucideIcon;
  image: string;
  step: string;
  title: string;
  shortDesc: string;
  details: string[];
  color: string;
}

export interface ServiceFlow {
  id: string;
  label: string;
  icon: LucideIcon;
  subtitle: string;
  intro: string;
  ctaLabel: string;
  ctaLink: string;
  steps: Step[];
}

export const services: ServiceFlow[] = [
  {
    id: "vente",
    label: "Vendre ses plastiques",
    icon: Smartphone,
    subtitle: "Vente de plastiques",
    intro: "De vos déchets à votre portefeuille en 4 étapes simples. Pas besoin d'internet haut débit — WhatsApp suffit.",
    ctaLabel: "Commencer à vendre",
    ctaLink: "/vendre-plastiques",
    steps: [
      {
        icon: Phone,
        image: stepRegister,
        step: "01",
        title: "Créez votre compte",
        shortDesc: "Inscription gratuite en 30 secondes",
        details: [
          "Via WhatsApp, appel ou sur notre plateforme",
          "Juste votre nom et numéro de téléphone",
          "Aucun document requis",
        ],
        color: "from-primary to-secondary",
      },
      {
        icon: Truck,
        image: stepCollect,
        step: "02",
        title: "Collecte ou dépôt",
        shortDesc: "On vient chez vous ou vous venez à nous",
        details: [
          "Demandez un enlèvement à domicile via WhatsApp",
          "Ou déposez vos plastiques à notre point de collecte",
          "On pèse tout devant vous, en toute transparence",
        ],
        color: "from-secondary to-accent",
      },
      {
        icon: Smartphone,
        image: stepPayment,
        step: "03",
        title: "Paiement immédiat",
        shortDesc: "Recevez votre argent sur-le-champ",
        details: [
          "Paiement cash ou via Mobile Money (Flooz, T-Money)",
          "Tarif au kilo affiché, pas de surprise",
          "Historique de toutes vos ventes sur votre compte",
        ],
        color: "from-accent to-primary",
      },
      {
        icon: Leaf,
        image: stepImpact,
        step: "04",
        title: "Impact positif",
        shortDesc: "Vos déchets deviennent une ressource",
        details: [
          "Vos plastiques sont recyclés localement",
          "Vous contribuez à un Kara plus propre",
          "Suivez votre impact environnemental en temps réel",
        ],
        color: "from-primary to-neon-light",
      },
    ],
  },
  {
    id: "enlevement",
    label: "Demande d'enlèvement",
    icon: Truck,
    subtitle: "Enlèvement de déchets",
    intro: "Planifiez une collecte rapide et fiable de tous vos déchets en 4 étapes. On s'occupe de tout, vous n'avez qu'à ouvrir la porte.",
    ctaLabel: "Demander un enlèvement",
    ctaLink: "/demander-enlevement",
    steps: [
      {
        icon: Phone,
        image: stepRegister,
        step: "01",
        title: "Créez votre compte",
        shortDesc: "Identifiez-vous en quelques secondes",
        details: [
          "Inscrivez-vous gratuitement sur la plateforme",
          "Renseignez votre adresse et quartier",
          "Accessible via WhatsApp ou notre site web",
        ],
        color: "from-primary to-secondary",
      },
      {
        icon: Calendar,
        image: stepSchedulePickup,
        step: "02",
        title: "Planifiez la collecte",
        shortDesc: "Choisissez votre créneau idéal",
        details: [
          "Sélectionnez la date et l'heure qui vous arrangent",
          "Précisez le type et le volume de déchets",
          "Recevez une confirmation instantanée par SMS",
        ],
        color: "from-secondary to-accent",
      },
      {
        icon: MapPin,
        image: stepTracking,
        step: "03",
        title: "Suivi en temps réel",
        shortDesc: "Suivez l'arrivée de notre équipe",
        details: [
          "Notification quand l'équipe est en route",
          "Suivi GPS du véhicule de collecte",
          "Estimation du temps d'arrivée en direct",
        ],
        color: "from-accent to-primary",
      },
      {
        icon: ClipboardCheck,
        image: stepValidation,
        step: "04",
        title: "Validation et paiement",
        shortDesc: "Confirmez et payez en toute sécurité",
        details: [
          "Validation de la collecte sur place",
          "Paiement via Mobile Money ou en espèces",
          "Reçu numérique envoyé automatiquement",
        ],
        color: "from-primary to-neon-light",
      },
    ],
  },
  {
    id: "alerte",
    label: "Alerte dépotoir",
    icon: AlertTriangle,
    subtitle: "Signalement citoyen",
    intro: "Devenez acteur de votre quartier : signalez instantanément une décharge sauvage et suivez sa résolution. Ensemble, rendons Kara plus propre.",
    ctaLabel: "Signaler un dépotoir",
    ctaLink: "/alerte-depotoir",
    steps: [
      {
        icon: Camera,
        image: stepReport,
        step: "01",
        title: "Prenez une photo",
        shortDesc: "Documentez le dépotoir en un clic",
        details: [
          "Ouvrez l'app ou envoyez via WhatsApp",
          "Prenez une ou plusieurs photos du site",
          "Ajoutez une description si vous le souhaitez",
        ],
        color: "from-primary to-secondary",
      },
      {
        icon: MapPin,
        image: stepLocate,
        step: "02",
        title: "Localisez le site",
        shortDesc: "Partagez la position exacte",
        details: [
          "Géolocalisation automatique via votre téléphone",
          "Ou indiquez manuellement le quartier et la rue",
          "La carte interactive affiche les zones signalées",
        ],
        color: "from-secondary to-accent",
      },
      {
        icon: Eye,
        image: stepCleanup,
        step: "03",
        title: "Suivi de l'intervention",
        shortDesc: "Restez informé de l'avancement",
        details: [
          "Votre signalement est transmis à notre équipe terrain",
          "Recevez des notifications à chaque étape",
          "Consultez le statut en temps réel sur votre compte",
        ],
        color: "from-accent to-primary",
      },
      {
        icon: ThumbsUp,
        image: stepResolved,
        step: "04",
        title: "Problème résolu",
        shortDesc: "Votre quartier redevient propre",
        details: [
          "Photo « avant/après » partagée avec vous",
          "Gagnez des points d'engagement citoyen",
          "Contribuez au classement des quartiers les plus propres",
        ],
        color: "from-primary to-neon-light",
      },
    ],
  },
  {
    id: "evenements",
    label: "Événementiel",
    icon: Users,
    subtitle: "Événements écocitoyens",
    intro: "Participez ou organisez des événements écocitoyens en quelques clics. Nettoyages collectifs, ateliers, conférences — tout est à portée de main.",
    ctaLabel: "Voir les événements",
    ctaLink: "/evenements",
    steps: [
      {
        icon: Calendar,
        image: stepBrowseEvents,
        step: "01",
        title: "Explorez le calendrier",
        shortDesc: "Découvrez les événements près de chez vous",
        details: [
          "Parcourez les événements à venir dans votre ville",
          "Filtrez par type : nettoyage, atelier, conférence",
          "Consultez les détails, dates et lieux",
        ],
        color: "from-primary to-secondary",
      },
      {
        icon: Ticket,
        image: stepRegisterEvent,
        step: "02",
        title: "Inscrivez-vous",
        shortDesc: "Réservez votre place en un tap",
        details: [
          "Inscription gratuite et instantanée",
          "Recevez votre confirmation par SMS ou WhatsApp",
          "Invitez vos amis à participer avec vous",
        ],
        color: "from-secondary to-accent",
      },
      {
        icon: Users,
        image: stepParticipate,
        step: "03",
        title: "Participez activement",
        shortDesc: "Vivez l'expérience sur le terrain",
        details: [
          "Rappel automatique la veille de l'événement",
          "Matériel et encadrement fournis sur place",
          "Partagez vos photos et moments forts",
        ],
        color: "from-accent to-primary",
      },
      {
        icon: Award,
        image: stepCertificate,
        step: "04",
        title: "Obtenez votre certificat",
        shortDesc: "Valorisez votre engagement",
        details: [
          "Certificat de participation numérique",
          "Points d'impact ajoutés à votre profil",
          "Débloquez des badges et récompenses exclusifs",
        ],
        color: "from-primary to-neon-light",
      },
    ],
  },
  {
    id: "academy",
    label: "Green Academy",
    icon: GraduationCap,
    subtitle: "Formation verte",
    intro: "Formez-vous à l'économie circulaire et devenez un ambassadeur du développement durable. Des cours gratuits, à votre rythme, depuis votre téléphone.",
    ctaLabel: "Accéder aux formations",
    ctaLink: "/green-academy",
    steps: [
      {
        icon: BookOpen,
        image: stepBrowseCourses,
        step: "01",
        title: "Choisissez un parcours",
        shortDesc: "Des formations adaptées à votre niveau",
        details: [
          "Catalogue de cours sur le recyclage et l'environnement",
          "Niveaux débutant, intermédiaire et avancé",
          "Contenus en français et en langues locales",
        ],
        color: "from-primary to-secondary",
      },
      {
        icon: Play,
        image: stepLearn,
        step: "02",
        title: "Apprenez à votre rythme",
        shortDesc: "Vidéos, articles et exercices pratiques",
        details: [
          "Modules courts de 5 à 15 minutes",
          "Accessible hors-ligne une fois téléchargé",
          "Suivez votre progression en temps réel",
        ],
        color: "from-secondary to-accent",
      },
      {
        icon: FileCheck,
        image: stepQuiz,
        step: "03",
        title: "Passez les quiz",
        shortDesc: "Validez vos acquis à chaque étape",
        details: [
          "Quiz interactifs à la fin de chaque module",
          "Résultats immédiats avec explications détaillées",
          "Possibilité de repasser autant de fois que nécessaire",
        ],
        color: "from-accent to-primary",
      },
      {
        icon: GraduationCap,
        image: stepAmbassador,
        step: "04",
        title: "Devenez ambassadeur",
        shortDesc: "Obtenez votre certification officielle",
        details: [
          "Diplôme numérique d'Ambassadeur Vert",
          "Accès à la communauté des éco-leaders",
          "Opportunités de mentorat et de missions terrain",
        ],
        color: "from-primary to-neon-light",
      },
    ],
  },
];
