import { client } from './client';
import type { PlaylistSummary, PlaylistDetail } from '@/types';

export async function getLibrary(): Promise<PlaylistSummary[]> {
  const response = await client.get<PlaylistSummary[]>('/api/playlists');
  return response.data;
}

export async function getById(id: number): Promise<PlaylistDetail> {
  const response = await client.get<PlaylistDetail>(`/api/playlists/${id}`);
  return response.data;
}

export async function create(title: string, icon: string, isPublic: boolean): Promise<PlaylistDetail> {
  const response = await client.post<PlaylistDetail>('/api/playlists', { title, icon, isPublic });
  return response.data;
}

export async function update(id: number, title: string, icon: string, isPublic: boolean): Promise<PlaylistDetail> {
  const response = await client.put<PlaylistDetail>(`/api/playlists/${id}`, { title, icon, isPublic });
  return response.data;
}

export async function addSong(playlistId: number, songId: number): Promise<PlaylistDetail> {
  const response = await client.put<PlaylistDetail>(`/api/playlists/${playlistId}/songs/${songId}`);
  return response.data;
}

export async function removeSong(playlistId: number, songId: number): Promise<void> {
  await client.delete(`/api/playlists/${playlistId}/songs/${songId}`);
}

export async function deletePlaylist(id: number): Promise<void> {
  await client.delete(`/api/playlists/${id}`);
}

export async function savePlaylist(id: number): Promise<void> {
  await client.post(`/api/playlists/${id}/save`);
}

export async function unsavePlaylist(id: number): Promise<void> {
  await client.delete(`/api/playlists/${id}/save`);
}
