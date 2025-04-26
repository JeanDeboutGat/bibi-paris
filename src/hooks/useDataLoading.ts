'use client';

import { useState } from 'react';
import { useCallback } from 'react';

type UseDataLoadingResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: unknown | null;
  loadData: (fetchFn: () => Promise<T>) => Promise<T | null>;
};

export function useDataLoading<T>(
  initialData: T | null = null
): UseDataLoadingResult<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);

  const loadData = useCallback(
    async (fetchFn: () => Promise<T>): Promise<T | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchFn();
        setData(result);
        return result;
      } catch (err) {
        // Store the original error to preserve API error types and details
        setError(err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { data, isLoading, error, loadData };
}
