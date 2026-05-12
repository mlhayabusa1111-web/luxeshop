import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import ProductDetail from '@/components/ProductDetail';

export default function ProductDetailPage({ params }) {
  const product = products.find((p) => String(p.id) === params.id);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}
