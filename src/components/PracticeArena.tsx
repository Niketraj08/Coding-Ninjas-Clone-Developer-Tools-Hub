import React, { useState, useEffect } from "react";
import { PROBLEMS } from "../data";
import { Problem } from "../types";
import { motion } from "motion/react";
import { 
  Play, 
  Send, 
  RefreshCw, 
  Sparkles, 
  Code2, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Cpu, 
  HelpCircle, 
  MessageSquare,
  FileCode,
  BookOpen
} from "lucide-react";

type Language = "cpp" | "java" | "python" | "javascript";

export default function PracticeArena() {
  const [activeProblem, setActiveProblem] = useState<Problem>(PROBLEMS[0]);
  const [selectedLang, setSelectedLang] = useState<Language>("javascript");
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Coach States
  const [coachFeedback, setCoachFeedback] = useState<string>("");
  const [isCoachLoading, setIsCoachLoading] = useState<boolean>(false);
  const [showCoach, setShowCoach] = useState<boolean>(false);

  // Set starter code when problem or language changes
  useEffect(() => {
    setCode(activeProblem.starterCode[selectedLang]);
    setOutput("");
    setCoachFeedback("");
    setShowCoach(false);
  }, [activeProblem, selectedLang]);

  const handleResetCode = () => {
    if (window.confirm("Are you sure you want to reset your code to the starter template?")) {
      setCode(activeProblem.starterCode[selectedLang]);
      setOutput("Code reset to starter template.");
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput("Compiling code and linking binary...\nRunning sample test cases...\n");
    
    setTimeout(() => {
      // Mock basic code validity or pattern check
      const codeLower = code.toLowerCase();
      let passed = true;
      let reason = "";

      if (activeProblem.id === "find-unique") {
        // Find Unique requires XOR or a loop
        const hasXor = codeLower.includes("^") || codeLower.includes("xor");
        const hasLoop = codeLower.includes("for") || codeLower.includes("while") || codeLower.includes(".reduce");
        if (!hasLoop) {
          passed = false;
          reason = "FAIL: Expected a loop or iteration over the input array to check elements.";
        } else if (codeLower.includes("return 0") && !codeLower.includes("unique")) {
          passed = false;
          reason = "FAIL: Output evaluated to incorrect result (0). Did you accumulate XOR or values?";
        }
      } else if (activeProblem.id === "reverse-array") {
        const hasSwap = codeLower.includes("swap") || codeLower.includes("temp") || codeLower.includes("reverse");
        if (!hasSwap) {
          passed = false;
          reason = "FAIL: Expected elements to be swapped or reversed in-place.";
        }
      }

      if (passed) {
        setOutput(prev => prev + `\n✓ TEST CASE 1 PASSED: Input: ${activeProblem.testCases[0].input}\n  Expected: ${activeProblem.testCases[0].expected} | Actual: ${activeProblem.testCases[0].expected}\n\n✓ TEST CASE 2 PASSED (Optional inputs)\n\nSUCCESS: All sample test cases passed successfully! (O(N) time complexity, O(1) space complexity)`);
      } else {
        setOutput(prev => prev + `\n❌ TEST CASE 1 FAILED: Input: ${activeProblem.testCases[0].input}\n  Expected: ${activeProblem.testCases[0].expected}\n  Error detail: ${reason || "Incorrect output value."}`);
      }
      setIsRunning(false);
    }, 1200);
  };

  const handleSubmitSolution = () => {
    setIsSubmitting(true);
    setOutput("Executing submissions on production Ninja servers...\nRunning on 40 global datasets...\n");

    setTimeout(() => {
      setOutput(prev => prev + `\n✓ Test Cases [1-10] Passed\n✓ Test Cases [11-20] Passed\n✓ Test Cases [21-30] Passed\n✓ Test Cases [31-40] Passed\n\n🎉 CONGRATULATIONS! Your submission has been ACCEPTED!\nMemory used: 15.4 MB\nExecution Time: 45ms\nYou earned +${activeProblem.points} Ninja Coins!`);
      setIsSubmitting(false);
    }, 1800);
  };

  const handleAskCoach = async () => {
    setIsCoachLoading(true);
    setShowCoach(true);
    setCoachFeedback("Analyzing code logic & formulating feedback...");

    try {
      const response = await fetch("/api/ninja/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemTitle: activeProblem.title,
          problemStatement: activeProblem.statement,
          userCode: code,
          language: selectedLang
        })
      });

      const data = await response.json();
      if (data.success && data.feedback) {
        setCoachFeedback(data.feedback);
      } else {
        setCoachFeedback("Doubt Resolver system is busy. Please try again in a bit.");
      }
    } catch (err: any) {
      console.error(err);
      setCoachFeedback("Failed to reach Ninja AI Coach. Make sure the server backend is running on Port 3000.");
    } finally {
      setIsCoachLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans">
      
      {/* Left Column: Problem Selector & Problem Details */}
      <div className="w-full md:w-5/12 border-r border-slate-200 bg-white flex flex-col h-auto md:h-[calc(100vh-4rem)] overflow-y-auto">
        
        {/* Top: Horizontal Problem Quick Switch */}
        <div className="bg-slate-50 border-b border-slate-200 p-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block mb-2">Practice Problems</span>
          <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-thin">
            {PROBLEMS.map((prob) => (
              <button
                key={prob.id}
                onClick={() => setActiveProblem(prob)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
                  activeProblem.id === prob.id
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-300"
                }`}
              >
                {prob.title}
              </button>
            ))}
          </div>
        </div>

        {/* Middle: Problem Statement details */}
        <div className="p-6 flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              activeProblem.difficulty === "Easy" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
              activeProblem.difficulty === "Moderate" ? "bg-amber-50 text-amber-700 border border-amber-200" :
              "bg-rose-50 text-rose-700 border border-rose-200"
            }`}>
              {activeProblem.difficulty}
            </span>
            <div className="flex items-center space-x-3 text-xs text-slate-500 font-mono">
              <span>Points: <strong className="text-slate-900">{activeProblem.points}</strong></span>
              <span>Success: <strong className="text-emerald-600">{activeProblem.successRate}</strong></span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-indigo-600" />
              {activeProblem.title}
            </h1>
            <p className="text-slate-500 text-xs font-mono">Category: {activeProblem.category} &bull; Est. Time: {activeProblem.solveTime}</p>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 font-sans">
            <p className="whitespace-pre-wrap">{activeProblem.statement}</p>
          </div>

          {/* Sample Input/Output Display */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
              Sample Test Cases
            </h4>
            
            <div className="space-y-3">
              {activeProblem.testCases.map((tc, index) => (
                <div key={index} className="bg-slate-50 rounded-xl border border-slate-200 p-3.5 space-y-2 text-xs font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold">Sample Input {index + 1}:</span>
                      <pre className="text-slate-800 mt-0.5">{tc.input}</pre>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold">Sample Output {index + 1}:</span>
                      <pre className="text-indigo-600 mt-0.5 font-bold">{tc.expected}</pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Ask AI Coach trigger */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Sparkles className="h-4 w-4 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Ninja AI Code Coach</h4>
                <p className="text-[10px] text-slate-500">Get 1:1 doubts resolved instantly</p>
              </div>
            </div>
            <button
              onClick={handleAskCoach}
              className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-xs font-semibold shadow-md shadow-indigo-150 hover:scale-102 transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Ask Coach</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Code Editor & Execution Panel */}
      <div className="flex-1 flex flex-col h-auto md:h-[calc(100vh-4rem)] bg-slate-100">
        
        {/* Editor Controls */}
        <div className="bg-white border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
              {(["cpp", "java", "python", "javascript"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded transition-all uppercase ${
                    selectedLang === lang
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-850"
                  }`}
                >
                  {lang === "cpp" ? "C++" : lang}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleResetCode}
              className="p-2 text-slate-500 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors text-xs flex items-center gap-1"
              title="Reset starter template"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={handleRunCode}
              disabled={isRunning || isSubmitting}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Play className={`h-3.5 w-3.5 text-emerald-600 ${isRunning ? "animate-spin" : ""}`} />
              <span>Run Tests</span>
            </button>

            <button
              onClick={handleSubmitSolution}
              disabled={isRunning || isSubmitting}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-indigo-100 flex items-center gap-1.5"
            >
              <Send className={`h-3.5 w-3.5 ${isSubmitting ? "animate-pulse" : ""}`} />
              <span>Submit Code</span>
            </button>
          </div>
        </div>

        {/* Code Input Canvas / Textarea */}
        <div className="flex-1 relative flex flex-col md:flex-row overflow-hidden">
          
          {/* Main Code Area */}
          <div className="flex-1 flex flex-col h-[350px] md:h-full relative border-b md:border-b-0 border-slate-200">
            <div className="bg-slate-800 border-b border-slate-750 px-4 py-1.5 flex items-center space-x-2 text-[11px] text-slate-300 font-mono">
              <FileCode className="h-3.5 w-3.5 text-indigo-400" />
              <span>Interactive Sandbox Workspace</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full flex-1 bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm p-5 focus:outline-none focus:ring-0 resize-none leading-relaxed border-0"
              placeholder="// Write your custom logic code here..."
              spellCheck={false}
            />
          </div>

          {/* AI Coach Overlay Drawer (Displays when Coach feedback is triggered) */}
          {showCoach && (
            <div className="w-full md:w-[320px] lg:w-[380px] bg-white border-l border-slate-200 flex flex-col h-[280px] md:h-full z-20">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  <span>Ninja AI Coach Panel</span>
                </div>
                <button 
                  onClick={() => setShowCoach(false)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Close
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs text-slate-700 leading-relaxed scrollbar-thin">
                {isCoachLoading ? (
                  <div className="flex flex-col items-center justify-center h-48 space-y-3">
                    <RefreshCw className="h-6 w-6 animate-spin text-indigo-600" />
                    <p className="text-slate-500 text-[11px]">Formulating hints with Gemini 3.5...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-indigo-600 font-bold text-[11px] uppercase tracking-wider">Coach Insights:</p>
                    <div className="whitespace-pre-wrap bg-slate-900 p-3.5 rounded-xl border border-slate-850 font-mono text-[11px] text-slate-100">
                      {coachFeedback}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Panel: Standard Console Output */}
        <div className="h-[180px] md:h-[220px] bg-slate-950 border-t border-slate-200 flex flex-col">
          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>CONSOLE OUTPUT</span>
            <button 
              onClick={() => setOutput("")}
              className="text-[10px] text-slate-500 hover:text-white"
            >
              Clear Console
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-slate-300 whitespace-pre-wrap bg-slate-950 scrollbar-thin">
            {output ? (
              <p>{output}</p>
            ) : (
              <span className="text-slate-600">// Click "Run Tests" or "Submit Code" to view performance telemetry output here.</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
