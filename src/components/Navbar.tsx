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

  // Style "glass pill" — aligné Hero
  const linkClass = (active: boolean) =>
    `px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
      active
        ? "bg-white/15 text-white border border-white/25 backdrop-blur-md shadow-lg"
        : "text-white/85 border border-transparent hover:text-white hover:bg-white/10 hover:border-white/15"
    }`;

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
          <Link to="/" className="flex items-center group shrink-0" aria-label="RecycHub Togo — Accueil">
            <img src={logoImg} alt="RecycHub Togo" className="w-10 h-10 sm:w-11 sm:h-11 object-contain transition-transform group-hover:scale-105 drop-shadow-lg" />
          </Link>

          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            <Link to="/" className={linkClass(location.pathname === "/")}>
              Accueil
            </Link>

            <Link to="/alerte" className={linkClass(location.pathname === "/alerte")}>
              <AlertTriangle className="w-3.5 h-3.5" />
              Alerte dépotoir
            </Link>

            <Link to="/vendre" className={linkClass(location.pathname === "/vendre")}>
              <ShoppingBag className="w-3.5 h-3.5" />
              Vendre mes plastiques
            </Link>

            {/* Découvrir dropdown */}
            <div ref={discoverRef} className="relative">
              <button
                onClick={() => setDiscoverOpen(o => !o)}
                onMouseEnter={() => setDiscoverOpen(true)}
                aria-expanded={discoverOpen}
                aria-haspopup="true"
                className={linkClass(isDiscoverActive)}
              >
                <Compass className="w-3.5 h-3.5" />
                Découvrir
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${discoverOpen ? "rotate-180" : ""}`} />
              </button>

              {discoverOpen && (
                <div
                  onMouseLeave={() => setDiscoverOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[360px] rounded-2xl bg-black/70 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/50 p-2 animate-slide-up overflow-hidden"
                >
                  {discoverLinks.map(s => (
                    <Link
                      key={s.to}
                      to={s.to}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${accentClasses[s.accent]}`}>
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
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 rounded-full text-xs font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 backdrop-blur-md transition-all flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" /> Admin
                  </Link>
                )}
                <span className="text-xs font-semibold text-white/75 flex items-center gap-1.5 px-2">
                  <User className="w-4 h-4" />
                  {profile?.pseudo || "Utilisateur"}
                </span>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-full text-xs font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 backdrop-blur-md transition-all flex items-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" /> Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/inscription"
                className="px-5 py-2.5 rounded-full text-xs font-bold text-secondary-foreground transition-all flex items-center gap-1.5 shadow-lg shadow-secondary/30 hover:shadow-secondary/50 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--accent)))" }}
              >
                <UserPlus className="w-4 h-4" /> S'inscrire
              </Link>
            )}
          </div>

          <button
            className="lg:hidden p-2 text-white rounded-full hover:bg-white/10 transition-colors"
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
        <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />
        <div className="relative h-full overflow-y-auto pt-20 pb-10 px-6">
          <div className="max-w-md mx-auto space-y-6">
            {/* Services phares en premier sur mobile */}
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3">Services phares</p>
              <div className="space-y-2">
                <Link
                  to="/vendre"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40 border border-border hover:bg-muted/70 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accentClasses.secondary}`}>
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Vendre mes plastiques</div>
                    <div className="text-xs text-muted-foreground">Catalogue de rachat au kg</div>
                  </div>
                </Link>
                <Link
                  to="/enlevement"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40 border border-border hover:bg-muted/70 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accentClasses.accent}`}>
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Enlèvement de déchets</div>
                    <div className="text-xs text-muted-foreground">Logistique à domicile</div>
                  </div>
                </Link>
                <Link
                  to="/alerte"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40 border border-border hover:bg-muted/70 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accentClasses.destructive}`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Alerte dépotoir</div>
                    <div className="text-xs text-muted-foreground">Signalement géolocalisé</div>
                  </div>
                </Link>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3">Découvrir</p>
              <div className="space-y-1">
                <Link to="/" className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted/60 text-foreground font-medium">
                  Accueil
                </Link>
                {discoverLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted/60 text-foreground font-medium"
                  >
                    <link.icon className="w-5 h-5 text-primary" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" className="flex items-center gap-2 px-3 py-3 rounded-xl text-primary font-semibold">
                      <ShieldCheck className="w-5 h-5" /> Admin
                    </Link>
                  )}
                  <div className="px-3 py-2 text-sm text-muted-foreground">{profile?.pseudo || "Utilisateur"}</div>
                  <button onClick={handleSignOut} className="w-full text-left px-3 py-3 rounded-xl hover:bg-muted/60 text-foreground font-medium flex items-center gap-2">
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
