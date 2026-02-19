import { useState } from "react";
import { UserPlus, User, Phone, MapPin, Home, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

const communes = ["KOZAH 1", "KOZAH 2", "KOZAH 3", "KOZAH 4"];

const Inscription = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    pseudo: "",
    prenom: "",
    nom: "",
    tel: "",
    commune: "",
    quartier: "",
    password: "",
  });

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.quartier.length < 4) {
      toast.error("Le quartier doit contenir au moins 4 caractères");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    setLoading(true);
    const { error } = await signUp(form);
    setLoading(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Inscription réussie ! Bienvenue sur RecycHub 🎉");
      navigate("/");
    }
  };

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

          <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Pseudo *</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input type="text" required placeholder="Votre pseudo unique" value={form.pseudo} onChange={(e) => update("pseudo", e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Prénom *</label>
                <input type="text" required placeholder="Prénom" value={form.prenom} onChange={(e) => update("prenom", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nom *</label>
                <input type="text" required placeholder="Nom" value={form.nom} onChange={(e) => update("nom", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Téléphone *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input type="tel" required placeholder="+228 XX XX XX XX" value={form.tel} onChange={(e) => update("tel", e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mot de passe *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input type="password" required placeholder="Min. 6 caractères" value={form.password} onChange={(e) => update("password", e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Commune *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <select required value={form.commune} onChange={(e) => update("commune", e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none appearance-none">
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
                <input type="text" required placeholder="Votre quartier (min. 4 caractères)" minLength={4} value={form.quartier} onChange={(e) => update("quartier", e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full shimmer py-3 rounded-xl gradient-bio text-primary-foreground font-semibold transition-transform hover:scale-[1.02] glow-emerald disabled:opacity-50">
              {loading ? "Inscription..." : "S'inscrire"}
            </button>
            <p className="text-xs text-center text-muted-foreground">
              Déjà un compte ?{" "}
              <Link to="/connexion" className="text-primary font-medium hover:underline">
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
