import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const variantClasses: Record<string, string> = {
  primary:
    'bg-signal-amber text-base hover:bg-signal-amber/90 shadow-lg shadow-signal-amber/20 disabled:bg-signal-amber/50',
  secondary:
    'bg-base-raised text-slate-100 border border-base-border hover:bg-base-border dark:bg-base-raised dark:border-base-border light:bg-light-raised light:text-slate-800',
  ghost:
    'bg-transparent text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
};

const sizeClasses: Record<string, string> = {
  sm: 'text-sm px-3 py-1.5 rounded-lg',
  md: 'text-sm px-5 py-2.5 rounded-xl',
  lg: 'text-base px-7 py-3.5 rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'font-display font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
