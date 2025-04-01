import BottomCartBar from '@/components/layouts/carts/BottomCartBar';
import TopAddressBar from '@/components/layouts/carts/TopAddressBar';

interface CartPageProps {
  searchParams: Promise<{ memberAddressUuid?: string }>;
}

export default async function CartPage({ searchParams }: CartPageProps) {
  const { memberAddressUuid } = await searchParams;
  return (
    <main>
      <TopAddressBar memberAddressUuid={memberAddressUuid} />
      <BottomCartBar count={3} price={50000} />
    </main>
  );
}
