import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

/** Bouteille plastique PET : bouchon à vis, col, épaule, étiquette, nervures. */
export function PlasticBottleIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="10" y="1.75" width="4" height="2.5" rx="0.6" />
      <path d="M10.4 4.25v1.6c0 .7-.4 1.3-1 1.7C8.3 8.3 7.75 9.4 7.75 10.6v9.4a2.25 2.25 0 0 0 2.25 2.25h4A2.25 2.25 0 0 0 16.25 20v-9.4c0-1.2-.55-2.3-1.65-3.05-.6-.4-1-1-1-1.7v-1.6" />
      <path d="M7.75 12.5h8.5M7.75 16.5h8.5" />
      <path d="M10 19.25h4" />
    </svg>
  );
}

/** Canette en aluminium : couvercle, opercule, corps. */
export function CanIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <ellipse cx="12" cy="4.5" rx="5" ry="1.75" />
      <path d="M7 4.5v15c0 1 2.25 1.75 5 1.75s5-.75 5-1.75v-15" />
      <path d="M11 4.3h2.4" />
      <path d="M7 8c1.4.6 3.1.9 5 .9s3.6-.3 5-.9M7 17c1.4.6 3.1.9 5 .9s3.6-.3 5-.9" />
    </svg>
  );
}

/** Carton d'emballage ouvert avec rabats. */
export function CardboardIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M4 9.5h16v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5z" />
      <path d="M4 9.5 2.25 5.75 9 4.5l3 5M20 9.5l1.75-3.75L15 4.5l-3 5" />
      <path d="M9.5 13.5h5" />
    </svg>
  );
}

/** Vieux téléphone portable + câble. */
export function OldPhoneIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="6.5" y="2" width="9" height="16" rx="1.75" />
      <rect x="8.5" y="4.5" width="5" height="5" rx="0.5" />
      <path d="M9 12.5h.01M11 12.5h.01M13 12.5h.01M9 15h.01M11 15h.01M13 15h.01" strokeWidth="2.4" />
      <path d="M11 18v1.5c0 1.4 1.1 2.5 2.5 2.5H19" />
    </svg>
  );
}
