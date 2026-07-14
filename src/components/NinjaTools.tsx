import React, { useState, useCallback, useEffect } from "react";
import { 
  Languages, 
  Sparkles, 
  Key, 
  Copy, 
  Check, 
  RefreshCw, 
  HelpCircle, 
  Sliders, 
  ArrowRight,
  Info
} from "lucide-react";

const SUPPORTED_LANGUAGES = [
  { code: "hi", name: "Hindi (हिन्दी)" },
  { code: "es", name: "Spanish (Español)" },
  { code: "fr", name: "French (Français)" },
  { code: "de", name: "German (Deutsch)" },
  { code: "ja", name: "Japanese (日本語)" },
  { code: "zh", name: "Mandarin Chinese (中文)" },
  { code: "it", name: "Italian (Italiano)" },
  { code: "ru", name: "Russian (Русский)" },
  { code: "pt", name: "Portuguese (Português)" },
  { code: "ar", name: "Arabic (العربية)" },
  { code: "ko", name: "Korean (한국어)" }
];

export default function NinjaTools() {
  
  // =========================================================================
  // APPLICATION 1: ENGLISH TO FAVORITE LANGUAGE TRANSLATOR (RapidAPI Proxy)
  // =========================================================================
  const [englishText, setEnglishText] = useState<string>("Hello, welcome to Coding Ninjas! Writing clean code is the way of a true developer.");
  const [targetLang, setTargetLang] = useState<string>("hi");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [translateMethod, setTranslateMethod] = useState<string>("");

  const handleTranslate = async () => {
    if (!englishText.trim()) {
      alert("Please enter some English text to translate!");
      return;
    }
    setIsTranslating(true);
    setTranslatedText("Consulting translation engines...");
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: englishText,
          targetLanguage: targetLang
        })
      });

      const data = await response.json();
      if (data.success && data.translatedText) {
        setTranslatedText(data.translatedText);
        setTranslateMethod(data.method || "RapidAPI / Gemini AI");
      } else {
        setTranslatedText("Error: Translation request could not be finalized. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setTranslatedText("Failed to translate. Verify your backend server is active on Port 3000.");
    } finally {
      setIsTranslating(false);
    }
  };


  // =========================================================================
  // APPLICATION 2: RANDOM STRING GENERATOR (Fulfilling useState, useCallback, useEffect)
  // =========================================================================
  const [stringLength, setStringLength] = useState<number>(16);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [generatedString, setGeneratedString] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  
  // Advanced interval generator state
  const [autoGen, setAutoGen] = useState<boolean>(false);
  const [autoIntervalSeconds, setAutoIntervalSeconds] = useState<number>(3);

  // Fulfills rule: Must use useCallback hook to formulate random string
  const generateRandomString = useCallback(() => {
    let charset = "";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (!charset) {
      setGeneratedString("ERROR: Please select at least one character set!");
      return;
    }

    let result = "";
    const charsetLength = charset.length;
    for (let i = 0; i < stringLength; i++) {
      const randomIndex = Math.floor(Math.random() * charsetLength);
      result += charset[randomIndex];
    }
    setGeneratedString(result);
    setCopied(false);
  }, [stringLength, includeUpper, includeLower, includeNumbers, includeSymbols]);

  // Fulfills rule: Must use useEffect hook to run initial generator or set auto-interval
  useEffect(() => {
    generateRandomString();
  }, [generateRandomString]);

  // Fulfills rule: Must use useEffect hook to handle auto-regeneration interval timer
  useEffect(() => {
    if (!autoGen) return;

    const timer = setInterval(() => {
      generateRandomString();
    }, autoIntervalSeconds * 1000);

    // Cleanup interval on unmount or when autoGen changes
    return () => clearInterval(timer);
  }, [autoGen, autoIntervalSeconds, generateRandomString]);

  const handleCopyString = () => {
    if (!generatedString || generatedString.startsWith("ERROR")) return;
    navigator.clipboard.writeText(generatedString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Hub Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-xs text-indigo-700 font-bold">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>Slab 1 Beginner Utilities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Ninja Developer <span className="text-indigo-600">Tools Hub</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Fulfill your beginner task requirements with our high-contrast, fully interactive web applications. Styled with pristine layout alignments.
          </p>
        </div>

        {/* Two Columns for the Two Apps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* APP 1: Text Translator Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-300 transition-all shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Languages className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Zen Translator</h3>
                    <p className="text-[10px] text-slate-500 font-mono">Powered by RapidAPI & Gemini</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[9px] bg-indigo-50 text-indigo-700 border border-indigo-100 rounded font-mono uppercase">
                  RapidAPI
                </span>
              </div>

              {/* Input Form */}
              <div className="space-y-4 text-xs">
                <div className="space-y-2">
                  <label className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Input String (English)</label>
                  <textarea
                    value={englishText}
                    onChange={(e) => setEnglishText(e.target.value)}
                    className="w-full h-24 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl p-3 focus:outline-none font-mono text-xs text-slate-800 leading-relaxed transition-colors"
                    placeholder="Enter English phrase to translate..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Favorite Target Language</label>
                  <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl p-3 focus:outline-none text-xs text-slate-850 font-medium transition-colors"
                  >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Translation Display */}
                {translatedText && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 font-mono text-xs">
                    <span className="text-indigo-600 font-bold block uppercase text-[9px]">Translation Outcome:</span>
                    <p className="text-slate-900 text-xs sm:text-sm leading-relaxed">{translatedText}</p>
                    {translateMethod && (
                      <span className="text-[9px] text-slate-400 block pt-1.5 border-t border-slate-200 font-sans">
                        Engine: <strong className="text-slate-600">{translateMethod}</strong>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Translate Button Trigger */}
            <div className="pt-6">
              <button
                onClick={handleTranslate}
                disabled={isTranslating}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 font-bold text-xs rounded-xl shadow-md shadow-indigo-100 text-white transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                {isTranslating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Translating via API...</span>
                  </>
                ) : (
                  <>
                    <span>Convert to Favorite Language</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* APP 2: Random String Generator Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-300 transition-all shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                    <Key className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Ninja Keygen</h3>
                    <p className="text-[10px] text-slate-500 font-mono">React Hooks Demonstration</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[9px] bg-purple-50 text-purple-700 border border-purple-100 rounded font-mono uppercase">
                  Hooks Built
                </span>
              </div>

              {/* Dynamic generated string output display - keeping dark code box for nice legibility */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 relative font-mono text-xs sm:text-sm break-all select-all flex items-center justify-between pr-14 min-h-[56px]">
                <span className="text-slate-100">{generatedString}</span>
                <button
                  onClick={handleCopyString}
                  disabled={!generatedString || generatedString.startsWith("ERROR")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-indigo-400 rounded-lg transition-all"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              {/* Sliders and checkboxes configuration parameters */}
              <div className="space-y-4 text-xs font-sans">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-500">
                    <span>Desired String Length</span>
                    <span className="text-indigo-600 font-mono font-bold">{stringLength} Chars</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={64}
                    value={stringLength}
                    onChange={(e) => setStringLength(Number(e.target.value))}
                    className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Character Sets Checkboxes */}
                <div className="grid grid-cols-2 gap-3.5 pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer bg-slate-50 p-2.5 rounded-lg border border-slate-200 select-none hover:border-slate-300 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeUpper}
                      onChange={(e) => setIncludeUpper(e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-700 font-medium">A-Z Uppercase</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer bg-slate-50 p-2.5 rounded-lg border border-slate-200 select-none hover:border-slate-300 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeLower}
                      onChange={(e) => setIncludeLower(e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-700 font-medium">a-z Lowercase</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer bg-slate-50 p-2.5 rounded-lg border border-slate-200 select-none hover:border-slate-300 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeNumbers}
                      onChange={(e) => setIncludeNumbers(e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-700 font-medium">0-9 Numbers</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer bg-slate-50 p-2.5 rounded-lg border border-slate-200 select-none hover:border-slate-300 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeSymbols}
                      onChange={(e) => setIncludeSymbols(e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-700 font-medium">!@# Symbols</span>
                  </label>
                </div>

                {/* Auto Regeneration toggle (Utilizes useEffect intervals safely) */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11px] text-slate-500">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoGen}
                      onChange={(e) => setAutoGen(e.target.checked)}
                      className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 h-3.5 w-3.5"
                    />
                    <span className="text-slate-700 font-semibold">Auto-regenerate continuously</span>
                  </label>

                  {autoGen && (
                    <div className="flex items-center space-x-1.5">
                      <span>every</span>
                      <select
                        value={autoIntervalSeconds}
                        onChange={(e) => setAutoIntervalSeconds(Number(e.target.value))}
                        className="bg-slate-50 border border-slate-250 rounded px-1.5 py-0.5 focus:outline-none font-mono text-[10px] text-slate-700"
                      >
                        <option value={1}>1s</option>
                        <option value={3}>3s</option>
                        <option value={5}>5s</option>
                        <option value={10}>10s</option>
                      </select>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Manual Generator Trigger Button */}
            <div className="pt-6">
              <button
                onClick={generateRandomString}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 font-bold text-xs rounded-xl shadow-md shadow-purple-100 text-white transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Manual Refresh String</span>
              </button>
            </div>
          </div>

        </div>

        {/* Informative Hooks Showcase Banner */}
        <div className="bg-indigo-50/50 border border-indigo-100 p-5 rounded-2xl flex items-start space-x-3.5">
          <Info className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs text-slate-600">
            <h4 className="font-bold text-indigo-900">State & Performance Telemetry (Under the Hood):</h4>
            <p>
              The **Ninja Keygen** application dynamically implements standard **useState** to handle length, character conditions, auto regeneration states, and outputs. It leverages **useCallback** to securely cache the string calculation logic, ensuring memory values are not recreated on standard React renders. It implements **useEffect** triggers to auto-initialize string outcome on mount and handle clean-up of continuous timing loops securely.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
