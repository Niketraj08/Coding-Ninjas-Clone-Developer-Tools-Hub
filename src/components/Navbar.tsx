import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Terminal, Code, Cpu, Languages, Sparkles, LogIn, GraduationCap } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white text-slate-900 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#fa7223] to-[#f26522] text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              CODING<span className="text-[#fa7223]">NINJAS</span>
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-slate-500 font-mono -mt-1.5">
              CLONE &bull; STUDIO
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link
            to="/"
            className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              isActive("/") 
                ? "bg-slate-100 text-[#fa7223] border border-slate-200" 
                : "text-slate-600 hover:text-[#fa7223] hover:bg-slate-50"
            }`}
          >
            <GraduationCap className="h-4 w-4 text-[#fa7223]" />
            <span>Courses</span>
          </Link>

          <Link
            to="/practice"
            className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              isActive("/practice") 
                ? "bg-slate-100 text-indigo-700 border border-slate-200" 
                : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
            }`}
          >
            <Code className="h-4 w-4 text-emerald-600" />
            <span>Practice Arena</span>
            <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-emerald-50 text-emerald-700 rounded border border-emerald-100 font-mono uppercase tracking-tight">
              AI Powered
            </span>
          </Link>

          <Link
            to="/tools"
            className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              isActive("/tools") 
                ? "bg-slate-100 text-indigo-700 border border-slate-200" 
                : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
            }`}
          >
            <Languages className="h-4 w-4 text-purple-600" />
            <span>Ninja Developer Tools</span>
            <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-purple-50 text-purple-700 rounded border border-purple-100 font-mono uppercase tracking-tight">
              Slab 1
            </span>
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Link
            to="/practice"
            className="relative hidden sm:inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-semibold rounded-lg group bg-gradient-to-br from-[#fa7223] to-[#f26522] text-white hover:text-white focus:ring-4 focus:outline-none mt-2"
          >
            <span className="relative px-4 py-1.5 transition-all ease-in duration-75 bg-white text-slate-800 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
              Try Coding Arena
            </span>
          </Link>
          
          <button 
            onClick={() => alert("This is a demo clone. Signup feature is simulated!")}
            className="flex items-center space-x-1 px-4 py-2 text-xs font-semibold bg-[#fa7223] hover:bg-orange-600 rounded-lg text-white transition-all shadow-md shadow-orange-500/10 hover:shadow-orange-500/20"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Sign In</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Header Extension */}
      <div className="flex md:hidden justify-around items-center border-t border-slate-200 bg-slate-50 py-2">
        <Link
          to="/"
          className={`flex flex-col items-center text-[10px] py-1 px-3 rounded-lg ${
            isActive("/") ? "text-[#fa7223] font-semibold" : "text-slate-500"
          }`}
        >
          <GraduationCap className="h-4 w-4 mb-0.5" />
          <span>Courses</span>
        </Link>
        <Link
          to="/practice"
          className={`flex flex-col items-center text-[10px] py-1 px-3 rounded-lg ${
            isActive("/practice") ? "text-indigo-600 font-semibold" : "text-slate-500"
          }`}
        >
          <Code className="h-4 w-4 mb-0.5" />
          <span>Practice</span>
        </Link>
        <Link
          to="/tools"
          className={`flex flex-col items-center text-[10px] py-1 px-3 rounded-lg ${
            isActive("/tools") ? "text-indigo-600 font-semibold" : "text-slate-500"
          }`}
        >
          <Languages className="h-4 w-4 mb-0.5" />
          <span>Ninja Tools</span>
        </Link>
      </div>
    </header>
  );
}
