import { useEffect, useState } from 'react';
import { Heart, Play } from 'lucide-react';
import { SongRow } from '@/components/SongRow';
import { Spinner } from '@/components/Spinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { usePlayerStore } from '@/store/playerStore';
import { client } from '@/api/client';
import type { PlaylistDetail, Song } from '@/types';

export default function FavoritesPage() {
  const [playlist, setPlaylist] = useState<PlaylistDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setPlaylist: setPlayerPlaylist } = usePlayerStore();

  const fetchFavorites = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await client.get<PlaylistDetail>('/api/playlists/favorites');
      setPlaylist(res.data);
    } catch {
      setError('Failed to load favorites.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handlePlayAll = () => {
    if (playlist && playlist.songs.length > 0) {
      setPlayerPlaylist(playlist.songs, 0);
    }
  };

  if (loading) return <Spinner className="py-24" />;

  if (error || !playlist) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <ErrorMessage message={error || 'Could not load favorites.'} onRetry={fetchFavorites} />
      </div>
    );
  }

  const songs: Song[] = playlist.songs;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-8">
        <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-lg flex-shrink-0 shadow-2xl mx-auto sm:mx-0
          bg-gradient-to-br from-red-500/30 to-pink-600/30 flex items-center justify-center">
          <Heart className="w-20 h-20 text-red-500 fill-red-500" />
        </div>

        <div className="flex flex-col justify-end text-center sm:text-left">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Playlist</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Favorites
          </h1>
          <p className="text-sm text-gray-300">
            {playlist.songCount} songs
          </p>

          {songs.length > 0 && (
            <div className="mt-5 flex justify-center sm:justify-start">
              <button
                onClick={handlePlayAll}
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-full
                  font-semibold hover:bg-primary-500 hover:scale-105 transition-all shadow-lg shadow-primary-600/25"
              >
                <Play className="w-5 h-5 fill-white" />
                Play
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Songs */}
      {songs.length > 0 ? (
        <div className="mt-2">
          {songs.map((song, index) => (
            <SongRow key={song.id} song={song} index={index} songs={songs} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <Heart className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg">No favorites yet.</p>
          <p className="mt-1 text-sm">Tap the heart on any song to add it here.</p>
        </div>
      )}
    </div>
  );
}
