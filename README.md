# ScanCV — AI Resume Analyzer

A production-ready AI resume analyzer: upload a PDF resume, paste a job description, and get an
ATS score, JD match %, missing keywords/skills, grammar suggestions, strengths/weaknesses,
recommended certifications & projects, and likely interview questions — all in one dashboard.

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS
- React Router
- React Hook Form + Zod
- Framer Motion
- Recharts
- pdfjs-dist (client-side PDF text extraction)
- OpenRouter API (LLM analysis)

## Getting Started

```bash
npm install
cp .env.example .env
# edit .env and add your OpenRouter API key
npm run dev
```

The app runs at `http://localhost:5173`.

## Environment Variables

Create a `.env` file (see `.env.example`):

```
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
VITE_OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
```

Get an API key at https://openrouter.ai/keys. You can swap `VITE_OPENROUTER_MODEL` for any
model available on OpenRouter (e.g. `openai/gpt-4o-mini`, `google/gemini-1.5-pro`).

> **Note:** This app calls the OpenRouter API directly from the browser using a `VITE_` env
> variable, which means the key is exposed client-side. This is fine for local use, demos, and
> personal projects. For a public production deployment, put the OpenRouter call behind a small
> serverless function (e.g. a Vercel API route) so the key stays server-side.

## Project Structure

```
src/
  components/
    layout/      Navbar, Footer, ThemeToggle
    ui/           Button, Card, Badge, ProgressBar, ScoreGauge, Spinner
    upload/       ResumeUploader, JobDescriptionInput
    dashboard/    All result panels (scores, skills, keywords, grammar, etc.)
  context/         ThemeContext (dark/light mode)
  hooks/           useResumeAnalysis (PDF parsing + AI analysis orchestration)
  lib/             pdfParser.ts, openrouter.ts, utils.ts
  pages/           LandingPage, AnalyzePage, DashboardPage, NotFoundPage
  types/           Shared TypeScript types
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in Vercel.
3. Add the environment variables (`VITE_OPENROUTER_API_KEY`, `VITE_OPENROUTER_MODEL`) in the
   Vercel project settings.
4. Deploy — the included `vercel.json` handles SPA routing rewrites.

## License

MIT
