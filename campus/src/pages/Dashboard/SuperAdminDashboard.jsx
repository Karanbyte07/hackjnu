import React from "react";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import SectionCard from "../../components/SectionCard";

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

      <div className="grid lg:grid-cols-3 gap-5">
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

        <SectionCard title="Master Controls">
          <ul className="space-y-1.5">
            <li>Toggle portal sync for Library, Sports, Washrooms.</li>
            <li>Role management and access policies.</li>
            <li>Recent system logs and anomaly detection.</li>
            <li>API performance and error monitoring.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
