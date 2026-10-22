import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface JobDescriptionInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const JobDescriptionInput = forwardRef<HTMLTextAreaElement, JobDescriptionInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div>
        <textarea
          ref={ref}
          rows={10}
          placeholder="Paste the full job description here — the more detail, the more precise the match analysis."
          className={cn(
            'w-full rounded-2xl border p-4 text-sm bg-white dark:bg-base-surface text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-y focus:outline-none focus:ring-2 focus:ring-signal-amber/50 transition-shadow',
            error
              ? 'border-signal-rose/60'
              : 'border-light-border dark:border-base-border',
            className
          )}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-signal-rose">{error}</p>}
      </div>
    );
  }
);

JobDescriptionInput.displayName = 'JobDescriptionInput';
