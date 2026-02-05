/**
 * Site configuration
 * Основные контактные данные и настройки сайта
 */

export const siteConfig = {
  // Базовая информация
  name: 'Рамка Света',
  tagline: 'Светящиеся картины ручной работы',
  description: 'Авторские светильники-картины с русскими мотивами. Гжель, Хохлома, Жар-Птица. Phygital-искусство для вашего дома.',
  url: 'https://www.ramkasveta.ru',

  // Контакты
  contacts: {
    phone: '+7 (999) 123-45-67',
    phoneRaw: '+79991234567',
    email: 'hello@ramkasveta.ru',
    telegram: '@ramkasveta',
    telegramUrl: 'https://t.me/ramkasveta',
    whatsapp: '+79991234567',
    whatsappUrl: 'https://wa.me/79991234567',
  },

  // Адрес мастерской
  address: {
    full: 'Россия, Москва, ул. Мастеровая, д. 12',
    city: 'Москва',
    country: 'Россия',
    postalCode: '123456',
  },

  // Социальные сети
  social: {
    vk: 'https://vk.com/ramkasveta',
    telegram: 'https://t.me/ramkasveta',
    pinterest: 'https://pinterest.com/ramkasveta',
    youtube: 'https://youtube.com/@ramkasveta',
  },

  // Режим работы
  workingHours: {
    weekdays: '10:00 - 20:00',
    saturday: '11:00 - 18:00',
    sunday: 'Выходной',
  },

  // SEO
  seo: {
    defaultTitle: 'Рамка Света — Светящиеся картины ручной работы',
    titleTemplate: '%s | Рамка Света',
    keywords: ['светящиеся картины', 'светильники ручной работы', 'гжель', 'хохлома', 'жар-птица', 'русский стиль', 'phygital', 'интерьерный свет'],
  },

  // Юридическая информация
  legal: {
    inn: '1234567890',
    ogrn: '1234567890123',
    legalName: 'ИП Иванов Иван Иванович',
  },
} as const;

export type SiteConfig = typeof siteConfig;
