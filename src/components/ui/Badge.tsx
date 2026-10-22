import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  tone?: 'neutral' | 'amber' | 'teal' | 'rose' | 'emerald' | 'indigo';
  className?: string;
}

const toneClasses: Record<string, string> = {
  neutral: 'bg-slate-100 text-slate-700 dark:bg-base-raised dark:text-slate-300',
  amber: 'bg-signal-amber/15 text-signal-amber',
  teal: 'bg-signal-teal/15 text-signal-teal',
  rose: 'bg-signal-rose/15 text-signal-rose',
  emerald: 'bg-signal-emerald/15 text-signal-emerald',
  indigo: 'bg-signal-indigo/15 text-signal-indigo',
};

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
