import { Building2, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const partners = [
  "Mairie de Kara",
  "Préfecture de Kozah",
  "ANGE Togo",
  "GIZ Togo",
  "PNUD",
  "UNICEF",
];

const PartnersSection = () => (
  <section className="section-spacing bg-muted/30">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Écosystème
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-4 text-foreground">
          Ils nous font <span className="text-gradient-emerald">confiance</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          RECYC HUB TOGO collabore avec les institutions locales, ONG et partenaires au développement pour un impact durable.
        </p>
      </div>

      {/* Partner logos placeholder */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto mb-12">
        {partners.map((name) => (
          <div
            key={name}
            className="flex flex-col items-center justify-center p-4 rounded-xl glass hover:glow-emerald transition-all duration-300 min-h-[100px]"
          >
            <Building2 className="w-8 h-8 text-primary/40 mb-2" />
            <span className="text-xs font-medium text-muted-foreground text-center leading-tight">
              {name}
            </span>
          </div>
        ))}
      </div>

      {/* CTA Partenaires */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 p-6 rounded-2xl glass max-w-lg">
          <Handshake className="w-10 h-10 text-primary shrink-0" />
          <div className="text-left">
            <h3 className="font-display font-semibold text-foreground text-sm">
              Vous êtes une institution ou une ONG ?
            </h3>
            <p className="text-xs text-muted-foreground mb-2">
              Collaborons pour un Kara plus propre. Contactez-nous pour un partenariat.
            </p>
            <a
              href="mailto:recychubtogo@gmail.com"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Devenir partenaire <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PartnersSection;
