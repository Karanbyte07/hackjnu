import React from "react";

const PrimaryButton = ({ children, className = "", ...rest }) => {
  return (
    <button
      className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 text-slate-900 shadow-lg shadow-amber-500/30 hover:brightness-110 transition ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
