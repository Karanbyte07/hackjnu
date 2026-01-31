import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import SectionCard from "../../components/SectionCard";
import PrimaryButton from "../../components/PrimaryButton";

const FacultyLeadDashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setUploadMessage("Image uploaded successfully! Ready to mark attendance.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMarkAttendance = () => {
    if (selectedImage) {
      setUploadMessage("✅ Attendance marked successfully for uploaded image!");
      setTimeout(() => {
        setSelectedImage(null);
        setUploadMessage("");
      }, 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        badge="Faculty Lead (HOD)"
        title="Department Management Dashboard"
        subtitle="Manual attendance, student data, washroom management, and department health tracking."
      />

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <SectionCard title="Manual Attendance">
          <p className="text-xs text-slate-300 mb-3">
            Upload class photo to mark attendance
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          {selectedImage ? (
            <div className="mb-3">
              <img 
                src={selectedImage} 
                alt="Uploaded" 
                className="w-full h-32 object-cover rounded-xl border border-slate-700"
              />
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center mb-3 cursor-pointer hover:border-emerald-500/50 transition-all"
            >
              <p className="text-xs text-slate-400">Click to upload image</p>
            </div>
          )}

          {uploadMessage && (
            <p className={`text-xs mb-3 ${
              uploadMessage.includes('✅') ? 'text-emerald-400' : 'text-blue-400'
            }`}>
              {uploadMessage}
            </p>
          )}
          
          <PrimaryButton 
            className="w-full mb-2" 
            onClick={handleMarkAttendance}
            disabled={!selectedImage}
          >
            Mark Attendance
          </PrimaryButton>
          <PrimaryButton 
            className="w-full bg-slate-700 hover:bg-slate-600" 
            onClick={() => fileInputRef.current.click()}
          >
            Choose Image
          </PrimaryButton>
        </SectionCard>

        <SectionCard title="Student Data Overview">
          <ul className="text-xs space-y-2">
            <li className="bg-slate-900 rounded-lg px-3 py-2">
              <p className="text-slate-200">Total Students</p>
              <p className="text-emerald-400 font-semibold">1,245</p>
            </li>
            <li className="bg-slate-900 rounded-lg px-3 py-2">
              <p className="text-slate-200">Average Attendance</p>
              <p className="text-blue-400 font-semibold">87.5%</p>
            </li>
            <li className="bg-slate-900 rounded-lg px-3 py-2">
              <p className="text-slate-200">Pending Issues</p>
              <p className="text-yellow-400 font-semibold">8</p>
            </li>
          </ul>
          <Link to="/attendance">
            <PrimaryButton className="w-full mt-3 text-xs">View Attendance System</PrimaryButton>
          </Link>
        </SectionCard>

        <SectionCard title="Washroom Alerts">
          <ul className="space-y-2 text-xs">
            <li className="bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2">
              <p className="text-rose-400 font-semibold">Water leakage</p>
              <p className="text-slate-400">Block C, 2nd Floor</p>
            </li>
            <li className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-3 py-2">
              <p className="text-yellow-400 font-semibold">Maintenance needed</p>
              <p className="text-slate-400">Block A, 1st Floor</p>
            </li>
          </ul>
          <Link to="/washrooms">
            <PrimaryButton className="w-full mt-3 text-xs">Manage Washrooms</PrimaryButton>
          </Link>
        </SectionCard>
      </div>

      <SectionCard title="Quick Access - Faculty Tools">
        <p className="text-xs text-slate-300 mb-4">
          Access student management features
        </p>
        <div className="grid md:grid-cols-3 gap-3">
          <Link to="/attendance">
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer">
              <p className="text-sm font-semibold text-emerald-400">Smart Attendance</p>
              <p className="text-xs text-slate-400 mt-1">View & manage attendance</p>
            </div>
          </Link>
          <Link to="/washrooms">
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer">
              <p className="text-sm font-semibold text-blue-400">Washroom Management</p>
              <p className="text-xs text-slate-400 mt-1">Track facility issues</p>
            </div>
          </Link>
          <button className="text-left bg-slate-900 rounded-xl p-4 border border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer">
            <p className="text-sm font-semibold text-purple-400">Student Reports</p>
            <p className="text-xs text-slate-400 mt-1">Generate analytics</p>
          </button>
        </div>
      </SectionCard>
    </div>
  );
};

export default FacultyLeadDashboard;
