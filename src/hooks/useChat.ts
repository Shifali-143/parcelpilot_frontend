import { useCallback, useState } from "react";
import {
  confirmAction,
  fetchConversation,
  fetchConversations,
  sendMessage,
} from "../api/api";
import type { ConversationListItem, Message } from "../types";

export function useChat(token: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<ConversationListItem[]>(
    []
  );
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingConfirmation, setPendingConfirmation] = useState<string | null>(
    null
  );

  // ── Load conversation list ────────────────────────────────────────
  const loadConversations = useCallback(async () => {
    try {
      const data = await fetchConversations(token);
      setConversations(data);
    } catch {
      /* sidebar is non-critical */
    }
  }, [token]);

  // ── Load a specific conversation ──────────────────────────────────
  const loadConversation = useCallback(
    async (id: string) => {
      try {
        const data = await fetchConversation(token, id);
        setMessages(data.messages);
        setConversationId(id);
        setPendingConfirmation(null);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load chat");
      }
    },
    [token]
  );

  // ── Send a message ────────────────────────────────────────────────
  const send = useCallback(
    async (text: string) => {
      if (!text.trim() || sending) return;

      const userMsg: Message = {
        id: `temp-${Date.now()}`,
        role: "user",
        content: text,
        tool_steps: [],
        requires_confirmation: false,
        confirmation_id: "",
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setSending(true);
      setError(null);

      try {
        const res = await sendMessage(token, text, conversationId ?? undefined);
        setConversationId(res.conversation_id);
        setMessages((prev) => [...prev, res.message]);

        if (res.requires_confirmation && res.confirmation_id) {
          setPendingConfirmation(res.confirmation_id);
        }

        loadConversations();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to send message");
      } finally {
        setSending(false);
      }
    },
    [token, conversationId, sending, loadConversations]
  );

  // ── Confirm / reject an action ────────────────────────────────────
  const handleConfirm = useCallback(
    async (confirmed: boolean) => {
      if (!pendingConfirmation) return;

      try {
        await confirmAction(token, pendingConfirmation, confirmed);

        const statusMsg: Message = {
          id: `confirm-${Date.now()}`,
          role: "assistant",
          content: confirmed
            ? "✅ Action confirmed and executed."
            : "❌ Action cancelled.",
          tool_steps: [],
          requires_confirmation: false,
          confirmation_id: "",
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, statusMsg]);
        setPendingConfirmation(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to process confirmation"
        );
      }
    },
    [token, pendingConfirmation]
  );

  // ── Start new conversation ────────────────────────────────────────
  const startNew = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setPendingConfirmation(null);
    setError(null);
  }, []);

  return {
    messages,
    conversations,
    conversationId,
    sending,
    error,
    pendingConfirmation,
    send,
    handleConfirm,
    loadConversations,
    loadConversation,
    startNew,
  };
}
