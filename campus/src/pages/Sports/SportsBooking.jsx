import React, { useState, useCallback, useMemo } from "react";
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
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [equipmentBookings, setEquipmentBookings] = useState([]);
  const [inventoryFilter, setInventoryFilter] = useState("all");
  const [inventorySort, setInventorySort] = useState("name");

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
      
      // Also fetch time slots
      const slotsResponse = await fetch(`${baseURL}/sports/equipment/time-slots`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (slotsResponse.ok) {
        const slotsData = await slotsResponse.json();
        setAvailableTimeSlots(slotsData.available_slots || []);
      }
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

    if (!selectedTimeSlot) {
      setMessage("Please select a time slot.");
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
          quantity: quantity,
          time_slot: selectedTimeSlot
        }),
      });

      if (!response.ok) {
        throw new Error(`Booking failed with status ${response.status}`);
      }

      const data = await response.json();
      setMessage(data?.message || "Equipment booked successfully!");
      
        // Add to local bookings
        setEquipmentBookings(prev => [...prev, {
          equipment: data.display_name || selectedItem,
          quantity: quantity,
          time_slot: selectedTimeSlot,
          status: "Confirmed"
        }]);
      
      setSelectedItem("");
      setSelectedTimeSlot("");
      fetchEquipmentStatus(); // Refresh the equipment status
    } catch (error) {
      setMessage(error?.message || "Unable to book equipment.");
    } finally {
      setIsBooking(false);
    }
  }, [selectedItem, quantity, selectedTimeSlot, fetchEquipmentStatus]);


  React.useEffect(() => {
    fetchEquipmentStatus();
  }, [fetchEquipmentStatus]);

  React.useEffect(() => {
    const handleChatAction = () => {
      fetchEquipmentStatus();
    };

    window.addEventListener("campus360:sports-booking", handleChatAction);
    return () => window.removeEventListener("campus360:sports-booking", handleChatAction);
  }, [fetchEquipmentStatus]);

  const filteredEquipment = useMemo(() => {
    const entries = Object.entries(equipmentData);
    const filtered = entries.filter(([, item]) => {
      if (inventoryFilter === "available") return item.available > 0;
      if (inventoryFilter === "unavailable") return item.available === 0;
      return true;
    });

    const sorted = filtered.sort((a, b) => {
      const aItem = a[1];
      const bItem = b[1];
      if (inventorySort === "availability") {
        return bItem.available - aItem.available;
      }
      const aName = (aItem.display_name || a[0]).toLowerCase();
      const bName = (bItem.display_name || b[0]).toLowerCase();
      return aName.localeCompare(bName);
    });

    return sorted;
  }, [equipmentData, inventoryFilter, inventorySort]);

  // Check if user is Super Admin
  const user = JSON.parse(localStorage.getItem("campus360_user") || "{}");
  const isSuperAdmin = user.role === "Super Admin";

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        badge="Sports"
        title="Smart Sports Facility Booking"
        subtitle={isSuperAdmin 
          ? "View sports equipment bookings and facility usage data" 
          : "Book slots for basketball, cricket, TT, indoor games, and manage equipment in real time."}
      />

      {isSuperAdmin && (
        <div className="mb-5">
          <SectionCard title="Super Admin - Sports Booking Overview">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Active Players</p>
                <p className="text-2xl font-bold text-emerald-400">342</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Total Bookings</p>
                <p className="text-2xl font-bold text-blue-400">{equipmentBookings.length || 67}</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Equipment Types</p>
                <p className="text-2xl font-bold text-purple-400">{Object.keys(equipmentData).length || 6}</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Available Items</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {Object.values(equipmentData).reduce((sum, item) => sum + item.available, 0) || 45}
                </p>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-xs text-slate-400 mb-2">Recent Equipment Bookings:</p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {equipmentBookings.length > 0 ? (
                  equipmentBookings.map((booking, idx) => (
                    <div key={idx} className="bg-slate-900 rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-slate-200">{booking.equipment}</p>
                        <p className="text-xs text-slate-400">Qty: {booking.quantity} • {booking.time_slot}</p>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-400">
                        {booking.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-400 text-center py-3">
                    No recent bookings available
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-xs text-slate-500 mt-3">
              ℹ️ Super Admin has view-only access. Cannot create or modify bookings.
            </p>
          </SectionCard>
        </div>
      )}

      {!isSuperAdmin && (
      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <SectionCard title="Equipment Inventory">
          <p className="text-xs text-slate-300 mb-3">
            Real-time equipment availability
          </p>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <label className="text-[11px] text-slate-400 mb-1 block">
                Show
              </label>
              <select
                className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs"
                value={inventoryFilter}
                onChange={(e) => setInventoryFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="available">Available</option>
                <option value="unavailable">Not Available</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 mb-1 block">
                Sort by
              </label>
              <select
                className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs"
                value={inventorySort}
                onChange={(e) => setInventorySort(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="availability">Availability</option>
              </select>
            </div>
          </div>
          
          {isLoading ? (
            <p className="text-xs text-slate-400">Loading...</p>
          ) : (
            <div className="space-y-2">
              {filteredEquipment.length === 0 ? (
                <p className="text-xs text-slate-400">No equipment found.</p>
              ) : filteredEquipment.map(([key, item]) => {
                const isAvailable = item.available > 0;
                return (
                  <div key={key} className="flex justify-between items-center bg-slate-900 rounded-xl px-3 py-2">
                    <div>
                      <p className="text-xs font-medium text-slate-200">
                        {item.display_name || key.replace(/_/g, ' ').toUpperCase()}
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
            <option value="cricket">Cricket Kit</option>
            <option value="football">Football</option>
            <option value="badminton">Badminton Racket</option>
            <option value="table_tennis">Table Tennis Paddle</option>
            <option value="basketball">Basketball</option>
            <option value="volleyball">Volleyball</option>
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
          
          <label className="text-[11px] text-slate-400 mb-1 block">
            Time Slot
          </label>
          <select 
            className="w-full mb-3 rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs"
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            disabled={!selectedItem}
          >
            <option value="">Select time slot</option>
            {availableTimeSlots.map((slot, idx) => (
              <option key={idx} value={slot}>{slot}</option>
            ))}
          </select>
          
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
            disabled={!selectedItem || !selectedTimeSlot || isBooking}
          >
            {isBooking ? "Booking..." : "Book Equipment"}
          </PrimaryButton>
        </SectionCard>
      </div>
      )}

      {!isSuperAdmin && (
      <div className="mt-5">
        <section className="rounded-2xl bg-[#020617] border border-slate-800 px-4 py-4 space-y-3">
          <div>
            <p className="text-sm font-semibold text-slate-200 mb-2">My Bookings</p>
            <p className="text-xs text-slate-400 mb-3">
              Total: {equipmentBookings.length} active booking{equipmentBookings.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {equipmentBookings.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {equipmentBookings.map((booking, idx) => (
                <BookingCard
                  key={idx}
                  title={booking.equipment}
                  time={`Quantity: ${booking.quantity}`}
                  meta={`Time: ${booking.time_slot}`}
                  status={booking.status || "Confirmed"}
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 py-4 text-center">
              No active bookings. Book equipment to get started!
            </p>
          )}
        </section>
      </div>
      )}
    </div>
  );
};

export default SportsBooking;
