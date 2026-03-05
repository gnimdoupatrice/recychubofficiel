import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Recycle, Menu, X, Sprout, AlertTriangle, CalendarDays, LogIn, UserPlus, LogOut, User, ShieldCheck } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        } glass`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logoImg} alt="Recyclage à Kara" width="10%" height="20vh"/>
            
            <span className="font-display font-bold text-xl text-gradient-emerald">RECYC HUB TOGO</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    link.isAlert
                      ? "animate-pulse-orange text-orange-alert font-semibold"
                      : isActive
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {link.icon && <link.icon className={`w-4 h-4 ${link.isAlert ? "text-orange-alert" : ""}`} />}
                  {link.label}
                  {link.hasDot && <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />}
                  {isActive && !link.isAlert && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                <span className="text-sm text-foreground/70 flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {profile?.pseudo || "Utilisateur"}
                </span>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/connexion"
                  className="relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors group"
                >
                  <LogIn className="w-4 h-4 inline mr-1" />
                  Connexion
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
                <Link
                  to="/inscription"
                  className="shimmer px-5 py-2 rounded-full gradient-bio text-primary-foreground text-sm font-semibold transition-transform hover:scale-105 flex items-center gap-1"
                >
                  <UserPlus className="w-4 h-4" />
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <div className="relative w-6 h-6">
              <Menu className={`absolute inset-0 transition-all duration-300 ${mobileOpen ? "opacity-0 rotate-90" : "opacity-100"}`} />
              <X className={`absolute inset-0 transition-all duration-300 ${mobileOpen ? "opacity-100" : "opacity-0 -rotate-90"}`} />
            </div>
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 transition-all duration-500 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />
        <div className="relative flex flex-col items-center justify-center h-full gap-6 pt-20">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-2xl font-display font-semibold transition-all duration-500 flex items-center gap-3 ${link.isAlert ? "text-orange-alert" : "text-foreground"}`}
              style={{ animationDelay: `${i * 100}ms`, animation: mobileOpen ? `slide-up 0.5s ease-out ${i * 100}ms forwards` : "none", opacity: mobileOpen ? undefined : 0 }}
            >
              {link.icon && <link.icon className="w-6 h-6" />}
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col items-center gap-4 mt-8" style={{ animation: mobileOpen ? "slide-up 0.5s ease-out 0.4s forwards" : "none", opacity: 0 }}>
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="text-lg text-primary font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" /> Admin
                  </Link>
                )}
                <span className="text-lg text-foreground/70">{profile?.pseudo || "Utilisateur"}</span>
                <button onClick={handleSignOut} className="text-lg text-foreground/70">Déconnexion</button>
              </>
            ) : (
              <>
                <Link to="/connexion" className="text-lg text-foreground/70">Connexion</Link>
                <Link to="/inscription" className="shimmer px-6 py-3 rounded-full gradient-bio text-primary-foreground font-semibold text-lg">S'inscrire</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
