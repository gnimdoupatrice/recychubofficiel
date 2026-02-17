import { UserPlus, User, Phone, MapPin, Home } from "lucide-react";
import { Link } from "react-router-dom";

const communes = ["KOZAH 1", "KOZAH 2", "KOZAH 3", "KOZAH 4"];

const Inscription = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-bio flex items-center justify-center text-primary-foreground mx-auto mb-4">
              <UserPlus className="w-8 h-8" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-2">Inscription</h1>
            <p className="text-sm text-muted-foreground">Créez votre compte RecycHub</p>
          </div>

          <div className="p-6 rounded-2xl glass space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Pseudo *</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Votre pseudo unique" className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Prénom *</label>
                <input type="text" placeholder="Prénom" className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nom *</label>
                <input type="text" placeholder="Nom" className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Téléphone *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input type="tel" placeholder="+228 XX XX XX XX" className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Commune *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <select className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none appearance-none">
                  <option value="">Choisir commune</option>
                  {communes.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quartier *</label>
              <div className="relative">
                <Home className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Votre quartier (min. 4 caractères)" minLength={4} className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
              </div>
            </div>
            <button className="w-full shimmer py-3 rounded-xl gradient-bio text-primary-foreground font-semibold transition-transform hover:scale-[1.02] glow-emerald">
              S'inscrire
            </button>
            <p className="text-xs text-center text-muted-foreground">
              Déjà un compte ?{" "}
              <Link to="/connexion" className="text-primary font-medium hover:underline">
                Se connecter
              </Link>
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Un mot de passe sera généré et envoyé à votre numéro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
