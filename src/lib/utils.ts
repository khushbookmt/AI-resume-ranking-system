export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function clampScore(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function scoreLabel(score: number): string {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Needs Work';
  return 'Weak';
}

export function scoreColor(score: number): string {
  if (score >= 85) return '#34D399'; // emerald
  if (score >= 70) return '#2DD4BF'; // teal
  if (score >= 50) return '#F5A623'; // amber
  return '#FB7185'; // rose
}

export function truncate(text: string, max = 160): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}
