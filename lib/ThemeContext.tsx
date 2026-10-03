'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// External store subscription for system dark mode
function subscribeToSystemTheme(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getSystemSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getSystemServerSnapshot(): boolean {
  return false;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    try {
      const saved = localStorage.getItem('ilmflow_theme') as Theme | null;
      if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
    } catch {
      // Fallback
    }
    return 'system';
  });

  const prefersDark = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemSnapshot,
    getSystemServerSnapshot
  );

  const resolvedTheme: ResolvedTheme =
    theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : prefersDark ? 'dark' : 'light';

  // Synchronize DOM attributes with external system (DOM) without triggering cascading renders
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [resolvedTheme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('ilmflow_theme', newTheme);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }, [resolvedTheme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
