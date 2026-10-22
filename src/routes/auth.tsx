import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, Home, LockKeyhole, Truck, UserRound, Building2, LoaderCircle } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { phoneToEmail, normalizePhone, type Role } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { QuartierSelect } from "@/components/QuartierSelect";
const logo = { url: "/recychub-logo.png" };

const search = z.object({
  mode: z.enum(["signin", "signup"]).optional(),
  role: z.enum(["household", "company"]).optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Connexion — RecycHub Togo" },
      { name: "description", content: "Connectez-vous ou créez votre compte ménage ou entreprise avec votre numéro de téléphone." },
      { property: "og:title", content: "Connexion — RecycHub Togo" },
      { property: "og:description", content: "Accédez à votre espace de recyclage." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
  const [showPassword, setShowPassword] = useState(false);
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
      toast.success("Bienvenue sur RecycHub !");
    }
    navigate({ to: "/tableau-de-bord", replace: true });
    return undefined;
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background pb-[env(safe-area-inset-bottom)]">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-5 py-2.5">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo.url} alt="" width={32} height={32} className="h-8 w-8" />
            <span className="font-display text-base font-bold text-primary">RecycHub</span>
          </Link>
          <Button asChild variant="ghost" size="icon" className="h-11 w-11 shrink-0 rounded-full hover:bg-secondary" title="Retour à l'accueil">
            <Link to="/" aria-label="Retour à l'accueil"><ArrowLeft /></Link>
          </Button>
        </div>
      </header>
      <main className={`mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-8 ${mode === "signin" ? "justify-center py-10" : "pt-7"}`}>
        <div className="w-full">
        <h1 className="font-display text-xl font-bold [letter-spacing:0]">{mode === "signin" ? "Bon retour !" : "Créer un compte"}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {mode === "signin" ? "Retrouvez votre espace RecycHub." : "Votre espace de recyclage à Kara."}
        </p>
        {mode === "signup" && (
          <div role="group" aria-label="Type de compte" className="mt-5 grid grid-cols-2 gap-3">
            {(["household", "company"] as const).map((r) => {
              const selected = role === r;
              const Icon = r === "household" ? Home : Truck;
              return <Button key={r} type="button" variant="outline" aria-pressed={selected} disabled={busy} onClick={() => setRole(r)}
                className={`relative h-20 flex-col gap-2 rounded-xl border-2 text-sm font-bold shadow-none ${selected ? r === "household" ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "border-collector bg-collector text-collector-foreground hover:bg-collector/90 hover:text-collector-foreground" : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`}>
                <Icon className="size-5" />
                {r === "household" ? "Ménage" : "Entreprise"}
                {selected && <Check aria-hidden className="absolute right-2 top-2 size-3.5" />}
              </Button>;
            })}
          </div>
        )}
        <form id="auth-form" onSubmit={submit} className="mt-5 space-y-3.5">
          {mode === "signup" && <Field id="full-name" label={role === "company" ? "Nom du responsable" : "Nom complet"}>
            <div className="relative"><UserRound aria-hidden className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" /><Input id="full-name" autoComplete="name" value={f.full_name} onChange={set("full_name")} className={inputClass + " pl-11"} /></div>
          </Field>}
          {mode === "signup" && role === "company" && <Field id="company-name" label="Nom de l'entreprise">
            <div className="relative"><Building2 aria-hidden className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" /><Input id="company-name" autoComplete="organization" value={f.company_name} onChange={set("company_name")} className={inputClass + " pl-11"} /></div>
          </Field>}
          <Field id="phone" label="Téléphone">
            <div className="relative">
              <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center gap-2 pl-3.5 text-sm font-semibold"><span>🇹🇬</span><span className="border-r border-form-border pr-3">+228</span></span>
              <Input id="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="90 00 00 00" value={f.phone} onChange={set("phone")} className={inputClass + " pl-28"} />
            </div>
          </Field>
          <Field id="password" label="Mot de passe">
            <div className="relative">
              <LockKeyhole aria-hidden className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input id="password" type={showPassword ? "text" : "password"} autoComplete={mode === "signin" ? "current-password" : "new-password"} value={f.password} onChange={set("password")} className={inputClass + " pl-11 pr-12"} />
              <Button type="button" variant="ghost" size="icon" aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"} title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"} aria-pressed={showPassword} onClick={() => setShowPassword((v) => !v)} className="absolute right-0.5 top-0.5 h-11 w-11 rounded-lg text-muted-foreground hover:bg-secondary">
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </Field>
          {mode === "signup" && role === "household" && <>
            <Field id="quartier" label="Quartier"><QuartierSelect id="quartier" value={f.quartier} onChange={(v) => setF((p) => ({ ...p, quartier: v }))} /></Field>
            <Field id="address" label="Repère / adresse (privé)"><Input id="address" value={f.address} onChange={set("address")} placeholder="Près de la pharmacie…" className={inputClass} /></Field>
          </>}
          <Button type="submit" disabled={busy} className="mt-2 h-12 w-full rounded-full text-base font-bold shadow-none">
            {busy ? <LoaderCircle className="animate-spin motion-reduce:animate-none" /> : null}
            {busy ? "Patientez…" : mode === "signin" ? "Se connecter" : "Créer mon compte"}
            {!busy && <ArrowRight />}
          </Button>
        </form>
          <Button type="button" variant="link" disabled={busy} onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setShowPassword(false); }} className="mt-3 min-h-11 w-full whitespace-normal text-center text-sm">
            {mode === "signin" ? "Pas encore de compte ? S'inscrire" : "Déjà inscrit ? Se connecter"}
          </Button>
        </div>
      </main>
    </div>
  );
}

const inputClass = "h-12 rounded-xl border-form-border bg-card text-base shadow-none focus-visible:ring-2";

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-semibold">{label}</Label>
      {children}
    </div>
  );
}
