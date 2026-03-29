"use client";

import { Trip } from "@/lib/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <motion.div
        key={value}
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/90 dark:bg-white/10 backdrop-blur-sm border border-white/40 dark:border-white/10 flex items-center justify-center"
        style={{ perspective: 200 }}
      >
        <span className="text-2xl md:text-3xl font-bold tabular-nums">{String(value).padStart(2, "0")}</span>
      </motion.div>
      <p className="text-[10px] mt-1.5 font-medium text-white/60 uppercase tracking-wider">{label}</p>
    </div>
  );
}

export default function TripHeader({ trip }: { trip: Trip }) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(trip.startDate).getTime();
    const update = () => {
      const diff = Math.max(0, target - Date.now());
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [trip.startDate]);

  const startDate = new Date(trip.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const endDate = new Date(trip.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="relative h-72 md:h-80 overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${trip.heroImage})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-white/60 text-sm font-medium mb-1">{trip.destination}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">{trip.name}</h1>
          <p className="text-white/60 text-sm mb-5">{startDate} – {endDate}</p>
          <div className="flex gap-3">
            <CountdownUnit value={countdown.days} label="Days" />
            <CountdownUnit value={countdown.hours} label="Hrs" />
            <CountdownUnit value={countdown.minutes} label="Min" />
            <CountdownUnit value={countdown.seconds} label="Sec" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
