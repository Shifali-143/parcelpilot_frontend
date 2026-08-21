/* ------------------------------------------------------------------ */
/*  Centralized API client — every backend call lives here            */
/* ------------------------------------------------------------------ */

import type {
  ApiResponse,
  ChatResponse,
  ConversationListItem,
  Conversation,
  DashboardData,
  HealthData,
  MockToken,
  User,
} from "../types";

const BASE_URL = "/api/v1";

// ── Internal fetch wrapper ────────────────────────────────────────────
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok || data.success === false) {
    const message =
      data.error?.message || data.error || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data.data ?? data;
}

// ── Auth ──────────────────────────────────────────────────────────────
export async function fetchCurrentUser(token: string): Promise<User> {
  return request<User>("/auth/me/", {}, token);
}

export async function fetchAvailableTokens(): Promise<{ tokens: MockToken[] }> {
  return request<{ tokens: MockToken[] }>("/auth/tokens/");
}

// ── Chat ──────────────────────────────────────────────────────────────
export async function sendMessage(
  token: string,
  message: string,
  conversationId?: string
): Promise<ChatResponse> {
  const body: Record<string, string> = { message };
  if (conversationId) body.conversation_id = conversationId;

  return request<ChatResponse>(
    "/chat/",
    { method: "POST", body: JSON.stringify(body) },
    token
  );
}

export async function confirmAction(
  token: string,
  confirmationId: string,
  confirmed: boolean
): Promise<{ success: boolean; message: string }> {
  return request(
    "/chat/confirm/",
    {
      method: "POST",
      body: JSON.stringify({
        confirmation_id: confirmationId,
        confirmed,
      }),
    },
    token
  );
}

export async function fetchConversations(
  token: string
): Promise<ConversationListItem[]> {
  return request<ConversationListItem[]>("/chat/conversations/", {}, token);
}

export async function fetchConversation(
  token: string,
  id: string
): Promise<Conversation> {
  return request<Conversation>(`/chat/conversations/${id}/`, {}, token);
}

// ── Dashboard ─────────────────────────────────────────────────────────
export async function fetchDashboard(token: string): Promise<DashboardData> {
  return request<DashboardData>("/support/dashboard/", {}, token);
}

// ── Health ────────────────────────────────────────────────────────────
export async function fetchHealth(): Promise<HealthData> {
  return request<HealthData>("/support/health/");
}
