import React, { useState, useCallback, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import SectionCard from "../../components/SectionCard";
import StatCard from "../../components/StatCard";
import PrimaryButton from "../../components/PrimaryButton";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    total_students: 1200,
    attendance_today: "92%",
    washroom_issues: 4,
    library_usage: "75%",
    sports_bookings_today: 18
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchDashboardData = useCallback(async () => {
    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const endpoint = `${baseURL}/admin/dashboard`;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      setErrorMessage(
        error?.message || "Unable to fetch dashboard data. Make sure the backend server is running."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        badge="Admin Dashboard"
        title="Campus360 Admin Overview"
        subtitle="Real-time metrics and system monitoring for all campus modules."
      />

      {errorMessage && (
        <p className="text-xs text-rose-400 mb-3 text-center">{errorMessage}</p>
      )}

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <StatCard title="Total Students" value={dashboardData.total_students} />
        <StatCard title="Attendance Today" value={dashboardData.attendance_today} />
        <StatCard title="Washroom Issues" value={dashboardData.washroom_issues} />
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <StatCard title="Library Usage" value={dashboardData.library_usage} />
        <StatCard title="Sports Bookings Today" value={dashboardData.sports_bookings_today} />
      </div>

      <div className="flex justify-center mb-5">
        <PrimaryButton onClick={fetchDashboardData} disabled={isLoading}>
          {isLoading ? "Refreshing..." : "Refresh Dashboard"}
        </PrimaryButton>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <SectionCard title="User Journey">
          <ol className="list-decimal list-inside text-xs space-y-1.5">
            <li>Onboarding screens introduce features and permissions.</li>
            <li>User login with role‑based access.</li>
            <li>Home page highlights relevant modules.</li>
            <li>User performs actions like booking or reporting.</li>
          </ol>
        </SectionCard>

        <SectionCard title="AI & Logic Processing">
          <ul className="text-xs space-y-1.5">
            <li>AI attendance processing for face recognition.</li>
            <li>Rule engine for seat and slot allocation.</li>
            <li>Priority routing for washroom alerts.</li>
          </ul>
        </SectionCard>

        <SectionCard title="Database & Notifications">
          <ul className="text-xs space-y-1.5">
            <li>Attendance and bookings stored in central DB.</li>
            <li>Push notifications for confirmations and alerts.</li>
            <li>Admin dashboards show updated metrics in real time.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
};

export default AdminDashboard;
