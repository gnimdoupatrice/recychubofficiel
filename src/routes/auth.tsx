import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { phoneToEmail, normalizePhone, type Role } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const search = z.object({
  mode: z.enum(["signin", "signup"]).optional(),
  role: z.enum(["household", "company"]).optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Connexion — EcoCollecte Kara" },
      { name: "description", content: "Connectez-vous ou créez votre compte ménage ou entreprise avec votre numéro de téléphone." },
      { property: "og:title", content: "Connexion — EcoCollecte Kara" },
      { property: "og:description", content: "Accédez à votre espace de recyclage." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const s = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">(s.mode ?? "signin");
  const [role, setRole] = useState<Role>(s.role ?? "household");
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState({ phone: "", password: "", full_name: "", company_name: "", quartier: "", address: "", city: "Kara" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (normalizePhone(f.phone).length < 8) return toast.error("Numéro de téléphone invalide");
    if (f.password.length < 6) return toast.error("Le mot de passe doit contenir au moins 6 caractères");
    setBusy(true);
    const email = phoneToEmail(f.phone);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password: f.password });
      setBusy(false);
      if (error) return toast.error("Numéro ou mot de passe incorrect");
    } else {
      if (!f.full_name.trim()) { setBusy(false); return toast.error("Indiquez votre nom"); }
      if (role === "household" && !f.quartier.trim()) { setBusy(false); return toast.error("Indiquez votre quartier"); }
      if (role === "company" && !f.company_name.trim()) { setBusy(false); return toast.error("Indiquez le nom de l'entreprise"); }
      const { data, error } = await supabase.auth.signUp({
        email,
        password: f.password,
        options: { data: { ...f, phone: normalizePhone(f.phone), role } },
      });
      setBusy(false);
      if (error) return toast.error(error.message.includes("registered") ? "Ce numéro a déjà un compte" : error.message.includes("weak") ? "Mot de passe trop facile à deviner, choisissez-en un autre" : error.message);
      if (!data.session) return toast.error("Inscription incomplète, réessayez de vous connecter");
      toast.success("Bienvenue sur EcoCollecte !");
    }
    navigate({ to: "/tableau-de-bord", replace: true });
    return undefined;
  }

  return (
    <div className="min-h-screen bg-background px-5 py-6">
      <div className="mx-auto max-w-md">
        <Link to="/" className="flex items-center gap-2">
          <img src="/icons/icon-192.png" alt="" width={36} height={36} className="h-9 w-9 rounded-xl" />
          <span className="font-display text-lg font-bold text-primary">EcoCollecte</span>
        </Link>
        <h1 className="mt-8 text-2xl font-bold">{mode === "signin" ? "Bon retour !" : "Créer un compte"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "signin" ? "Connectez-vous avec votre numéro de téléphone." : "Quelques informations pour commencer."}
        </p>

        {mode === "signup" && (
          <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-muted p-1">
            {(["household", "company"] as const).map((r) => (
              <button key={r} type="button" onClick={() => setRole(r)}
                className={`rounded-xl py-2.5 text-sm font-semibold transition ${role === r ? "bg-card text-primary shadow-sm" : "text-muted-foreground"}`}>
                {r === "household" ? "Ménage" : "Entreprise"}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <Field label={role === "company" ? "Nom du responsable" : "Nom complet"}><Input value={f.full_name} onChange={set("full_name")} className="h-12 rounded-xl" /></Field>
          )}
          {mode === "signup" && role === "company" && (
            <Field label="Nom de l'entreprise"><Input value={f.company_name} onChange={set("company_name")} className="h-12 rounded-xl" /></Field>
          )}
          <Field label="Téléphone"><Input type="tel" inputMode="tel" placeholder="90 00 00 00" value={f.phone} onChange={set("phone")} className="h-12 rounded-xl" /></Field>
          <Field label="Mot de passe"><Input type="password" value={f.password} onChange={set("password")} className="h-12 rounded-xl" /></Field>
          {mode === "signup" && role === "household" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Quartier"><Input value={f.quartier} onChange={set("quartier")} placeholder="Ex : Kpéwa" className="h-12 rounded-xl" /></Field>
                <Field label="Ville"><Input value={f.city} onChange={set("city")} className="h-12 rounded-xl" /></Field>
              </div>
              <Field label="Repère / adresse (privé)"><Input value={f.address} onChange={set("address")} placeholder="Près de la pharmacie…" className="h-12 rounded-xl" /></Field>
            </>
          )}
          <button disabled={busy} className="h-12 w-full rounded-full bg-primary font-semibold text-primary-foreground disabled:opacity-60">
            {busy ? "Patientez…" : mode === "signin" ? "Se connecter" : "Créer mon compte"}
          </button>
        </form>

        <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-6 w-full text-center text-sm font-semibold text-primary">
          {mode === "signin" ? "Pas encore de compte ? S'inscrire" : "Déjà inscrit ? Se connecter"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold">{label}</Label>
      {children}
    </div>
  );
}
