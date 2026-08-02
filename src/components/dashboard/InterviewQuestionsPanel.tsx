import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { InterviewQuestion } from '@/types';

interface InterviewQuestionsPanelProps {
  questions: InterviewQuestion[];
}

export function InterviewQuestionsPanel({ questions }: InterviewQuestionsPanelProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>💬 Likely Interview Questions</CardTitle>
        <Badge tone="indigo">{questions.length}</Badge>
      </CardHeader>
      <CardBody>
        {questions.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No questions generated.</p>
        ) : (
          <div className="divide-y divide-light-border dark:divide-base-border">
            {questions.map((q, i) => (
              <button
                key={i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left py-3 flex items-start justify-between gap-3 group"
              >
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{q.question}</p>
                  {openIndex === i && (
                    <Badge tone="neutral" className="mt-2">
                      {q.category}
                    </Badge>
                  )}
                </div>
                <span className="text-slate-400 group-hover:text-signal-amber transition-colors shrink-0 mt-0.5">
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
