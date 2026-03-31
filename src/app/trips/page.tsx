"use client";

import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const trips = [
  {
    id: "trip-tokyo-2026",
    name: "Tokyo Adventure",
    destination: "Tokyo, Japan",
    dates: "Apr 15 – 22, 2026",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
    participants: 4,
    status: "upcoming" as const,
  },
  {
    id: "trip-paris-2025",
    name: "Paris Weekend",
    destination: "Paris, France",
    dates: "Dec 20 – 23, 2025",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    participants: 3,
    status: "completed" as const,
  },
  {
    id: "trip-bali-2026",
    name: "Bali Retreat",
    destination: "Bali, Indonesia",
    dates: "Jun 1 – 10, 2026",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    participants: 6,
    status: "planning" as const,
  },
];

export default function TripsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin?callbackUrl=/trips");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center pt-32">
          <div className="w-8 h-8 border-2 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-title-1 mb-1">Your Trips</h1>
          <p className="text-[var(--text-secondary)] mb-8">
            Welcome back{session.user?.name ? `, ${session.user.name}` : ""}. Manage your planned adventures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips.map((trip, i) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link href={`/trip/${trip.id}`} className="block group">
                <div className="card overflow-hidden">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.destination}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-white/90 dark:bg-black/70 text-black dark:text-white backdrop-blur-sm">
                        {trip.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[15px] tracking-tight">{trip.name}</h3>
                    <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">{trip.destination}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
                      <span className="text-[11px] text-[var(--text-tertiary)]">{trip.dates}</span>
                      <div className="flex -space-x-1.5">
                        {Array.from({ length: Math.min(trip.participants, 3) }).map((_, j) => (
                          <div key={j} className="w-5 h-5 rounded-full bg-black dark:bg-white border border-white dark:border-black" />
                        ))}
                        {trip.participants > 3 && (
                          <div className="w-5 h-5 rounded-full bg-[var(--bg-tertiary)] border border-white dark:border-black flex items-center justify-center">
                            <span className="text-[7px] font-medium text-[var(--text-tertiary)]">+{trip.participants - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
