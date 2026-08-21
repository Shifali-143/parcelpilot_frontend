import { useState } from "react";
import {
  Search,
  Database,
  AlertTriangle,
  FileText,
  ChevronDown,
  ChevronRight,
  User,
  ShoppingCart,
  Ticket,
} from "lucide-react";
import type { ToolStep } from "../../types";

const toolMeta: Record<
  string,
  { label: string; icon: React.ElementType; color: string }
> = {
  search_documents: {
    label: "Document Search",
    icon: Search,
    color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
  },
  lookup_account: {
    label: "Account Lookup",
    icon: User,
    color:
      "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400",
  },
  lookup_order: {
    label: "Order Lookup",
    icon: ShoppingCart,
    color:
      "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400",
  },
  lookup_ticket: {
    label: "Ticket Lookup",
    icon: Ticket,
    color:
      "text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400",
  },
  create_escalation: {
    label: "Create Escalation",
    icon: AlertTriangle,
    color: "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400",
  },
};

interface ToolStepDisplayProps {
  steps: ToolStep[];
}

export function ToolStepDisplay({ steps }: ToolStepDisplayProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!steps || steps.length === 0) return null;

  return (
    <div className="mb-2 space-y-1">
      {steps.map((step, idx) => {
        const meta = toolMeta[step.tool_name] || {
          label: step.tool_name,
          icon: Database,
          color: "text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400",
        };
        const Icon = meta.icon;
        const key = `${step.tool_name}-${idx}`;
        const isOpen = expanded === key;

        return (
          <div key={key} className="text-xs">
            <button
              onClick={() => setExpanded(isOpen ? null : key)}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md w-full text-left transition-colors ${meta.color}`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span className="font-medium">{meta.label}</span>
              {isOpen ? (
                <ChevronDown className="h-3 w-3 ml-auto shrink-0" />
              ) : (
                <ChevronRight className="h-3 w-3 ml-auto shrink-0" />
              )}
            </button>

            {isOpen && (
              <div className="mt-1 ml-6 space-y-1">
                {Object.keys(step.tool_input).length > 0 && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                    <p className="font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Input:
                    </p>
                    <pre className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                      {JSON.stringify(step.tool_input, null, 2)}
                    </pre>
                  </div>
                )}
                {step.tool_output && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                    <p className="font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Output:
                    </p>
                    <pre className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words max-h-40 overflow-y-auto">
                      {formatOutput(step.tool_output)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function formatOutput(raw: string): string {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return raw;
  }
}
