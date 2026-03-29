"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

/* ─── App Preview Video in iPhone Mockup ─── */
function AppPreviewMockup() {
  return (
    <div className="relative mx-auto w-[280px] md:w-[320px]">
      {/* Phone shell */}
      <div className="relative bg-black rounded-[44px] p-[10px] shadow-[0_40px_80px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
        {/* Screen */}
        <div className="bg-black rounded-[36px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-0 left-0 right-0 z-10 flex justify-center pt-2">
            <div className="w-[90px] h-[28px] bg-black rounded-full" />
          </div>

          {/* Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full aspect-[9/19.5] object-cover"
            poster=""
          >
            <source src="/app-preview.mov" type="video/quicktime" />
            <source src="/app-preview.mov" type="video/mp4" />
          </video>

          {/* Home indicator */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 z-10">
            <div className="w-[100px] h-[4px] bg-white/30 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── iMessage Chat Demo Section ─── */
const chatMessages = [
  { id: 1, side: "sent" as const, text: "Hey everyone! Let's plan our Tokyo trip 🇯🇵", delay: 0 },
  { id: 2, side: "sent" as const, text: "I added the TripPlanner bot to the group", delay: 0.8 },
  { id: 3, side: "received" as const, text: "Hi! I'm TripPlanner 👋 I'll help plan your trip. When are you thinking of going?", sender: "TripPlanner", delay: 1.8 },
  { id: 4, side: "sent" as const, text: "April 15-22 next year, 4 people", delay: 3.2 },
  { id: 5, side: "received" as const, text: "Got it! I've created a 7-day Tokyo itinerary. Here's what I have so far:", sender: "TripPlanner", delay: 4.2 },
  { id: 6, side: "received" as const, text: "Day 1: Senso-ji Temple → Ichiran Ramen → teamLab Borderless\nDay 2: Tsukiji Market → Meiji Shrine → Shibuya\nDay 3: Mount Fuji day trip 🗻", sender: "TripPlanner", isCard: true, delay: 5.0 },
  { id: 7, side: "received" as const, text: "I've also started a vote for dinner on Day 2. Everyone can vote in the dashboard →", sender: "TripPlanner", delay: 6.2 },
  { id: 8, side: "sent" as const, text: "This is amazing 🔥 sending the link to the group", delay: 7.2 },
];

function ChatBubble({ message, visible }: { message: (typeof chatMessages)[0]; visible: boolean }) {
  const isSent = message.side === "sent";
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, x: isSent ? 40 : -40, y: 10 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.45, ease: [0.175, 0.885, 0.32, 1.275] }}
          className={`flex ${isSent ? "justify-end" : "justify-start"}`}
        >
          <div className="flex flex-col gap-0.5 max-w-[80%]">
            {!isSent && message.sender && (
              <span className="text-[11px] text-[var(--text-tertiary)] ml-3 font-medium">{message.sender}</span>
            )}
            <div className={`px-4 py-2.5 text-[15px] leading-[1.45] ${
              isSent
                ? "bg-black dark:bg-white text-white dark:text-black rounded-[20px] rounded-br-[6px]"
                : message.isCard
                ? "bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-[20px] rounded-bl-[6px] font-mono text-[13px] whitespace-pre-line border border-[var(--border)]"
                : "bg-[var(--bubble-received)] text-[var(--text-primary)] rounded-[20px] rounded-bl-[6px]"
            }`}>
              {message.text}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TypingIndicator({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, x: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.3 }}
          className="flex justify-start"
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-[var(--text-tertiary)] ml-3 font-medium">TripPlanner</span>
            <div className="typing-indicator">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ChatDemo() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const animateMessages = useCallback(async () => {
    for (let i = 0; i < chatMessages.length; i++) {
      const msg = chatMessages[i];
      const prevMsg = chatMessages[i - 1];
      const waitTime = i === 0 ? 600 : (msg.delay - (prevMsg?.delay ?? 0)) * 1000;
      if (msg.side === "received") {
        setShowTyping(true);
        await new Promise((r) => setTimeout(r, Math.min(waitTime, 800)));
        setShowTyping(false);
        await new Promise((r) => setTimeout(r, 100));
      } else {
        await new Promise((r) => setTimeout(r, waitTime));
      }
      setVisibleMessages((prev) => [...prev, msg.id]);
    }
  }, []);

  useEffect(() => {
    if (started) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        animateMessages();
      }
    }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started, animateMessages]);

  useEffect(() => {
    const el = chatEndRef.current;
    if (!el) return;
    const container = el.closest("[data-chat-scroll]");
    if (container) container.scrollTop = container.scrollHeight;
  }, [visibleMessages, showTyping]);

  return (
    <div ref={sectionRef} className="max-w-lg mx-auto">
      <div className="card overflow-hidden">
        {/* iMessage header */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-[var(--border)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <div className="text-center">
            <p className="text-[13px] font-semibold">Tokyo Trip 🗼</p>
            <p className="text-[10px] text-[var(--text-tertiary)]">4 people</p>
          </div>
          <div className="w-6 h-6 rounded-full bg-[var(--bg-tertiary)]" />
        </div>

        {/* Chat area */}
        <div data-chat-scroll className="h-[420px] overflow-y-auto px-4 py-4 space-y-2.5">
          <div className="text-center mb-2">
            <span className="text-[10px] text-[var(--text-tertiary)] font-medium">Today 2:41 PM</span>
          </div>
          {chatMessages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} visible={visibleMessages.includes(msg.id)} />
          ))}
          <TypingIndicator visible={showTyping} />
          <div ref={chatEndRef} />
        </div>
      </div>
    </div>
  );
}

/* ─── Feature cards ─── */
const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Conversational Planning",
    description: "Just chat naturally. The AI bot understands your group's preferences and builds the perfect itinerary.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Group Voting",
    description: "Everyone votes on restaurants, activities, and destinations. No more endless group chat debates.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    title: "Live Dashboard",
    description: "A shared real-time itinerary everyone can see. Updated the instant plans change.",
  },
];

/* ─── Steps ─── */
const steps = [
  {
    number: "1",
    title: "Add the bot",
    description: "Add TripPlanner to your iMessage group chat.",
  },
  {
    number: "2",
    title: "Tell it where to go",
    description: "Just type naturally — \"Plan a trip to Tokyo for 4 people in April.\"",
  },
  {
    number: "3",
    title: "Vote, customize, go",
    description: "Vote on options, tweak the plan, view the live dashboard.",
  },
];

/* ─── MAIN PAGE ─── */
export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen noise-overlay">
      <Navigation />

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
        {/* Subtle radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-black/[0.02] dark:bg-white/[0.03] rounded-full blur-[100px]" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left — text */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] mb-6 text-[12px] text-[var(--text-secondary)] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white animate-pulse-soft" />
                  iMessage Extension
                </div>
                <h1 className="text-hero tracking-tight">
                  Plan trips{" "}
                  <span className="block">together.</span>
                </h1>
                <p className="mt-5 text-body-large text-[var(--text-secondary)] max-w-md mx-auto lg:mx-0">
                  An AI bot lives in your iMessage group.
                  It plans, organizes, and keeps everyone in sync.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium text-[15px] hover:opacity-80 transition-all active:scale-[0.97]"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Get on App Store
                </a>
                <button
                  onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-[var(--border)] font-medium text-[15px] hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors"
                >
                  Learn More
                </button>
              </motion.div>
            </div>

            {/* Right — iPhone with App Preview Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex-shrink-0"
            >
              <AppPreviewMockup />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-title-1">
                Everything happens<br />in the group chat.
              </h2>
              <p className="mt-4 text-body-large text-[var(--text-secondary)] max-w-lg mx-auto">
                No new apps to download. No accounts to create. Just add the bot and start planning.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.12}>
                <div className="card p-7 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-black/[0.04] dark:bg-white/[0.08] flex items-center justify-center mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-[17px] font-semibold mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CHAT DEMO ═══ */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-title-1">
                See it in action.
              </h2>
              <p className="mt-4 text-body-large text-[var(--text-secondary)] max-w-lg mx-auto">
                A real conversation. The bot joins your group chat and builds the perfect trip.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <ChatDemo />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-title-1">Three steps.</h2>
              <p className="mt-3 text-body-large text-[var(--text-secondary)]">
                That&apos;s it. Seriously.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px">
              <motion.div
                className="w-full bg-black/10 dark:bg-white/10 rounded-full"
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>

            <div className="space-y-16">
              {steps.map((step, i) => (
                <ScrollReveal key={step.number} delay={i * 0.2}>
                  <div className="relative flex items-start gap-6 md:gap-8">
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-lg md:text-xl font-bold">
                      {step.number}
                    </div>
                    <div className="pt-2 md:pt-4">
                      <h3 className="text-title-2 mb-1">{step.title}</h3>
                      <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed max-w-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <div className="card p-10 md:p-16 text-center relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-title-1 mb-4">
                  Ready to go?
                </h2>
                <p className="text-body-large text-[var(--text-secondary)] max-w-md mx-auto mb-8">
                  Download TripPlanner. Add it to your group chat. Let AI handle the rest.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium text-[16px] hover:opacity-80 transition-all active:scale-[0.97]"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Get Started
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[var(--border)] font-medium text-[16px] hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors"
                  >
                    Join TestFlight →
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
