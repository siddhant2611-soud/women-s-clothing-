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
    badge: 'Trending',
    inStock: false
  },
  {
    id: '2',
    name: 'Beige Co-ord Set',
    price: 1799,
    sizes: ['S', 'M', 'L'],
    fabric: 'Rayon',
    color: 'Beige',
    description: 'Elegant Indo-western co-ord set for brunches and casual outings.',
    imageUrl: '/images/beige_coord_1_1780039903892.png',
    gallery: [
      '/images/beige_coord_1_1780039903892.png',
      '/images/beige_coord_2_1780039922809.png',
      '/images/beige_coord_3_1780039940858.png'
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
    imageUrl: '/images/wine_saree_1_1780040161390.png',
    gallery: [
      '/images/wine_saree_1_1780040161390.png',
      '/images/wine_saree_2_1780040180994.png',
      '/images/wine_saree_3_1780040205205.png'
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
    imageUrl: '/images/black_anarkali_1_1780039960399.png',
    gallery: [
      '/images/black_anarkali_1_1780039960399.png',
      '/images/black_anarkali_2_1780039979843.png',
      '/images/black_anarkali_3_1780040001187.png'
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
    imageUrl: '/images/lavender_dress_1_1780040020061.png',
    gallery: [
      '/images/lavender_dress_1_1780040020061.png',
      '/images/lavender_dress_2_1780040038003.png',
      '/images/lavender_dress_3_1780040069772.png'
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
    imageUrl: '/images/white_kurta_1_1780040099925.png',
    gallery: [
      '/images/white_kurta_1_1780040099925.png',
      '/images/white_kurta_2_1780040119738.png',
      '/images/white_kurta_3_1780040145121.png'
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
