import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle, MapPin, Coins } from "lucide-react";
import challenge1 from "@/assets/challenge-1.jpg";
import challenge2 from "@/assets/challenge-2.jpg";
import challenge3 from "@/assets/challenge-3.jpg";

type Panel = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  stat: { value: string; label: string };
  image: string;
  cta: { label: string; to: string; icon: React.ComponentType<{ className?: string }> };
  theme: "light" | "dark" | "ice";
  accent: "primary" | "secondary";
  reverse?: boolean;
};

const panels: Panel[] = [
  {
    index: "01",
    eyebrow: "État des lieux — Logistique",
    title: (<>Une collecte <span className="text-primary">défaillante</span></>),
    body:
      "Les pré-collecteurs opèrent à l'aveugle, sans données sur les flux de déchets. Les tournées sont sous-optimisées, le carburant gaspillé, et des milliers de ménages restent sans service régulier.",
    stat: { value: "60%", label: "des foyers sans ramassage régulier" },
    image: challenge1,
    cta: { label: "Demander un enlèvement", to: "/enlevement", icon: ArrowRight },
    theme: "ice",
    accent: "primary",
  },
  {
    index: "02",
    eyebrow: "État des lieux — Territoire",
    title: (<>Le dépotoir <span className="text-secondary">invisible</span></>),
    body:
      "Visibles au quotidien par les citoyens, ces points noirs échappent à toute comptabilité institutionnelle. L'absence de cartographie dynamique empêche d'agir là où ça brûle vraiment.",
    stat: { value: "0", label: "registre national des dépotoirs sauvages" },
    image: challenge2,
    cta: { label: "Signaler un dépotoir", to: "/alerte", icon: AlertTriangle },
    theme: "dark",
    accent: "secondary",
    reverse: true,
  },
  {
    index: "03",
    eyebrow: "État des lieux — Économie",
    title: (<>Un potentiel <span className="text-primary">inexploité</span></>),
    body:
      "Les déchets recyclables ont une valeur marchande réelle. Sans circuit de rachat structuré, cette ressource est perdue alors qu'elle pourrait nourrir des familles et créer des emplois verts durables.",
    stat: { value: "+50 F", label: "par kg de plastique racheté" },
    image: challenge3,
    cta: { label: "Vendre mes plastiques", to: "/vendre", icon: Coins },
    theme: "light",
    accent: "primary",
  },
];

const themeMap: Record<Panel["theme"], { bg: string; text: string; subtext: string; card: string; border: string }> = {
  light: { bg: "bg-background", text: "text-foreground", subtext: "text-muted-foreground", card: "bg-muted", border: "border-border" },
  ice:   { bg: "bg-muted",       text: "text-foreground", subtext: "text-muted-foreground", card: "bg-background", border: "border-border" },
  dark:  { bg: "bg-foreground",  text: "text-background", subtext: "text-background/70",   card: "bg-white/5",   border: "border-white/10" },
};

const AboutSection = () => {
  return (
    <section id="pourquoi" aria-label="État des lieux — pourquoi RecycHub Togo">
      {/* Intro — pleine page */}
      <div className="relative min-h-screen flex items-center bg-background overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-24">
          <span className="inline-flex items-center gap-2 text-primary font-bold tracking-[0.22em] text-[11px] uppercase">
            <span className="w-8 h-px bg-primary" />
            L'état des lieux
          </span>
          <h2 className="mt-6 font-extrabold text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.95] tracking-tight">
            Pourquoi <br className="hidden md:block" />
            RECYC<span className="text-primary">HUB</span> TOGO ?
          </h2>
          <p className="mt-8 text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl">
            Trois constats. Trois urgences. Trois leviers. Faites défiler pour comprendre comment nous transformons chaque déchet en opportunité.
          </p>
          <div className="mt-12 flex items-center gap-3 text-sm font-semibold text-foreground/60">
            <span className="w-10 h-px bg-foreground/30" />
            Défilez pour découvrir
          </div>
        </div>
      </div>

      {/* Trois panneaux plein écran */}
      {panels.map((p) => {
        const t = themeMap[p.theme];
        const accentText = p.accent === "primary" ? "text-primary" : "text-secondary";
        const accentBg = p.accent === "primary" ? "bg-primary" : "bg-secondary";
        const accentFg = p.accent === "primary" ? "text-primary-foreground" : "text-secondary-foreground";

        return (
          <div
            key={p.index}
            className={`relative min-h-screen w-full ${t.bg} ${t.text} overflow-hidden`}
          >
            <div className={`min-h-screen grid lg:grid-cols-2 ${p.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
              {/* Texte */}
              <div className="flex items-center px-6 md:px-12 lg:px-20 py-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="max-w-xl"
                >
                  <span
                    className={`font-extrabold text-[8rem] md:text-[12rem] leading-none block ${accentText} opacity-10 select-none`}
                  >
                    {p.index}
                  </span>
                  <span className={`mt-[-2rem] inline-flex items-center gap-2 ${accentText} font-bold tracking-[0.22em] text-[11px] uppercase`}>
                    <span className={`w-8 h-px ${accentBg}`} />
                    {p.eyebrow}
                  </span>
                  <h3 className="mt-6 font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight">
                    {p.title}
                  </h3>
                  <p className={`mt-6 text-lg md:text-xl leading-relaxed ${t.subtext}`}>
                    {p.body}
                  </p>
                  <Link
                    to={p.cta.to}
                    className={`mt-10 inline-flex items-center gap-3 px-6 py-3.5 rounded-full ${accentBg} ${accentFg} font-bold text-sm shadow-lg hover:scale-[1.03] hover:shadow-xl transition-all duration-300`}
                  >
                    <p.cta.icon className="w-4 h-4" />
                    {p.cta.label}
                  </Link>
                </motion.div>
              </div>

              {/* Visuel + stat */}
              <div className="relative flex items-center justify-center p-6 md:p-12 lg:p-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative w-full max-w-xl aspect-[4/5]"
                >
                  <div className={`absolute inset-0 rounded-[3rem] overflow-hidden ${t.border} border shadow-2xl`}>
                    <img
                      src={p.image}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>

                  {/* Carte stat flottante */}
                  <div className={`absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 ${t.card} ${t.border} border rounded-2xl p-5 md:p-6 shadow-2xl backdrop-blur-sm max-w-[260px]`}>
                    <div className={`flex items-center gap-2 mb-2 ${accentText}`}>
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Kara, Togo</span>
                    </div>
                    <div className={`font-extrabold text-4xl md:text-5xl leading-none ${accentText}`}>
                      {p.stat.value}
                    </div>
                    <div className={`mt-2 text-xs md:text-sm ${t.subtext} leading-snug`}>
                      {p.stat.label}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default AboutSection;
      