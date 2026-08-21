import {
  Moon,
  Sun,
  ChevronDown,
  Package,
  LayoutDashboard,
  MessageSquare,
  Settings,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Badge } from "../ui/Badge";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { user, theme, toggleTheme } = useApp();

  const navItems = [
    { id: "chat", label: "Chat", icon: MessageSquare },
    ...(user?.is_internal
      ? [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard }]
      : []),
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const roleBadge = () => {
    if (!user) return null;
    const map: Record<string, { label: string; variant: "info" | "success" | "warning" }> = {
      customer: { label: "Customer", variant: "info" },
      support_agent: { label: "Agent", variant: "success" },
      operations: { label: "Ops", variant: "warning" },
      admin: { label: "Admin", variant: "warning" },
    };
    const info = map[user.role] || { label: user.role, variant: "info" as const };
    return <Badge variant={info.variant}>{info.label}</Badge>;
  };

  return (
    <header className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center justify-between px-4 lg:px-6 shrink-0">
      {/* Left: Logo + Nav */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 font-bold text-lg text-brand-600">
          <Package className="h-5 w-5" />
          <span className="hidden sm:inline">ParcelPilot</span>
        </div>

        <nav className="flex items-center gap-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === id
                  ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Right: User + Theme */}
      <div className="flex items-center gap-3">
        {user && (
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {user.account_name || user.username}
            </span>
            {roleBadge()}
          </div>
        )}

        <button
          onClick={toggleTheme}
          className="btn-ghost p-2"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </button>
      </div>
    </header>
  );
}
