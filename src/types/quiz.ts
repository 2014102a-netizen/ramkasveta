/**
 * Quiz System Types for Hero's Journey
 * Defines the structure for quiz questions, answers, and archetype matching
 */

// Answer types for each question
export type SoulNeedAnswer = 'warmth' | 'peace' | 'support';
export type LanguageAnswer = 'words' | 'visual';
export type SpaceAnswer = 'bedroom' | 'workspace' | 'living';

// Combined answer type
export type QuizAnswer = SoulNeedAnswer | LanguageAnswer | SpaceAnswer;

// Quiz questions structure
export interface QuizQuestion {
  id: number;
  text: string;
  answers: {
    value: QuizAnswer;
    label: string;
    description?: string;
  }[];
}

// User's quiz answers
export interface QuizAnswers {
  question1?: SoulNeedAnswer;  // Что просит душа?
  question2?: LanguageAnswer;  // Какой язык ближе?
  question3?: SpaceAnswer;     // Для какого пространства?
}

// Archetype chapters
export type Chapter = 'I' | 'II' | 'III';

// Archetype slugs (product identifiers)
export type ArchetypeSlug =
  | 'az-esm-svet'      // Азъ есмь Свѣтъ
  | 'ya-est-svet'      // Я есть свет
  | 'gzhel'            // Гжель: Лунная Соната
  | 'khokhloma'        // Хохлома: Очаг
  | 'firebird';        // Перо Жар-Птицы

// Archetype structure
export interface Archetype {
  slug: ArchetypeSlug;
  name: string;
  chapter: Chapter;
  emotion: string;
  description: string;
  style: string;
  phygital: string;
  price: number;
}

// Quiz result
export interface QuizResult {
  archetype: Archetype;
  confidence: 'high' | 'medium' | 'fallback';
  reasoning?: string;
}
