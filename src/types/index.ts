export type ActiveTab = 'welcome' | 'simulator' | 'guide' | 'quiz';

export interface SimulationState {
  light: number;       // 0 to 100%
  water: number;       // 0 to 100%
  co2: boolean;        // true = present (100%), false = absent (0%)
  temperature: number; // in Celsius: 15 (cold), 25 (optimal), 38 (too hot)
}

export type PlantMood = 'happy' | 'neutral' | 'droop' | 'wilting';

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface CertificateData {
  studentName: string;
  date: string;
  score: number;
  totalQuestions: number;
  badgeTitle: string;
}
