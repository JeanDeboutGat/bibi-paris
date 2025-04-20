/**
 * Export all type definitions
 */

export * from './order';
export * from './product';
export * from './ui';
export * from './navigation';

// Next.js related types
export type NextPageProps = {
  params: {
    [key: string]: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}; 