import {
  FilterDataType,
  ProductCategoryTopType,
  SubDetailCategoryType,
  SubSizeCateogryType,
} from '@/types/products/productCategoryType';

export const sampleCategories: ProductCategoryTopType[] = [
  { topCategoryId: 1, categoryName: '전체' },
  { topCategoryId: 2, categoryName: '텀블러/보온병' },
  { topCategoryId: 3, categoryName: '머그/컵' },
  { topCategoryId: 4, categoryName: '라이프스타일' },
  { topCategoryId: 5, categoryName: '티/커피' },
];

export const sampleSubDetailCategories: SubDetailCategoryType[] = [
  { bottomCategoryId: 1, categoryName: '플라스틱 텀블러' },
  { bottomCategoryId: 2, categoryName: '스테인리스 텀블러' },
  { bottomCategoryId: 3, categoryName: '보온병' },
  { bottomCategoryId: 4, categoryName: '콜드컵' },
];

export const sampleSubVolumeCategories: SubSizeCateogryType[] = [
  { sizeId: 'short', sizeName: 'Short' },
  { sizeId: 'tall', sizeName: 'Tall' },
  { sizeId: 'grande', sizeName: 'Grande' },
  { sizeId: 'venti', sizeName: 'Venti' },
  { sizeId: 'trenta', sizeName: 'Trenta' },
];

// 시즌 필터 더미 데이터
export const sampleSeasonOptions = [
  { filterId: 'finish-collabo', filterName: '피니시 콜라보' },
  { filterId: 'march-new-core', filterName: '3월 신규코어' },
  { filterId: 'flower-market', filterName: '플라워 마켓' },
];

// 전체 필터 데이터
export const sampleFilterData: FilterDataType = {
  seasons: sampleSeasonOptions,
  price: [
    { filterId: 'under10000', filterName: '1만원미만' },
    { filterId: '10000to20000', filterName: '1만원대' },
    { filterId: '20000to30000', filterName: '2만원대' },
    { filterId: '30000to40000', filterName: '3만원대' },
  ],
};
