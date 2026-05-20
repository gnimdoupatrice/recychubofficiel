import { ArrowRight, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * HeroSection — Direction "Brutalist Civic-Tech"
 * Typographie monumentale Instrument Serif, grille brutaliste bordée or sable,
 * blocs service haute-densité, bandeau alerte terracotta.
 */
const HeroSection = () => {
  return (
    <section
      className="relative bg-[hsl(158_41%_7%)] text-[hsl(45_38%_94%)] pt-20 md:pt-24 pb-6 md:pb-10 selection:bg-secondary selection:text-[hsl(158_41%_7%)]"
      aria-label="RECYC HUB TOGO — vendre vos plastiques, faire enlever vos déchets"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 space-y-1">

        {/* ═══ TOP DATA BAR — 3 colonnes bordées or sable ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-secondary divide-y-2 md:divide-y-0 md:divide-x-2 divide-secondary">
          <div className="p-5 md:p-6 flex flex-col justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
              Localisation
            </span>
            <p className="text-lg md:text-xl font-semibold">Kara, Togo</p>
          </div>
          <div className="p-5 md:p-6 flex flex-col justify-between gap-2 bg-secondary text-[hsl(158_41%_7%)]">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">
              Impact direct
            </span>
            <p className="font-mono text-3xl md:text-4xl font-bold italic tracking-tighter">
              2 500+ KG
            </p>
          </div>
          <div className="p-5 md:p-6 flex flex-col justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
              Contact direct
            </span>
            <a
              href="tel:+22897684030"
              className="text-lg md:text-xl font-semibold hover:text-secondary transition-colors"
            >
              +228 97 68 40 30
            </a>
          </div>
        </div>

        {/* ═══ MONUMENTAL HERO ═══ */}
        <div className="border-x-2 border-b-2 border-secondary p-6 md:p-12 lg:p-16">
          <div className="mb-6 md:mb-8 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-secondary">
              Plateforme phygitale · Édition 2026
            </span>
          </div>

          <h1 className="font-editorial font-normal leading-[0.88] tracking-tight uppercase text-[15vw] md:text-[10vw] lg:text-[8.5vw] xl:text-[8rem]">
            Vendre <span className="italic text-accent">vos</span>
            <br />
            <span className="text-secondary">plastiques</span>
            <br />
            <span className="text-[12vw] md:text-[8vw] lg:text-[6.5vw] xl:text-[6rem] normal-case">
              &amp; nettoyer Kara.
            </span>
          </h1>

          <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end justify-between gap-8 border-t-2 border-secondary/30 pt-8">
            <p className="max-w-xl text-base md:text-lg text-[hsl(45_38%_94%)]/75 leading-relaxed">
              Plateforme phygitale de rachat au kg et collecte de déchets ménagers
              à Kara. <span className="text-secondary font-semibold">L'hygiène publique</span>{" "}
              rencontre la <span className="text-accent font-semibold">rémunération mobile</span>.
            </p>
            <div className="flex flex-col gap-2 shrink-0">
              <span className="font-mono text-[10px] text-secondary uppercase tracking-[0.2em]">
                Statut service
              </span>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse" />
                <span className="font-mono text-xs md:text-sm uppercase tracking-[0.18em]">
                  Opérationnel — Kara centre
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ SERVICE BLOCKS — 2 colonnes ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-x-2 border-b-2 border-secondary divide-y-2 md:divide-y-0 md:divide-x-2 divide-secondary">

          {/* Service 01 — Rachat */}
          <Link
            to="/vendre"
            className="group relative p-7 md:p-10 lg:p-12 hover:bg-accent transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
            aria-label="Vendre mes plastiques au kg"
          >
            <div className="flex justify-between items-start mb-12 md:mb-16">
              <span className="font-mono text-3xl md:text-4xl font-bold opacity-30 group-hover:opacity-100 transition-opacity">
                01
              </span>
              <div className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center border-2 border-current">
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </div>
            </div>
            <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl italic leading-none mb-5">
              Rachat de plastiques
            </h2>
            <p className="text-base md:text-lg mb-6 md:mb-8 text-[hsl(45_38%_94%)]/80 group-hover:text-[hsl(45_38%_94%)] leading-relaxed">
              Transformez PET, PEHD, PP et sachets Pure Water en revenus immédiats.
              <strong className="block mt-2 text-secondary group-hover:text-[hsl(158_41%_7%)] font-mono text-xl">
                Jusqu'à 150 FCFA/kg
              </strong>
            </p>
            <span className="inline-block font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] border border-current px-3 py-1.5">
              Mobile Money · Cash
            </span>
          </Link>

          {/* Service 02 — Enlèvement */}
          <Link
            to="/enlevement"
            className="group relative p-7 md:p-10 lg:p-12 hover:bg-secondary hover:text-[hsl(158_41%_7%)] transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
            aria-label="Demander un enlèvement de déchets ménagers"
          >
            <div className="flex justify-between items-start mb-12 md:mb-16">
              <span className="font-mono text-3xl md:text-4xl font-bold opacity-30 group-hover:opacity-100 transition-opacity">
                02
              </span>
              <div className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center border-2 border-current">
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </div>
            </div>
            <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl italic leading-none mb-5">
              Collecte ménagère
            </h2>
            <p className="text-base md:text-lg mb-6 md:mb-8 opacity-80 group-hover:opacity-100 leading-relaxed">
              Enlèvement à domicile de déchets ménagers, organiques et encombrants.
              <strong className="block mt-2 font-semibold">
                Passage hebdomadaire garanti
              </strong>
            </p>
            <span className="inline-block font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] border border-current px-3 py-1.5">
              Abonnement flexible
            </span>
          </Link>
        </div>

        {/* ═══ ALERTE CIVIQUE — bandeau terracotta ═══ */}
        <Link
          to="/alerte"
          className="group block border-x-2 border-b-2 border-secondary bg-destructive text-[hsl(45_38%_94%)] p-5 md:p-6 hover:bg-[hsl(14_70%_45%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
          aria-label="Signaler un dépotoir sauvage"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 md:w-10 md:h-10 border-2 border-current flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
              </div>
              <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.18em] italic">
                Urgence civique — Signaler un dépotoir sauvage
              </span>
            </div>
            <span className="inline-flex items-center gap-2 text-sm md:text-base group-hover:translate-x-2 transition-transform">
              Cartographier les zones critiques
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
