'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

interface ProductActionsProps {
  productId: string;
}

export default function ProductActions({ productId }: ProductActionsProps) {
  //const router = useRouter();
  //const [isAdding, setIsAdding] = useState(false);
  console.log(productId); //eslint 때문에 잠시 출력만 걸었음(사용하지않는 변수 있으면 깃 커밋 불가)

  const addToCart = async () => {
    // TODO : 장바구니 추가하는 로직(api) 추가해야함
  };

  const handlePurchase = async () => {
    // 장바구니 담지 말고 바로 구매시 구매링크로 이동 예정
    // TODO옵션 선택하는 모달이 열려야함
    //router.push(`/checkout?products=${productId}`);
  };

  return (
    <div className='p-4 flex items-center'>
      <button
        onClick={addToCart}
        // disabled={isAdding}
        disabled={false}
        className='border rounded-full p-3 mr-3'
        aria-label='장바구니에 추가'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        >
          <circle cx='9' cy='21' r='1' />
          <circle cx='20' cy='21' r='1' />
          <path d='M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6' />
        </svg>
      </button>
      {/* TODO : 커스텀 버튼 컴포넌트로 변경 */}
      <button onClick={handlePurchase} className='flex-1 bg-green-600 text-white py-3 px-4 rounded-full font-medium'>
        구매하기
      </button>
    </div>
  );
}
