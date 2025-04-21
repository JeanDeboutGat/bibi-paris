'use client';

import { useEffect } from 'react';
import { useDataLoading } from '@/hooks/useDataLoading';
import LoadingSpinner from './LoadingSpinner';

type ExampleData = {
  id: number;
  title: string;
};

export default function DataLoadingExample() {
  const { data, isLoading, error, loadData } = useDataLoading<ExampleData[]>();

  // Simulated data fetching
  const fetchData = async (): Promise<ExampleData[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Return mock data
    return [
      { id: 1, title: 'Handcrafted Wooden Table' },
      { id: 2, title: 'Antique Chair' },
      { id: 3, title: 'Decorative Vase' },
    ];
  };

  useEffect(() => {
    loadData(fetchData);
  }, [loadData]);

  if (isLoading) {
    return (
      <div className="my-8 flex flex-col items-center">
        <LoadingSpinner fullScreen={false} style="default" size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-8 text-center text-red-500">
        Error loading data: {error.message}
      </div>
    );
  }

  if (!data) {
    return <div className="my-8 text-center">No data available</div>;
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-serif mb-4">Featured Products</h2>
      <ul className="space-y-2">
        {data.map((item) => (
          <li key={item.id} className="p-4 bg-white shadow-sm">
            {item.title}
          </li>
        ))}
      </ul>
      <button
        onClick={() => loadData(fetchData)}
        className="mt-4 bg-luxury-charcoal text-white px-4 py-2 text-sm"
      >
        Reload Data
      </button>
    </div>
  );
}
