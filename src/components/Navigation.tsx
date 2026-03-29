"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navigation() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 dark:bg-black/70 backdrop-blur-2xl border-b border-black/[0.04] dark:border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-[10px] bg-black dark:bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" className="dark:stroke-black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className="font-semibold text-[15px] tracking-tight">TripPlanner</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <Link
            href="/auth/signin"
            className="text-[13px] font-medium px-4 py-1.5 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity"
          >
            Sign In
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
