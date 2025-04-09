import { menuListData } from '@/data/initialDatas';
import MenuBottomItem from './MenuBottomItem';

export default function MenuList() {
  return (
    <section className='px-6 bg-gray-200 w-full grow'>
      <ul className='pb-16'>
        {menuListData.map((data) => (
          <MenuBottomItem key={data.id} {...data} />
        ))}
      </ul>
    </section>
  );
}
