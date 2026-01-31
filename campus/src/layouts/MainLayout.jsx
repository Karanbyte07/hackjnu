import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 px-4 sm:px-8 py-6 bg-gradient-to-b from-[#050816] via-[#020617] to-[#020617]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
