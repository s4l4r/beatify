import { create } from 'zustand';
import type { RegisterData, UserResponse } from '@/types';
import * as authApi from '@/api/auth';

interface AuthState {
  token: string | null;
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem('beatify-token'),
  user: null,
  isAuthenticated: !!localStorage.getItem('beatify-token'),
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(email, password);
      localStorage.setItem('beatify-token', response.token);
      set({
        token: response.token,
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      set({
        isLoading: false,
        error: 'Invalid email or password',
      });
      throw err;
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.register(data);
      localStorage.setItem('beatify-token', response.token);
      set({
        token: response.token,
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      set({
        isLoading: false,
        error: 'Registration failed. Please try again.',
      });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('beatify-token');
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },

  loadUser: async () => {
    const { token } = get();
    if (!token) return;

    set({ isLoading: true });
    try {
      const user = await authApi.getMe();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      localStorage.removeItem('beatify-token');
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
