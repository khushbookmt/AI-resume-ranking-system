import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <p className="font-mono text-signal-amber text-sm mb-2">404</p>
      <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white mb-3">Page not found</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
