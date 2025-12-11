/**
 * Quiz Logic for Hero's Journey
 * Implements routing logic based on user answers to determine the best archetype match
 */

import archetypesData from '../data/archetypes.json';
import type {
  Archetype,
  ArchetypeSlug,
  QuizAnswers,
  QuizResult,
  QuizQuestion,
} from '../types/quiz';

// Load archetypes from JSON
const archetypes: Archetype[] = archetypesData.archetypes;

/**
 * Quiz questions configuration
 */
export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: 'Что просит твоя душа?',
    answers: [
      {
        value: 'warmth',
        label: 'Тепло',
        description: 'Уют домашнего очага и согревающая энергия',
      },
      {
        value: 'peace',
        label: 'Покой',
        description: 'Умиротворение и тишина внутреннего пространства',
      },
      {
        value: 'support',
        label: 'Опора',
        description: 'Связь с корнями и духовная поддержка',
      },
    ],
  },
  {
    id: 2,
    text: 'Какой язык тебе ближе?',
    answers: [
      {
        value: 'words',
        label: 'Смыслы и текст',
        description: 'Слова, которые проникают в душу',
      },
      {
        value: 'visual',
        label: 'Визуал и узоры',
        description: 'Красота форм и орнаментов',
      },
    ],
  },
  {
    id: 3,
    text: 'Для какого пространства?',
    answers: [
      {
        value: 'bedroom',
        label: 'Спальня',
        description: 'Место отдыха и восстановления',
      },
      {
        value: 'workspace',
        label: 'Кабинет',
        description: 'Пространство для работы и творчества',
      },
      {
        value: 'living',
        label: 'Гостиная',
        description: 'Общее пространство для жизни',
      },
    ],
  },
];

/**
 * Get archetype by slug
 * Used for integration with catalog and direct product access
 */
export function getArchetypeBySlug(slug: ArchetypeSlug): Archetype | undefined {
  return archetypes.find((a) => a.slug === slug);
}

/**
 * Get all archetypes
 */
export function getAllArchetypes(): Archetype[] {
  return archetypes;
}

/**
 * Main routing logic: determine archetype based on quiz answers
 *
 * Routing Logic:
 * Question 1 (Soul need):
 *   - warmth → склонность к Хохломе
 *   - peace → склонность к Гжели
 *   - support → склонность к Словам (Азъ/Я)
 *
 * Question 2 (Language):
 *   - words → ГЛАВА I (Азъ/Я)
 *   - visual → ГЛАВА II (Гжель/Хохлома)
 *
 * Question 3 (Space):
 *   - bedroom → усиление покоя (Гжель, Азъ)
 *   - workspace → энергия (Хохлома, Я)
 *   - living → универсальность (Жар-Птица)
 *
 * Fallback: При неоднозначных комбинациях → firebird
 */
export function determineArchetype(answers: QuizAnswers): QuizResult {
  const { question1, question2, question3 } = answers;

  // If incomplete answers, return firebird as fallback
  if (!question1 || !question2 || !question3) {
    return {
      archetype: getArchetypeBySlug('firebird')!,
      confidence: 'fallback',
      reasoning: 'Неполные ответы — универсальный выбор',
    };
  }

  // Living room always leads to Firebird (universal choice)
  if (question3 === 'living') {
    return {
      archetype: getArchetypeBySlug('firebird')!,
      confidence: 'high',
      reasoning: 'Гостиная → универсальность → Перо Жар-Птицы',
    };
  }

  // Word-based archetypes (Chapter I)
  if (question2 === 'words') {
    // Support + Words combination
    if (question1 === 'support') {
      // Bedroom → more contemplative → old slavonic
      if (question3 === 'bedroom') {
        return {
          archetype: getArchetypeBySlug('az-esm-svet')!,
          confidence: 'high',
          reasoning: 'Опора + Слова + Спальня → Азъ есмь Свѣтъ',
        };
      }
      // Workspace → modern energy → modern affirmation
      if (question3 === 'workspace') {
        return {
          archetype: getArchetypeBySlug('ya-est-svet')!,
          confidence: 'high',
          reasoning: 'Опора + Слова + Кабинет → Я есть свет',
        };
      }
    }

    // Peace + Words → old slavonic (contemplative)
    if (question1 === 'peace') {
      return {
        archetype: getArchetypeBySlug('az-esm-svet')!,
        confidence: 'medium',
        reasoning: 'Покой + Слова → Азъ есмь Свѣтъ',
      };
    }

    // Warmth + Words → modern affirmation (active energy)
    if (question1 === 'warmth') {
      return {
        archetype: getArchetypeBySlug('ya-est-svet')!,
        confidence: 'medium',
        reasoning: 'Тепло + Слова → Я есть свет',
      };
    }
  }

  // Visual archetypes (Chapter II)
  if (question2 === 'visual') {
    // Peace + Visual → Gzhel
    if (question1 === 'peace') {
      return {
        archetype: getArchetypeBySlug('gzhel')!,
        confidence: 'high',
        reasoning: 'Покой + Визуал → Гжель: Лунная Соната',
      };
    }

    // Warmth + Visual → Khokhloma
    if (question1 === 'warmth') {
      return {
        archetype: getArchetypeBySlug('khokhloma')!,
        confidence: 'high',
        reasoning: 'Тепло + Визуал → Хохлома: Очаг',
      };
    }

    // Support + Visual → depends on space
    if (question1 === 'support') {
      if (question3 === 'bedroom') {
        return {
          archetype: getArchetypeBySlug('gzhel')!,
          confidence: 'medium',
          reasoning: 'Опора + Визуал + Спальня → Гжель (покой)',
        };
      }
      if (question3 === 'workspace') {
        return {
          archetype: getArchetypeBySlug('khokhloma')!,
          confidence: 'medium',
          reasoning: 'Опора + Визуал + Кабинет → Хохлома (энергия)',
        };
      }
    }
  }

  // Fallback for any unhandled combinations
  return {
    archetype: getArchetypeBySlug('firebird')!,
    confidence: 'fallback',
    reasoning: 'Неоднозначная комбинация → Перо Жар-Птицы',
  };
}

/**
 * Get recommended archetypes based on current archetype
 * (for "You might also like" section)
 */
export function getRelatedArchetypes(currentSlug: ArchetypeSlug): Archetype[] {
  const current = getArchetypeBySlug(currentSlug);
  if (!current) return [];

  // Same chapter archetypes
  const sameChapter = archetypes.filter(
    (a) => a.chapter === current.chapter && a.slug !== currentSlug
  );

  // Other archetypes
  const others = archetypes.filter(
    (a) => a.chapter !== current.chapter && a.slug !== currentSlug
  );

  // Return up to 3 related: same chapter first, then others
  return [...sameChapter, ...others].slice(0, 3);
}

/**
 * Validate quiz answers
 */
export function validateQuizAnswers(answers: QuizAnswers): boolean {
  return !!(answers.question1 && answers.question2 && answers.question3);
}
