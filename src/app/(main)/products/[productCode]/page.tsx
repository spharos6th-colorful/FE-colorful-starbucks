import dynamic from 'next/dynamic';

const ProductDetail = dynamic(() => import('@/components/modules/product/ProductDetail'), {
  loading: () => <p>Loading...</p>,
});

interface PageProps {
  params: Promise<{ productCode: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <ProductDetail productCode={resolvedParams.productCode} />;
}
