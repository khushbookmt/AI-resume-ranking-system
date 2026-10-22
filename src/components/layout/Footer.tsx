export function Footer() {
  return (
    <footer className="border-t border-light-border dark:border-base-border mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} ScanCV. Built for job seekers who read the fine print.
        </p>
        <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <span>Powered by OpenRouter</span>
        </div>
      </div>
    </footer>
  );
}
