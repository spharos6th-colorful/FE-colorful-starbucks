import IconLimited from '@/assets/icon-limited.svg';
import IconBest from '@/assets/icon-best.svg';
import IconNew from '@/assets/icon-new.svg';

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
