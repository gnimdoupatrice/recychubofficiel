import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu, X, Sprout, AlertTriangle, CalendarDays, UserPlus, LogOut, User, ShieldCheck,
  ChevronDown, ShoppingBag, Truck, Compass, Home,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import logoImg from "@/assets/logo.png";

const discoverLinks = [
  { to: "/academy", label: "Green Academy", desc: "Formations & ateliers", icon: Sprout, accent: "primary" as const },
  { to: "/evenements", label: "Événements", desc: "Agenda & opportunités", icon: CalendarDays, accent: "accent" as const },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [alerteToast, setAlerteToast] = useState(false);
  const discoverRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  // Placeholder live counter for civic vigilance — sera connecté à la vraie data plus tard
  const alerteCount = 3;

  useEffect(() => {
    if (!user) { setIsAdmin(false); return; }
    supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }).then(({ data }) => setIsAdmin(!!data));
  }, [user]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDiscoverOpen(false);
  }, [location]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (discoverRef.current && !discoverRef.current.contains(e.target as Node)) {
        setDiscoverOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isDiscoverActive = discoverLinks.some(s => location.pathname === s.to);

  const accentClasses: Record<string, string> = {
    primary: "bg-secondary/15 text-secondary group-hover:bg-secondary/25",
    secondary: "bg-secondary/15 text-secondary group-hover:bg-secondary/25",
    accent: "bg-accent/20 text-accent group-hover:bg-accent/30",
    destructive: "bg-destructive/15 text-destructive group-hover:bg-destructive/25",
  };

  type Tone = "neutral" | "secondary" | "accent" | "sky" | "destructive";
  const toneMap: Record<Tone, { active: string; hover: string; under: string }> = {
    neutral: {
      active: "text-primary bg-primary/10 border-primary/30 shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.35)]",
      hover: "hover:text-primary hover:bg-primary/[0.06] hover:border-primary/20",
      under: "via-primary",
    },

    secondary: {
      active: "text-secondary bg-secondary/15 border-secondary/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_-12px_hsl(var(--secondary)/0.6)]",
      hover: "hover:text-secondary hover:bg-secondary/10 hover:border-secondary/30",
      under: "via-secondary",
    },
    accent: {
      active: "text-accent bg-accent/15 border-accent/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_-12px_hsl(var(--accent)/0.6)]",
      hover: "hover:text-accent hover:bg-accent/10 hover:border-accent/30",
      under: "via-accent",
    },
    sky: {
      active: "text-[hsl(195_80%_70%)] bg-[hsl(195_80%_60%)]/15 border-[hsl(195_80%_60%)]/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_-12px_hsl(195_80%_60%/0.6)]",
      hover: "hover:text-[hsl(195_80%_75%)] hover:bg-[hsl(195_80%_60%)]/10 hover:border-[hsl(195_80%_60%)]/30",
      under: "via-[hsl(195_80%_70%)]",
    },
    destructive: {
      active: "text-destructive bg-destructive/15 border-destructive/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_-12px_hsl(var(--destructive)/0.6)]",
      hover: "hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30",
      under: "via-destructive",
    },
  };

  const linkClass = (active: boolean, tone: Tone = "neutral") => {
    const t = toneMap[tone];
    return [
      "group relative inline-flex items-center gap-1.5 h-10 px-4 rounded-full",
      "text-[13px] font-semibold tracking-tight whitespace-nowrap",
      "transition-[background,box-shadow,border-color,color,transform] duration-300 ease-out",
      "[&_svg]:transition-transform [&_svg]:duration-300",
      "border backdrop-blur-md",
      active
        ? t.active
        : `text-foreground/75 border-transparent ${t.hover} hover:border-border`,

    ].join(" ");
  };

  const Underline = ({ active, tone = "neutral" as Tone }: { active: boolean; tone?: Tone }) => (
    <span
      aria-hidden
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-1.5 h-px bg-gradient-to-r from-transparent ${toneMap[tone].under} to-transparent transition-all duration-300 ease-out ${
        active ? "w-7 opacity-90" : "w-0 opacity-0 group-hover:w-7 group-hover:opacity-80"
      }`}
    />
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "h-16 bg-background/85 backdrop-blur-2xl border-b border-border shadow-sm"
            : "h-20 bg-background/70 backdrop-blur-md"
        } flex items-center`}

      >
        {/* Ligne d'accent verte animée — visible quand scrollé (signature "écologie en mouvement") */}
        <span
          aria-hidden
          className={`pointer-events-none absolute left-0 right-0 bottom-0 h-px overflow-hidden transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          <span
            className="block h-full w-[200%] -translate-x-1/2"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, hsl(var(--secondary)/0.0) 20%, hsl(var(--secondary)/0.8) 45%, hsl(var(--accent)/0.9) 55%, hsl(var(--secondary)/0.0) 80%, transparent 100%)",
              animation: "navbar-accent-slide 8s linear infinite",
            }}
          />
        </span>

        {/* Barre de progression scroll — fine ligne verte qui se remplit */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-secondary via-accent to-secondary transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%`, opacity: scrolled ? 1 : 0.7 }}
        />

        <div className="container max-w-[1440px] mx-auto px-5 lg:px-10 flex items-center justify-between gap-8 w-full">
          {/* LOGO — strictement figé, aucune transformation au hover ni au clic */}
          <Link to="/" className="flex items-center gap-3 shrink-0 select-none" aria-label="RecycHub Togo — Accueil">
            <img
              src={logoImg}
              alt="RecycHub Togo"
              draggable={false}
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-lg pointer-events-none"
            />
            <span className="hidden sm:inline-block font-bold text-[16px] tracking-tight text-foreground leading-none">
              RECYC <span className="text-primary">HUB</span>
            </span>

          </Link>

          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            <Link to="/" className={linkClass(location.pathname === "/", "neutral")}>
              <Home className="w-3.5 h-3.5 group-hover:-translate-y-[1px]" />
              Accueil
              <Underline active={location.pathname === "/"} tone="neutral" />
            </Link>

            {/* Alerte dépotoir — pulsation jaune→rouge + live counter */}
            <Link
              to="/alerte"
              onClick={() => { setAlerteToast(true); window.setTimeout(() => setAlerteToast(false), 2600); }}
              aria-label="Alerte dépotoir — signaler un dépotoir sauvage"
              className={`${linkClass(location.pathname === "/alerte", "destructive")} animate-alerte-ring`}
            >
              <span aria-hidden className="relative inline-flex items-center justify-center w-4 h-4 group-hover:[animation:nav-shake_.4s_ease-in-out]">
                <AlertTriangle className="w-4 h-4 animate-alerte-color" strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />
              </span>
              <span className="relative">Alerte dépotoir</span>
              {/* Mini live indicator — apparaît au hover */}
              <span
                aria-label={`${alerteCount} signalements aujourd'hui`}
                className="ml-0.5 inline-flex items-center gap-1 max-w-0 opacity-0 overflow-hidden group-hover:max-w-[120px] group-hover:opacity-100 transition-all duration-300 ease-out"
              >
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-1.5 py-px rounded-full bg-destructive/25 text-white ring-1 ring-destructive/50 whitespace-nowrap">
                  <span className="w-1 h-1 rounded-full bg-destructive animate-pulse" />
                  {alerteCount} aujourd'hui
                </span>
              </span>
              <Underline active={location.pathname === "/alerte"} tone="destructive" />

              <span
                role="status"
                aria-live="polite"
                className={`pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/85 backdrop-blur-md border border-destructive/40 px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_12px_30px_-12px_hsl(0_90%_55%/0.6)] ${
                  alerteToast ? "opacity-100 animate-alerte-toast" : "opacity-0"
                }`}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-destructive mr-2 align-middle animate-pulse" />
                Merci pour votre vigilance 🙏
              </span>
            </Link>

            {/* Vendre — vert secondary, icône qui rebondit + badge FCFA au hover */}
            <Link to="/vendre" className={linkClass(location.pathname === "/vendre", "secondary")}>
              <ShoppingBag className="w-3.5 h-3.5 group-hover:[animation:nav-bounce_.5s_ease-out]" />
              Vendre mes plastiques
              <span className="ml-0.5 inline-flex items-center max-w-0 opacity-0 overflow-hidden group-hover:max-w-[80px] group-hover:opacity-100 transition-all duration-300 ease-out">
                <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-px rounded-full bg-secondary/25 text-secondary ring-1 ring-secondary/40 whitespace-nowrap">
                  +150 F/kg
                </span>
              </span>
              <Underline active={location.pathname === "/vendre"} tone="secondary" />
            </Link>

            {/* Découvrir dropdown — accent doré */}
            <div ref={discoverRef} className="relative">
              <button
                onClick={() => setDiscoverOpen(o => !o)}
                onMouseEnter={() => setDiscoverOpen(true)}
                aria-expanded={discoverOpen}
                aria-haspopup="true"
                className={linkClass(isDiscoverActive || discoverOpen, "accent")}
              >
                <Compass className="w-3.5 h-3.5 group-hover:rotate-[20deg]" />
                Découvrir
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${discoverOpen ? "rotate-180" : ""}`} />
                <Underline active={isDiscoverActive || discoverOpen} tone="accent" />
              </button>

              {discoverOpen && (
                <div
                  onMouseLeave={() => setDiscoverOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[380px] rounded-2xl bg-background/95 backdrop-blur-2xl border border-border shadow-xl p-2 overflow-hidden origin-top"
                  style={{ animation: "scale-in .22s cubic-bezier(.2,.9,.3,1.2)" }}
                >
                  <span aria-hidden className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-background border-l border-t border-border" />
                  {discoverLinks.map((s, i) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      style={{ animation: `fade-in .35s ease-out ${i * 60}ms both` }}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-all duration-300 hover:translate-x-0.5"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg] ${accentClasses[s.accent]}`}>
                        <s.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-foreground">{s.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

            </div>

            {/* Enlèvement — bleu/teal logistique, camion qui roule à droite */}
            <Link to="/enlevement" className={linkClass(location.pathname === "/enlevement", "sky")}>
              <Truck className="w-3.5 h-3.5 group-hover:translate-x-[3px]" />
              Enlèvement de déchets
              <Underline active={location.pathname === "/enlevement"} tone="sky" />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="group inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-[13px] font-bold text-white bg-white/[0.08] border border-white/20 hover:bg-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-300 hover:shadow-[0_8px_24px_-10px_rgba(255,255,255,0.25)] [&_svg]:transition-transform hover:[&_svg]:rotate-[-8deg]"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Admin
                  </Link>
                )}
                <span className="text-[12.5px] font-semibold text-white/75 flex items-center gap-1.5 px-2">
                  <User className="w-3.5 h-3.5" />
                  {profile?.pseudo || "Utilisateur"}
                </span>
                <button
                  onClick={handleSignOut}
                  className="group inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-[13px] font-bold text-white bg-white/[0.08] border border-white/20 hover:bg-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-300 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
                >
                  <LogOut className="w-3.5 h-3.5" /> Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/inscription"
                aria-label="S'inscrire — créer un compte"
                className="group relative inline-flex items-center gap-1.5 h-11 px-6 rounded-full text-[13px] font-bold text-secondary-foreground overflow-hidden ring-1 ring-secondary/40 shadow-[0_10px_30px_-10px_hsl(var(--secondary)/0.6),inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.03] hover:ring-2 hover:ring-secondary/60 hover:shadow-[0_18px_40px_-12px_hsl(var(--secondary)/0.7),inset_0_1px_0_rgba(255,255,255,0.45)] active:scale-[0.98] animate-[nav-cta-halo_3.2s_ease-in-out_infinite]"
                style={{ background: "linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--accent)) 100%)" }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/45 to-transparent translate-x-[-120%] group-hover:translate-x-[320%] transition-transform duration-700 ease-out"
                />
                <UserPlus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <span className="relative">S'inscrire</span>
              </Link>
            )}
          </div>

          <button
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-white rounded-full border border-transparent hover:bg-white/10 hover:border-white/15 transition-all duration-300"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            <div className="relative w-6 h-6">
              <Menu className={`absolute inset-0 transition-all duration-300 ${mobileOpen ? "opacity-0 rotate-90" : "opacity-100"}`} />
              <X className={`absolute inset-0 transition-all duration-300 ${mobileOpen ? "opacity-100" : "opacity-0 -rotate-90"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-primary/40 backdrop-blur-2xl" />
        <div className="relative h-full overflow-y-auto pt-24 pb-10 px-6 text-white">
          <div className="max-w-md mx-auto space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/65 font-bold mb-3">Services phares</p>
              <div className="space-y-2">
                <Link to="/vendre" className="flex items-center gap-3 p-3 rounded-2xl bg-white/8 border border-white/15 hover:bg-white/15 backdrop-blur-md transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accentClasses.secondary}`}>
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Vendre mes plastiques</div>
                    <div className="text-xs text-white/65">Catalogue de rachat au kg</div>
                  </div>
                </Link>
                <Link to="/enlevement" className="flex items-center gap-3 p-3 rounded-2xl bg-white/8 border border-white/15 hover:bg-white/15 backdrop-blur-md transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accentClasses.accent}`}>
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Enlèvement de déchets</div>
                    <div className="text-xs text-white/65">Logistique à domicile</div>
                  </div>
                </Link>
                <Link to="/alerte" className="flex items-center gap-3 p-3 rounded-2xl bg-white/8 border border-white/15 hover:bg-white/15 backdrop-blur-md transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accentClasses.destructive}`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Alerte dépotoir</div>
                    <div className="text-xs text-white/65">Signalement géolocalisé</div>
                  </div>
                </Link>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-white/65 font-bold mb-3">Découvrir</p>
              <div className="space-y-1">
                <Link to="/" className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 text-white font-medium">
                  Accueil
                </Link>
                {discoverLinks.map(link => (
                  <Link key={link.to} to={link.to} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 text-white font-medium">
                    <link.icon className="w-5 h-5 text-primary" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/15 space-y-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" className="flex items-center gap-2 px-3 py-3 rounded-xl text-primary font-semibold">
                      <ShieldCheck className="w-5 h-5" /> Admin
                    </Link>
                  )}
                  <div className="px-3 py-2 text-sm text-white/65">{profile?.pseudo || "Utilisateur"}</div>
                  <button onClick={handleSignOut} className="w-full text-left px-3 py-3 rounded-xl hover:bg-white/10 text-white font-medium flex items-center gap-2">
                    <LogOut className="w-5 h-5" /> Déconnexion
                  </button>
                </>
              ) : (
                <Link to="/inscription" className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full gradient-bio text-primary-foreground font-bold">
                  <UserPlus className="w-5 h-5" /> S'inscrire
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
