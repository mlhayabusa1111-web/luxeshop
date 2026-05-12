export const categories = [
  { id: 'all', name: 'Бүгд', icon: '🗂️' },
  { id: 'men', name: 'Эрэгтэй', icon: '👔' },
  { id: 'women', name: 'Эмэгтэй', icon: '👗' },
  { id: 'kids', name: 'Хүүхэд', icon: '🧒' },
  { id: 'accessories', name: 'Дагалдах', icon: '👜' },
  { id: 'shoes', name: 'Гутал', icon: '👟' },
];

export const products = [
  { id: 1, name: 'Premium Wool Coat', price: 459000, originalPrice: 599000, category: 'women', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&q=80', rating: 4.8, reviews: 124, isNew: true, discount: 23 },
  { id: 2, name: 'Classic Leather Jacket', price: 389000, originalPrice: 450000, category: 'men', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80', rating: 4.9, reviews: 89, isNew: false, discount: 14 },
  { id: 3, name: 'Minimal White Sneakers', price: 289000, originalPrice: null, category: 'shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80', rating: 4.7, reviews: 256, isNew: true, discount: 0 },
  { id: 4, name: 'Cashmere Sweater', price: 325000, originalPrice: 420000, category: 'men', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80', rating: 4.6, reviews: 67, isNew: false, discount: 23 },
  { id: 5, name: 'Silk Evening Dress', price: 520000, originalPrice: null, category: 'women', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80', rating: 4.9, reviews: 45, isNew: true, discount: 0 },
  { id: 6, name: 'Denim Premium Jeans', price: 198000, originalPrice: 250000, category: 'men', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80', rating: 4.5, reviews: 312, isNew: false, discount: 21 },
  { id: 7, name: 'Designer Handbag', price: 680000, originalPrice: 850000, category: 'accessories', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80', rating: 4.8, reviews: 78, isNew: false, discount: 20 },
  { id: 8, name: 'Kids Winter Set', price: 165000, originalPrice: 200000, category: 'kids', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&q=80', rating: 4.7, reviews: 34, isNew: true, discount: 18 },
  { id: 9, name: 'Running Shoes Pro', price: 345000, originalPrice: null, category: 'shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', rating: 4.9, reviews: 189, isNew: true, discount: 0 },
  { id: 10, name: 'Linen Summer Shirt', price: 145000, originalPrice: 180000, category: 'men', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80', rating: 4.4, reviews: 56, isNew: false, discount: 19 },
  { id: 11, name: 'Wool Blazer', price: 420000, originalPrice: null, category: 'women', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80', rating: 4.8, reviews: 92, isNew: false, discount: 0 },
  { id: 12, name: 'Leather Belt Premium', price: 85000, originalPrice: 110000, category: 'accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80', rating: 4.6, reviews: 145, isNew: false, discount: 23 },
];

export const recommendedProducts = products.slice(0, 4);

export const formatPrice = (price) => {
  return new Intl.NumberFormat('mn-MN').format(price) + '₮';
};
