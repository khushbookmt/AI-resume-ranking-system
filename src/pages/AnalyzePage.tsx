import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeUploader } from '@/components/upload/ResumeUploader';
import { JobDescriptionInput } from '@/components/upload/JobDescriptionInput';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useResumeAnalysis } from '@/hooks/useResumeAnalysis';
import { DashboardPage } from './DashboardPage';

const formSchema = z.object({
  jobDescription: z
    .string()
    .min(50, 'Please paste the full job description (at least 50 characters).'),
});

type FormValues = z.infer<typeof formSchema>;

export function AnalyzePage() {
  const { status, error, analysis, fileName, setResumeFile, runAnalysis, reset } = useResumeAnalysis();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { jobDescription: '' },
  });

  const isParsing = status === 'parsing';
  const isAnalyzing = status === 'analyzing';
  const isBusy = isParsing || isAnalyzing;

  const onSubmit = async (values: FormValues) => {
    await runAnalysis(values.jobDescription);
  };

  if (status === 'success' && analysis) {
    return <DashboardPage analysis={analysis} fileName={fileName} onReset={reset} />;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-14">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-widest text-signal-amber font-semibold mb-2">Step 1 of 1</p>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-800 dark:text-white">
          Upload &amp; Analyze
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Drop in your resume and the job description — we'll do the rest.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
            1. Your resume (PDF)
          </label>
          <ResumeUploader
            onFileSelect={(file) => void setResumeFile(file)}
            fileName={fileName}
            error={status === 'error' && !fileName ? error?.message : null}
          />
          {isParsing && (
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Spinner size={14} /> Extracting text from PDF…
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
            2. Job description
          </label>
          <JobDescriptionInput {...register('jobDescription')} error={errors.jobDescription?.message} />
        </div>

        <AnimatePresence>
          {error && status === 'error' && fileName && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-xl bg-signal-rose/10 border border-signal-rose/30 px-4 py-3 text-sm text-signal-rose"
            >
              {error.message}
            </motion.div>
          )}
        </AnimatePresence>

        <Button type="submit" size="lg" disabled={isBusy || !fileName} className="w-full">
          {isAnalyzing ? (
            <>
              <Spinner size={16} /> Analyzing your resume…
            </>
          ) : (
            'Analyze Resume'
          )}
        </Button>
      </form>
    </div>
  );
}
