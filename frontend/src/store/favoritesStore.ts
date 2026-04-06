import { create } from 'zustand';
import { client } from '@/api/client';

interface FavoritesState {
  ids: Set<number>;
  loaded: boolean;
  load: () => Promise<void>;
  toggle: (songId: number) => Promise<void>;
  isFavorite: (songId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  ids: new Set(),
  loaded: false,

  load: async () => {
    try {
      const res = await client.get<number[]>('/api/playlists/favorites/ids');
      set({ ids: new Set(res.data), loaded: true });
    } catch {
      set({ loaded: true });
    }
  },

  toggle: async (songId: number) => {
    const { ids } = get();
    const wasFavorite = ids.has(songId);

    // optimistic update
    const next = new Set(ids);
    if (wasFavorite) {
      next.delete(songId);
    } else {
      next.add(songId);
    }
    set({ ids: next });

    try {
      if (wasFavorite) {
        await client.delete(`/api/playlists/favorites/${songId}`);
      } else {
        await client.put(`/api/playlists/favorites/${songId}`);
      }
    } catch {
      // revert on failure
      set({ ids });
    }
  },

  isFavorite: (songId: number) => get().ids.has(songId),
}));
