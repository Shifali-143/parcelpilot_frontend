import { useCallback, useEffect, useState } from "react";
import { fetchAvailableTokens, fetchCurrentUser } from "../api/api";
import type { MockToken, User } from "../types";

export function useAuth() {
  const [token, setTokenState] = useState<string>(
    () => localStorage.getItem("auth_token") || "customer-northstar"
  );
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<MockToken[]>([]);
  const [loading, setLoading] = useState(true);

  const setToken = useCallback((newToken: string) => {
    localStorage.setItem("auth_token", newToken);
    setTokenState(newToken);
  }, []);

  // Load available tokens once
  useEffect(() => {
    fetchAvailableTokens()
      .then((data) => setTokens(data.tokens))
      .catch(() => {});
  }, []);

  // Load user whenever token changes
  useEffect(() => {
    setLoading(true);
    fetchCurrentUser(token)
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [token]);

  return { token, setToken, user, tokens, loading };
}
