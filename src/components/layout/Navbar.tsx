import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const location = useLocation();
  const isAnalyze = location.pathname === '/analyze';

  return (
    <header className="sticky top-0 z-40 backdrop-blur-lg bg-light/80 dark:bg-base/80 border-b border-light-border dark:border-base-border">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-signal-amber/15 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
              <path d="M9 8H23V24L18 20L13 24V16" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 12H19" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="font-display font-bold text-lg text-slate-800 dark:text-white">ScanCV</span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {!isAnalyze && (
            <Link to="/analyze">
              <Button size="sm">Analyze Resume</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
