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
    path: '/recently-viewed',
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

export const infoListData = [
  { id: 1, text: '대표이사 : 손정현' },
  { id: 2, text: '사업자등록번호 : 201-81-21515' },
  { id: 3, type: 'tel', text: 'TEL : 1522-3232' },
  { id: 4, text: '사업자등록번호 : 201-81-21515' },
  { id: 5, text: '통신판매업신고번호 : 2011-서울중구-1066' },
];

export const termConditionData = [
  { id: 1, href: '/terms?type=privacy', text: '개인정보처리방침' },
  { id: 2, href: '/terms?type=website', text: '홈페이지 이용약관' },
  { id: 3, href: '/terms?type=card', text: '스타벅스카드 이용약관' },
];
