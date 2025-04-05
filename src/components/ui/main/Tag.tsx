import IconLimited from '@/assets/icons/product/Icon-Limited.svg';
import IconBest from '@/assets/icons/product/Icon-Best.svg';
import IconNew from '@/assets/icons/product/Icon-New.svg';

interface TagProps {
  isMarkable?: boolean;
  isNew?: boolean;
  isBest?: boolean;
}

export default function Tag({ isMarkable, isNew, isBest }: TagProps) {
  return (
    <span className='inline'>
      {isMarkable && <IconLimited />}
      {isNew && <IconNew />}
      {isBest && <IconBest />}
    </span>
  );
}
