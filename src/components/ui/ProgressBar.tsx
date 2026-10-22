import { motion } from 'framer-motion';
import { clampScore, scoreColor } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  label?: string;
  showValue?: boolean;
}

export function ProgressBar({ value, label, showValue = true }: ProgressBarProps) {
  const pct = clampScore(value);
  const color = scoreColor(pct);

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>}
          {showValue && (
            <span className="text-sm font-mono font-semibold text-slate-800 dark:text-white">{pct}%</span>
          )}
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-base-raised overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
