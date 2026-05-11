import { Building2, Handshake, ArrowRight } from "lucide-react";

const partners = [
  "Mairie de Kara",
  "Préfecture de Kozah",
  "JVE Branche locale Kara",
  "AJACK KARA",
  "Rotaract Club Université de Kara",
  "JCI Kara Elite",
];

const PartnersSection = () => (
  <section className="wp-section bg-background">
    <div className="container mx-auto px-4">
      <div className="wp-section-header center">
        <span className="wp-eyebrow">Écosystème</span>
        <h2 className="wp-section-title">
          Ils nous font <span className="text-secondary">confiance</span>
        </h2>
        <p className="wp-section-subtitle">
          RECYC HUB TOGO collabore avec les institutions locales, ONG et partenaires du développement pour un impact durable.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 max-w-5xl mx-auto mb-14 border-2 border-foreground/90 divide-x-2 divide-y-2 divide-foreground/10 [&>*:nth-child(-n+3)]:border-t-0 sm:[&>*:nth-child(-n+3)]:border-t-0 [&>*:nth-child(3n+1)]:border-l-0 sm:[&>*:nth-child(3n+1)]:border-l-0 lg:[&>*:nth-child(-n+6)]:border-t-0 lg:[&>*:nth-child(6n+1)]:border-l-0">
        {partners.map((name) => (
          <div
            key={name}
            className="flex flex-col items-center justify-center p-5 bg-card hover:bg-primary hover:text-primary-foreground transition-colors min-h-[120px] group"
          >
            <Building2 className="w-8 h-8 text-primary/50 mb-2 group-hover:text-primary-foreground" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-center leading-tight">
              {name}
            </span>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto wp-card-primary p-7 flex items-start gap-5">
        <div className="w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center shrink-0 border-2 border-foreground">
          <Handshake className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <p className="wp-eyebrow mb-2">Partenariat</p>
          <h3 className="font-display font-extrabold text-foreground text-lg mb-2">
            Vous êtes une institution ou une ONG ?
          </h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Collaborons ensemble pour un avenir plus propre. Contactez-nous pour un partenariat institutionnel.
          </p>
          <a href="mailto:recychubtogo@gmail.com" className="wp-btn-primary text-[11px]">
            Devenir partenaire <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default PartnersSection;
