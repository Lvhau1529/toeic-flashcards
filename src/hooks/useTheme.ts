import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { ThemeMode } from '../types';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<ThemeMode>('toeic_theme', 'light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}
