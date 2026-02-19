import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface Profile {
  id: string;
  pseudo: string;
  prenom: string;
  nom: string;
  tel: string;
  commune: string;
  quartier: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (data: {
    tel: string;
    password: string;
    pseudo: string;
    prenom: string;
    nom: string;
    commune: string;
    quartier: string;
  }) => Promise<{ error: string | null }>;
  signIn: (tel: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Convert phone to a synthetic email for auth
const phoneToEmail = (tel: string) => {
  const clean = tel.replace(/[\s+\-()]/g, "");
  return `${clean}@recychub.local`;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    setProfile(data as Profile | null);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => fetchProfile(session.user.id), 0);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (data: {
    tel: string;
    password: string;
    pseudo: string;
    prenom: string;
    nom: string;
    commune: string;
    quartier: string;
  }) => {
    const email = phoneToEmail(data.tel);
    const { error } = await supabase.auth.signUp({
      email,
      password: data.password,
      options: {
        data: {
          pseudo: data.pseudo,
          prenom: data.prenom,
          nom: data.nom,
          tel: data.tel,
          commune: data.commune,
          quartier: data.quartier,
        },
      },
    });
    return { error: error?.message ?? null };
  };

  const signIn = async (tel: string, password: string) => {
    const email = phoneToEmail(tel);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
