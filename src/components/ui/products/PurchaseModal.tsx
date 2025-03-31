'use client';

import React, { useEffect, useState } from 'react';

import { ProductOption, SelectedOption } from '@/types/products/productPurchaseTypes';
import { Modal, useModal } from '../common/Modal';
import { ProductOptionsProvider } from '@/context/ProductOptionsContext';
import PurchaseForm from '@/components/modules/product/PurchaseForm';

interface PurchaseModalProps {
  productId: string;
  productPrice: number;
}

// 더미 옵션 데이터
const dummyOptions: ProductOption[] = [
  {
    id: 'color',
    name: '색상',
    values: ['블랙', '화이트', '네이비', '그레이'],
  },
  {
    id: 'size',
    name: '사이즈',
    values: ['S', 'M', 'L', 'XL'],
  },
];

export default function PurchaseModal({ productId, productPrice }: PurchaseModalProps) {
  const { closeModal } = useModal();
  const [productOptions, setProductOptions] = useState<ProductOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 옵션 데이터만 가져오기
    const fetchProductOptions = () => {
      try {
        setLoading(true);
        // 실제 API 호출 주석 처리
        // const response = await fetch(`/api/products/${productId}/options`);
        // if (!response.ok) {
        //   throw new Error('옵션 정보를 불러오는데 실패했습니다.');
        // }
        // const data = await response.json();

        // 더미 옵션 데이터 사용
        setTimeout(() => {
          setProductOptions(dummyOptions);
          setLoading(false);
        }, 300); // 로딩 효과를 위해 약간의 지연 추가
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        console.error(err);
        setLoading(false);
      }
    };

    fetchProductOptions();
  }, [productId]);

  const handleAddToCart = (options: SelectedOption[]) => {
    console.log(`상품 ${productId} 장바구니 추가:`, options);
    closeModal();
  };

  const handlePurchase = (options: SelectedOption[]) => {
    console.log(`상품 ${productId} 즉시구매:`, options);
    closeModal();
  };

  if (loading) {
    return (
      <Modal type='purchase-modal' variant='slide' className='max-h-[80vh] overflow-y-auto'>
        <div className='flex justify-center items-center py-12'>
          <p>옵션 정보를 불러오는 중...</p>
        </div>
      </Modal>
    );
  }

  if (error || !productOptions.length) {
    return (
      <Modal type='purchase-modal' variant='slide' className='max-h-[80vh] overflow-y-auto'>
        <div className='flex flex-col items-center py-12'>
          <p className='text-red-500'>{error || '옵션 정보를 불러오지 못했습니다.'}</p>
          <button onClick={closeModal} className='mt-4 px-4 py-2 bg-gray-200 rounded-md'>
            닫기
          </button>
        </div>
      </Modal>
    );
  }

  const product = {
    id: productId,
    price: productPrice,
    options: productOptions,
  };

  return (
    <Modal type='purchase-modal' variant='slide' className='max-h-[80vh] overflow-y-auto'>
      <ProductOptionsProvider productId={productId} productPrice={productPrice} productOptions={productOptions}>
        <PurchaseForm product={product} onAddToCart={handleAddToCart} onPurchase={handlePurchase} />
      </ProductOptionsProvider>
    </Modal>
  );
}
