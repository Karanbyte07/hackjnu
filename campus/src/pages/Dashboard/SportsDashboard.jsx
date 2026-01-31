import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import BookingCard from "../../components/BookingCard";
import SectionCard from "../../components/SectionCard";
import PrimaryButton from "../../components/PrimaryButton";

const SportsDashboard = () => {
  const [newEquipment, setNewEquipment] = useState({ name: "", quantity: "" });
  const [equipmentList, setEquipmentList] = useState([
    { name: "Basketballs", available: 12, total: 15 },
    { name: "Cricket kits", available: 5, total: 8 },
    { name: "Tennis rackets", available: 8, total: 10 }
  ]);

  const handleAddEquipment = (e) => {
    e.preventDefault();
    if (newEquipment.name && newEquipment.quantity) {
      setEquipmentList([...equipmentList, { 
        name: newEquipment.name, 
        available: parseInt(newEquipment.quantity), 
        total: parseInt(newEquipment.quantity) 
      }]);
      setNewEquipment({ name: "", quantity: "" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        badge="Sports Lead"
        title="Sports Management Dashboard"
        subtitle="Manage equipment inventory, bookings, and view student sports data."
      />

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <SectionCard title="Today's Bookings">
          <BookingCard
            title="Basketball – Court 01"
            time="5:00 PM – 6:00 PM"
            meta="Varsity Practice • Coach Mike Johnson"
            status="Confirmed"
          />
          <BookingCard
            title="Cricket Nets"
            time="6:00 PM – 7:00 PM"
            meta="Inter‑college trials"
            status="Waitlist"
          />
          <Link to="/sports-booking">
            <PrimaryButton className="w-full mt-3 text-xs">View All Bookings</PrimaryButton>
          </Link>
        </SectionCard>

        <SectionCard title="Equipment Inventory">
          <div className="space-y-2 max-h-48 overflow-y-auto mb-3">
            {equipmentList.map((item, idx) => (
              <div key={idx} className="bg-slate-900 rounded-lg px-3 py-2">
                <p className="text-xs text-slate-200">{item.name}</p>
                <p className="text-[10px] text-slate-400">
                  Available: {item.available} / {item.total}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Student Sports Data">
          <ul className="text-xs space-y-2">
            <li className="bg-slate-900 rounded-lg px-3 py-2">
              <p className="text-slate-200">Total Active Players</p>
              <p className="text-emerald-400 font-semibold">342</p>
            </li>
            <li className="bg-slate-900 rounded-lg px-3 py-2">
              <p className="text-slate-200">Equipment Bookings Today</p>
              <p className="text-blue-400 font-semibold">67</p>
            </li>
            <li className="bg-slate-900 rounded-lg px-3 py-2">
              <p className="text-slate-200">Pending Requests</p>
              <p className="text-yellow-400 font-semibold">12</p>
            </li>
          </ul>
        </SectionCard>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <SectionCard title="Add New Equipment">
          <p className="text-xs text-slate-300 mb-3">Add equipment to inventory</p>
          <form onSubmit={handleAddEquipment} className="space-y-3">
            <div>
              <label className="text-[11px] text-slate-400 mb-1 block">Equipment Name</label>
              <input
                type="text"
                value={newEquipment.name}
                onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs"
                placeholder="e.g., Volleyball"
                required
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 mb-1 block">Quantity</label>
              <input
                type="number"
                value={newEquipment.quantity}
                onChange={(e) => setNewEquipment({ ...newEquipment, quantity: e.target.value })}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs"
                placeholder="e.g., 10"
                min="1"
                required
              />
            </div>
            <PrimaryButton type="submit" className="w-full">Add Equipment</PrimaryButton>
          </form>
        </SectionCard>

        <SectionCard title="Quick Actions">
          <div className="space-y-2">
            <Link to="/sports-booking">
              <button className="w-full text-left bg-slate-900 hover:bg-slate-800 rounded-xl px-4 py-3 border border-slate-800 hover:border-emerald-500/50 transition-all">
                <p className="text-sm text-slate-200">Manage Bookings</p>
                <p className="text-xs text-slate-400">View and modify all sports bookings</p>
              </button>
            </Link>
            <button className="w-full text-left bg-slate-900 hover:bg-slate-800 rounded-xl px-4 py-3 border border-slate-800 hover:border-blue-500/50 transition-all">
              <p className="text-sm text-slate-200">Student Reports</p>
              <p className="text-xs text-slate-400">View student participation data</p>
            </button>
            <button className="w-full text-left bg-slate-900 hover:bg-slate-800 rounded-xl px-4 py-3 border border-slate-800 hover:border-yellow-500/50 transition-all">
              <p className="text-sm text-slate-200">Send Announcements</p>
              <p className="text-xs text-slate-400">Notify students about events</p>
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default SportsDashboard;
