import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ResumeUploaderProps {
  onFileSelect: (file: File) => void;
  fileName?: string | null;
  error?: string | null;
}

export function ResumeUploader({ onFileSelect, fileName, error }: ResumeUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) onFileSelect(file);
    },
    [onFileSelect]
  );

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        className={cn(
          'relative cursor-pointer rounded-2xl border-2 border-dashed transition-colors duration-200 p-10 text-center',
          isDragging
            ? 'border-signal-amber bg-signal-amber/5'
            : 'border-light-border dark:border-base-border hover:border-signal-amber/50',
          error && 'border-signal-rose/60'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileSelect(file);
          }}
        />

        <motion.div
          animate={{ y: isDragging ? -4 : 0 }}
          className="mx-auto w-14 h-14 rounded-xl bg-signal-amber/10 flex items-center justify-center mb-4"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 16V4M12 4L7 9M12 4L17 9"
              stroke="#F5A623"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>

        {fileName ? (
          <div>
            <p className="font-display font-semibold text-slate-800 dark:text-white">{fileName}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Click to choose a different file</p>
          </div>
        ) : (
          <div>
            <p className="font-display font-semibold text-slate-800 dark:text-white">
              Drop your resume here, or <span className="text-signal-amber">browse</span>
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">PDF only, up to 10MB</p>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-signal-rose">{error}</p>}
    </div>
  );
}
