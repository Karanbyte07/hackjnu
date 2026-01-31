import React from "react";
import PrimaryButton from "../components/PrimaryButton";

const Login = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-[#020617] px-6 py-8 shadow-xl shadow-black/40">
        <p className="text-[11px] font-semibold tracking-[0.35em] text-yellow-300 uppercase mb-2 text-center">
          Campus Login
        </p>
        <h1 className="text-xl font-semibold text-center mb-1">
          Welcome to Campus360
        </h1>
        <p className="text-[11px] text-slate-400 text-center mb-6">
          Choose your role and sign in to the smart campus dashboard.
        </p>

        <form className="space-y-4">
          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">
              Email / College ID
            </label>
            <input
              type="email"
              className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-yellow-400/60"
              placeholder="student@college.edu"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-yellow-400/60"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">
              Login as
            </label>
            <select className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-yellow-400/60">
              <option>Student</option>
              <option>Faculty</option>
              <option>Faculty Lead (HOD)</option>
              <option>Library Admin</option>
              <option>Sports Admin</option>
              <option>Super Admin</option>
            </select>
          </div>

          <PrimaryButton className="w-full mt-2">Continue</PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
