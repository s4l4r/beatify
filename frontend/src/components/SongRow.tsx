import { Play, Pause } from 'lucide-react';
import { usePlayerStore } from '@/store/playerStore';
import { useAuthStore } from '@/store/authStore';
import { AddToPlaylistMenu } from './AddToPlaylistMenu';
import { FavoriteButton } from './FavoriteButton';
import type { Song } from '@/types';

interface SongRowProps {
  song: Song;
  index: number;
  songs: Song[];
}

export function SongRow({ song, index, songs }: SongRowProps) {
  const { currentTrack, isPlaying, pause, resume, setPlaylist } =
    usePlayerStore();
  const { isAuthenticated } = useAuthStore();

  const isCurrentSong = currentTrack?.id === song.id;
  const isCurrentlyPlaying = isCurrentSong && isPlaying;

  const handlePlay = () => {
    if (isCurrentSong) {
      if (isPlaying) {
        pause();
      } else {
        resume();
      }
    } else {
      setPlaylist(songs, index);
    }
  };

  return (
    <div
      className={`group flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 rounded-md transition-colors duration-150
        ${isCurrentSong ? 'bg-primary-500/10' : 'hover:bg-gray-800/50'}`}
    >
      {/* Track number / Play button */}
      <div className="w-8 flex-shrink-0 text-center">
        <button
          onClick={handlePlay}
          className="w-8 h-8 flex items-center justify-center"
          aria-label={isCurrentlyPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
        >
          {isCurrentlyPlaying ? (
            <Pause className="w-4 h-4 text-primary-500 fill-primary-500" />
          ) : (
            <>
              <span
                className={`group-hover:hidden text-sm ${
                  isCurrentSong ? 'text-primary-500' : 'text-gray-400'
                }`}
              >
                {index + 1}
              </span>
              <Play className="w-4 h-4 text-white hidden group-hover:block" />
            </>
          )}
        </button>
      </div>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate ${
            isCurrentSong ? 'text-primary-500' : 'text-white'
          }`}
        >
          {song.title}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <FavoriteButton songId={song.id} />
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          {isAuthenticated && (
            <AddToPlaylistMenu songId={song.id} songTitle={song.title} />
          )}
        </div>
      </div>

      {/* Duration */}
      <span className="text-sm text-gray-400 flex-shrink-0 w-12 text-right">
        {song.duration}
      </span>
    </div>
  );
}
