import { createContext, useContext, useEffect, useMemo, useState } from "react";
import supabase from "../supabase";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = supabase.auth.user();
    setUser(user);
    setInitialLoading(false);
  }, [supabase]);

  useEffect(() => {
    const { data, error } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event, session);

        if (session) {
          // you are logged in...
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    if (error) setError(error);

    return () => {
      data.unsubscribe();
    };
  }, [supabase]);

  const signUp = async (email, password) => {
    setLoading(true);

    return await supabase.auth
      .signUp({
        email,
        password,
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const signOut = async () => {
    setLoading(true);

    return await supabase.auth
      .signOut()
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const signIn = async (email, password) => {
    setLoading(true);

    return await supabase.auth
      .signIn({
        email,
        password,
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      signOut,
      error,
      loading,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}
