type Material = { id: string; name: string; category: string };

const labels: Record<string, { label: string; detail: string }> = {
  pet: { label: "PET", detail: "Bouteilles transparentes ou colorées" },
  pehd: { label: "PEHD", detail: "Bidons et flacons rigides" },
  sachets: { label: "Sachets d’eau", detail: "Pure Water / Piata" },
  fer: { label: "Fer", detail: "Fer et ferraille" },
  cuivre: { label: "Cuivre", detail: "Fils et câbles" },
  aluminium: { label: "Aluminium", detail: "Canettes et marmites" },
  laiton: { label: "Bronze", detail: "Bronze et laiton" },
  bronze: { label: "Bronze", detail: "Bronze" },
  batteries: { label: "Batteries", detail: "Batteries usagées" },
};

export function materialDisplay(material: Material) {
  return labels[material.id] ?? { label: material.name, detail: material.category };
}

export function validDeclaration(material: string, kg: string, quartier: string) {
  return Boolean(material && quartier.trim() && Number.isFinite(Number(kg)) && Number(kg) > 0);
}

export function entrySearch(role: "household" | "company") {
  return { mode: "signin" as const, role };
}

export type Intent = "sale" | "donation";
const DON = "[DON]";

/** Encodes the intent in the note so it survives the offline outbox and needs no schema change. */
export function encodeNote(note: string, intent: Intent) {
  const clean = stripIntent(note);
  return intent === "donation" ? (clean ? `${DON} ${clean}` : DON) : clean;
}
export function isDonation(note: string | null | undefined) {
  return (note ?? "").trimStart().startsWith(DON);
}
export function stripIntent(note: string | null | undefined) {
  const n = (note ?? "").trim();
  return n.startsWith(DON) ? n.slice(DON.length).trim() : n;
}
/** Cash owed to the household: donations are always 0. */
export function payout(note: string | null | undefined, kg: number, pricePerKg: number) {
  return isDonation(note) ? 0 : kg * pricePerKg;
}
