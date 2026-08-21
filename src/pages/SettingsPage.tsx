import { Check, Moon, Sun, UserCircle } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Badge } from "../components/ui/Badge";

const TOKEN_LABELS: Record<string, { name: string; desc: string }> = {
  "customer-northstar": {
    name: "Northstar Logistics",
    desc: "Customer — ACC-2001",
  },
  "customer-lumenworks": {
    name: "LumenWorks",
    desc: "Customer — ACC-2002",
  },
  "internal-agent": {
    name: "Support Agent",
    desc: "Internal — full access",
  },
  "internal-ops": {
    name: "Operations",
    desc: "Internal — full access",
  },
  "internal-admin": {
    name: "Admin",
    desc: "Internal — full access",
  },
};

export function SettingsPage() {
  const { theme, toggleTheme, token, setToken, tokens, user } = useApp();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-8 overflow-y-auto h-full">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Configure your ParcelPilot experience
        </p>
      </div>

      {/* ── Theme ──────────────────────────────────────────────────── */}
      <section className="card p-5">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Appearance
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => theme !== "light" && toggleTheme()}
            className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              theme === "light"
                ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <Sun className="h-5 w-5 text-amber-500" />
            <div className="text-left">
              <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                Light
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Default theme
              </p>
            </div>
            {theme === "light" && (
              <Check className="h-4 w-4 text-brand-600 ml-auto" />
            )}
          </button>

          <button
            onClick={() => theme !== "dark" && toggleTheme()}
            className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              theme === "dark"
                ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <Moon className="h-5 w-5 text-indigo-500" />
            <div className="text-left">
              <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                Dark
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Easier on the eyes
              </p>
            </div>
            {theme === "dark" && (
              <Check className="h-4 w-4 text-brand-600 ml-auto" />
            )}
          </button>
        </div>
      </section>

      {/* ── User Switching ─────────────────────────────────────────── */}
      <section className="card p-5">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
          Active User
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Switch between customer and internal roles for testing
        </p>

        <div className="space-y-2">
          {tokens.map((t) => {
            const info = TOKEN_LABELS[t.token] || {
              name: t.username,
              desc: t.token,
            };
            const isActive = token === t.token;
            const isInternal = t.token.startsWith("internal");

            return (
              <button
                key={t.token}
                onClick={() => setToken(t.token)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                  isActive
                    ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <UserCircle className="h-8 w-8 text-gray-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                      {info.name}
                    </span>
                    <Badge variant={isInternal ? "success" : "info"}>
                      {isInternal ? "Internal" : "Customer"}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {info.desc}
                  </p>
                </div>
                {isActive && (
                  <Check className="h-4 w-4 text-brand-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Current User Info ──────────────────────────────────────── */}
      {user && (
        <section className="card p-5">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Current Session
          </h2>
          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-gray-500 dark:text-gray-400">Username</dt>
            <dd className="text-gray-900 dark:text-gray-100 font-mono text-xs">
              {user.username}
            </dd>
            <dt className="text-gray-500 dark:text-gray-400">Role</dt>
            <dd className="text-gray-900 dark:text-gray-100">{user.role}</dd>
            {user.account_id && (
              <>
                <dt className="text-gray-500 dark:text-gray-400">Account</dt>
                <dd className="text-gray-900 dark:text-gray-100 font-mono text-xs">
                  {user.account_id}
                </dd>
              </>
            )}
            {user.account_name && (
              <>
                <dt className="text-gray-500 dark:text-gray-400">Company</dt>
                <dd className="text-gray-900 dark:text-gray-100">
                  {user.account_name}
                </dd>
              </>
            )}
          </dl>
        </section>
      )}
    </div>
  );
}
