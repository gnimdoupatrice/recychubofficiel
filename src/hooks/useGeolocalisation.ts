import { useCallback, useEffect, useRef, useState } from "react";

// Capture automatique de la position du citoyen.
// 3 cas d'erreur distincts sont traités séparément (refus / indisponible / trop long).

export type GeoEtat = "loading" | "success" | "error" | "fallback";
export type GeoErreur = "denied" | "unavailable" | "timeout" | "unsupported";

export const SEUIL_TENTATIVES = 3;

const OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 45000, // long : sans réseau, le GPS pur peut mettre 30-45 s
  maximumAge: 0,
};

export function useGeolocalisation() {
  const [etat, setEtat] = useState<GeoEtat>("loading");
  const [erreur, setErreur] = useState<GeoErreur | null>(null);
  const [position, setPosition] = useState<{ latitude: number; longitude: number } | null>(null);
  const [permission, setPermission] = useState<PermissionState | null>(null);

  // Compteur d'échecs de géolocalisation UNIQUEMENT (à ne pas confondre avec
  // `tentatives_envoi` qui compte les échecs d'envoi réseau).
  // State local : il repart à zéro à chaque nouvelle visite du formulaire.
  const [tentativesGeolocalisation, setTentativesGeolocalisation] = useState(0);
  const tentativesRef = useRef(0);

  const demanderPosition = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setEtat("fallback");
      setErreur("unsupported");
      return;
    }
    setEtat("loading");
    setErreur(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setEtat("success");
        setErreur(null);
      },
      (err) => {
        tentativesRef.current += 1;
        setTentativesGeolocalisation(tentativesRef.current);

        // Les 3 codes d'erreur possibles, traités séparément.
        if (err.code === err.PERMISSION_DENIED) setErreur("denied");
        else if (err.code === err.POSITION_UNAVAILABLE) setErreur("unavailable");
        else setErreur("timeout");

        // Au-delà de 3 échecs cumulés, on débloque le mode de secours par texte.
        setEtat(tentativesRef.current >= SEUIL_TENTATIVES ? "fallback" : "error");
      },
      OPTIONS
    );
  }, []);

  useEffect(() => {
    // État de la permission connu en amont quand le navigateur le permet.
    navigator.permissions
      ?.query({ name: "geolocation" as PermissionName })
      .then((res) => {
        setPermission(res.state);
        res.onchange = () => setPermission(res.state);
      })
      .catch(() => setPermission(null));

    demanderPosition();
  }, [demanderPosition]);

  return { etat, erreur, position, permission, tentativesGeolocalisation, reessayer: demanderPosition };
}
