import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

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

        {/* Dashboards by role - Protected */}
        <Route path="/dashboard/super-admin" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/sports" element={<ProtectedRoute><SportsDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/library" element={<ProtectedRoute><LibraryDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/faculty-lead" element={<ProtectedRoute><FacultyLeadDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/faculty" element={<ProtectedRoute><FacultyPortal /></ProtectedRoute>} />
        <Route path="/dashboard/student" element={<ProtectedRoute><StudentPortal /></ProtectedRoute>} />

        {/* Feature pages - Protected */}
        <Route path="/attendance" element={<ProtectedRoute><SmartAttendance /></ProtectedRoute>} />
        <Route path="/washrooms" element={<ProtectedRoute><WashroomManagement /></ProtectedRoute>} />
        <Route path="/sports-booking" element={<ProtectedRoute><SportsBooking /></ProtectedRoute>} />
        <Route path="/library-booking" element={<ProtectedRoute><LibraryBooking /></ProtectedRoute>} />
        <Route path="/navigation" element={<ProtectedRoute><CampusNavigation /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
