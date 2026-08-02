import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const metrics = [
  { label: 'ATS Score', value: '92', color: '#34D399' },
  { label: 'JD Match', value: '78', color: '#F5A623' },
  { label: 'Resume Score', value: '85', color: '#2DD4BF' },
];

const features = [
  {
    title: 'ATS-first scoring',
    desc: 'See exactly how applicant tracking systems parse and rank your resume before a recruiter ever does.',
  },
  {
    title: 'Line-by-line JD matching',
    desc: 'We diff your resume against the job description to surface missing keywords and skills instantly.',
  },
  {
    title: 'Actionable rewrites',
    desc: 'Get specific grammar fixes, project ideas, and certifications — not generic advice.',
  },
  {
    title: 'Interview prep, built in',
    desc: 'Likely interview questions generated from your own resume gaps and the target role.',
  },
];

const steps = [
  { n: '01', title: 'Upload your PDF', desc: 'Drag in your resume — we extract the text locally in your browser.' },
  { n: '02', title: 'Paste the job description', desc: 'Add the role you\u2019re targeting for a tailored match.' },
  { n: '03', title: 'Get your scan', desc: 'A full ATS + recruiter-style breakdown in under a minute.' },
];

export function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal-amber/10 text-signal-amber text-xs font-semibold uppercase tracking-wide mb-6">
              AI-powered resume scan
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold leading-[1.1] text-slate-800 dark:text-white">
              Know what the <span className="text-signal-amber">ATS</span> sees before you hit submit.
            </h1>
            <p className="mt-5 text-lg text-slate-500 dark:text-slate-400 max-w-lg">
              Upload your resume, paste the job description, and get an instant score, keyword
              gaps, and rewrite suggestions — built for candidates who want the callback.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link to="/analyze">
                <Button size="lg">Scan My Resume</Button>
              </Link>
              <span className="text-sm text-slate-400 dark:text-slate-500">No signup required</span>
            </div>
          </motion.div>

          {/* Signature: scanning resume card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="relative rounded-2xl border border-light-border dark:border-base-border bg-white dark:bg-base-surface shadow-2xl shadow-black/5 dark:shadow-black/40 p-6 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-signal-amber/40 animate-scan pointer-events-none" />
              <div className="space-y-2 mb-6">
                <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-base-raised" />
                <div className="h-2 w-1/2 rounded bg-slate-100 dark:bg-base-raised/70" />
              </div>
              <div className="space-y-2 mb-6">
                {[100, 90, 95, 70, 85].map((w, i) => (
                  <div
                    key={i}
                    className="h-2 rounded bg-slate-100 dark:bg-base-raised/70"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-light-border dark:border-base-border">
                {metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="font-mono font-bold text-lg" style={{ color: m.color }}>
                      {m.value}
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-800 dark:text-white">
            Everything a recruiter checks, automated.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-light-border dark:border-base-border bg-white dark:bg-base-surface"
            >
              <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-800 dark:text-white mb-12">
          Three steps to a sharper resume.
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.n}>
              <span className="font-mono text-signal-amber text-sm">{s.n}</span>
              <h3 className="font-display font-semibold text-lg text-slate-800 dark:text-white mt-2 mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-base dark:bg-base-surface border border-base-border p-12 text-center relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
            Ready to see your score?
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            It takes less than a minute and your data never leaves this session unnecessarily.
          </p>
          <Link to="/analyze">
            <Button size="lg">Scan My Resume</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
