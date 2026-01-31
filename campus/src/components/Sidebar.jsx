import React from "react";
import { NavLink } from "react-router-dom";

const navSection = [
  {
    title: "Dashboards",
    items: [
      { label: "Super Admin", to: "/dashboard/super-admin" },
      { label: "Sports", to: "/dashboard/sports" },
      { label: "Library", to: "/dashboard/library" },
      { label: "Faculty Lead", to: "/dashboard/faculty-lead" },
      { label: "Faculty Portal", to: "/dashboard/faculty" },
      { label: "Student", to: "/dashboard/student" },
    ],
  },
  {
    title: "Core Features",
    items: [
      { label: "Smart Attendance", to: "/attendance" },
      { label: "Washroom Mgmt", to: "/washrooms" },
      { label: "Sports Booking", to: "/sports-booking" },
      { label: "Library Booking", to: "/library-booking" },
      { label: "Campus Navigation", to: "/navigation" },
    ],
  },
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-[#020617]">
      <div className="px-4 py-4 text-xs font-semibold tracking-[0.18em] text-yellow-300">
        CAMPUS OS
      </div>
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 pb-6 space-y-6">
        {navSection.map((section) => (
          <div key={section.title}>
            <p className="px-2 mb-2 text-[11px] font-semibold uppercase text-slate-500">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                      isActive
                        ? "bg-slate-800 text-yellow-300"
                        : "text-slate-300 hover:bg-slate-800/60"
                    }`
                  }
                >
                  <span>{item.label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
