import { motion } from 'framer-motion';

const Manifesto = () => {
  return (
    <section id="manifesto" className="section bg-dark-bg relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-16 text-accent-gold"
        >
          МАНИФЕСТ ТИШИНЫ
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-8">
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl leading-relaxed text-light-warm/80 text-center"
          >
            Мы живем в эпоху шума. Уведомления, новости, дедлайны. 
            <span className="block mt-2 text-light-warm/60">Мы забываем, кто мы.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="py-8 my-8 border-t border-b border-accent-gold/20"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-center text-accent-blue leading-snug">
              РАМКА СВЕТА — это кнопка «Пауза» 
              <span className="block">для вашего вечера.</span>
            </p>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl leading-relaxed text-light-warm/70 text-center"
          >
            Света придумала этот формат, чтобы вернуть в дом 
            ощущение <em className="text-accent-gold not-italic">сакрального пространства</em>.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 py-8"
          >
            <div className="card group">
              <div className="text-5xl mb-4">☀️</div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-accent-gold">Днём</h3>
              <p className="text-light-warm/80 text-lg leading-relaxed">
                Это <strong className="text-light-warm">арт-объект</strong> из массива дерева 
                и дизайнерской бумаги.
              </p>
            </div>

            <div className="card group">
              <div className="text-5xl mb-4">🌙</div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-accent-gold">Ночью</h3>
              <p className="text-light-warm/80 text-lg leading-relaxed">
                Это <strong className="text-light-warm">маяк</strong>, который говорит с вами 
                на языке предков.
              </p>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-center italic text-accent-blue/90 leading-relaxed pt-8"
          >
            «Мы не продаём лампы. 
            <span className="block mt-2 text-accent-gold not-italic font-semibold">
              Мы продаём атмосферу, в которую хочется возвращаться.»
            </span>
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
