import React from 'react';

import { Button } from '@/components/ui/Button';
import Buttons from '@/components/ui/Buttons';

// 버튼 사용 사례 페이지고 나중에는 삭제할 예정
// 사용법 궁금하면 여기서 사용법 보고 이용하면 됩니다.
// Button은 shadcn에서 긇어와서 바꾼거고
// Buttons는 framer-motion이 적용되어있고 나중에 애니매이션 넣을 수 있습니다.
// 일단 주로 Button으로 사용하시면 되고 Buttons 만들어놨으니 나중에 기회되면 사용해보는걸로
export default function ButtonTestPage() {
  return (
    <div className='p-6 space-y-10 max-w-3xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>Button과 Buttons 컴포넌트 비교</h1>

      <section>
        <h2 className='text-xl font-semibold mb-4'>기본 버튼 비교</h2>
        <div className='grid grid-cols-2 gap-8'>
          <div>
            <h3 className='text-lg font-medium mb-3'>기본 Button</h3>
            <div className='space-y-4'>
              <Button variant='default' width='full'>
                기본 버튼
              </Button>
              <Button variant='starbucks' width='full'>
                스타벅스 테마
              </Button>
              <Button variant='outline' width='full'>
                아웃라인 버튼
              </Button>
              <Button disabled width='full'>
                비활성화 버튼
              </Button>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-medium mb-3'>Motion Buttons</h3>
            <div className='space-y-4'>
              <Buttons label='기본 버튼' variant='default' width='full' />
              <Buttons label='스타벅스 테마' variant='starbucks' width='full' />
              <Buttons label='아웃라인 버튼' variant='outline' width='full' />
              <Buttons label='비활성화 버튼' disabled width='full' />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-4'>너비 옵션 비교</h2>
        <div className='grid grid-cols-2 gap-8'>
          <div>
            <h3 className='text-lg font-medium mb-3'>기본 Button</h3>
            <div className='space-y-4 border p-3 rounded'>
              <Button variant='default' width='auto'>
                자동 너비
              </Button>
              <Button variant='default' width='half'>
                절반 너비
              </Button>
              <Button variant='default' width='full'>
                전체 너비
              </Button>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-medium mb-3'>Motion Buttons</h3>
            <div className='space-y-4 border p-3 rounded'>
              <Buttons label='자동 너비' variant='default' width='auto' />
              <Buttons label='절반 너비' variant='default' width='half' />
              <Buttons label='전체 너비' variant='default' width='full' />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-4'>실제 사용 예시</h2>
        <div className='grid grid-cols-2 gap-8'>
          <div>
            <h3 className='text-lg font-medium mb-3'>기본 Button</h3>
            <div className='p-4 border rounded'>
              <div className='flex justify-between mb-4'>
                <div className='flex items-center'>
                  <span className='font-bold'>총</span>
                  <span className='text-primary-100 font-bold mx-1'>1</span>
                  <span className='font-bold'>건</span>
                </div>
                <div className='font-bold text-xl'>43,000원</div>
              </div>
              <div className='flex gap-3'>
                <Button variant='outline' width='half'>
                  선물하기
                </Button>
                <Button variant='default' width='half'>
                  구매하기
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-medium mb-3'>Motion Buttons</h3>
            <div className='p-4 border rounded'>
              <div className='flex justify-between mb-4'>
                <div className='flex items-center'>
                  <span className='font-bold'>총</span>
                  <span className='text-primary-100 font-bold mx-1'>1</span>
                  <span className='font-bold'>건</span>
                </div>
                <div className='font-bold text-xl'>43,000원</div>
              </div>
              <div className='flex gap-3'>
                <Buttons label='선물하기' variant='outline' width='half' />
                <Buttons label='구매하기' variant='default' width='half' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
