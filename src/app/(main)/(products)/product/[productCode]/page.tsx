import ProductDetail from '@/components/modules/product/ProductDetail';

interface PageProps {
  params: Promise<{ productCode: string }>;
}

export default async function Page({ params }: PageProps) {
  const { productCode } = await params;
  return <ProductDetail productCode={productCode} />;
}
