import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Globe, Lock, Music2, Heart } from 'lucide-react';
import { Spinner } from '@/components/Spinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { CreatePlaylistModal } from '@/components/CreatePlaylistModal';
import { useFavoritesStore } from '@/store/favoritesStore';
import * as playlistsApi from '@/api/playlists';
import type { PlaylistSummary } from '@/types';

export default function LibraryPage() {
  const [playlists, setPlaylists] = useState<PlaylistSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const favCount = useFavoritesStore((s) => s.ids.size);

  const fetchLibrary = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await playlistsApi.getLibrary();
      setPlaylists(data);
    } catch {
      setError('Failed to load your library.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibrary();
  }, []);

  const owned = playlists.filter((p) => p.isOwner);
  const saved = playlists.filter((p) => !p.isOwner);

  if (loading) return <Spinner className="py-24" />;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <ErrorMessage message={error} onRetry={fetchLibrary} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Your Library</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-full
            text-sm font-semibold hover:bg-primary-500 hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Playlist</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {/* Favorites card -- always at top */}
      <Link
        to="/favorites"
        className="flex items-center gap-4 p-4 rounded-lg mb-6
          bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20
          hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-200 group"
      >
        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-red-500/30 to-pink-600/30
          flex items-center justify-center flex-shrink-0">
          <Heart className="w-6 h-6 text-red-500 fill-red-500" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
            Favorites
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {favCount} songs
          </p>
        </div>
      </Link>

      {/* Owned playlists */}
      <section className="mb-10">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Your Playlists</h2>
        {owned.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Music2 className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>You haven't created any playlists yet.</p>
            <button
              onClick={() => setShowCreate(true)}
              className="mt-3 text-sm text-primary-400 hover:text-primary-300 font-medium"
            >
              Create your first playlist
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {owned.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        )}
      </section>

      {/* Saved playlists */}
      {saved.length > 0 && (
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Saved Playlists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {saved.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>
      )}

      {showCreate && (
        <CreatePlaylistModal
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false);
            fetchLibrary();
          }}
        />
      )}
    </div>
  );
}

function PlaylistCard({ playlist }: { playlist: PlaylistSummary }) {
  return (
    <Link
      to={`/playlists/${playlist.id}`}
      className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/40
        hover:bg-gray-700/60 transition-all duration-200 group"
    >
      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary-900/60 to-gray-800
        flex items-center justify-center text-2xl flex-shrink-0">
        {playlist.icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white truncate group-hover:text-primary-400 transition-colors">
          {playlist.title}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
          {playlist.isPublic ? (
            <Globe className="w-3 h-3" />
          ) : (
            <Lock className="w-3 h-3" />
          )}
          <span>{playlist.songCount} songs</span>
          {!playlist.isOwner && (
            <>
              <span className="text-gray-600">&middot;</span>
              <span>{playlist.ownerName}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
