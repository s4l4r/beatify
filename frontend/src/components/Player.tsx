import { useState, useCallback, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  ListMusic,
  Volume2,
  Music,
} from 'lucide-react';
import { usePlayerStore } from '@/store/playerStore';
import { PlaylistModal } from './PlaylistModal';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function Player() {
  const {
    currentTrack,
    isPlaying,
    shuffle,
    repeat,
    duration,
    currentTime,
    volume,
    pause,
    resume,
    next,
    previous,
    seek,
    setVolume,
    toggleShuffle,
    toggleRepeat,
  } = usePlayerStore();

  const [showQueue, setShowQueue] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  const displayTime = isDragging ? dragTime : currentTime;
  const progressPercent = duration > 0 ? (displayTime / duration) * 100 : 0;

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current || duration <= 0) return;
      const rect = progressRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      seek(percent * duration);
    },
    [duration, seek]
  );

  const handleProgressMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current || duration <= 0) return;
      setIsDragging(true);
      const rect = progressRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      setDragTime(percent * duration);
    },
    [duration]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!progressRef.current || duration <= 0) return;
      const rect = progressRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      setDragTime(percent * duration);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      seek(dragTime);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragTime, duration, seek]);

  if (!currentTrack) return null;

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 h-20 bg-gray-900/95 dark:bg-gray-900/95 bg-white/95
          backdrop-blur-lg border-t border-gray-800 dark:border-gray-800 border-gray-200
          flex items-center z-30 px-4"
        role="region"
        aria-label="Audio player"
      >
        {/* Left: Track info */}
        <div className="flex items-center gap-3 w-1/4 min-w-0">
          <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary-900 to-primary-600">
            {currentTrack.album?.albumArtURL ? (
              <img
                src={currentTrack.album.albumArtURL}
                alt={`${currentTrack.title} album art`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Music className="w-6 h-6 text-primary-300/60" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white dark:text-white text-gray-900 truncate">
              {currentTrack.title}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-400 text-gray-500 truncate">
              {currentTrack.album?.artistName ?? 'Unknown Artist'}
            </p>
          </div>
        </div>

        {/* Center: Controls + Progress */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto">
          {/* Control buttons */}
          <div className="flex items-center gap-4 mb-1">
            <button
              onClick={toggleShuffle}
              className={`p-1 transition-colors ${
                shuffle
                  ? 'text-primary-500'
                  : 'text-gray-400 hover:text-white dark:hover:text-white hover:text-gray-900'
              }`}
              aria-label={`Shuffle ${shuffle ? 'on' : 'off'}`}
              aria-pressed={shuffle}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              onClick={previous}
              className="p-1 text-gray-400 hover:text-white dark:hover:text-white hover:text-gray-900 transition-colors"
              aria-label="Previous track"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>

            <button
              onClick={isPlaying ? pause : resume}
              className="w-8 h-8 rounded-full bg-white dark:bg-white bg-gray-900 flex items-center justify-center
                hover:scale-105 transition-transform"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-black dark:text-black text-white fill-current" />
              ) : (
                <Play className="w-4 h-4 text-black dark:text-black text-white fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={next}
              className="p-1 text-gray-400 hover:text-white dark:hover:text-white hover:text-gray-900 transition-colors"
              aria-label="Next track"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>

            <button
              onClick={toggleRepeat}
              className={`p-1 transition-colors ${
                repeat
                  ? 'text-primary-500'
                  : 'text-gray-400 hover:text-white dark:hover:text-white hover:text-gray-900'
              }`}
              aria-label={`Repeat ${repeat ? 'on' : 'off'}`}
              aria-pressed={repeat}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right tabular-nums">
              {formatTime(displayTime)}
            </span>
            <div
              ref={progressRef}
              className="flex-1 h-1 bg-gray-600 dark:bg-gray-600 bg-gray-300 rounded-full cursor-pointer group relative"
              onClick={handleProgressClick}
              onMouseDown={handleProgressMouseDown}
              role="slider"
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={Math.floor(duration)}
              aria-valuenow={Math.floor(displayTime)}
              tabIndex={0}
            >
              <div
                className="absolute top-0 left-0 h-full bg-white dark:bg-white bg-gray-900 rounded-full
                  group-hover:bg-primary-500 transition-colors"
                style={{ width: `${progressPercent}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full
                  opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                style={{ left: `${progressPercent}%`, marginLeft: '-6px' }}
              />
            </div>
            <span className="text-xs text-gray-400 w-10 tabular-nums">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right: Volume + Queue */}
        <div className="flex items-center gap-3 w-1/4 justify-end">
          <div className="hidden sm:flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-gray-400" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1"
              aria-label="Volume"
            />
          </div>

          <button
            onClick={() => setShowQueue(!showQueue)}
            className={`p-1 transition-colors ${
              showQueue
                ? 'text-primary-500'
                : 'text-gray-400 hover:text-white dark:hover:text-white hover:text-gray-900'
            }`}
            aria-label="Toggle queue"
            aria-pressed={showQueue}
          >
            <ListMusic className="w-5 h-5" />
          </button>
        </div>
      </div>

      <PlaylistModal isOpen={showQueue} onClose={() => setShowQueue(false)} />
    </>
  );
}
