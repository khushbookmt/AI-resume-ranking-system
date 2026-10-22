import { motion } from 'framer-motion';
import { ScoreOverview } from '@/components/dashboard/ScoreOverview';
import { RadarChartCard } from '@/components/dashboard/RadarChartCard';
import { KeywordsPanel } from '@/components/dashboard/KeywordsPanel';
import { SkillsPanel } from '@/components/dashboard/SkillsPanel';
import { GrammarPanel } from '@/components/dashboard/GrammarPanel';
import { StrengthsWeaknesses } from '@/components/dashboard/StrengthsWeaknesses';
import { SuggestionsPanel } from '@/components/dashboard/SuggestionsPanel';
import { CertificationsPanel } from '@/components/dashboard/CertificationsPanel';
import { ProjectsPanel } from '@/components/dashboard/ProjectsPanel';
import { InterviewQuestionsPanel } from '@/components/dashboard/InterviewQuestionsPanel';
import { Button } from '@/components/ui/Button';
import type { ResumeAnalysis } from '@/types';

interface DashboardPageProps {
  analysis: ResumeAnalysis;
  fileName: string | null;
  onReset: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function DashboardPage({ analysis, fileName, onReset }: DashboardPageProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-signal-amber font-semibold mb-1">
            Analysis Complete
          </p>
          <h1 className="text-2xl font-display font-bold text-slate-800 dark:text-white">
            Results for {fileName ?? 'your resume'}
          </h1>
        </div>
        <Button variant="secondary" size="sm" onClick={onReset}>
          Analyze Another Resume
        </Button>
      </div>

      <div className="space-y-6">
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.4 }}>
          <ScoreOverview analysis={analysis} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            className="lg:col-span-1"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <RadarChartCard analysis={analysis} />
          </motion.div>
          <motion.div
            className="lg:col-span-2"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <SkillsPanel
              technicalSkills={analysis.technicalSkills}
              softSkills={analysis.softSkills}
              missingSkills={analysis.missingSkills}
            />
          </motion.div>
        </div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.4, delay: 0.15 }}>
          <KeywordsPanel missingKeywords={analysis.missingKeywords} />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.4, delay: 0.2 }}>
          <StrengthsWeaknesses strengths={analysis.strengths} weaknesses={analysis.weaknesses} />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.4, delay: 0.25 }}>
          <SuggestionsPanel suggestions={analysis.improvementSuggestions} />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.4, delay: 0.3 }}>
          <GrammarPanel suggestions={analysis.grammarSuggestions} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.4, delay: 0.35 }}>
            <CertificationsPanel certifications={analysis.recommendedCertifications} />
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.4, delay: 0.4 }}>
            <ProjectsPanel projects={analysis.recommendedProjects} />
          </motion.div>
        </div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.4, delay: 0.45 }}>
          <InterviewQuestionsPanel questions={analysis.interviewQuestions} />
        </motion.div>
      </div>
    </div>
  );
}
