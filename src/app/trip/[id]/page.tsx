"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import TripHeader from "@/components/trip/TripHeader";
import TabNavigation, { TabName } from "@/components/trip/TabNavigation";
import OverviewTab from "@/components/trip/OverviewTab";
import ItineraryTab from "@/components/trip/ItineraryTab";
import MapTab from "@/components/trip/MapTab";
import PreferencesTab from "@/components/trip/PreferencesTab";
import VotesTab from "@/components/trip/VotesTab";
import { mockTrip } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";

export default function TripPage() {
  const [activeTab, setActiveTab] = useState<TabName>("Overview");
  const trip = mockTrip;

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 pt-20 pb-16">
        <TripHeader trip={trip} />

        <div className="mt-6">
          <TabNavigation active={activeTab} onChange={setActiveTab} />

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "Overview" && <OverviewTab trip={trip} />}
                {activeTab === "Itinerary" && <ItineraryTab itinerary={trip.itinerary} />}
                {activeTab === "Map" && <MapTab itinerary={trip.itinerary} />}
                {activeTab === "Preferences" && <PreferencesTab preferences={trip.preferences} />}
                {activeTab === "Votes" && <VotesTab polls={trip.polls} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
