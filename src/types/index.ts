// Core domain types shared across the app

export interface ScoreBreakdown {
  atsScore: number; // 0-100
  resumeScore: number; // 0-100
  jdMatchPercent: number; // 0-100
}

export interface SkillsAnalysis {
  technicalSkills: string[];
  softSkills: string[];
  missingSkills: string[];
}

export interface GrammarSuggestion {
  issue: string;
  suggestion: string;
  severity: 'low' | 'medium' | 'high';
}

export interface InterviewQuestion {
  question: string;
  category: string;
}

export interface ResumeAnalysis extends ScoreBreakdown, SkillsAnalysis {
  missingKeywords: string[];
  grammarSuggestions: GrammarSuggestion[];
  strengths: string[];
  weaknesses: string[];
  improvementSuggestions: string[];
  recommendedCertifications: string[];
  recommendedProjects: string[];
  interviewQuestions: InterviewQuestion[];
  summary: string;
}

export interface AnalysisRequest {
  resumeText: string;
  jobDescription: string;
}

export type AnalysisStatus = 'idle' | 'parsing' | 'analyzing' | 'success' | 'error';

export interface AppError {
  message: string;
  detail?: string;
}
