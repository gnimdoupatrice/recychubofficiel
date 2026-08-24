import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, RefreshCw, X } from "lucide-react";

/**
 * Prise de photo EN DIRECT uniquement : on ouvre le flux caméra de l'appareil.
 * Aucun accès à la galerie n'est proposé — la photo doit être prise sur place.
 * Tout fonctionne hors connexion (APIs navigateur pures, aucun appel réseau).
 *
 * Repli cohérent si `getUserMedia` est indisponible (navigateur ancien, WebView) :
 * un input `capture="environment"` qui ouvre lui aussi directement l'appareil photo.
 */
interface Props {
  photo: Blob | null;
  onPhoto: (blob: Blob | null) => void;
}

type Souci = "denied" | "absente" | "occupee" | "insecure" | "indisponible";

const MESSAGES: Record<Souci, string> = {
  denied:
    "Accès à l'appareil photo refusé. Touchez l'icône 🔒 ou ⓘ à côté de l'adresse du site, autorisez la caméra, puis réessayez.",
  absente: "Aucun appareil photo détecté sur cet appareil.",
  occupee: "L'appareil photo est déjà utilisé par une autre application. Fermez-la puis réessayez.",
  insecure: "L'appareil photo nécessite une connexion sécurisée (https).",
  indisponible: "Appareil photo indisponible. Utilisez le bouton de secours ci-dessous.",
};

const CameraCapture = ({ photo, onPhoto }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [ouvert, setOuvert] = useState(false);
  const [souci, setSouci] = useState<Souci | null>(null);
  const [apercu, setApercu] = useState<string | null>(null);
  const [permission, setPermission] = useState<PermissionState | null>(null);

  // getUserMedia n'existe qu'en contexte sécurisé (https ou localhost).
  const supporteFluxDirect =
    typeof navigator !== "undefined" && !!navigator.mediaDevices?.getUserMedia && window.isSecureContext;

  useEffect(() => {
    // État de la permission caméra quand le navigateur l'expose (Chrome/Android).
    navigator.permissions
      ?.query({ name: "camera" as PermissionName })
      .then((res) => {
        setPermission(res.state);
        res.onchange = () => {
          setPermission(res.state);
          if (res.state === "granted") setSouci(null);
        };
      })
      .catch(() => setPermission(null));
  }, []);

  useEffect(() => {
    if (!photo) { setApercu(null); return; }
    const url = URL.createObjectURL(photo);
    setApercu(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => stopStream, [stopStream]);

  const ouvrirCamera = async () => {
    setSouci(null);
    if (!supporteFluxDirect) {
      setSouci(window.isSecureContext ? "indisponible" : "insecure");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      setOuvert(true);
      // Le <video> n'est monté qu'après setOuvert : on attache au tick suivant.
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => undefined);
        }
      }, 0);
    } catch (e) {
      const nom = (e as Error).name;
      if (nom === "NotAllowedError" || nom === "SecurityError") setSouci("denied");
      else if (nom === "NotFoundError" || nom === "OverconstrainedError") setSouci("absente");
      else if (nom === "NotReadableError" || nom === "AbortError") setSouci("occupee");
      else setSouci("indisponible");
    }
  };

  const fermer = () => {
    stopStream();
    setOuvert(false);
  };

  const capturer = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (blob) onPhoto(blob);
        fermer();
      },
      "image/jpeg",
      0.9
    );
  };

  if (ouvert) {
    return (
      <div className="rounded-xl overflow-hidden border border-orange-alert/40 bg-black">
        <video ref={videoRef} playsInline muted className="w-full max-h-72 object-cover" />
        <div className="flex gap-2 p-3 bg-background">
          <button type="button" onClick={capturer} className="flex-1 py-2 rounded-lg bg-orange-alert text-destructive-foreground text-sm font-semibold inline-flex items-center justify-center gap-2">
            <Camera className="w-4 h-4" /> Capturer
          </button>
          <button type="button" onClick={fermer} className="px-3 py-2 rounded-lg border border-border text-sm inline-flex items-center gap-1">
            <X className="w-4 h-4" /> Annuler
          </button>
        </div>
      </div>
    );
  }

  // Repli : ouvre l'appareil photo natif du téléphone (jamais la galerie).
  const replinatif = souci !== null || !supporteFluxDirect;

  return (
    <div>
      {apercu ? (
        <div className="rounded-xl overflow-hidden border border-orange-alert/30">
          <img src={apercu} alt="Photo du dépotoir signalé" className="w-full max-h-72 object-cover" />
          <div className="p-3">
            <button type="button" onClick={ouvrirCamera} className="w-full py-2 rounded-lg border border-orange-alert/40 text-sm font-medium inline-flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" /> Reprendre la photo
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={ouvrirCamera}
          className="w-full border-2 border-dashed border-orange-alert/30 rounded-xl p-8 text-center hover:border-orange-alert/60 transition-colors"
        >
          <Camera className="w-10 h-10 text-orange-alert/50 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Ouvrir l'appareil photo et prendre la photo du dépotoir</p>
        </button>
      )}

      {souci && (
        <p className="text-xs text-destructive mt-2">
          {MESSAGES[souci]}
          {permission === "denied" && souci === "denied" ? " La caméra est bloquée pour ce site." : ""}
        </p>
      )}

      {replinatif && (
        <label className="mt-2 block text-center text-xs font-medium text-orange-alert underline cursor-pointer">
          Utiliser l'appareil photo du téléphone
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) { onPhoto(f); setSouci(null); }
            }}
          />
        </label>
      )}
    </div>
  );
};

export default CameraCapture;
