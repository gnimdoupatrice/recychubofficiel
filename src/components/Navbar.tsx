import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu, X, Sprout, AlertTriangle, CalendarDays, LogOut, User, ShieldCheck,
  ChevronDown, ShoppingBag, Truck, Compass, UserCircle2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import logoImg from "@/assets/logo.png";

// ──────────────────────────────────────────────────────────────────────────────
// Définition des liens
// ──────────────────────────────────────────────────────────────────────────────
type NavItem = { to: string; label: string; icon?: React.ComponentType<{ className?: string }> };

const HOME: NavItem = { to: "/", label: "Accueil" };
const ALERTE: NavItem = { to: "/alerte", label: "Alerte dépotoir", icon: AlertTriangle };

const DISCOVER_LINKS: NavItem[] = [
  { to: "/academy", label: "Green Academy", icon: Sprout },
  { to: "/evenements", label: "Événements", icon: CalendarDays },
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

  const isHome = location.pathname === "/";
  const isOnDiscoverPage = DISCOVER_LINKS.some(l => l.to === location.pathname);

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

  // ────────────────────────────────────────────────────────────────────────────
  // Logique adaptative
  // Règle : on retire toujours le lien de la page courante.
  // - Si on est sur une page de Découvrir (Academy/Événements) → le dropdown
  //   se "dissout" et l'AUTRE sous-lien vient se poser directement dans la barre.
  // - Sinon → on garde le dropdown Découvrir intact.
  // ────────────────────────────────────────────────────────────────────────────
  const leftLinks: NavItem[] = useMemo(() => {
    const base: NavItem[] = [HOME, ALERTE];
    if (isOnDiscoverPage) {
      // Détache les sous-liens (sauf celui de la page courante)
      base.push(...DISCOVER_LINKS.filter(l => l.to !== location.pathname));
    }
    return base.filter(l => l.to !== location.pathname);
  }, [isOnDiscoverPage, location.pathname]);

  // Le dropdown Découvrir n'apparaît QUE si on n'est pas sur une de ses pages
  const showDiscoverDropdown = !isOnDiscoverPage;

  // ────────────────────────────────────────────────────────────────────────────
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2 shadow-lg shadow-black/5" : "py-3"
        } bg-background/75 backdrop-blur-2xl border-b border-border/40`}
      >
        <div className="container mx-auto px-4 flex items-center gap-4">
          {/* Logo + nom — ancré à gauche */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img src={logoImg} alt="RecycHub Togo — recyclage à Kara" className="w-10 h-10 sm:w-11 sm:h-11 object-contain" />
            <span className="font-display font-extrabold text-lg sm:text-xl text-gradient-emerald hidden sm:inline">
              RECYC HUB <span className="text-foreground/80 font-bold">TOGO</span>
            </span>
          </Link>

          {/* Zone NAV (gauche) — flex-1 absorbe l'espace pour ancrer la zone business à droite */}
          <div className="hidden lg:flex flex-1 items-center gap-1 min-w-0">
            {leftLinks.map(link => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 ease-out animate-in fade-in ${
                    isActive
                      ? "text-primary bg-primary/5"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              );
            })}

            {/* Découvrir (dropdown) — uniquement sur la home */}
            {showDiscoverDropdown && (
              <div ref={discoverRef} className="relative animate-in fade-in duration-300">
                <button
                  onClick={() => setDiscoverOpen(o => !o)}
                  onMouseEnter={() => setDiscoverOpen(true)}
                  aria-expanded={discoverOpen}
                  aria-haspopup="true"
                  className="px-3.5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 text-foreground/70 hover:text-foreground hover:bg-muted/60"
                >
                  <Compass className="w-4 h-4" />
                  Découvrir
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${discoverOpen ? "rotate-180" : ""}`} />
                </button>

                <div
                  onMouseLeave={() => setDiscoverOpen(false)}
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[280px] rounded-2xl bg-background/95 backdrop-blur-2xl border border-border shadow-2xl shadow-black/10 p-2 transition-all duration-300 origin-top ${
                    discoverOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  {DISCOVER_LINKS.map(s => (
                    <Link
                      key={s.to}
                      to={s.to}
                      className="group flex items-center gap-3 p-3 rounded-xl hover:bg-muted/60 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                        {s.icon && <s.icon className="w-4 h-4" />}
                      </div>
                      <span className="font-semibold text-sm text-foreground">{s.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ZONE BUSINESS — ancrée à droite, position stable */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* CTA secondaire — Outline */}
            <Link
              to="/vendre"
              className="px-4 py-2 rounded-full text-sm font-semibold border-2 border-primary text-primary hover:bg-primary/5 transition-all duration-300 flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              Vendre mes plastiques
            </Link>

            {/* CTA principal — Solid */}
            <Link
              to="/enlevement"
              className="px-4 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 flex items-center gap-1.5"
            >
              <Truck className="w-4 h-4" />
              Demander un enlèvement
            </Link>

            {/* Séparateur */}
            <div className="w-px h-6 bg-border mx-1" />

            {/* Auth */}
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-full transition-colors flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" /> Admin
                  </Link>
                )}
                <span className="text-sm text-foreground/70 flex items-center gap-1.5 px-2">
                  <User className="w-4 h-4" />
                  {profile?.pseudo || "Utilisateur"}
                </span>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted/60 rounded-full transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" /> Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/connexion"
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/60 rounded-full transition-all flex items-center gap-1.5"
                aria-label="Connexion ou inscription"
              >
                <UserCircle2 className="w-5 h-5" />
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile burger — ancré à droite */}
          <button
            className="lg:hidden ml-auto p-2 text-foreground rounded-lg hover:bg-muted/60 transition-colors"
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
            {/* Navigation principale */}
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3">Navigation</p>
              <div className="space-y-1">
                {[HOME, ALERTE, ...DISCOVER_LINKS]
                  .filter(l => l.to !== location.pathname)
                  .map(link => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted/60 text-foreground font-medium transition-colors"
                    >
                      {link.icon && <link.icon className="w-5 h-5 text-primary" />}
                      {link.label}
                    </Link>
                  ))}
              </div>
            </div>

            {/* CTA Business */}
            <div className="space-y-2">
              <Link
                to="/vendre"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border-2 border-primary text-primary font-bold"
              >
                <ShoppingBag className="w-5 h-5" /> Vendre mes plastiques
              </Link>
              <Link
                to="/enlevement"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-primary text-primary-foreground font-bold"
              >
                <Truck className="w-5 h-5" /> Demander un enlèvement
              </Link>
            </div>

            {/* Auth */}
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
                <Link
                  to="/connexion"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-muted text-foreground font-bold"
                >
                  <UserCircle2 className="w-5 h-5" /> Connexion
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
