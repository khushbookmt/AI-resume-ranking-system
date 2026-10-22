import { useCallback, useState } from 'react';
import { extractTextFromPdf, PdfParseError } from '@/lib/pdfParser';
import { analyzeResume, OpenRouterError } from '@/lib/openrouter';
import type { AnalysisStatus, AppError, ResumeAnalysis } from '@/types';

interface UseResumeAnalysisResult {
  status: AnalysisStatus;
  error: AppError | null;
  analysis: ResumeAnalysis | null;
  resumeText: string | null;
  fileName: string | null;
  setResumeFile: (file: File) => Promise<void>;
  runAnalysis: (jobDescription: string) => Promise<void>;
  reset: () => void;
}

export function useResumeAnalysis(): UseResumeAnalysisResult {
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [error, setError] = useState<AppError | null>(null);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const setResumeFile = useCallback(async (file: File) => {
    setError(null);
    setStatus('parsing');
    try {
      const text = await extractTextFromPdf(file);
      setResumeText(text);
      setFileName(file.name);
      setStatus('idle');
    } catch (err) {
      const message =
        err instanceof PdfParseError ? err.message : 'Failed to read the PDF. Please try another file.';
      setError({ message });
      setStatus('error');
    }
  }, []);

  const runAnalysis = useCallback(
    async (jobDescription: string) => {
      if (!resumeText) {
        setError({ message: 'Please upload a resume first.' });
        setStatus('error');
        return;
      }
      setError(null);
      setStatus('analyzing');
      try {
        const result = await analyzeResume({ resumeText, jobDescription });
        setAnalysis(result);
        setStatus('success');
      } catch (err) {
        const message =
          err instanceof OpenRouterError ? err.message : 'Something went wrong while analyzing your resume.';
        setError({ message });
        setStatus('error');
      }
    },
    [resumeText]
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    setAnalysis(null);
    setResumeText(null);
    setFileName(null);
  }, []);

  return { status, error, analysis, resumeText, fileName, setResumeFile, runAnalysis, reset };
}
