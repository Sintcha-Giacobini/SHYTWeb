"use client";

import { Trip } from "@/lib/types";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

export default function OverviewTab({ trip }: { trip: Trip }) {
  const completedActions = trip.actionItems.filter((a) => a.completed).length;
  const totalActions = trip.actionItems.length;
  const totalDays = trip.itinerary.length;
  const totalVenues = trip.itinerary.reduce((sum, d) => sum + d.venues.length, 0);
  const activePolls = trip.polls.filter((p) => p.status === "active").length;

  const summaryCards = [
    { label: "Days", value: totalDays },
    { label: "Activities", value: totalVenues },
    { label: "Travelers", value: trip.participants.length },
    { label: "Active Votes", value: activePolls },
  ];

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {summaryCards.map((card, i) => (
          <ScrollReveal key={card.label} delay={i * 0.08}>
            <div className="card p-5 text-center">
              <motion.p
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                className="text-3xl font-bold"
              >
                {card.value}
              </motion.p>
              <p className="text-[11px] font-medium text-[var(--text-tertiary)] mt-1 uppercase tracking-wider">
                {card.label}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Participants */}
      <ScrollReveal>
        <div className="card p-6">
          <h3 className="text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-4">
            Travelers
          </h3>
          <div className="flex flex-wrap gap-3">
            {trip.participants.map((p) => (
              <div key={p.id} className="flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-[var(--bg-secondary)] dark:bg-[var(--bg-dark-secondary)]">
                <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center">
                  <span className="text-xs font-bold text-white dark:text-black">{p.name[0]}</span>
                </div>
                <div>
                  <p className="text-[13px] font-medium">{p.name}</p>
                  <p className="text-[10px] text-[var(--text-tertiary)] capitalize">{p.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Action Items */}
      <ScrollReveal>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Action Items
            </h3>
            <span className="text-[11px] text-[var(--text-tertiary)]">
              {completedActions}/{totalActions}
            </span>
          </div>
          <div className="h-1 rounded-full bg-black/[0.04] dark:bg-white/[0.08] mb-4 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-black dark:bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${(completedActions / totalActions) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="space-y-1.5">
            {trip.actionItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  item.completed ? "bg-black dark:bg-white border-black dark:border-white" : "border-[var(--text-tertiary)]"
                }`}>
                  {item.completed && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" className="dark:stroke-black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </div>
                <span className={`text-[14px] flex-1 ${item.completed ? "line-through text-[var(--text-tertiary)]" : ""}`}>
                  {item.text}
                </span>
                {item.assignee && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[var(--text-secondary)] font-medium">
                    {item.assignee}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
