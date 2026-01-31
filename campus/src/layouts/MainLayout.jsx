import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const location = useLocation();
  
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem("campus360_user") || "{}");
  const isLoggedIn = user.loggedIn;
  const isSuperAdmin = user.role === "Super Admin";
  const isStudent = user.role === "Student";

  // Core features navigation for Super Admin
  const coreFeatures = [
    { label: "Smart Attendance", to: "/attendance", color: "emerald" },
    { label: "Washroom Mgmt", to: "/washrooms", color: "blue" },
    { label: "Sports Booking", to: "/sports-booking", color: "yellow" },
    { label: "Library Booking", to: "/library-booking", color: "purple" },
    { label: "Campus Navigation", to: "/navigation", color: "rose" },
  ];

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        {/* Horizontal Feature Navigation for Super Admin and Student */}
        {(isSuperAdmin || isStudent) && isLoggedIn && (
          <div className="border-b border-slate-800 bg-slate-900/50 px-4 sm:px-8 py-3">
            <div className="flex gap-3 overflow-x-auto">
              {coreFeatures.map((feature) => (
                <Link
                  key={feature.to}
                  to={feature.to}
                  className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                    location.pathname === feature.to
                      ? `bg-${feature.color}-500/20 text-${feature.color}-400 border border-${feature.color}-500/50`
                      : "text-slate-300 hover:bg-slate-800 border border-transparent"
                  }`}
                >
                  {feature.label}
                </Link>
              ))}
            </div>
          </div>
        )}
        
        <main className="flex-1 px-4 sm:px-8 py-6 bg-gradient-to-b from-[#050816] via-[#020617] to-[#020617]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
