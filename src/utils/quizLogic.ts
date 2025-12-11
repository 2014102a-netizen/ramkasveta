/**
 * Quiz Logic for Hero's Journey
 * Updated with warm/cool/earth routing logic
 */

import archetypesData from '../data/archetypes.json';
import type {
  Archetype,
  ArchetypeSlug,
  AnswerValue,
  QuizAnswers,
  QuizResult,
  QuizQuestion,
} from '../types/quiz';

// Load archetypes from JSON with type assertion
const archetypes: Archetype[] = archetypesData.archetypes as unknown as Archetype[];

/**
 * Quiz questions configuration
 */
export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: 'Что просит душа?',
    hint: 'Закройте глаза. Что вы чувствуете сейчас?',
    options: [
      {
        value: 'warm',
        label: 'Тепло',
        description: 'Хочу согреться и ощутить уют',
        image: 'https://user-gen-media-assets.s3.amazonaws.com/gemini_images/93fc5844-868d-429a-be57-aebc6bd52263.png',
      },
      {
        value: 'cool',
        label: 'Покой',
        description: 'Хочу тишины и очищения мыслей',
        image: 'https://user-gen-media-assets.s3.amazonaws.com/gemini_images/5a3c5c6d-98f8-4d51-aeba-2a9d7dc20604.png',
      },
      {
        value: 'earth',
        label: 'Опора',
        description: 'Хочу чувствовать связь и защиту',
        image: 'https://user-gen-media-assets.s3.amazonaws.com/gemini_images/280e204c-68ed-4119-aa62-ddac6ac2f86a.png',
      },
    ],
  },
  {
    id: 2,
    text: 'Какой язык вам ближе?',
    hint: 'Как вы воспринимаете мир?',
    options: [
      {
        value: 'warm',
        label: 'Визуал и Узоры',
        description: 'Я чувствую через образы и цвета',
        emoji: '🎨',
      },
      {
        value: 'cool',
        label: 'Смыслы и Текст',
        description: 'Я нахожу силу в словах',
        emoji: '📜',
      },
      {
        value: 'earth',
        label: 'Ритуал и Действие',
        description: 'Я верю в силу традиций',
        emoji: '✨',
      },
    ],
  },
  {
    id: 3,
    text: 'Для какого пространства?',
    hint: 'Где вы хотите создать особую атмосферу?',
    options: [
      {
        value: 'cool',
        label: 'Спальня',
        description: 'Место отдыха и восстановления',
        image: 'https://user-gen-media-assets.s3.amazonaws.com/gemini_images/9f5f97df-b8c8-432c-8159-2d9f68e5ca0d.png',
      },
      {
        value: 'warm',
        label: 'Кабинет',
        description: 'Место силы и концентрации',
        image: 'https://user-gen-media-assets.s3.amazonaws.com/gemini_images/e808257c-410a-4950-8307-61a87dc6880e.png',
      },
      {
        value: 'earth',
        label: 'Гостиная',
        description: 'Место встречи и семейного тепла',
        image: 'https://user-gen-media-assets.s3.amazonaws.com/gemini_images/69996f65-f38d-4f6c-8346-7573c9b95064.png',
      },
    ],
  },
];

/**
 * Get archetype by slug
 */
export function getArchetypeBySlug(slug: ArchetypeSlug): Archetype | undefined {
  return archetypes.find((a) => a.slug === slug);
}

/**
 * Get archetype by category (warm/cool/earth)
 */
export function getArchetypeByCategory(category: AnswerValue): Archetype | undefined {
  return archetypes.find((a) => a.category === category);
}

/**
 * Get all archetypes
 */
export function getAllArchetypes(): Archetype[] {
  return archetypes;
}

/**
 * Count answers by category
 */
function countAnswers(answers: QuizAnswers): Record<AnswerValue, number> {
  const counts: Record<AnswerValue, number> = {
    warm: 0,
    cool: 0,
    earth: 0,
  };

  if (answers.question1) counts[answers.question1]++;
  if (answers.question2) counts[answers.question2]++;
  if (answers.question3) counts[answers.question3]++;

  return counts;
}

/**
 * Determine archetype based on quiz answers
 * Uses majority voting: whichever category appears most wins
 */
export function determineArchetype(answers: QuizAnswers): QuizResult {
  // If incomplete answers, return first archetype as fallback
  if (!answers.question1 || !answers.question2 || !answers.question3) {
    return {
      archetype: archetypes[0],
      confidence: 'low',
      reasoning: 'Неполные ответы — случайный выбор',
    };
  }

  // Count answers by category
  const counts = countAnswers(answers);

  // Find the category with the most votes
  let maxCount = 0;
  let winningCategory: AnswerValue = 'warm';

  (Object.keys(counts) as AnswerValue[]).forEach((category) => {
    if (counts[category] > maxCount) {
      maxCount = counts[category];
      winningCategory = category;
    }
  });

  // Determine confidence
  let confidence: 'high' | 'medium' | 'low' = 'medium';
  if (maxCount === 3) confidence = 'high';
  else if (maxCount === 2) confidence = 'medium';
  else confidence = 'low';

  // Get archetype for winning category
  const archetype = getArchetypeByCategory(winningCategory);

  if (!archetype) {
    // Fallback
    return {
      archetype: archetypes[0],
      confidence: 'low',
      reasoning: 'Ошибка определения — fallback',
    };
  }

  return {
    archetype,
    confidence,
    reasoning: `Большинство ответов: ${winningCategory} (${maxCount}/3)`,
  };
}

/**
 * Get recommended archetypes (other 2)
 */
export function getRelatedArchetypes(currentSlug: ArchetypeSlug): Archetype[] {
  return archetypes.filter((a) => a.slug !== currentSlug);
}

/**
 * Validate quiz answers
 */
export function validateQuizAnswers(answers: QuizAnswers): boolean {
  return !!(answers.question1 && answers.question2 && answers.question3);
}
