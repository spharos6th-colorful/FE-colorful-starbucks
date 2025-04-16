import { Button } from '@/components/ui/common/Button';

type GenderSelectorProps = {
  value: 'M' | 'W';
  onChange: (gender: 'M' | 'W') => void;
};

export default function GenderSelector({
  value,
  onChange,
}: GenderSelectorProps) {
  return (
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        성별
      </label>
      <div className='flex gap-2 mt-4'>
        <Button
          type='button'
          width='half'
          size='sm'
          variant={value === 'M' ? 'default' : 'outline'}
          onClick={() => onChange('M')}
        >
          남성
        </Button>
        <Button
          type='button'
          width='half'
          size='sm'
          variant={value === 'W' ? 'default' : 'outline'}
          onClick={() => onChange('W')}
        >
          여성
        </Button>
      </div>
    </div>
  );
}
