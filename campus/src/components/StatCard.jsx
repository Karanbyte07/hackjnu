import React from "react";

const StatCard = ({ label, value, hint, trend, title }) => {
  // Support both 'label' and 'title' props for flexibility
  const displayLabel = title || label;
  
  return (
    <div className="rounded-2xl bg-[#020617] border border-slate-800 px-4 py-3 shadow-lg shadow-black/40">
      <p className="text-[11px] text-slate-400 mb-1">{displayLabel}</p>
      <p className="text-lg font-semibold text-slate-50">{value}</p>
      {(hint || trend) && (
        <div className="mt-1 flex items-center justify-between text-[11px]">
          <span className="text-slate-500">{hint}</span>
          {trend && (
            <span
              className={`font-semibold ${
                trend.startsWith("-") ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
