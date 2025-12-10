import { motion } from 'framer-motion';

const Manifesto = () => {
  return (
    <section id="manifesto" className="section bg-dark-surface">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-accent-gold"
        >
          МАНИФЕСТ ТИШИНЫ
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-lg md:text-xl leading-relaxed space-y-6 text-light-warm/90"
        >
          <p>
            Мы живем в эпоху шума. Уведомления, новости, дедлайны. Мы забываем, кто мы.
          </p>

          <p className="text-2xl font-semibold text-accent-blue">
            РАМКА СВЕТА — это кнопка «Пауза» для вашего вечера.
          </p>

          <p>
            Света (создатель проекта) придумала этот формат, чтобы вернуть в дом ощущение сакрального пространства.
          </p>

          <div className="grid md:grid-cols-2 gap-8 py-8">
            <div className="card">
              <div className="text-4xl mb-4">☀️</div>
              <h3 className="text-xl font-semibold mb-2 text-accent-gold">Днём</h3>
              <p className="text-light-warm/80">
                Это <strong>арт-объект</strong> из массива дерева и дизайнерской бумаги.
              </p>
            </div>

            <div className="card">
              <div className="text-4xl mb-4">🌙</div>
              <h3 className="text-xl font-semibold mb-2 text-accent-gold">Ночью</h3>
              <p className="text-light-warm/80">
                Это <strong>маяк</strong>, который говорит с вами на языке предков или на языке современной психологии.
              </p>
            </div>
          </div>

          <p className="text-center italic text-xl text-accent-blue">
            Мы не продаем лампы. Мы продаем атмосферу, в которую хочется возвращаться.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Manifesto;
