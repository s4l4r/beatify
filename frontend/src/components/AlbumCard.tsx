import { useNavigate } from 'react-router-dom';
import { Play, Music } from 'lucide-react';
import type { AlbumSummary } from '@/types';

interface AlbumCardProps {
  album: AlbumSummary;
}

export function AlbumCard({ album }: AlbumCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/albums/${album.id}`);
  };

  const handleArtistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (album.isBand) {
      navigate(`/bands/${album.artistId}`);
    } else {
      navigate(`/artists/${album.artistId}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="group w-full text-left bg-gray-800/40 dark:bg-gray-800/40 bg-gray-100 rounded-lg p-3 sm:p-4
        hover:bg-gray-700/60 dark:hover:bg-gray-700/60 hover:bg-gray-200
        transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20
        cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      aria-label={`View album ${album.title} by ${album.artistName}`}
    >
      <div className="relative aspect-square rounded-md overflow-hidden mb-3 sm:mb-4 bg-gradient-to-br from-primary-900 to-primary-600">
        {album.albumArtURL ? (
          <img
            src={album.albumArtURL}
            alt={`${album.title} album art`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music className="w-12 h-12 sm:w-16 sm:h-16 text-primary-300/60" />
          </div>
        )}
        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/40
          transition-all duration-200 flex items-center justify-center"
        >
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-500 flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition-all duration-200
            translate-y-2 group-hover:translate-y-0 shadow-lg"
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-sm sm:text-base text-white dark:text-white text-gray-900 truncate">
        {album.title}
      </h3>
      <p
        onClick={handleArtistClick}
        className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 text-gray-500 truncate mt-1
          hover:text-primary-400 hover:underline cursor-pointer"
        role="link"
        aria-label={`View artist ${album.artistName}`}
      >
        {album.artistName}
      </p>
    </button>
  );
}
