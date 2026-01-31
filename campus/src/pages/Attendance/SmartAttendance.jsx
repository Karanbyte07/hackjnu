import React, { useCallback, useState } from "react";
import PageHeader from "../../components/PageHeader";
import SectionCard from "../../components/SectionCard";
import PrimaryButton from "../../components/PrimaryButton";

const SmartAttendance = () => {
  const [isStarting, setIsStarting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [attendanceData, setAttendanceData] = useState({
    students: {},
    markedTime: {}
  });
  const [lastUpdated, setLastUpdated] = useState(null);

  const startLiveAttendance = useCallback(async () => {
    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const endpoint = `${baseURL}/attendance/live`;

    setIsStarting(true);
    setErrorMessage("");
    setSuccessMessage("");

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
      setSuccessMessage(data?.status || "Live attendance system activated. Camera window opened.");
      setLastUpdated(new Date());
    } catch (error) {
      setErrorMessage(
        error?.message || "Unable to start live attendance. Make sure the backend server is running."
      );
    } finally {
      setIsStarting(false);
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        badge="Smart Attendance"
        title="AI Face Recognition Attendance"
        subtitle="Upload class photos, auto‑detect faces, and instantly mark attendance with reduced proxy."
      />

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
          </div>
          
          <PrimaryButton
            className="w-full"
            onClick={startLiveAttendance}
            disabled={isStarting}
          >
            {isStarting ? "Starting..." : "Start Live Attendance"}
          </PrimaryButton>
          
          <p className="mt-3 text-[10px] text-slate-500">
            Press 'Q' key in camera window to stop
          </p>
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
          </ul>

          {lastUpdated && (
            <p className="mt-3 text-[11px] text-slate-400">
              Last started: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </SectionCard>

        <SectionCard title="Proxy & Alerts">
          <ul className="space-y-1.5 text-xs">
            <li>Flagged faces not present in previous sessions.</li>
            <li>Notify HOD and faculty for suspicious patterns.</li>
            <li>Export detailed attendance logs to admin portal.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
};

export default SmartAttendance;
