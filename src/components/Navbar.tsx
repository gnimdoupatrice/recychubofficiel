import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Recycle, Menu, X, Sprout, AlertTriangle, CalendarDays, LogIn, UserPlus, LogOut, User, ShieldCheck, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import logoImg from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Accueil", icon: null },
  { to: "/academy", label: "Green Academy", icon: Sprout },
  { to: "/alerte", label: "ALERTE DÉPOTOIR", icon: AlertTriangle, isAlert: true },
  { to: "/evenements", label: "Événements", icon: CalendarDays, hasDot: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    if (!user) { setIsAdmin(false); return; }
    supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }).then(({ data }) => setIsAdmin(!!data));
  }, [user]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          scrolled
            ? "py-1.5 bg-background/85 backdrop-blur-2xl shadow-[0_1px_3px_hsl(var(--foreground)/0.08)] border-b border-border/50"
            : "py-3 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <img
              src={logoImg}
              alt="Recyc Hub Togo"
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-base tracking-tight text-gradient-emerald">
                RECYC HUB
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                Togo
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 group ${
                    link.isAlert
                      ? "animate-pulse-orange text-destructive font-semibold"
                      : isActive
                      ? "text-primary bg-primary/8"
                      : scrolled
                      ? "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  {link.icon && (
                    <link.icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                      link.isAlert ? "text-destructive" : ""
                    }`} />
                  )}
                  {link.label}
                  {link.hasDot && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  )}
                  {isActive && !link.isAlert && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop auth */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-3.5 py-1.5 text-sm font-medium text-primary hover:bg-primary/8 rounded-full transition-all flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50">
                  <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className={`text-sm font-medium ${scrolled ? "text-foreground/80" : "text-primary-foreground/80"}`}>
                    {profile?.pseudo || "Utilisateur"}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all flex items-center gap-1.5 ${
                    scrolled
                      ? "text-foreground/60 hover:text-foreground hover:bg-muted/60"
                      : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/connexion"
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-1.5 ${
                    scrolled
                      ? "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  Connexion
                </Link>
                <Link
                  to="/inscription"
                  className="shimmer px-5 py-2 rounded-full gradient-bio text-primary-foreground text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden p-2 rounded-full transition-colors ${
              scrolled ? "text-foreground" : "text-primary-foreground"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <div className="relative w-6 h-6">
              <Menu className={`absolute inset-0 transition-all duration-300 ${mobileOpen ? "opacity-0 rotate-90" : "opacity-100"}`} />
              <X className={`absolute inset-0 transition-all duration-300 ${mobileOpen ? "opacity-100" : "opacity-0 -rotate-90"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />
        <div className="relative flex flex-col items-center justify-center h-full gap-5 pt-20">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-2xl font-display font-semibold transition-all duration-500 flex items-center gap-3 ${
                link.isAlert ? "text-destructive" : location.pathname === link.to ? "text-primary" : "text-foreground"
              }`}
              style={{
                animationDelay: `${i * 80}ms`,
                animation: mobileOpen ? `slide-up 0.5s ease-out ${i * 80}ms forwards` : "none",
                opacity: mobileOpen ? undefined : 0,
              }}
            >
              {link.icon && <link.icon className="w-6 h-6" />}
              {link.label}
            </Link>
          ))}
          <div
            className="flex flex-col items-center gap-4 mt-6"
            style={{ animation: mobileOpen ? "slide-up 0.5s ease-out 0.35s forwards" : "none", opacity: 0 }}
          >
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="text-lg text-primary font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" /> Admin
                  </Link>
                )}
                <span className="text-lg text-foreground/70 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {profile?.pseudo || "Utilisateur"}
                </span>
                <button onClick={handleSignOut} className="text-lg text-foreground/70 flex items-center gap-2">
                  <LogOut className="w-5 h-5" />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/connexion" className="text-lg text-foreground/70 flex items-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Connexion
                </Link>
                <Link to="/inscription" className="shimmer px-6 py-3 rounded-full gradient-bio text-primary-foreground font-semibold text-lg">
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
