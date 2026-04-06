import { Heart } from 'lucide-react';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useAuthStore } from '@/store/authStore';

interface FavoriteButtonProps {
  songId: number;
  size?: 'sm' | 'md';
}

export function FavoriteButton({ songId, size = 'sm' }: FavoriteButtonProps) {
  const { isAuthenticated } = useAuthStore();
  const toggle = useFavoritesStore((s) => s.toggle);
  const isFav = useFavoritesStore((s) => s.ids.has(songId));

  if (!isAuthenticated) return null;

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggle(songId);
      }}
      className={`p-1 transition-all ${
        isFav
          ? 'text-red-500 scale-110'
          : 'text-gray-500 hover:text-red-400 hover:scale-110'
      }`}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={`${iconSize} ${isFav ? 'fill-current' : ''}`} />
    </button>
  );
}
