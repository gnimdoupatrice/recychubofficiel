import { useState } from "react";
import { Truck, MapPin, Send, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const DemanderEnlevement = () => {
  const { user } = useAuth();
  const [repere, setRepere] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Connectez-vous d'abord");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("pickup_requests").insert({ user_id: user.id, repere });
    setLoading(false);
    if (error) {
      toast.error("Erreur lors de l'envoi");
    } else {
      toast.success("Demande envoyée ! Un agent passera sous 48h 🚛");
      setRepere("");
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-dvh">
      <SEO title="Demander un enlèvement de déchets à Kara" description="Faites enlever vos déchets ménagers à domicile à Kara. Service simple, rapide et abordable. Réservation en ligne ou par WhatsApp." path="/enlevement" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Truck className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Collecte</span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">
            Demander un <span className="text-gradient-emerald">enlèvement</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Un agent de collecte passera chez vous dans les 48h suivant votre demande.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex gap-3 mb-6">
            {["Rapide", "Gratuit", "Écologique"].map((t) => (
              <div key={t} className="flex items-center gap-1 text-sm text-accent">
                <CheckCircle className="w-4 h-4" />
                {t}
              </div>
            ))}
          </div>

          {!user ? (
            <div className="p-6 rounded-2xl glass text-center space-y-4">
              <p className="text-muted-foreground">Connectez-vous pour demander un enlèvement.</p>
              <Link to="/connexion" className="inline-block shimmer px-6 py-3 rounded-xl gradient-bio text-primary-foreground font-semibold">Se connecter</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Repère / Lieu précis *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input type="text" required placeholder="Ex: Devant la pharmacie, Kozah 3" value={repere} onChange={(e) => setRepere(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full shimmer py-3 rounded-xl gradient-bio text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] glow-emerald disabled:opacity-50">
                <Send className="w-4 h-4" />
                {loading ? "Envoi..." : "Envoyer la demande"}
              </button>
              <p className="text-xs text-muted-foreground text-center">
                Votre profil (pseudo, téléphone, commune, quartier) sera attaché automatiquement.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemanderEnlevement;
