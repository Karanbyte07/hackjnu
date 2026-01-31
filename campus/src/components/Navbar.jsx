import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("campus360_user") || "{}");
    if (userData.loggedIn) {
      setUser(userData);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("campus360_user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-8 border-b border-slate-800 bg-[#050816]/60 backdrop-blur">
      <Link to="/" className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-yellow-400 to-amber-500 flex items-center justify-center text-xs font-bold">
          C
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide text-yellow-300">
            Campus360
          </p>
          <p className="text-[11px] text-slate-400">Smart Campus OS</p>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="hidden sm:inline text-xs text-slate-300">
              {user.name} • {user.role}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-700 text-slate-100 hover:bg-slate-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <span className="hidden sm:inline text-xs text-slate-400">
              {location.pathname === "/" ? "" : location.pathname}
            </span>
            <Link
              to="/login"
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-400 text-slate-900 hover:bg-yellow-300 transition"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
