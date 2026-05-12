import Hero from '@/components/Hero';
import SearchFilter from '@/components/SearchFilter';
import ProductsGrid from '@/components/ProductsGrid';
import CategoriesSection from '@/components/CategoriesSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchFilter />
      <ProductsGrid />
      <CategoriesSection />
    </>
  );
}
