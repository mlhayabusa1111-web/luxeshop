'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useShop } from '@/lib/shop-context';
import { Icons } from '@/components/Icons';
import { formatPrice, recommendedProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function ProductDetail({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeImage, setActiveImage] = useState(0);
  const inWishlist = isInWishlist(product.id);
  const router = useRouter();

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 md:pt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-6"
        >
          <Icons.ArrowLeft />
          Буцах
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              {[product.image, product.image, product.image].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === i
                      ? 'border-accent'
                      : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-600'
                  }`}
                >
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              {product.isNew && (
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-3">
                  Шинэ бүтээгдэхүүн
                </span>
              )}
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Icons.Star />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-zinc-400">•</span>
                <span className="text-zinc-500">{product.reviews} сэтгэгдэл</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-accent">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-zinc-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="px-2 py-1 bg-accent/10 text-accent text-sm font-medium rounded">
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>

            {/* Size Selector */}
            <div>
              <h3 className="font-medium mb-3">Хэмжээ</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-accent text-white'
                        : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Тоо ширхэг</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-l-xl transition-colors"
                  >
                    <Icons.Minus />
                  </motion.button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-r-xl transition-colors"
                  >
                    <Icons.Plus />
                  </motion.button>
                </div>
                <span className="text-zinc-500">
                  Нийт:{' '}
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {formatPrice(product.price * quantity)}
                  </span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  addToCart(product, quantity);
                  router.push('/cart');
                }}
                className="flex-1 py-4 bg-accent text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                Сагсанд хийх
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                  inWishlist
                    ? 'bg-accent text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {inWishlist ? <Icons.HeartFilled /> : <Icons.Heart />}
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              {[
                { icon: <Icons.Truck />, title: 'Шуурхай хүргэлт', desc: '2-5 хоног' },
                { icon: <Icons.Check />, title: 'Чанарын баталгаа', desc: '100% жинхэнэ' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-zinc-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold mb-6">Санал болгох</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {recommendedProducts
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
