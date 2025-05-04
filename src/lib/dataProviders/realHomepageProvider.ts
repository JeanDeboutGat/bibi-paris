import { HomepageData } from './types';
import { fetchWithErrorHandling } from '@/lib/apiError';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function getRealHomepageData(): Promise<HomepageData> {
  return fetchWithErrorHandling<HomepageData>(`${API_BASE}/api/homepage`);
}