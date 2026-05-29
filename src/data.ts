import { Product, Testimonial, Faq } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Floral Cotton Kurti',
    price: 899,
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Pure Cotton',
    color: 'Pink',
    description: 'Soft floral printed kurti perfect for daily wear and college styling.',
    imageUrl: '/images/pink_floral_kurti_1_1780032659171.png',
    gallery: [
      '/images/pink_floral_kurti_1_1780032659171.png',
      '/images/pink_floral_kurti_2_1780032681635.png',
      '/images/pink_floral_kurti_3_1780032708610.png'
    ],
    category: 'Kurtis',
    badge: 'Trending'
  },
  {
    id: '2',
    name: 'Beige Co-ord Set',
    price: 1799,
    sizes: ['S', 'M', 'L'],
    fabric: 'Rayon',
    color: 'Beige',
    description: 'Elegant Indo-western co-ord set for brunches and casual outings.',
    imageUrl: 'https://images.unsplash.com/photo-1610444317135-24fd53f2c5eb?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1610444317135-24fd53f2c5eb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551806235-a05ff36ee498?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1434389678369-182f4553229b?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Co-ord Sets'
  },
  {
    id: '3',
    name: 'Wine Festive Saree',
    price: 2499,
    fabric: 'Georgette',
    color: 'Wine',
    description: 'Lightweight festive saree with embroidered border.',
    imageUrl: 'https://images.unsplash.com/photo-1615886753866-79396abc446e?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1615886753866-79396abc446e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733915-181519d1469e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Sarees',
    badge: 'New Arrival'
  },
  {
    id: '4',
    name: 'Black Anarkali Suit Set',
    price: 2199,
    sizes: ['M', 'L', 'XL'],
    fabric: 'Chanderi',
    description: 'Perfect ethnic outfit for weddings and festive occasions.',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605333550882-9ed88c006c9e?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Ethnic Sets',
    color: 'Black'
  },
  {
    id: '5',
    name: 'Lavender Printed Dress',
    price: 1299,
    sizes: ['S', 'M', 'L'],
    fabric: 'Crepe',
    description: 'Trendy flowy dress with puff sleeves.',
    imageUrl: 'https://images.unsplash.com/photo-1620359850117-0245237887ac?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1620359850117-0245237887ac?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550605963-3595b1aeb0fc?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Dresses',
    color: 'Lavender',
    badge: 'Trending'
  },
  {
    id: '6',
    name: 'White Embroidered Kurta Set',
    price: 2899,
    sizes: ['M', 'L', 'XL'],
    fabric: 'Cotton Silk',
    description: 'Elegant embroidered kurta set with matching dupatta.',
    imageUrl: '/images/white_kurta_set_1.webp',
    gallery: [
      '/images/white_kurta_set_1.webp',
      '/images/white_kurta_set_2.webp',
      '/images/white_kurta_set_3.webp'
    ],
    category: 'Ethnic Sets',
    color: 'White',
    badge: 'Bestseller'
  }
];

export const newArrivalsCategories = [
  'Pastel Co-ord Sets',
  'Floral Summer Kurtis',
  'Office Wear Kurtas',
  'Lightweight Sarees',
  'Minimal Festive Looks'
];

export const categories = [
  'Kurtis', 'Co-ord Sets', 'Sarees', 'Dresses', 'Ethnic Sets'
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Riya Sharma',
    review: "The quality is amazing for the price. Their kurtis are super comfortable and stylish!"
  },
  {
    id: '2',
    name: 'Muskan Verma',
    review: "I ordered a co-ord set and got so many compliments. Delivery was also very fast."
  },
  {
    id: '3',
    name: 'Neha Arora',
    review: "Loved the festive collection. Fabric quality feels premium."
  }
];

export const faqs: Faq[] = [
  {
    question: 'Do you offer Cash on Delivery?',
    answer: 'Yes, COD is available across India.'
  },
  {
    question: 'What is your return policy?',
    answer: 'Returns are accepted within 7 days of delivery. Product must be unused with original tags.'
  },
  {
    question: 'How long does delivery take?',
    answer: 'Orders are usually delivered within 4–7 business days. Express shipping is available in selected cities.'
  },
  {
    question: 'Do you have plus-size options?',
    answer: 'Yes, selected styles are available up to XXL.'
  }
];
