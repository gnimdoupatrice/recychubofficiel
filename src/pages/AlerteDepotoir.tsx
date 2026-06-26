import { useState } from "react";
import { AlertTriangle, Camera, MapPin, Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import SEO from "@/components/SEO";

const AlerteDepotoir = () => {
  const { user } = useAuth();
  const [repere, setRepere] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) { toast.error("La photo est obligatoire"); return; }
    setLoading(true);

    let photo_url: string | null = null;
    const folder = user?.id ?? "anonymous";
    const path = `${folder}/${Date.now()}-${photo.name}`;
    const { error: uploadErr } = await supabase.storage.from("recychub-photos").upload(path, photo);
    if (uploadErr) { toast.error("Erreur upload photo"); setLoading(false); return; }
    const { data } = supabase.storage.from("recychub-photos").getPublicUrl(path);
    photo_url = data.publicUrl;

    const { error } = await supabase.from("dumps_alerts").insert({
      user_id: user?.id ?? null,
      photo_url,
      repere,
    });
    setLoading(false);
    if (error) { toast.error("Erreur lors de l'envoi"); }
    else {
      toast.success("Alerte envoyée ! Merci pour votre signalement 🙏");
      setRepere(""); setPhoto(null);
    }
  };
  return (
    <div className="pt-24 pb-16 min-h-dvh">
      <SEO title="Alerte Dépotoir Sauvage" description="Signalez en quelques clics un dépotoir sauvage à Kara. Photo + repère et notre équipe intervient pour dépolluer votre quartier." path="/alerte" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 animate-pulse-orange">
            <AlertTriangle className="w-4 h-4 text-orange-alert" />
            <span className="text-sm font-medium text-orange-alert">Signalement</span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">
            Alerte <span className="text-orange-alert">Dépotoir</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Signalez un dépotoir sauvage dans votre quartier. Ensemble, rendons Kara plus propre.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Photo du dépotoir *</label>
              <label className="block border-2 border-dashed border-orange-alert/30 rounded-xl p-8 text-center cursor-pointer hover:border-orange-alert/60 transition-colors">
                <Camera className="w-10 h-10 text-orange-alert/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">{photo ? photo.name : "Prendre une photo ou choisir depuis la galerie"}</p>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Repère / Lieu précis *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input type="text" required placeholder="Ex: Derrière le marché central, Kozah 2" value={repere} onChange={(e) => setRepere(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full shimmer py-3 rounded-xl bg-orange-alert text-destructive-foreground font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] glow-orange disabled:opacity-50">
              <Send className="w-4 h-4" />
              {loading ? "Envoi..." : "Envoyer l'alerte"}
            </button>
            <p className="text-xs text-muted-foreground text-center">
              {user ? "Votre profil sera attaché à cette alerte." : "Connectez-vous pour suivre vos alertes. Les alertes anonymes sont aussi acceptées."}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AlerteDepotoir;       
