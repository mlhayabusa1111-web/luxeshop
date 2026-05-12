'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useShop } from '@/lib/shop-context';
import { Icons } from '@/components/Icons';
import { formatPrice } from '@/lib/products';

export default function CheckoutPage() {
  const { cart, cartTotal, shippingFee, finalTotal, placeOrder, isLogin, setShowLogin } = useShop();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', district: '', zipCode: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = placeOrder(formData);
    setOrderInfo(order);
    setOrderPlaced(true);
  };

  if (!isLogin) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-20 md:pt-24 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold mb-2">Нэвтрэх шаардлагатай</h2>
          <p className="text-zinc-500 mb-6">Захиалга өгхийн тулд нэвтэрнэ үү</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowLogin(true)}
            className="px-6 py-3 bg-accent text-white rounded-xl font-medium"
          >
            Нэвтрэх
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (orderPlaced && orderInfo) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-20 md:pt-24 flex items-center justify-center"
      >
        <div className="text-center max-w-md mx-auto px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Icons.Check />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Захиалга амжилттай!</h2>
          <p className="text-zinc-500 mb-4">
            Таны захиалга #{orderInfo.id} амжилттай бүртгэгдлээ
          </p>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4 mb-6 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-zinc-500">Захиалгын дугаар</span>
              <span className="font-medium">#{orderInfo.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-zinc-500">Статус</span>
              <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 text-sm rounded">
                Боловсруулж байна
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Нийт дүн</span>
              <span className="font-bold text-accent">{formatPrice(orderInfo.total)}</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-accent text-white rounded-xl font-medium"
          >
            Нүүр хуудас руу буцах
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 md:pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            whileHover={{ x: -5 }}
            onClick={() => router.push('/cart')}
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <Icons.ArrowLeft />
          </motion.button>
          <h1 className="font-display text-3xl font-bold">Төлбөр төлөх</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Info */}
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6">
                <h2 className="font-semibold text-lg mb-4">Холбоо барих</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: 'Нэр', key: 'firstName' },
                    { label: 'Овог', key: 'lastName' },
                    { label: 'Имэйл', key: 'email', type: 'email' },
                    { label: 'Утас', key: 'phone', type: 'tel' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium mb-2">{field.label}</label>
                      <input
                        type={field.type || 'text'}
                        value={formData[field.key]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="w-full px-4 py-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-accent outline-none"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6">
                <h2 className="font-semibold text-lg mb-4">Хүргэлтийн хаяг</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Хаяг</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-accent outline-none"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { label: 'Хот/Аймаг', key: 'city' },
                      { label: 'Дүүрэг/Сум', key: 'district' },
                      { label: 'Цайзын дугаар', key: 'zipCode' },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block text-sm font-medium mb-2">{field.label}</label>
                        <input
                          type="text"
                          value={formData[field.key]}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          className="w-full px-4 py-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-accent outline-none"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-accent text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                Захиалга баталгаажуулах
              </motion.button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6">
              <h2 className="font-semibold text-lg mb-4">Захиалга</h2>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                      <p className="text-sm text-zinc-500">x{item.quantity}</p>
                    </div>
                    <p className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Дүн</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Хүргэлт</span>
                  <span className={shippingFee === 0 ? 'text-green-500' : ''}>
                    {shippingFee === 0 ? 'Үнэгүй' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Нийт</span>
                  <span className="text-accent">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
