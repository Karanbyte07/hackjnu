import React from "react";
import PageHeader from "../../components/PageHeader";
import SectionCard from "../../components/SectionCard";
import BookingCard from "../../components/BookingCard";

const FacultyPortal = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        badge="Faculty Portal"
        title="Today’s Teaching Snapshot"
        subtitle="View smart attendance, upcoming classes, and quick classroom tools."
      />

      <div className="grid lg:grid-cols-3 gap-5">
        <SectionCard title="Smart Attendance">
          <p className="text-xs text-slate-300 mb-2">
            Upload a single class photo to auto‑detect faces and mark attendance.
          </p>
          <div className="rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-4 text-center text-xs">
            <p className="font-semibold mb-1">AI Powered</p>
            <button className="mt-2 px-3 py-2 rounded-full bg-slate-900 text-[11px] font-semibold">
              Upload Class Photo
            </button>
            <p className="mt-2 text-[10px] text-slate-200">
              Last sync: 10:45 AM
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Attendance Trends">
          <p className="text-xs text-slate-300">
            Week‑over‑week average attendance. Placeholder bars – hook charts later.
          </p>
          <div className="flex items-end gap-1 h-24 mt-2">
            {[60, 72, 80, 90, 92].map((h, idx) => (
              <div
                key={idx}
                style={{ height: `${h}%` }}
                className="flex-1 rounded-t-lg bg-emerald-400/60"
              />
            ))}
          </div>
          <p className="text-[11px] text-emerald-400 mt-2">+4% this week.</p>
        </SectionCard>

        <SectionCard title="Classroom Finder">
          <BookingCard
            title="CS‑201 – Advanced AI"
            time="09:00 – 10:00 AM • Block C"
            meta="Next class"
          />
          <BookingCard
            title="Lab 102 – Database Systems"
            time="10:00 – 11:00 AM • Block B"
            meta="Lab session"
          />
        </SectionCard>
      </div>
    </div>
  );
};

export default FacultyPortal;
