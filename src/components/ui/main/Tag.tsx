import IconLimited from '@/assets/icon-limited.svg';
import IconBest from '@/assets/icon-best.svg';
import IconNew from '@/assets/icon-new.svg';

interface TagProps {
  isLimited?: boolean;
  isNew?: boolean;
  isBest?: boolean;
}

export default function Tag({ isLimited, isNew, isBest }: TagProps) {
  return (
    <div className='flex flex-row gap-5 mt-[9px]'>
      {isLimited && <IconLimited />}
      {isNew && <IconNew />}
      {isBest && <IconBest />}
    </div>
  );
}
