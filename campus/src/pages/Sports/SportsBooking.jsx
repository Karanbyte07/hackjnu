import React, { useState, useCallback } from "react";
import PageHeader from "../../components/PageHeader";
import BookingCard from "../../components/BookingCard";
import PrimaryButton from "../../components/PrimaryButton";
import SectionCard from "../../components/SectionCard";

const SportsBooking = () => {
  const [equipmentData, setEquipmentData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  const fetchEquipmentStatus = useCallback(async () => {
    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const endpoint = `${baseURL}/sports/equipment`;

    setIsLoading(true);
    setMessage("");

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
      setEquipmentData(data);
    } catch (error) {
      setMessage(error?.message || "Unable to fetch equipment status.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleBookEquipment = useCallback(async () => {
    if (!selectedItem) {
      setMessage("Please select an item first.");
      return;
    }

    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const endpoint = `${baseURL}/sports/equipment/book`;

    setIsBooking(true);
    setMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: selectedItem,
          quantity: quantity
        }),
      });

      if (!response.ok) {
        throw new Error(`Booking failed with status ${response.status}`);
      }

      const data = await response.json();
      setMessage(data?.message || "Equipment booked successfully!");
      fetchEquipmentStatus(); // Refresh the equipment status
    } catch (error) {
      setMessage(error?.message || "Unable to book equipment.");
    } finally {
      setIsBooking(false);
    }
  }, [selectedItem, quantity, fetchEquipmentStatus]);

  React.useEffect(() => {
    fetchEquipmentStatus();
  }, [fetchEquipmentStatus]);
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        badge="Sports"
        title="Smart Sports Facility Booking"
        subtitle="Book slots for basketball, cricket, TT, indoor games, and manage equipment in real time."
      />

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <SectionCard title="Equipment Inventory">
          <p className="text-xs text-slate-300 mb-3">
            Real-time equipment availability
          </p>
          
          {isLoading ? (
            <p className="text-xs text-slate-400">Loading...</p>
          ) : (
            <div className="space-y-2">
              {Object.keys(equipmentData).map((key) => {
                const item = equipmentData[key];
                const isAvailable = item.available > 0;
                return (
                  <div key={key} className="flex justify-between items-center bg-slate-900 rounded-xl px-3 py-2">
                    <div>
                      <p className="text-xs font-medium text-slate-200">
                        {key.replace(/_/g, ' ').toUpperCase()}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Available: {item.available} / {item.total}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-[10px] ${
                      isAvailable ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          
          <PrimaryButton className="w-full mt-3" onClick={fetchEquipmentStatus} disabled={isLoading}>
            {isLoading ? "Refreshing..." : "Refresh Status"}
          </PrimaryButton>
        </SectionCard>
        
        <SectionCard title="Book Equipment">
          <p className="text-xs text-slate-300 mb-3">
            Select equipment to book
          </p>
          
          <label className="text-[11px] text-slate-400 mb-1 block">
            Equipment Type
          </label>
          <select 
            className="w-full mb-3 rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
          >
            <option value="">Select equipment</option>
            <option value="cricket_bat">Cricket Bat</option>
            <option value="cricket_ball">Cricket Ball</option>
            <option value="football">Football</option>
          </select>
          
          <label className="text-[11px] text-slate-400 mb-1 block">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            min={1}
            max={10}
            className="w-full mb-3 rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs"
          />
          
          {message && (
            <p className={`text-xs mb-3 ${
              message.includes('success') ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {message}
            </p>
          )}
          
          <PrimaryButton
            className="w-full"
            onClick={handleBookEquipment}
            disabled={!selectedItem || isBooking}
          >
            {isBooking ? "Booking..." : "Book Equipment"}
          </PrimaryButton>
        </SectionCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <section className="lg:col-span-2 rounded-2xl bg-[#020617] border border-slate-800 px-4 py-4">
          <p className="text-xs text-slate-300 mb-3">
            Time‑based slots (e.g., 30 minutes) with color coded availability.
          </p>
          <div className="grid grid-cols-7 gap-2 text-[11px]">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="text-center text-slate-400">
                {d}
              </div>
            ))}
            {Array.from({ length: 14 }).map((_, idx) => (
              <button
                key={idx}
                className={`py-2 rounded-xl ${
                  idx % 4 === 0
                    ? "bg-emerald-500/80 text-slate-900"
                    : idx % 3 === 0
                    ? "bg-yellow-400/80 text-slate-900"
                    : "bg-slate-800 text-slate-200"
                } text-[10px]`}
              >
                5:00 PM
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-[#020617] border border-slate-800 px-4 py-4 space-y-3">
          <BookingCard
            title="Today’s Booking"
            time="Basketball • Court 1"
            meta="5:00 – 5:30 PM"
            status="Confirmed"
          />
          <BookingCard
            title="Next"
            time="Table Tennis"
            meta="6:00 – 6:30 PM"
            status="Requested"
          />
          <PrimaryButton className="w-full mt-1">Confirm Slot</PrimaryButton>
        </section>
      </div>
    </div>
  );
};

export default SportsBooking;
