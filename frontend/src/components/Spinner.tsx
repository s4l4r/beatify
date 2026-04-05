interface SpinnerProps {
  className?: string;
}

export function Spinner({ className = '' }: SpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-label="Loading">
      <div className="w-8 h-8 border-2 border-gray-600 border-t-primary-500 rounded-full animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
