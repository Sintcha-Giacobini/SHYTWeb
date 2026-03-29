"use client";

import { DayPlan, Venue } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

function VenueCard({ venue, index }: { venue: Venue; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ScrollReveal delay={index * 0.08}>
      <motion.div
        className="card overflow-hidden cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        whileHover={{ y: -2 }}
      >
        <div className="flex gap-4 p-4">
          <div className="flex-shrink-0 text-center w-12">
            <p className="text-[13px] font-bold">{venue.time}</p>
            {venue.endTime && (
              <p className="text-[10px] text-[var(--text-tertiary)]">{venue.endTime}</p>
            )}
          </div>

          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white" />
            <div className="w-px flex-1 bg-black/10 dark:bg-white/10 mt-1" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/[0.06] dark:bg-white/[0.1] text-[var(--text-secondary)] mb-1.5 capitalize">
                  {venue.type}
                </span>
                <h4 className="font-semibold text-[15px] tracking-tight">{venue.name}</h4>
              </div>
              {venue.rating && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[11px]">★</span>
                  <span className="text-[12px] font-medium">{venue.rating}</span>
                </div>
              )}
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] mt-1 line-clamp-2">
              {venue.description}
            </p>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 pt-3 border-t border-[var(--border)] space-y-2">
                    <div className="flex items-center gap-2 text-[13px] text-[var(--text-secondary)]">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {venue.address}
                    </div>
                    {venue.priceLevel && (
                      <div className="text-[13px]">
                        <span className="text-[var(--text-primary)]">{"$".repeat(venue.priceLevel)}</span>
                        <span className="text-[var(--text-tertiary)]">{"$".repeat(4 - venue.priceLevel)}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {venue.imageUrl && (
            <div className="hidden sm:block flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
              <img src={venue.imageUrl} alt={venue.name} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function ItineraryTab({ itinerary }: { itinerary: DayPlan[] }) {
  return (
    <div className="space-y-10">
      {itinerary.map((day) => (
        <div key={day.dayNumber}>
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-[13px] font-bold">
                {day.dayNumber}
              </div>
              <div>
                <h3 className="font-semibold text-[15px]">Day {day.dayNumber}</h3>
                <p className="text-[11px] text-[var(--text-tertiary)]">
                  {new Date(day.date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                </p>
              </div>
            </div>
          </ScrollReveal>
          <div className="space-y-2.5 ml-2">
            {day.venues.map((venue, i) => (
              <VenueCard key={venue.id} venue={venue} index={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
