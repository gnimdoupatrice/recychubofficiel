import type { SVGProps } from "react";
import { PlasticBottleIcon, CanIcon, CardboardIcon, OldPhoneIcon } from "@/components/MaterialIcons";

/** Picks the recyclable-material pictogram from the material's id/name/category. */
export function MaterialIcon({ hint, ...p }: SVGProps<SVGSVGElement> & { hint: string }) {
  const h = hint.toLowerCase();
  if (/(alu|canette|metal|métal|fer)/.test(h)) return <CanIcon {...p} />;
  if (/(carton|papier|paper)/.test(h)) return <CardboardIcon {...p} />;
  if (/(phone|téléphone|telephone|electr|élec|deee|batter)/.test(h)) return <OldPhoneIcon {...p} />;
  return <PlasticBottleIcon {...p} />;
}
