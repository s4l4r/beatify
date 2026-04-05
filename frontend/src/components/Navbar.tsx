import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Sun, Moon, Menu, X, LogOut, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isDark, toggle: toggleTheme } = useThemeStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive(path)
        ? 'text-white dark:text-white text-gray-900 bg-gray-800 dark:bg-gray-800 bg-gray-200'
        : 'text-gray-300 dark:text-gray-300 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-800 hover:bg-gray-200'
    }`;

  return (
    <nav
      className="sticky top-0 z-20 bg-gray-900/80 dark:bg-gray-900/80 bg-white/80 backdrop-blur-lg
        border-b border-gray-800/50 dark:border-gray-800/50 border-gray-200/50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link
            to="/home"
            className="flex items-center gap-2 flex-shrink-0"
            aria-label="Beatify home"
          >
            <span className="text-2xl font-logo text-primary-500">Beatify</span>
          </Link>

          {/* Center: Nav links (desktop) */}
          <div className="hidden sm:flex items-center gap-2">
            <Link to="/home" className={navLinkClass('/home')}>
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link to="/search" className={navLinkClass('/search')}>
              <Search className="w-4 h-4" />
              Search
            </Link>
          </div>

          {/* Right: Theme toggle + Auth */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-white dark:hover:text-white hover:text-gray-900
                transition-colors rounded-md"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-300 dark:text-gray-300 text-gray-600">
                  <User className="w-4 h-4" />
                  <span>
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-400
                    hover:text-white dark:hover:text-white hover:text-gray-900 transition-colors rounded-md
                    hover:bg-gray-800 dark:hover:bg-gray-800 hover:bg-gray-200"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-1.5 text-sm font-medium text-white bg-primary-600 rounded-full
                  hover:bg-primary-500 transition-colors"
              >
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-800 dark:border-gray-800 border-gray-200 bg-gray-900 dark:bg-gray-900 bg-white">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/home"
              className={navLinkClass('/home')}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              to="/search"
              className={navLinkClass('/search')}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Search className="w-4 h-4" />
              Search
            </Link>

            <div className="border-t border-gray-800 dark:border-gray-800 border-gray-200 pt-2 mt-2">
              <button
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 dark:text-gray-300 text-gray-600
                  hover:text-white dark:hover:text-white hover:text-gray-900 rounded-md"
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
                {isDark ? 'Light mode' : 'Dark mode'}
              </button>

              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300">
                    <User className="w-4 h-4" />
                    {user?.firstName} {user?.lastName}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-400
                      hover:text-white rounded-md"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-primary-500 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
