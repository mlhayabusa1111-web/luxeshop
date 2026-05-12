'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useShop } from '@/lib/shop-context';
import { Icons } from '@/components/Icons';
import { formatPrice } from '@/lib/products';

export default function ProductCard({ product, index }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const inWishlist = isInWishlist(product.id);
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-zinc-50 dark:bg-zinc-900 rounded-2xl overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 bg-white dark:bg-zinc-900 text-xs font-semibold rounded-full shadow">
              Шинэ
            </span>
          )}
          {product.discount > 0 && (
            <span className="px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            inWishlist
              ? 'bg-accent text-white'
              : 'bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          {inWishlist ? <Icons.HeartFilled /> : <Icons.Heart />}
        </motion.button>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-4 left-4 right-4 flex gap-2"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleViewDetails}
            className="flex-1 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-xl font-medium text-sm shadow-lg"
          >
            Дэлгэрэнгүй
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => addToCart(product)}
            className="flex-1 py-3 bg-accent text-white rounded-xl font-medium text-sm shadow-lg"
          >
            Сагсанд хийх
          </motion.button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <Icons.Star />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-zinc-500">({product.reviews})</span>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-accent">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-zinc-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
