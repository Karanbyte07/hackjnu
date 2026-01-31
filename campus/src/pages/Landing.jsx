import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";

const Landing = () => {
  const features = [
    {
      icon: "📍",
      title: "Smart Attendance",
      desc: "AI-powered face recognition for instant, secure attendance marking"
    },
    {
      icon: "📚",
      title: "Library Management",
      desc: "Real-time seat availability and book reservation system"
    },
    {
      icon: "🏃",
      title: "Sports Booking",
      desc: "Equipment tracking and facility scheduling at your fingertips"
    },
    {
      icon: "🚿",
      title: "Washroom Management",
      desc: "Priority-based issue reporting with real-time alerts"
    },
    {
      icon: "🗺️",
      title: "Campus Navigation",
      desc: "Smart pathfinding and classroom location finder"
    },
    {
      icon: "📊",
      title: "Admin Dashboard",
      desc: "Comprehensive campus metrics and system monitoring"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-12 sm:px-12 sm:py-16 mb-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-4 leading-tight">
            Campus360
          </h1>
          <p className="text-lg text-slate-300 mb-2">
            Intelligent Campus Management Platform
          </p>
          <p className="text-sm text-slate-400 mb-8">
            A unified digital ecosystem connecting all campus resources—from attendance and facilities to navigation. Streamlined operations with AI-powered insights for students, faculty, and administrators.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/login">
              <PrimaryButton className="flex items-center gap-2 px-6 py-3">
                🔐 Login / Sign Up
              </PrimaryButton>
            </Link>
            <a
              href="#features"
              className="px-6 py-3 rounded-full text-sm font-semibold border border-slate-600 text-slate-100 hover:bg-slate-800 transition flex items-center gap-2"
            >
              📋 Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="mb-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-50 mb-2">Core Features</h2>
          <p className="text-slate-400">Comprehensive modules for modern campus management</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, idx) => (
            <div key={idx} className="rounded-2xl bg-slate-800/40 border border-slate-700 hover:border-slate-600 p-6 transition">
              <p className="text-3xl mb-3">{feature.icon}</p>
              <h3 className="text-sm font-semibold text-slate-100 mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mb-12">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="rounded-2xl bg-slate-800/40 border border-slate-700 p-6 text-center">
            <p className="text-3xl font-bold text-emerald-400 mb-1">1200+</p>
            <p className="text-xs text-slate-400">Active Students</p>
          </div>
          <div className="rounded-2xl bg-slate-800/40 border border-slate-700 p-6 text-center">
            <p className="text-3xl font-bold text-blue-400 mb-1">50+</p>
            <p className="text-xs text-slate-400">Faculty Members</p>
          </div>
          <div className="rounded-2xl bg-slate-800/40 border border-slate-700 p-6 text-center">
            <p className="text-3xl font-bold text-purple-400 mb-1">6</p>
            <p className="text-xs text-slate-400">Core Features</p>
          </div>
          <div className="rounded-2xl bg-slate-800/40 border border-slate-700 p-6 text-center">
            <p className="text-3xl font-bold text-yellow-400 mb-1">24/7</p>
            <p className="text-xs text-slate-400">System Availability</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-50 mb-2">How It Works</h2>
          <p className="text-slate-400">Simple steps to get started with Campus360</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-slate-800/40 border border-slate-700 p-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-emerald-400">1</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-100 mb-2">Login with Your Credentials</h3>
            <p className="text-xs text-slate-400">
              Access your personalized dashboard based on your role - Student, Faculty, Sports Lead, Library Admin, or Super Admin.
            </p>
          </div>
          
          <div className="rounded-2xl bg-slate-800/40 border border-slate-700 p-6">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-blue-400">2</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-100 mb-2">Access Campus Services</h3>
            <p className="text-xs text-slate-400">
              Use AI-powered attendance, book library seats, reserve sports equipment, navigate campus, and manage facilities.
            </p>
          </div>
          
          <div className="rounded-2xl bg-slate-800/40 border border-slate-700 p-6">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-purple-400">3</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-100 mb-2">Real-time Updates & Alerts</h3>
            <p className="text-xs text-slate-400">
              Get instant notifications about bookings, attendance, facility issues, and campus events through our integrated system.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-slate-800 text-center">
        <p className="text-sm text-slate-400">
          © 2025 Campus360. All rights reserved.
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Intelligent Campus Management Platform
        </p>
      </footer>
    </div>
  );
};

export default Landing;
