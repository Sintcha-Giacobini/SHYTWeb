"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";

export default function JoinTripPage() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="card p-8 md:p-12 max-w-sm w-full text-center"
      >
        {/* Icon */}
        <div className="w-16 h-16 rounded-[18px] bg-black dark:bg-white flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" className="dark:stroke-black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3V7z" />
            <path d="M9 4v13" />
            <path d="M15 7v13" />
          </svg>
        </div>

        <p className="text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-widest mb-2">
          You&apos;ve been invited
        </p>
        <h1 className="text-title-2 mb-1">Tokyo Adventure</h1>
        <p className="text-[14px] text-[var(--text-secondary)] mb-1">Apr 15 – 22, 2026</p>
        <p className="text-[12px] text-[var(--text-tertiary)] mb-8">
          Code: <span className="font-mono">{code}</span>
        </p>

        {/* Participants */}
        <div className="flex justify-center -space-x-2 mb-8">
          {["A", "J", "S"].map((name) => (
            <div key={name} className="w-10 h-10 rounded-full bg-black dark:bg-white border-2 border-white dark:border-black flex items-center justify-center">
              <span className="text-xs font-bold text-white dark:text-black">{name}</span>
            </div>
          ))}
          <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] dark:bg-[var(--bg-dark-tertiary)] border-2 border-white dark:border-black flex items-center justify-center">
            <span className="text-[11px] font-medium text-[var(--text-tertiary)]">+1</span>
          </div>
        </div>

        <button
          onClick={() => router.push(`/trip/trip-tokyo-2026`)}
          className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-medium text-[15px] hover:opacity-80 transition-opacity active:scale-[0.97]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Sign in with Apple
        </button>

        <p className="text-[10px] text-[var(--text-tertiary)] mt-4">
          By signing in, you agree to our Terms and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
