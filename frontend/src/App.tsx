import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Home from '@/pages/Home';
import AlbumPage from '@/pages/AlbumPage';
import ArtistPage from '@/pages/ArtistPage';
import BandPage from '@/pages/BandPage';
import SearchPage from '@/pages/SearchPage';
import LoginPage from '@/pages/LoginPage';
import LibraryPage from '@/pages/LibraryPage';
import FavoritesPage from '@/pages/FavoritesPage';
import PlaylistDetailPage from '@/pages/PlaylistDetailPage';
import { useAuthStore } from '@/store/authStore';
import { useFavoritesStore } from '@/store/favoritesStore';

export function App() {
  const loadUser = useAuthStore((s) => s.loadUser);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const loadFavorites = useFavoritesStore((s) => s.load);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (isAuthenticated) {
      loadFavorites();
    }
  }, [isAuthenticated, loadFavorites]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/albums/:id"
            element={<ProtectedRoute><AlbumPage /></ProtectedRoute>}
          />
          <Route
            path="/artists/:id"
            element={<ProtectedRoute><ArtistPage /></ProtectedRoute>}
          />
          <Route
            path="/bands/:id"
            element={<ProtectedRoute><BandPage /></ProtectedRoute>}
          />
          <Route
            path="/search"
            element={<ProtectedRoute><SearchPage /></ProtectedRoute>}
          />
          <Route
            path="/favorites"
            element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>}
          />
          <Route
            path="/library"
            element={<ProtectedRoute><LibraryPage /></ProtectedRoute>}
          />
          <Route
            path="/playlists/:id"
            element={<ProtectedRoute><PlaylistDetailPage /></ProtectedRoute>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
