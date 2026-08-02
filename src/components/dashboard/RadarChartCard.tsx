import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import type { ResumeAnalysis } from '@/types';

interface RadarChartCardProps {
  analysis: ResumeAnalysis;
}

export function RadarChartCard({ analysis }: RadarChartCardProps) {
  const data = [
    { metric: 'ATS Score', value: analysis.atsScore },
    { metric: 'Resume Quality', value: analysis.resumeScore },
    { metric: 'JD Match', value: analysis.jdMatchPercent },
    {
      metric: 'Skill Coverage',
      value: Math.max(
        0,
        100 - Math.min(100, analysis.missingSkills.length * 12)
      ),
    },
    {
      metric: 'Keyword Coverage',
      value: Math.max(
        0,
        100 - Math.min(100, analysis.missingKeywords.length * 10)
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Score Radar</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius="75%">
              <PolarGrid stroke="currentColor" className="text-slate-200 dark:text-base-border" />
              <PolarAngleAxis
                dataKey="metric"
                tick={{ fill: 'currentColor', fontSize: 11 }}
                className="text-slate-500 dark:text-slate-400"
              />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Score"
                dataKey="value"
                stroke="#F5A623"
                fill="#F5A623"
                fillOpacity={0.25}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}
