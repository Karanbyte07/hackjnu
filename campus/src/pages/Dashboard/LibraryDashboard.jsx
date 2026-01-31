import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import SectionCard from "../../components/SectionCard";
import PrimaryButton from "../../components/PrimaryButton";

const LibraryDashboard = () => {
  const [bookInventory, setBookInventory] = useState([
    { title: "Designing Interfaces", copies: 4, reserved: 1 },
    { title: "Neuroscience (AI-Edition)", copies: 6, reserved: 2 },
    { title: "The Psychology of Color", copies: 3, reserved: 1 },
    { title: "Deep Learning Fundamentals", copies: 5, reserved: 0 },
  ]);

  const [newBook, setNewBook] = useState({ title: "", copies: "" });

  const handleAddBook = () => {
    if (newBook.title && newBook.copies) {
      setBookInventory([
        ...bookInventory,
        { title: newBook.title, copies: parseInt(newBook.copies), reserved: 0 },
      ]);
      setNewBook({ title: "", copies: "" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        badge="Library Admin"
        title="Library Management Dashboard"
        subtitle="Manage live seating, book inventory, and student reservations."
      />

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Live Occupancy"
          value="78%"
          hint="Main Hall, Floor 1"
          trend="+6%"
        />
        <StatCard
          label="Active Seat Bookings"
          value="42 / 100"
          hint="Study seats"
        />
        <StatCard
          label="Book Reservations"
          value="28"
          hint="Pending pickup"
        />
        <StatCard
          label="Total Books"
          value={bookInventory.reduce((sum, book) => sum + book.copies, 0)}
          hint="In inventory"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <SectionCard title="Seat Availability Map">
          <p className="text-xs text-slate-300 mb-3">
            Live seat status: Green = Available, Yellow = Reserved, Gray = Occupied
          </p>
          <div className="grid grid-cols-10 gap-1.5 mb-3">
            {Array.from({ length: 50 }).map((_, idx) => (
              <div
                key={idx}
                className={`aspect-square rounded-md ${
                  idx % 7 === 0
                    ? "bg-emerald-400/80"
                    : idx % 5 === 0
                    ? "bg-yellow-400/80"
                    : "bg-slate-700"
                }`}
                title={`Seat ${idx + 1}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-emerald-400">22 Free</span>
            <span className="text-yellow-400">15 Reserved</span>
            <span className="text-slate-400">13 Occupied</span>
          </div>
          <Link to="/library-booking">
            <PrimaryButton className="w-full mt-3 text-xs">
              Manage Seat Bookings
            </PrimaryButton>
          </Link>
        </SectionCard>

        <SectionCard title="Add New Book">
          <p className="text-xs text-slate-300 mb-3">
            Add books to library inventory
          </p>
          <input
            type="text"
            placeholder="Book Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="w-full px-3 py-2 mb-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
          />
          <input
            type="number"
            placeholder="Number of Copies"
            value={newBook.copies}
            onChange={(e) => setNewBook({ ...newBook, copies: e.target.value })}
            className="w-full px-3 py-2 mb-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
          />
          <PrimaryButton onClick={handleAddBook} className="w-full">
            Add Book
          </PrimaryButton>
        </SectionCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <SectionCard title="Book Inventory">
          <p className="text-xs text-slate-300 mb-3">
            Current library collection
          </p>
          <div className="space-y-2">
            {bookInventory.map((book, idx) => (
              <div
                key={idx}
                className="bg-slate-900 rounded-lg px-3 py-2 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-slate-200">{book.title}</p>
                  <p className="text-xs text-slate-400">
                    {book.copies - book.reserved} available • {book.reserved} reserved
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-emerald-400">
                    {book.copies}
                  </p>
                  <p className="text-xs text-slate-400">total</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Student Booking Data">
          <p className="text-xs text-slate-300 mb-3">
            Recent seat and book reservations
          </p>
          <div className="space-y-2">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2">
              <p className="text-sm text-blue-400 font-semibold">Arjun Patel</p>
              <p className="text-xs text-slate-400">Seat A12 • 10:00-12:00 AM</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg px-3 py-2">
              <p className="text-sm text-purple-400 font-semibold">Priya Sharma</p>
              <p className="text-xs text-slate-400">Reserved: Deep Learning Book</p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2">
              <p className="text-sm text-emerald-400 font-semibold">Rahul Verma</p>
              <p className="text-xs text-slate-400">Power Seat P4 • 2:00-5:00 PM</p>
            </div>
          </div>
          <PrimaryButton className="w-full mt-3 text-xs bg-slate-700 hover:bg-slate-600">
            View All Bookings
          </PrimaryButton>
        </SectionCard>
      </div>
    </div>
  );
};

export default LibraryDashboard;
