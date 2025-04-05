import IconLimited from '@/assets/icons/product/Icon-Limited.svg';
import IconBest from '@/assets/icons/product/icon-best.svg';
import IconNew from '@/assets/icons/product/icon-new.svg';

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
