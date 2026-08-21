import { Badge } from "../ui/Badge";
import type { Ticket } from "../../types";

interface TicketTableProps {
  tickets: Ticket[];
  title: string;
}

export function TicketTable({ tickets, title }: TicketTableProps) {
  if (tickets.length === 0) return null;

  return (
    <div className="card overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="px-5 py-3 font-medium">Ticket</th>
              <th className="px-5 py-3 font-medium">Subject</th>
              <th className="px-5 py-3 font-medium">Account</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Assigned</th>
              <th className="px-5 py-3 font-medium hidden lg:table-cell">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tickets.map((t) => (
              <tr
                key={t.ticket_id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-5 py-3 font-mono text-xs font-medium text-brand-600">
                  {t.ticket_id}
                </td>
                <td className="px-5 py-3 max-w-xs truncate text-gray-700 dark:text-gray-300">
                  {t.subject}
                </td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500 dark:text-gray-400">
                  {t.account_id}
                </td>
                <td className="px-5 py-3">
                  <Badge variant={statusVariant(t.status)}>{t.status}</Badge>
                </td>
                <td className="px-5 py-3 text-gray-600 dark:text-gray-400">
                  {t.assigned_to}
                </td>
                <td className="px-5 py-3 text-gray-500 dark:text-gray-400 hidden lg:table-cell">
                  {t.created_at}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function statusVariant(
  status: string
): "success" | "warning" | "danger" | "info" | "default" {
  const s = status.toLowerCase();
  if (s === "open") return "warning";
  if (s === "closed" || s === "resolved") return "success";
  if (["in_progress", "in progress", "pending"].includes(s)) return "info";
  return "default";
}
