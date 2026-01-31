import React from "react";
import AppRoutes from "./router";
import ChatBot from "./components/ChatBot";

const App = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-slate-100">
      <AppRoutes />
      <ChatBot />
    </div>
  );
};

export default App;
