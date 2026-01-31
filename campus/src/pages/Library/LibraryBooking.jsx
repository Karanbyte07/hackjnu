import React, { useState, useCallback } from "react";
import PageHeader from "../../components/PageHeader";
import SectionCard from "../../components/SectionCard";
import PrimaryButton from "../../components/PrimaryButton";

const LibraryBooking = () => {
  const [libraryStatus, setLibraryStatus] = useState({
    total_seats: 120,
    available_seats: 45,
    charging_points: 20,
    books_available: 150
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchLibraryStatus = useCallback(async () => {
    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const endpoint = `${baseURL}/library/status`;

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
      setLibraryStatus(data);
    } catch (error) {
      setErrorMessage(
        error?.message || "Unable to fetch library status. Make sure the backend server is running."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        badge="Library"
        title="Smart Library & Study Space"
        subtitle="Pre‑book study spaces, choose power sockets, and reserve books online."
      />

      <div className="grid lg:grid-cols-4 gap-5 mb-5">
        <SectionCard title="Total Seats">
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-400">{libraryStatus.total_seats}</p>
            <p className="text-xs text-slate-400 mt-1">Total library seats</p>
          </div>
        </SectionCard>
        
        <SectionCard title="Available Seats">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-400">{libraryStatus.available_seats}</p>
            <p className="text-xs text-slate-400 mt-1">Seats available now</p>
          </div>
        </SectionCard>
        
        <SectionCard title="Charging Points">
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-400">{libraryStatus.charging_points}</p>
            <p className="text-xs text-slate-400 mt-1">Power sockets</p>
          </div>
        </SectionCard>
        
        <SectionCard title="Books Available">
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-400">{libraryStatus.books_available}</p>
            <p className="text-xs text-slate-400 mt-1">Books to borrow</p>
            <PrimaryButton className="w-full mt-3" onClick={fetchLibraryStatus} disabled={isLoading}>
              {isLoading ? "Refreshing..." : "Refresh Status"}
            </PrimaryButton>
          </div>
        </SectionCard>
      </div>
      
      {errorMessage && (
        <p className="text-xs text-rose-400 mb-3 text-center">{errorMessage}</p>
      )}

      <div className="grid lg:grid-cols-3 gap-5">
        <SectionCard title="Book Study Seat">
          <label className="text-[11px] text-slate-400 mb-1 block">
            Laptop required
          </label>
          <select className="w-full mb-2 rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs">
            <option>Yes, with power socket</option>
            <option>No, normal seat is fine</option>
          </select>

          <label className="text-[11px] text-slate-400 mb-1 block">
            Number of seats
          </label>
          <input
            type="number"
            defaultValue={1}
            min={1}
            max={4}
            className="w-full mb-2 rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs"
          />

          <PrimaryButton className="w-full mt-1">Check Availability</PrimaryButton>
        </SectionCard>

        <SectionCard title="Book Reservation">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            className="w-full mb-2 rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs"
          />
          <ul className="text-xs space-y-1.5">
            <li>Designing Interfaces – 2 copies available.</li>
            <li>Neuroscience (AI Edition) – wait‑list open.</li>
            <li>The Psychology of Color – reserve for 48h pickup.</li>
          </ul>
        </SectionCard>

        <SectionCard title="Reservation Status">
          <ul className="text-xs space-y-1.5">
            <li>Seat B‑12 • Floor 1 – Confirmed (2–4 PM).</li>
            <li>Book: Designing Interfaces – Pickup within 24h.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
};

export default LibraryBooking;
