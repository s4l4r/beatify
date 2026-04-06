import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, MapPin, Calendar, Guitar, Briefcase } from 'lucide-react';
import { AlbumCard } from '@/components/AlbumCard';
import { Spinner } from '@/components/Spinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import * as artistsApi from '@/api/artists';
import type { ArtistDetail } from '@/types';

export default function ArtistPage() {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<ArtistDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtist = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await artistsApi.getById(parseInt(id));
      setArtist(data);
    } catch {
      setError('Failed to load artist details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtist();
  }, [id]);

  if (loading) {
    return <Spinner className="py-24" />;
  }

  if (error || !artist) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <ErrorMessage
          message={error || 'Artist not found.'}
          onRetry={fetchArtist}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Artist header */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-10">
        {/* Artist avatar placeholder */}
        <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden flex-shrink-0 shadow-2xl mx-auto sm:mx-0
          bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
          <User className="w-20 h-20 text-gray-500" />
        </div>

        {/* Artist info */}
        <div className="flex flex-col justify-end text-center sm:text-left">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">
            Artist
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {artist.firstName} {artist.lastName}
          </h1>

          <div className="space-y-2 text-sm text-gray-300">
            {artist.nationality && (
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{artist.nationality}</span>
              </div>
            )}
            {artist.yearsActive && (
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Active: {artist.yearsActive}</span>
              </div>
            )}
            {artist.occupations && artist.occupations.length > 0 && (
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>{artist.occupations.join(', ')}</span>
              </div>
            )}
            {artist.instruments && artist.instruments.length > 0 && (
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Guitar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>{artist.instruments.join(', ')}</span>
              </div>
            )}
          </div>

          {/* Band link */}
          {artist.bandArtist && artist.band && (
            <div className="mt-4">
              <span className="text-sm text-gray-400">Member of </span>
              <Link
                to={`/bands/${artist.band.id}`}
                className="text-sm font-semibold text-primary-400 hover:text-primary-300 hover:underline transition-colors"
              >
                {artist.band.title}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Albums */}
      {artist.albums && artist.albums.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-5">
            Discography
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {artist.albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
