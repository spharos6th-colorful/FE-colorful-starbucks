'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import CartIcon from '@/assets/icons/product/cart.svg';

export default function Cart() {
  const pathname = usePathname();

  return (
    <Link href={`/carts?callbackUrl=${pathname}`}>
      <CartIcon />
    </Link>
  );
}
