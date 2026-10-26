import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Eye, EyeOff, House, Truck, WifiOff, LoaderCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { phoneToEmail, normalizePhone, type Role } from "@/lib/auth";
import { accountError, detailsError, formatPhoneInput, signupSteps, type AuthForm } from "@/lib/auth-form";
import { useOnline } from "@/lib/offline";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { QuartierSelect } from "@/components/QuartierSelect";

const search = z.object({ mode: z.enum(["signin", "signup"]).optional(), role: z.enum(["household", "company"]).optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: search,
  head: () => ({ meta: [
    { title: "Connexion et inscription — RecycHub Togo" },
    { name: "description", content: "Connectez-vous avec votre téléphone ou créez votre compte ménage ou entreprise en deux étapes sur RecycHub Togo." },
    { property: "og:title", content: "Votre espace — RecycHub Togo" },
    { property: "og:description", content: "Connexion et inscription pour les ménages et entreprises de recyclage à Kara." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AuthPage,
});

function AuthPage() {
  const s = Route.useSearch();
  const navigate = useNavigate();
  const online = useOnline();
  const [mode, setMode] = useState<"signin" | "signup">(s.mode ?? "signin");
  const [role, setRole] = useState<Role>(s.role ?? "household");
  const [step, setStep] = useState<1 | 2>(1);
  const [busy, setBusy] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [f, setF] = useState<AuthForm>({ phone: "", password: "", full_name: "", company_name: "", quartier: "", address: "", city: "Kara" });
  const signup = mode === "signup";
  const steps = signupSteps(role);
  const set = (k: keyof AuthForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setF((p) => ({ ...p, [k]: e.target.value })); setError(null);
  };

  useEffect(() => {
    setMode(s.mode ?? "signin"); setRole(s.role ?? "household"); setStep(1); setError(null);
  }, [s.mode, s.role]);

  function changeMode(next: "signin" | "signup") {
    setMode(next); setStep(1); setVisible(false); setError(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const validation = accountError(f, signup) ?? (signup && step === 2 ? detailsError(f, role) : null);
    if (validation) { setError(validation); return; }
    if (signup && step === 1) { setStep(2); setError(null); setVisible(false); return; }
    if (!navigator.onLine) { setError("Connexion Internet requise pour valider votre compte."); return; }
    setBusy(true); setError(null);
    try {
      const email = phoneToEmail(f.phone);
      if (!signup) {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password: f.password });
        if (authError) { setError("Numéro ou mot de passe incorrect"); return; }
      } else {
        const { data, error: authError } = await supabase.auth.signUp({
          email, password: f.password,
          options: { emailRedirectTo: window.location.origin, data: { ...f, phone: normalizePhone(f.phone), role } },
        });
        if (authError) {
          setError(authError.message.includes("registered") ? "Ce numéro a déjà un compte" : authError.message.includes("weak") ? "Mot de passe trop facile à deviner, choisissez-en un autre" : "Impossible de créer le compte. Réessayez."); return;
        }
        if (!data.session) { setError("Votre compte n’est pas encore connecté. Réessayez de vous connecter."); return; }
      }
      await navigate({ to: "/tableau-de-bord", replace: true });
    } catch {
      setError("Connexion interrompue. Vos informations sont conservées sur cet écran, réessayez.");
    } finally { setBusy(false); }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)] sm:px-6">
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col">
        <header className="grid h-12 shrink-0 grid-cols-[48px_1fr_48px] items-center">
          {signup && step === 2 ? (
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full" aria-label="Retour à l’étape compte" disabled={busy} onClick={() => { setStep(1); setError(null); }}><ArrowLeft className="!size-5" /></Button>
          ) : (
            <Button asChild variant="ghost" size="icon" className="h-12 w-12 rounded-full"><Link to="/" aria-label="Retour à l’accueil"><ArrowLeft className="!size-5" /></Link></Button>
          )}
          <Link to="/" aria-label="RecycHub Togo — accueil" className="mx-auto flex h-12 w-12 items-center justify-center"><img src="/recychub-logo.png" alt="RecycHub Togo" width={48} height={48} /></Link>
        </header>

        <div className="mt-1 grid shrink-0 grid-cols-2 border-b border-border" role="tablist" aria-label="Accès à votre espace">
          {(["signin", "signup"] as const).map((m) => (
            <Button key={m} role="tab" aria-selected={mode === m} variant="ghost" disabled={busy} onClick={() => changeMode(m)} className={`h-12 rounded-none border-b-2 font-semibold hover:bg-secondary hover:text-foreground ${mode === m ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>
              {m === "signin" ? "Connexion" : "Inscription"}
            </Button>
          ))}
        </div>

        <div className="pt-2">
          <h1 className="text-xl font-bold">{!signup ? "Bon retour !" : step === 1 ? "Créer un compte" : role === "household" ? "Votre localisation" : "Votre entreprise"}</h1>
          {!signup && <p className="mt-1 text-xs text-muted-foreground">Connectez-vous avec votre numéro de téléphone.</p>}
          {signup && (
            <ol className="mt-2 grid grid-cols-2 gap-3" aria-label="Progression de l’inscription">
              {steps.map((label, i) => <li key={label} aria-current={step === i + 1 ? "step" : undefined} className="min-w-0">
                <p className={`text-xs font-semibold ${step >= i + 1 ? "text-primary" : "text-muted-foreground"}`}>{i + 1}. {label}</p>
                <div className={`mt-1 h-1 rounded-full ${step >= i + 1 ? "bg-primary" : "bg-border"}`} />
              </li>)}
            </ol>
          )}
        </div>

        <form onSubmit={submit} className="flex flex-1 flex-col pt-2" noValidate>
          <div className="space-y-2.5">
            {signup && step === 1 && <Field id="full-name" label={role === "company" ? "Nom du responsable" : "Nom complet"}><Input id="full-name" autoComplete="name" value={f.full_name} onChange={set("full_name")} className="h-12 rounded-xl" /></Field>}
            {(!signup || step === 1) && <>
              <Field id="phone" label="Téléphone">
                <div className="flex h-12 items-center rounded-xl border border-input bg-background focus-within:ring-1 focus-within:ring-ring">
                  <span className="shrink-0 border-r border-border px-3 text-sm font-semibold text-muted-foreground">+228</span>
                  <Input id="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="90 00 00 00" value={f.phone} onChange={(e) => { setF((p) => ({ ...p, phone: formatPhoneInput(e.target.value) })); setError(null); }} className="h-full min-w-0 rounded-xl border-0 bg-transparent shadow-none focus-visible:ring-0" />
                </div>
              </Field>
              <Field id="password" label="Mot de passe">
                <div className="relative">
                  <Input id="password" type={visible ? "text" : "password"} autoComplete={signup ? "new-password" : "current-password"} value={f.password} onChange={set("password")} className="h-12 rounded-xl pr-12" />
                  <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-12 w-12 rounded-xl text-muted-foreground" aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"} title={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"} onClick={() => setVisible(!visible)}>{visible ? <EyeOff className="!size-5" /> : <Eye className="!size-5" />}</Button>
                </div>
              </Field>
            </>}
            {signup && step === 2 && <>
              <div role="group" aria-label="Type de compte" className="grid grid-cols-2 gap-2">
                {(["household", "company"] as const).map((r) => <Button key={r} type="button" variant="outline" aria-pressed={role === r} disabled={busy} onClick={() => { setRole(r); setError(null); }} className={`h-12 rounded-xl ${role === r ? r === "household" ? "border-primary bg-secondary text-primary" : "border-accent bg-collector text-collector-foreground" : "text-muted-foreground"}`}>{r === "household" ? <House className="!size-5" /> : <Truck className="!size-5" />}{r === "household" ? "Ménage" : "Entreprise"}</Button>)}
              </div>
              {role === "company" ? <Field id="company-name" label="Nom de l’entreprise"><Input id="company-name" autoComplete="organization" value={f.company_name} onChange={set("company_name")} className="h-12 rounded-xl" /></Field> : <>
                <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-2">
                  <div className="space-y-1"><Label htmlFor="quarter" className="text-xs font-semibold">Quartier</Label><QuartierSelect id="quarter" placeholder="Choisir" value={f.quartier} onChange={(v) => { setF((p) => ({ ...p, quartier: v })); setError(null); }} /></div>
                  <Field id="city" label="Ville"><Input id="city" autoComplete="address-level2" value={f.city} onChange={set("city")} className="h-12 rounded-xl" /></Field>
                </div>
                <Field id="address" label="Repère / adresse (privé)"><Input id="address" autoComplete="street-address" value={f.address} onChange={set("address")} placeholder="Près de la pharmacie…" className="h-12 rounded-xl" /></Field>
              </>}
            </>}
          </div>

          <div className="mt-auto pt-2">
            {(error || !online) && <p role="alert" className={`mb-2 flex items-start gap-2 text-xs leading-snug ${error ? "text-destructive" : "text-muted-foreground"}`}>{!online && <WifiOff className="mt-0.5 size-4 shrink-0" />}{error ?? "Connexion Internet requise pour valider votre compte."}</p>}
            <Button type="submit" disabled={busy || (!online && (!signup || step === 2))} className="h-12 w-full rounded-full font-semibold">
              {busy ? <><LoaderCircle className="animate-spin" />Patientez…</> : signup && step === 1 ? <>Continuer<ArrowRight /></> : signup ? "Créer mon compte" : "Se connecter"}
            </Button>
            <Button type="button" variant="link" disabled={busy} onClick={() => changeMode(signup ? "signin" : "signup")} className="mt-1 min-h-12 w-full whitespace-normal text-center text-xs font-semibold">
              {signup ? "Déjà inscrit ? Se connecter" : "Pas encore de compte ? S’inscrire"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return <div className="space-y-1"><Label htmlFor={id} className="text-xs font-semibold">{label}</Label>{children}</div>;
}
