'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-light mb-6">Something Went Wrong</h1>
        <p className="text-gray-700 mb-8">
          We apologize for the inconvenience. Please try again later.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={reset}
            className="bg-white border border-black text-black px-8 py-3 text-sm tracking-wider hover:bg-gray-100 transition-colors"
          >
            TRY AGAIN
          </button>
          <Link
            href="/"
            className="bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-gray-800 transition-colors"
          >
            RETURN TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
