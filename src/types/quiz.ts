/**
 * Quiz System Types for Hero's Journey
 * Updated structure with warm/cool/earth answers
 */

// Answer value type - all questions use this
export type AnswerValue = 'warm' | 'cool' | 'earth';

// Quiz question option structure
export interface QuizOption {
  value: AnswerValue;
  label: string;
  description: string;
  emoji?: string;
  image?: string;
}

// Quiz question structure
export interface QuizQuestion {
  id: number;
  text: string;
  hint?: string;
  options: QuizOption[];
}

// User's quiz answers
export interface QuizAnswers {
  question1?: AnswerValue;
  question2?: AnswerValue;
  question3?: AnswerValue;
}

// Archetype slugs (3 results)
export type ArchetypeSlug = 'khokhloma' | 'gzhel' | 'firebird';

// Archetype structure
export interface Archetype {
  slug: ArchetypeSlug;
  name: string;
  category: AnswerValue; // warm, cool, or earth
  emotion: string;
  description: string;
  image?: string;
  price: number;
  // SEO fields for better LLM and search engine visibility
  keywords: string[];
  seoDescription: string;
  forWhom: string;
  forSpace: string;
  mood: string;
}

// Quiz result
export interface QuizResult {
  archetype: Archetype;
  confidence: 'high' | 'medium' | 'low';
  reasoning?: string;
}
