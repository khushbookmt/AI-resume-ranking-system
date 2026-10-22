import { motion } from 'framer-motion';
import { clampScore, scoreColor, scoreLabel } from '@/lib/utils';

interface ScoreGaugeProps {
  value: number;
  label: string;
  size?: number;
}

export function ScoreGauge({ value, label, size = 140 }: ScoreGaugeProps) {
  const pct = clampScore(value);
  const color = scoreColor(pct);
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={10}
            className="stroke-slate-200 dark:stroke-base-raised"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-mono font-bold text-slate-800 dark:text-white">{pct}</span>
          <span className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">/ 100</span>
        </div>
      </div>
      <div className="text-center">
        <p className="font-display font-semibold text-sm text-slate-800 dark:text-white">{label}</p>
        <p className="text-xs font-medium" style={{ color }}>
          {scoreLabel(pct)}
        </p>
      </div>
    </div>
  );
}
