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
// Définitions
// ──────────────────────────────────────────────────────────────────────────────
type NavItem = { to: string; label: string; icon?: React.ComponentType<{ className?: string }> };

const HOME: NavItem = { to: "/", label: "Accueil" };
const ALERTE: NavItem = { to: "/alerte", label: "Alerte dépotoir", icon: AlertTriangle };
const VENDRE: NavItem = { to: "/vendre", label: "Vendre mes plastiques", icon: ShoppingBag };
const ENLEVEMENT: NavItem = { to: "/enlevement", label: "Demander un enlèvement", icon: Truck };

const DISCOVER_LINKS: NavItem[] = [
  { to: "/academy", label: "Green Academy", icon: Sprout },
  { to: "/evenements", label: "Événements", icon: CalendarDays },
];

const ALL_SERVICES = [ALERTE, VENDRE, ENLEVEMENT];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const discoverRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const path = location.pathname;
  const isHome = path === "/";
  const isOnDiscoverPage = DISCOVER_LINKS.some(l => l.to === path);

  useEffect(() => {
    if (!user) { setIsAdmin(false); return; }
    supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }).then(({ data }) => setIsAdmin(!!data));
  }, [user]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
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
  // ZONE NAV (gauche) — liens informationnels
  // Règle absolue : le lien de la page courante disparaît partout.
  // Sur une page Découvrir, le dropdown se dissout et l'autre sous-lien remonte.
  // ────────────────────────────────────────────────────────────────────────────
  const leftLinks: NavItem[] = useMemo(() => {
    const base: NavItem[] = [HOME];
    if (isOnDiscoverPage) {
      base.push(...DISCOVER_LINKS.filter(l => l.to !== path));
    }
    return base.filter(l => l.to !== path);
  }, [isOnDiscoverPage, path]);

  const showDiscoverDropdown = !isOnDiscoverPage;

  // ────────────────────────────────────────────────────────────────────────────
  // ZONE SERVICES (droite) — les 3 services mis en exergue
  // Le service de la page courante disparaît également.
  // ────────────────────────────────────────────────────────────────────────────
  const visibleServices = useMemo(
    () => ALL_SERVICES.filter(s => s.to !== path),
    [path]
  );

  const showAlerte = visibleServices.some(s => s.to === ALERTE.to);
  const showVendre = visibleServices.some(s => s.to === VENDRE.to);
  const showEnlevement = visibleServices.some(s => s.to === ENLEVEMENT.to);

  // ────────────────────────────────────────────────────────────────────────────
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2 bg-background/85 shadow-[0_4px_30px_-10px_hsl(var(--primary)/0.15)]"
            : "py-3 bg-background/60"
        } backdrop-blur-2xl border-b border-border/40`}
      >
        <div className="container mx-auto px-4 flex items-center gap-3">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative">
              <img
                src={logoImg}
                alt="RecycHub Togo — recyclage à Kara"
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain transition-transform duration-500 group-hover:rotate-6"
              />
              <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
            <span className="font-display font-extrabold text-lg sm:text-xl text-gradient-emerald hidden sm:inline tracking-tight">
              RECYC HUB <span className="text-foreground/80 font-bold">TOGO</span>
            </span>
          </Link>

          {/* ── ZONE NAV (liens informationnels) ── */}
          <div className="hidden lg:flex flex-1 items-center gap-0.5 min-w-0 ml-2">
            {leftLinks.map(link => (
              <NavPill key={link.to} item={link} />
            ))}

            {/* Découvrir dropdown */}
            {showDiscoverDropdown && (
              <div ref={discoverRef} className="relative animate-in fade-in duration-300">
                <button
                  onClick={() => setDiscoverOpen(o => !o)}
                  onMouseEnter={() => setDiscoverOpen(true)}
                  aria-expanded={discoverOpen}
                  aria-haspopup="true"
                  className="group relative px-3.5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 text-foreground/70 hover:text-foreground"
                >
                  <span className="absolute inset-0 rounded-full bg-muted/0 group-hover:bg-muted/60 transition-colors duration-300" />
                  <Compass className="w-4 h-4 relative" />
                  <span className="relative">Découvrir</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 relative ${discoverOpen ? "rotate-180" : ""}`} />
                </button>

                <div
                  onMouseLeave={() => setDiscoverOpen(false)}
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[280px] rounded-2xl bg-background/95 backdrop-blur-2xl border border-border shadow-2xl shadow-black/10 p-2 transition-all duration-300 origin-top ${
                    discoverOpen ? "opacity-100 scale-100 pointer-events-auto translate-y-0" : "opacity-0 scale-95 pointer-events-none -translate-y-1"
                  }`}
                >
                  {DISCOVER_LINKS.map(s => (
                    <Link
                      key={s.to}
                      to={s.to}
                      className="group flex items-center gap-3 p-3 rounded-xl hover:bg-muted/60 transition-all duration-200 hover:translate-x-0.5"
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        {s.icon && <s.icon className="w-4 h-4" />}
                      </div>
                      <span className="font-semibold text-sm text-foreground">{s.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── ZONE SERVICES (3 services mis en exergue) ── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* 1. Alerte dépotoir — signal civique d'urgence */}
            {showAlerte && (
              <Link
                to={ALERTE.to}
                className="group relative px-3.5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 bg-destructive/8 hover:bg-destructive/15 text-destructive border border-destructive/25 hover:border-destructive/50 transition-all duration-300 animate-in fade-in"
                aria-label="Signaler un dépotoir sauvage"
              >
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-destructive opacity-60 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-destructive" />
                </span>
                <AlertTriangle className="w-4 h-4" />
                <span className="hidden xl:inline">Alerte dépotoir</span>
                <span className="xl:hidden">Alerte</span>
              </Link>
            )}

            {/* Séparateur fin */}
            {showAlerte && (showVendre || showEnlevement) && (
              <div className="w-px h-7 bg-gradient-to-b from-transparent via-border to-transparent" />
            )}

            {/* 2. Vendre — outline (monétisation pour le citoyen) */}
            {showVendre && (
              <Link
                to={VENDRE.to}
                className="group relative px-4 py-2 rounded-full text-sm font-semibold border-2 border-primary/80 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center gap-1.5 animate-in fade-in overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <ShoppingBag className="w-4 h-4 relative" />
                <span className="relative hidden xl:inline">Vendre mes plastiques</span>
                <span className="relative xl:hidden">Vendre</span>
              </Link>
            )}

            {/* 3. Enlèvement — CTA principal solid avec glow */}
            {showEnlevement && (
              <Link
                to={ENLEVEMENT.to}
                className="group relative px-4 py-2 rounded-full text-sm font-bold bg-primary text-primary-foreground hover:shadow-[0_8px_30px_-5px_hsl(var(--primary)/0.5)] transition-all duration-300 flex items-center gap-1.5 animate-in fade-in overflow-hidden hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Truck className="w-4 h-4 relative" />
                <span className="relative hidden xl:inline">Demander un enlèvement</span>
                <span className="relative xl:hidden">Enlèvement</span>
              </Link>
            )}

            {/* ── ZONE COMPTE ── */}
            <div className="w-px h-7 bg-gradient-to-b from-transparent via-border to-transparent mx-1" />

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
                <span className="text-sm text-foreground/70 flex items-center gap-1.5 px-2 max-w-[140px] truncate">
                  <User className="w-4 h-4 shrink-0" />
                  <span className="truncate">{profile?.pseudo || "Utilisateur"}</span>
                </span>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-foreground/60 hover:text-destructive hover:bg-destructive/5 rounded-full transition-colors"
                  aria-label="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <Link
                to="/connexion"
                className="px-3.5 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground bg-muted/60 hover:bg-muted rounded-full transition-all flex items-center gap-1.5"
                aria-label="Connexion ou inscription"
              >
                <UserCircle2 className="w-4 h-4" />
                Connexion
              </Link>
            )}
          </div>

          {/* ── Mobile burger ── */}
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

      {/* ── Mobile menu ── */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />
        <div className="relative h-full overflow-y-auto pt-20 pb-10 px-6">
          <div className="max-w-md mx-auto space-y-6">
            {/* Services en exergue (en premier sur mobile) */}
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3">Services</p>
              <div className="space-y-2">
                {showAlerte && (
                  <Link
                    to={ALERTE.to}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-destructive/10 text-destructive border border-destructive/30 font-semibold"
                  >
                    <span className="relative flex w-2 h-2">
                      <span className="absolute inline-flex w-full h-full rounded-full bg-destructive opacity-60 animate-ping" />
                      <span className="relative inline-flex w-2 h-2 rounded-full bg-destructive" />
                    </span>
                    <AlertTriangle className="w-5 h-5" /> Alerte dépotoir
                  </Link>
                )}
                {showVendre && (
                  <Link
                    to={VENDRE.to}
                    className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border-2 border-primary text-primary font-bold"
                  >
                    <ShoppingBag className="w-5 h-5" /> Vendre mes plastiques
                  </Link>
                )}
                {showEnlevement && (
                  <Link
                    to={ENLEVEMENT.to}
                    className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/30"
                  >
                    <Truck className="w-5 h-5" /> Demander un enlèvement
                  </Link>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3">Navigation</p>
              <div className="space-y-1">
                {[HOME, ...DISCOVER_LINKS]
                  .filter(l => l.to !== path)
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

            {/* Compte */}
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

// ──────────────────────────────────────────────────────────────────────────────
// NavPill — lien de navigation avec underline animé
// ──────────────────────────────────────────────────────────────────────────────
const NavPill = ({ item }: { item: NavItem }) => (
  <Link
    to={item.to}
    className="group relative px-3.5 py-2 rounded-full text-sm font-medium flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors duration-300 animate-in fade-in"
  >
    <span className="absolute inset-0 rounded-full bg-muted/0 group-hover:bg-muted/60 transition-colors duration-300" />
    {item.icon && <item.icon className="w-4 h-4 relative" />}
    <span className="relative">{item.label}</span>
    <span className="absolute left-1/2 -translate-x-1/2 bottom-0.5 h-0.5 w-0 group-hover:w-6 bg-primary rounded-full transition-all duration-300" />
  </Link>
);

export default Navbar;
