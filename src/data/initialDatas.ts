import { PageSubHeaderDataType } from '@/types/initDataTypes';
import { MenuListDataType } from '@/types/Menu';

export const menuListData: MenuListDataType[] = [
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

export const pageSubHeaderData: PageSubHeaderDataType[] = [
  {
    id: 1,
    path: '/carts',
    title: '장바구니',
  },
  {
    id: 2,
    path: '/recent-product',
    title: '최근 본 상품',
  },
  {
    id: 3,
    path: '/delivery/create',
    title: '배송지 등록',
  },
  {
    id: 4,
    path: '/delivery/edit',
    title: '배송지 수정',
  },
  {
    id: 5,
    path: '/payment',
    title: '결제하기',
  },
];
