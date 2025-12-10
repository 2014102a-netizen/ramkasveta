import { motion } from 'framer-motion';

const CustomWorkshop = () => {
  return (
    <section id="custom" className="section">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-accent-gold"
        >
          АВТОРСКАЯ МАСТЕРСКАЯ
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-center mb-12 text-light-warm/80 max-w-3xl mx-auto"
        >
          Иногда нужных слов или узоров нет в каталоге. Но они есть у вас в сердце.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="card text-center">
            <p className="text-xl text-light-warm/80 mb-8">
              Форма создания уникальной рамки будет реализована на следующем этапе
            </p>
            <div className="text-6xl mb-4">✨</div>
            <p className="text-lg text-accent-blue">
              Текст, изображение или ваша идея → Уникальная рамка (+500₽ к цене)
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomWorkshop;
