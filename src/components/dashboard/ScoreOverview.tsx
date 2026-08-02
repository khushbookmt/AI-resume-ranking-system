import { Card, CardBody } from '@/components/ui/Card';
import { ScoreGauge } from '@/components/ui/ScoreGauge';
import type { ResumeAnalysis } from '@/types';

interface ScoreOverviewProps {
  analysis: ResumeAnalysis;
}

export function ScoreOverview({ analysis }: ScoreOverviewProps) {
  return (
    <Card>
      <CardBody className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 place-items-center">
          <ScoreGauge value={analysis.atsScore} label="ATS Score" />
          <ScoreGauge value={analysis.resumeScore} label="Resume Score" />
          <ScoreGauge value={analysis.jdMatchPercent} label="JD Match" />
        </div>
        {analysis.summary && (
          <p className="mt-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-light-border dark:border-base-border pt-5">
            {analysis.summary}
          </p>
        )}
      </CardBody>
    </Card>
  );
}
