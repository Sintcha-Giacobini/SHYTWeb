"use client";

import { GroupPreferences } from "@/lib/types";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

const labels: (keyof GroupPreferences)[] = ["pace", "budget", "adventure", "culture", "food", "nightlife"];
const labelDisplay: Record<string, string> = {
  pace: "Pace", budget: "Budget", adventure: "Adventure", culture: "Culture", food: "Food", nightlife: "Nightlife",
};

export default function PreferencesTab({ preferences }: { preferences: GroupPreferences }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.3 });
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = theme === "dark";
    const dpr = window.devicePixelRatio || 1;
    const size = Math.min(canvas.parentElement!.clientWidth, 360);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const maxR = size * 0.36;
    const levels = 5;
    const n = labels.length;
    const angleStep = (Math.PI * 2) / n;

    const getPoint = (i: number, r: number) => ({
      x: cx + r * Math.cos(angleStep * i - Math.PI / 2),
      y: cy + r * Math.sin(angleStep * i - Math.PI / 2),
    });

    let progress = 0;
    const duration = 60;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
      const fillColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
      const strokeColor = isDark ? "#FFFFFF" : "#000000";
      const labelColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

      for (let l = 1; l <= levels; l++) {
        ctx.beginPath();
        const r = (maxR / levels) * l;
        for (let i = 0; i <= n; i++) {
          const p = getPoint(i % n, r);
          if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let i = 0; i < n; i++) {
        const p = getPoint(i, maxR);
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = gridColor; ctx.lineWidth = 1; ctx.stroke();

        const labelP = getPoint(i, maxR + 22);
        ctx.fillStyle = labelColor;
        ctx.font = "500 11px -apple-system, Inter, sans-serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(labelDisplay[labels[i]], labelP.x, labelP.y);
      }

      const ease = Math.min(1, progress / duration);
      const t = 1 - Math.pow(1 - ease, 3);
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const val = preferences[labels[i % n]];
        const r = (val / 5) * maxR * t;
        const p = getPoint(i % n, r);
        if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.fillStyle = fillColor; ctx.fill();
      ctx.strokeStyle = strokeColor; ctx.lineWidth = 1.5; ctx.stroke();

      for (let i = 0; i < n; i++) {
        const val = preferences[labels[i]];
        const r = (val / 5) * maxR * t;
        const p = getPoint(i, r);
        ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = strokeColor; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "#000" : "#fff"; ctx.fill();
      }

      progress++;
      if (progress <= duration) requestAnimationFrame(draw);
    };

    draw();
  }, [isVisible, preferences, theme]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <h3 className="text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-6 text-center">
          Group Averages
        </h3>
        <div className="flex justify-center">
          <canvas ref={canvasRef} />
        </div>
      </motion.div>

      <div className="card p-6 space-y-4">
        <h3 className="text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Breakdown</h3>
        {labels.map((key, i) => (
          <motion.div key={key} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[13px] font-medium capitalize">{labelDisplay[key]}</span>
              <span className="text-[12px] text-[var(--text-tertiary)] tabular-nums">{preferences[key].toFixed(1)}/5</span>
            </div>
            <div className="h-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-black dark:bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${(preferences[key] / 5) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
