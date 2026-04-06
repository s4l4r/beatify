import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()
    : '';

  const pillClass = (path: string) =>
    `flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
      isActive(path)
        ? 'bg-gray-700 text-white shadow-sm'
        : 'text-gray-400 hover:text-white'
    }`;

  return (
    <nav className="sticky top-0 z-20 bg-surface-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/home" className="flex-shrink-0" aria-label="Beatify home">
            <span className="text-xl sm:text-2xl font-logo bg-gradient-to-r from-primary-400 via-primary-500 to-pink-500 bg-clip-text text-transparent">
              Beatify
            </span>
          </Link>

          {/* Center: pill nav (desktop only) */}
          <div className="hidden sm:flex items-center gap-0.5 bg-gray-800/50 rounded-full p-1">
            <Link to="/home" className={pillClass('/home')}>
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link to="/search" className={pillClass('/search')}>
              <Search className="w-4 h-4" />
              Search
            </Link>
            {isAuthenticated && (
              <Link to="/library" className={pillClass('/library')}>
                <Library className="w-4 h-4" />
                Library
              </Link>
            )}
          </div>

          {/* Right: auth area */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold shadow-lg shadow-primary-500/20">
                    {initials}
                  </div>
                  <span className="hidden sm:inline text-sm text-gray-300 font-medium">
                    {user?.firstName}
                  </span>
                </div>
                <button
                  onClick={() => logout()}
                  className="p-1.5 sm:p-2 text-gray-500 hover:text-white transition-colors rounded-full hover:bg-gray-800"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-black bg-white rounded-full
                  hover:scale-105 hover:bg-gray-100 transition-all"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
