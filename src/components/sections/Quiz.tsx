import { motion } from 'framer-motion';

const Quiz = () => {
  return (
    <section id="quiz" className="section">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-accent-gold"
        >
          ДАВАЙТЕ ПОДБЕРЕМ ВАШУ ИСТОРИЮ
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="card">
            <p className="text-xl text-light-warm/80 mb-8">
              Интерактивный квиз будет реализован на следующем этапе
            </p>
            <div className="text-6xl">🔮</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Quiz;
