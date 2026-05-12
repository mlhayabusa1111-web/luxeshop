'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useShop } from '@/lib/shop-context';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useShop();
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 md:pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-3xl font-bold mb-8">Хүслийн жагсаалт</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold mb-2">Хүслийн жагсаалт хоосон</h3>
            <p className="text-zinc-500 mb-6">Та таалагдсан бүтээгдэхүүнээ энд хадгална уу</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-accent text-white rounded-xl font-medium"
            >
              Дэлгүүрлэх
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlist.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
