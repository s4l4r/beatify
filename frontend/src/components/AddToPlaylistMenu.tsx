import { useState, useEffect, useRef, useCallback } from 'react';
import { Plus, Check, ChevronLeft } from 'lucide-react';
import * as playlistsApi from '@/api/playlists';
import type { PlaylistSummary } from '@/types';

const ICONS = [
  '\uD83C\uDFB5', '\uD83C\uDFB6', '\uD83C\uDFA7', '\uD83C\uDFB8',
  '\uD83C\uDFB9', '\uD83E\uDD41', '\uD83C\uDFBA', '\uD83C\uDFBB',
  '\u2764\uFE0F', '\uD83D\uDD25', '\u2B50', '\uD83C\uDF19',
];

interface AddToPlaylistMenuProps {
  songId: number;
  songTitle: string;
}

export function AddToPlaylistMenu({ songId, songTitle }: AddToPlaylistMenuProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'list' | 'create'>('list');
  const [playlists, setPlaylists] = useState<PlaylistSummary[]>([]);
  const [addedTo, setAddedTo] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newIcon, setNewIcon] = useState(ICONS[0]);
  const [creating, setCreating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const close = useCallback(() => {
    setOpen(false);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(close, 700);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    fetchPlaylists();
    setView('list');
    setNewTitle('');
    setNewIcon(ICONS[0]);
    setAddedTo(new Set());
  }, [open]);

  useEffect(() => {
    if (view === 'create' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [view]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, close]);

  useEffect(() => {
    return () => { if (closeTimerRef.current) clearTimeout(closeTimerRef.current); };
  }, []);

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const data = await playlistsApi.getLibrary();
      setPlaylists(data.filter((p) => p.isOwner));
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (playlistId: number) => {
    try {
      await playlistsApi.addSong(playlistId, songId);
      setAddedTo((prev) => new Set(prev).add(playlistId));
      scheduleClose();
    } catch {
      // ignore
    }
  };

  const handleCreate = async () => {
    if (!newTitle.trim() || creating) return;
    setCreating(true);
    try {
      const created = await playlistsApi.create(newTitle.trim(), newIcon, false);
      await playlistsApi.addSong(created.id, songId);
      setAddedTo((prev) => new Set(prev).add(created.id));
      setPlaylists((prev) => [
        { id: created.id, title: created.title, icon: created.icon, isPublic: false, ownerName: '', songCount: 1, isOwner: true, isSaved: false },
        ...prev,
      ]);
      setView('list');
      setNewTitle('');
      scheduleClose();
    } catch {
      // ignore
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (open) { close(); } else { setOpen(true); }
        }}
        className="p-1 text-gray-400 hover:text-white transition-colors"
        aria-label={`Add ${songTitle} to playlist`}
      >
        <Plus className="w-4 h-4" />
      </button>

      {open && (
        <div
          className="absolute right-0 bottom-full mb-1 w-64 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 z-50 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {view === 'list' ? (
            <>
              <button
                onClick={() => setView('create')}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-primary-400
                  hover:bg-gray-700/60 transition-colors border-b border-gray-700"
              >
                <div className="w-7 h-7 rounded-md bg-primary-600/20 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                New playlist
              </button>

              <div className="max-h-52 overflow-y-auto py-1">
                {loading && (
                  <p className="text-xs text-gray-500 px-4 py-3">Loading...</p>
                )}
                {!loading && playlists.length === 0 && (
                  <p className="text-xs text-gray-500 px-4 py-3 text-center">
                    Create your first playlist above
                  </p>
                )}
                {playlists.map((pl) => {
                  const added = addedTo.has(pl.id);
                  return (
                    <button
                      key={pl.id}
                      onClick={() => { if (!added) handleAdd(pl.id); }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm text-left transition-colors
                        ${added ? 'text-primary-400' : 'text-gray-300 hover:bg-gray-700/60'}`}
                      disabled={added}
                    >
                      <span className="text-base w-7 text-center">{pl.icon}</span>
                      <span className="flex-1 truncate">{pl.title}</span>
                      {added && <Check className="w-4 h-4 text-primary-500 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="p-3 space-y-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView('list')}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium text-white">New playlist</span>
              </div>

              <input
                ref={inputRef}
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCreate(); }}
                placeholder="Playlist name"
                className="w-full px-3 py-2 bg-gray-900 text-white text-sm rounded-lg
                  border border-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-500
                  placeholder-gray-500"
              />

              <div className="flex flex-wrap gap-1.5">
                {ICONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setNewIcon(emoji)}
                    className={`w-8 h-8 rounded-md flex items-center justify-center text-sm transition-all
                      ${newIcon === emoji
                        ? 'bg-primary-600 ring-1 ring-primary-400 scale-110'
                        : 'bg-gray-900 hover:bg-gray-700'
                      }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCreate}
                disabled={!newTitle.trim() || creating}
                className="w-full py-2 bg-primary-600 text-white text-sm rounded-lg font-medium
                  hover:bg-primary-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {creating ? 'Creating...' : 'Create & add song'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
