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
  <section className="section-spacing bg-muted/30">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <span className="gb-eyebrow mb-4">Écosystème</span>
        <h2 className="gb-title mt-4">Ils nous font confiance</h2>
        <div className="gb-rule mx-auto mt-5" />
        <p className="text-muted-foreground max-w-lg mx-auto mt-5 text-sm">
          RECYC HUB TOGO collabore avec les institutions locales, ONG et partenaires du développement pour un impact durable.
        </p>
      </div>

      {/* Partner blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto mb-12">
        {partners.map((name) => (
          <div
            key={name}
            className="gb-block gb-block-hover flex flex-col items-center justify-center p-4 min-h-[100px]"
          >
            <Building2 className="w-8 h-8 text-foreground/40 mb-2" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-foreground text-center leading-tight">
              {name}
            </span>
          </div>
        ))}
      </div>

      {/* CTA Partenaires */}
      <div className="flex justify-center">
        <div className="gb-block-primary p-6 max-w-lg flex items-center gap-4">
          <div className="gb-icon-box w-12 h-12 shrink-0">
            <Handshake className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="font-display font-extrabold text-foreground text-sm uppercase tracking-wide mb-1">
              Vous êtes une institution ou une ONG ?
            </h3>
            <p className="text-xs text-muted-foreground mb-2">
              Collaborons ensemble pour un avenir plus propre.
            </p>
            <a
              href="mailto:recychubtogo@gmail.com"
              className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-[0.15em] text-primary hover:underline"
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
