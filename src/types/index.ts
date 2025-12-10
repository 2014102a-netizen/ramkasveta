export interface Product {
  id: string;
  name: string;
  collection: 'word' | 'origins' | 'tales';
  description: string;
  longDescription: string;
  price: number;
  images: string[];
  features: string[];
  qrCode?: string;
  playlist?: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: 'word' | 'origins' | 'tales';
  title: string;
  narrative: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  text: string;
  value: string;
  emoji: string;
  leads_to?: string;
}

export interface QuizResult {
  productId: string;
  message: string;
}
