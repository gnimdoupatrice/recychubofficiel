import { normalizePhone, type Role } from "@/lib/auth";

export type AuthForm = {
  phone: string; password: string; full_name: string; company_name: string;
  quartier: string; address: string; city: string;
};

export function formatPhoneInput(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("00228")) digits = digits.slice(5);
  else if (digits.startsWith("228") && digits.length > 8) digits = digits.slice(3);
  return digits.slice(0, 8).replace(/(\d{2})(?=\d)/g, "$1 ");
}

export function accountError(f: AuthForm, signup: boolean) {
  if (!/^228\d{8}$/.test(normalizePhone(f.phone))) return "Numéro de téléphone invalide";
  if (f.password.length < 6) return "Le mot de passe doit contenir au moins 6 caractères";
  if (signup && !f.full_name.trim()) return "Indiquez votre nom";
  return null;
}

export function detailsError(f: AuthForm, role: Role) {
  if (role === "household" && !f.quartier.trim()) return "Indiquez votre quartier";
  if (role === "company" && !f.company_name.trim()) return "Indiquez le nom de l'entreprise";
  return null;
}

export function signupSteps(role: Role) {
  return ["Compte", role === "household" ? "Localisation" : "Entreprise"] as const;
}