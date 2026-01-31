import React from "react";

const SectionCard = ({ title, children, footer }) => {
  return (
    <section className="rounded-2xl bg-[#020617] border border-slate-800 px-4 py-4 shadow-lg shadow-black/40">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
      </div>
      <div className="text-xs text-slate-300 space-y-2">{children}</div>
      {footer && <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400">{footer}</div>}
    </section>
  );
};

export default SectionCard;
