import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.log('Autoplay prevented:', error);
      });
      
      const handleLoadedData = () => setVideoLoaded(true);
      video.addEventListener('loadeddata', handleLoadedData);
      
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, []);

  const handleScrollDown = () => {
    const manifestoSection = document.getElementById('manifesto');
    if (manifestoSection) {
      manifestoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          style={{ display: videoLoaded ? 'block' : 'none' }}
        >
          <source src="/videos/firebird-hero.mp4" type="video/mp4" />
          🔥
        </video>
        
        {/* Loading indicator */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-dark-bg flex items-center justify-center">
            <div className="text-gold text-xl">Loading...</div>
          </div>
        )}
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/40 via-transparent to-dark-bg/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white drop-shadow-2xl"
        >
          НЕ ПРОСТО СВЕТ.<br />ИСТОРИЯ.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl mb-12 text-white/90 drop-shadow-lg"
        >
          Интерьерные лайтбоксы, соединяющие древние смыслы и современные технологии.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          onClick={handleScrollDown}
          className="bg-gold hover:bg-gold-light text-dark-bg font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 shadow-2xl hover:shadow-gold/50 hover:scale-105"
        >
          [ Найти свой свет ]
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 text-sm md:text-base text-white/80 italic drop-shadow-md"
        >
          *Осторожно: магия внутри настоящая, хоть птица и цифровая.*
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={handleScrollDown}
      >
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
