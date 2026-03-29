"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const tabs = ["Overview", "Itinerary", "Map", "Preferences", "Votes"] as const;
export type TabName = (typeof tabs)[number];

interface TabNavigationProps {
  active: TabName;
  onChange: (tab: TabName) => void;
}

export default function TabNavigation({ active, onChange }: TabNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeEl = container.querySelector(`[data-tab="${active}"]`) as HTMLElement;
    if (!activeEl) return;
    setIndicatorStyle({
      left: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
    });
  }, [active]);

  return (
    <div className="sticky top-14 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-2xl border-b border-[var(--border)] -mx-6 px-6">
      <div ref={containerRef} className="relative flex gap-0.5 overflow-x-auto py-1.5">
        <motion.div
          className="absolute bottom-0 h-[2px] bg-black dark:bg-white rounded-full"
          animate={indicatorStyle}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
        {tabs.map((tab) => (
          <button
            key={tab}
            data-tab={tab}
            onClick={() => onChange(tab)}
            className={`px-4 py-2 text-[13px] font-medium rounded-lg whitespace-nowrap transition-colors ${
              active === tab
                ? "text-black dark:text-white"
                : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
