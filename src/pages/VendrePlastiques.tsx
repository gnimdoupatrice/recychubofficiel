import { useState } from "react";
import { ShoppingBag, MapPin, Weight, Camera, Send, Info } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const VendrePlastiques = () => {
  const { user } = useAuth();
  const [repere, setRepere] = useState("");
  const [kilos, setKilos] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Connectez-vous d'abord"); return; }
    setLoading(true);

    let photo_url: string | null = null;
    if (photo) {
      const path = `${user.id}/${Date.now()}-${photo.name}`;
      const { error: uploadErr } = await supabase.storage.from("recychub-photos").upload(path, photo);
      if (uploadErr) { toast.error("Erreur upload photo"); setLoading(false); return; }
      const { data } = supabase.storage.from("recychub-photos").getPublicUrl(path);
      photo_url = data.publicUrl;
    }

    const { error } = await supabase.from("plastic_sales").insert({
      user_id: user.id,
      repere,
      kilos: Number(kilos),
      photo_url,
    });
    setLoading(false);
    if (error) { toast.error("Erreur lors de l'envoi"); }
    else {
      toast.success("Vente proposée avec succès ! 💰");
      setRepere(""); setKilos(""); setPhoto(null);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <SEO title="Vendre mes plastiques au kg" description="Vendez vos plastiques (PET, PEHD, PP, PVC, sachets pure water) au meilleur prix à Kara. Calcul instantané, paiement rapide." path="/vendre" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Vente</span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">
            Vendre mes <span className="text-gradient-emerald">plastiques</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Vendez vos déchets plastiques et générez un revenu complémentaire.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 flex items-start gap-3 mb-6">
            <Info className="w-5 h-5 text-accent mt-0.5 shrink-0" />
            <div className="text-sm">
              <strong className="text-accent">Prix actuel :</strong>{" "}
              <span className="text-foreground">100 FCFA / kg de plastique</span>
            </div>
          </div>

          {!user ? (
            <div className="p-6 rounded-2xl glass text-center space-y-4">
              <p className="text-muted-foreground">Connectez-vous pour vendre vos plastiques.</p>
              <Link to="/connexion" className="inline-block shimmer px-6 py-3 rounded-xl gradient-bio text-primary-foreground font-semibold">Se connecter</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Repère / Lieu de collecte *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input type="text" required placeholder="Ex: Devant maison bleue, rue du marché" value={repere} onChange={(e) => setRepere(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Quantité (kg) *</label>
                <div className="relative">
                  <Weight className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input type="number" required min="1" placeholder="Ex: 5" value={kilos} onChange={(e) => setKilos(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Photo (optionnelle)</label>
                <label className="block border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/40 transition-colors">
                  <Camera className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">{photo ? photo.name : "Ajouter une photo de vos plastiques"}</p>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
                </label>
              </div>
              <button type="submit" disabled={loading} className="w-full shimmer py-3 rounded-xl gradient-bio text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] glow-emerald disabled:opacity-50">
                <Send className="w-4 h-4" />
                {loading ? "Envoi..." : "Proposer la vente"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendrePlastiques;
