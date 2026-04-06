import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Globe, Lock, Trash2, Bookmark, BookmarkCheck } from 'lucide-react';
import { SongRow } from '@/components/SongRow';
import { Spinner } from '@/components/Spinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { usePlayerStore } from '@/store/playerStore';
import * as playlistsApi from '@/api/playlists';
import type { PlaylistDetail, Song } from '@/types';

export default function PlaylistDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<PlaylistDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setPlaylist: setPlayerPlaylist } = usePlayerStore();

  const fetchPlaylist = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await playlistsApi.getById(parseInt(id));
      setPlaylist(data);
    } catch {
      setError('Failed to load playlist.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  const handlePlayAll = () => {
    if (playlist && playlist.songs.length > 0) {
      setPlayerPlaylist(playlist.songs, 0);
    }
  };

  const handleSave = async () => {
    if (!playlist) return;
    try {
      if (playlist.isSaved) {
        await playlistsApi.unsavePlaylist(playlist.id);
      } else {
        await playlistsApi.savePlaylist(playlist.id);
      }
      setPlaylist({ ...playlist, isSaved: !playlist.isSaved });
    } catch {
      // ignore
    }
  };

  const handleRemoveSong = async (songId: number) => {
    if (!playlist) return;
    try {
      await playlistsApi.removeSong(playlist.id, songId);
      setPlaylist({
        ...playlist,
        songs: playlist.songs.filter((s) => s.id !== songId),
        songCount: playlist.songCount - 1,
      });
    } catch {
      // ignore
    }
  };

  const handleDelete = async () => {
    if (!playlist) return;
    try {
      await playlistsApi.deletePlaylist(playlist.id);
      navigate('/library');
    } catch {
      // ignore
    }
  };

  if (loading) return <Spinner className="py-24" />;

  if (error || !playlist) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <ErrorMessage message={error || 'Playlist not found.'} onRetry={fetchPlaylist} />
      </div>
    );
  }

  const songsWithAlbum: Song[] = playlist.songs;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-8">
        <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-lg flex-shrink-0 shadow-2xl mx-auto sm:mx-0
          bg-gradient-to-br from-primary-900/60 to-gray-800 flex items-center justify-center">
          <span className="text-7xl">{playlist.icon}</span>
        </div>

        <div className="flex flex-col justify-end text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Playlist</p>
            {playlist.isPublic ? (
              <Globe className="w-3.5 h-3.5 text-gray-400" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-gray-400" />
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            {playlist.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm text-gray-300">
            <span className="font-semibold text-white">{playlist.ownerName}</span>
            <span className="text-gray-500">&#183;</span>
            <span>{playlist.songCount} songs</span>
          </div>

          <div className="mt-5 flex items-center gap-3 justify-center sm:justify-start">
            {songsWithAlbum.length > 0 && (
              <button
                onClick={handlePlayAll}
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-full
                  font-semibold hover:bg-primary-500 hover:scale-105 transition-all shadow-lg shadow-primary-600/25"
              >
                <Play className="w-5 h-5 fill-white" />
                Play
              </button>
            )}

            {!playlist.isOwner && (
              <button
                onClick={handleSave}
                className={`p-2.5 rounded-full transition-colors ${
                  playlist.isSaved
                    ? 'text-primary-500 bg-primary-500/10 hover:bg-primary-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
                aria-label={playlist.isSaved ? 'Remove from library' : 'Save to library'}
              >
                {playlist.isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              </button>
            )}

            {playlist.isOwner && (
              <button
                onClick={handleDelete}
                className="p-2.5 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                aria-label="Delete playlist"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Songs */}
      {songsWithAlbum.length > 0 ? (
        <div className="mt-2">
          <div className="mt-1">
            {songsWithAlbum.map((song, index) => (
              <div key={song.id} className="group flex items-center">
                <div className="flex-1">
                  <SongRow song={song} index={index} songs={songsWithAlbum} />
                </div>
                {playlist.isOwner && (
                  <button
                    onClick={() => handleRemoveSong(song.id)}
                    className="p-1.5 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all mr-2"
                    aria-label={`Remove ${song.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">This playlist is empty.</p>
          <p className="mt-1 text-sm">Search for songs and add them here.</p>
        </div>
      )}
    </div>
  );
}
