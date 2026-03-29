import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.04] dark:border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-[8px] bg-black dark:bg-white flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" className="dark:stroke-black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <span className="font-semibold text-sm tracking-tight">TripPlanner</span>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] max-w-xs leading-relaxed">
              Plan trips together through iMessage.<br />
              Powered by AI.
            </p>
          </div>

          <div className="flex gap-16 text-[13px]">
            <div className="flex flex-col gap-2.5">
              <span className="font-medium text-[var(--text-tertiary)] text-[11px] uppercase tracking-widest">Product</span>
              <Link href="/#features" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Features</Link>
              <Link href="/#how-it-works" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">How It Works</Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="font-medium text-[var(--text-tertiary)] text-[11px] uppercase tracking-widest">Legal</span>
              <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Privacy</Link>
              <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Terms</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-black/[0.04] dark:border-white/[0.06] text-center text-[11px] text-[var(--text-tertiary)]">
          &copy; {new Date().getFullYear()} TripPlanner. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
