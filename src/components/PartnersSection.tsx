import { Building2, Handshake, ArrowUpRight } from "lucide-react";

const partners = [
  "Mairie de Kara",
  "Préfecture de Kozah",
  "JVE Branche Kara",
  "AJACK Kara",
  "Rotaract Université de Kara",
  "JCI Kara Elite",
];

const PartnersSection = () => (
  <section className="band-ice py-24 md:py-32 px-6 md:px-12 lg:px-24 font-inter">
    <div className="max-w-6xl mx-auto">
      <div className="mb-16 md:mb-20 text-center max-w-2xl mx-auto">
        <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
          Écosystème
        </span>
        <h2 className="mt-6 font-editorial font-bold text-4xl md:text-5xl text-foreground leading-tight">
          Ils nous{" "}
          <span className="italic text-primary">accompagnent</span>.
        </h2>
        <p className="mt-6 text-muted-foreground font-light text-lg italic">
          Institutions, ONG et collectifs engagés à nos côtés pour un Togo plus
          propre.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-foreground/10 border-y border-foreground/10 mb-16">
        {partners.map((name) => (
          <div
            key={name}
            className="bg-muted hover:bg-white transition-colors flex flex-col items-center justify-center p-6 min-h-[130px] grayscale hover:grayscale-0"
          >
            <Building2 className="w-7 h-7 text-foreground/40 mb-3" strokeWidth={1.5} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/70 text-center leading-tight">
              {name}
            </span>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto bg-white border border-foreground/10 p-8 md:p-10 rounded-sm flex flex-col md:flex-row items-start gap-6">
        <div className="w-14 h-14 rounded-sm bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Handshake className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-primary">
            Partenariat institutionnel
          </span>
          <h3 className="mt-3 font-editorial font-bold text-2xl text-foreground leading-snug">
            Vous représentez une institution ou une ONG&nbsp;?
          </h3>
          <p className="mt-3 text-muted-foreground font-light leading-relaxed">
            Bâtissons ensemble la prochaine étape de l'économie circulaire au
            Togo. Écrivez-nous pour ouvrir le dialogue.
          </p>
          <a
            href="mailto:recychubtogo@gmail.com"
            className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Devenir partenaire
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default PartnersSection;
