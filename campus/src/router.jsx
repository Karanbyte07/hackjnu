import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Landing from "./pages/Landing";
import Login from "./pages/Login";

import SuperAdminDashboard from "./pages/Dashboard/SuperAdminDashboard";
import SportsDashboard from "./pages/Dashboard/SportsDashboard";
import LibraryDashboard from "./pages/Dashboard/LibraryDashboard";
import FacultyLeadDashboard from "./pages/Dashboard/FacultyLeadDashboard";
import FacultyPortal from "./pages/Dashboard/FacultyPortal";
import StudentPortal from "./pages/Dashboard/StudentPortal";

import SmartAttendance from "./pages/Attendance/SmartAttendance";
import WashroomManagement from "./pages/Washroom/WashroomManagement";
import SportsBooking from "./pages/Sports/SportsBooking";
import LibraryBooking from "./pages/Library/LibraryBooking";
import CampusNavigation from "./pages/Navigation/CampusNavigation";
import AdminDashboard from "./pages/Admin/AdminDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboards by role */}
        <Route path="/dashboard/super-admin" element={<SuperAdminDashboard />} />
        <Route path="/dashboard/sports" element={<SportsDashboard />} />
        <Route path="/dashboard/library" element={<LibraryDashboard />} />
        <Route path="/dashboard/faculty-lead" element={<FacultyLeadDashboard />} />
        <Route path="/dashboard/faculty" element={<FacultyPortal />} />
        <Route path="/dashboard/student" element={<StudentPortal />} />

        {/* Feature pages */}
        <Route path="/attendance" element={<SmartAttendance />} />
        <Route path="/washrooms" element={<WashroomManagement />} />
        <Route path="/sports-booking" element={<SportsBooking />} />
        <Route path="/library-booking" element={<LibraryBooking />} />
        <Route path="/navigation" element={<CampusNavigation />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
