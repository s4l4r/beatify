import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center" role="alert">
      <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
      <p className="text-gray-400 dark:text-gray-400 text-gray-600 text-lg mb-4">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md
            hover:bg-primary-500 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
