import Link from 'next/link';
import ArrowIcon from '@/assets/icons/common/ArrowButton.svg';

type ArrowButtonProps = {
  href: string;
};
function ArrowButton({ href }: ArrowButtonProps) {
  return (
    <Link href={href}>
      <ArrowIcon />
    </Link>
  );
}

export default ArrowButton;
