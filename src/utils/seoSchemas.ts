/**
 * SEO Schema.org utilities for Hero's Journey Quiz
 * Generates structured data for better LLM and search engine visibility
 */

import type { Archetype } from '../types/quiz';

/**
 * Generate Schema.org Product markup for an archetype
 */
export const generateProductSchema = (archetype: Archetype) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  'name': archetype.name,
  'description': archetype.seoDescription,
  'image': archetype.image || `https://ramkasveta.ru/images/products/${archetype.slug}-main.jpg`,
  'sku': archetype.slug,
  'brand': {
    '@type': 'Brand',
    'name': 'Рамка Света'
  },
  'category': `Глава ${archetype.category}`,
  'keywords': archetype.keywords.join(', '),
  'offers': {
    '@type': 'Offer',
    'url': `https://ramkasveta.ru/catalog/${archetype.slug}`,
    'priceCurrency': 'RUB',
    'price': archetype.price,
    'availability': 'https://schema.org/InStock',
    'seller': {
      '@type': 'Organization',
      'name': 'Рамка Света'
    }
  },
  'material': 'Дерево, LED',
  'additionalProperty': [
    {
      '@type': 'PropertyValue',
      'name': 'Категория',
      'value': archetype.category
    },
    {
      '@type': 'PropertyValue',
      'name': 'Эмоция',
      'value': archetype.emotion
    },
    {
      '@type': 'PropertyValue',
      'name': 'Для кого',
      'value': archetype.forWhom
    },
    {
      '@type': 'PropertyValue',
      'name': 'Для пространства',
      'value': archetype.forSpace
    },
    {
      '@type': 'PropertyValue',
      'name': 'Настроение',
      'value': archetype.mood
    }
  ],
  'review': {
    '@type': 'Review',
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': '5',
      'bestRating': '5'
    },
    'author': {
      '@type': 'Person',
      'name': 'Покупатели Рамки Света'
    },
    'reviewBody': 'Уникальный подарок с душой и историей. Деревянные лайтбоксы ручной работы с традиционными русскими орнаментами.'
  }
});

/**
 * Generate Schema.org FAQPage for quiz questions
 */
export const generateQuizFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'Как подобрать рамку света, которая подойдёт именно мне?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Пройдите наш интерактивный квиз «Конструктор Атмосферы». Ответьте на 3 вопроса о том, что просит душа, какой язык вам ближе (визуал или текст), и для какого пространства вы ищете свет. Мы подберём архетип, который откликнется именно вашей душе.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Чем отличаются Гжель и Хохлома в вашей коллекции?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Гжель (Лунная Соната) — это сине-белые узоры, создающие покой и очищение мыслей перед сном. Подходит для медитации. Хохлома (Очаг) — красно-золотые узоры, дающие тепло, энергию жизни и уют. Согревающая атмосфера костра.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Что такое Phygital-опыт в Рамке Света?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Каждая рамка включает QR-код с уникальным плейлистом звуков. Для Гжели — звуки зимнего леса и хруст снега. Для Хохломы — треск костра и летний вечер. Для текстовых рамок — вдохновляющий эмбиент. Это мультисенсорный опыт: свет + звук + тактильность дерева.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Можно ли заказать свой дизайн рамки?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Да, через «Авторскую Мастерскую» вы можете загрузить свою фразу или изображение. Иногда нужных слов нет в каталоге, но они есть у вас в сердце. Мы создадим уникальную рамку по вашему замыслу.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Из чего сделаны рамки света?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Экологически чистое дерево, бумага с орнаментами (или текстом) и LED-подсветка с тёплым или холодным спектром. Каждая рамка собрана руками и согрета сердцем.'
      }
    }
  ]
});

/**
 * Generate Schema.org ItemList for all archetypes
 */
export const generateArchetypesListSchema = (archetypes: Archetype[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  'itemListElement': archetypes.map((archetype, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'item': {
      '@type': 'Product',
      'name': archetype.name,
      'url': `https://ramkasveta.ru/catalog/${archetype.slug}`,
      'description': archetype.seoDescription,
      'image': archetype.image || `https://ramkasveta.ru/images/products/${archetype.slug}-main.jpg`,
      'keywords': archetype.keywords.join(', ')
    }
  }))
});
