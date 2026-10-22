import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';

interface ProjectsPanelProps {
  projects: string[];
}

export function ProjectsPanel({ projects }: ProjectsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>🛠️ Recommended Projects</CardTitle>
      </CardHeader>
      <CardBody>
        {projects.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No specific projects recommended.</p>
        ) : (
          <ul className="space-y-2.5">
            {projects.map((p, i) => (
              <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-teal mt-1.5 shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
