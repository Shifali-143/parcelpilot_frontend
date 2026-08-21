import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Message } from "../../types";
import { ToolStepDisplay } from "./ToolStepDisplay";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser
            ? "bg-brand-600 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Content */}
      <div className={`max-w-[75%] min-w-0 ${isUser ? "text-right" : ""}`}>
        {/* Tool steps (assistant only) */}
        {!isUser && message.tool_steps?.length > 0 && (
          <ToolStepDisplay steps={message.tool_steps} />
        )}

        {/* Message body */}
        <div
          className={`inline-block rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? "bg-brand-600 text-white rounded-br-md"
              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <p
          className={`text-xs text-gray-400 dark:text-gray-500 mt-1 ${
            isUser ? "text-right" : ""
          }`}
        >
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
