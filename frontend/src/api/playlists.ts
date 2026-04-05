import { client } from './client';
import type { Playlist } from '@/types';

export async function getAll(): Promise<Playlist[]> {
  const response = await client.get<Playlist[]>('/api/playlists');
  return response.data;
}

export async function getById(id: number): Promise<Playlist> {
  const response = await client.get<Playlist>(`/api/playlists/${id}`);
  return response.data;
}

export async function create(title: string): Promise<Playlist> {
  const response = await client.post<Playlist>('/api/playlists', { title });
  return response.data;
}

export async function addSong(
  playlistId: number,
  songId: number
): Promise<Playlist> {
  const response = await client.post<Playlist>(
    `/api/playlists/${playlistId}/songs/${songId}`
  );
  return response.data;
}

export async function removeSong(
  playlistId: number,
  songId: number
): Promise<Playlist> {
  const response = await client.delete<Playlist>(
    `/api/playlists/${playlistId}/songs/${songId}`
  );
  return response.data;
}

export async function deletePlaylist(id: number): Promise<void> {
  await client.delete(`/api/playlists/${id}`);
}
