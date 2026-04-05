import { client } from './client';
import type { ArtistDetail } from '@/types';

export async function getById(id: number): Promise<ArtistDetail> {
  const response = await client.get<ArtistDetail>(`/api/artists/${id}`);
  return response.data;
}
