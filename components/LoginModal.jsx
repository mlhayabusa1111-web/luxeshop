'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/lib/shop-context';
import { Icons } from '@/components/Icons';

export default function LoginModal() {
  const { showLogin, setShowLogin, setIsLogin, setUserInfo } = useShop();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '', password: '', name: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLogin(true);
    setUserInfo({ name: formData.name || 'User', email: formData.email });
    setShowLogin(false);
  };

  return (
    <AnimatePresence>
      {showLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowLogin(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-2xl font-bold">
                {isRegister ? 'Бүртгүүлэх' : 'Нэвтрэх'}
              </h2>
              <button onClick={() => setShowLogin(false)}>
                <Icons.Close />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-sm font-medium mb-2">Нэр</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0 focus:ring-2 focus:ring-accent outline-none"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-2">Имэйл</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0 focus:ring-2 focus:ring-accent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Нууц үг</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0 focus:ring-2 focus:ring-accent outline-none"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-accent text-white rounded-xl font-semibold text-lg"
              >
                {isRegister ? 'Бүртгүүлэх' : 'Нэвтрэх'}
              </motion.button>
            </form>

            <p className="text-center mt-6 text-sm text-zinc-500">
              {isRegister ? 'Бүртгэлтэй юу?' : 'Бүртгэл байхгүй юу?'}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="ml-1 text-accent font-medium hover:underline"
              >
                {isRegister ? 'Нэвтрэх' : 'Бүртгүүлэх'}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
