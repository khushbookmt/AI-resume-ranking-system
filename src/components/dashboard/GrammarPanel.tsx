import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { GrammarSuggestion } from '@/types';

interface GrammarPanelProps {
  suggestions: GrammarSuggestion[];
}

const severityTone: Record<GrammarSuggestion['severity'], 'rose' | 'amber' | 'neutral'> = {
  high: 'rose',
  medium: 'amber',
  low: 'neutral',
};

export function GrammarPanel({ suggestions }: GrammarPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grammar & Writing Suggestions</CardTitle>
      </CardHeader>
      <CardBody>
        {suggestions.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No grammar issues found.</p>
        ) : (
          <ul className="space-y-3">
            {suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-base-raised">
                <Badge tone={severityTone[s.severity]} className="mt-0.5 shrink-0">
                  {s.severity}
                </Badge>
                <div>
                  <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">{s.issue}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{s.suggestion}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
