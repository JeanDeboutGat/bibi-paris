import { mockHomepageData } from '@/lib/dataProviders/mockData';

export async function getMockHomepageData() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return mockHomepageData;
}