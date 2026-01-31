import React from "react";
import PageHeader from "../../components/PageHeader";
import SectionCard from "../../components/SectionCard";

const CampusNavigation = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        badge="Navigation"
        title="Smart Campus Navigation & Classroom Finder"
        subtitle="Interactive campus map and real‑time classroom availability for students and faculty."
      />

      <div className="grid lg:grid-cols-3 gap-5">
        <SectionCard title="Search Classroom">
          <input
            type="text"
            placeholder="e.g., CS‑201, Lab‑102"
            className="w-full mb-2 rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs"
          />
          <p className="text-xs text-slate-300 mb-2">
            Get route, floor details, and live occupancy.
          </p>
          <div className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-3 text-[11px]">
            <p className="font-semibold mb-1">Result • CS‑201</p>
            <p>Block C, 2nd Floor • Capacity 80 • Currently 62 students.</p>
          </div>
        </SectionCard>

        <SectionCard title="Interactive Map (Placeholder)">
          <div className="h-40 rounded-2xl bg-gradient-to-br from-sky-500 via-emerald-500 to-indigo-500 opacity-80" />
          <p className="text-[11px] text-slate-400 mt-2">
            Replace with actual map canvas (Leaflet / Mapbox) in future.
          </p>
        </SectionCard>

        <SectionCard title="Smart Suggestions">
          <ul className="text-xs space-y-1.5">
            <li>Nearest free classrooms around you.</li>
            <li>Shortest path avoiding crowded corridors.</li>
            <li>Suggestions for silent study zones vs group rooms.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
};

export default CampusNavigation;
