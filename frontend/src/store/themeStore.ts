import { create } from 'zustand';

interface ThemeState {
  isDark: boolean;
  toggle: () => void;
}

function getInitialTheme(): boolean {
  const stored = localStorage.getItem('beatify-theme');
  if (stored !== null) {
    return stored === 'dark';
  }
  return true; // dark by default
}

function applyTheme(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// Apply initial theme immediately
const initialDark = getInitialTheme();
applyTheme(initialDark);

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: initialDark,
  toggle: () => {
    set((state) => {
      const newDark = !state.isDark;
      localStorage.setItem('beatify-theme', newDark ? 'dark' : 'light');
      applyTheme(newDark);
      return { isDark: newDark };
    });
  },
}));
