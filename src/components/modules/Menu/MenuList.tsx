'use client';
import { useRouter } from 'next/navigation';
import { useMenuContext } from '@/context/MenuContext';
import { Caption } from '@/components/ui/common';

const menuListData = [
  {
    id: 1,
    href: '/events',
    title: '기획전',
    desc: '진행중인 기획전을 만나보세요.',
  },
  {
    id: 2,
    href: '/best',
    title: '베스트',
    desc: '스타벅스 베스트 MD 상품만 모아보세요.',
  },
];

export default function MenuList() {
  const router = useRouter();
  const { setIsOpen } = useMenuContext();

  const handleRouteChange = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <section className='px-6 bg-gray-200 w-full z-50'>
      <ul className='pb-16'>
        {menuListData.map(({ id, href, title, desc }) => (
          <li key={id}>
            <button onClick={() => handleRouteChange(href)}>
              <Caption level={1}>{title}</Caption>
              <Caption level={3}>{desc}</Caption>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
