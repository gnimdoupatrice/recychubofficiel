import { LogIn, Phone, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Connexion = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-bio flex items-center justify-center text-primary-foreground mx-auto mb-4">
              <LogIn className="w-8 h-8" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-2">Connexion</h1>
            <p className="text-sm text-muted-foreground">Accédez à votre espace RecycHub</p>
          </div>

          <div className="p-6 rounded-2xl glass space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Téléphone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="tel"
                  placeholder="+228 XX XX XX XX"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none"
                />
              </div>
            </div>
            <button className="w-full shimmer py-3 rounded-xl gradient-bio text-primary-foreground font-semibold transition-transform hover:scale-[1.02] glow-emerald">
              Se connecter
            </button>
            <p className="text-xs text-center text-muted-foreground">
              Pas de compte ?{" "}
              <Link to="/inscription" className="text-primary font-medium hover:underline">
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
