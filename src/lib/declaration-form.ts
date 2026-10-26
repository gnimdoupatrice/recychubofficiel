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