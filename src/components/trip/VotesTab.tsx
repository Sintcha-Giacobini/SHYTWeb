"use client";

import { Poll } from "@/lib/types";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

function PollCard({ poll }: { poll: Poll }) {
  const isActive = poll.status === "active";
  const maxVotes = Math.max(...poll.options.map((o) => o.votes), 1);

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${
            isActive ? "bg-black/[0.06] dark:bg-white/[0.1] text-[var(--text-primary)]" : "bg-black/[0.03] dark:bg-white/[0.05] text-[var(--text-tertiary)]"
          }`}>
            {isActive ? "Active" : "Closed"}
          </span>
          <h3 className="text-[16px] font-semibold mt-2 tracking-tight">{poll.question}</h3>
        </div>
        <span className="text-[11px] text-[var(--text-tertiary)]">{poll.totalVotes} votes</span>
      </div>

      <div className="space-y-3">
        {poll.options.map((option, i) => {
          const pct = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0;
          const isWinner = !isActive && option.votes === maxVotes;

          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl overflow-hidden ${isActive ? "cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.03]" : ""} ${isWinner ? "ring-1 ring-black/20 dark:ring-white/20" : ""}`}
            >
              <div className="relative z-10 flex items-center gap-3 p-3">
                {option.imageUrl && (
                  <img src={option.imageUrl} alt={option.text} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-medium truncate">{option.text}</p>
                    <span className="text-[13px] font-bold tabular-nums flex-shrink-0">{Math.round(pct)}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${isWinner ? "bg-black dark:bg-white" : "bg-black/20 dark:bg-white/20"}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
                    />
                  </div>
                  {option.voters.length > 0 && (
                    <div className="flex -space-x-1.5 mt-2">
                      {option.voters.map((voter) => (
                        <div key={voter} className="w-5 h-5 rounded-full bg-black dark:bg-white border border-white dark:border-black flex items-center justify-center">
                          <span className="text-[7px] font-bold text-white dark:text-black">{voter.replace("p", "")}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {isActive && poll.closesAt && (
        <p className="text-[10px] text-[var(--text-tertiary)] mt-4 text-center">
          Closes {new Date(poll.closesAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
        </p>
      )}
    </div>
  );
}

export default function VotesTab({ polls }: { polls: Poll[] }) {
  const activePolls = polls.filter((p) => p.status === "active");
  const closedPolls = polls.filter((p) => p.status === "closed");

  return (
    <div className="space-y-8">
      {activePolls.length > 0 && (
        <div>
          <h3 className="text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-4">Active</h3>
          <div className="space-y-4">
            {activePolls.map((poll, i) => (
              <ScrollReveal key={poll.id} delay={i * 0.1}><PollCard poll={poll} /></ScrollReveal>
            ))}
          </div>
        </div>
      )}
      {closedPolls.length > 0 && (
        <div>
          <h3 className="text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-4">Closed</h3>
          <div className="space-y-4">
            {closedPolls.map((poll, i) => (
              <ScrollReveal key={poll.id} delay={i * 0.1}><PollCard poll={poll} /></ScrollReveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
