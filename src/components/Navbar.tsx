import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu, X, Sprout, AlertTriangle, CalendarDays, LogOut, User, ShieldCheck,
  ChevronDown, ShoppingBag, Truck, Compass, UserCircle2, Home,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import logoImg from "@/assets/logo.png";

// ──────────────────────────────────────────────────────────────────────────────
// Définitions
// ──────────────────────────────────────────────────────────────────────────────
type NavItem = {
  to: string;
  label: string;
  shortLabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
};

const HOME: NavItem = { to: "/", label: "Accueil", icon: Home };
const ALERTE: NavItem = { to: "/alerte", label: "Alerte dépotoir", shortLabel: "Alerte", icon: AlertTriangle };
const VENDRE: NavItem = { to: "/vendre", label: "Vendre mes plastiques", shortLabel: "Vendre", icon: ShoppingBag };
const ENLEVEMENT: NavItem = { to: "/enlevement", label: "Demander un enlèvement", shortLabel: "Enlèvement", icon: Truck };
const CONNEXION: NavItem = { to: "/connexion", label: "Connexion", icon: UserCircle2 };

const ACADEMY: NavItem = { to: "/academy", label: "Green Academy", icon: Sprout };
const EVENTS: NavItem = { to: "/evenements", label: "Événements", icon: CalendarDays };
const DISCOVER_LINKS: NavItem[] = [ACADEMY, EVENTS];

// Ordre canonique de référence (utilisé par la version mobile)
const CANONICAL_ORDER: NavItem[] = [HOME, ALERTE, ACADEMY, EVENTS, VENDRE, ENLEVEMENT];

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
  // Construction de la séquence d'éléments dans l'ordre canonique exact :
  // [Accueil] [Alerte] [Découvrir ▾  OU  sous-lien promu] [Vendre] [Enlèvement]
  // Règle absolue : le lien de la page courante disparaît.
  // Anti-trou : quand on est dans Découvrir, l'autre sous-lien prend EXACTEMENT
  // la place du dropdown — pas de gap supplémentaire, pas d'élément absent au milieu.
  // ────────────────────────────────────────────────────────────────────────────

  type Slot =
    | { kind: "link"; item: NavItem }
    | { kind: "discover" };

  const navSequence: Slot[] = useMemo(() => {
    const seq: Slot[] = [];

    // 1. Accueil — exception : reste visible sur "/" (point d'ancrage,
    //    pas une destination que l'utilisateur cherche à rejoindre depuis la home).
    //    Sur toute autre page, la règle générale s'applique : le lien disparaît
    //    s'il pointe vers la page courante (ici, jamais le cas pour Accueil sauf "/").
    seq.push({ kind: "link", item: HOME });

    // 2. Alerte dépotoir
    if (ALERTE.to !== path) seq.push({ kind: "link", item: ALERTE });

    // 3. Découvrir — soit le dropdown, soit le sous-lien promu
    if (isOnDiscoverPage) {
      const promoted = DISCOVER_LINKS.find(l => l.to !== path);
      if (promoted) seq.push({ kind: "link", item: promoted });
    } else {
      seq.push({ kind: "discover" });
    }

    // 4. Vendre mes plastiques
    if (VENDRE.to !== path) seq.push({ kind: "link", item: VENDRE });

    // 5. Demander un enlèvement
    if (ENLEVEMENT.to !== path) seq.push({ kind: "link", item: ENLEVEMENT });

    return seq;
  }, [path, isOnDiscoverPage]);

  // Style par item — chaque service garde son identité visuelle distincte
  const renderSlot = (slot: Slot, idx: number) => {
    if (slot.kind === "discover") {
      return (
        <div
          key="discover"
          ref={discoverRef}
          className="relative animate-in fade-in duration-300"
          style={{ animationDelay: `${idx * 30}ms` }}
        >
          <button
            onClick={() => setDiscoverOpen(o => !o)}
            onMouseEnter={() => setDiscoverOpen(true)}
            aria-expanded={discoverOpen}
            aria-haspopup="true"
            className="group relative px-3.5 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 text-foreground/75 hover:text-foreground transition-colors duration-300"
          >
            <span className="absolute inset-0 rounded-full bg-muted/0 group-hover:bg-muted/60 transition-colors duration-300" />
            <Compass className="w-4 h-4 relative" />
            <span className="relative">Découvrir</span>
            <ChevronDown className={`w-3.5 h-3.5 relative transition-transform duration-300 ${discoverOpen ? "rotate-180" : ""}`} />
          </button>

          <div
            onMouseLeave={() => setDiscoverOpen(false)}
            className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[260px] rounded-2xl bg-background/95 backdrop-blur-2xl border border-border shadow-2xl shadow-black/10 p-2 transition-all duration-300 origin-top ${
              discoverOpen
                ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
                : "opacity-0 scale-95 pointer-events-none -translate-y-1"
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
      );
    }

    const { item } = slot;
    const delay = { animationDelay: `${idx * 30}ms` };

    // Identité visuelle par type d'item
    if (item.to === ALERTE.to) {
      return (
        <Link
          key={item.to}
          to={item.to}
          style={delay}
          className="group relative px-3.5 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 bg-destructive/8 hover:bg-destructive/15 text-destructive border border-destructive/25 hover:border-destructive/50 transition-all duration-300 animate-in fade-in"
          aria-label="Signaler un dépotoir sauvage"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-destructive opacity-60 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-destructive" />
          </span>
          <AlertTriangle className="w-4 h-4" />
          <span className="hidden xl:inline">{item.label}</span>
          <span className="xl:hidden">{item.shortLabel}</span>
        </Link>
      );
    }

    if (item.to === VENDRE.to) {
      return (
        <Link
          key={item.to}
          to={item.to}
          style={delay}
          className="group relative px-4 py-2 rounded-full text-sm font-semibold border-2 border-primary/80 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center gap-1.5 animate-in fade-in overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/15 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <ShoppingBag className="w-4 h-4 relative" />
          <span className="relative hidden xl:inline">{item.label}</span>
          <span className="relative xl:hidden">{item.shortLabel}</span>
        </Link>
      );
    }

    if (item.to === ENLEVEMENT.to) {
      return (
        <Link
          key={item.to}
          to={item.to}
          style={delay}
          className="group relative px-4 py-2 rounded-full text-sm font-bold bg-primary text-primary-foreground hover:shadow-[0_8px_30px_-5px_hsl(var(--primary)/0.5)] transition-all duration-300 flex items-center gap-1.5 animate-in fade-in overflow-hidden hover:-translate-y-0.5"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <Truck className="w-4 h-4 relative" />
          <span className="relative hidden xl:inline">{item.label}</span>
          <span className="relative xl:hidden">{item.shortLabel}</span>
        </Link>
      );
    }

    // Lien standard (Accueil, Academy, Événements promus)
    const isActive = item.to === path;
    return (
      <Link
        key={item.to}
        to={item.to}
        style={delay}
        aria-current={isActive ? "page" : undefined}
        className={`group relative h-10 px-3.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors duration-300 animate-in fade-in ${
          isActive
            ? "text-primary bg-primary/8"
            : "text-foreground/75 hover:text-foreground"
        }`}
      >
        <span className={`absolute inset-0 rounded-full transition-colors duration-300 ${
          isActive ? "bg-transparent" : "bg-muted/0 group-hover:bg-muted/60"
        }`} />
        {item.icon && <item.icon className="w-4 h-4 relative" />}
        <span className="relative">{item.label}</span>
        <span className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-0.5 bg-primary rounded-full transition-all duration-300 ${
          isActive ? "w-6" : "w-0 group-hover:w-6"
        }`} />
      </Link>
    );
  };

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
          {/* ── Logo + Nom ── */}
          <Link to="/" className="flex items-center gap-2 group shrink-0 mr-2">
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

          {/* ── SÉQUENCE NAV — ordre canonique, gap homogène, zéro trou ── */}
          <div className="hidden lg:flex items-center gap-2 flex-1 min-w-0">
            {navSequence.map((slot, idx) => renderSlot(slot, idx))}
          </div>

          {/* ── CONNEXION — toujours à droite, masquée sur /connexion ── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
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
              CONNEXION.to !== path && (
                <Link
                  to={CONNEXION.to}
                  className="px-3.5 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground bg-muted/60 hover:bg-muted rounded-full transition-all flex items-center gap-1.5 animate-in fade-in"
                  aria-label="Connexion ou inscription"
                >
                  <UserCircle2 className="w-4 h-4" />
                  Connexion
                </Link>
              )
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

      {/* ── Mobile menu — applique la même règle de filtrage ── */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />
        <div className="relative h-full overflow-y-auto pt-20 pb-10 px-6">
          <div className="max-w-md mx-auto space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3">Navigation</p>
              <div className="space-y-1">
                {CANONICAL_ORDER
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
                CONNEXION.to !== path && (
                  <Link
                    to={CONNEXION.to}
                    className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-muted text-foreground font-bold"
                  >
                    <UserCircle2 className="w-5 h-5" /> Connexion
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
