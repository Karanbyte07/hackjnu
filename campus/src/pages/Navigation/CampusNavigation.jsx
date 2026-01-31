import React from "react";
import PageHeader from "../../components/PageHeader";
import SectionCard from "../../components/SectionCard";

const CampusNavigation = () => {
  // Check if user is Super Admin
  const user = JSON.parse(localStorage.getItem("campus360_user") || "{}");
  const isSuperAdmin = user.role === "Super Admin";

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        badge="Navigation"
        title="Smart Campus Navigation & Classroom Finder"
        subtitle={isSuperAdmin 
          ? "View navigation usage statistics and popular routes" 
          : "Interactive campus map and real‑time classroom availability for students and faculty."}
      />

      {isSuperAdmin && (
        <div className="mb-5">
          <SectionCard title="Super Admin - Navigation Overview">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Total Searches</p>
                <p className="text-2xl font-bold text-emerald-400">312</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Today</p>
                <p className="text-2xl font-bold text-blue-400">156</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Active Users</p>
                <p className="text-2xl font-bold text-purple-400">89</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Popular Routes</p>
                <p className="text-2xl font-bold text-yellow-400">24</p>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-xs text-slate-400 mb-2">Most Searched Locations:</p>
              <div className="space-y-2">
                <div className="bg-slate-900 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-slate-200">CS-201 (Computer Lab)</p>
                      <p className="text-xs text-slate-400">Block C, 2nd Floor</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-400">
                      87 searches
                    </span>
                  </div>
                </div>
                <div className="bg-slate-900 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-slate-200">Library Main Hall</p>
                      <p className="text-xs text-slate-400">Block A, 1st Floor</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                      64 searches
                    </span>
                  </div>
                </div>
                <div className="bg-slate-900 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-slate-200">Sports Complex</p>
                      <p className="text-xs text-slate-400">Block D, Ground Floor</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400">
                      42 searches
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 mt-3">
              ℹ️ Super Admin has view-only access. Cannot perform navigation searches.
            </p>
          </SectionCard>
        </div>
      )}

      {!isSuperAdmin && (
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
      )}
    </div>
  );
};

export default CampusNavigation;
