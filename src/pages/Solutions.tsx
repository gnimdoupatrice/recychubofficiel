import SEO from "@/components/SEO";
import SolutionsSection from "@/components/SolutionsSection";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Solutions = () => (
  <div className="min-h-screen bg-white">
    <SEO
      title="Nos solutions · RECYC HUB TOGO"
      description="Découvrez l'écosystème RECYC HUB TOGO : Solution Pro pour les entreprises de pré-collecte, système de rachat des plastiques, alerte dépotoirs et Green Academy."
      path="/solutions"
    />

    {/* Editorial header */}
    <header className="relative bg-foreground text-background pt-36 pb-24 md:pt-44 md:pb-32 px-6 md:px-12 lg:px-24 font-inter overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
          Nos piliers
        </span>
        <h1 className="mt-6 font-editorial font-bold text-5xl md:text-7xl leading-[1.05] max-w-4xl">
          Un écosystème au service{" "}
          <span className="italic text-primary">d'un Togo plus propre</span>.
        </h1>
        <p className="mt-8 text-background/75 font-light text-lg md:text-xl max-w-2xl leading-relaxed">
          Quatre piliers complémentaires : une plateforme B2B pour piloter la
          collecte, un système de rachat des plastiques, une alerte citoyenne
          contre les dépotoirs sauvages et une académie verte pour former la
          relève.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/vendre"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Vendre mes plastiques
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            to="/enlevement"
            className="inline-flex items-center gap-2 border border-background/30 px-6 py-3 rounded-sm font-semibold text-sm hover:bg-background/10 transition-colors"
          >
            Demander un enlèvement
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </header>

    <SolutionsSection />
  </div>
);

export default Solutions;