export interface Product {
  id: string;
  name: string;
  price: number;
  sizes?: string[];
  fabric: string;
  color?: string;
  description: string;
  imageUrl: string;
  gallery?: string[];
  category: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  review: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  size?: string;
  quantity: number;
}
