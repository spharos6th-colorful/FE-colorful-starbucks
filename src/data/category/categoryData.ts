export type PriceOptionType = {
  priceOptionId: string;
  minPrice: string;
  maxPrice: string;
  filterName: string;
};

export const priceOptions: PriceOptionType[] = [
  {
    priceOptionId: 'under50000',
    minPrice: '',
    maxPrice: '50000',
    filterName: '~5만원',
  },
  {
    priceOptionId: 'range50000to100000',
    minPrice: '50000',
    maxPrice: '100000',
    filterName: '5~10만원',
  },
  {
    priceOptionId: 'range100000to300000',
    minPrice: '100000',
    maxPrice: '300000',
    filterName: '10~30만원',
  },
  {
    priceOptionId: 'range300000to500000',
    minPrice: '300000',
    maxPrice: '500000',
    filterName: '30~50만원',
  },
  {
    priceOptionId: 'range500000to1000000',
    minPrice: '500000',
    maxPrice: '1000000',
    filterName: '50~100만원',
  },
  {
    priceOptionId: 'over1000000',
    minPrice: '1000000',
    maxPrice: '',
    filterName: '100만원이상',
  },
];
