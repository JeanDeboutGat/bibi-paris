'use client';

import Link from 'next/link';
import { getUserFriendlyErrorMessage } from '@/lib/apiError';

type ErrorMessageProps = {
  error: unknown;
  fullPage?: boolean;
  onRetry?: () => void;
  homeLink?: boolean;
  className?: string;
};

export default function ErrorMessage({
  error,
  fullPage = false,
  onRetry,
  homeLink = false,
  className = '',
}: ErrorMessageProps) {
  const errorMessage = getUserFriendlyErrorMessage(error);

  // Inline error for form fields or smaller UI components
  if (!fullPage) {
    return (
      <div className={`text-red-600 my-2 ${className}`}>
        <p>{errorMessage}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-sm underline hover:text-red-800 mt-1"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  // Full page error display
  return (
    <div className={`container mx-auto px-4 py-12 text-center ${className}`}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-light mb-4">Oops, Something Went Wrong</h1>
        <p className="text-gray-700 mb-8">{errorMessage}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-white border border-black text-black px-8 py-3 text-sm tracking-wider hover:bg-gray-100 transition-colors"
            >
              TRY AGAIN
            </button>
          )}
          {homeLink && (
            <Link
              href="/"
              className="bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-gray-800 transition-colors"
            >
              RETURN TO HOME
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 