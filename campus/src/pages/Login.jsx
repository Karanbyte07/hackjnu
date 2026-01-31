import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Store user info in localStorage
    const userInfo = {
      email,
      role,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      loggedIn: true
    };
    localStorage.setItem('campus360_user', JSON.stringify(userInfo));

    // Navigate based on role
    switch(role) {
      case 'Super Admin':
        navigate('/dashboard/super-admin');
        break;
      case 'Sports Admin':
        navigate('/dashboard/sports');
        break;
      case 'Library Admin':
        navigate('/dashboard/library');
        break;
      case 'Faculty Lead (HOD)':
        navigate('/dashboard/faculty-lead');
        break;
      case 'Faculty':
        navigate('/dashboard/faculty');
        break;
      case 'Student':
      default:
        navigate('/dashboard/student');
        break;
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-[#020617] px-6 py-8 shadow-xl shadow-black/40">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 mb-4 transition"
        >
          ← Back to Home
        </Link>
        
        <p className="text-[11px] font-semibold tracking-[0.35em] text-yellow-300 uppercase mb-2 text-center">
          Campus Login
        </p>
        <h1 className="text-xl font-semibold text-center mb-1">
          Welcome to Campus360
        </h1>
        <p className="text-[11px] text-slate-400 text-center mb-6">
          Choose your role and sign in to the smart campus dashboard.
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">
              Email / College ID
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-yellow-400/60"
              placeholder="student@college.edu"
              required
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-yellow-400/60"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">
              Login as
            </label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-yellow-400/60"
            >
              <option>Student</option>
              <option>Faculty</option>
              <option>Faculty Lead (HOD)</option>
              <option>Library Admin</option>
              <option>Sports Admin</option>
              <option>Super Admin</option>
            </select>
          </div>

          <PrimaryButton type="submit" className="w-full mt-2">Continue</PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
