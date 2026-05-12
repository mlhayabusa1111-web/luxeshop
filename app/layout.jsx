import { Montserrat } from 'next/font/google';
import ShopProvider from '@/components/ShopProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import PageShell from '@/components/PageShell';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata = {
  title: 'LUXE - Modern Fashion Store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn" suppressHydrationWarning className={montserrat.variable}>
      <body className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
        <ShopProvider>
          <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
            <Navbar />
            <main>
              <PageShell>{children}</PageShell>
            </main>
            <Footer />
            <LoginModal />
          </div>
        </ShopProvider>
      </body>
    </html>
  );
}
