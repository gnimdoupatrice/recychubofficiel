import { useEffect, useRef, useState } from "react";
import { AlertTriangle, MapPin, Send, RefreshCw, CloudOff, CheckCircle2, Trash2 } from "lucide-react";
import CameraCapture from "@/components/CameraCapture";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import SEO from "@/components/SEO";
import { useGeolocalisation, SEUIL_TENTATIVES } from "@/hooks/useGeolocalisation";
import { useFileSignalements } from "@/hooks/useFileSignalements";
import { preparePhoto } from "@/lib/offline/image";
import { saveSignalement, deleteSignalement, type SignalementLocal } from "@/lib/offline/db";
import { syncQueue, retryOne, demanderBackgroundSync } from "@/lib/offline/sync";
import { isReallyOnline } from "@/lib/offline/network";

const AlerteDepotoir = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const repereRef = useRef<HTMLTextAreaElement>(null);

  const geo = useGeolocalisation();
  const { enAttente, echecs } = useFileSignalements();

  // Le champ texte devient le filet de secours une fois les 3 tentatives épuisées.
  const repereObligatoire = geo.etat === "fallback";

  useEffect(() => {
    if (repereObligatoire) repereRef.current?.focus();
  }, [repereObligatoire]);

  const messageGeo = () => {
    if (geo.etat === "loading") return "📍 Localisation en cours...";
    if (geo.etat === "success") return "📍 Position détectée";
    if (geo.etat === "fallback")
      return geo.erreur === "denied"
        ? "Localisation refusée — décrivez le lieu ci-dessous, votre alerte sera bien prise en compte."
        : "Position indisponible — merci de préciser le lieu ci-dessous";
    if (geo.erreur === "denied")
      return "L'accès à votre position a été refusé. Cliquez sur l'icône 🔒 ou ⓘ à côté de l'adresse du site, puis autorisez la localisation.";
    if (geo.erreur === "unavailable")
      return "Impossible d'obtenir votre position. Vérifiez que la localisation est activée dans les réglages de votre téléphone.";
    return "La localisation prend plus de temps que prévu...";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) { toast.error("La photo est obligatoire"); return; }

    // Validation selon l'état de la localisation
    if (geo.etat === "loading") { toast.info("Localisation en cours, un instant..."); return; }
    if (geo.etat === "error") {
      toast.error("Nous n'avons pas encore votre position. Appuyez sur « Réessayer ».");
      return;
    }
    if (geo.etat === "fallback" && !description.trim()) {
      toast.error("Merci de décrire précisément le lieu du dépôt.");
      repereRef.current?.focus();
      return;
    }

    setLoading(true);
    try {
      // Compression (et conversion HEIC iPhone) AVANT l'écriture locale.
      const blob = await preparePhoto(photo);

      const item: SignalementLocal = {
        id: crypto.randomUUID(),
        photo: blob,
        photo_type: blob.type || "image/jpeg",
        latitude: geo.position?.latitude ?? null,
        longitude: geo.position?.longitude ?? null,
        repere_texte: description.trim(),
        description: "",
        date_capture: Date.now(),
        statut: "pending",
        tentatives_envoi: 0,
        derniere_tentative: null,
        user_id: user?.id ?? null,
      };

      // ÉTAPE NON NÉGOCIABLE : on enregistre d'abord sur l'appareil,
      // quelle que soit la connexion. Rien ne peut être perdu ensuite.
      await saveSignalement(item);
      demanderBackgroundSync();

      setDescription(""); setPhoto(null);

      const enLigne = await isReallyOnline();
      if (enLigne) {
        await syncQueue(true);
        toast.success("Votre alerte a été transmise, merci ! 🙏");
      } else {
        toast.success("Signalement enregistré sur votre appareil. Il sera envoyé automatiquement dès que vous aurez du réseau.");
      }
    } catch {
      toast.error("Impossible de préparer la photo. Réessayez avec une autre image.");
    } finally {
      setLoading(false);
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

        <div className="max-w-md mx-auto space-y-4">
          {/* Bandeau file d'attente — rassure le citoyen : rien n'est perdu */}
          {enAttente.length > 0 && (
            <div className="p-3 rounded-xl bg-orange-alert/10 border border-orange-alert/30 text-sm flex items-start gap-2">
              <CloudOff className="w-4 h-4 text-orange-alert mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-orange-alert">
                  {enAttente.length} signalement{enAttente.length > 1 ? "s" : ""} en attente d'envoi
                </p>
                {enAttente.length > 20 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    De nombreux signalements sont en attente — vérifiez votre connexion internet dès que possible.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Signalements refusés : action manuelle proposée */}
          {echecs.map((s) => (
            <div key={s.id} className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-sm">
              <p className="font-medium text-destructive">Un signalement n'a pas pu être transmis</p>
              <p className="text-xs text-muted-foreground mb-2">{s.repere_texte || "Sans repère"}</p>
              <div className="flex gap-2">
                <button onClick={() => retryOne(s.id)} className="px-3 py-1.5 rounded-lg bg-orange-alert text-destructive-foreground text-xs font-medium inline-flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" /> Renvoyer
                </button>
                <button onClick={() => deleteSignalement(s.id)} className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium inline-flex items-center gap-1">
                  <Trash2 className="w-3 h-3" /> Supprimer
                </button>
              </div>
            </div>
          ))}

          <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Photo du dépotoir *</label>
              <CameraCapture photo={photo} onPhoto={setPhoto} />
              <p className="text-xs text-muted-foreground mt-2">
                La photo doit être prise sur place avec l'appareil photo — la galerie n'est pas utilisée.
              </p>

              {/* Indicateur de localisation, visible en permanence */}
              <div className="mt-3 text-sm">
                {geo.etat === "success" ? (
                  <p className="text-primary flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> {messageGeo()}
                  </p>
                ) : (
                  <div className={geo.etat === "loading" ? "text-orange-alert/80" : "text-orange-alert"}>
                    <p>{messageGeo()}</p>
                    {(geo.etat === "error" || geo.etat === "fallback") && (
                      <button
                        type="button"
                        onClick={geo.reessayer}
                        className="mt-2 px-3 py-1.5 rounded-lg border border-orange-alert/40 text-xs font-medium inline-flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        {geo.erreur === "denied" ? "J'ai réactivé, réessayer" : "Réessayer"}
                      </button>
                    )}
                    {geo.etat === "error" && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Tentative {geo.tentativesGeolocalisation} sur {SEUIL_TENTATIVES}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description du lieu {repereObligatoire ? "*" : "(optionnel)"}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <textarea
                  ref={repereRef}
                  rows={3}
                  required={repereObligatoire}
                  placeholder={repereObligatoire
                    ? "Décrivez précisément l'endroit, ex: à 50m derrière le marché central, côté rue principale"
                    : "Ex: Derrière le marché central, Kozah 2 — type ou ampleur du dépôt"}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30 border resize-none ${
                    repereObligatoire ? "border-orange-alert ring-1 ring-orange-alert/30" : "border-input"
                  }`}
                />
              </div>
            </div>

            <button type="submit" disabled={loading || geo.etat === "loading"} className="w-full shimmer py-3 rounded-xl bg-orange-alert text-destructive-foreground font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] glow-orange disabled:opacity-50">
              <Send className="w-4 h-4" />
              {loading ? "Envoi..." : geo.etat === "loading" ? "Localisation en cours..." : "Envoyer l'alerte"}
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
