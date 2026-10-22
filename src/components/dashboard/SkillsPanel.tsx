import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface SkillsPanelProps {
  technicalSkills: string[];
  softSkills: string[];
  missingSkills: string[];
}

function SkillGroup({
  title,
  skills,
  tone,
  empty,
}: {
  title: string;
  skills: string[];
  tone: 'teal' | 'indigo' | 'rose';
  empty: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400 mb-2">
        {title}
      </p>
      {skills.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500">{empty}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <Badge key={s} tone={tone}>
              {s}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export function SkillsPanel({ technicalSkills, softSkills, missingSkills }: SkillsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Breakdown</CardTitle>
      </CardHeader>
      <CardBody className="space-y-5">
        <SkillGroup title="Technical Skills" skills={technicalSkills} tone="teal" empty="None detected." />
        <SkillGroup title="Soft Skills" skills={softSkills} tone="indigo" empty="None detected." />
        <SkillGroup
          title="Missing Skills (from JD)"
          skills={missingSkills}
          tone="rose"
          empty="No critical skill gaps found."
        />
      </CardBody>
    </Card>
  );
}
