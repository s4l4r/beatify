import { client } from './client';
import type { AlbumDetail, AlbumSummary } from '@/types';

export async function getFeatured(
  page: number = 0,
  size: number = 12
): Promise<AlbumSummary[]> {
  const response = await client.get<AlbumSummary[]>('/api/albums/featured', {
    params: { page, size },
  });
  return response.data;
}

export async function getRecent(
  page: number = 0,
  size: number = 12
): Promise<AlbumSummary[]> {
  const response = await client.get<AlbumSummary[]>('/api/albums/recent', {
    params: { page, size },
  });
  return response.data;
}

export async function getById(id: number): Promise<AlbumDetail> {
  const response = await client.get<AlbumDetail>(`/api/albums/${id}`);
  return response.data;
}
