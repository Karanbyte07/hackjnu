import React from "react";

const BookingCard = ({ title, time, meta, status }) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-3 text-xs flex justify-between gap-3">
      <div>
        <p className="font-semibold text-slate-100">{title}</p>
        {time && <p className="text-[11px] text-slate-400 mt-1">{time}</p>}
        {meta && <p className="text-[11px] text-slate-500 mt-1">{meta}</p>}
      </div>
      {status && (
        <span className="self-start px-2 py-1 rounded-full text-[10px] font-semibold bg-emerald-400/10 text-emerald-300 border border-emerald-400/40">
          {status}
        </span>
      )}
    </div>
  );
};

export default BookingCard;
