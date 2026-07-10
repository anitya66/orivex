import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCurrentUser } from "@/features/auth/services/authService";
import { STORAGE_KEYS } from "@/constants/storageKeys";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  function logout() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    setUser(null);
  }

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem(
        STORAGE_KEYS.ACCESS_TOKEN
      );

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();

        setUser(response.data);
      } catch (error) {
        console.error(error);

        localStorage.removeItem(
          STORAGE_KEYS.ACCESS_TOKEN
        );
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}