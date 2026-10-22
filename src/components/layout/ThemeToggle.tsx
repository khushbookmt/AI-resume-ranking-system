import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className="relative w-14 h-8 rounded-full bg-slate-200 dark:bg-base-raised border border-light-border dark:border-base-border transition-colors flex items-center px-1"
    >
      <span
        className={`w-6 h-6 rounded-full bg-white dark:bg-signal-amber shadow-md transform transition-transform duration-300 flex items-center justify-center text-[10px] ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
