import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API Client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini AI Client initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Gemini AI Client:", error);
  }
} else {
  console.warn("GEMINI_API_KEY is not defined in the environment. AI features will be disabled or simulated.");
}

// Translate language codes to display names
const LANGUAGE_NAMES: { [key: string]: string } = {
  hi: "Hindi",
  es: "Spanish",
  fr: "French",
  de: "German",
  ja: "Japanese",
  zh: "Mandarin Chinese",
  it: "Italian",
  ru: "Russian",
  pt: "Portuguese",
  ar: "Arabic",
  ko: "Korean"
};

// API Route: Translate English text
app.post("/api/translate", async (req, res) => {
  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    res.status(400).json({ error: "Missing required parameters: text and targetLanguage." });
    return;
  }

  const targetLangName = LANGUAGE_NAMES[targetLanguage] || targetLanguage;

  // 1. Try RapidAPI translation if RAPIDAPI_KEY is available
  if (process.env.RAPIDAPI_KEY) {
    console.log(`Attempting translation via RapidAPI to target language: ${targetLanguage}`);
    try {
      // We will call the standard Google Translate API on RapidAPI (google-translate1)
      const url = "https://google-translate1.p.rapidapi.com/language/translate/v2";
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "Accept-Encoding": "application/gzip",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "google-translate1.p.rapidapi.com"
        },
        body: new URLSearchParams({
          q: text,
          target: targetLanguage,
          source: "en"
        })
      };

      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        const translatedText = data?.data?.translations?.[0]?.translatedText;
        if (translatedText) {
          res.json({
            translatedText,
            method: "RapidAPI (Google Translate)",
            success: true
          });
          return;
        }
      } else {
        const errorText = await response.text();
        console.error("RapidAPI returned error status:", response.status, errorText);
      }
    } catch (err) {
      console.error("Error calling RapidAPI:", err);
    }
  }

  // 2. Fallback to Gemini AI if RapidAPI fails or is not configured
  if (ai) {
    console.log(`Falling back or using Gemini AI translation to target language: ${targetLangName}`);
    try {
      const prompt = `Translate the following English text to ${targetLangName}. 
Only return the exact translated text. Do not provide any introduction, explanation, surrounding quotes, or conversational filler.

English Text:
"${text}"`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.3,
        }
      });

      const translatedText = response.text?.trim() || "";
      if (translatedText) {
        res.json({
          translatedText,
          method: "Gemini AI (High Quality Fallback)",
          success: true
        });
        return;
      }
    } catch (err) {
      console.error("Gemini Translation failed:", err);
    }
  }

  // 3. Fallback mock translator if everything fails
  console.log("Using basic client-side rules-based translator (No keys available).");
  const simpleTranslations: { [key: string]: { [key: string]: string } } = {
    hi: {
      "hello": "नमस्ते (Namaste)",
      "welcome to coding ninjas": "कोडिंग निन्जास में आपका स्वागत है",
      "how are you?": "आप कैसे हैं?",
      "good morning": "शुभ प्रभात",
      "thank you": "धन्यवाद"
    },
    es: {
      "hello": "Hola",
      "welcome to coding ninjas": "Bienvenido a Coding Ninjas",
      "how are you?": "¿Cómo estás?",
      "good morning": "Buenos días",
      "thank you": "Gracias"
    },
    fr: {
      "hello": "Bonjour",
      "welcome to coding ninjas": "Bienvenue chez Coding Ninjas",
      "how are you?": "Comment allez-vous?",
      "good morning": "Bonjour",
      "thank you": "Merci"
    }
  };

  const cleanText = text.toLowerCase().trim();
  const langDict = simpleTranslations[targetLanguage];
  let localResult = `[Translated to ${targetLangName}]: "${text}"`;

  if (langDict && langDict[cleanText]) {
    localResult = langDict[cleanText];
  } else {
    localResult = `[Mock Translation to ${targetLangName}]: "${text}" (Add GEMINI_API_KEY or RAPIDAPI_KEY to see real-time translation!)`;
  }

  res.json({
    translatedText: localResult,
    method: "Offline Mock (No API Keys Configured)",
    success: true
  });
});

// API Route: Ninja AI Coach Hints
app.post("/api/ninja/coach", async (req, res) => {
  const { problemTitle, problemStatement, userCode, language } = req.body;

  if (!problemTitle || !userCode) {
    res.status(400).json({ error: "Missing required details: problemTitle and userCode." });
    return;
  }

  if (ai) {
    try {
      const prompt = `You are "Ninja AI Coach", an expert technical coding mentor from Coding Ninjas.
A student is working on the following coding problem:

Problem Title: ${problemTitle}
Problem Description: ${problemStatement || "N/A"}

The student is coding in ${language || "JavaScript"} and wrote this code:
\`\`\`${language || "javascript"}
${userCode}
\`\`\`

Analyze the code. Offer a high-quality, friendly, and structured response:
1. Identify any syntax, logical, or edge-case bugs.
2. Provide strategic guidance or hints (Do NOT just write the complete fixed code. Let them think and solve it).
3. Recommend clean coding practices or optimization suggestions.

Keep the tone encouraging, technical, and strictly aligned with Coding Ninjas' high mentorship standards.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
        }
      });

      res.json({
        feedback: response.text || "No feedback generated.",
        success: true
      });
    } catch (err: any) {
      console.error("Ninja Coach failed:", err);
      res.status(500).json({ error: "Failed to query Ninja Coach.", details: err.message });
    }
  } else {
    // Return mock constructive advice
    res.json({
      feedback: `### 🥷 Ninja AI Coach Tip (No GEMINI_API_KEY configured)
Great attempt! Since my AI engines are currently running in sandbox mode:
- Make sure to check your array bounds and look out for off-by-one errors.
- Ensure you're handling empty or single-element inputs correctly.
- *Tip:* Check your variables to see if you have correctly initialized them before the loop.
- **Configure GEMINI_API_KEY in the Secrets panel to get detailed, custom feedback on your exact code lines!**`,
      success: true
    });
  }
});

// Start server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // In development mode, mount Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production mode, serve static files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
