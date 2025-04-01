import BottomCartBar from '@/components/layouts/carts/BottomCartBar';

export default function Home() {
  return (
    <main>
      <BottomCartBar count={3} price={50000} />
    </main>
  );
}
