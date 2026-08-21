import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}

export function StatCard({ label, value, icon, color = "text-brand-600" }: StatCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-gray-100">
            {value}
          </p>
        </div>
        <div className={`${color} opacity-80`}>{icon}</div>
      </div>
    </div>
  );
}
