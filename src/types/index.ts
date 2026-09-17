export interface Example {
  en: string;
  vi?: string;
}

export interface Word {
  id: string;
  en: string;
  pos: string;
  ipa: string;
  vi: string;
  lessonId: number;
  example?: Example;
}

export interface RawLesson {
  lessonId: number;
  lessonTitle: string;
  words: {
    en: string;
    pos: string;
    ipa: string;
    vi: string;
    example?: Example;
  }[];
}

export type TabType = 'flashcard' | 'search' | 'quiz';

export type ThemeMode = 'light' | 'dark';

export interface QuizQuestion {
  word: Word;
  questionType: 'en-to-vi' | 'vi-to-en';
  userAnswer: string;
  isCorrect?: boolean;
}
