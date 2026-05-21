import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu, X, Sprout, AlertTriangle, CalendarDays, UserPlus, LogOut, User, ShieldCheck,
  ChevronDown, ShoppingBag, Truck, Compass,
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [alerteToast, setAlerteToast] = useState(false);
  const discoverRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();


  useEffect(() => {
    if (!user) { setIsAdmin(false); return; }
    supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }).then(({ data }) => setIsAdmin(!!data));
  }, [user]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
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

  // Pill premium unifié — h-9, underline animée, icône qui se soulève au hover
  const linkClass = (active: boolean) =>
    [
      "group relative inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full",
      "text-[12.5px] font-semibold tracking-tight whitespace-nowrap",
      "transition-[background,box-shadow,border-color,color,transform] duration-300 ease-out",
      "[&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:-translate-y-[1px]",
      active
        ? "text-white bg-white/[0.14] border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md"
        : "text-white/85 border border-transparent hover:text-white hover:bg-white/[0.08] hover:border-white/15 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
    ].join(" ");

  // Underline animée centrée — révélation du centre vers l'extérieur
  const Underline = ({ active }: { active: boolean }) => (
    <span
      aria-hidden
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-1 h-px bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-300 ease-out ${
        active ? "w-6 opacity-90" : "w-0 opacity-0 group-hover:w-6 group-hover:opacity-80"
      }`}
    />
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "h-14 bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/30"
            : "h-16 bg-black/30 backdrop-blur-md border-b border-white/5"
        } flex items-center`}
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between gap-6 w-full">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0" aria-label="RecycHub Togo — Accueil">
            <img src={logoImg} alt="RecycHub Togo" className="w-9 h-9 sm:w-10 sm:h-10 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg] drop-shadow-lg" />
            <span className="hidden sm:inline-block font-editorial font-bold text-[15px] tracking-tight text-white leading-none">
              RECYC <span className="italic text-secondary">HUB</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            <Link to="/" className={linkClass(location.pathname === "/")}>
              Accueil
              <Underline active={location.pathname === "/"} />
            </Link>

            <Link to="/alerte" className={linkClass(location.pathname === "/alerte")}>
              <AlertTriangle className="w-3.5 h-3.5" />
              Alerte dépotoir
              <Underline active={location.pathname === "/alerte"} />
            </Link>

            <Link to="/vendre" className={linkClass(location.pathname === "/vendre")}>
              <ShoppingBag className="w-3.5 h-3.5" />
              Vendre mes plastiques
              <Underline active={location.pathname === "/vendre"} />
            </Link>

            {/* Découvrir dropdown */}
            <div ref={discoverRef} className="relative">
              <button
                onClick={() => setDiscoverOpen(o => !o)}
                onMouseEnter={() => setDiscoverOpen(true)}
                aria-expanded={discoverOpen}
                aria-haspopup="true"
                className={linkClass(isDiscoverActive || discoverOpen)}
              >
                <Compass className="w-3.5 h-3.5" />
                Découvrir
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${discoverOpen ? "rotate-180" : ""}`} />
                <Underline active={isDiscoverActive || discoverOpen} />
              </button>

              {discoverOpen && (
                <div
                  onMouseLeave={() => setDiscoverOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[360px] rounded-2xl bg-black/75 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/60 p-2 overflow-hidden origin-top"
                  style={{ animation: "scale-in .22s cubic-bezier(.2,.9,.3,1.2)" }}
                >
                  <span aria-hidden className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-black/75 border-l border-t border-white/15" />
                  {discoverLinks.map((s, i) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      style={{ animation: `fade-in .35s ease-out ${i * 60}ms both` }}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 hover:translate-x-0.5"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg] ${accentClasses[s.accent]}`}>
                        <s.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-white">{s.label}</div>
                        <div className="text-xs text-white/70 mt-0.5">{s.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/enlevement" className={linkClass(location.pathname === "/enlevement")}>
              <Truck className="w-3.5 h-3.5" />
              Enlèvement de déchets
              <Underline active={location.pathname === "/enlevement"} />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="group inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[12.5px] font-bold text-white bg-white/[0.08] border border-white/20 hover:bg-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-300 hover:shadow-[0_8px_24px_-10px_rgba(255,255,255,0.25)] [&_svg]:transition-transform hover:[&_svg]:rotate-[-8deg]"
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
                  className="group inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[12.5px] font-bold text-white bg-white/[0.08] border border-white/20 hover:bg-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-300 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
                >
                  <LogOut className="w-3.5 h-3.5" /> Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/inscription"
                aria-label="S'inscrire — créer un compte"
                className="group relative inline-flex items-center gap-1.5 h-10 px-5 rounded-full text-[12.5px] font-bold text-secondary-foreground overflow-hidden ring-1 ring-secondary/40 shadow-[0_10px_30px_-10px_hsl(var(--secondary)/0.6),inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.03] hover:ring-2 hover:ring-secondary/60 hover:shadow-[0_18px_40px_-12px_hsl(var(--secondary)/0.7),inset_0_1px_0_rgba(255,255,255,0.45)] active:scale-[0.98]"
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
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 text-white rounded-full border border-transparent hover:bg-white/10 hover:border-white/15 transition-all duration-300"
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
        <div className="relative h-full overflow-y-auto pt-20 pb-10 px-6 text-white">
          <div className="max-w-md mx-auto space-y-6">
            {/* Services phares en premier sur mobile */}
            <div>
              <p className="text-xs uppercase tracking-widest text-white/65 font-bold mb-3">Services phares</p>
              <div className="space-y-2">
                <Link
                  to="/vendre"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/8 border border-white/15 hover:bg-white/15 backdrop-blur-md transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accentClasses.secondary}`}>
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Vendre mes plastiques</div>
                    <div className="text-xs text-white/65">Catalogue de rachat au kg</div>
                  </div>
                </Link>
                <Link
                  to="/enlevement"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/8 border border-white/15 hover:bg-white/15 backdrop-blur-md transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accentClasses.accent}`}>
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Enlèvement de déchets</div>
                    <div className="text-xs text-white/65">Logistique à domicile</div>
                  </div>
                </Link>
                <Link
                  to="/alerte"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/8 border border-white/15 hover:bg-white/15 backdrop-blur-md transition-colors"
                >
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
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 text-white font-medium"
                  >
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
