import { z } from 'zod';
import type { AnalysisRequest, ResumeAnalysis } from '@/types';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;
const MODEL = (import.meta.env.VITE_OPENROUTER_MODEL as string) || 'anthropic/claude-3.5-sonnet';

export class OpenRouterError extends Error {}

const analysisSchema = z.object({
  atsScore: z.number().min(0).max(100),
  resumeScore: z.number().min(0).max(100),
  jdMatchPercent: z.number().min(0).max(100),
  missingKeywords: z.array(z.string()).default([]),
  missingSkills: z.array(z.string()).default([]),
  technicalSkills: z.array(z.string()).default([]),
  softSkills: z.array(z.string()).default([]),
  grammarSuggestions: z
    .array(
      z.object({
        issue: z.string(),
        suggestion: z.string(),
        severity: z.enum(['low', 'medium', 'high']).default('medium'),
      })
    )
    .default([]),
  strengths: z.array(z.string()).default([]),
  weaknesses: z.array(z.string()).default([]),
  improvementSuggestions: z.array(z.string()).default([]),
  recommendedCertifications: z.array(z.string()).default([]),
  recommendedProjects: z.array(z.string()).default([]),
  interviewQuestions: z
    .array(
      z.object({
        question: z.string(),
        category: z.string().default('General'),
      })
    )
    .default([]),
  summary: z.string().default(''),
});

function buildSystemPrompt(): string {
  return `You are an expert technical recruiter and ATS (Applicant Tracking System) specialist with 15 years of experience reviewing resumes for top tech companies.

Analyze the given resume against the given job description and return ONLY a single valid JSON object — no markdown fences, no preamble, no commentary — matching exactly this shape:

{
  "atsScore": number (0-100, how well the resume would parse and rank in an ATS),
  "resumeScore": number (0-100, overall resume quality: clarity, structure, impact),
  "jdMatchPercent": number (0-100, how well the resume matches the job description),
  "missingKeywords": string[] (important keywords from the JD absent in the resume),
  "missingSkills": string[] (skills the JD wants that the resume lacks),
  "technicalSkills": string[] (technical skills found in the resume),
  "softSkills": string[] (soft skills found in the resume),
  "grammarSuggestions": [{ "issue": string, "suggestion": string, "severity": "low"|"medium"|"high" }],
  "strengths": string[] (specific strengths of this resume for this JD),
  "weaknesses": string[] (specific weaknesses of this resume for this JD),
  "improvementSuggestions": string[] (concrete, actionable improvements),
  "recommendedCertifications": string[] (certifications that would strengthen candidacy),
  "recommendedProjects": string[] (project ideas that would strengthen candidacy),
  "interviewQuestions": [{ "question": string, "category": string }] (6-10 likely interview questions based on the JD and resume gaps),
  "summary": string (2-3 sentence overall assessment)
}

Be specific and reference actual content from the resume and job description. Return strictly valid JSON with no trailing commas and no extra keys.`;
}

function buildUserPrompt({ resumeText, jobDescription }: AnalysisRequest): string {
  return `RESUME TEXT:
"""
${resumeText}
"""

JOB DESCRIPTION:
"""
${jobDescription}
"""

Analyze the resume against the job description and return the JSON object as specified.`;
}

function stripJsonFences(text: string): string {
  return text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
}

export async function analyzeResume(request: AnalysisRequest): Promise<ResumeAnalysis> {
  if (!API_KEY) {
    throw new OpenRouterError(
      'Missing OpenRouter API key. Add VITE_OPENROUTER_API_KEY to your .env file.'
    );
  }

  let response: Response;
  try {
    response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'ScanCV Resume Analyzer',
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.3,
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          { role: 'user', content: buildUserPrompt(request) },
        ],
      }),
    });
  } catch {
    throw new OpenRouterError('Network error while contacting OpenRouter. Check your connection.');
  }

  if (!response.ok) {
    const status = response.status;
    if (status === 401) {
      throw new OpenRouterError('Invalid OpenRouter API key.');
    }
    if (status === 429) {
      throw new OpenRouterError('Rate limited by OpenRouter. Please try again shortly.');
    }
    const bodyText = await response.text().catch(() => '');
    throw new OpenRouterError(`OpenRouter request failed (${status}). ${bodyText.slice(0, 200)}`);
  }

  const data = await response.json();
  const content: string | undefined = data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new OpenRouterError('OpenRouter returned an empty response.');
  }

  const cleaned = stripJsonFences(content);

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(cleaned);
  } catch {
    throw new OpenRouterError('Could not parse the AI response as JSON. Please try again.');
  }

  const result = analysisSchema.safeParse(parsedJson);
  if (!result.success) {
    throw new OpenRouterError('AI response did not match the expected format. Please try again.');
  }

  return result.data;
}
