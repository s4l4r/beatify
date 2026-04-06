import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Disc3, User, Users, Music2, Globe, Lock, ListMusic } from 'lucide-react';
import { Spinner } from '@/components/Spinner';
import { FavoriteButton } from '@/components/FavoriteButton';
import { AddToPlaylistMenu } from '@/components/AddToPlaylistMenu';
import { useDebounce } from '@/hooks/useDebounce';
import { usePlayerStore } from '@/store/playerStore';
import * as searchApi from '@/api/search';
import type { SearchResults, Song, SongSummary } from '@/types';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();
  const { play, addToPlaylist } = usePlayerStore();

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults(null);
      setHasSearched(false);
      return;
    }

    const doSearch = async () => {
      setLoading(true);
      try {
        const data = await searchApi.search(debouncedQuery);
        setResults(data);
        setHasSearched(true);
      } catch {
        setResults(null);
      } finally {
        setLoading(false);
      }
    };

    doSearch().then(r => r);
  }, [debouncedQuery]);

  const handlePlaySong = (songSummary: SongSummary) => {
    const song: Song = {
      id: songSummary.id,
      title: songSummary.title,
      duration: songSummary.duration,
      serverURL: songSummary.serverURL,
      album: songSummary.albumId ? {
        id: songSummary.albumId,
        title: songSummary.albumTitle,
        year: 0,
        albumArtURL: songSummary.albumArtURL ?? '',
        bandAlbum: false,
        artistName: songSummary.artistName ?? '',
        artistId: 0,
        isBand: false,
      } : undefined,
    };
    play(song);
    addToPlaylist(song);
  };

  const hasResults =
    results &&
    (results.albums.length > 0 ||
      results.artists.length > 0 ||
      results.bands.length > 0 ||
      results.songs.length > 0 ||
      (results.playlists && results.playlists.length > 0));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Search input */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            className="w-full pl-12 pr-4 py-3 bg-gray-800
              text-white rounded-full
              border border-gray-700
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              placeholder-gray-400
              text-lg transition-all"
            aria-label="Search for music"
            autoFocus
          />
        </div>
      </div>

      {/* Loading */}
      {loading && <Spinner className="py-12" />}

      {/* Results */}
      {!loading && hasResults && results && (
        <div className="space-y-10">
          {/* Albums */}
          {results.albums.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Disc3 className="w-5 h-5 text-primary-500" />
                Albums
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {results.albums.map((album) => (
                  <button
                    key={album.id}
                    onClick={() => navigate(`/albums/${album.id}`)}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/40
                      hover:bg-gray-700/60
                      transition-all duration-200 text-left w-full"
                  >
                    <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary-900 to-primary-600">
                      {album.albumArtURL ? (
                        <img
                          src={album.albumArtURL}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Music2 className="w-5 h-5 text-primary-300/60" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {album.title}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {album.artistName} &middot; {album.year}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Artists */}
          {results.artists.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary-500" />
                Artists
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {results.artists.map((artist) => (
                  <button
                    key={artist.id}
                    onClick={() => navigate(`/artists/${artist.id}`)}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/40
                      hover:bg-gray-700/60
                      transition-all duration-200 text-left w-full"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800
                      flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-white truncate">
                      {artist.firstName} {artist.lastName}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Bands */}
          {results.bands.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-500" />
                Bands
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {results.bands.map((band) => (
                  <button
                    key={band.id}
                    onClick={() => navigate(`/bands/${band.id}`)}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/40
                      hover:bg-gray-700/60
                      transition-all duration-200 text-left w-full"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800
                      flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-white truncate">
                      {band.title}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Songs */}
          {results.songs.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Music2 className="w-5 h-5 text-primary-500" />
                Songs
              </h2>
              <div className="space-y-1">
                {results.songs.map((song) => (
                  <div
                    key={song.id}
                    className="group flex items-center gap-3 w-full p-3 rounded-lg
                      hover:bg-gray-800/50 transition-colors duration-150"
                  >
                    <button
                      onClick={() => handlePlaySong(song)}
                      className="flex items-center gap-3 flex-1 min-w-0 text-left"
                    >
                      <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary-900 to-primary-600">
                        {song.albumArtURL ? (
                          <img src={song.albumArtURL} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Music2 className="w-4 h-4 text-primary-300/60" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {song.title}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {song.artistName ?? song.albumTitle}
                        </p>
                      </div>
                    </button>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <FavoriteButton songId={song.id} />
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <AddToPlaylistMenu songId={song.id} songTitle={song.title} />
                      </div>
                      <span className="text-xs text-gray-500 w-10 text-right">
                        {song.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Playlists */}
          {results.playlists && results.playlists.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <ListMusic className="w-5 h-5 text-primary-500" />
                Playlists
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {results.playlists.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => navigate(`/playlists/${playlist.id}`)}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/40
                      hover:bg-gray-700/60
                      transition-all duration-200 text-left w-full"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-900/60 to-gray-800
                      flex items-center justify-center text-xl flex-shrink-0">
                      {playlist.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {playlist.title}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        {playlist.isPublic ? (
                          <Globe className="w-3 h-3" />
                        ) : (
                          <Lock className="w-3 h-3" />
                        )}
                        <span>{playlist.ownerName}</span>
                        <span>&middot;</span>
                        <span>{playlist.songCount} songs</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* No results */}
      {!loading && hasSearched && !hasResults && (
        <div className="text-center py-16 text-gray-400">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">
            No results found for &quot;{debouncedQuery}&quot;
          </p>
          <p className="mt-1 text-sm">
            Try different keywords or check your spelling.
          </p>
        </div>
      )}

      {/* Initial state */}
      {!loading && !hasSearched && (
        <div className="text-center py-16 text-gray-400">
          <Music2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg">Search for your favorite music</p>
          <p className="mt-1 text-sm">
            Find albums, artists, bands, and songs.
          </p>
        </div>
      )}
    </div>
  );
}
