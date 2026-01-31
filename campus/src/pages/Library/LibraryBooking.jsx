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
  const [seatRequirement, setSeatRequirement] = useState("yes");
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [availabilityResults, setAvailabilityResults] = useState(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [bookingDuration, setBookingDuration] = useState("3");
  const [isBookingSeat, setIsBookingSeat] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookedBooks, setBookedBooks] = useState([]);
  const [selectedBookTitle, setSelectedBookTitle] = useState(null);
  const [bookPickupDate, setBookPickupDate] = useState("");
  const [bookFromDate, setBookFromDate] = useState("");
  const [bookToDate, setBookToDate] = useState("");

  const availableBooksList = [
    { title: "Designing Interfaces", copies: "2 copies available" },
    { title: "Neuroscience (AI Edition)", copies: "Wait-list open" },
    { title: "The Psychology of Color", copies: "Reserve for 48h pickup" },
    { title: "Physics: Fundamentals & Applications", copies: "5 copies available" },
    { title: "Chemistry: Organic & Inorganic", copies: "3 copies available" },
    { title: "Mathematics: Advanced Calculus", copies: "4 copies available" },
    { title: "Data Structures & Algorithms", copies: "6 copies available" },
    { title: "Database Management Systems", copies: "2 copies available" },
    { title: "Artificial Intelligence Basics", copies: "3 copies available" },
    { title: "Web Development with React", copies: "Wait-list open" }
  ];

  React.useEffect(() => {
    const savedBooking = localStorage.getItem("campus360_library_booking");
    if (savedBooking) {
      try {
        setBookingDetails(JSON.parse(savedBooking));
      } catch {
        localStorage.removeItem("campus360_library_booking");
      }
    }
    
    // Load booked books from localStorage
    const savedBookedBooks = localStorage.getItem("campus360_booked_books");
    if (savedBookedBooks) {
      try {
        setBookedBooks(JSON.parse(savedBookedBooks));
      } catch {
        localStorage.removeItem("campus360_booked_books");
      }
    }
  }, []);

  // Check if user is Super Admin
  const user = JSON.parse(localStorage.getItem("campus360_user") || "{}");
  const isSuperAdmin = user.role === "Super Admin";

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

  const handleCheckAvailability = useCallback(async () => {
    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const endpoint = `${baseURL}/library/check-availability`;

    setIsCheckingAvailability(true);
    setErrorMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seats: numberOfSeats,
          power_socket: seatRequirement === "yes"
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setAvailabilityResults(data);
    } catch (error) {
      setErrorMessage(
        error?.message || "Unable to check availability. Make sure the backend server is running."
      );
    } finally {
      setIsCheckingAvailability(false);
    }
  }, [numberOfSeats, seatRequirement]);

  const handleSelectSeat = useCallback((seat) => {
    setSelectedSeat(seat);
    setSelectedTimeSlot("");
    setBookingMessage("");
    setBookingDetails(null);
  }, []);

  const handleBookSeat = useCallback(async () => {
    if (!selectedTimeSlot) {
      setBookingMessage("Please select a time slot");
      return;
    }

    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const endpoint = `${baseURL}/library/book-seat`;

    setIsBookingSeat(true);
    setBookingMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seat_id: selectedSeat.seat_id,
          time_slot: selectedTimeSlot,
          duration: bookingDuration,
          floor: selectedSeat.floor,
          section: selectedSeat.section
        }),
      });

      if (!response.ok) {
        throw new Error(`Booking failed with status ${response.status}`);
      }

      const data = await response.json();
      const dummyNames = ["Aarav Sharma", "Isha Patel", "Rohan Verma", "Ananya Gupta"];
      const bookedBy = dummyNames[Math.floor(Math.random() * dummyNames.length)];
      const userId = "STU-2026-041";
      setBookingDetails({
        user: userId,
        name: bookedBy,
        seat_id: selectedSeat.seat_id,
        time_slot: selectedTimeSlot,
        duration: bookingDuration,
        floor: selectedSeat.floor,
        section: selectedSeat.section
      });
      localStorage.setItem(
        "campus360_library_booking",
        JSON.stringify({
          user: userId,
          name: bookedBy,
          seat_id: selectedSeat.seat_id,
          time_slot: selectedTimeSlot,
          duration: bookingDuration,
          floor: selectedSeat.floor,
          section: selectedSeat.section
        })
      );
      setBookingMessage(
        `✅ Booking confirmed for ${bookedBy}. Seat ${selectedSeat.seat_id} at ${selectedTimeSlot}.`
      );
      
      // Reset form after successful booking
      setTimeout(() => {
        setSelectedSeat(null);
        setAvailabilityResults(null);
        fetchLibraryStatus();
      }, 2000);
    } catch (error) {
      setBookingMessage(error?.message || "Unable to book seat.");
    } finally {
      setIsBookingSeat(false);
    }
  }, [selectedSeat, selectedTimeSlot, bookingDuration, fetchLibraryStatus]);

  const handleBookBook = useCallback((bookTitle, fromDate, toDate) => {
    if (!fromDate || !toDate) {
      return;
    }
    
    const newBook = {
      title: bookTitle,
      fromDate: new Date(fromDate).toLocaleDateString(),
      toDate: new Date(toDate).toLocaleDateString(),
      bookedDate: new Date().toLocaleDateString()
    };
    
    const updatedBooks = [...bookedBooks, newBook];
    setBookedBooks(updatedBooks);
    localStorage.setItem("campus360_booked_books", JSON.stringify(updatedBooks));
    
    setBookingMessage(`✅ "${bookTitle}" reserved from ${new Date(fromDate).toLocaleDateString()} to ${new Date(toDate).toLocaleDateString()}.`);
    setTimeout(() => setBookingMessage(""), 3000);
    
    setSelectedBookTitle(null);
    setBookFromDate("");
    setBookToDate("");
  }, [bookedBooks]);

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        badge="Library"
        title="Smart Library & Study Space"
        subtitle={isSuperAdmin 
          ? "View library seat bookings and occupancy data" 
          : "Pre‑book study spaces, choose power sockets, and reserve books online."}
      />

      {isSuperAdmin && (
        <div className="mb-5">
          <SectionCard title="Super Admin - Library Overview">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Total Seats</p>
                <p className="text-2xl font-bold text-emerald-400">{libraryStatus.total_seats || 120}</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Available Now</p>
                <p className="text-2xl font-bold text-blue-400">{libraryStatus.available_seats || 45}</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Booked Seats</p>
                <p className="text-2xl font-bold text-purple-400">{(libraryStatus.total_seats - libraryStatus.available_seats) || 75}</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Power Outlets</p>
                <p className="text-2xl font-bold text-yellow-400">{libraryStatus.charging_points || 20}</p>
              </div>
            </div>
            
            {bookingDetails && (
              <div className="mb-3">
                <p className="text-xs text-slate-400 mb-2">Active Booking:</p>
                <div className="bg-slate-900 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-sm font-medium text-slate-200">{bookingDetails.name}</p>
                      <p className="text-xs text-slate-400">Student ID: {bookingDetails.user}</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-400">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Seat: {bookingDetails.seat_id} • {bookingDetails.time_slot}</p>
                  <p className="text-xs text-slate-400">Duration: {bookingDetails.duration} hours</p>
                </div>
              </div>
            )}
            
            <p className="text-xs text-slate-500 mt-3">
              ℹ️ Super Admin has view-only access. Cannot create or modify bookings.
            </p>
          </SectionCard>
        </div>
      )}

      {!isSuperAdmin && (
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
      )}
        
      {errorMessage && (
        <p className="text-xs text-rose-400 mb-3 text-center">{errorMessage}</p>
      )}

      {!isSuperAdmin && (
        <div className="grid lg:grid-cols-2 gap-5">
          <SectionCard title="Available Books">
            <ul className="text-xs space-y-2 max-h-96 overflow-y-auto pr-2">
              {availableBooksList.map((book, idx) => (
                <li 
                  key={idx}
                  onClick={() => setSelectedBookTitle(book.title)}
                  className="bg-slate-900 rounded-lg p-3 hover:border-purple-500/50 border border-slate-800 cursor-pointer transition hover:bg-slate-800"
                >
                  <p className="text-slate-200 font-medium">{book.title}</p>
                  <p className="text-slate-400 text-[11px]">{book.copies}</p>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Book Booking">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Select Book</label>
                <select
                  value={selectedBookTitle || ""}
                  onChange={(e) => setSelectedBookTitle(e.target.value)}
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-slate-200 text-xs"
                >
                  <option value="">Choose a book...</option>
                  {availableBooksList.map((book, idx) => (
                    <option key={idx} value={book.title}>{book.title}</option>
                  ))}
                </select>
              </div>

              {selectedBookTitle && (
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                  <p className="text-xs text-slate-400 mb-2">Selected: <span className="text-emerald-400 font-medium">{selectedBookTitle}</span></p>
                </div>
              )}

              <div>
                <label className="text-xs text-slate-400 mb-1 block">From Date</label>
                <input
                  type="date"
                  value={bookFromDate}
                  onChange={(e) => setBookFromDate(e.target.value)}
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-slate-200 text-xs"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">To Date</label>
                <input
                  type="date"
                  value={bookToDate}
                  onChange={(e) => setBookToDate(e.target.value)}
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-slate-200 text-xs"
                  min={bookFromDate || new Date().toISOString().split('T')[0]}
                />
              </div>

              <button
                onClick={() => {
                  if (selectedBookTitle && bookFromDate && bookToDate) {
                    handleBookBook(selectedBookTitle, bookFromDate, bookToDate);
                  }
                }}
                disabled={!selectedBookTitle || !bookFromDate || !bookToDate}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition"
              >
                Book Now
              </button>

              {bookingMessage && (
                <p className="text-xs text-emerald-400 text-center bg-emerald-500/10 rounded-lg p-2">{bookingMessage}</p>
              )}
            </div>
          </SectionCard>
        </div>
      )}

      {bookedBooks.length > 0 && (
        <div className="mt-5">
          <SectionCard title="Books Booking Summary">
            <p className="text-xs text-slate-300 mb-4">
              Your reserved books
            </p>
            <div className="space-y-3">
              {bookedBooks.map((book, idx) => {
                const fromDate = book.fromDate || new Date(Date.now() + Math.random() * 5 * 24 * 60 * 60 * 1000).toLocaleDateString();
                const toDate = book.toDate || new Date(Date.now() + (5 + Math.random() * 15) * 24 * 60 * 60 * 1000).toLocaleDateString();
                const bookedDate = book.bookedDate || new Date().toLocaleDateString();
                
                return (
                <div key={idx} className="grid md:grid-cols-4 gap-3">
                  <div className="bg-slate-900 rounded-xl p-4 border border-emerald-500/30">
                    <p className="text-xs text-slate-400 mb-1">Book Title</p>
                    <p className="text-sm font-semibold text-emerald-400">{book.title}</p>
                  </div>
                  <div className="bg-slate-900 rounded-xl p-4 border border-emerald-500/30">
                    <p className="text-xs text-slate-400 mb-1">From Date</p>
                    <p className="text-sm font-semibold text-slate-200">{fromDate}</p>
                  </div>
                  <div className="bg-slate-900 rounded-xl p-4 border border-emerald-500/30">
                    <p className="text-xs text-slate-400 mb-1">To Date</p>
                    <p className="text-sm font-semibold text-yellow-400">{toDate}</p>
                  </div>
                  <div className="bg-slate-900 rounded-xl p-4 border border-emerald-500/30">
                    <p className="text-xs text-slate-400 mb-1">Booked On</p>
                    <p className="text-sm font-semibold text-slate-200">{bookedDate}</p>
                  </div>
                </div>
                );
              })}
            </div>
          </SectionCard>
        </div>
      )}

      {!isSuperAdmin && (
        <div className="grid lg:grid-cols-2 gap-5 mt-5">
          <SectionCard title="Check Seat Availability">
            <label className="text-[11px] text-slate-400 mb-1 block">
              Need a power socket?
            </label>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setSeatRequirement("yes")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                  seatRequirement === "yes"
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setSeatRequirement("no")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                  seatRequirement === "no"
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                No
              </button>
            </div>

            <label className="text-[11px] text-slate-400 mb-1 block">
              How many seats?
            </label>
            <input
              type="number"
              value={numberOfSeats}
              onChange={(e) => setNumberOfSeats(parseInt(e.target.value) || 1)}
              min={1}
              max={4}
              className="w-full mb-2 rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs"
            />

            <PrimaryButton 
              className="w-full mt-1" 
              onClick={handleCheckAvailability}
              disabled={isCheckingAvailability}
            >
              {isCheckingAvailability ? "Checking..." : "Check Availability"}
            </PrimaryButton>

            {availabilityResults && (
              <div className="mt-4 p-3 bg-slate-900 rounded-xl">
                <p className="text-xs text-emerald-400 mb-2">
                  ✓ {availabilityResults.message}
                </p>
                <p className="text-[11px] text-slate-400">
                  Found {availabilityResults.total_available} seat{availabilityResults.total_available !== 1 ? 's' : ''} 
                  {availabilityResults.power_socket_required ? ' with power socket' : ''}
                </p>
              </div>
            )}
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
        </div>
      )}

      {availabilityResults && availabilityResults.available_seats && availabilityResults.available_seats.length > 0 && (
        <div className="mt-5">
          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <SectionCard title="Available Seats">
                <p className="text-xs text-slate-300 mb-4">
                  Select from the available seats below to book your study space
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {availabilityResults.available_seats.map((seat, idx) => (
                    <div 
                      key={idx} 
                      className={`bg-slate-900 rounded-xl p-4 border transition-all cursor-pointer ${
                        selectedSeat?.seat_id === seat.seat_id 
                          ? 'border-emerald-500 ring-2 ring-emerald-500/20' 
                          : 'border-slate-800 hover:border-emerald-500/50'
                      }`}
                      onClick={() => handleSelectSeat(seat)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-200">Seat {seat.seat_id}</p>
                          <p className="text-xs text-slate-400">Floor {seat.floor} • Section {seat.section}</p>
                        </div>
                        <div className="flex gap-2">
                          {seat.has_power && (
                            <span className="px-2 py-1 rounded-full text-[10px] bg-yellow-500/20 text-yellow-400">
                              ⚡ Power
                            </span>
                          )}
                          {seat.is_window_seat && (
                            <span className="px-2 py-1 rounded-full text-[10px] bg-blue-500/20 text-blue-400">
                              🪟 Window
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <p className="text-[11px] text-slate-400 mb-2">Available Time Slots:</p>
                        <div className="space-y-1">
                          {seat.available_slots.slice(0, 2).map((slot, slotIdx) => (
                            <div key={slotIdx} className="text-xs bg-slate-800 rounded-lg px-2 py-1.5 text-slate-300">
                              🕒 {slot}
                            </div>
                          ))}
                          {seat.available_slots.length > 2 && (
                            <div className="text-xs text-slate-500 px-2">
                              +{seat.available_slots.length - 2} more slots
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {selectedSeat?.seat_id === seat.seat_id && (
                        <div className="mt-2 pt-2 border-t border-slate-700">
                          <p className="text-xs text-emerald-400">✓ Selected - Fill options on the right →</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            <div>
              <SectionCard title="Booking Options">
                {selectedSeat ? (
                  <>
                    <div className="mb-4 p-3 bg-slate-900 rounded-xl">
                      <p className="text-xs text-slate-400 mb-1">Selected Seat</p>
                      <p className="text-sm font-semibold text-emerald-400">
                        {selectedSeat.seat_id}
                      </p>
                      <p className="text-xs text-slate-400">
                        Floor {selectedSeat.floor} • Section {selectedSeat.section}
                      </p>
                    </div>

                    <label className="text-[11px] text-slate-400 mb-1 block">
                      Select Time Slot
                    </label>
                    <select 
                      className="w-full mb-3 rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs"
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    >
                      <option value="">Choose a time slot</option>
                      {selectedSeat.available_slots.map((slot, idx) => (
                        <option key={idx} value={slot}>{slot}</option>
                      ))}
                    </select>

                    <label className="text-[11px] text-slate-400 mb-1 block">
                      Duration (hours)
                    </label>
                    <select 
                      className="w-full mb-3 rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs"
                      value={bookingDuration}
                      onChange={(e) => setBookingDuration(e.target.value)}
                    >
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4 hours</option>
                      <option value="6">6 hours</option>
                    </select>

                    <div className="mb-3 p-2 bg-slate-900 rounded-lg">
                      <p className="text-[10px] text-slate-400 mb-1">Seat Features:</p>
                      <div className="flex gap-2">
                        {selectedSeat.has_power && (
                          <span className="text-[10px] text-yellow-400">⚡ Power Socket</span>
                        )}
                        {selectedSeat.is_window_seat && (
                          <span className="text-[10px] text-blue-400">🪟 Window View</span>
                        )}
                      </div>
                    </div>

                    {bookingMessage && (
                      <p className={`text-xs mb-3 ${
                        bookingDetails ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {bookingMessage}
                      </p>
                    )}

                    {bookingDetails && (
                      <div className="mb-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                        <p className="text-xs text-emerald-300 font-semibold mb-1">
                          Booking Confirmed
                        </p>
                        <p className="text-xs text-slate-200">
                          {bookingDetails.name} booked Seat {bookingDetails.seat_id}
                        </p>
                        <p className="text-[11px] text-slate-300">
                          {bookingDetails.time_slot} • {bookingDetails.duration} hours
                        </p>
                      </div>
                    )}

                    <PrimaryButton 
                      className="w-full"
                      onClick={handleBookSeat}
                      disabled={!selectedTimeSlot || isBookingSeat}
                    >
                      {isBookingSeat ? "Booking..." : "Confirm Booking"}
                    </PrimaryButton>

                    <button
                      className="w-full mt-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-all"
                      onClick={() => setSelectedSeat(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-900 flex items-center justify-center">
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="text-xs text-slate-400">
                      Select a seat from the list to configure booking options
                    </p>
                  </div>
                )}
              </SectionCard>
            </div>
          </div>
        </div>
      )}

      {bookingDetails && (
        <div className="mt-6">
          <SectionCard title="Booking Summary">
            <p className="text-xs text-slate-300 mb-3">
              This user has booked the seat with the following details.
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-slate-900 rounded-xl p-4 border border-emerald-500/30">
                <p className="text-xs text-slate-400 mb-1">Booked By</p>
                <p className="text-sm font-semibold text-emerald-400">{bookingDetails.name}</p>
                <p className="text-[11px] text-slate-400">User: {bookingDetails.user}</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                <p className="text-xs text-slate-400 mb-1">Seat</p>
                <p className="text-sm font-semibold text-slate-200">
                  {bookingDetails.seat_id} • Floor {bookingDetails.floor} • Section {bookingDetails.section}
                </p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                <p className="text-xs text-slate-400 mb-1">Time Slot</p>
                <p className="text-sm font-semibold text-slate-200">{bookingDetails.time_slot}</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                <p className="text-xs text-slate-400 mb-1">Duration</p>
                <p className="text-sm font-semibold text-slate-200">{bookingDetails.duration} hours</p>
              </div>
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
};

export default LibraryBooking;
