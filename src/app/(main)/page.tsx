import CategorySlide from '@/components/modules/main/CategorySlide';
import EventProductList from '@/components/pages/main/EventSection';
import MainBanner from '@/components/ui/main/MainBanner';

export default function Home() {
  return (
    <main className='max-w-3xl mx-auto'>
      <MainBanner />
      <CategorySlide />
      <EventProductList />
    </main>
  );
}
