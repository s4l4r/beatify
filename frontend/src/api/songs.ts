import { client } from './client';
import type { Song } from '@/types';

export async function getById(id: number): Promise<Song> {
  const response = await client.get<Song>(`/api/songs/${id}`);
  return response.data;
}
