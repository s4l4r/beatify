import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, Library } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { usePlayerStore } from '@/store/playerStore';

export function MobileNav() {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const currentTrack = usePlayerStore((s) => s.currentTrack);

  const isActive = (path: string) => location.pathname === path;

  const tabClass = (path: string) =>
    `flex flex-col items-center gap-0.5 py-2 flex-1 transition-colors ${
      isActive(path) ? 'text-white' : 'text-gray-500'
    }`;

  const dotClass = (path: string) =>
    `w-1 h-1 rounded-full transition-all ${isActive(path) ? 'bg-primary-500' : 'bg-transparent'}`;

  return (
    <div
      className={`sm:hidden fixed left-0 right-0 z-30 bg-gray-900/95 backdrop-blur-lg
        border-t border-gray-800 ${currentTrack ? 'bottom-20' : 'bottom-0'}`}
    >
      <div className="flex items-center justify-around">
        <Link to="/home" className={tabClass('/home')}>
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
          <div className={dotClass('/home')} />
        </Link>
        <Link to="/search" className={tabClass('/search')}>
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium">Search</span>
          <div className={dotClass('/search')} />
        </Link>
        {isAuthenticated && (
          <>
            <Link to="/favorites" className={tabClass('/favorites')}>
              <Heart className="w-5 h-5" />
              <span className="text-[10px] font-medium">Favorites</span>
              <div className={dotClass('/favorites')} />
            </Link>
            <Link to="/library" className={tabClass('/library')}>
              <Library className="w-5 h-5" />
              <span className="text-[10px] font-medium">Library</span>
              <div className={dotClass('/library')} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
