import { client } from './client';
import type { SearchResults } from '@/types';

export async function search(query: string): Promise<SearchResults> {
  const response = await client.get<SearchResults>('/api/search', {
    params: { q: query },
  });
  return response.data;
}
