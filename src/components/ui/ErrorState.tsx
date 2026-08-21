import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <AlertTriangle className="h-10 w-10 text-red-400 mb-3" />
      <p className="text-sm text-red-600 dark:text-red-400 max-w-md">
        {message}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary mt-4 text-sm">
          Try Again
        </button>
      )}
    </div>
  );
}
