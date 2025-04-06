import { useState } from 'react';
import PlusButton from '@/assets/icon/carts/PlusButton.svg';
import MinusButton from '@/assets/icon/carts/MinusButton.svg';

interface CounterProps {
  initValue?: number;
  min: number;
  max: number;
  onChange?: (value: number) => void;
}

function Counter({ initValue, min = 1, max, onChange }: CounterProps) {
  const [count, setCount] = useState(initValue ?? 1);

  const increment = () => {
    if (count < max) {
      const newCount = count + 1;
      setCount(newCount);
      onChange?.(newCount);
    }
  };
  const decrement = () => {
    if (count > min) {
      const newCount = count - 1;
      setCount(newCount);
      onChange?.(newCount);
    }
  };

  return (
    <div className='flex items-center gap-3 '>
      <button
        onClick={decrement}
        className=' transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50'
        disabled={count <= min}
        aria-label='수량 감소'
      >
        <MinusButton />
      </button>

      <span className='w-6 text-center text-lg font-medium'>{count}</span>

      <button
        onClick={increment}
        className='transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50'
        disabled={count >= max}
        aria-label='수량 증가'
      >
        <PlusButton />
      </button>
    </div>
  );
}

export default Counter;
