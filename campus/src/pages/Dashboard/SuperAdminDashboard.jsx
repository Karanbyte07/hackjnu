import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import SectionCard from "../../components/SectionCard";
import PrimaryButton from "../../components/PrimaryButton";

const SuperAdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        badge="Super Admin"
        title="Global Analytics"
        subtitle="Overview of campus health across attendance, washrooms, sports, library, and navigation modules."
      />

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Students"
          value="12,482"
          hint="Registered in system"
          trend="+4.2%"
        />
        <StatCard
          label="Attendance Accuracy"
          value="94.2%"
          hint="AI matched vs records"
          trend="+2.1%"
        />
        <StatCard
          label="Open Issues"
          value="18"
          hint="Washroom, infra, routing"
          trend="-12%"
        />
        <StatCard
          label="System Uptime"
          value="99.8%"
          hint="Past 30 days"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <SectionCard title="Module Status">
          <ul className="space-y-1.5">
            <li>Smart Attendance – Stable, 3 minor alerts.</li>
            <li>Washroom Management – High usage in Block B.</li>
            <li>Sports Booking – Peak between 5–7 PM.</li>
            <li>Library Booking – 78% live occupancy.</li>
            <li>Navigation – 312 route searches today.</li>
          </ul>
        </SectionCard>

        <SectionCard title="Weekly Efficiency Score" footer="Score calculated using resolution time, uptime, and attendance reliability.">
          <p>Graph placeholder – integrate chart library later (Recharts / Chart.js).</p>
          <p className="text-emerald-400 text-[11px]">
            Current week: 88% efficiency.
          </p>
        </SectionCard>

        <SectionCard title="Student Reports & Data">
          <ul className="space-y-1.5">
            <li>342 students marked attendance today.</li>
            <li>67 sports equipment bookings active.</li>
            <li>42 library seats currently booked.</li>
            <li>8 washroom issues reported this week.</li>
            <li>156 navigation searches performed.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
