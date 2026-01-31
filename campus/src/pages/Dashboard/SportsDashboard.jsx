import React from "react";
import PageHeader from "../../components/PageHeader";
import BookingCard from "../../components/BookingCard";
import SectionCard from "../../components/SectionCard";

const SportsDashboard = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        badge="Sports"
        title="Sports Slot Bookings"
        subtitle="Manage court slots, equipment inventory, and live bookings for campus sports."
      />

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <SectionCard title="Today's Slots">
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
        </SectionCard>

        <SectionCard title="Equipment Inventory">
          <ul className="text-xs space-y-1.5">
            <li>Basketballs – 12 / 15 in stock.</li>
            <li>Cricket kits – 5 / 8 available.</li>
            <li>Tennis rackets – auto sync enabled.</li>
            <li>Indoor games – chess, carrom, TT paddles.</li>
          </ul>
        </SectionCard>

        <SectionCard title="Quick Actions">
          <ul className="space-y-1.5">
            <li>Create new slot template.</li>
            <li>Block court for maintenance.</li>
            <li>Sync inventory with store.</li>
            <li>Broadcast notice to students.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
};

export default SportsDashboard;
