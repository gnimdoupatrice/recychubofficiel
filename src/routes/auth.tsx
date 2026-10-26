import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ArrowLeft, Eye, EyeOff, House, Building2, WifiOff, LoaderCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { phoneToEmail, normalizePhone, type Role } from "@/lib/auth";
import { accountError, detailsError, formatPhoneInput, type AuthForm } from "@/lib/auth-form";
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
    { name: "description", content: "Connectez-vous avec votre téléphone ou créez votre compte ménage ou entreprise sur RecycHub Togo." },
    { property: "og:title", content: "Votre espace — RecycHub Togo" },
    { property: "og:description", content: "Connexion et inscription pour les ménages et entreprises de recyclage à Kara." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AuthPage,
});

const inputCls = "h-12 rounded-xl bg-card text-base";

function AuthPage() {
  const s = Route.useSearch();
  const navigate = useNavigate();
  const online = useOnline();
  const [mode, setMode] = useState<"signin" | "signup">(s.mode ?? "signin");
  const [role, setRole] = useState<Role>(s.role ?? "household");
  const [busy, setBusy] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [f, setF] = useState<AuthForm>({ phone: "", password: "", full_name: "", company_name: "", quartier: "", address: "", city: "Kara" });
  const signup = mode === "signup";
  const company = role === "company";
  const set = (k: keyof AuthForm) => (e: React.ChangeEvent<HTMLInputElement>) => { setF((p) => ({ ...p, [k]: e.target.value })); setError(null); };

  useEffect(() => { setMode(s.mode ?? "signin"); setRole(s.role ?? "household"); setError(null); }, [s.mode, s.role]);

  function changeMode(next: "signin" | "signup") { setMode(next); setVisible(false); setError(null); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const validation = accountError(f, signup) ?? (signup ? detailsError(f, role) : null);
    if (validation) { setError(validation); return; }
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

  const tabs = signup
    ? ([["household", "Ménage", House], ["company", "Entreprise", Building2]] as const)
    : null;

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)] sm:px-6">
      <div className="mx-auto flex min-h-0 w-full max-w-sm flex-1 flex-col">
        <header className="grid h-12 shrink-0 grid-cols-[1fr_auto_1fr] items-center">
          <Button asChild variant="ghost" size="icon" className="h-12 w-12 rounded-full"><Link to="/" aria-label="Retour à l’accueil"><ArrowLeft className="!size-5" /></Link></Button>
          <Link to="/" aria-label="RecycHub Togo — accueil" className="flex h-12 w-12 items-center justify-center"><img src="/recychub-logo.png" alt="RecycHub Togo" width={40} height={40} className="h-10 w-10" /></Link>
          <div className="flex justify-end">
            {signup && <Button type="button" variant="ghost" disabled={busy} onClick={() => changeMode("signin")} className="h-10 rounded-full px-3 text-sm font-semibold text-primary hover:bg-secondary hover:text-primary">Connexion</Button>}
          </div>
        </header>

        {tabs ? (
          <div role="tablist" aria-label="Type de compte" className="mt-1 grid shrink-0 grid-cols-2 gap-1 rounded-2xl bg-muted p-1">
            {tabs.map(([r, label, Icon]) => {
              const active = role === r;
              return <button key={r} type="button" role="tab" aria-selected={active} disabled={busy} onClick={() => { setRole(r); setError(null); }}
                className={`flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-bold transition-colors ${active ? r === "household" ? "bg-primary text-primary-foreground shadow-sm" : "bg-collector text-collector-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                <Icon className="size-5" />{label}
              </button>;
            })}
          </div>
        ) : (
          <div role="tablist" aria-label="Accès à votre espace" className="mt-1 grid shrink-0 grid-cols-2 gap-1 rounded-2xl bg-muted p-1">
            {(["signin", "signup"] as const).map((m) => (
              <button key={m} type="button" role="tab" aria-selected={mode === m} disabled={busy} onClick={() => changeMode(m)}
                className={`h-11 rounded-xl text-sm font-bold transition-colors ${mode === m ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                {m === "signin" ? "Connexion" : "Inscription"}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={submit} noValidate className={`flex min-h-0 flex-1 flex-col ${signup && !company ? "pt-3" : "justify-center py-3"}`}>
          {!signup && (
            <div className="mb-5 text-center">
              <h1 className="font-display text-2xl font-bold">Bon retour !</h1>
              <p className="mt-1 text-sm text-muted-foreground">Connectez-vous avec votre numéro de téléphone.</p>
            </div>
          )}
          {signup && <h1 className="sr-only">Créer un compte {company ? "entreprise" : "ménage"}</h1>}

          <div className={signup ? "space-y-2" : "space-y-3"}>
            {signup && <Field id="full-name" label={company ? "Nom du responsable" : "Nom complet"}><Input id="full-name" autoComplete="name" value={f.full_name} onChange={set("full_name")} className={inputCls} /></Field>}
            {signup && company && <Field id="company-name" label="Nom de l’entreprise"><Input id="company-name" autoComplete="organization" value={f.company_name} onChange={set("company_name")} className={inputCls} /></Field>}
            <Field id="phone" label="Téléphone">
              <div className="flex h-12 items-center rounded-xl border border-input bg-card focus-within:ring-1 focus-within:ring-ring">
                <span className="shrink-0 border-r border-border px-3 text-sm font-semibold text-muted-foreground">+228</span>
                <Input id="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="90 00 00 00" value={f.phone} onChange={(e) => { setF((p) => ({ ...p, phone: formatPhoneInput(e.target.value) })); setError(null); }} className="h-full min-w-0 rounded-xl border-0 bg-transparent text-base shadow-none focus-visible:ring-0" />
              </div>
            </Field>
            <Field id="password" label="Mot de passe">
              <div className="relative">
                <Input id="password" type={visible ? "text" : "password"} autoComplete={signup ? "new-password" : "current-password"} value={f.password} onChange={set("password")} className={`${inputCls} pr-12`} />
                <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-12 w-12 rounded-xl text-muted-foreground" aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"} onClick={() => setVisible(!visible)}>{visible ? <EyeOff className="!size-5" /> : <Eye className="!size-5" />}</Button>
              </div>
            </Field>
            {signup && !company && <>
              <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-2">
                <div className="space-y-1"><Label htmlFor="quarter" className="text-xs font-semibold">Quartier</Label><QuartierSelect id="quarter" placeholder="Choisir" value={f.quartier} onChange={(v) => { setF((p) => ({ ...p, quartier: v })); setError(null); }} /></div>
                <Field id="city" label="Ville"><Input id="city" autoComplete="address-level2" value={f.city} onChange={set("city")} className={inputCls} /></Field>
              </div>
              <Field id="address" label="Repère / adresse (privé)"><Input id="address" autoComplete="street-address" value={f.address} onChange={set("address")} placeholder="Près de la pharmacie…" className={inputCls} /></Field>
            </>}
          </div>

          <div className={signup && !company ? "mt-auto pt-3" : "mt-5"}>
            {(error || !online) && <p role="alert" className={`mb-2 flex items-start gap-2 text-xs leading-snug ${error ? "text-destructive" : "text-muted-foreground"}`}>{!online && <WifiOff className="mt-0.5 size-4 shrink-0" />}{error ?? "Connexion Internet requise pour valider votre compte."}</p>}
            <Button type="submit" disabled={busy || !online} className={`h-12 w-full rounded-full text-base font-semibold ${signup && company ? "bg-collector text-collector-foreground hover:bg-collector/90" : ""}`}>
              {busy ? <><LoaderCircle className="animate-spin" />Patientez…</> : signup ? `Créer mon compte ${company ? "Entreprise" : "Ménage"}` : "Se connecter"}
            </Button>
            <Button type="button" variant="link" disabled={busy} onClick={() => changeMode(signup ? "signin" : "signup")} className="mt-1 h-10 w-full text-sm font-semibold">
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
