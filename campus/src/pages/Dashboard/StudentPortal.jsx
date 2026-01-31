import React from "react";
import PageHeader from "../../components/PageHeader";
import SectionCard from "../../components/SectionCard";
import BookingCard from "../../components/BookingCard";
import PrimaryButton from "../../components/PrimaryButton";

const StudentPortal = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        badge="Student"
        title="Hello, Arjun!"
        subtitle="Quick actions for attendance, library, sports, and campus navigation."
      />

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <SectionCard title="Quick Actions">
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button className="rounded-xl bg-slate-900 border border-slate-800 py-3">
              Attendance
            </button>
            <button className="rounded-xl bg-slate-900 border border-slate-800 py-3">
              Report Issue
            </button>
            <button className="rounded-xl bg-slate-900 border border-slate-800 py-3">
              Library
            </button>
            <button className="rounded-xl bg-slate-900 border border-slate-800 py-3">
              Sports
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Today’s Timetable">
          <BookingCard
            title="Advanced AI"
            time="09:00 – 10:00 AM • CS‑201"
            meta="Attendance synced"
          />
          <BookingCard
            title="Database Systems"
            time="10:00 – 11:00 AM • Lab 102"
            meta="Lab"
          />
        </SectionCard>

        <SectionCard title="Live Library Seats">
          <p className="text-xs text-slate-300 mb-2">
            42 / 100 seats available right now.
          </p>
          <PrimaryButton className="w-full">Book Study Seat</PrimaryButton>
          <p className="mt-2 text-[11px] text-slate-400">
            Updated just now • Floor 1, Main Hall.
          </p>
        </SectionCard>
      </div>
    </div>
  );
};

export default StudentPortal;
