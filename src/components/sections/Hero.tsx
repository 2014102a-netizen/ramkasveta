import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section id="hero" className="section relative overflow-hidden">
      {/* Видео-фон (placeholder на этом этапе) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-dark-bg via-dark-surface to-dark-bg">
        {/* TODO: Добавить видео на следующем этапе */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="text-9xl animate-glow">🔥</div>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-dark-bg/60"></div>

      {/* Контент */}
      <div className="relative z-20 container-custom text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-light-warm leading-tight"
        >
          НЕ ПРОСТО СВЕТ.<br />ИСТОРИЯ.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-2xl mb-12 text-light-warm/80 max-w-3xl mx-auto"
        >
          Интерьерные лайтбоксы, соединяющие древние смыслы и современные технологии.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <Link
            to="quiz"
            smooth={true}
            duration={800}
            offset={-70}
            className="cta-button inline-block"
          >
            [ Найти свой свет ]
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-sm mt-8 text-light-warm/60 italic"
        >
          *Осторожно: магия внутри настоящая, хоть птица и цифровая.*
        </motion.p>
      </div>

      {/* Индикатор скролла */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="text-light-warm/60 text-3xl animate-bounce">↓</div>
      </motion.div>
    </section>
  );
};

export default Hero;
