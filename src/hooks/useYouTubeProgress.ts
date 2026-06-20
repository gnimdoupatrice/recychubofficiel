import { useEffect, useRef } from "react";

// Singleton loader pour l'API YouTube IFrame
let apiPromise: Promise<void> | null = null;
function loadYouTubeAPI(): Promise<void> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    if ((window as any).YT && (window as any).YT.Player) return resolve();
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    (window as any).onYouTubeIframeAPIReady = () => resolve();
  });
  return apiPromise;
}

interface Options {
  /** Appelé toutes les ~10s avec la position courante (secondes). */
  onTick?: (watchedSeconds: number, durationSeconds: number) => void;
  /** Appelé quand >=90% est regardé. */
  onComplete?: () => void;
}

/**
 * Branche un iframe YouTube sur l'API Player et émet des évènements de progression.
 * `containerId` = id d'un élément qui sera remplacé par le player.
 * `videoId` = id YouTube (11 caractères).
 */
export function useYouTubeProgress(containerId: string, videoId: string | null, opts: Options) {
  const completedRef = useRef(false);
  const optsRef = useRef(opts);
  optsRef.current = opts;

  useEffect(() => {
    if (!videoId) return;
    let player: any = null;
    let interval: number | null = null;
    let cancelled = false;
    completedRef.current = false;

    loadYouTubeAPI().then(() => {
      if (cancelled) return;
      const YT = (window as any).YT;
      player = new YT.Player(containerId, {
        videoId,
        playerVars: { rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onReady: () => {
            interval = window.setInterval(() => {
              if (!player || typeof player.getCurrentTime !== "function") return;
              const t = player.getCurrentTime();
              const d = player.getDuration() || 0;
              optsRef.current.onTick?.(Math.floor(t), Math.floor(d));
              if (!completedRef.current && d > 0 && t / d >= 0.9) {
                completedRef.current = true;
                optsRef.current.onComplete?.();
              }
            }, 10000);
          },
          onStateChange: (e: any) => {
            // 0 = ended
            if (e.data === 0 && !completedRef.current) {
              completedRef.current = true;
              optsRef.current.onComplete?.();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (interval) window.clearInterval(interval);
      if (player && typeof player.destroy === "function") {
        try { player.destroy(); } catch { /* noop */ }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, containerId]);
}
