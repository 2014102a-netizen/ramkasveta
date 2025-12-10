import { motion } from 'framer-motion';

const Phygital = () => {
  return (
    <section id="phygital" className="section bg-dark-surface">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-accent-gold"
        >
          БОЛЬШЕ, ЧЕМ ВИДНО ГЛАЗУ
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card text-center">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-2xl font-semibold mb-4 text-accent-gold">QR-код</h3>
              <p className="text-light-warm/80">
                В комплекте с каждой рамкой
              </p>
            </div>

            <div className="card text-center">
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-2xl font-semibold mb-4 text-accent-gold">Плейлист</h3>
              <p className="text-light-warm/80">
                Секретная музыкальная атмосфера
              </p>
            </div>
          </div>

          <div className="card">
            <p className="text-xl text-light-warm/90 leading-relaxed">
              Каждая Рамка <strong className="text-accent-blue">звучит</strong>. 
              В комплекте вы найдете QR-код на секретный плейлист:
            </p>
            <ul className="mt-6 space-y-4 text-lg text-light-warm/80">
              <li className="flex items-center gap-3">
                <span className="text-accent-blue text-2xl">•</span>
                <span><strong>Гжель</strong> звучит как зимний лес</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent-blue text-2xl">•</span>
                <span><strong>Хохлома</strong> — как треск костра</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent-blue text-2xl">•</span>
                <span><strong>"Я есть свет"</strong> — как вдохновляющий эмбиент</span>
              </li>
            </ul>
            <p className="mt-6 text-center text-xl text-accent-gold italic">
              Полное погружение в атмосферу.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Phygital;
