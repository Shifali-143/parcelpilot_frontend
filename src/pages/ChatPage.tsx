import { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { useChat } from "../hooks/useChat";
import { Sidebar } from "../components/layout/Sidebar";
import { ChatWindow } from "../components/chat/ChatWindow";

export function ChatPage() {
  const { token, user } = useApp();
  const chat = useChat(token);

  // Reload conversations when token changes
  useEffect(() => {
    chat.startNew();
    chat.loadConversations();
  }, [token]);

  return (
    <div className="flex h-full">
      <Sidebar
        conversations={chat.conversations}
        activeId={chat.conversationId}
        onSelect={chat.loadConversation}
        onNew={chat.startNew}
        onLoad={chat.loadConversations}
      />
      <main className="flex-1 min-w-0">
        <ChatWindow
          messages={chat.messages}
          sending={chat.sending}
          error={chat.error}
          pendingConfirmation={chat.pendingConfirmation}
          onSend={chat.send}
          onConfirm={chat.handleConfirm}
        />
      </main>
    </div>
  );
}
