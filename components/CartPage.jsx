'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useShop } from '@/lib/shop-context';
import { Icons } from '@/components/Icons';
import { formatPrice } from '@/lib/products';

export default function CartPage() {
  const {
    cart, removeFromCart, updateQuantity,
    cartOriginalTotal, cartDiscount, shippingFee, finalTotal,
  } = useShop();
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 md:pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-3xl font-bold mb-8">Таны сагс</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold mb-2">Таны сагс хоосон байна</h3>
            <p className="text-zinc-500 mb-6">Бүтээгдэхүүн нэмэхийн тулд дэлгүүр хэсэх</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-accent text-white rounded-xl font-medium"
            >
              Дэлгүүрлэх
            </motion.button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl"
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill sizes="128px" className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-accent">{formatPrice(item.price)}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-zinc-400 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-white dark:bg-zinc-800 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-l-lg"
                        >
                          <Icons.Minus />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-r-lg"
                        >
                          <Icons.Plus />
                        </button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                      >
                        <Icons.Trash />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-28 h-fit">
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 space-y-4">
                <h2 className="font-display text-xl font-bold">Захиалгын дүн</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Дундаж үнэ</span>
                    <span>{formatPrice(cartOriginalTotal)}</span>
                  </div>
                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Хямдрал</span>
                      <span>-{formatPrice(cartDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Хүргэлт</span>
                    <span className={shippingFee === 0 ? 'text-green-500' : ''}>
                      {shippingFee === 0 ? 'Үнэгүй' : formatPrice(shippingFee)}
                    </span>
                  </div>
                  {shippingFee > 0 && (
                    <p className="text-xs text-zinc-400">
                      300,000₮ дээш захиалгаар үнэгүй хүргэнэ
                    </p>
                  )}
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Нийт</span>
                    <span className="text-accent">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/checkout')}
                  className="w-full py-4 bg-accent text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  Төлбөр төлөх
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
