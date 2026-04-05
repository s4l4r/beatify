import { create } from 'zustand';
import { Howl } from 'howler';
import type { Song } from '@/types';

interface PlayerState {
  currentTrack: Song | null;
  playlist: Song[];
  currentIndex: number;
  isPlaying: boolean;
  shuffle: boolean;
  repeat: boolean;
  duration: number;
  currentTime: number;
  volume: number;
  howl: Howl | null;
  animationFrameId: number | null;

  play: (song: Song) => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setPlaylist: (songs: Song[], startIndex?: number) => void;
  addToPlaylist: (song: Song) => void;
  removeFromPlaylist: (songId: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  cleanup: () => void;
}

function startProgressUpdater(
  howl: Howl,
  set: (state: Partial<PlayerState>) => void,
  get: () => PlayerState
) {
  const update = () => {
    const state = get();
    if (state.howl && state.isPlaying) {
      set({ currentTime: state.howl.seek() as number });
      const id = requestAnimationFrame(update);
      set({ animationFrameId: id });
    }
  };
  const id = requestAnimationFrame(update);
  set({ animationFrameId: id });
}

function stopProgressUpdater(get: () => PlayerState) {
  const { animationFrameId } = get();
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  playlist: [],
  currentIndex: -1,
  isPlaying: false,
  shuffle: false,
  repeat: false,
  duration: 0,
  currentTime: 0,
  volume: 0.8,
  howl: null,
  animationFrameId: null,

  play: (song: Song) => {
    const state = get();

    // Clean up previous howl
    stopProgressUpdater(get);
    if (state.howl) {
      state.howl.unload();
    }

    const howl = new Howl({
      src: [song.serverURL],
      html5: true,
      volume: state.volume,
      onplay: () => {
        set({ duration: howl.duration(), isPlaying: true });
        startProgressUpdater(howl, set, get);
      },
      onpause: () => {
        set({ isPlaying: false });
        stopProgressUpdater(get);
      },
      onstop: () => {
        set({ isPlaying: false, currentTime: 0 });
        stopProgressUpdater(get);
      },
      onend: () => {
        stopProgressUpdater(get);
        const currentState = get();
        if (currentState.repeat) {
          howl.play();
        } else if (currentState.shuffle) {
          const randomIndex = Math.floor(
            Math.random() * currentState.playlist.length
          );
          const randomSong = currentState.playlist[randomIndex];
          if (randomSong) {
            set({ currentIndex: randomIndex });
            get().play(randomSong);
          }
        } else {
          get().next();
        }
      },
      onload: () => {
        set({ duration: howl.duration() });
      },
      onloaderror: (_id, error) => {
        console.error('Error loading audio:', error);
        set({ isPlaying: false });
      },
    });

    // Find index in playlist
    const idx = state.playlist.findIndex((s) => s.id === song.id);

    set({
      currentTrack: song,
      howl,
      currentTime: 0,
      currentIndex: idx >= 0 ? idx : state.currentIndex,
    });

    howl.play();
  },

  pause: () => {
    const { howl } = get();
    if (howl) {
      howl.pause();
    }
  },

  resume: () => {
    const { howl } = get();
    if (howl) {
      howl.play();
    }
  },

  next: () => {
    const { playlist, currentIndex, shuffle } = get();
    if (playlist.length === 0) return;

    let nextIndex: number;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = currentIndex + 1;
      if (nextIndex >= playlist.length) {
        nextIndex = 0;
      }
    }

    const nextSong = playlist[nextIndex];
    if (nextSong) {
      set({ currentIndex: nextIndex });
      get().play(nextSong);
    }
  },

  previous: () => {
    const { playlist, currentIndex, currentTime } = get();
    if (playlist.length === 0) return;

    // If more than 3 seconds in, restart current song
    if (currentTime > 3) {
      get().seek(0);
      return;
    }

    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = playlist.length - 1;
    }

    const prevSong = playlist[prevIndex];
    if (prevSong) {
      set({ currentIndex: prevIndex });
      get().play(prevSong);
    }
  },

  seek: (time: number) => {
    const { howl } = get();
    if (howl) {
      howl.seek(time);
      set({ currentTime: time });
    }
  },

  setVolume: (volume: number) => {
    const { howl } = get();
    if (howl) {
      howl.volume(volume);
    }
    set({ volume });
  },

  setPlaylist: (songs: Song[], startIndex: number = 0) => {
    set({ playlist: songs, currentIndex: startIndex });
    const song = songs[startIndex];
    if (song) {
      get().play(song);
    }
  },

  addToPlaylist: (song: Song) => {
    const { playlist } = get();
    if (!playlist.find((s) => s.id === song.id)) {
      set({ playlist: [...playlist, song] });
    }
  },

  removeFromPlaylist: (songId: number) => {
    const { playlist, currentIndex, currentTrack } = get();
    const removeIndex = playlist.findIndex((s) => s.id === songId);
    if (removeIndex === -1) return;

    const newPlaylist = playlist.filter((s) => s.id !== songId);
    let newIndex = currentIndex;

    if (removeIndex < currentIndex) {
      newIndex = currentIndex - 1;
    } else if (removeIndex === currentIndex) {
      // If removing current track, play next
      if (newPlaylist.length > 0) {
        newIndex = Math.min(removeIndex, newPlaylist.length - 1);
        set({ playlist: newPlaylist, currentIndex: newIndex });
        const nextSong = newPlaylist[newIndex];
        if (nextSong) {
          get().play(nextSong);
        }
        return;
      } else {
        // No more songs
        get().cleanup();
        set({
          playlist: [],
          currentIndex: -1,
          currentTrack: null,
          isPlaying: false,
        });
        return;
      }
    }

    set({ playlist: newPlaylist, currentIndex: newIndex });
  },

  toggleShuffle: () => {
    set((state) => ({ shuffle: !state.shuffle }));
  },

  toggleRepeat: () => {
    set((state) => ({ repeat: !state.repeat }));
  },

  cleanup: () => {
    const state = get();
    stopProgressUpdater(get);
    if (state.howl) {
      state.howl.unload();
    }
    set({ howl: null, isPlaying: false, currentTime: 0, duration: 0 });
  },
}));
