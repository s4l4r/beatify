import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Clock, Music } from 'lucide-react';
import { SongRow } from '@/components/SongRow';
import { Spinner } from '@/components/Spinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { usePlayerStore } from '@/store/playerStore';
import * as albumsApi from '@/api/albums';
import type { AlbumDetail, Song } from '@/types';

export default function AlbumPage() {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<AlbumDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setPlaylist, addToPlaylist } = usePlayerStore();

  const fetchAlbum = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await albumsApi.getById(parseInt(id));
      setAlbum(data);
    } catch {
      setError('Failed to load album details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, [id]);

  if (loading) {
    return <Spinner className="py-24" />;
  }

  if (error || !album) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <ErrorMessage
          message={error || 'Album not found.'}
          onRetry={fetchAlbum}
        />
      </div>
    );
  }

  // Build song objects with album reference for the player
  const songsWithAlbum: Song[] = album.songs.map((song) => ({
    ...song,
    album: {
      id: album.id,
      title: album.title,
      year: album.year,
      albumArtURL: album.albumArtURL,
      bandAlbum: album.bandAlbum,
      artistName: album.artistName,
      artistId: album.artistId,
      isBand: album.isBand,
    },
  }));

  const handlePlayAll = () => {
    if (songsWithAlbum.length > 0) {
      setPlaylist(songsWithAlbum, 0);
    }
  };

  const handleAddToPlaylist = (song: Song) => {
    addToPlaylist(song);
  };

  const artistLink = album.isBand
    ? `/bands/${album.artistId}`
    : `/artists/${album.artistId}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Album header */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-8">
        {/* Album art */}
        <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-lg overflow-hidden flex-shrink-0 shadow-2xl mx-auto sm:mx-0
          bg-gradient-to-br from-primary-900 to-primary-600">
          {album.albumArtURL ? (
            <img
              src={album.albumArtURL}
              alt={`${album.title} album art`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Music className="w-20 h-20 text-primary-300/60" />
            </div>
          )}
        </div>

        {/* Album info */}
        <div className="flex flex-col justify-end text-center sm:text-left">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">
            Album
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white dark:text-white text-gray-900 mb-3">
            {album.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm text-gray-300 dark:text-gray-300 text-gray-600">
            <Link
              to={artistLink}
              className="font-semibold text-white dark:text-white text-gray-900 hover:text-primary-400 hover:underline transition-colors"
            >
              {album.artistName}
            </Link>
            <span className="text-gray-500">&#183;</span>
            <span>{album.year}</span>
            <span className="text-gray-500">&#183;</span>
            <span>{album.songs.length} songs</span>
          </div>

          {/* Genres */}
          {album.genres && album.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              {album.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-2.5 py-0.5 text-xs font-medium rounded-full
                    bg-gray-800 dark:bg-gray-800 bg-gray-200 text-gray-300 dark:text-gray-300 text-gray-600"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Play all button */}
          <div className="mt-5 flex justify-center sm:justify-start">
            <button
              onClick={handlePlayAll}
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-full
                font-semibold hover:bg-primary-500 hover:scale-105 transition-all shadow-lg shadow-primary-600/25"
              aria-label="Play all songs"
            >
              <Play className="w-5 h-5 fill-white" />
              Play
            </button>
          </div>
        </div>
      </div>

      {/* Song list */}
      <div className="mt-2">
        {/* Header row */}
        <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-800 dark:border-gray-800 border-gray-200 text-gray-400 text-xs uppercase tracking-wider">
          <div className="w-8 text-center">#</div>
          <div className="flex-1">Title</div>
          <div className="w-12 text-right">
            <Clock className="w-4 h-4 inline" />
          </div>
        </div>

        {/* Song rows */}
        <div className="mt-1">
          {songsWithAlbum.map((song, index) => (
            <SongRow
              key={song.id}
              song={song}
              index={index}
              songs={songsWithAlbum}
              onAddToPlaylist={handleAddToPlaylist}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
