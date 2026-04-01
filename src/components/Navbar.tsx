import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sprout, AlertTriangle, CalendarDays, LogIn, LogOut, User, ShieldCheck, ShoppingBag, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import logoImg from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/academy", label: "Green Academy", icon: Sprout },
  { to: "/alerte", label: "Alerte Dépotoir", icon: AlertTriangle, isAlert: true },
  { to: "/evenements", label: "Événements", icon: CalendarDays },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

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
    setUserMenuOpen(false);
  }, [location]);

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "py-2 bg-background/95 backdrop-blur-xl shadow-lg shadow-primary/5 border-b border-border/60"
            : "py-3 bg-background/70 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <img
              src={logoImg}
              alt="RecycHub Togo"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-lg text-gradient-emerald tracking-tight">
                RECYC HUB
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Togo
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    link.isAlert
                      ? "text-destructive font-semibold hover:bg-destructive/5"
                      : isActive
                      ? "text-primary bg-primary/5"
                      : "text-foreground/65 hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.icon && <link.icon className={`w-3.5 h-3.5 ${link.isAlert ? "text-destructive" : ""}`} />}
                  {link.label}
                  {link.isAlert && (
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                  )}
                  {isActive && !link.isAlert && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* CTA Vendre — always visible */}
            <Link
              to="/vendre"
              className="shimmer inline-flex items-center gap-1.5 px-5 py-2 rounded-lg gradient-bio text-primary-foreground text-sm font-bold transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20"
            >
              <ShoppingBag className="w-4 h-4" />
              Vendre
            </Link>

            {user ? (
              /* User avatar menu */
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                >
                  <span className="w-7 h-7 rounded-full gradient-bio flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {(profile?.pseudo || "U")[0].toUpperCase()}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-xl bg-card border border-border shadow-xl shadow-primary/5 py-2 animate-slide-up">
                    <div className="px-4 py-2 border-b border-border/50">
                      <p className="text-sm font-semibold text-foreground">{profile?.pseudo || "Utilisateur"}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Tableau de bord
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-foreground/70 hover:text-destructive hover:bg-destructive/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/connexion"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-foreground/60 hover:text-foreground border border-border/50 hover:border-border transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <div className="relative w-6 h-6">
              <Menu className={`absolute inset-0 transition-all duration-300 ${mobileOpen ? "opacity-0 rotate-90" : "opacity-100"}`} />
              <X className={`absolute inset-0 transition-all duration-300 ${mobileOpen ? "opacity-100" : "opacity-0 -rotate-90"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
        <div className="relative flex flex-col items-center justify-center h-full gap-5 pt-20">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xl font-display font-semibold transition-all duration-500 flex items-center gap-2.5 ${link.isAlert ? "text-destructive" : "text-foreground"}`}
              style={{ animationDelay: `${i * 80}ms`, animation: mobileOpen ? `slide-up 0.4s ease-out ${i * 80}ms forwards` : "none", opacity: mobileOpen ? undefined : 0 }}
            >
              {link.icon && <link.icon className="w-5 h-5" />}
              {link.label}
            </Link>
          ))}

          {/* Mobile CTA */}
          <Link
            to="/vendre"
            className="shimmer mt-4 inline-flex items-center gap-2 px-8 py-3 rounded-xl gradient-bio text-primary-foreground font-bold text-lg"
            style={{ animation: mobileOpen ? "slide-up 0.4s ease-out 0.3s forwards" : "none", opacity: 0 }}
          >
            <ShoppingBag className="w-5 h-5" />
            Vendre mes plastiques
          </Link>

          <div className="flex flex-col items-center gap-3 mt-4" style={{ animation: mobileOpen ? "slide-up 0.4s ease-out 0.4s forwards" : "none", opacity: 0 }}>
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="text-base text-primary font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" /> Admin
                  </Link>
                )}
                <span className="text-base text-foreground/70 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {profile?.pseudo || "Utilisateur"}
                </span>
                <button onClick={handleSignOut} className="text-base text-foreground/70 hover:text-destructive transition-colors">
                  Déconnexion
                </button>
              </>
            ) : (
              <Link to="/connexion" className="text-base text-foreground/70 flex items-center gap-1.5">
                <LogIn className="w-4 h-4" />
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
