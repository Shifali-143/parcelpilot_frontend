import { useEffect } from "react";
import { MessageSquarePlus, MessageSquare } from "lucide-react";
import type { ConversationListItem } from "../../types";

interface SidebarProps {
  conversations: ConversationListItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onLoad: () => void;
}

export function Sidebar({
  conversations,
  activeId,
  onSelect,
  onNew,
  onLoad,
}: SidebarProps) {
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex flex-col shrink-0 hidden lg:flex">
      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={onNew}
          className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
        >
          <MessageSquarePlus className="h-4 w-4" />
          New Chat
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {conversations.length === 0 ? (
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-8 px-4">
            No conversations yet. Start a new chat!
          </p>
        ) : (
          <div className="space-y-0.5">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors truncate ${
                  activeId === conv.id
                    ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5 shrink-0 opacity-50" />
                  <span className="truncate">
                    {conv.title || "Untitled chat"}
                  </span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 ml-5.5">
                  {new Date(conv.updated_at).toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
