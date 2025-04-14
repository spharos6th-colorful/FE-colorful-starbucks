'use client';

import { deleteAllRecentProducts } from '@/actions/product-service';

export default function DeleteAllRecentViewedProductButton() {
  return (
    <button
      onClick={() => deleteAllRecentProducts()}
      className='text-sm font-medium text-text-900'
    >
      전체 삭제
    </button>
  );
}
