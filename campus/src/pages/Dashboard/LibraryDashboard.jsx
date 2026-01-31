import React from "react";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import SectionCard from "../../components/SectionCard";

const LibraryDashboard = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        badge="Library"
        title="Live Occupancy & Bookings"
        subtitle="Manage live seating, power outlet capacity, and online book reservations."
      />

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Live Occupancy"
          value="78%"
          hint="Main Hall, Floor 1"
          trend="+6%"
        />
        <StatCard
          label="Active Reservations"
          value="195 / 250"
          hint="Seats & books"
        />
        <StatCard
          label="Available Study Desks"
          value="55"
          hint="Across all halls"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <SectionCard title="Seat Map (Sample)">
          <p className="text-[11px] text-slate-400 mb-1">
            Colored blocks represent live seat status (free, reserved, charging, group).
          </p>
          <div className="grid grid-cols-8 gap-1 text-[9px]">
            {Array.from({ length: 32 }).map((_, idx) => (
              <div
                key={idx}
                className={`aspect-square rounded-md ${
                  idx % 7 === 0
                    ? "bg-emerald-400/80"
                    : idx % 5 === 0
                    ? "bg-yellow-400/80"
                    : "bg-slate-700"
                }`}
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Book Inventory (Sample)">
          <ul className="space-y-1.5">
            <li>Designing Interfaces – 4 copies available.</li>
            <li>Neuroscience (AI‑Edition) – 2 copies reserved.</li>
            <li>The Psychology of Color – 1 copy left.</li>
          </ul>
        </SectionCard>

        <SectionCard title="Quick Library Actions">
          <ul className="space-y-1.5">
            <li>Approve new reservations.</li>
            <li>Update issue / return status.</li>
            <li>Configure auto‑expiry windows.</li>
            <li>Broadcast quiet‑hours reminder.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
};

export default LibraryDashboard;
