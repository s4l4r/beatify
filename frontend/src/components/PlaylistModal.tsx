import { X, Music, Trash2 } from 'lucide-react';
import { usePlayerStore } from '@/store/playerStore';

interface PlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlaylistModal({ isOpen, onClose }: PlaylistModalProps) {
  const { playlist, currentTrack, removeFromPlaylist, play } = usePlayerStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed right-0 top-0 bottom-20 w-full max-w-md bg-gray-900
          z-50 shadow-2xl flex flex-col border-l border-gray-800"
        role="dialog"
        aria-label="Playback queue"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Queue</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors rounded-md
              focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Close queue"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Song list */}
        <div className="flex-1 overflow-y-auto">
          {playlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Music className="w-12 h-12 mb-3" />
              <p>Your queue is empty</p>
            </div>
          ) : (
            <div className="p-2">
              {playlist.map((song, index) => {
                const isCurrent = currentTrack?.id === song.id;
                return (
                  <div
                    key={`${song.id}-${index}`}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                      ${isCurrent ? 'bg-primary-500/10' : 'hover:bg-gray-800/50'}`}
                  >
                    {/* Album art thumbnail */}
                    <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary-900 to-primary-600">
                      {song.album?.albumArtURL ? (
                        <img
                          src={song.album.albumArtURL}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Music className="w-4 h-4 text-primary-300/60" />
                        </div>
                      )}
                    </div>

                    {/* Song info */}
                    <button
                      onClick={() => play(song)}
                      className="flex-1 min-w-0 text-left"
                      aria-label={`Play ${song.title}`}
                    >
                      <p
                        className={`text-sm font-medium truncate ${
                          isCurrent ? 'text-primary-500' : 'text-white'
                        }`}
                      >
                        {song.title}
                      </p>
                      {song.album && (
                        <p className="text-xs text-gray-400 truncate">
                          {song.album.artistName}
                        </p>
                      )}
                    </button>

                    {/* Duration */}
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {song.duration}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromPlaylist(song.id)}
                      className="p-1 text-gray-500 hover:text-red-400 transition-colors flex-shrink-0"
                      aria-label={`Remove ${song.title} from queue`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
