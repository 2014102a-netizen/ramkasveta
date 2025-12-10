import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer id="footer" className="section bg-dark-bg min-h-[50vh]">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-accent-gold">
            РАМКА СВЕТА
          </h2>
          <p className="text-xl text-light-warm/70 italic">
            Сделано руками, согрето сердцем
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <a
            href="https://t.me/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button inline-block"
          >
            Задать вопрос Свете
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="space-y-4 text-light-warm/60"
        >
          <p>© 2025 Рамка Света. Все права защищены.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-accent-gold transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-accent-gold transition-colors">
              Telegram
            </a>
            <a href="#" className="hover:text-accent-gold transition-colors">
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
