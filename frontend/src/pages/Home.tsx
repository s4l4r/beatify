import { useEffect, useState } from 'react';
import { AlbumCard } from '@/components/AlbumCard';
import { Spinner } from '@/components/Spinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import * as albumsApi from '@/api/albums';
import type { AlbumSummary } from '@/types';

export default function Home() {
  const [featured, setFeatured] = useState<AlbumSummary[]>([]);
  const [recent, setRecent] = useState<AlbumSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlbums = async () => {
    setLoading(true);
    setError(null);
    try {
      const [featuredData, recentData] = await Promise.all([
        albumsApi.getFeatured(0, 12),
        albumsApi.getRecent(0, 12),
      ]);
      setFeatured(featuredData);
      setRecent(recentData);
    } catch {
      setError('Failed to load albums. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  if (loading) {
    return <Spinner className="py-24" />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <ErrorMessage message={error} onRetry={fetchAlbums} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Trending section */}
      {featured.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white dark:text-white text-gray-900 mb-5">
            Trending on Beatify
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featured.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Added section */}
      {recent.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white dark:text-white text-gray-900 mb-5">
            Recently Added
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recent.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      )}

      {featured.length === 0 && recent.length === 0 && (
        <div className="text-center py-24 text-gray-400">
          <p className="text-xl">No albums available yet.</p>
          <p className="mt-2">Check back later for new music!</p>
        </div>
      )}
    </div>
  );
}
