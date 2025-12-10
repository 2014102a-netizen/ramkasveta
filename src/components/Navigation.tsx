import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-bg/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            className="text-2xl font-heading font-bold text-accent-gold"
            whileHover={{ scale: 1.05 }}
          >
            РАМКА СВЕТА
          </motion.div>

          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="cursor-pointer text-light-warm hover:text-accent-gold transition-colors duration-300 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden"
          >
            <button className="text-light-warm">
              ☰
            </button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
