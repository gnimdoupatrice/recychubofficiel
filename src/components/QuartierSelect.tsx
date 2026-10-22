import { useState } from "react";
import { Input } from "@/components/ui/input";

/** Predefined neighbourhoods so tours group correctly (no typos). Edit this list to adjust. */
export const QUARTIERS = [
  "Chaminade", "Dongoyo", "Ewaou", "Kara-Sud", "Kassabadè", "Kouwodè", "Kpéwa",
  "Lama-Tessi", "Lassa", "Pya", "Sarakawa", "Tchintchinda", "Tomdè",
];
const OTHER = "__other";

export function QuartierSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const known = QUARTIERS.includes(value);
  const [other, setOther] = useState(!!value && !known);
  return (
    <div className="space-y-2">
      <select
        value={other ? OTHER : known ? value : ""}
        onChange={(e) => {
          if (e.target.value === OTHER) { setOther(true); onChange(""); }
          else { setOther(false); onChange(e.target.value); }
        }}
        className="h-12 w-full rounded-xl border border-input bg-background px-3 text-base"
      >
        <option value="" disabled>Choisir mon quartier</option>
        {QUARTIERS.map((q) => <option key={q} value={q}>{q}</option>)}
        <option value={OTHER}>Autre quartier…</option>
      </select>
      {other && (
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Nom du quartier" className="h-12 rounded-xl" />
      )}
    </div>
  );
}
