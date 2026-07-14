export interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  category: string;
  solveTime: string;
  points: number;
  successRate: string;
  statement: string;
  starterCode: {
    cpp: string;
    java: string;
    python: string;
    javascript: string;
  };
  testCases: {
    input: string;
    expected: string;
  }[];
}

export interface Course {
  id: string;
  title: string;
  tag: string;
  rating: number;
  reviewsCount: string;
  duration: string;
  features: string[];
  originalPrice: number;
  discountedPrice: number;
  level: string;
  logo: string;
}

export interface TranslationResult {
  translatedText: string;
  method: string;
  success: boolean;
}
