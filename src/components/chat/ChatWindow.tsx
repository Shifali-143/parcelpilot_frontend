import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import type { Message } from "../../types";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { ConfirmAction } from "./ConfirmAction";
import { Spinner } from "../ui/Spinner";
import { EmptyState } from "../ui/EmptyState";
import { ErrorState } from "../ui/ErrorState";

interface ChatWindowProps {
  messages: Message[];
  sending: boolean;
  error: string | null;
  pendingConfirmation: string | null;
  onSend: (text: string) => void;
  onConfirm: (confirmed: boolean) => void;
}

export function ChatWindow({
  messages,
  sending,
  error,
  pendingConfirmation,
  onSend,
  onConfirm,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <EmptyState
            icon={<MessageSquare className="h-12 w-12" />}
            title="Start a conversation"
            description="Ask about orders, policies, cancellations, service credits, or any ParcelPilot support topic."
          />
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* Typing indicator */}
            {sending && (
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Spinner size="sm" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="px-4">
          <ErrorState message={error} />
        </div>
      )}

      {/* Confirmation banner */}
      {pendingConfirmation && (
        <ConfirmAction
          onConfirm={() => onConfirm(true)}
          onReject={() => onConfirm(false)}
        />
      )}

      {/* Input */}
      <ChatInput
        onSend={onSend}
        disabled={sending}
        placeholder={
          pendingConfirmation
            ? "Confirm or cancel the action above first..."
            : "Type your message..."
        }
      />
    </div>
  );
}
