"use client";
import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "../../supabase/client";

const SessionContext = createContext<Session | null>(null);
export const useSession = () => {
  const session = useContext(SessionContext);
  if (session === null) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return session;
};

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  if (loading) {
    return null;
  }

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
