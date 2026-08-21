import { createContext, useContext, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import type { MockToken, Theme, User } from "../types";

interface AppContextValue {
  /* Auth */
  token: string;
  setToken: (t: string) => void;
  user: User | null;
  tokens: MockToken[];
  authLoading: boolean;
  /* Theme */
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <AppContext.Provider
      value={{
        token: auth.token,
        setToken: auth.setToken,
        user: auth.user,
        tokens: auth.tokens,
        authLoading: auth.loading,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within <AppProvider>");
  return ctx;
}
