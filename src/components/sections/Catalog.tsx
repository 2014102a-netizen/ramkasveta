import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlowText } from '../ui/GlowText';
import archetypesData from '../../data/archetypes.json';

// Types
interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  narrative: string;
}

interface Archetype {
  id: string;
  slug: string;
  chapter: string;
  name: string;
  subtitle: string;
  category: string;
  style: string;
  emotion: string;
  description: string;
  price: number;
  oldPrice: number | null;
  image: string;
  tags: string[];
}

const chapters: Chapter[] = archetypesData.chapters;
const archetypes: Archetype[] = archetypesData.archetypes as Archetype[];

// Chapter icons
const chapterIcons: Record<string, string> = {
  logos: '📖',
  istoki: '🎨',
  skazy: '✨',
};

const Catalog = () => {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [highlightedProduct, setHighlightedProduct] = useState<string | null>(null);

  // Check if there's a highlighted product from quiz
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const highlight = urlParams.get('highlight');
    if (highlight) {
      setHighlightedProduct(highlight);
      // Find the chapter of the highlighted product
      const product = archetypes.find(a => a.slug === highlight);
      if (product) {
        setActiveChapter(product.chapter);
      }
      // Scroll to catalog after a short delay
      setTimeout(() => {
        const element = document.getElementById(`product-${highlight}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }, []);

  // Filter products by chapter
  const filteredArchetypes = activeChapter
    ? archetypes.filter(a => a.chapter === activeChapter)
    : archetypes;

  return (
    <section id="catalog" className="section bg-dark-surface min-h-auto py-20">
      <div className="container-custom">
        <GlowText
          as="h2"
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-accent-gold"
          glowColor="rgba(212, 175, 55, 0.6)"
          glowIntensity="strong"
          duration={1}
        >
          БИБЛИОТЕКА СМЫСЛОВ
        </GlowText>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-light-warm/70 mb-12 text-lg"
        >
          6 архетипов в 3 главах. Найдите свою историю.
        </motion.p>

        {/* Chapter Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setActiveChapter(null)}
            className={`px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
              activeChapter === null
                ? 'bg-accent-gold text-dark-bg'
                : 'bg-dark-bg/50 text-light-warm/80 hover:bg-dark-bg hover:text-accent-gold border border-accent-gold/20'
            }`}
          >
            Все главы
          </button>
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => setActiveChapter(chapter.id)}
              className={`px-6 py-3 rounded-lg transition-all duration-300 font-medium flex items-center gap-2 ${
                activeChapter === chapter.id
                  ? 'bg-accent-gold text-dark-bg'
                  : 'bg-dark-bg/50 text-light-warm/80 hover:bg-dark-bg hover:text-accent-gold border border-accent-gold/20'
              }`}
            >
              <span>{chapterIcons[chapter.id]}</span>
              <span>{chapter.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Chapter Info (when filtered) */}
        <AnimatePresence mode="wait">
          {activeChapter && (
            <motion.div
              key={activeChapter}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-12"
            >
              {chapters
                .filter(c => c.id === activeChapter)
                .map(chapter => (
                  <div key={chapter.id}>
                    <div className="text-5xl mb-4">{chapterIcons[chapter.id]}</div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-2 text-accent-blue">
                      Глава: {chapter.title}
                    </h3>
                    <p className="text-lg text-light-warm/60 italic">{chapter.subtitle}</p>
                    <p className="text-xl text-light-warm/80 mt-2">{chapter.narrative}</p>
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredArchetypes.map((product, idx) => (
              <motion.div
                key={product.id}
                id={`product-${product.slug}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`card relative overflow-hidden ${
                  highlightedProduct === product.slug
                    ? 'ring-2 ring-accent-gold ring-offset-2 ring-offset-dark-surface'
                    : ''
                }`}
              >
                {/* Glow effect for highlighted product */}
                {highlightedProduct === product.slug && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-radial from-accent-gold/20 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Chapter badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="text-2xl" title={chapters.find(c => c.id === product.chapter)?.title}>
                    {chapterIcons[product.chapter]}
                  </span>
                </div>

                {/* Product image */}
                <div className="aspect-video bg-dark-bg/50 rounded-lg mb-4 overflow-hidden relative">
                  {product.image ? (
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      onError={(e) => {
                        // Fallback to placeholder on error
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`absolute inset-0 flex items-center justify-center text-4xl ${product.image ? 'hidden' : ''}`}>
                    {chapterIcons[product.chapter]}
                  </div>

                  {/* Light glow overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-radial from-accent-gold/30 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Product info */}
                <div className="relative">
                  <h4 className="text-xl font-semibold mb-1 text-accent-gold">
                    {product.name}
                  </h4>
                  <p className="text-sm text-light-warm/60 mb-2 italic">
                    {product.subtitle}
                  </p>
                  <p className="text-light-warm/70 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-dark-bg/50 rounded-full text-light-warm/50"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-accent-blue">
                        {product.price} ₽
                      </p>
                      {product.oldPrice && (
                        <p className="text-sm text-light-warm/40 line-through">
                          {product.oldPrice} ₽
                        </p>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-accent-gold/20 text-accent-gold rounded-lg hover:bg-accent-gold hover:text-dark-bg transition-colors text-sm font-medium"
                    >
                      Читать историю
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredArchetypes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-light-warm/60"
          >
            В этой главе пока нет историй...
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-light-warm/60 mb-4">
            Не нашли свою историю?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const workshop = document.getElementById('workshop');
              if (workshop) workshop.scrollIntoView({ behavior: 'smooth' });
            }}
            className="cta-button"
          >
            Создать уникальную рамку
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Catalog;
