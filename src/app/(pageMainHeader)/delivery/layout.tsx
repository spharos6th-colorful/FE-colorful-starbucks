import React from 'react';

export default function DeliveryLayout({ children }: { children?: Readonly<React.ReactNode> }) {
  return <main className='w-full h-full relative'>{children}</main>;
}
