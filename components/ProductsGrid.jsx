'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useShop } from '@/lib/shop-context';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function ProductsGrid() {
  const { searchQuery, selectedCategory } = useShop();
  const router = useRouter();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold mb-2">Бүтээгдэхүүн</h2>
            <p className="text-zinc-500">{filteredProducts.length} бүтээгдэхүүн олдлоо</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push('/products')}
            className="hidden md:flex items-center gap-2 text-accent font-medium hover:underline"
          >
            Бүгдийг үзэх
            <span>→</span>
          </motion.button>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Бүтээгдэхүүн олдсонгүй</h3>
            <p className="text-zinc-500">Өөр түлхүүр үгээр хайж үзнэ үү</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
