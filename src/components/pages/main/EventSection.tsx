import { eventData } from '@/data/main/dummyData';
import ProductList from './productList';

export default async function EventProductList() {
  // const eventDatas = await getEventDatas();
  const eventDatas = eventData;

  return (
    <>
      {eventDatas.map(({ eventUuid, eventName }) => (
        <ProductList key={eventUuid} eventUuid={eventUuid} title={eventName} />
      ))}
    </>
  );
}
