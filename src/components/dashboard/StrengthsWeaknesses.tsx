import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';

interface StrengthsWeaknessesProps {
  strengths: string[];
  weaknesses: string[];
}

function ListCard({
  title,
  items,
  icon,
  tone,
}: {
  title: string;
  items: string[];
  icon: string;
  tone: 'emerald' | 'rose';
}) {
  const dotClass = tone === 'emerald' ? 'bg-signal-emerald' : 'bg-signal-rose';
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {icon} {title}
        </CardTitle>
      </CardHeader>
      <CardBody>
        {items.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">Nothing notable found.</p>
        ) : (
          <ul className="space-y-2.5">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${dotClass}`} />
                {item}
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}

export function StrengthsWeaknesses({ strengths, weaknesses }: StrengthsWeaknessesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ListCard title="Strengths" items={strengths} icon="✓" tone="emerald" />
      <ListCard title="Weaknesses" items={weaknesses} icon="!" tone="rose" />
    </div>
  );
}
