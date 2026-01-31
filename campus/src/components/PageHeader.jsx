import React from "react";

const PageHeader = ({ title, subtitle, badge }) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div>
        {badge && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-yellow-400/10 text-yellow-300 border border-yellow-400/40 mb-2">
            {badge}
          </span>
        )}
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-50">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-1 max-w-xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
