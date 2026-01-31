import React, { useCallback, useState } from "react";
import PageHeader from "../../components/PageHeader";
import SectionCard from "../../components/SectionCard";
import PrimaryButton from "../../components/PrimaryButton";

const SmartAttendance = () => {
  const [isStarting, setIsStarting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [attendanceData, setAttendanceData] = useState({
    total_students: 0,
    marked_count: 0,
    marked_students: [],
    unmarked_count: 0
  });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(null);

  const startLiveAttendance = useCallback(async () => {
    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const endpoint = `${baseURL}/attendance/live`;

    setIsStarting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Start polling for attendance updates
      startPollingAttendance();
      
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
      setSuccessMessage(data?.status || "Live attendance system activated. Camera window opened.");
      setLastUpdated(new Date());
      
      // Stop polling when camera is closed
      stopPollingAttendance();
    } catch (error) {
      setErrorMessage(
        error?.message || "Unable to start live attendance. Make sure the backend server is running."
      );
      stopPollingAttendance();
    } finally {
      setIsStarting(false);
    }
  }, []);

  const fetchMarkedAttendance = useCallback(async () => {
    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const endpoint = `${baseURL}/attendance/marked`;

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
      setAttendanceData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.log("Unable to fetch attendance data");
    }
  }, []);

  const startPollingAttendance = useCallback(() => {
    setIsPolling(true);
    // Fetch immediately
    fetchMarkedAttendance();
    
    // Then fetch every 2 seconds
    const interval = setInterval(() => {
      fetchMarkedAttendance();
    }, 2000);
    
    setPollingInterval(interval);
  }, [fetchMarkedAttendance]);

  const stopPollingAttendance = useCallback(() => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
    setIsPolling(false);
  }, [pollingInterval]);

  const handleResetAttendance = useCallback(async () => {
    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const endpoint = `${baseURL}/attendance/reset`;

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setAttendanceData({
          total_students: 0,
          marked_count: 0,
          marked_students: [],
          unmarked_count: 0
        });
        setSuccessMessage("Attendance reset successfully");
      }
    } catch (error) {
      setErrorMessage("Failed to reset attendance");
    }
  }, []);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      stopPollingAttendance();
    };
  }, [stopPollingAttendance]);

  // Check if user is Super Admin
  const user = JSON.parse(localStorage.getItem("campus360_user") || "{}");
  const isSuperAdmin = user.role === "Super Admin";

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        badge="Smart Attendance"
        title="AI Face Recognition Attendance"
        subtitle={isSuperAdmin 
          ? "View real-time attendance data and student records" 
          : "Upload class photos, auto‑detect faces, and instantly mark attendance with reduced proxy."}
      />

      {isSuperAdmin && (
        <div className="mb-5">
          <SectionCard title="Super Admin - Attendance Overview">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Total Students</p>
                <p className="text-2xl font-bold text-emerald-400">{attendanceData.total_students || 1245}</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Present Today</p>
                <p className="text-2xl font-bold text-blue-400">{attendanceData.marked_count || 1087}</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Absent Today</p>
                <p className="text-2xl font-bold text-rose-400">{attendanceData.unmarked_count || 158}</p>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-xs text-slate-400 mb-2">Recent Attendance Records:</p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {attendanceData.marked_students.length > 0 ? (
                  attendanceData.marked_students.map((student, idx) => (
                    <div key={idx} className="bg-slate-900 rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-slate-200">{student.name}</p>
                        <p className="text-xs text-slate-400">Marked at: {student.time}</p>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-400">
                        Present
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-400 text-center py-3">
                    No recent attendance records
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-xs text-slate-500 mt-3">
              ℹ️ Super Admin has view-only access. Cannot start camera or mark attendance.
            </p>
          </SectionCard>
        </div>
      )}

      {!isSuperAdmin && (
      <div className="grid lg:grid-cols-3 gap-5">
        <SectionCard title="Live Camera Attendance">
          <p className="text-xs text-slate-300 mb-3">
            Start the live camera feed for real-time face recognition attendance.
            The system will automatically detect and mark students.
          </p>
          
          {errorMessage && (
            <p className="text-xs text-rose-400 mb-3">{errorMessage}</p>
          )}
          
          {successMessage && (
            <p className="text-xs text-emerald-400 mb-3">{successMessage}</p>
          )}
          
          <div className="border border-slate-600 rounded-2xl p-6 text-center mb-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xs text-slate-400">Camera window will open in separate window</p>
            {isPolling && (
              <p className="text-xs text-emerald-400 mt-2">● Live polling active</p>
            )}
          </div>
          
          <PrimaryButton
            className="w-full mb-2"
            onClick={startLiveAttendance}
            disabled={isStarting}
          >
            {isStarting ? "Starting..." : "Start Live Attendance"}
          </PrimaryButton>
          
          <PrimaryButton
            className="w-full bg-slate-700 hover:bg-slate-600"
            onClick={handleResetAttendance}
          >
            Reset Attendance
          </PrimaryButton>
          
          <p className="mt-3 text-[10px] text-slate-500">
            Press 'Q' key in camera window to stop
          </p>
        </SectionCard>

        <SectionCard title="Marked Attendance">
          <p className="text-xs text-slate-300 mb-3">
            Real-time attendance status
          </p>

          <div className="mb-4 p-3 bg-slate-900 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-400">Total Students:</span>
              <span className="text-sm font-semibold text-slate-200">{attendanceData.total_students}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-400">Marked:</span>
              <span className="text-sm font-semibold text-emerald-400">{attendanceData.marked_count}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Unmarked:</span>
              <span className="text-sm font-semibold text-rose-400">{attendanceData.unmarked_count}</span>
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-2">
            {attendanceData.marked_students.length > 0 ? (
              attendanceData.marked_students.map((student, idx) => (
                <div key={idx} className="bg-slate-900 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-slate-200">{student.name}</p>
                    <p className="text-[10px] text-slate-400">{student.time}</p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400">
                    {student.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-4">
                No students marked yet. Start camera to begin.
              </p>
            )}
          </div>

          {lastUpdated && (
            <p className="mt-3 text-[11px] text-slate-400">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </SectionCard>

        <SectionCard title="System Info">
          <p className="text-xs text-slate-300 mb-3">
            Live face recognition using OpenCV and LBPH algorithm.
          </p>

          <ul className="space-y-1.5 text-xs">
            <li>✓ Haar Cascade face detection</li>
            <li>✓ LBPH face recognition</li>
            <li>✓ Auto-attendance marking</li>
            <li>✓ Confidence threshold: &lt; 70</li>
            <li>✓ Real-time video processing</li>
            <li>✓ Auto-refresh every 2 seconds</li>
          </ul>

          <div className="mt-4 p-3 bg-slate-900 rounded-xl">
            <p className="text-xs text-slate-400 mb-2">Quick Stats</p>
            <p className="text-xs text-slate-300">
              Attendance Rate: {attendanceData.total_students > 0 
                ? Math.round((attendanceData.marked_count / attendanceData.total_students) * 100)
                : 0}%
            </p>
          </div>
        </SectionCard>
      </div>
      )}

      {!isSuperAdmin && (
      <div className="mt-5">
        <SectionCard title="Proxy & Alerts">
          <ul className="space-y-1.5 text-xs">
            <li>Flagged faces not present in previous sessions.</li>
            <li>Notify HOD and faculty for suspicious patterns.</li>
            <li>Export detailed attendance logs to admin portal.</li>
            <li>Real-time monitoring and instant notifications when attendance is marked.</li>
          </ul>
        </SectionCard>
      </div>
      )}
    </div>
  );
};

export default SmartAttendance;
