'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/Icons';

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden noise-overlay">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(232,93,4,0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(232,93,4,0.05) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-10 w-64 h-64 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 left-10 w-48 h-48 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium text-accent">Орчин үеийн, Шинэ загварлаг</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="block">Хувцаслах</span>
              <span className="block gradient-text">Урлаг</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Дэлхийн шилдэг брэндүүдээс зөвхөн танд зориулж сонгосон цуглуулга. Таны хэв маяг, таны Fashion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/products')}
                className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow"
              >
                Дэлгэрэнгүй үзэх
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-zinc-300 dark:border-zinc-700 rounded-full font-semibold text-lg hover:border-accent hover:text-accent transition-colors"
              >
                Коллекц үзэх
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0"
            >
              {[
                { value: '500+', label: 'Бүтээгдэхүүн' },
                { value: '50+', label: 'Брэнд' },
                { value: '10K+', label: 'Хэрэглэгч' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
                alt="Fashion Model"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -left-8 bottom-20 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Icons.Truck />
                </div>
                <div>
                  <div className="font-semibold">Шуурхай хүргэлт</div>
                  <div className="text-sm text-zinc-500">300,000₮ дээш үнэгүй хүргэлт</div>
                </div>
              </div>
            </motion.div>

            {/* Discount Badge */}
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -right-4 top-20 w-24 h-24 bg-accent text-white rounded-full flex flex-col items-center justify-center shadow-xl pulse-glow"
            >
              <span className="text-xs font-medium">Хямдрал</span>
              <span className="text-xl font-bold">-30%</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
