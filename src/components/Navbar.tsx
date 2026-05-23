import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu, X, AlertTriangle, LogOut, User, ShieldCheck,
  ShoppingBag, Truck, Home, GraduationCap, CalendarDays, UserPlus,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import logoImg from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/vendre", label: "Vendre", icon: ShoppingBag },
  { to: "/enlevement", label: "Enlèvement", icon: Truck },
  { to: "/academy", label: "Academy", icon: GraduationCap },
  { to: "/evenements", label: "Événements", icon: CalendarDays },
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const handleSignOut = async () => { await signOut(); navigate("/"); };

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "h-16 bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "h-20 bg-background/80 backdrop-blur-sm"
        } flex items-center`}
      >
        <div className="container max-w-[1280px] mx-auto px-5 lg:px-8 flex items-center justify-between gap-6 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 select-none" aria-label="RecycHub Togo — Accueil">
            <img src={logoImg} alt="RecycHub Togo" draggable={false} className="w-9 h-9 object-contain" />
            <span className="hidden sm:inline-block font-extrabold text-[16px] tracking-tight text-foreground leading-none">
              RECYC <span className="text-primary">HUB</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full text-[13px] font-semibold transition-colors ${
                  isActive(to)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
            <Link
              to="/alerte"
              className={`inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full text-[13px] font-semibold transition-colors ${
                isActive("/alerte")
                  ? "text-destructive bg-destructive/10"
                  : "text-destructive/80 hover:text-destructive hover:bg-destructive/10"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Alerte
            </Link>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[13px] font-semibold text-primary bg-primary/10 hover:bg-primary/15 transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Admin
                  </Link>
                )}
                <span className="text-[12.5px] font-semibold text-foreground/60 flex items-center gap-1.5 px-2">
                  <User className="w-3.5 h-3.5" />
                  {profile?.pseudo || "Utilisateur"}
                </span>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[13px] font-semibold text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" /> Déconnexion
                </button>
              </>
            ) : (
              <Link to="/enlevement" className="btn-cta h-10 px-5 text-[13px]">
                <Truck className="w-4 h-4" />
                Order a pickup
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-foreground rounded-full hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-background/98 backdrop-blur-xl" />
        <div className="relative h-full overflow-y-auto pt-24 pb-10 px-6">
          <div className="max-w-md mx-auto space-y-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-semibold ${
                  isActive(to) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
            <Link
              to="/alerte"
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-semibold ${
                isActive("/alerte") ? "bg-destructive/10 text-destructive" : "text-destructive hover:bg-destructive/5"
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
              Alerte dépotoir
            </Link>

            <div className="pt-4 mt-4 border-t border-border space-y-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" className="flex items-center gap-2 px-4 py-3 rounded-2xl text-primary font-semibold bg-primary/10">
                      <ShieldCheck className="w-5 h-5" /> Admin
                    </Link>
                  )}
                  <div className="px-4 py-2 text-sm text-muted-foreground">{profile?.pseudo || "Utilisateur"}</div>
                  <button onClick={handleSignOut} className="w-full text-left px-4 py-3 rounded-2xl hover:bg-muted text-foreground font-semibold flex items-center gap-2">
                    <LogOut className="w-5 h-5" /> Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link to="/enlevement" className="btn-cta w-full py-3.5">
                    <Truck className="w-4 h-4" /> Order a pickup
                  </Link>
                  <Link to="/inscription" className="btn-outline-green w-full py-3.5">
                    <UserPlus className="w-4 h-4" /> S'inscrire
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
