/**
 * Quiz System Types for Hero's Journey
 * Updated structure with warm/cool/earth answers and 6 archetypes
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

// Archetype slugs (6 results)
export type ArchetypeSlug =
  | 'az-esm-svet'
  | 'ya-est-svet'
  | 'gzhel'
  | 'khokhloma'
  | 'zhar-ptitsa'
  | 'schuka';

// Chapter IDs
export type ChapterId = 'logos' | 'istoki' | 'skazy';

// Chapter structure
export interface Chapter {
  id: ChapterId;
  title: string;
  subtitle: string;
  narrative: string;
}

// Playlist structure
export interface Playlist {
  name: string;
  mood: string;
  url: string;
}

// Archetype structure (expanded for 6 archetypes)
export interface Archetype {
  id: string;
  slug: ArchetypeSlug;
  chapter: ChapterId;
  name: string;
  subtitle: string;
  category: AnswerValue; // warm, cool, or earth
  style: string;
  emotion: string;
  description: string;
  meaning: string;
  image?: string;
  price: number;
  oldPrice?: number | null;
  tags: string[];
  // SEO fields for better LLM and search engine visibility
  keywords: string[];
  seoDescription: string;
  forWhom: string;
  forSpace: string;
  mood: string;
  // Phygital experience
  playlist?: Playlist;
}

// Quiz result
export interface QuizResult {
  archetype: Archetype;
  confidence: 'high' | 'medium' | 'low';
  reasoning?: string;
}

// Quiz mapping for special cases
export interface QuizMapping {
  warm: ArchetypeSlug;
  cool: ArchetypeSlug;
  earth: ArchetypeSlug;
  'words-traditional': ArchetypeSlug;
  'words-modern': ArchetypeSlug;
  magic: ArchetypeSlug;
}
