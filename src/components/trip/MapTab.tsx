"use client";

import { DayPlan } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const dayColors = ["#5E5CE6", "#FF9F0A", "#BF5AF2", "#FF375F", "#30D158", "#64D2FF", "#FFD60A"];

export default function MapTab({ itinerary }: { itinerary: DayPlan[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    const loadMapbox = async () => {
      try {
        // @ts-expect-error - dynamic CSS import
        await import("mapbox-gl/dist/mapbox-gl.css");
        const mapboxgl = (await import("mapbox-gl")).default;

        // Use a public style that doesn't need a token for demo
        const map = new mapboxgl.Map({
          container: mapRef.current!,
          style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
          center: [139.7454, 35.6762],
          zoom: 11,
        });

        map.addControl(new mapboxgl.NavigationControl(), "top-right");

        map.on("load", () => {
          setMapLoaded(true);

          itinerary.forEach((day) => {
            const color = dayColors[(day.dayNumber - 1) % dayColors.length];

            day.venues.forEach((venue) => {
              const el = document.createElement("div");
              el.className = "flex items-center justify-center";
              el.style.width = "32px";
              el.style.height = "32px";
              el.style.borderRadius = "50%";
              el.style.background = color;
              el.style.border = "3px solid white";
              el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
              el.style.cursor = "pointer";
              el.style.fontSize = "11px";
              el.style.fontWeight = "700";
              el.style.color = "white";
              el.textContent = `${day.dayNumber}`;

              const popup = new mapboxgl.Popup({ offset: 20, closeButton: false })
                .setHTML(`
                  <div style="padding: 4px 0; font-family: Inter, sans-serif;">
                    <p style="font-weight: 600; font-size: 13px; margin: 0;">${venue.name}</p>
                    <p style="color: #666; font-size: 11px; margin: 2px 0 0 0;">Day ${day.dayNumber} · ${venue.time}</p>
                  </div>
                `);

              new mapboxgl.Marker({ element: el })
                .setLngLat([venue.lng, venue.lat])
                .setPopup(popup)
                .addTo(map);
            });

            // Draw route lines for each day
            if (day.venues.length > 1) {
              const coords = day.venues.map((v) => [v.lng, v.lat]);
              map.addSource(`route-${day.dayNumber}`, {
                type: "geojson",
                data: {
                  type: "Feature",
                  properties: {},
                  geometry: { type: "LineString", coordinates: coords },
                },
              });
              map.addLayer({
                id: `route-${day.dayNumber}`,
                type: "line",
                source: `route-${day.dayNumber}`,
                paint: {
                  "line-color": color,
                  "line-width": 2.5,
                  "line-dasharray": [4, 3],
                  "line-opacity": 0.7,
                },
              });
            }
          });
        });

        return () => map.remove();
      } catch {
        // Mapbox failed to load — show fallback
        setMapLoaded(true);
      }
    };

    loadMapbox();
  }, [itinerary]);

  const filteredDays = selectedDay
    ? itinerary.filter((d) => d.dayNumber === selectedDay)
    : itinerary;

  return (
    <div className="space-y-4">
      {/* Day filter chips */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedDay(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            selectedDay === null
              ? "bg-brand text-white"
              : "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300"
          }`}
        >
          All Days
        </button>
        {itinerary.map((day) => (
          <button
            key={day.dayNumber}
            onClick={() => setSelectedDay(day.dayNumber)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
              selectedDay === day.dayNumber
                ? "bg-brand text-white"
                : "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300"
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: dayColors[(day.dayNumber - 1) % dayColors.length] }}
            />
            Day {day.dayNumber}
          </button>
        ))}
      </div>

      {/* Map container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-2xl overflow-hidden border border-black/5 dark:border-white/10"
        style={{ height: "60vh", minHeight: 400 }}
      >
        <div ref={mapRef} className="w-full h-full" />
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-light dark:bg-surface-dark">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-gray-400">Loading map...</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Venue list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filteredDays.flatMap((day) =>
          day.venues.map((venue) => (
            <div
              key={venue.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03]"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: dayColors[(day.dayNumber - 1) % dayColors.length] }}
              >
                {day.dayNumber}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{venue.name}</p>
                <p className="text-[10px] text-gray-400">{venue.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
