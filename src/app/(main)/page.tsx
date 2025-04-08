import CategorySlide from '@/components/modules/main/CategorySlide';
import EventProductList from '@/components/pages/main/EventSection';
import MainBanner from '@/components/ui/main/MainBanner';
import TestHeader from '@/components/ui/TestHeader';

export default function Home() {
  return (
    <main className='max-w-3xl mx-auto'>
      <TestHeader />
      <MainBanner />
      <CategorySlide />
      <EventProductList />
    </main>
  );
}
