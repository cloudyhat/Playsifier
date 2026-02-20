import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "./api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await apiFetch("/auth/me");

        if (res.ok) {
          const data = await res.json();
          setUser(data.user_id);
        }
      } catch (err) {
        console.log("Not authenticated");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}