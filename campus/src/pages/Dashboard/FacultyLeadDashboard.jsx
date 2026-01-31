import React from "react";
import PageHeader from "../../components/PageHeader";
import SectionCard from "../../components/SectionCard";

const FacultyLeadDashboard = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        badge="Faculty Lead (HOD)"
        title="Department Health"
        subtitle="Track open issues, classroom cleanliness, and attendance status for your department."
      />

      <div className="grid lg:grid-cols-3 gap-5">
        <SectionCard title="Active Issues">
          <ul className="space-y-1.5">
            <li>Water leakage – Block C, 2nd Floor (Pending).</li>
            <li>Projector not working – CS‑201 (Assigned).</li>
            <li>Broken lab chair – Lab 102 (In progress).</li>
          </ul>
        </SectionCard>

        <SectionCard title="Zone Heatmap">
          <p className="text-[11px] text-slate-400">
            Placeholder gradient for heatmap visualization. Integrate actual chart later.
          </p>
          <div className="h-32 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-amber-400 opacity-75" />
        </SectionCard>

        <SectionCard title="Priority Queue">
          <ul className="space-y-1.5">
            <li>Water overflow – Admin B (High).</li>
            <li>Network outage – Library L2 (Medium).</li>
            <li>Cafe hub hygiene check – Pending scheduling.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
};

export default FacultyLeadDashboard;
