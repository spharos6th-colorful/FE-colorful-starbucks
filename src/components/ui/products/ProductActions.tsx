'use client';

import { Button } from '../Button';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

interface ProductActionsProps {
  productId: string;
}

export default function ProductActions({ productId }: ProductActionsProps) {
  //const router = useRouter();
  //const [isAdding, setIsAdding] = useState(false);
  console.log(productId); //eslint 때문에 잠시 출력만 걸었음(사용하지않는 변수 있으면 깃 커밋 불가)

  // const addToCart = async () => {
  //   // TODO : 장바구니 추가하는 로직(api) 추가해야함
  // };

  // const handlePurchase = async () => {
  //   // 장바구니 담지 말고 바로 구매시 구매링크로 이동 예정
  //   // TODO옵션 선택하는 모달이 열려야함
  //   //router.push(`/checkout?products=${productId}`);
  // };

  return (
    <div className='p-4 flex items-center'>
      <Button variant='default' width='full'>
        구매하기
      </Button>
    </div>
  );
}
