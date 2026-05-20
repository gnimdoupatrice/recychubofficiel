import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-recycling.jpg";

const ticker = [
  "Vendre mes plastiques",
  "Demander un enlèvement",
  "Signaler un dépotoir",
  "Se former aux métiers verts",
  "Opportunités & appels à projets",
  "Tournées digitalisées",
];

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-ink text-cream pt-16 md:pt-20"
      aria-label="RECYC HUB TOGO — Manifeste"
    >
      {/* Image éditoriale collée à droite */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[58%] lg:w-[52%]">
        <img
          src={heroImg}
          alt="Tri et recyclage à Kara"
          className="w-full h-full object-cover animate-slow-zoom"
          loading="eager"
          fetchPriority="high"
        />
        {/* Voile pour fondre vers la gauche */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent md:from-ink md:via-ink/40 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </div>

      {/* Bord vertical éditorial */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-cream/10" aria-hidden />

      {/* Filet horizontal de chapeau */}
      <div className="absolute top-16 md:top-20 inset-x-0 border-t border-cream/10" aria-hidden />

      <div className="relative z-10 container mx-auto px-6 md:px-10 lg:px-16 pt-12 md:pt-24 lg:pt-28 pb-16 md:pb-24">
        {/* En-tête méta */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 md:mb-20 text-[11px] uppercase tracking-[0.28em] text-cream/55 font-semibold">
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Édition 01 — Kara, Togo
          </span>
          <span className="hidden sm:inline-flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            08°59′N · 01°12′E
          </span>
          <span className="font-display normal-case tracking-normal text-base italic text-cream/80">
            Une ville propre, des revenus pour tous.
          </span>
        </div>

        {/* Titre manifeste */}
        <div className="max-w-[18ch] md:max-w-[14ch]">
          <h1 className="display-xl text-cream">
            Le déchet
            <br />
            n’est pas
            <br />
            <em className="font-display italic text-primary not-italic" style={{ fontStyle: 'italic' }}>une fin.</em>
          </h1>

          <p className="mt-8 max-w-md text-base md:text-lg leading-relaxed text-cream/75 font-body">
            RECYC HUB TOGO digitalise la collecte, rachète vos plastiques au kg, forme aux métiers verts
            et donne à chaque citoyen le pouvoir de signaler un dépotoir.{" "}
            <span className="text-cream">Une plateforme. Cinq actions. Une ville.</span>
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/vendre" className="btn-clay group">
              Vendre mes plastiques
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link to="/enlevement" className="link-underline text-cream/90 hover:text-cream">
              Demander un enlèvement
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Numérotation éditoriale */}
        <div className="hidden md:block absolute right-10 lg:right-16 top-32 text-cream/40 font-display text-sm leading-relaxed text-right">
          <div>N°01</div>
          <div className="mt-1 italic">Manifeste</div>
        </div>
      </div>

      {/* Marquee bas de hero */}
      <div className="absolute bottom-0 inset-x-0 border-t border-cream/10 bg-ink/80 backdrop-blur-sm py-4">
        <div className="marquee">
          <div className="marquee__track font-display italic text-2xl md:text-3xl text-cream/80">
            {[...ticker, ...ticker].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                {t}
                <span className="text-primary" aria-hidden>✺</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
