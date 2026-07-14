import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PracticeArena from "./components/PracticeArena";
import NinjaTools from "./components/NinjaTools";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#070e1b] flex flex-col font-sans selection:bg-[#fa7223]/30 selection:text-[#fa7223]">
        {/* Persistent Branding Navbar */}
        <Navbar />
        
        {/* Client-Side Pages */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice" element={<PracticeArena />} />
            <Route path="/tools" element={<NinjaTools />} />
            {/* Fallback routing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
