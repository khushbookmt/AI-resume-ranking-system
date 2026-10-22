import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';

interface CertificationsPanelProps {
  certifications: string[];
}

export function CertificationsPanel({ certifications }: CertificationsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>🎓 Recommended Certifications</CardTitle>
      </CardHeader>
      <CardBody>
        {certifications.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No specific certifications recommended.</p>
        ) : (
          <ul className="space-y-2.5">
            {certifications.map((c, i) => (
              <li
                key={i}
                className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-signal-indigo mt-1.5 shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
