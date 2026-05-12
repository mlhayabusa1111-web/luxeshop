'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useShop } from '@/lib/shop-context';

const categoryImages = [
  { id: 'men', name: 'Эрэгтэй', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80' },
  { id: 'women', name: 'Эмэгтэй', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&q=80' },
  { id: 'shoes', name: 'Гутал', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&q=80' },
  { id: 'accessories', name: 'Дагалдах', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&q=80' },
];

export default function CategoriesSection() {
  const { setSelectedCategory } = useShop();
  const router = useRouter();

  return (
    <section className="py-12 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ангиллаар үзэх</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Таны хүссэн хэв маяг, таны хүсэл мөрөөдөл бүрийг биелүүлэх төрөлжсөн ангиллууд
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryImages.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setSelectedCategory(cat.id);
                router.push('/products');
              }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden group"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <h3 className="font-display text-xl font-bold text-white">{cat.name}</h3>
                <p className="text-sm text-white/70">Коллекц үзэх →</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
