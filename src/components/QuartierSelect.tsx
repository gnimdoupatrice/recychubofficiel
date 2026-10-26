import { useState } from "react";
import { Input } from "@/components/ui/input";

/** Predefined neighbourhoods so tours group correctly (no typos). Edit this list to adjust. */
export const QUARTIERS = [
  "Chaminade", "Dongoyo", "Ewaou", "Kara-Sud", "Kassabadè", "Kouwodè", "Kpéwa",
  "Lama-Tessi", "Lassa", "Pya", "Sarakawa", "Tchintchinda", "Tomdè",
];
const OTHER = "__other";

export function QuartierSelect({ value, onChange, id, placeholder = "Choisir mon quartier" }: { value: string; onChange: (v: string) => void; id?: string; placeholder?: string }) {
  const known = QUARTIERS.includes(value);
  const [other, setOther] = useState(!!value && !known);
  return (
    <div className="space-y-2">
      <select
        id={id}
        value={other ? OTHER : known ? value : ""}
        onChange={(e) => {
          if (e.target.value === OTHER) { setOther(true); onChange(""); }
          else { setOther(false); onChange(e.target.value); }
        }}
        className="h-12 w-full min-w-0 rounded-xl border border-form-border bg-card px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="" disabled>{placeholder}</option>
        {QUARTIERS.map((q) => <option key={q} value={q}>{q}</option>)}
        <option value={OTHER}>Autre quartier…</option>
      </select>
      {other && (
        <Input aria-label="Nom du quartier" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Nom du quartier" className="h-12 rounded-xl border-form-border bg-card" />
      )}
    </div>
  );
}
