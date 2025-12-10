import { motion } from 'framer-motion';
import { collections, products } from '../../data/products';

const Catalog = () => {
  return (
    <section id="catalog" className="section bg-dark-surface min-h-auto py-20">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-accent-gold"
        >
          БИБЛИОТЕКА СМЫСЛОВ
        </motion.h2>

        {/* Коллекции */}
        {collections.map((collection, idx) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">{collection.icon}</div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2 text-accent-blue">
                {collection.title}
              </h3>
              <p className="text-xl text-light-warm/80 italic">{collection.narrative}</p>
            </div>

            {/* Продукты коллекции */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products
                .filter(p => p.collection === collection.slug)
                .map(product => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    className="card"
                  >
                    <div className="aspect-video bg-dark-bg/50 rounded-lg mb-4 flex items-center justify-center text-4xl">
                      🖼️
                    </div>
                    <h4 className="text-xl font-semibold mb-2 text-accent-gold">
                      {product.name}
                    </h4>
                    <p className="text-light-warm/70 mb-4">
                      {product.description}
                    </p>
                    <p className="text-2xl font-bold text-accent-blue">
                      {product.price} ₽
                    </p>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Catalog;
