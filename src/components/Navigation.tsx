import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Главная', to: 'hero' },
    { name: 'Манифест', to: 'manifesto' },
    { name: 'Квиз', to: 'quiz' },
    { name: 'Каталог', to: 'catalog' },
    { name: 'Контакты', to: 'footer' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-bg/95 backdrop-blur-md shadow-lg border-b border-accent-gold/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Лого */}
          <Link
            to="hero"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            className="cursor-pointer"
          >
            <motion.div 
              className="text-xl md:text-2xl font-heading font-bold text-accent-gold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              РАМКА СВЕТА
            </motion.div>
          </Link>

          {/* Desktop навигация */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="cursor-pointer text-light-warm/80 hover:text-accent-gold transition-colors duration-300 font-medium text-sm uppercase tracking-wide"
                activeClass="text-accent-gold"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Мобильное меню - кнопка */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-light-warm p-2"
            aria-label="Открыть меню"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Мобильное меню - выпадающее */}
        <motion.div
          initial={false}
          animate={{ 
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block cursor-pointer text-light-warm/80 hover:text-accent-gold transition-colors duration-300 font-medium text-lg"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
