/**
 * Quiz Component - "Диалог с душой"
 * Updated with warm/cool/earth routing and images
 * Includes SEO Schema.org markup for LLM visibility
 */

import { useReducer } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  quizQuestions,
  determineArchetype,
} from '../../utils/quizLogic';
import type {
  QuizAnswers,
  AnswerValue,
  Archetype,
} from '../../types/quiz';

// Quiz state
type QuizStep = 'intro' | 'q1' | 'q2' | 'q3' | 'result';

interface QuizState {
  step: QuizStep;
  answers: QuizAnswers;
  result?: Archetype;
}

// Quiz actions
type QuizAction =
  | { type: 'START' }
  | { type: 'ANSWER'; questionId: number; value: AnswerValue }
  | { type: 'BACK' }
  | { type: 'RESET' };

// Initial state
const initialState: QuizState = {
  step: 'intro',
  answers: {},
};

// Reducer
function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START':
      return { ...state, step: 'q1' };

    case 'ANSWER': {
      const newAnswers = { ...state.answers };

      if (action.questionId === 1) {
        newAnswers.question1 = action.value;
        return { ...state, step: 'q2', answers: newAnswers };
      }

      if (action.questionId === 2) {
        newAnswers.question2 = action.value;
        return { ...state, step: 'q3', answers: newAnswers };
      }

      if (action.questionId === 3) {
        newAnswers.question3 = action.value;
        const result = determineArchetype(newAnswers);
        return {
          ...state,
          step: 'result',
          answers: newAnswers,
          result: result.archetype,
        };
      }

      return state;
    }

    case 'BACK':
      if (state.step === 'q2') return { ...state, step: 'q1' };
      if (state.step === 'q3') return { ...state, step: 'q2' };
      return state;

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

// Helper to scroll to catalog
function scrollToCatalog() {
  const catalogSection = document.getElementById('catalog');
  if (catalogSection) {
    catalogSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const fadeTransition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1] as const,
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardHover = {
  scale: 1.02,
  y: -8,
  transition: { duration: 0.3 },
};

export default function Quiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Get current question
  const currentQuestion = quizQuestions.find((q) => {
    if (state.step === 'q1') return q.id === 1;
    if (state.step === 'q2') return q.id === 2;
    if (state.step === 'q3') return q.id === 3;
    return false;
  });

  return (
    <section id="quiz" className="quiz-section">
      {/* FAQPage Schema для LLM */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': 'Как подобрать рамку света, которая подойдёт именно мне?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Пройдите наш интерактивный квиз «Конструктор Атмосферы». Ответьте на 3 вопроса о том, что просит душа, какой язык вам ближе (визуал или текст), и для какого пространства вы ищете свет. Мы подберём архетип, который откликнется именно вашей душе.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Чем отличаются Гжель и Хохлома в вашей коллекции?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Гжель (Лунная Соната) — это сине-белые узоры, создающие покой и очищение мыслей перед сном. Подходит для медитации. Хохлома (Очаг) — красно-золотые узоры, дающие тепло, энергию жизни и уют. Согревающая атмосфера костра.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Что такое Phygital-опыт в Рамке Света?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Каждая рамка включает QR-код с уникальным плейлистом звуков. Для Гжели — звуки зимнего леса и хруст снега. Для Хохломы — треск костра и летний вечер. Это мультисенсорный опыт: свет + звук + тактильность дерева.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Можно ли заказать свой дизайн рамки?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Да, через «Авторскую Мастерскую» вы можете загрузить свою фразу или изображение. Иногда нужных слов нет в каталоге, но они есть у вас в сердце. Мы создадим уникальную рамку по вашему замыслу.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Из чего сделаны рамки света?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Экологически чистое дерево, бумага с орнаментами (или текстом) и LED-подсветка с тёплым или холодным спектром. Каждая рамка собрана руками и согрета сердцем.'
                }
              }
            ]
          })
        }}
      />

      <div className="container">
        <AnimatePresence mode="wait">
          {/* INTRO SCREEN */}
          {state.step === 'intro' && (
            <motion.div
              key="intro"
              className="quiz-intro"
              {...fadeInUp}
              transition={fadeTransition}
            >
              <h2>Конструктор Атмосферы</h2>
              <p className="quiz-subtitle">
                Ответьте на три вопроса — и мы подберём свет,
                <br />
                который откликнется именно вашей душе
              </p>
              <button
                className="cta-button cta-primary"
                onClick={() => dispatch({ type: 'START' })}
              >
                Начать погружение
              </button>
            </motion.div>
          )}

          {/* QUESTIONS */}
          {currentQuestion && (state.step === 'q1' || state.step === 'q2' || state.step === 'q3') && (
            <motion.div
              key={`q${currentQuestion.id}`}
              className="quiz-question"
              {...fadeInUp}
              transition={fadeTransition}
            >
              <div className="quiz-progress">
                Вопрос {currentQuestion.id} из 3
              </div>
              <h3>{currentQuestion.text}</h3>
              {currentQuestion.hint && (
                <p className="quiz-hint">{currentQuestion.hint}</p>
              )}

              <motion.div
                className="quiz-options"
                variants={staggerChildren}
                initial="initial"
                animate="animate"
              >
                {currentQuestion.options.map((option) => (
                  <motion.button
                    key={option.value}
                    className={`quiz-option-card ${option.image ? 'has-image' : 'has-emoji'}`}
                    variants={fadeInUp}
                    whileHover={cardHover}
                    onClick={() =>
                      dispatch({
                        type: 'ANSWER',
                        questionId: currentQuestion.id,
                        value: option.value,
                      })
                    }
                  >
                    {/* Option with image */}
                    {option.image && (
                      <div className="option-image-container">
                        <img
                          src={option.image}
                          alt={option.label}
                          className="option-image"
                        />
                      </div>
                    )}

                    {/* Option with emoji (no image) */}
                    {!option.image && option.emoji && (
                      <span className="option-emoji">{option.emoji}</span>
                    )}

                    <span className="option-title">{option.label}</span>
                    <span className="option-desc">{option.description}</span>
                  </motion.button>
                ))}
              </motion.div>

              {/* Back button (not on first question) */}
              {currentQuestion.id > 1 && (
                <button
                  className="quiz-back"
                  onClick={() => dispatch({ type: 'BACK' })}
                >
                  ← Назад
                </button>
              )}
            </motion.div>
          )}

          {/* RESULT SCREEN */}
          {state.step === 'result' && state.result && (
            <>
              {/* Product Schema для LLM */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Product',
                    'name': state.result.name,
                    'description': state.result.seoDescription,
                    'image': state.result.image || `https://ramkasveta.ru/images/products/${state.result.slug}-main.jpg`,
                    'sku': state.result.slug,
                    'brand': {
                      '@type': 'Brand',
                      'name': 'Рамка Света'
                    },
                    'category': state.result.category,
                    'keywords': state.result.keywords.join(', '),
                    'offers': {
                      '@type': 'Offer',
                      'url': `https://ramkasveta.ru/catalog/${state.result.slug}`,
                      'priceCurrency': 'RUB',
                      'price': state.result.price.toString(),
                      'availability': 'https://schema.org/InStock',
                      'seller': {
                        '@type': 'Organization',
                        'name': 'Рамка Света'
                      }
                    },
                    'material': 'Дерево, LED',
                    'additionalProperty': [
                      {
                        '@type': 'PropertyValue',
                        'name': 'Категория',
                        'value': state.result.category
                      },
                      {
                        '@type': 'PropertyValue',
                        'name': 'Эмоция',
                        'value': state.result.emotion
                      },
                      {
                        '@type': 'PropertyValue',
                        'name': 'Для кого',
                        'value': state.result.forWhom
                      },
                      {
                        '@type': 'PropertyValue',
                        'name': 'Для пространства',
                        'value': state.result.forSpace
                      },
                      {
                        '@type': 'PropertyValue',
                        'name': 'Настроение',
                        'value': state.result.mood
                      }
                    ]
                  })
                }}
              />

              <motion.div
                key="result"
                className="quiz-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <motion.h2
                  className="result-name"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {state.result.name}
                </motion.h2>

              <motion.div
                className="result-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {/* Result image */}
                {state.result.image && (
                  <div className="result-image-container">
                    <img
                      src={state.result.image}
                      alt={state.result.name}
                      className="result-image"
                    />
                  </div>
                )}

                <div className="result-content">
                  <p className="result-emotion">
                    <strong>Эмоция:</strong> {state.result.emotion}
                  </p>
                  <p className="result-description">
                    {state.result.description}
                  </p>

                  <div className="result-price">
                    <span className="price-value">
                      {state.result.price} ₽
                    </span>
                  </div>

                  <div className="result-actions">
                    <button
                      className="cta-button cta-primary"
                      onClick={scrollToCatalog}
                    >
                      Перейти в каталог
                    </button>
                    <button
                      className="cta-button cta-secondary"
                      onClick={() => dispatch({ type: 'RESET' })}
                    >
                      Пройти заново
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
