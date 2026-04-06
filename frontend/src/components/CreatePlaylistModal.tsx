import { useState, type FormEvent } from 'react';
import { X, Globe, Lock } from 'lucide-react';
import * as playlistsApi from '@/api/playlists';

const ICONS = [
  '\uD83C\uDFB5', '\uD83C\uDFB6', '\uD83C\uDFA7', '\uD83C\uDFB8',
  '\uD83C\uDFB9', '\uD83E\uDD41', '\uD83C\uDFBA', '\uD83C\uDFBB',
  '\u2764\uFE0F', '\uD83D\uDD25', '\u2B50', '\uD83C\uDF19',
  '\u26A1', '\uD83C\uDF08', '\uD83C\uDF3A', '\uD83D\uDE80',
];

interface CreatePlaylistModalProps {
  onClose: () => void;
  onCreated: () => void;
}

export function CreatePlaylistModal({ onClose, onCreated }: CreatePlaylistModalProps) {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState(ICONS[0]);
  const [isPublic, setIsPublic] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await playlistsApi.create(title.trim(), icon, isPublic);
      onCreated();
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-md border border-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">Create Playlist</h2>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My awesome playlist"
                className="w-full px-3 py-2.5 bg-gray-800 text-white rounded-lg
                  border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500
                  focus:border-transparent placeholder-gray-500"
                autoFocus
                required
              />
            </div>

            {/* Icon picker */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Icon</label>
              <div className="grid grid-cols-8 gap-2">
                {ICONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setIcon(emoji)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all
                      ${icon === emoji
                        ? 'bg-primary-600 ring-2 ring-primary-400 scale-110'
                        : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Visibility */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Visibility</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsPublic(false)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${!isPublic
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                >
                  <Lock className="w-4 h-4" />
                  Private
                </button>
                <button
                  type="button"
                  onClick={() => setIsPublic(true)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${isPublic
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                >
                  <Globe className="w-4 h-4" />
                  Public
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1.5">
                {isPublic ? 'Anyone can find and save this playlist.' : 'Only you can see this playlist.'}
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="w-full py-3 bg-primary-600 text-white rounded-full font-semibold text-sm
                hover:bg-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Playlist'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
