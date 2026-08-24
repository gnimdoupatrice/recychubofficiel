import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, RefreshCw, X } from "lucide-react";

/**
 * Prise de photo EN DIRECT uniquement : on ouvre le flux caméra de l'appareil.
 * Aucun accès à la galerie n'est proposé — la photo doit être prise sur place.
 * Fonctionne hors connexion (API navigateur pure, aucun appel réseau).
 */
interface Props {
  photo: Blob | null;
  onPhoto: (blob: Blob | null) => void;
}

const CameraCapture = ({ photo, onPhoto }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [ouvert, setOuvert] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [apercu, setApercu] = useState<string | null>(null);

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
    setErreur(null);
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
      setErreur(
        nom === "NotAllowedError"
          ? "Accès à l'appareil photo refusé. Autorisez la caméra dans les réglages du navigateur puis réessayez."
          : "Appareil photo indisponible sur cet appareil."
      );
    }
  };

  const fermer = () => {
    stopStream();
    setOuvert(false);
  };

  const capturer = () => {
    const video = videoRef.current;
    if (!video) return;
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

  return (
    <div>
      {apercu ? (
        <div className="rounded-xl overflow-hidden border border-orange-alert/30">
          <img src={apercu} alt="Photo du dépotoir signalé" className="w-full max-h-72 object-cover" />
          <div className="flex gap-2 p-3">
            <button type="button" onClick={ouvrirCamera} className="flex-1 py-2 rounded-lg border border-orange-alert/40 text-sm font-medium inline-flex items-center justify-center gap-2">
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
      {erreur && <p className="text-xs text-destructive mt-2">{erreur}</p>}
    </div>
  );
};

export default CameraCapture;
