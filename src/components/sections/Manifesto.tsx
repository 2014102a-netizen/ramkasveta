import { motion } from 'framer-motion';

const Manifesto = () => {
  // Контейнер для staggered анимации
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // Эффект "появления из темноты" для каждого блока
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: 'blur(4px)',
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  // Специальный вариант для акцентного текста
  const accentVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      filter: 'blur(8px)',
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="manifesto" className="section bg-dark-bg relative overflow-hidden">
      {/* Фоновый градиент для эффекта свечения */}
      <div className="absolute inset-0 bg-gradient-radial from-dark-surface/50 via-dark-bg to-dark-bg pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* Заголовок */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-16 text-accent-gold"
        >
          МАНИФЕСТ ТИШИНЫ
        </motion.h2>

        {/* Основной контент с staggered анимацией */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Первый параграф */}
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl leading-relaxed text-light-warm/80 text-center"
          >
            Мы живем в эпоху шума. Уведомления, новости, дедлайны. 
            <span className="block mt-2 text-light-warm/60">Мы забываем, кто мы.</span>
          </motion.p>

          {/* Акцентный блок - главное сообщение */}
          <motion.div 
            variants={accentVariants}
            className="py-8 my-8 border-t border-b border-accent-gold/20"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-center text-accent-blue leading-snug">
              РАМКА СВЕТА — это кнопка «Пауза» 
              <span className="block">для вашего вечера.</span>
            </p>
          </motion.div>

          {/* Про Свету */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl leading-relaxed text-light-warm/70 text-center"
          >
            Света придумала этот формат, чтобы вернуть в дом 
            ощущение <em className="text-accent-gold not-italic">сакрального пространства</em>.
          </motion.p>

          {/* Карточки День/Ночь */}
          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-6 py-8"
          >
            {/* Днём */}
            <motion.div 
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3 }}
              className="card group"
            >
              <div className="text-5xl mb-4 transition-transform group-hover:scale-110 duration-300">☀️</div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-accent-gold">Днём</h3>
              <p className="text-light-warm/80 text-lg leading-relaxed">
                Это <strong className="text-light-warm">арт-объект</strong> из массива дерева 
                и дизайнерской бумаги. Украшение интерьера.
              </p>
            </motion.div>

            {/* Ночью */}
            <motion.div 
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3 }}
              className="card group"
            >
              <div className="text-5xl mb-4 transition-transform group-hover:scale-110 duration-300">🌙</div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-accent-gold">Ночью</h3>
              <p className="text-light-warm/80 text-lg leading-relaxed">
                Это <strong className="text-light-warm">маяк</strong>, который говорит с вами 
                на языке предков или современной психологии.
              </p>
            </motion.div>
          </motion.div>

          {/* Финальная фраза */}
          <motion.div 
            variants={accentVariants}
            className="pt-8"
          >
            <p className="text-xl md:text-2xl text-center italic text-accent-blue/90 leading-relaxed">
              «Мы не продаём лампы. 
              <span className="block mt-2 text-accent-gold not-italic font-semibold">
                Мы продаём атмосферу, в которую хочется возвращаться.»
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* Декоративный элемент внизу */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent-gold/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Manifesto;
