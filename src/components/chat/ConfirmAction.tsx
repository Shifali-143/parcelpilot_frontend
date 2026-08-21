import { AlertTriangle, Check, X } from "lucide-react";

interface ConfirmActionProps {
  onConfirm: () => void;
  onReject: () => void;
}

export function ConfirmAction({ onConfirm, onReject }: ConfirmActionProps) {
  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            Action requires confirmation
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
            Review the details above before confirming.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={onReject}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Check className="h-3.5 w-3.5" />
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
