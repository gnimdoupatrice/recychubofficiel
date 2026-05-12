import { useState } from "react";
import { Recycle, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

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
      "Signe distinctif : ligne de soudure droite traversant tout le fond",
      "Surnoms : bidon, plastique non transparent",
      "Exemples : flacons de shampoing, bidons d'huile, détergent",
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
      "Signe distinctif : petit point rond d'injection centré au fond",
      "Surnoms : plastique de ménage, plastique de foyer",
      "Exemples : ustensiles de cuisine, seaux, bassines",
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
      "Surnoms : sachets « pure water », films d'emballage",
      "Exemples : sachets d'eau vidés, sachets fins, films propres",
    ],
    price: "50",
    unit: "kg",
    altPrice: "Sachets propres, sales comme secs",
  },
];

const PlasticImageSwap = ({ images, alt }: { images: string[]; alt: string }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative w-full h-full overflow-hidden"
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

const PlasticRow = ({
  plastic,
  index,
}: {
  plastic: (typeof plasticRows)[0];
  index: number;
}) => {
  const isEven = index % 2 === 0;
  return (
    <div className="bg-white border border-foreground/10 overflow-hidden rounded-sm shadow-[0_2px_30px_-12px_hsl(var(--foreground)/0.1)] hover:shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.18)] transition-shadow">
      <div
        className={`flex flex-col md:flex-row ${
          !isEven ? "md:flex-row-reverse" : ""
        } min-h-[320px]`}
      >
        <div className="w-full md:w-[45%] aspect-[4/3] md:aspect-auto bg-[hsl(150_14%_97%)]">
          <PlasticImageSwap images={plastic.images} alt={`${plastic.code} - ${plastic.name}`} />
        </div>

        <div className="w-full md:w-[55%] p-6 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm">
              {plastic.code}
            </span>
            <div className="h-px flex-1 bg-foreground/10" />
          </div>
          <h3 className="font-editorial font-bold text-2xl md:text-3xl text-foreground leading-snug mb-6">
            {plastic.name}
          </h3>

          <div className="mb-6">
            <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <Recycle className="w-3.5 h-3.5" />
              Comment l'identifier
            </p>
            <ul className="space-y-2">
              {plastic.identifiers.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-[15px] text-muted-foreground leading-snug font-light">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-foreground/10">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-editorial font-bold text-4xl md:text-5xl text-primary leading-none">
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
            <Link
              to="/vendre"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Vendre maintenant <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="bg-white py-24 md:py-32 px-6 md:px-12 lg:px-24 font-inter"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 max-w-3xl">
        <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
          Catalogue de rachat
        </span>
          <h2 className="font-editorial font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05] mb-6">
            Vos déchets plastiques,{" "}
            <span className="italic text-primary">une vraie monnaie</span>.
          </h2>
          <p className="text-muted-foreground font-light text-lg leading-relaxed max-w-2xl">
            Six familles de plastiques rachetées à prix transparent. Identifiez,
            apportez ou faites enlever — paiement immédiat en cash ou Mobile
            Money, dès le premier kilo.
          </p>
        </div>

        <div className="space-y-8">
          {plasticRows.map((plastic, index) => (
            <PlasticRow key={plastic.code} plastic={plastic} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
