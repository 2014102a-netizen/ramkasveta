/**
 * Quiz Component - "Диалог с душой"
 * Interactive quiz to help users discover their perfect archetype
 */

import { useReducer } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { determineArchetype } from '../../utils/quizLogic';
import type {
  QuizAnswers,
  SoulNeedAnswer,
  LanguageAnswer,
  SpaceAnswer,
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
  | { type: 'ANSWER_Q1'; payload: SoulNeedAnswer }
  | { type: 'ANSWER_Q2'; payload: LanguageAnswer }
  | { type: 'ANSWER_Q3'; payload: SpaceAnswer }
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

    case 'ANSWER_Q1':
      return {
        ...state,
        step: 'q2',
        answers: { ...state.answers, question1: action.payload },
      };

    case 'ANSWER_Q2':
      return {
        ...state,
        step: 'q3',
        answers: { ...state.answers, question2: action.payload },
      };

    case 'ANSWER_Q3': {
      const answers = { ...state.answers, question3: action.payload };
      const result = determineArchetype(answers);
      return {
        ...state,
        step: 'result',
        answers,
        result: result.archetype,
      };
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

// Helper to scroll to catalog product
function scrollToCatalogProduct(slug: string) {
  // TODO: implement navigation to catalog with product highlight
  console.log('Navigate to product:', slug);
  // For now, scroll to catalog section
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
  ease: [0.4, 0, 0.2, 1] as const
}; // easeOut cubic bezier

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.15,
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

  return (
    <section id="quiz" className="quiz-section">
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

          {/* QUESTION 1: Soul Need */}
          {state.step === 'q1' && (
            <motion.div
              key="q1"
              className="quiz-question"
              {...fadeInUp}
              transition={fadeTransition}
            >
              <div className="quiz-progress">Вопрос 1 из 3</div>
              <h3>Что просит душа?</h3>
              <p className="quiz-hint">
                Закройте глаза. Что вы чувствуете сейчас?
              </p>

              <motion.div
                className="quiz-options"
                variants={staggerChildren}
                initial="initial"
                animate="animate"
              >
                <motion.button
                  className="quiz-option-card"
                  variants={fadeInUp}
                  whileHover={cardHover}
                  onClick={() =>
                    dispatch({ type: 'ANSWER_Q1', payload: 'warmth' })
                  }
                >
                  <span className="option-emoji">🔥</span>
                  <span className="option-title">Тепло</span>
                  <span className="option-desc">
                    Хочу согреться и ощутить уют
                  </span>
                </motion.button>

                <motion.button
                  className="quiz-option-card"
                  variants={fadeInUp}
                  whileHover={cardHover}
                  onClick={() =>
                    dispatch({ type: 'ANSWER_Q1', payload: 'peace' })
                  }
                >
                  <span className="option-emoji">🌙</span>
                  <span className="option-title">Покой</span>
                  <span className="option-desc">
                    Хочу тишины и очищения мыслей
                  </span>
                </motion.button>

                <motion.button
                  className="quiz-option-card"
                  variants={fadeInUp}
                  whileHover={cardHover}
                  onClick={() =>
                    dispatch({ type: 'ANSWER_Q1', payload: 'support' })
                  }
                >
                  <span className="option-emoji">🌿</span>
                  <span className="option-title">Опора</span>
                  <span className="option-desc">
                    Хочу чувствовать связь и защиту
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* QUESTION 2: Language */}
          {state.step === 'q2' && (
            <motion.div
              key="q2"
              className="quiz-question"
              {...fadeInUp}
              transition={fadeTransition}
            >
              <div className="quiz-progress">Вопрос 2 из 3</div>
              <h3>Какой язык вам ближе?</h3>
              <p className="quiz-hint">Как вы воспринимаете мир?</p>

              <motion.div
                className="quiz-options grid-cols-2"
                variants={staggerChildren}
                initial="initial"
                animate="animate"
              >
                <motion.button
                  className="quiz-option-visual"
                  variants={fadeInUp}
                  whileHover={cardHover}
                  onClick={() =>
                    dispatch({ type: 'ANSWER_Q2', payload: 'visual' })
                  }
                >
                  <div className="option-preview">
                    <div className="option-preview-placeholder visual-pattern" />
                  </div>
                  <span className="option-title">Визуал и Узоры</span>
                  <span className="option-desc">
                    Я чувствую через образы и цвета
                  </span>
                </motion.button>

                <motion.button
                  className="quiz-option-visual"
                  variants={fadeInUp}
                  whileHover={cardHover}
                  onClick={() =>
                    dispatch({ type: 'ANSWER_Q2', payload: 'words' })
                  }
                >
                  <div className="option-preview">
                    <div className="option-preview-placeholder words-power" />
                  </div>
                  <span className="option-title">Смыслы и Текст</span>
                  <span className="option-desc">Я нахожу силу в словах</span>
                </motion.button>
              </motion.div>

              <button
                className="quiz-back"
                onClick={() => dispatch({ type: 'BACK' })}
              >
                ← Назад
              </button>
            </motion.div>
          )}

          {/* QUESTION 3: Space */}
          {state.step === 'q3' && (
            <motion.div
              key="q3"
              className="quiz-question"
              {...fadeInUp}
              transition={fadeTransition}
            >
              <div className="quiz-progress">Вопрос 3 из 3</div>
              <h3>Для какого пространства?</h3>
              <p className="quiz-hint">
                Где вы хотите создать особую атмосферу?
              </p>

              <motion.div
                className="quiz-options"
                variants={staggerChildren}
                initial="initial"
                animate="animate"
              >
                <motion.button
                  className="quiz-option-card"
                  variants={fadeInUp}
                  whileHover={cardHover}
                  onClick={() =>
                    dispatch({ type: 'ANSWER_Q3', payload: 'bedroom' })
                  }
                >
                  <span className="option-emoji">🛏️</span>
                  <span className="option-title">Спальня</span>
                  <span className="option-desc">
                    Место отдыха и восстановления
                  </span>
                </motion.button>

                <motion.button
                  className="quiz-option-card"
                  variants={fadeInUp}
                  whileHover={cardHover}
                  onClick={() =>
                    dispatch({ type: 'ANSWER_Q3', payload: 'workspace' })
                  }
                >
                  <span className="option-emoji">💼</span>
                  <span className="option-title">Кабинет</span>
                  <span className="option-desc">
                    Место силы и концентрации
                  </span>
                </motion.button>

                <motion.button
                  className="quiz-option-card"
                  variants={fadeInUp}
                  whileHover={cardHover}
                  onClick={() =>
                    dispatch({ type: 'ANSWER_Q3', payload: 'living' })
                  }
                >
                  <span className="option-emoji">🏠</span>
                  <span className="option-title">Гостиная</span>
                  <span className="option-desc">
                    Место встречи и семейного тепла
                  </span>
                </motion.button>
              </motion.div>

              <button
                className="quiz-back"
                onClick={() => dispatch({ type: 'BACK' })}
              >
                ← Назад
              </button>
            </motion.div>
          )}

          {/* RESULT SCREEN */}
          {state.step === 'result' && state.result && (
            <motion.div
              key="result"
              className="quiz-result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.h3
                className="result-chapter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Глава {state.result.chapter}
              </motion.h3>

              <motion.h2
                className="result-name"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {state.result.name}
              </motion.h2>

              <motion.div
                className="result-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="result-image-placeholder">
                  {/* Placeholder for product image */}
                  <div className="image-placeholder">
                    {state.result.slug}
                  </div>
                </div>

                <div className="result-content">
                  <p className="result-emotion">
                    <strong>Эмоция:</strong> {state.result.emotion}
                  </p>
                  <p className="result-description">
                    {state.result.description}
                  </p>

                  <div className="result-phygital">
                    <h4>🎵 Phygital-опыт</h4>
                    <p>
                      В комплекте: QR-код с плейлистом
                      <br />
                      <em>{state.result.phygital}</em>
                    </p>
                  </div>

                  <div className="result-price">
                    <span className="price-value">
                      {state.result.price} ₽
                    </span>
                  </div>

                  <div className="result-actions">
                    <button
                      className="cta-button cta-primary"
                      onClick={() => scrollToCatalogProduct(state.result!.slug)}
                    >
                      Читать историю
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
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
