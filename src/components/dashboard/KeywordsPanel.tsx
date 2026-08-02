import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface KeywordsPanelProps {
  missingKeywords: string[];
}

export function KeywordsPanel({ missingKeywords }: KeywordsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Missing Keywords</CardTitle>
        <Badge tone="rose">{missingKeywords.length}</Badge>
      </CardHeader>
      <CardBody>
        {missingKeywords.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No major keyword gaps found — nice work.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((kw) => (
              <Badge key={kw} tone="rose">
                {kw}
              </Badge>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
