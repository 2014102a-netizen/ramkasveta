/**
 * Quiz Logic Tests
 * Manual test scenarios to verify routing logic
 */

import { determineArchetype, getArchetypeBySlug } from './quizLogic';
import type { QuizAnswers } from '../types/quiz';

// Test scenarios
const testScenarios: Array<{
  name: string;
  answers: QuizAnswers;
  expectedSlug: string;
}> = [
  // Living room always → Firebird
  {
    name: 'Living room → Firebird',
    answers: {
      question1: 'warmth',
      question2: 'words',
      question3: 'living',
    },
    expectedSlug: 'firebird',
  },

  // Words + Support combinations
  {
    name: 'Support + Words + Bedroom → Azъ',
    answers: {
      question1: 'support',
      question2: 'words',
      question3: 'bedroom',
    },
    expectedSlug: 'az-esm-svet',
  },
  {
    name: 'Support + Words + Workspace → Я',
    answers: {
      question1: 'support',
      question2: 'words',
      question3: 'workspace',
    },
    expectedSlug: 'ya-est-svet',
  },

  // Peace combinations
  {
    name: 'Peace + Words → Azъ',
    answers: {
      question1: 'peace',
      question2: 'words',
      question3: 'bedroom',
    },
    expectedSlug: 'az-esm-svet',
  },
  {
    name: 'Peace + Visual → Gzhel',
    answers: {
      question1: 'peace',
      question2: 'visual',
      question3: 'bedroom',
    },
    expectedSlug: 'gzhel',
  },

  // Warmth combinations
  {
    name: 'Warmth + Words → Я',
    answers: {
      question1: 'warmth',
      question2: 'words',
      question3: 'workspace',
    },
    expectedSlug: 'ya-est-svet',
  },
  {
    name: 'Warmth + Visual → Khokhloma',
    answers: {
      question1: 'warmth',
      question2: 'visual',
      question3: 'workspace',
    },
    expectedSlug: 'khokhloma',
  },

  // Support + Visual (space-dependent)
  {
    name: 'Support + Visual + Bedroom → Gzhel',
    answers: {
      question1: 'support',
      question2: 'visual',
      question3: 'bedroom',
    },
    expectedSlug: 'gzhel',
  },
  {
    name: 'Support + Visual + Workspace → Khokhloma',
    answers: {
      question1: 'support',
      question2: 'visual',
      question3: 'workspace',
    },
    expectedSlug: 'khokhloma',
  },

  // Incomplete answers
  {
    name: 'Incomplete answers → Firebird',
    answers: {
      question1: 'warmth',
    },
    expectedSlug: 'firebird',
  },
];

// Run tests
console.log('🧪 Testing Quiz Logic\n');

let passed = 0;
let failed = 0;

testScenarios.forEach((scenario) => {
  const result = determineArchetype(scenario.answers);
  const success = result.archetype.slug === scenario.expectedSlug;

  if (success) {
    console.log(`✅ ${scenario.name}`);
    console.log(`   → ${result.archetype.name} (${result.confidence})`);
    console.log(`   → ${result.reasoning}\n`);
    passed++;
  } else {
    console.log(`❌ ${scenario.name}`);
    console.log(`   Expected: ${scenario.expectedSlug}`);
    console.log(`   Got: ${result.archetype.slug} (${result.confidence})`);
    console.log(`   Reasoning: ${result.reasoning}\n`);
    failed++;
  }
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

// Test getArchetypeBySlug
console.log('\n🔍 Testing getArchetypeBySlug:\n');

const testSlugs = ['az-esm-svet', 'ya-est-svet', 'gzhel', 'khokhloma', 'firebird'];
testSlugs.forEach((slug) => {
  const archetype = getArchetypeBySlug(slug as any);
  if (archetype) {
    console.log(`✅ ${slug} → ${archetype.name} (${archetype.chapter})`);
  } else {
    console.log(`❌ ${slug} → not found`);
  }
});
