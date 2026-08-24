// Préparation de la photo AVANT écriture locale :
// 1. conversion HEIC (photos iPhone) -> JPEG, car <canvas> ne décode pas le HEIC
// 2. redimensionnement à 1600px max de large + compression JPEG ~80%
// Objectif : limiter la place occupée sur le téléphone ET la data consommée à l'envoi.

const MAX_WIDTH = 1600;
const QUALITY = 0.8;

function isHeic(file: Blob) {
  const type = (file.type || "").toLowerCase();
  const name = ((file as File).name || "").toLowerCase();
  return type.includes("heic") || type.includes("heif") || name.endsWith(".heic") || name.endsWith(".heif");
}

async function toJpegSource(file: Blob): Promise<Blob> {
  if (!isHeic(file)) return file;
  // Import dynamique : la librairie (lourde) n'est chargée que pour les photos iPhone.
  const heic2any = (await import("heic2any")).default;
  const converted = (await heic2any({ blob: file, toType: "image/jpeg", quality: QUALITY })) as Blob | Blob[];
  return Array.isArray(converted) ? converted[0] : converted;
}

export async function preparePhoto(file: Blob): Promise<Blob> {
  const source = await toJpegSource(file);

  const bitmap = await createImageBitmap(source).catch(() => null);
  if (!bitmap) return source; // repli : on garde la photo telle quelle plutôt que d'échouer

  const ratio = Math.min(1, MAX_WIDTH / bitmap.width);
  const width = Math.round(bitmap.width * ratio);
  const height = Math.round(bitmap.height * ratio);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return source;
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/jpeg", QUALITY)
  );
  return blob ?? source;
}
