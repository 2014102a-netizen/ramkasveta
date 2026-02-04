import { motion } from 'framer-motion';
import { GlowText, GlowTextLineByLine } from '../ui/GlowText';

const Manifesto = () => {
  return (
    <section id="manifesto" className="section bg-dark-bg">
      <div className="container-custom">
        <GlowText
          as="h2"
          className="text-4xl md:text-5xl font-heading font-bold text-center mb-16 text-accent-gold"
          glowColor="rgba(212, 175, 55, 0.6)"
          glowIntensity="strong"
          duration={1}
        >
          МАНИФЕСТ ТИШИНЫ
        </GlowText>

        <div className="max-w-4xl mx-auto space-y-8">
          <GlowTextLineByLine
            lines={[
              'Мы живем в эпоху шума.',
              'Уведомления, новости, дедлайны.',
              'Мы забываем, кто мы.'
            ]}
            className="text-xl md:text-2xl leading-relaxed text-light-warm/80 text-center"
            glowColor="rgba(255, 248, 231, 0.4)"
            glowIntensity="soft"
            lineDelay={0.2}
            duration={0.8}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="py-8 my-8 border-t border-b border-accent-gold/20"
          >
            <GlowText
              as="p"
              className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-center text-accent-blue leading-snug"
              glowColor="rgba(74, 158, 255, 0.5)"
              glowIntensity="medium"
              delay={0.3}
              duration={1}
            >
              РАМКА СВЕТА — это кнопка «Пауза»{' '}
              <span className="block">для вашего вечера.</span>
            </GlowText>
          </motion.div>

          <GlowText
            as="p"
            className="text-lg md:text-xl leading-relaxed text-light-warm/70 text-center"
            glowColor="rgba(255, 248, 231, 0.3)"
            glowIntensity="soft"
            delay={0.2}
          >
            Света придумала этот формат, чтобы вернуть в дом ощущение{' '}
            <em className="text-accent-gold not-italic">сакрального пространства</em>.
          </GlowText>

          <div className="grid md:grid-cols-2 gap-6 py-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="card relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-accent-gold/10 to-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
              />
              <div className="relative">
                <div className="text-5xl mb-4">☀️</div>
                <h3 className="text-2xl font-heading font-semibold mb-3 text-accent-gold">Днём</h3>
                <p className="text-light-warm/80 text-lg">
                  Это <strong className="text-light-warm">арт-объект</strong> из массива дерева.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="card relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-accent-blue/10 to-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.7 }}
                viewport={{ once: true }}
              />
              <div className="relative">
                <div className="text-5xl mb-4">🌙</div>
                <h3 className="text-2xl font-heading font-semibold mb-3 text-accent-blue">Ночью</h3>
                <p className="text-light-warm/80 text-lg">
                  Это <strong className="text-light-warm">маяк</strong>, который говорит с вами.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <GlowTextLineByLine
              lines={[
                '«Мы не продаём лампы.',
                'Мы продаём атмосферу,',
                'в которую хочется возвращаться.»'
              ]}
              className="text-xl md:text-2xl text-center italic pt-8"
              glowColor="rgba(212, 175, 55, 0.5)"
              glowIntensity="medium"
              lineDelay={0.25}
              duration={0.7}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
