import {
  AlertTriangle,
  BarChart3,
  RefreshCw,
  Ticket,
  Users,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { useDashboard } from "../hooks/useDashboard";
import { StatCard } from "../components/dashboard/StatCard";
import { TicketTable } from "../components/dashboard/TicketTable";
import { Badge } from "../components/ui/Badge";
import { Spinner } from "../components/ui/Spinner";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";

export function DashboardPage() {
  const { token, user } = useApp();
  const { data, loading, error, reload } = useDashboard(
    token,
    !!user?.is_internal
  );

  if (!user?.is_internal) {
    return (
      <EmptyState
        icon={<AlertTriangle className="h-12 w-12" />}
        title="Access Restricted"
        description="The dashboard is only available to internal ParcelPilot staff."
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={reload} />;
  }

  if (!data) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Issue Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Proactive issue detection across support activity
          </p>
        </div>
        <button
          onClick={reload}
          className="btn-secondary flex items-center gap-2 text-sm"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Tickets"
          value={data.summary.total_tickets}
          icon={<Ticket className="h-6 w-6" />}
        />
        <StatCard
          label="Open Tickets"
          value={data.summary.open_tickets}
          icon={<BarChart3 className="h-6 w-6" />}
          color="text-amber-600"
        />
        <StatCard
          label="High Severity"
          value={data.summary.high_severity_count}
          icon={<AlertTriangle className="h-6 w-6" />}
          color="text-red-600"
        />
      </div>

      {/* SLA At Risk */}
      <TicketTable tickets={data.sla_at_risk} title="SLA At Risk — Open Tickets" />

      {/* Recurring Issues */}
      {data.recurring_issues.length > 0 && (
        <div className="card">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Recurring Issues
            </h3>
          </div>
          <div className="p-5 space-y-2">
            {data.recurring_issues.map((issue) => (
              <div
                key={issue.issue}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate mr-3">
                  {issue.issue}
                </span>
                <Badge variant="default">{issue.count} ticket{issue.count !== 1 ? "s" : ""}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Multi-Customer Issues */}
      {data.multi_customer_issues.length > 0 && (
        <div className="card">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Multi-Customer Issues
            </h3>
          </div>
          <div className="p-5 space-y-2">
            {data.multi_customer_issues.map((issue) => (
              <div
                key={issue.issue}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate mr-3">
                  {issue.issue}
                </span>
                <div className="flex items-center gap-1 shrink-0">
                  <Users className="h-3.5 w-3.5 text-gray-400" />
                  <Badge variant="danger">
                    {issue.affected_accounts} accounts
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
