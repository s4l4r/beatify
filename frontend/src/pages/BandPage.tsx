import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, MapPin, Calendar } from 'lucide-react';
import { AlbumCard } from '@/components/AlbumCard';
import { Spinner } from '@/components/Spinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import * as bandsApi from '@/api/bands';
import type { BandDetail } from '@/types';

export default function BandPage() {
  const { id } = useParams<{ id: string }>();
  const [band, setBand] = useState<BandDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBand = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await bandsApi.getById(parseInt(id));
      setBand(data);
    } catch {
      setError('Failed to load band details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBand();
  }, [id]);

  if (loading) {
    return <Spinner className="py-24" />;
  }

  if (error || !band) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <ErrorMessage
          message={error || 'Band not found.'}
          onRetry={fetchBand}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Band header */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-10">
        {/* Band avatar placeholder */}
        <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden flex-shrink-0 shadow-2xl mx-auto sm:mx-0
          bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
          <Users className="w-20 h-20 text-gray-500" />
        </div>

        {/* Band info */}
        <div className="flex flex-col justify-end text-center sm:text-left">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">
            Band
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white dark:text-white text-gray-900 mb-4">
            {band.title}
          </h1>

          <div className="space-y-2 text-sm text-gray-300 dark:text-gray-300 text-gray-600">
            {band.nationality && (
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{band.nationality}</span>
              </div>
            )}
            {band.yearsActive && (
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Active: {band.yearsActive}</span>
              </div>
            )}
          </div>

          {/* Genres */}
          {band.genres && band.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              {band.genres.map((genre) => (
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
        </div>
      </div>

      {/* Members */}
      {band.members && band.members.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white dark:text-white text-gray-900 mb-5">
            Members
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {band.members.map((member) => (
              <Link
                key={member.id}
                to={`/artists/${member.id}`}
                className="flex flex-col items-center p-4 rounded-lg bg-gray-800/40 dark:bg-gray-800/40 bg-gray-100
                  hover:bg-gray-700/60 dark:hover:bg-gray-700/60 hover:bg-gray-200
                  transition-all duration-200 group"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-600 to-gray-800
                  flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-white dark:text-white text-gray-900 text-center">
                  {member.firstName} {member.lastName}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Albums */}
      {band.albums && band.albums.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white dark:text-white text-gray-900 mb-5">
            Discography
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {band.albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
