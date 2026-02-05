/**
 * Prerender script for SEO
 * Adds static HTML content for search engine crawlers
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '..', 'dist');

// Static content for SEO (shown in noscript and as prerendered content)
const staticContent = `
  <div class="prerendered-content" style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif;">
    <header>
      <h1>Рамка Света — Светящиеся картины ручной работы</h1>
      <p>Интерактивные светильники-рамки из дерева с русскими орнаментами и аффирмациями</p>
    </header>

    <nav>
      <a href="#manifesto">Манифест</a> |
      <a href="#quiz">Квиз</a> |
      <a href="#catalog">Каталог</a>
    </nav>

    <main>
      <section id="manifesto">
        <h2>НЕ ПРОСТО СВЕТ. ИСТОРИЯ.</h2>
        <p>Днём — арт-объект. Ночью — маяк. Сначала темнота, потом — личный свет.</p>
      </section>

      <section id="quiz">
        <h2>Конструктор Атмосферы</h2>
        <p>Пройдите квиз и найдите свою идеальную рамку света. 3 вопроса — и мы подберём архетип, который откликнется вашей душе.</p>
      </section>

      <section id="catalog">
        <h2>Каталог</h2>

        <article>
          <h3>Азъ есмь Свѣтъ</h3>
          <p>Древняя мудрость. Старославянский текст в современном исполнении. Для тех, кто ищет связь с родом.</p>
          <p>Цена: 899 ₽</p>
        </article>

        <article>
          <h3>Я есть свет</h3>
          <p>Лаконичная уверенность. Психологический якорь. Минимализм и сила утверждения.</p>
          <p>Цена: 899 ₽</p>
        </article>

        <article>
          <h3>Гжель: Лунная Соната</h3>
          <p>Холодный, успокаивающий свет. Синие узоры на белом фарфоровом свечении. Идеально для медитации.</p>
          <p>Цена: 1299 ₽</p>
        </article>

        <article>
          <h3>Хохлома: Очаг</h3>
          <p>Согревающий янтарный свет. Огненные узоры, дарящие энергию жизни и плодородия.</p>
          <p>Цена: 1299 ₽</p>
        </article>

        <article>
          <h3>Перо Жар-Птицы</h3>
          <p>Свет, приносящий удачу. Иллюстрация волшебного пера. Для тех, кто верит в чудеса.</p>
          <p>Цена: 1599 ₽</p>
        </article>
      </section>
    </main>

    <footer>
      <p>Контакты: hello@ramkasveta.ru | +7 (999) 123-45-67</p>
      <p>Telegram: @ramkasveta</p>
      <p>© 2024-2026 Рамка Света. Сделано руками, согрето сердцем.</p>
    </footer>
  </div>
`;

try {
  const indexPath = join(distPath, 'index.html');
  let html = readFileSync(indexPath, 'utf-8');

  // Add noscript fallback with static content
  const noscriptContent = `<noscript>${staticContent}</noscript>`;

  // Insert prerendered content before the closing </body> tag
  // This content is hidden by React but visible to crawlers
  const prerenderWrapper = `
    <div id="prerendered-seo" style="display:none;" aria-hidden="true">
      ${staticContent}
    </div>
    ${noscriptContent}
  `;

  html = html.replace('</body>', `${prerenderWrapper}</body>`);

  writeFileSync(indexPath, html);
  console.log('✅ Prerendering complete: dist/index.html updated with static content');
} catch (error) {
  console.error('❌ Prerender failed:', error.message);
  process.exit(1);
}
