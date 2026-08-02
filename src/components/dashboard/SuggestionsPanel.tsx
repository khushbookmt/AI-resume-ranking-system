import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';

interface SuggestionsPanelProps {
  suggestions: string[];
}

export function SuggestionsPanel({ suggestions }: SuggestionsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Improvement Suggestions</CardTitle>
      </CardHeader>
      <CardBody>
        {suggestions.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No suggestions — this resume looks solid.</p>
        ) : (
          <ol className="space-y-3">
            {suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="w-6 h-6 rounded-full bg-signal-amber/15 text-signal-amber font-mono text-xs font-semibold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
        )}
      </CardBody>
    </Card>
  );
}
