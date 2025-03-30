import CategorySlide from '@/components/module/main/CategorySlide';
import ProductList from '@/components/pages/main/productList';
import MainBanner from '@/components/ui/main/MainBanner';
import { eventData } from '@/data/main/dummyData';

export default function Home() {
  /*   const eventUuid = 's9ya45123yyttt'; */
  return (
    <main className='max-w-3xl mx-auto'>
      {/* eventUuid={eventUuid} */}
      <MainBanner />
      <CategorySlide />
      {eventData.map(({ eventUuid, eventName }) => (
        <ProductList key={eventUuid} eventUuid={eventUuid} title={eventName} />
      ))}
    </main>
  );
}
